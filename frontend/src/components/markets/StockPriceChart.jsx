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

const RANGE_CONFIG = {
  '1D': {
    points: 48,
    span: 24 * 60 * 60 * 1000,
    volatility: 0.004,
  },
  '1W': {
    points: 56,
    span: 7 * 24 * 60 * 60 * 1000,
    volatility: 0.009,
  },
  '1M': {
    points: 45,
    span: 30 * 24 * 60 * 60 * 1000,
    volatility: 0.018,
  },
  '3M': {
    points: 60,
    span: 90 * 24 * 60 * 60 * 1000,
    volatility: 0.028,
  },
  '6M': {
    points: 60,
    span: 180 * 24 * 60 * 60 * 1000,
    volatility: 0.04,
  },
  '1Y': {
    points: 60,
    span: 365 * 24 * 60 * 60 * 1000,
    volatility: 0.065,
  },
  '5Y': {
    points: 60,
    span: 5 * 365 * 24 * 60 * 60 * 1000,
    volatility: 0.12,
  },
};

const RANGES = Object.keys(RANGE_CONFIG);

function hashString(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createRandom(seed) {
  let state = seed;

  return function random() {
    state += 0x6d2b79f5;

    let result = state;

    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);

    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function formatAxisDate(date, range) {
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

function generatePriceData(stock, range) {
  const config = RANGE_CONFIG[range];
  const random = createRandom(
    hashString(`${stock.ticker}-${range}`)
  );

  const returnPercentage =
    stock.chartPerformance?.[range] ?? stock.change ?? 0;

  const targetReturn = Math.max(
    -0.9,
    returnPercentage / 100
  );

  const finalPrice = stock.price;
  const startingPrice = finalPrice / (1 + targetReturn);
  const endTime = Date.now();
  const startTime = endTime - config.span;

  const rawNoise = [0];

  for (let index = 1; index < config.points; index += 1) {
    rawNoise.push(
      rawNoise[index - 1] + (random() - 0.5)
    );
  }

  const finalNoise = rawNoise[rawNoise.length - 1];

  return rawNoise.map((noise, index) => {
    const progress = index / (config.points - 1);

    const trendPrice =
      startingPrice +
      (finalPrice - startingPrice) * progress;

    // Bridge the noise back to zero at the final point.
    const bridgedNoise =
      noise - finalNoise * progress;

    const price = Math.max(
      0.01,
      trendPrice +
        bridgedNoise *
          finalPrice *
          config.volatility
    );

    const date = new Date(
      startTime + config.span * progress
    );

    return {
      price:
        index === config.points - 1
          ? finalPrice
          : Number(price.toFixed(2)),
      timestamp: date.getTime(),
      label: formatAxisDate(date, range),
      fullDate: new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour:
          range === '1D' || range === '1W'
            ? 'numeric'
            : undefined,
        minute: range === '1D' ? '2-digit' : undefined,
      }).format(date),
    };
  });
}

function formatCurrency(value, stock) {
  const isIndian =
    stock.exchange === 'NSE' || stock.exchange === 'BSE';

  return new Intl.NumberFormat(
    isIndian ? 'en-IN' : 'en-US',
    {
      style: 'currency',
      currency: isIndian ? 'INR' : 'USD',
      maximumFractionDigits: 2,
    }
  ).format(value);
}

function ChartTooltip({
  active,
  payload,
  stock,
}) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div className="price-chart-tooltip">
      <span>{point.fullDate}</span>
      <strong>
        {formatCurrency(point.price, stock)}
      </strong>
    </div>
  );
}

export default function StockPriceChart({ stock }) {
  const [range, setRange] = useState('1M');

  const data = useMemo(
    () => generatePriceData(stock, range),
    [stock, range]
  );

  const firstPrice = data[0]?.price ?? stock.price;
  const lastPrice =
    data[data.length - 1]?.price ?? stock.price;

  const positive = lastPrice >= firstPrice;

  const performance =
    firstPrice > 0
      ? ((lastPrice - firstPrice) / firstPrice) * 100
      : 0;

  const prices = data.map((point) => point.price);
  const minimum = Math.min(...prices);
  const maximum = Math.max(...prices);
  const padding = Math.max(
    (maximum - minimum) * 0.16,
    maximum * 0.01
  );

  const gradientId = `price-gradient-${stock.ticker.replace(
    /[^a-zA-Z0-9]/g,
    ''
  )}-${range}`;

  return (
    <section className="price-chart-card">
      <header className="price-chart-header">
        <div>
          <span className="section-eyebrow">
            Price Performance
          </span>

          <div className="price-chart-title">
            <h2>{range} price history</h2>

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
                item === range ? 'is-active' : ''
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
        <ResponsiveContainer width="100%" height={340}>
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
                Math.max(0, minimum - padding),
                maximum + padding,
              ]}
              tickFormatter={(value) =>
                formatCurrency(value, stock)
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
                stroke: 'var(--text-muted)',
                strokeOpacity: 0.5,
                strokeDasharray: '4 4',
              }}
              content={
                <ChartTooltip stock={stock} />
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
      </div>

      <footer className="price-chart-footer">
        <span>
          Mock market data for frontend development
        </span>
        <span>
          Updated {stock.status.updated} {stock.status.timezone}
        </span>
      </footer>
    </section>
  );
}