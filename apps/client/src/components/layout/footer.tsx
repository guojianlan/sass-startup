import { MaxWidthWrapper } from '@/components/maxWidthWrapper';
import { Logo } from '@/components/Logo';

export const LandingFooter = () => {
  return (
    <footer>
      <MaxWidthWrapper className={'h-14 relative'}>
        <div className={'h-full w-full flex items-center justify-between'}>
          <Logo />
          <div>footer</div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
