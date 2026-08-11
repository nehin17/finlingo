// src/components/battle/BattleHeader.jsx
export default function BattleHeader({ leftCompany, rightCompany }) {
  const safeLeft = leftCompany || {}
  const safeRight = rightCompany || {}

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
        Battle Mode
      </h1>

      <div className="flex items-center justify-center gap-12 mb-8 flex-wrap">
        {/* Left Company */}
        <div className="text-center min-w-[140px]">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white"
            style={{
              background: safeLeft.color || '#2563EB',
            }}
          >
            {(safeLeft.ticker || '??').slice(0, 2)}
          </div>

          <p className="font-bold text-xl text-text-primary">
            {safeLeft.ticker || 'N/A'}
          </p>

          <p className="text-sm text-text-muted">
            {safeLeft.name || 'Unknown Company'}
          </p>

          <p className="text-lg font-semibold text-text-primary mt-2">
            {safeLeft.price || '—'}
          </p>
        </div>

        {/* VS */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">
            VS
          </p>

          <div className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center mx-auto">
            <span className="text-2xl">⚔️</span>
          </div>
        </div>

        {/* Right Company */}
        <div className="text-center min-w-[140px]">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white"
            style={{
              background: safeRight.color || '#4F46E5',
            }}
          >
            {(safeRight.ticker || '??').slice(0, 2)}
          </div>

          <p className="font-bold text-xl text-text-primary">
            {safeRight.ticker || 'N/A'}
          </p>

          <p className="text-sm text-text-muted">
            {safeRight.name || 'Unknown Company'}
          </p>

          <p className="text-lg font-semibold text-text-primary mt-2">
            {safeRight.price || '—'}
          </p>
        </div>
      </div>

      <p className="text-xs text-text-muted">
        Last updated:{' '}
        {new Date().toLocaleDateString()}
      </p>
    </div>
  )
}