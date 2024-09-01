const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  // Get client IP address
  const clientIp =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Get user-agent
  const userAgent = req.headers['user-agent'];

  console.log(
    `Request Method: ${req.method}, Request URL: ${req.url}, Client IP: ${clientIp}, User-Agent: ${userAgent}`
  );

  next(); // Pass control to the next handler
});
// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/test', (req, res) => {
  console.log('Connected');
  res.send('Connected');
});

app.get('/set-relays', (req, res) => {
  const now = new Date();
  const hour = now.getHours();

  // Determine relay states based on the time of day
  let lightState = hour >= 6 && hour < 18 ? 'off' : 'on';
  let waterState = lightState;

  // Prepare control payload
  const controlPayload = {
    lights: lightState,
    fans: 'on',
    water: waterState,
  };

  // Respond with control payload
  res.json(controlPayload);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
