import { FC, PropsWithChildren } from 'react';
import {LandingHeader} from "@/components/layout/header";
import {LandingFooter} from "@/components/layout/footer";


type LandingPageLayout = {};
export const LandingPageLayout: FC<PropsWithChildren<LandingPageLayout>> = ({ children }) => {
  return (
    <div className={'flex flex-col flex-1'}>
      <LandingHeader />
      <main className={'flex flex-1 flex-col'}>{children}</main>
      <LandingFooter />
    </div>
  );
};
