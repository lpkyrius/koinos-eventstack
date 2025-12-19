import React from 'react';

export default function DashboardPage() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Dashboard Placeholder</h1>
            <p>Congratulations! You have successfully signed in.</p>
            <a href="/auth" style={{ color: 'var(--primary)', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
                Back to Auth
            </a>
        </div>
    );
}
