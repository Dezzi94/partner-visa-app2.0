-- Create authors table
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    bio TEXT NOT NULL DEFAULT '',
    avatar_url TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create articles table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    author_id UUID NOT NULL REFERENCES authors(id),
    category_id UUID NOT NULL REFERENCES categories(id),
    featured_image TEXT NOT NULL DEFAULT '',
    published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_articles_author_id ON articles(author_id);
CREATE INDEX idx_articles_category_id ON articles(category_id);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create a policy for read access (everyone can read)
CREATE POLICY read_authors ON authors FOR SELECT USING (true);
CREATE POLICY read_categories ON categories FOR SELECT USING (true);
CREATE POLICY read_articles ON articles FOR SELECT USING (true);

-- Create policies for insert, update, and delete (only service role can perform these actions)
CREATE POLICY insert_authors ON authors FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY update_authors ON authors FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY delete_authors ON authors FOR DELETE USING (auth.role() = 'service_role');

CREATE POLICY insert_categories ON categories FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY update_categories ON categories FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY delete_categories ON categories FOR DELETE USING (auth.role() = 'service_role');

CREATE POLICY insert_articles ON articles FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY update_articles ON articles FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY delete_articles ON articles FOR DELETE USING (auth.role() = 'service_role');