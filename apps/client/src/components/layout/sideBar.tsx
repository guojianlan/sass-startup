import { FC } from 'react';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import UserButton from '@/components/UserButton';
type SideBarProps = {
  className?: string;
};
export const SideBar: FC<SideBarProps> = ({ className = '' }) => {
  return (
    <div className={cn('w-60 bg-black h-full absolute md:fixed text-white', className)}>
      <div className={'py-5 px-2.5 flex flex-col w-full'}>
        <div className={'w-full flex justify-center items-center'}>
          <Logo></Logo>
        </div>
        <div className={'flex flex-col gap-4 mt-4 px-4 flex-1'}>
          <Link
            href={'/home?x'}
            className={cn(
              buttonVariants({
                variant: 'ghost'
              }),
              'justify-stretch'
            )}>
            home
          </Link>
        </div>
          <div className={'hidden md:block'}>
              <UserButton />
          </div>


      </div>
    </div>
  );
};
