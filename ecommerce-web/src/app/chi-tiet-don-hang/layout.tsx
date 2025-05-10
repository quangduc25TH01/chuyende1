import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'Chi tiết đơn hàng',
  description: 'Chi tiết đơn hàng của bạn',
  icons: 'ly-icon.png',
};

export default function OrderDetails({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
