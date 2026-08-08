import PECalculator from './calculators/PECalculator'
import MarginExplorer from './calculators/MarginExplorer'
import ROEBreakdown from './calculators/ROEBreakdown'

export default function InteractiveTools() {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Interactive Tools</h2>
        <p className="text-base text-text-muted">
          Learn by doing. Experiment with key financial metrics and see how changes impact valuations and ratios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PECalculator />
        <MarginExplorer />
        <ROEBreakdown />
      </div>
    </div>
  )
}