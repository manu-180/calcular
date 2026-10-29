# Informe del país: Argelia (`dz`, `fr-DZ`) y edición `dz-ar` (`ar-DZ`)

Rama `claude/pais-dz` (base origin/main). Último commit de código: `ac45aa50` (dz-ar). Este informe va en el commit siguiente.
Los dos mercados quedan en `estado: "interno"`. `src/paises/index.ts` no está commiteado: lo registra el coordinador (`dz` y `dzAr`).

## Calculadoras locales (25, todas publicables)

Todas tienen datos verificados en el Journal officiel (joradp.dz, https) con `verificadoEl` 2026-10-27, además de casos y contenido.

| slug | concepto | publicable | fuente principal |
|---|---|---|---|
| calcul-salaire-net | sueldo-neto (declara `mundo`) | sí | LF 2022 art. 104 CIDTA, décret 06-339 (CNAS 9 %) |
| calcul-irg-salaire | impuesto-renta | sí | LF 2022 y LF 2026 (barème, abattement, lissage) |
| calcul-salaire-brut | propio | sí | ídem |
| cotisations-cnas | aportes-seguridad-social | sí | décret 06-339 |
| cout-employeur | costo-empleador | sí | décret 06-339 |
| snmg-algerie | salario-minimo | sí | décret présidentiel 26-01 (24 000 DA) |
| calcul-tva | iva | sí | LF 2017 art. 26 (19 % / 9 %) |
| heures-supplementaires | horas-extra | sí | loi 90-11, ordonnance 97-03 |
| conges-payes | vacaciones | sí | loi 90-11 |
| impot-sur-les-societes | propio | sí | LF 2022 art. 46 (art. 150 CIDTA) |
| calcul-ifu | regimen-simplificado | sí | LF 2024 y LF 2025 |
| vignette-automobile | propio | sí | LF 2025 art. 55 |
| droits-enregistrement | propio | sí | LF 2026 art. 40 |
| irg-revenus-locatifs | propio | sí | LF 2023 art. 5 |
| irg-activites-occasionnelles | retencion-honorarios | sí | LF 2022 |
| calcul-irg-prime | propio | sí | LF 2022 |
| impot-sur-dividendes | propio | sí | LF 2026 art. 11 (10 %) |
| allocation-chomage | propio | sí | décret exécutif 26-87 (18 000 DA) |
| conge-maternite | propio | sí | ordonnance 96-17 (14 semaines, 100 % del neto, 1/30) |
| indemnite-arret-maladie | propio | sí | loi 83-11 art. 14 (1983) y ordonnance 96-17 art. 7-8 |
| capital-deces | propio | sí | ordonnance 96-17 art. 16 (12 salarios, mínimo 12 SNMG) |
| pension-de-retraite | jubilacion | sí | ordonnance 96-18 (2,5 %/año, tope 80 %), loi 16-15 (60/55 años) |
| plus-value-immobiliere | propio | sí | LF 2021 art. 10 (abattement), LF 2022 art. 24 y 31, LF 2025 art. 8, LF 2026 art. 9 |
| plus-value-cession-actions | propio | sí | LF 2025 art. 8, LF 2022 art. 31 (no residentes) |
| impot-interets-epargne | propio | sí | LF 2022 art. 31 (1 % / 10 %) |

Las 7 últimas son de esta sesión. Las 18 primeras venían de los commits anteriores de la rama.

## Universales

Entran 40 con `universales: "todas"`, para un total de 65 calculadoras por mercado. Las universales de mismo concepto que una local (IVA, sueldo neto, jubilación, etc.) se caen solas. No excluí ninguna a mano.

## Edición `dz-ar`

Traduce las 25 locales (textos, mensajes, `traducir` para observaciones armadas con números, contenido en árabe estándar con la terminología del JORADP árabe) más las 40 universales en árabe: 65 calculadoras. Los slugs son los franceses, igual que en `qa-ar`. Las etiquetas de los datos `opcion-dato` (`dz.ibs`, `dz.ifu-taux`, `dz.irg-loyers`, `dz.irg-occasionnelles`) van traducidas en `datos` del index. Revisé en `next dev` que la home y dos calculadoras devuelven 200 y que los marcadores se muestran bien en árabe («14 أسبوعًا», «15‎%‎», «1 جانفي 2026»).

## Datos

47 datos, 47 tramos verificados, 0 no verificados. Los textos de 1983, 1996 y 1997 son PDF escaneados: los leí como imagen en el JO (n.° 28 de 1983, n.° 42 de 1996, n.° 38 de 1997). Las leyes de finanzas de 2021 a 2026 y la ley 16-15 se leyeron en texto.

Descarté la pensión de invalidez: el mínimo del art. 41 de la loi 83-11 (1983) puede estar superado por textos que no pude ubicar.

## Detector

`dz.joradp-derniers-numeros` (carril norma) lee la portada del JORADP y lista los números de los últimos 45 días. Cubre los 47 datos.

- **Prueba real:** con la portada bajada hoy con curl, `npx tsx scripts/paises/dz/probar-detector.ts acc.htm` devuelve los JO n.° 72 a 75 (13 al 25 de octubre de 2026) con su URL de PDF.
- **Corrida local:** `scripts/datos-paises/correr.ts --mercado dz` da `fuente-caida (ETIMEDOUT)`. Desde esta máquina Node no conecta a joradp.dz, aunque curl sí llega al mismo IP y Node llega a otros sitios. Parece un problema del entorno local, no del detector.

## Checks (corridos el 2026-10-27, con dz y dz-ar registrados localmente)

- `npx tsc --noEmit`: 0 errores.
- `check_paises dz`: OK, 47 datos verificados y 65 calculadoras. `check_paises dz-ar`: OK, 65 calculadoras.
- `check_paises_casos dz`: 91 casos en 25 archivos. `check_paises_casos dz-ar`: 91 casos, ningún texto sin traducir ni número distinto.
- `check_textos_paises dz`: 1106 textos, 0 avisos. `check_textos_paises dz-ar`: 784 textos, 0 avisos.
- `check_fronteras`: 12 526 archivos, sin cruces.
- `check_eol`: OK.
- `check_motor`: 4111 pruebas OK.
- `check_mundo`: OK, grilla de 75 países con DZ.

## Riesgos y dudas para el coordinador

1. **Plusvalía inmobiliaria.** Leo «5 % par an à compter de la troisième année» como 5 % al cumplir 3 años, 10 % a los 4, y así hasta 50 % a los 12. Otra lectura posible es 15 % desde el tercer año. Además, no pude revisar las leyes de finanzas complementarias (LFC 2021 y 2022).
2. **Textos de seguridad social de 1983 a 1997.** Maternité, maladie, capital décès y retraite se basan en estos textos. No encontré modificaciones posteriores, salvo la ley 16-15 para la edad de jubilación, pero no tengo un texto consolidado oficial para confirmarlo.
3. **Jubilación.** El usuario ingresa su salario de referencia: no fijo qué años toma la CNR (el art. 13 de 1996 dice los últimos 3 años o los 3 mejores; puede haber cambiado). Tampoco aplico el mínimo de pensión ni las retenciones sobre la pensión.
4. **Indemnización diaria.** Uso el neto mensual ÷ 30 (art. 15, tope de 1/30). La CNAS puede usar el salario de puesto diario exacto.
5. **Formato en `dz-ar`.** Los `ejemplo` escritos a mano muestran decimales con punto, como en `qa-ar`.
6. **`next dev` en este worktree.** Turbopack falla con el junction de `node_modules`: usé `--webpack` y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3112`. Hubo que reiniciar el server para que tomara el registro nuevo.
7. **Push.** Un push dio 403 una vez (credencial de otra cuenta) y funcionó al reintentar.
