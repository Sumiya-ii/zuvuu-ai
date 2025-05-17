export type RootStackParamList = {
  Landing: undefined;
  Conversation: undefined;
  Results: {
    assessment: {
      fluency: number;
      grammar: number;
      pronunciation: number;
      vocabulary: number;
      fluencyFeedback: string;
      grammarFeedback: string;
      pronunciationFeedback: string;
      vocabularyFeedback: string;
    };
  };
}; 