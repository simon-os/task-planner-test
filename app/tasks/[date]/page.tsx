import Spinner from '@/src/components/spinner';
import TasksTable from '@/src/components/tasks-table';
import { formatDate } from '@/src/lib/utils';
import { Suspense } from 'react';

export default function Page({ params }: { params: { date: string } }) {
  const formattedDate = formatDate(new Date(Number(params.date)));

  return (
    <>
      <h1 className='mb-5'>Tasks for {formattedDate}</h1>
      
      <Suspense fallback={<Spinner />}>
        <TasksTable date={params.date} />
      </Suspense>
    </>
  );
}
