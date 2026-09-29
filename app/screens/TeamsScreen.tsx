import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export function TeamsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D1A" />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="groups" size={72} color="#6C63FF" />
        </View>
        <Text style={styles.title}>Teams</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>
        <Text style={styles.description}>
          Team collaboration features will be available in Practical Exam 2.
          You&apos;ll be able to create teams, assign tasks, and collaborate with your colleagues.
        </Text>
        <View style={styles.featureList}>
          {['Create & manage teams', 'Assign tasks to team members', 'Track team progress', 'Real-time collaboration'].map((f) => (
            <View key={f} style={styles.featureItem}>
              <MaterialIcons name="check-circle-outline" size={18} color="#6C63FF" />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6C63FF22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#6C63FF44',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F1F5F9',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  featureList: {
    gap: 12,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1E1E2E',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D42',
  },
  featureText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
});
