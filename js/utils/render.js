export function renderProjects(projects, containerId, filterText = '', filterTech = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const filtered = projects.filter(project => {
        const matchTitle = project.title.toLowerCase().includes(filterText.toLowerCase());
        const matchTech = filterTech === '' || project.tech.toLowerCase().includes(filterTech.toLowerCase());
        return matchTitle && matchTech;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-projects">Проектов не найдено</div>';
        return;
    }

    container.innerHTML = filtered.map(project => `
        <article class="project-card">
            <img src="${project.img}" alt="${project.title}" class="card-thumb">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="tech-stack">Стек: ${project.tech}</span>
            </div>
        </article>
    `).join('');
}

export function renderGitHubRepos(repos, containerId, errorMsg = null) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;

    if (errorMsg) {
        container.innerHTML = `<div class="no-projects">${errorMsg}</div>`;
        return;
    }

    if (!repos.length) {
        container.innerHTML = '<div class="no-projects">Нет репозиториев для отображения</div>';
        return;
    }

    container.innerHTML = repos.map(repo => `
        <article class="project-card">
            <div class="card-content">
                <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent);">${repo.name}</a></h3>
                <p>${repo.description || 'Нет описания'}</p>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>📅 ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
                <span class="tech-stack">${repo.language || 'Не указан'}</span>
            </div>
        </article>
    `).join('');
}