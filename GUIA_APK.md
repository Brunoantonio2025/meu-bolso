# 📱 Guia Completo: Gerar APK do MeuBolso

## ✅ Pré-requisitos Instalados

O projeto já está configurado com:
- ✅ Capacitor instalado e inicializado
- ✅ Plataforma Android adicionada
- ✅ Build de produção criado
- ✅ Projeto sincronizado

## 🔧 Requisitos no seu Computador

Antes de gerar o APK, você precisa ter instalado:

### 1. **Java Development Kit (JDK)**
- Versão recomendada: JDK 17
- Download: https://www.oracle.com/java/technologies/downloads/

### 2. **Android Studio**
- Download: https://developer.android.com/studio
- Durante a instalação, certifique-se de instalar:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device (opcional, para testes)

### 3. **Configurar Variáveis de Ambiente**

Adicione ao PATH do sistema:
```
ANDROID_HOME = C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Java\jdk-17
```

---

## 🚀 Passo a Passo para Gerar o APK

### **Opção 1: Usando Android Studio (Recomendado)**

#### 1. Abrir o Projeto no Android Studio

```bash
npx cap open android
```

Ou manualmente:
1. Abra o Android Studio
2. Clique em "Open"
3. Navegue até: `C:\Users\alema\OneDrive\Desktop\project\android`
4. Clique em "OK"

#### 2. Aguardar Sincronização do Gradle

- O Android Studio vai sincronizar automaticamente
- Aguarde até aparecer "Gradle sync finished" na parte inferior
- Isso pode levar alguns minutos na primeira vez

#### 3. Gerar APK de Debug (Para Testes)

1. No menu superior: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Aguarde a compilação (pode levar alguns minutos)
3. Quando concluir, clique em "locate" na notificação
4. O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

#### 4. Gerar APK de Release (Para Publicação)

##### 4.1. Criar Keystore (Primeira vez apenas)

No terminal do Android Studio ou PowerShell:

```bash
keytool -genkey -v -keystore meubolso-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias meubolso
```

Preencha as informações solicitadas e **guarde a senha em local seguro!**

##### 4.2. Configurar o Gradle

Edite o arquivo: `android/app/build.gradle`

Adicione antes de `android {`:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android {`, adicione:

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

##### 4.3. Criar arquivo key.properties

Crie o arquivo `android/key.properties`:

```properties
storePassword=SUA_SENHA_AQUI
keyPassword=SUA_SENHA_AQUI
keyAlias=meubolso
storeFile=../meubolso-release-key.jks
```

##### 4.4. Gerar APK Release

1. No Android Studio: **Build** → **Generate Signed Bundle / APK**
2. Selecione **APK** → **Next**
3. Selecione seu keystore ou crie um novo
4. Preencha as senhas
5. Selecione **release** como build variant
6. Clique em **Finish**

O APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

---

### **Opção 2: Usando Linha de Comando**

#### APK de Debug:

```bash
cd android
./gradlew assembleDebug
```

#### APK de Release:

```bash
cd android
./gradlew assembleRelease
```

---

## 📝 Comandos Úteis

### Atualizar o App após mudanças no código:

```bash
# 1. Fazer novo build
npm run build

# 2. Sincronizar com Android
npx cap sync android

# 3. Abrir no Android Studio
npx cap open android
```

### Testar no Emulador:

```bash
npx cap run android
```

### Ver logs do app:

```bash
npx cap run android -l
```

---

## 🎨 Personalizar Ícone e Splash Screen

### Ícone do App

1. Prepare um ícone PNG de 1024x1024px
2. Use o site: https://icon.kitchen/
3. Faça upload do seu ícone
4. Baixe o pacote Android
5. Substitua os arquivos em: `android/app/src/main/res/`

### Splash Screen

Edite: `android/app/src/main/res/values/styles.xml`

---

## 📦 Localização dos APKs Gerados

### Debug:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Release:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## ⚠️ Problemas Comuns

### "SDK location not found"
- Solução: Configure a variável ANDROID_HOME

### "Gradle sync failed"
- Solução: File → Invalidate Caches → Invalidate and Restart

### "Build failed"
- Verifique se o JDK está instalado corretamente
- Verifique a conexão com a internet (Gradle baixa dependências)

---

## 🚀 Publicar na Google Play Store

1. Gere o APK de release assinado
2. Crie uma conta de desenvolvedor: https://play.google.com/console
3. Crie um novo app
4. Faça upload do APK
5. Preencha as informações do app
6. Envie para revisão

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Android Studio
2. Consulte a documentação do Capacitor: https://capacitorjs.com
3. Abra uma issue no GitHub

---

**Desenvolvido por Nexus Desenvolvimentos**
© 2025 - MeuBolso
