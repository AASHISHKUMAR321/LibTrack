import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AdminHeaderSimple } from '../../../components/AdminHeader';
import { Colors, Fonts, Radius, Shadow } from '../../../constants/theme';

const ROWS = [
  { name: 'Alex Johnson', id: 'STU-8821', in: '08:42 AM', out: '—', status: 'In Library' },
  { name: 'Priya Singh', id: 'STU-9012', in: '09:05 AM', out: '11:20 AM', status: 'Completed' },
];

export default function AdminAttendanceScreen() {
  return (
    <View style={styles.root}>
      <AdminHeaderSimple />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>Today&apos;s Attendance</Text>
        <Text style={styles.sub}>Real-time tracking of library occupancy and student visits.</Text>

        <View style={styles.summaryRow}>
          <View style={styles.sumCard}>
            <Text style={styles.sumLabel}>Total Check-ins Today</Text>
            <Text style={styles.sumVal}>48</Text>
            <View style={styles.sumIcon}>
              <MaterialIcons name="login" size={28} color={Colors.primary} />
            </View>
          </View>
          <View style={styles.sumCard}>
            <Text style={styles.sumLabel}>Currently Inside</Text>
            <Text style={styles.sumVal}>32</Text>
            <View style={styles.sumIcon}>
              <MaterialIcons name="groups" size={28} color={Colors.secondary} />
            </View>
          </View>
        </View>

        <Text style={styles.section}>Live session log</Text>
        {ROWS.map((r) => (
          <View key={r.id} style={styles.rowCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowName}>{r.name}</Text>
              <Text style={styles.rowId}>{r.id}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>{r.status}</Text>
              </View>
              <Text style={styles.times}>
                In {r.in} · Out {r.out}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  scroll: { padding: 24, paddingBottom: 120 },
  h1: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 28,
    color: Colors.onSurface,
    marginBottom: 4,
  },
  sub: { fontFamily: Fonts.body, fontSize: 15, color: Colors.onSurfaceVariant, marginBottom: 24 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  sumCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 20,
    ...Shadow.ambient,
  },
  sumLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
  },
  sumVal: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 36,
    color: Colors.primary,
  },
  sumIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: 'rgba(0, 94, 164, 0.1)',
    padding: 10,
    borderRadius: 999,
  },
  section: {
    fontFamily: Fonts.headline,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 12,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 16,
    marginBottom: 12,
    ...Shadow.ambient,
  },
  rowName: { fontFamily: Fonts.bodySemi, fontSize: 15, fontWeight: '700', color: Colors.onSurface },
  rowId: { fontFamily: Fonts.body, fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 2 },
  statusPill: {
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: 6,
  },
  statusText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.onSecondaryContainer,
  },
  times: { fontFamily: Fonts.body, fontSize: 11, color: Colors.onSurfaceVariant },
});
