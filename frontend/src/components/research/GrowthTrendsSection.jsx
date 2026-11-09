import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
  } from 'recharts'
  
  export default function GrowthTrendsSection({
    growth = [],
    loading = false,
  }) {
    const safeGrowth = Array.isArray(growth)
      ? growth.filter((series) => series && typeof series === 'object')
      : []
  
    if (loading) {
      return (
        <section
          className="rounded-3xl border border-border p-6 shadow-sm"
          style={{ background: 'var(--surface)' }}
        >
          <div
            className="h-6 w-40 rounded animate-pulse mb-4"
            style={{ background: 'var(--surface-elevated)' }}
          />
  
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-4"
                style={{ background: 'var(--surface-elevated)' }}
              >
                <div
                  className="h-4 w-24 rounded animate-pulse mb-3"
                  style={{ background: 'var(--surface)' }}
                />
  
                <div
                  className="h-32 rounded animate-pulse"
                  style={{ background: 'var(--surface)' }}
                />
              </div>
            ))}
          </div>
        </section>
      )
    }
  
    return (
      <section
        className="rounded-3xl border border-border p-6 shadow-sm"
        style={{ background: 'var(--surface)' }}
      >
        <h3 className="text-lg font-bold text-text-primary mb-4">
          Growth Trends
        </h3>
  
        {safeGrowth.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-text-muted">
              No growth data available.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {safeGrowth.map((series, index) => {
              const label =
                typeof series.label === 'string' && series.label.trim()
                  ? series.label
                  : `Growth ${index + 1}`
  
              const data = Array.isArray(series.data)
                ? series.data
                    .filter(
                      (point) =>
                        point &&
                        point.period != null &&
                        point.value != null
                    )
                    .map((point) => ({
                      period: String(point.period),
                      value: Number(point.value),
                    }))
                    .filter((point) => Number.isFinite(point.value))
                : []
  
              return (
                <div
                  key={`${label}-${index}`}
                  className="rounded-xl border border-border p-4"
                  style={{ background: 'var(--surface-elevated)' }}
                >
                  <p className="text-xs font-semibold text-text-secondary mb-2">
                    {label}
                  </p>
  
                  {data.length < 2 ? (
                    <div className="h-32 flex items-center justify-center">
                      <p className="text-xs text-text-muted">
                        Not enough data available.
                      </p>
                    </div>
                  ) : (
                    <div className="h-32 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={data}
                          margin={{
                            top: 4,
                            right: 4,
                            left: -20,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid
                            stroke="var(--border)"
                            strokeDasharray="3 3"
                            vertical={false}
                          />
  
                          <XAxis
                            dataKey="period"
                            tick={{
                              fill: 'var(--text-muted)',
                              fontSize: 10,
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
  
                          <YAxis
                            tick={{
                              fill: 'var(--text-muted)',
                              fontSize: 10,
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
  
                          <Tooltip
                            contentStyle={{
                              background: 'var(--surface)',
                              border: '1px solid var(--border)',
                              borderRadius: 10,
                              fontSize: 11,
                            }}
                            labelStyle={{
                              color: 'var(--text-primary)',
                            }}
                            formatter={(value) => [
                              `${Number(value).toFixed(2)}%`,
                              label,
                            ]}
                          />
  
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#2563EB"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                            connectNulls
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>
    )
  }