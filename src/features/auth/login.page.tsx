import AuthLayout from '@/features/auth/ui/auth-layout.tsx';
import { ROUTES } from '@/shared/model/routes.ts';
import { Link } from 'react-router-dom';
import LoginForm from '@/features/auth/ui/login-form.tsx';

const LoginPage = () => {
    return (
        <AuthLayout
            title={'Вход в систему'}
            description={'Введите ваш email и пароль для входа в систему'}
            form={<LoginForm />}
            footerText={
                <>
                    Нет аккаунта?{' '}
                    <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
                </>
            }
        />
    );
};

export const Component = LoginPage;
