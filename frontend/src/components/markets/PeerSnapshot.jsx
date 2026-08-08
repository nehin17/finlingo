// src/components/markets/sections/PeerSnapshot.jsx
import { BarChart3 } from 'lucide-react';

export default function PeerSnapshot({ peers }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '18px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 22px 14px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <BarChart3 size={15} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
          <span style={{
            fontSize: '14px',
            fontWeight: '700',
            color: 'var(--text)',
          }}>
            Quick Peer Snapshot
          </span>
        </div>
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
        }}>
          Is this company expensive vs peers?
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '320px',
        }}>
          <thead>
            <tr style={{ background: 'var(--surface-hover)' }}>
              {['Company', 'Ticker', 'P/E Ratio', 'Revenue Growth'].map(h => (
                <th key={h} style={{
                  padding: '10px 22px',
                  textAlign: h === 'Company' || h === 'Ticker' ? 'left' : 'right',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {peers.map((row, i) => (
              <tr
                key={row.ticker}
                style={{
                  background: row.isSelf
                    ? 'color-mix(in srgb, var(--primary) 6%, transparent)'
                    : 'transparent',
                  borderBottom: i < peers.length - 1
                    ? '1px solid var(--border)'
                    : 'none',
                  transition: 'background 0.15s ease',
                }}
              >
                <td style={{
                  padding: '14px 22px',
                  fontSize: '13px',
                  fontWeight: row.isSelf ? '700' : '500',
                  color: row.isSelf ? 'var(--primary)' : 'var(--text)',
                  whiteSpace: 'nowrap',
                }}>
                  {row.company}
                  {row.isSelf && (
                    <span style={{
                      marginLeft: '7px',
                      fontSize: '9.5px',
                      fontWeight: '700',
                      color: 'var(--primary)',
                      background: 'color-mix(in srgb, var(--primary) 14%, transparent)',
                      borderRadius: '4px',
                      padding: '1px 6px',
                      letterSpacing: '0.04em',
                      verticalAlign: 'middle',
                    }}>
                      YOU
                    </span>
                  )}
                </td>
                <td style={{
                  padding: '14px 22px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text-muted)',
                  fontFamily: 'monospace',
                }}>
                  {row.ticker}
                </td>
                <td style={{
                  padding: '14px 22px',
                  textAlign: 'right',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {row.pe}
                </td>
                <td style={{
                  padding: '14px 22px',
                  textAlign: 'right',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--success)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {row.revenueGrowth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}