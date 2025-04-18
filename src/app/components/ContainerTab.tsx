import Dockerode from 'dockerode';
import React, { useEffect, useState } from 'react';

export default function ContainerTab() {
    const [containers, setContainers] = useState<Dockerode.ContainerInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await window.dockerAPI.listContainers();
                setContainers(data);
            } catch (error) {
                console.error('Error fetching containers:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div>Loading containers...</div>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>Containers</h2>
            {containers.length === 0 ? (
                <p>No containers found</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {containers.map((container) => (
                            <tr key={container.Id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{container.Names?.[0]?.substring(1) || container.Id.substring(0, 12)}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{container.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
