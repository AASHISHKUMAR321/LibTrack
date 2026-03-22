import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StudentHeader } from '../../components/StudentHeader';
import { useAuth } from '../../contexts/AuthContext';
import { Colors, Fonts, Radius, Shadow } from '../../constants/theme';

const AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDhZjkQkHCURwt6rpy2ow6w42Rb-7uj4ksu3yDcqMndbAAgeJ8Q-PXflEXA_I4-KGDCXnIh4xjBKwT94EUGDjQivuBLN7SHPu5BDYHTi6MDWzGezGhE8v8qZper3ik7HyeFYNQ0MW2s49ZfP597wojHGjT0uIltNIc27Dt4S_ySlfVUV6gAkOaMWdsfSK4wCOhBh_gKmDK0Pdn-Uz8yRdHdn6RoCLu3nSLKaNNuGtEcC_fcTqtCrvARK3VY1mb75_745Z5W70RpN9mA';

export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.root}>
      <StudentHeader />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: AVATAR }} style={styles.avatar} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>
          <Text style={styles.name}>Alexander Wright</Text>
          <Text style={styles.phone}>+1 (555) 0123-4567</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.memCard}>
            <View style={styles.memTop}>
              <View style={styles.memIcon}>
                <MaterialIcons name="card-membership" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.memLabel}>Membership</Text>
            </View>
            <Text style={styles.memTitle}>Premium Study Plan</Text>
            <Text style={styles.memExp}>Expires Oct 24, 2024</Text>
            <View style={styles.memProgress}>
              <View style={styles.memProgressLabels}>
                <Text style={styles.memDays}>12</Text>
                <Text style={styles.memDaysHint}>days remaining</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.trackFill, { width: '40%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.todayCard}>
            <View style={styles.memTop}>
              <View style={[styles.memIcon, { backgroundColor: 'rgba(0, 110, 28, 0.1)' }]}>
                <MaterialIcons name="how-to-reg" size={24} color={Colors.secondary} />
              </View>
              <Text style={styles.memLabel}>Today’s Status</Text>
            </View>
            <Text style={styles.todayHint}>Current Status</Text>
            <Text style={styles.todayStatus}>Checked In</Text>
            <View style={styles.timeGrid}>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>In</Text>
                <Text style={styles.timeVal}>08:45 AM</Text>
              </View>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>Out</Text>
                <Text style={[styles.timeVal, { opacity: 0.4 }]}>--:--</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.historyHead}>
          <Text style={styles.historyTitle}>Activity History</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <View style={styles.historyCard}>
          <HistoryRow date="Oct 11, 2023" duration="6h 30m" range="09:00 - 15:30" />
          <View style={styles.spacer} />
          <HistoryRow date="Oct 10, 2023" duration="4h 15m" range="10:15 - 14:30" />
          <View style={styles.spacer} />
          <HistoryRow date="Oct 08, 2023" duration="8h 00m" range="08:00 - 16:00" />
        </View>

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
          <Text style={styles.version}>Version 2.4.0</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function HistoryRow({
  date,
  duration,
  range,
}: {
  date: string;
  duration: string;
  range: string;
}) {
  return (
    <View style={styles.histRow}>
      <View style={styles.histLeft}>
        <View style={styles.histIcon}>
          <MaterialIcons name="calendar-today" size={22} color={Colors.onSurfaceVariant} />
        </View>
        <View>
          <Text style={styles.histDate}>{date}</Text>
          <Text style={styles.histDur}>Duration: {duration}</Text>
        </View>
      </View>
      <View style={styles.histRight}>
        <Text style={styles.histRange}>{range}</Text>
        <Text style={styles.histTag}>Completed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 120,
    maxWidth: 448,
    width: '100%',
    alignSelf: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarWrap: {
    marginBottom: 24,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 24,
    transform: [{ rotate: '3deg' }],
    ...Shadow.ambient,
  },
  badge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.onSecondaryContainer,
  },
  name: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 24,
    letterSpacing: -0.3,
    color: Colors.onSurface,
  },
  phone: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  grid: {
    gap: 16,
    marginBottom: 28,
  },
  memCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 24,
    ...Shadow.ambient,
  },
  todayCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 24,
    ...Shadow.ambient,
  },
  memTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memIcon: {
    padding: 8,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(0, 94, 164, 0.1)',
  },
  memLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
  },
  memTitle: {
    fontFamily: Fonts.headline,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  memExp: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  memProgress: {
    marginTop: 16,
  },
  memProgressLabels: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 8,
  },
  memDays: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 28,
    color: Colors.onSurface,
  },
  memDaysHint: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginBottom: 4,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceContainer,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  todayHint: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  todayStatus: {
    fontFamily: Fonts.headline,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
    marginTop: 4,
  },
  timeGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  timeBox: {
    flex: 1,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: Radius.md,
    padding: 12,
  },
  timeLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
  },
  timeVal: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    color: Colors.onSurface,
    marginTop: 4,
  },
  historyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  historyTitle: {
    fontFamily: Fonts.headline,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: Colors.onSurface,
  },
  seeAll: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    color: Colors.primary,
  },
  historyCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: 24,
    ...Shadow.ambient,
  },
  spacer: {
    height: 16,
  },
  histRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  histLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  histIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  histDate: {
    fontFamily: Fonts.bodySemi,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  histDur: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  histRight: {
    alignItems: 'flex-end',
  },
  histRange: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    color: Colors.onSurface,
  },
  histTag: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.secondary,
    marginTop: 4,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(183, 19, 26, 0.06)',
    marginTop: 8,
  },
  logoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
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
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.tertiary,
    opacity: 0.55,
  },
});
