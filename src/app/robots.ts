import type { MetadataRoute } from 'next'

// Bots de IA que citan fuentes: se listan explícitamente para dejar constancia
// de que calcular.ar es indexable por buscadores de IA (además del `*` general).
// robots.txt solo habilita el crawl; la citabilidad real se gana on-page
// (respuesta-primero + schema Article/Dataset). Mantener `*` para el SEO clásico.
const AI_BOTS = [
  'OAI-SearchBot', // OpenAI — búsqueda de ChatGPT
  'ChatGPT-User', // OpenAI — navegación en vivo
  'GPTBot', // OpenAI — índice/entrenamiento
  'PerplexityBot', // Perplexity — índice
  'Perplexity-User', // Perplexity — navegación en vivo
  'Claude-SearchBot', // Anthropic — búsqueda
  'Claude-User', // Anthropic — navegación en vivo
  'Google-Extended', // Gemini / Vertex grounding
  'Applebot-Extended', // Apple Intelligence
]

export default function robots(): MetadataRoute.Robots {
  // `$` + `/` y no el prefijo pelado: 'Disallow: /cuenta' también taparía una futura /cuenta-corriente.
  const privadas = ['/cuenta', '/dashboard', '/login', '/registro', '/recuperar', '/auth'].flatMap((r) => [`${r}$`, `${r}/`])
  const disallow = ['/api/', '/og/', ...privadas]
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: 'https://calcular.ar/sitemap.xml',
    host: 'https://calcular.ar',
  }
}
