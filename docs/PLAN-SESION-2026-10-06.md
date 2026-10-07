# Sesión 2026-10-06 · SEO, velocidad, menú móvil, redacción humana, expansión LATAM

Rama: `claude/seo-performance-regional-expansion-923044`. Orquestada con `/orquestador`.
Régimen pedido por Manuel: 2 h de trabajo, 2 h de descanso, y retomar.

## Pedido (en orden)

1. SEO de calcular.ar: auditoría completa y mejoras donde sumen tráfico.
2. Velocidad: /cuenta, /dashboard y todo lo privado tiene que cargar instantáneo.
3. Menú móvil: apertura serena (hoy entra de golpe) y desplegables de perfil desfasados en celular.
4. Redacción de Argentina más humana: sin guiones (raya «—»), paréntesis en su lugar, breve y clara.
5. Que el usuario entienda que la información siempre está actualizada (sutil pero claro) +
   una sección de novedades con movimiento frecuente.
6. Feedback de usuarios con cuenta.
7. Expansión a LATAM: misma estructura que Argentina por país (calculadoras gratis + planillas
   pagas), datos reales con fuentes, actualización automática, detección de país + selector,
   SEO por país. Dominio nuevo para los países (calcular.ar queda igual).

No existía un plan multi-país escrito en el repo, la memoria ni el historial: se arma acá.

## Rondas

| Ronda | Frente | Agente · modelo | Posee |
|---|---|---|---|
| 1 | Auditoría SEO + infra SEO | seo-structure-architect · Opus | sitemap, robots, layout (metadata), JsonLd, llms.txt, docs/seo/ |
| 1 | Velocidad zona privada | performance-engineer · Opus | src/app/cuenta, dashboard, login/registro/recuperar, lib/panel, lib/auth, proxy.ts, components/cuenta, components/panel |
| 1 | Menú móvil + desplegables | frontend-developer · Sonnet | SiteHeader.tsx, MenuCuenta.tsx |
| 1 | «Siempre actualizado» + Novedades | frontend-developer · Opus | /novedades, lib/novedades, SiteFooter, SelloVerificado |
| 1 | Investigación países | search-specialist · Opus (x2) | docs/research/paises/ |
| 2 | Redacción humana AR (por tandas de rutas) | copy · Opus | page.tsx por tanda + metadata de SEO |
| 2 | Feedback de usuarios | backend + frontend | /cuenta/opiniones, migración Supabase |
| 3 | Arquitectura multi-país (ADR + base i18n) | architect-review · Opus | ADR, src/paises/, proxy por host |
| 4+ | Países (uno por agente) | | src/app/(paises)/... |

## Decisiones abiertas para Manuel

- Dominio para los países (calcular.com/.lat/.la/.app/.io/.net/.org/.co tomados al 2026-10-06).
- Orden de países.
