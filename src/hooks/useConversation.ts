import { useState, useEffect, useCallback } from 'react';
import { ConversationState, ConversationTurn, AssessmentFeedback } from '../types';
import AIService from '../utils/aiService';
import AudioService from '../utils/audioService';

const CONVERSATION_TIME = 180; // 3 minutes

export const useConversation = (apiKey: string) => {
  const [state, setState] = useState<ConversationState>({
    isActive: false,
    timeLeft: CONVERSATION_TIME,
    turns: [],
    isRecording: false,
    isProcessing: false,
    assessment: null,
  });

  const aiService = new AIService(apiKey);
  const audioService = new AudioService();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.isActive && state.timeLeft > 0) {
      timer = setInterval(() => {
        setState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      endConversation();
    }
    return () => clearInterval(timer);
  }, [state.isActive, state.timeLeft]);

  const startConversation = useCallback(async () => {
    setState(prev => ({
      ...prev,
      isActive: true,
      timeLeft: CONVERSATION_TIME,
      turns: [],
      assessment: null,
    }));

    // Initial AI prompt
    const initialPrompt = await aiService.getAIResponse(['Start a casual conversation']);
    await audioService.speak(initialPrompt);

    setState(prev => ({
      ...prev,
      turns: [...prev.turns, { speaker: 'ai', text: initialPrompt, timestamp: Date.now() }],
    }));
  }, []);

  const startRecording = useCallback(async () => {
    if (!state.isActive || state.isRecording) return;

    setState(prev => ({ ...prev, isRecording: true }));
    await audioService.startRecording();
  }, [state.isActive, state.isRecording]);

  const stopRecording = useCallback(async () => {
    if (!state.isRecording) return;

    setState(prev => ({ ...prev, isRecording: false, isProcessing: true }));
    const audioUri = await audioService.stopRecording();
    const transcription = await aiService.transcribeAudio(audioUri);

    // Add user's turn
    setState(prev => ({
      ...prev,
      turns: [...prev.turns, { speaker: 'user', text: transcription, timestamp: Date.now() }],
    }));

    // Get AI response
    const conversation = state.turns.map(turn => turn.text);
    const aiResponse = await aiService.getAIResponse([...conversation, transcription]);
    await audioService.speak(aiResponse);

    // Add AI's turn
    setState(prev => ({
      ...prev,
      isProcessing: false,
      turns: [...prev.turns, { speaker: 'ai', text: aiResponse, timestamp: Date.now() }],
    }));
  }, [state.isRecording, state.turns]);

  const endConversation = useCallback(async () => {
    setState(prev => ({ ...prev, isActive: false, isProcessing: true }));

    const transcript = state.turns.map(turn => turn.text);
    const assessment = await aiService.assessSpeaking(transcript);

    setState(prev => ({ ...prev, isProcessing: false, assessment }));
  }, [state.turns]);

  return {
    state,
    startConversation,
    startRecording,
    stopRecording,
    endConversation,
  };
};

export default useConversation; 