const userInfoDiv = document.getElementById('user-info');
const usernameInput = document.getElementById('username');
const toggleModeButton = document.getElementById('toggle-mode');
const clearDataButton = document.getElementById('clear-data');

const API_URL = 'https://www.codewars.com/api/v1/users/';

function applyTheme() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', darkMode);
}

function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function fetchUserData(username) {
    fetch(`${API_URL}${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                displayUserData(data);
                localStorage.setItem('userData', JSON.stringify(data));
            } else {
                alert('User not found');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function displayUserData(data) {
    userInfoDiv.innerHTML = `
        <div class="user-card ${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
            <p><strong>Clan:</strong> ${data.clan || 'N/A'}</p>
            <p><strong>Languages:</strong> ${Object.keys(data.ranks.languages).join(', ')}</p>
            <p><strong>JavaScript Rank:</strong> ${data.ranks.languages.javascript ? data.ranks.languages.javascript.name : 'N/A'}</p>
            <p><strong>Overall Rank:</strong> ${data.ranks.overall.name}</p>
        </div>
    `;
}

document.getElementById('fetch-data').addEventListener('click', function() {
    const username = usernameInput.value.trim();
    if (username) {
        fetchUserData(username);
    } else {
        alert('Please enter a username');
    }
});

toggleModeButton.addEventListener('click', toggleTheme);

clearDataButton.addEventListener('click', function() {
    userInfoDiv.innerHTML = '';
    localStorage.removeItem('userData');
});

// Apply the theme on page load
applyTheme();

// Load data on page load
const savedUserData = localStorage.getItem('userData');
if (savedUserData) {
    displayUserData(JSON.parse(savedUserData));
}
