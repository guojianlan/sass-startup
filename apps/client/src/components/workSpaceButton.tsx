'use client';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const WorkSpaceButton = () => {
  const { isLogin } = useCheckLogin();

  if (isLogin) {
    return (
      <Link
        className={cn(
          buttonVariants({
            variant: 'default'
          })
        )}
        href={'/home'}>
        工作台
      </Link>
    );
  }
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: 'ghost'
        })
      )}
      href={'/login'}>
      登录
    </Link>
  );
};
