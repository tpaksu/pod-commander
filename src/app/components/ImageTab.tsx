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
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Repository</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Size (MB)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((image) => (
                            <tr key={image.Id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{image.RepoTags?.join(', ') || '<none>'}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{(image.Size / 1e6).toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
