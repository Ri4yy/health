import { createClient } from '../../../lib/supabase/server';
import { ProductPage } from '../../../views/product-page';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const isNumeric = !isNaN(Number(params.id));
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_variants(*), reviews(*)')
    .eq(isNumeric ? 'slug_id' : 'id', params.id)
    .single();

  if (error || !product) {
    return notFound();
  }

  const { data: related } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(3);

  const formattedRelated = related?.map((p: any) => {
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
    };
  }) || [];

  return (
    <ProductPage 
      initialProduct={product} 
      initialRelated={formattedRelated} 
      initialUser={user} 

    />
  );
}
