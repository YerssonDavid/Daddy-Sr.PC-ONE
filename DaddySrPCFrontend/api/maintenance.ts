export default function handler(request: Request): Response {
  const active = process.env.MAINTENANCE_MODE === 'true';
  return new Response(JSON.stringify({ active }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
