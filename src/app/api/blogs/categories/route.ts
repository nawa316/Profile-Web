import { NextRequest, NextResponse } from 'next/server';
import { BlogModel } from '@/lib/db/models/Blog';

export async function GET(req: NextRequest) {
  try {
    const categories = await BlogModel.getCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
