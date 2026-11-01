# Palestina (`ps`): informe del agente

- Rama: `claude/pais-ps` (base `origin/main`). Último commit de código: `1311b5c7` (más el commit de este informe).
- Mercado: `ps`, árabe (`ar-PS-u-ca-gregory-nu-latn`, cifras latinas), trato usted, ILS y USD, `Asia/Hebron`, escala 3.5, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **50 calculadoras** = 10 locales (9 publicables y 1 en borrador) + 40 universales (`universales: { todas: true }`).

## Qué fuentes oficiales abrieron (2026-10-29)

| Portal | Resultado |
|---|---|
| mof.gov.ps (وزارة المالية) | Abre. Su página «قوانين و انظمة» publica el texto de قانون العمل رقم 7 لسنة 2000 (`https://mof.gov.ps/wp-content/uploads/documnets/pal_work_law.doc`, leído entero). No publica la ley del impuesto a la renta ni la de VAT. La página de tipos de cambio (`/currency-rates/`) trae la tabla vacía en el HTML. |
| moh.gov.ps (وزارة الصحة) | Abre. Reproduce los arts. 77 a 79 de la ley del trabajo (coinciden con el texto de MoF). |
| pma.ps (سلطة النقد) | Abre, pero es una SPA: los tipos de cambio llegan por una función de Supabase. No la consulté (el entorno lo bloqueó como acceso no previsto). Sin tipo de cambio verificado. |
| mof.pna.ps, pmof.ps, mol.pna.ps, pcbs.gov.ps, dft.pna.ps / dft.gov.ps, ogb.gov.ps | No responden (timeout). `mol.ps` responde con un cuerpo de 1 byte. |
| mjr.ogb.gov.ps (ديوان الفتوى والتشريع, texto de la ley) | 403 por curl y por WebFetch. |
| muqtafi.birzeit.edu | No responde; además es universidad, no cuenta como oficial. |

## Calculadoras locales

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| end-of-service-calculator | propio | sí | arts. 42 (2), 45 y 48 |
| unfair-dismissal-compensation | indemnizacion-despido | sí | arts. 46 y 47 |
| notice-period | preaviso | sí | arts. 29, 35 y 46 |
| final-settlement | liquidacion-final | sí | arts. 42, 45, 46 y 47 |
| annual-leave-calculator | vacaciones | sí | art. 74 |
| overtime-calculator | horas-extra | sí | arts. 68 y 71 |
| sick-leave-calculator | propio | sí | art. 79 |
| maternity-leave-calculator | propio | sí | arts. 103 y 104 |
| salary-deduction-calculator | propio | sí | arts. 83 y 84 |
| minimum-wage | salario-minimo | **no (borrador)** | el valor (1.880 ILS desde 2022, decisión del Consejo de Ministros n.º 4 de 2021) solo se vio en fuentes secundarias |

No construidas por falta de fuente oficial accesible: VAT (16 % según la fila de PAISES.md, sin texto oficial), impuesto a la renta (ley 8 de 2011 y reformas), sueldo neto, tipo de cambio (PMA) e inflación (PCBS). La universal de VAT entra sin tasa fijada (sin ajuste). No hay seguridad social que calcular: no se usó ninguna ley de seguridad social.

## Datos

- **23 datos: 22 verificados, 1 no verificado.** Los 22 verificados salen del texto de la ley del trabajo publicado por وزارة المالية, `verificadoEl: 2026-10-29`, cada uno con el artículo en `nota`.
- No verificado: `ps.minimum-wage` (motivo: el sitio del Ministerio de Trabajo y la Gaceta no abrieron; el valor solo aparece en مركز مسارات y WageIndicator).
- `desde` de los datos de la ley: `2002-01-01`. La ley rige 30 días después de su publicación (art. 141), pero la fecha exacta de publicación no se leyó en fuente oficial: se tomó el primer año completo en vigor y ningún texto muestra esa fecha.
- El archivo de MoF es una copia de 2009. Un قرار بقانون posterior que modifique la ley no se puede descartar contra la Gaceta (no abre). Una búsqueda web no encontró ninguno sobre los artículos usados.
- Novedades: `[]`. No hay un cambio reciente leído en fuente oficial.
- Fórmulas sin divisor en la ley (documentadas en `lib/laboral.ts` y en las observaciones): jornal = sueldo / 30; semana = sueldo × 12 / 52; años de servicio = días / 365.

## Detector (1) y prueba

`ps.mof-labour-law` (norma, html): lee la página «قوانين و انظمة» de MoF y avisa si desaparece el enlace `pal_work_law.doc` o aparece un قرار بقانون sobre la ley del trabajo. Probado con las mismas regex sobre el HTML real del 2026-10-29: valida = sí, enlace presente = sí, reforma = no, así que devuelve `[]`.

## Checks (corridos, con `ps` registrado localmente)

- `npx tsc --noEmit`: sin errores.
- `check_paises ps`: OK, 23 datos (22 verificados, 1 pendiente), 50 calculadoras.
- `check_paises_casos ps`: 36 casos en 10 archivos, OK.
- `check_textos_paises ps`: 500 textos, 0 avisos.
- `check_seo_pais ps`: OK, 0 avisos.
- `check_fronteras`: 14 456 archivos sin cruces. `check_eol`: 15 809 archivos en LF.
- `check_mundo`: OK (ps no tiene sueldo neto).
- `check_motor`: 4688 OK y 1 falla, «forint», que ya falla en main.

## Riesgos y dudas para el coordinador

- Todas las publicables dependen de una sola fuente (la copia de la ley en MoF). Si el coordinador consigue abrir mjr.ogb.gov.ps, conviene confirmar que no hay reformas a los arts. 35, 42, 45 a 47, 68, 71, 74, 79, 83, 84, 103 y 104.
- La ley no se aplica a funcionarios públicos, servicio doméstico ni familiares de primer grado del empleador (art. 3): lo dice el aviso `ps.labour-law-scope`.
- Slugs en inglés, igual que `jo` y `sa` (la búsqueda árabe no entra en ASCII).
- Tono: neutro y factual, sin contenido político. Gaza y Cisjordania no se distinguen (la ley 7/2000 es una sola).
