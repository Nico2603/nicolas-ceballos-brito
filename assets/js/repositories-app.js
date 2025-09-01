// Variables globales para la página de repositorios
const GITHUB_USERNAME = 'Nico2603';
let allRepositories = [];
let filteredRepositories = [];
let isLoading = false;

// Elementos del DOM
let elements = {};

// Inicialización cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  initializeElements();
  initializeEventListeners();
  loadRepositories();
});

/**
 * Inicializa las referencias a elementos del DOM
 */
function initializeElements() {
  elements = {
    // Estados
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    noResultsState: document.getElementById('noResultsState'),
    repositoriesGrid: document.getElementById('repositoriesGrid'),
    
    // Estadísticas
    totalRepos: document.getElementById('totalRepos'),
    totalStars: document.getElementById('totalStars'),
    totalForks: document.getElementById('totalForks'),
    totalLanguages: document.getElementById('totalLanguages'),
    
    // Filtros
    searchInput: document.getElementById('searchInput'),
    languageFilter: document.getElementById('languageFilter'),
    sortFilter: document.getElementById('sortFilter'),
    starsFilter: document.getElementById('starsFilter'),
    applyFilters: document.getElementById('applyFilters'),
    clearFilters: document.getElementById('clearFilters')
  };
}

/**
 * Inicializa los event listeners
 */
function initializeEventListeners() {
  // Filtros
  elements.applyFilters.addEventListener('click', applyFilters);
  elements.clearFilters.addEventListener('click', clearFilters);
  
  // Búsqueda en tiempo real
  elements.searchInput.addEventListener('input', debounce(applyFilters, 300));
  
  // Otros filtros
  elements.languageFilter.addEventListener('change', applyFilters);
  elements.sortFilter.addEventListener('change', applyFilters);
  elements.starsFilter.addEventListener('input', debounce(applyFilters, 500));
}

/**
 * Función debounce para optimizar las búsquedas
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Carga todos los repositorios desde la API de GitHub
 */
async function loadRepositories() {
  if (isLoading) return;
  
  isLoading = true;
  showLoadingState();
  
  try {
    // Hacer múltiples requests para obtener todos los repositorios (GitHub API limita a 100 por página)
    let page = 1;
    let allRepos = [];
    let hasMore = true;
    
    while (hasMore) {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&direction=desc`
      );
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const repos = await response.json();
      
      if (repos.length === 0) {
        hasMore = false;
      } else {
        allRepos = allRepos.concat(repos);
        page++;
      }
    }
    
    // Filtrar repositorios (opcional: solo públicos, con descripción, etc.)
    allRepositories = allRepos.filter(repo => !repo.fork); // Excluir forks
    
    // Obtener información adicional para cada repositorio
    await enhanceRepositoriesData();
    
    // Configurar filtros
    populateLanguageFilter();
    
    // Mostrar estadísticas
    updateStatistics();
    
    // Mostrar repositorios
    filteredRepositories = [...allRepositories];
    displayRepositories();
    
  } catch (error) {
    console.error('Error al cargar repositorios:', error);
    showErrorState();
  } finally {
    isLoading = false;
  }
}

/**
 * Mejora los datos de los repositorios con información adicional
 */
async function enhanceRepositoriesData() {
  // Obtener topics para algunos repositorios principales
  const enhancePromises = allRepositories.slice(0, 10).map(async (repo) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}`, {
        headers: {
          'Accept': 'application/vnd.github.mercy-preview+json' // Para obtener topics
        }
      });
      
      if (response.ok) {
        const enhancedRepo = await response.json();
        repo.topics = enhancedRepo.topics || [];
      }
    } catch (error) {
      console.log(`No se pudieron obtener topics para ${repo.name}`);
      repo.topics = [];
    }
    
    return repo;
  });
  
  await Promise.all(enhancePromises);
  
  // Para el resto de repositorios, agregar array de topics vacío
  allRepositories.forEach(repo => {
    if (!repo.topics) {
      repo.topics = [];
    }
  });
}

/**
 * Popula el filtro de lenguajes
 */
function populateLanguageFilter() {
  const languages = new Set();
  
  allRepositories.forEach(repo => {
    if (repo.language) {
      languages.add(repo.language);
    }
  });
  
  const sortedLanguages = Array.from(languages).sort();
  
  // Limpiar opciones existentes (excepto la primera)
  elements.languageFilter.innerHTML = '<option value="">Todos los lenguajes</option>';
  
  sortedLanguages.forEach(language => {
    const option = document.createElement('option');
    option.value = language;
    option.textContent = language;
    elements.languageFilter.appendChild(option);
  });
}

/**
 * Actualiza las estadísticas en el header
 */
function updateStatistics() {
  const totalStars = allRepositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = allRepositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languages = new Set(allRepositories.filter(repo => repo.language).map(repo => repo.language));
  
  elements.totalRepos.textContent = allRepositories.length;
  elements.totalStars.textContent = totalStars;
  elements.totalForks.textContent = totalForks;
  elements.totalLanguages.textContent = languages.size;
}

/**
 * Aplica los filtros seleccionados
 */
function applyFilters() {
  const searchTerm = elements.searchInput.value.toLowerCase().trim();
  const selectedLanguage = elements.languageFilter.value;
  const sortBy = elements.sortFilter.value;
  const minStars = parseInt(elements.starsFilter.value) || 0;
  
  // Filtrar repositorios
  filteredRepositories = allRepositories.filter(repo => {
    const matchesSearch = !searchTerm || 
      repo.name.toLowerCase().includes(searchTerm) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm));
    
    const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;
    
    const matchesStars = repo.stargazers_count >= minStars;
    
    return matchesSearch && matchesLanguage && matchesStars;
  });
  
  // Ordenar repositorios
  sortRepositories(sortBy);
  
  // Mostrar resultados
  displayRepositories();
}

/**
 * Ordena los repositorios según el criterio seleccionado
 */
function sortRepositories(sortBy) {
  filteredRepositories.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'stars':
        return b.stargazers_count - a.stargazers_count;
      case 'forks':
        return b.forks_count - a.forks_count;
      case 'created':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'updated':
      default:
        return new Date(b.updated_at) - new Date(a.updated_at);
    }
  });
}

/**
 * Limpia todos los filtros
 */
function clearFilters() {
  elements.searchInput.value = '';
  elements.languageFilter.value = '';
  elements.sortFilter.value = 'updated';
  elements.starsFilter.value = '';
  
  filteredRepositories = [...allRepositories];
  sortRepositories('updated');
  displayRepositories();
}

/**
 * Muestra los repositorios en el grid
 */
function displayRepositories() {
  hideAllStates();
  
  if (filteredRepositories.length === 0) {
    showNoResultsState();
    return;
  }
  
  elements.repositoriesGrid.style.display = 'grid';
  elements.repositoriesGrid.innerHTML = '';
  
  filteredRepositories.forEach((repo, index) => {
    const repoCard = createRepositoryCard(repo, index);
    elements.repositoriesGrid.appendChild(repoCard);
  });
}

/**
 * Crea una tarjeta para un repositorio
 */
function createRepositoryCard(repo, index) {
  const card = document.createElement('div');
  card.className = 'repo-card';
  card.style.setProperty('--repo-index', index);
  
  // Formatear fecha de actualización
  const updatedDate = new Date(repo.updated_at);
  const timeSince = getTimeSince(updatedDate);
  
  // Crear HTML del repositorio
  card.innerHTML = `
    <div class="repo-header">
      <h3 class="repo-title">${repo.name}</h3>
      <span class="repo-visibility ${repo.private ? 'private' : 'public'}">
        ${repo.private ? 'Privado' : 'Público'}
      </span>
    </div>
    
    <p class="repo-description">
      ${repo.description || 'Sin descripción disponible'}
    </p>
    
    ${repo.topics && repo.topics.length > 0 ? `
      <div class="repo-topics">
        ${repo.topics.map(topic => `<span class="repo-topic">${topic}</span>`).join('')}
      </div>
    ` : ''}
    
    <div class="repo-meta">
      ${repo.language ? `
        <div class="repo-meta-item">
          <span class="repo-language">${repo.language}</span>
        </div>
      ` : ''}
      
      <div class="repo-meta-item repo-stars">
        <i class="fas fa-star"></i>
        <span>${repo.stargazers_count}</span>
      </div>
      
      <div class="repo-meta-item repo-forks">
        <i class="fas fa-code-branch"></i>
        <span>${repo.forks_count}</span>
      </div>
      
      <div class="repo-meta-item repo-updated">
        <i class="fas fa-clock"></i>
        <span>Actualizado ${timeSince}</span>
      </div>
    </div>
    
    <div class="repo-footer">
      <a href="${repo.html_url}" class="repo-link primary" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-github"></i>
        Ver en GitHub
      </a>
      ${repo.homepage ? `
        <a href="${repo.homepage}" class="repo-link secondary" target="_blank" rel="noopener noreferrer">
          <i class="fas fa-external-link-alt"></i>
          Demo
        </a>
      ` : ''}
    </div>
  `;
  
  return card;
}

/**
 * Calcula el tiempo transcurrido desde una fecha
 */
function getTimeSince(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const intervals = [
    { label: 'año', seconds: 31536000 },
    { label: 'mes', seconds: 2592000 },
    { label: 'día', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `hace ${count} ${interval.label}${count === 1 ? '' : 's'}`;
    }
  }
  
  return 'hace un momento';
}

/**
 * Muestra el estado de carga
 */
function showLoadingState() {
  hideAllStates();
  elements.loadingState.style.display = 'block';
}

/**
 * Muestra el estado de error
 */
function showErrorState() {
  hideAllStates();
  elements.errorState.style.display = 'block';
}

/**
 * Muestra el estado de sin resultados
 */
function showNoResultsState() {
  hideAllStates();
  elements.noResultsState.style.display = 'block';
}

/**
 * Oculta todos los estados
 */
function hideAllStates() {
  elements.loadingState.style.display = 'none';
  elements.errorState.style.display = 'none';
  elements.noResultsState.style.display = 'none';
  elements.repositoriesGrid.style.display = 'none';
}

/**
 * Inicializa el menú móvil (reutilizado del app.js principal)
 */
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!mobileMenuToggle || !navMenu) return;
  
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Añadir índices para animar secuencialmente los items del menú
    const navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
      item.style.setProperty('--item-index', index);
    });
  });
  
  // Cerrar menú al hacer clic en enlaces
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });
}

// Inicializar menú móvil también en esta página
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});
