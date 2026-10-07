# Estado de calcularya.com (multi-país)

Última actualización: 2026-10-07 21:00 (segunda pausa pedida por Manuel; se retoma ~01:00 del 8/10).

## Rama de integración

`claude/calcularya-intl` (pusheada). Todo lo integrado vive acá; `main` todavía no tiene nada de intl.
calcular.ar no cambia: foto de 244 URLs idéntica (`scripts/check_rutas_ar.ts --start`).
`check-all` 130/130 en la última corrida completa.

## Integrado y registrado en `src/paises/index.ts`

| País | Calculadoras | Nota |
|---|---|---|
| Chile `cl` | 11 | todo verificado |
| Colombia `co` | 14 | FSP 2027 no verificado (sale de publicable el 1/4/2027) |
| México `mx` | 14 | leyes de SEGOB/IMSS tomadas como primarias (diputados.gob.mx no responde) |
| Perú `pe` | 13 | `sueldo-neto` publicado con datos de la SBS; RMA y UIT vencen 31/12/2026 |
| Uruguay `uy` | 11 | voseo |
| Ecuador `ec` | 11 | SBU, tabla de renta y canasta vencen 31/12/2026 |
| Costa Rica `cr` | 11 | usted |
| Guatemala `gt` | 8 (+3 borrador) | IVA, IGSS EMA y bonificación Q250 sin fuente primaria legible |
| Paraguay `py` | 12 | voseo |
| República Dominicana `do` (se importa como `rd`) | 11 | escala ISR 2027 no verificada |
| El Salvador `sv` | 9 (+1 borrador) | ISSS sin fuente primaria; reforma del aguinaldo 2026 pendiente de leer en el D.O. |
| Panamá `pa` | 11 | todo verificado |
| Honduras `hn` | 8 (+1 borrador) | décimo tercer mes sin fuente legible |

Plataforma web (F3), motor, pipeline de datos (F4) y decimales por moneda: integrados.

## En curso al pausar (cada agente commitea en su rama; mirar el último commit)

| Frente | Rama | Qué es |
|---|---|---|
| Nicaragua | `claude/intl-pais-ni` | paquete del país |
| Bolivia | `claude/intl-pais-bo` | paquete del país |
| Venezuela | `claude/intl-pais-ve` | paquete del país |
| Fix A | `claude/intl-fix-pipeline` | hallazgos de seguridad/código del pipeline: permisos del workflow, parches solo a `series.json`, TLS con intermedios versionados, redirecciones, inyección en issues, issue que se cierra antes de publicar, `iguales()` en bandas, `PAISES_TOLERANTE` ampliado, `ci.yml` de PR |
| Fix B | `claude/intl-fix-motor` | país con errores hace fallar el build, `hoyEn` por zona + `revalidate`, parseo ambiguo «5.000», gates de preview por allowlist, APIs de AR y `llms.txt` bloqueados en calcularya, 404 sin import interno de Next, mapa explícito de loaders, tope en `cl/finiquito` |

Los reportes de pausa de cada uno se agregan abajo cuando llegan.

## Al retomar, en orden

1. `git fetch origin`; por cada rama de arriba: si el último commit es `WIP:`, retomar el agente con
   su reporte; si está verde y completo, integrar en `claude/calcularya-intl` (y registrar el país).
2. Con Fix A y Fix B integrados: `check-all`, build, `check_rutas_ar --start`, `check_routing_hosts --start`.
3. Actualizar ADR D2 (`global-not-found`) y este archivo.
4. PR de `claude/calcularya-intl` a `main` con CI verde y preview revisado. Confirmar con Manuel antes
   del merge a producción (cambia la estructura de carpetas de calcular.ar).
5. Activación: `NEXT_PUBLIC_SITIO_INTL_URL=https://calcularya.com` en Vercel (quita la redirección
   temporal), Search Console y AdSense para calcularya.com.
6. Con aprobación de Manuel: hreflang desde calcular.ar (`NEXT_PUBLIC_HREFLANG_AR=1`).

## Decisiones tomadas

- Colombia en tú (la investigación decía usted).
- México: SEGOB (ordenjuridico.gob.mx) e IMSS como fuente primaria de leyes.
- Un país con todo verificado entra como `publicado`; lo no verificado no se publica.
- Nunca se salta un CAPTCHA, Cloudflare o Incapsula: el dato queda `no-verificado`.

## Reportes de pausa
