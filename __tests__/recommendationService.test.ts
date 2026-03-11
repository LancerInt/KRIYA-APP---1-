import {filterRecommendations} from '../src/services/recommendations/recommendationService';

test('filters recommendations by crop and optional problem', () => {
  const rows = [
    {crop: 'Tomato', problem: 'Root Rot', products: ['Biota-H']},
    {crop: 'Tomato', problem: 'Wilt', products: ['Neuvita']}
  ];
  expect(filterRecommendations(rows, 'tomato').length).toBe(2);
  expect(filterRecommendations(rows, 'tomato', 'wilt')[0].products[0]).toBe('Neuvita');
});
