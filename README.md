# User Management System

A modern user management system built with Next.js, TypeScript, and PostgreSQL.

## Features

- 🔐 **Authentication**: Secure login/register with session-based auth
- 👥 **User Management**: Create, manage, and authenticate users
- 🛡️ **Protected Routes**: Middleware-based route protection
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- 🌙 **Dark Mode**: Built-in theme switching
- 📱 **Responsive**: Mobile-first design
- 🔒 **Security**: Password hashing with bcrypt, secure sessions

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL
- **Authentication**: Custom session-based auth
- **Validation**: Zod schemas
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your database URL:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/user_management
   ```

4. Set up the database:
   - Create a PostgreSQL database
   - Run the SQL commands from `command.sql` to create the required tables

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses the following tables:

### Users Table
```sql
CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

### Sessions Table
```sql
CREATE TABLE sessions(
    token TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

## API Routes

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

## Features

### Authentication System

- **Registration**: Users can create accounts with email/password
- **Login**: Secure login with password verification
- **Sessions**: Server-side session management with cookies
- **Logout**: Secure session termination
- **Protected Routes**: Middleware protects `/admin` routes

### UI Components

- **Login Form**: Responsive login form with validation
- **Register Form**: Registration form with password confirmation
- **Navbar**: Dynamic navigation with auth state
- **Admin Dashboard**: Protected admin interface

### Security Features

- Password hashing with bcrypt
- HTTP-only cookies for sessions
- CSRF protection
- Input validation with Zod
- Secure middleware for route protection

## Project Structure

```
├── app/
│   ├── api/auth/          # Authentication API routes
│   ├── admin/             # Protected admin pages
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── auth/              # Authentication components
│   ├── ui/                # Reusable UI components
│   └── navbar.tsx         # Navigation component
├── hooks/
│   └── useAuth.tsx        # Authentication context/hook
├── lib/
│   ├── db.ts              # Database connection
│   ├── session.ts         # Session management
│   └── validations/       # Zod schemas
└── middleware.ts          # Route protection middleware
```

## Development

### Adding New Features

1. **API Routes**: Add new routes in `app/api/`
2. **Pages**: Create new pages in `app/`
3. **Components**: Add reusable components in `components/`
4. **Hooks**: Add custom hooks in `hooks/`
5. **Validation**: Add Zod schemas in `lib/validations/`

### Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment (development/production)

## Deployment

1. Set up a PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred platform (Vercel, Railway, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
