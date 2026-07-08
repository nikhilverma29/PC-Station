// Scoring thresholds for GPU VRAM, CPU cores/clock, and RAM capacity.
// Each returns a 0-100 score used to compute use-case suitability.

function n(val) {
  if (val == null) return 0;
  const m = String(val).match(/(\d+\.?\d*)/);
  return m ? parseFloat(m[1]) : 0;
}

function gpuVramScore(v) {
  return v >= 20 ? 97 : v >= 16 ? 88 : v >= 12 ? 78 : v >= 8 ? 65 : v >= 6 ? 50 : v >= 4 ? 36 : 22;
}

function cpuCoresScore(c) {
  return c >= 24 ? 97 : c >= 16 ? 87 : c >= 12 ? 76 : c >= 8 ? 65 : c >= 6 ? 53 : c >= 4 ? 42 : 30;
}

function cpuClockScore(g) {
  return g >= 5.7 ? 97 : g >= 5.3 ? 90 : g >= 5.0 ? 82 : g >= 4.7 ? 73 : g >= 4.3 ? 62 : 48;
}

function ramCapScore(r) {
  return r >= 64 ? 97 : r >= 32 ? 82 : r >= 16 ? 64 : r >= 8 ? 44 : 28;
}

export function barColor(score) {
  return score >= 75 ? 'bg-emerald-500' : score >= 50 ? 'bg-primary' : score >= 30 ? 'bg-amber-500' : 'bg-red-500';
}

export function tierScoreLabel(score) {
  if (score >= 80) return { text: 'Excellent', cls: 'text-emerald-400' };
  if (score >= 60) return { text: 'Good',      cls: 'text-primary'     };
  if (score >= 40) return { text: 'Average',   cls: 'text-amber-400'   };
  return             { text: 'Low',       cls: 'text-red-400'     };
}

export function useCaseLabel(score) {
  if (score >= 80) return { text: 'Ideal',           cls: 'text-emerald-400' };
  if (score >= 60) return { text: 'Capable',         cls: 'text-primary'     };
  if (score >= 40) return { text: 'Adequate',        cls: 'text-amber-400'   };
  return             { text: 'Not Recommended', cls: 'text-red-400'     };
}

export function analyzeBuild(selections, totalPrice) {
  const cpu = selections['cpu'];
  const gpu = selections['gpu'];
  const ram = selections['ram'];
  const psu = selections['psu'];

  const cpuCores = n(cpu?.specs?.cores);
  const cpuClock = n(cpu?.specs?.boostClock);
  const cpuTdp   = n(cpu?.specs?.tdp);
  const gpuVram  = n(gpu?.specs?.vram);
  const gpuTdp   = n(gpu?.specs?.tdp);
  const ramCap   = n(ram?.specs?.capacity);
  const psuW     = n(psu?.specs?.wattage);

  const gS  = gpuVramScore(gpuVram);
  const ccS = cpuCoresScore(cpuCores);
  const ckS = cpuClockScore(cpuClock);
  const rS  = ramCapScore(ramCap);

  const gaming       = Math.round(gS * 0.65 + ckS * 0.35);
  const productivity = Math.round(ccS * 0.55 + rS * 0.35 + gS * 0.10);
  const streaming    = Math.round(ccS * 0.60 + rS * 0.40);
  const videoEditing = Math.round(ccS * 0.40 + rS * 0.35 + gS * 0.25);
  const rendering    = Math.round(ccS * 0.70 + rS * 0.30);

  // Value score penalises spend above ₹80k — higher budget raises expectations
  const value = Math.min(
    Math.max(Math.round((gaming + productivity) / 2 * 1.1 - Math.max(0, (totalPrice - 80000) / 5000)), 10),
    97
  );

  const estimatedDraw = cpuTdp + gpuTdp + 100;
  const loadPct     = psuW > 0 ? Math.round((estimatedDraw / psuW) * 100) : 0;
  const headroomPct = 100 - loadPct;

  let tier, tierTextColor, tierDesc;
  if (totalPrice >= 200000) {
    tier = 'Enthusiast'; tierTextColor = 'text-purple-400';
    tierDesc = 'Top-tier performance. Built for professionals, streamers & hardcore gamers.';
  } else if (totalPrice >= 100000) {
    tier = 'High-End'; tierTextColor = 'text-primary';
    tierDesc = 'Excellent all-round performance for gaming and content creation.';
  } else if (totalPrice >= 50000) {
    tier = 'Mid-Range'; tierTextColor = 'text-blue-400';
    tierDesc = 'Solid performance for 1080p / 1440p gaming and everyday tasks.';
  } else {
    tier = 'Budget'; tierTextColor = 'text-emerald-400';
    tierDesc = 'Essential performance for everyday computing and casual gaming.';
  }

  return {
    tier, tierTextColor, tierDesc,
    gaming, productivity, value,
    useCases: [
      { name: 'Gaming',             score: gaming       },
      { name: 'Heavy Multitasking', score: streaming    },
      { name: 'Media Production',   score: videoEditing },
      { name: '3D Rendering',       score: rendering    },
    ],
    estimatedDraw, psuW, loadPct, headroomPct, cpuTdp, gpuTdp,
  };
}
