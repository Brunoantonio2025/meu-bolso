import { useState, useEffect } from 'react';
import { TrendingDown, Wallet, DollarSign } from 'lucide-react';
import { gastosService } from '../services/gastos.service';

interface ResumoFinanceiroProps {
  usuarioId: string;
  mes: number;
  ano: number;
  gastos: any[];
  saldoInicial: number | null;
}

export function ResumoFinanceiro({ usuarioId, mes, ano, gastos, saldoInicial }: ResumoFinanceiroProps) {
  const [resumo, setResumo] = useState({
    saldo_inicial: 0,
    total_gastos: 0,
    saldo_atual: 0,
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const calcularResumo = async () => {
      try {
        setCarregando(true);

        const totalGastos = gastos.reduce((acc, gasto) => {
          return acc + Number(gasto.valor || 0);
        }, 0);

        let saldoBase = saldoInicial ?? 0;

        if (saldoInicial === null) {
          const saldoData = await gastosService.obterSaldo(usuarioId);
          saldoBase = saldoData?.valor_inicial || 0;
        }

        setResumo({
          saldo_inicial: saldoBase,
          total_gastos: totalGastos,
          saldo_atual: saldoBase - totalGastos,
        });
      } catch (error) {
        console.error('Erro ao carregar resumo:', error);
      } finally {
        setCarregando(false);
      }
    };

    calcularResumo();
  }, [usuarioId, gastos, saldoInicial]);

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const obterNomeMes = (mes: number) => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes - 1];
  };

  if (carregando) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-50">
          Resumo de {obterNomeMes(mes)} {ano}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-sm font-medium opacity-90 mb-1">Total de Gastos</h3>
          <p className="text-3xl font-bold">
            {formatarValor(resumo.total_gastos)}
          </p>
        </div>

        <div
          className={`bg-gradient-to-br rounded-2xl shadow-lg p-6 text-white ${resumo.saldo_atual >= 0
              ? 'from-green-500 to-green-600'
              : 'from-orange-500 to-orange-600'
            }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-sm font-medium opacity-90 mb-1">Saldo Atual</h3>
          <p className="text-3xl font-bold">
            {formatarValor(resumo.saldo_atual)}
          </p>
        </div>
      </div>

      {resumo.total_gastos > 0 && resumo.saldo_inicial > 0 && (
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Percentual Gasto
              </h3>
              <p className="text-sm text-gray-600">
                Do seu saldo inicial
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-red-600">
                {Math.round((resumo.total_gastos / resumo.saldo_inicial) * 100)}%
              </p>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (resumo.total_gastos / resumo.saldo_inicial) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
