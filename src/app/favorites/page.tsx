import { FavoritesPage } from '../../views/favorites-page';

export const metadata = {
  title: 'Избранное | ЭкоЕда',
  description: 'Ваш список избранных блюд и наборов для здорового питания.',
};

export default function Page() {
  return <FavoritesPage />;
}
