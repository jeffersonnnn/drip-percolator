import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  Activity,
  Clock,
  Gauge,
  Github,
  Twitter,
} from "lucide-react";
import { MARKETS } from "@/config/markets";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Real-time Order Book",
    desc: "Live bid/ask depth with spread tracking",
  },
  {
    icon: Zap,
    title: "Advanced Orders",
    desc: "TP/SL, GTC/IOC/FOK, Cross/Isolated margin",
  },
  {
    icon: TrendingUp,
    title: "Meme Perps",
    desc: "Trade FARTCOIN, PENGU, AI16Z, WIF, BONK",
  },
  {
    icon: Activity,
    title: "Pyth Oracles",
    desc: "Sub-second price feeds from Pyth Network",
  },
  {
    icon: Clock,
    title: "Pro Chart",
    desc: "9 timeframes from 1-minute to 1-week candles",
  },
  {
    icon: Gauge,
    title: "Risk Management",
    desc: "Risk rate gauge, position sizing, margin tracking",
  },
];

const STATS = [
  { label: "Markets", value: "11" },
  { label: "Max Leverage", value: "50x" },
  { label: "Formally Verified", value: "✓" },
  { label: "Fees to Start", value: "$0" },
];

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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-auto">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-green flex items-center justify-center">
              <span className="text-background font-bold text-base">D</span>
            </div>
            <span className="font-mono font-bold text-foreground text-base tracking-wide">
              DRIP
            </span>
          </div>

          <div className="flex items-center gap-6 max-sm:hidden">
            <Link
              href="/trade"
              className="text-sm font-mono text-muted hover:text-foreground transition-colors"
            >
              Trade
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-mono text-muted hover:text-foreground transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/docs"
              className="text-sm font-mono text-muted hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </div>

          <Link
            href="/trade"
            className="bg-cyan hover:bg-cyan-dim text-background font-mono font-bold text-sm px-5 py-2 rounded-lg transition-colors"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyan/5 to-green/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="font-mono font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight tracking-tight">
            Trade Perpetual Futures
            <br />
            <span className="bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent">
              on Solana
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Pro-grade terminal powered by the Percolator engine. Formally
            verified. Open source.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/trade"
              className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan-dim text-background font-mono font-bold text-sm px-8 py-3 rounded-lg transition-colors shadow-lg shadow-cyan/20"
            >
              Start Trading
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 border border-border hover:border-foreground/30 text-foreground font-mono font-bold text-sm px-8 py-3 rounded-lg transition-colors"
            >
              View Docs
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-16 flex-wrap">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mono font-bold text-2xl sm:text-3xl text-foreground">
                  {s.value}
                </div>
                <div className="text-xs font-mono text-muted mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-mono font-bold text-2xl sm:text-3xl text-foreground text-center mb-4">
          Everything you need to trade
        </h2>
        <p className="text-muted text-center font-sans mb-16 max-w-xl mx-auto">
          Built for serious traders who demand speed, precision, and
          transparency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-surface border border-border rounded-xl p-6 hover:border-cyan/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                <f.icon className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="font-mono font-bold text-sm text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted font-sans">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Markets Showcase */}
      <section className="bg-surface/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="font-mono font-bold text-2xl sm:text-3xl text-foreground text-center mb-4">
            11 Markets Live
          </h2>
          <p className="text-muted text-center font-sans mb-16 max-w-xl mx-auto">
            Majors, meme coins, and DeFi tokens — all with leverage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MARKETS.map((m) => (
              <Link
                key={m.id}
                href="/trade"
                className="bg-background border border-border rounded-lg p-4 hover:border-cyan/30 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-mono font-bold text-sm text-foreground group-hover:text-cyan transition-colors">
                    {m.name}
                  </div>
                  <div className="text-xxs font-mono text-muted mt-1">
                    {categoryLabel(m.category)}
                  </div>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-1 rounded ${leverageColor(m.maxLeverage)}`}
                >
                  {m.maxLeverage}x
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Preview */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-mono font-bold text-2xl sm:text-3xl text-foreground text-center mb-4">
          See it in action
        </h2>
        <p className="text-muted text-center font-sans mb-12 max-w-xl mx-auto">
          A professional trading interface built for speed and clarity.
        </p>

        <div className="relative rounded-xl border border-border overflow-hidden bg-surface">
          {/* Terminal mockup header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <div className="w-3 h-3 rounded-full bg-red/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green/60" />
            <span className="ml-3 text-xxs font-mono text-muted">
              drip.trade — SOL-PERP
            </span>
          </div>
          {/* Simulated terminal */}
          <div className="aspect-[16/9] bg-background relative flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="text-center z-10">
              <div className="font-mono text-6xl font-bold bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent mb-4">
                DRIP
              </div>
              <div className="font-mono text-muted text-sm mb-6">
                Professional Trading Terminal
              </div>
              <Link
                href="/trade"
                className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 text-cyan font-mono font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-cyan/20 transition-colors"
              >
                Open Terminal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Drip */}
      <section className="bg-surface/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="font-mono font-bold text-2xl sm:text-3xl text-foreground text-center mb-16">
            Why Drip
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-cyan" />
              </div>
              <h3 className="font-mono font-bold text-base text-foreground mb-2">
                Built on Formal Verification
              </h3>
              <p className="text-sm text-muted font-sans">
                Percolator engine is the only formally verified perp engine on
                Solana. Math-proven correctness.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-green/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-green" />
              </div>
              <h3 className="font-mono font-bold text-base text-foreground mb-2">
                Not a Fork
              </h3>
              <p className="text-sm text-muted font-sans">
                Original protocol frontend, not a fork of a fork. Purpose-built
                for the Percolator engine.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-green/10 flex items-center justify-center mx-auto mb-4">
                <Github className="w-7 h-7 text-green" />
              </div>
              <h3 className="font-mono font-bold text-base text-foreground mb-2">
                Open Source
              </h3>
              <p className="text-sm text-muted font-sans">
                Transparent, community-driven. Inspect every line. No hidden
                fees, no surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="font-mono font-bold text-3xl sm:text-4xl text-foreground mb-4">
          Ready to trade?
        </h2>
        <p className="text-muted font-sans mb-10">
          Connect your wallet and start trading in seconds.
        </p>
        <Link
          href="/trade"
          className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan-dim text-background font-mono font-bold text-base px-10 py-4 rounded-lg transition-colors shadow-lg shadow-cyan/20"
        >
          Launch Terminal
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/30">
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
            <Link
              href="/docs"
              className="text-muted hover:text-foreground transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-mono">Docs</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
