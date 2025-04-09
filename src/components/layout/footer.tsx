import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Github, Twitter, FileText, Cpu, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 py-12 border-t">
      <Container>
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-vec-primary">Vec</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Open-source version control system designed for simplicity
              and efficient collaboration.
            </p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://github.com/NahomAnteneh/vec" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-vec-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-vec-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Links - symmetrically arranged in columns */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-vec-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vec. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/docs/legal/privacy" className="text-xs text-muted-foreground hover:text-vec-primary flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/docs/legal/terms" className="text-xs text-muted-foreground hover:text-vec-primary flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>Terms of Service</span>
            </Link>
            <a 
              href="https://github.com/NahomAnteneh/vec" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-vec-primary flex items-center gap-1"
            >
              <Heart className="h-3 w-3" />
              <span>Open Source</span>
            </a>
            <Link href="/status" className="text-xs text-muted-foreground hover:text-vec-primary flex items-center gap-1">
              <Cpu className="h-3 w-3" />
              <span>System Status</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
} 