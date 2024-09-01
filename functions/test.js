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
