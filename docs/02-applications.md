# 02 — Spécifications fonctionnelles par application

**Dernière synthèse : 18/11/2026**  
**Les intentions VALIDÉES ci-dessous ne prouvent pas que les fonctions sont implémentées.** Pour chacune, vérifier le prototype avant toute modification.

## 0. Système Windows XP (socle)

### VALIDÉ / attendu

- Connexion visuellement fidèle (voir `01-vision-du-projet.md`) avec choix de profil sans mot de passe.
- Bureau avec fond d'écran et icônes vintage fournis ; accès aux logiciels.
- Barre des tâches, menu Démarrer et gestion des fenêtres dans un style XP cohérent.
- Navigation entre applications sans perte des autres interfaces.

### Points de vigilance

- Éviter de recréer les icônes en style contemporain si des fichiers d'époque existent.
- Veiller au comportement d'ouverture, premier plan, réduction et fermeture.
- Après chaque ajout de fenêtre ou d'application, tester que les autres s'ouvrent encore.

## 1. Internet Explorer 7 / Wikipédia — Histoire

Pour le premier lot V1, la capture fournie le 19 novembre sert de référence
au cadre du navigateur. L'onglet Accueil présente Rewind XP. Le champ de
recherche porte sur cette page. Le menu Outils donne accès à la recherche,
au zoom et au retour à 100 %.

La V1 propose un premier article « Années 2000 » depuis cet accueil.
Le sommaire reprend les grandes rubriques de l’article francophone
« Années 2000 » de Wikipédia, cité dans les références. Les six scènes
documentées sont intégrées aux rubriques correspondantes. La recherche
IE7 suit la page affichée.
La présentation s'appuie sur MonoBook. Les figures légendées illustrent
les objets et les usages. Des manipulations facultatives montrent la
comparaison de versions et la navigation dans une discothèque numérique.

### VALIDÉ

- Utiliser **Internet Explorer 7** plutôt qu'une version antérieure, pour les possibilités de navigation souhaitées.
- Fidélité à l'interface d'IE7 d'après les références fournies ; **barre de navigation particulièrement soignée**.
- Boutons **Précédent / Suivant** arrondis et brillants, avec reflets, dégradés et aspect proche de l'original.
- Au lancement, afficher une **page d'accueil** qui permet de choisir parmi **trois sites favoris** dans le principe envisagé.
- Permettre de **revenir à la page d'accueil** pour choisir un autre site.
- Intégrer des pages dans le style Wikipédia dédiées à l'histoire des années 2000 (un ou plusieurs sujets).

### À PRÉCISER

- Liste finale exacte des trois favoris : pistes évoquées **Wikipédia, DaFont, DeviantArt** ; à confirmer avant codage des raccourcis.
- Gestion multi-onglets : possibilité discutée et compatible avec l'esprit IE7 ; comportement et nécessité à statuer en fonction du parcours final.
- Déterminer les liens internes des sites reconstitués, l'historique, la barre d'adresse et les états de chargement.

### Vérification technique

- Barre d'outils fidèle à la capture de référence, retours arrière/avant cohérents, accueil accessible, pages lisibles.

## 2. DaFont — Typographie

### VALIDÉ

- Une navigation qui évoque le site **DaFont** historique.
- Présentation d'une sélection de typographies étudiées ; chaque police mène à sa **page individuelle**.
- Conserver la structure générale d'une page DaFont, en y intégrant **un texte explicatif pédagogique supplémentaire**.

### Contenus attendus

- Nom de la police, concepteur, date ou période, classification, exemples visuels, contexte de création, analyse typographique et sources.
- Les polices exactes sont à fournir par le groupe en charge et à vérifier.

### Points de vigilance

- Ne pas effacer l'allure du site d'époque sous un design éditorial moderne.
- Prévoir une longueur de texte suffisante sans rendre les pages illisibles.

## 3. Google Earth — Architecture

### VALIDÉ

- Reconstituer un environnement visuel inspiré de **Google Earth** pour explorer des réalisations architecturales.
- Permettre la sélection de **lieux sur la carte**, ouvrant des explications / fiches de lieux.
- Chaque fiche peut associer **texte, photos et vues de type Street View / environnement** selon les ressources disponibles.
- Prévoir davantage d'espace pour le texte et **intégrer les images dans la fiche**, plutôt que de réduire l'information à une petite infobulle.
- Utiliser les icônes vintage adaptées à l'application.

### Problèmes historiques signalés (à auditer)

- Un prototype avait une **déformation de carte mal positionnée**.
- Une autre modification a fait **disparaître la carte**.
- Ne pas supposer ces défauts encore présents ; les vérifier avec la version HTML réellement fournie.

### À PRÉCISER

- Moteur cartographique / image fixe interactive / projection et limites des vues panoramiques.
- Liste des lieux, géolocalisations, visuels et métadonnées historiques du groupe.

## 4. eBay — Design et objets

### VALIDÉ

- Utiliser le langage d'un **eBay d'époque** pour parler d'objets de design des années 2000.
- Présenter les objets dans des **fiches de type annonce**, tout en conservant leur dimension culturelle (concepteur, date, contexte, matériaux, portée graphique et historique, sources).

### À DÉFINIR

- Inventaire exact des objets ; structure de recherche, catégories, tri et fiches.
- Interactions simulées utiles : consultation, images multiples, enchères fictives ou prix de contexte ; **aucune vraie transaction** n'est prévue.

## 5. Windows Media Player — Cinéma, séries et musique

### VALIDÉ

- **Windows Media Player doit faire partie du projet** : point explicitement rappelé lors de la préparation des slides.
- Privilégier une présentation **lecteur + fiches explicatives indépendantes** pour préserver la lisibilité des analyses.
- Reprendre l'esthétique et les contrôles de l'application d'époque d'après les captures fournies.

### À DÉFINIR

- Œuvres sélectionnées et organisation entre cinéma, séries et musique.
- Nature du média réellement lisible ou simulé selon les droits, assets disponibles et objectifs pédagogiques. Ne pas prévoir automatiquement des contenus protégés en lecture.
- Placement des fiches, transitions et comportements des commandes du lecteur.

## 6. DeviantArt — Arts et photographie

### VALIDÉ

- Utiliser une **galerie communautaire** proche de DeviantArt, sans perdre de vue le cœur pédagogique : **les œuvres, leurs analyses, descriptions et informations**.
- Chaque œuvre dispose d'une page détaillée avec éléments sociaux : **badges, commentaires de la communauté** et éventuellement repères communautaires pertinents.
- Prévoir **des commentaires existants préremplis**, afin que les pages ne paraissent pas vides.
- Les visiteurs peuvent **laisser leur propre commentaire**.
- **Les commentaires visiteurs ne sont pas conservés durablement** après la réinitialisation de l'expérience ; pas de persistance de compte exigée.
- Sélection **variée d'art contemporain et de photographie** ; œuvres exactes à recevoir/valider.

### Points de vigilance

- Distinction claire entre les commentaires fictifs illustratifs et les informations documentaires vérifiées ; ne pas attribuer de fausses citations à des personnes réelles.
- Les contributions temporaires ne doivent pas remplacer les commentaires de départ.

## 7. Gabarit de collecte des contenus pour les groupes (proposition)

Données communes à demander pour chaque sujet :

1. Thème et application de destination.
2. Titre de la référence / œuvre / lieu / objet / typographie.
3. Auteur, studio, architecte ou créateur, lorsque pertinent.
4. Date, période, pays / lieu de création.
5. Court résumé (accroche) + description développée.
6. Analyse graphique, historique et culturelle ; pourquoi cette référence est importante pour les années 2000.
7. Images exploitables, crédits, légendes et, si possible, autorisations / sources.
8. Références bibliographiques et liens vérifiables.
9. Métadonnées spécifiques : coordonnées du lieu, famille typographique, matériau de l'objet, catégorie audiovisuelle, etc.

**Ce gabarit est une proposition de normalisation**, à ajuster aux consignes officielles et au travail réparti entre groupes. Les fichiers de recherche ne sont pas encore consolidés ici.

## 8. Principes transversaux de contrôle qualité

- Navigation par souris / clavier lorsque cela améliore réellement l'expérience.
- Pas de « boutons décoratifs » laissant croire à une fonction inexistante sans indication appropriée.
- Parcours réversible : il doit être possible de revenir au bureau, à l'accueil des sites et aux listes de contenus.
- Tests de non-régression du bureau et des applications après tout changement.
- Vérification de la lisibilité des textes, des images et de leurs légendes à la résolution cible, à déterminer.
