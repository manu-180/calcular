# Estado de calcularya.com (multi-país)

Última actualización: 2026-10-07 21:00 (segunda pausa). Plan de Manuel para el 8/10: 00:57 se retoma a pleno; 01:57 se empieza a frenar de forma segura (terminar lo que está en curso, nada a medias); 05:57 se retoma con todo y sin frenar.

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

| Frente | Commit | Hecho | Sigue |
|---|---|---|---|
| Nicaragua | `eca8fce` WIP | datos (18 verificados, La Gaceta 43/2026 y Digesto), series BCN hasta 31/12/2026, 10 calculadoras con casos y textos en voseo, detector de La Gaceta | `index.ts`, avisos, novedades, tsc + checks, `probar_detectores`, suavizar dos frases no verificadas (mantenimiento de valor; INSS sobre horas extra) |
| Bolivia | `5cd13cf` WIP | mercado (usted, BOB + USD `$us`), series BCB (TCO y UFV), datos verificados (DS 5516, Ley 843, SIP), libs y 7 calculadoras | contenido de quinquenio, bono de antigüedad, vacaciones, sueldo líquido, RC-IVA, IVA+IT, horas extra (borrador), avisos, novedades, 4 detectores, index, checks |
| Venezuela | `7f8c11d` WIP | `datos.json` (18 verificados: LOTTT, Decreto 4.653, Ley IVA; UT, cestaticket e ingreso integral no verificados) y series BCV USD/EUR | mercado (tú, `simbolos` VES "Bs." y USD "$"), `reglas.ts`, 9 calculadoras (cestaticket en borrador), detector BCV con `tlsTolerante`, avisos, novedades, index, checks |
| Fix B motor | `4915b2e` WIP | #1 build falla con país roto (sin probar), #2 `hoyEn` por zona + `revalidate` (sin probar), #3 parseo «5.000» (verificado, 236 pruebas), #4 a medias | #4 `api/geo` y `api/dev/sitio` (POST), #5 bloquear `/api` y `/og` en intl + `llms.txt` intl, #6 404 propio, #7 mapa de loaders, #8 tope finiquito, verificación completa con dos builds |
| Fix A pipeline | `e917575` WIP | #3 TLS con 5 intermedios en `scripts/datos-paises/certs/` (probado contra la red; van con `git add -f` por `*.pem` en `.gitignore`), #4 redirecciones, #7 `iguales()` en bandas | pruebas de #7, #5 issues (diseño listo), #6 job de issues después de `publicar` (diseño listo), #1 permisos, #2 validar parche (script `.mjs`), #8 tolerancia, #9 `ci.yml` |
