import { useMemo } from 'react';
import { X as XIcon, Cpu, Tag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getFullSpecLabels, getProductOverview, getProductFeatures, CATEGORY_IMAGES } from '@/data/products';
import { checkProductCompatibility } from '@/data/compatibility';

/**
 * LearnMoreModal — Premium product detail overlay.
 *
 * Two-column layout:
 *   Left  — Large product image (fixed, future-proofed for 3D effects)
 *   Right — Scrollable product info, full specs, compatibility status
 */
export default function LearnMoreModal({ product, selections, open, onOpenChange }) {
  const specLabels = useMemo(
    () => (product ? getFullSpecLabels(product.category) : {}),
    [product]
  );

  const overview = useMemo(
    () => (product ? getProductOverview(product) : ''),
    [product]
  );

  const features = useMemo(
    () => (product ? getProductFeatures(product) : []),
    [product]
  );

  const productImage = product ? (product.modalImage || product.image || CATEGORY_IMAGES[product.category]) : null;

  const compatibility = useMemo(
    () => (product ? checkProductCompatibility(product, selections) : { issues: [], hasErrors: false, hasWarnings: false }),
    [product, selections]
  );

  function formatSpecValue(key, value) {
    if (key === 'wattage') return `${value}W`;
    if (key === 'length') return `${value}mm`;
    if (key === 'maxGpuLength') return `${value}mm`;
    if (key === 'tdp') return `${value}W`;
    return String(value);
  }

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col p-0 gap-0 bg-black border-white/10 sm:rounded-3xl overflow-hidden min-w-[80vw] w-[85vw] min-h-[75vh] h-[80vh]"
      >
        {/* Close button */}
        <DialogClose className="absolute top-5 right-5 z-50 p-2 outline-none border-none hover:bg-transparent">
          <XIcon className="h-8 w-8 text-white/50 hover:text-white transition-colors" />
        </DialogClose>

        {/* Two-column layout */}
        <div className="flex flex-1 min-h-0">

          {/* ── Left Column: Product Image ── */}
          <div className="hidden md:flex w-[45%] shrink-0 items-center justify-center bg-white/[0.03] p-6 relative">
            <div className="relative z-10 flex flex-col items-center w-full h-full">
              {productImage ? (
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    style={{ maxHeight: '100%' }}
                  />
                </div>
              ) : (
                <div className="w-full max-w-[380px] aspect-square rounded-2xl bg-white/5 flex items-center justify-center">
                  <Cpu className="h-20 w-20 text-white/20" />
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column: Scrollable Product Info ── */}
          <div className="flex-1 flex flex-col min-h-0 border-l border-white/[0.06]">
            <div className="flex-1 overflow-y-auto overscroll-contain p-10 pr-14">

              {/* Product title */}
              <h2
                className="text-4xl tracking-[0.02em] text-white mb-8 leading-tight"
                style={{ fontFamily: '"Zrnic", sans-serif' }}
              >
                {product.name}
              </h2>

              {/* Product Overview */}
              <div className="mb-10">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-3">
                  Product Overview
                </h3>
                <p className="text-lg text-white leading-relaxed">
                  {overview}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-10">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg leading-none">•</span>
                      <span className="text-[15px] text-white/80 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>



              {/* ── Compatibility Status (if selections exist) ── */}
              {(compatibility.hasErrors || compatibility.hasWarnings) && (
                <>
                  <div className="h-px w-full bg-white/[0.08] mb-8" />
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
                      Compatibility
                    </h3>
                    <div className="space-y-2">
                      {compatibility.issues.map((issue, i) => (
                        <div
                          key={i}
                          className={cn(
                            'flex items-start gap-2.5 rounded-lg px-4 py-3',
                            issue.type === 'error'
                              ? 'bg-red-500/10 border border-red-500/20'
                              : 'bg-amber-400/10 border border-amber-400/20'
                          )}
                        >
                          <Tag className={cn(
                            'mt-0.5 h-4 w-4 shrink-0',
                            issue.type === 'error' ? 'text-red-400' : 'text-amber-400'
                          )} />
                          <span className={cn(
                            'text-sm leading-relaxed',
                            issue.type === 'error' ? 'text-red-400/90' : 'text-amber-400/90'
                          )}>
                            {issue.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
