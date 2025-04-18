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
    <nav style={{ width: 250, background: '#1e1e2f', color: '#fff', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {tabs.map(({ id, label, icon }) => (
          <li key={id} style={{ marginBottom: '1rem' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: id === active ? '#2d2d44' : 'transparent',
                color: '#fff',
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
