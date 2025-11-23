import { Pencil, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Gasto {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: 'despesa' | 'receita';
  categorias: {
    nome: string;
    icone: string;
    cor: string;
  } | null;
}

interface ListaGastosProps {
  gastos: Gasto[];
  onEditar: (gasto: Gasto) => void;
  onDeletar: (id: string) => void;
}

export function ListaGastos({ gastos, onEditar, onDeletar }: ListaGastosProps) {
  const formatarData = (data: string) => {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const obterIcone = (nomeIcone: string) => {
    const IconeComponente = (Icons as any)[
      nomeIcone.split('-').map((p: string, i: number) =>
        i === 0 ? p.charAt(0).toUpperCase() + p.slice(1) :
          p.charAt(0).toUpperCase() + p.slice(1)
      ).join('')
    ];
    return IconeComponente || Icons.Tag;
  };

  if (gastos.length === 0) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center mt-6">
        <p className="text-slate-400 text-lg">
          Nenhum gasto registrado ainda.
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Clique em "Adicionar Gasto" para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {gastos.map((gasto) => {
        const Icone = gasto.categorias ? obterIcone(gasto.categorias.icone) : Icons.Tag;

        return (
          <div
            key={gasto.id}
            className="bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-all p-3 sm:p-4"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Ícone da categoria */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: gasto.categorias?.cor
                    ? `${gasto.categorias.cor}20`
                    : '#6b728020',
                }}
              >
                <Icone
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{
                    color: gasto.categorias?.cor || '#6b7280',
                  }}
                />
              </div>

              {/* Conteúdo principal */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-slate-50 text-sm sm:text-base truncate">
                    {gasto.descricao}
                  </h3>
                  <p
                    className={`text-base sm:text-xl font-bold whitespace-nowrap ${gasto.tipo === 'receita' ? 'text-emerald-300' : 'text-red-300'
                      }`}
                  >
                    {gasto.tipo === 'receita' ? '+' : '-'} {formatarValor(gasto.valor)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="text-slate-300">
                    {gasto.categorias?.nome || 'Sem categoria'}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">
                    {formatarData(gasto.data)}
                  </span>
                </div>

                {/* Botões de ação em mobile */}
                <div className="flex items-center gap-2 mt-3 sm:hidden">
                  <button
                    onClick={() => onEditar(gasto)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-emerald-400 rounded-lg transition-colors text-xs font-medium"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => onDeletar(gasto.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-red-400 rounded-lg transition-colors text-xs font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>

              {/* Botões de ação em desktop */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => onEditar(gasto)}
                  className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDeletar(gasto.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
