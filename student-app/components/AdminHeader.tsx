import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Fonts } from '../constants/theme';

const AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC2F6PaCO4exGDgBjtk74gmG72r1NpH3G2QmOan9FtT9sQY383CjZrJwlMnfsPQlujF4bg4t72nYP7Ki1w0IgS3WDfrWDK2kNtc3I6hn59_1NegA5pwvOr55R6__zn9oBtaaYucvE6JFCWx9YLU1BvvY5KIyskNilIi9oQ7oxi6u0ErsUeDcKML8fSZ9YbzdMPQtB5cDvoSEhqqeMfB4HDWcsfRl0gxg4xvStKM6w37QLXjYK0vy9MDsRDxEkDpLC9a2wn4Vu05jo8';

type Props = {
  subtitle?: string;
};

export function AdminHeader({ subtitle = 'Library Manager' }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.shell, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <View style={styles.left}>
          <MaterialIcons name="menu" size={26} color={Colors.brandBlue} />
          <Text style={styles.brand}>LibTrack</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.meta}>
            <Text style={styles.metaName}>Admin</Text>
            <Text style={styles.metaSub}>{subtitle}</Text>
          </View>
          <Image source={{ uri: AVATAR }} style={styles.avatar} />
        </View>
      </View>
    </View>
  );
}

export function AdminHeaderSimple() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.shell, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <View style={styles.left}>
          <MaterialIcons name="menu" size={26} color={Colors.brandBlue} />
          <Text style={styles.brand}>LibTrack</Text>
        </View>
        <Image source={{ uri: AVATAR }} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'rgba(248, 250, 252, 0.92)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(192, 199, 212, 0.15)',
    zIndex: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brand: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 22,
    color: Colors.brandBlue,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  meta: {
    alignItems: 'flex-end',
  },
  metaName: {
    fontFamily: Fonts.bodySemi,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  metaSub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
