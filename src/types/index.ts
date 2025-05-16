export interface ConversationTurn {
  speaker: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface AssessmentScore {
  fluency: number;
  grammar: number;
  pronunciation: number;
  vocabulary: number;
}

export interface AssessmentFeedback extends AssessmentScore {
  fluencyFeedback: string;
  grammarFeedback: string;
  pronunciationFeedback: string;
  vocabularyFeedback: string;
}

export interface ConversationState {
  isActive: boolean;
  timeLeft: number;
  turns: ConversationTurn[];
  isRecording: boolean;
  isProcessing: boolean;
  assessment: AssessmentFeedback | null;
} 