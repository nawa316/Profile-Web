import { NextRequest, NextResponse } from 'next/server';
import { PortfolioModel } from '@/lib/db/models/Portfolio';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const portfolioId = parseInt(id, 10);
    
    if (isNaN(portfolioId)) {
      return NextResponse.json({ success: false, error: 'Invalid portfolio ID' }, { status: 400 });
    }
    
    const portfolio = await PortfolioModel.findById(portfolioId);
    
    if (!portfolio) {
      return NextResponse.json({ success: false, error: 'Portfolio not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: portfolio });
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
    const portfolioId = parseInt(id, 10);
    
    if (isNaN(portfolioId)) {
      return NextResponse.json({ success: false, error: 'Invalid portfolio ID' }, { status: 400 });
    }
    
    const body = await req.json();
    const portfolio = await PortfolioModel.update(portfolioId, body);
    
    if (!portfolio) {
      return NextResponse.json({ success: false, error: 'Portfolio not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: portfolio, message: 'Portfolio updated successfully' });
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
    const portfolioId = parseInt(id, 10);
    
    if (isNaN(portfolioId)) {
      return NextResponse.json({ success: false, error: 'Invalid portfolio ID' }, { status: 400 });
    }
    
    const deleted = await PortfolioModel.delete(portfolioId);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Portfolio not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Portfolio deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
