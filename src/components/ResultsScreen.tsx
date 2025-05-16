import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { AssessmentFeedback } from '../types';

interface Props {
  assessment: AssessmentFeedback;
  onRetry: () => void;
  onReviewTranscript: () => void;
}

const ResultsScreen: React.FC<Props> = ({
  assessment,
  onRetry,
  onReviewTranscript,
}) => {
  const renderScoreSection = (
    title: string,
    score: number,
    feedback: string
  ) => (
    <View style={styles.scoreSection}>
      <View style={styles.scoreHeader}>
        <Text style={styles.scoreTitle}>{title}</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>
      <Text style={styles.feedbackText}>{feedback}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speaking Assessment</Text>
      
      <ScrollView style={styles.scrollContainer}>
        {renderScoreSection('Fluency', assessment.fluency, assessment.fluencyFeedback)}
        {renderScoreSection('Grammar', assessment.grammar, assessment.grammarFeedback)}
        {renderScoreSection(
          'Pronunciation',
          assessment.pronunciation,
          assessment.pronunciationFeedback
        )}
        {renderScoreSection(
          'Vocabulary',
          assessment.vocabulary,
          assessment.vocabularyFeedback
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Try Again" onPress={onRetry} />
        <Button title="Review Transcript" onPress={onReviewTranscript} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scoreSection: {
    marginBottom: 24,
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
});

export default ResultsScreen; 