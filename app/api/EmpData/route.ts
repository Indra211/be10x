import { AuthOptions } from '@/app/utils/AuthOptions';
import { connectToDatabase } from '@/lib/mongodb';
import Emp from '@/models/empData';
import { getServerSession } from 'next-auth';

import { NextResponse } from 'next/server';

interface Ids {
  id: string;
}
interface Employee {
  user?: Ids;
}

export async function POST(request: Request) {
  try {
    const session: Employee | null = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { name, email, age, blood_group, address } = await request.json();
    await connectToDatabase();
    const data = await Emp.create({
      name,
      email,
      age,
      blood_group,
      address,
      user: session?.user?.id,
    });
    return NextResponse.json({ data, status: 'success' }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session: Employee | null = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();

    const data = await Emp.find({ user: session?.user?.id });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session: Employee | null = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const id = request.url?.split('=')?.pop();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const { name, email, age, blood_group, address } = await request.json();
    await connectToDatabase();
    const updatedData = await Emp.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          email,
          age,
          blood_group,
          address,
          user: session?.user?.id,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return NextResponse.json(
        { message: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: updatedData, status: 'success' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const id = request.url?.split('=')?.pop();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await connectToDatabase();
    await Emp.deleteOne({ _id: id });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
