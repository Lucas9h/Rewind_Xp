# Mission 02 — Référence de non-régression

**18 novembre 2026 · Base `c4c386f` · Edge sous Windows · 1440 × 900**

Lancer `node serve-legacy.mjs` et ouvrir `http://127.0.0.1:4173/`. Les essais ont utilisé trois profils Edge temporaires et des clics sur les commandes de l'interface via DevTools. Les ouvertures initiales de fenêtres en mode libre et quelques contrôles de diagnostic ont utilisé les interfaces JavaScript du prototype. Les sept transitions guidées ont été déclenchées par les actions visibles, sans le raccourci de présentation. Aucune exception JavaScript ni erreur HTTP n'a été relevée pendant les deux parcours principaux.

## Système et exploration libre

| Contrôle | Résultat de référence |
| --- | --- |
| Connexion | Session Invité fonctionnelle. La composition reprend le bleu et le séparateur XP, avec un champ de prénom, deux boutons et un pied centré. La spécification prévoit des profils avec avatar, les bandes et séparations historiques, l'extinction en bas à gauche et les crédits en bas à droite. |
| Bureau | Bliss, icônes d'époque, barre des tâches Luna et filtre CRT visibles. Démarrer s'ouvre. Réduire IE7 puis cliquer sur son bouton réactive la fenêtre. Agrandir remplit la zone au-dessus de la barre, fermer rend le bureau. |
| IE7 | Le portail propose Wikipédia, DeviantArt et eBay. Les boutons Précédente et Suivante rétablissent les pages attendues dans l'essai eBay. Le bouton Nouvel onglet donne deux onglets. Le trio définitif reste ouvert dans les spécifications. |
| DaFont | Accessible dans le parcours guidé. Aucun lien DaFont sur le portail libre. L'appel de navigation IE7 avec l'URL DaFont dirige vers l'article Wikipédia dans l'essai. Le parcours via saisie au clavier reste à vérifier. |
| DeviantArt et eBay | Les tuiles du portail ouvrent les versions libres des deux sites. Le champ de commentaire existe dans la version guidée de DeviantArt et manque sur son accueil libre. Les fiches libres détaillées restent à tester. |
| Photoshop, Earth et WMP | Les trois fenêtres s'ouvrent en mode libre. Le repère MoMA et le zoom Earth ont été actionnés. Le lecteur ouvre son interface historique en mode libre. La lecture d'un fichier audio local reste à tester. |
| Retour et reprise | Après rechargement, l'écran de connexion réapparaît, le mode libre est mémorisé et aucune fenêtre n'est rouverte. La conservation des fenêtres à travers un rechargement reste une décision de conception. |

## Parcours « Dernière sauvegarde »

Depuis un profil neuf, cliquer sur **Session Invité**, puis **Reprendre la session** dans l'assistant.

| Étape | Action et résultat observé |
| --- | --- |
| 1. Wikipédia | Cliquer sur les six entrées du sommaire. Pix indique 1/7 et la boîte de transition permet de rechercher la police. |
| 2. DaFont | Télécharger **Techno 2000** puis confirmer son installation simulée. Photoshop s'ouvre. Recharger à l'étape DaFont puis reprendre rétablit DaFont et les six sections consultées. |
| 3. Photoshop CS2 | Activer la grille et exporter pour le Web. IE7 affiche DeviantArt. |
| 4. DeviantArt | Ajouter un commentaire. La transition vers eBay reste bloquée jusqu'à publication de l'export. Publier puis suivre le lien ouvre eBay. |
| 5. eBay | Ouvrir la fiche de musée depuis l'iMac G4 et cliquer sur la localisation. Google Earth s'ouvre sur MoMA. La fiche de musée est une simulation dont le lien documentaire reste à valider. |
| 6. Google Earth | Cliquer sur le document audiovisuel depuis la scène. Le lecteur guidé s'ouvre. |
| 7. Windows Media Player | Lecture ouvre un message pour le média provisoire. Après consultation des six fiches, terminer la restauration ouvre le bilan. |

Les fenêtres précédentes restent visibles dans la barre des tâches au fil du parcours. Pix affiche les instructions de chaque étape. **Mission** ouvre une boîte et **Notes** ouvre une fenêtre, testée à DaFont. **Avancer** apparaît aussi en mode libre et peut contourner les actions pédagogiques en mode guidé. La destination de cette commande dans une version de présentation reste à valider.

## Bugs et corrections à prioriser après validation

| Priorité | Constat et reproduction | Critère de correction |
| --- | --- | --- |
| P1 | **Réinitialisation incomplète et difficile à trouver.** Au bilan, aucune commande visible de reset n'a été trouvée sur l'écran inspecté. En déclenchant l'action interne `reset` puis le bouton **Réinitialiser**, la clé de session disparaît et le commentaire visiteur est effacé. Le bilan et Pix restent visibles et l'écran de connexion reste masqué jusqu'au rechargement. Le réglage CRT subsiste sous sa propre clé. | Prévoir un point d'entrée visible avec confirmation. Après validation, fermer les fenêtres de la session et revenir à l'entrée. Vérifier que commentaires visiteurs, export et progression disparaissent et que les commentaires d'origine restent présents. |
| P1 | **Couverture différente selon le mode.** DaFont est absent du portail libre testé. Le champ de commentaire de la galerie guidée manque sur l'accueil libre. Les modes utilisent aussi deux vues du lecteur. | Définir les fonctions qui doivent rester accessibles dans les deux modes et vérifier chaque point d'entrée en conservant les vues historiques. |
| P2 | **Pix affiche « Archive 0 / 7 » au bilan.** Terminer les six fiches du lecteur. Recharger et reprendre permet de retrouver le bilan avec le même compteur. | Afficher une fin de parcours cohérente et garder les instructions de Pix à jour. |
| P2 | **Fidélité de la connexion.** Comparer la première capture à la spécification de connexion dans le document de vision. | Valider le placement des profils, des bandes, de l'extinction et des crédits avec la référence historique du groupe. |
| P2 | **Contenus provisoires.** Le MoMA comporte un visuel illustratif, la passerelle depuis l'iMac G4 demande une vérification, le lecteur contient des fiches et un message à la place du média testé. | Intégrer images, sources et médias validés, avec une indication explicite lorsque la lecture est simulée. |

## Risques et limites de la référence

- La navigation et la fermeture utilisent deux moteurs. Rejouer une visite hors ordre, une bascule de mode à mi-parcours, un retour arrière après une passerelle et un redémarrage complet après reset avant toute extraction de code.
- Les essais couvrent une résolution et un navigateur. Le déplacement et le redimensionnement à la souris, l'accès clavier complet, les autres utilitaires du bureau et la comparaison avec des captures historiques originales restent à couvrir.
- Le commentaire visiteur reste présent après un simple rechargement, puis disparaît au reset. Ce comportement correspond au principe documenté. Le maintien des commentaires préremplis après reset devra être contrôlé depuis le parcours visiteur.

## Captures

[Connexion](references/01-connexion.png) · [Bureau libre](references/02-bureau-libre.png) · [Google Earth](references/03-google-earth.png) · [Wikipédia et Pix](references/04-wikipedia-et-pix.png) · [DaFont](references/05-dafont.png) · [Photoshop](references/06-photoshop.png) · [eBay](references/07-ebay.png) · [Médiathèque](references/08-mediatheque.png) · [Bilan](references/09-bilan.png)
