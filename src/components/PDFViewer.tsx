import { useState } from "react";
import { Download, ZoomIn, ZoomOut, RotateCw, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface PDFViewerProps {
  url: string;
  title: string;
  onClose?: () => void;
}

const PDFViewer = ({ url, title, onClose }: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(100);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Google Docs Viewer for better PDF rendering
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div className="flex flex-col h-full bg-background rounded-xl border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          )}
          <h3 className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-[300px]">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center gap-1 ml-2 px-2 py-1 rounded-lg bg-background border border-border">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleZoomOut}>
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <span className="text-xs font-medium text-muted-foreground min-w-[40px] text-center">
              {zoom}%
            </span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleZoomIn}>
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleResetZoom}>
              <RotateCw className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleFullscreen}>
            <Maximize2 className="w-4 h-4" />
          </Button>

          <Button variant="default" size="sm" asChild className="gap-2">
            <a href={url} download target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">تحميل</span>
            </a>
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 relative overflow-auto bg-muted/30">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="text-center space-y-4">
              <Skeleton className="w-[300px] h-[400px] mx-auto" />
              <p className="text-muted-foreground text-sm">جاري تحميل المستند...</p>
            </div>
          </div>
        )}
        <iframe
          src={viewerUrl}
          className="w-full h-full min-h-[500px] border-0"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          onLoad={() => setIsLoading(false)}
          title={title}
        />
      </div>
    </div>
  );
};

export default PDFViewer;
