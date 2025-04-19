// lib/utils/api-test.ts
import { getSocialMediaTags } from '../api/socialMedia';

export const testAPIs = async (): Promise<{ success: boolean; errors: string[] }> => {
  const errors: string[] = [];
  
  try {
    // Test YouTube API
    try {
      await getSocialMediaTags('test');
    } catch (error) {
      errors.push(`YouTube API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // Test TikTok API
    try {
      // Add TikTok test endpoint
    } catch (error) {
      errors.push(`TikTok API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // Test X API
    try {
      // Add X test endpoint
    } catch (error) {
      errors.push(`X API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    return {
      success: errors.length === 0,
      errors
    };
  } catch (error) {
    errors.push(`General API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      success: false,
      errors
    };
  }
};