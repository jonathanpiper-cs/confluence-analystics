import { NextResponse } from 'next/server';
import { getAllUseCases, fetchUseCaseDetails } from '@/lib/confluence';
import { groupAndAnalyzeUseCases } from '@/lib/analyze';

export async function GET() {
  try {
    const rawUseCases = await getAllUseCases();
    const detailedUseCases = await Promise.all(
      rawUseCases.map((uc) => fetchUseCaseDetails(uc.id))
    );

    const flatCases = detailedUseCases.flat();
    const analysis = groupAndAnalyzeUseCases(flatCases);

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch use cases' }, { status: 500 });
  }
}
