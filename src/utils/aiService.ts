import OpenAI from 'openai';
import { AssessmentFeedback } from '../types';

type ChatRole = 'system' | 'user' | 'assistant';

class AIService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async transcribeAudio(audioUri: string): Promise<string> {
    try {
      const audioBlob = await fetch(audioUri).then(r => r.blob());
      const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
      
      const response = await this.openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1'
      });
      return response.text;
    } catch (error) {
      console.error('Transcription error:', error);
      throw error;
    }
  }

  async getAIResponse(conversation: string[]): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system' as ChatRole,
            content: 'You are a helpful English conversation partner. Keep responses concise and natural, like in a real conversation. Ask follow-up questions to keep the conversation going.'
          },
          ...conversation.map((text, index) => ({
            role: (index % 2 === 0 ? 'user' : 'assistant') as ChatRole,
            content: text
          }))
        ],
        max_tokens: 100
      });

      return response.choices[0].message?.content || '';
    } catch (error) {
      console.error('AI response error:', error);
      throw error;
    }
  }

  async assessSpeaking(transcript: string[]): Promise<AssessmentFeedback> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system' as ChatRole,
            content: `Analyze the following English conversation transcript and provide scores (1-10) and feedback for:
            - Fluency: How smoothly and naturally they speak
            - Grammar: Correctness of language structure
            - Pronunciation: Based on word choice and sentence structure
            - Vocabulary: Range and appropriateness of words used
            Provide the response in JSON format with scores and feedback for each category.`
          },
          {
            role: 'user' as ChatRole,
            content: transcript.join('\n')
          }
        ]
      });

      const assessment = JSON.parse(response.choices[0].message?.content || '{}');
      return assessment as AssessmentFeedback;
    } catch (error) {
      console.error('Assessment error:', error);
      throw error;
    }
  }
}

export default AIService; 