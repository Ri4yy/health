import { OrderSuccessPage } from '../../../views/order-success-page';
import { createClient } from '../../../lib/supabase/server';

export default async function Page({ params }: { params: Promise<{ orderNumber: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: order } = await supabase.from('orders').select('id').eq('order_number', resolvedParams.orderNumber).single();
  
  return <OrderSuccessPage orderNumber={resolvedParams.orderNumber} orderId={order?.id} />;
}
