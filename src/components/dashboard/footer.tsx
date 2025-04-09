import Link from "next/link";
import { Heart, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function DashboardFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("w-full py-4 px-6", className)}>
      <Separator className="mb-4" />
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        {/* Left side - Version and copyright info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-vec-primary">Vec</span>
            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px]">v0.1.0</span>
          </div>
          <span>© {new Date().getFullYear()}</span>
        </div>
        
        {/* Center - Support links */}
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/feedback" 
            className="hover:text-foreground transition-colors"
          >
            Feedback
          </Link>
          <Link 
            href="/dashboard/support" 
            className="hover:text-foreground transition-colors"
          >
            Support
          </Link>
          <Link 
            href="/dashboard/status" 
            className="hover:text-foreground transition-colors"
          >
            Status
          </Link>
        </div>
        
        {/* Right side - GitHub and API */}
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/NahomAnteneh/vec" 
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-foreground transition-colors group"
          >
            <Heart className="h-3.5 w-3.5 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
            <span>Open Source</span>
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <Link 
            href="/dashboard/api" 
            className="hover:text-foreground transition-colors"
          >
            API
          </Link>
        </div>
      </div>
    </footer>
  );
} 