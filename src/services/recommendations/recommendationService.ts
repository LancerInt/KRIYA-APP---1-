import {Recommendation} from '@shared/types/models';

export const filterRecommendations = (rows: Recommendation[], crop: string, problem?: string): Recommendation[] =>
  rows.filter(r => r.crop.toLowerCase() === crop.toLowerCase() && (!problem || r.problem.toLowerCase() === problem.toLowerCase()));
