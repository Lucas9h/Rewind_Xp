# 05 — Narration, transitions, liens et mascotte

**Création : 18/11/2026**  
**Statut : document de cadrage à compléter avec les décisions précises du groupe**

> **Attention :** le parcours général est connu, mais les détails du scénario, des transitions, des liens narratifs et de la mascotte ne sont **pas suffisamment attestés dans la synthèse précédente**. Ce document rend ces enjeux visibles sans transformer des suggestions en décisions validées.

## 1. Rôle narratif de Rewind XP

**VALIDÉ dans son principe :** l'interface Windows XP est le **médium de découverte**, et non un décor. L'utilisateur entre dans une époque en utilisant des outils et des conventions numériques qui lui sont associés. Chaque application sert un domaine culturel et donne accès à des recherches contextualisées.

**À concevoir explicitement :** comment les différents thèmes forment une expérience continue plutôt que six sections indépendantes.

## 2. Parcours actuellement établi

1. **Écran de connexion Windows XP** : choix d'un profil sans mot de passe.
2. **Accès au bureau** : point d'entrée dans l'environnement.
3. **Ouverture d'applications** : consultation de pages, fiches, images et analyses selon le logiciel.
4. **Navigation réversible** : retour à l'accueil d'un site lorsque prévu, retour au bureau, passage d'une application à l'autre.

**À DÉFINIR :** présence d'une introduction narrative, déclenchement de la première exploration, objectifs ou indices, progression libre ou guidée, conclusion, éventuel écran de fin et mode de réinitialisation.

## 3. Liens éditoriaux et passerelles entre les thèmes

**Intention à préserver :** relier les œuvres, événements, typographies, lieux, objets et médias des années 2000 lorsqu'un lien historique ou graphique réel le justifie.

**Pistes non validées :**

- Un lien dans une page historique pourrait ouvrir une fiche typographique ou une autre ressource associée.
- Une fiche d'architecture pourrait pointer vers un objet, un créateur ou un mouvement présent ailleurs.
- Une fiche d'œuvre pourrait renvoyer à une référence audiovisuelle ou à un contexte historique.

Ces exemples illustrent le **principe**, pas une liste définitive de liens à implémenter. Les passerelles doivent être documentées dans les contenus (source, destination, justification éditoriale) et ne pas créer d'associations historiques artificielles.

**À DÉFINIR :** nature des liens (internes à un site, entre sites dans IE7, entre fenêtres/applications), texte des appels à explorer, maintien de l'état de la page d'origine et retour arrière.

## 4. Transitions et rythme

Les transitions sont à envisager à plusieurs niveaux :

| Moment | Intention | Statut |
| --- | --- | --- |
| Entrée dans l'expérience / connexion | Installer l'époque et le contexte | Parcours VALIDÉ ; animation/son À DÉFINIR |
| Connexion → bureau | Faire sentir l'entrée dans le système | Comportement visuel À DÉFINIR |
| Bureau → application | Conserver les codes d'ouverture de fenêtres XP | Expérience Windows XP attendue ; détail À AUDITER |
| Application → fiche / site | Assurer une lecture compréhensible | Navigation à définir selon chaque application |
| Passage d'une thématique à une autre | Donner du sens au lien narratif | Intention à approfondir ; mécanique À DÉFINIR |
| Retour / fermeture / réinitialisation | Garantir un parcours réversible | Principe de retour VALIDÉ ; états précis À DÉFINIR |

Ne pas imposer d'animation longue, de séquence bloquante, de narration automatique, d'effet sonore ou de mécanisme de progression sans validation. Préserver la fluidité et la lisibilité.

## 5. Mascotte ou figure d'accompagnement

**Sujet explicitement signalé par le responsable du projet :** une mascotte fait partie des éléments narratifs évoqués au cours de la conception. **La documentation précédente ne donne pas de définition exploitable de ses caractéristiques** ; elles sont donc en attente de récupération / confirmation.

À confirmer avant implémentation :

- **Identité et références** : nom, apparence, inspirations et degré de proximité avec les assistants d'époque.
- **Rôle** : accueillir, donner des indices, relier des thèmes, aider à naviguer, ou autre.
- **Présence** : permanente, contextuelle, au lancement uniquement, ou déclenchée par l'utilisateur.
- **Ton** : langage, humour, registre pédagogique ; textes exacts des interventions.
- **Interactions** : clics, bulles d'aide, dialogues, fermeture et possibilité de masquer.
- **Déclencheurs** : ouverture de session, changement d'application, découverte d'une référence, inactivité, etc.
- **Accessibilité** : ne pas masquer les contenus ni gêner la navigation ; fermeture / désactivation si nécessaire.

**Règle :** ne pas inventer une mascotte (notamment ne pas ajouter Clippy ou un personnage générique par défaut) en l'absence de décision. Si une mascotte existe déjà dans le prototype, **l'auditer et la documenter avant toute modification**.

## 6. Contraintes de conception et développement

- Le récit sert la **compréhension de la culture graphique** ; il n'écrase jamais les œuvres et analyses.
- Favoriser une **exploration libre avec des suggestions** plutôt qu'une progression imposée, sauf arbitrage ultérieur.
- Prévoir, dans la future structure des données, la possibilité de créer des **relations éditoriales** entre références ; n'enregistrer aucune relation sans justification.
- Définir, avant de coder, un schéma des états de l'expérience : démarrage, session, fenêtres, applications, progression éventuelle, reset.
- Les étapes documentées sont des **spécifications / intentions**, pas des preuves de réalisation.

## 7. Décisions à récupérer / arbitrer avec le groupe

1. Quel est le **fil rouge narratif exact** (objectif du visiteur, enjeu, éventuel scénario) ?
2. Existe-t-il une **mascotte déjà conçue** (nom, dessin, fonction, dialogues, références) ?
3. Quelles sont les **transitions prévues** entre le login, le bureau, les logiciels et les chapitres ?
4. Quels **liens inter-applications** sont déjà imaginés ou validés ?
5. Que doit-il se passer à la **fin de l'exploration** ou lors d'une réinitialisation ?

Après confirmation, inscrire les arbitrages dans `03-decisions-et-evolutions.md`, marquer les points confirmés **VALIDÉ**, et conserver cette page comme spécification de référence pour Codex.
