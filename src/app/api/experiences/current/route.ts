import { NextRequest, NextResponse } from 'next/server';
import { ExperienceModel } from '@/lib/db/models/Experience';

export async function GET(req: NextRequest) {
  try {
    const experiences = await ExperienceModel.findCurrent();
    return NextResponse.json({ success: true, data: experiences });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
