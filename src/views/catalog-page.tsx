"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { Filters } from '../components/ecommerce/filters';
import { ProductCard } from '../components/cards/product-card';
import { Pagination } from '../components/shared/pagination';
import { EmptyState } from '../components/shared/empty-state';
import { ListingSkeleton } from '../components/core/skeleton';
import { ToastContainer } from '../components/shared/toast';
import { Select } from '../components/core/input';
import { SlidersHorizontal, Search } from 'lucide-react';
import { Button } from '../components/core/button';
import { useStore } from '../store/useStore';

export const CatalogPage: React.FC<any> = ({ initialProducts = [], initialCategories = [], initialQuery = '', initialCategory = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [hasResults, setHasResults] = useState(true);
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);
  
  // States for filtering
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<any>({ categories: initialCategory ? [initialCategory] : [], diets: [], priceRange: { min: 0, max: 5000 } });
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  useEffect(() => {
    setSearchQuery(initialQuery);
    if(initialCategory) {
       setActiveFilters((prev: any) => ({ ...prev, categories: [initialCategory] }));
    }
  }, [initialQuery, initialCategory]);

  useEffect(() => {
    let result = [...initialProducts];

    // Search
    if (searchQuery) {
      result = result.filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Categories
    if (activeFilters.categories?.length > 0) {
      result = result.filter((p: any) => activeFilters.categories.includes(p.categoryId));
    }

    // Diets
    if (activeFilters.diets?.length > 0) {
      result = result.filter((p: any) => p.dietTypes?.some((d: string) => activeFilters.diets.includes(d)));
    }

    // Price
    if (activeFilters.priceRange) {
      result = result.filter((p: any) => p.price >= activeFilters.priceRange.min && p.price <= activeFilters.priceRange.max);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular':
      case 'new': 
      default: result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    setFilteredProducts(result);
    setHasResults(result.length > 0);
  }, [searchQuery, activeFilters, sortBy, initialProducts]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
    setShowFilters(false);
    addToast('success', 'Фильтры применены');
  };

  const handleResetFilters = () => {
    setActiveFilters({ categories: [], diets: [], priceRange: { min: 0, max: 5000 } });
    setSearchQuery('');
    addToast('info', 'Фильтры сброшены');
  };

  const handleAddToCart = (id: string, quantity: number) => {
    if (quantity > 0) {
      addToast('success', 'Товар добавлен в корзину');
    } else {
      addToast('info', 'Товар удален из корзины');
    }
  };

  const handleFavoriteToggle = (id: string) => {
    const isFavorite = useStore.getState().favorites.includes(id);
    if (isFavorite) {
      addToast('success', 'Товар добавлен в избранное');
    } else {
      addToast('info', 'Товар удален из избранного');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header
        cartItemsCount={0}
        favoritesCount={0}
        isLoggedIn={false}
      />

      <main className="flex-1">
        <div className="container py-6 lg:py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Каталог', href: '/catalog' },
            ]}
            className="mb-6"
          />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)] mb-2">
              Каталог товаров
            </h1>
            <p className="text-lg text-[var(--color-neutral-600)]">
              {hasResults ? `${filteredProducts.length} товаров` : 'Ничего не найдено'}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 xl:w-80 shrink-0">
              <Filters
                categories={initialCategories}
                dietTypes={[
                  { id: 'vegan', label: 'Веганское' },
                  { id: 'keto', label: 'Кето' },
                  { id: 'gluten-free', label: 'Без глютена' },
                  { id: 'no-sugar', label: 'Без сахара' },
                  { id: 'lactose-free', label: 'Без лактозы' },
                ]}
                priceRange={{ min: 0, max: 5000 }}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Фильтры
                </Button>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-neutral-400)]" />
                  <input
                    type="text"
                    placeholder="Поиск по каталогу..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[var(--color-neutral-200)] rounded-[8px] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div className="flex items-center gap-4 ml-auto">
                  <span className="text-sm text-[var(--color-neutral-600)] hidden sm:block">
                    Сортировка:
                  </span>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    options={[
                      { value: 'popular', label: 'Популярные' },
                      { value: 'price-asc', label: 'Сначала дешевле' },
                      { value: 'price-desc', label: 'Сначала дороже' },
                      { value: 'rating', label: 'По рейтингу' },
                      { value: 'new', label: 'Новинки' },
                    ]}
                    className="w-48"
                  />
                </div>
              </div>

              {/* Products Grid or Empty State */}
              {isLoading ? (
                <ListingSkeleton count={9} />
              ) : !hasResults ? (
                <EmptyState
                  title="Ничего не найдено"
                  description="Попробуйте изменить фильтры или поисковый запрос"
                  actionLabel="Сбросить все фильтры"
                  onAction={handleResetFilters}
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">
                    {filteredProducts.slice((currentPage - 1) * 9, currentPage * 9).map((product: any) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={handleAddToCart}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {filteredProducts.length > 9 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredProducts.length / 9)}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filters */}
      <Filters
        isMobile={true}
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        categories={initialCategories}
        dietTypes={[
          { id: 'vegan', label: 'Веганское' },
          { id: 'keto', label: 'Кето' },
          { id: 'gluten-free', label: 'Без глютена' },
          { id: 'no-sugar', label: 'Без сахара' },
          { id: 'lactose-free', label: 'Без лактозы' },
        ]}
        priceRange={{ min: 0, max: 5000 }}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
