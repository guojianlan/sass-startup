import { MaxWidthWrapper } from 'client/src/components/maxWidthWrapper';
import { Logo } from 'client/src/components/Logo';
import Link from 'next/link';
import { WorkSpaceButton } from 'client/src/components/workSpaceButton';

export const LandingHeader = () => {
  return (
    <div>
      <MaxWidthWrapper className={'h-14 relative'}>
        <div className={'h-full w-full flex items-center justify-between'}>
          <Logo />
          <div>
            <div>中间导航</div>
          </div>
          <WorkSpaceButton />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
