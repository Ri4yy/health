import { createClient } from '../../lib/supabase/server';
import { CheckoutPage } from '../../views/checkout-page';

export const revalidate = 0;

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let addresses = [];
  let profile = null;
  
  if (user) {
    const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = p;
    const { data: a } = await supabase.from('addresses').select('*').eq('user_id', user.id);
    addresses = a || [];
  }

  return <CheckoutPage initialUser={user} initialProfile={profile} initialAddresses={addresses} />;
}
