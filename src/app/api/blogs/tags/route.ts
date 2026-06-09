import { NextRequest, NextResponse } from 'next/server';
import { BlogModel } from '@/lib/db/models/Blog';

export async function GET(req: NextRequest) {
  try {
    const tags = await BlogModel.getTags();
    return NextResponse.json({ success: true, data: tags });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
