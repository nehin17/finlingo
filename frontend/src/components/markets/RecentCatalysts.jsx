// src/components/markets/sections/RecentCatalysts.jsx
import { Zap } from 'lucide-react';

export default function RecentCatalysts({ catalysts }) {
  return (
    <div>
      {/* Section heading */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        marginBottom: '20px',
      }}>
        <Zap size={15} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
        <h3 style={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'var(--text)',
          margin: 0,
        }}>
          Recent Catalysts
        </h3>
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          background: 'var(--surface-hover)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2px 9px',
        }}>
          Last 90 days
        </span>
      </div>

      {/* Timeline */}
      <div style={{
        position: 'relative',
        paddingLeft: '28px',
      }}>
        {/* Vertical connector line */}
        <div style={{
          position: 'absolute',
          left: '6px',
          top: '10px',
          bottom: '10px',
          width: '1.5px',
          background: 'var(--border)',
          borderRadius: '2px',
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {catalysts.map((item, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-25px',
                top: '14px',
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: index === 0 ? 'var(--primary)' : 'var(--surface)',
                border: `2px solid ${index === 0 ? 'var(--primary)' : 'var(--border)'}`,
                boxSizing: 'border-box',
                zIndex: 1,
              }} />

              {/* Card */}
              <div style={{
                background: 'var(--surface-hover)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '13px 16px',
                transition: 'border-color 0.18s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--primary) 35%, var(--border))'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                {/* Date */}
                <span style={{
                  display: 'block',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: index === 0 ? 'var(--primary)' : 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  marginBottom: '5px',
                }}>
                  {item.date}
                  {index === 0 && (
                    <span style={{
                      marginLeft: '7px',
                      fontSize: '9px',
                      fontWeight: '700',
                      color: 'var(--primary)',
                      background: 'color-mix(in srgb, var(--primary) 13%, transparent)',
                      borderRadius: '4px',
                      padding: '1px 6px',
                      verticalAlign: 'middle',
                    }}>
                      LATEST
                    </span>
                  )}
                </span>
                {/* Text */}
                <p style={{
                  fontSize: '13.5px',
                  color: 'var(--text)',
                  lineHeight: 1.55,
                  margin: 0,
                  fontWeight: '400',
                }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}