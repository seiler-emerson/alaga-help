import ProfileForm from './_components/form';
import { auth } from '@/services/auth'

const Page = async () => {
    const session = await auth()
    return (
        <div className=''>
            <ProfileForm defaultValues={session?.user} />
        </div>
    );
};
export default Page;