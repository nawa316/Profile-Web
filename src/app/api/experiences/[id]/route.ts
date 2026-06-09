import { NextRequest, NextResponse } from 'next/server';
import { ExperienceModel } from '@/lib/db/models/Experience';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const experienceId = parseInt(id, 10);
    
    if (isNaN(experienceId)) {
      return NextResponse.json({ success: false, error: 'Invalid experience ID' }, { status: 400 });
    }
    
    const experience = await ExperienceModel.findById(experienceId);
    
    if (!experience) {
      return NextResponse.json({ success: false, error: 'Experience not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: experience });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const experienceId = parseInt(id, 10);
    
    if (isNaN(experienceId)) {
      return NextResponse.json({ success: false, error: 'Invalid experience ID' }, { status: 400 });
    }
    
    const body = await req.json();
    const experience = await ExperienceModel.update(experienceId, body);
    
    if (!experience) {
      return NextResponse.json({ success: false, error: 'Experience not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: experience, message: 'Experience updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const experienceId = parseInt(id, 10);
    
    if (isNaN(experienceId)) {
      return NextResponse.json({ success: false, error: 'Invalid experience ID' }, { status: 400 });
    }
    
    const deleted = await ExperienceModel.delete(experienceId);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Experience not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
