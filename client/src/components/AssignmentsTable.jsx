import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssignmentTable() {
    const [data, setData] = useState([]);
    const [asc, setAsc] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:10000/api/project_assignments');
            console.log('Fetched Data:', res.data); // Check if data is being fetched
            let shuffled = res.data.sort(() => Math.random() - 0.5); // Shuffle the records randomly
            setData(shuffled); // Update the data with shuffled records
        } catch (err) {
            console.error("Error fetching data:", err.message);
        }
    };

    const handleSort = (key) => {
        const sortedData = [...data].sort((a, b) => {
            if (asc) {
                return (a[key] > b[key] ? 1 : -1);
            } else {
                return (a[key] < b[key] ? 1 : -1);
            }
        });
        setData(sortedData);
        setAsc(!asc);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('employee_id')}>Employee ID</th>
                        <th onClick={() => handleSort('employee_id')}>Employee Name</th>
                        <th onClick={() => handleSort('project_code')}>Project Name</th>
                        <th onClick={() => handleSort('start_date')}>Start Date</th>
                    </tr>
                </thead>
                <tbody>

    {data.length > 0 ? ( // Check if data is not empty
        data.map((a, i) => ( 
            <tr key={i}>
                <td>{a.employee_id?.employee_id || 'N/A'}</td>
                <td>{a.employee_id?.full_name || 'N/A'}</td>
                <td>{a.project_code?.project_name || 'N/A'}</td>
                <td>{a.start_date ? new Date(a.start_date).toLocaleDateString() : 'N/A'}</td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="4">No data available</td>
        </tr>
    )}
</tbody>
            </table>
        </div>
    );
}

export default AssignmentTable;