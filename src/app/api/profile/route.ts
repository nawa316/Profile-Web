import { NextRequest, NextResponse } from 'next/server';
import { ProfileModel } from '@/lib/db/models/Profile';

export async function GET() {
  try {
    const profile = await ProfileModel.get();
    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const profile = await ProfileModel.update(body);
    return NextResponse.json({ success: true, data: profile, message: 'Profile updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
