// TALENTS D'ENTRAÎNEMENT - Sélection représentative
const allTalents = [
    // ===== SAVOIR ET LANGUE - CONNAISSANCES GÉNÉRALES =====
    {
        nom: "Curieux méthodique",
        effet: "+1 dé lors des entraînements visant l'obtention d'une connaissance de rang 1–2.",
        categorie: "Connaissances générales",
        cout: 1
    },
    {
        nom: "Cahier de synthèse",
        effet: "Si tu utilises des notes personnelles pendant la session, +10 % PA (min. +3) une fois par session.",
        categorie: "Connaissances générales",
        cout: 2
    },
    {
        nom: "Étude transversale",
        effet: "Si tu enchaînes dans la même journée deux entraînements sur des connaissances liées, le second gagne +5 PA et ignore -1 de malus (surmenage/partiel).",
        categorie: "Connaissances générales",
        cout: 2
    },
    {
        nom: "Bibliothécaire amateur",
        effet: "En bibliothèque/archives : +1 dé et ignore le premier -1 de surmenage (1×/jour).",
        categorie: "Connaissances générales",
        cout: 3
    },
    {
        nom: "Révision active",
        effet: "Si le total de PA < 10, relance 1 dé d'entraînement (1×/session).",
        categorie: "Connaissances générales",
        cout: 2
    },
    {
        nom: "Routine d'étude",
        effet: "Lors du troisième entraînement de la journée (soir), s'il concerne une connaissance : +1 dé.",
        categorie: "Connaissances générales",
        cout: 1
    },
    {
        nom: "Fiches mnémotechniques",
        effet: "Si au moins un double apparaît sur les dés de PA, +5 PA supplémentaires.",
        categorie: "Connaissances générales",
        cout: 2
    },
    {
        nom: "Curiosité du monde",
        effet: "Première fois que tu apprends une connaissance liée à une région visitée (RP) : +20 % PA sur cette session.",
        categorie: "Connaissances générales",
        cout: 2
    },
    {
        nom: "Plan d'étude",
        effet: "Déclare à l'avance une fourchette-cible (ex. 18–24 PA). Si ton total tombe dedans, +6 PA (1×/jour).",
        categorie: "Connaissances générales",
        cout: 3
    },
    {
        nom: "Journal de terrain",
        effet: "Première session de connaissance effectuée < 24 h après une exploration RP : +6 PA.",
        categorie: "Connaissances générales",
        cout: 2
    },

    // ===== LECTURE & GRIMOIRES =====
    {
        nom: "Lecteur rapide",
        effet: "En utilisant un support écrit (manuel, carte, grimoire), +1 dé.",
        categorie: "Lecture & Grimoires",
        cout: 1
    },
    {
        nom: "Marginalia utile",
        effet: "Tu peux banquer jusqu'à +6 PA issus de notes de lecture pour les dépenser plus tard le même jour sur une autre session de lecture/savoir.",
        categorie: "Lecture & Grimoires",
        cout: 2
    },
    {
        nom: "Veille studieuse",
        effet: "Une session nocturne de lecture compte comme complète sans malus de session partielle (1×/jour).",
        categorie: "Lecture & Grimoires",
        cout: 2
    },
    {
        nom: "Reliure érudite",
        effet: "Si le grimoire/manuel est ancien ou ésotérique, ignore -10 de malus (surmenage/rang élevé) 1×/jour.",
        categorie: "Lecture & Grimoires",
        cout: 3
    },
    {
        nom: "Œil du correcteur",
        effet: "Si le total final de PA est pair, ajoute +4 PA.",
        categorie: "Lecture & Grimoires",
        cout: 1
    },
    {
        nom: "Résonance des lignes",
        effet: "Si au moins un dé ≥ 7, gagne +5 PA supplémentaires (1×/session).",
        categorie: "Lecture & Grimoires",
        cout: 3
    },

    // ===== SPÉCIALISATION COGNITIVE =====
    {
        nom: "Hyperfocus",
        effet: "Tu retires 1 dé avant de lancer ; si tu avais au départ ≥ 3 dés, gagne +30 % PA sur le total final.",
        categorie: "Spécialisation cognitive",
        cout: 3
    },
    {
        nom: "Pause « pomodoro »",
        effet: "En déclarant une courte pause RP, réduis de 1 le malus (surmenage/partiel) sur cette session.",
        categorie: "Spécialisation cognitive",
        cout: 1
    },
    {
        nom: "Anti-échec cognitif",
        effet: "Sur un échec critique (1–5 au d100), traite-le comme 6–20 (donc 1 dé) 1×/jour.",
        categorie: "Spécialisation cognitive",
        cout: 3
    },
    {
        nom: "Résolution logique",
        effet: "Si la session atteint ≥ 20 PA, gagne un jeton logique : dépense-le plus tard le même jour pour +5 PA sur une autre session de connaissance.",
        categorie: "Spécialisation cognitive",
        cout: 1
    },
    {
        nom: "Rappel étendu",
        effet: "Une fois par jour, tu peux remplacer ton total de PA par le meilleur total obtenu la veille sur une session de connaissance (si le nb de dés ≤ au jet de référence).",
        categorie: "Spécialisation cognitive",
        cout: 3
    },

    // ===== LANGUES & DIALECTES =====
    {
        nom: "Oreille des dialectes",
        effet: "+1 dé lors des entraînements de langue/dialecte.",
        categorie: "Langues & Dialectes",
        cout: 1
    },
    {
        nom: "Bain linguistique",
        effet: "Avec un locuteur natif : +20 % PA et ignore -1 (1×/jour).",
        categorie: "Langues & Dialectes",
        cout: 3
    },
    {
        nom: "Mimétisme phonétique",
        effet: "1×/session, convertis un dé ≤ 3 → 5.",
        categorie: "Langues & Dialectes",
        cout: 2
    },
    {
        nom: "Parentés lexicales",
        effet: "Langue apparentée à une connue : +1 dé.",
        categorie: "Langues & Dialectes",
        cout: 2
    },
    {
        nom: "Polyglotte naissant",
        effet: "1re session de langue du jour : +2 PA ; suivantes : -2 PA (min 0).",
        categorie: "Langues & Dialectes",
        cout: 1
    },
    {
        nom: "Vocabulaire thématique",
        effet: "Si un thème est annoncé (marché, voyage…) : +20 % PA (1×/jour).",
        categorie: "Langues & Dialectes",
        cout: 2
    },

    // ===== BOOST PAR CARACTÉRISTIQUE =====
    {
        nom: "Forçat Acharné",
        effet: "Bonus de +2 dés supplémentaires lors de tout entraînement basé sur la Force.",
        categorie: "Boost par Caractéristique",
        cout: 1
    },
    {
        nom: "Poigne du Titan",
        effet: "Si au moins un des dés d'entraînement obtient un résultat ≥ 7, ajoute un bonus fixe de +6 PA (une fois par session).",
        categorie: "Boost par Caractéristique",
        cout: 2
    },
    {
        nom: "Entraînement Endurant",
        effet: "Réduit de -1 le malus de surmenage lors des entraînements liés à la Constitution.",
        categorie: "Boost par Caractéristique",
        cout: 1
    },
    {
        nom: "Peau de Fer",
        effet: "Si le joueur obtient au moins un double lors de ses jets de PA, il gagne un bonus de +10 % PA.",
        categorie: "Boost par Caractéristique",
        cout: 2
    },
    {
        nom: "Souplesse Naturelle",
        effet: "Bonus de +1 dé supplémentaire lors des entraînements de Dextérité.",
        categorie: "Boost par Caractéristique",
        cout: 1
    },
    {
        nom: "Danse du Fil",
        effet: "Si tous les dés lancés sont impairs, ajoute un bonus de +8 PA. Effet utilisable 1 fois par session.",
        categorie: "Boost par Caractéristique",
        cout: 2
    },
    {
        nom: "Esprit Concentré",
        effet: "+2 PA lors de chaque entraînement basé sur l'Intelligence.",
        categorie: "Boost par Caractéristique",
        cout: 1
    },
    {
        nom: "Lecture Transversale",
        effet: "Lors d'un entraînement utilisant un support écrit (grimoire, carte, manuel), le joueur lance +1 dé supplémentaire et peut ignorer un malus de surmenage une fois par session.",
        categorie: "Boost par Caractéristique",
        cout: 2
    },
    {
        nom: "Vision Intérieure",
        effet: "Ajoute +1 dé d'entraînement lors de tout jet basé sur la Sagesse.",
        categorie: "Boost par Caractéristique",
        cout: 1
    },
    {
        nom: "Savoir Silencieux",
        effet: "Si le joueur s'entraîne sans aucun support ni partenaire, les PA obtenus augmentent de +10 % (arrondi au supérieur). Fonctionne uniquement pour entraîner la SAG.",
        categorie: "Boost par Caractéristique",
        cout: 2
    },
    {
        nom: "Regard Affûté",
        effet: "Bonus de +2 PA sur tout entraînement lié à la Perception.",
        categorie: "Boost par Caractéristique",
        cout: 1
    },
    {
        nom: "Force de Présence",
        effet: "Ajoute +2 PA sur tous les jets d'entraînement liés au Charisme.",
        categorie: "Boost par Caractéristique",
        cout: 1
    },
    {
        nom: "Déferlement Brutal",
        effet: "Lors d'un entraînement basé sur la Force avec surmenage, tu peux doubler les résultats des deux dés les plus élevés avant malus. Ne fonctionne qu'une fois par session.",
        categorie: "Boost par Caractéristique",
        cout: 3
    },
    {
        nom: "Mémoire Architectonique",
        effet: "Lors d'un entraînement basé sur l'Intelligence, le joueur peut mémoriser son meilleur jet précédent et l'appliquer directement à la place d'un nouveau jet (sans lancer de dés). Nécessite un entraînement précédent dans la même session ou la veille.",
        categorie: "Boost par Caractéristique",
        cout: 3
    },

    // ===== ENTRAÎNEMENT MARTIAL =====
    {
        nom: "Cadence Martiale",
        effet: "Le joueur gagne +1 dé supplémentaire pour tout entraînement d'amélioration de compétence martiale ou de maniement d'arme, quelle que soit l'arme.",
        categorie: "Entraînement Martial",
        cout: 2
    },
    {
        nom: "Trace de Sang, Trace d'Honneur",
        effet: "Si un joueur est blessé avant son entraînement, il obtient +2 dés supplémentaires et +10 PA s'il s'agit d'une arme maîtrisée.",
        categorie: "Entraînement Martial",
        cout: 3
    },
    {
        nom: "Maître des Armes Lourdes",
        effet: "Lors de l'entraînement avec armes lourdes (grandes épées, marteaux, haches…), lance +1 dé supplémentaire et peut relancer un dé si surmené.",
        categorie: "Entraînement Martial",
        cout: 2
    },
    {
        nom: "Précision du Bretteur",
        effet: "Lors d'un entraînement avec des épées courtes, dagues ou rapières, chaque dé qui donne un nombre impair ajoute +1 PA bonus.",
        categorie: "Entraînement Martial",
        cout: 2
    },
    {
        nom: "Corps-à-corps Traditionnel",
        effet: "Le joueur obtient +1 dé bonus lorsqu'il entraîne un style sans arme ou technique de combat martial (mains nues uniquement).",
        categorie: "Entraînement Martial",
        cout: 2
    },

    // ===== RÉSISTANCE & SURMENAGE =====
    {
        nom: "Souffle Court",
        effet: "Lors d'un échec critique d'entraînement (1–5 au d100), le joueur peut relancer le d100 une seule fois par jour, mais subit automatiquement un malus de -3 sur tous les dés.",
        categorie: "Résistance & Surmenage",
        cout: 1
    },
    {
        nom: "Maîtrise de la Fatigue",
        effet: "Le joueur peut ignorer le malus de -10 aux repos provoqué par le surmenage une fois par semaine (réinitialisation par un vrai repos narratif).",
        categorie: "Résistance & Surmenage",
        cout: 2
    },
    {
        nom: "Forge du Corps et de l'Esprit",
        effet: "Réduction de -1 sur tous les malus de surmenage, quelle que soit la caractéristique. Si un entraînement est prolongé, ajoute automatiquement +1 dé supplémentaire.",
        categorie: "Résistance & Surmenage",
        cout: 3
    },
    {
        nom: "Barrière de Persévérance",
        effet: "Le joueur peut choisir, une fois par session, d'ignorer tous les malus de surmenage pour une session complète. En contrepartie, il ne pourra pas s'entraîner au tour suivant sans repos.",
        categorie: "Résistance & Surmenage",
        cout: 3
    },
    {
        nom: "Adaptation Infernale",
        effet: "Plus le malus est grand, plus le joueur gagne de dés : Malus -2 → +1 dé ; Malus -3 → +2 dés ; Malus -4 → +3 dés. Mais tous les résultats \"1\" deviennent 0 PA.",
        categorie: "Résistance & Surmenage",
        cout: 3
    },

    // ===== MAGIE - APPRENTISSAGE DE SORTS =====
    {
        nom: "Études de cantrip",
        effet: "+1 dé pour l'apprentissage de sorts rang 1–2.",
        categorie: "Apprentissage de sorts",
        cout: 1
    },
    {
        nom: "Structure d'incantation",
        effet: "Si tu annonces 3 étapes (verbal/somatique/focal) avant de lancer : relance 1 dé ≤ 2 (1×/session).",
        categorie: "Apprentissage de sorts",
        cout: 2
    },
    {
        nom: "Grimoire de brouillon",
        effet: "En utilisant ton grimoire : convertis 1 dé 1–2 → 3 (1×/session).",
        categorie: "Apprentissage de sorts",
        cout: 2
    },
    {
        nom: "Focus stable",
        effet: "Avec un focus attuné : ignore -1 (surmenage/partiel) 1×/jour.",
        categorie: "Apprentissage de sorts",
        cout: 3
    },
    {
        nom: "Lien de concept",
        effet: "Sort de même école qu'un sort déjà maîtrisé : +1 dé (1×/session).",
        categorie: "Apprentissage de sorts",
        cout: 2
    },

    // ===== CANALISATION & MÉTHODE MAGIQUE =====
    {
        nom: "Respiration rythmique",
        effet: "Déclare ton rythme (4-4) : convertis 1 dé 1 → 2 (1×/session).",
        categorie: "Canalisation & Méthode magique",
        cout: 1
    },
    {
        nom: "Verbe clair",
        effet: "Incantation à voix posée : chaque 6 donne +1 PA (max +3).",
        categorie: "Canalisation & Méthode magique",
        cout: 2
    },
    {
        nom: "Ancrage d'éther",
        effet: "En session prolongée (dés augmentés) : +3 PA si aucun dé < 3 après malus.",
        categorie: "Canalisation & Méthode magique",
        cout: 2
    },
    {
        nom: "Métronome arcanique",
        effet: "Si tous les dés sont différents (≥3 dés) : +6 PA (1×/jour).",
        categorie: "Canalisation & Méthode magique",
        cout: 3
    },

    // ===== ÉDUCATION MAGIQUE =====
    {
        nom: "Mentor académique",
        effet: "Avec un mentor reconnu : relance 1 dé (1×/session).",
        categorie: "Éducation magique",
        cout: 2
    },
    {
        nom: "Atelier de laboratoire",
        effet: "En laboratoire équipé : +1 dé ; si un dé = 1 après malus, -2 PA.",
        categorie: "Éducation magique",
        cout: 2
    },
    {
        nom: "Composants consommables",
        effet: "En sacrifiant des composants (RP) : +1 dé (1×/jour).",
        categorie: "Éducation magique",
        cout: 3
    },
    {
        nom: "Examen blanc",
        effet: "Fixe une fourchette-cible (ex. 18–22). Si le total y tombe : +6 PA (1×/jour).",
        categorie: "Éducation magique",
        cout: 3
    }
];

// Variables globales
let talents = [...allTalents];
let currentSort = { column: null, direction: null };
let searchTerm = '';

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
        const matchesSearch = searchTerm === '' || 
            talent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.effet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.categorie.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (!matchesSearch) {
            return;
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

// Classe CSS selon la catégorie
function getCategorieClass(categorie) {
    if (categorie.includes("Connaissances")) return "cat-savoir";
    if (categorie.includes("Lecture")) return "cat-lecture";
    if (categorie.includes("Spécialisation")) return "cat-cognitive";
    if (categorie.includes("Langues")) return "cat-langues";
    if (categorie.includes("Caractéristique")) return "cat-physique";
    if (categorie.includes("Martial")) return "cat-martial";
    if (categorie.includes("Surmenage")) return "cat-resistance";
    if (categorie.includes("sorts")) return "cat-magie-sorts";
    if (categorie.includes("Canalisation")) return "cat-magie-canal";
    if (categorie.includes("Éducation magique")) return "cat-magie-edu";
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
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
    
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            sortTable(column);
        });
    });
}