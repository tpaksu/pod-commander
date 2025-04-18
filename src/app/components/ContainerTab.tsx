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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {containers.map((container) => (
                        <div
                            key={container.Id}
                            style={{
                                background: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                padding: '1rem',
                            }}
                        >
                            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e1e2f' }}>{container.Names?.[0]?.substring(1) || container.Id.substring(0, 12)}</h3>
                            <p style={{ margin: '0.5rem 0', color: '#666' }}>Status: {container.Status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
