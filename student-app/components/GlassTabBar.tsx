import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Fonts, Shadow } from '../constants/theme';

const TAB_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  index: 'dashboard',
  scan: 'qr-code-scanner',
  notifications: 'notifications',
  profile: 'person',
};

const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  scan: 'Scan',
  notifications: 'Alerts',
  profile: 'Profile',
};

export function GlassTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      <BlurView
        intensity={Platform.OS === 'ios' ? 50 : 32}
        tint="light"
        style={styles.blur}
      >
        <View style={styles.inner}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];
            const label =
              (options.title as string) || TAB_LABELS[route.name] || route.name;
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
                  color={isFocused ? Colors.brandBlue : Colors.onSurfaceVariant}
                />
                <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(249, 249, 249, 0.82)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    ...Shadow.tabBar,
  },
  blur: {
    backgroundColor: 'rgba(249, 249, 249, 0.75)',
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    color: Colors.onSurfaceVariant,
  },
  tabLabelActive: {
    color: Colors.brandBlue,
  },
});
