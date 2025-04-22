const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static('./'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('To access from your phone:');
    console.log('1. Make sure your phone is on the same WiFi network as your computer');
    console.log('2. Find your computer\'s IP address');
    console.log('3. On your phone, open a browser and go to: http://[your-computer-ip]:3000');
}); 