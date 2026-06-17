'use server';
/**
 * @fileOverview This file implements an AI flow for generating personalized sustainability recommendations.
 *
 * - recommendSustainabilityActions - A function that provides sustainable swaps and habit changes.
 * - SustainableRecommendationInput - The input type for the recommendSustainabilityActions function.
 * - SustainableRecommendationOutput - The return type for the recommendSustainabilityActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SustainableRecommendationInputSchema = z.object({
  currentActivitiesSummary: z
    .string()
    .describe(
      'A summary of the user\'s recent activities across categories like meals, transportation, and energy usage. Example: "Yesterday I ate meat for dinner, drove 20 miles to work, and left my computer on all night."'
    ),
  currentCarbonFootprintKgCO2e: z
    .number()
    .describe('The user\'s estimated current monthly carbon footprint in kg CO2e.'),
  userGoals: z
    .string()
    .describe(
      'The user\'s specific sustainability goals or preferences. Example: "I want to reduce my driving, eat less red meat, and save money on energy bills."'
    ),
});
export type SustainableRecommendationInput = z.infer<
  typeof SustainableRecommendationInputSchema
>;

const SustainableRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string().describe('A concise title for the recommendation.'),
      description:
        z.string().describe('A detailed explanation of the recommendation and how to implement it.'),
      category:
        z.enum(['Transportation', 'Food', 'Energy', 'Shopping', 'Waste', 'General']).describe('The lifestyle category this recommendation falls under.'),
      type:
        z.enum(['Sustainable Swap', 'Habit Change']).describe('Whether this is a product/service swap or a behavioral habit change.'),
      estimatedImpactKgCO2ePerMonth: z
        .number()
        .describe('The estimated monthly carbon reduction (in kg CO2e) if this recommendation is implemented.'),
    })
  ).describe('A list of personalized and actionable sustainability recommendations.'),
});
export type SustainableRecommendationOutput = z.infer<
  typeof SustainableRecommendationOutputSchema
>;

export async function recommendSustainabilityActions(
  input: SustainableRecommendationInput
): Promise<SustainableRecommendationOutput> {
  return sustainableRecommendationFlow(input);
}

const sustainableRecommendationPrompt = ai.definePrompt({
  name: 'sustainableRecommendationPrompt',
  input: {schema: SustainableRecommendationInputSchema},
  output: {schema: SustainableRecommendationOutputSchema},
  prompt: `You are an expert sustainability coach named Sage. Your goal is to help users reduce their personal carbon footprint by providing personalized, actionable recommendations for sustainable swaps and habit changes.

Analyze the user's reported activities and carbon footprint data, considering their stated goals, to generate practical and impactful suggestions. Focus on making the recommendations easy to understand and implement, providing clear estimated carbon reduction impacts.

User's Current Activities Summary: {{{currentActivitiesSummary}}}
User's Current Monthly Carbon Footprint: {{{currentCarbonFootprintKgCO2e}}} kg CO2e
User's Goals: {{{userGoals}}}

Based on this information, provide 3-5 distinct, actionable, and personalized recommendations. Each recommendation should include a title, a detailed description, its category (e.g., Transportation, Food, Energy), its type (Sustainable Swap or Habit Change), and an estimated monthly carbon reduction (in kg CO2e).
`,
});

const sustainableRecommendationFlow = ai.defineFlow(
  {
    name: 'sustainableRecommendationFlow',
    inputSchema: SustainableRecommendationInputSchema,
    outputSchema: SustainableRecommendationOutputSchema,
  },
  async input => {
    const {output} = await sustainableRecommendationPrompt(input);
    return output!;
  }
);
