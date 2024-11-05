import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import './LeadCaptureForm.css';
import EnrichedDataCard from './EnrichedDataCard';
import LeadModel from '../models/LeadModel';

const LeadCaptureForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [enrichedData, setEnrichedData] = useState(null);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); // State to manage user login

    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            setError("Logout failed. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:5000/api/enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ website: websiteUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch enriched data');
            }

            const data = await response.json();
            console.log('Enriched Data:', data); // Log the API response
            setEnrichedData(data);

            // Optionally, you could choose to save this data in Firestore if required
            await LeadModel.saveEnrichedLead(user, data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {user ? (
                <div className="lead-capture-form">
                    <h2>Lead Capture Form</h2>
                    <button onClick={handleLogout}>Sign Out</button>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Website URL"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            ) : (
                <div>
                    <h2>Please Log In</h2>
                    <button onClick={handleLogin}>Sign in with Google</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
            {enrichedData && (
                <div className="enriched-data-container">
                    <EnrichedDataCard data={enrichedData.data} />
                </div>
            )}
        </div>
    );
};

export default LeadCaptureForm;
