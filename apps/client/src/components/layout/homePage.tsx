'use client';
import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import * as React from 'react';

import { useCheckLogin } from '@/hooks/useCheckLogin';
import { useRouter } from 'next/navigation';
import { SideBar } from '@/components/layout/sideBar';
import { Logo } from '@/components/Logo';
import UserButton from '@/components/UserButton';
export const homeLayoutContext = createContext<{
  triggerSideBar: (open: boolean) => void;
}>({} as any);
type HomePageLayoutProps = {};
export const HomePageLayout: FC<PropsWithChildren<HomePageLayoutProps>> = ({ children }) => {
  const router = useRouter();
  const { isLogin } = useCheckLogin(isLogin => {
    if (!isLogin) {
      router.replace(`/login?redirect=${encodeURIComponent(window.location.href)}`);
    }
  });
  const [sideBarOpen, setSideBarOpen] = useState(false);
  if (!isLogin) return null;
  return (
    <homeLayoutContext.Provider
      value={{
        triggerSideBar: setSideBarOpen
      }}>
      <div className={'flex flex-col min-h-full flex-1'}>
        <SideBar className={'hidden md:flex'} />
        <Sheet
          open={sideBarOpen}
          modal
          onOpenChange={flag => {
            setSideBarOpen(flag);
          }}>
          <SheetContent hiddenCloseBtn side={'left'} className={'p-0 max-w-60 sm:max-w-60 outline-none'}>
            <div
              onClick={() => {
                setSideBarOpen(prev => !prev);
              }}
              className={
                'absolute right-4 top-4 rounded-sm opacity-70  disabled:pointer-events-none data-[state=open]:bg-secondary z-10 text-white bg-gray-400 cursor-pointer'
              }>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </div>
            <SideBar />
          </SheetContent>
        </Sheet>
        {/*mobile header*/}
        <div className={'flex md:hidden justify-between px-4 h-14 items-center'}>
          <div
            className={'cursor-pointer'}
            onClick={() => {
              setSideBarOpen(true);
            }}>
            <Menu />
          </div>
          <Logo></Logo>
          <div>
            <UserButton className={'flex'} />
          </div>
        </div>
        <div className={'ml-0 md:ml-60'}>
          <div>{children}</div>
        </div>
      </div>
    </homeLayoutContext.Provider>
  );
};
