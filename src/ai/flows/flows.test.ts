import { describe, it, expect, vi } from 'vitest';
import { predictCarbonFootprint } from './carbon-footprint-prediction';
import { recommendSustainabilityActions } from './sustainable-recommendation-engine';

vi.mock('@/ai/genkit', () => {
  return {
    ai: {
      definePrompt: vi.fn(() => {
        const mockPromptFn: any = vi.fn().mockResolvedValue({
          output: {
            totalCarbonEquivalentKgCO2e: 10,
            breakdown: { meals: 3, transportation: 5, energyUsage: 2 },
            explanation: "Mock explanation",
            recommendations: [
              {
                title: "Mock Swap",
                description: "Mock description",
                category: "Food",
                type: "Sustainable Swap",
                estimatedImpactKgCO2ePerMonth: 5
              }
            ]
          }
        });
        return mockPromptFn;
      }),
      defineFlow: vi.fn((config, fn) => {
        return fn;
      })
    }
  };
});

describe('AI flows', () => {
  it('predicts carbon footprint correctly', async () => {
    const res = await predictCarbonFootprint({ dailyActivitiesDescription: 'ate meat' });
    expect(res.totalCarbonEquivalentKgCO2e).toBe(10);
    expect(res.breakdown.meals).toBe(3);
  });

  it('recommends actions correctly', async () => {
    const res = await recommendSustainabilityActions({
      currentActivitiesSummary: 'commuted to work',
      currentCarbonFootprintKgCO2e: 100,
      userGoals: 'reduce impact'
    });
    expect(res.recommendations[0].title).toBe("Mock Swap");
  });
});
