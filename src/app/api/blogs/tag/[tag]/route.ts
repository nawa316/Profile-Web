import { NextRequest, NextResponse } from 'next/server';
import { BlogModel } from '@/lib/db/models/Blog';

export async function GET(req: NextRequest, { params }: { params: Promise<{ tag: string }> }) {
  try {
    const { tag } = await params;
    const blogs = await BlogModel.findByTag(tag);
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
