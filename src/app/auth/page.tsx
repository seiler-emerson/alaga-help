

import { GalleryVerticalEnd } from 'lucide-react';
import { AuthForm } from './_components/auth-form';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </a>
        </div>
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