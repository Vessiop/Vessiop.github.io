// Tous les talents non évolutifs dans un seul tableau
const allTalents = [
    {
        nom: "Vif",
        effet: "Offre un +6 en Réactivité",
        cout: 1
    },
    {
        nom: "Sens extraordinaire",
        effet: "+5 aux jets de PER liés à un sens choisi (et compétence associée N.A +5). (Pouvant être ré-appris pour d'autre sens)",
        cout: 1
    },
    {
        nom: "Petit dormeur",
        effet: "Une fois par jour, peut relancer un jet de repos avec un malus de -10.",
        cout: 2
    },
    {
        nom: "Gros dormeur",
        effet: "+10 aux jets de repos long, mais -15 en Initiative si pris en embuscade en dormant.",
        cout: 2
    },
    {
        nom: "Corps entraîné",
        effet: "Vous avez une endurance exceptionnelle face aux épreuves physiques et mentales, offrant un bonus de +1 en Résilience",
        cout: 2
    },
    {
        nom: "Main de maître",
        effet: "Votre précision et votre contrôle sont impressionnants, ce qui vous confère un bonus de +1 en Finesse.",
        cout: 2
    },
    {
        nom: "Puissance entraînée",
        effet: "Votre force brute dépasse celle de la plupart, ajoutant un bonus de +1 en Puissance.",
        cout: 2
    },
    {
        nom: "Nerfs d'acier",
        effet: "Vous êtes un maître de la maîtrise de soi, offrant un bonus de +1 en Sang-froid",
        cout: 2
    },
    {
        nom: "Mental endurci",
        effet: "Offre un bonus de +6 en Résistance mentale",
        cout: 1
    },
    {
        nom: "Maîtrise des attaque sournois",
        effet: "Permet d'effectuer des attaques sournoises, infligeant les dégâts associés à la sournoiserie.",
        cout: 3
    },
    {
        nom: "Petit Buveur",
        effet: "Permet de tenir plus longtemps sans boire (double le temps avant d'avoir obligatoirement besoin de boire)",
        cout: 2
    },
    {
        nom: "Coureur émérite",
        effet: "Offre un bonus de +5 en Mouvement",
        cout: 1
    },
    {
        nom: "Bonne vitalité",
        effet: "+1 sur le résultat des dés de gain de PV lors des montés de Niveau",
        cout: 2
    },
    {
        nom: "Endurant",
        effet: "+1 sur le résultat des dés de gain de PE lors des montés de Niveau",
        cout: 2
    },
    {
        nom: "Jeune potentielle magique",
        effet: "+1 sur le résultat des dés de gain de PM lors des montés de Niveau",
        cout: 2
    },
    {
        nom: "Petit Rat de bibliothèque",
        effet: "Vous avez une aptitude naturelle pour comprendre et utiliser les connaissances, gagnant un bonus de +1 en Savoir",
        cout: 2
    },
    {
        nom: "Réflexe entraînée",
        effet: "Vos instincts aiguisés vous permettent de réagir rapidement et efficacement, obtenant un bonus de +1 en Instinct",
        cout: 2
    },
    {
        nom: "Charisme social",
        effet: "Vous excellez dans les interactions sociales, obtenant un bonus de +1 en Social.",
        cout: 2
    },
    {
        nom: "Éveil magique",
        effet: "Déverrouille le potentiel magique : la base PM passent à 1d12 (si il était inférieur) et la magie devient accessible. Lors de l'obtention du talent, le personnage peut lancer 2 dés de Gain de PM",
        cout: 3
    },
    {
        nom: "Chanceux",
        effet: "Permet de relancer un dé de chance (un jet de Pourcentage uniquement, une fois par séance)",
        cout: 2
    },
    {
        nom: "Ramasseur d'arme",
        effet: "Permet de ramasser une arme au sol sans consommer d'action, 1 fois par tour.",
        cout: 1
    },
    {
        nom: "Petit mangeur",
        effet: "Permet de tenir plus longtemps sans manger (double le temps avant d'avoir obligatoirement besoin de manger)",
        cout: 2
    }
];

// Variables globales
let talents = [...allTalents]; // Copie du tableau pour pouvoir trier
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
        // Filtrage par recherche
        const matchesSearch = searchTerm === '' || 
            talent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            talent.effet.toLowerCase().includes(searchTerm.toLowerCase());
        
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
    
    // Bouton clear
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
    
    // Tri
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            sortTable(column);
        });
    });
}