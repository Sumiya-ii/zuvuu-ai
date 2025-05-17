import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Assuming Expo for icons
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RadarChart } from 'react-native-gifted-charts';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

const LandingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const radarData = [
    { subject: 'Pronunciation', A: 80 },
    { subject: 'Vocabulary', A: 90 },
    { subject: 'Grammar', A: 70 },
    { subject: 'Fluency', A: 85 },
    { subject: 'Confidence', A: 75 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Zuvuu</Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Are you ready to improve your English?</Text>
        <Text style={styles.subtitle}>Та англи хэлээ сайжруулахад бэлэн үү?</Text>

        <View style={styles.radarChartContainer}>
          <RadarChart
            data={radarData.map(item => item.A)}
            size={300}
            maxValue={100}
            dataStroke={'#1e90ff'}
            dataFillColor={'#1e90ff'}
            dataFillOpacity={0.6}
            stroke={'#ffffff'} // Color for the grid lines
            strokeWidth={1} // Width for the grid lines
            divisionStroke={'#cccccc'} // Color for division lines
            divisionStrokeOpacity={0.8} // Opacity for division lines
            labelColor={'#ffffff'}
            labelFontSize={12}
            labelDistance={1.2} // Adjust label distance if needed
          />
        </View>

        <TouchableOpacity style={styles.improveButton}>
          <Text style={styles.improveButtonText}>Let's start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a23', // Dark background color
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20, // Adjust as needed for status bar
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#1e90ff', // Blue button color
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50, // Adjust to move content up
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc', // Lighter color for subtitle
    textAlign: 'center',
    marginBottom: 30,
  },
  titleAccent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff', // Blue color for 'improve'
    textAlign: 'center',
    marginBottom: 20,
  },
  radarChartContainer: {
    // Container for the radar chart
    marginVertical: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400, // Limit width for larger screens
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#1a1a1a', // Darker background for buttons
    borderRadius: 10,
    padding: 15,
    width: '48%', // Roughly half with some space
    marginBottom: 15, // Space between rows
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1, // Take up remaining space
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffffff', // White border
    marginLeft: 10,
  },
  improveButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#ffffff', // White button color
    borderRadius: 5,
  },
  improveButtonText: {
    color: '#0a0a23', // Dark text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingScreen; 