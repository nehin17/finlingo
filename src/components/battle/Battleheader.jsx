// src/components/battle/BattleHeader.jsx
export default function BattleHeader({ leftCompany, rightCompany }) {
    return (
      <div className="text-center mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted mb-8">
          Battle Mode
        </h2>
        
        <div className="flex items-center justify-center gap-12 mb-8">
          {/* Left Company */}
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white"
              style={{ background: `${leftCompany.color}` }}
            >
              {leftCompany.ticker.slice(0, 2)}
            </div>
            <p className="font-bold text-xl text-text-primary">{leftCompany.ticker}</p>
            <p className="text-sm text-text-muted">{leftCompany.name}</p>
            <p className="text-lg font-semibold text-text-primary mt-2">{leftCompany.price}</p>
          </div>
  
          {/* VS */}
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">vs</p>
            <div className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center mx-auto">
              <span className="text-2xl">⚔️</span>
            </div>
          </div>
  
          {/* Right Company */}
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white"
              style={{ background: `${rightCompany.color}` }}
            >
              {rightCompany.ticker.slice(0, 2)}
            </div>
            <p className="font-bold text-xl text-text-primary">{rightCompany.ticker}</p>
            <p className="text-sm text-text-muted">{rightCompany.name}</p>
            <p className="text-lg font-semibold text-text-primary mt-2">{rightCompany.price}</p>
          </div>
        </div>
  
        <p className="text-xs text-text-muted">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    )
  }