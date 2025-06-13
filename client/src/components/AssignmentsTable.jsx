import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssignmentTable() {
    const [data, setData] = useState([]);
    const [asc, setAsc] = useState(false);
    const [sortKey, setSortKey] = useState('start_date'); // Default sort key

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/project_assignments');
            console.log('Fetched Data:', res.data);
            setData(res.data);
        } catch (err) {
            console.error("Error fetching data:", err.message);
        }
    };

    const handleSort = (key) => {
        const sortedData = [...data].sort((a, b) => {
            let aValue, bValue;

            switch (key) {
                case 'employee_id':
                    aValue = a.employee_id?.employee_id || '';
                    bValue = b.employee_id?.employee_id || '';
                    break;
                case 'employee_name':
                    aValue = a.employee_id?.full_name || '';
                    bValue = b.employee_id?.full_name || '';
                    break;
                case 'project_name':
                    aValue = a.project_code?.project_name || '';
                    bValue = b.project_code?.project_name || '';
                    break;
                case 'start_date':
                    aValue = a.start_date || '';
                    bValue = b.start_date || '';
                    break;
                default:
                    return 0;
            }

            if (asc) {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setData(sortedData);
        setAsc(!asc);
        setSortKey(key);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); // Hämta ny data varje 10 sek
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Latest 5 Project Assignments</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('employee_id')}>Employee ID</th>
                        <th onClick={() => handleSort('employee_name')}>Employee Name</th>
                        <th onClick={() => handleSort('project_name')}>Project Name</th>
                        <th onClick={() => handleSort('start_date')}>Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
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
