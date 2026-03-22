import { LinearGradient } from 'expo-linear-gradient';
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
import { PrimaryGradientButton } from '../components/PrimaryGradientButton';
import { useAuth } from '../contexts/AuthContext';
import { Colors, Fonts, Radius, Shadow } from '../constants/theme';

type LoginMode = 'student' | 'admin';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { signInStudent, signInAdmin } = useAuth();
  const [mode, setMode] = useState<LoginMode>('student');
  const [studentId, setStudentId] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const onStudentSubmit = () => {
    signInStudent(studentId || 'STU-2024-001');
    router.replace('/(tabs)');
  };

  const onAdminSubmit = () => {
    signInAdmin(adminEmail || 'admin@libtrack.com', adminPassword || 'password');
    router.replace('/(admin)');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.topAccent}>
        <View style={styles.topAccentFill} />
      </View>
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          <View style={styles.roleSwitch}>
            <Pressable
              style={[styles.roleBtn, mode === 'student' && styles.roleBtnOn]}
              onPress={() => setMode('student')}
            >
              <Text style={[styles.roleBtnText, mode === 'student' && styles.roleBtnTextOn]}>
                Student
              </Text>
            </Pressable>
            <Pressable
              style={[styles.roleBtn, mode === 'admin' && styles.roleBtnOn]}
              onPress={() => setMode('admin')}
            >
              <Text style={[styles.roleBtnText, mode === 'admin' && styles.roleBtnTextOn]}>
                Administrator
              </Text>
            </Pressable>
          </View>

          {mode === 'student' ? (
            <>
              <View style={styles.brand}>
                <View style={styles.logoWrap}>
                  <MaterialIcons name="local-library" size={36} color={Colors.primary} />
                </View>
                <Text style={styles.title}>LibTrack</Text>
                <Text style={styles.portal}>Student Portal</Text>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.welcome}>Welcome Back</Text>
                  <Text style={styles.sub}>
                    Enter your credentials to access the digital library shelf.
                  </Text>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Student ID or Phone Number</Text>
                  <View style={styles.inputWrap}>
                    <MaterialIcons
                      name="badge"
                      size={22}
                      color={Colors.outline}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={studentId}
                      onChangeText={setStudentId}
                      placeholder="STU-2024-001 or +1..."
                      placeholderTextColor={Colors.outline}
                      style={styles.input}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                <PrimaryGradientButton label="Sign In" onPress={onStudentSubmit} style={styles.cta}>
                  <MaterialIcons name="arrow-forward" size={22} color={Colors.onPrimary} />
                </PrimaryGradientButton>

                <View style={styles.footer}>
                  <Pressable>
                    <Text style={styles.link}>Forgot your access code?</Text>
                  </Pressable>
                  <View style={styles.dividerRow}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerLabel}>New Student?</Text>
                    <View style={styles.divider} />
                  </View>
                  <Pressable>
                    <Text style={styles.mutedLink}>Request Registration Access</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.trust}>
                <MaterialIcons name="verified-user" size={16} color={Colors.outline} />
                <Text style={styles.trustText}>Secure Academic Gateway</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.brand}>
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryContainer]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.adminLogo}
                >
                  <MaterialIcons name="menu-book" size={36} color={Colors.onPrimary} />
                </LinearGradient>
                <Text style={styles.adminTitle}>LibTrack</Text>
                <Text style={styles.adminTag}>The Digital Curator for Modern Libraries</Text>
              </View>

              <View style={styles.card}>
                <View style={styles.field}>
                  <Text style={styles.label}>Phone Number / Email</Text>
                  <TextInput
                    value={adminEmail}
                    onChangeText={setAdminEmail}
                    placeholder="admin@libtrack.com"
                    placeholderTextColor={Colors.outline}
                    style={styles.inputPlain}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
                <View style={[styles.field, { marginTop: 16 }]}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    value={adminPassword}
                    onChangeText={setAdminPassword}
                    placeholder="••••••••"
                    placeholderTextColor={Colors.outline}
                    style={styles.inputPlain}
                    secureTextEntry
                  />
                </View>

                <PrimaryGradientButton label="Login" onPress={onAdminSubmit} style={styles.cta}>
                  <MaterialIcons name="arrow-forward" size={22} color={Colors.onPrimary} />
                </PrimaryGradientButton>

                <Pressable style={styles.forgotAdmin}>
                  <Text style={styles.link}>Forgot Password?</Text>
                </Pressable>
              </View>

              <View style={styles.adminBanner}>
                <View style={styles.adminBannerIcon}>
                  <MaterialIcons name="admin-panel-settings" size={28} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.adminBannerTitle}>Administrator Portal</Text>
                  <Text style={styles.adminBannerSub}>
                    Secure endpoint for library staff and curators.
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  roleSwitch: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: Radius.full,
    padding: 4,
    marginBottom: 28,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: Radius.full,
  },
  roleBtnOn: {
    backgroundColor: Colors.surfaceContainerLowest,
    ...Shadow.ambient,
  },
  roleBtnText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 13,
    color: Colors.onSurfaceVariant,
  },
  roleBtnTextOn: {
    color: Colors.primary,
    fontWeight: '700',
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.surfaceContainer,
    zIndex: 10,
  },
  topAccentFill: {
    width: '33%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  blobTop: {
    position: 'absolute',
    top: '-8%',
    right: '-15%',
    width: 280,
    height: 280,
    borderRadius: 200,
    backgroundColor: 'rgba(0, 94, 164, 0.05)',
  },
  blobBottom: {
    position: 'absolute',
    bottom: '-8%',
    left: '-12%',
    width: 220,
    height: 220,
    borderRadius: 200,
    backgroundColor: 'rgba(0, 110, 28, 0.05)',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  inner: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  brand: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(192, 199, 212, 0.15)',
    ...Shadow.ambient,
  },
  adminLogo: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 30,
    letterSpacing: -0.5,
    color: Colors.primary,
    marginBottom: 4,
  },
  adminTitle: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 36,
    letterSpacing: -0.5,
    marginBottom: 8,
    color: Colors.primary,
  },
  adminTag: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  portal: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(192, 199, 212, 0.1)',
    ...Shadow.ambient,
  },
  cardHeader: {
    marginBottom: 32,
  },
  welcome: {
    fontFamily: Fonts.headline,
    fontSize: 20,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },
  field: {
    marginBottom: 8,
  },
  label: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: Radius.md,
    minHeight: 52,
    paddingLeft: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurface,
    paddingVertical: 14,
    paddingRight: 16,
  },
  inputPlain: {
    width: '100%',
    minHeight: 52,
    paddingHorizontal: 16,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceContainerHigh,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurface,
  },
  cta: {
    width: '100%',
    marginTop: 16,
  },
  footer: {
    marginTop: 32,
    paddingTop: 24,
    alignItems: 'center',
    gap: 16,
  },
  forgotAdmin: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    color: Colors.primary,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.surfaceContainer,
  },
  dividerLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.outline,
  },
  mutedLink: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  trust: {
    marginTop: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  trustText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.outline,
  },
  adminBanner: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: Radius.xl,
    padding: 20,
    overflow: 'hidden',
  },
  adminBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminBannerTitle: {
    fontFamily: Fonts.headline,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  adminBannerSub: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
});
