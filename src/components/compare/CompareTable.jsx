import { useMemo } from 'react';
import { STEP_ORDER, STEP_LABELS, getSpecLabels } from '@/data/products';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/hooks/useCurrency';
import { Trophy } from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Parse a clock string like "5.7 GHz" → 5.7 */
function parseGHz(str) {
  if (!str) return 0;
  return parseFloat(String(str).replace(/[^\d.]/g, '')) || 0;
}

/** Parse a VRAM string like "24 GB GDDR6X" → 24 */
function parseVRAM(str) {
  if (!str) return 0;
  return parseInt(String(str), 10) || 0;
}

/** Parse a speed string like "6000 MHz" → 6000 */
function parseMHz(str) {
  if (!str) return 0;
  return parseInt(String(str).replace(/[^\d]/g, ''), 10) || 0;
}

/** Parse a latency string like "CL30" → 30 (lower is better) */
function parseCL(str) {
  if (!str) return 999;
  return parseInt(String(str).replace(/[^\d]/g, ''), 10) || 999;
}

/** Parse a read speed string like "7,450 MB/s" → 7450 */
function parseReadSpeed(str) {
  if (!str) return 0;
  return parseInt(String(str).replace(/[^\d]/g, ''), 10) || 0;
}

/** Parse capacity string like "2 TB" or "1 TB" → number in TB */
function parseCapacityTB(str) {
  if (!str) return 0;
  const match = String(str).match(/([\d.]+)\s*(TB|GB)/i);
  if (!match) return 0;
  const n = parseFloat(match[1]);
  return match[2].toUpperCase() === 'GB' ? n / 1024 : n;
}

/** Storage type tier (higher = better) */
function storageTypeTier(type) {
  const t = String(type || '').toLowerCase();
  if (t.includes('gen5')) return 4;
  if (t.includes('gen4')) return 3;
  if (t.includes('gen3')) return 2;
  if (t.includes('nvme')) return 2;
  return 1; // SATA
}

/** Parse fan count from strings like "10× 120mm" → 10 */
function parseFanCount(str) {
  if (!str) return 0;
  const m = String(str).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

/** PSU efficiency tier (higher = better) */
function efficiencyTier(str) {
  const t = String(str || '').toLowerCase();
  if (t.includes('titanium')) return 4;
  if (t.includes('platinum')) return 3;
  if (t.includes('gold')) return 2;
  if (t.includes('bronze')) return 1;
  return 0;
}

/** Chipset tier (higher = better) — rough rank by letter */
function chipsetTier(chip) {
  const t = String(chip || '').toUpperCase();
  if (t.startsWith('X')) return 3;
  if (t.startsWith('Z')) return 3;
  if (t.startsWith('B')) return 2;
  if (t.startsWith('H')) return 1;
  return 0;
}

// ─── Per-category "better" determination ─────────────────────────────────────
// Returns 'A', 'B', or null (tie / missing)
function getBetter(cat, itemA, itemB) {
  if (!itemA || !itemB) return null;
  if (itemA.id === itemB.id) return null; // same component

  const sA = itemA.specs || {};
  const sB = itemB.specs || {};

  switch (cat) {
    case 'cpu': {
      const boostA = parseGHz(sA.boostClock);
      const boostB = parseGHz(sB.boostClock);
      if (boostA !== boostB) return boostA > boostB ? 'A' : 'B';
      if ((sA.cores || 0) !== (sB.cores || 0)) return (sA.cores || 0) > (sB.cores || 0) ? 'A' : 'B';
      return null;
    }
    case 'gpu': {
      const vA = parseVRAM(sA.vram);
      const vB = parseVRAM(sB.vram);
      if (vA !== vB) return vA > vB ? 'A' : 'B';
      const cA = parseGHz(sA.boostClock);
      const cB = parseGHz(sB.boostClock);
      if (cA !== cB) return cA > cB ? 'A' : 'B';
      return null;
    }
    case 'motherboard': {
      if ((sA.ramSlots || 0) !== (sB.ramSlots || 0))
        return (sA.ramSlots || 0) > (sB.ramSlots || 0) ? 'A' : 'B';
      const cA = chipsetTier(sA.chipset);
      const cB = chipsetTier(sB.chipset);
      if (cA !== cB) return cA > cB ? 'A' : 'B';
      return null;
    }
    case 'ram': {
      const mA = parseMHz(sA.speed);
      const mB = parseMHz(sB.speed);
      if (mA !== mB) return mA > mB ? 'A' : 'B';
      const clA = parseCL(sA.latency);
      const clB = parseCL(sB.latency);
      if (clA !== clB) return clA < clB ? 'A' : 'B'; // lower CL is better
      return null;
    }
    case 'storage': {
      const rA = parseReadSpeed(sA.read);
      const rB = parseReadSpeed(sB.read);
      if (rA !== rB) return rA > rB ? 'A' : 'B';
      const capA = parseCapacityTB(sA.capacity);
      const capB = parseCapacityTB(sB.capacity);
      if (capA !== capB) return capA > capB ? 'A' : 'B';
      return null;
    }
    case 'pccase': {
      const fA = parseFanCount(sA.fans);
      const fB = parseFanCount(sB.fans);
      if (fA !== fB) return fA > fB ? 'A' : 'B';
      if ((sA.maxGpuLength || 0) !== (sB.maxGpuLength || 0))
        return (sA.maxGpuLength || 0) > (sB.maxGpuLength || 0) ? 'A' : 'B';
      return null;
    }
    case 'psu': {
      if ((sA.wattage || 0) !== (sB.wattage || 0))
        return (sA.wattage || 0) > (sB.wattage || 0) ? 'A' : 'B';
      const eA = efficiencyTier(sA.efficiency);
      const eB = efficiencyTier(sB.efficiency);
      if (eA !== eB) return eA > eB ? 'A' : 'B';
      return null;
    }
    default:
      return null;
  }
}

// ─── Multi-factor summary scoring ────────────────────────────────────────────
function computeSummary(buildA, buildB) {
  const sA = buildA.selections || {};
  const sB = buildB.selections || {};

  const cpuA = sA.cpu?.specs || {};
  const cpuB = sB.cpu?.specs || {};
  const gpuA = sA.gpu?.specs || {};
  const gpuB = sB.gpu?.specs || {};
  const storA = sA.storage?.specs || {};
  const storB = sB.storage?.specs || {};
  const psuA = sA.psu?.specs || {};
  const psuB = sB.psu?.specs || {};

  const categories = [];

  // 1. Performance — CPU cores+boost + GPU VRAM+TDP
  {
    const scoreA = (cpuA.cores || 0) * 10 + parseGHz(cpuA.boostClock) * 5 + parseVRAM(gpuA.vram) + (gpuA.tdp || 0) * 0.1;
    const scoreB = (cpuB.cores || 0) * 10 + parseGHz(cpuB.boostClock) * 5 + parseVRAM(gpuB.vram) + (gpuB.tdp || 0) * 0.1;
    const winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : null;
    categories.push({
      label: 'Performance',
      winner,
      reason: winner
        ? `${winner === 'A' ? buildA.name : buildB.name} has more CPU cores/speed and GPU power`
        : 'Builds are evenly matched in performance',
    });
  }

  // 2. Gaming — GPU VRAM, then boost clock
  {
    const vA = parseVRAM(gpuA.vram);
    const vB = parseVRAM(gpuB.vram);
    let winner = vA > vB ? 'A' : vB > vA ? 'B' : null;
    let reason = '';
    if (!winner) {
      const cA = parseGHz(gpuA.boostClock);
      const cB = parseGHz(gpuB.boostClock);
      winner = cA > cB ? 'A' : cB > cA ? 'B' : null;
    }
    reason = winner
      ? `${winner === 'A' ? buildA.name : buildB.name} has superior GPU for gaming`
      : 'GPUs are equivalent for gaming';
    categories.push({ label: 'Gaming', winner, reason });
  }

  // 3. Power Efficiency — lower (cpu_tdp + gpu_tdp) / psu_wattage is better
  {
    const drawA = (cpuA.tdp || 0) + (gpuA.tdp || 0);
    const drawB = (cpuB.tdp || 0) + (gpuB.tdp || 0);
    const wattA = psuA.wattage || 1;
    const wattB = psuB.wattage || 1;
    const ratioA = drawA / wattA;
    const ratioB = drawB / wattB;
    const winner = ratioA < ratioB ? 'A' : ratioB < ratioA ? 'B' : null;
    const headroomA = Math.round((1 - ratioA) * 100);
    const headroomB = Math.round((1 - ratioB) * 100);
    categories.push({
      label: 'Power Efficiency',
      winner,
      reason: winner
        ? `${winner === 'A' ? buildA.name : buildB.name} has ${winner === 'A' ? headroomA : headroomB}% PSU headroom vs ${winner === 'A' ? headroomB : headroomA}%`
        : 'Both builds have similar power efficiency',
    });
  }

  // 4. Storage — type tier then read speed then capacity
  {
    const tierA = storageTypeTier(storA.type);
    const tierB = storageTypeTier(storB.type);
    let winner = tierA > tierB ? 'A' : tierB > tierA ? 'B' : null;
    if (!winner) {
      const rA = parseReadSpeed(storA.read);
      const rB = parseReadSpeed(storB.read);
      winner = rA > rB ? 'A' : rB > rA ? 'B' : null;
    }
    if (!winner) {
      const cA = parseCapacityTB(storA.capacity);
      const cB = parseCapacityTB(storB.capacity);
      winner = cA > cB ? 'A' : cB > cA ? 'B' : null;
    }
    categories.push({
      label: 'Storage',
      winner,
      reason: winner
        ? `${winner === 'A' ? buildA.name : buildB.name} has faster/larger storage`
        : 'Storage is equivalent',
    });
  }

  // 5. Value for Money — total price / (cores + boost + vram)
  {
    const perfA = (cpuA.cores || 1) + parseGHz(cpuA.boostClock) + parseVRAM(gpuA.vram);
    const perfB = (cpuB.cores || 1) + parseGHz(cpuB.boostClock) + parseVRAM(gpuB.vram);
    const ratioA = buildA.totalPrice / (perfA || 1);
    const ratioB = buildB.totalPrice / (perfB || 1);
    const winner = ratioA < ratioB ? 'A' : ratioB < ratioA ? 'B' : null;
    categories.push({
      label: 'Value for Money',
      winner,
      reason: winner
        ? `${winner === 'A' ? buildA.name : buildB.name} delivers more performance per dollar`
        : 'Both offer similar value',
    });
  }

  // 6. Price — lower total price wins
  {
    const winner = buildA.totalPrice < buildB.totalPrice ? 'A' : buildB.totalPrice < buildA.totalPrice ? 'B' : null;
    categories.push({
      label: 'Price',
      winner,
      reason: winner
        ? `${winner === 'A' ? buildA.name : buildB.name} costs less overall`
        : 'Both builds cost the same',
    });
  }

  const order = ['Price', 'Performance', 'Gaming', 'Value for Money', 'Power Efficiency', 'Storage'];
  categories.sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label));

  const winsA = categories.filter((c) => c.winner === 'A').length;
  const winsB = categories.filter((c) => c.winner === 'B').length;
  const overallWinner = winsA > winsB ? 'A' : winsB > winsA ? 'B' : null;

  return { categories, winsA, winsB, overallWinner };
}
// ─── Subcomponents ───────────────────────────────────────────────────────────

function BetterBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-primary shrink-0" style={{ backgroundColor: '#525253' }}>
      Better
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CompareTable({ buildA, buildB }) {
  const { formatPrice } = useCurrency();
  const priceDiff = buildA.totalPrice - buildB.totalPrice;
  const isACheaper = priceDiff < 0;
  const isBCheaper = priceDiff > 0;

  const summary = useMemo(() => computeSummary(buildA, buildB), [buildA, buildB]);

  const renderSpecs = (item) => {
    if (!item?.specs) return null;
    const labels = getSpecLabels(item.category);
    const entries = Object.entries(item.specs).filter(([key]) => labels[key]);
    if (entries.length === 0) return null;
    return (
      <div className="mt-1.5 flex flex-col gap-0.5">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-1 text-[13px] text-text-muted-alt">
            <span className="shrink-0">{labels[key]}:</span>
            <span className="font-medium text-text-light">{value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">

      {/* ── Component Table ─────────────────────────────────────────────────── */}
      <div className="overflow-x-auto rounded-md border border-black">

        {/* Column header */}
        <div className="grid border-b-2 border-black bg-table-header-bg" style={{ gridTemplateColumns: '20% 40% 40%' }}>
          <div className="px-5 py-3 border-l-4 border-l-primary bg-table-header-bg">
            <span className="text-base font-bold uppercase tracking-widest text-muted-foreground">Component</span>
          </div>
          <div className="px-5 py-3 border-l border-black flex items-center gap-2">
            <span className="text-lg font-bold text-white">{buildA.name}</span>
          </div>
          <div className="px-5 py-3 border-l border-black flex items-center gap-2">
            <span className="text-lg font-bold text-white">{buildB.name}</span>
          </div>
        </div>

        {/* Component rows */}
        {STEP_ORDER.map((cat, index) => {
          const itemA = buildA.selections[cat];
          const itemB = buildB.selections[cat];
          const better = getBetter(cat, itemA, itemB);

          return (
            <div
              key={cat}
              className="grid border-b border-black bg-table-row-bg"
              style={{ gridTemplateColumns: '20% 40% 40%' }}
            >
              {/* Category label */}
              <div className="px-5 py-4 flex items-start border-r border-black border-l-4 border-l-primary bg-table-header-bg">
                <span className="text-base font-bold uppercase tracking-widest leading-tight text-primary">
                  {STEP_LABELS[cat]}
                </span>
              </div>

              {/* Build A */}
              <div className={cn("px-5 py-4 border-r border-black", better === 'A' && "bg-[#1C2F2B]")}>
                {itemA ? (
                  <div>
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <span className="font-bold text-lg text-white leading-snug">{itemA.name}</span>
                      {better === 'A' && <BetterBadge />}
                    </div>
                    <div className="text-[15px] font-semibold text-primary">
                      {formatPrice(itemA.price)}
                    </div>
                    {renderSpecs(itemA)}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground italic">—</span>
                )}
              </div>

              {/* Build B */}
              <div className={cn("px-5 py-4", better === 'B' && "bg-[#1C2F2B]")}>
                {itemB ? (
                  <div>
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <span className="font-bold text-lg text-white leading-snug">{itemB.name}</span>
                      {better === 'B' && <BetterBadge />}
                    </div>
                    <div className="text-[15px] font-semibold text-primary">
                      {formatPrice(itemB.price)}
                    </div>
                    {renderSpecs(itemB)}
                  </div>
                ) : (
                  <span className="text-[15px] text-muted-foreground italic">—</span>
                )}
              </div>
            </div>
          );
        })}

        {/* Total Price row */}
        <div className="grid border-t-2 border-black bg-table-row-bg" style={{ gridTemplateColumns: '20% 40% 40%' }}>
          <div className="px-5 py-5 flex items-center border-r border-black border-l-4 border-l-primary bg-table-header-bg">
            <span className="text-base font-bold uppercase tracking-widest text-white">Total Price</span>
          </div>
          <div className={cn('px-5 py-5 border-r border-black', isACheaper && 'bg-emerald-500/10')}>
            <div className="text-3xl font-extrabold tabular-nums text-primary">
              {formatPrice(buildA.totalPrice)}
            </div>
            {isACheaper && (
              <div className="text-[13px] text-emerald-400 font-semibold mt-1">
                ✓ Cheaper by {formatPrice(Math.abs(priceDiff))}
              </div>
            )}
          </div>
          <div className={cn('px-5 py-5', isBCheaper && 'bg-emerald-500/10')}>
            <div className="text-3xl font-extrabold tabular-nums text-primary">
              {formatPrice(buildB.totalPrice)}
            </div>
            {isBCheaper && (
              <div className="text-[13px] text-emerald-400 font-semibold mt-1">
                ✓ Cheaper by {formatPrice(Math.abs(priceDiff))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Multi-Factor Summary ─────────────────────────────────────────────── */}
      <div>
        <h3 className="text-base font-bold text-white mb-3">
          Comparison Summary
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {summary.categories.map((cat) => (
            <div
              key={cat.label}
              className="rounded-xl border border-border/60 p-4 flex flex-col gap-2 bg-table-row-bg"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold uppercase tracking-wider text-primary">
                  {cat.label}
                </span>
              </div>
              <p className="text-base leading-relaxed text-white">
                {cat.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
