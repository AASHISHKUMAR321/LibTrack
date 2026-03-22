import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Fonts } from '../constants/theme';

type Props = {
  onPressNotifications?: () => void;
  showNotificationDot?: boolean;
};

export function StudentHeader({ onPressNotifications, showNotificationDot }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.shell, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <View style={styles.left}>
          <MaterialIcons name="account-circle" size={28} color={Colors.brandBlue} />
          <Text style={styles.brand}>LibTrack</Text>
        </View>
        <Pressable onPress={onPressNotifications} style={styles.notifBtn} hitSlop={12}>
          <MaterialIcons name="notifications-none" size={26} color={Colors.onSurfaceVariant} />
          {showNotificationDot ? <View style={styles.dot} /> : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'rgba(249, 249, 249, 0.92)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(192, 199, 212, 0.15)',
    zIndex: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 24,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brand: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 18,
    letterSpacing: -0.5,
    color: Colors.brandBlue,
  },
  notifBtn: {
    padding: 8,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.tertiary,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
});
