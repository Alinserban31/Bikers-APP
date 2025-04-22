// Weather conditions and their corresponding icons
const weatherConditions = [
    { type: 'Sunny', tempRange: { min: 25, max: 35 } },
    { type: 'Cloudy', tempRange: { min: 15, max: 25 } },
    { type: 'Rainy', tempRange: { min: 10, max: 20 } },
    { type: 'Thunderstorm', tempRange: { min: 15, max: 25 } },
    { type: 'Snowy', tempRange: { min: -5, max: 5 } },
    { type: 'Foggy', tempRange: { min: 5, max: 15 } }
];

// Get DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityElement = document.getElementById('city');
const tempElement = document.getElementById('temp');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const bikingMeter = document.getElementById('biking-meter');
const bikingPercentage = document.getElementById('biking-percentage');
const bikingTip = document.getElementById('biking-tip');

// Get route-related DOM elements
const routeBtn = document.getElementById('route-btn');
const routeName = document.getElementById('route-name');
const routeDistance = document.getElementById('route-distance');
const routeDifficulty = document.getElementById('route-difficulty');
const routeDescription = document.getElementById('route-description');

// Sample route data
const routeTypes = [
    {
        name: 'Scenic Lake Loop',
        distance: [5, 10],
        difficulty: 'Easy',
        description: 'A beautiful route around the local lake with minimal elevation gain.'
    },
    {
        name: 'Mountain Challenge',
        distance: [15, 25],
        difficulty: 'Hard',
        description: 'A challenging route with significant elevation gain and technical sections.'
    },
    {
        name: 'City Explorer',
        distance: [8, 15],
        difficulty: 'Medium',
        description: 'Explore the city streets and bike paths with various points of interest.'
    },
    {
        name: 'Forest Trail',
        distance: [12, 20],
        difficulty: 'Medium',
        description: 'A mix of forest trails and gravel paths with moderate elevation changes.'
    },
    {
        name: 'Coastal Ride',
        distance: [10, 18],
        difficulty: 'Easy',
        description: 'Enjoy the ocean views on this flat coastal route with minimal traffic.'
    },
    {
        name: 'Hill Training',
        distance: [6, 12],
        difficulty: 'Hard',
        description: 'Perfect for training with multiple hill repeats and steep climbs.'
    }
];

// Function to get random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get random weather condition
function getRandomWeather() {
    return weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
}

// Function to generate weather data
function generateWeatherData(city) {
    const weather = getRandomWeather();
    const temperature = getRandomNumber(weather.tempRange.min, weather.tempRange.max);
    const humidity = getRandomNumber(40, 90);
    const windSpeed = getRandomNumber(5, 30);

    return {
        city,
        temperature,
        weather: weather.type,
        humidity,
        windSpeed
    };
}

// Function to calculate biking condition
function calculateBikingCondition(weather) {
    let score = 100;
    let tip = '';

    // Temperature impact
    if (weather.temperature < 5) {
        score -= 30;
        tip = 'Too cold for comfortable biking. Consider waiting for warmer weather.';
    } else if (weather.temperature > 30) {
        score -= 20;
        tip = 'Hot weather. Stay hydrated and take breaks.';
    }

    // Weather condition impact
    switch (weather.weather) {
        case 'Rainy':
            score -= 40;
            tip = 'Rainy conditions. Not recommended for biking.';
            break;
        case 'Thunderstorm':
            score -= 50;
            tip = 'Dangerous conditions. Avoid biking.';
            break;
        case 'Snowy':
            score -= 45;
            tip = 'Snowy conditions. Not safe for biking.';
            break;
        case 'Foggy':
            score -= 25;
            tip = 'Low visibility. Be extra cautious if biking.';
            break;
        case 'Cloudy':
            score -= 10;
            tip = 'Good conditions for biking.';
            break;
        case 'Sunny':
            tip = 'Perfect conditions for biking!';
            break;
    }

    // Wind impact
    if (weather.windSpeed > 20) {
        score -= 15;
        tip = 'Strong winds. Be careful while biking.';
    }

    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));

    return { score, tip };
}

// Function to update UI with weather data
function updateUI(data) {
    cityElement.textContent = data.city;
    tempElement.textContent = `${data.temperature}°C`;
    descriptionElement.textContent = data.weather;
    humidityElement.textContent = `${data.humidity}%`;
    windElement.textContent = `${data.windSpeed} km/h`;

    // Update biking condition
    const bikingCondition = calculateBikingCondition(data);
    bikingMeter.style.width = `${bikingCondition.score}%`;
    bikingPercentage.textContent = `${bikingCondition.score}%`;
    bikingTip.textContent = bikingCondition.tip;
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        const weatherData = generateWeatherData(city);
        updateUI(weatherData);
    }
});

// Event listener for Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            const weatherData = generateWeatherData(city);
            updateUI(weatherData);
        }
    }
});

// Function to generate random route
function generateRandomRoute() {
    const route = routeTypes[Math.floor(Math.random() * routeTypes.length)];
    const distance = getRandomNumber(route.distance[0], route.distance[1]);
    
    return {
        name: route.name,
        distance: distance,
        difficulty: route.difficulty,
        description: route.description
    };
}

// Function to update route display
function updateRouteDisplay(route) {
    routeName.textContent = route.name;
    routeDistance.textContent = `Distance: ${route.distance} km`;
    routeDifficulty.textContent = `Difficulty: ${route.difficulty}`;
    routeDescription.textContent = route.description;
}

// Event listener for route button
routeBtn.addEventListener('click', () => {
    const route = generateRandomRoute();
    updateRouteDisplay(route);
});

// Initialize with default city
const defaultCity = 'London';
const defaultWeather = generateWeatherData(defaultCity);
updateUI(defaultWeather); 