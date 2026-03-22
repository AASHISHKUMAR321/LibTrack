import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Fonts, Radius, Shadow } from '../../constants/theme';

const ITEMS = [
  { title: 'October occupancy summary', date: 'Oct 1 – Oct 31, 2025', type: 'PDF' },
  { title: 'Membership renewals', date: 'Last 30 days', type: 'CSV' },
];

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.brandBlue} />
        </Pressable>
        <Text style={styles.headerTitle}>Reports</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>Reports & history</Text>
        <Text style={styles.sub}>Download or share library analytics.</Text>
        {ITEMS.map((item) => (
          <View key={item.title} style={styles.card}>
            <MaterialIcons name="description" size={28} color={Colors.primary} />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMeta}>{item.date}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.type}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
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
  h1: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 26,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  sub: { fontFamily: Fonts.body, fontSize: 15, color: Colors.onSurfaceVariant, marginBottom: 24 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 18,
    marginBottom: 12,
    ...Shadow.ambient,
  },
  cardTitle: { fontFamily: Fonts.bodySemi, fontSize: 15, fontWeight: '700', color: Colors.onSurface },
  cardMeta: { fontFamily: Fonts.body, fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 4 },
  badge: {
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.md,
  },
  badgeText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
});
