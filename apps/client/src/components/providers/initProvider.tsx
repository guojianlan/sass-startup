'use client';
import { FC, PropsWithChildren, useEffect, createContext, useContext, useCallback } from 'react';
import { useAppStore } from '@/components/providers/appStoreProvider';
import { trpc } from '@/app/_trpc/index';
import { useMounted } from '@/hooks/useMounted';
import { useRouter } from 'next/navigation';

const initContext = createContext<{
    refreshLogin: () => Promise<void>;
    logOut: () => void;
}>({} as any);

type InitProviderProps = {} & PropsWithChildren;
export const InitProvider: FC<InitProviderProps> = ({ children }) => {
    const router = useRouter();
    const [, setUserProfile] = useAppStore(state => [state.isLogin, state.setUserProfile]);
    const [mounted] = useMounted();
    const { data, isError, refetch } = trpc.getUser.useQuery(undefined, {
        retry: 0,
        enabled: mounted
    });
    const refreshLogin = async () => {
        const c = await refetch();
        if (c.data) {
            setUserProfile(true, {
                email: c.data.user.email,
                nickName: c.data.user.nickName,
            });
        }
    };
    useEffect(() => {
        const listenStorage = async (event: StorageEvent) => {
            if (event.key === 'accessToken') {
                const c = await refetch();
            }
        };
        addEventListener('storage', listenStorage);
        return () => {
            removeEventListener('storage', listenStorage);
        };
    }, []);
    const logOut = useCallback(() => {
        localStorage.removeItem('accessToken');
        setUserProfile(false, {});
    }, []);
    useEffect(() => {
        if (mounted) {
            if (isError) {
                setUserProfile(false);
            } else if (data) {
                console.log(data);
                setUserProfile(true, {
                    email: data.user.email,
                    nickName: data.user.nickName,
                });
            }
        }
    }, [mounted, data, isError]);
    return (
        <initContext.Provider
            value={{
                refreshLogin: refreshLogin,
                logOut: logOut
            }}>
            {children}
        </initContext.Provider>
    );
};
export const useInitContext = () => {
    return useContext(initContext);
};
