import CreateForm from '@/src/components/create-form';
import Spinner from '@/src/components/spinner';
import { Suspense } from 'react';

export default function Page({ 
  searchParams 
}: { 
  searchParams : { date: string }
}) {
  return (
    <>
      <h1>Create Task</h1>
      
      <Suspense fallback={<Spinner />}>
        <CreateForm pageDate={searchParams?.date} />
      </Suspense>
    </>
  );
}
