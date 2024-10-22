import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Efecto para recuperar el token si existe
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Aquí puedes manejar el token (por ejemplo, redirigir al usuario)
            console.log('Token recuperado:', token);
            // Redirigir o hacer algo con el token si es necesario
        }
    }, []);

    const handleGoogleLogin = () => {
        // Redirige a la ruta de Google y espera que el backend maneje la autenticación
        window.location.href = '/auth/google';
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
            onSuccess: (response) => {
                // Suponiendo que el token se devuelve en la respuesta
                if (response.token) {
                    localStorage.setItem('authToken', response.token); // Guardar el token
                    console.log('Token guardado:', response.token);
                    // Aquí podrías redirigir al usuario después de iniciar sesión
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h2>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-gray-900">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm">Recordar contraseña</span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-indigo-600 hover:text-indigo-900"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-center">
                        <PrimaryButton className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md" disabled={processing}>
                            Iniciar
                        </PrimaryButton>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-4">Iniciar sesión con:</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                        >
                            <path fill="#4285F4" d="M24 9.5c3.2 0 5.8 1.2 7.8 3.1l5.8-5.8C33.9 3.1 29.3 1 24 1 14.9 1 7.4 6.4 4.4 14l6.7 5.2C12.9 14.6 18 9.5 24 9.5z" />
                            <path fill="#34A853" d="M24 44c5.8 0 10.6-1.9 14.1-5.1l-6.7-5.2C29.8 35.5 27 36.5 24 36.5c-5.3 0-9.8-3.6-11.4-8.5l-6.8 5.2C9.3 39.6 16.1 44 24 44z" />
                            <path fill="#FBBC05" d="M46.2 24.5c0-1.4-.1-2.7-.3-4H24v8.4h12.5c-.6 3-2.4 5.5-4.9 7.2l6.7 5.2c3.9-3.6 6.2-9 6.2-15z" />
                            <path fill="#EA4335" d="M12.6 28c-.4-1.2-.6-2.4-.6-3.5s.2-2.4.6-3.5l-6.7-5.2C4.7 18.7 4 21.3 4 24s.7 5.3 1.9 7.6l6.7-5.2z" />
                        </svg>
                        Iniciar sesión con Google
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}

/*
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const handleGoogleLogin = () => {
        window.location.href = '/auth/google'; // Redirige a la ruta de Google
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };
  

    return (

        <GuestLayout>
            <Head title="Log in" />
           

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar sesion</h2>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-gray-900">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm">Recordar contraseña</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-indigo-600 hover:text-indigo-900"
                            >
                                olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-center">
                        <PrimaryButton className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md" disabled={processing}>
                            Iniciar
                        </PrimaryButton>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-4">Iniciar sesion con:</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                        >
                            <path fill="#4285F4" d="M24 9.5c3.2 0 5.8 1.2 7.8 3.1l5.8-5.8C33.9 3.1 29.3 1 24 1 14.9 1 7.4 6.4 4.4 14l6.7 5.2C12.9 14.6 18 9.5 24 9.5z" />
                            <path fill="#34A853" d="M24 44c5.8 0 10.6-1.9 14.1-5.1l-6.7-5.2C29.8 35.5 27 36.5 24 36.5c-5.3 0-9.8-3.6-11.4-8.5l-6.8 5.2C9.3 39.6 16.1 44 24 44z" />
                            <path fill="#FBBC05" d="M46.2 24.5c0-1.4-.1-2.7-.3-4H24v8.4h12.5c-.6 3-2.4 5.5-4.9 7.2l6.7 5.2c3.9-3.6 6.2-9 6.2-15z" />
                            <path fill="#EA4335" d="M12.6 28c-.4-1.2-.6-2.4-.6-3.5s.2-2.4.6-3.5l-6.7-5.2C4.7 18.7 4 21.3 4 24s.7 5.3 1.9 7.6l6.7-5.2z" />
                        </svg>
                        Iniciar sesion con Google
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}
*/