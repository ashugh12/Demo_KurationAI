// EnrichedDataCard.js
import React from 'react';
import './EnrichedDataCard.css'; // Optional: You can style this component separately

const EnrichedDataCard = ({ data }) => {
    // Check if data is valid
    if (!data) {
        return <div className="enriched-data-card"><p>No data available</p></div>;
    }

    return (
        <div className="enriched-data-card">
            <h4>Enriched Company Data</h4>
            <p><strong>Company Name:</strong> {data.lookalike_companies?.[0]?.name || "N/A"}</p>
            <p><strong>Employee Count:</strong> {data.employee_count !== undefined ? data.employee_count : "N/A"}</p>
            <p><strong>Industry:</strong> {data.industry || "N/A"}</p>
            <p><strong>Location:</strong> {data.location || "N/A"}</p>
        </div>
    );
};

export default EnrichedDataCard;
