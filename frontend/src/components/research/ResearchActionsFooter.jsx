
import {
  Star,
  GitCompareArrows,
  FileDown,
  Share2,
  Swords,
} from 'lucide-react'

export default function ResearchActionsSection({
  onWatch,
  onCompare,
  onExport,
  onShare,
  onBattle,
  isWatched = false,
}) {
  const buttons = [
    {
      label: isWatched ? 'Watching' : 'Save to Watchlist',
      icon: Star,
      onClick: onWatch,
    },
    {
      label: 'Compare with Another',
      icon: GitCompareArrows,
      onClick: onCompare,
    },
    {
      label: 'Export Research PDF',
      icon: FileDown,
      onClick: onExport,
    },
    {
      label: 'Share Research Link',
      icon: Share2,
      onClick: onShare,
    },
    {
      label: 'Open Battle Mode',
      icon: Swords,
      onClick: onBattle,
    },
  ]

  return (
    <section
      className="rounded-3xl border border-border p-4 shadow-sm"
      style={{ background: 'var(--surface)' }}
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {buttons.map((button) => {
          const Icon = button.icon
          const disabled = typeof button.onClick !== 'function'

          return (
            <button
              key={button.label}
              type="button"
              onClick={button.onClick}
              disabled={disabled}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl
                border border-border text-xs font-semibold
                transition
                ${
                  disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'text-text-primary hover:border-blue-500/50 hover:bg-surface-elevated'
                }`}
              style={{ background: 'var(--surface-elevated)' }}
            >
              <Icon
                size={13}
                className={isWatched && button.label === 'Watching'
                  ? 'text-amber-500'
                  : 'text-blue-500'}
              />

              {button.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

