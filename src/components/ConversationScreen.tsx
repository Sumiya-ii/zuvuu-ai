import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { useConversation } from '../hooks/useConversation';
import { ConversationTurn } from '../types';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Conversation'>;

const ConversationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { state, startConversation, startRecording, stopRecording } = useConversation(
    Constants.expoConfig?.extra?.OPENAI_API_KEY || ''
  );

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
      <Text style={[
        styles.messageText,
        turn.speaker === 'user' ? styles.userMessageText : styles.aiMessageText
      ]}>
        {turn.text}
      </Text>
    </View>
  );

  React.useEffect(() => {
    if (state.assessment) {
      navigation.navigate('Results', { assessment: state.assessment });
    }
  }, [state.assessment, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timer}>{formatTime(state.timeLeft)}</Text>
        {!state.isActive && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={startConversation}
          >
            <Text style={styles.startButtonText}>Start Conversation</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        style={styles.conversationContainer}
        contentContainerStyle={styles.conversationContent}
      >
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  conversationContainer: {
    flex: 1,
  },
  conversationContent: {
    padding: 16,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#1a1a1a',
  },
  processingText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 8,
    color: '#666',
  },
  recordButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    margin: 16,
    borderRadius: 12,
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