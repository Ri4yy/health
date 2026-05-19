import { createClient } from '../../lib/supabase/server';
import { AccountPage } from '../../views/account-page';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function Page() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const { data: addresses } = await supabase.from('addresses').select('*').eq('user_id', user.id);
  
  // Получаем заказы вместе с их составом и данными товаров
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*, product_variants(*, products(*)))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <AccountPage 
      initialUser={user}
      initialProfile={profile}
      initialAddresses={addresses || []}
      initialOrders={orders || []}
    />
  );
}
