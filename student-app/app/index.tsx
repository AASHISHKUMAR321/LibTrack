import { Redirect } from 'expo-router';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { isSignedIn, role } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }
  if (role === 'admin') {
    return <Redirect href="/(admin)" />;
  }
  return <Redirect href="/(tabs)" />;
}
