/**
 * LibTrack "Digital Curator" tokens — aligned with stitch_login/libtrack_systematic/DESIGN.md
 */
export const Colors = {
  surface: '#f9f9f9',
  background: '#f9f9f9',
  surfaceContainerLow: '#f3f3f3',
  surfaceContainer: '#eeeeee',
  surfaceContainerHigh: '#e8e8e8',
  surfaceContainerHighest: '#e2e2e2',
  surfaceContainerLowest: '#ffffff',
  primary: '#005ea4',
  primaryContainer: '#0077ce',
  onPrimary: '#ffffff',
  onSurface: '#1a1c1c',
  /** Dark canvas (e.g. camera underlay) — matches design token on-background */
  onBackground: '#1a1c1c',
  onSurfaceVariant: '#404752',
  onPrimaryContainer: '#fdfcff',
  outline: '#707783',
  outlineVariant: '#c0c7d4',
  secondary: '#006e1c',
  secondaryContainer: '#98f994',
  onSecondaryContainer: '#0c7521',
  tertiary: '#b7131a',
  tertiaryContainer: '#db322f',
  onTertiary: '#ffffff',
  primaryFixed: '#d3e4ff',
  primaryFixedDim: '#a2c9ff',
  /** Student UI header / tab accent (stitch student screens) */
  brandBlue: '#1E88E5',
  tabActiveBg: '#dbeafe',
  ambientShadow: 'rgba(26, 28, 28, 0.06)',
} as const;

export const Radius = {
  md: 12,
  lg: 12,
  xl: 24,
  full: 9999,
} as const;

export const Shadow = {
  ambient: {
    shadowColor: '#1a1c1c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  tabBar: {
    shadowColor: '#1a1c1c',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;

export const Fonts = {
  headline: 'Manrope_700Bold',
  headlineExtra: 'Manrope_800ExtraBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;
