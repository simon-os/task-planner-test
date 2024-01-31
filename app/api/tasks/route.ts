import { promises as fs } from 'fs';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const file = await fs.readFile(process.cwd() + '/src/db.json', 'utf8');
    const tasks: Task[] = JSON.parse(file);
    const date = Number(request.nextUrl.searchParams.get('date'));
    const id = Number(request.nextUrl.searchParams.get('id'));

    if (date) {
      const filteredByDate = tasks.filter((task: Task) => task.date === date);
      return NextResponse.json(filteredByDate);
    }

    if (id) {
      const foundById = tasks.find((task: Task) => task.id === id);
      return NextResponse.json(foundById);
    }

    return NextResponse.json(tasks);
  } catch (e) {
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const file = await fs.readFile(process.cwd() + '/src/db.json', 'utf8');
    const tasks: Task[] = JSON.parse(file);

    const newTask: Task = await request.json();
    const newTasks = JSON.stringify([...tasks, newTask]);
    await fs.writeFile(process.cwd() + '/src/db.json', newTasks);

    revalidatePath('/');
    return NextResponse.json(newTask);
  } catch (e) {
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const file = await fs.readFile(process.cwd() + '/src/db.json', 'utf8');
    const tasks: Task[] = JSON.parse(file);
    const updatedTask: Task = await request.json();

    const updatedTasks = JSON.stringify([
      ...tasks.filter((t: Task) => t.id !== updatedTask.id), 
      updatedTask
    ]);
    await fs.writeFile(process.cwd() + '/src/db.json', updatedTasks);
    
    revalidatePath('/');
    return NextResponse.json(updatedTask);
  } catch (e) {
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const file = await fs.readFile(process.cwd() + '/src/db.json', 'utf8');
    const tasks: Task[] = JSON.parse(file);
    const taskToDeleteId: number = Number(await request.json());

    const updatedTasks = JSON.stringify([
      ...tasks.filter((t: Task) => t.id !== taskToDeleteId), 
    ]);
    await fs.writeFile(process.cwd() + '/src/db.json', updatedTasks);

    revalidatePath('/', 'layout');
    return NextResponse.json(taskToDeleteId);
  } catch (e) {
    return NextResponse.error();
  }
}
