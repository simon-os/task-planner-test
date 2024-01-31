import Spinner from '@/src/components/spinner';
import UpdateForm from '@/src/components/update-form';
import { Suspense } from 'react';

export default function Page({ params }: { params: { id: number } }) {
  return (
    <>
      <h1>Update Task</h1>
      
      <Suspense fallback={<Spinner />}>
        <UpdateForm taskId={params.id} />
      </Suspense>
    </>
  );
}
