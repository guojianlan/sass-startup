'use client';
import { useEffect } from 'react';
import { HomePageLayout } from '@/components/layout/homePage';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
const HomePage = () => {
  useEffect(() => {
    document.title = 'home';
  }, []);
  return (
    <HomePageLayout>
      <div>
        <div className={'h-14 flex justify-between p-4 border-b border-gray-300 items-center'}>
          <span className={'text-xl font-medium'}>WorkSpace</span>
        </div>
        {/*这里根据业务获取数据了*/}
        <div className={'p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4'}>
          {[1, 2, 3, 4, 5].map(item => {
            return (
              <div key={item + ''} className={'w-full  '}>
                <Skeleton count={5} />
              </div>
            );
          })}
        </div>
      </div>
    </HomePageLayout>
  );
};

export default HomePage;
