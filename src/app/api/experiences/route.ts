import { NextRequest, NextResponse } from 'next/server';
import { ExperienceModel } from '@/lib/db/models/Experience';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (query) {
      const experiences = await ExperienceModel.search(query);
      return NextResponse.json({ success: true, data: experiences });
    }
    
    const experiences = await ExperienceModel.findAll();
    return NextResponse.json({ success: true, data: experiences });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const experience = await ExperienceModel.create(body);
    return NextResponse.json(
      { success: true, data: experience, message: 'Experience created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
