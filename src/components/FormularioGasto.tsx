import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Categoria {
  id: string;
  nome: string;
  icone: string;
  cor: string;
}

interface FormularioGastoProps {
  categorias: Categoria[];
  gastoEditando?: any;
  onSalvar: (gasto: any) => void;
  onFechar: () => void;
}

export function FormularioGasto({
  categorias,
  gastoEditando,
  onSalvar,
  onFechar,
}: FormularioGastoProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  useEffect(() => {
    if (gastoEditando) {
      setDescricao(gastoEditando.descricao);
      setValor(gastoEditando.valor.toString());
      setData(gastoEditando.data);
      setCategoriaId(gastoEditando.categoria_id || '');
    } else {
      // Limpar todos os campos quando não está editando
      setDescricao('');
      setValor('');
      setCategoriaId('');
      const hoje = new Date().toISOString().split('T')[0];
      setData(hoje);
    }
  }, [gastoEditando]);

  const categoriasUnicas = categorias.filter((categoria, index, self) =>
    index === self.findIndex((c) => c.nome === categoria.nome)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const gasto = {
      descricao,
      valor: parseFloat(valor),
      data,
      categoria_id: categoriaId || null,
    };

    onSalvar(gasto);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {gastoEditando ? 'Editar Gasto' : 'Adicionar Gasto'}
          </h2>
          <button
            onClick={onFechar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              placeholder="Ex: Almoço no restaurante"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor (R$)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data
            </label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="">Selecione uma categoria</option>
              {categoriasUnicas.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          {categoriaId && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              {(() => {
                const categoriaSelecionada = categorias.find(
                  (c) => c.id === categoriaId
                );
                if (!categoriaSelecionada) return null;

                const Icone = obterIcone(categoriaSelecionada.icone);

                return (
                  <>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${categoriaSelecionada.cor}20`,
                      }}
                    >
                      <Icone
                        className="w-5 h-5"
                        style={{ color: categoriaSelecionada.cor }}
                      />
                    </div>
                    <span className="font-medium text-gray-700">
                      {categoriaSelecionada.nome}
                    </span>
                  </>
                );
              })()}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {gastoEditando ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
