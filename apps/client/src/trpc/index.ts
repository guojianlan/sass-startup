import {privateProcedure, publicProcedure, router} from './trpc';
import {emailCodeSchema, loginFormSchema, nickNameSchema} from "@/schema";
import {RedisDb} from "@/db/redis";
import {IResponse} from "@/lib/res";
import {generateRandomStr,encrypt} from "@/lib/utils";
import nodemailer from 'nodemailer';
import {Db} from "@/db";
import {TRPCError} from "@trpc/server";
import {CustomBaseException} from "@/lib/error";

const transporter = nodemailer.createTransport({
    service: process.env.nodemailer_service,
    host: process.env.nodemailer_host,
    auth: {
        user: process.env.nodemailer_auth_user,
        pass: process.env.nodemailer_auth_pass
    }
});

export const appRouter = router({
    // 登录
    login:publicProcedure.input(loginFormSchema).mutation(async ({ctx,input})=>{
        const { email, code } = input;
        const db = await Db.install;
        const redis = await RedisDb.install;
        const key = `${email}__${code}`;
        const hasCode = await redis.install.get(key);
        if (!hasCode) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                cause: new CustomBaseException(
                    {
                        message: '验证码错误，请重新输入',
                        meta: {
                            code: 40001,
                            data: 'tete'
                        }
                    },
                    400
                )
            });
        }
        // 删除
        void redis.install.del(key);
        // 判断是否存在
        let user = await db.getRepository('SassStartUserEntity').findOne({
            where: {
                email: email
            },
            withDeleted: true
        });
        if (user === null) {
            user = await db.getRepository('SassStartUserEntity').save({
                email: email,
                password: 'test',
                nickName:email
            });
        }
        user.password = null as unknown as any;
        return IResponse.ok({
            accessToken: await encrypt({
                user
            })
        });
    }),
    // 发送邮箱验证码
    getCode: publicProcedure.input(emailCodeSchema).mutation(async ({ ctx, input }) => {
        const { email } = input;
        const redis = await RedisDb.install;
        const code = generateRandomStr(10, 6);
        await redis.install.setEx(`${email}__${code}`, code, 60 * 5);
        const mail = await transporter.sendMail({
            from: '424139777@qq.com',
            to: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>你的验证码是: ${code} </p>
            `
        });
        transporter.close();
        return IResponse.ok({});
    }),
    getUser: privateProcedure.query(async ({ ctx }) => {
        return {
            user: ctx.user
        };
    }),
    changeUser:privateProcedure.input(nickNameSchema).mutation(async ({ctx,input})=>{
       try{
           const {nickName} = input;
           const userId = ctx.user.id;
           const db = await Db.install;
           await db.getRepository('SassStartUserEntity').update(userId,{
               nickName:nickName
           })
           return IResponse.ok({})
       }catch (e){
           throw new TRPCError({
               code:"INTERNAL_SERVER_ERROR",
               cause: new CustomBaseException(
                   {
                       message: '未知错误，请稍后重试',
                       meta: {
                           code: 50001,
                       }
                   },
                   500
               )
           })
       }
    })
});

export type AppRouter = typeof appRouter;
