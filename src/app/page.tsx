import { createClient } from '../lib/supabase/server';
import { HomePage } from '../views/home-page';

export const revalidate = 0;

export default async function Page() {
  const supabase = await createClient();

  const { data: categories } = await supabase.from('categories').select('*');
  const { data: goalCollections } = await supabase.from('goals').select('*');
  
  // Fetch hits and their variants
  const { data: weekHits } = await supabase
    .from('products')
    .select('*, product_variants(*)');

  const formattedHits = weekHits?.map((p: any) => {
    let defaultVariant = p.product_variants?.[0];
    if (p.product_type === 'set' && p.product_variants) {
      defaultVariant = p.product_variants.find((v: any) => v.days_count === 1 || String(v.label).includes('1')) || p.product_variants[0];
    }
    return {
      id: p.id,
      slug_id: p.slug_id,
      product_type: p.product_type || 'single',
      variants: p.product_variants || [],
      image: p.images?.[0] || '',
      name: p.name,
      description: p.description,
      calories: p.calories,
      protein: p.protein,
      fats: p.fats,
      carbs: p.carbs,
      badges: p.badges?.map((b: string) => ({ type: b, label: b === 'hit' ? 'Хит' : 'Скидка' })) || [],
      rating: p.rating,
      reviewCount: p.review_count,
      price: defaultVariant?.price || 0,
      oldPrice: defaultVariant?.old_price,
      categoryId: p.category_id,
      dietTypes: p.diet_types || []
    }
  }) || [];

  const { data: reviews } = await supabase.from('reviews').select('*');

  return (
    <HomePage 
      initialCategories={categories || []}
      initialGoalCollections={goalCollections || []}
      initialWeekHits={formattedHits}
      initialReviews={reviews || []}
    />
  );
}
