import React from 'react';
import { Compass, Users, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  activeId: string;
  setActiveId: (id: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ activeId, setActiveId }) => {
  // Format the active ID into a title
  const getCleanTitle = () => {
    const parts = activeId.split('-');
    if (parts.length === 2) {
      const module = parts[0].toUpperCase();
      const componentName = parts[1].replace(/([A-Z])/g, ' $1').trim();
      return `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} (Module: ${module})`;
    }
    return activeId.charAt(0).toUpperCase() + activeId.slice(1);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '40px 20px'
    }} className="fade-in">
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        marginBottom: '24px',
        boxShadow: 'inset 0 0 12px rgba(255,255,255,0.05)'
      }}>
        <Compass size={36} className="pulse-animation" />
      </div>

      <h1 style={{
        fontSize: '26px',
        fontWeight: 700,
        marginBottom: '12px',
        letterSpacing: '-0.5px'
      }}>
        {getCleanTitle()}
      </h1>

      <p style={{
        color: 'var(--text-secondary)',
        maxWidth: '480px',
        lineHeight: 1.6,
        fontSize: '15px',
        marginBottom: '32px'
      }}>
        This module is currently stubbed out for the dashboard outline. You can explore the fully-functional CRM & Sales experience in the sidebar.
      </p>

      <div style={{
        padding: '24px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(168,85,247,0.07) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600 }}>
          <Sparkles size={16} />
          <span>Active Demo Module Available</span>
        </div>
        <button 
          onClick={() => setActiveId('crm-overview')}
          className="btn btn-primary"
          style={{
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}
        >
          <Users size={18} />
          Go to CRM & Sales
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .pulse-animation {
          animation: pulse 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
