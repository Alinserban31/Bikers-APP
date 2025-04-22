// Get DOM elements
const randomRouteBtn = document.getElementById('random-route-btn');
const difficultyFilter = document.getElementById('difficulty-filter');
const distanceFilter = document.getElementById('distance-filter');
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

// Function to filter routes based on selected criteria
function filterRoutes() {
    const difficulty = difficultyFilter.value;
    const distance = distanceFilter.value;
    
    return routeTypes.filter(route => {
        const meetsDifficulty = difficulty === 'all' || route.difficulty === difficulty;
        const meetsDistance = distance === 'all' || 
            (distance === 'short' && route.distance[1] <= 10) ||
            (distance === 'medium' && route.distance[0] >= 11 && route.distance[1] <= 20) ||
            (distance === 'long' && route.distance[0] >= 21);
        
        return meetsDifficulty && meetsDistance;
    });
}

// Function to generate random route
function generateRandomRoute() {
    const filteredRoutes = filterRoutes();
    if (filteredRoutes.length === 0) {
        return {
            name: 'No Routes Found',
            distance: 0,
            difficulty: 'N/A',
            description: 'Please adjust your filters to find matching routes.'
        };
    }
    
    const route = filteredRoutes[Math.floor(Math.random() * filteredRoutes.length)];
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

// Event listener for random route button
randomRouteBtn.addEventListener('click', () => {
    const route = generateRandomRoute();
    updateRouteDisplay(route);
});

// Event listeners for filters
difficultyFilter.addEventListener('change', () => {
    const route = generateRandomRoute();
    updateRouteDisplay(route);
});

distanceFilter.addEventListener('change', () => {
    const route = generateRandomRoute();
    updateRouteDisplay(route);
});

// Generate initial route
const initialRoute = generateRandomRoute();
updateRouteDisplay(initialRoute); 