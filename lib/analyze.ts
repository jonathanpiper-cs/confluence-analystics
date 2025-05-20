interface UseCase {
  space: string;
  checkboxes: string[];
  [key: string]: unknown;
}

export function groupAndAnalyzeUseCases(useCases: UseCase[]) {
  const bySpace: Record<string, UseCase[]> = {};

  useCases.forEach((uc) => {
    if (!bySpace[uc.space]) bySpace[uc.space] = [];
    bySpace[uc.space].push(uc);
  });

  const analysis = Object.entries(bySpace).map(([space, cases]) => {
    const accepted = cases.filter(c => c.checkboxes.includes('Accepted')).length;
    const included = cases.filter(c => c.checkboxes.includes('Included in Prd')).length;
    const inReview = cases.filter(c => c.checkboxes.includes('In Review')).length;
    const rejected = cases.filter(c => c.checkboxes.includes('Rejected')).length;

    return {
      space,
      total: cases.length,
      accepted,
      included,
      inReview,
      rejected,
      percentProcessed: Math.round(((accepted + included + inReview + rejected) / cases.length) * 100)
    };
  });

  return { bySpace: analysis };
}
