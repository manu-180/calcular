# Estado de calcularya.com (multi-país)

Última actualización: 2026-10-07 17:45 (pausa pedida por Manuel; se retoma ~19:45).

## Rama de integración

`claude/calcularya-intl` (pusheada). Todo lo integrado vive acá; `main` todavía no tiene nada de intl.
calcular.ar no cambia: foto de 244 URLs idéntica (`scripts/check_rutas_ar.ts --start`).

## Hecho e integrado

| Pieza | Rama de origen | Estado |
|---|---|---|
| Enmienda del ADR (todos los países, series en repo, sin cobro intl) | — | `docs/adr/0001-enmienda-2026-10-07.md` |
| F1: foto de rutas AR + AR movido a `src/app/(ar)` (`global-not-found` experimental) | `claude/intl-f1-mover-ar` | integrado |
| F2: motor `src/motor/**`, contrato, `zz`, checks, `docs/paises/RECETA.md` | `claude/intl-f2-motor` | integrado |
| F4: runner `scripts/datos-paises/**`, semáforo, `.github/workflows/datos-paises.yml`, `PAISES_TOLERANTE=1` en datos-vivos | `claude/intl-f4-datos` | integrado |
| Chile `cl`: 11 calculadoras, 34 tramos verificados | `claude/intl-pais-cl` | integrado y registrado |
| Colombia `co`: 14 calculadoras, 29 verificados, 1 no verificado (FSP 2027) | `claude/intl-pais-co` | integrado y registrado |
| México `mx`: 14 calculadoras, 49 verificados | `claude/intl-pais-mx` | integrado, registrado, `publicado` |
| Perú `pe`: 12 publicables, `sueldo-neto` en borrador (SBS con CAPTCHA) | `claude/intl-pais-pe` | integrado y registrado |
| Uruguay `uy`: 11 calculadoras, 32 verificados, voseo | `claude/intl-pais-uy` | integrado y registrado |

## En curso al pausar (cada agente commitea WIP en su rama)

| Frente | Rama |
|---|---|
| F3 plataforma: `src/app/(intl)`, ruteo por host, SEO, UI premium, `/api/geo` | `claude/intl-f3-plataforma` |
| Ecuador | `claude/intl-pais-ec` |
| República Dominicana | `claude/intl-pais-do` |
| Costa Rica | `claude/intl-pais-cr` |
| Guatemala | `claude/intl-pais-gt` |
| Paraguay | `claude/intl-pais-py` (sin trabajo propio todavía: arranca de cero) |

Dónde quedó cada uno (reportes de pausa):

- **F3** `30aa18c` (WIP): todo construido; `check-all` 129/129 y `check_routing_hosts` 31/31 sobre un
  build anterior. Hallazgo: Next 16 no parte el JS por `import()` desde un Server Component; lo arregló
  con `CalculadoraDiferida` + regla `turbopack.rules` que vacía los `*.cliente.tsx` en el servidor.
  Falta: rebuild y `check_rutas_ar --start` (`CALCULAR_HOY=2026-10-07`), build con la variable intl y
  `check_routing_hosts --start`, Lighthouse con la máquina libre (script `lh.mjs` en su scratchpad),
  quitar el WIP. Mobbin y 21st no estaban conectados: el diseño es criterio propio. Activar en
  producción: `NEXT_PUBLIC_SITIO_INTL_URL=https://calcularya.com`; hreflang con AR detrás de
  `NEXT_PUBLIC_HREFLANG_AR=1`.
- **Ecuador** `bb552cc` (verde, 11 calculadoras, `interno`): falta probar los 4 detectores contra la red
  (`scripts/paises/ec/probar_detectores.ts`, copiando el de Chile). Después integrar.
- **Dominicana** `3e3bd8f` (WIP, sin compilar): datos, series, 11 calculadoras, casos y detectores
  escritos. Faltan avisos, novedades, los 11 textos, `index.ts`, checks y detectores.
- **Guatemala** `38429ac` (WIP): solo `scripts/paises/gt/NOTAS-RETOMA.md` con todo lo verificado y el
  plan (11 calculadoras, usted, regiones ce1/ce2, Decreto 13-2026). Falta el código entero.
- **Paraguay**: sin trabajo propio; arranca de cero.

Al retomar: `git fetch origin` y mirar el último commit de cada rama. Si dice `WIP:`, relanzar un
agente sobre esa rama con el reporte de pausa como contexto. Si está verde y completo, integrar.

## Falta lanzar

El Salvador, Panamá, Honduras, Nicaragua, Bolivia, Venezuela (con `docs/paises/BRIEF-AGENTE-PAIS.md`).

## Pendientes de coordinador (después de F3, que toca el motor)

1. Motor: decimales por moneda y por serie (COP y CLP sin decimales, UF con 2, UI con 4). Hoy los
   marcadores salen con «,00» o sin centavos; varios países sacaron marcadores de los textos.
2. Perú: verificar aportes y comisiones AFP y RMA en otra fuente oficial (SBS pide CAPTCHA) para
   publicar `sueldo-neto`.
3. ADR D2: actualizar la decisión sobre `global-not-found` (se usó; el spike no vio el `<html>`
   anidado).
4. Revisión final: `code-reviewer` + `security-auditor`, build, Lighthouse, check-all.
5. Merge a `main` y activación: `NEXT_PUBLIC_SITIO_INTL_URL=https://calcularya.com` en Vercel (eso
   quita la redirección temporal a calcular.ar), Search Console y AdSense para calcularya.com.
6. Con aprobación de Manuel: hreflang desde las páginas de calcular.ar hacia sus equivalentes.

## Decisiones tomadas en la sesión

- Colombia en tú (la investigación decía usted): es lo habitual en la web colombiana para público general.
- México: el texto de leyes de SEGOB (ordenjuridico.gob.mx) y del IMSS cuenta como fuente primaria,
  porque diputados.gob.mx no responde.
- Un país con todo verificado entra como `publicado`; lo no verificado no se publica.
