import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthButton from '@/Components/elements/AuthButton'
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.login'));
    };

    return (
        <GuestLayout>
            <Head title="管理者ログイン" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form className='p-4' onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="メールアドレス" className='font-extrabold' />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="パスワード" className='font-extrabold' />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex mt-4 flex-row">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">記憶する</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('admin.password.request')}
                                className="hover:underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ml-auto"
                            >
                            パスワードを忘れた方はこちら
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <AuthButton disabled={processing}>
                            ログイン
                        </AuthButton>
                    </div>
                </form>

            <div>
                <h4 className='font-light text-center dark:text-gray-400'>
                    <Link
                        href={route('admin.register')}
                        className='hover:underline'
                    >
                        アカウントを持っていませんか？
                    </Link>
                </h4>
            </div>
        </GuestLayout>
    );
}