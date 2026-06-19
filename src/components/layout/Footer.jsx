import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Separator className="mb-6 opacity-30" />
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            PC Forge — Gaming PC Configuration Studio
          </p>
          <p className="text-xs text-muted-foreground/60">
            Built with React &middot; ShadCN UI &middot; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
