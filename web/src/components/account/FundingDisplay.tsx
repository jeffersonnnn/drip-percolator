"use client";

export function FundingDisplay() {
  return (
    <div className="flex items-center gap-4 text-xs font-mono">
      <div>
        <span className="text-muted text-xxs">Funding Rate</span>
        <span className="ml-2 text-green">0.0100%</span>
      </div>
      <div>
        <span className="text-muted text-xxs">Next Funding</span>
        <span className="ml-2 text-foreground">7h 42m</span>
      </div>
    </div>
  );
}
