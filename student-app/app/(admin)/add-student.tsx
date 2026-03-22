import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PrimaryGradientButton } from '../../components/PrimaryGradientButton';
import { Colors, Fonts, Radius, Shadow } from '../../constants/theme';

export default function AddStudentScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.brandBlue} />
        </Pressable>
        <Text style={styles.headerTitle}>Add Student</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Full name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Julian Alvarez"
          placeholderTextColor={Colors.outline}
          style={styles.input}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="+1 ..."
          placeholderTextColor={Colors.outline}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <Text style={styles.label}>Student ID</Text>
        <TextInput
          value={id}
          onChangeText={setId}
          placeholder="STU-2025-..."
          placeholderTextColor={Colors.outline}
          style={styles.input}
          autoCapitalize="characters"
        />
        <PrimaryGradientButton
          label="Save student"
          onPress={() => router.back()}
          style={styles.cta}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(192, 199, 212, 0.2)',
  },
  back: { padding: 8 },
  headerTitle: { fontFamily: Fonts.headline, fontSize: 18, color: Colors.onSurface },
  scroll: { padding: 24, paddingBottom: 48 },
  label: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.onSurface,
    ...Shadow.ambient,
  },
  cta: { marginTop: 28, width: '100%' },
});
