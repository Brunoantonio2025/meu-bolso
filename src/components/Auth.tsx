import { useState } from 'react';
import { LogIn, Wallet, TrendingDown, TrendingUp, PieChart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Footer } from './Footer';

export function Auth() {
  const [modoLogin, setModoLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { entrar, cadastrar } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      if (modoLogin) {
        await entrar(email, senha);
      } else {
        await cadastrar(email, senha);
      }
    } catch (error: any) {
      setErro(
        error.message === 'Invalid login credentials'
          ? 'Email ou senha incorretos'
          : 'Erro ao processar. Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-5xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="relative grid gap-0 md:grid-cols-2">
          {/* Lado esquerdo - branding MeuBolso */}
          <div className="hidden md:flex flex-col justify-between p-10 text-slate-50 bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-transparent border-r border-slate-800/60">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/60 px-4 py-2 border border-emerald-500/40 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                  <Wallet className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-sm leading-tight">
                  <p className="font-semibold text-emerald-300">MeuBolso</p>
                  <p className="text-slate-300/80">Seu painel de controle financeiro</p>
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tight mb-3">
                Organize seu dinheiro com clareza e simplicidade.
              </h1>
              <p className="text-slate-300/90 text-sm leading-relaxed mb-8 max-w-md">
                Acompanhe seus gastos, veja o impacto em tempo real no seu saldo
                e mantenha o controle do seu bolso em poucos cliques.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/40">
                    <TrendingDown className="h-4 w-4 text-emerald-300" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">Resumo em tempo real</p>
                    <p className="text-slate-300/80">Cada gasto atualiza imediatamente seu saldo.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/15 border border-sky-500/40">
                    <PieChart className="h-4 w-4 text-sky-300" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">Categorias inteligentes</p>
                    <p className="text-slate-300/80">Alimentação, Carro, Transporte e muito mais.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/15 border border-amber-500/40">
                    <TrendingUp className="h-4 w-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">Visão do mês</p>
                    <p className="text-slate-300/80">Veja quanto já foi gasto e quanto ainda resta.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-xs text-slate-400">
              <p>Seu dinheiro, seus dados. MeuBolso cuida do resto.</p>
            </div>
          </div>

          {/* Lado direito - formulário */}
          <div className="flex flex-col justify-center p-8 sm:p-10 bg-slate-950/60 backdrop-blur">
            <div className="mb-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs text-slate-300 mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                MeuBolso • Acesso seguro ao painel
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-slate-50 mb-1">
                {modoLogin ? 'Bem-vindo de volta' : 'Crie sua conta no MeuBolso'}
              </h2>
              <p className="text-sm text-slate-400">
                {modoLogin
                  ? 'Entre com seu e-mail para acessar seu painel financeiro.'
                  : 'Leva menos de um minuto para começar a organizar seu dinheiro.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {erro && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {erro}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950/60 text-slate-50 placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="voce@exemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950/60 text-slate-50 placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-emerald-500 text-slate-950 py-3 rounded-xl font-semibold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
              >
                {carregando ? (
                  'Processando...'
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    {modoLogin ? 'Entrar' : 'Cadastrar'}
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center md:text-left text-sm">
              <span className="text-slate-400 mr-1">
                {modoLogin ? 'Ainda não tem conta?' : 'Já usa o MeuBolso?'}
              </span>
              <button
                onClick={() => {
                  setModoLogin(!modoLogin);
                  setErro('');
                }}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                {modoLogin ? 'Criar conta gratuitamente' : 'Fazer login'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
