import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthButton from '@/Components/elements/AuthButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg mb-6">
                <div className='p-4'>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="名前" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="メールアドレス" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="パスワード" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="パスワード再入力" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex justify-center mt-4">
                            <AuthButton disabled={processing}>
                                サインアップ
                            </AuthButton>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <div>
                    <h4 className='text-2xl font-light'>
                        <Link
                            href={route('admin.login')}
                            className="hover:underline"
                        >
                            すでにアカウントを持っていますか？
                        </Link>
                    </h4>
                </div>
            </div>
        </GuestLayout>
    );
}