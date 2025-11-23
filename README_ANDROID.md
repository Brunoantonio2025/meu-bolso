# 📱 MeuBolso - Versão Android

## 🚀 Início Rápido

### Comandos Disponíveis

```bash
# Preparar tudo e abrir no Android Studio
npm run android:prepare

# Apenas fazer build e sincronizar
npm run android:build

# Abrir projeto no Android Studio
npm run android:open

# Executar no emulador/dispositivo
npm run android:run

# Sincronizar mudanças
npm run android:sync
```

## 📋 Status do Projeto

✅ **Capacitor Configurado**
- App ID: `com.nexusdev.meubolso`
- App Name: `MeuBolso`
- Plataforma Android adicionada

✅ **Build de Produção**
- Arquivos otimizados em `/dist`
- Pronto para gerar APK

✅ **Projeto Android**
- Localização: `/android`
- Pronto para abrir no Android Studio

## 🎯 Próximos Passos

1. **Instalar Android Studio**
   - Download: https://developer.android.com/studio

2. **Abrir o Projeto**
   ```bash
   npm run android:open
   ```

3. **Gerar APK**
   - Siga o guia completo em: `GUIA_APK.md`

## 📦 Estrutura do Projeto Android

```
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── assets/        # Arquivos web compilados
│   │       ├── res/           # Recursos (ícones, etc)
│   │       └── AndroidManifest.xml
│   └── build.gradle
├── gradle/
└── build.gradle
```

## 🔄 Workflow de Desenvolvimento

1. **Fazer mudanças no código React**
2. **Executar:**
   ```bash
   npm run android:build
   ```
3. **Testar no Android Studio ou dispositivo**

## 📱 Informações do App

- **Nome**: MeuBolso
- **Package**: com.nexusdev.meubolso
- **Versão**: 1.0.0
- **Desenvolvedor**: Nexus Desenvolvimentos

## 🎨 Personalização

### Alterar Ícone
1. Prepare ícone 1024x1024px
2. Use: https://icon.kitchen/
3. Substitua em: `android/app/src/main/res/`

### Alterar Nome
Edite: `android/app/src/main/res/values/strings.xml`

### Alterar Cores
Edite: `android/app/src/main/res/values/colors.xml`

## 📖 Documentação

- **Guia Completo APK**: Ver `GUIA_APK.md`
- **Capacitor Docs**: https://capacitorjs.com
- **Android Docs**: https://developer.android.com

---

**Pronto para gerar seu APK! 🎉**
