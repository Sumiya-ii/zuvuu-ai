import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

const openaiKey = Constants.expoConfig?.extra?.OPENAI_API_KEY || Constants.manifest?.extra?.OPENAI_API_KEY;
const launchDarklyKey = Constants.expoConfig?.extra?.LAUNCHDARKLY_CLIENT_ID || Constants.manifest?.extra?.LAUNCHDARKLY_CLIENT_ID;

console.log('OpenAI Key:', openaiKey);
console.log('LaunchDarkly Key:', launchDarklyKey);

export default function App() {
  const handlePress = () => {
    Alert.alert('🎉 Success!', 'Your React Native + TypeScript setup is working!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello ZuvuuAI 👋</Text>
      <Button title="Test Alert" onPress={handlePress} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
