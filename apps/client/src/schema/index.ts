import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({
    message: '请填写正确的邮箱'
  }),
  code: z
    .string()
    .min(1, {
      message: '请输入验证码'
    })
    .min(6, {
      message: '请输入六位验证码'
    })
    .max(6, {
      message: '请输入六位验证码'
    })
});

export const emailCodeSchema = z.object({
  email: z.string().email({
    message: '请填写正确的邮箱'
  })
});


export const nickNameSchema = z.object({
  nickName: z.string().min(1, {
    message: '请输入昵称'
  })
});