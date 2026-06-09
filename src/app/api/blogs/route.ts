import { NextRequest, NextResponse } from 'next/server';
import { BlogModel } from '@/lib/db/models/Blog';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (query) {
      const blogs = await BlogModel.search(query);
      return NextResponse.json({ success: true, data: blogs });
    }
    
    const blogs = await BlogModel.findAll();
    return NextResponse.json({ success: true, data: blogs });
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
    const blog = await BlogModel.create(body);
    return NextResponse.json(
      { success: true, data: blog, message: 'Blog created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
