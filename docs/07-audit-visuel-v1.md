# Audit visuel de la V1

**18 novembre 2026 · Démarrage, connexion, bureau et arrêt**

Les mesures ci-dessous décrivent la V1 avant correction. Les résultats du
nouvel essai figurent dans la section [Vérification après correction](#vérification-après-correction).

Les écrans ont été inspectés dans Edge avec un profil neuf, le zoom à 100 %
et le préréglage CRT 2000. Les dimensions sont en pixels CSS. La comparaison
utilise 1440 × 820 pour la référence de connexion fournie, 640 × 480 pour le
format 4:3 et 375 × 750 pour contrôler le passage au bureau sur petit écran.
Les couleurs prélevées dans les captures sont des échantillons ponctuels.

## Démarrage

- Fond noir, lettrage blanc, drapeau couleur et trois blocs bleus reprennent
  les principaux repères de XP. Le bas vide correspond à la demande du
  projet. [Capture de Windows XP SP2](https://commons.wikimedia.org/wiki/File:Windows_XP_SP2_boot_screen.png)
- À 640 × 480, le logo V1 mesure environ **250 × 147 px** et la barre
  **124 × 15 px**, proches des tailles de la référence fournie. La barre
  commence à y ≈ 337 px, environ **14 px plus haut**. Le logo V1 est centré
  à x = 320, tandis que celui de la référence est légèrement décalé à droite.
- À 1440 × 820, le logo atteint **464 × 274 px** et la barre **240 × 15 px**.
  Les carrés restent à **9 × 9 px**. Le motif occupe environ 23 % de la barre
  en 4:3 et 12 % en format large. Le défilement paraît proportionnellement
  plus fin sur un grand écran. La boucle dure 1,15 s et la connexion
  s'ouvre au bout de 2,2 s en mode standard.

## Connexion

- À 1440 px de large, le séparateur est à x = 720 dans la V1 et dans la
  référence fournie. Le logo V1 mesure **255 × 151 px** et débute vers
  **(417, 283)**, contre environ **(430, 257)** dans la référence. La phrase
  apparaît une trentaine de pixels plus bas. Le champ commence à x ≈ 883
  dans les deux cas, mais à y ≈ 386 dans la V1 contre y ≈ 360 dans la
  référence. Il mesure **224 × 36 px**, contre environ **200 × 40 px**.
- Le formulaire unique avec nom, flèche verte et lien invité suit la
  demande actuelle. XP proposait des comptes existants et pouvait demander
  un mot de passe après sélection. La suppression du deuxième profil
  modifie naturellement l'équilibre vertical de la colonne droite.
  [Capture de connexion XP Professionnel](https://guidebookgallery.org/pics/gui/startupshutdown/login/winxppro.png)
- Le bleu central V1 est **#4080CA** hors halo et avant filtre. Une zone
  unie de la capture historique 800 × 600 donne **#5A7EDC**, plus pervenche.
  La référence large fournie est visuellement plus proche de la V1.
  Sur une zone à droite de la V1, le CRT donne **#3265A8** dans la capture.
  Le lien invité est à **13,6 px**, avec un contraste nominal d'environ
  **3,8:1** sur le bleu de base, avant ombre et filtre.
- À 640 × 480, le pied descend jusqu'à **y ≈ 490 px** et produit un
  défilement vertical. À 375 × 750, le formulaire empilé tient dans la largeur.

## Bureau

- Bliss, le bouton Démarrer vert, les dégradés bleus et les deux colonnes
  restituent les repères Luna. Le placement des raccourcis et les
  programmes reflètent le projet. Le wallpaper suit le format du
  navigateur, avec recadrage. La trame CRT ressort davantage sur les petits
  libellés que sur une capture numérique d'époque.
  [Guide Microsoft de 2001, p. 7 et 11–12](https://tech-insider.org/windows/research/acrobat/0108-b.pdf) · [Capture XP Professionnel](https://guidebookgallery.org/pics/gui/desktop/full/winxppro.png)
- La barre des tâches mesure **30 px** et les libellés **11 px**. Le menu
  Démarrer mesure **380 × 478 px**. À 640 × 480, son sommet est à
  **y = −28 px** et l'en-tête est coupé. Le message destiné aux petits
  écrans apparaît aussi dans ce format 4:3.
- À 375 px, le bureau conserve un minimum de **570 px** dans l'iframe.
  La zone de notification commence à **x ≈ 427 px**, hors champ.

## Arrêt

- À 1440 × 820, le bloc centré mesure **240 × 107 px**. Le titre VT323
  mesure **40 px** et le texte du bouton **23,2 px**. Les glyphes matriciels
  et le rectangle clair rappellent la photo de récupération fournie.
  Celle-ci montre un menu de démarrage après échec avec du texte aligné à
  gauche et un choix surligné. Le centrage et le bouton unique sont des
  adaptations demandées. La fin d'arrêt historique archivée utilise un
  logo et une phrase plus discrète sur fond noir.
  [Contexte du menu de récupération](https://learn.microsoft.com/en-gb/answers/questions/2541230/windows-did-not-start-successfully) · [Capture de fin d'arrêt XP](https://guidebookgallery.org/pics/gui/startupshutdown/shutdowncomplete/winxppro.png)
- **Incohérence reproduite.** Éteindre depuis la connexion affiche la
  console et son bouton rejoue le démarrage. Depuis le bureau,
  **Démarrer → Arrêter → Arrêter** affiche de nouveau la connexion. Le code
  de **Redémarrer** de ce même menu ferme les fenêtres et réaffiche le bureau.

## Priorités proposées

1. Distinguer les destinations des commandes système. Fermer la session
   revient à la connexion, Arrêter affiche la console et Redémarrer relance
   le démarrage.
2. Faire tenir la connexion et le menu Démarrer en 640 × 480. Définir le
   comportement du bureau sur la largeur étroite.
3. Recaler la connexion et améliorer le contraste local du lien invité
   sous le CRT. Affiner ensuite la taille des blocs de démarrage en format
   large et la hiérarchie typographique de la console.

Pour reproduire, lancer `node v1/serve.mjs`, ouvrir
`http://127.0.0.1:4174/`, fixer les dimensions dans Edge et ouvrir une
session invité. Lancer les commandes d'arrêt depuis la connexion puis
depuis Démarrer. Le prototype historique est couvert par
[la Mission 02](06-reference-non-regression.md).

## Vérification après correction

- **Commandes système.** Dans Edge, le choix de changement d'utilisateur
  ouvre la connexion. Arrêter affiche la console VT323. Redémarrer affiche
  le chargement puis la connexion. Le bouton de la console relance aussi
  le démarrage. L'ancienne instance du bureau est détruite en quittant la
  session.
- **640 × 480.** La connexion tient dans le viewport sans défilement.
  Démarrer s'étend de y = 2 à y = 450. L'en-tête, le pied et Tous les
  programmes sont visibles. Le sous-menu s'ouvre dans l'écran.
- **375 × 750.** Le bureau mesure 375 px de large et la zone de
  notification est intégralement visible. Le réglage CRT reste accessible.
  Le cadre du Poste de travail s'ouvre dans la zone disponible et peut
  être réduit puis restauré. Son contenu dense conserve son défilement.
- **1440 × 820.** Le logo de connexion commence à y ≈ 257, le champ à
  y ≈ 358 et mesure 200 × 40 px. Le fond local du lien invité renforce sa
  lisibilité sous le CRT. Les trois blocs du démarrage mesurent 16 px de
  côté, contre 9 px en 640 × 480. En 4:3, la barre est à y ≈ 352.
