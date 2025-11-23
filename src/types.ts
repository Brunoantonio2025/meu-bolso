export interface Categoria {
    id: string;
    nome: string;
    icone: string;
    cor: string;
    usuario_id: string;
    criado_em: string;
}

export interface Gasto {
    id: string;
    descricao: string;
    valor: number;
    data: string;
    categoria_id: string | null;
    usuario_id: string;
    criado_em: string;
    atualizado_em: string;
    categorias?: Categoria | null;
}

export interface Saldo {
    id: string;
    usuario_id: string;
    valor_inicial: number;
    criado_em: string;
    atualizado_em: string;
}

export type GastoInsert = Omit<Gasto, 'id' | 'criado_em' | 'atualizado_em' | 'categorias'>;
export type GastoUpdate = Partial<GastoInsert>;
export type CategoriaInsert = Omit<Categoria, 'id' | 'criado_em'>;
export type SaldoInsert = Omit<Saldo, 'id' | 'criado_em' | 'atualizado_em'>;
