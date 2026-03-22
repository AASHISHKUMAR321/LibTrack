import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AdminHeader } from '../../../components/AdminHeader';
import { Colors, Fonts, Radius, Shadow } from '../../../constants/theme';

const STATS = [
  { label: 'Total Students', value: '1,284', icon: 'group' as const, tint: 'rgba(0, 94, 164, 0.1)', color: Colors.primary },
  { label: 'Active Today', value: '412', icon: 'event-available' as const, tint: 'rgba(0, 110, 28, 0.1)', color: Colors.secondary },
  { label: 'Checked In Now', value: '87', icon: 'login' as const, tint: '#dbeafe', color: Colors.primary },
  { label: 'Expired Memberships', value: '14', icon: 'notification-important' as const, tint: 'rgba(219, 50, 47, 0.1)', color: Colors.tertiary },
];

const ACTIVITY = [
  { name: 'Sarah Chen', id: '#20491', status: 'Checked In' as const, time: '09:12 AM' },
  { name: 'James Miller', id: '#19832', status: 'Checked Out' as const, time: '08:58 AM' },
  { name: 'Sanya Malhotra', id: '#20993', status: 'Checked In' as const, time: '08:55 AM' },
];

export default function AdminDashboardScreen() {
  return (
    <View style={styles.root}>
      <AdminHeader />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.h1}>Good Morning, Admin 👋</Text>
          <Text style={styles.heroSub}>Here is what&apos;s happening in your library today.</Text>
        </View>

        <View style={styles.statGrid}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: s.tint }]}>
                <MaterialIcons name={s.icon} size={26} color={s.color} />
              </View>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.row}>
          <View style={styles.activityCol}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <Pressable>
                <Text style={styles.viewAll}>View All</Text>
              </Pressable>
            </View>
            <View style={styles.activityCard}>
              {ACTIVITY.map((row, i) => (
                <View key={row.id} style={[styles.actRow, i > 0 && styles.actRowBorder]}>
                  <View style={styles.actIcon}>
                    <MaterialIcons name="person" size={22} color={Colors.onSurfaceVariant} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.actName}>{row.name}</Text>
                    <Text style={styles.actId}>Student ID: {row.id}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View
                      style={[
                        styles.pill,
                        row.status === 'Checked In'
                          ? { backgroundColor: Colors.secondaryContainer }
                          : { backgroundColor: Colors.surfaceContainerHigh },
                      ]}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          row.status === 'Checked In'
                            ? { color: Colors.onSecondaryContainer }
                            : { color: Colors.onSurfaceVariant },
                        ]}
                      >
                        {row.status}
                      </Text>
                    </View>
                    <Text style={styles.actTime}>{row.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.occ}>
          <Text style={styles.sectionTitle}>Occupancy</Text>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.occCard}
          >
            <View style={styles.occRow}>
              <Text style={styles.occLabel}>Peak Capacity</Text>
              <Text style={styles.occPct}>68%</Text>
            </View>
            <View style={styles.occTrack}>
              <View style={[styles.occFill, { width: '68%' }]} />
            </View>
            <Pressable
              style={styles.reportBtn}
              onPress={() => router.push('/(admin)/reports')}
            >
              <Text style={styles.reportBtnText}>Generate Report</Text>
            </Pressable>
          </LinearGradient>

          <View style={styles.systemCard}>
            <Text style={styles.systemLabel}>System Status</Text>
            <View style={styles.systemRow}>
              <View style={styles.dot} />
              <Text style={styles.systemText}>Gate Server Online</Text>
            </View>
            <View style={styles.systemRow}>
              <View style={styles.dot} />
              <Text style={styles.systemText}>RFID Scanner Ready</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  scroll: { paddingBottom: 120, paddingHorizontal: 24, paddingTop: 8 },
  hero: { marginBottom: 28 },
  h1: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 28,
    letterSpacing: -0.5,
    color: Colors.onSurface,
  },
  heroSub: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    marginTop: 8,
    opacity: 0.85,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    width: '47%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 16,
    ...Shadow.ambient,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
    fontWeight: '700',
  },
  statValue: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 28,
    color: Colors.onSurface,
    marginTop: 4,
  },
  row: { marginBottom: 24 },
  activityCol: { flex: 1 },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.headline,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  viewAll: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    color: Colors.primary,
  },
  activityCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...Shadow.ambient,
  },
  actRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  actRowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.surfaceContainer,
  },
  actIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actName: { fontFamily: Fonts.bodySemi, fontSize: 14, fontWeight: '700', color: Colors.onSurface },
  actId: { fontFamily: Fonts.body, fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 2 },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.full },
  pillText: { fontFamily: Fonts.bodySemi, fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  actTime: { fontFamily: Fonts.body, fontSize: 11, color: Colors.onSurfaceVariant, marginTop: 4 },
  occ: { gap: 16, marginBottom: 24 },
  occCard: {
    borderRadius: Radius.xl,
    padding: 24,
    gap: 16,
  },
  occRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  occLabel: { fontFamily: Fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.9)' },
  occPct: { fontFamily: Fonts.headlineExtra, fontSize: 18, color: Colors.onPrimary },
  occTrack: {
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  occFill: {
    height: '100%',
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 8,
  },
  reportBtn: {
    backgroundColor: Colors.surfaceContainerLowest,
    paddingVertical: 12,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  reportBtnText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  systemCard: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: Radius.xl,
    padding: 20,
    gap: 12,
  },
  systemLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
    fontWeight: '700',
  },
  systemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
  },
  systemText: { fontFamily: Fonts.bodyMedium, fontSize: 14, color: Colors.onSurface },
});
