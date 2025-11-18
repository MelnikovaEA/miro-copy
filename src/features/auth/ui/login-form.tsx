import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/kit/form.tsx';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/kit/button.tsx';
import { Input } from '@/shared/ui/kit/input.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '@/features/auth/model/use-login.ts';

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { error: 'Email обязателен' })
        .email({ error: 'Неверный формат email' }),
    password: z.string().min(6, 'Пароль долен быть не менее 6 символов'),
});

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    const { login, isPending, errorMessage } = useLogin();

    const onSubmit = form.handleSubmit((data) => login(data));
    return (
        <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {errorMessage && (
                    <FormMessage>{errorMessage.message}</FormMessage>
                )}
                <Button disabled={isPending} type="submit">
                    Войти
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
