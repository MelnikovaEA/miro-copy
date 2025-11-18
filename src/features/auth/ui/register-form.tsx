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
import useRegister from '@/features/auth/model/use-register.ts';

const registerSchema = z
    .object({
        email: z
            .string()
            .trim()
            .min(1, { error: 'Email обязателен' })
            .email({ error: 'Неверный формат email' }),
        password: z.string().min(6, 'Пароль долен быть не менее 6 символов'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Пароли не совпадают',
    });

const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(registerSchema),
    });

    const { register, isPending, errorMessage } = useRegister();

    const onSubmit = form.handleSubmit((data) => register(data));
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {errorMessage && (
                    <FormMessage>{errorMessage.message}</FormMessage>
                )}
                <Button disabled={isPending} type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
