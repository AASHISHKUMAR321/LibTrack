import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Fonts } from '../constants/theme';

type Props = {
  percent: number;
  size?: number;
  stroke?: number;
};

export function ProgressRing({ percent, size = 80, stroke = 8 }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: '-90deg' }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={Colors.surfaceContainerHighest}
          strokeWidth={stroke}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={Colors.primary}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={styles.pct}>{Math.round(percent)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pct: {
    position: 'absolute',
    fontFamily: Fonts.headline,
    fontSize: 14,
    color: Colors.onSurface,
  },
});
