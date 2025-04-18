import Dockerode from 'dockerode';
import React, { useEffect, useState } from 'react';

export default function VolumeTab() {
  const [vols, setVols] = useState<Dockerode.VolumeInspectInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await window.dockerAPI.listVolumes();
        setVols(data);
      } catch (error) {
        console.error('Error fetching volumes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '1rem' }}>Loading volumes...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>Volumes</h2>
      {vols.length === 0 ? (
        <p>No volumes found</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Driver</th>
            </tr>
          </thead>
          <tbody>
            {vols.map((v) => (
              <tr key={v.Name}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{v.Name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{v.Driver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
