'use client'

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';

export default function DeleteButton({ 
  id, 
  children 
}: { 
  id: number, 
  children?: ReactElement 
}) {
  const router = useRouter();

  const handleClick = async () => {
    const tasks: Task[] = await fetch('/api/tasks', {
      method: 'DELETE',
      body: `${id}`
    })
    .then((res) => res.json());

    router.refresh();
  };

  return (
    <Button onClick={handleClick} variant='danger' size='sm'>
      {children}
    </Button>
  );
}
