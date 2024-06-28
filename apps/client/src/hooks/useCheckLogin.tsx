'use client';
import { useAppStore } from '@/components/providers/appStoreProvider';
import { useEffect } from 'react';

export const useCheckLogin = (callBack?: (isLogin: boolean) => void) => {
  const [isLogin] = useAppStore(state => [state.isLogin]);
  useEffect(() => {
    if (isLogin !== undefined) {
      callBack && callBack(isLogin);
    }
  }, [isLogin]);
  return {
    isLogin
  };
};
