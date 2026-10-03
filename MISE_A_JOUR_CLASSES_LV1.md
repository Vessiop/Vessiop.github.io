# Mise à jour des classes niveau 1

Date : 3 octobre 2026.

Source : `Présentaion des classe lv 1.zip`, contenant 33 documents ODT pour 32 classes distinctes. La version `Rixeur.odt` fait référence, selon la confirmation donnée ; `combattant.odt` est l'autre version du Rixeur et n'a pas été utilisée.

Les fiches existantes ont été comparées aux documents. Les règles, chiffres, conditions, coûts, limites, talents, origines, connaissances, armes et équipements ont été actualisés lorsqu'ils différaient. Les descriptions équivalentes, notamment les descriptions courtes de compétences, ont été conservées. Les images existantes sont conservées ; les illustrations fournies pour Azverith et le Technomancien ont été ajoutées sans recadrage.

## Bilan par classe

| Classe | Résultat |
| --- | --- |
| Battant de Sang | Talents, Ferveur, origines et connaissances actualisés ; statistiques et graphique synchronisés. |
| Chaman | Magie environnementale, talents, quatre parcours et connaissances actualisés. |
| Chantelune | Partitions, Accords, talents et cinq filières actualisés. |
| Chasseur | Expertise, Points de Chasse, cinq terrains et connaissances actualisés. |
| Guerrier | Talents, styles, sept vocations et connaissances actualisés. |
| Liant | Ressources, Liance, Confiance, Empreintes et cinq origines actualisés. |
| Mage | Statistiques, talents, quatre origines, équipement et graphique interactif actualisés. |
| Maraudeur | Règles déjà conformes, conservées. |
| Moine / Initié des Chemins | Règles déjà conformes ; choix FOR/DEX du Pilier rendu fonctionnel. |
| Rixeur | Version détaillée intégrée : Combat de Corps, Fortune, cinq milieux et choix FOR/DEX. |
| Sorcier Maudit | Dégénérescence, trois voies, PN, Secrets de l'Interdit, PSY et équipement actualisés. |
| Éclaireur | Discipline de Tir, PF, talents, six origines et équipement actualisés. |
| Lame-Sort | Maîtrises moyennes, remplacement de FOR du Champion et limites des pierres précisés. |
| Acolyte Azuré | Règles déjà largement conformes ; effets et conditions manquants précisés. |
| Acolyte Mortuaire | Faveur d'Ivoire, talents, origines, connaissances et équipement actualisés. |
| Jeune Kaiser | Commandement, talents des origines et équipement actualisés. |
| Médecin du Fléau Gris | Présentation, statistiques, Germes, Réservoir Blafard, origines et équipement actualisés. |
| Exorciste | Statistiques, talents, origines et équipement actualisés ; choix FOR/DEX du Veilleur fonctionnel. |
| Gardien Spirituel | Règles déjà conformes ; portée, maîtrise d'arme et conditions spirituelles précisées. |
| Astrologue | Astre de Référence, Syntonie, talents, six origines, connaissances et équipement actualisés. |
| Berserkeur | Emprise, trois états de Transe, cinq Esprits communs, origines et équipement actualisés. |
| Danseur de Combat | Règles déjà conformes ; Pas de Fluctuation et Classe d'Arme ajoutés. |
| Escrimeur | Statistiques et coût corrigés ; choix FOR/DEX et Réactivité des écoles synchronisés. |
| Chasseur de Gemme | Règles déjà conformes, conservées. |
| Chasseur de la Nuit | Règles déjà conformes ; échelle du graphique corrigée pour les valeurs négatives. |
| Pati-mage | Règles conformes ; anciens gains de connaissances absents de la source retirés, échelle du graphique corrigée. |
| Mage Rouge | Madre-Botanica et connaissances des origines actualisées. |
| Skaldar / Valkyrie | Statistiques, Lance de Bravoure, PB et formations actualisés. |
| Ventriloque | Statistiques, AL, talents, origines, équipement et treize Spellcraft actualisés. |
| Éclat du Cirque | Talents, Mise en Scène, quatre origines, connaissances et équipement actualisés. |
| Acolyte d'Azverith | Nouvelle fiche : Sang Véritable, trois origines, talents, connaissances, équipement et compétences. |
| Technomancien | Nouvelle fiche : Exo-Armure, Impulsions Nova, Gadgets, Batteries, quatre origines et équipement. |

Le catalogue donne accès aux deux nouvelles classes. L'Acolyte des Calamités en a été retiré. Les noms Chantelune, Acolyte Azuré, Lame-Sort et Médecin du Fléau Gris sont harmonisés. Les règles des classes absentes du ZIP, dont le Filou et le Veilleur, n'ont pas été modifiées. Les classes sans document ni fiche, comme l'Acolyte des Ténèbres, restent indisponibles.

Une feuille de style commune corrige les dimensions des grilles et des graphiques des trente fiches existantes concernées, notamment sur mobile. Les deux nouvelles fiches disposent de leur propre présentation responsive : cadres rituels et couleurs sanguines pour Azverith ; trame technique, métal et accents cyan pour le Technomancien. Leurs en-têtes illustrés, statistiques, talents et origines ont été retravaillés. Une navigation par section a été ajoutée. Les règles restent inchangées lors de cette refonte visuelle.

## Contrôles réalisés

- Comparaison indépendante des ressources, caractéristiques, RM, Réactivité et traits disponibles dans les 32 sources avec les fiches HTML.
- Contrôle des bases JavaScript et de l'échelle des graphiques.
- Test navigateur de 33 pages : les 32 classes concernées et le catalogue.
- 145 états d'origine contrôlés ; sélections, désélections et variantes FOR/DEX vérifiées dans les contrôles ciblés.
- Aucun lien local cassé, identifiant dupliqué, erreur JavaScript ou débordement horizontal constaté sur les pages concernées à 1440 px et 390 px.
- Syntaxe valide des 32 scripts externes des classes, ainsi que du script intégré du Mage.
- Contrôles ciblés des règles centrales, des coûts et des limites ; graphiques non vides et images existantes chargées.
- `git diff --check` sans erreur.
- Refonte visuelle d'Azverith et du Technomancien contrôlée à 360, 390, 768 et 1440 px : illustrations chargées, proportions conservées, textes sans chevauchement ni débordement ; sept choix d'origine et réinitialisation vérifiés.

Les fichiers ont été modifiés localement. Aucun commit ni publication n'a été effectué.

## Points à préciser dans les sources

Ces points ne sont pas des règles inventées pour le site. Les informations explicitement fournies ont été intégrées ; les valeurs finales explicites ont été retenues lorsque le texte citait encore une ancienne base.

- **Lame-Sort :** Réactivité de base indiquée seulement par « + ». La valeur finale FOR +4 du Champion est retenue depuis la base réelle -2, soit un delta de +6. Le Socle nomme deux maîtrises moyennes et +4 malgré une mention initiale « mineures ».
- **Valkyrie :** certaines formations citent l'ancienne CST -2 alors que la nouvelle base est +1. Les valeurs finales explicites sont retenues. Résistance à la peur est accordée sous Sang-froid dans un talent, mais proposée sous Résilience dans la liste de compétences.
- **Éclat du Cirque :** PER est indiqué par un tiret sans chiffre ; aucun bonus/malus, soit 0, est conservé. Le second talent de trois origines est vide : aucun talent ajouté à sa place.
- **Exorciste :** le second talent du Répurgateur est vide. Rituel de Condamnation est rangé sous Veilleur Noir mais sa description nomme le Répurgateur. L'attribution suit son emplacement dans le document.
- **Gardien Spirituel :** la limite négative initiale de Spirit Burst n'explicite pas sa base ni son arrondi ; les influences des Essences n'ont pas de valeurs renseignées.
- **Berserkeur :** PM 1d0 repris littéralement. La rubrique de faculté/sort de base est vide. Les règles d'Écho lié et des deux Esprits préparés sont présentées sans ajout de liaison supplémentaire.
- **Chasseur de Gemme :** le « niveau de X » de la réserve Spark et son augmentation exacte par palier ne sont pas définis.
- **Chasseur de la Nuit :** Masques & Serments cite une ancienne base CHA -1 ; la valeur finale explicite +3 est retenue depuis la base réelle -3, soit +6.
- **Médecin :** le titre devient Fléau Gris mais certains objets et connaissances portent encore Peste Blanche. La Classe d'Arme indique Scalpel sans quantité : aucun +1 inventé.
- **Mage et Éclaireur :** certains gains de Classe d'Arme ne donnent pas de quantité ; aucune ajoutée. Le Mage conserve la mention « PV actuels » de Barrière de Dernier Souffle et ne cumule pas deux descriptions du même +10 %.
- **Sorcier :** base de Dégénérescence 0/25 conservée malgré une phrase citant 15 par palier. Le niveau de Marque de la Fêlure et le profil complet d'Occultom ne sont pas définis.
- **Mage Rouge :** fréquence « une fois par session/combat » conservée telle qu'écrite.
- **Ventriloque :** coût « 1 Pact » repris sans redéfinir cette ressource.
- **Technomancien :** la compétence Utilisation Techno-Arcane +2 est donnée sur « Caractéristique » sans préciser laquelle ; aucune base ajoutée.
- **Chasseur :** certaines origines citent une ancienne base INT/CHA ; les valeurs finales +3 font foi. L'Arpenteur emploie « Animal » tandis que la liste d'Expertise emploie « Bête ».
- **Guerrier :** Perfectionnement d'arme précise une augmentation de Classe d'Arme d'un cran ; aucune augmentation implicite de Maîtrise d'arme ajoutée.
- **Chantelune :** Partition Réflexe mentionne « les PR nécessaires » sans les chiffrer.
- **Liant :** une description évoque les créatures élémentaires sans définir d'exception aux restrictions des Liens LV1 ; aucun accès automatique ajouté.
- **Jeune Kaiser :** les anciennes Bannières LV2 ont été conservées ; leurs règles ne sont pas validées par ces documents LV1.

Les traces éditoriales telles que « Texte collé » et les références tronquées aux documents ont été omises lorsqu'elles ne constituaient pas du contenu de jeu.
