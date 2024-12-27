import { Waves } from 'lucide-react';
import { AuthForm } from './_components/auth-form';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <a href="#" className='w-96 flex flex-row justify-center gap-2 md:justify-start'>
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Waves className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Alaga Help</span>
            <span className="truncate text-xs">Monitoramento</span>
          </div>
        </a>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={'/img/login/login2.jpeg'}
          alt={'City rivers'}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
};
export default Page;