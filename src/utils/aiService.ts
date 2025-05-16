import { Configuration, OpenAIApi } from 'openai';
import { AssessmentFeedback } from '../types';

class AIService {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  async transcribeAudio(audioUri: string): Promise<string> {
    try {
      const response = await this.openai.createTranscription(
        await fetch(audioUri).then(r => r.blob()),
        'whisper-1'
      );
      return response.data.text;
    } catch (error) {
      console.error('Transcription error:', error);
      throw error;
    }
  }

  async getAIResponse(conversation: string[]): Promise<string> {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful English conversation partner. Keep responses concise and natural, like in a real conversation. Ask follow-up questions to keep the conversation going.'
          },
          ...conversation.map((text, index) => ({
            role: index % 2 === 0 ? 'user' : 'assistant',
            content: text
          }))
        ],
        max_tokens: 100
      });

      return response.data.choices[0].message?.content || '';
    } catch (error) {
      console.error('AI response error:', error);
      throw error;
    }
  }

  async assessSpeaking(transcript: string[]): Promise<AssessmentFeedback> {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Analyze the following English conversation transcript and provide scores (1-10) and feedback for:
            - Fluency: How smoothly and naturally they speak
            - Grammar: Correctness of language structure
            - Pronunciation: Based on word choice and sentence structure
            - Vocabulary: Range and appropriateness of words used
            Provide the response in JSON format with scores and feedback for each category.`
          },
          {
            role: 'user',
            content: transcript.join('\n')
          }
        ]
      });

      const assessment = JSON.parse(response.data.choices[0].message?.content || '{}');
      return assessment as AssessmentFeedback;
    } catch (error) {
      console.error('Assessment error:', error);
      throw error;
    }
  }
}

export default AIService; 