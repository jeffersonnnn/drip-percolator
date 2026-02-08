"use client";

import { useState } from "react";
import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";
import { cn } from "@/lib/utils";

const categories = ["All", "Major", "Meme", "DeFi"] as const;
type Category = (typeof categories)[number];

function formatVolume(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
}

const LEVERAGE_COLORS: Record<number, string> = {
  50: "bg-cyan/20 text-cyan",
  20: "bg-green/20 text-green",
  10: "bg-yellow-400/20 text-yellow-400",
};

function getLeverageBadgeClass(lev: number): string {
  if (lev >= 50) return LEVERAGE_COLORS[50];
  if (lev >= 20) return LEVERAGE_COLORS[20];
  return LEVERAGE_COLORS[10];
}

export function MarketSidebar() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["SOL-PERP", "BTC-PERP"]));
  const [collapsed, setCollapsed] = useState(false);

  const { markets, selectedMarket, setSelectedMarket } = useMarketStore();
  const prices = usePriceStore((s) => s.prices);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = markets.filter((m) => {
    if (search && !m.symbol.toLowerCase().includes(search.toLowerCase())) return false;
    if (category === "Major") return m.category === "major";
    if (category === "Meme") return m.category === "meme";
    if (category === "DeFi") return m.category === "defi";
    return true;
  });

  // Sort: favorites first, then by simulated volume
  const sorted = [...filtered].sort((a, b) => {
    const aFav = favorites.has(a.id) ? 1 : 0;
    const bFav = favorites.has(b.id) ? 1 : 0;
    if (aFav !== bFav) return bFav - aFav;
    const aPrice = prices[a.symbol]?.price || 0;
    const bPrice = prices[b.symbol]?.price || 0;
    return bPrice * 1000 - aPrice * 1000;
  });

  if (collapsed) {
    return (
      <div className="bg-surface border-r border-border h-full flex flex-col w-[36px] items-center pt-2">
        <button
          onClick={() => setCollapsed(false)}
          className="text-muted hover:text-foreground text-xs p-1"
          title="Expand markets"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface border-r border-border h-full flex flex-col w-[200px]">
      {/* Header */}
      <div className="flex items-center justify-between px-2.5 py-2 border-b border-border">
        <span className="text-xs font-mono font-semibold text-foreground">Markets</span>
        <button
          onClick={() => setCollapsed(true)}
          className="text-muted hover:text-foreground"
          title="Collapse"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-2 py-1.5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full bg-surface-2 border border-border rounded px-2 py-1 text-[10px] font-mono text-foreground placeholder:text-muted/50 focus:outline-none focus:border-cyan/50 transition-colors"
        />
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-0.5 px-2 pb-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-mono rounded transition-colors",
              category === cat
                ? "bg-surface-3 text-foreground"
                : "text-muted hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Column headers */}
      <div className="flex items-center px-2.5 py-1 text-[9px] font-mono text-muted/60 border-b border-border">
        <span className="w-3" />
        <span className="flex-1">Market</span>
        <span className="text-right w-[60px]">Price</span>
      </div>

      {/* Market list */}
      <div className="flex-1 overflow-y-auto">
        {sorted.map((market) => {
          const p = prices[market.symbol];
          const isSelected = selectedMarket.id === market.id;
          const isFav = favorites.has(market.id);
          const change = p?.changePct24h || (Math.random() * 10 - 3);
          const vol = p ? p.price * (50000 + Math.floor(p.price * 50)) : 0;

          return (
            <button
              key={market.id}
              onClick={() => setSelectedMarket(market.id)}
              className={cn(
                "w-full flex items-center px-2.5 py-1.5 text-left transition-colors group",
                isSelected
                  ? "bg-cyan/5 border-l-2 border-cyan"
                  : "hover:bg-surface-2/40 border-l-2 border-transparent"
              )}
            >
              {/* Favorite star */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(market.id);
                }}
                className={cn(
                  "w-3 text-[10px] mr-1 transition-colors flex-shrink-0",
                  isFav ? "text-yellow-400" : "text-muted/30 group-hover:text-muted/60"
                )}
              >
                {isFav ? "\u2605" : "\u2606"}
              </button>

              {/* Market info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className={cn(
                    "text-[10px] font-mono font-semibold truncate",
                    isSelected ? "text-foreground" : "text-foreground/80"
                  )}>
                    {market.symbol}
                  </span>
                  <span className={cn(
                    "text-[8px] font-mono px-1 rounded",
                    getLeverageBadgeClass(market.maxLeverage)
                  )}>
                    {market.maxLeverage}x
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-mono text-muted/50">
                    {formatVolume(vol)}
                  </span>
                  <span className={cn(
                    "text-[8px] font-mono",
                    change >= 0 ? "text-green" : "text-red"
                  )}>
                    {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0 w-[60px]">
                <span className={cn(
                  "text-[10px] font-mono tabular-nums",
                  isSelected ? "text-foreground" : "text-foreground/70"
                )}>
                  {p ? (p.price < 0.01
                    ? `$${p.price.toFixed(market.pricePrecision)}`
                    : p.price < 1
                      ? `$${p.price.toFixed(4)}`
                      : `$${p.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
                    : "..."}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer count */}
      <div className="px-2.5 py-1.5 border-t border-border">
        <span className="text-[9px] font-mono text-muted/50">
          {markets.length} markets
        </span>
      </div>
    </div>
  );
}
