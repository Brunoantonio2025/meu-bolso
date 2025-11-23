import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Gasto, GastoInsert, GastoUpdate, Categoria, CategoriaInsert } from '../types';

const COLLECTION_GASTOS = 'gastos';
const COLLECTION_CATEGORIAS = 'categorias';

export const gastosService = {
  async listarGastos(usuarioId: string): Promise<Gasto[]> {
    // Buscar categorias primeiro para fazer o join
    const categorias = await this.listarCategorias(usuarioId);
    const categoriasMap = new Map(categorias.map(c => [c.id, c]));

    const q = query(
      collection(db, COLLECTION_GASTOS),
      where('usuario_id', '==', usuarioId),
      orderBy('data', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as Omit<Gasto, 'id' | 'categorias'>;
      return {
        ...data,
        id: doc.id,
        categorias: data.categoria_id ? categoriasMap.get(data.categoria_id) || null : null
      };
    });
  },

  async adicionarGasto(gasto: Omit<GastoInsert, 'usuario_id'>, usuarioId: string) {
    const novoGasto = {
      ...gasto,
      usuario_id: usuarioId,
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, COLLECTION_GASTOS), novoGasto);
    const docSnap = await getDoc(docRef);

    // Buscar categoria para retornar junto
    let categoria = null;
    if (gasto.categoria_id) {
      const catRef = doc(db, COLLECTION_CATEGORIAS, gasto.categoria_id);
      const catSnap = await getDoc(catRef);
      if (catSnap.exists()) {
        categoria = { id: catSnap.id, ...catSnap.data() } as Categoria;
      }
    }

    return {
      id: docRef.id,
      ...docSnap.data(),
      categorias: categoria
    } as Gasto;
  },

  async atualizarGasto(id: string, gasto: GastoUpdate) {
    const docRef = doc(db, COLLECTION_GASTOS, id);
    const atualizacao = {
      ...gasto,
      atualizado_em: new Date().toISOString()
    };

    await updateDoc(docRef, atualizacao);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as Omit<Gasto, 'id' | 'categorias'>;

    // Buscar categoria
    let categoria = null;
    if (data.categoria_id) {
      const catRef = doc(db, COLLECTION_CATEGORIAS, data.categoria_id);
      const catSnap = await getDoc(catRef);
      if (catSnap.exists()) {
        categoria = { id: catSnap.id, ...catSnap.data() } as Categoria;
      }
    }

    return {
      id: docSnap.id,
      ...data,
      categorias: categoria
    } as Gasto;
  },

  async deletarGasto(id: string) {
    await deleteDoc(doc(db, COLLECTION_GASTOS, id));
  },

  async listarCategorias(usuarioId: string): Promise<Categoria[]> {
    const q = query(
      collection(db, COLLECTION_CATEGORIAS),
      where('usuario_id', '==', usuarioId),
      orderBy('nome')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Categoria[];
  },

  async adicionarCategoria(categoria: Omit<CategoriaInsert, 'usuario_id'>, usuarioId: string) {
    const novaCategoria = {
      ...categoria,
      usuario_id: usuarioId,
      criado_em: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, COLLECTION_CATEGORIAS), novaCategoria);
    const docSnap = await getDoc(docRef);

    return {
      id: docRef.id,
      ...docSnap.data()
    } as Categoria;
  },

  async criarCategoriasIniciais(usuarioId: string) {
    const categoriasIniciais = [
      { nome: 'Alimentação', icone: 'utensils', cor: '#ef4444' },
      { nome: 'Transporte', icone: 'car', cor: '#3b82f6' },
      { nome: 'Carro', icone: 'car', cor: '#0ea5e9' },
      { nome: 'Moradia', icone: 'home', cor: '#8b5cf6' },
      { nome: 'Lazer', icone: 'gamepad-2', cor: '#ec4899' },
      { nome: 'Saúde', icone: 'heart-pulse', cor: '#10b981' },
      { nome: 'Educação', icone: 'graduation-cap', cor: '#f59e0b' },
      { nome: 'Outros', icone: 'tag', cor: '#6b7280' },
    ];

    const batch = writeBatch(db);

    categoriasIniciais.forEach(cat => {
      const docRef = doc(collection(db, COLLECTION_CATEGORIAS));
      batch.set(docRef, {
        ...cat,
        usuario_id: usuarioId,
        criado_em: new Date().toISOString()
      });
    });

    await batch.commit();
  },

  async obterResumo(usuarioId: string, mes?: number, ano?: number) {
    let q = query(
      collection(db, COLLECTION_GASTOS),
      where('usuario_id', '==', usuarioId)
    );

    if (mes !== undefined && ano !== undefined) {
      const dataInicio = new Date(ano, mes - 1, 1).toISOString().split('T')[0];
      const dataFim = new Date(ano, mes, 0).toISOString().split('T')[0];
      q = query(q, where('data', '>=', dataInicio), where('data', '<=', dataFim));
    }

    const querySnapshot = await getDocs(q);
    const gastos = querySnapshot.docs.map(doc => doc.data() as Gasto);

    const totalGastos = gastos.reduce((acc: number, gasto: Gasto) => {
      return acc + Number(gasto.valor);
    }, 0);

    // Buscar saldo inicial
    const saldoData = await this.obterSaldo(usuarioId);
    const saldoInicial = saldoData?.valor_inicial || 0;

    return {
      saldo_inicial: saldoInicial,
      total_gastos: totalGastos,
      saldo_atual: saldoInicial - totalGastos,
    };
  },

  async obterSaldo(usuarioId: string) {
    const q = query(
      collection(db, 'saldo'),
      where('usuario_id', '==', usuarioId)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as any;
  },

  async criarSaldoInicial(usuarioId: string, valorInicial: number) {
    const novoSaldo = {
      usuario_id: usuarioId,
      valor_inicial: valorInicial,
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'saldo'), novoSaldo);
    const docSnap = await getDoc(docRef);

    return {
      id: docRef.id,
      ...docSnap.data()
    };
  },

  async atualizarSaldo(usuarioId: string, valorInicial: number) {
    const saldoAtual = await this.obterSaldo(usuarioId);

    if (!saldoAtual) {
      return this.criarSaldoInicial(usuarioId, valorInicial);
    }

    const docRef = doc(db, 'saldo', saldoAtual.id);
    await updateDoc(docRef, {
      valor_inicial: valorInicial,
      atualizado_em: new Date().toISOString()
    });

    const docSnap = await getDoc(docRef);
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  },
};
