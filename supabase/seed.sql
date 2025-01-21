-- Insert sample authors
INSERT INTO authors (id, name, bio, avatar_url) VALUES
('a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f', 'John Doe', 'Tech enthusiast and software engineer', 'https://example.com/john-doe-avatar.jpg'),
('b2c3d4e5-f6a7-5432-8765-2b3c4d5e6f7a', 'Jane Smith', 'AI researcher and data scientist', 'https://example.com/jane-smith-avatar.jpg');

-- Insert sample categories
INSERT INTO categories (id, name, description) VALUES
('c3d4e5f6-a7b8-6543-8765-3c4d5e6f7a8b', 'Technology', 'Latest news and trends in technology'),
('d4e5f6a7-b8c9-7654-8765-4d5e6f7a8b9c', 'Artificial Intelligence', 'Exploring the world of AI and machine learning');

-- Insert sample articles
INSERT INTO articles (id, title, content, excerpt, author_id, category_id, featured_image) VALUES
('e5f6a7b8-c9d0-8765-8765-5e6f7a8b9c0d', 'The Future of Web Development', 
'<p>Web development is constantly evolving, with new technologies and frameworks emerging every year. In this article, we''ll explore some of the most exciting trends that are shaping the future of web development.</p>
<h2>1. Progressive Web Apps (PWAs)</h2>
<p>Progressive Web Apps are becoming increasingly popular due to their ability to provide an app-like experience within a web browser. They offer features such as offline functionality, push notifications, and fast loading times.</p>
<h2>2. JAMstack Architecture</h2>
<p>JAMstack (JavaScript, APIs, and Markup) is a modern web development architecture that focuses on performance, security, and scalability. It leverages static site generation and serverless functions to create fast and efficient web applications.</p>
<h2>3. WebAssembly</h2>
<p>WebAssembly is a low-level language that allows developers to run high-performance code in web browsers. It opens up new possibilities for running complex applications directly in the browser, including games, video editing tools, and more.</p>
<p>As these technologies continue to mature, we can expect web development to become even more powerful and versatile in the coming years.</p>',
'Explore the latest trends shaping the future of web development, including Progressive Web Apps, JAMstack architecture, and WebAssembly.',
'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f', 'c3d4e5f6-a7b8-6543-8765-3c4d5e6f7a8b',
'https://understandingdata.com/_next/image/?url=https%3A%2F%2Fwebsite.understandingdata.com%2Fwp-content%2Fuploads%2F2020%2F03%2Fweb-scraping-tools.jpg&w=384&q=75'),

('f6a7b8c9-d0e1-9876-8765-6f7a8b9c0d1e', 'Understanding Machine Learning Algorithms', 
'<p>Machine learning is a rapidly growing field that powers many of the AI applications we use today. In this article, we''ll introduce some fundamental machine learning algorithms and explain how they work.</p>
<h2>1. Linear Regression</h2>
<p>Linear regression is a simple but powerful algorithm used for predicting numerical values. It works by finding the best-fitting line through a set of data points.</p>
<h2>2. Decision Trees</h2>
<p>Decision trees are versatile algorithms that can be used for both classification and regression tasks. They work by creating a tree-like model of decisions based on features in the data.</p>
<h2>3. Neural Networks</h2>
<p>Neural networks are inspired by the human brain and are capable of learning complex patterns in data. They consist of interconnected layers of nodes (neurons) that process and transmit information.</p>
<p>By understanding these fundamental algorithms, you''ll have a solid foundation for exploring more advanced topics in machine learning and artificial intelligence.</p>',
'Dive into the world of machine learning with an introduction to fundamental algorithms like linear regression, decision trees, and neural networks.',
'b2c3d4e5-f6a7-5432-8765-2b3c4d5e6f7a', 'd4e5f6a7-b8c9-7654-8765-4d5e6f7a8b9c',
'https://understandingdata.com/_next/image/?url=https%3A%2F%2Fwebsite.understandingdata.com%2Fwp-content%2Fuploads%2F2020%2F07%2Fmachine-learning-finance-industry.png&w=384&q=75');