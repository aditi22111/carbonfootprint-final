import React, { useEffect, useState } from 'react';
import './Learderboard.css'; // Ensure your styling is correct

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/leaderboard');
                
                // Check if the response body is not empty
                const text = await response.text();
                if (text) {
                    const data = JSON.parse(text);
                    if (data.success) {
                        setLeaderboard(data.data);
                    } else {
                        console.error('Error fetching leaderboard:', data.message);
                    }
                } else {
                    console.error('Error: Received empty response from server');
                }
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };
    
        fetchLeaderboard();
    }, []);
    

    return (
        <div>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total Emission</th>
                        <th>Total Offset</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={entry._id}>
                            <td>{index + 1}</td>
                            <td>{entry.name}</td> {/* Directly access name */}
                            <td>{entry.email}</td> {/* Directly access email */}
                            <td>{entry.totalEmission}</td>
                            <td>{entry.totalOffset}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
