// Enhanced AI Matching Service with OpenAI Integration
import { aiMatchingService } from './aiMatchingService';

export class EnhancedAIMatchingService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }

  // Enhanced matching with AI-powered compatibility scoring
  async findEnhancedMatches(request) {
    try {
      // Get basic matches from the original service
      const basicMatches = aiMatchingService.findMatches(request);
      
      if (!this.openaiApiKey) {
        console.log('OpenAI API key not available, using basic matching');
        return basicMatches;
      }

      // Enhance matches with AI analysis
      const enhancedMatches = await this.enhanceMatchesWithAI(basicMatches, request);
      
      return enhancedMatches;
    } catch (error) {
      console.error('Error in enhanced matching:', error);
      // Fallback to basic matching
      return aiMatchingService.findMatches(request);
    }
  }

  // Use OpenAI to analyze compatibility and provide insights
  async enhanceMatchesWithAI(matches, request) {
    try {
      const prompt = this.createCompatibilityPrompt(matches, request);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant that helps analyze compatibility between users in a peer-to-peer sharing app. Provide insights about why certain matches might be better than others.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiInsights = data.choices[0]?.message?.content;

      // Add AI insights to matches
      return matches.map((match, index) => ({
        ...match,
        aiInsights: aiInsights,
        enhancedScore: match.finalScore + (index === 0 ? 10 : 0) // Boost top match
      }));

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return matches; // Return original matches if AI fails
    }
  }

  // Create a prompt for AI analysis
  createCompatibilityPrompt(matches, request) {
    const matchSummaries = matches.slice(0, 3).map((match, index) => 
      `Match ${index + 1}: ${match.providerProfile.name} (${match.providerProfile.university}, ${match.providerProfile.major}) - Distance: ${match.distance.toFixed(1)}km, Compatibility: ${match.compatibilityScore}%, Item: ${match.item.description}`
    ).join('\n');

    return `
Analyze these potential matches for a user looking for "${request.itemType}":

${matchSummaries}

User Request: ${request.itemType} - ${request.description || 'No description provided'}

Please provide insights on:
1. Which match seems most compatible and why
2. Any potential concerns or benefits for each match
3. Recommendations for the user

Keep your response concise and helpful.
    `.trim();
  }

  // Generate personalized recommendations
  async generatePersonalizedRecommendations(userId, userProfile) {
    try {
      if (!this.openaiApiKey) {
        return null;
      }

      const prompt = `
Based on this user profile, suggest personalized recommendations for the Clutch app:

User: ${userProfile.name}
University: ${userProfile.university}
Major: ${userProfile.major}
Academic Year: ${userProfile.academicYear}
Help History: ${userProfile.helpedCount} people helped
Bio: ${userProfile.bio}

Provide 3-5 personalized recommendations for:
1. Items they might want to request
2. How they can help others
3. Tips for successful matches

Keep it friendly and specific to their profile.
      `.trim();

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for a peer-to-peer sharing app for college students. Provide friendly, personalized recommendations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 300,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content;

    } catch (error) {
      console.error('Error generating recommendations:', error);
      return null;
    }
  }

  // Analyze safety and provide safety tips
  async generateSafetyTips(itemType, location) {
    try {
      if (!this.openaiApiKey) {
        return null;
      }

      const prompt = `
Provide safety tips for meeting someone to exchange "${itemType}" items in a college setting. Include:
1. Meeting location recommendations
2. Safety precautions
3. What to bring/not bring
4. Red flags to watch for

Keep it practical and college-student focused.
      `.trim();

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a safety advisor for a peer-to-peer sharing app. Provide practical, helpful safety advice.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 250,
          temperature: 0.6
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content;

    } catch (error) {
      console.error('Error generating safety tips:', error);
      return null;
    }
  }
}

// Export singleton instance
export const enhancedAIMatchingService = new EnhancedAIMatchingService();
