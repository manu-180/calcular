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

## Decisiones de Manuel (2026-10-07)

- Dominio de los países: **calcularya.com** (US$ 11,25/año, libre al 7/10). Falta comprarlo: la
  compra pide datos de titular (WHOIS). Proyecto Vercel: calcular-ar, team_howttfzs3Q44mOpVn93EkrUm.
- Países: **todos los válidos, mientras más mejor**; no importa si alguno no vende. Cobra con
  MercadoPago: cómo cobrar fuera de Argentina se investiga en docs/research/paises/cobros.md.
- calcular.ar no se toca como dominio. Sin redirección automática por IP (rompe el rastreo de
  Google): sugerencia de país con aviso + selector, hreflang entre calcular.ar y calcularya.com.

## Investigación en curso

docs/research/paises/{uy,py,bo,ve,mx,pe,co,cl,ec,cr,pa,ni,do,gt,sv,hn}.md y cobros.md.

## Estado al 7/10/2026, 01:15 (fin del primer bloque de trabajo)

Integrado en esta rama y verificado (tsc limpio, build 232 páginas, check-all verde salvo
check_planilla_plazo_fijo, que sólo pasa con las planillas regeneradas: lo hace el prebuild y, con
el PR #8, también el motor de datos-vivos):

- Menú móvil sereno (420 ms abre, 280 ms cierra, filas escalonadas) y desplegable de cuenta dentro
  de la pantalla de 320 a 1280 px.
- Zona privada instantánea: /cuenta de 296 a 23-40 ms al primer byte (simulado), esqueletos con la
  forma real, un solo viaje a Supabase, perfil optimista. Revisado: cada página sigue validando con getUser.
- Novedades (/novedades + RSS + bloque en la home + footer + sello) con 17 cambios reales y registro
  que se alimenta solo desde datos-vivos. Sumado al sitemap y a la navegación.
- SEO: JSON-LD válido en todo el sitio, grafo global, sitemap con fechas reales, gate check_seo.
  Auditoría por ruta en docs/seo/auditoria-2026-10-06.md (titles y descriptions propuestos).
- .gitattributes con eol=lf: los checks ya no dan rojo falso en Windows.
- Research de 16 países en docs/research/paises/ y ADR multi-país en docs/adr/.

PR aparte y urgente: #8, el sitio no se actualizaba solo desde el 28/9 (planillas sin regenerar).

## Próxima ronda (al volver del descanso)

1. Redacción humana de Argentina por tandas (6 agentes, archivos disjuntos), aplicando la guía y
   los titles/descriptions de la auditoría SEO. Gate: contar_guiones en cero por tanda.
2. Feedback de usuarios con cuenta (/cuenta/opiniones + tabla Supabase con RLS).
3. Multi-país Fase 0 según docs/adr/0001-plan-implementacion.md (spike de Next 16 primero).
   Pendiente de Manuel: compra de calcularya.com, cobro fuera de AR, nombre visible del sitio nuevo.
4. Validar demanda por país con Keyword Planner (cuenta 4869983637).

## Datos viejos detectados por la redacción (corregir después de integrar todas las tandas)

- /monotributo y /monotributo/categorias: «La próxima ventana cierra el 5 de agosto de 2026» fijo (ya pasó).
  Usar RECATEGORIZACION.proximaVentana.
- /monotributo/categorias: datasetSchema dice «vigentes desde febrero 2026» y VIGENCIA.desde es 1/8/2026.
- /plazo-fijo «Cómo se calcula»: ejemplo fijo (0,1941; $15.953; $1.015.953) al lado de TNA_FALLBACK.valor,
  que cambia. Usar ejTnaDecStr, ejInteresStr, ejTotalStr.
- /plazo-fijo FAQ «¿Es seguro?»: $50.000.000 y «abril de 2026» fijos en vez de GARANTIA_DEPOSITOS.
- src/data: 20 rayas que son puntuación de citas textuales de la ley (quedan; el gate necesita excepción).
- Home: tarjeta de recategorización «Próxima ventana: hasta el 5 de agosto» (vencida); piso de
  /indemnizacion-art «$114.354.110» escrito a mano (se mueve por RIPTE).
- /servicios-esenciales-huelga: description dice 4 actividades, header y H2 dicen tres.
- /practicas-desleales-sindicales: «las tres conductas del art. 20 ter» pero la FAQ enumera cuatro.
- /sueldo-neto/camioneros: falta el número de artículo del CCT 40/89 en una FAQ.
- /sueldo-neto/comercio y /sueldo-neto: datasetSchema con «agosto 2026» y «1er sem 2026» a mano.
- /sueldo-neto/construccion: pie cita acuerdoTramo2 y datasetSchema acuerdoTramo3.
- /puam: dos FAQs duplicadas (fallecimiento del titular).
