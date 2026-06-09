import { NextRequest, NextResponse } from 'next/server';
import { BlogModel } from '@/lib/db/models/Blog';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const blogId = parseInt(id, 10);
    
    if (isNaN(blogId)) {
      return NextResponse.json({ success: false, error: 'Invalid blog ID' }, { status: 400 });
    }
    
    const blog = await BlogModel.findById(blogId);
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
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
    const blogId = parseInt(id, 10);
    
    if (isNaN(blogId)) {
      return NextResponse.json({ success: false, error: 'Invalid blog ID' }, { status: 400 });
    }
    
    const body = await req.json();
    const blog = await BlogModel.update(blogId, body);
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog, message: 'Blog updated successfully' });
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
    const blogId = parseInt(id, 10);
    
    if (isNaN(blogId)) {
      return NextResponse.json({ success: false, error: 'Invalid blog ID' }, { status: 400 });
    }
    
    const deleted = await BlogModel.delete(blogId);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
