import { NextRequest, NextResponse } from 'next/server';
import { EducationModel } from '@/lib/db/models/Education';

export async function GET() {
  try {
    const data = await EducationModel.findAll();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await EducationModel.create(body);
    return NextResponse.json(
      { success: true, data, message: 'Created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
