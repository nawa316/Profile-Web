import { NextRequest, NextResponse } from 'next/server';
import { PortfolioModel } from '@/lib/db/models/Portfolio';

export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  try {
    const { category } = await params;
    const portfolios = await PortfolioModel.findByCategory(category);
    return NextResponse.json({ success: true, data: portfolios });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
