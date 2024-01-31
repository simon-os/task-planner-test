import { formatDate, getBasePath } from '../lib/utils';
import { TASK_STATUSES } from '../lib/constants';
import { Pencil, Trash2 } from 'lucide-react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import DeleteButton from './delete-button';

function TasksTableRow({ task }: { task: Task }) {
  const { id, date, status, title } = task;

  return (
    <tr>
      <td>
        {title}
      </td>
      <td>
        {TASK_STATUSES[status]}
      </td>
      <td>
        {formatDate(date)}
      </td>
      <td>
        <span className='d-flex gap-2'>
          <Link href={`/task/update/${id}`} className='btn btn-warning btn-sm'>
            <Pencil color='white' width={18} />
          </Link>

          <DeleteButton id={id}>
            <Trash2 width={18} />
          </DeleteButton>
        </span>
      </td>
    </tr>
  )
}

export default async function TasksTable({ date }: { date?: string }) {
  const tasks: Task[] = await fetch(getBasePath() + `/api/tasks?date=${date || ''}`, {
      method: 'GET',
      cache: 'no-store'
    })
    .then((res) => res.json());

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            tasks.length
              ? tasks.map((task) => (
                <TasksTableRow key={task.id} task={task} />
                ))
              : <tr>
                  <td>There are no tasks to display</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
          }
        </tbody>
      </Table>

      <Link href={`/task/create${date ? ('?date=' + date) : ''}`} className='btn btn-primary'>
        Create New Task
      </Link>
    </>
  );
}
