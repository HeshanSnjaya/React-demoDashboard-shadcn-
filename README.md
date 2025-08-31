# DemoApp - Loan Management Dashboard

## 📋 Overview

DemoApp is a modern, responsive React application designed as a comprehensive Loan Management Dashboard. It enables users to efficiently manage borrower information, track loan applications through various stages, analyze AI-driven risk assessments, and monitor broker performance through an intuitive and sleek interface.

## 🔧 Tech Stack

- **Frontend Framework:** React (with functional components) + TypeScript
- **Styling:** Tailwind CSS + [ShadCN UI](https://ui.shadcn.com) components
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for managing active borrower, tab state, and shared app context
- **Icons:** [Lucide Icons](https://lucide.dev) (integrated with ShadCN UI)
- **Form Handling:** 
  - [Zod](https://zod.dev) for schema-based validation
  - [React Hook Form](https://react-hook-form.com) for form state management
- **Testing:** [Playwright](https://playwright.dev) for E2E automation
- **Build Tools:** Vite/Create React App (modern React setup)

## ✨ Features

### 🏦 Borrower Pipeline (Left Panel)
- Interactive tabs: `"New"`, `"In Review"`, `"Approved"`
- Borrower cards displaying:
  - Name and loan type
  - Amount (right-aligned)
  - Status labels with color coding
- Click-to-select borrower interaction
- Radio group with `F-SANITISED ACTIVE` filter

### 👤 Borrower Details (Middle Panel)
- **Header Section:** Name, email, phone, loan amount, status badge
- **AI Explainability:** Expandable accordion showing:
  - Income inconsistency warnings
  - High debt-to-income ratio alerts
  - Action buttons: `Request Documents`, `Send to Valuer`, `Approve`
- **Loan Summary:** Employment, existing loans, credit score, source of funds
- **Risk Signals:** Warning callouts with icons
- **Escalate Button:** Primary-colored "Escalate to Credit Committee" action

### 🤝 Broker Overview (Right Panel)
- Broker information and performance stats
- Key metrics: Deals (16), Approval Rate (75%), Pending ($7,660)
- Contact buttons: Call, Email, Chat
- **Onboarding Workflow:** 7-step process tracker
- **AI Assistant Toggle:** Feature enablement switch

## 📡 API Endpoints

All APIs are mocked with comprehensive responses. Key endpoints include:

- `GET /api/borrowers/pipeline` - Fetch borrower lists by status
- `GET /api/borrowers/{id}` - Get detailed borrower information  
- `POST /api/borrowers/{id}/request-documents` - Request additional documents
- `POST /api/borrowers/{id}/send-valuer` - Send to property valuer
- `POST /api/borrowers/{id}/approve` - Approve loan application
- `POST /api/borrowers/{id}/escalate` - Escalate to credit committee
- `GET /api/broker/{id}` - Fetch broker performance data
- `GET /api/onboarding/workflow` - Get workflow steps

## 🏗️ Project Structure

src/
├── components/
│ ├── ui/ # ShadCN UI components
│ ├── borrower/
│ │ ├── BorrowerPipeline.tsx
│ │ └── BorrowerDetail.tsx
│ ├── broker/
│ │ └── BrokerOverview.tsx
│ └── layout/
│ └── Layout.tsx
├── pages/
│ ├── Login.tsx
│ └── Dashboard.tsx
├── store/
│ ├── useAuthStore.ts # Authentication state
│ └── useAppStore.ts # Application state
├── types/
│ ├── index.ts
│ ├── borrower.ts
│ ├── auth.ts
│ └── broker.ts
├── tests/
│ └── e2e/
│ ├── auth.spec.ts
│ ├── dashboard.spec.ts
│ └── pipeline.spec.ts
└── readme.md


## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

**Clone the repository**
git clone [repository-url]
cd demo-app

**Install dependencies**
npm install

**Install ShadCN UI components**
npx shadcn@latest add accordion card badge alert button input select tabs

**Start development server**
npm run dev

Open browser to http://localhost:3000


### Development Commands

**Start development server**
npm run dev

**Build for production**
npm run build

**Run type checking**
npm run type-check

**Run linting**
npm run lint

**Run all tests**
npm test

**Run Playwright E2E tests**
npx playwright test

**Run tests with UI**
npx playwright test --ui

**Run tests in headed mode**
npx playwright test --headed


## 🧪 Testing

### E2E Test Coverage

The application includes comprehensive Playwright tests that validate:

- **Authentication Flow:**
  - Login redirect for unauthenticated users
  - Form-based login with role selection
  - Quick role button authentication
  - Logout functionality

- **Dashboard Functionality:**
  - Pipeline tab switching and borrower list updates
  - Borrower selection updating center pane
  - AI Explainability accordion expand/collapse
  - Action button interactions with console logging
  - "Escalate to Credit Committee" button state
  - Responsive layout across different screen sizes

- **Pipeline Interactions:**
  - Radio group selection
  - Broker overview information display
  - Onboarding workflow step visibility
  - AI assistant toggle functionality

### Test Best Practices

- Uses stable `data-testid` attributes for reliable element targeting
- Implements proper async handling with `waitForLoadState` and timeouts
- Follows Playwright best practices for robust, non-flaky tests
- Tests across Chromium, Firefox, and WebKit browsers

### Running Tests

**Run all tests**
npx playwright test

**Run specific test file**
npx playwright test src/tests/e2e/dashboard.spec.ts

**Run with debug mode**
npx playwright test --debug

**Generate test report**
npx playwright show-report


## 📱 Responsive Design

- **Desktop:** 3-column grid layout with full feature visibility
- **Mobile:** Stacked vertical layout with collapsible sections
- **Breakpoints:** Tailwind CSS responsive utilities
- **Adaptive Components:** Accordions and modals for mobile optimization

## 🔐 Authentication & Access Control

- Role-based authentication system
- Supported roles: `ADMIN`, `BROKER`, `ANALYST`, `VIEWER`
- Protected routes with automatic redirect
- Role-specific feature access (optional implementation)

### Login Credentials

For testing purposes, use any valid input or click the quick role buttons:
- Admin
- Broker  
- Analyst
- Viewer

## 🎨 UI Components

The application uses ShadCN UI components for consistency:

- **Forms:** Input, Select, Button components with validation
- **Layout:** Card, Accordion, Tabs for structured content
- **Feedback:** Alert, Badge components for status display
- **Navigation:** Responsive navigation with role-based access

## ⚡ Performance

- Lazy loading of components
- Optimized bundle size with tree shaking
- Efficient state management with Zustand
- Responsive images and assets

## 🔧 Development

### Code Style

- TypeScript strict mode enabled
- ESLint and Prettier configuration
- Consistent component structure and naming
- Proper error handling and loading states

### Adding New Features

1. Create TypeScript interfaces in `src/types/`
2. Add Zustand store actions if needed
3. Build UI components using ShadCN UI
4. Add Playwright tests for new functionality
5. Update this README with new features

## ✅ Acceptance Criteria

- [x] Pipeline tabs update borrower list and active profile
- [x] AI Explainability section renders flags and is collapsible  
- [x] "Escalate to Credit Committee" button is conditionally enabled
- [x] Responsive layout across screen sizes
- [x] Consistent UI spacing/alignment using Tailwind classes
- [x] Form validation and error handling
- [x] Type safety with TypeScript
- [x] Comprehensive test coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ShadCN UI components for consistency
- Add appropriate test coverage for new features
- Ensure responsive design compatibility
- Follow existing code formatting and structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

Built with modern web technologies:

- [React](https://reactjs.org/) - UI library
- [ShadCN UI](https://ui.shadcn.com) - Component system
- [Radix UI](https://www.radix-ui.com/) - Primitive components  
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Playwright](https://playwright.dev/) - E2E testing framework
- [Lucide Icons](https://lucide.dev/) - Icon library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Review the test files for usage examples
3. Consult the ShadCN UI documentation
4. Create a new issue with detailed information

---

**DemoApp** - Streamlining loan management with modern web technology 🚀
