'use client';

import { useState, useEffect } from 'react';

import Form from "@/components/Form";
import { Button, Input } from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [input, setInput] = useState({ firstName: '', lastName: '', message: '', contact: '', email: '', phoneNumber: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setError('');
  }, [input]);

  const handleSignOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const redirectUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/login`;
    router.push(redirectUrl);
  }

  const handleClick = async () => {

    if (!input.firstName || !input.lastName || !input.message || !input.contact || !input.email || !input.phoneNumber) {
      setError('All fields are required');
      return;
    }

    if (!(input.contact === 'Existing Client Calls' || input.contact === 'New Client Calls' || input.contact === 'General Calls')) {
      setError('Invalid Contact Type');
      return;
    }



    try {
      console.log(JSON.stringify({ ...input, variant: 'Answering Legal' }));
      const response = await axios.post('https://dev.answeringlegalapp.com/api/v1/token/', {
          username: "diego",
          password: "dinneronathursday",
          variant: 'Answering Legal'
      }, {
          withCredentials: true, // This is equivalent to credentials: 'include' in fetch
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.status === 200 || response.status === 403) {
          console.log('POSTED')
      } else {
          console.log('invalid');
      }
  } catch (error) {
      console.log(error);
  }
  }

  const formElements = [
    <h1 className='mb-10 font-extralight text-4xl' >Create New Lead</h1>,
    <Input className='m-2' label="First Name" placeholder="First Name" value={input.firstName} onChange={(e) => setInput({ ...input, firstName: e.target.value })} />,
    <Input className='m-2' label="Last Name" placeholder="Last Name" value={input.lastName} onChange={(e) => setInput({ ...input, lastName: e.target.value })} />,
    <Input className='m-2' label="Message" placeholder="Message" value={input.message} onChange={(e) => setInput({ ...input, message: e.target.value })} />,
    <Input className='m-2' label="Contact" placeholder="Contact" value={input.contact} onChange={(e) => setInput({ ...input, contact: e.target.value })} />,
    <Input className='m-2' label="Email" placeholder="Email" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} />,
    <Input className='m-2' label="Phone Number" placeholder="Phone Number" value={input.phoneNumber} onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })} />,
    <h2 className={`text-center mb-4 h-[20px] font-light text-red-500 text-sm ${error ? 'opacity-100' : 'opacity-1'}`}>{error}</h2>,
    <Button className='mt-1 bg-blue-600 text-white w-[125px]' size='lg' color='default' type='button' onClick={handleClick}>Click</Button>
  ];

  return (
    <div>
      <div className='flex flex-row justify-end'>
        <Button className='m-2 bg-red-600 text-white' onClick={handleSignOut} >Sign Out</Button>
      </div>
      <Form elements={formElements} />
    </div>
  );
}
