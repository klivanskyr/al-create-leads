'use client';

import { useState, useEffect } from 'react';

import Form from "@/components/Form";
import { Button, Input } from "@nextui-org/react";
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState({ firstName: '', lastName: '', message: '', contact: '', email: '', phoneNumber: '' });
  const [error, setError] = useState({ firstName: '', lastName: '', message: '', contact: '', email: '', phoneNumber: '' });

  useEffect(() => {
    setError({ firstName: '', lastName: '', message: '', contact: '', email: '', phoneNumber: '' });
  }, [input]);

  const handleClick = async () => {

    let invalid = false;
    if (!input.firstName) {
      setError(prev => ({ ...prev, firstName: 'First Name Required' }));
      invalid = true;
    }
    if (!input.lastName) {
      setError(prev => ({ ...prev, lastName: 'Last Name Required' }));
      invalid = true;
    }
    if (!input.message) {
      setError(prev => ({ ...prev, message: 'Message Required' }));
      invalid = true;
    }
    if (!input.contact) {
      setError(prev => ({ ...prev, contact: 'Contact Required' }));
      invalid = true;
    }
    if (!input.email) {
      setError(prev => ({ ...prev, email: 'Email Required' }));
      invalid = true;
    }
    if (!input.phoneNumber) {
      setError(prev => ({ ...prev, phoneNumber: 'Phone Number Required' }));
      invalid = true;
    }
    if (invalid) return;

    if (!(input.contact === 'Existing Client Calls' || input.contact === 'New Client Calls' || input.contact === 'General Calls')) {
      setError(prev => ({ ...prev, contact: 'Invalid Contact' }));
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
    <Input className='m-2' label="First Name" placeholder="First Name" value={input.firstName} onChange={(e) => setInput({ ...input, firstName: e.target.value })} isInvalid={Boolean(error.firstName)} errorMessage={error.firstName}/>,
    <Input className='m-2' label="Last Name" placeholder="Last Name" value={input.lastName} onChange={(e) => setInput({ ...input, lastName: e.target.value })} isInvalid={Boolean(error.lastName)} errorMessage={error.lastName}/>,
    <Input className='m-2' label="Message" placeholder="Message" value={input.message} onChange={(e) => setInput({ ...input, message: e.target.value })} isInvalid={Boolean(error.message)} errorMessage={error.message}/>,
    <Input className='m-2' label="Contact" placeholder="Contact" value={input.contact} onChange={(e) => setInput({ ...input, contact: e.target.value })} isInvalid={Boolean(error.contact)} errorMessage={error.contact} />,
    <Input className='m-2' label="Email" placeholder="Email" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} isInvalid={Boolean(error.email)} errorMessage={error.email}/>,
    <Input className='m-2' label="Phone Number" placeholder="Phone Number" value={input.phoneNumber} onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })} isInvalid={Boolean(error.phoneNumber)} errorMessage={error.phoneNumber}/>,
    <Button className='mt-1 bg-blue-600 text-white w-[125px]' size='lg' color='default' type='button' onClick={handleClick}>Click</Button>
  ];

  return (
    <Form elements={formElements} />
  );
}
