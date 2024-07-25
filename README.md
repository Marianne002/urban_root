# Urban Root



## Table des matières

- [Introduction](#introduction)
- [Arborescence](#arborescence)
- [Composants](#composants)
- [Pages](#pages)
- [Models](#models)
- [Stack](#stack)
- [Configuration](#configuration)

## Introduction

Bienvenue dans Urban Root, une plateforme dédiée à encourager le jardinage urbain, favoriser la collaboration communautaire pour créer et entretenir des espaces verts, améliorer la durabilité urbaine, éduquer et sensibiliser à l'écoresponsabilité, et faciliter l'accès aux ressources de jardinage.

Urban Root permet aux utilisateurs de consulter des jardins urbains francophones, partager des connaissances sur le forum, et accéder à des guides de jardinage.

## Arborescence
```
urban_root/
│
├── app/
│ ├── api/
│ ├── ├── auth/
│ ├── ├── ├── [...nextauth]
│ ├── ├── ├── ├── route.js
│ ├── ├── comments/
│ ├── ├── ├── route.js
│ ├── ├── garden/
│ ├── ├── ├── route.js
│ ├── ├── posts/
│ ├── ├── ├── route.js
│ ├── ├── register/
│ ├── ├── ├── route.js
│ ├── ├── topic/
│ ├── ├── ├── [slug]
│ ├── ├── ├── ├── route.js
│ ├── ├── ├── route.js
│ ├── carte/
│ ├── ├── page.jsx
│ ├── conditions-generales-utilisation/
│ ├── ├── page.jsx
│ ├── forum/
│ ├── ├── [slug]
│ ├── ├── ├── create-post
│ ├── ├── ├── ├── page.jsx
│ ├── ├── ├── page.jsx
│ ├── ├── page.jsx
│ ├── guides/
│ ├── ├── page.jsx
│ ├── login/
│ ├── ├── page.jsx
│ ├── mentions-legales/
│ ├── ├── page.jsx
│ ├── politique-de-confidentialite/
│ ├── ├── page.jsx
│ ├── register/
│ ├── ├── page.jsx
│ ├── layout.jsx
│ ├── not-found.jsx
│ ├── page.jsx
├── components/
│ ├── Editor.jsx
│ ├── Footer.jsx
│ ├── Loader.jsx
│ ├── Map.jsx
│ ├── MapPanel.jsx
│ ├── MapCluster.jsx
│ ├── Navbar.jsx
│ ├── Provider.jsx
│ ├── TopicForm.jsx
├── models/
│ ├── Comment.js
│ ├── Garden.js
│ ├── Post.js
│ ├── Topic.js
│ ├── User.js
├── mongodb/
│ ├── database.js
├── node_modules/
├── public/
├── styles/
├── .env
├── .gitignore
├── jsconfig.json
├── nextconfig.json
├── package-lock.json
├── package.json
├── README.md
```

### Composants
**Editor.jsx**: Composant pour l'édition de contenu.
**Footer.jsx**: Composant pour le pied de page.
**Loader.jsx**: Composant pour les animations de chargement.
**Map.jsx**: Composant pour afficher une carte interactive.
**MapPanel.jsx**: Panneau de contrôle pour la carte.
**MapCluster.jsx**: Gestion des clusters sur la carte.
**Navbar.jsx**: Composant pour la barre de navigation.
**Provider.jsx**: Composant pour fournir le contexte de l'application.
**TopicForm.jsx**: Formulaire pour créer ou éditer des sujets dans le forum.

### Pages
**carte/page.jsx**: Page affichant la carte des jardins urbains.
**conditions-generales-utilisation/page.jsx**: Page des conditions générales d'utilisation.
**forum/[slug]/create-post/page.jsx**: Page pour créer un nouveau post sur le forum.
**forum/[slug]/page.jsx**: Page affichant un sujet du forum.
**forum/page.jsx**: Page principale du forum.
**guides/page.jsx**: Page listant les guides de jardinage.
**login/page.jsx**: Page de connexion.
**mentions-legales/page.jsx**: Page des mentions légales.
**politique-de-confidentialite/page.jsx**: Page de la politique de confidentialité.
**register/page.jsx**: Page d'inscription.
**layout.jsx**: Composant de mise en page générale.
**not-found.jsx**: Page affichée pour les routes non trouvées.
**page.jsx**: Page d'accueil principale.

### Models
**Comment.js**: Modèle pour les commentaires.
**Garden.js**: Modèle pour les jardins urbains.
**Post.js**: Modèle pour les posts du forum.
**Topic.js**: Modèle pour les sujets du forum.
**User.js**: Modèle pour les utilisateurs.

## Stack

[API Leaflet](https://leafletjs.com/) : Bibliothèque JavaScript utilisée pour afficher des cartes interactives.
[bcryptjs](https://www.npmjs.com/package/bcryptjs) : Bibliothèque pour le hachage des mots de passe.
[Cloudinary](https://cloudinary.com/) : Service de gestion d'images et de vidéos.
[Date-fns](https://date-fns.org/) : Bibliothèque de gestion et manipulation des dates en JavaScript.
[Emotion](https://emotion.sh/docs/introduction) : Librairie de styles CSS-in-JS.
[Google OAuth](https://developers.google.com/identity/protocols/oauth2?hl=fr) : Service d'authentification utilisé pour permettre aux utilisateurs de se connecter à l'application en utilisant leur compte Google.
[Mongoose](https://mongoosejs.com/) : ODM (Object Data Modeling) pour MongoDB et Node.js.
[MongoDB](https://www.mongodb.com/) : Base de données NoSQL utilisée pour stocker les données de l'application.
[Multer](https://www.npmjs.com/package/multer) : Middleware Node.js pour le traitement des fichiers multipart/form-data.
[MUI (Material-UI)](https://mui.com/) : Bibliothèque de composants React pour la conception d'interfaces utilisateur.
[Next.js](https://nextjs.org/) : Framework React pour le rendu côté serveur et la génération de sites statiques.
[Next-Auth](https://next-auth.js.org/) : Solution d'authentification pour Next.js.
[Next-Connect](https://www.npmjs.com/package/next-connect) : Middleware pour les API routes dans Next.js.
[React](https://reactjs.org/) : Bibliothèque JavaScript pour la construction d'interfaces utilisateur.
[React Icons](https://react-icons.github.io/react-icons/) : Bibliothèque de composants d'icônes pour React.
[Sass](https://sass-lang.com/) : Préprocesseur CSS utilisé pour ajouter des fonctionnalités aux fichiers CSS.
[Slugify](https://www.npmjs.com/package/slugify) : Bibliothèque pour créer des slugs d'URL.
[Tiptap](https://tiptap.dev/) : Éditeur de texte riche basé sur ProseMirror pour React.


## Configutation

### Développement
1. Clônez le dépôt depuis Github.
2. Installation des dépendances: Exécutez la commande `npm install`
3. Tester l'application localement: Exécutez la commande `npm run dev`

### Éléments nécessaires pour accéder à la solution
- Un appareil compatible avec une connexion Internet.
- Un navigateur web moderne tel que Google Chrome, Mozilla Firefox, ou Safari.
- Un compte Google valide pour l'authentification via Google sign-in.