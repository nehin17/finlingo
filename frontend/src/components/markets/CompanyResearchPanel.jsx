import AIInsightCard from './AIInsightCard';
import CompanyHeader from './CompanyHeader';
import FinancialSnapshot from './FinancialSnapshot';
import KeyMetricsGrid from './KeyMetricsGrid';
import NewsPreview from './NewsPreview';
import PeerSnapshot from './PeerSnapshot';
import PriceSection from './PriceSection';
import RecentCatalysts from './RecentCatalysts';
import ResearchActions from './ResearchActions';
import StockPriceChart from './StockPriceChart';
import WhyStockMatters from './WhyStockMatters';

export default function CompanyResearchPanel({
  stock,
  isWatching,
  onToggleWatch,
}) {
  return (
    <article className="company-research-panel">
      <div className="company-research-body">
        <CompanyHeader
          stock={stock}
          isWatching={isWatching}
          onToggleWatch={onToggleWatch}
        />

        <div className="research-divider" />

        <PriceSection stock={stock} />

        <StockPriceChart stock={stock} />

        <KeyMetricsGrid stock={stock} />

        <FinancialSnapshot
          financialSnapshot={stock.financialSnapshot}
        />

        <WhyStockMatters
          companyName={stock.shortName ?? stock.name}
          content={stock.whyMatters}
        />

        <AIInsightCard insight={stock.aiInsight} />

        <PeerSnapshot peers={stock.peers} />

        <RecentCatalysts catalysts={stock.catalysts} />

        <NewsPreview news={stock.news} />

        <div className="research-divider" />

        <ResearchActions ticker={stock.ticker} />
      </div>
    </article>
  );
}