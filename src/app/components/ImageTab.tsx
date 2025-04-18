import Dockerode from 'dockerode';
import React, { useEffect, useState } from 'react';

export default function ImageTab() {
    const [images, setImages] = useState<Dockerode.ImageInspectInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await window.dockerAPI.listImages();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div>Loading images...</div>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>Images</h2>
            {images.length === 0 ? (
                <p>No images found</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {images.map((image) => (
                        <div
                            key={image.Id}
                            style={{
                                background: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                padding: '1rem',
                            }}
                        >
                            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e1e2f' }}>{image.RepoTags?.join(', ') || '<none>'}</h3>
                            <p style={{ margin: '0.5rem 0', color: '#666' }}>Size: {(image.Size / 1e6).toFixed(1)} MB</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
