
function formatMarketCap(value) {
  const v = Number(value)

  if (!Number.isFinite(v) || v === 0) return '—'
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`

  return `$${v.toLocaleString()}`
}

function formatNumber(value, decimals = 1) {
  const v = Number(value)

  if (!Number.isFinite(v)) return '—'

  return v.toFixed(decimals)
}

export default function PeerComparisonSection({
  peers = [],
  selectedTicker,
  loading,
}) {
  /*
    Expected API shape:

    peers: [
      {
        ticker: "AAPL",
        name: "Apple Inc.",
        marketCap: 3500000000000,
        pe: 32.5,
        revenueGrowth: 8.4,
        operatingMargin: 31.2
      }
    ]

    selectedTicker:
      "AAPL"

    loading:
      true / false
  */

  if (loading) {
    return (
      <div
        className="rounded-3xl border border-border p-6 h-64 animate-pulse"
        style={{ background: 'var(--surface)' }}
      />
    )
  }

  const safePeers = Array.isArray(peers) ? peers : []

  // Best-in-class values.
  // Filter out invalid API values before calculating.
  const growthValues = safePeers
    .map((p) => Number(p?.revenueGrowth))
    .filter(Number.isFinite)

  const marginValues = safePeers
    .map((p) => Number(p?.operatingMargin))
    .filter(Number.isFinite)

  const peValues = safePeers
    .map((p) => Number(p?.pe))
    .filter(Number.isFinite)

  const bestGrowth =
    growthValues.length > 0 ? Math.max(...growthValues) : null

  const bestMargin =
    marginValues.length > 0 ? Math.max(...marginValues) : null

  const bestPE =
    peValues.length > 0 ? Math.min(...peValues) : null

  return (
    <section
      className="rounded-3xl border border-border p-6 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">
            Peer Comparison
          </h3>

          <p className="text-xs text-text-muted mt-0.5">
            Comparison against selected peer companies
          </p>
        </div>

        {safePeers.length > 0 && (
          <span className="text-[10px] font-semibold text-text-muted">
            {safePeers.length} companies
          </span>
        )}
      </div>

      {safePeers.length === 0 ? (
        <div
          className="rounded-xl border border-border p-8 text-center"
          style={{ background: 'var(--surface-elevated)' }}
        >
          <p className="text-sm font-semibold text-text-primary">
            No peer data available
          </p>

          <p className="text-xs text-text-muted mt-1">
            Peer comparison data could not be loaded.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm tabular-nums">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-text-muted">
                <th className="text-left font-semibold py-2 pl-2">
                  Company
                </th>

                <th className="text-right font-semibold py-2 px-3">
                  Market Cap
                </th>

                <th className="text-right font-semibold py-2 px-3">
                  P/E
                </th>

                <th className="text-right font-semibold py-2 px-3">
                  Rev Growth
                </th>

                <th className="text-right font-semibold py-2 px-3">
                  Op. Margin
                </th>
              </tr>
            </thead>

            <tbody>
              {safePeers.map((peer, index) => {
                const ticker = peer?.ticker || '—'
                const name = peer?.name || 'Unknown company'

                const pe = Number(peer?.pe)
                const revenueGrowth = Number(peer?.revenueGrowth)
                const operatingMargin = Number(peer?.operatingMargin)

                const isSelected =
                  ticker.toUpperCase() === selectedTicker?.toUpperCase()

                const isBestPE =
                  Number.isFinite(pe) &&
                  bestPE !== null &&
                  pe === bestPE

                const isBestGrowth =
                  Number.isFinite(revenueGrowth) &&
                  bestGrowth !== null &&
                  revenueGrowth === bestGrowth

                const isBestMargin =
                  Number.isFinite(operatingMargin) &&
                  bestMargin !== null &&
                  operatingMargin === bestMargin

                return (
                  <tr
                    key={`${ticker}-${index}`}
                    className={
                      isSelected
                        ? 'ring-1 ring-blue-500/40'
                        : ''
                    }
                    style={{
                      background: isSelected
                        ? 'rgba(37, 99, 235, 0.08)'
                        : index % 2
                          ? 'var(--surface-elevated)'
                          : 'transparent',
                    }}
                  >
                    {/* Company */}
                    <td className="py-2.5 pl-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-md bg-blue-600/10
                                     flex items-center justify-center
                                     text-[10px] font-bold text-blue-500"
                        >
                          {ticker !== '—'
                            ? ticker.slice(0, 2).toUpperCase()
                            : '—'}
                        </span>

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-text-primary">
                            {ticker}
                          </p>

                          <p className="text-[10px] text-text-muted truncate max-w-[180px]">
                            {name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Market Cap */}
                    <td className="text-right py-2.5 px-3 text-text-secondary">
                      {formatMarketCap(peer?.marketCap)}
                    </td>

                    {/* P/E */}
                    <td
                      className={`text-right py-2.5 px-3 ${
                        isBestPE
                          ? 'text-emerald-500 font-bold'
                          : 'text-text-secondary'
                      }`}
                    >
                      {Number.isFinite(pe)
                        ? `${formatNumber(pe)}x`
                        : '—'}
                    </td>

                    {/* Revenue Growth */}
                    <td
                      className={`text-right py-2.5 px-3 ${
                        isBestGrowth
                          ? 'text-emerald-500 font-bold'
                          : 'text-text-secondary'
                      }`}
                    >
                      {Number.isFinite(revenueGrowth)
                        ? `${revenueGrowth > 0 ? '+' : ''}${formatNumber(
                            revenueGrowth
                          )}%`
                        : '—'}
                    </td>

                    {/* Operating Margin */}
                    <td
                      className={`text-right py-2.5 px-3 ${
                        isBestMargin
                          ? 'text-emerald-500 font-bold'
                          : 'text-text-secondary'
                      }`}
                    >
                      {Number.isFinite(operatingMargin)
                        ? `${formatNumber(operatingMargin)}%`
                        : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

