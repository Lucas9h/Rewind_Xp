# 01 — Vision globale du projet Rewind XP

**Dernière synthèse : 18/11/2026**
**Périmètre : intention et décisions de conception, pas audit technique**

## 1. Identité

- **Nom VALIDÉ :** Rewind XP (`rewind-xp` comme slug possible ; dépôt local actuel nommé `Rewind_Xp`).
- **Contexte :** projet collectif de Culture Graphique à l'ECV Bordeaux ; période dont le groupe est responsable : les **années 2000**.
- **Mission :** rendre explorables les recherches sur cette décennie au sein d'un environnement inspiré de Windows XP, plutôt que d'un diaporama traditionnel.
- **Principe directeur VALIDÉ :** l'interface historique est elle-même un support de narration et de découverte.

## 2. Cadre pédagogique connu

Le travail s'inscrit dans un dispositif de recherches par **époque** et par **thématique**, avec échanges entre groupes. Le groupe responsable des années 2000 doit accueillir les recherches des autres groupes dans une expérience cohérente. Dans l'historique des échanges, **Histoire** fait partie du socle du sujet années 2000, et **Typographie** est le premier thème attribué à traiter. Les règles officielles, livrables et critères sont à relire dans les briefs des professeurs, à déposer dans `docs/briefs-officiels/`.

## 3. Public et intention

- Public : enseignants, étudiants et visiteurs découvrant la culture graphique des années 2000.
- Ton : nostalgique, curieux, accessible et ludique, mais **documenté et analytique**.
- Ce qui fait la valeur du projet : **une interaction familière à l'époque révèle des informations historiques**, au lieu d'utiliser des fenêtres XP comme simple décor.
- Le contenu est central : noms, dates, contexte, images, analyses et références doivent rester lisibles.

## 4. Parcours utilisateur cible (VALIDÉ dans son principe)

1. Ouverture sur un **écran de connexion inspiré de Windows XP**.
2. Choix d'un profil, **sans saisie de mot de passe** dans la version souhaitée.
3. Arrivée sur un **bureau Windows XP** : papier peint, icônes, barre des tâches et menu Démarrer.
4. L'utilisateur ouvre les applications proposées, chacune associée à une ou plusieurs thématiques.
5. Navigation dans les contenus : fiches, pages, images, textes, repères contextuels et interactions propres au logiciel.
6. Retour possible au bureau et passage d'une application à l'autre.

Le niveau exact de persistance des fenêtres et de l'état des applications doit être audité / précisé.

## 5. Direction artistique : fidèle à Windows XP, pas « inspirée vaguement »

### Interfaces système

- Reproduire l'esthétique **Luna** : barres de titre bleues, bords en relief, boutons arrondis, dégradés, reflets, contours et espacements d'époque.
- Privilégier le **fond d'écran XP fourni** et les **icônes vintage fournies**, non des pictogrammes modernes génériques.
- Respecter les proportions, la navigation et la structure réelle des logiciels sélectionnés ; les captures d'époque servent de référence.
- Les applications peuvent être adaptées pour accueillir des contenus pédagogiques, mais le vocabulaire graphique doit rester cohérent.

### Écran de connexion : spécification visuelle VALIDÉE

Références fournies : captures d'écran de l'interface de connexion Windows XP.

- **Deux bandes bleu sombre**, une en haut et une en bas.
- Fines séparations avec **trait blanc** et **trait orange en dégradé** entre bandes et zone centrale.
- Centre **bleu plus clair**, avec **lueur / dégradé radial en haut à gauche**.
- **À gauche / centre-gauche :** logo Windows XP et phrase d'invitation à se connecter.
- **Séparateur vertical avec dégradé** entre le bloc de marque et les profils.
- **À droite :** blocs de sélection comprenant une image d'avatar et un nom ; **pas de champ de mot de passe**.
- **Bas gauche :** bouton pour éteindre l'ordinateur (comportement dans la simulation à définir).
- **Bas droite :** crédits intégrés dans un style similaire au texte informatif d'époque.
- Ce menu a été demandé pour intégration au prototype ; vérifier sa présence réelle lors de l'audit.

### Bureau / fenêtres

- Barre des tâches et menu Démarrer inspirés de Windows XP.
- Icônes vintage et papier peint fidèle.
- Fenêtres cohérentes avec le système : ouvrir, déplacer, fermer, réduire et réactiver ; agrandissement et redimensionnement selon choix technique et faisabilité.
- Cohérence du z-index, des états actifs et de la navigation à valider lors du développement.

## 6. Architecture éditoriale : l'application dicte la forme de découverte

| Domaine | Média ou interface retenue | Principe |
| --- | --- | --- |
| Histoire | Internet Explorer 7 / Wikipédia | Pages encyclopédiques sur des sujets de la décennie |
| Typographie | DaFont | Pages de polices et contexte pédagogique intégré |
| Architecture | Google Earth | Carte, lieux cliquables et fiches d'analyse |
| Design / objets | eBay | Objets de design présentés dans une grammaire de petites annonces |
| Cinéma, séries et musique | Windows Media Player | Lecteur et fiches explicatives indépendantes |
| Arts & photographie | DeviantArt | Galerie communautaire d'œuvres, commentaires et analyses |

L'application IE7 peut également servir de **cadre de navigation** vers des sites reconstitués. La relation exacte entre raccourcis du bureau et sites embarqués doit être stabilisée dans la structure technique ; ne pas créer des expériences doublonnées sans réflexion.

## 7. Règles de contenu

Pour chaque sujet ou œuvre, viser les champs pertinents : titre, auteur/créateur, date, contexte historique, description, analyse graphique, supports visuels, crédits, sources et éventuels liens entre sujets. Des variantes de fiche sont possibles selon le logiciel.

Le projet doit **mettre en valeur les œuvres et leur analyse**. Les effets d'interface ne doivent pas masquer les textes, ni forcer une lecture trop étroite dans les panneaux. Prévoir une place suffisante pour les contenus et des images intégrées à la lecture.

## 8. Principes techniques à conserver

- Le prototype historique HTML représente un **acquis de conception** ; il faut le conserver et le mesurer avant tout changement d'architecture.
- Des fonctionnalités ont déjà disparu lors de certaines itérations précédentes ; la **non-régression** est une priorité explicite.
- L'architecture en composants / React et l'outillage Vite ont été **recommandés comme pistes**, mais aucune migration n'est encore autorisée ni considérée réalisée.
- La navigation et les commentaires peuvent avoir des états temporaires ; ne pas introduire de compte utilisateur, d'authentification réelle ou de base de données sans demande explicite.

## 9. Hors périmètre / points non décidés

- Responsive mobile détaillé, accessibilité cible, déploiement final et hébergement : à préciser.
- Liste définitive des références et œuvres par groupe : à recevoir et valider.
- Exhaustivité du comportement historique de chaque logiciel : arbitrer selon l'intérêt pédagogique et la faisabilité.
- Aucune promesse de reproduction exacte d'un vrai système d'exploitation ou de connexion aux services historiques en ligne.
