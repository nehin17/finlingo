
// src/components/markets/sections/PeerSnapshot.jsx
import { BarChart3 } from 'lucide-react';

export default function PeerSnapshot({ peers = [] }) {
  return (
    <section
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '18px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '18px 22px 14px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            minWidth: 0,
          }}
        >
          <BarChart3
            size={15}
            strokeWidth={2}
            style={{
              color: 'var(--text-muted)',
              flexShrink: 0,
            }}
          />

          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--text)',
              }}
            >
              Quick Peer Snapshot
            </div>

            <div
              style={{
                marginTop: '3px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
              }}
            >
              Is this company expensive vs peers?
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {peers.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              minWidth: '520px',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr
                style={{
                  background: 'var(--surface-hover)',
                }}
              >
                {[
                  'Company',
                  'Ticker',
                  'P/E Ratio',
                  'Revenue Growth',
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: '10px 22px',
                      textAlign:
                        heading === 'Company' || heading === 'Ticker'
                          ? 'left'
                          : 'right',
                      fontSize: '10.5px',
                      fontWeight: '700',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      borderBottom: '1px solid var(--border)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {peers.map((row, index) => {
                const growth =
                  typeof row.revenueGrowth === 'string'
                    ? parseFloat(row.revenueGrowth)
                    : row.revenueGrowth;

                const growthPositive = Number.isFinite(growth)
                  ? growth >= 0
                  : true;

                return (
                  <tr
                    key={row.ticker}
                    style={{
                      background: row.isSelf
                        ? 'color-mix(in srgb, var(--primary) 6%, transparent)'
                        : 'transparent',
                    }}
                  >
                    {/* Company */}
                    <td
                      style={{
                        padding: '14px 22px',
                        fontSize: '13px',
                        fontWeight: row.isSelf ? '700' : '500',
                        color: row.isSelf
                          ? 'var(--primary)'
                          : 'var(--text)',
                        borderBottom:
                          index < peers.length - 1
                            ? '1px solid var(--border)'
                            : 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.company}

                      {row.isSelf && (
                        <span
                          style={{
                            marginLeft: '7px',
                            padding: '1px 6px',
                            color: 'var(--primary)',
                            background:
                              'color-mix(in srgb, var(--primary) 14%, transparent)',
                            borderRadius: '4px',
                            fontSize: '9.5px',
                            fontWeight: '700',
                            letterSpacing: '0.04em',
                            verticalAlign: 'middle',
                          }}
                        >
                          YOU
                        </span>
                      )}
                    </td>

                    {/* Ticker */}
                    <td
                      style={{
                        padding: '14px 22px',
                        color: 'var(--text-muted)',
                        fontFamily: 'monospace',
                        fontSize: '13px',
                        fontWeight: '600',
                        borderBottom:
                          index < peers.length - 1
                            ? '1px solid var(--border)'
                            : 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.ticker}
                    </td>

                    {/* P/E */}
                    <td
                      style={{
                        padding: '14px 22px',
                        color: 'var(--text)',
                        fontSize: '13px',
                        fontWeight: '600',
                        textAlign: 'right',
                        fontVariantNumeric: 'tabular-nums',
                        borderBottom:
                          index < peers.length - 1
                            ? '1px solid var(--border)'
                            : 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.pe}
                    </td>

                    {/* Revenue Growth */}
                    <td
                      style={{
                        padding: '14px 22px',
                        color: growthPositive
                          ? 'var(--success)'
                          : 'var(--danger)',
                        fontSize: '13px',
                        fontWeight: '700',
                        textAlign: 'right',
                        fontVariantNumeric: 'tabular-nums',
                        borderBottom:
                          index < peers.length - 1
                            ? '1px solid var(--border)'
                            : 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {growthPositive ? '+' : ''}
                      {row.revenueGrowth}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            padding: '28px 22px',
            color: 'var(--text-muted)',
            fontSize: '12px',
            textAlign: 'center',
          }}
        >
          No peer comparison data available.
        </div>
      )}
    </section>
  );
}

