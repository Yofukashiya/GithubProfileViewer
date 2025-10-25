const usernameInput = document.getElementById('usernameInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const errorElement = document.getElementById('error');
const profileCard = document.getElementById('profileCard');

async function searchUser(username){
    if (!username.trim()) {
        return;
    }

    // Hide previous results
    profileCard.classList.remove('show');
    error.classList.remove('show');
    loading.style.display = 'block';

    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

        if (!response) {
            if (response.status === 404) {
                throw new Error("User not found");
            }
            else if (response.status === 403) {
                throw new Error("Rate limit exceeded");
            }
            else {
                throw new Error(`HTTPS error: ${response.data}`);
            }
        }

        const user = await response.json();

        document.getElementById('avatar').src = user.avatar_url;
        document.getElementById('avatar').alt = `${user.login}'s avatar`;
        document.getElementById('name').textContent = user.name || user.login;
        document.getElementById('username').textContent = `@${user.login}`;
        document.getElementById('bio').textContent = user.bio || "This user has no bio.";

        const locationContainer = document.getElementById('locationContainer');

        if (user.location) {
            document.getElementById('location').textContent = user.location;
            locationContainer.style.display = 'flex';
        }
        else {
            locationContainer.style.display = 'none';
        }

        //Stats
        document.getElementById('repos').textContent = user.public_repos.toLocaleString();
        document.getElementById('followers').textContent = user.followers.toLocaleString();
        document.getElementById('following').textContent = user.following.toLocaleString();
        document.getElementById('gists').textContent = user.public_gists.toLocaleString();

        //Links
        document.getElementById('profileLink').href = user.html_url;

        const blogLink = document.getElementById('blogLink');

        if (user.blog) {
            const blogUrl = user.blog.startsWith('http') ? user.blog : `https://${user.blog}`;
            blogLink.href = blogUrl;
            blogLink.style.display = 'inline-flex';
        }
        else {
            blogLink.style.display = 'none';
        }

        //Loading
        loading.style.display = "none";
        setTimeout(() => {
            profileCard.classList.add('show');
        }, 100)
    }
    catch (err) {
        console.log('Search error: ', err);
        loading.style.display = 'none';

        // const errorElement = document.getElementById('error');

        if (err.message.includes('Rate limit')) {
            errorElement.innerHTML = `
            <h3>Rate limit exceeded</h3>
            <p>GitHub API rate limit reached. Please try again in a few minutes.</p>
            `
        }
        else if (err.message.includes('Failed to fetch')) {
            errorElement.innerHTML = `
            <h3>Connection Error</h3>
            <p>Unable to connect to GitHub. Please check your internet connection</p>
            `
        }
        else {
            errorElement.innerHTML = `
            <h3>User Not Found</h3>
            <p>GitHub user was not found. Please check the username again and try again.</p>
            `
        }

        errorElement.classList.add('show');
    }
}

searchBtn.addEventListener('click', () => {
    searchUser(usernameInput.value);
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchUser(usernameInput.value);
    }
});

usernameInput.focus();