import { createClient } from '../../lib/supabase/server';
import { CartPage } from '../../views/cart-page';

export const revalidate = 0;

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: addresses } = user ? await supabase.from('addresses').select('*').eq('user_id', user.id) : { data: null };

  return <CartPage initialUser={user} initialAddresses={addresses || []} />;
}
