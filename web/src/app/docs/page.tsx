import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Shield,
  Zap,
  Activity,
  BarChart3,
  Github,
  Twitter,
  ExternalLink,
  ChevronRight,
  Gauge,
  Clock,
  AlertTriangle,
  Layers,
  Lock,
  RefreshCw,
} from "lucide-react";
import { MARKETS } from "@/config/markets";

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "engine", label: "Percolator Engine" },
  { id: "markets", label: "Markets" },
  { id: "trading", label: "Trading" },
  { id: "risk", label: "Risk & Margin" },
  { id: "oracles", label: "Oracles" },
  { id: "getting-started", label: "Getting Started" },
  { id: "links", label: "Links" },
];

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="font-mono font-bold text-xl sm:text-2xl text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3"
    >
      <span className="w-1 h-6 bg-gradient-to-b from-cyan to-green rounded-full" />
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono font-bold text-base text-foreground mt-8 mb-3">
      {children}
    </h3>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted font-sans leading-relaxed mb-4">
      {children}
    </p>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 hover:border-cyan/20 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-cyan" />
        </div>
        <h4 className="font-mono font-bold text-sm text-foreground">
          {title}
        </h4>
      </div>
      <div className="text-sm text-muted font-sans leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-surface border border-border rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto mb-4">
      <code>{children}</code>
    </pre>
  );
}

function leverageColor(lev: number) {
  if (lev >= 50) return "bg-cyan/15 text-cyan";
  if (lev >= 20) return "bg-green/15 text-green";
  return "bg-yellow-500/15 text-yellow-400";
}

function categoryLabel(cat: string) {
  if (cat === "major") return "Major";
  if (cat === "meme") return "Meme";
  return "DeFi";
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-green flex items-center justify-center">
                <span className="text-background font-bold text-sm">D</span>
              </div>
              <span className="font-mono font-bold text-foreground text-sm tracking-wide">
                DRIP
              </span>
            </Link>
            <div className="flex items-center gap-1 text-xs font-mono text-muted">
              <ChevronRight className="w-3 h-3" />
              <span className="text-cyan">Docs</span>
            </div>
          </div>

          <div className="flex items-center gap-4 max-sm:hidden">
            <Link
              href="/trade"
              className="text-xs font-mono text-muted hover:text-foreground transition-colors"
            >
              Trade
            </Link>
            <Link
              href="/portfolio"
              className="text-xs font-mono text-muted hover:text-foreground transition-colors"
            >
              Portfolio
            </Link>
            <a
              href="https://github.com/jeffersonnnn/drip-percolator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] py-8 overflow-y-auto scrollbar-none">
          <div className="text-xxs font-mono text-muted uppercase tracking-wider mb-4">
            Documentation
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm font-mono text-muted hover:text-cyan transition-colors px-3 py-1.5 rounded hover:bg-cyan/5"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="text-xxs font-mono text-muted uppercase tracking-wider mb-3">
              Links
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/jeffersonnnn/drip-percolator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                Source Code
              </a>
              <a
                href="https://github.com/aeyakovenko/percolator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted hover:text-foreground transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Percolator Engine
              </a>
              <a
                href="https://x.com/drippercolator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Twitter className="w-3.5 h-3.5" />
                @drippercolator
              </a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 py-8 pb-24">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan mb-4">
              <BookOpen className="w-4 h-4" />
              Documentation
            </div>
            <h1 className="font-mono font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Drip Protocol
            </h1>
            <p className="text-base text-muted font-sans leading-relaxed max-w-2xl">
              Pro-grade perpetual futures trading terminal on Solana, powered by
              the formally verified Percolator risk engine.
            </p>
          </div>

          {/* ============= OVERVIEW ============= */}
          <SectionHeading id="overview">Overview</SectionHeading>

          <Paragraph>
            Drip is a professional trading terminal for perpetual futures on
            Solana. It provides a complete interface for leveraged trading across
            majors, meme coins, and DeFi tokens — with up to 50x leverage,
            real-time order books, and advanced order types.
          </Paragraph>

          <Paragraph>
            Under the hood, Drip is powered by the Percolator engine — the only
            formally verified risk engine for perpetual DEXs on Solana. Built by
            Anatoly Yakovenko (toly), Percolator uses mathematical proofs to
            guarantee that the exchange balance sheet remains solvent under all
            conditions.
          </Paragraph>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            <InfoCard icon={Shield} title="Formally Verified">
              The Percolator engine uses Kani model checking to prove key
              invariants — conservation, isolation, and no-teleport behavior.
              Math-proven correctness, not just audited.
            </InfoCard>
            <InfoCard icon={Zap} title="Not a Fork">
              Original protocol frontend purpose-built for the Percolator
              engine. Not a copy of HyperLiquid, Drift, or any other protocol.
            </InfoCard>
            <InfoCard icon={Github} title="Open Source">
              Fully transparent and community-driven. Inspect every line of code
              in both the trading terminal and the underlying engine.
            </InfoCard>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 my-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-mono font-bold text-sm text-yellow-400 mb-1">
                  Devnet Only
                </div>
                <p className="text-sm text-muted font-sans">
                  Drip is currently deployed on Solana Devnet. The Percolator
                  engine is an educational research project — do not use with
                  real funds. This is experimental software.
                </p>
              </div>
            </div>
          </div>

          {/* ============= ARCHITECTURE ============= */}
          <SectionHeading id="architecture">Architecture</SectionHeading>

          <Paragraph>
            Drip follows a layered architecture. The frontend is a Next.js 14
            application that communicates with the Solana blockchain via RPC. The
            Percolator engine runs as an on-chain Solana program that handles
            all risk accounting, while Drip provides the trading interface.
          </Paragraph>

          <div className="bg-surface border border-border rounded-xl p-6 my-6 font-mono text-xs">
            <div className="text-muted mb-3">System Architecture</div>
            <div className="space-y-2 text-foreground">
              <div className="flex items-center gap-3">
                <span className="text-cyan">[ Drip Frontend ]</span>
                <span className="text-muted">—</span>
                <span className="text-muted text-xxs">
                  Next.js 14 / React 18 / TypeScript
                </span>
              </div>
              <div className="flex items-center gap-3 pl-6">
                <span className="text-muted">|</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan">[ Solana Wallet ]</span>
                <span className="text-muted">—</span>
                <span className="text-muted text-xxs">
                  Wallet Adapter / Transaction signing
                </span>
              </div>
              <div className="flex items-center gap-3 pl-6">
                <span className="text-muted">|</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green">[ Percolator Engine ]</span>
                <span className="text-muted">—</span>
                <span className="text-muted text-xxs">
                  On-chain risk engine (Rust / Solana program)
                </span>
              </div>
              <div className="flex items-center gap-3 pl-6">
                <span className="text-muted">|</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green">[ Pyth Network ]</span>
                <span className="text-muted">—</span>
                <span className="text-muted text-xxs">
                  Sub-second oracle price feeds
                </span>
              </div>
            </div>
          </div>

          <SubHeading>Frontend Stack</SubHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              ["Next.js 14", "App Router with server and client components"],
              ["React 18", "Modern hooks-based UI with streaming"],
              ["TypeScript", "Strict mode, full type safety"],
              ["Tailwind CSS", "Dark-mode-first design system"],
              ["Zustand", "Lightweight global state management"],
              [
                "Lightweight Charts",
                "TradingView-grade candlestick charts with 9 timeframes",
              ],
              [
                "Solana Wallet Adapter",
                "Multi-wallet support (Phantom, Solflare, etc.)",
              ],
              [
                "Pyth Hermes Client",
                "Real-time streaming price feeds from Pyth Network",
              ],
            ].map(([name, desc]) => (
              <div
                key={name}
                className="flex items-start gap-3 text-sm bg-surface/50 border border-border/50 rounded-lg px-4 py-3"
              >
                <span className="font-mono font-bold text-foreground whitespace-nowrap">
                  {name}
                </span>
                <span className="text-muted font-sans">{desc}</span>
              </div>
            ))}
          </div>

          <SubHeading>State Management</SubHeading>
          <Paragraph>
            Drip uses Zustand stores for reactive global state. Each store
            manages a specific domain: market selection, price data, trade
            execution parameters, account balances, and open positions. Custom
            hooks like usePrices, useTrading, and usePositions abstract the
            blockchain interactions.
          </Paragraph>

          {/* ============= PERCOLATOR ENGINE ============= */}
          <SectionHeading id="engine">Percolator Engine</SectionHeading>

          <Paragraph>
            Percolator is a formally verified accounting and risk engine for
            perpetual futures DEXs on Solana. It was created by Anatoly
            Yakovenko (co-founder of Solana) and uses Kani model checking to
            mathematically prove key safety invariants.
          </Paragraph>

          <SubHeading>Core Design</SubHeading>
          <Paragraph>
            Percolator is a hybrid design combining synthetics-style risk with
            orderbook-style execution extensibility. Users take positions against
            liquidity provider (LP) accounts, while LPs can supply a pluggable
            matching engine that implements AMM, RFQ, or CLOB logic.
          </Paragraph>

          <Paragraph>
            The engine itself does not move tokens. A wrapper program performs
            SPL transfers and calls into the engine for accounting. This
            separation of concerns ensures the risk logic remains clean and
            verifiable.
          </Paragraph>

          <SubHeading>Key Invariants</SubHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <InfoCard icon={Lock} title="Principal Protection">
              One account&apos;s insolvency cannot directly reduce any other
              account&apos;s protected principal. Losses are isolated.
            </InfoCard>
            <InfoCard icon={Shield} title="Conservation">
              The engine never creates withdrawable claims exceeding vault
              tokens, except for bounded rounding slack.
            </InfoCard>
            <InfoCard icon={RefreshCw} title="Liveness">
              The system never requires all open interest to reach zero or
              manual admin intervention to resume safe withdrawals.
            </InfoCard>
            <InfoCard icon={Gauge} title="Solvency">
              No sequence of trades, oracle updates, funding, ADL, or
              withdrawals can allow net extraction beyond what is funded.
            </InfoCard>
          </div>

          <SubHeading>Formal Verification</SubHeading>
          <Paragraph>
            Percolator uses Kani model checking to verify its invariants.
            Conservation ensures balance-sheet integrity. Isolation prevents
            unauthorized cross-account access. The &quot;no-teleport&quot;
            property confirms that cross-LP position closures correctly account
            for mark-to-oracle settlement and don&apos;t create phantom value.
            The latest audit shows 118/118 proofs passing.
          </Paragraph>

          <div className="bg-surface border border-border rounded-xl p-5 my-6">
            <div className="font-mono text-xs text-muted mb-2">
              Engine Source
            </div>
            <a
              href="https://github.com/aeyakovenko/percolator"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-cyan hover:underline flex items-center gap-2"
            >
              github.com/aeyakovenko/percolator
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="mt-3 flex flex-wrap gap-3">
              {["Rust 99.8%", "477 Stars", "112 Forks", "576 Commits"].map(
                (stat) => (
                  <span
                    key={stat}
                    className="text-xxs font-mono text-muted bg-surface-2 px-2 py-1 rounded"
                  >
                    {stat}
                  </span>
                )
              )}
            </div>
          </div>

          {/* ============= MARKETS ============= */}
          <SectionHeading id="markets">Markets</SectionHeading>

          <Paragraph>
            Drip supports 11 perpetual futures markets across three categories:
            major cryptocurrencies, meme coins, and DeFi tokens. Each market has
            a configurable maximum leverage, dedicated Pyth oracle feed, and
            independent risk parameters.
          </Paragraph>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-border text-muted text-xs">
                  <th className="text-left py-3 px-4">Market</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-right py-3 px-4">Max Leverage</th>
                  <th className="text-right py-3 px-4">Price Precision</th>
                  <th className="text-right py-3 px-4">Min Size</th>
                </tr>
              </thead>
              <tbody>
                {MARKETS.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-foreground">
                      {m.name}
                    </td>
                    <td className="py-3 px-4 text-muted">
                      {categoryLabel(m.category)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${leverageColor(m.maxLeverage)}`}
                      >
                        {m.maxLeverage}x
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-muted">
                      {m.pricePrecision} decimals
                    </td>
                    <td className="py-3 px-4 text-right text-muted">
                      {m.minSize} {m.symbol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubHeading>Market Categories</SubHeading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="font-mono font-bold text-sm text-cyan mb-2">
                Majors
              </div>
              <div className="text-sm text-muted font-sans mb-3">
                SOL, BTC, ETH — up to 50x leverage. High liquidity,
                tight spreads.
              </div>
              <div className="text-xxs font-mono text-muted">3 markets</div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="font-mono font-bold text-sm text-green mb-2">
                Meme
              </div>
              <div className="text-sm text-muted font-sans mb-3">
                FARTCOIN, PENGU, WIF, BONK, AI16Z — 10-20x leverage. High
                volatility plays.
              </div>
              <div className="text-xxs font-mono text-muted">5 markets</div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="font-mono font-bold text-sm text-green mb-2">
                DeFi
              </div>
              <div className="text-sm text-muted font-sans mb-3">
                JUP, PYTH, RNDR — 20x leverage. Infrastructure and
                utility tokens.
              </div>
              <div className="text-xxs font-mono text-muted">3 markets</div>
            </div>
          </div>

          {/* ============= TRADING ============= */}
          <SectionHeading id="trading">Trading</SectionHeading>

          <Paragraph>
            Drip provides a full-featured trading interface designed for
            professional traders. The terminal includes real-time candlestick
            charts, a live order book, one-click trading, and comprehensive
            portfolio management.
          </Paragraph>

          <SubHeading>Order Types</SubHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <InfoCard icon={Zap} title="Market Orders">
              Execute immediately at the best available price. Lowest latency
              for time-sensitive entries and exits.
            </InfoCard>
            <InfoCard icon={Clock} title="Limit Orders">
              Set your price. Orders rest on the book until filled or cancelled.
              Supports GTC, IOC, and FOK time-in-force.
            </InfoCard>
            <InfoCard icon={Shield} title="Stop Loss / Take Profit">
              Protect positions with automatic exit orders. Set both TP and SL
              when opening a position.
            </InfoCard>
            <InfoCard icon={Layers} title="Cross & Isolated Margin">
              Choose cross margin to share collateral across positions, or
              isolated margin to limit risk per position.
            </InfoCard>
          </div>

          <SubHeading>Chart & Analysis</SubHeading>
          <Paragraph>
            The trading chart supports 9 timeframes from 1-minute to 1-week
            candles, powered by TradingView&apos;s Lightweight Charts library.
            Real-time price updates stream directly from Pyth Network oracles
            for sub-second accuracy.
          </Paragraph>

          <div className="bg-surface border border-border rounded-lg p-4 my-6 font-mono text-xs">
            <span className="text-muted">Timeframes: </span>
            {["1m", "5m", "15m", "30m", "1H", "4H", "1D", "3D", "1W"].map(
              (tf) => (
                <span
                  key={tf}
                  className="inline-block text-foreground bg-surface-2 px-2 py-1 rounded mr-2 mb-1"
                >
                  {tf}
                </span>
              )
            )}
          </div>

          <SubHeading>Keyboard Shortcuts</SubHeading>
          <Paragraph>
            Power users can navigate the terminal entirely with keyboard
            shortcuts for rapid order placement and position management.
          </Paragraph>

          {/* ============= RISK & MARGIN ============= */}
          <SectionHeading id="risk">Risk & Margin</SectionHeading>

          <Paragraph>
            Risk management in Drip is enforced at the engine level by
            Percolator. The engine uses a variation-margin accounting model where
            positions are continuously settled to the oracle price. This ensures
            accurate margin calculations at all times.
          </Paragraph>

          <SubHeading>Margin Model</SubHeading>
          <Paragraph>
            Each account has a protected principal (capital) and a realized PnL
            claim. Mark-to-market equity is computed by combining these with the
            unrealized position PnL against the current oracle price. All margin
            checks use fee-debt-adjusted equity.
          </Paragraph>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="font-mono font-bold text-sm text-foreground mb-2">
                Initial Margin
              </div>
              <p className="text-sm text-muted font-sans">
                Required to open or increase a position. Calculated as notional
                value multiplied by the initial margin rate. Risk-increasing
                trades (including position flips) must meet this threshold.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="font-mono font-bold text-sm text-foreground mb-2">
                Maintenance Margin
              </div>
              <p className="text-sm text-muted font-sans">
                Minimum equity required to keep a position open. When
                fee-adjusted equity falls below maintenance margin, the position
                becomes eligible for liquidation.
              </p>
            </div>
          </div>

          <SubHeading>Liquidation</SubHeading>
          <Paragraph>
            When an account&apos;s equity falls below the maintenance margin
            requirement, it becomes eligible for liquidation. The position is
            closed at the oracle price — no counterparty discovery is required.
            Losses are settled from the account&apos;s capital, and any unpaid
            remainder is socialized. A configurable liquidation fee is charged to
            the insurance pool.
          </Paragraph>

          <SubHeading>Withdrawal Safety</SubHeading>
          <Paragraph>
            Withdrawals only return capital, not unrealized PnL. The engine
            enforces multiple safety gates: fresh oracle prices, recent sweep
            completion, no pending socialization, and post-withdrawal margin
            validation for accounts with open positions. Profits convert to
            withdrawable capital through a time-gated warmup mechanism.
          </Paragraph>

          <SubHeading>Fee Schedule</SubHeading>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-border text-muted text-xs">
                  <th className="text-left py-3 px-4">Fee Type</th>
                  <th className="text-right py-3 px-4">Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Taker Fee", "0.05%"],
                  ["Maker Fee", "0.02%"],
                  ["Liquidation Fee", "0.50%"],
                  ["Funding Interval", "8 hours"],
                ].map(([type, rate]) => (
                  <tr
                    key={type}
                    className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-foreground">{type}</td>
                    <td className="py-3 px-4 text-right text-muted">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ============= ORACLES ============= */}
          <SectionHeading id="oracles">Oracles</SectionHeading>

          <Paragraph>
            Drip uses Pyth Network for real-time price feeds. Pyth provides
            sub-second price updates from institutional-grade data sources,
            ensuring accurate mark prices for margin calculations, liquidations,
            and trade settlement.
          </Paragraph>

          <Paragraph>
            Each market has a dedicated Pyth price feed ID. Price data streams
            directly from Pyth&apos;s Hermes service to the frontend, while the
            on-chain engine uses Pyth oracle accounts for settlement.
          </Paragraph>

          <div className="bg-surface border border-border rounded-xl p-5 my-6">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-5 h-5 text-cyan" />
              <span className="font-mono font-bold text-sm text-foreground">
                Pyth Network Integration
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted font-sans">Update Frequency</div>
                <div className="font-mono text-foreground">Sub-second</div>
              </div>
              <div>
                <div className="text-muted font-sans">Data Sources</div>
                <div className="font-mono text-foreground">
                  Institutional grade
                </div>
              </div>
              <div>
                <div className="text-muted font-sans">Markets Covered</div>
                <div className="font-mono text-foreground">All 11 markets</div>
              </div>
            </div>
          </div>

          {/* ============= GETTING STARTED ============= */}
          <SectionHeading id="getting-started">Getting Started</SectionHeading>

          <SubHeading>Connect Your Wallet</SubHeading>
          <Paragraph>
            Drip supports all major Solana wallets through the Wallet Adapter
            standard. Click the wallet button in the top-right corner of the
            trading terminal to connect Phantom, Solflare, or any compatible
            wallet.
          </Paragraph>

          <SubHeading>Start Trading</SubHeading>
          <div className="space-y-3 my-6">
            {[
              [
                "1",
                "Connect Wallet",
                "Connect your Solana wallet to the trading terminal.",
              ],
              [
                "2",
                "Select Market",
                "Choose from 11 available perpetual futures markets in the sidebar.",
              ],
              [
                "3",
                "Configure Order",
                "Set your order type (Market/Limit), direction (Long/Short), size, and leverage.",
              ],
              [
                "4",
                "Place Trade",
                "Review the order details and confirm to submit your transaction to the blockchain.",
              ],
              [
                "5",
                "Manage Positions",
                "Monitor your open positions, set stop-loss/take-profit levels, and track PnL in the Portfolio tab.",
              ],
            ].map(([num, title, desc]) => (
              <div
                key={num}
                className="flex items-start gap-4 bg-surface border border-border rounded-lg p-4"
              >
                <span className="w-7 h-7 rounded-full bg-cyan/10 flex items-center justify-center shrink-0 font-mono font-bold text-xs text-cyan">
                  {num}
                </span>
                <div>
                  <div className="font-mono font-bold text-sm text-foreground mb-1">
                    {title}
                  </div>
                  <div className="text-sm text-muted font-sans">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <SubHeading>Development Setup</SubHeading>
          <Paragraph>
            To run Drip locally for development:
          </Paragraph>
          <CodeBlock>
            {`git clone https://github.com/jeffersonnnn/drip-percolator.git
cd drip-percolator/web
npm install
cp .env.example .env.local
npm run dev`}
          </CodeBlock>
          <Paragraph>
            The development server starts at http://localhost:3000. The app
            connects to Solana Devnet by default.
          </Paragraph>

          {/* ============= LINKS ============= */}
          <SectionHeading id="links">Links</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <a
              href="https://github.com/jeffersonnnn/drip-percolator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-border rounded-xl p-5 hover:border-cyan/30 transition-colors group flex items-start gap-4"
            >
              <Github className="w-6 h-6 text-muted group-hover:text-cyan transition-colors shrink-0 mt-0.5" />
              <div>
                <div className="font-mono font-bold text-sm text-foreground group-hover:text-cyan transition-colors mb-1">
                  Drip Source Code
                </div>
                <div className="text-sm text-muted font-sans">
                  Trading terminal frontend — Next.js, TypeScript, Solana
                </div>
              </div>
            </a>
            <a
              href="https://github.com/aeyakovenko/percolator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-border rounded-xl p-5 hover:border-cyan/30 transition-colors group flex items-start gap-4"
            >
              <ExternalLink className="w-6 h-6 text-muted group-hover:text-cyan transition-colors shrink-0 mt-0.5" />
              <div>
                <div className="font-mono font-bold text-sm text-foreground group-hover:text-cyan transition-colors mb-1">
                  Percolator Engine
                </div>
                <div className="text-sm text-muted font-sans">
                  Formally verified risk engine by Anatoly Yakovenko
                </div>
              </div>
            </a>
            <a
              href="https://x.com/drippercolator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-border rounded-xl p-5 hover:border-cyan/30 transition-colors group flex items-start gap-4"
            >
              <Twitter className="w-6 h-6 text-muted group-hover:text-cyan transition-colors shrink-0 mt-0.5" />
              <div>
                <div className="font-mono font-bold text-sm text-foreground group-hover:text-cyan transition-colors mb-1">
                  @drippercolator
                </div>
                <div className="text-sm text-muted font-sans">
                  Follow us on X for updates, announcements, and alpha
                </div>
              </div>
            </a>
            <Link
              href="/trade"
              className="bg-surface border border-border rounded-xl p-5 hover:border-cyan/30 transition-colors group flex items-start gap-4"
            >
              <BarChart3 className="w-6 h-6 text-muted group-hover:text-cyan transition-colors shrink-0 mt-0.5" />
              <div>
                <div className="font-mono font-bold text-sm text-foreground group-hover:text-cyan transition-colors mb-1">
                  Launch Terminal
                </div>
                <div className="text-sm text-muted font-sans">
                  Start trading perpetual futures on Solana
                </div>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-surface border border-border rounded-xl p-10">
            <h3 className="font-mono font-bold text-xl text-foreground mb-3">
              Ready to trade?
            </h3>
            <p className="text-sm text-muted font-sans mb-6">
              Connect your wallet and start trading perpetual futures in seconds.
            </p>
            <Link
              href="/trade"
              className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan-dim text-background font-mono font-bold text-sm px-8 py-3 rounded-lg transition-colors shadow-lg shadow-cyan/20"
            >
              Launch Terminal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/30 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan to-green flex items-center justify-center">
              <span className="text-background font-bold text-xs">D</span>
            </div>
            <span className="text-xs font-mono text-muted">
              Powered by Percolator engine on Solana
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/drippercolator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/jeffersonnnn/drip-percolator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
