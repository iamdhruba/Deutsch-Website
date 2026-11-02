import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../components/UI/Button.jsx';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-7xl font-black font-heading text-emerald-600">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Seite nicht gefunden (Page Not Found)
        </h2>
        <p className="text-sm text-slate-500">
          The page you requested could not be located on DeutschHub.
        </p>
        <Link to="/">
          <Button variant="primary" icon={Home} className="mt-4">
            Zurück zur Startseite (Return Home)
          </Button>
        </Link>
      </div>
    </div>
  );
}
