import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AdminHeaderSimple } from '../../../components/AdminHeader';
import { Colors, Fonts, Radius, Shadow } from '../../../constants/theme';

const FILTERS = ['All Students', 'Active', 'Inactive', 'Membership Expired'] as const;

const ROWS = [
  {
    name: 'Julian Alvarez',
    phone: '+1 (555) 234-8901',
    status: 'Active' as const,
    in: 'Checked In' as const,
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5K4gfj49nbk3JfmYqpjV3GGebEhcDW0aC7KzG8paelbGbCQ1_sUmpYK8IwQVt1f32RynMNdj0jmIsqwA4-DPnepjlPIjRz_6qEJVTIBekGv-3WuF94sme7x98F0Q6A4lPgJE30_hh_okdmpZ82FJ2MieDa-DlW97D0fLMwjwrWEmlrUZeq022eBcEVVKkRITE-sjGS9m3fRpiBkyisGUn-0Yp3XdgNuk6FDGPljxQxq86NcdBPcowz5Y18I7ArWF9ApUDJywtvFc',
  },
  {
    name: 'Maria Garcia',
    phone: '+1 (555) 876-1200',
    status: 'Active' as const,
    in: 'Checked Out' as const,
    initials: 'MG',
  },
];

export default function AdminStudentsScreen() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All Students');
  const [q, setQ] = useState('');

  return (
    <View style={styles.root}>
      <AdminHeaderSimple />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>Students</Text>
        <Text style={styles.sub}>Manage member records and attendance status.</Text>

        <View style={styles.searchWrap}>
          <MaterialIcons name="search" size={22} color={Colors.onSurfaceVariant} style={styles.searchIcon} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search by name or student ID..."
            placeholderTextColor="rgba(64, 71, 82, 0.45)"
            style={styles.search}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.chip, filter === f && styles.chipOn]}
            >
              <Text style={[styles.chipText, filter === f && styles.chipTextOn]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={styles.addFab} onPress={() => router.push('/(admin)/add-student')}>
          <MaterialIcons name="person-add" size={22} color={Colors.onPrimary} />
          <Text style={styles.addFabText}>Add Student</Text>
        </Pressable>

        <View style={{ gap: 12 }}>
          {ROWS.map((row) => (
            <View key={row.name} style={styles.card}>
              <View style={styles.cardLeft}>
                {row.photo ? (
                  <Image source={{ uri: row.photo }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarTxt}>{row.initials}</Text>
                  </View>
                )}
                <View>
                  <Text style={styles.name}>{row.name}</Text>
                  <View style={styles.phoneRow}>
                    <MaterialIcons name="phone" size={14} color={Colors.onSurfaceVariant} />
                    <Text style={styles.phone}>{row.phone}</Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <View style={styles.badgeGreen}>
                  <Text style={styles.badgeGreenText}>{row.status}</Text>
                </View>
                <View style={styles.badgeBlue}>
                  <MaterialIcons name="check-circle" size={12} color={Colors.brandBlue} />
                  <Text style={styles.badgeBlueText}>{row.in}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  scroll: { padding: 24, paddingBottom: 120 },
  h1: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 32,
    letterSpacing: -0.5,
    color: Colors.onSurface,
    marginBottom: 4,
  },
  sub: { fontFamily: Fonts.body, fontSize: 15, color: Colors.onSurfaceVariant, marginBottom: 20 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: Radius.xl,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  search: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.onSurface,
    paddingVertical: 14,
  },
  chips: { gap: 8, marginBottom: 20, paddingRight: 8 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  chipOn: { backgroundColor: Colors.primary },
  chipText: { fontFamily: Fonts.bodySemi, fontSize: 12, color: Colors.onSurfaceVariant },
  chipTextOn: { color: Colors.onPrimary },
  addFab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: Radius.xl,
    marginBottom: 20,
  },
  addFabText: { fontFamily: Fonts.headline, fontSize: 16, color: Colors.onPrimary },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 16,
    ...Shadow.ambient,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  avatar: { width: 56, height: 56, borderRadius: 12 },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { fontFamily: Fonts.headline, fontSize: 18, color: Colors.onSurfaceVariant },
  name: { fontFamily: Fonts.bodySemi, fontSize: 17, fontWeight: '700', color: Colors.onSurface },
  phoneRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  phone: { fontFamily: Fonts.body, fontSize: 13, color: Colors.onSurfaceVariant },
  badgeGreen: {
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeGreenText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.onSecondaryContainer,
  },
  badgeBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.tabActiveBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeBlueText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.brandBlue,
  },
});
