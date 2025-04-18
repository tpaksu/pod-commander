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
            {nets.length === 0 ? (
                <p>No networks found</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Driver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nets.map((network) => (
                            <tr key={network.Id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{network.Name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{network.Driver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
