import { NextRequest, NextResponse } from 'next/server';
import { ExperienceModel } from '@/lib/db/models/Experience';

export async function GET(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    const { type } = await params;
    const experiences = await ExperienceModel.findByType(type as 'organization' | 'work' | 'volunteer');
    return NextResponse.json({ success: true, data: experiences });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
