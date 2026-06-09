import { NextRequest, NextResponse } from 'next/server';
import { PortfolioModel } from '@/lib/db/models/Portfolio';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (query) {
      const portfolios = await PortfolioModel.search(query);
      return NextResponse.json({ success: true, data: portfolios });
    }
    
    const portfolios = await PortfolioModel.findAll();
    return NextResponse.json({ success: true, data: portfolios });
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
    const portfolio = await PortfolioModel.create(body);
    return NextResponse.json(
      { success: true, data: portfolio, message: 'Portfolio created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
