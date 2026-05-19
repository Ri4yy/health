import { createClient } from '../../lib/supabase/server';
import { LoyaltyPage } from '../../views/loyalty-page';

export const revalidate = 0;

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let profile = null;
  let history = [];
  
  if (user) {
    const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = p;
    
    const { data: h } = await supabase
      .from('bonus_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    history = h || [];
  }

  return (
    <LoyaltyPage 
      initialUser={user} 
      initialProfile={profile} 
      initialHistory={history} 
    />
  );
}
