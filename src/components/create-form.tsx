'use client';

import { generateId } from '../lib/utils';
import { TASK_STATUSES } from '../lib/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CreateForm({ pageDate }: { pageDate: string }) {
  const [date, setDate] = useState<Value>(new Date(Number(pageDate) || Date.now()));
  const router = useRouter();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const formattedDate = Date.parse((date as Date).toDateString());

    const body = {
      id: generateId(),
      date: formattedDate,
      title: formData.get('title'),
      status: formData.get('status')
    };

    const res = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(body)
    })

    router.push(`/tasks/${formattedDate}`);
    router.refresh();
  };

  return (
    <Form onSubmit={handleSubmit} className='w-50'>
      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder='Enter task title' name='title' required />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Status</Form.Label>
        <Form.Select name='status'>
          {Object.keys(TASK_STATUSES).map((key) => (
            <option value={key} key={key}>
              {TASK_STATUSES[key as keyof typeof TASK_STATUSES]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className='mb-3 d-flex flex-column'>
        <Form.Label>Date</Form.Label>
        <DatePicker onChange={setDate} value={date} locale={'en-US'} format={'dd-MM-yyyy'} />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Create
      </Button>
    </Form>
  );
}
