import Spinner from '@/src/components/spinner';
import TasksTable from '@/src/components/tasks-table';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main>
      <h1 className='mb-5'>All Tasks</h1>
      
      <Suspense fallback={<Spinner />}>
        <TasksTable />
      </Suspense>
    </main>
  );
}
