-- Add policy to allow supabase_auth_admin to insert into users table
CREATE POLICY insert_users ON public.users
    FOR INSERT
    TO supabase_auth_admin
    WITH CHECK (true);

-- Modify the deny_all_users policy to exclude supabase_auth_admin
DROP POLICY IF EXISTS deny_all_users ON public.users;
CREATE POLICY deny_all_users ON public.users
    FOR ALL
    TO anon
    USING (false);

-- Grant necessary permissions to supabase_auth_admin
GRANT ALL ON TABLE public.users TO supabase_auth_admin;

-- Ensure supabase_auth_admin has usage on the public schema
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;

-- Grant execute permission on the handle_new_user function to supabase_auth_admin
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;
