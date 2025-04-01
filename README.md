# Enginuity - AI-Powered Coding Education

Enginuity is a modern platform that helps you learn coding through personalized AI-powered projects and guidance. Unlike traditional coding platforms, Enginuity adapts to your goals and creates custom learning experiences that match your aspirations.

## Features

- AI-powered personalized learning paths
- Dynamic project creation based on your goals
- Interactive coding environment
- Career-focused learning approach
- Real-world project experience

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (for waitlist functionality)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/enginuity.git
cd enginuity
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase project URL and anon key

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

This project is configured for deployment on GitHub Pages. To deploy:

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. The site will be available at `https://yourusername.github.io/enginuity`

### Manual Deployment

If you need to deploy manually:

```bash
# Build the project
npm run build

# The static files will be in the ./out directory
# Copy these files to your GitHub Pages branch
```

## Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Create a new table called `waitlist` with the following columns:
   - `id` (uuid, primary key)
   - `email` (text, unique)
   - `created_at` (timestamp with timezone)
3. Copy your project URL and anon key to `.env.local`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@enginuity.com or join our Discord community.
