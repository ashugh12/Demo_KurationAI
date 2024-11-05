// LeadModel.js
import { db } from '../firebase'; // Ensure the correct path to firebase.jsx
import { doc, setDoc } from 'firebase/firestore';

const LeadModel = {
    saveEnrichedLead: async (user, enrichedData) => {
        if (!user || !enrichedData) return;

        const enrichedLeadRef = doc(db, "enrichedLeads", user.uid);
        await setDoc(enrichedLeadRef, {
            companyName: enrichedData.data?.lookalike_companies?.[0]?.name,
            employeeCount: enrichedData.data?.employee_count,
            industry: enrichedData.data?.industry,
            location: enrichedData.data?.location,
            timestamp: new Date(),
        });
    },
};

export default LeadModel;
