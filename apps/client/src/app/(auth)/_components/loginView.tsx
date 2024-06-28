'use client';
import { useForm } from 'react-hook-form';
import { SlimLayout } from '@/components/SlimLayout';
import { Logo } from '@/components/Logo';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/schema';
import { trpc } from '@/app/_trpc/index';
import { Loader } from 'lucide-react';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCountDown } from '@/hooks/useCountDown';
import { useInitContext } from '@/components/providers/initProvider';

export const LoginView = () => {
  const router = useRouter();
  const initContext = useInitContext();
  const { isLogin } = useCheckLogin(isLogin => {
    if (isLogin) {
      router.replace('/home');
    }
  });
  const { count, setCount } = useCountDown();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      code: ''
    }
  });
  const loginMutation = trpc.login.useMutation({
    onSuccess: async ctx => {
      if (ctx.success) {
        const url = new URL(window.location.href);
        localStorage.setItem('accessToken', ctx.data.accessToken);
        await initContext.refreshLogin();
        router.replace(url.searchParams.get('redirect') || '/');
      }
    },
    onError: (error, variables, context) => {
      toast(error.message);
    }
  });
  const getCodeMutation = trpc.getCode.useMutation({
    onSuccess: ctx => {
      if (ctx.success) {
        setCount(60);
      }
    },
    onError: (error, variables, context) => {
      toast(error.message);
    }
  });
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    void loginMutation.mutate({
      ...values
    });
  };
  if (isLogin === undefined || isLogin) return null;
  return (
    <SlimLayout>
      <div className="flex">
        <Logo />
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">登陆你的账号</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 grid grid-cols-1 gap-y-8">
          <FormField
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className={'grid gap-2 relative'}>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input placeholder={'请输入邮箱'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
            name={'email'}
          />
          <FormField
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className={'grid gap-2'}>
                  <FormLabel>验证码</FormLabel>
                  <div className={'relative'}>
                    <FormControl className={'pr-32'}>
                      <Input placeholder={'请输入验证码'} maxLength={6} {...field} />
                    </FormControl>
                    <Button
                      variant={'ghost'}
                      type={'button'}
                      disabled={count > 0}
                      onClick={() => {
                        if (count > 0) return;
                        getCodeMutation.mutate({
                          email: form.getValues()['email']
                        });
                      }}
                      className={'absolute top-0 right-0 w-28 px-0'}>
                      {getCodeMutation.isPending && <Loader className={'animate-spin'}></Loader>}
                      {count == 0 ? '获取验证码' : `${count}S`}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
            name={'code'}
          />
          <Button type="submit" variant="default" className="w-full">
            {loginMutation.isPending && <Loader className={'animate-spin'}></Loader>}
            <span>
              登录 <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </form>
      </Form>
    </SlimLayout>
  );
};
