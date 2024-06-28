'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import Form from '@/components/Form';
import { cookies } from 'next/headers';

export default function Login() {
    const [input, setInput] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        setError('');
    }, [input]);

const handleClick = async () => {
    try {
        console.log(JSON.stringify({ ...input, variant: 'Answering Legal' }));
        const response = await axios.post('https://dev.answeringlegalapp.com/api/v1/token/', {
            username: "diego",
            password: "dinneronathursday",
            variant: 'Answering Legal'
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200 || response.status === 403) {
            console.log('ok', response.status);
            router.push('/');
        } else {
            console.log('invalid');
            setError('Invalid Credentials');
        }
    } catch (error) {
        console.log(error);
    }
};

    const formElements = [
        <h1 className='mb-10 font-extralight text-4xl'>Login</h1>,
        <Input className='mb-3 max-w-[600px]' size='lg' placeholder='Username' value={input.username} onChange={(e) => setInput({ ...input, username: e.target.value })} isInvalid={Boolean(error)} errorMessage={error} />,
        <Input className='mb-5 max-w-[600px]' size='lg' type='password' placeholder='Password' value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} />,
        <Button className='mt-1 bg-blue-600 text-white w-[125px]' size='lg' color='default' type='button' onClick={handleClick}>Click</Button>
    ]

    return (
        <Form elements={formElements} />
    )
}