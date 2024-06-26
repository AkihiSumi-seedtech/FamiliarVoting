import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('admin.profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">アカウントを削除する</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    アカウントが削除されると、そのリソースとデータはすべて永久に削除されます。<br/>アカウントを削除する前に、保持したいデータや情報をダウンロードしてください。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>削除</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        本当にアカウントを削除しますか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        アカウントが削除されると、そのリソースとデータはすべて永久に削除されます。<br/>パスワードを入力して、アカウントの永久削除を希望することを確認してください。
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="パスワード" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="パスワード"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            完全に削除する
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
