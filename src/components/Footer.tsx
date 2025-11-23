import { Code2, Heart } from 'lucide-react';

export function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-8 sm:pb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Logo e Nome */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800">
                            <Code2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-semibold text-slate-200">
                                Nexus Desenvolvimentos
                            </span>
                        </div>
                    </div>

                    {/* Copyright e Créditos */}
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>© {anoAtual}</span>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                            <span>Feito com</span>
                            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                            <span>para você</span>
                        </div>
                    </div>
                </div>

                {/* Linha decorativa */}
                <div className="mt-4 pt-4 border-t border-slate-800/50">
                    <p className="text-xs text-center text-slate-500">
                        MeuBolso - Seu painel de controle financeiro
                    </p>
                </div>
            </div>
        </footer>
    );
}
