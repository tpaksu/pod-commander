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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {vols.map((v) => (
            <div
              key={v.Name}
              style={{
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '1rem',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e1e2f' }}>{v.Name}</h3>
              <p style={{ margin: '0.5rem 0', color: '#666' }}>Driver: {v.Driver}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
