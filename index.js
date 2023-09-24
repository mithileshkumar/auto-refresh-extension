
let REFRESH_INTERVAL = 5000;

if (localStorage.getItem('refresh-interval')) {
    REFRESH_INTERVAL = localStorage.getItem('refresh-interval');
} else {
    REFRESH_INTERVAL = 5000;
}

const updateRefreshInterval = () => {
    clearInterval(defaultRefreshInterval)
    const updatedRefreshInterval = +document.getElementById('refresh-container__time').value * 1000;
    const transormRefreshInterval = updatedRefreshInterval === 0 ? REFRESH_INTERVAL : updatedRefreshInterval
    localStorage.setItem('refresh-interval', transormRefreshInterval);
    defaultRefreshInterval = setInterval(() => chrome.tabs.reload(), transormRefreshInterval);
    displayInterval(transormRefreshInterval);
}

const stopRefreshInterval = () => {
    clearInterval(defaultRefreshInterval);
}

const displayInterval = (updatedRefreshInterval = 5000) => {
    document.getElementById('refresh-container__value').textContent = updatedRefreshInterval / 1000 + ' sec';
}

displayInterval(REFRESH_INTERVAL);

let defaultRefreshInterval = setInterval(() => chrome.tabs.reload(), REFRESH_INTERVAL);

document.getElementById('refresh-container__btnstart').addEventListener('click', updateRefreshInterval)
document.getElementById('refresh-container__btnstop').addEventListener('click', stopRefreshInterval)