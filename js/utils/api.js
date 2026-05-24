export async function fetchGitHubRepos(username) {
    if (!username.trim()) return [];
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
            headers: {
                'User-Agent': 'MyPortfolioSite/1.0'
            }
        });
        
        if (!response.ok) {
            if (response.status === 404) throw new Error(`Пользователь "${username}" не найден`);
            if (response.status === 403) throw new Error('Лимит запросов API. Попробуйте позже.');
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        
        const repos = await response.json();
        console.log('Получены репозитории:', repos);
        return repos;
    } catch (error) {
        console.error('GitHub API error:', error);
        throw error;
    }
}