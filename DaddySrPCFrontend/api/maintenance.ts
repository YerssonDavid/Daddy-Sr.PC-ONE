export default function handler(
  _req: import('http').IncomingMessage,
  res: import('http').ServerResponse,
) {
  const active = process.env.MAINTENANCE_MODE === 'true';
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ active }));
}
