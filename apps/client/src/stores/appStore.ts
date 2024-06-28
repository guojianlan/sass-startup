// client/src/stores/appStore.ts
import { createStore } from 'zustand/vanilla';
import { produce } from 'immer';
export type AppState = {
    userProfile: {
        email: string;
        nickName:string
    };
    isLogin: boolean | undefined;
};

export type AppActions = {
    setLogin: (login: boolean) => void;
    setUserProfile: (login: boolean | undefined, userInfo?: Partial<AppState['userProfile']>) => void;
};

export type AppStore = AppState & AppActions;
// 初始化状态，默认isLoing都是undefined，这个等我们客户端接口返回之后才去设置他是true或者false
export const initAppStore = (): AppState => {
    return {
        userProfile: {
            email: '',
            nickName:""
        },
        isLogin: undefined
    };
};

export const defaultInitState: AppState = {
    isLogin: undefined,
    userProfile: {
        email: '',
        nickName:""
    }
};

export const createAppStore = (initState: AppState = defaultInitState) => {
    return createStore<AppStore>()(set => {
        return {
            ...initState,
            setLogin: login => {
                set(
                    produce((draft: AppState) => {
                        draft.isLogin = login;
                    })
                );
            },
            setUserProfile: (login, userInfo = {}) => {
                console.log('setUserProfile', login, userInfo);
                set(
                    produce((draft: AppState) => {
                        draft.userProfile = {
                            ...initAppStore().userProfile,
                            ...userInfo
                        };

                        draft.isLogin = login;
                    })
                );
            }
        };
    });
};
