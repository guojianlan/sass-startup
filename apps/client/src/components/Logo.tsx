import Link from 'next/link';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className={'font-bold text-2xl'}>
      <Link href={'/'}>Logo</Link>
    </div>
  );
}
