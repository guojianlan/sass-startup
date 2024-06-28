// src/components/providers/appStoreProvider.tsx
'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type AppStore, createAppStore, initAppStore } from '@/stores/appStore';

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

export interface AppStoreProviderProps {
    children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
    // 只会初始化一次
    const storeRef = useRef<AppStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createAppStore(initAppStore());
    }
    return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
    const appStoreContext = useContext(AppStoreContext);
    if (!appStoreContext) {
        throw new Error(`useAppStore只能在AppStoreProvider运行`);
    }
    return useStore(appStoreContext, selector);
};
