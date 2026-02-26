import { Loader2, Leaf } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
          <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading AgriScan...</p>
      </div>
    </div>
  );
}
