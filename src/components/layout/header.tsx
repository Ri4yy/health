"use client";
import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '../core/input';
import { Button } from '../core/button';
import { useStore } from '../../store/useStore';
import { createClient } from '../../lib/supabase/client';

export interface HeaderProps {
  cartItemsCount?: number;
  favoritesCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  categories?: string[];
  onCategoryClick?: (category: string) => void;
  onSearchChange?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemsCount = 0,
  favoritesCount = 0,
  isLoggedIn = false,
  userName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { label: 'Каталог', href: '/catalog' },
    { label: 'О компании', href: '/about' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'ИИ-подбор', href: '/ai-recommendation' },
  ];

  const [mounted, setMounted] = useState(false);
  const cart = useStore((state) => state.cart);
  const favorites = useStore((state) => state.favorites);

  const [sessionUser, setSessionUser] = useState<any>(null);
  const [profileName, setProfileName] = useState<string>('');
  const setUser = useStore((state) => state.setUser);
  const setFavorites = useStore((state) => state.setFavorites);

  React.useEffect(() => {
    setMounted(true);

    const supabase = createClient();

    const fetchAndSyncFavorites = async (userId: string) => {
      // 1. Get current local favorites
      const localFavorites = useStore.getState().favorites;
      
      // 2. Fetch DB favorites
      const { data: dbFavs } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', userId);
      
      const dbFavIds = dbFavs?.map(f => f.product_id) || [];
      
      // 3. Merge local into DB (if any new ones added while guest)
      const newToDb = localFavorites.filter(id => !dbFavIds.includes(id));
      if (newToDb.length > 0) {
        await supabase.from('favorites').insert(
          newToDb.map(productId => ({ user_id: userId, product_id: productId }))
        );
      }

      // 4. Update store with combined list
      const combined = Array.from(new Set([...dbFavIds, ...localFavorites]));
      setFavorites(combined);
    };

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSessionUser(session.user);
        setUser(session.user);
        setProfileName(session.user.user_metadata?.full_name?.split(' ')[0] || '');
        fetchAndSyncFavorites(session.user.id);
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSessionUser(session.user);
        setUser(session.user);
        setProfileName(session.user.user_metadata?.full_name?.split(' ')[0] || '');
        fetchAndSyncFavorites(session.user.id);
      } else {
        setSessionUser(null);
        setUser(null);
        setProfileName('');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setFavorites]);

  const displayCartCount = mounted ? cart.reduce((acc, c) => acc + c.quantity, 0) : cartItemsCount;
  const displayFavsCount = mounted ? favorites.length : favoritesCount;
  
  const finalIsLoggedIn = isLoggedIn || !!sessionUser;
  const finalUserName = userName || profileName;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-[var(--color-neutral-200)] sticky top-0 z-50 shadow-[var(--shadow-sm)]">
      <div className="container">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 hover:bg-[var(--color-neutral-100)] rounded-[8px] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/" className="text-2xl font-bold text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors">ЭкоЕда</Link>
          </div>

          {/* Search - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:block flex-1 max-w-md">
            <Input
              variant="search"
              placeholder="Поиск блюд..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/favorites"
              className="relative p-2 hover:bg-[var(--color-neutral-100)] rounded-[8px] transition-colors"
              aria-label="Избранное"
            >
              <Heart className="w-5 h-5 text-[var(--color-neutral-700)]" />
              {displayFavsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-accent-500)] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                  {displayFavsCount > 9 ? '9+' : displayFavsCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => router.push('/cart')}
              className="relative p-2 hover:bg-[var(--color-neutral-100)] rounded-[8px] transition-colors"
              aria-label="Корзина"
            >
              <ShoppingCart className="w-5 h-5 text-[var(--color-neutral-700)]" />
              {displayCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary-500)] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                  {displayCartCount > 9 ? '9+' : displayCartCount}
                </span>
              )}
            </button>

            {/* User */}
            {finalIsLoggedIn ? (
              <button 
                onClick={() => router.push('/account')}
                className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-[var(--color-neutral-100)] rounded-[8px] transition-colors"
              >
                <User className="w-5 h-5 text-[var(--color-neutral-700)]" />
                <span className="text-sm font-medium text-[var(--color-neutral-800)]">{finalUserName || 'Профиль'}</span>
              </button>
            ) : (
              <Button onClick={() => router.push('/account')} variant="ghost" size="sm" className="hidden sm:flex">
                Вход
              </Button>
            )}
          </div>
        </div>

        {/* Search - Mobile */}
        <form onSubmit={handleSearchSubmit} className="md:hidden pb-4">
          <Input
            variant="search"
            placeholder="Поиск блюд..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>

        {/* Categories - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 border-t border-[var(--color-neutral-200)] overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-sm font-medium text-[var(--color-neutral-700)] hover:text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] rounded-t-[8px] transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-neutral-200)] bg-white">
          <nav className="container py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-[var(--color-neutral-700)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] rounded-[8px] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
