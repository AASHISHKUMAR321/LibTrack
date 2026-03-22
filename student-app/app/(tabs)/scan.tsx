import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Fonts, Radius, Shadow } from '../../constants/theme';

export default function ScanScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const onBarcodeScanned = useCallback(() => {
    setSuccessVisible(true);
  }, []);

  const openPermission = () => {
    void requestPermission();
  };

  if (!permission?.granted) {
    return (
      <View style={[styles.permissionRoot, { paddingTop: insets.top }]}>
        <View style={styles.permissionHeader}>
          <Pressable style={styles.headerBtn} onPress={() => router.navigate('/(tabs)')}>
            <MaterialIcons name="arrow-back" size={26} color={Colors.brandBlue} />
          </Pressable>
          <Text style={styles.brand}>LibTrack</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.permissionBody}>
          <MaterialIcons name="qr-code-scanner" size={64} color={Colors.primary} />
          <Text style={styles.permissionTitle}>Camera access</Text>
          <Text style={styles.permissionDesc}>
            Allow camera access to scan library QR codes for check-in and check-out.
          </Text>
          <Pressable style={styles.permissionCta} onPress={openPermission}>
            <Text style={styles.permissionCtaText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={flash}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={successVisible ? undefined : onBarcodeScanned}
      />
      <View style={[styles.dim, { paddingTop: insets.top }]} pointerEvents="box-none">
        <View style={styles.scanHeader}>
          <Pressable style={styles.headerBtn} onPress={() => router.navigate('/(tabs)')}>
            <MaterialIcons name="arrow-back" size={26} color={Colors.brandBlue} />
          </Pressable>
          <Text style={[styles.brand, { color: Colors.brandBlue }]}>LibTrack</Text>
          <Pressable style={styles.headerBtn} onPress={() => setFlash((f) => !f)}>
            <MaterialIcons
              name={flash ? 'flash-on' : 'flash-off'}
              size={26}
              color={Colors.brandBlue}
            />
          </Pressable>
        </View>

        <View style={styles.centerOverlay}>
          <View style={styles.frameOuter}>
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />
            <LinearGradient
              colors={['transparent', 'rgba(0, 119, 206, 0.9)', 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.scanLine}
            />
          </View>
          <Text style={styles.instruction}>
            Align the library QR code within the frame to check in/out
          </Text>
          <Text style={styles.auto}>Auto-detection active</Text>
        </View>

        <View style={[styles.bottomControls, { paddingBottom: 100 + insets.bottom }]}>
          <Pressable style={styles.roundBtn} onPress={() => router.navigate('/(tabs)')}>
            <MaterialIcons name="close" size={28} color={Colors.onPrimary} />
            <Text style={styles.roundLabel}>Cancel</Text>
          </Pressable>
          <View style={styles.scanFabWrap}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              style={styles.scanFabRing}
            >
              <View style={styles.scanFabInner}>
                <MaterialIcons name="qr-code-scanner" size={36} color={Colors.onPrimary} />
              </View>
            </LinearGradient>
            <Text style={styles.scanFabCap}>Scanning...</Text>
          </View>
          <Pressable style={styles.roundBtn} onPress={() => router.push('/(tabs)/profile')}>
            <MaterialIcons name="history" size={28} color={Colors.onPrimary} />
            <Text style={styles.roundLabel}>Log</Text>
          </Pressable>
        </View>

        <View style={[styles.infoCard, { bottom: 24 + insets.bottom }]}>
          <View style={styles.infoIcon}>
            <MaterialIcons name="info" size={22} color={Colors.primaryFixedDim} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Quick Check-in</Text>
            <Text style={styles.infoBody}>
              Present your unique library ID code found at the entry kiosk.
            </Text>
          </View>
        </View>
      </View>

      <Modal visible={successVisible} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setSuccessVisible(false)}>
          <View style={styles.modalCard}>
            <View style={styles.modalIcon}>
              <MaterialIcons name="check-circle" size={48} color={Colors.secondary} />
            </View>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalBody}>Check-in recorded. Have a productive session.</Text>
            <Pressable style={styles.modalBtn} onPress={() => setSuccessVisible(false)}>
              <Text style={styles.modalBtnText}>Done</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}


const FRAME = 256;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.onBackground,
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  scanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: 'rgba(249, 249, 249, 0.88)',
  },
  headerBtn: {
    padding: 8,
    borderRadius: 999,
  },
  brand: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 18,
    letterSpacing: -0.5,
    color: Colors.brandBlue,
  },
  centerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  frameOuter: {
    width: FRAME,
    height: FRAME,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'rgba(0, 119, 206, 0.35)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 40,
        shadowOffset: { width: 0, height: 0 },
      },
      android: { elevation: 0 },
    }),
  },
  corner: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderColor: Colors.primaryContainer,
  },
  tl: {
    top: -4,
    left: -4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  tr: {
    top: -4,
    right: -4,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  bl: {
    bottom: -4,
    left: -4,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  br: {
    bottom: -4,
    right: -4,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  scanLine: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: '50%',
    height: 2,
    marginTop: -1,
    opacity: 0.9,
  },
  instruction: {
    fontFamily: Fonts.headline,
    fontSize: 18,
    color: Colors.onPrimaryContainer,
    textAlign: 'center',
    marginTop: 40,
    lineHeight: 24,
    maxWidth: 320,
  },
  auto: {
    marginTop: 12,
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.primaryFixedDim,
    opacity: 0.85,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
  },
  roundBtn: {
    alignItems: 'center',
    gap: 8,
  },
  roundLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.onPrimary,
  },
  scanFabWrap: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  scanFabRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    padding: 4,
    ...Shadow.ambient,
  },
  scanFabInner: {
    flex: 1,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  scanFabCap: {
    fontFamily: Fonts.bodySemi,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  infoCard: {
    position: 'absolute',
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(192, 199, 212, 0.15)',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(0, 119, 206, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontFamily: Fonts.headline,
    fontSize: 12,
    color: Colors.onPrimary,
    marginBottom: 4,
  },
  infoBody: {
    fontFamily: Fonts.body,
    fontSize: 10,
    lineHeight: 14,
    color: 'rgba(253, 252, 255, 0.75)',
  },
  permissionRoot: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  permissionBody: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  permissionTitle: {
    fontFamily: Fonts.headline,
    fontSize: 22,
    color: Colors.onSurface,
  },
  permissionDesc: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionCta: {
    marginTop: 16,
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: Radius.md,
  },
  permissionCtaText: {
    fontFamily: Fonts.headline,
    fontSize: 16,
    color: Colors.onPrimary,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(26, 28, 28, 0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 28,
    alignItems: 'center',
    ...Shadow.ambient,
  },
  modalIcon: {
    marginBottom: 12,
  },
  modalTitle: {
    fontFamily: Fonts.headlineExtra,
    fontSize: 22,
    color: Colors.onSurface,
  },
  modalBody: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  modalBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: Radius.md,
  },
  modalBtnText: {
    fontFamily: Fonts.headline,
    color: Colors.onPrimary,
    fontSize: 16,
  },
});
