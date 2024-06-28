import { LoginView } from '@/app/(auth)/_components/loginView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录'
};
export default async function Login() {
  return <LoginView />;
}
