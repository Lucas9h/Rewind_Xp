# 04 — État réel, vérifications et roadmap

**Date : 18/11/2026 — ce document est initialisé avant audit du dépôt.**

## Légende

- ✅ **Fait et testé** : démontré dans le dépôt actuel.
- 🟡 **Évoqué / présent dans des versions passées, à vérifier** : existence ou qualité non confirmée.
- ⚪ **Prévu** : fonctionnalité du cahier des charges sans preuve d'implémentation.
- ❓ **À décider** : demande ou option non définitivement arbitrée.

## État connu aujourd'hui

| Élément | État | Commentaire |
| --- | --- | --- |
| Dépôt GitHub `Rewind_Xp` | 🟡 | Déclaré créé avec un README ; à constater dans le dépôt local |
| Installation Node.js / VS Code / GitHub / Codex | 🟡 | Déclarée faite ; à tester via le terminal |
| Prototype HTML Windows XP | 🟡 | Plusieurs versions de travail ont existé ; copie finale à importer dans `legacy/` |
| Écran de connexion XP | 🟡 | Maquette / intégration demandées le 17 novembre ; fonctionnement à vérifier |
| Bureau XP / icônes / fond d'écran | 🟡 | Déjà travaillés ; vérifier le rendu exact et les chemins d'assets |
| IE7 / barre de navigation / accueil | 🟡 | Travaux réalisés par itérations ; état actuel à auditer |
| Google Earth / carte / fiches | 🟡 | Travaux avec problèmes signalés ; vérifier la carte et les panneaux |
| DaFont / eBay / Windows Media Player / DeviantArt | ⚪ | Fonctionnalités attendues ; ne pas supposer qu'elles existent dans le dernier HTML |
| Contenus définitifs des groupes | ⚪ | Collecte / consolidation à organiser |
| React / Vite | ❓ | Stack proposée, pas décidée et pas installée par défaut |
| Déploiement final | ❓ | Hébergement et modalités encore à préciser |

## Jalon 0 — Installer la documentation avant de modifier le code

- [ ] Copier les **trois briefs officiels originaux** dans `docs/briefs-officiels/`.
- [ ] Copier / valider les fichiers Markdown de contexte et `AGENTS.md`.
- [ ] Déposer l'ancienne version HTML et les ressources associées dans `legacy/`.
- [ ] Ajouter ou référencer les captures d'interface validées (login, IE7, Google Earth, WMP, XP).
- [ ] Demander à Codex de lire les briefs et de remonter tout écart entre les consignes officielles et la documentation.

## Jalon 1 — Audit technique et sauvegarde de référence

- [ ] Recenser les fichiers, dépendances, ressources et problèmes éventuels de chemins.
- [ ] Lancer le prototype **sans le réécrire**.
- [ ] Capturer le rendu ou dresser une checklist des fonctionnalités effectivement opérationnelles.
- [ ] Tester connexion, bureau, fenêtres, barre des tâches, IE7, Google Earth, autres applications présentes.
- [ ] Documenter précisément les régressions et lacunes.
- [ ] Effectuer un commit de référence du prototype stable (avec accord du responsable).

## Jalon 2 — Architecture et système Windows XP

- [ ] Proposer et faire valider l'architecture (composants, données, gestion des fenêtres, assets).
- [ ] Sécuriser et finaliser l'écran de connexion XP.
- [ ] Sécuriser le bureau, la barre des tâches, le menu Démarrer et la gestion des fenêtres.
- [ ] Vérifier la cohérence visuelle et fonctionnelle avant ajout de contenu.

## Jalon 3 — Applications et contenus

- [ ] IE7 / Wikipédia : barre fidèle, accueil, favoris, navigation, contenus Histoire.
- [ ] DaFont : fiches typographiques contextualisées.
- [ ] Google Earth : carte opérationnelle, lieux, images et analyses.
- [ ] eBay : fiches objets et contextualisation design.
- [ ] Windows Media Player : lecteur et fiches indépendantes.
- [ ] DeviantArt : œuvres, analyses et commentaires temporaires.
- [ ] Intégration des recherches de groupes et validation des sources.

## Jalon 4 — Finalisation

- [ ] Tests de non-régression après intégration de toutes les applications.
- [ ] Vérifications accessibilité / ergonomie à la cible retenue.
- [ ] Crédits, sources, mentions d'images et responsabilités sur les contenus.
- [ ] Démonstration, publication et documentation d'installation.

## Audit du 18 novembre 2026

### Lancement local

Depuis la racine, exécuter `node serve-legacy.mjs`, puis ouvrir
`http://127.0.0.1:4173/`. Arrêter avec Ctrl+C. Dans PowerShell, le port peut être
choisi avec `$env:PORT = '4174'` avant le lancement.

Le serveur Node.js utilise les modules intégrés. Il sert le HTML d'origine et
associe ses chemins historiques de fond d'écran et de favicon aux fichiers de
`public/assets/`. Le prototype associe HTML, CSS et JavaScript intégrés, Canvas,
un moteur XP historique (`XPOriginal`), un registre (`XP_DATA`), un moteur de
scénario et un pont de synchronisation (`XPV1Bridge`, `XP2009Vintage`).

### Inventaire et vérifications

| Périmètre | Résultat |
| --- | --- |
| Serveur | Route racine en 302, HTML ouvert sous Edge, fond d'écran JPEG et favicon PNG en 200. |
| Système | Session invité, Pix, Démarrer, réduction et réactivation depuis la barre des tâches testés. Déplacement, redimensionnement, agrandissement, fermeture et reprise de session restent à couvrir en test. Le code inclut aussi une option de rendu CRT. |
| IE7 / Wikipédia | Portail, article Années 2000, précédent/suivant et retour à l'accueil testés. Favoris, recherche, barre d'adresse et onglets présents dans le code. |
| DaFont | Catalogue, spécimens, fiches et installation simulée de Techno 2000 présents dans le code. |
| Photoshop CS2 | Calques, grille et manipulation présents dans le code. Export Canvas JPEG et passage à DeviantArt testés depuis le jalon Photoshop. |
| DeviantArt | Galerie, fiches, favoris, commentaires, publication locale de l'export et lien vers eBay présents dans le moteur narratif. |
| eBay | Annonces et vues d'objets, fiche iMac G4, étape de musée simulée et lien de localisation présents dans le moteur narratif. |
| Google Earth | Globe Canvas peint (756 × 540 au test), sélection MoMA et fiche visibles sous Edge. Le code prévoit recherche, déplacement, zoom, repères et liaison vers le lecteur. |
| Windows Media Player | Bibliothèque guidée de six fiches. Le bouton Lecture ouvre une boîte d'information pour le premier exemple. Le lecteur historique prévoit aussi l'ouverture d'un fichier audio local. |
| Narration | Pix, mission, notes, restauration guidée, exploration libre et écran de bilan sont présents. Le raccourci de présentation a parcouru les sept étapes puis le bilan. Les conditions de déblocage restent à vérifier de bout en bout en jouant le parcours normalement. |

Reproduction des essais Edge avec un profil neuf à 1440 × 1000 : cliquer
sur « Session Invité », ouvrir Démarrer, puis IE7. Ouvrir Années 2000, utiliser
Précédente, Suivante et Accueil, réduire la fenêtre et cliquer sur son bouton de
barre des tâches. Ouvrir Google Earth et sélectionner MoMA. En test automatisé,
les points d'entrée `XPOriginal.openApp`, `earthGotoId` et `browser.navigate`
ont servi à ouvrir les vues. Utiliser Alt+P pour reproduire l'enchaînement de
présentation. Depuis Photoshop en mode guidé, déclencher l'export pour vérifier
l'arrivée sur DeviantArt. Les essais de ces parcours n'ont signalé ni exception
JavaScript ni réponse HTTP d'erreur. Captures comparatives à constituer.

### Ressources et écarts

- **Graphisme.** 289 PNG dans le kit d'icônes et un JPEG de fond d'écran dans
  `public/assets/`. Le HTML intègre aussi des icônes, un fond, une texture de
  globe et des illustrations de démonstration en URI de données. Aucun fichier
  dans `public/assets/images/`. Captures historiques, médias finaux, crédits et
  visuels des groupes restent à réunir.
- **Connexion.** L'écran actif demande un nom, avec un bouton Invité. Il diffère
  de la sélection visuelle des profils et des zones extinction et crédits prévues.
- **Ressources dormantes.** Le moteur secondaire référence `assets/world-map.jpg`
  et `assets/bliss-fallback.svg`, absents du dépôt. Le globe historique testé
  utilise sa propre texture embarquée. Prévoir le contrôle de ces chemins avant
  toute réactivation des vues secondaires.
- **État et synchronisation.** Deux moteurs pilotent la navigation et les fenêtres.
  Le pont rafraîchit certains contenus et choisit des vues selon le mode, notamment
  pour DeviantArt, eBay et le lecteur. Tester les bascules et les visites hors ordre.
  La sauvegarde locale inclut progression, export, favoris et commentaires.
  Le code de reset efface la clé de session. Vérifier que les commentaires
  préremplis restent présents et que les contributions disparaissent après reset.
- **Contenu.** Les spécimens, PSD, visuels et médias sont en partie provisoires.
  Vérifier en particulier la relation iMac G4–MoMA avant d'en faire une passerelle
  documentaire. Les fiches architecture sont à enrichir en texte et en images.
- **Sources du cours.** Deux PDF disponibles et lus. Le sujet écrit annonce le
  11 décembre 2026, la présentation situe l'oral au 15 janvier 2027 avec une date
  susceptible de changer. Le nombre d'époques annoncé diffère aussi (six contre
  douze). L'index `docs/README.md` et le troisième brief attendu ne sont pas
  présents dans le dossier audité. Le sujet écrit demande un dossier de
  présentation et un oral de dix minutes. Confirmer la place de la démo web dans
  le rendu, puis couvrir les six disciplines, l'histoire obligatoire, les sources
  et les crédits. Le prototype propose Photoshop pour le graphisme.

### Architecture proposée, à valider

1. Garder `legacy/` comme référence exécutable. Constituer des captures et une
   checklist par mode. Rejouer en priorité connexion, fenêtres, navigation IE7,
   sélection des lieux, passage d'une étape à l'autre et réinitialisation.
2. Dans une version de travail distincte, extraire d'abord les données de
   `XP_DATA` en conservant leurs identifiants. Prévoir sources, crédits, visuels,
   statuts et relations éditoriales justifiées. Conserver les URLs de ressources.
3. Réutiliser le gestionnaire de fenêtres historique comme point d'entrée unique.
   Isoler progressivement le système, les adaptateurs d'applications, l'état de
   session et les événements de parcours. Versionner la sauvegarde si sa
   structure change et vérifier sa lecture avec une session existante.
4. Valider avec le groupe le statut de « Dernière sauvegarde — 2009 », le rôle de
   Pix, les transitions, le caractère facultatif des jalons et le comportement de
   la fin et du reset. Garder l'exploration réversible et vérifier le retour vers
   la vue d'origine lors des passerelles.
5. Intégrer les contenus sourcés par application, en commençant par Histoire et
   Typographie. Rejouer les parcours après chaque lot et comparer les vues
   aux références. Réexaminer l'outillage une fois le socle stabilisé.

> Ne pas marquer les tâches terminées sur simple lecture du cahier des charges. Le statut ✅ requiert une vérification effective.
