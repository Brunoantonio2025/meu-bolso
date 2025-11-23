import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';

function App() {
  const { usuario } = useAuth();

  return usuario ? <Dashboard /> : <Auth />;
}

export default App;
