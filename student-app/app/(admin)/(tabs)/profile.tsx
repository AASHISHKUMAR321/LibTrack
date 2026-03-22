import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AdminHeaderSimple } from '../../../components/AdminHeader';
import { useAuth } from '../../../contexts/AuthContext';
import { Colors, Fonts, Radius, Shadow } from '../../../constants/theme';

const AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC8CbZbg67nWjrc-MN-KoZCPUK1ARA-VieecNTxsG95DIYxdMNuMz3kxA8std5ftPg5_XsWb1zzuagLRUgJSJGo5a2JOitIijgLQbSFBgniYgETUCYmXplCt9G63b7g7HEd_VZ-mzg0tzOMAgOG2DqYltebWuFqr_OYzD2yGejrFli5LQjNM3Rbdm28tq3-9-uBSwPbN1zJzLM98DRZwUUcUN4KkCRlb03W18huXtUt1O-L7QthFQ9bSIjekf98_mziVTdI5cTiuN8';

export default function AdminProfileScreen() {
  const { userId, signOut } = useAuth();

  return (
    <View style={styles.root}>
      <AdminHeaderSimple />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: AVATAR }} style={styles.avatar} />
            <View style={styles.verified}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <Text style={styles.name}>Alexander Sterling</Text>
          <Text style={styles.role}>Chief Librarian · {userId ?? 'admin@libtrack.com'}</Text>
        </View>

        <View style={styles.bento}>
          <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>Total Books</Text>
            <Text style={styles.bentoVal}>12,482</Text>
          </View>
          <View style={[styles.bentoCard, styles.bentoAccent]}>
            <Text style={styles.bentoLabelInv}>Account Level</Text>
            <Text style={styles.bentoValInv}>Premium Elite</Text>
          </View>
        </View>

        <Text style={styles.menuHead}>Account Management</Text>

        <MenuRow
          icon="payments"
          title="Memberships"
          subtitle="Plans and billing"
          onPress={() => router.push('/(admin)/memberships')}
        />
        <MenuRow
          icon="assessment"
          title="Reports & history"
          subtitle="Exports and analytics"
          onPress={() => router.push('/(admin)/reports')}
        />
        <MenuRow icon="notifications" title="Notifications" subtitle="Alerts and email" dot />
        <MenuRow icon="settings" title="Settings" subtitle="App preferences and security" />

        <Pressable
          style={styles.logout}
          onPress={() => {
            signOut();
            router.replace('/login');
          }}
        >
          <View style={styles.logoutLeft}>
            <View style={styles.logoutIcon}>
              <MaterialIcons name="logout" size={22} color={Colors.tertiary} />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <Text style={styles.version}>v2.4.0</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function MenuRow({
  icon,
  title,
  subtitle,
  dot,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  dot?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.menuRow} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIcon}>
          <MaterialIcons name={icon} size={22} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuSub}>{subtitle}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {dot ? <View style={styles.redDot} /> : null}
        <MaterialIcons name="chevron-right" size={22} color={Colors.outlineVariant} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  scroll: { paddingHorizontal: 24, paddingBottom: 120, paddingTop: 8 },
  hero: { alignItems: 'center', marginBottom: 32 },
  avatarWrap: { marginBottom: 16 },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 16,
    transform: [{ rotate: '3deg' }],
    ...Shadow.ambient,
  },
  verified: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  verifiedText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.onSecondaryContainer,
  },
  name: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 28,
    color: Colors.onSurface,
  },
  role: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
    textAlign: 'center',
  },
  bento: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  bentoCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 20,
    ...Shadow.ambient,
  },
  bentoAccent: {
    backgroundColor: Colors.primary,
  },
  bentoLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
    marginBottom: 4,
  },
  bentoVal: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 26,
    color: Colors.primary,
  },
  bentoLabelInv: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  bentoValInv: {
    fontFamily: Fonts.headline,
    fontSize: 20,
    color: Colors.onPrimary,
  },
  menuHead: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    marginLeft: 8,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 18,
    marginBottom: 12,
    ...Shadow.ambient,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: { fontFamily: Fonts.bodySemi, fontSize: 16, color: Colors.onSurface },
  menuSub: { fontFamily: Fonts.body, fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 2 },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.tertiary,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    padding: 18,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(183, 19, 26, 0.06)',
  },
  logoutLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(183, 19, 26, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.tertiary,
  },
  version: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    color: Colors.tertiary,
    opacity: 0.55,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
