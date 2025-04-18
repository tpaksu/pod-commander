import React from 'react';
import { FaBox, FaImages, FaHdd, FaNetworkWired } from 'react-icons/fa';

export type Tab = 'containers' | 'images' | 'volumes' | 'networks';

interface Props {
    active: Tab;
    onSelect: (t: Tab) => void;
}

export default function Sidebar({ active, onSelect }: Props) {
    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: 'containers', label: 'Containers', icon: <FaBox /> },
        { id: 'images', label: 'Images', icon: <FaImages /> },
        { id: 'volumes', label: 'Volumes', icon: <FaHdd /> },
        { id: 'networks', label: 'Networks', icon: <FaNetworkWired /> },
    ];

    return (
        <nav
            style={{
                width: 150,
                background: '#DDEAF6',
                color: '#fff',
                padding: '1rem',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src='/assets/logo.png' alt='Logo' style={{ width: '100%', margin: -20 }} />
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {tabs.map(({ id, label, icon }) => (
                    <li key={id} style={{ marginBottom: '0.75rem' }}>
                        <button
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: id === active ? '#2d2d44' : '#fff',
                                color: id === active ? '#fff' : '#000',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                transition: 'background 0.3s',
                            }}
                            onClick={() => onSelect(id)}
                        >
                            {icon}
                            <span>{label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
