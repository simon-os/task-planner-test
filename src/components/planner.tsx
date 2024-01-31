'use client';

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Planner() {
  const [date, setDate] = useState<Value>(new Date());
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getTask = async () => {
      const tasks: Task[] = await fetch('/api/tasks', {
          method: 'GET'
        })
        .then((res) => res.json());
      setTasks(tasks);
    }
    getTask();
  }, []);

  const tileClassName = ({ date }: { date: Date }) => {
    const res = tasks?.find((t) => t.date === Date.parse(date.toString()));
    if (res) {
      return 'react-calendar__tile--with-task';
    }
  };
  
  const handleChange = (value: Value) => {
    setDate(value);
    const date = (value as Date).toDateString();
    value && router.push(`/tasks/${Date.parse(date)}`);
  };

  return (
    <>
      <h1 className='mb-5'>Planner</h1>

      <div className='d-flex justify-content-center align-items-start'>
        <Calendar 
          onChange={handleChange} 
          value={date} 
          locale={'en-US'} 
          tileClassName={tileClassName} 
        />
      </div>
    </>
  );
}
