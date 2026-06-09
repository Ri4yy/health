import { FavoritesPage } from '../../views/favorites-page';

export const metadata = {
  title: 'Избранное | Точка Баланса',
  description: 'Ваш список избранных блюд и наборов для здорового питания.',
};

export default function Page() {
  return <FavoritesPage />;
}
