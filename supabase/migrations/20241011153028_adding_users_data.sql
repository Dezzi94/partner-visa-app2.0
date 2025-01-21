--  1. users schema:
CREATE TABLE public.users (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    avatar TEXT,
    stripe_customer_id TEXT,
    stripe_price_id TEXT,
    is_subscribed BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (id, email, stripe_customer_id, stripe_price_id, is_subscribed)
    VALUES (
        NEW.id, 
        NEW.email, 
        NULL,
        NULL,
        FALSE
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

GRANT INSERT ON TABLE public.users TO supabase_auth_admin;

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
 
-- Policy for users: allow authenticated users to read all user data
CREATE POLICY users_read_policy ON public.users
    FOR SELECT
    TO authenticated
    USING (true);


-- Deny all operations for non-authenticated users
CREATE POLICY deny_all_users ON public.users
    FOR ALL
    TO anon
    USING (false);
