# 📱 Guide d'installation de CarFinder

## 🎯 **Options d'installation disponibles**

### **Option 1 : Expo Go (Plus simple - Développement)**
- ✅ **Avantages** : Rapide, pas de build nécessaire
- ❌ **Inconvénients** : Nécessite Expo Go, pas d'icône personnalisée
- 📋 **Étapes** :
  1. Installez "Expo Go" depuis l'App Store/Google Play
  2. Lancez `npx expo start` dans le terminal
  3. Scannez le QR code avec Expo Go

### **Option 2 : Build Expo (Recommandée - Production)**
- ✅ **Avantages** : Application native, icône personnalisée, fonctionne hors ligne
- ❌ **Inconvénients** : Nécessite un compte Expo, build plus long
- 📋 **Étapes** : Voir ci-dessous

### **Option 3 : Build local (Avancée)**
- ✅ **Avantages** : Contrôle total, pas de limite Expo
- ❌ **Inconvénients** : Complexe, nécessite Android Studio/Xcode

---

## 🚀 **Option 2 : Build Expo (Recommandée)**

### **Étape 1 : Créer un compte Expo**
1. Allez sur [expo.dev](https://expo.dev)
2. Créez un compte gratuit
3. Connectez-vous dans le terminal :
   ```bash
   npx expo login
   ```

### **Étape 2 : Build pour Android**
```bash
# Build APK (fichier installable)
npx expo build:android -t apk

# OU Build AAB (pour Google Play Store)
npx expo build:android -t app-bundle
```

### **Étape 3 : Build pour iOS**
```bash
# Build IPA (nécessite un compte Apple Developer)
npx expo build:ios -t archive
```

### **Étape 4 : Télécharger et installer**
1. Une fois le build terminé, vous recevrez un lien
2. Téléchargez le fichier APK/IPA
3. Installez sur votre téléphone

---

## 📱 **Installation sur Android**

### **Méthode 1 : APK direct**
1. Téléchargez le fichier `.apk`
2. Activez "Sources inconnues" dans les paramètres
3. Ouvrez le fichier APK et installez

### **Méthode 2 : ADB (Développeur)**
```bash
# Connectez votre téléphone en USB
adb install CarFinder.apk
```

---

## 🍎 **Installation sur iOS**

### **Méthode 1 : TestFlight**
1. Uploadez sur App Store Connect
2. Invitez-vous en tant que testeur
3. Installez TestFlight et l'application

### **Méthode 2 : Installation directe**
1. Utilisez Xcode ou AltStore
2. Installez le fichier `.ipa`

---

## ⚡ **Méthode rapide : Expo Go**

Si vous voulez tester rapidement :

```bash
# Dans le terminal
npx expo start

# Puis scannez le QR code avec Expo Go
```

---

## 🔧 **Configuration avancée**

### **Personnaliser l'icône**
1. Remplacez `./assets/icon.png` par votre icône
2. Taille recommandée : 1024x1024 pixels
3. Format : PNG avec fond transparent

### **Personnaliser le splash screen**
1. Remplacez `./assets/splash-icon.png`
2. Taille recommandée : 1242x2436 pixels

### **Changer le nom de l'app**
Modifiez `"name": "CarFinder"` dans `app.json`

---

## 📋 **Checklist avant build**

- [ ] Toutes les fonctionnalités testées
- [ ] Icône personnalisée ajoutée
- [ ] Permissions configurées
- [ ] Compte Expo créé et connecté
- [ ] Application testée avec Expo Go

---

## 🆘 **Dépannage**

### **Erreur de build**
```bash
# Nettoyer le cache
npx expo r -c

# Réinstaller les dépendances
npm install
```

### **Problème de permissions**
Vérifiez que toutes les permissions sont dans `app.json`

### **Build échoue**
- Vérifiez votre connexion internet
- Assurez-vous d'être connecté à Expo
- Vérifiez les logs d'erreur

---

## 🎉 **Félicitations !**

Une fois installée, votre application CarFinder sera :
- ✅ **Indépendante** : Plus besoin d'Expo Go
- ✅ **Native** : Performance optimale
- ✅ **Personnalisée** : Votre icône et nom
- ✅ **Hors ligne** : Fonctionne sans internet

---

**Besoin d'aide ?** Consultez la documentation Expo ou contactez-moi ! 