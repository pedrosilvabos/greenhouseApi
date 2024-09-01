// functions/root.js

exports.handler = async (event, context) => {
  const clientIp =
    event.headers['x-forwarded-for'] || event.requestContext.identity.sourceIp;
  const userAgent = event.headers['user-agent'];

  console.log(
    `Request Method: ${event.httpMethod}, Request URL: ${event.path}, Client IP: ${clientIp}, User-Agent: ${userAgent}`
  );

  return {
    statusCode: 200,
    body: 'Hello World',
  };
};

// functions/test.js

exports.handler = async (event, context) => {
  const clientIp =
    event.headers['x-forwarded-for'] || event.requestContext.identity.sourceIp;
  const userAgent = event.headers['user-agent'];

  console.log(
    `Request Method: ${event.httpMethod}, Request URL: ${event.path}, Client IP: ${clientIp}, User-Agent: ${userAgent}`
  );
  console.log('Connected');

  return {
    statusCode: 200,
    body: 'Connected',
  };
};

// functions/set-relays.js

exports.handler = async (event, context) => {
  const clientIp =
    event.headers['x-forwarded-for'] || event.requestContext.identity.sourceIp;
  const userAgent = event.headers['user-agent'];

  console.log(
    `Request Method: ${event.httpMethod}, Request URL: ${event.path}, Client IP: ${clientIp}, User-Agent: ${userAgent}`
  );

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
  return {
    statusCode: 200,
    body: JSON.stringify(controlPayload),
  };
};
