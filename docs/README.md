# Rewind XP — Reprendre le projet

**État de la V1 au 18 novembre 2026**

Rewind XP est une expérience pédagogique sur la culture graphique des années
2000. Le visiteur explore les recherches du groupe à travers des interfaces
inspirées de logiciels d'époque. Les règles de travail sont dans
[AGENTS.md](../AGENTS.md).

## Lancer le projet

Depuis la racine du dépôt, lancer `node v1/serve.mjs` et ouvrir
`http://127.0.0.1:4174/`. Node.js suffit. Arrêter avec Ctrl+C.
Lancer les tests avec `node --test v1/desktop/windows.test.mjs`.

Le prototype de référence se lance séparément avec `node serve-legacy.mjs`
sur `http://127.0.0.1:4173/`. Les corrections courantes concernent la V1.

## Ce qui fonctionne dans la V1

- Démarrage animé, connexion par nom ou en invité, bureau et console d'arrêt.
  Les commandes du bureau distinguent fermeture de session, arrêt et redémarrage.
- Bureau avec fond Bliss, menu Démarrer, barre des tâches, horloge, fenêtres et
  accessoires. L'Explorateur navigue dans la même fenêtre avec Précédente et
  Suivante.
- Effet CRT permanent sur les quatre écrans. Le réglage d'intensité est
  disponible dans la zone de notification et conservé localement.
- IE7, Google Earth, Photoshop et Windows Media Player sont présents sous
  forme de raccourcis dans la V1. Le parcours narratif et Pix sont à explorer
  dans le prototype historique. Le statut de chaque fonction est détaillé
  dans la roadmap et les audits liés plus bas.

## Où intervenir

| Emplacement | Responsabilité |
| --- | --- |
| [v1/session.mjs](../v1/session.mjs) | Transitions de session et échanges avec le bureau chargé dans une iframe. |
| [v1/design-system.css](../v1/design-system.css) | Typographie, couleurs de texte et focus partagés entre la page et le bureau. |
| [v1/desktop/desktop.js](../v1/desktop/desktop.js) | Registre des applications, menus, raccourcis et accessoires. |
| [v1/desktop/windows.mjs](../v1/desktop/windows.mjs) | Fenêtres, focus, barre des tâches et libération des ressources à la fermeture. |
| [v1/desktop/apps/](../v1/desktop/apps/) | Styles hérités pour les futures intégrations d'IE7, Wikipédia et Google Earth. |
| [public/assets/](../public/assets/) | Icônes du kit, logo Windows XP, fond Bliss et police VT323 avec sa licence. Les URLs consommées par la V1 sont définies dans [son serveur local](../v1/serve.mjs). |

Pour continuer, intégrer une application à la fois à partir de `legacy/`,
en conservant le registre et le gestionnaire de fenêtres. Une application
peut utiliser `mount(win, signal)` pour connecter son interface et libérer
ses ressources à la fermeture. Rejouer les transitions de session et les
interactions de fenêtres après chaque intégration. Le scénario et l'identité
finale de Pix restent à arbitrer avec le groupe.

## Références et décisions

- [Briefs officiels](briefs-officiels/) et [vision du projet](01-vision-du-projet.md)
- [Spécifications des applications](02-applications.md) et [journal des décisions](03-decisions-et-evolutions.md)
- [Roadmap et état testé](04-etat-et-roadmap.md) et [cadrage narratif](05-narration-transitions-et-mascotte.md)
- [Référence de non-régression Legacy](06-reference-non-regression.md) et [audit visuel V1](07-audit-visuel-v1.md)
