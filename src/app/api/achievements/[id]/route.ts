import { NextRequest, NextResponse } from 'next/server';
import { AchievementModel } from '@/lib/db/models/Achievement';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    const data = await AchievementModel.findById(id);
    
    if (!data) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    const body = await req.json();
    
    const data = await AchievementModel.update(id, body);
    
    if (!data) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data, message: 'Updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.statusCode || 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    const success = await AchievementModel.delete(id);
    
    if (!success) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
