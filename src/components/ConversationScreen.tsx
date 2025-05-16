import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useConversation } from '../hooks/useConversation';
import { ConversationTurn } from '../types';

interface Props {
  apiKey: string;
  onConversationEnd: () => void;
}

const ConversationScreen: React.FC<Props> = ({ apiKey, onConversationEnd }) => {
  const { state, startConversation, startRecording, stopRecording } = useConversation(apiKey);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTurn = (turn: ConversationTurn) => (
    <View
      key={turn.timestamp}
      style={[
        styles.messageContainer,
        turn.speaker === 'user' ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text style={styles.messageText}>{turn.text}</Text>
    </View>
  );

  if (state.assessment) {
    onConversationEnd();
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timer}>{formatTime(state.timeLeft)}</Text>
        {!state.isActive && (
          <Button title="Start Conversation" onPress={startConversation} />
        )}
      </View>

      <ScrollView style={styles.conversationContainer}>
        {state.turns.map(renderTurn)}
        {state.isProcessing && (
          <Text style={styles.processingText}>Processing...</Text>
        )}
      </ScrollView>

      {state.isActive && (
        <TouchableOpacity
          style={[styles.recordButton, state.isRecording && styles.recordingButton]}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          <Text style={styles.recordButtonText}>
            {state.isRecording ? 'Release to Stop' : 'Hold to Speak'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  conversationContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#E9E9EB',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  processingText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 8,
  },
  recordButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#FF3B30',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConversationScreen; 