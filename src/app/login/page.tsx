'use client';

import { useEffect, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import Form from '@/components/Form';

export default function Login() {
    const [input, setInput] = useState({ username: '', password: '' });
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        setError('');
    }, [input]);

const handleClick = async (e: any) => {
    e.preventDefault();
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
            credentials: 'include',
        })
        const data = await response.json();
        if (data.status === 200 || data.status === 403) {
            const redirectUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/`;
            router.push(redirectUrl);
        } else {
            console.log('error data', data);
            setError('Invalid Credentials');
        }
    } catch (error) {
        console.log(error);
        setError('Invalid Credentials');
    }
};

    const formElements = [
        <h1 className='mb-10 font-extralight text-4xl'>Login</h1>,
        <Input className='mb-3 max-w-[600px]' size='lg' placeholder='Username' value={input.username} onChange={(e) => setInput({ ...input, username: e.target.value })} isInvalid={Boolean(error)} />,
        <Input className='mb-3 max-w-[600px]' size='lg' type='password' placeholder='Password' value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} isInvalid={Boolean(error)} />,
        <h2 className={`mb-4 h-[20px] font-extralight text-red-500 ${error ? 'opacity-100' : 'opacity-1'}`}>{error}</h2>,
        <Button className='mt-1 bg-blue-600 text-white w-[125px]' size='lg' color='default' type='submit' onClick={handleClick}>Click</Button>
    ]

    return (
        <Form elements={formElements} />
    )
}