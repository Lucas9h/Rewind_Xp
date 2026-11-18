# AGENTS.md — Rewind XP

> **Fichier de référence unique pour Codex et les autres agents de développement.**
> Projet : Rewind XP — expérience interactive sur la culture graphique des années 2000.
> Dernière consolidation : 18 novembre 2026.
> Ce fichier contient des **règles de travail**, pas une preuve de l'état technique du projet.

## 1. Mission

Développer et fiabiliser **Rewind XP**, une expérience pédagogique et narrative accessible dans un navigateur, présentée au travers d'un **environnement Windows XP fidèlement reconstitué**. Chaque application d'époque devient une manière d'explorer des recherches documentées sur la culture graphique des années 2000.

Le projet ne se limite **ni à un thème CSS rétro ni à une collection de maquettes statiques** : il combine système interactif, contenus éditoriaux, navigation et un fil narratif à construire.

## 2. Sources à consulter et ordre de priorité

Avant la première intervention ou toute tâche transversale, lire :

1. `docs/README.md` — index et statut des documents.
2. `docs/briefs-officiels/` — consignes originales des enseignants **si présentes** ; ne pas inventer leur contenu si elles manquent.
3. `docs/01-vision-du-projet.md` — concept, parcours et direction artistique.
4. `docs/02-applications.md` — comportement attendu des logiciels.
5. `docs/05-narration-transitions-et-mascotte.md` — récit, passerelles, transitions et mascotte.
6. `docs/03-decisions-et-evolutions.md` — décisions validées et leur évolution.
7. `docs/04-etat-et-roadmap.md` — état technique connu et travail à venir.
8. Le code réel, les assets, les références visuelles et l'ancien prototype dans `legacy/` lorsqu'ils sont disponibles.

Pour une petite correction, relire au minimum ce fichier, les sections pertinentes de la documentation et les fichiers concernés. Pour un changement de parcours, d'application, d'architecture ou de direction artistique, relire **l'ensemble** des documents ci-dessus.

**Hiérarchie en cas de désaccord :** consignes pédagogiques originales pour les obligations du cours ; consignes explicites les plus récentes du responsable du projet pour les décisions créatives ; journal des décisions et spécifications pour les arbitrages existants. Le **code observé et les tests** établissent uniquement ce qui fonctionne réellement, pas ce qui est souhaité. En cas de conflit, le signaler avant de trancher.

## 3. Statuts à ne jamais confondre

- **VALIDÉ** : décision de conception explicite, **pas nécessairement codée**.
- **PROPOSÉ** : piste à discuter, ne pas traiter comme une exigence.
- **À DÉFINIR** : comportement, contenu ou apparence non encore arrêtés ; ne pas inventer de décision.
- **À VÉRIFIER** : élément mentionné dans les échanges, mais non confirmé dans le dépôt actuel.
- **FAIT ET TESTÉ** : vérifié dans le projet actuel avec une preuve ou un test reproductible.

Ne jamais annoncer qu'une fonction est terminée uniquement parce qu'elle figure dans le cahier des charges ou dans un prototype plus ancien.

## 4. Direction artistique et fidélité historique

- Reproduire avec soin **Windows XP / Luna** : proportions, barres de titre, boutons, reliefs, contours, dégradés, reflets, typographies, états et interactions d'époque.
- Reprendre en priorité les **captures de référence, icônes vintage, fond d'écran et autres assets fournis** ; ne jamais les remplacer silencieusement par des icônes modernes ou une UI générique.
- Les logiciels reconstitués doivent respecter leurs références visuelles historiques tout en laissant suffisamment de place aux **textes, images, légendes et analyses**.
- Le menu de connexion demandé reprend les **bandes bleues sombres**, séparations blanc/orange, centre bleu lumineux, bloc Windows XP, séparateur vertical, profils image + nom **sans mot de passe**, extinction en bas à gauche et crédits en bas à droite.
- Ne pas ajouter de design contemporain, de composants « flat » ou d'effets fantaisistes qui contredisent l'époque sans validation.

## 5. Système, applications et contenus

Préserver / développer progressivement : écran de connexion, bureau, menu Démarrer, barre des tâches, fenêtres (ouverture, focus, déplacement, réduction, fermeture) et navigation cohérente.

Correspondances éditoriales :

- **Internet Explorer 7 / Wikipédia** → histoire ; accueil et trois favoris envisagés, retour à l'accueil, barre d'outils historiquement fidèle. Les onglets et la liste définitive des favoris restent à préciser.
- **DaFont** → typographie ; fiches de polices avec explications complémentaires.
- **Google Earth** → architecture ; carte / lieux cliquables, fiches lisibles avec images intégrées ; attention aux régressions de rendu de la carte.
- **eBay** → design et objets ; fiches de type annonces enrichies d'analyse culturelle.
- **Windows Media Player** → cinéma, séries, musique ; lecteur et fiches explicatives indépendantes.
- **DeviantArt** → arts et photographie ; galerie et fiches d'œuvres analysées, commentaires préexistants et commentaires visiteurs **temporaires, effacés à la réinitialisation**.

Séparer autant que possible les **données de recherche** (œuvres, auteurs, dates, textes, sources, images) du **code des interfaces**. Aucun achat réel, aucune authentification réelle ni service historique externe n'est présumé nécessaire.

## 6. Narration, transitions, passerelles et mascotte

**Ce volet fait partie du projet, même si ses détails ne sont pas encore tous fixés.** Consulter `docs/05-narration-transitions-et-mascotte.md` avant toute modification du parcours ou de la navigation.

- Préserver l'idée d'un **fil rouge narratif** reliant écran de connexion, bureau, exploration des applications et découvertes culturelles.
- Prévoir les **passerelles entre contenus, thématiques et applications** comme un sujet de conception à part entière, pas comme une simple liste de raccourcis isolés.
- Tenir compte des **transitions** (ouverture de session, lancement de fenêtre, passage entre contenus/applications, retour) sans imposer des animations ou une progression forcée non validées.
- La **mascotte / figure d'accompagnement** a été évoquée : son identité, son look, son ton, son emplacement et son comportement doivent être **confirmés**, pas inventés par Codex.
- Le parcours doit rester compréhensible, **réversible** et compatible avec une exploration libre ; les liens narratifs ne doivent pas enfermer le visiteur.
- Ne pas supprimer ou simplifier ces éléments parce qu'ils ne sont pas encore présents dans le code. Ne pas les implémenter arbitrairement : proposer des options si la décision manque.

## 7. Préservation de l'existant — règle majeure

- **Auditer avant de modifier.** L'ancien prototype HTML et ses assets dans `legacy/` sont une référence à préserver intégralement.
- Éviter toute **régression** : l'écran XP, les interactions système, IE7, Google Earth et les autres modules déjà présents doivent être vérifiés après une modification pertinente.
- Ne pas refaire l'ensemble du site ni réduire des fonctionnalités à des faux écrans pour faciliter une migration.
- **React / Vite ne sont qu'une piste technique**, pas une migration validée. Toute refonte d'architecture exige un inventaire de l'existant, un plan de migration, des critères de non-régression et l'accord du responsable.
- Préserver les chemins des ressources ou prévoir une migration vérifiée des références aux fichiers.

## 8. Méthode pour chaque tâche

1. **Inspecter** : lire les documents pertinents, les fichiers affectés et l'état Git ; identifier les comportements déjà existants.
2. **Qualifier** : distinguer les demandes validées des points à définir. En cas d'ambiguïté structurante, présenter une proposition concise et attendre l'arbitrage.
3. **Planifier** : définir un changement limité, les risques et les vérifications nécessaires.
4. **Implémenter** : privilégier des composants clairs, modulaires et réutilisables, sans dépendance superflue ; respecter les conventions détectées dans le dépôt.
5. **Tester** : effectuer les contrôles disponibles (build, tests, lint, navigation manuelle si possible) et signaler ceux qui n'ont pas pu être réalisés.
6. **Rendre compte** : résumer les fichiers modifiés, le résultat, les tests, les risques et les prochains points à valider.

Ne pas lancer d'installation majeure, supprimer des fichiers en masse, faire de commit, pousser vers GitHub ou publier le projet sans demande / validation explicite. Ne pas modifier le README public ni les **briefs originaux** sans instruction explicite.

## 9. Mise à jour de la mémoire du projet

- Après **validation d'une nouvelle décision** : l'ajouter à `docs/03-decisions-et-evolutions.md` avec date, statut, motif et impact ; mettre à jour les spécifications concernées.
- Après **audit ou test technique** : mettre à jour `docs/04-etat-et-roadmap.md`, avec date, constat et preuve / mode de reproduction.
- Après **arbitrage narratif** : mettre à jour `docs/05-narration-transitions-et-mascotte.md` avant de développer son comportement.
- Ne jamais convertir automatiquement une proposition de Codex en décision « VALIDÉE ».

## 10. Critères de qualité

Une tâche est réussie si elle conserve la fidélité graphique, le fonctionnement du prototype, la lisibilité des contenus historiques et la continuité du parcours. Chaque interaction visible doit avoir un comportement cohérent ; les fonctions simulées doivent l'être clairement. Une fonctionnalité annoncée comme testée doit l'avoir été réellement.
