// EnrichedLeadSaver.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import your Firestore database instance
import { doc, setDoc } from "firebase/firestore"; // Import necessary Firestore functions

const EnrichedLeadSaver = ({ enrichedData, user }) => {
    const [error, setError] = useState('');

    useEffect(() => {
        const saveEnrichedLead = async () => {
            if (enrichedData && user) {
                try {
                    // Use user UID as a document ID, or create a sub-collection for multiple leads
                    const enrichedLeadRef = doc(db, "enrichedLeads", user.uid); 
                    await setDoc(enrichedLeadRef, {
                        companyName: enrichedData.data?.lookalike_companies?.[0]?.name,
                        employeeCount: enrichedData.data?.employee_count,
                        industry: enrichedData.data?.industry,
                        location: enrichedData.data?.location,
                        timestamp: new Date(), // Add a timestamp for reference
                    });
                    console.log("Enriched lead saved to Firestore");
                } catch (err) {
                    console.error("Error saving enriched lead:", err);
                    setError("Failed to save enriched lead. Please try again.");
                }
            }
        };

        saveEnrichedLead();
    }, [enrichedData, user]); // Run effect when enrichedData or user changes

    return (
        <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
};

export default EnrichedLeadSaver;
