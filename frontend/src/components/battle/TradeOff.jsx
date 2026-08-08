import { motion } from 'framer-motion'

export default function TradeoffSection({
  leftCompany,
  rightCompany,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-8 mb-12 border"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >

      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: 'var(--text)' }}
      >
        The Trade-Off
      </h2>


      <div className="grid md:grid-cols-2 gap-8 mb-8">

        {/* LEFT COMPANY */}

        <div>

          <h4
            className="font-semibold text-xl mb-4"
            style={{ color: 'var(--text)' }}
          >
            {leftCompany?.ticker}
          </h4>


          <ul className="space-y-3 text-base">

            <li className="flex gap-3 items-start">
              <span
                className="font-bold text-lg mt-0.5"
                style={{ color: 'var(--success)' }}
              >
                ✓
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                Strong AI-driven revenue expansion
              </span>
            </li>


            <li className="flex gap-3 items-start">
              <span
                className="font-bold text-lg mt-0.5"
                style={{ color: 'var(--success)' }}
              >
                ✓
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                Industry-leading operating margins
              </span>
            </li>


            <li className="flex gap-3 items-start">
              <span
                className="font-bold text-lg mt-0.5"
                style={{ color: '#F59E0B' }}
              >
                ⚠
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                Premium valuation implies continued high growth expectations
              </span>
            </li>


            <li className="flex gap-3 items-start">
              <span
                className="font-bold text-lg mt-0.5"
                style={{ color: '#F59E0B' }}
              >
                ⚠
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                More sensitive to execution and demand-cycle risk
              </span>
            </li>

          </ul>

        </div>



        {/* RIGHT COMPANY */}

        <div>

          <h4
            className="font-semibold text-xl mb-4"
            style={{ color: 'var(--text)' }}
          >
            {rightCompany?.ticker}
          </h4>


          <ul className="space-y-3 text-base">

            <li className="flex gap-3 items-start">
              <span
                className="font-bold text-lg mt-0.5"
                style={{ color: 'var(--success)' }}
              >
                ✓
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                More attractive earnings multiple
              </span>
            </li>


            <li className="flex gap-3 items-start">
              <span
                className="font-bold text-lg mt-0.5"
                style={{ color: 'var(--success)' }}
              >
                ✓
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                Mature and diversified cash-generation profile
              </span>
            </li>


            <li className="flex gap-3 items-start">
              <span
                className="font-bold text-lg mt-0.5"
                style={{ color: 'var(--success)' }}
              >
                ✓
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                Strong ecosystem and recurring revenue characteristics
              </span>
            </li>


            <li className="flex gap-3 items-start">
              <span
                className="font-bold text-lg mt-0.5"
                style={{ color: '#F59E0B' }}
              >
                ⚠
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                Slower growth may limit near-term upside potential
              </span>
            </li>

          </ul>

        </div>

      </div>



      {/* KEY INSIGHT */}

      <div
        className="p-5 rounded-xl border-l-4"
        style={{
          background: 'rgba(37, 99, 235, 0.08)',
          borderColor: 'var(--primary)',
        }}
      >

        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--text)' }}
        >

          <strong style={{ color: 'var(--primary)' }}>
            Key insight:
          </strong>

          {' '}
          The comparison highlights a classic growth-versus-value trade-off.

          {' '}{leftCompany?.ticker} offers superior growth and profitability,
          while {rightCompany?.ticker} provides a more conservative valuation
          profile and stronger capital efficiency characteristics.

        </p>

      </div>

    </motion.div>
  )
}