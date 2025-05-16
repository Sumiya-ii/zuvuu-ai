import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { Recording } from 'expo-av/build/Audio';

class AudioService {
  private recording: Recording | null = null;

  async startRecording(): Promise<void> {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      this.recording = recording;
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<string> {
    if (!this.recording) {
      throw new Error('No recording in progress');
    }

    try {
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;
      return uri || '';
    } catch (error) {
      console.error('Failed to stop recording:', error);
      throw error;
    }
  }

  async speak(text: string): Promise<void> {
    try {
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1,
        rate: 0.9,
      });
    } catch (error) {
      console.error('Text-to-speech error:', error);
      throw error;
    }
  }
}

export default AudioService; 