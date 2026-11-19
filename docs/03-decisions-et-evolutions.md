# 03 — Journal des décisions et des évolutions

**Synthèse établie le 18/11/2026 à partir des échanges de conception.**  
Objectif : empêcher les retours en arrière involontaires et expliquer *pourquoi* certains choix ont été faits.

## Octobre 2026 — Du diaporama au système interactif

- **23 octobre — VALIDÉ :** thème principal du groupe : les **années 2000**. Le projet de Culture Graphique est collectif, avec productions croisées entre groupes. Histoire appartient au cadre de base, Typographie a été attribué comme premier thème supplémentaire.
- **23 octobre — orientation :** plutôt qu'un simple support de slides, utiliser les interfaces numériques d'époque comme moyens de consulter les contenus : Wikipédia dans Internet Explorer, DaFont pour les polices, Google Earth pour l'architecture et eBay pour les objets de design.
- **23 octobre — exploration :** VLC ou Windows Media Player pour l'audiovisuel ; Paint ou DeviantArt pour les arts. Il fallait préserver une place importante pour les textes explicatifs.
- **29 octobre — mise en prototype :** priorité à la fidélité de Windows XP ; appui sur un UI kit Figma, des icônes Windows XP fournies et un fond d'écran de référence. Problème identifié : le rendu peut être trop éloigné des composants Figma si les détails sont approximés.

## Début novembre 2026 — Arbitrages sur les applications

- **1er novembre — VALIDÉ :** cinéma / séries / musique : **lecteur avec fiches explicatives indépendantes**.
- **1er novembre — VALIDÉ :** arts / photographie : **sélection variée**, organisée comme une galerie communautaire ; les œuvres et leurs analyses restent prioritaires.
- **1er novembre — VALIDÉ :** fiches d'œuvres avec commentaires préexistants et possibilité pour les visiteurs d'ajouter leur commentaire.
- **1er novembre — VALIDÉ :** commentaires de visiteurs **non persistants après réinitialisation** de l'expérience.
- **1er novembre — documentation demandée :** un document complet à destination de l'IA / développement et un document simple expliquant les contenus à fournir par chaque groupe.
- **4 novembre — VALIDÉ :** passage à une interface **Internet Explorer 7** ; page d'accueil donnant accès à trois favoris, possibilité de revenir à cette page. L'idée d'onglets a été discutée, sans formalisation finale.
- **4 novembre — exigence graphique :** barre de navigation d'IE7 très fidèle à la référence, notamment les boutons précédent / suivant brillants et leurs dégradés.
- **4 novembre — Google Earth :** améliorer la place du texte, insérer des images au sein des fiches et corriger les problèmes observés de carte / déformation ; ne pas perdre les icônes vintage.

## Mi-novembre 2026 — Parcours, connexion, livraison

- **6 novembre — livrable collectif :** besoin d'un support partagé présentant l'idée années 2000 et de chapitres à compléter par les groupes, avec direction artistique Windows.
- **17 novembre — projet de présentation :** rappels sur l'importance de **Windows Media Player** et de la fidélité des captures d'applications d'époque.
- **17 novembre — V1 du site :** volonté de réutiliser les éléments de l'ancien prototype plutôt que de reconstruire une version appauvrie ; Windows XP, Internet Explorer et Google Earth doivent être préservés.
- **17 novembre — VALIDÉ (connexion) :** référence de l'écran de login XP : bandes bleu sombre en haut/bas, traits blanc/orange dégradés, partie centrale bleue lumineuse, identité Windows XP à gauche, séparateur dégradé, profils image + nom **sans mot de passe**, extinction en bas à gauche, crédits en bas à droite.
- **18 novembre — nom :** **Rewind XP** retenu dans les échanges ; création d'un dépôt GitHub avec README rétro.
- **18 novembre — outillage :** Node.js, VS Code, GitHub et extension Codex installés et connectés selon le responsable. Le dossier local annoncé est `C:\Users\Lucas\Documents\GitHub\Rewind_Xp`.
- **18 novembre — méthode de travail :** cloner / ouvrir le dépôt, importer **sans l'écraser** le prototype existant, ajouter un `AGENTS.md` et la documentation, faire auditer l'existant, puis seulement envisager une architecture plus modulaire.
- **18 novembre — documentation :** décision de fournir à Codex le **brief original du professeur** et un **dossier de contexte complet**, afin qu'il comprenne les décisions passées et les plans futurs.

## V1 — Socle de session

**18 novembre 2026 — VALIDÉ.** Créer une V1 séparée du prototype historique.
Commencer par le démarrage animé, le choix du profil et le bureau. Ajouter
ensuite les applications une par une, puis le parcours narratif et les
transitions. Prévoir les points de passage dès le socle de session.

**19 novembre 2026 — VALIDÉ.** Rapprocher le cadre IE7 de la capture
fournie par le responsable, avec des barres compactes, un menu Outils
et une barre d'état avec zoom. Conserver l'accueil Rewind XP au centre
pour ce premier lot.

**19 novembre 2026 — VALIDÉ.** Pour l'article Wikipédia, prendre
l'interface historique comme référence et intégrer les visuels et
les expériences interactives dans le corps de l'article.

## Décisions non encore verrouillées

- Architecture React / Vite vs poursuite du HTML existant : **proposition**, pas migration actée.
- État exact des fonctions présentes dans la dernière version HTML : à auditer.
- Liste complète des trois favoris IE7 et comportement définitif des onglets.
- Liste définitive des œuvres, lieux, objets et typographies ; dépend des contributions des groupes.
- Hébergement, contraintes responsive et modalités de démonstration finale.

## Comment compléter ce journal

Pour chaque nouvelle décision, ajouter : `DATE — STATUT — Objet : décision, raison, conséquences sur l'interface et la technique.` Ne transformer une idée en « VALIDÉ » qu'après une confirmation explicite.
