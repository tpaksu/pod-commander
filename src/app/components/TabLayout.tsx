import React from 'react';
export default function TabLayout({ children }: { children: React.ReactNode }) {
    return <div style={{ padding: '1rem', background: '#f4f4f9', minHeight: '100vh' }}>{children}</div>;
}
