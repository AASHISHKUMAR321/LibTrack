import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Fonts, Shadow } from '../constants/theme';

const TAB_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  index: 'dashboard',
  students: 'group',
  attendance: 'event-available',
  profile: 'account-circle',
};

const TAB_LABELS: Record<string, string> = {
  index: 'Dashboard',
  students: 'Students',
  attendance: 'Attendance',
  profile: 'Profile',
};

/** Floating dock — matches stitch_login/dashboard bottom nav */
export function AdminDockTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.outer,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.floatWrap}>
        <BlurView
          intensity={Platform.OS === 'ios' ? 45 : 28}
          tint="light"
          style={styles.blur}
        >
          <View style={styles.inner}>
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;
              const label =
                (descriptors[route.key].options.title as string) ||
                TAB_LABELS[route.name] ||
                route.name;
              const iconName = TAB_ICONS[route.name] ?? 'circle';

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              return (
                <Pressable
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  onPress={onPress}
                  style={[styles.tab, isFocused && styles.tabActive]}
                >
                  <MaterialIcons
                    name={iconName}
                    size={24}
                    color={isFocused ? Colors.brandBlue : '#94a3b8'}
                  />
                  <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  floatWrap: {
    width: '90%',
    maxWidth: 420,
    minHeight: 72,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    marginBottom: 8,
    ...Shadow.ambient,
  },
  blur: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    minHeight: 72,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 72,
  },
  tabActive: {
    backgroundColor: Colors.tabActiveBg,
  },
  tabLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#94a3b8',
  },
  tabLabelActive: {
    color: Colors.brandBlue,
  },
});
