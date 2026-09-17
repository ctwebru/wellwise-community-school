import { useAuth } from '@/contexts/AuthContext';
import AuthScreen from '@/pages/AuthScreen';
import DiaitaApp from '@/pages/DiaitaApp';

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <DiaitaApp />;
};

export default Index;
