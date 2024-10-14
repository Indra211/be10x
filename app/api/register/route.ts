import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import user from '@/models/user';

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();
    await connectToDatabase();
    const chkEmail = await user.findOne({ email });
    if (chkEmail) {
      return NextResponse.json(
        {
          message: 'Email already exists',
          status: 'error',
        },
        { status: 400 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await user.create({
      email,
      password: hashPassword,
      fullName,
    });

    return NextResponse.json(
      {
        id: data?._id,
        message: 'User created successfully',
        status: 'success',
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
        status: 'error',
      },
      { status: 500 }
    );
  }
}
