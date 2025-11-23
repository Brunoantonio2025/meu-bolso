import { useState, useEffect } from 'react';
import { Wallet, X } from 'lucide-react';

interface ModalSaldoProps {
    saldoAtual: number | null;
    onSalvar: (valor: number) => Promise<void>;
    onFechar: () => void;
}

export function ModalSaldo({ saldoAtual, onSalvar, onFechar }: ModalSaldoProps) {
    const [valor, setValor] = useState('');
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        // sempre que abrir o modal, começa com o campo vazio
        setValor('');
    }, [saldoAtual]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const valorNumerico = parseFloat(valor);
        if (isNaN(valorNumerico) || valorNumerico < 0) {
            alert('Por favor, insira um valor válido');
            return;
        }

        try {
            setSalvando(true);
            await onSalvar(valorNumerico);
            onFechar();
        } catch (error) {
            console.error('Erro ao salvar saldo:', error);
            alert('Erro ao salvar saldo. Tente novamente.');
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/40">
                            <Wallet className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-50">
                            {saldoAtual !== null ? 'Atualizar saldo' : 'Definir saldo inicial'}
                        </h2>
                    </div>
                    <button
                        onClick={onFechar}
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-200 mb-2">
                            Quanto você quer adicionar ao saldo?
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                R$
                            </span>
                            <input
                                type="number"
                                step="0.01"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-slate-700 rounded-lg bg-slate-950 text-slate-50 placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="0,00"
                                required
                                autoFocus
                            />
                        </div>
                        <p className="mt-2 text-sm text-slate-400">
                            Este valor será somado ao seu saldo atual. Você poderá adicionar mais depois.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onFechar}
                            className="flex-1 px-4 py-3 border border-slate-700 text-slate-200 rounded-lg hover:bg-slate-800 transition-colors font-semibold"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={salvando}
                            className="flex-1 px-4 py-3 bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                        >
                            {salvando ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
