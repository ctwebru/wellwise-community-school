import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthScreen from '@/pages/AuthScreen';
import PostsFeed from '@/pages/PostsFeed';
import SchoolScreen from '@/pages/SchoolScreen';
import FavoritesScreen from '@/pages/FavoritesScreen';
import ProfileScreen from '@/pages/ProfileScreen';
import AdminScreen from '@/pages/AdminScreen';
import TabBar from '@/components/TabBar';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsFeed />;
      case 'school':
        return <SchoolScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'admin':
        return user?.role === 'admin' ? <AdminScreen /> : <PostsFeed />;
      default:
        return <PostsFeed />;
    }
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-background">
      {renderScreen()}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
