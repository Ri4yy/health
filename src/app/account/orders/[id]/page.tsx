import { createClient } from '../../../../lib/supabase/server';
import { OrderDetailsPage } from '../../../../views/order-details-page';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  // Fetch order with its items and product details
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product_variants (
          *,
          products (*)
        )
      )
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !order) {
    console.error('Order fetch error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Заказ не найден</h1>
          <p className="text-gray-500">Возможно, у вас нет доступа к этому заказу или он был удален.</p>
        </div>
      </div>
    );
  }

  return <OrderDetailsPage initialOrder={order} initialUser={user} />;
}
