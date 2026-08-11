import { useId, useMemo, useState } from 'react'

import {

  ResponsiveContainer,

  AreaChart,

  Area,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

} from 'recharts'



const RANGES = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y']



export default function PriceChart({

  chart = [],

  loading = false,

}) {

  const [range, setRange] = useState('3M')

  const gradientId = useId()



  // Clean and sort API data

  const data = useMemo(() => {

    if (!Array.isArray(chart)) return []



    return chart

      .filter((point) => point?.timestamp && typeof point?.price === 'number')

      .sort((a, b) => a.timestamp - b.timestamp)

  }, [chart])



  // Calculate percentage change

  const performance = useMemo(() => {

    if (data.length < 2) return 0



    const first = data[0]?.price ?? 0

    const last = data[data.length - 1]?.price ?? 0



    if (first <= 0) return 0



    return ((last - first) / first) * 100

  }, [data])



  const positive = performance >= 0

  const strokeColor = positive ? '#10B981' : '#EF4444'



  return (

    <section

      className="rounded-3xl border border-border p-6 shadow-sm"

      style={{ background: 'var(--surface)' }}

    >

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

        <div>

          <h3 className="text-lg font-bold text-text-primary">

            Price Performance

          </h3>



          <p className="text-xs text-text-muted mt-1">

            {range} range ·{' '}

            <span

              className={

                positive

                  ? 'text-emerald-500 font-semibold'

                  : 'text-red-500 font-semibold'

              }

            >

              {positive ? '+' : ''}

              {performance.toFixed(2)}%

            </span>

          </p>

        </div>



        {/* Range buttons */}

        <div

          className="flex items-center gap-1 p-1 rounded-xl border border-border overflow-x-auto scrollbar-hide"

          style={{ background: 'var(--surface-elevated)' }}

        >

          {RANGES.map((r) => (

            <button

              key={r}

              onClick={() => setRange(r)}

              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${

                range === r

                  ? 'bg-blue-600 text-white shadow-sm'

                  : 'text-text-muted hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5'

              }`}

            >

              {r}

            </button>

          ))}

        </div>

      </div>



      {/* Chart */}

      <div className="h-72 w-full">

        {loading ? (

          <div

            className="h-full w-full rounded-2xl animate-pulse"

            style={{ background: 'var(--surface-elevated)' }}

          />

        ) : data.length === 0 ? (

          <div

            className="h-full w-full rounded-2xl border border-dashed border-border

                       flex items-center justify-center text-sm text-text-muted"

          >

            No chart data available

          </div>

        ) : (

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart

              data={data}

              margin={{ top: 10, right: 8, left: 0, bottom: 0 }}

            >

              <defs>

                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">

                  <stop

                    offset="0%"

                    stopColor={strokeColor}

                    stopOpacity={0.35}

                  />

                  <stop

                    offset="100%"

                    stopColor={strokeColor}

                    stopOpacity={0}

                  />

                </linearGradient>

              </defs>



              <CartesianGrid

                stroke="var(--border)"

                strokeDasharray="3 3"

                vertical={false}

              />



              <XAxis

                dataKey="timestamp"

                axisLine={false}

                tickLine={false}

                minTickGap={24}

                tick={{

                  fill: 'var(--text-muted)',

                  fontSize: 11,

                }}

                tickFormatter={(value) =>

                  new Date(value).toLocaleDateString('en-US', {

                    month: 'short',

                    day: 'numeric',

                  })

                }

              />



              <YAxis

                width={52}

                axisLine={false}

                tickLine={false}

                domain={[

                  (dataMin) => Math.floor(dataMin * 0.98),

                  (dataMax) => Math.ceil(dataMax * 1.02),

                ]}

                tick={{

                  fill: 'var(--text-muted)',

                  fontSize: 11,

                }}

                tickFormatter={(value) => `$${Number(value).toFixed(0)}`}

              />



              <Tooltip

                contentStyle={{

                  backgroundColor: 'var(--surface)',

                  border: '1px solid var(--border)',

                  borderRadius: '12px',

                  color: 'var(--text-primary)',

                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',

                  fontSize: '12px',

                }}

                labelStyle={{ color: 'var(--text-secondary)' }}

                labelFormatter={(value) =>

                  new Date(value).toLocaleString('en-US', {

                    month: 'short',

                    day: 'numeric',

                    hour: 'numeric',

                    minute: '2-digit',

                  })

                }

                formatter={(value) => [

                  `$${Number(value).toFixed(2)}`,

                  'Price',

                ]}

              />



              <Area

                type="monotone"

                dataKey="price"

                stroke={strokeColor}

                strokeWidth={2.5}

                fill={`url(#${gradientId})`}

                activeDot={{

                  r: 4,

                  strokeWidth: 2,

                  stroke: strokeColor,

                  fill: 'var(--surface)',

                }}

              />

            </AreaChart>

          </ResponsiveContainer>

        )}

      </div>

    </section>

  )

}