# 💰 MeuBolso - Controle Financeiro Pessoal

<div align="center">
  <img src="public/favicon.png" alt="MeuBolso Logo" width="120" height="120">
  
  ### Organize seu dinheiro com clareza e simplicidade
  
  [![GitHub](https://img.shields.io/badge/GitHub-MeuBolso-blue?logo=github)](https://github.com/Brunoantonio2025/meu-bolso)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
</div>

---

## 📋 Sobre o Projeto

**MeuBolso** é uma aplicação web moderna e intuitiva para gerenciamento de finanças pessoais. Desenvolvida com React, TypeScript e Firebase, oferece uma experiência completa para acompanhar seus gastos em tempo real.

### ✨ Principais Funcionalidades

- 💵 **Controle de Saldo**: Defina e atualize seu saldo inicial
- 📊 **Resumo Financeiro**: Visualize total de gastos e saldo atual em tempo real
- 🏷️ **Categorias Inteligentes**: Organize gastos por categorias (Alimentação, Transporte, Moradia, etc.)
- 📱 **100% Responsivo**: Interface otimizada para desktop e mobile
- 🔐 **Autenticação Segura**: Login e cadastro com Firebase Authentication
- 📈 **Percentual de Gastos**: Acompanhe quanto já gastou do seu saldo
- ⚡ **Tempo Real**: Dados sincronizados instantaneamente

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first

### Backend & Infraestrutura
- **Firebase Authentication** - Autenticação de usuários
- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **Lucide React** - Ícones modernos e customizáveis

---

## 🎨 Design

O MeuBolso possui um design moderno e elegante com:
- 🌙 **Tema Dark**: Interface escura para conforto visual
- 🎨 **Cores Vibrantes**: Gradientes e cores que destacam informações importantes
- ✨ **Animações Sutis**: Micro-interações para melhor UX
- 📐 **Layout Responsivo**: Adaptável a qualquer tamanho de tela

---

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ instalado
- Conta no Firebase

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/Brunoantonio2025/meu-bolso.git
cd meu-bolso
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Firebase**

Crie um arquivo `.env` na raiz do projeto com suas credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

---

## 🏗️ Estrutura do Projeto

```
meu-bolso/
├── public/
│   └── favicon.png          # Ícone da aplicação
├── src/
│   ├── components/          # Componentes React
│   │   ├── Auth.tsx        # Autenticação
│   │   ├── Dashboard.tsx   # Painel principal
│   │   ├── FormularioGasto.tsx
│   │   ├── ListaGastos.tsx
│   │   ├── ResumoFinanceiro.tsx
│   │   ├── ModalSaldo.tsx
│   │   └── Footer.tsx
│   ├── contexts/           # Context API
│   │   └── AuthContext.tsx
│   ├── services/           # Serviços e APIs
│   │   └── gastos.service.ts
│   ├── lib/               # Configurações
│   │   └── firebase.ts
│   ├── types.ts           # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── .env                   # Variáveis de ambiente
├── package.json
└── README.md
```

---

## 📱 Funcionalidades Detalhadas

### 1. Autenticação
- Cadastro de novos usuários
- Login com email e senha
- Proteção de rotas

### 2. Gerenciamento de Saldo
- Definir saldo inicial
- Adicionar valores ao saldo
- Visualização em tempo real

### 3. Controle de Gastos
- Adicionar novos gastos
- Editar gastos existentes
- Excluir gastos
- Categorização automática

### 4. Categorias Pré-definidas
- 🍽️ Alimentação
- 🚗 Transporte/Carro
- 🏠 Moradia
- 🎮 Lazer
- ❤️ Saúde
- 🎓 Educação
- 🏷️ Outros

### 5. Resumo Financeiro
- Total de gastos do mês
- Saldo atual
- Percentual gasto
- Barra de progresso visual

---

## 🎯 Roadmap

- [ ] Gráficos de gastos por categoria
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Metas de economia
- [ ] Notificações de gastos
- [ ] Modo claro/escuro
- [ ] Suporte a múltiplas moedas
- [ ] Aplicativo mobile (React Native)

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvedor

<div align="center">
  
### Nexus Desenvolvimentos

Feito com ❤️ para você

[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?logo=github)](https://github.com/Brunoantonio2025)

</div>

---

## 📞 Suporte

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para:
- Abrir uma [Issue](https://github.com/Brunoantonio2025/meu-bolso/issues)
- Enviar um Pull Request
- Entrar em contato

---

<div align="center">
  <strong>MeuBolso - Seu painel de controle financeiro</strong>
  <br>
  © 2025 Nexus Desenvolvimentos
</div>
