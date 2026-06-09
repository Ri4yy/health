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
    { label: 'Подбор', href: '/ai-recommendation' },
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
            <Link href="/" className="text-2xl font-bold text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="110" height="54" viewBox="0 0 110 54" fill="none">
                <path d="M14.9599 3.97523L14.4824 7.43123H10.2978V23.6064H5.80415V7.43123H1.3667V3.97523H14.9599ZM22.7978 3.49365C25.3629 3.49365 27.3383 4.37182 28.7238 6.12814C30.1095 7.86559 30.8022 10.4151 30.8022 13.7767C30.8022 17.1005 30.1001 19.65 28.6957 21.4252C27.3102 23.2004 25.3442 24.088 22.7978 24.088C20.2514 24.088 18.2761 23.2099 16.8719 21.4535C15.4863 19.6972 14.7936 17.1382 14.7936 13.7767C14.7936 10.4718 15.4863 7.93169 16.8719 6.15647C18.2761 4.38126 20.2514 3.49365 22.7978 3.49365ZM22.7978 6.80801C21.6557 6.80801 20.8131 7.34624 20.2702 8.4227C19.7459 9.49916 19.4838 11.2838 19.4838 13.7767C19.4838 16.3073 19.7553 18.1108 20.2983 19.1873C20.8412 20.2449 21.6744 20.7737 22.7978 20.7737C23.94 20.7737 24.7731 20.2449 25.2974 19.1873C25.8404 18.1108 26.1119 16.3073 26.1119 13.7767C26.1119 11.2838 25.8404 9.49916 25.2974 8.4227C24.7731 7.34624 23.94 6.80801 22.7978 6.80801ZM45.9085 3.97523V23.6064H41.4149V16.3262C40.8345 16.8361 40.2353 17.2138 39.6174 17.4593C39.0183 17.7048 38.3255 17.8276 37.5391 17.8276C35.8915 17.8276 34.5808 17.2893 33.6072 16.2129C32.6336 15.1175 32.1468 13.6067 32.1468 11.6804V3.97523H36.5562V11.4255C36.5562 12.5208 36.7434 13.3045 37.1179 13.7767C37.4923 14.2299 38.0728 14.4565 38.8591 14.4565C39.8889 14.4565 40.7408 14.0977 41.4149 13.3801V3.97523H45.9085ZM63.2224 3.97523L59.0096 12.8985L63.6998 23.6064H58.9254L55.2181 15.0231H53.5049V23.6064H49.0113V3.97523H53.5049V11.7087H55.3305L58.9254 3.97523H63.2224ZM74.464 23.6064L73.5934 19.3289H68.6504L67.7798 23.6064H63.2297L68.4819 3.97523H73.8743L79.0981 23.6064H74.464ZM69.3245 16.0712H72.9194L71.1219 7.28959L69.3245 16.0712Z" fill="#3A9B66"/>
                <path d="M7.75173 36.6729C10.036 36.6729 11.7866 37.1922 13.0036 38.2309C14.2394 39.2507 14.8573 40.771 14.8573 42.7917C14.8573 44.9446 14.2207 46.5688 12.9475 47.6641C11.6743 48.7406 9.91428 49.2788 7.66747 49.2788H1.54492V29.6476H12.779L12.3296 33.0753H6.03854V36.6729H7.75173ZM7.38662 45.9928C8.34152 45.9928 9.04365 45.7473 9.49301 45.2562C9.94237 44.7463 10.167 43.9437 10.167 42.8484C10.167 41.8286 9.93301 41.0732 9.46492 40.5821C9.01556 40.0722 8.29471 39.8173 7.30237 39.8173H6.03854V45.9928H7.38662ZM25.9004 49.2788L25.0298 45.0013H20.0868L19.2162 49.2788H14.6664L19.9183 29.6476H25.3106L30.5346 49.2788H25.9004ZM20.7608 41.7436H24.3557L22.5583 32.962L20.7608 41.7436ZM45.3065 29.6476V49.2788H40.8129V33.1036H37.639L36.9371 39.9023C36.6937 42.2252 36.3754 44.0193 35.9822 45.2846C35.589 46.5499 35.0367 47.5225 34.3252 48.2023C33.6137 48.8822 32.6027 49.4016 31.292 49.7604L30.2245 46.5593C30.7865 46.2949 31.2078 45.955 31.4886 45.5395C31.7882 45.1052 32.0222 44.4631 32.1907 43.6132C32.378 42.7634 32.5652 41.4414 32.7524 39.6473L33.7916 29.6476H45.3065ZM57.7704 49.2788L56.8998 45.0013H51.9568L51.0862 49.2788H46.5364L51.7883 29.6476H57.1806L62.4045 49.2788H57.7704ZM52.6309 41.7436H56.2257L54.4283 32.962L52.6309 41.7436ZM72.9917 49.2788V40.8371H68.133V49.2788H63.6393V29.6476H68.133V37.2961H72.9917V29.6476H77.4853V49.2788H72.9917ZM87.8926 29.166C89.016 29.166 90.0177 29.3454 90.8977 29.7042C91.7777 30.0631 92.6109 30.6013 93.3973 31.3189L91.2628 33.8401C90.7573 33.4058 90.2517 33.0847 89.7462 32.877C89.2594 32.6503 88.7351 32.537 88.1734 32.537C85.7394 32.537 84.5224 34.8316 84.5224 39.4207C84.5224 43.972 85.7488 46.2477 88.2015 46.2477C88.8381 46.2477 89.3998 46.125 89.8866 45.8795C90.3922 45.6151 90.9539 45.2374 91.5717 44.7463L93.5939 47.2392C92.9011 47.9757 92.0679 48.58 91.0943 49.0522C90.1394 49.5243 89.0815 49.7604 87.9207 49.7604C86.2917 49.7604 84.8688 49.3732 83.6517 48.5989C82.4534 47.8246 81.5173 46.6632 80.8432 45.1146C80.1692 43.566 79.8322 41.668 79.8322 39.4207C79.8322 37.23 80.1785 35.3698 80.8713 33.8401C81.5641 32.2915 82.5096 31.1301 83.7079 30.3558C84.9249 29.5626 86.3198 29.166 87.8926 29.166ZM104.643 49.2788L103.772 45.0013H98.8294L97.9587 49.2788H93.409L98.6609 29.6476H104.053L109.277 49.2788H104.643ZM99.5034 41.7436H103.098L101.301 32.962L99.5034 41.7436Z" fill="#3A9B66"/>
              </svg>
            </Link>
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
