// Fonction pour extraire la condition d'un effet
function extractCondition(effet) {
    // Cherche les patterns de condition
    const conditionMatch = effet.match(/\(Condition\s*:\s*[^)]+\)/i);
    if (conditionMatch) {
        // Retirer les parenthèses et "Condition :"
        return conditionMatch[0].replace(/\(Condition\s*:\s*/i, '').replace(/\)$/, '').trim();
    }
    
    // Vérifier si le texte commence par "Condition :" sans parenthèses
    const directConditionMatch = effet.match(/^Condition\s*:\s*[^.]+/i);
    if (directConditionMatch) {
        return directConditionMatch[0].replace(/^Condition\s*:\s*/i, '').trim();
    }
    
    return null;
}

// Fonction pour nettoyer l'effet (retirer la condition si elle y est)
function cleanEffet(effet) {
    return effet
        .replace(/\(Condition\s*:\s*[^)]+\)\s*/i, '')
        .replace(/^Condition\s*:\s*[^.]+\.\s*/i, '')
        .trim();
}

// Tous les talents non évolutifs avec extraction automatique des conditions
const allTalents = [
    {
        nom: "Vivacité",
        effet: "Tu gagnes un bonus permanent de +10 à ta Réactivité.",
        cout: 1,
        id: "vivacite"
    },
    {
        nom: "Bonne vitalité",
        effet: "À chaque montée de niveau, lorsque tu lances le dé de gain de PV, augmente le résultat final de +1",
        cout: 2,
        id: "bonne-vitalite"
    },
    {
        nom: "Barrière mental endurcie",
        effet: "Tu gagnes un bonus permanent de +8 à ta Résistance mentale.",
        cout: 1,
        id: "barriere-mental"
    },
    {
        nom: "Endurant",
        effet: "À chaque montée de niveau, lorsque tu lances le dé de gain de PE, ajoute +1 au résultat obtenu.",
        cout: 2,
        id: "endurant"
    },
    {
        nom: "Sprinteur émérite",
        effet: "Tu gagnes un bonus permanent de +6 à ton Mouvement de déplacement de base.",
        cout: 1,
        id: "sprinteur"
    },
    {
        nom: "Jeune potentielle magique",
        effet: "À chaque montée de niveau, lorsque tu lances le dé de gain de PM, augmente le résultat de +1.",
        cout: 2,
        id: "jeune-potentielle"
    },
    {
        nom: "Volonté de Chair",
        effet: "Tu encaisses mieux les épreuves physiques comme mentales : fatigue, douleur, pression, conditions dures. Cette solidité te rend plus difficile à briser quand la situation s'étire ou devient brutale. Gain : Résilience +2.",
        cout: 2,
        id: "volonte-chair"
    },
    {
        nom: "Esprit Érudit",
        effet: "Tu assimiles plus vite, tu retiens mieux, et tu sais surtout exploiter l'info au bon moment. Notes, manuels, récits, détails techniques : tu transformes la connaissance en avantage concret. Gain : Savoir +2.",
        cout: 2,
        id: "esprit-erudit"
    },
    {
        nom: "Coordination Affûtée",
        effet: "Tes gestes sont plus propres, précis et contrôlés, même sous stress ou en mouvement. Tu rattrapes mieux les petites erreurs et perds moins d'efficacité sur les actions délicates. Gain : Finesse +2.",
        cout: 2,
        id: "coordination-affutee"
    },
    {
        nom: "Réflexes Primitifs",
        effet: "Tu sens mieux le danger et tu réagis plus vite aux signaux faibles : intention, mouvement, changement d'ambiance. Même sans réfléchir longtemps, tu choisis plus souvent la bonne action au bon timing. Gain : Instinct +2.",
        cout: 2,
        id: "reflexes-primitifs"
    },
    {
        nom: "Force Ancrée",
        effet: "Ta force brute dépasse la norme : frappes plus lourdes, poussées plus nettes, prises plus difficiles à rompre. Tu convertis mieux ton effort en impact réel, sans te \"vider\" inutilement. Gain : Puissance +2.",
        cout: 2,
        id: "force-ancree"
    },
    {
        nom: "Aisance Relationnelle",
        effet: "Tu lis mieux les gens et tu adaptes naturellement ton ton, tes mots et ta posture selon le contexte. Tu obtiens plus facilement coopération, informations ou ouverture, sans forcer. Gain : Social +2.",
        cout: 2,
        id: "aisance-relationnelle"
    },
    {
        nom: "Nerfs d'Acier",
        effet: "Tu gardes la tête froide quand ça crie, quand ça saigne, ou quand tout part en vrille. La panique te prend moins et tes décisions restent plus propres sous pression. Gain : Sang-froid +2.",
        cout: 2,
        id: "nerfs-acier"
    },
    {
        nom: "Savoir-Faire Polyvalent",
        effet: "Tu as entraîné ton savoir-faire global à travers différentes tâches et outils, en affinant tes automatismes et ta manière de t'adapter aux contraintes. Tu gagnes en efficacité dès qu'il faut improviser, réparer, produire ou exécuter une procédure proprement, même hors de ta spécialité exacte. Gain : Trait spécifique Métier +2.",
        cout: 2,
        id: "savoir-faire-polyvalent"
    },
    {
        nom: "Réveil du Potentiel Physique",
        effet: "Tu éveilles ton corps au combat : pour les styles basés sur le corps, tu supprimes la division des dégâts liée aux caractéristiques de corps (tu appliques les dégâts \"plein\" selon ta règle d'éveil). À l'acquisition du talent, tu lances immédiatement 2 dés de gain de PE (comme lors d'une montée de niveau) et ajoutes le résultat à tes PE.",
        cout: 3,
        id: "reveil-potentiel-physique"
    },
    {
        nom: "Éveil Magique",
        effet: "Tu débloques ton potentiel mystique : la magie devient accessible au personnage. Si ton dé de base de PM était inférieur à 1d12, il passe à 1d12. À l'acquisition du talent, tu lances immédiatement 2 dés de gain de PM (comme lors d'une montée de niveau) et ajoutes le résultat à tes PM.",
        cout: 3,
        id: "eveil-magique"
    },
    {
        nom: "Corps de rock",
        effet: "Ton corps encaisse mieux les chocs et les impacts : posture plus stable, muscles plus denses, réflexes de verrouillage plus efficaces. Tu gagnes +3 en Mode de Défense Physique de façon permanente",
        cout: 2,
        id: "corps-rock"
    },
    {
        nom: "Corps magique",
        effet: "Ton organisme et ton aura deviennent plus résistants aux pressions magique : meilleure tenue du flux, esprit plus \"ancré\" face aux attaques mystiques. Tu gagnes +3 en Mode de Défense Magique de façon permanente",
        cout: 2,
        id: "corps-magique"
    },
    {
        nom: "Dialecte des Rues",
        effet: "Tu connais l'argot commun des quartiers populaires : formules, menaces voilées, humour, codes de respect. Tu évites les maladresses qui te feraient passer pour un pigeon et tu sais poser des questions sans \"sonner officiel\".Offre compétence trait spécifique : Dialecte rue +2",
        cout: 1,
        id: "dialecte-rues"
    },
    {
        nom: "Dialecte Noble",
        effet: "Tu maîtrises les tournures de politesse, les implicites et la façon de parler \"sans dire\". Tu sais quand flatter, quand rester vague et comment éviter l'impair qui ferme une porte.Offre compétence trait spécifique : Dialecte Noble +2",
        cout: 1,
        id: "dialecte-noble"
    },
    {
        nom: "Dialecte Criminel",
        effet: "Tu connais les codes de prudence : phrases à double sens, règles d'accès, façons de tester un inconnu. Tu sais parler sans t'auto-incriminer et obtenir une info sans déclencher une alarme. Offre compétence trait spécifique : Dialecte criminel +2",
        cout: 1,
        id: "dialecte-criminel"
    },
    {
        nom: "Dialecte Religieux",
        effet: "Tu connais les tournures de foi, les références morales, et la manière de demander sans paraître blasphématoire. Tu sais quand parler d'humilité, de devoir, de \"preuve\", et comment éviter de heurter un dogme.Offre la compétence de trait spécifique : Dialecte Religieux +2",
        cout: 1,
        id: "dialecte-religieux"
    },
    {
        nom: "Linguiste chevronné",
        effet: "Une fois par personnage , le lanceur Obtient une nouvelle langue de base",
        cout: 1,
        id: "linguiste"
    },
    {
        nom: "Ramasseur d'arme",
        effet: "1 fois par tour, tu peux ramasser une arme au sol sans consommer d'action.Si tu as déjà utilisé cet effet durant le tour, toute autre prise d'arme effectuée ensuite coûte 1 PR (au lieu d'être gratuite).",
        cout: 1,
        id: "ramasseur-arme"
    },
    {
        nom: "Analyste",
        effet: "(Condition : avoir 30 PER minimum)Lorsque tu effectues une analyse magique précise d'une entité (aura, résidus, enchantements, nature de sort, corruption, etc.), tu obtiens +5 au jet. Cela te donne aussi accès à la compétence dédiée « Analyse magique approfondie » (N.A +5) pour ce type d'examen. En plus, ton taux de succès critique sur ce jet augmente du MOD de PER ou du MOD d'INT (au choix selon ce qui s'applique à ton analyse).",
        cout: 2,
        id: "analyste"
    },
    {
        nom: "Analyste magique",
        effet: "(Condition : avoir 30 PER minimum et maîtriser la magie)Lorsque tu réalises une analyse physique précise d'une entité (lecture du corps, blessures, posture, signes biologiques, etc.), tu obtiens +5 au jet. Cela te donne aussi accès à la compétence dédiée « Analyse corporelle approfondie » (N.A +5) pour ce type d'examen. En plus, ton taux de succès critique sur ce jet augmente du MOD de PER.",
        cout: 2,
        id: "analyste-magique"
    },
    {
        nom: "Guide né",
        effet: "Le lanceur gagne +10 en Orientation (basé sur Perception) et +2 en Instinct ou Métier lors d'une exploration en terrain inconnu.",
        cout: 1,
        id: "guide-ne"
    },
    {
        nom: "Rations Frugales",
        effet: "Tu sais survivre en rationnant sans t'écrouler : même si ce n'est pas idéal, tu peux fonctionner avec ½ ration de nourriture et ½ consommation d'eau comme minimum de survie. Tant que tu respectes ce minimum, tu ne subis pas les pénalités \"immédiates\" liées au manque total (les conséquences long terme restent possibles selon tes règles).",
        cout: 1,
        id: "rations-frugales"
    },
    {
        nom: "Ambidextrie",
        effet: "Permet d'utiliser deux armes sans malus ni réduction de dégâts.",
        cout: 2,
        id: "ambidextrie"
    },
    {
        nom: "Yeux dans le dos",
        effet: "Tu as pris l'habitude de verrouiller tes appuis et ton dos : les coups \"dans le dos\" te surprennent moins. Les dégâts bonus de Sournoiserie d'une attaque sournoise subie dans le dos sont réduits de moitié.",
        cout: 1,
        id: "yeux-dos"
    },
    {
        nom: "Maître des embuscade",
        effet: "Lorsqu'une embuscade est subie, tu gardes ton sang-froid : tu ne lances pas ton jet en désavantage, et ton jet de Perception pour éviter l'effet « Surpris » se fait avec Avantage.Lorsque c'est toi qui produis l'embuscade, tu désignes une cible : cette cible fait son jet pour éviter « Surpris » en Désavantage. En plus, quand tu déclenches une embuscade, tu gagnes +10 en Initiative pour cette ouverture.",
        cout: 2,
        id: "maitre-embuscade"
    },
    {
        nom: "Marcheur des Éléments",
        effet: "Tes voyages t'ont endurci face à une nature élémentaire choisie : tu gagnes Résistance mineure à un élément (feu, glace, foudre, vent, terre, etc.). Interdit : choisir un élément qui correspond à une faiblesse raciale/atout Faiblesse, et exclus : Lumière/Ténèbres + natures non élémentaires. Progression : chaque amélioration augmente la résistance de +10% ; Mineur → Avancé = 2 améliorations, puis Avancé → Maximal (Parfait) = 3 améliorations.",
        cout: 2,
        id: "marcheur-elements"
    },
    {
        nom: "Stabilité d'Incantation",
        effet: "Quand tu subis une attaque ou une perte de PV et que tu dois effectuer un jet de maintien de sort (basé sur Résilience), ce jet est réalisé avec Avantage.",
        cout: 2,
        id: "stabilite-incantation"
    },
    {
        nom: "Corps Martial — Conversion Puissance",
        effet: "(Condition : maîtriser en Avancé un style de combat de corps basé sur Force de combat/Force)Ton corps a appris à frapper \"avec le poids du réel\" : pour tes attaques de corps physiques qui utilisaient Force de combat/Force, tu peux désormais utiliser Puissance à la place",
        cout: 2,
        id: "corps-martial-puissance"
    },
    {
        nom: "Sanguinaire",
        effet: "Tes coups cherchent naturellement les zones qui \"ouvrent\" : artères, tendons, points sensibles et angles qui font céder la chair. Quand tu tentes d'appliquer un saignement via une arme non magique, tu augmentes le taux de réussite de +10%.",
        cout: 1,
        id: "sanguinaire"
    },
    {
        nom: "Corps Martial — Conversion Finesse",
        effet: "(Condition : maîtriser en Avancé un style de combat de corps basé sur Dextérité)Tes coups deviennent plus propres, plus précis, plus efficaces : pour tes attaques de corps physiques qui utilisaient Dextérité, tu peux désormais utiliser Finesse à la place",
        cout: 2,
        id: "corps-martial-finesse"
    },
    {
        nom: "Empoisonneur",
        effet: "Tu sais où et comment déposer une toxine pour qu'elle prenne vraiment : entaille utile, dosage cohérent et frappe qui \"fait entrer\" le produit. Quand tu tentes d'appliquer un empoisonnement via une arme non magique, tu augmentes le taux de réussite de +10%.",
        cout: 1,
        id: "empoisonneur"
    },
    {
        nom: "Maître natation",
        effet: "(Condition : avoir le talent « Expertise du Nageur »)Tant que ton jet de natation vise une difficulté ≤ DD 12, tu le réalises avec Avantage. De plus, pour toute épreuve de natation DD 10, la Difficulté est réduite de -2 (donc tu rends ces situations \"triviales\" sans être invincible).",
        cout: 1,
        id: "maitre-natation"
    },
    {
        nom: "Transmission de statistique",
        effet: "(uniquement 2 fois max par personnage)Permet de transférer des points de dés de base entre PV, PM ou PE jusqu'à Max 4 (en une fois) (ex. réduire 1d16 PV → 1d14 PV pour augmenter 1d10 PE → 1d12 PE).",
        cout: 3,
        id: "transmission-stat"
    },
    {
        nom: "Souffle Fantôme",
        effet: "(Condition : Maîtrise mineure du Contrôle Respiratoire)En calant ton souffle sur une cible ou en le réduisant au strict minimum, tu peux \"effacer\" ta présence : pour 5 PE, tu fais un jet de Sang-froid DD 10 minimum ; en cas de réussite, ton prochain jet de Discrétion est fait avec Avantage, tant que tu restes immobile. En plus, tous tes jets liés au contrôle respiratoire en situation voient leur Difficulté réduite de -2 (hors l'activation spéciale ci-dessus).",
        cout: 1,
        id: "souffle-fantome"
    },
    {
        nom: "Montagnard",
        effet: "Tu es habitué aux pentes, au froid sec, à l'air pauvre et aux appuis traîtres : ton corps et tes réflexes \"lisent\" la montagne avant même que tu y penses. Quand tu effectues un jet lié à un évènement naturel de type Montagne (escalade, progression, survie, météo brutale, terrain instable…), et que ce jet est basé sur Métier, Finesse, Instinct ou Résilience, la Difficulté est réduite de -2. Ce bonus représente une adaptation réelle au relief et aux risques, pas une immunité.",
        cout: 1,
        id: "montagnard"
    },
    {
        nom: "Forestier",
        effet: "Tu sais te déplacer et agir dans le vivant : racines, boue, ronces, humidité, visibilité variable et bruits parasites deviennent \"normaux\" pour toi. Quand tu effectues un jet lié à un évènement naturel de type Forêt / milieu forestier (pistage, orientation, traversée, discrétion, intempéries, obstacles…), et que ce jet est basé sur Métier, Finesse, Instinct ou Résilience, la Difficulté est réduite de -2. Ce bonus reflète ton aisance de terrain et ta gestion des contraintes, pas un avantage magique.",
        cout: 1,
        id: "forestier"
    },
    {
        nom: "Lecteur de Cartes",
        effet: "Tu sais exploiter une carte comme un vrai outil de terrain : repères, distances, relief et chemins plausibles. Tant que tu utilises une carte fiable de la zone (même approximative mais cohérente), tous les jets liés au repérage par carte et à la planification de trajet / voyage sont effectués avec Avantage. Ce bonus ne s'applique pas si la carte est fausse, hors-zone ou volontairement trompeuse.",
        cout: 1,
        id: "lecteur-cartes"
    },
    {
        nom: "Sommeil Régulier",
        effet: "Ton corps récupère mieux quand le repos est \"propre\" et complet. Si tu obtiens un repos Normal / Bon / Apaisant, tu gagnes +10 sur le jet (ou résultat) de repos associé. En revanche, si le repos est Mauvais ou Exécrable, tu subis -5 à ce même jet (ton organisme \"paye\" plus cher les mauvaises nuits).",
        cout: 1,
        id: "sommeil-regulier"
    },
    {
        nom: "Équilibriste Né",
        effet: "(Condition : avoir « Maîtrise de l'Équilibre » au rang Avancé)Quand tu dois simplement te maintenir en équilibre (sur une poutre, un rebord, un objet instable), tout test de DD 8 ou moins est automatiquement réussi. De plus, toute épreuve demandant un équilibre en action (bouger, manipuler, combattre tout en restant stable) voit sa DD réduite de -2.",
        cout: 1,
        id: "equilibriste-ne"
    },
    {
        nom: "Réveil Instinctif",
        effet: "Même endormi, tu gardes une part de vigilance : bruits, changements d'air, présence proche. Si tu es pris en embuscade pendant ton sommeil, tu peux effectuer un jet de Perception pour éviter de subir automatiquement l'effet Surpris. En cas de réussite critique, tu gagnes en plus +10 MD (Marge Défensive) contre la première action/attaque que tu subis au début de l'embuscade.",
        cout: 1,
        id: "reveil-instinctif"
    },
    {
        nom: "Assise Inébranlable",
        effet: "(Condition : Avoir le talent « Savoir-faire : Conduite de monture »)Tu as travaillé ta posture, ton gainage et tes réflexes pour rester \"collé\" à la selle même quand ça secoue. Tu obtiens Avantage sur tous les jets de Constitution (ou équivalent) liés au fait de te maintenir en selle / éviter la chute / encaisser les secousses. En plus, tout jet de Conduite de monture que tu effectues voit sa Difficulté réduite de -2.",
        cout: 2,
        id: "assise-inebranlable"
    },
    {
        nom: "Grimpeur Accroche-Mur",
        effet: "(Condition : avoir le talent « Grimpeur » et Finesse 6)Tout jet de grimpette visant une DD 10 ou moins est automatiquement réussi. Quand tu grimpes en action, si tu subis une attaque non-zone pendant cette action, l'attaque contre toi est faite en Désavantage, et tu ne perds pas la première fois par tour ton mouvement lors d'une progression de grimpe \"raisonnable\" sur une structure.",
        cout: 2,
        id: "grimpeur-accroche"
    },
    {
        nom: "Pointe de Charge",
        effet: "(Avoir le talent : « Savoir-faire : Conduite de monture »)Tu sais aligner vitesse, distance et timing pour frapper au moment où la charge \"porte\" le plus. Quand tu attaques en charge / mouvement avec une arme d'hast (lance, hallebarde, arme similaire), tu gagnes un bonus au taux de critique égal à la moitié de ta statistique Métier (arrondie à l'inférieur).",
        cout: 2,
        id: "pointe-charge"
    },
    {
        nom: "Pêcheur de Rumeurs",
        effet: "(Condition : avoir « Récolteur d'informations » au rang Modéré)En ville, tu peux \"pêcher\" l'info une fois par jour : soit en discutant (jet de Charisme), soit en écoutant et observant (jet de Perception), ce qui te coûte 15 PE. Pour chaque tranche de 10 MR sur ton jet, tu obtiens une catégorie d'info (10 : mineure, 20 : spéciale, 30 : importante/quête, 40 : clé) ; si tu dois rester discret pour enquêter, tu fais aussi un jet de Discrétion (Finesse) DD 10 minimum. (Les infos ne sont pas \"farmables\" : une zone a un stock logique par période.)",
        cout: 2,
        id: "pecheur-rumeurs"
    },
    {
        nom: "Pouvoir du Patron",
        effet: "(Condition : Classe de Sorcier Occulte/Éclat du Cirque/Classe Magique Non Conventionnelle (spécifique)/Mage pactisant/Barde/Danseur de combat)Le lanceur peut d'utiliser la Caractéristique de Charisme (CHA) à la place de l'Intelligence (INT) pour le lancement de ses sorts lier au maîtrise de classe . Tous les tests de magie et d'incantation sont désormais basés sur CHA au lieu d'INT(Mod INT remplacer par MOD CHA sur les dgts)",
        cout: 2,
        id: "pouvoir-patron"
    },
    {
        nom: "Forteresse d'Acier (Armure lourde)",
        effet: "(Condition : Avoir une Constitution de 40 minimum)Tant que tu portes une armure lourde, tu en exploites la protection à plein : tu ignores totalement le malus de déplacement imposé par l'armure lourde. De plus, tous tes jets de Résilience visant à résister à une application non magique de Saignement, Empoisonnement ou Altération d'état provoquée par une arme tranchante sont effectués avec Avantage.",
        cout: 2,
        id: "forteresse-acier"
    },
    {
        nom: "Réactivité Supérieure",
        effet: "Tu augmentes ta capacité à enchaîner les réactions en situation critique. Gain : +1 Point de Réaction (PR) permanent.",
        cout: 2,
        id: "reactivite-superieure"
    },
    {
        nom: "Garde de Velours (Armure légère)",
        effet: "(Condition : Avoir une finesse de 5 minimum)Tant que tu portes une armure légère, 1 fois par tour, tu peux dépenser 1 Point de Réaction (PR) pour déclencher une posture défensive instantanée. Tu gagnes alors un bonus de MD égal à ta Finesse (X = valeur du trait spécifique Finesse) jusqu'à la fin de l'action ennemie en cours (ou jusqu'au début de ton prochain tour, selon ton timing de règles).",
        cout: 2,
        id: "garde-velours"
    },
    {
        nom: "Purge de Corruption",
        effet: "Tu as appris à \"réajuster\" ton état interne pour retarder la progression de la dégénérescence maudite. Gain : 1 charge de Purge (stockable). À tout moment, tu peux dépenser cette charge pour réduire de 10% ton avancement de Dégénérescence Maudite. (En général : la charge est consommée à l'usage.)",
        cout: 2,
        id: "purge-corruption"
    },
    {
        nom: "Mailles Anti-Perforation (Armure intermédiaire)",
        effet: "(Condition : Avoir une Constitution de 30 minimum)Tant que tu portes une armure intermédiaire (maille), toute tentative de Perforation qui te vise est effectuée en Désavantage. En contrepartie, tu es plus à l'aise en mouvement : tu ne subis plus le désavantage lié aux mouvements finaux basés sur la Finesse (ex : déplacement contrôlé, repositionnement, appuis, etc.).",
        cout: 2,
        id: "mailles-anti-perforation"
    },
    {
        nom: "Maître de guerre : arme de Maître",
        effet: "(Condition : posséder Initiation du Stratège (ex \"Nouvelle Campagne\") et avoir une maîtrise d'arme au rang Parfait)Une fois par tour, en dépensant 1 PMG, tu déclenches une attaque avec ton arme liée à cette maîtrise Parfaite en choisissant un seul des deux effets : (A) l'attaque est faite avec Avantage, ou (B) le jet de dégâts obtient l'effet \"Puissance optimale\". Tu ne peux pas cumuler les deux sur la même attaque : c'est l'un ou l'autre, à chaque utilisation.",
        cout: 2,
        id: "mdg-arme-maitre"
    },
    {
        nom: "Maître de guerre : Haste",
        effet: "(Condition : avoir le talent «Maître de guerre : nouvelle Campanie» )1 fois par tour, tu peux dépenser 2 PMG pour déclencher une Haste tactique : tu gagnes immédiatement +X Mouvement (X = 5 + MOD Constitution) et tu ignores les pénalités de terrain \"léger\" (gravats, boue faible, foule) jusqu'à la fin de ton action. Si cette impulsion te permet d'atteindre une cible, tu peux en plus convertir ta prochaine attaque du tour en attaque \"de tempo\" : elle ne gagne aucun bonus de dégâts, mais ton jet pour toucher est fait avec Avantage (attaque unique, pas multi-attaque, pas réaction).",
        cout: 2,
        id: "mdg-haste"
    },
    {
        nom: "Maître de guerre : Briseur de Plates",
        effet: "(Condition : posséder Initiation du Stratège et avoir une maîtrise d'arme contondante au rang Moyen)Une fois par tour, tu peux renforcer une attaque contondante en dépensant au minimum 1 PMG : ton attaque gagne +10% de chance d'appliquer Destruction d'armure. Si ton arme possède déjà un mécanisme/effet permettant Destruction d'armure, tu peux augmenter ce taux de +5% par PMG supplémentaire dépensé (tant que les conditions normales d'application de l'effet sont respectées).Spécialisation — Casseur de Garde (Passive Maître de guerre) : Effet : choisis un type d'armure : Légère / Intermédiaire / Lourde. Contre ce type, l'application de Destruction d'armure est faite avec Avantage (selon tes règles d'application). Tu peux changer ce choix une fois par repos long.",
        cout: 2,
        id: "mdg-briseur-plates"
    },
    {
        nom: "Maître de guerre : Égide du Commandant",
        effet: "(Condition : posséder Initiation du Stratège (ex \"Nouvelle Campagne\"))Une fois par tour, tu peux dépenser 3 PMG pour te protéger au moment critique : sur une attaque subie, tu doubles ta Valeur de MD appliquée contre cette attaque pendant une seule fenêtre d'action, c'est-à-dire l'action et/ou la réaction immédiate liée à cette défense. L'effet ne dure pas au-delà de cette résolution : c'est un \"bouclier tactique\" instantané, pas un buff permanent.",
        cout: 2,
        id: "mdg-egide"
    },
    {
        nom: "Maître de guerre : Doctrine de l'Hémorragie",
        effet: "(Condition : posséder Initiation du Stratège et avoir une maîtrise d'arme tranchante au rang Moyen)Une fois par tour, tu peux renforcer une attaque tranchante en dépensant au minimum 1 PMG : ton attaque gagne +10% de chance d'appliquer Saignement. Si ton arme possède déjà un mécanisme/effet permettant Saignement, tu peux augmenter ce taux de +5% par PMG supplémentaire dépensé (tant que les conditions normales d'application de l'effet sont respectées).Spécialisation — Entaille Fondatrice (Passive Maître de guerre) : Effet : la première fois que tu infliges au moins 1 niveau de Saignement à une cible, tu ajoutes +1 × X niveaux supplémentaires à cette première infliction (une seule fois par cible). X = le rang de maîtrise de l'arme utilisée (selon ton échelle : Moyen/Avancé/Parfait, etc.).",
        cout: 2,
        id: "mdg-hemorragie"
    },
    {
        nom: "Maître de guerre : Assaut Impératif",
        effet: "(Condition : posséder Initiation du Stratège)Une fois par tour, quand tu déclares une attaque contre une cible, tu peux dépenser 3 PMG pour enclencher une Course tactique : tu te précipites immédiatement vers la cible (comme l'action Course), puis tu obtiens une attaque immédiate contre elle en dépensant 1 Point de Réaction (PR). Cette attaque n'est pas une capacité spéciale : c'est une attaque \"normale\", simplement rendue possible par ton assaut.",
        cout: 2,
        id: "mdg-assaut"
    },
    {
        nom: "Maître de guerre : Doctrine de la Rupture",
        effet: "(Condition : posséder Initiation du Stratège et avoir une maîtrise d'arme contondante au rang Moyen)Une fois par tour, tu peux renforcer une attaque contondante en dépensant au minimum 1 PMG : ton attaque gagne +10% de chance d'appliquer Fragilisation. Si ton arme possède déjà un mécanisme/effet permettant Fragilisation, tu peux augmenter ce taux de +5% par PMG supplémentaire dépensé (tant que les conditions normales d'application de l'effet sont respectées).Spécialisation — Faille Exploitée (Passive Maître de guerre) : Effet : dès que tu as appliqué Fragilisation sur une cible, tes attaques contre cette cible sont faites avec Avantage pour toucher (jusqu'à la fin de la durée de Fragilisation, ou tant que l'effet est actif selon tes règles).",
        cout: 2,
        id: "mdg-rupture"
    },
    {
        nom: "Maître de guerre : Brèche d'Armure",
        effet: "(Condition : posséder Initiation du Stratège et avoir une maîtrise d'arme au rang Modéré/Moyen)Ce talent te permet d'activer (ou d'amplifier) l'effet Réduction d'armure selon le type d'arme : Tranchant → s'applique sur armures légères et intermédiaires ; Contondant → s'applique sur armures intermédiaires et lourdes. Coût : 1 PMG pour appliquer Réduction d'armure 10% si ton arme ne possède pas déjà l'effet. Si ton arme a déjà une Réduction d'armure, tu augmentes sa valeur de +5% par PMG supplémentaire dépensé (en respectant les conditions normales d'application de l'effet).Spécialisation — Impact Forcé (Passive Maître de guerre) :Effet : une fois par combat, si tu rates une attaque de corps-à-corps avec une arme qui possède Réduction d'armure (X ou globale), tu peux \"forcer\" la réussite à condition que ta MR ne soit pas inférieure à -20. L'attaque est alors considérée comme réussie, mais elle n'inflige que 50% des dégâts finaux. L'objectif est de transformer un raté en coup \"glissant\" qui marque quand même l'armure.",
        cout: 2,
        id: "mdg-breche"
    },
    {
        nom: "Maître de guerre : Initiation du Stratège",
        effet: "Tu débloques l'accès aux options tactiques de la voie Maître de guerre. À l'acquisition, tu obtiens 2 Points de Maître de guerre (PMG), utilisables uniquement en phase de combat. Ces points servent à activer tes options tactiques et te rendent éligible à l'achat des talents portant le tag « Maître de guerre ». Ensuite, tous les 5 niveaux, tu gagnes +2 PMG supplémentaire (cumulable).",
        cout: 3,
        id: "mdg-initiation"
    },
    {
        nom: "Maître de guerre : surcharge",
        effet: "(Condition : posséder Initiation du Stratège et maîtriser une arme au rang Moyen (ou supérieur))Quand tu réussis une réaction défensive liée à cette arme (parade, blocage, manœuvre défensive selon tes règles), tu peux dépenser 2 PMG pour enchaîner : ton prochain jet offensif réalisé dans la continuité immédiate (la riposte ou l'attaque qui suit ta défense, selon ta fenêtre de tour) est effectué avec Avantage. Ce talent récompense les défenses propres qui cassent le rythme adverse.",
        cout: 2,
        id: "mdg-surcharge"
    },
    {
        nom: "Sanctuaire Arcanique",
        effet: "(Condition : avoir une classe de mage \"pure\" (pas juste utilisateur magique))Quand tu affrontes une entité magique, ton aura se \"verrouille\" et tes réflexes défensifs deviennent plus nets face aux flux surnaturels. Tu gagnes alors un bonus de MD (Marge Défensive) égal au double de ton MOD d'INT ou du MOD de SAG (selon la caractéristique utilisée par ta classe pour la magie).",
        cout: 2,
        id: "sanctuaire-arcanique"
    },
    {
        nom: "Ancrage du Combattant",
        effet: "(Condition : Avoir 30 en Constitution Minimum)Ton corps sait encaisser les chocs qui cherchent à te faire céder : bousculade, projection, déséquilibre ou déplacement forcé. Tous tes jets de résistance basés sur la Constitution contre ces effets sont améliorés par un entraînement spécifique et une meilleure lecture de l'impact sont fait en avantage",
        cout: 1,
        id: "ancrage-combattant"
    },
    {
        nom: "Pistage d'huron",
        effet: "(Condition : avoir une maîtrise du Pistage)En milieu naturel, tu sais effacer ta présence et choisir des trajectoires qui n'offrent presque aucun indice exploitable. Lors d'une phase de traque, la MR minimale requise pour te repérer devient égale à 5 × (rang de maîtrise du Pistage) : plus ta maîtrise est haute, plus tu deviens difficile à \"accrocher\" sur le terrain.",
        cout: 2,
        id: "pistage-huron"
    },
    {
        nom: "Accord Élémentaire Profond",
        effet: "Ton lien avec ta source élémentaire est plus stable que la normale : tu \"absorbes\" mieux les perturbations et ton corps réagit plus vite aux agressions de même nature. Tu obtiens un bonus permanent de +10% sur tes résistances magiques élémentaires liées à ta Source élémentaire de base (feu, eau, vent, terre, foudre, etc.).",
        cout: 1,
        id: "accord-elementaire"
    },
    {
        nom: "Fondations Musicales",
        effet: "(Condition : Avoir un talent lier a un instrument musical)Tu as acquis les bases \"propres\" de performance : tempo, justesse, présence et gestion du public. Même sans être un virtuose, tu peux produire une prestation stable et exploitable en scène, cérémonie ou diversion.Offre : Compétence : Prestation musicale N.A +10 (bonus uniquement sur les compétences N.A)",
        cout: 1,
        id: "fondations-musicales"
    },
    {
        nom: "Numéro de Piste",
        effet: "(Condition : Avoir un talent lié aux arts de scène (cirque, comédie, acrobatie scénique, etc.))Tu sais structurer un numéro : timing, relances, placement et sécurité du geste. Tes performances de cirque deviennent plus nettes et plus fiables, même sous stress ou en environnement imparfait.Offre : Compétence : Prestation de cirque N.A +10 (bonus uniquement sur les compétences N.A)",
        cout: 1,
        id: "numero-piste"
    },
    {
        nom: "Voix de Scène",
        effet: "(Condition : Avoir un talent lier a un instrument musical)Ta voix est entraînée : souffle, projection, tenue des notes et contrôle émotionnel. Tes chants deviennent plus crédibles, plus réguliers, et nettement plus efficaces pour porter une ambiance ou attirer l'attention.Offre : Compétence : Prestation de chant N.A +10 (bonus uniquement sur les compétences N.A)",
        cout: 1,
        id: "voix-scene"
    },
    {
        nom: "Initiation du Porte-Bouclier",
        effet: "Tu as appris les fondamentaux du bouclier : angles, appuis, protection et usage offensif simple. Tu ne subis plus le désavantage / malus lié à l'absence de maîtrise lorsqu'un personnage utilise un bouclier \"de base\".En plus, tu obtiens la compétence : Bouclier (N.A) +5.",
        cout: 1,
        id: "initiation-bouclier"
    },
    {
        nom: "Rire qui Tient Debout",
        effet: "(Condition : avoir le talent « Blagueur » en Moyen)Tu sais trouver la blague qui tombe juste, même quand l'atmosphère est lourde. Une fois par session, tu peux tenter de remonter le moral du groupe en faisant un jet de Social DD 20.• Réussite : tu offres 1 Point d'Avantage à un allié (valable durant cette session uniquement).• Succès critique : tu convertis 1 Dé de Fatalité en Dé de Destin ; si ce n'est pas possible, alors tous les alliés gagnent 1 Point d'Avantage permanent.• Échec critique : toi seul subis 1 Point de Désavantage.",
        cout: 2,
        id: "rire-debout"
    },
    {
        nom: "Fondations de l'Archerie",
        effet: "Tu connais les bases qui évitent les erreurs classiques : posture, traction, ancrage, et lecture rapide de distance. Tu peux utiliser l'arc sans subir les malus d'incompétence, car tes gestes sont déjà structurés. Gain : Compétence \"Tir à l'arc\" (N.A) +5.",
        cout: 1,
        id: "fondations-archerie"
    },
    {
        nom: "Initiation au Pistolet",
        effet: "Tu as appris les fondamentaux : prise en main, visée rapide, gestion du recul et sécurité du tir. Tu peux utiliser les armes à feu courtes sans subir les malus d'incompétence, car tu connais les automatismes essentiels. Gain : Compétence \"Tir – Arme à feu courte\" (N.A) +5.",
        cout: 1,
        id: "initiation-pistolet"
    },
    {
        nom: "Fondations de l'Arbalète",
        effet: "Tu as appris le tir \"mécanique\" : rechargement efficace, placement, sécurité et timing du tir. Tu peux utiliser l'arbalète sans subir les malus d'incompétence, car tu sais gérer son rythme et ses contraintes. Gain : Compétence \"Tir à l'arbalète\" (N.A) +5.",
        cout: 1,
        id: "fondations-arbalete"
    },
    {
        nom: "Initiation au Fusil",
        effet: "Tu maîtrises les bases du tir posé : appui, respiration, stabilité et enchaînement visée/tir. Tu peux utiliser les armes à feu longues sans subir les malus d'incompétence, car tu sais tirer \"propre\" même sous pression. Gain : Compétence \"Tir – Arme à feu longue\" (N.A) +5.",
        cout: 1,
        id: "initiation-fusil"
    },
    {
        nom: "Initiation Martiale : Arme X",
        effet: "Tu as reçu une formation basique sur une arme de corps-à-corps commune (non exotique/spéciale). Tant que tu utilises l'arme choisie, tu ne subis pas le malus lié au fait de ne pas posséder sa maîtrise (uniquement pour les armes de mêlée \"basiques\").En plus, tu gagnes la compétence « Arme X » N.A +5 (X = arme choisie). Ce talent peut être repris une fois par arme.",
        cout: 1,
        id: "initiation-martiale"
    },
    {
        nom: "Soigneur des Compagnons",
        effet: "(Condition : avoir Savoir-faire : Premiers soins ou être Chasseur / Liant / Chaman)Tu as l'habitude de traiter griffures, morsures, fractures et états de panique chez les bêtes. Tous les soins réalisés sur un animal (soins animaliers / premiers soins appliqués à une bête) sont effectués avec Avantage. Si le soin demandé est DD 10 ou moins, il est automatiquement réussi.En combat, tu peux tenter de stabiliser/soigner un animal en utilisant 1 PR (intervention rapide). Si tu rates ce jet, tu peux le relancer, mais cela consomme ton Action et te coûte 8 PE (effort intense + geste complet).",
        cout: 2,
        id: "soigneur-compagnons"
    },
    {
        nom: "Lecteur Méthodique",
        effet: "Ton cerveau sait organiser l'info : tu relies les concepts, tu vérifies les détails et tu évites les raccourcis faciles. Quand tu fais un jet de Savoir sur une connaissance Intermédiaire ou plus, le test est effectué avec Avantage.",
        cout: 1,
        id: "lecteur-methodique"
    },
    {
        nom: "Pratique du Rite",
        effet: "Tu maîtrises les réflexes de préparation : matériaux, séquence, gestes propres et vérifications qui évitent les erreurs bêtes. Tant que le rituel se fait hors combat (ou sans menace immédiate), tu exécutes la procédure avec une stabilité supérieure.Effet : Tous les jets liés à un rituel/préparation de rituel hors combat sont en Avantage",
        cout: 1,
        id: "pratique-rite"
    },
    {
        nom: "Faveur du Destin",
        effet: "(Une fois par personnage)Ton destin \"accroche\" parfois : il refuse de te laisser payer le prix tout de suite. Une fois par session, quand tu dépenses 1 Point de Destin, tu peux activer ce talent : tu as 50% de chance que le point ne soit pas consommé. Tant que tu n'as pas obtenu ce succès, l'effet reste \"en attente\" et pourra être retenté à la session suivante (jusqu'à réussite).",
        cout: 2,
        id: "faveur-destin"
    },
    {
        nom: "Réserve de Dépassement",
        effet: "Tu as appris à pousser une compétence au-delà de sa limite normale quand elle est déjà au plafond. Tu stockes une petite réserve de \"Dépassement\" utilisable uniquement sur des compétences déjà au maximum (ex : 10–15 selon ton système).Offre : +2 Points de Dépassement (réserve) ; utilisables seulement sur une compétence au max ; augmente sa limite de +5",
        cout: 2,
        id: "reserve-depassement"
    },
    {
        nom: "Cœur de Traque : Monstres & Bêtes",
        effet: "Tu as déjà tenu face à des choses qui ne ressemblent pas à des hommes. Lorsque tu fais face à une créature non humanoïde (bête, monstre animal, aberration, créature bestiale, etc.), tu gagnes +2 sur tous tes jets de Sang-froid liés à sa présence (peur, intimidation \"bestiale\", pression).Tu obtiens aussi la compétence « Sang-froid — Peur des bêtes » +2 (améliorable). Enfin, si tu dois réussir un jet de Sang-froid de DD 10 ou plus contre ce type de créature, tu peux 1 fois par scène/combat relancer le jet en gardant le meilleur résultat.",
        cout: 2,
        id: "coeur-traque"
    },
    {
        nom: "Sceau d'Over-Dépassement",
        effet: "Tu brises une barrière rare : une compétence déjà au maximum absolu peut être poussée encore plus loin, comme un \"super dépassement\". Cette montée est unique, lourde et définitive : c'est une exception, pas une routine.Offre : +1 Point d'Over-Dépassement (1 fois par personnage) ; utilisable seulement sur une compétence au max ultime (ex : 20) ; augmente sa limite de +10",
        cout: 3,
        id: "sceau-over"
    },
    {
        nom: "Noyau d'Instinct Anti-Terreur",
        effet: "(Condition : Avoir le talent « Cœur de Traque : Monstres & Bêtes »)Quand tu subis une tentative de peur (naturelle ou magique) provenant d'une créature, et que tu résistes à cet effet (réussite sur ton jet), ton prochain jet lié à cette confrontation est effectué avec Avantage (dans le cadre logique de la scène/du combat).Si, en plus, tu obtiens un Succès Critique sur cette résistance, tu transformes ta montée d'adrénaline en violence maîtrisée : sur ta prochaine attaque directe non magique contre la créature à l'origine de la peur, tu gagnes un bonus de succès critique égal à ta stat de Sang-froid. Limite : 1 fois par tour.",
        cout: 2,
        id: "noyau-anti-terreur"
    },
    {
        nom: "Verrou d'Appuis",
        effet: "(Condition : Avoir 8 en Finesse)Tu sais \"verrouiller\" ton corps dans un mouvement parfait. Une fois par tour, au prix de 8 PE , quand un effet veut te faire glisser/chuter/déséquilibrer (terrain, bousculade, poussée, lutte), tu peux convertir ça en micro-ajustement : tu réduis ou annules la perte de position (selon gravité) sans arrêter ton action. Hors combat, tu peux traverser une zone instable (rebords, poutres, sol glissant) en réduisant la difficulté de manière notable tant que tu progresses prudemment.",
        cout: 2,
        id: "verrou-appuis"
    },
    {
        nom: "Hypothèse Gagnante",
        effet: "(Condition : Avoir 8 en Savoir)Ton cerveau produit rapidement une théorie \"qui tient debout\". Une fois par scène par session , quand tu analyses une situation (enquête, mécanisme, créature, rituel, document), tu peux formuler 1 hypothèse. Le MJ doit te répondre par Oui / Non / Partiellement, et te donner un détail vrai (même minime) qui va dans le sens de la bonne piste. Si ton hypothèse est totalement fausse, tu apprends quand même ce qui n'est pas la cause (tu élimines une fausse piste proprement).",
        cout: 2,
        id: "hypothese-gagnante"
    },
    {
        nom: "Corps Filant",
        effet: "(Condition : Avoir 8 en Finesse)Tant que tu n'es pas blessé (selon ta règle : PV entamés / état Blessé / carton), ton corps anticipe naturellement les obstacles : débris, angles serrés, objets en mouvement, passages dangereux, etc. Tous tes jets basés sur la Finesse pour éviter un obstacle (éviter un choc, passer entre deux éléments, esquiver un élément du décor, franchir sans te prendre) sont effectués avec Avantage.Si tu avais déjà Avantage sur ce jet, tu n'obtiens pas un \"double avantage\" : à la place, tu gagnes +1 au jet de base (Finesse) pour cette tentative d'évitement en mouvement.",
        cout: 2,
        id: "corps-filant"
    },
    {
        nom: "Bibliothèque Vivante",
        effet: "(Condition : Avoir 8 en Savoir)Tu peux déclarer que tu connais une info \"logique\" de ton domaine (monstre courant, région, organisation, rituel connu, procédure). 1 fois par scène, tu obtiens Avantage sur un jet de Savoir/Analyse lié à un sujet déjà rencontré/étudié. Si tu n'as jamais pu l'avoir étudié (MJ), tu as seulement +5 au lieu d'avantage.",
        cout: 2,
        id: "bibliotheque-vivante"
    },
    {
        nom: "Briseur d'Obstacle",
        effet: "(Condition : Avoir 8 en Puissance)Hors combat (ou en combat si tu as le temps), tu réduis de -2 la Difficulté des tests pour forcer (porte, chaîne, barreau, déblayer, déplacer un objet lourd). 1 fois par scène, si tu rates un test de force \"matériel\", tu peux relancer en échange d'une conséquence : bruit, fatigue (coût PE), ou perte de temps (au choix du MJ).",
        cout: 2,
        id: "briseur-obstacle"
    },
    {
        nom: "Autorité Douce",
        effet: "(Condition : Avoir 8 en social)Tu sais imposer une direction sans hausser le ton : une phrase juste, un regard, une posture stable. 1 fois par scène, après un jet Social réussi (négociation, apaisement, recrutement, ordre simple), tu peux \"verrouiller\" l'échange : la cible ne peut pas aggraver sa réaction immédiatement (pas d'escalade instantanée, pas de retournement brutal), sauf si quelqu'un provoque volontairement (insulte, menace, violence).En pratique : tu sécurises un dialogue pour éviter qu'un PNJ bascule en conflit sur un détail.",
        cout: 2,
        id: "autorite-douce"
    },
    {
        nom: "Bras de Catapulte",
        effet: "(Condition : Avoir 8 en Puissance)Ton lancer n'est pas \"propre\" : il est violent et efficace. Chaque fois que tu infliges des dégâts avec une arme de jet ou un objet improvisé lancé, tu ajoutes +10% aux dégâts finaux de ce lancer.En plus, si l'arme de jet utilise Puissance comme base (et uniquement Puissance), tu ajoutes un bonus de dégâts égal à ta valeur de Puissance sur ce lancer.",
        cout: 2,
        id: "bras-catapulte"
    },
    {
        nom: "Point d'Accroche",
        effet: "(Condition : Avoir 8 en social)Tu repères très vite ce qui fait réagir quelqu'un : fierté, intérêt, peur, besoin d'aide, obsession. 1 fois par scène, quand tu engages une conversation avec une cible pendant au moins quelques phrases, tu peux déclarer un angle d'approche (rassurer / flatter / intimider léger / marchander / culpabiliser / divertir).Sur ton prochain jet Social contre cette cible dans la scène, tu obtiens +2 (ou réduction de DD de 2, selon ton système). Si tu rates malgré tout, tu ne perds pas l'avantage : tu ne peux juste pas le réutiliser sur cette cible avant la fin de la scène.",
        cout: 2,
        id: "point-accroche"
    },
    {
        nom: "Pressentiment de l'Inévitable",
        effet: "(Condition : Avoir 8 en Instinct)Ton instinct te donne une alerte une fraction de seconde avant que ça parte. Une fois par scène au prix de 20 PE , tu peux demander au MJ : \"Qu'est-ce qui va mal tourner dans les 10 prochaines secondes ?\" et il te répond par une menace immédiate plausible (embuscade, mensonge prêt à tomber, piège, attaque, fuite). Si tu agis directement en réponse, tu obtiens un avantage concret sur le premier jet lié (positionnement, initiative, perception, réaction), parce que tu n'es pas pris de court.",
        cout: 2,
        id: "pressentiment"
    },
    {
        nom: "Procédure d'Urgence",
        effet: "(Condition : Avoir 8 en Métier)Tu as des automatismes \"pro\" qui sauvent du temps. Une fois par scène, sur une action de métier longue (réparer, soigner, fabriquer, cuisiner, cartographier, préparer un outil, installer un camp), tu peux déclarer une procédure d'urgence : tu réduis drastiquement le temps requis sans perdre la fiabilité. Si l'action devait normalement demander plusieurs tests, tu peux en réduire le nombre d'un cran (ex : 3 → 2), car tu sais exactement quelles étapes ne pas rater. (uniquement en situation de stress)",
        cout: 2,
        id: "procedure-urgence"
    },
    {
        nom: "Peau de Danger",
        effet: "(Condition : Avoir 8 en Instinct)Tu es constamment en alerte, comme si ton instinct captait les micro-signaux avant tout le monde. Tous tes jets pour éviter l'état \"Surpris\" sont effectués avec Avantage. De plus, lors d'une embuscade, les attaques qui te visent ne bénéficient jamais des bonus de dégâts d'embuscade contre toi (uniquement contre toi), même si tu es malgré tout Surpris.",
        cout: 2,
        id: "peau-danger"
    },
    {
        nom: "Improvisation Propre",
        effet: "(Condition : Avoir 8 en Métier)Tu peux travailler \"sans atelier\" : quand tu n'as pas l'équipement idéal, tu réduis la pénalité (ou la hausse de DD) de -2 sur les jets de Métier. 1 fois par jour, tu peux convertir des matériaux de fortune en remplacement acceptable (corde, cale, bandage, mèche, outil simple) sans coût supplémentaire, tant que c'est cohérent.",
        cout: 2,
        id: "improvisation-propre"
    },
    {
        nom: "Présence d'Ancrage",
        effet: "(Condition : Avoir 8 en Sang froid)Ton calme \"contamine\" le groupe : quand la pression monte, tu stabilises l'ambiance par ta seule présence. Quand tu réussis un jet de Sang-froid collectif, tu peux, 1 fois par session, activer cet effet et accorder à tous les alliés concernés un bonus égal à la moitié de ta MR sur ce jet (arrondie au supérieur) pour leur résolution/conséquence immédiate (selon le fonctionnement de vos jets collectifs).En plus, tant que tu réussis un jet de Sang-froid collectif, tu fournis automatiquement un bonus minimal de +1 aux autres participants (si tu ne fais pas de jet, aucun bonus ne s'applique).",
        cout: 2,
        id: "presence-ancrage"
    },
    {
        nom: "Dur a cuire",
        effet: "(Condition : Avoir 8 en Résilience)Quand ta survie tient à un fil, ton corps refuse de lâcher. Une fois par combat, si tu dois effectuer un jet de Résistance à la mort, tu peux le lancer avec Avantage.De plus, lors des jets de perte de conscience déclenchés par une perte de PV en pourcentage, tu réduis le pourcentage de PV pris en compte d'un montant égal à ta statistique de Résilience (appliqué directement sur le %).",
        cout: 2,
        id: "dur-cuire"
    },
    {
        nom: "Masque du Vide",
        effet: "(Condition : Avoir 8 en Sang froid)Une fois par session, tu peux \"figer\" ton expression et imposer un duel de nerfs à une cible consciente qui te voit et t'identifie. Toi et la cible faites chacun un jet de Sang-froid DD 20 : celui qui obtient la meilleure réussite impose un seul effet ci-dessous (en cas d'égalité : aucun effet).Effet A — Déstabilisation (combat) : la cible subit une peur réflexe orientée contre toi pendant X tours (X = moitié de ton Sang-froid, arrondi au supérieur, max 5). À la fin de chacun de ses tours, elle peut tenter de reprendre le contrôle avec un jet de Sang-froid DD = 6 + (ton Sang-froid). En cas de réussite, l'effet s'arrête.Effet B — Perturbation (social / tension) : tu fractures son rythme mental : la cible hésite, sur-interprète, perd son aplomb. Cela peut désamorcer une situation (baisser la pression, stopper une escalade) ou te permettre d'annuler un échec (même critique) sur une interaction directement liée à cette cible, en transformant le résultat en échec simple (pas une réussite).(Le MJ garde la main : si la situation est impossible à désamorcer par attitude seule, l'effet B devient plutôt \"tu évites le pire\", pas \"tu retournes la scène\".)",
        cout: 2,
        id: "masque-vide"
    },
    {
        nom: "Ossature Inflexible",
        effet: "(Condition : Avoir 8 en Résilience)Une fois par tour, quand tu rates un jet de Résilience destiné à résister à une altération d'état (physique ou magique) qui t'affecte, tu peux dépenser 8 PE pour relancer ce jet. Cette relance représente un sursaut de résistance pure : tu forces ton corps à \"tenir\" malgré la faille. L'effet est temporaire et ne s'applique qu'à la résistance de l'altération en cours (pas à une immunité).",
        cout: 2,
        id: "ossature-inflexible"
    },
    {
        nom: "Affinité Martiale D'arme",
        effet: "Tu as une compréhension instinctive d'une catégorie d'armes : prises, angles, rythme et sécurité d'utilisation. Choisis 1 classe/catégorie d'arme : elle est augmentée d'un cran (quel que soit ton niveau), comme si ton maniement était naturellement plus abouti.",
        cout: 2,
        id: "affinite-martiale"
    },
    {
        nom: "Massacreur",
        effet: "(Condition : avoir une maîtrise d'arme de guerre(arme a deux main) de corps a corps en avancé)Au moment de déclarer une attaque unique avec ton arme à deux mains maîtrisée, tu peux dépenser 8 PE pour forcer un coup \"sale et lourd\". L'attaque subit -10 au jet, mais si elle touche, elle inflige +10% de dégâts physiques. Ne s'applique ni aux multi-attaques, ni aux réactions.",
        cout: 2,
        id: "massacreur"
    },
    {
        nom: "Réserves du Sanctuaire",
        effet: "(Condition : uniquement lier a un ordre religieux)Ton lien au culte te donne accès à des ressources mieux fournies : bénédictions, charges, points de dévotion ou équivalents de faction. Cela n'augmente pas tes pouvoirs \"hors ordre\", seulement ce que ta faction te fournit comme base.Effet : +5 points sur le total de ressources passives de faction sacrée (uniquement les passifs de base)",
        cout: 2,
        id: "reserves-sanctuaire"
    },
    {
        nom: "Tireur sauvage",
        effet: "(Condition : Avoir une maîtrise d'arme de tire (Hors arme a feux) en Avancé)Au moment de déclarer un tir unique avec une arme de tir maîtrisée, tu peux dépenser 8 PE pour chercher l'impact plutôt que la propreté. Ton jet de visée subit -10, mais si le tir touche, il inflige +10% de dégâts physiques. Ne s'applique ni aux multi-attaques, ni aux réactions.",
        cout: 2,
        id: "tireur-sauvage"
    },
    {
        nom: "Architecte du Bivouac",
        effet: "Tu sais organiser un camp \"propre\" : emplacement, abri, feu, routine et confort minimal pour récupérer mieux. 1 fois par jour, pendant une phase de nuit, tu peux préparer un bivouac optimisé pour 1 personne : cette personne gagne +10 sur son jet de repos long. L'effet ne se cumule pas si plusieurs talents similaires s'appliquent au même repos.",
        cout: 1,
        id: "architecte-bivouac"
    },
    {
        nom: "Instinct de Cap",
        effet: "(Condition : Maîtrise mineure de l'Orientation)Tu as le sens des trajectoires \"logiques\". En exploration, tu ne te perds pas tant que tu disposes d'un repère minimal (soleil, vent, relief, trace, carte même imparfaite). 1 fois par jour, tu peux annuler une erreur de route (mauvaise bifurcation, détour inutile) et revenir au \"dernier point sûr\" sans coût supplémentaire autre que le temps narratif raisonnable.",
        cout: 1,
        id: "instinct-cap"
    },
    {
        nom: "Élan Intouchable",
        effet: "(Condition : avoir la maîtrise de l'acrobatie en Avancé)Quand tu exécutes une Action acrobatique, ton corps devient un angle mort difficile à punir. Si tu subis une attaque pendant ta phase d'action acrobatique, tu gagnes immédiatement un bonus de MD égal à 2× ta Finesse pour la résolution de cette attaque (représente l'esquive en mouvement, pas une armure).",
        cout: 2,
        id: "elan-intouchable"
    },
    {
        nom: "Constance Mentale",
        effet: "Tes émotions parasitent moins ton flux : +2 sur les jets de Sang-froid liés à la magie (peur, stress, douleur, intimidation pendant un lancement).",
        cout: 1,
        id: "constance-mentale"
    }
].map(talent => {
    // Extraire la condition et nettoyer l'effet
    const condition = extractCondition(talent.effet);
    const effetCleaned = condition ? cleanEffet(talent.effet) : talent.effet;
    
    return {
        ...talent,
        condition: condition,
        effet: effetCleaned
    };
});

// Variables globales
let talents = [...allTalents];
let currentSort = { column: null, direction: null };
let searchTerm = '';

// Système de sélection
let selectionMode = false;
let selectedTalents = new Set(); // Stocke les IDs des talents sélectionnés

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    updateCounts();
    attachEventListeners();
});

// Rendu du tableau principal
function renderTable() {
    const tbody = document.getElementById('talentsBody');
    const noResults = document.getElementById('noResults');
    tbody.innerHTML = '';
    
    let visibleCount = 0;
    
    talents.forEach(talent => {
        const matchesSearch = searchTerm === '' || 
            talent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.effet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (talent.condition && talent.condition.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if (!matchesSearch) {
            return;
        }
        
        visibleCount++;
        
        const row = document.createElement('tr');
        row.dataset.talentId = talent.id;
        
        // Ajouter classe selectable si mode sélection actif
        if (selectionMode) {
            row.classList.add('selectable');
        }
        
        // Ajouter classe selected si déjà sélectionné
        if (selectedTalents.has(talent.id)) {
            row.classList.add('selected');
        }
        
        // Colonne Nom
        const nomCell = document.createElement('td');
        nomCell.className = 'col-nom';
        nomCell.setAttribute('data-label', 'Nom');
        const nomSpan = document.createElement('span');
        nomSpan.className = 'talent-nom';
        nomSpan.innerHTML = highlightText(talent.nom, searchTerm);
        nomCell.appendChild(nomSpan);
        
        // Colonne Condition
        const conditionCell = document.createElement('td');
        conditionCell.className = 'col-condition';
        conditionCell.setAttribute('data-label', 'Condition');
        const conditionSpan = document.createElement('span');
        conditionSpan.className = 'talent-condition' + (talent.condition ? '' : ' aucune');
        conditionSpan.innerHTML = talent.condition ? highlightText(talent.condition, searchTerm) : 'Aucune';
        conditionCell.appendChild(conditionSpan);
        
        // Colonne Effet
        const effetCell = document.createElement('td');
        effetCell.className = 'col-effet';
        effetCell.setAttribute('data-label', 'Effet');
        const effetSpan = document.createElement('span');
        effetSpan.className = 'talent-effet';
        effetSpan.innerHTML = highlightText(talent.effet, searchTerm);
        effetCell.appendChild(effetSpan);
        
        // Colonne Coût
        const coutCell = document.createElement('td');
        coutCell.className = 'col-cout';
        coutCell.setAttribute('data-label', 'Coût');
        const coutSpan = document.createElement('span');
        coutSpan.className = 'talent-cout';
        coutSpan.textContent = talent.cout + ' point' + (talent.cout > 1 ? 's' : '');
        coutCell.appendChild(coutSpan);
        
        row.appendChild(nomCell);
        row.appendChild(conditionCell);
        row.appendChild(effetCell);
        row.appendChild(coutCell);
        
        // Event listener pour sélection
        if (selectionMode) {
            row.addEventListener('click', () => toggleSelection(talent.id));
        }
        
        tbody.appendChild(row);
    });
    
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
    
    updateCounts();
}

// Toggle sélection d'un talent
function toggleSelection(talentId) {
    if (!selectionMode) return;
    
    if (selectedTalents.has(talentId)) {
        selectedTalents.delete(talentId);
    } else {
        selectedTalents.add(talentId);
    }
    
    renderTable();
    updateSelectedSection();
}

// Mettre à jour la section de sélection (en haut)
function updateSelectedSection() {
    const selectedSection = document.getElementById('selectedSection');
    const selectedGrid = document.getElementById('selectedGrid');
    const selectedCount = document.getElementById('selectedCount');
    const selectedTotal = document.getElementById('selectedTotal');
    
    if (selectedTalents.size === 0) {
        selectedSection.style.display = 'none';
        return;
    }
    
    selectedSection.style.display = 'block';
    selectedGrid.innerHTML = '';
    
    let totalPoints = 0;
    
    selectedTalents.forEach(talentId => {
        const talent = allTalents.find(t => t.id === talentId);
        if (!talent) return;
        
        totalPoints += talent.cout;
        
        const card = document.createElement('div');
        card.className = 'selected-talent-card';
        card.addEventListener('click', () => {
            selectedTalents.delete(talentId);
            renderTable();
            updateSelectedSection();
        });
        
        let conditionHTML = '';
        if (talent.condition) {
            conditionHTML = `<div class="selected-talent-condition">Condition : ${talent.condition}</div>`;
        }
        
        card.innerHTML = `
            <div class="selected-talent-name">${talent.nom}</div>
            ${conditionHTML}
            <div class="selected-talent-effet">${talent.effet}</div>
            <div class="selected-talent-cout">${talent.cout} point${talent.cout > 1 ? 's' : ''}</div>
        `;
        
        selectedGrid.appendChild(card);
    });
    
    selectedCount.textContent = selectedTalents.size;
    selectedTotal.textContent = totalPoints;
}

// Toggle mode sélection
function toggleSelectionMode(enabled) {
    selectionMode = enabled;
    const selectedSection = document.getElementById('selectedSection');
    
    if (enabled) {
        updateSelectedSection();
    } else {
        selectedSection.style.display = 'none';
    }
    
    renderTable();
}

// Réinitialiser les sélections
function resetSelection() {
    selectedTalents.clear();
    renderTable();
    updateSelectedSection();
}

// Highlighting du texte recherché
function highlightText(text, term) {
    if (!term) return text;
    
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Échapper les caractères spéciaux pour regex
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Mise à jour des compteurs
function updateCounts() {
    const tbody = document.getElementById('talentsBody');
    const visibleRows = tbody.querySelectorAll('tr').length;
    
    document.getElementById('talentCount').textContent = visibleRows;
    document.getElementById('totalCount').textContent = allTalents.length;
}

// Tri du tableau
function sortTable(column) {
    if (currentSort.column === column) {
        if (currentSort.direction === 'asc') {
            currentSort.direction = 'desc';
        } else if (currentSort.direction === 'desc') {
            currentSort.column = null;
            currentSort.direction = null;
            talents = [...allTalents];
            updateSortIndicators();
            renderTable();
            return;
        }
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }
    
    talents.sort((a, b) => {
        let valueA, valueB;
        
        if (column === 'nom') {
            valueA = a.nom.toLowerCase();
            valueB = b.nom.toLowerCase();
        } else if (column === 'cout') {
            valueA = a.cout;
            valueB = b.cout;
        }
        
        let comparison = 0;
        if (valueA > valueB) comparison = 1;
        if (valueA < valueB) comparison = -1;
        
        return currentSort.direction === 'asc' ? comparison : -comparison;
    });
    
    updateSortIndicators();
    renderTable();
}

// Mise à jour des indicateurs de tri
function updateSortIndicators() {
    const headers = document.querySelectorAll('.sortable');
    
    headers.forEach(header => {
        const column = header.getAttribute('data-sort');
        header.classList.remove('sorted-asc', 'sorted-desc');
        
        if (column === currentSort.column) {
            if (currentSort.direction === 'asc') {
                header.classList.add('sorted-asc');
            } else if (currentSort.direction === 'desc') {
                header.classList.add('sorted-desc');
            }
        }
    });
}

// Recherche
function handleSearch() {
    searchTerm = document.getElementById('searchInput').value.trim();
    renderTable();
}

// Effacer la recherche
function clearSearch() {
    document.getElementById('searchInput').value = '';
    searchTerm = '';
    renderTable();
}

// Attacher les événements
function attachEventListeners() {
    // Recherche
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
    
    // Tri
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            sortTable(column);
        });
    });
    
    // Mode sélection
    const selectionToggle = document.getElementById('selectionModeToggle');
    selectionToggle.addEventListener('change', (e) => {
        toggleSelectionMode(e.target.checked);
    });
    
    // Bouton de réinitialisation
    document.getElementById('resetSelection').addEventListener('click', resetSelection);
}