# MooveMoney

MooveMoney is an AI-powered mobile wallet that lets you send, receive, and execute on-chain actions using simple chat or voice commands. Built on **Movement Network** and secured by **Privy**.

This repository contains the landing page for MooveMoney, featuring a modern, responsive design with interactive elements and smooth animations.

## ✨ Features

- **Modern UI/UX** - Glassmorphism effects, gradient accents, and smooth animations
- **Interactive Demo** - Try the chat/voice interface directly on the landing page
- **Responsive Design** - Fully responsive across all device sizes
- **Smooth Scrolling** - Animated navigation between sections
- **Dark Mode Ready** - Built with theming support via next-themes
- **Accessible** - Built with Radix UI primitives for accessibility
- **Performance Optimized** - Next.js 16 with React 19 for optimal performance

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS animations + Tailwind Animate
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/moove-money-landing-page.git
   cd moove-money-landing-page
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
moove-money-landing-page/
├── app/
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout with theme provider
│   └── page.tsx         # Main landing page
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── hero-demo.tsx    # Interactive chat/voice demo
│   ├── navbar.tsx       # Modern floating navbar
│   └── theme-provider.tsx
├── hooks/               # Custom React hooks
├── lib/
│   └── utils.ts         # Utility functions (cn helper)
├── public/              # Static assets
└── styles/              # Additional stylesheets
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 🎨 Customization

### Colors

The color scheme is defined in `app/globals.css` using CSS custom properties. The primary accent is a golden yellow (`oklch(0.82 0.15 85)`) inspired by Movement Network branding.

```css
:root {
  --primary: oklch(0.82 0.15 85);
  /* ... other variables */
}
```

### Theme

The site supports both light and dark modes. Theme switching is handled by `next-themes`. The dark theme features a deep black background with the golden accent.

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/moove-money-landing-page)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

```bash
# Build the application
pnpm build

# The output will be in the .next folder
# Deploy according to your platform's documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Movement Network**: [https://movementlabs.xyz](https://movementlabs.xyz)
- **Privy**: [https://privy.io](https://privy.io)

---

<div align="center">
  <p>Built with ❤️ on Movement Network, secured by Privy</p>
  <p>© 2025 MooveMoney</p>
</div>

