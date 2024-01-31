import { ReactElement } from 'react';

export default function Sidebar({ 
  children 
}: { 
  children?: ReactElement | ReactElement[]
}) {
  return (
    <aside className='d-flex flex-column border-end border-primary-subtle min-vh-100 gap-2 p-4 py-5'>
      {children}
    </aside>
  );
}
