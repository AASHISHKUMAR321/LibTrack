import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Fonts, Radius, Shadow } from '../../constants/theme';

const PLANS = [
  { name: 'Academic Basic', price: '$4.99/mo', active: 842 },
  { name: 'Academic Pro', price: '$9.99/mo', active: 312 },
  { name: 'Research Plus', price: '$14.99/mo', active: 130 },
];

export default function MembershipsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.brandBlue} />
        </Pressable>
        <Text style={styles.headerTitle}>Memberships</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>Manage plans</Text>
        <Text style={styles.sub}>Overview of subscription tiers and active subscribers.</Text>
        {PLANS.map((p) => (
          <View key={p.name} style={styles.card}>
            <View>
              <Text style={styles.planName}>{p.name}</Text>
              <Text style={styles.price}>{p.price}</Text>
            </View>
            <View style={styles.count}>
              <Text style={styles.countVal}>{p.active}</Text>
              <Text style={styles.countLabel}>active</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 20,
    marginBottom: 12,
    ...Shadow.ambient,
  },
  planName: { fontFamily: Fonts.headline, fontSize: 17, color: Colors.onSurface },
  price: { fontFamily: Fonts.body, fontSize: 14, color: Colors.primary, marginTop: 4 },
  count: { alignItems: 'flex-end' },
  countVal: { fontFamily: Fonts.headlineExtra, fontSize: 22, color: Colors.onSurface },
  countLabel: { fontFamily: Fonts.body, fontSize: 12, color: Colors.onSurfaceVariant },
});
