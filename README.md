# Admin Dashboard

A modern, dark-themed admin dashboard built with Next.js, React, and Tailwind CSS, inspired by the Wellmetrix design.

## Features

- 🎨 **Modern Dark Theme** - Beautiful dark UI with accent colors
- 📊 **Data Visualizations** - Charts and graphs using Recharts
- 📱 **Responsive Design** - Works on all device sizes
- 🧭 **Sidebar Navigation** - Collapsible sidebar with icon navigation
- 📈 **Analytics Dashboard** - Comprehensive analytics and insights
- 👥 **User Management** - User administration and monitoring
- ⚙️ **Settings** - Customizable settings and preferences
- 🔔 **Notifications** - Notification management system

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the admin dashboard directory:
```bash
cd admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
admin-dashboard/
├── app/
│   ├── analytics/      # Analytics page
│   ├── users/          # User management page
│   ├── settings/       # Settings page
│   ├── content/        # Content management page
│   ├── apps/           # Apps & integrations page
│   ├── notifications/  # Notifications page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Dashboard home page
│   └── globals.css     # Global styles
├── components/
│   ├── layout/         # Layout components (Sidebar, Header)
│   ├── dashboard/      # Dashboard widgets
│   └── ui/            # UI components (Card, etc.)
└── lib/
    └── utils.ts       # Utility functions
```

## Pages

- **Dashboard** (`/`) - Main dashboard with widgets and visualizations
- **Analytics** (`/analytics`) - Detailed analytics and charts
- **Users** (`/users`) - User management and administration
- **Content** (`/content`) - Content management
- **Apps** (`/apps`) - Apps and integrations
- **Settings** (`/settings`) - Settings and preferences
- **Notifications** (`/notifications`) - Notification center

## Technologies

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Chart library
- **Lucide React** - Icons
- **Framer Motion** - Animations

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
    dark: {
        bg: "#1A1A1A",
        card: "#282828",
        hover: "#2A2A2A",
        border: "#404040",
    },
    accent: {
        purple: "#A78BFA",
        blue: "#60A5FA",
        orange: "#FB923C",
        pink: "#F472B6",
    },
}
```

## Build

```bash
npm run build
```

## License

MIT
