import { NextRequest, NextResponse } from 'next/server';
import { PortfolioModel } from '@/lib/db/models/Portfolio';

export async function GET(req: NextRequest) {
  try {
    const categories = await PortfolioModel.getCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
