# Conversation Privée - Gaetan & Wynonaa

Une application de messagerie privée et sécurisée pour deux personnes uniquement.

## 🎯 Caractéristiques

- **Conversation privée**: Communication exclusivement entre Gaetan et Wynonaa
- **Sélection de rôle**: Chaque utilisateur choisit son identité (Gaetan ou Wynonaa)
- **Partage de médias**: 
  - Images (JPEG, PNG, GIF, WebP)
  - Vidéos (MP4, WebM)
  - Documents (PDF, Word, Excel)
- **Stockage local**: Tous les messages et fichiers sont sauvegardés localement dans le projet
- **Interface intuitive**: Design moderne avec Tailwind CSS
- **Données persistantes**: Messages et médias sauvegardés via localStorage et système de fichiers

## 🛠️ Stack Technique

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **State Management**: React Context API
- **Storage**: localStorage + Node.js file system

## 📁 Structure du Projet

```
app/
├── api/
│   ├── messages/route.ts      # API pour les messages
│   └── upload/route.ts        # API pour les uploads de fichiers
├── components/
│   ��── RoleSelector.tsx       # Sélection de rôle utilisateur
│   ├── ChatWindow.tsx         # Fenêtre de chat
│   ├── ChatMessage.tsx        # Composant message individuel
│   └── MessageInput.tsx       # Input pour les messages et uploads
├── context/
│   └── ChatContext.tsx        # Context pour l'état global du chat
├── types/
│   └── index.ts               # Types TypeScript
├── layout.tsx                 # Layout principal avec ChatProvider
└── page.tsx                   # Page d'accueil

public/
├── uploads/                   # Dossier de stockage des fichiers uploadés
└── data/                      # Dossier de stockage des messages

```

## 🚀 Installation & Démarrage

1. **Installation des dépendances**:
```bash
npm install
```

2. **Démarrer le serveur de développement**:
```bash
npm run dev
```

3. **Ouvrir dans le navigateur**:
```
http://localhost:3000
```

## 📝 Utilisation

### Sélection de rôle
1. À l'ouverture, sélectionnez votre identité (Gaetan ou Wynonaa)
2. Cela sauvegarde votre rôle localement

### Envoi de messages
1. Tapez votre message dans la zone de texte
2. Cliquez sur le bouton envoyer (✈️) ou appuyez sur `Ctrl + Entrée`

### Partage de fichiers
1. Cliquez sur l'icône d'attachement (📎)
2. Sélectionnez un ou plusieurs fichiers
3. Les fichiers s'affichent dans la liste des fichiers attachés
4. Envoyez le message (les fichiers seront uploadés automatiquement)

### Affichage des médias
- **Images**: Affichées directement dans la conversation
- **Vidéos**: Lecteur vidéo intégré avec contrôles
- **Documents**: Lien téléchargeable avec icône et taille du fichier

### Changement d'utilisateur
Cliquez sur le bouton "Changer d'utilisateur" en haut à droite pour retourner à l'écran de sélection de rôle.

## 📊 Données Sauvegardées

### localStorage
- **chatData**: Tous les messages et métadonnées des utilisateurs
- **currentUser**: Rôle de l'utilisateur actuellement connecté

### Système de fichiers
- **public/uploads/**: Tous les fichiers uploadés (images, vidéos, documents)
- **public/data/**: Données supplémentaires (si besoin de persistance côté serveur)

## 🔒 Sécurité & Privacité

- ✅ Données stockées localement (contrôle total)
- ✅ Pas d'API externe pour les données personnelles
- ✅ Fichiers sauvegardés sur votre serveur
- ✅ Conversation isolée entre deux personnes uniquement

## 🎨 Couleurs & Design

- **Gaetan**: Thème bleu 🔵
- **Wynonaa**: Thème rose 🌸

## ⚙️ Limites des fichiers

- **Taille maximum**: 50 MB par fichier
- **Types autorisés**:
  - Images: JPEG, PNG, GIF, WebP
  - Vidéos: MP4, WebM
  - Documents: PDF, DOC, DOCX, XLS, XLSX

## 📝 Notes

- Les messages et fichiers sont persistés automatiquement
- Chaque message contient l'identité de l'expéditeur, l'horodatage et les médias associés
- Les images et vidéos s'affichent directement dans le chat
- Les documents peuvent être téléchargés via un lien

## 🐛 Dépannage

### Les fichiers ne s'uploadent pas
- Vérifiez la taille du fichier (< 50 MB)
- Vérifiez le type de fichier (formats autorisés)
- Vérifiez que le serveur a les permissions d'écriture sur `public/uploads/`

### Les messages ne s'affichent pas
- Vérifiez que le localStorage est activé dans le navigateur
- Essayez de rafraîchir la page (Ctrl + F5)

### Le serveur ne démarre pas
```bash
# Essayez de supprimer les fichiers de cache et recommencer
rm -rf .next node_modules
npm install
npm run dev
```

## 🔧 Production

Pour déployer en production:

```bash
npm run build
npm start
```

Assurez-vous que le dossier `public/uploads/` existe et que le serveur a les permissions d'écriture.

## 📄 License

Projet privé - Gaetan & Wynonaa
