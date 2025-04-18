import React, { useState } from 'react';
import Sidebar, { Tab } from './components/Sidebar';
import ContainerTab from './components/ContainerTab';
import ImageTab from './components/ImageTab';
import VolumeTab from './components/VolumeTab';
import NetworkTab from './components/NetworkTab';

export default function PodCommander() {
    const [tab, setTab] = useState<Tab>('containers');
    let Content;

    switch (tab) {
        case 'images':
            Content = <ImageTab />;
            break;
        case 'volumes':
            Content = <VolumeTab />;
            break;
        case 'networks':
            Content = <NetworkTab />;
            break;
        default:
            Content = <ContainerTab />;
    }

    return (
        <div style={{ display: 'flex', flex: 1, width: '100vw', height: '100vh', boxSizing: 'border-box' }}>
            <Sidebar active={tab} onSelect={setTab} />
            <div
                style={{
                    background: '#f4f4f9',
                    overflowY: 'auto',
                    flex: 1,
                    width: '100%',
                }}
            >
                {Content}
            </div>
        </div>
    );
}
