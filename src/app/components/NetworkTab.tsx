import Dockerode from 'dockerode';
import React, { useEffect, useState } from 'react';

export default function NetworkTab() {
    const [nets, setNets] = useState<Dockerode.NetworkInspectInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await window.dockerAPI.listNetworks();
                setNets(data);
            } catch (error) {
                console.error('Error fetching networks:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div>Loading networks...</div>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>Networks</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {nets.length === 0 ? (
                    <p>No networks found</p>
                ) : (
                    nets.map((network) => (
                        <div
                            key={network.Id}
                            style={{
                                background: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                padding: '1rem',
                            }}
                        >
                            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e1e2f' }}>{network.Name}</h3>
                            <p style={{ margin: '0.5rem 0', color: '#666' }}>Driver: {network.Driver}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
