# Admin Setup Instructions

Since you don't have an admin user yet, follow these steps to create one:

## Option 1: Run the Migration Script

1. Connect to your Neon PostgreSQL database
2. Run the migration script `migration.sql` which will:
   - Add the `role` column to the users table
   - Create a default admin user with:
     - Email: `admin@test.com`
     - Password: `admin123`
     - Role: `admin`

## Option 2: Manual Database Update

1. Connect to your database and run:

```sql
-- Add role column
ALTER TABLE siuser.users ADD COLUMN role TEXT NOT NULL DEFAULT 'user';

-- Create admin user (change email/password as needed)
INSERT INTO siuser.users (email, password, role) 
VALUES ('admin@test.com', '$2b$10$rVKQpZZjGj6tkjm.lQQmS.ZQjGKjN8J7Vh0l.nzr7rI9oVx6.bqGu', 'admin');
```

## Option 3: Promote Existing User

If you already have a user account, you can promote it to admin:

```sql
UPDATE siuser.users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Security Note

**IMPORTANT**: Change the default admin password immediately after first login!

The default credentials are:
- Email: `admin@test.com`
- Password: `admin123`

## After Setup

1. Login with the admin credentials
2. Change the password in the admin dashboard
3. Create additional admin users if needed
4. Delete or modify the default admin user as appropriate

---

**The role-based authentication system is now properly configured to prevent unauthorized access to admin features.**
