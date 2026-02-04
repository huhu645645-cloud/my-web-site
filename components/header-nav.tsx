"use client"

import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link
          href="/"
          className="font-semibold text-foreground hover:text-foreground/80 transition-colors"
        >
          黑暗三角人格测试
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <SignedOut>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">登录</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/sign-up">注册</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "size-9",
                },
              }}
            />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}
