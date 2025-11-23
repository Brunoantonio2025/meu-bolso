# ✅ Checklist: Gerar APK do MeuBolso

## 📋 Antes de Começar

### Instalações Necessárias

- [ ] **Java JDK 17** instalado
  - Download: https://www.oracle.com/java/technologies/downloads/
  - Verificar: `java -version` no terminal

- [ ] **Android Studio** instalado
  - Download: https://developer.android.com/studio
  - Incluir: Android SDK, SDK Platform, Build Tools

- [ ] **Variáveis de Ambiente** configuradas
  ```
  ANDROID_HOME = C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk
  JAVA_HOME = C:\Program Files\Java\jdk-17
  ```

---

## 🚀 Processo de Geração do APK

### Passo 1: Preparar o Projeto
- [ ] Abrir terminal na pasta do projeto
- [ ] Executar: `npm run android:prepare`
- [ ] Aguardar Android Studio abrir

### Passo 2: Sincronizar Gradle
- [ ] Aguardar mensagem "Gradle sync finished"
- [ ] Verificar se não há erros no painel "Build"

### Passo 3: Gerar APK de Debug (Teste)
- [ ] Menu: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
- [ ] Aguardar compilação
- [ ] Clicar em "locate" quando concluir
- [ ] APK estará em: `android/app/build/outputs/apk/debug/`

### Passo 4: Testar o APK
- [ ] Transferir APK para celular Android
- [ ] Instalar e testar todas as funcionalidades
- [ ] Verificar login/cadastro
- [ ] Verificar adição de gastos
- [ ] Verificar edição e exclusão

---

## 📦 Para APK de Release (Publicação)

### Criar Keystore (Apenas 1ª vez)
- [ ] Executar comando de criação do keystore
- [ ] Guardar senha em local seguro
- [ ] Mover arquivo .jks para pasta do projeto

### Configurar Assinatura
- [ ] Editar `android/app/build.gradle`
- [ ] Criar arquivo `android/key.properties`
- [ ] Adicionar configurações de assinatura

### Gerar APK Release
- [ ] Menu: **Build** → **Generate Signed Bundle / APK**
- [ ] Selecionar APK
- [ ] Escolher keystore
- [ ] Selecionar variant "release"
- [ ] APK estará em: `android/app/build/outputs/apk/release/`

---

## 🎨 Personalização (Opcional)

### Ícone do App
- [ ] Criar ícone 1024x1024px
- [ ] Usar https://icon.kitchen/
- [ ] Substituir em `android/app/src/main/res/`

### Nome do App
- [ ] Editar `android/app/src/main/res/values/strings.xml`
- [ ] Alterar `<string name="app_name">MeuBolso</string>`

### Cores
- [ ] Editar `android/app/src/main/res/values/colors.xml`
- [ ] Personalizar cores do tema

---

## 🐛 Solução de Problemas

### Se o Gradle não sincronizar:
- [ ] File → Invalidate Caches → Invalidate and Restart
- [ ] Verificar conexão com internet
- [ ] Verificar se ANDROID_HOME está configurado

### Se o build falhar:
- [ ] Verificar versão do JDK (deve ser 17)
- [ ] Limpar build: Build → Clean Project
- [ ] Rebuild: Build → Rebuild Project

### Se o APK não instalar:
- [ ] Habilitar "Fontes Desconhecidas" no Android
- [ ] Verificar se é APK de release assinado
- [ ] Verificar compatibilidade da versão Android

---

## 📱 Publicar na Google Play

- [ ] Criar conta de desenvolvedor ($25 taxa única)
- [ ] Acessar: https://play.google.com/console
- [ ] Criar novo app
- [ ] Fazer upload do APK/AAB de release
- [ ] Preencher informações:
  - [ ] Título e descrição
  - [ ] Screenshots
  - [ ] Ícone e banner
  - [ ] Categoria
  - [ ] Política de privacidade
- [ ] Enviar para revisão

---

## 📚 Recursos Úteis

- **Guia Completo**: Ver `GUIA_APK.md`
- **README Android**: Ver `README_ANDROID.md`
- **Documentação Capacitor**: https://capacitorjs.com
- **Documentação Android**: https://developer.android.com

---

## ✨ Comandos Rápidos

```bash
# Preparar e abrir Android Studio
npm run android:prepare

# Apenas build e sync
npm run android:build

# Abrir Android Studio
npm run android:open

# Executar no dispositivo
npm run android:run
```

---

## 🎉 Pronto!

Quando você tiver o APK:
1. ✅ Teste em diferentes dispositivos
2. ✅ Verifique todas as funcionalidades
3. ✅ Compartilhe com amigos para feedback
4. ✅ Publique na Google Play Store!

---

**Desenvolvido por Nexus Desenvolvimentos**
**MeuBolso - Seu painel de controle financeiro**
© 2025
