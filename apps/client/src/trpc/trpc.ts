import {initTRPC, TRPCError} from '@trpc/server';
import {getUser} from "@/server";



const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async opts => {
    const user = await getUser();
    if (!user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED'
        });
    }
    return opts.next({
        ctx: {
            user: user
        }
    });
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);