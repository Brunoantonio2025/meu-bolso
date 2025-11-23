import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/auth.service';

interface Usuario {
  id: string;
  email?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  cadastrar: (email: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    authService.obterUsuario().then(user => {
      if (user) {
        setUsuario({ id: user.uid, email: user.email || undefined });
      } else {
        setUsuario(null);
      }
      setCarregando(false);
    }).catch(() => {
      setCarregando(false);
    });

    const unsubscribe = authService.onAuthStateChange((user) => {
      if (user) {
        setUsuario({ id: user.uid, email: user.email || undefined });
      } else {
        setUsuario(null);
      }
    });

    return unsubscribe;
  }, []);

  const entrar = async (email: string, senha: string) => {
    await authService.entrar(email, senha);
  };

  const cadastrar = async (email: string, senha: string) => {
    await authService.cadastrar(email, senha);
  };

  const sair = async () => {
    await authService.sair();
  };

  const value = {
    usuario,
    carregando,
    entrar,
    cadastrar,
    sair,
  };

  return (
    <AuthContext.Provider value={value}>
      {!carregando && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
