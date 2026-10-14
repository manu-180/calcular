# Estado: calcularya.com en el mundo

Plan y decisiones: `docs/adr/0002-mundo.md`. Receta de universales: `docs/global/RECETA-UNIVERSAL.md`.
Rama de integración: `claude/global-calculators-multipa-s-dfbec3` (incluye el PR #30 de auditoría).

## Ronda 1 (13/10/2026, en curso)

| Frente | Rama | Archivos que posee |
|---|---|---|
| Idiomas del motor (es pt en fr de it nl) | `claude/mundo-i18n` | `src/motor/{tipos,datos,textos,formato}.ts`, `src/motor/i18n/**`, `ui/{textos-inicio,Legales,NoEncontrada}`, not-found y llms.txt intl, `check_textos_paises`, `check_i18n` |
| Ofertas, informes, planillas y mails por idioma; familias de universales | `claude/mundo-ofertas` | `src/lib/pagos/**` (menos `ventas-intl.ts`), `ui/Oferta.tsx`, `(intl)/**/informes/**`, `(intl)/**/planillas/**` (menos `_compra.tsx`), `src/lib/prefill/intl*`, checks de ofertas |
| Escala e integración de universales | `claude/mundo-escala` | `src/motor/{registro,cliente,paginas,seo,mapa,sitio,hosts}.ts`, resto de `src/motor/ui/**`, `src/app/(intl)/**` (menos informes, planillas y not-found), `api/geo/**`, `src/paises/index.ts`, `universales/cargadores.ts`, `public/banderas/**`, checks de motor, hreflang y ruteo |
| Métricas del panel | `claude/mundo-metricas` | `supabase/migrations` nuevas, `src/lib/{medicion,panel}/**`, `components/panel/**`, `(ar)/dashboard/**`, `api/e/**`, `rastreo*.ts`, `_compra.tsx`, `api/pagos/checkout/**`, `ventas-intl.ts` |
| Universales de finanzas, negocio y sueldo (19) | `claude/mundo-univ-finanzas` | `src/motor/universales/<19 ids>/**`, `universales/finanzas.ts` |
| Universales cotidianas, salud, hogar e IVA (21) | `claude/mundo-univ-cotidianas` | `src/motor/universales/<21 ids>/**`, `universales/cotidianas.ts` |
| Investigación de los países del mundo | `claude/mundo-paises-research` | `docs/global/PAISES.md` |

## Próximo

Ronda 2: integrar las ramas de la ronda 1, traducir universales a pt fr de it nl, País y edición
(países con varios idiomas), y la primera tanda de países (tier 1 de `docs/global/PAISES.md`).
