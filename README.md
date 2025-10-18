# Youth Research Publication Site

A comprehensive research publication platform for students, reviewers, and administrators built with React, TypeScript, and Vite.

## Features

### Public Pages
- **Landing Page** - Hero section, featured research, value propositions, how it works
- **Research Archive** - Browse all published research papers
- **Paper Details** - View individual research paper details

### Authentication
- **Login** - User authentication
- **Register** - New user registration with role selection (Student/Reviewer/Admin)

### Student Dashboard
- Submit research papers
- Track submission status
- Manage submissions

### Admin Portal
- **Dashboard** - KPI cards, activity feed, system overview
- **User Management** - View, edit, and manage all users
- **Submissions Management** - Review, approve/reject papers, assign reviewers

## Tech Stack

- **React 19.1.1** - UI library
- **TypeScript** - Type safety
- **Vite 7.1.7** - Build tool
- **React Router DOM 7.9.3** - Routing
- **Tailwind CSS 4.1.14** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible UI components
- **Lucide React** - Icons
- **React Hook Form** - Form handling

## Project Structure

```
src/
├── Components/
│   ├── Admin/              # Admin components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── KPICard.tsx
│   ├── LandingpageComponenets/  # UI component library (shadcn/ui)
│   ├── Researchpapercomponenets/
│   ├── StudentDashboard.tsx
│   └── SubmissionWizard.tsx
├── Pages/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── Admin/
│   │   ├── Dashboard.tsx
│   │   ├── UserManagement.tsx
│   │   └── SubmissionsManagement.tsx
│   ├── LandingPage/
│   └── ReserachPages/
├── App.tsx
└── main.tsx
```

## Routes

- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/allresearches` - Research archive
- `/paper/:id` - Paper details
- `/dashboard` - Student dashboard
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/submissions` - Submissions management

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Development Notes

- Path aliases configured with `@/` pointing to `src/`
- Tailwind CSS with custom theme variables
- Dark mode support via CSS variables
- All duplicate components removed and consolidated
