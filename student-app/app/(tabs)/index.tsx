import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ProgressRing } from '../../components/ProgressRing';
import { StudentHeader } from '../../components/StudentHeader';
import { Colors, Fonts, Radius, Shadow } from '../../constants/theme';

export default function DashboardScreen() {
  return (
    <View style={styles.root}>
      <StudentHeader
        onPressNotifications={() => router.push('/(tabs)/notifications')}
        showNotificationDot
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.h2}>Welcome back, Alex 👋</Text>
          <Text style={styles.tagline}>Ready for some focused reading today?</Text>
        </View>

        <View style={styles.bento}>
          <View style={styles.bentoCard}>
            <View style={styles.bentoTop}>
              <View style={styles.iconGreen}>
                <MaterialIcons name="check-circle" size={22} color={Colors.onSecondaryContainer} />
              </View>
              <Text style={styles.pillLabel}>Status</Text>
            </View>
            <View>
              <Text style={styles.bentoTitle}>Checked In</Text>
              <Text style={styles.bentoMeta}>Active Session: 2h 14m</Text>
            </View>
          </View>

          <View style={styles.bentoCard}>
            <View style={styles.bentoTop}>
              <View style={styles.iconBlue}>
                <MaterialIcons name="verified-user" size={22} color={Colors.primary} />
              </View>
              <Text style={styles.pillLabel}>Membership</Text>
            </View>
            <View>
              <Text style={[styles.bentoTitle, { fontSize: 18 }]}>Academic Pro</Text>
              <View style={styles.daysPill}>
                <Text style={styles.daysPillText}>12 Days Left</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.heroWrap}>
          <LinearGradient
            colors={['rgba(0, 94, 164, 0.2)', 'rgba(0, 119, 206, 0.15)']}
            style={styles.heroGlow}
          />
          <Pressable
            style={({ pressed }) => [styles.heroBtn, pressed && { transform: [{ scale: 0.98 }] }]}
            onPress={() => router.push('/(tabs)/scan')}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={styles.heroIconRing}>
                <MaterialIcons name="qr-code-scanner" size={40} color={Colors.onPrimary} />
              </View>
              <View style={styles.heroTextBlock}>
                <Text style={styles.heroTitle}>Scan to Check In/Out</Text>
                <Text style={styles.heroSub}>Tap here to activate library access</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressH}>Your Progress</Text>
            <MaterialIcons name="trending-up" size={22} color={Colors.onSurfaceVariant} />
          </View>
          <View style={styles.progressRow}>
            <ProgressRing percent={70} size={80} stroke={8} />
            <View style={styles.progressCopy}>
              <Text style={styles.progressLead}>Weekly Goal: 15 Hours</Text>
              <Text style={styles.progressBody}>
                You’ve completed 10.5 hours of study this week. Keep it up!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.notifSection}>
          <View style={styles.notifHeader}>
            <Text style={styles.notifH}>Recent Notifications</Text>
            <Pressable onPress={() => router.push('/(tabs)/notifications')}>
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>

          <View style={styles.notifCard}>
            <View style={styles.notifIconWarn}>
              <MaterialIcons name="event-repeat" size={22} color={Colors.tertiary} />
            </View>
            <View style={styles.notifBody}>
              <View style={styles.notifRow}>
                <Text style={styles.notifTitle}>Membership Renewal</Text>
                <Text style={styles.notifTime}>2h ago</Text>
              </View>
              <Text style={styles.notifDesc}>
                Your Academic Pro plan expires in 12 days. Renew now to avoid interruption.
              </Text>
            </View>
          </View>

          <View style={styles.notifCard}>
            <View style={styles.notifIconPri}>
              <MaterialIcons name="campaign" size={22} color={Colors.primary} />
            </View>
            <View style={styles.notifBody}>
              <View style={styles.notifRow}>
                <Text style={styles.notifTitle}>Holiday Announcement</Text>
                <Text style={styles.notifTime}>1d ago</Text>
              </View>
              <Text style={styles.notifDesc}>
                The East Wing library will be closed this Friday for maintenance.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 120,
    maxWidth: 448,
    width: '100%',
    alignSelf: 'center',
  },
  section: {
    marginBottom: 32,
  },
  h2: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 24,
    letterSpacing: -0.3,
    color: Colors.onSurface,
  },
  tagline: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  bento: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  bentoCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(192, 199, 212, 0.15)',
    justifyContent: 'space-between',
    ...Shadow.ambient,
  },
  bentoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconGreen: {
    padding: 8,
    borderRadius: Radius.md,
    backgroundColor: Colors.secondaryContainer,
  },
  iconBlue: {
    padding: 8,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryFixed,
  },
  pillLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
  },
  bentoTitle: {
    fontFamily: Fonts.headline,
    fontSize: 20,
    color: Colors.onSurface,
  },
  bentoMeta: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  daysPill: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: Colors.tertiaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  daysPillText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onTertiary,
  },
  heroWrap: {
    marginBottom: 24,
    position: 'relative',
  },
  heroGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radius.xl,
    margin: -4,
  },
  heroBtn: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...Shadow.ambient,
  },
  heroGradient: {
    padding: 32,
    alignItems: 'center',
    gap: 16,
  },
  heroIconRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextBlock: {
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 20,
    color: Colors.onPrimary,
  },
  heroSub: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: 'rgba(253, 252, 255, 0.85)',
    marginTop: 4,
    textAlign: 'center',
  },
  progressSection: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: Radius.xl,
    padding: 24,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressH: {
    fontFamily: Fonts.headline,
    fontSize: 18,
    color: Colors.onSurface,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  progressCopy: {
    flex: 1,
    gap: 4,
  },
  progressLead: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    color: Colors.onSurface,
  },
  progressBody: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
  notifSection: {
    gap: 16,
    marginBottom: 24,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  notifH: {
    fontFamily: Fonts.headline,
    fontSize: 18,
    color: Colors.onSurface,
  },
  viewAll: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.primary,
  },
  notifCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(192, 199, 212, 0.1)',
  },
  notifIconWarn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(183, 19, 26, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIconPri: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 94, 164, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBody: {
    flex: 1,
  },
  notifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notifTitle: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  notifTime: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  notifDesc: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
    lineHeight: 18,
  },
});
