SET search_path TO siuser;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'siuser' 
                   AND table_name = 'users' 
                   AND column_name = 'role') THEN
        ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user';
    END IF;
END $$;

INSERT INTO users (email, password, role) 
VALUES ('admin@test.com', '$2b$10$rVKQpZZjGj6tkjm.lQQmS.ZQjGKjN8J7Vh0l.nzr7rI9oVx6.bqGu', 'admin')
ON CONFLICT (email) DO UPDATE SET role = 'admin';

UPDATE users SET role = 'user' WHERE role IS NULL;
