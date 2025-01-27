# Movierex 🎬

A modern movie recommendation application built with Next.js, TypeScript, and Supabase.

## Features 🌟

- **Movie Discovery**: Browse through a vast collection of movies
- **Search Functionality**: Search for specific movies with real-time results
- **User Authentication**: Secure login and signup functionality
- **Favorites System**: Save and manage your favorite movies (requires authentication)
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Fully responsive across all devices
- **Genre Filtering**: Filter movies by different genres
- **Movie Details**: View comprehensive details about each movie including:
  - Ratings
  - Release dates
  - Runtime
  - Genres
  - Cast information

## Tech Stack 💻

- **Frontend**:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - React Icons
  - Lucide React

- **Backend**:
  - Supabase (Authentication & Database)
  - TMDB API (Movie Data)

- **State Management & Utilities**:
  - React Hooks
  - React Toastify
  - Custom Hooks

## Getting Started 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movierex.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure 📁
```bash
movierex/
├── app/ # Next.js app router pages
├── components/ # Reusable components
├── common/ # Common UI components
│ ├── shared/ # Shared components
│ └── ui/ # UI-specific components
├── data/ # Types and interfaces
├── hooks/ # Custom React hooks
├── lib/ # Library configurations
├── services/ # API and service functions
└── utils/ # Utility functions
```

## Key Features in Detail 🔍

### Authentication
- Email/Password authentication
- Protected routes
- Session management
- Middleware protection

### Movie Features
- Featured movies section
- Movie details page
- Genre-based filtering
- Search functionality
- Favorites system

### UI/UX
- Responsive design
- Dark/Light theme
- Loading states
- Toast notifications
- Custom button components
- Movie cards with hover effects

## Contributing 🤝
No contributions at the moment

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- TMDB API for movie data
- Supabase for backend services
- Next.js team for the amazing framework
