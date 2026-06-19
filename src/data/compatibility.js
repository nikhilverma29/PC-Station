/**
 * PC Forge — Compatibility Validation Engine
 *
 * Checks selected components for compatibility issues.
 * Returns an array of warnings and errors with affected component references.
 */

/**
 * @param {Object} selections - Map of category → product object
 * @returns {Array<{ type: 'error' | 'warning', message: string, affectedComponents: string[] }>}
 */
export function checkCompatibility(selections) {
  const issues = [];
  const { cpu, gpu, motherboard, ram, pccase, psu } = selections;

  // Rule 1: CPU socket must match Motherboard socket
  if (cpu && motherboard) {
    if (cpu.specs.socket !== motherboard.specs.socket) {
      issues.push({
        type: 'error',
        message: `${cpu.name} (${cpu.specs.socket}) is not compatible with ${motherboard.name} (${motherboard.specs.socket}). Socket types must match.`,
        affectedComponents: ['cpu', 'motherboard'],
      });
    }
  }

  // Rule 2: RAM type must match Motherboard supported RAM type
  if (ram && motherboard) {
    if (ram.specs.type !== motherboard.specs.ramType) {
      issues.push({
        type: 'error',
        message: `${ram.name} (${ram.specs.type}) is not compatible with ${motherboard.name} which requires ${motherboard.specs.ramType}.`,
        affectedComponents: ['ram', 'motherboard'],
      });
    }
  }

  // Rule 3: GPU length must fit within Case maxGpuLength
  if (gpu && pccase) {
    if (gpu.specs.length > pccase.specs.maxGpuLength) {
      issues.push({
        type: 'error',
        message: `${gpu.name} (${gpu.specs.length}mm) is too long for ${pccase.name} (max ${pccase.specs.maxGpuLength}mm).`,
        affectedComponents: ['gpu', 'pccase'],
      });
    } else if (gpu.specs.length > pccase.specs.maxGpuLength - 20) {
      issues.push({
        type: 'warning',
        message: `${gpu.name} (${gpu.specs.length}mm) fits in ${pccase.name} but with very little clearance.`,
        affectedComponents: ['gpu', 'pccase'],
      });
    }
  }

  // Rule 4: Motherboard form factor must fit Case
  if (motherboard && pccase) {
    const formFactorFits = canFormFactorFit(
      motherboard.specs.formFactor,
      pccase.specs.formFactor
    );
    if (!formFactorFits) {
      issues.push({
        type: 'error',
        message: `${motherboard.name} (${motherboard.specs.formFactor}) does not fit in ${pccase.name} (${pccase.specs.formFactor}).`,
        affectedComponents: ['motherboard', 'pccase'],
      });
    }
  }

  // Rule 5: Total system TDP must not exceed PSU wattage
  if (psu) {
    const totalTdp = calculateTotalTdp(selections);
    const psuWattage = psu.specs.wattage;
    const usagePercent = (totalTdp / psuWattage) * 100;

    if (totalTdp > psuWattage) {
      issues.push({
        type: 'error',
        message: `Total system power draw (~${totalTdp}W) exceeds ${psu.name} capacity (${psuWattage}W). Choose a higher wattage PSU.`,
        affectedComponents: ['psu'],
      });
    } else if (usagePercent > 80) {
      issues.push({
        type: 'warning',
        message: `System power draw (~${totalTdp}W) is at ${Math.round(usagePercent)}% of ${psu.name} capacity (${psuWattage}W). Consider a higher wattage PSU for headroom.`,
        affectedComponents: ['psu'],
      });
    }
  }

  return issues;
}

/**
 * Checks if a motherboard form factor fits in a given case form factor.
 * ATX cases can hold ATX, Micro-ATX, and Mini-ITX.
 * Micro-ATX cases can hold Micro-ATX and Mini-ITX.
 * Mini-ITX cases can only hold Mini-ITX.
 */
function canFormFactorFit(moboFormFactor, caseFormFactor) {
  const hierarchy = {
    'E-ATX': 4,
    ATX: 3,
    'Micro-ATX': 2,
    'Mini-ITX': 1,
  };

  const moboSize = hierarchy[moboFormFactor] ?? 0;
  const caseSize = hierarchy[caseFormFactor] ?? 0;

  return moboSize <= caseSize;
}

/**
 * Calculate total system TDP (rough estimate).
 * Includes CPU TDP, GPU TDP, and flat estimates for other components.
 */
export function calculateTotalTdp(selections) {
  let total = 0;

  if (selections.cpu) total += selections.cpu.specs.tdp || 0;
  if (selections.gpu) total += selections.gpu.specs.tdp || 0;

  // Fixed estimates for components without explicit TDP
  if (selections.motherboard) total += 30;
  if (selections.ram) total += 15;
  if (selections.storage) total += 10;

  // Fans, USB devices, etc.
  total += 30;

  return total;
}

/**
 * Check if a specific product is compatible with the current selections.
 * Used by ProductCard to show compatibility badges.
 */
export function checkProductCompatibility(product, selections) {
  // Create a hypothetical selection set with this product
  const hypothetical = { ...selections, [product.category]: product };
  const issues = checkCompatibility(hypothetical);

  // Filter to issues that involve this product's category
  const relevant = issues.filter((issue) =>
    issue.affectedComponents.includes(product.category)
  );

  return {
    issues: relevant,
    hasErrors: relevant.some((i) => i.type === 'error'),
    hasWarnings: relevant.some((i) => i.type === 'warning'),
    isCompatible: relevant.length === 0,
  };
}

/**
 * Get recommended PSU wattage based on current component selections.
 * Uses the common rule: total TDP + 20-25% headroom, rounded to nearest 50W tier.
 */
export function getRecommendedPsuWattage(selections) {
  const totalTdp = calculateTotalTdp(selections);
  // Add 25% headroom for transient spikes and efficiency
  const withHeadroom = totalTdp * 1.25;
  // Round up to the nearest 50W tier (e.g., 650, 750, 850)
  return Math.ceil(withHeadroom / 50) * 50;
}

/**
 * Get a full power analysis object for display in the summary panel.
 */
export function getPowerAnalysis(selections) {
  const estimatedDraw = calculateTotalTdp(selections);
  const recommendedPsu = getRecommendedPsuWattage(selections);
  const selectedPsu = selections.psu;
  const hasPowerComponents = !!(selections.cpu || selections.gpu);

  let psuStatus = 'none'; // 'none' | 'adequate' | 'tight' | 'insufficient'
  let psuMessage = '';

  if (selectedPsu && hasPowerComponents) {
    const psuWattage = selectedPsu.specs.wattage;
    const usagePercent = (estimatedDraw / psuWattage) * 100;

    if (estimatedDraw > psuWattage) {
      psuStatus = 'insufficient';
      psuMessage = `Power draw exceeds PSU capacity by ~${estimatedDraw - psuWattage}W`;
    } else if (usagePercent > 80) {
      psuStatus = 'tight';
      psuMessage = `Running at ${Math.round(usagePercent)}% capacity — consider upgrading`;
    } else {
      psuStatus = 'adequate';
      psuMessage = `${Math.round(usagePercent)}% capacity used — good headroom`;
    }
  }

  return {
    estimatedDraw,
    recommendedPsu,
    hasPowerComponents,
    psuStatus,
    psuMessage,
  };
}

