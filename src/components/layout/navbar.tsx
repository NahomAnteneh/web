"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Github, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const FEATURES = [
  {
    title: "Smart Branching",
    href: "/features#branching",
    description:
      "Create branches effortlessly with intelligent naming suggestions and automatic tracking.",
  },
  {
    title: "Conflict-Free Merging",
    href: "/features#merging",
    description:
      "Advanced merge algorithms significantly reduce conflicts with interactive tools to resolve them.",
  },
  {
    title: "Lightning Fast",
    href: "/features#performance",
    description:
      "Optimized for performance with a compact storage format and parallel processing.",
  },
  {
    title: "Secure by Design",
    href: "/features#security",
    description:
      "Built-in security features including signed commits and branch protection rules.",
  },
];

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, active, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        active ? "text-vec-primary font-semibold" : "text-foreground/70 hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
NavLink.displayName = "NavLink";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-vec-primary">Vec</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {FEATURES.map((feature) => (
                      <li key={feature.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={feature.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {feature.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/NahomAnteneh/vec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden p-0 w-8 h-8">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <span className="text-vec-primary">Vec</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/features"
                className={cn(
                  "flex py-2 text-base font-medium transition-colors hover:text-vec-primary",
                  pathname.startsWith("/features") && "text-vec-primary"
                )}
              >
                Features
              </Link>
              <Link
                href="/docs"
                className={cn(
                  "flex py-2 text-base font-medium transition-colors hover:text-vec-primary",
                  pathname.startsWith("/docs") && "text-vec-primary"
                )}
              >
                Documentation
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  "flex py-2 text-base font-medium transition-colors hover:text-vec-primary",
                  pathname.startsWith("/pricing") && "text-vec-primary"
                )}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "flex py-2 text-base font-medium transition-colors hover:text-vec-primary",
                  pathname.startsWith("/blog") && "text-vec-primary"
                )}
              >
                Blog
              </Link>
            </nav>
            <div className="mt-6 space-y-4">
              <Button className="w-full" variant="outline" asChild>
                <a
                  href="https://github.com/NahomAnteneh/vec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
} 