// TOUS LES TALENTS ÉVOLUTIFS
const allTalents = [
    // ===== LES ARMES =====
    {
        nom: "Maîtrise de l'Épée à Une Main (mineur)",
        effet: "L'épée à une main est l'arme polyvalente par excellence : rapide, maniable et équilibrée, elle permet d'alterner attaque et parade. Elle est adaptée à la majorité des styles de combat et favorise l'adaptabilité sur le champ de bataille.",
        competence: "Attaque à l'épée à une main +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Épée à Deux Mains (mineur)",
        effet: "L'épée à deux mains est conçue pour infliger des coups puissants avec une grande allonge. Bien que plus lente, elle est redoutable pour briser les défenses ennemies avec force.",
        competence: "Attaque à l'épée à deux mains +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise du Bouclier (mineur)",
        effet: "Le bouclier est une protection active et stratégique. Il permet de bloquer attaques physiques ou magiques, et peut aussi être utilisé pour repousser ou déséquilibrer un adversaire.",
        competence: "Défense avec bouclier +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de la Dague (mineur)",
        effet: "La dague est l'arme des duellistes agiles et des assassins. Rapide, discrète et précise, elle est parfaite pour les frappes sournoises ou les enchaînements rapides.",
        competence: "Attaque à la dague +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de la Lance (mineur)",
        effet: "La lance est une arme à longue portée utilisée pour maintenir ses adversaires à distance. Elle est aussi efficace en charge qu'en défense de position.",
        competence: "Attaque à la lance +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise du Gourdin (mineur)",
        effet: "Le gourdin est une arme simple, brutale et efficace. Il inflige des dégâts contondants puissants et peut étourdir ou affaiblir un ennemi peu protégé.",
        competence: "Attaque au gourdin +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de la Masse (mineur)",
        effet: "Le gourdin est une arme simple, brutale et efficace. Il inflige des dégâts contondants puissants et peut étourdir ou affaiblir un ennemi peu protégé.",
        competence: "Attaque à la masse +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise du Marteau de Guerre (mineur)",
        effet: "Le marteau de guerre est une arme lente mais terriblement dévastatrice. Il est utilisé pour briser boucliers, os et armures avec une force implacable.",
        competence: "Attaque au marteau de guerre +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de la Hallebarde (mineur)",
        effet: "La hallebarde est une arme hybride, combinant tranchant, perforation et accrochage. Redoutable en mêlée, elle permet d'attaquer à distance moyenne et de contrer cavaliers ou armures.",
        competence: "Attaque à la hallebarde +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise du Fléau (mineur)",
        effet: "Le fléau, avec sa chaîne articulée, contourne les défenses classiques. Difficile à maîtriser, il est redoutable pour désarmer ou frapper derrière un bouclier.",
        competence: "Attaque au fléau +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de la Hache de Combat (mineur)",
        effet: "La hache de combat est une arme de brutalité. Elle est conçue pour trancher la chair et les os avec puissance, provoquant souvent des saignements importants.",
        competence: "Attaque à la hache à une main +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de la Rapière (mineur)",
        effet: "Fine et rapide, la rapière est parfaite pour l'estoc et les ripostes précises. C'est l'arme privilégiée des duellistes et escrimeurs techniques.",
        competence: "Attaque à la rapière +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arc (mineur)",
        effet: "L'arc permet des attaques à distance discrètes et précises. Selon le style choisi, il s'adapte à la vitesse, à la portée ou à la puissance de tir.",
        competence: "Choix : Tir à l'arc court +2 (tir rapide) / Tir à l'arc long +2 (portée accrue) / Tir à l'arc de guerre +2 (puissance maximale)",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arbalète (mineur)",
        effet: "L'arbalète est une arme puissante à distance, très efficace contre les armures. Sa précision et sa force compensent son temps de rechargement plus long.",
        competence: "Tir à l'arbalète +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise du Bâton de Combat (mineur)",
        effet: "Le bâton est une arme défensive et de contrôle. Il permet de repousser, désarmer ou frapper avec fluidité, souvent utilisé dans les arts martiaux.",
        competence: "Attaque au bâton de combat +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise du Sabre (mineur)",
        effet: "Le sabre est rapide et fluide, adapté aux frappes dynamiques et aux combats en mouvement. Idéal pour les combattants agiles et mobiles.",
        competence: "Attaque au sabre +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme à Feu Courte (mineur)",
        effet: "Les armes à feu courtes (pistolets) sont idéales pour les tirs rapprochés. Elles allient maniabilité et puissance instantanée.",
        competence: "Tir à l'arme à feu courte +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme à Feu Longue (mineur)",
        effet: "Les armes à feu longues (fusils) permettent des tirs puissants et précis à longue distance. Leur impact est considérable, souvent létal.",
        competence: "Tir à l'arme à feu longue +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme de Jet : Dague (mineur)",
        effet: "La dague de jet est précise, silencieuse et adaptée aux embuscades. Elle permet des frappes à distance sur des cibles vulnérables.",
        competence: "Jet de dague +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme de Jet : Hachette (mineur)",
        effet: "La hachette de jet inflige de lourds dégâts si elle touche sa cible. Moins discrète que la dague, elle est plus brutale et plus lourde.",
        competence: "Jet de hachette +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme de Jet : Javelot (mineur)",
        effet: "Le javelot est un projectile puissant lancé à la force du bras. Il allie force brute et précision perforante, idéal contre les lignes ennemies.",
        competence: "Jet de javelot +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de la Hache de Guerre (mineur)",
        effet: "La hache de guerre est une arme lourde et massive à deux mains. Elle est conçue pour infliger des dégâts catastrophiques en une seule frappe.",
        competence: "Attaque à la hache de guerre +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise de la Faux-Scie (mineur)",
        effet: "La faux-scie est une arme cruelle, conçue pour lacérer et maintenir la pression. Ses blessures sont longues à guérir, causant douleurs prolongées.",
        competence: "Attaque à la faux-scie +2",
        categorie: "Les Armes",
        cout: 1
    },
    {
        nom: "Maîtrise du Couteau de Combat (mineur)",
        effet: "Le couteau de combat est compact, rapide et polyvalent. Il est parfait pour les combats rapprochés, les techniques de survie et les contre-attaques.",
        competence: "Attaque au couteau de combat +2",
        categorie: "Les Armes",
        cout: 1
    }
];

// ===== TECHNIQUE DE COMBAT =====
allTalents.push(
    {
        nom: "Maîtrise mineur de l'art de la parade",
        effet: "Tu affûtes l'alignement de ta garde et la lecture des trajectoires adverses. Le mouvement devient court, précis, avec une économie d'effort qui réduit les ouvertures. Tu apprends à rediriger l'élan plutôt qu'à l'encaisser, créant la fenêtre idéale pour la riposte.",
        competence: "Parade technique +2",
        categorie: "Technique de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineur de l'art de l'esquive",
        effet: "Tu perfectionnes le timing du retrait, du pas de côté et du pivot d'épaule. L'objectif est d'éviter au millimètre sans perdre l'équilibre ni la ligne d'attaque. Ton corps anticipe l'impact et se dérobe avant qu'il ne se produise.",
        competence: "Esquive instinctive +2",
        categorie: "Technique de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineur de l'art du blocage de corps",
        effet: "Tu apprends à intercepter avec l'avant-bras, l'épaule et le torse en utilisant l'ancrage au sol. Le contact est contrôlé : absorber, briser l'angle, puis renvoyer l'énergie. Cette discipline limite les chocs et neutralise les percées courtes.",
        competence: "Blocage corporel +2",
        categorie: "Technique de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineur de l'art des posture de combat",
        effet: "Tu travailles l'ancrage, la répartition du poids et la transition entre gardes. Chaque posture soutient la suivante, pour passer de la défense à l'offensive sans latence. Résultat : plus de stabilité, de portée utile et de puissance transmise.",
        competence: "Postures de combat +2",
        categorie: "Technique de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineur de l'art de la riposte",
        effet: "Tu travailles l'enchaînement défense→attaque sur le battement exact qui suit l'impact. L'objectif est de punir l'ouverture sans rompre la garde ni l'équilibre. Tu apprends à \"voir\" la faille naître et à la cueillir immédiatement.",
        competence: "Riposte +2",
        categorie: "Technique de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineur de l'art de la feinte",
        effet: "Tu affines les tromperies d'épaule, de regard et de cadence pour provoquer une réaction défavorable. La feinte devient un outil pour voler la priorité ou déplacer la garde adverse. Le but est d'ouvrir la ligne que tu as toi-même annoncée… pour frapper ailleurs.",
        competence: "Feinte technique +2",
        categorie: "Technique de combat",
        cout: 1
    }
);

// ===== TALENT ÉVOLUTIF CLASSIQUE =====
allTalents.push(
    {
        nom: "Maîtrise mineure de l'Agilité",
        effet: "Développe la fluidité des mouvements et améliore la coordination corporelle dans les déplacements. Permet d'exécuter des gestes rapides, souples ou instinctifs avec plus d'aisance.",
        competence: "Trait spécifique : Agilité de mouvement +1 (Finesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'Acrobatie",
        effet: "Renforce la capacité à effectuer des figures complexes, roulades, sauts et mouvements aériens. Ce talent est essentiel pour traverser des zones difficiles, éviter des pièges ou réaliser des actions spectaculaires.",
        competence: "Action acrobatique +2 (Dextérité) et Trait spécifique : Acrobatie +1 (Finesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Furtivité Silencieuse mineure",
        effet: "Diminue le bruit généré par les déplacements et améliore la capacité à se dissimuler dans l'environnement. Ce talent est indispensable pour les voleurs, éclaireurs ou espions souhaitant éviter les confrontations.",
        competence: "Furtivité +2 (Dextérité)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Expertise du Nageur mineure",
        effet: "Améliore la respiration, l'endurance et la rapidité de nage dans divers types d'eaux. Ce talent est utile pour traverser des rivières, plonger sous l'eau ou combattre dans des environnements aquatiques.",
        competence: "Trait spécifique : Nage +1 (Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Escalade Instinctive mineure",
        effet: "Favorise l'adhérence, l'équilibre et la stabilité sur des surfaces verticales, humides ou instables. Ce talent permet de grimper sans équipement, de se maintenir en hauteur ou d'explorer des lieux autrement inaccessibles.",
        competence: "Trait spécifique : escalade +1 (finesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Diplomatie Affirmée mineure",
        effet: "Renforce l'impact des mots dans les situations sociales complexes ou tendues. Permet de calmer les tensions, de négocier des alliances ou de désamorcer un conflit sans recourir à la violence.",
        competence: "Trait spécifique : Diplomate social +1 (social)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Manipulateur Subtil mineur",
        effet: "Accentue l'influence psychologique sur les interlocuteurs en exploitant leurs émotions, faiblesses ou motivations. Ce talent est redoutable dans les discussions secrètes, les complots ou les interrogatoires.",
        competence: "Trait spécifique : Diplomate social +1 (social)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Détection Magique mineure",
        effet: "Développe un sixième sens permettant de percevoir des phénomènes magiques, des objets enchantés ou des auras anormales. Ce talent n'offre pas de vision magique directe, mais une intuition très fine des flux ou perturbations.",
        competence: "Analyse magique +2 (Dextérité)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Charmeur Naturel mineur",
        effet: "Accentue la prestance naturelle et le magnétisme social du personnage. Ce talent attire spontanément la sympathie, le respect ou la curiosité sans manipulation active.",
        competence: "Charme +2 (Charisme)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Beau Parleur mineur",
        effet: "Développe l'aisance orale, le rythme, la clarté et l'art de la persuasion verbale. Ce talent facilite les discours en public, les négociations tendues ou les plaidoiries enflammées.",
        competence: "Trait spécifique : éloquence +1 (social)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Négociant Habile mineur",
        effet: "Permet d'évaluer rapidement la valeur d'un bien et d'obtenir un meilleur prix dans les échanges. Ce talent est fondamental dans les marchés, les enchères ou la vente d'objets rares.",
        competence: "Trait spécifique : Marchandage +1 (social)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "L'art du chant Mineur",
        effet: "Affine la qualité vocale pour la rendre plus mélodieuse, claire ou captivante. Ce talent est idéal pour chanter, incanter, charmer ou apaiser une foule par la voix.",
        competence: "Prestation de chant +2 (Charisme)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Leadership Naturel mineure",
        effet: "Accroît l'autorité perçue, la crédibilité et la force émotionnelle des ordres ou discours donnés. Ce talent inspire confiance, loyauté ou courage même dans les moments critiques.",
        competence: "Leadership +2 (Charisme)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Art du Bricoleur mineure",
        effet: "Permet de concevoir, réparer ou adapter rapidement des objets et outils utiles en contexte d'aventure. Ce talent est précieux dans les situations improvisées ou techniques.",
        competence: "Trait spécifique : Bricolage +1 (Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Équitation de Terrain mineure",
        effet: "Renforce l'équilibre, la communication et la maîtrise d'une monture, surtout sur des terrains complexes ou dangereux. Ce talent réduit les risques de chute, améliore la vitesse et optimise les manœuvres en selle.",
        competence: "Trait spécifique : Équitation +1 (Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître du Crochetage mineur",
        effet: "Permet de manipuler des serrures mécaniques avec précision et discrétion. Ce talent augmente la vitesse d'exécution, réduit le risque de déclenchement d'alarmes ou pièges.",
        competence: "Trait spécifique : Crochetage +1 (Finesse/Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître du Pickpocket mineur",
        effet: "Développe la capacité à dérober des objets discrets sur des cibles, sans éveiller les soupçons. Ce talent repose sur l'observation, le bon timing et un geste précis.",
        competence: "Trait spécifique : Vol discret +1 (Finesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître du Désamorçage mineur",
        effet: "Permet d'identifier, manipuler et neutraliser des pièges mécaniques, magiques ou complexes. Ce talent réduit les risques d'échec et augmente la sécurité d'un groupe explorant des zones piégées.",
        competence: "Trait spécifique : Désamorçage +1 (Finesse / Savoir)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Ami des Bêtes mineur",
        effet: "Établit un lien instinctif avec les animaux, favorisant la confiance et la communication non verbale. Ce talent aide à calmer une créature, comprendre son comportement ou éviter une confrontation.",
        competence: "Communication animale +2 (Charisme)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître du Déguisement mineur",
        effet: "Permet d'adopter une nouvelle apparence physique ou sociale avec naturel et finesse. Ce talent améliore le maquillage, l'attitude, la posture et l'intonation.",
        competence: "Déguisement +2 (Charisme)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Artiste de Scène mineur (Théâtre)",
        effet: "Améliore la qualité du jeu d'acteur, la présence sur scène et la capacité à captiver un public. Ce talent augmente la crédibilité d'un rôle et permet de jouer avec les émotions des spectateurs.",
        competence: "Jeux d'acteur +2 (Charisme)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître de la Danseur mineur",
        effet: "Maîtrise des gestes chorégraphiés, du rythme corporel et de la communication non verbale. Ce talent permet d'utiliser la danse pour séduire, distraire ou exprimer des intentions.",
        competence: "Trait spécifique : Danse +1 (Finesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître du Pistage mineur",
        effet: "Permet de lire les empreintes, signes de passage ou perturbations dans l'environnement. Ce talent est utilisé pour suivre des traces humaines, animales ou magiques.",
        competence: "Pistage +2 (Perception)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Joueur d'Instrument mineur",
        effet: "Améliore la maîtrise d'un instrument musical, sa justesse, sa fluidité et son expressivité. Ce talent est essentiel pour les bardes, troubadours ou performeurs.",
        competence: "Instrument (selon l'instrument) +2 (Charisme/Intelligence pour la magie) et Trait spécifique : instrument +1 (Finesse/métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître du Camouflage mineur",
        effet: "Développe la capacité à se fondre dans un décor, que ce soit en milieu naturel ou urbain. Ce talent améliore la dissimulation en terrain hostile, la fuite ou l'observation discrète.",
        competence: "Camouflage +2 (Dextérité)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Lecture du Mensonge mineur",
        effet: "Permet de détecter les incohérences, hésitations ou signaux involontaires dans un discours. Ce talent repose sur l'observation fine et l'intuition sociale.",
        competence: "Lecture des mensonges +2 (Sagesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître du Bluff mineur",
        effet: "Augmente la capacité à feindre la vérité ou simuler un comportement crédible dans une situation de pression. Ce talent est utilisé pour désamorcer des conflits, tromper des gardes ou manipuler une scène.",
        competence: "Bluff +2",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître des Premiers Soins mineur",
        effet: "Permet de stabiliser un blessé, panser des plaies et limiter l'aggravation d'un état critique. Ce talent est essentiel en aventure pour éviter des morts rapides.",
        competence: "Trait spécifique : soin manuel +1 (Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître du Saut Précis mineur",
        effet: "Développe la puissance, la coordination et la précision lors de sauts complexes. Ce talent est utile pour franchir des obstacles, se repositionner en combat ou se dégager d'un piège.",
        competence: "Trait spécifique : saut +1 (Finesse) et Compétence : saut +2",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Dresseur Expérimenté mineur",
        effet: "Permet de former, diriger et canaliser un animal par des gestes, des ordres ou des récompenses. Ce talent améliore la fiabilité des familiers ou montures.",
        competence: "Dressage +2",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître de l'Investigation mineur",
        effet: "Développe la capacité à analyser des scènes, croiser des indices et poser les bonnes questions. Ce talent est crucial dans les enquêtes, les mystères ou les complots.",
        competence: "Investigation +2",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Cuisinier Itinérant mineur",
        effet: "Permet de cuisiner des plats efficaces même avec des ressources modestes ou dans des conditions difficiles. Ce talent améliore la récupération, le moral du groupe et les effets d'aliments spéciaux.",
        competence: "Trait spécifique : Cuisine +1 (Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Alchimiste Itinérant mineur",
        effet: "Permet de créer des mixtures simples à partir d'ingrédients naturels trouvés sur le terrain. Ce talent améliore l'utilisation d'herbes, de poudres ou de liquides pour des effets immédiats.",
        competence: "Trait spécifique : Alchimie +1 (Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Cueilleur mineur",
        effet: "Développe la connaissance des plantes comestibles, médicinales ou magiques dans différents environnements. Ce talent permet d'éviter les intoxications et de constituer des réserves utiles.",
        competence: "Trait spécifique : Botanique +1 (Savoir/Métier/instinct)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Survivaliste mineur",
        effet: "Regroupe les bases essentielles pour survivre en milieu naturel : feu, abri, eau, orientation. Ce talent améliore l'autonomie, la gestion des ressources et la survie en cas de séparation du groupe.",
        competence: "Trait spécifique : Survie +1 (Instinct/Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Cartographie mineur",
        effet: "Permet de lire, tracer ou corriger des cartes avec justesse, même en territoire inconnu. Ce talent est utile pour éviter de se perdre, planifier des trajets ou repérer des zones critiques.",
        competence: "Trait spécifique : Cartographie +1 (Savoir/Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Grimpeur mineur",
        effet: "Développe une technique efficace pour grimper sur toutes sortes de surfaces avec sécurité et souplesse. Ce talent réduit le risque de chute, augmente la vitesse d'escalade et permet des déplacements verticaux audacieux.",
        competence: "Trait spécifique : Grimpette +1 (Finesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître dans l'Art de la Réflexion mineur",
        effet: "Affûte la capacité à raisonner avec logique, lucidité et précision. Ce talent aide à résoudre des énigmes, comprendre des dispositifs complexes ou voir des vérités cachées.",
        competence: "Réflexion +2",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Traqueur mineur",
        effet: "Permet de suivre une cible précise sur différents types de terrains grâce à des signes subtils. Ce talent affine le regard, l'instinct et la patience.",
        competence: "Traque +2",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Blagueur mineur",
        effet: "Développe le sens de la répartie, de l'humour et de la dédramatisation. Ce talent permet de désamorcer des tensions, distraire un adversaire ou détendre un groupe.",
        competence: "Trait spécifique : Humour +1 (Social)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Professorat de son Art mineur",
        effet: "Permet d'expliquer, démontrer ou transmettre un savoir de manière claire et inspirante. Ce talent améliore l'enseignement, la pédagogie ou l'influence intellectuelle.",
        competence: "Trait spécifique : Enseignement +1 (Savoir/Social)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Observateur de terrain mineur",
        effet: "Affûte la capacité à analyser rapidement l'environnement immédiat. Ce talent permet de repérer les irrégularités du sol, les zones à risque ou les points d'avantage stratégique.",
        competence: "Observation environnementale +2 (Perception)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maîtrise mineur de diagnostique corporelle",
        effet: "Développe un sens aigu pour évaluer l'état physique d'une créature ou d'un humanoïde. Permet de repérer blessures, fatigue, maladies ou signes de malaise.",
        competence: "Analyse Corporelle +2 (Perception)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Analyste de combat tactique mineur",
        effet: "Renforce l'aptitude à lire le déroulement d'un affrontement et à en tirer parti. Ce talent permet d'identifier les forces, faiblesses et schémas d'attaque de l'ennemi.",
        competence: "Analyse de combat +2 (Sagesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Intimidateur mineur",
        effet: "Accentue l'impact de la présence physique, du ton et du regard pour imposer le respect ou inspirer la crainte.",
        competence: "Intimidation +2 (Charisme)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Lecture de Comportement mineure",
        effet: "Améliore l'observation fine des gestes, expressions et attitudes. Ce talent permet de deviner les intentions, l'état émotionnel ou les réactions probables d'un individu.",
        competence: "Analyse comportementale +2 (Sagesse)",
        categorie: "Talent évolutif classique",
        cout: 1
    },
    {
        nom: "Maître des soins animalier mineur",
        effet: "Offre une maîtrise de base des techniques de soin pour animaux domestiques ou sauvages. Permet de calmer une bête blessée, nettoyer et panser ses plaies.",
        competence: "Trait spécifique : Soin manuel animal +1 (Métier)",
        categorie: "Talent évolutif classique",
        cout: 1
    }
);

// ===== LIEN MAGIQUE - NATURE MAGIQUE =====
allTalents.push(
    {
        nom: "Maîtrise de la Magie Pure",
        effet: "Contrôle des filaments bruts avant tout habillage élémentaire : canalisation, modelage et dissipation « à nu ». Excellente base pour apprendre des rituels génériques, contrer des effets magiques et stabiliser d'autres écoles.",
        competence: "Magie pure +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise d'une Magie Élémentaire",
        effet: "Accord fin avec une Source (feu, eau, vent, terre, foudre, etc.), permettant d'infliger des dégâts thématiques et d'altérer l'environnement. Ouvre des synergies d'armes et de styles.",
        competence: "Magie élémentaire (X = un élément) +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie Maudite",
        effet: "Manipulation de miasmes et de maléfices qui affaiblissent, corrompent ou entravent la cible. Puissante offensivement, mais sujette à des contrecoups si mal canalisée.",
        competence: "Magie maudite +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise des Ténèbres Originelles",
        effet: "Accès à une obscurité « primaire » qui étouffe la lumière, comprime l'espace et mord la volonté. Idéale pour le contrôle de zone, la dissimulation et les attaques qui ignorent les défenses conventionnelles.",
        competence: "Magie Ténèbres originelles +2 (Sagesse)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie de Lumière Sainte",
        effet: "Énergie sacrée qui bénit, protège et brûle l'impur. Excellente contre les malédictions et entités corrompues, tout en offrant des outils de soutien (clarté, réconfort, résistances).",
        competence: "Magie de lumière sainte +2 (Sagesse)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie Bardique/Musicale",
        effet: "Le son et le rythme deviennent vecteurs d'effets : encouragements, entraves, résonances à distance. Crée des auras et impulsions qui modulent l'état mental ou l'efficacité martiale.",
        competence: "Magie Musicale +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie Environnementale",
        effet: "Capte et redirige la magie ambiante (ley-lines, lieux chargés) pour façonner le terrain : champs de pression, zones calmes ou saturées. Brille dans les lieux puissants et les combats prolongés.",
        competence: "Manipulation de la magie environnementale +2 (Sagesse)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie d'Exorcisme",
        effet: "Art de purifier, rompre les liens corrompus et dissiper les influences maudites. Combine attaques de « lumière dure » et techniques de scellement, avec une grande fiabilité contre démons et maléfices.",
        competence: "Magie d'exorcisme +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie Météorologique",
        effet: "Commande des phénomènes aériens : bourrasques, pluie, grêle, brouillard, décharges. Excelle en contrôle de champ de bataille (visibilité, mobilité, tir) et en interventions à moyenne/longue portée.",
        competence: "Magie Météorologique +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie de Danse / Fluctuation",
        effet: "Discipline rare mêlant l'art de la danse au contrôle des flux arcaniques. Par des mouvements précis, le lanceur façonne les filaments magiques et les fait tournoyer pour conférer des effets aux entités proches.",
        competence: "Fluctuation magique +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie Occulte",
        effet: "Manipulation des forces occultes cachées, permettant d'accéder à des connaissances interdites et des pouvoirs ésotériques.",
        competence: "Magie Occulte +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie Nécromantique",
        effet: "Contrôle des forces de mort et de non-vie, permettant d'animer les morts et de manipuler l'énergie nécrotique.",
        competence: "Magie nécromantique +2 (Intelligence)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie Sacrée",
        effet: "Canalisation de l'énergie divine et sacrée pour bénir, protéger et sanctifier. Connexion directe avec les forces divines.",
        competence: "Magie sacrée +2 (Sagesse)",
        categorie: "Lien magique",
        cout: 1
    },
    {
        nom: "Maîtrise de la Magie Spirituelle",
        effet: "Communication et manipulation des esprits et des forces spirituelles. Permet d'invoquer des esprits et de naviguer dans le plan spirituel.",
        competence: "Magie spirituelle +2 (Sagesse)",
        categorie: "Lien magique",
        cout: 1
    }
);

// ===== STYLE MAGIQUE =====
allTalents.push(
    {
        nom: "Maîtrise du style magique de modulation",
        effet: "Affûte la capacité à ajuster en temps réel la portée, l'intensité et les effets d'un sort déjà lancé. Ce talent permet d'adapter sa magie aux imprévus du combat ou aux conditions changeantes, offrant une flexibilité stratégique rare.",
        competence: "Modulation Magique +2",
        categorie: "Style magique",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique de matérialisation",
        effet: "Permet de donner forme tangible à l'énergie magique pour créer armes, outils, structures ou créatures éphémères. Ce talent ouvre la voie à une magie créative et polyvalente, utile autant pour le combat que pour la construction ou l'exploration.",
        competence: "Matérialisation Magique +2",
        categorie: "Style magique",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique de barrière",
        effet: "Spécialise l'utilisateur dans l'édification de boucliers magiques protecteurs. Ce talent offre la possibilité de défendre individus, zones ou objets contre les assauts physiques, magiques ou environnementaux.",
        competence: "Barrière Magique +2",
        categorie: "Style magique",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique de guérison",
        effet: "Développe une affinité particulière pour la restauration magique des corps et des esprits. Ce talent permet de soigner blessures, maladies et épuisement, tout en régénérant la vitalité d'alliés.",
        competence: "Guérison Magique +2",
        categorie: "Style magique",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique de fusion élémentaire",
        effet: "Permet de combiner plusieurs éléments pour créer des sorts hybrides aux effets uniques. Ce talent ouvre des possibilités offensives et défensives inédites, exploitant la synergie entre les énergies élémentaires.",
        competence: "Fusion Magique +2",
        categorie: "Style magique",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique d'enchantement",
        effet: "Confère la capacité d'imprégner objets ou êtres vivants de propriétés magiques temporaires ou durables. Ce talent peut renforcer armes et armures, améliorer des capacités physiques, ou même altérer subtilement le comportement d'un objet.",
        competence: "Enchantement Magique +2",
        categorie: "Style magique",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique d'insufflation",
        effet: "Spécialise l'utilisateur dans l'art de transmettre directement de l'énergie magique dans un objet, une créature ou un allié. Ce talent permet d'accroître la puissance, d'activer un effet latent, ou de stabiliser un sort en cours.",
        competence: "Insufflation Magique +2",
        categorie: "Style magique",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique d'illusion",
        effet: "Permet de manipuler la perception sensorielle pour tromper les sens ou influencer l'émotion d'une cible. Ce talent peut générer des images, sons, odeurs ou sensations illusoires réalistes.",
        competence: "Illusion Magique +2",
        categorie: "Style magique",
        cout: 1
    }
);

// Variables globales
let talents = [...allTalents]; // Copie pour pouvoir trier
let currentSort = { column: null, direction: null };
let searchTerm = '';
let selectedCategories = new Set(["Les Armes", "Technique de combat", "Talent évolutif classique", "Lien magique", "Style magique"]);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    updateCounts();
    attachEventListeners();
});

// Rendu du tableau
function renderTable() {
    const tbody = document.getElementById('talentsBody');
    const noResults = document.getElementById('noResults');
    tbody.innerHTML = '';
    
    let visibleCount = 0;
    
    talents.forEach(talent => {
        // Filtrage par catégorie
        if (!selectedCategories.has(talent.categorie)) {
            return; // Skip cette ligne
        }
        
        // Filtrage par recherche
        const matchesSearch = searchTerm === '' || 
            talent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.effet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.competence.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.categorie.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (!matchesSearch) {
            return; // Skip cette ligne
        }
        
        visibleCount++;
        
        const row = document.createElement('tr');
        
        // Colonne Nom
        const nomCell = document.createElement('td');
        nomCell.className = 'col-nom';
        nomCell.setAttribute('data-label', 'Nom');
        const nomSpan = document.createElement('span');
        nomSpan.className = 'talent-nom';
        nomSpan.innerHTML = highlightText(talent.nom, searchTerm);
        nomCell.appendChild(nomSpan);
        
        // Colonne Effet
        const effetCell = document.createElement('td');
        effetCell.className = 'col-effet';
        effetCell.setAttribute('data-label', 'Effet');
        const effetSpan = document.createElement('span');
        effetSpan.className = 'talent-effet';
        effetSpan.innerHTML = highlightText(talent.effet, searchTerm);
        
        // Ajouter la compétence/trait
        if (talent.competence) {
            const compSpan = document.createElement('span');
            compSpan.className = 'talent-competence';
            compSpan.innerHTML = '➤ ' + highlightText(talent.competence, searchTerm);
            effetSpan.appendChild(document.createElement('br'));
            effetSpan.appendChild(compSpan);
        }
        
        effetCell.appendChild(effetSpan);
        
        // Colonne Catégorie
        const catCell = document.createElement('td');
        catCell.className = 'col-categorie';
        catCell.setAttribute('data-label', 'Catégorie');
        const catSpan = document.createElement('span');
        catSpan.className = 'talent-categorie ' + getCategorieClass(talent.categorie);
        catSpan.innerHTML = highlightText(talent.categorie, searchTerm);
        catCell.appendChild(catSpan);
        
        // Colonne Coût
        const coutCell = document.createElement('td');
        coutCell.className = 'col-cout';
        coutCell.setAttribute('data-label', 'Coût');
        const coutSpan = document.createElement('span');
        coutSpan.className = 'talent-cout';
        coutSpan.textContent = talent.cout + ' point' + (talent.cout > 1 ? 's' : '');
        coutCell.appendChild(coutSpan);
        
        row.appendChild(nomCell);
        row.appendChild(effetCell);
        row.appendChild(catCell);
        row.appendChild(coutCell);
        
        tbody.appendChild(row);
    });
    
    // Afficher/masquer le message "aucun résultat"
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
    
    updateCounts();
}

// Classe CSS selon la catégorie
function getCategorieClass(categorie) {
    if (categorie === "Les Armes") return "cat-armes";
    if (categorie === "Technique de combat") return "cat-technique";
    if (categorie === "Talent évolutif classique") return "cat-classique";
    if (categorie === "Lien magique") return "cat-magie";
    if (categorie === "Style magique") return "cat-style";
    return "";
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
    const headers = document.querySelectorAll('.sortable');
    
    // Si on clique sur la même colonne
    if (currentSort.column === column) {
        if (currentSort.direction === 'asc') {
            currentSort.direction = 'desc';
        } else if (currentSort.direction === 'desc') {
            // Retour à l'ordre original
            currentSort.column = null;
            currentSort.direction = null;
            talents = [...allTalents];
            updateSortIndicators();
            renderTable();
            return;
        }
    } else {
        // Nouvelle colonne
        currentSort.column = column;
        currentSort.direction = 'asc';
    }
    
    // Effectuer le tri
    talents.sort((a, b) => {
        let valueA, valueB;
        
        if (column === 'nom') {
            valueA = a.nom.toLowerCase();
            valueB = b.nom.toLowerCase();
        } else if (column === 'categorie') {
            valueA = a.categorie.toLowerCase();
            valueB = b.categorie.toLowerCase();
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

// Gestion des checkboxes de catégories
function handleCategoryChange() {
    const checkboxes = document.querySelectorAll('.category-checkbox input[type="checkbox"]');
    selectedCategories.clear();
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.add(checkbox.value);
        }
    });
    
    renderTable();
}

// Sélectionner toutes les catégories
function selectAllCategories() {
    const checkboxes = document.querySelectorAll('.category-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    handleCategoryChange();
}

// Désélectionner toutes les catégories
function deselectAllCategories() {
    const checkboxes = document.querySelectorAll('.category-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    handleCategoryChange();
}

// Attacher les événements
function attachEventListeners() {
    // Recherche
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Bouton clear
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
    
    // Tri
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            sortTable(column);
        });
    });
    
    // Checkboxes de catégories
    document.querySelectorAll('.category-checkbox input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryChange);
    });
    
    // Boutons Tout sélectionner / Tout désélectionner
    document.getElementById('selectAll').addEventListener('click', selectAllCategories);
    document.getElementById('deselectAll').addEventListener('click', deselectAllCategories);
}