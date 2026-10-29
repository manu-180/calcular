# Cabo Verde (`cv`): informe del agente

- Rama: `claude/pais-cv` (base `origin/main`). `src/paises/index.ts` no se commitea (lo registra el coordinador).
- Mercado: `cv`, portugués (`pt-CV`), CVE, `Atlantic/Cape_Verde`, `estado: "interno"`, escala 100, trato `usted` (como indica PAISES.md y como lo resolvió Angola).
- Total: **54 calculadoras** = 14 locales (13 publicables, 1 borrador) + 40 universales (`universales: { todas: true }`; la de IVA universal se cae sola porque hay `calcular-iva` local).
- Los textos usan «indemnização», «noturno», «escudo» y vocabulario de Cabo Verde (IRPS, INPS, retribuição mínima mensal garantida), no el de Portugal ni el de Angola.

## Calculadoras locales

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| salario-liquido | sueldo-neto (declara `mundo`) | sí | Código del IRPS art. 71, Portaria Conjunta 28/2024 |
| calcular-irps | impuesto-renta | sí | Código del IRPS art. 71 (n.º 4, 7, 8) |
| contribuicoes-inps | aportes-seguridad-social | sí | Portaria Conjunta 28/2024 |
| custo-do-trabalhador | costo-empleador | sí | ídem |
| salario-minimo | salario-minimo | sí | Lei 45/X/2024 art. 14 (Decreto-Lei 6/2014 art. 4) |
| calcular-iva | iva | sí | Código del IVA art. 17; Lei 69/X/2025 art. 84 |
| horas-extraordinarias | horas-extra | sí | Código Laboral arts. 161, 207, 209, 210 |
| trabalho-noturno | propio | sí | Código Laboral arts. 169, 174, 209, 210 |
| trabalho-em-feriado | propio | sí | Código Laboral arts. 65, 208, 209 |
| dias-de-ferias | vacaciones | sí | Código Laboral arts. 52, 53, 56 |
| indemnizacao-por-despedimento | indemnizacion-despido | sí | Código Laboral arts. 224 y 238 (DL 1/2016) |
| aviso-previo | preaviso | sí | Código Laboral arts. 222, 237, 243 |
| liquidacao-final | liquidacion-final | sí | Código Laboral art. 62 |
| euro-escudo | tipo-de-cambio | no (borrador) | paridad 110,265 sin fuente primaria leída |

## Datos

- 32 tramos verificados y 1 no verificado, todos con `verificadoEl: 2026-10-29`. Fuentes primarias: Boletim Oficial (boe.incv.cv, PDF descargado y leído, con las fórmulas del IRPS leídas sobre la imagen de la página) e INPS (inps.cv, para la fecha de pago).
- Fórmula del IRPS de trabajadores dependientes (14 %, 21 %, 25 % menos parcela, límite de retención 36 607, mínimo 100): leída en la republicación del Código del IRPS (BO n.º 10 de 2 de febrero de 2021, art. 71) y en la Lei 20/IX/2017. La página de la DNRE (mf.gov.cv) la sigue citando como la vigente.
- No verificado: `cv.euro-paridade` (110,265 CVE por euro). bcv.cv devolvió 503 y error de certificado en esta sesión. La calculadora `euro-escudo` queda en borrador.
- Descartados sin cargar: IRPS anual (tramos 16,5 / 23,1 / 27,5 %, deducciones: no leí si cambiaron después de 2021), IRPC (el Orçamento 2026 parece cambiar la tasa, no lo leí entero), impuestos sobre inmuebles, series de cambio e IPC (sin API leída), tope de la base del INPS (no figura en las páginas leídas).

## Detectores

Ninguno (`detectores: []`). No encontré una API legible del Banco de Cabo Verde ni del Boletim Oficial para el cron, y bcv.cv no abrió. Pedido para el coordinador si se quiere vigilancia: un detector de normas sobre boe.incv.cv.

## Checks (con `cv` registrado localmente)

- `npx tsc --noEmit` (con `NODE_OPTIONS=--max-old-space-size=8192`): sin errores.
- `check_paises cv`: OK, 33 datos (32 verificados, 1 pendiente), 54 calculadoras.
- `check_paises_casos cv`: OK, 46 casos en 13 archivos.
- `check_textos_paises cv`: OK, 644 textos revisados, 0 avisos.
- `check_seo_pais cv`: OK, 2568 calculadoras locales revisadas, 0 avisos.
- `check_fronteras`: OK, 14098 archivos. `check_eol`: OK, 15361 archivos en LF.
- `check_mundo`: OK. Con `estado: "interno"` el país no entra a la grilla (solo entran los publicados). Probado con `estado: "publicado"` local: CV entra como «declarado», 14,8 % / 25,9 % / 31,0 %, PPA 52,98 CVE, 12 pagas.
- `check_motor`: 4595 ok y 1 falla ajena a Cabo Verde (`forint`: «1 234 567,00 Ft» contra «1 234 567 Ft», formato de HUF del ICU de este equipo).

## Riesgos y dudas para el coordinador

- Fórmula del IRPS: leí el art. 71 de la republicación de 2021 y no encontré cambios en los Orçamentos de 2024, 2025 y 2026. No leí los de 2022 y 2023 ni el resto de normas posteriores a 2021.
- IVA 15 %: leído en la republicación del Código del IVA de enero de 2015. Los Orçamentos de 2024 a 2026 no tocan la tasa normal; los de 2021 a 2023 no los leí (hubo tasas temporales en turismo y restauración).
- IVA de 8 % en electricidad y agua: viene del Orçamento 2026 y la ley no dice fecha de fin; el dato no tiene `hasta` y su `proximaRevision` es 2027-01-01.
- Salario mínimo: 17 000$00 sale de la Lei 45/X/2024 art. 14 (que reescribe el art. 4 del DL 6/2014). El mínimo de la función pública (19 000$00 según el gobierno) no se cargó. El Orçamento 2026 solo obliga al Gobierno a promover 25 000$00 desde 2027: va como aviso `info` y novedad.
- Cálculos con convención propia, avisados en pantalla: valor de un día = retribución / 30 (campo editable, la ley no lo fija) y 22 días de férias = un mes de retribución; la fracción de año en la indemnización del despedimento por justa causa objetiva se cuenta proporcional (la ley solo lo dice para el colectivo); el subsídio noturno aplica 25 % a la hora normal de cada hora noturna.
- INPS: la tasa global y sus dos partes salen de la Portaria Conjunta 28/2024 (BO 16/07/2024). No encontré tope de base de incidencia en las páginas leídas.
- Pedido al motor: ninguno.
