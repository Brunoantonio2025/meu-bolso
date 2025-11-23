# 🚀 Guia de Publicação na Google Play Store

## 1. Conta de Desenvolvedor
Para publicar apps, você precisa de uma conta no Google Play Console.
- **Link**: [Google Play Console](https://play.google.com/console)
- **Custo**: Taxa única de **US$ 25** (pagamento único, vale para sempre).
- **Verificação**: Você precisará verificar sua identidade (RG/CNH).

---

## 2. Preparar o App para Produção

Antes de enviar, precisamos garantir que o app está pronto e seguro.

### 2.1. Versionamento
No Android Studio, abra o arquivo `android/app/build.gradle` e verifique:
```gradle
defaultConfig {
    versionCode 1        // Incremente este número a cada atualização (1, 2, 3...)
    versionName "1.0.0"  // Nome visível para o usuário
}
```

### 2.2. Gerar o App Bundle (.aab)
O Google exige o formato `.aab` (App Bundle) em vez de `.apk` para publicação, pois é mais otimizado.

1. No Android Studio, vá em **Build** > **Generate Signed Bundle / APK**.
2. Selecione **Android App Bundle** e clique em Next.
3. **Keystore**:
   - Se já criou (no passo anterior de gerar APK), use a mesma.
   - Se não, clique em **Create new** e guarde o arquivo `.jks` e as senhas em um local MUITO seguro (se perder, não consegue mais atualizar o app).
4. Selecione a build variant **release**.
5. Clique em **Finish**.
6. O arquivo será gerado em: `android/app/release/app-release.bundle` (ou similar).

---

## 3. Configurar a Loja (Store Listing)

No Google Play Console, crie um novo app e preencha:

### 3.1. Detalhes do App
- **Nome do App**: MeuBolso - Controle Financeiro
- **Descrição Curta**: Organize suas finanças, controle gastos e acompanhe seu saldo em tempo real.
- **Descrição Completa**: Descreva todas as funcionalidades (Categorias, Resumo, Segurança, etc.).

### 3.2. Gráficos Obrigatórios
Você precisará criar estas imagens (pode usar Canva/Figma):
- **Ícone do App**: 512 x 512 px (PNG, até 1MB).
- **Recurso Gráfico (Banner)**: 1024 x 500 px (JPG ou PNG).
- **Screenshots (Capturas de Tela)**:
  - Mínimo 2 screenshots para celular.
  - Recomendado: 4 a 8 imagens mostrando as principais telas.
  - Proporção 9:16 (ex: 1080x1920).

---

## 4. Política de Privacidade e Conteúdo

Como seu app lida com finanças (mesmo que dados locais/pessoais), o Google é rigoroso.

### 4.1. Política de Privacidade
Você **precisa** de uma URL com a política de privacidade.
- **Dica**: Use geradores gratuitos como [Privacypolicies.com](https://www.privacypolicies.com/) ou hospede uma página simples no GitHub Pages com o texto.
- O texto deve explicar que você coleta dados (email para login) e como eles são usados.

### 4.2. Classificação de Conteúdo
- Responda ao questionário no Console (o app tem violência? conteúdo adulto? etc.).
- Para o MeuBolso, a classificação será livre (L).

### 4.3. Segurança dos Dados (Data Safety)
Você precisará declarar o que coleta:
- **Dados Pessoais**: Email (para funcionalidade do app).
- **Dados Financeiros**: Histórico de compras/gastos (funcionalidade do app).
- Marque que os dados são criptografados em trânsito (o Firebase faz isso via HTTPS).

---

## 5. Testes e Lançamento

O Google recomenda seguir esta ordem:

1. **Teste Interno**: Adicione seu email e de amigos para testar o download pela Play Store antes de todo mundo.
2. **Produção**:
   - Vá em **Produção** no menu lateral.
   - Clique em **Criar nova versão**.
   - Faça upload do arquivo `.aab` que você gerou.
   - Escreva as notas da versão (ex: "Lançamento oficial do MeuBolso").
   - Clique em **Revisar versão** e depois **Iniciar lançamento para Produção**.

---

## ⏳ Tempo de Revisão
- Para contas novas, a primeira revisão pode levar de **3 a 7 dias**.
- Atualizações futuras costumam ser aprovadas em algumas horas.

---

## ✅ Checklist Final

- [ ] Conta de Desenvolvedor Ativa ($25)
- [ ] Arquivo `.aab` assinado (Release)
- [ ] Ícone (512x512) e Banner (1024x500)
- [ ] Screenshots do app
- [ ] Link da Política de Privacidade
- [ ] Questionários de Classificação e Dados respondidos

Boa sorte com o lançamento! 🚀
