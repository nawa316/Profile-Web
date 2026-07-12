import { NextRequest, NextResponse } from 'next/server';
import { SkillModel } from '@/lib/db/models/Skill';

export async function GET() {
  try {
    const data = await SkillModel.findAll();
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
    const data = await SkillModel.create(body);
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
