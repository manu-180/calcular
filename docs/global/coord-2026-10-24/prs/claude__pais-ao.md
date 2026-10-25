# Angola (ao): 20 calculadoras locales en portugués de Angola y publicación

Rama `claude/pais-ao` (sobre el WIP de datos y la calculadora de IRT, con `origin/main` mergeado sin
conflictos). No depende de ningún motor sin mergear.

## Qué incluye

60 calculadoras: 20 locales + 40 universales (la universal de IVA cae sola porque hay una local
de concepto `iva`). Todas las locales en `publicado`, ninguna en borrador.

| Slug | Concepto | Base legal |
|---|---|---|
| calcular-irt | impuesto-renta | Tabla del Grupo A, Lei 14/25 (OGE 2026), anexo I |
| salario-liquido | sueldo-neto | INSS 3 % + IRT; subsidios de alimentación y transporte no sujetos hasta 30 000 Kz (AGT) |
| seguranca-social-inss | aportes-seguridad-social | DP 227/18, arts. 12 y 13 (3 %, 8 %, reformado 8 %; férias fuera de la base) |
| custo-do-trabalhador | costo-empleador | INSS 8 % + subsidios de férias y Natal mínimos |
| salario-minimo | salario-minimo | DP 152/24 (100 000 Kz desde 15/9/2025; micro y startups 50 000) |
| subsidio-de-ferias | propio | LGT art. 238 (mínimo 50 %, proporcional) |
| subsidio-de-natal | bono-semestral | LGT art. 238 |
| dias-de-ferias | vacaciones | LGT arts. 204 y 205 |
| horas-extraordinarias | horas-extra | LGT arts. 185, 188 y 237 n.º 7 (salário-hora) |
| trabalho-nocturno | propio | LGT arts. 179 y 182 (20 %) |
| compensacao-por-despedimento | indemnizacion-despido | LGT arts. 307 a 311 |
| aviso-previo | preaviso | LGT arts. 286 y 305 |
| calcular-iva | iva | 14 %, Portal do Contribuinte de la AGT |
| imposto-predial | propio | Cuadro de la AGT (detención), terreno 0,6 %, +50 % desocupado |
| imposto-predial-rendas | propio | 25 % sobre la renta menos 40 % |
| calcular-sisa | propio | Transmisión 2 %; vivienda exenta hasta 40 M y a la mitad hasta 100 M (Lei 14/25, art. 27) |
| cambio-kwanza | tipo-de-cambio | Series USD y EUR de referencia del BNA (venta) |
| atualizar-valor-inflacao | inflacion | IPCN del INE (dic. 2020 = 100), 2015-01 a 2026-09 |
| irt-grupo-c | regimen-simplificado | Lei 14/25, art. 21 (6,5 % hasta 10 M; agrícolas 10 %) |
| contribuicao-cambial | propio | CEOC, Lei 14/25, art. 16 (2,5 % y 10 %) |

Datos: 46 datos con 47 tramos verificados y 0 pendientes; 3 series (ao.usd, ao.eur, ao.ipc).
Nuevos verificados en esta tanda: IVA 14 % y subsidios no sujetos a IRT (páginas de la AGT en
portaldocontribuinte.minfin.gov.ao), agravamento de 50 % del Imposto Predial y fuentes de todo el
Imposto Predial apuntando a la página de la AGT que se leyó, límites de horas extra (40/mes,
200/año) y 52 semanas del salário-hora (LGT), serie del IPCN (Excel del INE). Se releyeron en la
fuente la LGT, el OGE 2026, el DP 152/24 y el DP 227/18.

Detectores: series USD y EUR del BNA (API JSON, banda diaria del 10 %). Novedades: isención de IRT
hasta 150 000 Kz, CEOC y exención de vivienda en 2026.

## Decisiones

- Trato: se mantiene `usted`. En pt el motor lo resuelve como registro impersonal; los textos usan
  la 3.ª persona de cortesía («indique», «o seu salário»), que es como escriben la AGT, el INSS y
  los bancos en Angola. Con `tu` el sitio saldría con «você» del pt-BR. check_textos_paises no tiene
  reglas de registro para pt, así que acepta las dos opciones.
- Ortografía angoleña (sin el Acordo de 1990): «colectável», «efectiva», «actualizar», «factura».
- Aviso prévio: los días en falta valen salario/30 (el aviso es de un mes).
- Año de admisión con 12 meses: se pide elegir «ano completo» (la ley no fija tope y daría 24 días).
- IPCN sin detector: el índice sale en un .xlsx que el Http del cron no lee. maxAntiguedadDias 100.

## Checks (corridos con el país registrado y publicado)

- check_paises ao: OK (60 calculadoras, 0 pendientes, 1 aviso de vencimiento de la serie del BNA,
  que se renueva sola con el detector).
- check_paises_casos ao: 68 casos en 20 archivos OK.
- check_textos_paises ao: 831 textos OK.
- check_fronteras OK (7588 archivos), check_eol OK, check_seo_intl OK (7644 páginas),
  check_mundo OK (AO entra por inferencia; escalones de la ley en el salto del IRT a 150 000 Kz),
  check_motor --generar-cargadores OK (2296 pruebas), check_medicion_mercados --escribir (57
  mercados), tsc OK.
- check-all: 148/150 suites verdes. Fallan dos por motivos ajenos a ao:
  - check_ofertas_intl: 15 fallas en cl/sueldo-liquido y cl/finiquito (diferencias por el valor de la UF).
  - check_hreflang: 924 fallas del clúster de inflación entre au/nz/sg/hk/my/ph y el resto
    (cl, co, mx, kw, tz...). Ya estaban; ao suma 24 líneas solo por entrar al mismo clúster.

## Saltado por falta de credenciales o permisos

- Push y PR (sin permiso de escritura en GitHub). Sin Supabase, Vercel ni PayPal (no hacía falta).
- No se corrió `npm run build` (opcional con check-all corrido).

## Pendientes y riesgos

- Motor: las universales y el sitio en pt solo tienen variante europea para `pt-PT`; en `pt-AO`
  salen en portugués de Brasil. Pedido al motor: tratar pt-AO (y pt-MZ) como pt-PT en
  `esPortugal` y en los parches regionales.
- Actualizar a mano la serie ao.ipc cada mes (o un detector que lea el Excel del INE).
- El commit `publicar ao` choca con otras ramas en `src/paises/index.ts` y en los cargadores
  generados: regenerar al mergear.
- Las reglas de 2026 que vienen del OGE (isención de IRT, CEOC, Grupo C, exención de vivienda)
  tienen `proximaRevision` 2027-01-01: revisar con el OGE 2027.
- La base de la CEOC y el «total» (transferencia + contribución) asumen que se cobra aparte.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
