// Tous les talents non évolutifs
const allTalents = [
    {
        nom: "Vif",
        effet: "Offre un +6 en Réactivité",
        cout: 1,
        id: "vif"
    },
    {
        nom: "Sens extraordinaire",
        effet: "+5 aux jets de PER liés à un sens choisi (et compétence associée N.A +5). (Pouvant être ré-appris pour d'autre sens)",
        cout: 1,
        id: "sens-extraordinaire"
    },
    {
        nom: "Petit dormeur",
        effet: "Une fois par jour, peut relancer un jet de repos avec un malus de -10.",
        cout: 2,
        id: "petit-dormeur"
    },
    {
        nom: "Gros dormeur",
        effet: "+10 aux jets de repos long, mais -15 en Initiative si pris en embuscade en dormant.",
        cout: 2,
        id: "gros-dormeur"
    },
    {
        nom: "Corps entraîné",
        effet: "Vous avez une endurance exceptionnelle face aux épreuves physiques et mentales, offrant un bonus de +1 en Résilience",
        cout: 2,
        id: "corps-entraine"
    },
    {
        nom: "Main de maître",
        effet: "Votre précision et votre contrôle sont impressionnants, ce qui vous confère un bonus de +1 en Finesse.",
        cout: 2,
        id: "main-maitre"
    },
    {
        nom: "Puissance entraînée",
        effet: "Votre force brute dépasse celle de la plupart, ajoutant un bonus de +1 en Puissance.",
        cout: 2,
        id: "puissance-entrainee"
    },
    {
        nom: "Nerfs d'acier",
        effet: "Vous êtes un maître de la maîtrise de soi, offrant un bonus de +1 en Sang-froid",
        cout: 2,
        id: "nerfs-acier"
    },
    {
        nom: "Mental endurci",
        effet: "Offre un bonus de +6 en Résistance mentale",
        cout: 1,
        id: "mental-endurci"
    },
    {
        nom: "Maîtrise des attaque sournois",
        effet: "Permet d'effectuer des attaques sournoises, infligeant les dégâts associés à la sournoiserie.",
        cout: 3,
        id: "maitrise-attaque-sournois"
    },
    {
        nom: "Petit Buveur",
        effet: "Permet de tenir plus longtemps sans boire (double le temps avant d'avoir obligatoirement besoin de boire)",
        cout: 2,
        id: "petit-buveur"
    },
    {
        nom: "Coureur émérite",
        effet: "Offre un bonus de +5 en Mouvement",
        cout: 1,
        id: "coureur-emerite"
    },
    {
        nom: "Bonne vitalité",
        effet: "+1 sur le résultat des dés de gain de PV lors des montés de Niveau",
        cout: 2,
        id: "bonne-vitalite"
    },
    {
        nom: "Endurant",
        effet: "+1 sur le résultat des dés de gain de PE lors des montés de Niveau",
        cout: 2,
        id: "endurant"
    },
    {
        nom: "Jeune potentielle magique",
        effet: "+1 sur le résultat des dés de gain de PM lors des montés de Niveau",
        cout: 2,
        id: "jeune-potentielle"
    },
    {
        nom: "Petit Rat de bibliothèque",
        effet: "Vous avez une aptitude naturelle pour comprendre et utiliser les connaissances, gagnant un bonus de +1 en Savoir",
        cout: 2,
        id: "rat-bibliotheque"
    },
    {
        nom: "Réflexe entraînée",
        effet: "Vos instincts aiguisés vous permettent de réagir rapidement et efficacement, obtenant un bonus de +1 en Instinct",
        cout: 2,
        id: "reflexe-entrainee"
    },
    {
        nom: "Charisme social",
        effet: "Vous excellez dans les interactions sociales, obtenant un bonus de +1 en Social.",
        cout: 2,
        id: "charisme-social"
    },
    {
        nom: "Éveil magique",
        effet: "Déverrouille le potentiel magique : la base PM passent à 1d12 (si il était inférieur) et la magie devient accessible. Lors de l'obtention du talent, le personnage peut lancer 2 dés de Gain de PM",
        cout: 3,
        id: "eveil-magique"
    },
    {
        nom: "Chanceux",
        effet: "Permet de relancer un dé de chance (un jet de Pourcentage uniquement, une fois par séance)",
        cout: 2,
        id: "chanceux"
    },
    {
        nom: "Ramasseur d'arme",
        effet: "Permet de ramasser une arme au sol sans consommer d'action, 1 fois par tour.",
        cout: 1,
        id: "ramasseur-arme"
    },
    {
        nom: "Petit mangeur",
        effet: "Permet de tenir plus longtemps sans manger (double le temps avant d'avoir obligatoirement besoin de manger)",
        cout: 2,
        id: "petit-mangeur"
    }
];

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
            talent.effet.toLowerCase().includes(searchTerm.toLowerCase());
        
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
    updateRecapTable();
}

// Mettre à jour le tableau récapitulatif
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
    
    selectedTalents.forEach(talentId => {
        const talent = allTalents.find(t => t.id === talentId);
        if (!talent) return;
        
        totalPoints += talent.cout;
        
        const row = document.createElement('tr');
        
        // Nom (cliquable pour désélectionner)
        const nomCell = document.createElement('td');
        nomCell.setAttribute('data-label', 'Nom');
        const nomSpan = document.createElement('span');
        nomSpan.className = 'recap-nom';
        nomSpan.textContent = talent.nom;
        nomSpan.title = 'Cliquer pour désélectionner';
        nomSpan.addEventListener('click', () => {
            selectedTalents.delete(talentId);
            renderTable();
            updateRecapTable();
        });
        nomCell.appendChild(nomSpan);
        
        // Effet
        const effetCell = document.createElement('td');
        effetCell.setAttribute('data-label', 'Effet');
        effetCell.textContent = talent.effet;
        
        // Coût
        const coutCell = document.createElement('td');
        coutCell.className = 'recap-cout';
        coutCell.setAttribute('data-label', 'Coût');
        coutCell.textContent = talent.cout + ' point' + (talent.cout > 1 ? 's' : '');
        
        row.appendChild(nomCell);
        row.appendChild(effetCell);
        row.appendChild(coutCell);
        
        recapBody.appendChild(row);
    });
    
    totalPointsEl.textContent = totalPoints;
}

// Toggle mode sélection
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

// Réinitialiser les sélections
function resetSelection() {
    selectedTalents.clear();
    renderTable();
    updateRecapTable();
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
    
    // Boutons de réinitialisation
    document.getElementById('resetSelection').addEventListener('click', resetSelection);
    document.getElementById('resetSelectionRecap').addEventListener('click', resetSelection);
}