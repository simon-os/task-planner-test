import Planner from '@/src/components/planner';
import Spinner from '@/src/components/spinner';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Planner />
    </Suspense>
  );
}
