import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/shared/ui/kit/card.tsx';
import React from 'react';

interface Props {
    title: React.ReactNode;
    description: React.ReactNode;
    form: React.ReactNode;
    footerText: React.ReactNode;
}

const AuthLayout = ({ title, footerText, description, form }: Props) => {
    return (
        <main className="grow flex flex-col pt-[100px] items-center">
            <Card className="w-full max-w-[400px]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>{form}</CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
                        {footerText}
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
};

export default AuthLayout;
