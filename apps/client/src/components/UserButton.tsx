'use client';
import React, { FC, useState } from 'react';
import { useAppStore } from '@/components/providers/appStoreProvider';
import { cn } from '@/lib/utils';
import {Loader, User} from 'lucide-react';
import { Dialog,  DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useInitContext } from '@/components/providers/initProvider';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {nickNameSchema} from "@/schema";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {trpc} from "@/app/_trpc";
import {toast} from "sonner";


type UserButtonProps = {
  className?: string;
};
const UserButton: FC<UserButtonProps> = ({ className = '' }) => {
  const [profile] = useAppStore(state => [state.userProfile]);
  const [openSetting, setOpenSetting] = useState(false);
  const { logOut } = useInitContext();
  const form = useForm<z.infer<typeof nickNameSchema>>({
    resolver:zodResolver(nickNameSchema),
      defaultValues:{
        nickName: profile.nickName
      }
  })
    const changeUser = trpc.changeUser.useMutation({
        onSuccess: ctx => {
            if (ctx.success) {
                setOpenSetting(false)
                toast('修改成功')
            }
        },
        onError(error){
            toast(error.message)
        }
    })
  const onSubmit = (values:z.infer<typeof nickNameSchema>)=>{
        if(changeUser.isPending)return
      changeUser.mutate(values)
  }
  return (
    <div className={cn('w-full justify-center items-center  md:flex cursor-pointer', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={'w-full'}>
            <div className={'hidden md:block text-ellipsis line-clamp-1 px-4'}>{profile.email}</div>
            <div className={'block md:hidden'}>
              <User />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={'right'} className={'min-w-40'}>
          <DropdownMenuItem
            onClick={() => {
              setOpenSetting(prev => !prev);
            }}>
            <span>设置</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logOut}>
            <span>退出登陆</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openSetting} onOpenChange={setOpenSetting}>
        <DialogContent className="sm:max-w-md">
          <div className={'text-xl font-medium'}>修改账号信息</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 grid grid-cols-1 gap-y-8">
              <FormField
                  control={form.control}
                  render={({ field }) => {
                    return (
                        <FormItem className={'grid gap-2 relative'}>
                          <FormLabel>nickname</FormLabel>
                          <FormControl>
                            <Input placeholder={'请输入昵称'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    );
                  }}
                  name={'nickName'}
              />
                <Button type="submit" variant="default" className="w-full flex gap-2">
                    确定修改 <span aria-hidden="true">&rarr;</span>
                </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserButton;
