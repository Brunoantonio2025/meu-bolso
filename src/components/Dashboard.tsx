import { useState, useEffect } from 'react';
import { LogOut, Plus, Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { gastosService } from '../services/gastos.service';
import { ResumoFinanceiro } from './ResumoFinanceiro';
import { ListaGastos } from './ListaGastos';
import { FormularioGasto } from './FormularioGasto';
import { ModalSaldo } from './ModalSaldo';
import { Footer } from './Footer';

export function Dashboard() {
  const { usuario, sair } = useAuth();
  const [gastos, setGastos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModalSaldo, setMostrarModalSaldo] = useState(false);
  const [saldoAtual, setSaldoAtual] = useState<number | null>(null);
  const [gastoEditando, setGastoEditando] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [mesAtual] = useState(new Date().getMonth() + 1);
  const [anoAtual] = useState(new Date().getFullYear());

  useEffect(() => {
    if (usuario) {
      carregarDados();
    }
  }, [usuario]);

  const carregarDados = async () => {
    if (!usuario) return;

    try {
      setCarregando(true);
      const [gastosData, categoriasData, saldoData] = await Promise.all([
        gastosService.listarGastos(usuario.id),
        gastosService.listarCategorias(usuario.id),
        gastosService.obterSaldo(usuario.id),
      ]);

      if (categoriasData.length === 0) {
        await gastosService.criarCategoriasIniciais(usuario.id);
        const novasCategorias = await gastosService.listarCategorias(usuario.id);
        setCategorias(novasCategorias);
      } else {
        setCategorias(categoriasData);
      }

      setGastos(gastosData);
      setSaldoAtual(saldoData?.valor_inicial ?? null);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleAdicionarGasto = async (gasto: any) => {
    if (!usuario) return;

    try {
      const novoGasto = await gastosService.adicionarGasto(gasto, usuario.id);
      setGastos([novoGasto, ...gastos]);
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
      alert('Erro ao adicionar gasto. Tente novamente.');
    }
  };

  const handleAtualizarGasto = async (id: string, gasto: any) => {
    try {
      const gastoAtualizado = await gastosService.atualizarGasto(id, gasto);
      setGastos(gastos.map(g => (g.id === id ? gastoAtualizado : g)));
      setGastoEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Erro ao atualizar gasto:', error);
      alert('Erro ao atualizar gasto. Tente novamente.');
    }
  };

  const handleDeletarGasto = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este gasto?')) return;

    try {
      await gastosService.deletarGasto(id);
      setGastos(gastos.filter(g => g.id !== id));
    } catch (error) {
      console.error('Erro ao deletar gasto:', error);
      alert('Erro ao deletar gasto. Tente novamente.');
    }
  };

  const handleEditarGasto = (gasto: any) => {
    setGastoEditando(gasto);
    setMostrarFormulario(true);
  };

  const handleFecharFormulario = () => {
    setMostrarFormulario(false);
    setGastoEditando(null);
  };

  const handleSalvarSaldo = async (valor: number) => {
    if (!usuario) return;
    try {
      const novoSaldo = (saldoAtual ?? 0) + valor;
      await gastosService.atualizarSaldo(usuario.id, novoSaldo);
      setSaldoAtual(novoSaldo);
    } catch (error) {
      console.error('Erro ao salvar saldo:', error);
      throw error;
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-xl text-slate-300">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/60">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-50 leading-tight">
                MeuBolso
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Visão geral do seu mês e dos seus gastos em tempo real.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMostrarModalSaldo(true)}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 rounded-lg transition-colors font-medium text-xs sm:text-sm"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">
                {saldoAtual !== null ? 'Editar saldo' : 'Definir saldo'}
              </span>
            </button>
            <button
              onClick={() => sair()}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-slate-200 hover:text-slate-50 hover:bg-slate-800/80 border border-slate-700 rounded-lg transition-colors text-xs sm:text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <ResumoFinanceiro
          usuarioId={usuario!.id}
          mes={mesAtual}
          ano={anoAtual}
          gastos={gastos}
          saldoInicial={saldoAtual}
        />

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-semibold text-slate-50">Meus gastos</h2>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-lg hover:bg-emerald-400 transition-colors font-semibold text-sm shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Gasto</span>
          </button>
        </div>

        <ListaGastos
          gastos={gastos}
          onEditar={handleEditarGasto}
          onDeletar={handleDeletarGasto}
        />
      </main>

      {mostrarFormulario && (
        <FormularioGasto
          categorias={categorias}
          gastoEditando={gastoEditando}
          onSalvar={
            gastoEditando
              ? (gasto) => handleAtualizarGasto(gastoEditando.id, gasto)
              : handleAdicionarGasto
          }
          onFechar={handleFecharFormulario}
        />
      )}

      {mostrarModalSaldo && (
        <ModalSaldo
          saldoAtual={saldoAtual}
          onSalvar={handleSalvarSaldo}
          onFechar={() => setMostrarModalSaldo(false)}
        />
      )}

      <Footer />
    </div>
  );
}
