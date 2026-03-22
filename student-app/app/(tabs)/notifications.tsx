import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StudentHeader } from '../../components/StudentHeader';
import { Colors, Fonts, Radius } from '../../constants/theme';

export default function NotificationsScreen() {
  return (
    <View style={styles.root}>
      <StudentHeader showNotificationDot />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headRow}>
          <View>
            <Text style={styles.kicker}>Activity Feed</Text>
            <Text style={styles.title}>Notifications</Text>
          </View>
          <Pressable style={styles.markAll}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </Pressable>
        </View>

        <View style={styles.featuredWrap}>
          <View style={styles.featuredInner}>
            <View style={styles.featuredAccent} />
            <View style={styles.featuredContent}>
              <View style={styles.warnIcon}>
                <MaterialIcons name="warning" size={28} color={Colors.tertiary} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.featuredTop}>
                  <Text style={styles.featuredH}>Membership Expiry</Text>
                  <Text style={styles.urgent}>Urgent</Text>
                </View>
                <Text style={styles.featuredBody}>
                  Your membership expires in 3 days. Renew now to avoid any disruption in library
                  access.
                </Text>
                <Pressable style={styles.renewRow}>
                  <Text style={styles.renew}>Renew Membership</Text>
                  <MaterialIcons name="arrow-forward" size={16} color={Colors.tertiary} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionLabelRow}>
          <View style={styles.hair} />
          <Text style={styles.sectionLabel}>Recent Updates</Text>
          <View style={styles.hair} />
        </View>

        <View style={styles.list}>
          <NotifRow
            icon="check-circle"
            iconBg={Colors.secondaryContainer}
            iconColor={Colors.onSecondaryContainer}
            title="Check-in successful"
            subtitle="Verified at 09:15 AM • Central Hub"
            dot
          />
          <NotifRow
            icon="info"
            iconBg={Colors.surfaceContainer}
            iconColor={Colors.onSurfaceVariant}
            title="Holiday Hours Notice"
            subtitle="Library will be closed this Sunday for maintenance."
          />
          <NotifRow
            icon="menu-book"
            iconBg={Colors.primaryFixed}
            iconColor={Colors.primary}
            title="Reservation Ready"
            subtitle="'Digital Curator' is available for pickup at Desk 4."
          />
          <NotifRow
            icon="error-outline"
            iconBg="rgba(219, 50, 47, 0.2)"
            iconColor={Colors.tertiary}
            title="Item Overdue"
            subtitle="'Modern Architecture' was due yesterday."
          />
        </View>

        <View style={styles.emptyState}>
          <MaterialIcons name="inventory-2" size={48} color={Colors.outlineVariant} />
          <Text style={styles.emptyTitle}>No more notifications</Text>
          <Text style={styles.emptySub}>Stay tuned for future updates</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function NotifRow({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  dot,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  dot?: boolean;
}) {
  return (
    <View style={styles.rowCard}>
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <MaterialIcons
          name={icon}
          size={26}
          color={iconColor}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub}>{subtitle}</Text>
      </View>
      {dot ? <View style={styles.blueDot} /> : null}
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
  headRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  kicker: {
    fontFamily: Fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
    fontWeight: '700',
  },
  title: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 30,
    letterSpacing: -0.5,
    color: Colors.onSurface,
    marginTop: 4,
  },
  markAll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(211, 228, 255, 0.45)',
  },
  markAllText: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  featuredWrap: {
    borderRadius: 24,
    padding: 4,
    backgroundColor: 'rgba(219, 50, 47, 0.08)',
    marginBottom: 28,
  },
  featuredInner: {
    position: 'relative',
  },
  featuredAccent: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 16,
    width: 4,
    backgroundColor: Colors.tertiary,
    borderRadius: 4,
  },
  featuredContent: {
    flexDirection: 'row',
    gap: 16,
    padding: 24,
    paddingLeft: 20,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 20,
  },
  warnIcon: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(183, 19, 26, 0.12)',
  },
  featuredTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  featuredH: {
    fontFamily: Fonts.headline,
    fontSize: 18,
    color: Colors.onSurface,
  },
  urgent: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  featuredBody: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
    marginTop: 8,
  },
  renewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  renew: {
    fontFamily: Fonts.bodySemi,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.tertiary,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  hair: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  sectionLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
    fontWeight: '700',
  },
  list: {
    gap: 16,
    marginBottom: 24,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 20,
  },
  rowIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  rowSub: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryContainer,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 24,
    gap: 8,
  },
  emptyTitle: {
    fontFamily: Fonts.headline,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  emptySub: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.outline,
  },
});
