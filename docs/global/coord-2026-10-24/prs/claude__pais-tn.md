# Túnez (tn): 59 calculadoras en francés, publicado

Rama `claude/pais-tn`, sobre `origin/main` (merge de los 190 commits atrasados, sin conflictos). No
depende de ningún motor sin mergear (la edición árabe `tn-ar` queda para cuando entre
`claude/mundo-motor-ar`).

## Qué incluye

- Mercado `tn` (fr-TN, vous, TND con 3 decimales, Africa/Tunis, escala 3), publicado al final de
  `PAISES`, cargadores y medición de mercados regenerados (57 mercados).
- 19 calculadoras locales (18 publicadas, 1 en borrador) + 40 universales (la universal de IVA se
  cae por la local `calcul-tva`). Total 59; publicables 58.

| slug | concepto | estado |
|---|---|---|
| calcul-salaire-net | sueldo-neto | publicada |
| calcul-salaire-brut | propio | publicada (nueva) |
| calcul-irpp-salaire | impuesto-renta | publicada |
| bareme-irpp | propio | publicada |
| impot-sur-pension | propio | publicada |
| cotisations-cnss | aportes-seguridad-social | publicada |
| cout-employeur | costo-empleador | publicada |
| calcul-tva | iva | publicada |
| impot-sur-les-societes | propio | publicada |
| heures-supplementaires | horas-extra | publicada |
| conges-payes | vacaciones | publicada |
| indemnite-fin-de-service | indemnizacion-despido | publicada (pasó de borrador) |
| indemnite-licenciement-abusif | propio | publicada (nueva) |
| delai-de-preavis | preaviso | publicada (nueva) |
| periode-d-essai | propio | publicada (nueva) |
| conge-maternite | propio | publicada (nueva) |
| allocations-familiales | propio | publicada (nueva) |
| cotisations-travailleur-non-salarie | propio | publicada (nueva) |
| smig-tunisie | salario-minimo | borrador |

- Datos: 30 (32 tramos verificados, 2 no verificados). Fuentes: jibaya.tn (DGI: códigos IRPP/IS y
  TVA 2026, recueil), finances.gov.tn (LF 2026, JORT n° 148), cnss.tn (salariados, asignaciones
  familiares, no asalariados T2 2026), social.gov.tn (code du travail, loi n° 2025-9, loi n° 2024-44).
- Detectores (carril norma, probados con `correr.ts --mercado tn`: 3 sin novedad):
  `tn.finances-lois-de-finances`, `tn.social-legislation` (PDF nuevos en /ar/legislations) y
  `tn.cnss-bareme-non-salaries` (lee el trimestre desde el que rige el baremo; con fecha simulada
  devuelve el hallazgo del 2.º trimestre de 2026). Ninguno necesitó `tlsTolerante`: el portal con
  TLS roto del plan (impots.finances.gov.tn) redirige a http y no se usa.
- 4 novedades, contenido SEO por página (title, description, h1, FAQ, glosario) con las búsquedas
  de Túnez: calcul salaire net Tunisie, IRPP, CNSS, SMIG, TVA Tunisie, indemnité de licenciement,
  préavis, période d'essai, congé maternité, allocations familiales.

## Checks (corridos el 24/10 con tn publicado)

- tsc sin errores; check_paises tn OK (30 datos, 59 calculadoras); check_paises_casos tn OK (53
  casos en 18 archivos); check_textos_paises tn OK (781 textos, 0 avisos); check_fronteras OK (7581
  archivos); check_eol OK; check_motor --generar-cargadores OK (2295 pruebas); check_seo_intl OK
  (7640 páginas en los dos modos).
- check_hreflang: 900 fallas, ninguna de tn; todas en los clústeres de inflación de cl y kw (series
  de otros mercados).
- check_ofertas_intl: las 2 fallas de tn (neto con tres decimales en los casos del bruto) quedaron
  arregladas; quedan 15 de cl (sueldo-liquido y finiquito, tope en UF), ajenas.
- check-all: 148/150 suites verdes; fallan check_hreflang y check_ofertas_intl solo por lo ajeno de arriba (cl y kw).

## Pendientes y riesgos

- SMIG en borrador: el décret n° 2026-67 (JORT del 30/04/2026, efecto 1/1/2026) no está en
  social.gov.tn e iort.gov.tn no responde por HTTPS. El baremo CNSS de no asalariados del T2 2026
  implica un SMIG horario de 2,667 dinares (48 h). Manuel: leer el JORT, cargar los montos 2026 en
  `tn.smig-mensuel` y `tn.smig-horaire` como verificados y pasar `smig-tunisie` a publicada.
- jibaya.tn no respondió en esta sesión (se usaron las lecturas del 23/10). Por eso no entraron
  retenue à la source ni droits d'enregistrement.
- La ficha de asignaciones familiales de la CNSS es de 2016 (montos sin cambios conocidos).
- Motor: un monto en TND con tres decimales (1544.136) no sobrevive el viaje al formulario en fr-TN
  («Écrivez-le sans virgules»). Afecta a cualquier mercado con 3 decimales; conviene revisar
  `parsearNumero` para fr-TN.
- Edición tn-ar: espera el motor árabe.
- `src/paises/index.ts` y los cargadores generados van a chocar con otras ramas: regenerar al mergear.
- Sin push ni PR (sin permiso de escritura); sin `next dev` ni build.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
