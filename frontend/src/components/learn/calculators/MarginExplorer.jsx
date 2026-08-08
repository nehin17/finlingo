import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MarginExplorer() {
  const [revenue, setRevenue] = useState(1000)
  const [grossMarginPct, setGrossMarginPct] = useState(60)
  const [operatingMarginPct, setOperatingMarginPct] = useState(25)

  const grossProfit = (revenue * grossMarginPct) / 100
  const operatingIncome = (revenue * operatingMarginPct) / 100

  return (
    <div className="rounded-xl p-6 border border-border" style={{ background: 'var(--surface)' }}>
      <h3 className="text-lg font-bold text-text-primary mb-6">Margin Explorer</h3>

      <div className="space-y-6">
        {/* Revenue Input */}
        <div>
          <label className="text-sm font-semibold text-text-primary block mb-3">Annual Revenue (₹ Cr)</label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={revenue}
            onChange={(e) => setRevenue(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-text-primary">₹{revenue} Cr</span>
          </div>
        </div>

        {/* Gross Margin */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-text-primary">Gross Margin</label>
            <span className="text-lg font-bold text-primary">{grossMarginPct}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={grossMarginPct}
            onChange={(e) => setGrossMarginPct(parseFloat(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-text-muted mt-2">Gross Profit: ₹{grossProfit.toFixed(0)} Cr</p>
        </div>

        {/* Operating Margin */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-text-primary">Operating Margin</label>
            <span className="text-lg font-bold text-primary">{operatingMarginPct}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={operatingMarginPct}
            onChange={(e) => setOperatingMarginPct(parseFloat(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-text-muted mt-2">Operating Income: ₹{operatingIncome.toFixed(0)} Cr</p>
        </div>

        {/* Summary */}
        <motion.div
          key={`${grossMarginPct}-${operatingMarginPct}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-lg border border-primary/30 space-y-3"
          style={{ background: 'var(--surface-elevated)' }}
        >
          <div className="flex justify-between">
            <span className="text-sm text-text-muted">Revenue</span>
            <span className="font-bold text-text-primary">₹{revenue} Cr</span>
          </div>
          <div className="flex justify-between border-t border-border/50 pt-3">
            <span className="text-sm text-text-muted">Gross Profit ({grossMarginPct}%)</span>
            <span className="font-bold text-text-primary">₹{grossProfit.toFixed(0)} Cr</span>
          </div>
          <div className="flex justify-between border-t border-border/50 pt-3">
            <span className="text-sm text-text-muted">Operating Income ({operatingMarginPct}%)</span>
            <span className="font-bold text-text-primary">₹{operatingIncome.toFixed(0)} Cr</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}