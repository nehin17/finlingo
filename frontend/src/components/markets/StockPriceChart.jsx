import { useMemo, useState } from 'react';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const RANGES = [
  '1D',
  '1W',
  '1M',
  '3M',
  '6M',
  '1Y',
  '5Y',
];

function isIndianExchange(exchange) {
  return exchange === 'NSE' || exchange === 'BSE';
}

function formatCurrency(value, stock) {
  const isIndian = isIndianExchange(stock?.exchange);

  return new Intl.NumberFormat(
    isIndian ? 'en-IN' : 'en-US',
    {
      style: 'currency',
      currency: isIndian ? 'INR' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(Number(value) || 0);
}

function formatAxisDate(timestamp, range) {
  const date = new Date(timestamp);

  if (range === '1D') {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  }

  if (range === '1W') {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
    }).format(date);
  }

  if (range === '5Y') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: '2-digit',
    }).format(date);
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function formatFullDate(timestamp, range) {
  const date = new Date(timestamp);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour:
      range === '1D' || range === '1W'
        ? 'numeric'
        : undefined,
    minute:
      range === '1D'
        ? '2-digit'
        : undefined,
  }).format(date);
}

function normalizeChartData(chartData, range) {
  const points = chartData?.[range];

  if (!Array.isArray(points)) {
    return [];
  }

  return points
    .filter(
      (point) =>
        point &&
        Number.isFinite(Number(point.price)) &&
        Number.isFinite(Number(point.timestamp))
    )
    .map((point) => ({
      price: Number(point.price),
      timestamp: Number(point.timestamp),
      label: formatAxisDate(
        Number(point.timestamp),
        range
      ),
      fullDate: formatFullDate(
        Number(point.timestamp),
        range
      ),
    }));
}

function ChartTooltip({
  active,
  payload,
  stock,
  range,
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload;

  if (!point) {
    return null;
  }

  return (
    <div className="price-chart-tooltip">
      <span>
        {formatFullDate(point.timestamp, range)}
      </span>

      <strong>
        {formatCurrency(point.price, stock)}
      </strong>
    </div>
  );
}

export default function StockPriceChart({
  stock,
  chartData = {},
  isLoading = false,
}) {
  const [range, setRange] = useState('1M');

  const data = useMemo(
    () => normalizeChartData(chartData, range),
    [chartData, range]
  );

  const firstPrice = data[0]?.price ?? null;
  const lastPrice =
    data[data.length - 1]?.price ?? null;

  const performance =
    firstPrice !== null &&
    firstPrice > 0 &&
    lastPrice !== null
      ? ((lastPrice - firstPrice) / firstPrice) * 100
      : null;

  const positive =
    performance === null
      ? true
      : performance >= 0;

  const prices = data.map((point) => point.price);

  const minimum =
    prices.length > 0
      ? Math.min(...prices)
      : Number(stock?.price) || 0;

  const maximum =
    prices.length > 0
      ? Math.max(...prices)
      : Number(stock?.price) || 0;

  const padding = Math.max(
    (maximum - minimum) * 0.16,
    maximum * 0.01,
    0.01
  );

  const gradientId = `price-gradient-${String(
    stock?.ticker ?? 'stock'
  ).replace(/[^a-zA-Z0-9]/g, '')}-${range}`;

  return (
    <section className="price-chart-section">
      <header className="price-chart-header">
        <div>
          <span className="section-eyebrow">
            Price Performance
          </span>

          <div className="price-chart-title">
            <h2>{range} price history</h2>

            {performance !== null && (
              <span
                className={
                  positive
                    ? 'market-value-positive'
                    : 'market-value-negative'
                }
              >
                {positive ? '+' : ''}
                {performance.toFixed(2)}%
              </span>
            )}
          </div>
        </div>

        <div
          className="chart-range-controls"
          aria-label="Chart time range"
        >
          {RANGES.map((item) => (
            <button
              key={item}
              type="button"
              className={
                item === range
                  ? 'is-active'
                  : ''
              }
              onClick={() => setRange(item)}
              aria-pressed={item === range}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <div className="price-chart-canvas">
        {isLoading ? (
          <div
            className="stock-chart-loading"
            role="status"
            aria-live="polite"
          >
            Loading price history...
          </div>
        ) : data.length === 0 ? (
          <div
            className="stock-chart-empty"
            role="status"
          >
            <strong>
              No historical data available
            </strong>

            <p>
              Price history for {range} is
              currently unavailable.
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={340}
          >
            <AreaChart
              data={data}
              margin={{
                top: 16,
                right: 10,
                bottom: 0,
                left: 4,
              }}
            >
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={
                      positive
                        ? 'var(--success)'
                        : 'var(--danger)'
                    }
                    stopOpacity={0.24}
                  />

                  <stop
                    offset="100%"
                    stopColor={
                      positive
                        ? 'var(--success)'
                        : 'var(--danger)'
                    }
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="var(--border)"
                strokeOpacity={0.55}
                vertical={false}
              />

              <XAxis
                dataKey="label"
                minTickGap={30}
                tick={{
                  fill: 'var(--text-muted)',
                  fontSize: 11,
                }}
                tickLine={false}
                axisLine={{
                  stroke: 'var(--border)',
                }}
              />

              <YAxis
                orientation="right"
                domain={[
                  Math.max(
                    0,
                    minimum - padding
                  ),
                  maximum + padding,
                ]}
                tickFormatter={(value) =>
                  formatCurrency(
                    value,
                    stock
                  )
                }
                tick={{
                  fill: 'var(--text-muted)',
                  fontSize: 11,
                }}
                tickLine={false}
                axisLine={false}
                width={78}
              />

              <Tooltip
                cursor={{
                  stroke:
                    'var(--text-muted)',
                  strokeOpacity: 0.5,
                  strokeDasharray:
                    '4 4',
                }}
                content={
                  <ChartTooltip
                    stock={stock}
                    range={range}
                  />
                }
              />

              <Area
                type="monotone"
                dataKey="price"
                stroke={
                  positive
                    ? 'var(--success)'
                    : 'var(--danger)'
                }
                strokeWidth={2.25}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: 'var(--surface)',
                  stroke: positive
                    ? 'var(--success)'
                    : 'var(--danger)',
                }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <footer className="price-chart-footer">
        <span>
          Historical market data
        </span>

        <span>
          Updated{' '}
          {stock?.status?.updated ?? '—'}{' '}
          {stock?.status?.timezone ?? ''}
        </span>
      </footer>
    </section>
  );
}