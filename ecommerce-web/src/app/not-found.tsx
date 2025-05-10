import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '404',
  description: 'Something went wrong',
};

export default function NotFound() {
  return (
    <section className="container text-center">
      <Image
        src="/images/common/not-found.png"
        alt="404"
        width={700}
        height={700}
        className="mx-auto"
      />

      <Link href="/" passHref>
        <Button variant="default" className="mt-8">
          Quay lại trang chủ
        </Button>
      </Link>
    </section>
  );
}
