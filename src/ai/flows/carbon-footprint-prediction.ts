'use server';
/**
 * @fileOverview An AI tool that reasons through user-submitted logs of daily activities
 * (meals, transportation, energy usage) to predict real-time carbon equivalents.
 *
 * - predictCarbonFootprint - A function that handles the carbon footprint prediction process.
 * - DailyActivityInput - The input type for the predictCarbonFootprint function.
 * - CarbonFootprintPredictionOutput - The return type for the predictCarbonFootprint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyActivityInputSchema = z.object({
  dailyActivitiesDescription: z
    .string()
    .describe(
      'A natural language description of daily activities including meals, transportation, and energy usage.'
    ),
});
export type DailyActivityInput = z.infer<typeof DailyActivityInputSchema>;

const CarbonFootprintPredictionOutputSchema = z.object({
  totalCarbonEquivalentKgCO2e: z
    .number()
    .describe('The total estimated carbon equivalent in kilograms of CO2e.'),
  breakdown: z
    .object({
      meals: z
        .number()
        .describe('Estimated carbon equivalent from meals in kilograms of CO2e.'),
      transportation: z
        .number()
        .describe(
          'Estimated carbon equivalent from transportation in kilograms of CO2e.'
        ),
      energyUsage: z
        .number()
        .describe(
          'Estimated carbon equivalent from energy usage in kilograms of CO2e.'
        ),
      other: z
        .number()
        .optional()
        .describe(
          'Estimated carbon equivalent from other activities, if any, in kilograms of CO2e.'
        ),
    })
    .describe('A breakdown of the carbon equivalent by activity category.'),
  explanation: z
    .string()
    .describe(
      'A brief explanation of how the carbon footprint was estimated and any assumptions made.'
    ),
});
export type CarbonFootprintPredictionOutput = z.infer<
  typeof CarbonFootprintPredictionOutputSchema
>;

export async function predictCarbonFootprint(
  input: DailyActivityInput
): Promise<CarbonFootprintPredictionOutput> {
  return carbonFootprintPredictionFlow(input);
}

const carbonFootprintPredictionPrompt = ai.definePrompt({
  name: 'carbonFootprintPredictionPrompt',
  input: {schema: DailyActivityInputSchema},
  output: {schema: CarbonFootprintPredictionOutputSchema},
  prompt: `You are an expert carbon footprint estimator. Your task is to analyze the user's daily activities and provide an estimated carbon footprint in kilograms of CO2e.

Carefully read the provided daily activity log.
Identify activities related to meals, transportation, and energy usage.
For each identified activity, estimate its carbon equivalent in kilograms of CO2e.
If a category is not mentioned in the input, assume its carbon equivalent is 0.
Use reasonable average values for common activities if specific details are not provided (e.g., 'a car ride' can be estimated as an average car trip, 'eating meat' can be estimated as an average meat-based meal, 'watching TV' can be estimated as average household energy consumption for entertainment).

Summarize your estimation with a total, a breakdown by category, and a brief explanation of your methodology and any assumptions.

Daily Activities:
{{{dailyActivitiesDescription}}}`,
});

const carbonFootprintPredictionFlow = ai.defineFlow(
  {
    name: 'carbonFootprintPredictionFlow',
    inputSchema: DailyActivityInputSchema,
    outputSchema: CarbonFootprintPredictionOutputSchema,
  },
  async input => {
    const {output} = await carbonFootprintPredictionPrompt(input);
    return output!;
  }
);
