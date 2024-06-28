'use client';
import { PropsWithChildren, useState } from 'react';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/app/_trpc';
import { httpBatchLink, httpLink } from '@trpc/client';
import { absoluteUrl } from '@/lib/utils';
function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000
            }
        }
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export const TRPCQueryProviders = ({ children }: PropsWithChildren) => {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: absoluteUrl('/api/trpc'),
                    headers: () => {
                        const token = isServer ? '' : localStorage.getItem('accessToken') || '';
                        return {
                            authorization: token != '' ? `Bearer ${token}` : token
                        } as any;
                    }
                })
            ]
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient as any}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
