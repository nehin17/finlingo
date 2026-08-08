// src/components/home/MarketTicker.jsx

import { TrendingUp, TrendingDown } from 'lucide-react'


const tickerData = [

  { symbol: 'S&P 500', value: '5,234.18', change: '+0.84%', positive: true },

  { symbol: 'NASDAQ', value: '16,421.73', change: '+1.21%', positive: true },

  { symbol: 'DOW', value: '38,904.55', change: '-0.12%', positive: false },

  { symbol: 'BTC', value: '$67,840', change: '+2.10%', positive: true },

  { symbol: 'GOLD', value: '$2,341', change: '+0.37%', positive: true },

  { symbol: 'AAPL', value: '$178.42', change: '+1.24%', positive: true },

  { symbol: 'NVDA', value: '$875.40', change: '+4.28%', positive: true },

  { symbol: 'TSLA', value: '$175.21', change: '-1.84%', positive: false },

  { symbol: 'MSFT', value: '$415.32', change: '+0.93%', positive: true },

  { symbol: 'AMZN', value: '$183.47', change: '+1.58%', positive: true },

  { symbol: 'OIL (WTI)', value: '$82.14', change: '-0.43%', positive: false },

  { symbol: 'EUR/USD', value: '1.0842', change: '+0.12%', positive: true },

]



function TickerItem({ item }) {

  const Icon = item.positive
    ? TrendingUp
    : TrendingDown


  return (

    <div
      className="
        flex items-center gap-3
        px-6 py-2
        whitespace-nowrap
        border-r
      "
      style={{
        borderColor: 'var(--border)',
      }}
    >


      <span
        className="text-sm font-semibold"
        style={{
          color: 'var(--text)',
        }}
      >
        {item.symbol}
      </span>



      <span
        className="text-sm font-medium"
        style={{
          color: 'var(--text-muted)',
        }}
      >
        {item.value}
      </span>



      <div
        className="flex items-center gap-1 text-sm font-medium"
        style={{
          color: item.positive
            ? 'var(--success)'
            : 'var(--danger)',
        }}
      >

        <Icon size={14} />

        <span>
          {item.change}
        </span>

      </div>


    </div>

  )

}





export default function MarketTicker() {


  const items = [
    ...tickerData,
    ...tickerData
  ]



  return (

    <>

      {/* Ticker Animation */}

      <style>

        {`

          @keyframes ticker {

            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }

          }

        `}

      </style>




      <div

        className="
          h-14
          relative
          overflow-hidden
          flex
          items-center
          transition-colors
          duration-300
        "

        style={{

          background: 'var(--surface)',

          borderTop:
            '1px solid var(--border)',

          borderBottom:
            '1px solid var(--border)',

        }}

      >




        {/* Left Fade */}

        <div

          className="
            absolute
            left-0
            top-0
            bottom-0
            w-24
            z-10
            pointer-events-none
          "

          style={{

            background:
              'linear-gradient(to right, var(--surface), transparent)',

          }}

        />





        {/* Moving Track */}

        <div

          className="
            flex
            items-center
            min-w-max
          "

          style={{

            animation:
              'ticker 35s linear infinite',

            willChange:
              'transform',

          }}


          onMouseEnter={(e) => {

            e.currentTarget.style.animationPlayState =
              'paused'

          }}


          onMouseLeave={(e) => {

            e.currentTarget.style.animationPlayState =
              'running'

          }}

        >


          {
            items.map((item, index) => (

              <TickerItem

                key={`${item.symbol}-${index}`}

                item={item}

              />

            ))
          }


        </div>





        {/* Right Fade */}

        <div

          className="
            absolute
            right-0
            top-0
            bottom-0
            w-24
            z-10
            pointer-events-none
          "

          style={{

            background:
              'linear-gradient(to left, var(--surface), transparent)',

          }}

        />


      </div>

    </>

  )

}