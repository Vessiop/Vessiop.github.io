// Données du premier tableau
const talentsTable1 = [
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
    }
];

// Données du second tableau
const talentsTable2 = [
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

// État de tri pour chaque tableau
let currentSort = {
    table1: { column: null, direction: null },
    table2: { column: null, direction: null }
};

let currentSearchTerm = '';

// Fonction d'initialisation
function init() {
    renderTable(talentsTable1, 'talentsBody1', 1);
    renderTable(talentsTable2, 'talentsBody2', 2);
    updateCounts();
    attachEventListeners();
}

// Rendu d'un tableau
function renderTable(talents, bodyId, tableNum) {
    const tbody = document.getElementById(bodyId);
    tbody.innerHTML = '';
    
    talents.forEach(talent => {
        const row = document.createElement('tr');
        
        const nomCell = document.createElement('td');
        nomCell.className = 'col-nom';
        nomCell.innerHTML = highlightText(talent.nom, currentSearchTerm);
        
        const effetCell = document.createElement('td');
        effetCell.className = 'col-effet';
        effetCell.innerHTML = highlightText(talent.effet, currentSearchTerm);
        
        const coutCell = document.createElement('td');
        coutCell.className = 'col-cout';
        coutCell.textContent = talent.cout + ' point' + (talent.cout > 1 ? 's' : '');
        
        row.appendChild(nomCell);
        row.appendChild(effetCell);
        row.appendChild(coutCell);
        
        // Filtre de recherche
        if (currentSearchTerm) {
            const searchLower = currentSearchTerm.toLowerCase();
            const matchNom = talent.nom.toLowerCase().includes(searchLower);
            const matchEffet = talent.effet.toLowerCase().includes(searchLower);
            
            if (!matchNom && !matchEffet) {
                row.classList.add('hidden');
            }
        }
        
        tbody.appendChild(row);
    });
}

// Highlighting de texte
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Tri d'un tableau
function sortTable(column, tableNum) {
    const talents = tableNum === 1 ? talentsTable1 : talentsTable2;
    const sortState = currentSort[`table${tableNum}`];
    
    // Déterminer la nouvelle direction
    if (sortState.column === column) {
        if (sortState.direction === 'asc') {
            sortState.direction = 'desc';
        } else if (sortState.direction === 'desc') {
            sortState.direction = null;
            sortState.column = null;
        } else {
            sortState.direction = 'asc';
        }
    } else {
        sortState.column = column;
        sortState.direction = 'asc';
    }
    
    // Effectuer le tri
    if (sortState.direction) {
        talents.sort((a, b) => {
            let valA, valB;
            
            if (column === 'nom') {
                valA = a.nom.toLowerCase();
                valB = b.nom.toLowerCase();
            } else if (column === 'cout') {
                valA = a.cout;
                valB = b.cout;
            }
            
            if (sortState.direction === 'asc') {
                return valA > valB ? 1 : valA < valB ? -1 : 0;
            } else {
                return valA < valB ? 1 : valA > valB ? -1 : 0;
            }
        });
    } else {
        // Rétablir l'ordre original (on ne le fait pas, on garde l'ordre actuel)
        // Pour rétablir l'ordre original, il faudrait sauvegarder l'index initial
    }
    
    // Re-render le tableau
    const bodyId = `talentsBody${tableNum}`;
    renderTable(talents, bodyId, tableNum);
    
    // Mettre à jour les indicateurs visuels
    updateSortIndicators(tableNum);
}

// Mise à jour des indicateurs de tri
function updateSortIndicators(tableNum) {
    const table = document.getElementById(`talentsTable${tableNum}`);
    const headers = table.querySelectorAll('th.sortable');
    const sortState = currentSort[`table${tableNum}`];
    
    headers.forEach(header => {
        const column = header.dataset.sort;
        header.classList.remove('sorted-asc', 'sorted-desc');
        
        if (column === sortState.column) {
            if (sortState.direction === 'asc') {
                header.classList.add('sorted-asc');
            } else if (sortState.direction === 'desc') {
                header.classList.add('sorted-desc');
            }
        }
    });
}

// Recherche
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    currentSearchTerm = searchInput.value.trim();
    
    renderTable(talentsTable1, 'talentsBody1', 1);
    renderTable(talentsTable2, 'talentsBody2', 2);
    updateCounts();
}

// Mise à jour des compteurs
function updateCounts() {
    const table1Rows = document.querySelectorAll('#talentsTable1 tbody tr:not(.hidden)');
    const table2Rows = document.querySelectorAll('#talentsTable2 tbody tr:not(.hidden)');
    const visibleCount = table1Rows.length + table2Rows.length;
    const totalCount = talentsTable1.length + talentsTable2.length;
    
    document.getElementById('talentCount').textContent = visibleCount;
    document.getElementById('totalCount').textContent = totalCount;
}

// Attacher les événements
function attachEventListeners() {
    // Recherche
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // Bouton clear
    const clearBtn = document.getElementById('clearSearch');
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchTerm = '';
        handleSearch();
    });
    
    // Tri - Tableau 1
    const table1Headers = document.querySelectorAll('#talentsTable1 th.sortable');
    table1Headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.sort;
            const tableNum = parseInt(header.dataset.table);
            sortTable(column, tableNum);
        });
    });
    
    // Tri - Tableau 2
    const table2Headers = document.querySelectorAll('#talentsTable2 th.sortable');
    table2Headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.sort;
            const tableNum = parseInt(header.dataset.table);
            sortTable(column, tableNum);
        });
    });
}

// Lancement au chargement de la page
document.addEventListener('DOMContentLoaded', init);