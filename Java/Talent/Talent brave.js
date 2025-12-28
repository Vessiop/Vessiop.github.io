// Données complètes des talents brave
const talents = [
    {
        nom: "A deux mains",
        condition: "Avoir une maîtrise d'une arme de guerre (2 mains) en Avancé",
        effet: "Les armes de guerre à deux mains maîtrisées au niveau Avancé infligent +20% de dégâts supplémentaires",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "3"
    },
    {
        nom: "Amplificateur de contre",
        condition: "Maîtrise de l'art des ripostes en Avancé",
        effet: "Les contre-attaques infligent +20% de dégâts",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Bras Armé du Jet",
        condition: "Maîtrise Moyenne d'une arme de lancer",
        effet: "Les dégâts des armes de jet maîtrisées à partir du niveau Avancé sont augmentés de +20%",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Briseur-défault",
        condition: "Maîtrise Avancée lance/hallebarde OU classe Skaldar/Valkyrie + Maîtrise Moyenne",
        effet: "Les attaques à la lance/Hallebarde lors d'une Capacité ignorent 10% des réductions de dégâts physiques et réduisent la DEF globale ennemie de 10% si la cible est en posture défensive ou lors d'une attaque Brave",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Boxeur",
        condition: "Talent de combat de corps OU classe Combattant/Moine",
        effet: "Les coups de poing obtiennent un bonus de +20% de dégâts",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "3"
    },
    {
        nom: "Cabrioles céleste",
        condition: "Classe Valkyrie/Skaldar",
        effet: "En dépensant 12 PE, prolonge de 1 tour la durée d'un effet de «Saut Brave» et augmente les dégâts de +25%. Activable 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Double détonation",
        condition: "Maîtrise Avancée arme à feu OU classe Jeune Tireur",
        effet: "Lorsqu'un tir touche, 15% de chances de déclencher un second tir gratuit sur la même cible (80% dégâts). Chaque tir réussi augmente la probabilité jusqu'à 60% max. 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "3"
    },
    {
        nom: "Jeu de jambes",
        condition: "Talent de combat de corps OU classe Combattant/Moine",
        effet: "Les coups de jambes obtiennent un bonus de +20% de dégâts",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "3"
    },
    {
        nom: "Lames du faucon",
        condition: "Maîtrise art des postures Avancé + maîtrise arme Moyen",
        effet: "En posture, chaque attaque réussie confère +5% de dégâts. Si 2 attaques consécutives touchent la même cible : attaque bonus (-20% dégâts). 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Lancer de dague réflexe",
        condition: "Maîtrise Moyenne arme de lancer",
        effet: "Après une attaque classique (non capacité), lance une dague en attaque bonus. 1×/tour pour 6 PE",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "1"
    },
    {
        nom: "Lance perforante",
        condition: "Maîtrise Avancée lance OU classe Valkyrie/Skaldar",
        effet: "Bonus de +12% sur le jet d'activation d'effet perforation",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Perce-Coeur",
        condition: "Maîtrise Avancée arme de corps à corps",
        effet: "Lorsqu'une attaque perforante active un effet de perforation d'armure, elle bénéficie d'un bonus de +25% aux dégâts supplémentaires",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Poing/pied destructeur",
        condition: "Maîtrise Avancée art de combat OU classe Combattant/Moine",
        effet: "Lors d'un coup critique avec attaque de contact : cible subit -20% à son efficacité défensive pendant 1 tour. Si elle a une réduction de dégâts, celle-ci diminue de 20% contre le lanceur",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "3"
    },
    {
        nom: "Posture de départ",
        condition: "Classe Escrimeur OU maîtrise des postures Avancé",
        effet: "Si non surpris, peut choisir une posture non complexe dès le début du combat, sans coût d'activation",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Tempête de tirs",
        condition: "Maîtrise arme de tir Avancé",
        effet: "Chaque tir réussi consécutif dans un même tour augmente les dégâts de +5% (max +10%). Si 3 tirs consécutifs réussis, le 3e inflige +20% de dégâts. Bonus retombe à 0 si échec",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Tireur d'élite",
        condition: "Maîtrise Avancée arme à distance",
        effet: "Les attaques effectuées avec une arme de tir maîtrisée au niveau Avancé infligent +20% de dégâts",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "3"
    },
    {
        nom: "Tireur perçant",
        condition: "Talent maîtrise arme de tir/jet Avancé",
        effet: "Lors d'un tir à longue portée (25 ft minimum), la valeur de défense ou d'armure de la cible est réduite de 10%",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "2"
    },
    {
        nom: "Train d'enfer",
        condition: "Talent combat de corps OU classe Combattant/Moine",
        effet: "Si blocage/encaissement via action de Blocage : +10 au prochain jet pour toucher et -10% dégâts subis sur la prochaine attaque de cette cible durant le tour. 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Maîtrise et Techniques d'Armes",
        cout: "3"
    },
    {
        nom: "Âmes sœur de bataille",
        condition: "Classe Valkyrie/Skaldar",
        effet: "Lorsque le lanceur voit un allié (non invocation/création) tomber au combat, il obtient un bonus de +40% aux dégâts physiques pendant 2 tours. Non cumulable",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Âmes vengeresses",
        condition: "Aucune",
        effet: "Lorsque le lanceur subit un coup critique : +10% aux dégâts physiques (2 tours) et -10% dégâts subis sur la prochaine attaque (1 tour). Bonus dégâts cumulable jusqu'à +50%, mais la durée ne se prolonge pas",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Combattant de la lumière",
        condition: "Classe Prêtre lumière/Chevalier lumières + maîtrise Avancée arme OU magie purification Avancée",
        effet: "Lorsqu'il inflige des dégâts à une entité corrompue/maudite/démoniaque, peut relancer son jet de dégâts et garder le meilleur. 2×/combat de base (+ modificateur SAG si >2)",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Dans le rouge",
        condition: "Classe Mage rouge",
        effet: "Gagne +5% aux dégâts physiques ou magiques par point de réaction manquant (par rapport au max), jusqu'à +25% max",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Danse avec la Mort",
        condition: "Classe Danseur de combat/Mage rouge/Escrimeur",
        effet: "Quand PV <30% : active 1×/combat pour 1d3+1 tours : +5 taux critique et échec critique sur toutes attaques physiques, danses et Figures Gracieuses. Peut choisir bonus +10% à +30% dégâts mais subira autant en dégâts supplémentaires. Si PV→0 pendant cette phase : perte tous PR + 10% PM/PE",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Dégagement de force",
        condition: "Puissance OU Finesse >4",
        effet: "Lors d'un désengagement, peut tenter de contrer une attaque d'opportunité en lançant une attaque rapide (jet DEX). Réussite : attaque opportunité évitée et attaque inflige -40% dégâts. Échec : adversaire touche mais dégâts réduits de 20%",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Désespoirs de Templier",
        condition: "Classe Chevalier/Templier/Gardien + CST ≥40",
        effet: "Lors d'une attaque physique, peut dépenser 10 PE pour ajouter son modificateur de défense physique aux dégâts de l'attaque",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Enfants Prodige",
        condition: "Classe Ninja/Combattant de Rue OU Réactivité ≥50 + talent Agilité Moyen",
        effet: "Chaque esquive réussie donne un bonus cumulatif de +10% à la prochaine attaque (max +50%). Bonus consommé à la première attaque réussie et ne peut être réactivé dans le même tour",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "3"
    },
    {
        nom: "Flèche du sagittaire",
        condition: "Talent «Œil de lynx» OU classe Archer",
        effet: "Lors du dernier tir du tour, peut consommer 12 PE pour activer l'effet : bonus +10 au jet et si touche, réduit le double de points de résistance légendaire adverse (si perforation est faiblesse). 1×/combat (réutilisable 2× avec dé destin)",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Jeune Star",
        condition: "Réactivité ≥45",
        effet: "À chaque jet de Réaction réussi, gagne un bonus cumulatif de +5% aux dégâts physiques pour la prochaine attaque. Bonus peut monter jusqu'à +25% mais retombe à 0 après la première attaque réussie. 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "3"
    },
    {
        nom: "Maître du talon d'Achille",
        condition: "Aucune",
        effet: "Si cible une faiblesse physique identifiable (articulation, blessure, faille d'armure) : +5 en seuil de succès critique et +10% de dégâts critiques",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Lance de la Véritable Justice",
        condition: "Classe Valkyrie/Skarldar + maîtrise Avancée lance/hallebarde",
        effet: "Lorsqu'une attaque en ligne droite est réalisée avec une propulsion ou un Saut Brave, elle provoque une onde d'impact. Toutes les entités proches subissent 50% des dégâts de l'attaque principale",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Opportunisme sauvage",
        condition: "Lien avec animal + talent Amie des animaux Moyen",
        effet: "1×/tour : peut ordonner une attaque d'opportunité supplémentaire à un animal de combat allié (hors invocation/créature magique). Tous les dégâts d'opportunité infligés par ses animaux contrôlés bénéficient de +25%",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Pénombre sacrificiel",
        condition: "Classe Chevalier Noir (niveau 25)",
        effet: "Lorsqu'il lance un sort de Ténèbres consommant des PV, augmente ses dégâts magiques de +10% par tranche de 20% de PV max manquants au moment de l'activation",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Saut de l'aigle",
        condition: "Classe Valkyrie/Skaldar",
        effet: "Au tout premier tour d'un combat, peut activer une capacité de type «Saut Brave» gratuitement, sans consommer ni points de Bravoure, ni action. Ne fonctionne pas si pris en embuscade",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Style risqué",
        condition: "Aucune",
        effet: "Peut activer «Style Risqué» pour 2 tours : +5 à +15 au taux de succès critique mais gain équivalent en taux d'échec critique. Le joueur choisit le niveau de risque (+5, +10 ou +15)",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Tueur de la Nature",
        condition: "Maîtrise Avancée arc/arbalète/arme à feu",
        effet: "Les attaques à distance contre les créatures aquatiques, végétales ou semi-liquides (algues, méduses, monstres d'eau, golems de vase, etc.) infligent +30% de dégâts",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Tueur du Surnaturel",
        condition: "Maîtrise Avancée arc/arbalète/arme à feu",
        effet: "Les tirs contre les entités démoniaques, élémentaires de lumière, ou à structure magique cristalline infligent +30% de dégâts",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Tueur des créatures",
        condition: "Maîtrise Avancée arc/arbalète/arme à feu",
        effet: "Les attaques à distance contre des bêtes classiques, monstres hybrides ou géants, et créatures volantes reçoivent un bonus de +30% aux dégâts",
        categorie: "Offensif",
        sousCategorie: "Effets Spéciaux, Critiques et Conditions",
        cout: "2"
    },
    {
        nom: "Assaut Pirate",
        condition: "Classe Pirate + maîtrise Avancée du sabre",
        effet: "En situation d'embuscade : gagne 1 attaque supplémentaire durant le tour où il est l'assaillant + 20% de dégâts critiques avec le sabre durant cette phase",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Bête sauvage",
        condition: "Classe Sauvage OU race Bestial",
        effet: "En environnement naturel non magique, peut relancer une attaque de corps à corps ratée (poing, pied, griffe...) tous les 2 tours",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Bravade Improbable",
        condition: "Classe Pirate + Sang-Froid ≥5",
        effet: "Lorsqu'il subit une attaque critique, peut tenter un jet de Sang-Froid (DC 16). En cas de réussite : le critique est annulé et peut immédiatement effectuer un jet d'Intimidation OU une attaque simple en riposte (coût : 15 PE)",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Buffet à volonté",
        condition: "Classe Pati-Mage",
        effet: "Lorsqu'il utilise une grande pâtisserie magique (ex. : gâteau), a 30% de chances de pouvoir lancer immédiatement une autre pâtisserie déjà préparée (même type ou différente). 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Confiserie choc",
        condition: "Classe Pati-Mage",
        effet: "En dépensant 10 PE, peut ajouter un effet d'étourdissement temporaire (1 tour - Perte d'une action) à une attaque de pâtisserie réussie. La cible doit réussir un jet de Résilience (DC 20) ou réduction d'une faiblesse magique liée à l'ingrédient utilisé. Utilisable 1×/combat (peut être réactivé via 1 dé de destin une fois)",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Coup dans le dos",
        condition: "Maîtrise Attaque Sournoise + Furtivité Moyen",
        effet: "Lorsqu'il effectue une attaque sournoise dans le dos d'une cible, bénéficie d'un bonus de +25% aux dégâts de sournoiserie",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Duo Délectable",
        condition: "Classe Pati-Mage",
        effet: "Une fois par combat, peut utiliser deux pâtisseries en même temps, sans coût d'action ou de PE supplémentaire (hors ingrédients consommés). Peut être réactivé une seconde fois en consommant 1 dé de destin",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Explosion gourmande",
        condition: "Classe Pati-Mage",
        effet: "Lorsqu'une pâtisserie inflige des dégâts directs via son effet magique (hors effets liés aux ingrédients), ces dégâts sont augmentés de +10%. Si la pâtisserie est issue d'une grande structure (gâteau, grande tarte, etc.), le bonus passe à +20% sur le premier lancer",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Frappe du bandit",
        condition: "Classe Filou + Furtivité Avancé",
        effet: "Lors d'une embuscade, si le premier coup est un critique : Ignore 20% de l'armure ennemie, inflige +10% de dégâts critiques, et +20% de dégâts de sournoiserie",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Frappe Fantôme",
        condition: "Talent attaques sournoises ou équivalent",
        effet: "Lorsqu'il effectue une attaque sournoise simple (sans capacité spéciale) avec une arme discrète, a 25% de chances d'enchaîner avec une seconde attaque gratuite avec la même arme. Coût : 10 PE | Max : 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Instinct prédateur",
        condition: "Classe Filou/Chasseur/Jeune Tireur/Pirate",
        effet: "Après avoir réussi une embuscade, peut effectuer une attaque supplémentaire immédiate avec un bonus de +10% aux chances de coup critique. L'attaque ne consomme pas d'action mais suit les règles d'arme classique",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Jeu de Bâton",
        condition: "Maîtrise Avancée du bâton de combat",
        effet: "Lors d'une attaque simple (pas de capacité), a 50% de chance de porter un second coup rotatif infligeant 75% des dégâts classiques. 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Lame de la Trahison silencieuse",
        condition: "Maîtrise Attaque Sournoise + maîtrise arme Avancée",
        effet: "Lorsqu'une attaque sournoise réussit un succès critique (hors coup du destin) : les dégâts de sournoiserie sont doublés et l'ignore armure (réduction d'armure) est augmenté de 25%. Si la cible survit : subit un malus de -10 à toutes ses actions pendant 1 tour",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "3"
    },
    {
        nom: "Marée des ombre insidieuse",
        condition: "Maîtrise Attaque Sournoise",
        effet: "Si une attaque sournoise fait tomber une cible sous 50% de ses PV max, peut immédiatement enchaîner une attaque simple (hors capacité, avec une seule arme) sur la même cible ou un autre ennemi à portée. Les dégâts de cette attaque bonus sont réduits de 20% mais aura l'effet sournoiserie. Maximum de 2 attaques bonus par tour via ce talent",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Polyvalence",
        condition: "Aucune",
        effet: "A 25% de chances d'effectuer une attaque supplémentaire gratuite après une attaque classique (non capacité). Ne peut s'activer qu'une seule fois par tour, et une seule fois par série de multi-coups",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "3"
    },
    {
        nom: "Rage de l'inquisiteur",
        condition: "Classe Prêtre lumière/Chevalier lumières + maîtrise Avancée arme OU magie purification Avancée",
        effet: "Lorsqu'il attaque une entité corrompue, maudite ou démoniaque, a 40% de chances d'enchaîner avec une seconde attaque gratuite (physique ou sort simple). Limité à 1×/tour",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Serment des lâches",
        condition: "Classe catégorie criminel OU talent Attaque Sournoise",
        effet: "Si attaque une cible déjà engagée au combat, inflige +20% de dégâts physiques",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Tir de lynx opportuniste",
        condition: "Classe Œil d'Aigle/Jeune Tireur OU maîtrise arme tir Avancée",
        effet: "Lorsqu'un allié inflige des dégâts à distance, a 25% de chances de réaliser un tir simple gratuit (hors capacité ou arme à préparation) sur la même cible, infligeant 80% des dégâts normaux",
        categorie: "Offensif",
        sousCategorie: "Combinaisons Sournoises et Enchaînements",
        cout: "2"
    },
    {
        nom: "Adversité des ténèbres",
        condition: "Classe Acolyte des ténèbres",
        effet: "Tant que les PV du lanceur restent sous 50%, il bénéficie d'une réduction de 10% aux dégâts physiques et magiques subis. L'effet persiste tant que le seuil n'est pas dépassé",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Ahah ! Pas cette fois !",
        condition: "Classe Éclat du cirque",
        effet: "Quand reçoit une attaque qui devrait lui faire perdre plus de 20% de ses PV, peut tenter un tour de passe-passe. Relance les dégâts et garde le résultat le plus bas. Si le premier jet était déjà inférieur, la perte de PV est réduite de 30%. Utilisable 1×/combat/scène/session (réutilisable 2× avec 1 dé de destin)",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Armure de résilience spirituelle",
        condition: "Classe Gardien - Possesseur spirituel + maîtrise magie spirituel des âmes Avancé",
        effet: "En dépensant 40% de ses PS, renforce son armure, gagnant une réduction de 20% aux dégâts magiques subis pendant 2 tours. Non cumulable avec d'autres effets similaires",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Auto-barrière",
        condition: "Maîtrise Avancée barrière/enchantement/insufflation",
        effet: "Au début du combat, invoque automatiquement une barrière ou un effet de revêtement lié à l'une de ces écoles, en ne payant que 50% du coût en PM",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Chanteur Émérite",
        condition: "Talent maîtrise du style magique bardique : chant filandreux",
        effet: "À chaque sort de chant filandreux lancé, gagne un bouclier temporaire réduisant les dégâts subis après son tour de : Mod. CHA × X (à définir selon l'équilibrage). Effet valable pour 1 tour",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Chevalier en armure",
        condition: "CST ≥50",
        effet: "Bénéficie d'une réduction des dégâts physiques subis basée sur sa statistique de PE : (PE ÷ 20)% de réduction des dégâts physiques, jusqu'à un maximum de 10%",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Esprit Chafouin",
        condition: "Maîtrise Attaque Sournoise",
        effet: "Après avoir effectué une attaque d'opportunité, entre immédiatement en posture défensive : obtient +10 en défense physique contre la prochaine attaque subie de la part de cette même cible (valable pendant 1 tour)",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Force des Peaux Nues",
        condition: "Classe Sauvage",
        effet: "Si ne porte aucune armure (vêtements autorisés), obtient en combat : +5 en FOR, DEX et CST + Réduction de 10% aux dégâts physiques et magiques",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Garde Chevaleresque",
        condition: "Talent brave «Protecteur d'allié»",
        effet: "À chaque activation de Protection d'un allié, bénéficie d'une réduction supplémentaire de 5% des dégâts physiques subis pendant 2 tours. Cet effet peut se répéter mais ne dépasse jamais 15%. Les tours ne se cumulent pas",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Grâce de la Pétale",
        condition: "Classe Mage rouge/Danseur de combat OU Agilité Majeur OU classe Filou + Agilité Avancé",
        effet: "Une fois par combat, si subit une attaque physique, peut réduire les dégâts de 30% grâce à un mouvement fluide absorbant l'impact. Peut être utilisé une seconde fois dans la session en consommant 1 dé de destin",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "3"
    },
    {
        nom: "Héraut de la lumière",
        condition: "Classe Prêtre lumière/Chevalier lumières + Maîtrise magie de lumière sainte Avancé",
        effet: "Subit 10% de dégâts magiques en moins lorsqu'il affronte une entité corrompue, maudite ou démoniaque. Le bonus passe à 15% si la source est un Boss",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Masse Glacée",
        condition: "Classe Pati-Mage",
        effet: "Lorsqu'une pâtisserie élémentaire de soutien est utilisée sur le lanceur ou un allié, elle confère une immunité temporaire à une altération d'état liée à un élément spécifique pendant 1 tour. L'élément est déterminé par l'ingrédient principal utilisé. Si l'ingrédient n'a pas de nature élémentaire claire, on se base sur l'affinité élémentaire du lanceur",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Protecteur d'allié",
        condition: "Aucune",
        effet: "Permet d'encaisser à la place d'un allié une attaque mortelle ou critique, si ses PV sont sous 40%. Cette intervention est garantie, mais consomme le déplacement et l'action du lanceur s'il souhaite agir ensuite",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Régression final",
        condition: "Classe Astrologue/Exorciste",
        effet: "Une fois par combat, peut différer les dégâts d'une attaque : subit l'attaque normalement (une attaque), mais ses PV ne diminuent pas tout de suite. Lance 1d3 : le résultat indique le nombre de tours avant que les dégâts soient appliqués. À la fin de cette durée, les PV perdus sont retirés d'un coup, sans possibilité de les éviter",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Sceau de Protection",
        condition: "Maîtrise du style magique de l'enchantement",
        effet: "Lorsqu'un enchantement personnel est activé, gagne une réduction de 15% aux dégâts élémentaires du même type, pendant 2 tours. Les effets ne sont pas cumulables dans la durée",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "1"
    },
    {
        nom: "Talent de corps inné",
        condition: "CST ≥40",
        effet: "Si ne porte pas d'armure ou uniquement des vêtements légers, bénéficie d'une réduction de 10% des dégâts physiques subis",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Veste de guerre",
        condition: "Maîtrise Avancée arme à feu OU classe Jeune Tireur",
        effet: "Tant qu'il est en mouvement pendant son tour, bénéficie d'une réduction de 10% des dégâts physiques reçus",
        categorie: "Défensif",
        sousCategorie: "Réduction et Résistance aux Dégâts",
        cout: "2"
    },
    {
        nom: "Maître du bâton",
        condition: "Maîtrise mineure bâton de combat + Maîtrise mineure art des postures",
        effet: "Lorsqu'il utilise un bâton tenu à deux mains, adopte une posture stratégique lui conférant un bonus de défense physique égal à : +3 × le niveau de maîtrise (du bâton ou de l'art des postures, le plus élevé). Ce bonus ne s'applique pas si le bâton est utilisé à une main, ou avec une autre arme en main secondaire",
        categorie: "Défensif",
        sousCategorie: "Contres, Postures et Défense Active",
        cout: "2"
    },
    {
        nom: "Acharnement d'un ancien temps/Mû",
        condition: "Maîtrise Avancée Posture/art des contre OU talent Garde d'un ancien Monde/Mû",
        effet: "Tant qu'il est en posture défensive ou de contre-attaque : 10% de réduction de dégâts subis tant qu'il n'a pas encore tenté de contre. Et, pour chaque Point de Réaction manquant au moment de contre-attaquer, gagne +10% de dégâts sur cette contre",
        categorie: "Défensif",
        sousCategorie: "Contres, Postures et Défense Active",
        cout: "2"
    },
    {
        nom: "Défenseur inflexible",
        condition: "(Classe Chevalier OU maîtrise Avancée art du bouclier) + maîtrise art des parade",
        effet: "Si réussit une parade avec son bouclier, peut effectuer une contre-attaque simple (hors capacité), en dépensant 12 PE (dégâts réduits de 20%). Le nombre de contre-attaques par tour est limité à sa base de points de réaction",
        categorie: "Défensif",
        sousCategorie: "Contres, Postures et Défense Active",
        cout: "2"
    },
    {
        nom: "Corps de titan",
        condition: "CST >45 OU talent «Corps de rock» + CST ≥30",
        effet: "Peut ignorer un effet de recul ou de renversement une fois par tour en dépensant 10 PE. Contre une attaque d'une puissance extrême, un jet de CST avec +10 pourra être requis par le MJ",
        categorie: "Défensif",
        sousCategorie: "Contres, Postures et Défense Active",
        cout: "2"
    },
    {
        nom: "Garde d'un ancien monde/Mû",
        condition: "Maîtrise des postures Avancé",
        effet: "Lorsqu'il est en posture défensive et qu'il reçoit une attaque, obtient un bonus de +10 ft en déplacement non cumulable pendant 2 tours",
        categorie: "Défensif",
        sousCategorie: "Contres, Postures et Défense Active",
        cout: "2"
    },
    {
        nom: "Orgueil de l'Escrimeur",
        condition: "Classe Escrimeur + maîtrise des postures Avancé",
        effet: "Lorsqu'il est en posture offensive ou défensive, peut dépenser 25 PE pour optimiser son action en posture (1×/tour). En posture offensive : l'attaque utilise les dés de dégâts au maximum. En posture défensive : le jet de défense physique est lancé avec les dés au maximum. Cet effet ne s'applique pas sur un critique naturel et fait perdre immédiatement la posture utilisée après l'action",
        categorie: "Défensif",
        sousCategorie: "Contres, Postures et Défense Active",
        cout: "3"
    },
    {
        nom: "Rempart du lancier",
        condition: "Maîtrise Avancée lance/Hallebarde",
        effet: "Si un ennemi entre dans la zone de menace de l'arme (10 à 15 ft selon la portée), peut déclencher une attaque d'opportunité (hors capacité) en dépensant 12 PE. Limité à 2 attaques par tour",
        categorie: "Défensif",
        sousCategorie: "Contres, Postures et Défense Active",
        cout: "2"
    },
    {
        nom: "Replie Maîtrisé",
        condition: "Maîtrise des ordres tactiques Avancé",
        effet: "Peut ordonner un repli tactique immédiat au prix d'un point de réaction. Lui-même et un allié proche ignorent les attaques d'opportunité et gagnent +10 en défense physique jusqu'à leur prochain tour. Une fois par combat",
        categorie: "Défensif",
        sousCategorie: "Contres, Postures et Défense Active",
        cout: "2"
    },
    {
        nom: "Accro à la douleur",
        condition: "Talent combat de corps OU classe Combattant/Moine",
        effet: "Lorsqu'il perd plus de 10% de ses PV max en une seule attaque, récupère un montant de PE égal à la moitié des PV perdus, dans la limite de 10% de ses PV max. Utilisable 1×/tour",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Anti-corps",
        condition: "Aucune",
        effet: "Une fois par tour, lorsqu'il est sous l'effet d'une altération d'état physique (saignement, poison, brûlure, etc.), peut lancer un dé supplémentaire pour tenter d'y résister ou s'en libérer",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Sacrifice Poupétien",
        condition: "Classe Ventriloque",
        effet: "Lorsqu'il est ciblé par une attaque, peut projeter une poupée magique pour absorber les dégâts (doit posséder une poupée). La poupée absorbe 8 points de dégâts par 6 PM consommés. Pour chaque tranche de 8 dégâts absorbés : lance 1d10 pour déterminer la détérioration (%) de la poupée. En cas de coup critique : ajoute 1d8 par 16 dégâts absorbés",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Sceau de soumission",
        condition: "Classe Invocateur démoniaque OU Maîtrise des rites démoniaques Majeur",
        effet: "Permet de renforcer temporairement le lien de contrôle sur une entité démoniaque invoquée, prolongeant sa durée d'invocation de +2 tours. Utilisable 1×/invocation",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Substitution Ninja",
        condition: "Classe Ninja Fantôme OU Ninja niveau 25 + Agilité Majeur + Réactivité +45",
        effet: "1×/combat/séance : Lorsqu'il est ciblé par une attaque, peut consommer 2 Points de Réactivité ou 4 Points de Réaction Mû, et 15% de ses PE max pour esquiver instantanément. Si l'attaque est un coup critique : doit en plus soit dépenser 1 point de Réaction bonus ou 2 Points de Réaction Mû supplémentaires, soit sacrifier un objet aléatoire de son inventaire",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "3"
    },
    {
        nom: "Protecteur des cieux",
        condition: "Classe Valkyrie/Skarldar",
        effet: "Lorsqu'il intervient pour sauver un civil ou un allié, peut activer une Propulsion céleste : Rejoue immédiatement son déplacement (20 PE + 20 PM). Les attaques d'opportunité contre lui sont en désavantage. Gagne +2 aux jets de Finesse pour éviter les obstacles. 1×/scène ou session",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Protection du Paladin",
        condition: "Classe Prêtre lumière/Chevalier lumières",
        effet: "Lorsqu'un allié est ciblé par une attaque venant d'une entité corrompue/maudite/démoniaque, peut s'interposer : Consomme 15 PE et ses points de MOV du tour actuel ou suivant. Réduit les dégâts magiques reçus de 10% à la place de l'allié. Utilisable 1×/tour",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Tissage réactif",
        condition: "Classe Ventriloque",
        effet: "Une fois par tour, si ciblé par un sort offensif, peut dépenser 1 PA pour lancer immédiatement un sort de Spellcraft ou de Chant (Animé ou Inanimé) avant que le sort adverse ne se déclenche",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Tout était calculé… enfin presque !",
        condition: "Classe Éclat du cirque",
        effet: "Lorsqu'il rate un sort de Cirque élémentaire ou de classe évoluée, peut faire genre que c'était voulu. Jet de Charisme requis. En cas de réussite : attire l'attention de la cible qui perd un instant de concentration. Choisit soit : Relancer le sort en désavantage pour moitié de son coût, OU Se déplacer de 10 ft sans subir d'attaque d'opportunité. 1× tous les 2 tours - Coût : 15 PE",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Pas de Recule de souris",
        condition: "Classe Danseur de guerre/Filou/Jeune Ninja/Éclat du cirque",
        effet: "Si recule et subit une attaque d'opportunité : gagne +6 en défense physique contre cette attaque. Ce bonus est doublé (+12) si : a effectué une attaque d'opportunité immédiatement avant OU se trouve à 5ft ou moins d'un allié",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Volonté de protection",
        condition: "Maîtrise Avancée magie de barrière + Réactivité ≥40",
        effet: "Peut interrompre une attaque imminente ciblant un allié, en lançant immédiatement un sort de barrière au coût d'un point de Réaction uniquement (sans action). Utilisable 1× tous les 2 tours",
        categorie: "Défensif",
        sousCategorie: "Réactions, Adaptations et Résilience",
        cout: "2"
    },
    {
        nom: "Chien Fou",
        condition: "Talent Agilité Avancé + Réactivité ≥45",
        effet: "À chaque esquive réussie, récupère 5% de ses PE Max (cumulable jusqu'à 15% par tour)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "3"
    },
    {
        nom: "Concentration éclair",
        condition: "Aucune",
        effet: "Après chaque esquive réussie, obtient +10% en précision pour le tour suivant (non cumulatif). Activable 1×/tour",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Éphémère",
        condition: "Réactivité ≥50 OU classe Jeune Ninja + Réactivité ≥40",
        effet: "Peut effectuer une contre-attaque immédiate lorsqu'il réussit une esquive, à raison d'une fois par point de réaction de base. Chaque contre-attaque coûte 12 PE, inflige -20% de dégâts, et doit être réalisée avec une arme courte (pas d'armes de guerre, à deux mains ou à distance) - Non capacité sauf art ninja",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Évasion gracieuse",
        condition: "Classe Danseur de combat",
        effet: "Une fois par tour, si en pleine danse, peut effectuer un jet d'esquive immédiatement en dépensant 1 point de Réaction + 5 PE. En cas de réussite : peut réutiliser ce talent une seconde fois dans le tour mais le coût passe à 10 PE (non cumulable au-delà de deux activations globales)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Fuite du Voleur Fantôme",
        condition: "Classe Filou/Criminel",
        effet: "Après avoir effectué un larcin, obtient pour le tour en cours (non cumulable) : +10 ft de déplacement, -10 au jet d'attaque adverse contre lui, -20 au jet d'attaque d'opportunité subie",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Ninjustu",
        condition: "Réactivité ≥55 + Agilité Avancé OU classe Combattant de rue/Jeune Ninja + Réactivité ≥45",
        effet: "Chaque fois qu'il esquive une attaque, obtient un bonus de +4% en réactivité durant le tour même et le prochain tour (cumulatif) jusqu'à max 12% (tours ne se cumulent pas)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Numéro d'Évasion",
        condition: "Classe Éclat du cirque",
        effet: "Lorsqu'il est sur le point d'être touché, peut se téléporter en produisant une explosion de ballon au contact à une courte distance de 20ft pour éviter une attaque. 1×/combat (action garantie)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Œil de Chronos",
        condition: "Classe Astrologue",
        effet: "Grâce à son lien avec les constellations, peut percevoir les événements au ralenti pendant un court moment. Accorde +10 en Réactivité et +1 en Instinct. Peut effectuer une tentative d'esquive Gratuit (sans jet de réactivité) avec +10 sur tous les jets d'esquive pendant 3 tours. Au prix d'un dé de destin, l'esquive peut être garantie (selon l'attaque, le MJ peut exiger un jet et donc ne pas permettre le dé de destin). 1×/session",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "3"
    },
    {
        nom: "Parade des Étoiles",
        condition: "Talent Acrobatie Avancé",
        effet: "1×/tour : obtient un bonus de +5 sur les jets d'esquive si porte une armure légère ou pas d'armure. Si tente une action acrobatique : obtient un bonus de +10 sur son jet d'esquive",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Pas de chat",
        condition: "Classe Danseur de combat",
        effet: "Le danseur peut, 1× tous les 2 tours, obtenir une tentative d'esquive gratuite après avoir réussi une attaque ou une danse",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Rire déstabilisant",
        condition: "Classe Éclat du cirque",
        effet: "Après une esquive réussie, pousse un rire moqueur qui déstabilise sa cible, réduisant sa Réactivité de -10 pendant 1 tour (Cumulable jusqu'à -40)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "1"
    },
    {
        nom: "Vif comme le vent",
        condition: "Réactivité ≥45 OU talent Agilité Avancé + talent Vif",
        effet: "Permet d'obtenir 1 second point de réaction (permettant de directement lancer son jet d'esquive), réservé uniquement à l'esquive. Utilisable 1×/combat (peut être réutilisable via un dé de destin)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Volt-face",
        condition: "Réactivité ≥40 + talent Agilité Moyen",
        effet: "Lorsqu'il réussit une esquive, a 40% de chance de récupérer un point de réactivité. La récupération se fait 1×/tour",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Esquives et Réactions Instantanées",
        cout: "2"
    },
    {
        nom: "Célérité Férale",
        condition: "Classe Sauvage OU race Bestial + talent Coureur émérite",
        effet: "Si ne porte pas d'armure : obtient +1,5 × Finesse en MOV lorsqu'il court (arrondi au supérieur) + 2 en jet de Finesse pour éviter les obstacles en pleine course",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "2"
    },
    {
        nom: "Déplacement du tireur fantôme",
        condition: "Maîtrise Avancée arme à feu OU classe Jeune Tireur + talent Coureur émérite",
        effet: "Peut se déplacer rapidement de 15 ft vers une position sans utiliser de MOV. Si le déplacement se termine à couvert : gagne +15 en Réactivité jusqu'à la fin de son prochain tour. Utilisable 1× tous les 2 tours",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "2"
    },
    {
        nom: "Feu vert",
        condition: "Talent Coureur Émérite",
        effet: "À chaque jet de Réaction réussi : gagne +5 en MOV cumulatif jusqu'à +15 max. Le bonus expire à la fin de son prochain tour (non cumulable avec lui-même d'un tour à l'autre)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "2"
    },
    {
        nom: "Prescience des Astre",
        condition: "Classe Astrologue",
        effet: "Lorsqu'il veut effectuer un sort de soutien (non offensif), peut activer ce talent au prix de 2 PR pour utiliser son sort au début du tour (consomme son action) tant que c'est un Sort de Sacre. 1×/tour",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "3"
    },
    {
        nom: "Rebond de la Valkyrie",
        condition: "Classe Valkyrie/Skarldar + Finesse ≥4",
        effet: "Peut activer une seconde capacité de Propulsion non offensive par tour. Le coût est augmenté de +10 PE. Si ce rebond mène à une attaque de lance ou hallebarde perforante : celle-ci gagne +10% de dégâts et +5% de chances de perforer",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "2"
    },
    {
        nom: "Rebond Final Brave",
        condition: "Classe Valkyrie/Skaldar + talent Rebond de la Valkyrie",
        effet: "Permet d'utiliser une troisième propulsion par tour (toujours non offensive). Ce rebond coûte +12 PE. Si enchaîne 3 propulsions consécutives : gagne un bonus de +20% aux dégâts de la dernière attaque et +10% de chances de perforation (Bonus cumulatif avec Rebond de la Valkyrie)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "2"
    },
    {
        nom: "Ruée Spectrale",
        condition: "Classe Gardien - Possesseur spirituel + maîtrise magie spirituelle d'âmes Avancé",
        effet: "Prend une forme éthérée, gagnant +20 ft de déplacement et ignore la première attaque reçue ce tour. Coût : 30% de PS. Utilisable 1×/tour",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "2"
    },
    {
        nom: "Saut Acrobatique Ninja",
        condition: "Agilité Moyen + Acrobatie Avancé OU classe Jeune Ninja/Danseur de guerre/classe acrobatique + Agilité Moyen + Acrobatie Moyen",
        effet: "Peut effectuer un saut acrobatique jusqu'à 7,5 ft pour 15 PE, dans la direction de son choix. Doit réussir un jet de Finesse difficulté 10 min + 2 par entité traversée. En cas de réussite : ignore toutes les attaques d'opportunité pendant ce déplacement et obtient avantage sur son prochain jet de réactivité du tour. Activable 1×/tour",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "2"
    },
    {
        nom: "Prélude en Mouvement",
        condition: "Talent maîtrise de Danse spécial Avancé",
        effet: "Au début de chaque combat (sauf si possède l'état Surpris), peut faire un jet de PER ou de Réactivité. En cas de réussite : déclenche automatiquement une Danse pour 10 PE. S'active avant le premier tour",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Déplacements Stratégiques et Mobilité",
        cout: "2"
    },
    {
        nom: "Adrénaline",
        condition: "Aucune",
        effet: "Lorsqu'il achève un ennemi, obtient une action simple bonus. Utilisable 1×/tour",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "2"
    },
    {
        nom: "Furie contrôlée",
        condition: "Talent combat de corps OU classe Combattant/Moine",
        effet: "Si les PV passent sous 50%, gagne +10 en Réactivité tant qu'il reste sous ce seuil",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "2"
    },
    {
        nom: "Préparation de l'ancien Monde",
        condition: "Classe Jeune Ninja",
        effet: "Au début d'un combat, obtient 1 Point de Réaction spécial «Mû» utilisable uniquement pour une technique des arts Mû. 1×/combat/session (réutilisable avec 1 dé de destin)",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "2"
    },
    {
        nom: "Rage des ténèbres",
        condition: "Classe Chevalier noir (évolution chevalier ordre ténèbres niveau 25)",
        effet: "Lorsque les PV tombent sous 30% : gagne +10 en Réactivité et bénéficie de -25% de coût en PM pour les sorts de Ténèbres qui sacrifient des PV",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "2"
    },
    {
        nom: "Réaction Max",
        condition: "Aucune",
        effet: "Gagne +1 Point de Réaction Maximal",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "2"
    },
    {
        nom: "Réflexe d'un Ancien Monde",
        condition: "Classe Ninja",
        effet: "Lorsqu'il fait un Affrontement durant les 3 premiers tours de combat : obtient un Bonus égal au double de sa stat de Finesse en Réactivité. 1×/combat",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "3"
    },
    {
        nom: "Renaissance",
        condition: "Aucune",
        effet: "Lorsque les PV tombent sous 30% : 60% de chances de récupérer 2 Points de Réaction. 1×/combat",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "2"
    },
    {
        nom: "Seul contre tous",
        condition: "Aucune",
        effet: "Si le nombre d'ennemis est supérieur à celui des alliés : obtient +10 en Réactivité. Ce bonus disparaît si l'équilibre s'inverse",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "2"
    },
    {
        nom: "Vitesse du bandit",
        condition: "Classe Filou/Pirate/Voyageur OU connaissance du domaine criminel",
        effet: "Lors d'une embuscade (subie ou initiée) : le lanceur et un allié proche gagnent +20 en Initiative",
        categorie: "Réaction/Mobilité",
        sousCategorie: "Bonus de Réactivité, Initiative et Conditions",
        cout: "2"
    }
];

// Fonctions de gestion du tableau
function initTable() {
    const tbody = document.getElementById('talentsBody');
    const totalCount = document.getElementById('totalCount');
    const talentCount = document.getElementById('talentCount');
    
    if (!tbody || !totalCount || !talentCount) {
        console.error('Éléments du DOM non trouvés');
        return;
    }
    
    totalCount.textContent = talents.length;
    talentCount.textContent = talents.length;
    
    renderTalents(talents);
}

function renderTalents(talentsToShow) {
    const tbody = document.getElementById('talentsBody');
    const noResults = document.getElementById('noResults');
    const talentCount = document.getElementById('talentCount');
    
    if (!tbody) {
        console.error('Tableau non trouvé');
        return;
    }
    
    tbody.innerHTML = '';
    
    if (talentsToShow.length === 0) {
        if (noResults) noResults.style.display = 'block';
        if (talentCount) talentCount.textContent = '0';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    if (talentCount) talentCount.textContent = talentsToShow.length;
    
    talentsToShow.forEach(talent => {
        const row = document.createElement('tr');
        
        let catClass = 'cat-autre';
        if (talent.categorie === 'Offensif') catClass = 'cat-offensif';
        else if (talent.categorie === 'Défensif') catClass = 'cat-defensif';
        else if (talent.categorie === 'Réaction/Mobilité') catClass = 'cat-reaction';
        else if (talent.categorie === 'Magie') catClass = 'cat-magie';
        
        row.innerHTML = `
            <td data-label="Nom"><span class="talent-nom">${talent.nom}</span></td>
            <td data-label="Condition"><span class="talent-condition">${talent.condition}</span></td>
            <td data-label="Effet"><span class="talent-effet">${talent.effet}</span></td>
            <td data-label="Catégorie"><span class="talent-categorie ${catClass}">${talent.categorie}</span></td>
            <td data-label="Sous-catégorie"><span class="talent-sous-categorie">${talent.sousCategorie}</span></td>
            <td data-label="Coût"><span class="talent-cout">${talent.cout}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

function searchTalents() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) {
        console.error('Champ de recherche non trouvé');
        return;
    }
    
    const searchTerm = searchInput.value.toLowerCase();
    
    const filtered = talents.filter(talent => {
        return talent.nom.toLowerCase().includes(searchTerm) ||
               talent.effet.toLowerCase().includes(searchTerm) ||
               talent.condition.toLowerCase().includes(searchTerm);
    });
    
    renderTalents(filtered);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initTable();
    
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchTalents);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchTalents();
            }
        });
    }
});