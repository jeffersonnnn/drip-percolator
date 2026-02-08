"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { OrderTypeToggle } from "./OrderTypeToggle";
import { SizeInput } from "./SizeInput";
import { LeverageSlider } from "./LeverageSlider";
import { LongShortButtons } from "./LongShortButtons";
import { useTradeStore } from "@/stores/useTradeStore";
import { useMarketStore } from "@/stores/useMarketStore";
import { usePriceStore } from "@/stores/usePriceStore";
import { useAccountStore } from "@/stores/useAccountStore";
import { cn } from "@/lib/utils";

function InfoRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xxs font-mono text-muted">{label}</span>
      <span className={`text-xxs font-mono ${valueClass || "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

type MarginMode = "cross" | "isolated";
type TimeInForce = "GTC" | "IOC" | "FOK";

export function OrderPanel() {
  const { connected } = useWallet();
  const { orderType, limitPrice, setLimitPrice, size, setSize, leverage, side } =
    useTradeStore();
  const { selectedMarket } = useMarketStore();
  const price = usePriceStore((s) => s.prices[selectedMarket.symbol]);
  const { balance, equity, unrealizedPnl, marginUsed, availableMargin } =
    useAccountStore();

  const [tpPrice, setTpPrice] = useState("");
  const [slPrice, setSlPrice] = useState("");
  const [showTpSl, setShowTpSl] = useState(false);
  const [marginMode, setMarginMode] = useState<MarginMode>("cross");
  const [timeInForce, setTimeInForce] = useState<TimeInForce>("GTC");
  const [reduceOnly, setReduceOnly] = useState(false);
  const [postOnly, setPostOnly] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState(true);

  const sizeNum = parseFloat(size) || 0;
  const notional = sizeNum * (price?.price || 0);
  const margin = leverage > 0 ? notional / leverage : 0;
  const takerFee = notional * 0.0007;

  const liqDistance = (price?.price || 0) / leverage;
  const liqPrice =
    side === "long"
      ? (price?.price || 0) - liqDistance * 0.9
      : (price?.price || 0) + liqDistance * 0.9;

  const marginRatio =
    equity > 0 ? ((marginUsed / equity) * 100).toFixed(1) : "0.0";

  const maxBuy = price?.price && leverage > 0
    ? (availableMargin * leverage / price.price)
    : 0;

  const handleSizePercent = (pct: number) => {
    const val = maxBuy * (pct / 100);
    if (val > 0) setSize(val.toFixed(selectedMarket.sizePrecision));
  };

  // Risk level color
  const riskPct = parseFloat(marginRatio);
  const riskColor = riskPct > 80 ? "bg-red" : riskPct > 50 ? "bg-yellow-400" : "bg-green";
  const riskWidth = Math.min(riskPct, 100);

  return (
    <div className="bg-surface border-l border-border h-full flex flex-col w-[280px]">
      {/* Tabs */}
      <div className="flex items-center border-b border-border">
        <span className="flex-1 px-3 py-2 text-xs font-mono text-foreground text-center relative">
          Market
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan" />
        </span>
        <span className="flex-1 px-3 py-2 text-xs font-mono text-muted text-center cursor-pointer hover:text-foreground">
          Limit
        </span>
        <span className="flex-1 px-3 py-2 text-xs font-mono text-muted text-center cursor-pointer hover:text-foreground">
          Pro
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Buy/Sell toggle */}
        <div className="p-3 pb-0">
          <OrderTypeToggle />
        </div>

        {/* Margin mode + leverage display */}
        <div className="px-3 py-1.5 flex items-center gap-1.5">
          <div className="flex bg-surface-2 rounded overflow-hidden border border-border">
            <button
              onClick={() => setMarginMode("cross")}
              className={cn(
                "px-2 py-0.5 text-[9px] font-mono transition-colors",
                marginMode === "cross"
                  ? "bg-surface-3 text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              Cross
            </button>
            <button
              onClick={() => setMarginMode("isolated")}
              className={cn(
                "px-2 py-0.5 text-[9px] font-mono transition-colors",
                marginMode === "isolated"
                  ? "bg-surface-3 text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              Isolated
            </button>
          </div>
          <span className="text-[9px] font-mono text-cyan">{leverage}x</span>
        </div>

        {/* Available to Trade */}
        <div className="px-3 py-1">
          <InfoRow
            label="Available to Trade"
            value={connected ? `${availableMargin.toFixed(2)} USDC` : "0.00 USDC"}
          />
        </div>

        {orderType === "limit" && (
          <div className="px-3 pb-1.5">
            <label className="text-xxs font-mono text-muted mb-1 block">
              Limit Price
            </label>
            <div className="relative">
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-surface-2 border border-border rounded px-2.5 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:border-cyan transition-colors pr-16"
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-0.5">
                <button className="px-1.5 py-0.5 text-[8px] font-mono bg-surface-3 text-muted hover:text-foreground rounded transition-colors">
                  BBO
                </button>
                <button className="px-1.5 py-0.5 text-[8px] font-mono bg-surface-3 text-cyan hover:text-cyan/80 rounded transition-colors">
                  Mid
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Size */}
        <div className="px-3 pb-1">
          <SizeInput />
        </div>

        {/* Size percentage buttons */}
        <div className="px-3 pb-1.5 flex items-center gap-1">
          {[10, 25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => handleSizePercent(pct)}
              className="flex-1 py-0.5 text-[9px] font-mono text-muted hover:text-foreground bg-surface-2 border border-border rounded hover:border-cyan/30 transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Max buy display */}
        <div className="px-3 pb-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-muted/60">Max {side === "long" ? "buy" : "sell"}</span>
            <span className="text-[9px] font-mono text-muted/60 tabular-nums">
              {maxBuy > 0 ? maxBuy.toFixed(selectedMarket.sizePrecision) : "0"} {selectedMarket.baseAsset}
            </span>
          </div>
        </div>

        {/* Leverage */}
        <div className="px-3 pb-1.5">
          <LeverageSlider />
        </div>

        {/* TP/SL Toggle */}
        <div className="px-3 pb-1.5">
          <button
            onClick={() => setShowTpSl(!showTpSl)}
            className="text-xxs font-mono text-cyan hover:text-cyan/80 transition-colors"
          >
            {showTpSl ? "- Hide" : "+ Add"} TP / SL
          </button>
        </div>

        {/* TP/SL Inputs */}
        {showTpSl && (
          <div className="px-3 pb-1.5 space-y-1.5">
            <div>
              <label className="text-xxs font-mono text-green mb-0.5 block">
                Take Profit
              </label>
              <input
                type="number"
                value={tpPrice}
                onChange={(e) => setTpPrice(e.target.value)}
                placeholder="TP Price"
                className="w-full bg-surface-2 border border-border rounded px-2.5 py-1 text-xs font-mono text-foreground focus:outline-none focus:border-green transition-colors"
              />
            </div>
            <div>
              <label className="text-xxs font-mono text-red mb-0.5 block">
                Stop Loss
              </label>
              <input
                type="number"
                value={slPrice}
                onChange={(e) => setSlPrice(e.target.value)}
                placeholder="SL Price"
                className="w-full bg-surface-2 border border-border rounded px-2.5 py-1 text-xs font-mono text-foreground focus:outline-none focus:border-red transition-colors"
              />
            </div>
          </div>
        )}

        {/* Long / Short Buttons */}
        <div className="px-3 pb-1.5">
          <LongShortButtons />
        </div>

        {!connected && (
          <div className="px-3 pb-1.5">
            <div className="text-center text-muted text-xxs font-mono py-1 bg-surface-2 rounded">
              Connect wallet to trade
            </div>
          </div>
        )}

        {/* Advanced options */}
        <div className="px-3 py-1.5 border-t border-border space-y-1.5">
          {/* Time in Force */}
          <div className="flex items-center gap-2">
            {(["GTC", "IOC", "FOK"] as const).map((tif) => (
              <label key={tif} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="tif"
                  checked={timeInForce === tif}
                  onChange={() => setTimeInForce(tif)}
                  className="w-2.5 h-2.5 accent-cyan"
                />
                <span className={cn(
                  "text-[9px] font-mono",
                  timeInForce === tif ? "text-foreground" : "text-muted"
                )}>
                  {tif}
                </span>
              </label>
            ))}
          </div>

          {/* Toggles row */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={reduceOnly}
                onChange={(e) => setReduceOnly(e.target.checked)}
                className="w-2.5 h-2.5 accent-cyan"
              />
              <span className="text-[9px] font-mono text-muted">Reduce only</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={postOnly}
                onChange={(e) => setPostOnly(e.target.checked)}
                className="w-2.5 h-2.5 accent-cyan"
              />
              <span className="text-[9px] font-mono text-muted">Post only</span>
            </label>
          </div>

          {/* Order confirm */}
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={orderConfirm}
              onChange={(e) => setOrderConfirm(e.target.checked)}
              className="w-2.5 h-2.5 accent-cyan"
            />
            <span className="text-[9px] font-mono text-muted">Order confirm</span>
          </label>
        </div>

        {/* Order Info */}
        <div className="px-3 py-1.5 space-y-1 border-t border-border">
          <InfoRow
            label="Order Value"
            value={sizeNum > 0 ? `$${notional.toFixed(2)}` : "N/A"}
          />
          <InfoRow
            label="Est. Liq. Price"
            value={sizeNum > 0 ? `$${liqPrice.toFixed(selectedMarket.pricePrecision)}` : "--"}
          />
          <InfoRow
            label="Fees"
            value={`Taker: ${(0.07).toFixed(2)}% / Maker: ${(0.02).toFixed(2)}%`}
          />
          {sizeNum > 0 && (
            <>
              <InfoRow
                label="Req. Margin"
                value={`$${margin.toFixed(2)}`}
              />
              <InfoRow
                label="Est. Fee"
                value={`$${takerFee.toFixed(4)}`}
              />
            </>
          )}
        </div>

        {/* Risk Rate */}
        <div className="px-3 py-1.5 border-t border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono text-muted">Risk Rate</span>
            <span className={cn(
              "text-[9px] font-mono tabular-nums",
              riskPct > 80 ? "text-red" : riskPct > 50 ? "text-yellow-400" : "text-green"
            )}>
              {marginRatio}%
            </span>
          </div>
          <div className="w-full h-1 bg-surface-2 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", riskColor)}
              style={{ width: `${riskWidth}%` }}
            />
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-[7px] font-mono text-muted/40">Safe</span>
            <span className="text-[7px] font-mono text-muted/40">Danger</span>
          </div>
        </div>

        {/* Deposit / Withdraw */}
        <div className="px-3 py-1.5 border-t border-border space-y-1.5">
          <button className="w-full bg-cyan/10 text-cyan border border-cyan/20 rounded py-1.5 text-xs font-mono font-semibold hover:bg-cyan/20 transition-colors">
            Deposit
          </button>
          <div className="flex gap-1.5">
            <button className="flex-1 bg-surface-2 border border-border rounded py-1 text-xxs font-mono text-muted hover:text-foreground transition-colors">
              Perps ⇄ Spot
            </button>
            <button className="flex-1 bg-surface-2 border border-border rounded py-1 text-xxs font-mono text-muted hover:text-foreground transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        {/* Account Equity */}
        <div className="px-3 py-1.5 border-t border-border space-y-1">
          <div className="text-xxs font-mono text-foreground font-semibold mb-0.5">
            Account Equity
          </div>
          <InfoRow label="Balance" value={`$${balance.toFixed(2)}`} />
          <InfoRow
            label="Unrealized PnL"
            value={`$${unrealizedPnl >= 0 ? "+" : ""}${unrealizedPnl.toFixed(2)}`}
            valueClass={unrealizedPnl >= 0 ? "text-green" : "text-red"}
          />
          <InfoRow label="Equity" value={`$${equity.toFixed(2)}`} />
          <InfoRow label="Margin Used" value={`$${marginUsed.toFixed(2)}`} />
          <InfoRow label="Available" value={`$${availableMargin.toFixed(2)}`} />
        </div>
      </div>
    </div>
  );
}
