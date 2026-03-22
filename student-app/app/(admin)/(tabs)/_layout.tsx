import { Tabs } from 'expo-router';
import React from 'react';
import { AdminDockTabBar } from '../../../components/AdminDockTabBar';

export default function AdminTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <AdminDockTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="students" options={{ title: 'Students' }} />
      <Tabs.Screen name="attendance" options={{ title: 'Attendance' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
