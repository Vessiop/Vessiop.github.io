// ═══════════════════════════════════════════════════════════════════════════
// TALENTS ÉVOLUTIFS - CODE JAVASCRIPT COMPLET
// ═══════════════════════════════════════════════════════════════════════════

const allTalents = [];

// ═════════════════════════════════════════════════════════════════════════
// CATÉGORIE 1 : TALENT DE MÉTIER (37 talents)
// ═════════════════════════════════════════════════════════════════════════

// Savoir-faire (33 talents à 2 pts)
allTalents.push(
    {
        nom: "Savoir-faire : Cuisine (mineur)",
        effet: "La cuisine devient un vrai outil de terrain : tu sais préparer un repas correct même avec peu, et éviter les erreurs basiques qui rendent malade. Tu reconnais les cuissons sûres, ajustes les rations et améliores la conservation simple (salage, séchage). Dans un groupe, tes repas stabilisent l'énergie et limitent les pertes de ressources. Même en urgence, tu sais faire \"propre et utile\".",
        competence: "Trait spécifique : Cuisine +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Bricolage (mineur)",
        effet: "Tu sais réparer, ajuster et fabriquer des solutions simples avec les moyens du bord. Une sangle qui lâche, une pièce qui coince ou un outil mal fixé deviennent gérables sans atelier complet. Tu apprends aussi à choisir les matériaux qui tiendront vraiment et à sécuriser un montage. Ce savoir-faire évite de perdre du temps sur des pannes stupides.",
        competence: "Trait spécifique : Bricolage +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Alchimie (mineur)",
        effet: "Tu maîtrises les bases des mélanges stables : dosages, chauffe, agitation et précautions élémentaires. Tu peux préparer des produits de terrain (baumes, irritants, fumées simples, neutralisants légers) si tu as les ingrédients. Tu reconnais les erreurs typiques qui rendent un mélange dangereux. Ce savoir-faire donne une alchimie \"fiable\", même sans laboratoire.",
        competence: "Trait spécifique : Alchimie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Botanique & Cueillette (mineur)",
        effet: "Tu sais identifier les plantes utiles et éviter la plupart des intoxications grossières. Tu repères les bons moments de récolte et les méthodes de conservation simples. Ce savoir-faire sert autant à la cuisine qu'aux soins ou à l'alchimie, en te donnant des réserves exploitables. En terrain inconnu, tu sais chercher sans gaspiller la journée.",
        competence: "Trait spécifique : Botanique +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Premiers soins (mineur)",
        effet: "Tu sais stabiliser un blessé, nettoyer une plaie et limiter les complications immédiates. Tu distingues l'urgence vitale du \"ça fait mal\" et tu agis avec méthode. Tu peux improviser bandages, attelles et surveillance simple, sans transformer ça en chirurgie. Ce savoir-faire évite que la moindre blessure devienne une catastrophe.",
        competence: "Trait spécifique : Soin manuel +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Soins animaliers (mineur)",
        effet: "Tu sais approcher un animal blessé sans déclencher panique ou agressivité. Tu nettoies, penses et surveilles les signes dangereux avec des gestes rassurants. Tu comprends aussi quand il faut arrêter et laisser récupérer pour ne pas aggraver. Ce savoir-faire rend les montures et compagnons bien plus durables.",
        competence: "Trait spécifique : Soin animalier +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Dressage (mineur)",
        effet: "Tu connais les bases d'apprentissage : routine, récompense, limites et cohérence des ordres. Tu peux enseigner des commandes simples, corriger des comportements à risque et améliorer la fiabilité d'un animal. Tu repères aussi les signes avant-coureurs d'un stress ou d'une fuite. Ce savoir-faire ne \"domine\" pas, il rend l'animal compréhensible.",
        competence: "Compétence : Dressage +2 (Charisme)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Crochetage (mineur)",
        effet: "Tu manipules serrures et mécanismes simples avec précision, en évitant les gestes destructeurs. Tu sais repérer une serrure douteuse, trop neuve ou potentiellement piégée. Tu travailles proprement : écoute, ressenti, progression, plutôt que forcer au hasard. Même en échec, tu laisses moins de traces et fais moins de bruit.",
        competence: "Trait spécifique : Crochetage +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Désamorçage (mineur)",
        effet: "Tu sais chercher les déclencheurs et sécuriser une zone avant de toucher quoi que ce soit. Tu identifies les pièges courants, limites les risques et appliques une méthode simple mais sûre. Ce savoir-faire récompense la patience : vérifier, isoler, neutraliser. Il ne supprime pas le danger, mais évite les erreurs irréversibles.",
        competence: "Trait spécifique : Désamorçage +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Cartographie (mineur)",
        effet: "Tu sais lire une carte, corriger des erreurs et noter un itinéraire utile au groupe. Tu retranscris un terrain de façon exploitable : distances, dangers, repères, passages sûrs. Tu gardes des notes claires même quand la zone devient confuse. Ce savoir-faire transforme l'exploration en progression maîtrisée.",
        competence: "Trait spécifique : Cartographie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Navigation (mineur)",
        effet: "Tu comprends courants, passages, risques et manœuvres simples en eau douce ou côtière. Tu sais faire les gestes de base : amarres, nœuds utiles, entretien léger, lecture de météo immédiate. Ce savoir-faire réduit les accidents bêtes et améliore les déplacements sur l'eau. Même sans être capitaine, tu sais être fiable à bord.",
        competence: "Trait spécifique : Navigation +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Conduite de monture (mineur)",
        effet: "Tu sais guider une monture proprement, sans la cramer ni la brusquer. Tu gères mieux les terrains instables, les changements de vitesse et les réactions de peur. Tu comprends le rythme de l'animal et évites les erreurs qui le blessent. Ce savoir-faire transforme un trajet risqué en déplacement contrôlé.",
        competence: "Trait spécifique : Équitation pratique +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Conduite de véhicule (mineur)",
        effet: "Tu maîtrises les manœuvres sûres d'un véhicule courant : virages, freinage, chargement, équilibre et trajectoires. Tu anticipes les à-coups dangereux et sais quand il faut ralentir avant le problème. Tu peux aussi faire l'entretien basique qui évite la panne stupide. Ce savoir-faire rend les voyages plus rapides et moins risqués.",
        competence: "Trait spécifique : Maniement de véhicule +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Forge & ferronnerie (mineur)",
        effet: "Tu sais chauffer, redresser et ajuster des pièces simples sans ruiner le métal. Réparer une fixation, retaper un rivet ou stabiliser une arme abîmée devient possible. Tu reconnais aussi un travail mal fait qui cassera en plein combat. Ce savoir-faire rend l'équipement plus fiable sur la durée.",
        competence: "Trait spécifique : Ferronnerie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Travail du cuir (mineur)",
        effet: "Tu sais découper, coudre et renforcer le cuir pour réparer du matériel utile. Sangles, sacoches, fourreaux et protections légères deviennent entretenables en expédition. Tu repères les points de rupture avant qu'ils lâchent, et tu renforces au bon endroit. Ce savoir-faire garde ton équipement fonctionnel malgré l'usure.",
        competence: "Trait spécifique : Tannerie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Couture & raccommodage (mineur)",
        effet: "Tu sais réparer des vêtements vite et solidement, même sans conditions idéales. Tu peux ajuster une tenue pour gagner en mobilité ou renforcer des zones qui s'usent trop. Ce savoir-faire aide aussi à rester présentable, ce qui compte dans beaucoup de contextes sociaux. En voyage, ça évite de finir en haillons inutiles.",
        competence: "Trait spécifique : Couture +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Menuiserie (mineur)",
        effet: "Tu sais travailler le bois pour fabriquer ou réparer des structures simples. Barricades, supports, cadres, caisses ou abris deviennent réalisables avec méthode. Tu choisis les bonnes fixations et évites les assemblages qui cassent. Ce savoir-faire donne de la solidité là où les autres improvisent fragile.",
        competence: "Trait spécifique : Menuiserie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Maçonnerie (mineur)",
        effet: "Tu comprends comment un mur tient, où il porte, et où il va céder. Tu peux consolider une zone fragile, reboucher une brèche simple ou sécuriser un passage. Ce savoir-faire sert aussi à lire un bâtiment : points faibles, zones dangereuses, risques d'effondrement. Dans des ruines, ça évite de mourir par ignorance.",
        competence: "Trait spécifique : Maçonnerie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Chasse & dépeçage (mineur)",
        effet: "Tu sais traquer une proie utile et la prélever proprement sans tout gâcher. Le dépeçage devient rentable : viande, peau, os, graisses, rien n'est perdu bêtement. Tu limites aussi les risques en évitant les mauvaises poursuites et les angles dangereux. Ce savoir-faire transforme la chasse en ressource stable.",
        competence: "Trait spécifique : Chasse +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Herboristerie (mineur)",
        effet: "Tu sais préparer des remèdes simples : infusions, cataplasmes, pommades légères. Ça ne remplace pas une médecine avancée, mais ça stabilise, soulage et accélère la récupération sur les petits maux. Tu reconnais aussi les mélanges risqués et les doses qui deviennent toxiques. Très utile quand on manque de potions ou de soins magiques.",
        competence: "Trait spécifique : Herboristerie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Apothicaire (mineur)",
        effet: "Tu sais transformer des ingrédients en produits propres et conservables : solutions, onguents, poudres simples et préparations contrôlées. Tu apprends les règles de base de pureté et de stockage, ce qui évite beaucoup d'accidents. Tu peux aussi estimer la qualité d'un produit vendu en ville. Ce savoir-faire rend les soins plus réguliers et moins \"au hasard\".",
        competence: "Trait spécifique : Apothicairerie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Comptabilité (mineur)",
        effet: "Tu tiens des comptes clairs : dépenses, gains, dettes et stocks, sans te perdre au milieu. Tu repères rapidement une incohérence, une arnaque simple ou un registre mal tenu. Ce savoir-faire sert autant à une caravane qu'à une équipe d'aventuriers qui partage l'argent. Il évite les disputes et les \"mystères\" de caisse.",
        competence: "Trait spécifique : Comptabilité +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Cryptage & codes (mineur)",
        effet: "Tu connais des méthodes simples pour chiffrer un message, camoufler une info ou reconnaître un code basique. Tu peux sécuriser une communication courte et repérer les systèmes trop évidents. Ce savoir-faire ne rivalise pas avec les grands cryptographes, mais il suffit pour éviter les fuites faciles. Utile en intrigue, faction et logistique.",
        competence: "Trait spécifique : Chiffrement +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Artisanat de terrain (mineur)",
        effet: "Tu sais fabriquer des objets simples rapidement : attaches, cordages, cales, petites pièces de remplacement. Tu utilises ce que le terrain donne sans que ça devienne fragile au premier choc. Ce savoir-faire rend le groupe autonome et évite de dépendre d'une ville pour chaque détail. C'est l'art de faire solide avec peu.",
        competence: "Trait spécifique : Artisanat +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Joaillerie (mineur)",
        effet: "La taille, le sertissage et l'assemblage de pièces fines deviennent fiables, même avec un outillage limité. Tu sais évaluer la qualité d'une gemme ou d'un métal (défauts, pureté, fausses pierres) et repérer rapidement une contrefaçon grossière. La réparation d'un bijou (anneau fendu, chaîne rompue, serti desserré) se fait proprement, sans fragiliser la pièce. Enfin, tu peux créer des bijoux simples et solides, utiles autant pour le prestige que pour dissimuler un mécanisme discret (cache, compartiment fin).",
        competence: "Trait spécifique : Joaillerie +1 (Métier) ; Compétence : Expertise des gemmes +2 (Savoir)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Chirurgie (mineur)",
        effet: "Les gestes chirurgicaux de base deviennent possibles : incision propre, extraction, suture simple et contrôle des saignements avec méthode. La compréhension des risques (infection, choc, mauvais geste) pousse à préparer, désinfecter et stabiliser avant d'agir. Ce savoir-faire sert surtout en urgence ou quand les soins magiques manquent, en évitant d'aggraver une situation critique. Il ne remplace pas un maître-chirurgien, mais rend les interventions \"propres\" et cohérentes.",
        competence: "Trait spécifique : Chirurgie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Psychologie (mineur)",
        effet: "Les comportements humains se lisent avec plus de méthode : motivations, mécanismes de défense, réactions de stress et contradictions émotionnelles. Les questions sont mieux posées, avec moins de confrontation inutile et plus d'efficacité pour obtenir une réponse exploitable. Ce savoir-faire aide à calmer, cadrer, orienter une discussion… ou à repérer une manipulation. Il sert autant en enquête qu'en négociation, sans prétendre \"lire dans les pensées\".",
        competence: "Trait spécifique : Psychologie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Médecin (mineur)",
        effet: "Tu maîtrises la médecine \"complète\" du terrain : diagnostic, triage, traitement et suivi. Tu sais reconnaître les symptômes dangereux (infection, hémorragie interne, choc, fièvre) et décider quand stabiliser, quand immobiliser, quand opérer… ou quand ne pas toucher. Tu gères aussi l'hygiène médicale (désinfection, instruments, prévention), ce qui réduit fortement les complications sur la durée. Ce savoir-faire ne remplace pas un spécialiste rarissime, mais rend tes soins fiables et cohérents en campagne.",
        competence: "Trait spécifique : Médecine +1 (Métier) ; Compétence : Diagnostic +2 (Sagesse/Perception)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Agriculteur (mineur)",
        effet: "Tu sais faire produire la terre : semis, rotation, irrigation simple, entretien et récolte au bon moment. Tu reconnais les signes de maladie des cultures, de sol épuisé ou de météo qui va ruiner une saison, et tu sais improviser des solutions pragmatiques. Ce savoir-faire aide aussi en survie : trouver des zones cultivables, comprendre les stocks d'un village, et gérer des rations \"réelles\". En jeu, tu deviens une source de stabilité pour un camp ou une communauté.",
        competence: "Trait spécifique : Agriculture +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Tavernier (mineur)",
        effet: "Tu sais tenir une taverne : service, gestion des stocks, ambiance, et surtout lecture du client. Tu repères vite qui ment, qui cherche une bagarre, qui a des infos, et comment obtenir une discussion sans déclencher d'ennuis. Tu connais aussi les bases de l'organisation (chambres, réservations, dettes, fournisseurs) et les astuces pour éviter de te faire voler. Ce savoir-faire donne un vrai levier social et économique en ville.",
        competence: "Trait spécifique : Taverne & Service +1 (Métier) ; Compétence : Gestion d'établissement +2 (Charisme/Intelligence)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Pêche (mineur)",
        effet: "Tu sais choisir un spot, un moment et une méthode efficace sans t'épuiser pour rien. Ligne, filet ou piège simple : tu assures une prise régulière dans de bonnes conditions. Tu repères aussi les eaux douteuses, les espèces dangereuses et les signes de courant traître. Ce savoir-faire sécurise la survie quand les rations manquent et rend les traversées plus durables.",
        competence: "Trait spécifique : Pêche +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Travailleur du bois (mineur)",
        effet: "Tu sais abattre, débiter, façonner et assembler du bois de manière utile : manches, piquets, renforts, abris simples et réparations rapides. Tu reconnais les essences (souples, dures, résistantes à l'humidité) et choisis le bon bois pour éviter qu'un objet casse \"bêtement\". Tu sais aussi traiter et protéger (séchage, huilage, ajustements) pour augmenter la durée de vie. Plus \"terrain\" que la menuiserie fine, c'est le bois pratique et solide.",
        competence: "Trait spécifique : Travail du bois +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    },
    {
        nom: "Savoir-faire : Tanneur (mineur)",
        effet: "Tu sais transformer une peau brute en cuir utilisable : nettoyage, trempage, tannage, séchage et assouplissement. Tu repères les erreurs qui ruinent une peau (pourriture, mauvaise coupe, graisse mal retirée) et tu sais obtenir un cuir fiable même sans atelier parfait. Ce savoir-faire sert autant à fabriquer du matériel qu'à valoriser la chasse (peaux, fourrures, troc). Tu deviens une vraie source d'équipement durable en expédition.",
        competence: "Trait spécifique : Tannerie +1 (Métier)",
        categorie: "Talent de métier",
        cout: 2
    }
);

// Talents artistiques/métier (4 talents à 1 pt)
allTalents.push(
    {
        nom: "Joueur d'Instrument (mineur)",
        effet: "Tu maîtrises mieux ton instrument : justesse, rythme et transitions deviennent plus propres, même quand l'ambiance est bruyante ou stressante. Tu apprends à adapter ton jeu au contexte (apaiser, motiver, distraire, impressionner) sans perdre en contrôle. Avec le temps, tu sais \"porter\" une performance ou soutenir un rituel simple grâce à une exécution régulière. Ce talent ne fait pas de toi un virtuose, mais te rend fiable et expressif.",
        competence: "Compétence : Instrument +2 (Charisme/Intelligence si magie) ; Trait spécifique : Instrument +1 (Finesse/Métier)",
        categorie: "Talent de métier",
        cout: 1
    },
    {
        nom: "L'art du chant (Mineur)",
        effet: "Ta voix devient plus travaillée : souffle, projection et tenue des notes s'améliorent, ce qui rend tes performances plus stables. Tu sais mieux placer tes émotions dans la voix, ce qui aide à charmer, apaiser ou maintenir l'attention d'un groupe. Même fatigué ou sous pression, tu tiens mieux une mélodie sans casser ton rythme. C'est un talent vocal utile en scène, en social, ou pour soutenir l'esprit d'une équipe.",
        competence: "Compétence : Prestation de chant +2 (Charisme)",
        categorie: "Talent de métier",
        cout: 1
    },
    {
        nom: "Artiste de Scène (mineur — Théâtre)",
        effet: "Tu sais incarner un rôle avec plus de crédibilité : posture, regard, ton et rythme de parole s'alignent naturellement. Ta présence scénique augmente, ce qui rend tes performances plus marquantes lors de cérémonies, spectacles ou prises de parole jouées. En infiltration sociale, tu maintiens mieux un personnage sans te trahir à la première question imprévue. Tu improvises plus proprement, en gardant une cohérence qui trompe plus facilement.",
        competence: "Compétence : Jeux d'acteur +2 (Charisme)",
        categorie: "Talent de métier",
        cout: 1
    },
    {
        nom: "Négociant Habile (mineur)",
        effet: "Tu comprends mieux la logique d'un échange : valeur réelle, marge, urgence et leviers sociaux deviennent plus lisibles. Tu apprends à poser les bonnes questions, à proposer un compromis crédible et à repérer une arnaque simple avant qu'elle passe. Tes tractations sont plus propres : tu insistes quand c'est utile et tu lâches quand ça protège l'accord. Ce talent ne garantit pas un rabais magique, mais augmente nettement tes chances d'obtenir un prix juste ou un deal avantageux.",
        competence: "Trait spécifique : Marchandage +1 (Social)",
        categorie: "Talent de métier",
        cout: 1
    }
);

// ═════════════════════════════════════════════════════════════════════════
// CATÉGORIE 2 : TALENT DE COMBAT (38 talents)
// ═════════════════════════════════════════════════════════════════════════

// Maîtrises d'armes (29 talents à 1 pt)
allTalents.push(
    {
        nom: "Maîtrise de l'Épée à Une Main (mineur)",
        effet: "Arme d'équilibre et de polyvalence, l'épée à une main permet d'enchaîner attaque, feinte et parade sans changer de posture. Sa maniabilité favorise les ajustements rapides et les ripostes propres. Elle s'adapte facilement aux styles défensifs comme offensifs. C'est une base solide pour apprendre le \"rythme\" d'un duel.",
        competence: "Obtention de compétence : Attaque à l'épée à une main +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Épée à Deux Mains (mineur)",
        effet: "Cette maîtrise apprend à gérer l'inertie et l'allonge d'une grande lame, afin de frapper avec impact sans se découvrir inutilement. Chaque attaque demande un placement du corps plus engagé, mais la pression exercée est bien supérieure. Idéale pour briser une garde ou forcer l'adversaire à reculer. Elle récompense la lecture du timing plutôt que la vitesse brute.",
        competence: "Obtention de compétence : Attaque à l'épée à deux mains +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Bouclier (mineur)",
        effet: "Le bouclier devient une arme défensive active : angle, position et anticipation comptent autant que la solidité. Il sert à absorber des chocs, fermer une ligne d'attaque, ou créer une ouverture en repoussant. Les déplacements se font plus \"compacts\", avec une garde plus stable. Même un simple blocage bien placé peut changer l'issue d'un échange.",
        competence: "Obtention de compétence : Défense avec bouclier +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Dague (mineur)",
        effet: "La dague exige précision et vitesse : elle brille quand la distance est courte et que l'ouverture est fine. Cette maîtrise apprend à piquer, trancher et se replacer sans s'exposer. Elle favorise les enchaînements rapides, les contres et les attaques opportunistes. Très efficace quand l'adversaire est surpris ou déjà engagé ailleurs.",
        competence: "Obtention de compétence : Attaque à la dague +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Lance (mineur)",
        effet: "La lance impose une zone : elle maintient l'ennemi à distance et contrôle l'approche. On apprend à utiliser l'allonge pour piquer, repousser, et casser l'élan d'un adversaire. En position défensive, elle devient un rempart ; en charge, une arme de perforation. Son efficacité dépend d'un bon placement des appuis et de la ligne.",
        competence: "Obtention de compétence : Attaque à la lance +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Gourdin (mineur)",
        effet: "Le gourdin enseigne l'efficacité brute : frapper vite, frapper fort, frapper là où ça casse. Les coups contondants punissent surtout les cibles peu protégées et peuvent désorganiser une garde. La maîtrise repose sur l'angle et la répétition des impacts, plus que sur la finesse. Très utile quand il faut neutraliser rapidement sans techniques complexes.",
        competence: "Obtention de compétence : Attaque au gourdin +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Masse (mineur)",
        effet: "La masse apprend à concentrer l'impact pour écraser protections, os et articulations. Même si elle paraît simple, elle demande un bon contrôle de l'inertie pour ne pas se retrouver \"ouvert\" après l'attaque. Les frappes sont moins nombreuses, mais beaucoup plus punitives. Elle est redoutable contre les armures et les adversaires trop confiants dans leur défense.",
        competence: "Obtention de compétence : Attaque à la masse +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Marteau de Guerre (mineur)",
        effet: "Avec le marteau de guerre, l'objectif est clair : briser. La maîtrise enseigne à viser les zones critiques (bouclier, casque, épaules, genoux) et à faire parler la force de frappe. Chaque coup est lent comparé à une lame, mais l'impact peut renverser le rythme d'un combat. L'arme récompense le sang-froid et le bon moment, pas la précipitation.",
        competence: "Obtention de compétence : Attaque au marteau de guerre +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Hallebarde (mineur)",
        effet: "La hallebarde combine portée, tranchant et accroche : elle sert autant à frapper qu'à contrôler. La maîtrise apprend à garder l'adversaire à \"mi-distance\", là où il peine à répondre. Elle excelle contre les cibles protégées ou montées, grâce à son levier et ses angles. Un bon maniement transforme l'arme en menace constante plutôt qu'en simple grand coup.",
        competence: "Obtention de compétence : Attaque à la hallebarde +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Fléau (mineur)",
        effet: "Le fléau ne se manie pas comme une arme rigide : il faut apprendre le rythme de la chaîne et le retour dangereux. Cette maîtrise sert à contourner les défenses classiques, surtout les boucliers. Les frappes punissent les adversaires qui bloquent mécaniquement sans réfléchir. Mal géré, il devient aussi dangereux pour son porteur : la discipline est essentielle.",
        competence: "Obtention de compétence : Attaque au fléau +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Hache de Combat (mineur)",
        effet: "La hache de combat privilégie la coupure lourde : elle vise à entamer la cible, faire saigner et casser la garde par le choc. La maîtrise apprend à exploiter le \"crochet\" de la lame pour accrocher, tirer ou ouvrir. Elle est moins élégante qu'une épée, mais souvent plus traumatisante. Idéale pour des échanges courts et violents.",
        competence: "Obtention de compétence : Attaque à la hache à une main +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Rapière (mineur)",
        effet: "La rapière mise sur l'estoc et la précision : elle cherche les failles plutôt que l'écrasement. La maîtrise apprend la distance exacte, la ligne, et la riposte au bon moment. Elle punit les attaques trop larges et les erreurs de posture. Dans un duel, elle brille quand la technique prend le dessus sur la force brute.",
        competence: "Obtention de compétence : Attaque à la rapière +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arc (mineur)",
        effet: "L'arc enseigne la discipline du tir : posture, respiration et régularité. La maîtrise apprend à choisir ses angles, à tirer sans se précipiter, et à rester discret si nécessaire. Selon le style, on privilégie la cadence, la portée ou la puissance. Un bon archer gagne surtout parce qu'il tire \"propre\", pas parce qu'il tire plus fort.",
        competence: "Choix 1 : Tir à l'arc court +2 ; Choix 2 : Tir à l'arc long +2 ; Choix 3 : Tir à l'arc de guerre +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arbalète (mineur)",
        effet: "L'arbalète offre une puissance stable et une précision rassurante, au prix d'un rythme plus lent. Cette maîtrise apprend à choisir le bon moment pour tirer, puis à se repositionner pendant le rechargement. Elle est particulièrement efficace contre des cibles protégées, car l'impact est plus brutal. On y gagne une approche \"posée\" du combat à distance.",
        competence: "Obtention de compétence : Tir à l'arbalète +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Bâton de Combat (mineur)",
        effet: "Le bâton développe un style de contrôle : distance, balayages, déséquilibres et frappes fluides. La maîtrise apprend à utiliser les deux extrémités, à bloquer sans subir, et à repousser sans s'enfermer. Il sert à gérer plusieurs menaces ou à maintenir un adversaire hors de portée. Très apprécié pour sa défense active et sa mobilité.",
        competence: "Obtention de compétence : Attaque au bâton de combat +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Sabre (mineur)",
        effet: "Le sabre encourage un combat en mouvement : frappes dynamiques, angles rapides et transitions propres. La maîtrise apprend à \"couper en passant\", sans rester figé face à l'ennemi. Il excelle quand la mobilité et le tempo comptent plus que le choc frontal. Les ouvertures sont créées par le rythme et la trajectoire, pas par la force pure.",
        competence: "Obtention de compétence : Attaque au sabre +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme à Feu Courte (mineur)",
        effet: "Les armes à feu courtes se jouent à portée rapprochée : dégainé rapide, tir opportuniste, pression immédiate. La maîtrise apprend à viser vite sans paniquer, et à exploiter les fenêtres courtes. Elle sert aussi à tirer en mouvement et à gérer un espace confiné. Une arme idéale pour terminer un échange ou forcer un recul.",
        competence: "Obtention de compétence : Tir à l'arme à feu courte +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme à Feu Longue (mineur)",
        effet: "Les armes à feu longues privilégient la précision et l'impact à distance : on tire moins, mais chaque tir compte. La maîtrise apprend la visée stable, la gestion du recul et le choix du bon angle. Elle est redoutable pour contrôler une zone ou éliminer une menace avant l'approche. L'efficacité vient de la patience et de la préparation, pas du réflexe pur.",
        competence: "Obtention de compétence : Tir à l'arme à feu longue +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme de Jet : Dague (mineur)",
        effet: "La dague de jet demande un geste net et silencieux : un lancer propre vaut mieux qu'une force excessive. La maîtrise apprend à choisir la distance réaliste et à viser une zone vulnérable. Elle sert surtout à l'embuscade, à la diversion ou à achever une cible déjà engagée. L'efficacité dépend de la discrétion et du timing plus que du dégât brut.",
        competence: "Obtention de compétence : Jet de dague +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme de Jet : Hachette (mineur)",
        effet: "La hachette de jet est lourde et brutale : quand elle touche, elle fait mal, mais elle demande un lancer solide. La maîtrise apprend à gérer le poids, la rotation et le moment de libération. Elle est moins discrète qu'une dague, mais plus traumatisante. Très bonne pour un engagement rapide ou une ouverture violente.",
        competence: "Obtention de compétence : Jet de hachette +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de l'Arme de Jet : Javelot (mineur)",
        effet: "Le javelot combine force et perforation : c'est un projectile fait pour traverser une ligne ou punir une cible à distance. La maîtrise apprend à lancer droit, à garder la stabilité du corps et à exploiter l'élan. Il fonctionne très bien pour ouvrir un combat ou stopper une approche. Arme simple en apparence, mais exigeante en contrôle.",
        competence: "Obtention de compétence : Jet de javelot +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Hache de Guerre (mineur)",
        effet: "La hache de guerre est un outil de destruction à deux mains : elle vise à briser en une frappe. La maîtrise apprend à encaisser l'inertie et à frapper avec un alignement parfait pour ne pas se découvrir. Ses coups écrasent la défense et peuvent démoraliser l'adversaire par la violence de l'impact. Elle récompense le bon timing et la détermination.",
        competence: "Obtention de compétence : Attaque à la hache de guerre +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Faux-Scie (mineur)",
        effet: "La faux-scie s'utilise pour lacérer et maintenir la pression : elle cherche à \"user\" la cible. La maîtrise apprend à tirer, accrocher et enchaîner des blessures difficiles à ignorer. Elle est cruelle parce qu'elle impose un combat long et douloureux, même si l'adversaire survit. Efficace contre ceux qui laissent trop souvent leur garde ouverte.",
        competence: "Obtention de compétence : Attaque à la faux-scie +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Couteau de Combat (mineur)",
        effet: "Compact et direct, le couteau de combat sert autant à frapper qu'à survivre : contre-attaques, corps-à-corps, gestes rapides. La maîtrise apprend à exploiter les angles courts et à réagir quand l'espace manque. Il excelle dans les luttes rapprochées, là où une grande arme devient encombrante. Une lame \"pratique\", dangereuse quand elle est bien placée.",
        competence: "Obtention de compétence : Attaque au couteau de combat +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Fouet (mineur)",
        effet: "Le fouet se manie au rythme : distance, claquement, rappel et angles obliques. Tu apprends à frapper sans t'emmêler, à contrôler la zone et à punir les approches trop directes. Cette maîtrise sert autant à harceler qu'à désarmer ou perturber une garde par l'imprévisible trajectoire. Mal utilisé, le fouet te met en danger : ici tu apprends la sécurité du geste.",
        competence: "Obtention de compétence : Attaque au fouet +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise des Griffes de Combat (mineur)",
        effet: "Les griffes de combat exigent un corps-à-corps agressif et des trajectoires courtes : trancher, accrocher, et repartir. Tu apprends à utiliser poignets et coudes pour enchaîner sans t'ouvrir, et à viser tissus/points d'appui plutôt que de \"forcer\" sur l'armure. Cette maîtrise favorise les styles rapides, prédation et pression continue. Très forte en espace confiné, elle récompense la mobilité.",
        competence: "Obtention de compétence : Attaque aux griffes de combat +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Lame Jumelle (mineur)",
        effet: "Deux lames courtes ou jumelles demandent coordination : alternance main forte/main faible, angles croisés et protection active. Tu apprends à garder la cadence sans te déséquilibrer, à créer des ouvertures par double menace et à punir une parade trop \"simple\". Cette maîtrise brille en duel nerveux et en défense mobile. Elle demande discipline : frapper vite, mais surtout frapper propre.",
        competence: "Obtention de compétence : Attaque à la lame jumelle +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise du Chakram (mineur)",
        effet: "Le chakram combine lancer précis et récupération intelligente : trajectoire, rotation et distance réelle. Tu apprends à viser utile plutôt que spectaculaire, à choisir une fenêtre de tir sûre et à éviter les ricochets stupides. Cette maîtrise favorise le harcèlement, la pression à moyenne portée et les ouvertures sur cibles déjà engagées. Bien placé, un chakram coupe le rythme plus qu'il ne \"one-shot\".",
        competence: "Obtention de compétence : Jet de chakram +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise de la Faux de Combat (mineur)",
        effet: "La faux de combat se joue sur l'accroche : tirer, déséquilibrer, couper en arc, et contrôler la mi-distance. Tu apprends à exploiter le crochet pour ouvrir une garde, menacer les jambes, ou forcer un recul. Cette maîtrise demande de comprendre l'inertie : mal gérée, elle te \"sort\" de ta ligne. Bien gérée, elle transforme chaque approche ennemie en risque.",
        competence: "Obtention de compétence : Attaque à la faux de combat +2",
        categorie: "Talent de combat",
        cout: 1
    }
);

// Styles de combat (9 talents à 1 pt)
allTalents.push(
    {
        nom: "Maîtrise mineure de l'art de la parade",
        effet: "La parade devient un geste technique plutôt qu'un simple réflexe : angle de lame, alignement de garde, et lecture des trajectoires. Au lieu d'encaisser, tu apprends à dévier juste assez pour casser la force et garder la ligne. Tes mouvements se font plus courts et plus propres, limitant les ouvertures gratuites. Une bonne parade prépare naturellement une réponse immédiate.",
        competence: "Obtention de compétence : Parade technique +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'art de l'esquive",
        effet: "L'esquive se travaille au timing : retrait, pas de côté et pivot du buste pour \"laisser passer\" l'attaque. Tu évites au plus juste sans te déséquilibrer, afin de rester prêt à contre-attaquer. Cette maîtrise t'apprend à anticiper le point d'impact et à sortir de la ligne avant qu'il ne soit trop tard. Plus tu restes calme, plus tes esquives deviennent économes.",
        competence: "Obtention de compétence : Esquive instinctive +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'art du blocage de corps",
        effet: "Le blocage corporel utilise l'ancrage au sol et la structure du corps pour encaisser sans se briser. Avant-bras, épaule ou torse servent à fermer une percée et à casser l'angle de l'attaque. La clé n'est pas de \"prendre le coup\", mais d'absorber puis de renvoyer l'énergie avec contrôle. Cette discipline est particulièrement utile contre les frappes courtes et agressives.",
        competence: "Obtention de compétence : Blocage corporel +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'art des postures de combat",
        effet: "Les postures ne sont plus des poses : ce sont des bases de déplacement et de puissance. Tu travailles la répartition du poids, l'ouverture de hanche, et la transition entre gardes sans latence. Chaque posture prépare la suivante, ce qui rend ton combat plus stable et plus \"fluide\" sous pression. Résultat : tu perds moins d'efficacité en bougeant.",
        competence: "Obtention de compétence : Postures de combat +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'art de la riposte",
        effet: "La riposte s'exécute sur le battement qui suit l'impact : juste après la défense, avant que l'ennemi ne se replace. Tu apprends à punir sans casser ta garde, en restant compact et dangereux. Cette maîtrise entraîne ton œil à reconnaître une ouverture instantanée et ton corps à la saisir. Une bonne riposte n'est pas \"vite\" : elle est au bon moment.",
        competence: "Obtention de compétence : Riposte +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'art de la feinte",
        effet: "Une feinte crédible manipule la réaction adverse : épaule, regard, cadence, et annonce d'une ligne d'attaque. Tu apprends à provoquer un blocage, un pas de côté ou un contre prématuré, puis à frapper là où la garde s'est déplacée. La feinte devient un outil de priorité : tu forces l'autre à répondre à ton mensonge. Plus l'adversaire est nerveux, plus elle est rentable.",
        competence: "Obtention de compétence : Feinte technique +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Analyste de combat tactique (mineur)",
        effet: "Tu observes le combat comme une suite de schémas : habitudes, préférences, failles répétées. Cette maîtrise aide à identifier rapidement les forces et faiblesses d'un adversaire et à ajuster ton approche. Même sans \"tout savoir\", tu apprends à choisir une option plus sûre plutôt qu'un pari. Très utile pour coordonner un groupe ou éviter de tomber dans un piège tactique.",
        competence: "Compétence : Analyse de combat +2 (Sagesse)",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Style de combat de corps : Coups de pied (mineur)",
        effet: "Tu structures ton jeu de jambes : appuis, pivots, hanches et distances deviennent plus propres. Les coups de pied gagnent en précision (angles, timing) et tu te replaces plus vite après une frappe, avec moins d'ouvertures gratuites. Tu apprends aussi à utiliser tes jambes pour contrôler l'espace (tenir à distance, casser une approche). Un style efficace pour les combattants mobiles.",
        competence: "Obtention de compétence : Style de corps – Coups de pied +2",
        categorie: "Talent de combat",
        cout: 1
    },
    {
        nom: "Style de combat de corps : Coups de poing (mineur)",
        effet: "Tu apprends le punch \"propre\" : garde, épaules, respiration et transfert de poids. Les frappes deviennent plus directes et mieux placées, avec des enchaînements courts qui limitent le sur-engagement. Tu sais aussi varier les hauteurs (corps/tête) et utiliser le jab/contre pour casser le rythme adverse. Un style très fiable quand il faut frapper vite sans se découvrir.",
        competence: "Obtention de compétence : Style de corps – Coups de poing +2",
        categorie: "Talent de combat",
        cout: 1
    }
);

// ═════════════════════════════════════════════════════════════════════════
// CATÉGORIE 3 : TALENT LIÉ À LA MAGIE (9 talents)
// ═════════════════════════════════════════════════════════════════════════

allTalents.push(
    {
        nom: "Maîtrise d'une Magie Élémentaire",
        effet: "Une Source est choisie (feu, eau, vent, terre, foudre, etc.) et l'accord devient plus net et plus constant. Les sorts gagnent en cohérence thématique : dégâts spécialisés et altérations de terrain (chaleur, givre, bourrasques…). Cette maîtrise ouvre des réponses adaptées, comme des contres élémentaires et des protections contextuelles. Elle renforce aussi les synergies avec armes, styles et environnements.",
        competence: "Compétence : Magie élémentaire (X) +2 (Intelligence)",
        categorie: "Talent lié à la magie",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique de Modulation",
        effet: "La magie n'est plus figée une fois lancée : elle se règle en temps réel. Portée, intensité, zone ou \"pression\" d'effet peuvent être ajustées selon l'imprévu. Ce style favorise les mages tactiques qui réagissent vite au terrain et aux erreurs ennemies. Il transforme un sort correct en réponse parfaite au bon moment.",
        competence: "Compétence : Modulation magique +2",
        categorie: "Talent lié à la magie",
        cout: 1
    },
    {
        nom: "Maîtrise du style magique de Matérialisation",
        effet: "L'énergie prend une forme tangible : arme éphémère, outil, structure simple, entrave, parfois une forme quasi-vivante très brève. La créativité devient une ressource, autant en exploration qu'en combat. Ce style privilégie l'utilitaire et la polyvalence plutôt que la pure destruction. Il ouvre la voie à des solutions \"impossibles\" sans équipement.",
        competence: "Compétence : Matérialisation magique +2",
        categorie: "Talent lié à la magie",
        cout: 2
    },
    {
        nom: "Maîtrise du style magique de Barrière",
        effet: "Les boucliers magiques sont construits avec méthode : forme, résistance, angle, couverture. La défense peut protéger une personne, une zone, un objet, ou couper une ligne de tir. Ce style sert aussi contre l'environnement (déflagrations, vents, froid, projections). Plus le mage est stable, plus la barrière devient fiable.",
        competence: "Compétence : Barrière magique +2",
        categorie: "Talent lié à la magie",
        cout: 2
    },
    {
        nom: "Maîtrise du style magique de Guérison",
        effet: "La restauration devient plus propre : refermer, purifier, stabiliser et relancer un corps épuisé. Blessures, maladies légères et fatigue sont mieux gérées, avec moins de \"soins perdus\". Ce style récompense le soutien régulier plutôt que le miracle unique. Il aide aussi à sécuriser un groupe sur la durée.",
        competence: "Compétence : Guérison magique +2",
        categorie: "Talent lié à la magie",
        cout: 2
    },
    {
        nom: "Maîtrise du style magique de Fusion élémentaire",
        effet: "Deux éléments (ou plus) peuvent être combinés pour créer une réaction hybride : vapeur, boue, foudre humidifiée, glace tranchante, etc. Les effets deviennent moins prévisibles et plus difficiles à contrer. Ce style demande de la discipline, car la fusion instable peut dégrader le contrôle. Bien maîtrisée, elle donne un énorme avantage stratégique.",
        competence: "Compétence : Fusion magique +2",
        categorie: "Talent lié à la magie",
        cout: 2
    },
    {
        nom: "Maîtrise du style magique d'Enchantement",
        effet: "Des propriétés magiques sont inscrites dans un objet ou un être : renfort d'arme, protection d'armure, utilitaire discret, effet latent. Le style peut viser le temporaire (combat) ou le durable (préparation). Il repose sur la précision et la compatibilité des supports. Excellent pour les groupes qui planifient et optimisent.",
        competence: "Compétence : Enchantement magique +2",
        categorie: "Talent lié à la magie",
        cout: 2
    },
    {
        nom: "Maîtrise du style magique d'Insufflation",
        effet: "L'énergie est injectée directement dans une cible : allié, créature, objet ou sort en cours. Cela sert à amplifier, activer un effet latent ou stabiliser un maintien fragile. Le style est rapide, \"chirurgical\", souvent utilisé en plein combat. Très fort pour soutenir un combattant ou renforcer une action clé au bon timing.",
        competence: "Compétence : Insufflation magique +2",
        categorie: "Talent lié à la magie",
        cout: 2
    },
    {
        nom: "Maîtrise du style magique d'Illusion",
        effet: "La perception sensorielle est manipulée : images, sons, sensations, fausses présences, voire effets émotionnels légers. L'illusion sert à détourner l'attention, casser une formation, créer une ouverture ou contrôler une foule. Plus c'est cohérent et subtil, plus c'est dangereux. Ce style récompense l'intelligence sociale autant que la puissance magique.",
        competence: "Compétence : Illusion magique +2",
        categorie: "Talent lié à la magie",
        cout: 2
    }
);

// ═════════════════════════════════════════════════════════════════════════
// CATÉGORIE 4 : TALENT COMMUN (57 talents à 1 pt)
// ═════════════════════════════════════════════════════════════════════════

allTalents.push(
    {
        nom: "Maîtrise mineure de l'Agilité",
        effet: "Les déplacements gagnent en fluidité et en précision, même lors des changements brusques de direction. Les appuis deviennent plus sûrs, ce qui réduit les pertes d'équilibre et améliore les réactions instinctives. L'esquive et l'évitement se font avec moins d'hésitation, sans \"casser\" le mouvement. Cette maîtrise sert autant en combat qu'en terrain difficile.",
        competence: "Trait spécifique : Agilité de mouvement +1 (Finesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'Acrobatie",
        effet: "Les figures et franchissements deviennent plus propres : roulades, sauts, réceptions et mouvements aériens s'enchaînent avec maîtrise. La gestion de l'élan et du timing évite les retombées maladroites et les blessures bêtes. Même sous pression, le corps garde une réponse coordonnée. Idéal pour traverser, impressionner, ou survivre à une situation instable.",
        competence: "Compétence : Action acrobatique +2 (Dextérité) ; Trait spécifique : Acrobatie +1 (Finesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Furtivité Silencieuse (mineure)",
        effet: "La démarche devient plus discrète et les déplacements produisent moins de bruit, même sur un sol imparfait. Les ombres, les sons ambiants et les obstacles sont utilisés pour réduire la visibilité et masquer la présence. Les approches gagnent en finesse, tout comme les retraites rapides sans trace évidente. Très utile pour observer, surprendre, ou éviter une confrontation.",
        competence: "Compétence : Furtivité +2 (Dextérité) ; Trait spécifique : Déplacement silencieux (Finesse) +1",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Expertise du Nageur (mineure)",
        effet: "La nage se fait avec plus d'économie, en gérant mieux le souffle et la fatigue sur la durée. Les courants et les conditions d'eau sont mieux compris, ce qui limite les mouvements inutiles. Les manœuvres de plongée et de secours deviennent plus sûres, même en eau difficile. Un talent précieux dès qu'un environnement aquatique complique l'action.",
        competence: "Trait spécifique : Nage +1 (Métier)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Escalade Instinctive (mineure)",
        effet: "Les prises fiables se repèrent plus vite et l'adhérence est mieux exploitée, même sur des surfaces douteuses. La stabilité augmente grâce à une meilleure répartition du poids et un rythme d'ascension plus prudent. Les erreurs d'appui se font plus rares, tout comme les glissades inutiles. Cette maîtrise aide à grimper sans équipement lourd et à limiter les risques de chute.",
        competence: "Trait spécifique : Escalade +1 (Finesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Diplomatie Affirmée (mineure)",
        effet: "Les échanges sociaux tendus deviennent plus simples à gérer grâce à un ton mieux choisi et des mots plus justes. Les demandes se structurent naturellement, sans paraître agressives ou faibles. Les tensions se désamorcent plus souvent avant de dégénérer, et les négociations gagnent en crédibilité. Une prise de parole \"qui tient\" même lorsque le contexte est hostile.",
        competence: "Trait spécifique : Parole Diplomatique +1 (Social) ; Compétence : Présence Diplomatique +2 (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Manipulateur Subtil (mineur)",
        effet: "L'influence passe par la lecture des failles : fierté, peur, culpabilité, besoin de validation. Les suggestions se placent de manière moins frontale, rendant la pression plus difficile à identifier. Les discussions secrètes et les interrogatoires deviennent plus favorables, sans forcément mentir. Cette maîtrise joue sur la psychologie et la perception, pas sur la magie.",
        competence: "Trait spécifique : Manipulation social +1 (Social) ; Compétence : Manipulation (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Détection Magique (mineure)",
        effet: "Une sensibilité particulière aux flux permet de repérer les anomalies et les zones \"chargées\". Les objets enchantés, résidus de sorts ou pièges occultes laissent des sensations plus faciles à interpréter. Sans donner une vision magique, cette intuition guide vers les bons endroits à inspecter. Indispensable pour éviter de marcher à l'aveugle dans le surnaturel.",
        competence: "Compétence : Analyse magique +2 (Intelligence)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Charmeur Naturel (mineur)",
        effet: "La présence inspire plus spontanément la sympathie ou l'intérêt, même sans effort particulier. Le langage corporel paraît plus ouvert, plus élégant, et les échanges se font plus doux. Une faveur, une seconde chance ou une information se décrochent plus facilement. Ce talent agit surtout par impression générale, pas par domination.",
        competence: "Compétence : Séduction +2 (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Beau Parleur (mineur)",
        effet: "Les idées se formulent avec plus de clarté, de rythme et de puissance persuasive. Le vocabulaire s'adapte au public sans perdre la cohérence du propos. Les discours publics, plaidoiries et débats deviennent plus convaincants et mieux tenus sous pression. Une parole mieux maîtrisée, capable de retourner l'ambiance d'une salle.",
        competence: "Trait spécifique : Éloquence +1 (Social) ; Compétence : Présence éloquente +2 (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Leadership Naturel (mineure)",
        effet: "L'autorité se ressent davantage dans la manière de parler, de décider et de rester stable en situation critique. Les consignes gagnent en clarté, ce qui améliore la coordination du groupe. La confiance et le courage se transmettent plus facilement, même quand la situation se détériore. Une présence qui donne un cap plutôt qu'un ordre brutal.",
        competence: "Compétence : Leadership +2 (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître du Pickpocket (mineur)",
        effet: "Le vol discret devient plus propre grâce à une meilleure lecture du timing et des angles morts. La main se fait plus sûre, plus rapide, et les gestes inutiles disparaissent. L'observation repère plus facilement où les cibles rangent naturellement leurs objets. Même en cas d'échec, la suspicion immédiate est plus facile à éviter.",
        competence: "Trait spécifique : Vol discret +1 (Finesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître du Déguisement (mineur)",
        effet: "L'apparence se transforme avec plus de crédibilité : posture, intonation et détails sociaux s'alignent. Un rôle ne se limite plus à un costume, il devient une manière d'exister. Les infiltrations et sorties se font avec moins d'accrocs visibles. Particulièrement utile pour passer des contrôles ou changer d'identité en ville.",
        competence: "Compétence : Déguisement +2 (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître de la Danseur (mineur)",
        effet: "La danse devient une maîtrise du rythme et de l'espace, capable d'attirer l'attention ou de la détourner. Les mouvements gagnent en expressivité et en communication non verbale. En scène comme en fête, l'aisance crée une présence forte, parfois hypnotique. Un talent qui sert autant à séduire qu'à distraire.",
        competence: "Trait spécifique : Danse +1 (Finesse) ; Compétence : Prestation de danse (Charisme) +2",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître du Pistage (mineur)",
        effet: "Les traces se lisent plus finement : empreintes, perturbations, signes discrets de passage. La direction, la vitesse et parfois l'intention deviennent plus faciles à estimer. Les fausses pistes et les pièges simples se repèrent mieux. Un atout majeur pour traquer ou éviter d'être traqué.",
        competence: "Compétence : Pistage +2 (Perception)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître du Camouflage (mineur)",
        effet: "Se fondre dans un décor devient plus naturel grâce à une meilleure gestion de la silhouette, des couleurs et de l'immobilité. Les décors urbains comme naturels offrent plus d'angles de dissimulation exploitables. L'observation longue sans être repéré devient plus accessible. Parfait pour l'embuscade, l'espionnage ou la fuite.",
        competence: "Compétence : Camouflage +2 (Dextérité)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Lecture du Mensonge (mineur)",
        effet: "Les incohérences ressortent davantage : hésitations, réponses trop parfaites, émotions décalées. L'attention se porte autant sur le contexte que sur les tics, ce qui évite de se tromper trop vite. Les mensonges par peur ou confusion se distinguent mieux des mensonges calculés. Un talent qui sert surtout à poser la question qui casse le masque.",
        competence: "Compétence : Lecture des mensonges +2 (Sagesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître du Bluff (mineur)",
        effet: "Les mensonges gagnent en cohérence, avec des détails \"suffisants\" et un ton plus stable. Les explications restent plausibles sans trop en dire, même sous interrogation. La capacité à maintenir un rôle se renforce quand la pression monte. Idéal pour passer un contrôle, détourner un soupçon ou protéger un secret.",
        competence: "Compétence : Bluff +2 (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître du Saut Précis (mineur)",
        effet: "Les distances se jugent plus vite et les réceptions deviennent plus sûres. Les obstacles se franchissent avec moins d'hésitation et moins de perte de vitesse. En combat, cela aide à se repositionner ou à sortir d'un danger immédiat. Un talent de mobilité nette, pensé pour l'efficacité.",
        competence: "Trait spécifique : Saut +1 (Finesse) ; Compétence : Saut (Dextérité) +2",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître de l'Investigation (mineur)",
        effet: "Les scènes se lisent avec méthode : ce qui manque, ce qui a bougé, ce qui ne colle pas. Les indices se relient plus facilement pour construire une hypothèse utilisable. Les conclusions hâtives se font plus rares grâce à une vérification instinctive. Une maîtrise précieuse pour enquêter sans se perdre dans le bruit.",
        competence: "Compétence : Investigation +2 (Perception)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Survivaliste (mineur)",
        effet: "Les bases de survie deviennent fiables : eau, feu, abri, routines simples et gestion de ressources. Les erreurs qui coûtent cher (froid, épuisement, mauvaise eau) se réduisent nettement. L'autonomie augmente, même en cas de séparation du groupe. Un talent qui protège sur la durée plus qu'il ne brille sur un instant.",
        competence: "Compétence : Survie +2 (Sagesse/Perception) ; Trait spécifique : Survivaliste +1 (Instinct/Métier)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Grimpeur (mineur)",
        effet: "La grimpe se fait plus technique : appuis propres, gestion du rythme et pauses intelligentes. Les surfaces instables et les rebords se négocient avec plus de contrôle. La fatigue arrive moins vite et les erreurs de placement diminuent. Très utile en verticalité urbaine comme en terrain naturel.",
        competence: "Trait spécifique : Grimpette +1 (Finesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maître dans l'Art de la Réflexion (mineur)",
        effet: "La pensée devient plus structurée : les problèmes se découpent en étapes plutôt qu'en intuitions. Les contradictions et détails logiques ressortent mieux face à une énigme ou un mécanisme. Les fausses évidences piègent moins souvent, et les raisonnements se tiennent davantage. Une maîtrise mentale qui évite surtout les mauvaises décisions.",
        competence: "Compétence : Réflexion +2 (Intelligence)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Blagueur (mineur)",
        effet: "L'humour sert d'outil social : détendre, désamorcer, ou relancer un moral qui s'effondre. Les répliques tombent mieux, avec un sens du timing plus sûr. Les tensions se brisent plus souvent avant d'exploser, sans ridiculiser les mauvaises personnes. Un talent qui rend l'ambiance plus respirable quand tout se crispe.",
        competence: "Trait spécifique : Humour +1 (Social) ; Compétence : Présence Humoristique (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Professorat de son Art (mineur)",
        effet: "Transmettre un savoir devient plus clair : démonstrations simples, progression logique, corrections utiles. Les explications s'adaptent mieux au niveau et au tempérament de l'élève. La pédagogie gagne en efficacité sans devenir autoritaire. Un atout pour former une équipe ou partager des techniques rares.",
        competence: "Trait spécifique : Enseignement +1 (Savoir/Social)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Observateur de terrain (mineur)",
        effet: "Les lieux se lisent plus vite : angles morts, sorties, points hauts, zones à risque et couverts. Les détails \"suspects\" ressortent plus naturellement avant même l'analyse complète. Le choix des positions devient plus intelligent en exploration comme en combat. Un talent de lecture spatiale, utile et discret.",
        competence: "Compétence : Observation environnementale +2 (Perception)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineur de diagnostique corporelle",
        effet: "L'état physique se perçoit mieux à travers la posture, la respiration, le teint et les micro-signaux de douleur. La fatigue, les blessures cachées ou une maladie naissante deviennent plus faciles à repérer. Cela sert autant à aider un allié qu'à estimer un adversaire. Une lecture pratique du corps, sans prétendre remplacer un médecin expert.",
        competence: "Compétence : Analyse corporelle +2 (Perception)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Intimidateur (mineur)",
        effet: "La présence impose davantage : silence, regard, distance et manière de parler pèsent plus lourd. Les menaces deviennent crédibles sans crier ni gesticuler. La dissuasion fonctionne mieux, surtout dans les situations où il faut couper court. Un talent efficace pour faire reculer, pas pour construire une paix durable.",
        competence: "Compétence : Intimidation +2 (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Lecture de Comportement (mineure)",
        effet: "Les attitudes et micro-gestes se comprennent mieux : nervosité, mensonge probable, agressivité contenue, intention de fuite. Les réactions à venir se devinent plus souvent, ce qui aide à anticiper. Les changements soudains de posture ou de ton deviennent des signaux utiles. Un talent d'observation humaine, précis sans être infaillible.",
        competence: "Compétence : Analyse comportementale +2 (Sagesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'Endurance",
        effet: "L'effort long se gère avec plus de régularité : rythme, souffle et récupération s'équilibrent mieux. Les marches prolongées et tâches répétitives fatiguent moins vite et provoquent moins d'erreurs. La constance augmente, même dans des conditions pénibles. Un talent de \"tenue\", plus que de performance explosive.",
        competence: "Trait spécifique : Endurance physique +1 (Résilience)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineure du Contrôle Respiratoire",
        effet: "Une respiration stable aide à rester lucide sous stress, froid, douleur ou manque d'air. Les gestes deviennent plus constants, car le corps se panique moins vite. La récupération après un pic d'adrénaline s'améliore également. Un talent discret, mais très utile dans les moments critiques.",
        competence: "Trait spécifique : Souffle maîtrisé +1 (Sang-froid)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de la Gestion de la Douleur",
        effet: "La douleur perturbe moins les décisions : l'esprit reste plus clair malgré l'inconfort. Les réflexes impulsifs diminuent, ce qui limite les erreurs qui aggravent une blessure. La capacité à agir \"proprement\" malgré la gêne s'améliore. Ce talent n'annule pas la souffrance, il empêche qu'elle prenne le contrôle.",
        competence: "Trait spécifique : Tolérance à la douleur +1 (Résilience)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'Orientation",
        effet: "Les repères naturels ou urbains s'assemblent plus facilement : relief, vent, habitudes de circulation, points fixes. Les détours inutiles diminuent et les incohérences de trajet se remarquent plus vite. Même sans carte fiable, le chemin reste plus logique. Un talent d'autonomie, très fort en voyage.",
        competence: "Compétence : Sens de l'orientation +2 (Perception)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de l'Étiquette",
        effet: "Les codes sociaux basiques deviennent plus naturels : titres, salutations, distances, priorités de parole. Les faux pas se font plus rares, même dans un milieu inconnu. La hiérarchie d'un lieu se lit plus vite et les gestes \"à éviter\" ressortent mieux. Un talent qui empêche de se fermer des portes par maladresse.",
        competence: "Compétence : Étiquette +2 (Charisme)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineure de la Lecture de Foule",
        effet: "L'humeur d'un groupe se ressent mieux : agitation, peur, colère, excitation ou violence possible. Les bons placements deviennent plus évidents pour éviter d'être pris au centre d'un mouvement. Les meneurs, suiveurs et regards hostiles ressortent plus facilement. Un talent qui réduit les situations qui dégénèrent \"sans prévenir\".",
        competence: "Compétence : Gestion de foule +2 (Sagesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise mineure du Contrôle d'expression",
        effet: "Les émotions se trahissent moins sur le visage : surprise, dégoût, peur ou joie restent plus contrôlées. En discussion tendue, il devient plus difficile pour les autres de \"lire\" une réaction. Cela protège les secrets et évite de donner des informations gratuites. Un talent de neutralité, pas un talent de mensonge.",
        competence: "Trait spécifique : Contrôle d'expression +1 (Sang-froid)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Conduite de monture (Mineur)",
        effet: "La conduite gagne en finesse : gestes clairs, posture stable et meilleure gestion des changements de rythme. Les terrains irréguliers et les virages se négocient avec moins de risques de chute. Le stress de l'animal est mieux interprété, limitant les emballements. Idéal pour voyager vite sans épuiser ni paniquer la monture.",
        competence: "Compétence : Conduite de monture +1 (Métier)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Conduite de véhicule (Mineur)",
        effet: "Les manœuvres deviennent plus sûres sur des véhicules simples : chariots, charrettes, traîneaux ou embarcations basiques. Les obstacles et l'état du terrain sont mieux anticipés, ce qui réduit les accidents bêtes. La conduite paraît plus \"propre\", avec moins d'à-coups et de pertes de contrôle. Un talent utile dès qu'un trajet devient dangereux ou pressé.",
        competence: "Compétence : Conduite de véhicule +2 (Métier) ; Trait spécifique : Maniement de véhicule +1 (Métier)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Prestation comique (Mineur)",
        effet: "Le comique devient plus maîtrisé : timing, relances et sens du public s'améliorent. Une tension peut être cassée proprement, sans provoquer une humiliation inutile. La distraction fonctionne mieux car l'intervention paraît naturelle et spontanée. Un talent social efficace, surtout dans les foules et les situations tendues.",
        competence: "Compétence : Prestation comique +2 (Charisme) ; Trait spécifique : Sens du gag +1 (Social)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Analyste Psychologique (Mineur)",
        effet: "Les réactions émotionnelles se lisent mieux que les mots : défenses, contradictions, besoins cachés. Les motivations probables et points de pression ressortent davantage à l'observation. Cela aide à choisir une approche (rassurer, confronter, temporiser) sans accuser frontalement. Un talent d'analyse humaine, utile en enquête comme en négociation.",
        competence: "Compétence : Analyse psychologique +2 (Sagesse) ; Trait spécifique : Lecture mentale +1 (Savoir)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Action Cirquique (Mineur)",
        effet: "Les performances de cirque de base deviennent plus propres et plus sûres : jonglage, équilibre scénique, pirouettes, figures simples. La coordination et la présence s'améliorent, même sous regard ou en environnement instable. Cela permet de divertir, de distraire, ou d'exécuter des gestes précis en mouvement. Un talent à la frontière entre technique et spectacle.",
        competence: "Compétence : Arts du cirque +2 (Dextérité) ; Trait spécifique : Adresse scénique +1 (Finesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Entraînement mineur à la résistance au poison (Mineur)",
        effet: "Le corps encaisse mieux les toxines légères, limitant les pertes de contrôle liées aux vertiges ou nausées. Les symptômes se stabilisent plus vite, donnant une marge d'action supplémentaire. Les signes d'empoisonnement deviennent aussi plus faciles à reconnaître tôt. Une résistance utile, sans jamais remplacer un antidote.",
        competence: "Trait spécifique : Résistance aux toxines +1 (Résilience)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Entraînement mineur à la résistance à la peur (Mineur)",
        effet: "La peur perturbe moins l'action : panique et figement deviennent plus rares. Même sous menace, une décision reste possible et le souffle se reprend plus vite. Cela aide à tenir un rôle, protéger un allié ou reculer proprement. Un talent de tenue mentale, pas d'inconscience.",
        competence: "Trait spécifique : Résistance a la peur +1 (Sang-froid)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Récolteur d'informations (Mineur)",
        effet: "Les bons contacts et les bons lieux ressortent plus vite : marchés, tavernes, employés, gardes, voisins. Les questions paraissent plus naturelles, ce qui évite d'alerter les gens. La capacité à trier la rumeur inutile de l'information exploitable s'améliore nettement. Avec le temps, un petit réseau se construit presque tout seul.",
        competence: "Compétence : Récolte d'informations +2 (Charisme) ; Trait spécifique : Réseau local +1 (Social)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Entraînement mineur à la résistance au besoin alimentaire (Mineur)",
        effet: "La faim et la soif deviennent plus supportables, surtout sur la durée, sans effondrer la lucidité. Le rationnement est mieux toléré et les baisses d'énergie se gèrent plus proprement. L'inconfort entraîne moins de décisions impulsives ou de mauvaise humeur dangereuse. Un talent très utile en siège, survie ou expédition longue.",
        competence: "Trait spécifique : Frugalité +1 (Résilience)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Ami(e) des bêtes (Mineur)",
        effet: "Les signaux des animaux se comprennent mieux : posture, tension, intention, peur ou curiosité. L'approche devient plus sûre, avec moins de gestes qui déclenchent une réaction agressive. La confiance minimale s'installe plus facilement, même sans dressage complet. Un talent pratique pour calmer, éviter le conflit, ou obtenir une coopération simple.",
        competence: "Compétence : Communication animale +2 (Charisme) ; Trait spécifique : Calme animalier +1 (Instinct)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise de l'équilibre (Mineur)",
        effet: "Les surfaces instables se gèrent avec plus de contrôle : poutres, rebords, sols glissants, passerelles, bateau. Les dérapages se rattrapent plus vite et les chutes bêtes se font plus rares. Même avec du poids ou en mouvement, le centre de gravité reste mieux placé. Un talent clé dès que le terrain devient traître.",
        competence: "Compétence : Équilibre +2 (Dextérité) ; Trait spécifique : Stabilité corporelle +1 (Finesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Souplesse (Mineur)",
        effet: "La mobilité articulaire s'améliore, facilitant flexions, contorsions simples, amortis et passages étroits. Les raideurs gênent moins, surtout après effort ou mouvement forcé. Cela réduit les blocages physiques et améliore la qualité des gestes amples. Un talent discret, mais très utile pour gagner en confort et en efficacité.",
        competence: "Trait spécifique : Souplesse articulaire +1 (Résilience)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Résistance au sommeil (mineur)",
        effet: "Le corps lutte mieux contre l'endormissement forcé, la somnolence et les effets d'épuisement qui \"plombent\" l'attention. L'esprit reste plus présent quand la fatigue monte, ce qui limite les trous de concentration et les micro-assoupissements dangereux. Les réveils sont aussi plus rapides et moins confus après un choc, un sort ou une nuit trop courte. Ce talent ne rend pas immunisé, mais réduit la facilité avec laquelle le sommeil prend le dessus.",
        competence: "Trait spécifique : Résistance au sommeil +1 (Résilience)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Entraînement de Vigile (mineur)",
        effet: "Les gardes longues deviennent plus efficaces : vigilance stable, écoute plus fine, regard qui \"balaye\" sans se figer. Les signes anormaux (bruits faibles, silhouettes, changements de rythme) sont repérés plus tôt, surtout quand l'ambiance endort ou rassure trop. La gestion de la fatigue en veille est meilleure, avec moins de relâchement au mauvais moment. Idéal pour protéger un camp, surveiller un couloir ou tenir une porte sous tension.",
        competence: "Compétence : Vigile +2 (Perception) ; Trait spécifique : Alerte de veille +1 (Instinct)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Analyste de champ de bataille (mineur)",
        effet: "Le terrain se lit comme un puzzle : lignes de tir, couverts, goulots, hauteurs et zones mortes apparaissent plus vite. Les risques immédiats (embuscade, encerclement, angle dangereux) deviennent plus évidents dès les premières secondes. Cette analyse aide à choisir une position utile, à déplacer le groupe intelligemment et à éviter les erreurs de placement. Très fort en escarmouche, siège ou exploration de lieux hostiles.",
        competence: "Compétence : Analyse du champ de bataille +2 (Sagesse/Perception)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise des Ordres tactiques (mineur)",
        effet: "Les consignes deviennent plus courtes, plus claires et mieux adaptées au stress : qui fait quoi, quand, et pourquoi. La capacité à donner un ordre exploitable augmente, même quand le bruit, la peur ou la confusion montent. Les changements de plan se communiquent plus proprement, ce qui limite les hésitations et les malentendus. Ce talent transforme une intention en action coordonnée, sans devoir \"crier plus fort\".",
        competence: "Compétence : Ordres tactiques +2 (Charisme/Sagesse) ; Trait spécifique : Commandement +1 (Social)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Maîtrise du Maquillage (mineur)",
        effet: "Tu sais maquiller proprement pour mettre en valeur, vieillir, blesser, fatiguer, ou changer subtilement un visage (traits, cernes, teint). Tu comprends la lumière, les couleurs et les détails qui \"trompent\" à distance comme de près. Tu peux aussi masquer des marques (cicatrice, hématome léger) ou rendre un déguisement beaucoup plus crédible sans costume extravagant. Très utile en infiltration sociale, théâtre, ou discrétion urbaine.",
        competence: "Compétence : Maquillage +2 (Dextérité/Charisme) ; Trait spécifique : Finition visuelle +1 (Finesse)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Muscles entraînés (mineur)",
        effet: "Ton corps devient plus \"tenu\" : meilleure tonicité, gainage, contrôle des efforts et stabilité sous charge. Tu fatigues moins vite sur les actions répétées (porter, pousser, tenir une prise, frapper lourd) et tu récupères mieux après un effort explosif. Ce talent ne te rend pas surhumain, mais rend ta force plus exploitable et moins \"gaspillée\". Très utile pour tous les rôles physiques.",
        competence: "Trait spécifique : Puissance musculaire +1 (Résilience/Force)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Lecture rapide (mineur)",
        effet: "Tu lis plus vite sans perdre l'essentiel : repérage des idées clés, structure d'un texte, tri du bruit. Tu peux parcourir un document (rapport, registre, lettre, manuel) et en extraire les informations utiles en beaucoup moins de temps. Tu repères aussi plus facilement une incohérence, une mention cachée ou un détail qui \"dépasse\" (nom, date, chiffre). Un talent très fort en enquête, étude et préparation.",
        competence: "Compétence : Lecture & Synthèse +2 (Intelligence) ; Trait spécifique : Lecture efficace +1 (Savoir)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Entraînement à la résistance à la chaleur (mineur)",
        effet: "Le corps gère mieux les fortes températures : transpiration, hydratation, rythme et protection instinctive. Tu supportes plus longtemps la chaleur sans perdre trop vite ta lucidité, et les coups de chaud arrivent moins brutalement. Tu sais aussi adapter tes gestes (pauses, respiration, protection simple) pour rester fonctionnel en plein effort. Ça n'annule pas le danger, mais te donne une marge réelle en désert, forge ou incendie proche.",
        competence: "Trait spécifique : Résistance à la chaleur +1 (Résilience)",
        categorie: "Talent commun",
        cout: 1
    },
    {
        nom: "Entraînement à la résistance au froid (mineur)",
        effet: "Tu supportes mieux le froid : gestion des extrémités, respiration, micro-mouvements et conservation de chaleur. Tu restes plus stable mentalement quand le corps se raidit, et tu perds moins vite en précision fine (mains, appuis). Tu sais aussi limiter les erreurs classiques (humidité, vent, immobilité) qui rendent le froid dangereux. Ce talent n'empêche pas l'hypothermie, mais retarde fortement sa montée.",
        competence: "Trait spécifique : Résistance au froid +1 (Résilience)",
        categorie: "Talent commun",
        cout: 1
    }
);

// ═════════════════════════════════════════════════════════════════════════
// CATÉGORIE 5 : TALENT SPÉCIAUX (2 talents à 2 pts)
// ═════════════════════════════════════════════════════════════════════════

allTalents.push(
    {
        nom: "Pas léger",
        effet: "La démarche devient presque imperceptible : transfert de poids maîtrisé, respiration calée, appuis courts et propres. Les micro-pauses et la gestion des surfaces réduisent bruit, traces et hésitations. Très utile pour approcher, contourner, observer ou se retirer sans \"signer\" sa présence.",
        competence: "Trait spécifique : Pas silencieux +1 (Finesse) | Amélioration (2 pts) : Passage à \"Pas silencieux\" → augmente le trait Pas silencieux à +2 (au lieu de +1).",
        categorie: "Talent spéciaux",
        cout: 2
    },
    {
        nom: "Poing/Pied de fer",
        effet: "Conditionnement progressif des os, tendons et muscles pour frapper plus fort sans s'abîmer : alignement, garde serrée, souffle compact, impact propre. Les coups deviennent plus denses et pénètrent mieux les défenses à mains/pieds nus. Ce talent favorise les styles de corps-à-corps \"brut\" et discipliné.",
        competence: "À l'acquisition, choisir Poing ou Pied : +1 au calcul de base des dégâts de corps à corps physiques pour ce membre. | Améliorations (2 pts chacune) : chaque palier ajoute +1 au même bonus. Progression indicative : Fer → Acier → Ébonite (donc +1, puis +2, puis +3… selon le nombre de paliers achetés).",
        categorie: "Talent spéciaux",
        cout: 2
    }
);

// ═══════════════════════════════════════════════════════════════════════════
// VARIABLES GLOBALES
// ═══════════════════════════════════════════════════════════════════════════

let talents = [...allTalents];
let currentSort = { column: null, direction: null };
let searchTerm = '';
let selectedCategories = new Set([
    "Talent de métier",
    "Talent de combat",
    "Talent lié à la magie",
    "Talent commun",
    "Talent spéciaux"
]);

// Système de sélection
let selectionMode = false;
let selectedTalents = new Map(); // Stocke les talents sélectionnés avec leurs infos complètes

// ═══════════════════════════════════════════════════════════════════════════
// INITIALISATION
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    updateCounts();
    attachEventListeners();
});

// ═══════════════════════════════════════════════════════════════════════════
// RENDU DU TABLEAU PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

function renderTable() {
    const tbody = document.getElementById('talentsBody');
    const noResults = document.getElementById('noResults');
    tbody.innerHTML = '';
    
    let visibleCount = 0;
    
    talents.forEach((talent) => {
        // ✅ CORRECTION : Trouver l'index ORIGINAL dans allTalents
        const originalIndex = allTalents.findIndex(t => 
            t.nom === talent.nom && 
            t.categorie === talent.categorie && 
            t.cout === talent.cout
        );
        
        // Filtrage par catégorie
        if (!selectedCategories.has(talent.categorie)) {
            return;
        }
        
        // Filtrage par recherche
        const matchesSearch = searchTerm === '' || 
            talent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.effet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (talent.competence && talent.competence.toLowerCase().includes(searchTerm.toLowerCase())) ||
            talent.categorie.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (!matchesSearch) {
            return;
        }
        
        visibleCount++;
        
        const row = document.createElement('tr');
        row.dataset.talentIndex = originalIndex; // ✅ Utilise l'index original
        
        // Mode sélection actif
        if (selectionMode) {
            row.classList.add('selectable');
            if (selectedTalents.has(originalIndex)) { // ✅ Vérifie avec l'index original
                row.classList.add('selected');
            }
            row.addEventListener('click', () => toggleSelection(originalIndex)); // ✅ Passe l'index original
        }
        
        // Colonne Nom
        const nomCell = document.createElement('td');
        nomCell.className = 'col-nom';
        nomCell.setAttribute('data-label', 'Nom');
        const nomSpan = document.createElement('span');
        nomSpan.className = 'talent-nom';
        nomSpan.innerHTML = highlightText(talent.nom, searchTerm);
        nomCell.appendChild(nomSpan);
        
        // Colonne Description
        const effetCell = document.createElement('td');
        effetCell.className = 'col-effet';
        effetCell.setAttribute('data-label', 'Description');
        const effetSpan = document.createElement('span');
        effetSpan.className = 'talent-effet';
        effetSpan.innerHTML = highlightText(talent.effet, searchTerm);
        
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
    
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
    
    updateCounts();
}

// ═══════════════════════════════════════════════════════════════════════════
// SYSTÈME DE SÉLECTION
// ═══════════════════════════════════════════════════════════════════════════

function toggleSelection(talentIndex) {
    if (!selectionMode) return;
    
    const talent = allTalents[talentIndex];
    
    if (selectedTalents.has(talentIndex)) {
        selectedTalents.delete(talentIndex);
    } else {
        selectedTalents.set(talentIndex, talent);
    }
    
    renderTable();
    updateRecapTable();
}

function updateRecapTable() {
    const recapBody = document.getElementById('recapBody');
    const emptyRecap = document.getElementById('emptyRecap');
    const totalPointsEl = document.getElementById('totalPoints');
    
    recapBody.innerHTML = '';
    
    if (selectedTalents.size === 0) {
        emptyRecap.style.display = 'block';
        totalPointsEl.textContent = '0';
        return;
    }
    
    emptyRecap.style.display = 'none';
    
    let totalPoints = 0;
    
    selectedTalents.forEach((talent, index) => {
        totalPoints += talent.cout;
        
        const row = document.createElement('tr');
        
        // Nom
        const nomCell = document.createElement('td');
        nomCell.setAttribute('data-label', 'Nom');
        nomCell.textContent = talent.nom;
        
        // Description (texte court)
        const descCell = document.createElement('td');
        descCell.setAttribute('data-label', 'Description');
        const shortDesc = talent.effet.substring(0, 100) + (talent.effet.length > 100 ? '...' : '');
        descCell.textContent = shortDesc;
        
        // Coût
        const coutCell = document.createElement('td');
        coutCell.className = 'recap-cout center';
        coutCell.setAttribute('data-label', 'Coût');
        coutCell.textContent = talent.cout + ' pt' + (talent.cout > 1 ? 's' : '');
        
        // Bouton suppression
        const actionsCell = document.createElement('td');
        actionsCell.className = 'center';
        actionsCell.setAttribute('data-label', 'Actions');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.title = 'Supprimer ce talent';
        deleteBtn.addEventListener('click', () => {
            selectedTalents.delete(index);
            renderTable();
            updateRecapTable();
        });
        actionsCell.appendChild(deleteBtn);
        
        row.appendChild(nomCell);
        row.appendChild(descCell);
        row.appendChild(coutCell);
        row.appendChild(actionsCell);
        
        recapBody.appendChild(row);
    });
    
    totalPointsEl.textContent = totalPoints;
}

function toggleSelectionMode(enabled) {
    selectionMode = enabled;
    const recapSection = document.getElementById('recapSection');
    
    if (enabled) {
        recapSection.style.display = 'block';
        updateRecapTable();
    } else {
        recapSection.style.display = 'none';
    }
    
    renderTable();
}

function resetSelection() {
    selectedTalents.clear();
    renderTable();
    updateRecapTable();
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════════════════════════════════════

function getCategorieClass(categorie) {
    if (categorie === "Talent de métier") return "cat-metier";
    if (categorie === "Talent de combat") return "cat-combat";
    if (categorie === "Talent lié à la magie") return "cat-magie";
    if (categorie === "Talent commun") return "cat-commun";
    if (categorie === "Talent spéciaux") return "cat-speciaux";
    return "";
}

function highlightText(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateCounts() {
    const tbody = document.getElementById('talentsBody');
    const visibleRows = tbody.querySelectorAll('tr').length;
    
    document.getElementById('talentCount').textContent = visibleRows;
    document.getElementById('totalCount').textContent = allTalents.length;
}

// ═══════════════════════════════════════════════════════════════════════════
// TRI
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// RECHERCHE
// ═══════════════════════════════════════════════════════════════════════════

function handleSearch() {
    searchTerm = document.getElementById('searchInput').value.trim();
    renderTable();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    searchTerm = '';
    renderTable();
}

// ═══════════════════════════════════════════════════════════════════════════
// FILTRES PAR CATÉGORIE
// ═══════════════════════════════════════════════════════════════════════════

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

function selectAllCategories() {
    const checkboxes = document.querySelectorAll('.category-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    handleCategoryChange();
}

function deselectAllCategories() {
    const checkboxes = document.querySelectorAll('.category-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    handleCategoryChange();
}

// ═══════════════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════════════════

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
    
    // Filtres catégories
    document.querySelectorAll('.category-checkbox input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryChange);
    });
    
    document.getElementById('selectAll').addEventListener('click', selectAllCategories);
    document.getElementById('deselectAll').addEventListener('click', deselectAllCategories);
    
    // Mode sélection
    const selectionToggle = document.getElementById('selectionModeToggle');
    selectionToggle.addEventListener('change', (e) => {
        toggleSelectionMode(e.target.checked);
    });
    
    // Reset
    document.getElementById('resetSelection').addEventListener('click', resetSelection);
}