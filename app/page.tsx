import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroDemo } from "@/components/hero-demo";
import { Navbar } from "@/components/navbar";
import {
  Wallet,
  Shield,
  Zap,
  TrendingUp,
  Smartphone,
  MessageSquare,
  Globe,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl float" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl float-delayed" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl float" />
      </div>

      {/* Modern Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="mx-auto max-w-[90%] text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-5 py-2 text-sm text-foreground shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Launching Soon on Movement Network
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Your crypto wallet in your pocket.{" "}
            <span className="gradient-text">Powered by AI.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-pretty text-lg text-muted-foreground md:text-xl">
            The AI-powered mobile wallet that lets you send, receive, and
            execute on-chain actions using simple chat or voice commands. Built
            on Movement, secured by Privy.
          </p>

          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="text-base gap-2 rounded-full px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 glow-sm"
            >
              <Sparkles className="h-5 w-5" />
              Join the Waitlist
            </Button>
            <a href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent gap-2 rounded-full px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                See How It Works
              </Button>
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Join 2,000+ early adopters on the waitlist
          </p>
        </div>

        {/* Hero Visual - Interactive Demo */}
        <div className="mx-auto mt-20 max-w-4xl">
          <HeroDemo />
        </div>
      </section>

      {/* Features Bento Grid */}
      <section
        id="features"
        className="container mx-auto px-4 py-24 relative z-10"
      >
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Features
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl">
            Empowering the next generation of{" "}
            <span className="gradient-text">finance</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Bringing blockchain to everyone through the power of chat, voice,
            and AI
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {/* Large feature - spans 2 columns and 2 rows */}
          <Card className="glass-card gradient-border border-0 p-8 md:col-span-2 md:row-span-2 flex flex-col justify-between rounded-3xl group hover:shadow-2xl transition-all duration-500">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl icon-gradient border border-primary/20 group-hover:scale-110 group-hover:glow-sm transition-all duration-300">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl md:text-3xl font-bold">
                Chat or Voice Commands
              </h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Choose how you interact with your wallet. Type naturally in chat
                or speak your commands. No complex interfaces, no confusion—just
                simple conversations with your AI wallet assistant.
              </p>
            </div>
            <div className="rounded-2xl bg-linear-to-r from-primary/10 to-primary/5 p-5 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold">
                  AI understands your intent
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                &quot;Split $100 between Alice and Bob&quot; → Automatically
                creates two transactions
              </p>
            </div>
          </Card>

          {/* Right column - Row 1: Privy Security */}
          <Card className="glass-card gradient-border border-0 p-6 flex flex-col rounded-2xl group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl icon-gradient border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Privy Security</h3>
            <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
              Enterprise-grade security powered by Privy. Biometric auth, secure
              key management, and 2FA protection.
            </p>
          </Card>

          {/* Right column - Row 2: Mobile First */}
          <Card className="glass-card gradient-border border-0 p-6 flex flex-col rounded-2xl group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl icon-gradient border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Mobile First</h3>
            <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
              Designed for your smartphone. Manage crypto on-the-go with an
              intuitive experience.
            </p>
          </Card>

          {/* Bottom row - Col 1: Universal Access */}
          <Card className="glass-card gradient-border border-0 p-6 flex flex-col rounded-2xl group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl icon-gradient border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Universal Access</h3>
            <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
              Financial empowerment for anyone, anywhere. Crypto in your pocket,
              always ready.
            </p>
          </Card>

          {/* Bottom row - Col 2: Powered by Move on Movement */}
          <Card className="glass-card gradient-border border-0 p-6 flex flex-col rounded-2xl group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl icon-gradient border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Powered by Move</h3>
            <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
              Built with MoveVM on Movement Network. Secure, fast transactions
              with cutting-edge infrastructure.
            </p>
          </Card>

          {/* Bottom row - Col 3: Lightning Fast (intersection of column and row) */}
          <Card className="glass-card gradient-border border-0 p-6 flex flex-col rounded-2xl group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl icon-gradient border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Lightning Fast</h3>
            <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
              Instant transactions with Movement&apos;s high-performance
              blockchain infrastructure.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="container mx-auto px-4 py-24 relative z-10"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Zap className="h-4 w-4" />
              How It Works
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl">
              Simple as <span className="gradient-text">1-2-3</span>
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Managing crypto has never been easier. Here&apos;s how MooveMoney
              works.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            <div className="text-center group">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-3xl font-bold text-primary-foreground shadow-lg glow-sm group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="mb-3 text-xl font-bold">Join the Waitlist</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sign up for early access. Be first in line when MooveMoney
                launches on iOS and Android.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-3xl font-bold text-primary-foreground shadow-lg glow-sm group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="mb-3 text-xl font-bold">Chat or Speak</h3>
              <p className="text-muted-foreground leading-relaxed">
                Type or tap the mic and tell MooveMoney what you want to do in
                plain English.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-3xl font-bold text-primary-foreground shadow-lg glow-sm group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="mb-3 text-xl font-bold">Confirm & Done</h3>
              <p className="text-muted-foreground leading-relaxed">
                Review the AI-prepared transaction and confirm with one tap.
                It&apos;s that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section
        id="ecosystem"
        className="container mx-auto px-4 py-24 relative z-10"
      >
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Globe className="h-4 w-4" />
            Ecosystem
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl">
            Part of the{" "}
            <span className="gradient-text">Movement Ecosystem</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Join the innovative builders creating the future of decentralized
            finance
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="glass-card gradient-border border-0 p-8 md:p-10 rounded-3xl">
            <div className="space-y-6">
              <div className="flex items-start gap-5 p-4 rounded-2xl hover:bg-primary/5 transition-colors duration-300 group">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl icon-gradient border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold">Built for Movement</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    MooveMoney showcases the power of combining Movement&apos;s
                    MoveVM with cutting-edge AI to create accessible financial
                    tools that empower everyone.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-4 rounded-2xl hover:bg-primary/5 transition-colors duration-300 group">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl icon-gradient border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold">
                    Secure Infrastructure
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Leveraging Movement&apos;s secure, scalable platform and
                    Privy&apos;s authentication to deliver enterprise-grade
                    wallet security.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-4 rounded-2xl hover:bg-primary/5 transition-colors duration-300 group">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl icon-gradient border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold">Growing Network</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Be part of the expanding Movement ecosystem with DeFi
                    protocols, NFT platforms, and innovative dApps all built
                    with Move.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <Card className="overflow-hidden glass-card gradient-border border-0 rounded-3xl relative">
          {/* Background gradient orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

          <div className="px-6 py-20 text-center md:px-12 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Early Access
            </div>
            <h2 className="mb-6 text-balance text-3xl font-bold md:text-5xl">
              Ready to experience the future of{" "}
              <span className="gradient-text">crypto?</span>
            </h2>
            <p className="mx-auto max-w-xl mb-10 text-pretty text-lg text-muted-foreground">
              Join 2,000+ early adopters on the waitlist. Be among the first to
              experience AI-powered crypto management.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-base gap-2 rounded-full px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 glow-sm"
              >
                <Sparkles className="h-5 w-5" />
                Join the Waitlist
              </Button>
              <a href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base bg-transparent gap-2 rounded-full px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                >
                  Explore Features
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 shadow-lg">
                  <Wallet className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  MooveMoney
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The AI-powered mobile wallet for everyone. Simplifying crypto,
                one conversation at a time.
              </p>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-foreground/80">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-foreground/80">
                Developers
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-foreground/80">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 MooveMoney. Built on Movement, secured by Privy.</p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="hover:text-primary transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-200"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
