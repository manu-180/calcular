# Arabia Saudita (sa): 59 calculadoras en árabe, publicado

Rama `claude/pais-sa`, creada sobre `claude/mundo-trad-ar` (que ya trae `origin/main`). **Depende de
`claude/mundo-motor-ar` y `claude/mundo-trad-ar`**: el idioma `ar` (motor, rtl, plurales, cifras
latinas) y las 41 universales en árabe tienen que mergearse antes o junto con esta rama.

## Qué incluye

- Mercado `sa`: `ar-SA-u-ca-gregory-nu-latn` (D10: cifras occidentales y calendario gregoriano),
  `trato: "usted"` (registro único del árabe, masculino genérico), SAR con 2 decimales, Asia/Riyadh,
  escala 4, nombre «المملكة العربية السعودية». Publicado al final de `PAISES`, cargadores y medición
  de mercados regenerados (57 mercados). Entra a «Tu sueldo en el mundo» (tasa efectiva 9,7 %).
- 19 calculadoras locales (18 publicadas, 1 en borrador) + 40 universales (la de IVA se cae por la
  local `vat-calculator`). Total 59; publicables 58. Slugs en inglés, como pide D10.

| slug | concepto | estado |
|---|---|---|
| end-of-service-calculator (مكافأة نهاية الخدمة, arts. 84, 85, 87, 80) | indemnizacion-despido | publicada |
| final-settlement (المستحقات النهائية, arts. 84, 88, 111) | liquidacion-final | publicada |
| gosi-calculator (التأمينات, saudí anterior/nuevo y extranjero) | aportes-seguridad-social | publicada |
| salary-calculator (الراتب الصافي) | sueldo-neto | publicada |
| employee-cost-calculator (تكلفة الموظف) | costo-empleador | publicada |
| gosi-pension-calculator (معاش النظام الجديد, arts. 16, 17, 26) | jubilacion | publicada |
| vat-calculator (ضريبة القيمة المضافة 15 %) | iva | publicada |
| zakat-calculator (زكاة المال, guía de ZATCA) | propio | publicada |
| real-estate-transaction-tax (التصرفات العقارية 5 % y المسكن الأول) | propio | publicada |
| annual-leave-calculator (art. 109 y 111) | vacaciones | publicada |
| overtime-calculator (art. 107) | horas-extra | publicada |
| ramadan-working-hours (art. 98) | propio | publicada |
| unfair-dismissal-compensation (art. 77) | propio | publicada |
| notice-period (art. 75 reformado, art. 76) | preaviso | publicada |
| sick-leave-calculator (art. 117) | propio | publicada |
| maternity-leave-calculator (art. 151 reformado) | propio | publicada |
| sar-usd-converter (paridad 3,75) | tipo-de-cambio | publicada |
| inflation-calculator (IPC interanual de GASTAT) | inflacion | publicada |
| dependent-fee-calculator (رسوم المرافقين) | propio | borrador |

- Datos: 24 (27 tramos verificados, 1 no verificado), 1 serie, 1 aviso, 1 novedad. Fuentes primarias
  leídas el 24/10/2026:
  - laws.boe.gov.sa: نظام العمل con la reforma م/44 (vigente desde el 1446/8/20 = 19/2/2025: preaviso
    30/60 días, maternidad 12 semanas, licencia compensatoria por horas extra); نظام التأمينات
    الاجتماعية 1445 (riesgos 2 %, tope 45.000, ساند solo saudíes, fórmula de pensión 2,25 %) y 1421
    (tope 45.000); نظام ضريبة القيمة المضافة (15 %, orden real أ/638).
  - awareness.gosi.gov.sa: tasas del sistema anterior (9 % + 9 %, ساند 0,75 + 0,75, riesgos 2 %) y
    escalonado del sistema nuevo (9 % → 9,5 % 1/7/2025 → 10 % 1/7/2026 → 10,5 % 2027 → 11 % 2028,
    cargado como tramos con fecha).
  - zatca.gov.sa: RETT 5 % desde el 4/10/2020 y apoyo al primer hogar hasta 1.000.000; guía de
    زكاة الأفراد (85 g de oro, 595 g de plata, 2,5 %).
  - sama.gov.sa: paridad oficial 3,75 SAR por dólar.
  - stats.gov.sa: IPC de septiembre de 2026, +1,9 % interanual.
- No verificado: `sa.dependent-fee` (400 SAR por acompañante): الجوازات y my.gov.sa responden 403;
  solo lo vimos en prensa. La calculadora queda en borrador.
- Detectores (probados con `correr.ts --mercado sa`): `sa.boe-nizam-alamal`,
  `sa.boe-social-insurance` y `sa.boe-vat` (reformas nuevas en la ficha de هيئة الخبراء, con
  `tlsTolerante`), `sa.gosi-awareness-rates` y `sa.zatca-rett` (vigilan que las cifras sigan en la
  página): los cinco «sin-novedad». `sa.gastat-cpi` es manual (el boletín es un PDF con nombre nuevo
  cada mes y la página que lo lista se arma con JavaScript).
- Infra compartida: intermedio `DigiCert Global G2 TLS RSA SHA256 2020 CA1` en
  `scripts/datos-paises/certs/` y `certs-embebidos.ts` regenerado (laws.boe.gov.sa no manda la cadena;
  sin él los tres detectores de boe salían «fuente-caida»).

## Decisiones

- El extranjero solo aporta al ramo de riesgos laborales (2 % a cargo del empleador); pensión y ساند
  son para saudíes (ley 1445: pensión para «جميع العمال السعوديين», riesgos art. 28 para todos los
  trabajadores, ساند art. 43 solo saudíes). Base de aporte: básico + vivienda.
- Años de servicio = días corridos ÷ 365; sueldo diario = mensual ÷ 30 (art. 2: el mes es de 30 días).
- La زكاة pide el precio del gramo a la persona: no hay serie oficial saudí de oro o plata. No suma
  créditos ni resta deudas porque la guía de ZATCA no lo trata.
- La inflación usa la tasa interanual (GASTAT no publica el índice mensual en una tabla legible) y
  `maxAntiguedadDias` 90 porque el boletín sale a mediados del mes siguiente.
- Ramadán pregunta si la empresa usa el criterio diario (6 h) o semanal (36 h) en vez de mezclarlos.
- La fecha hégira se escribe «1446/2/8 للهجرة»: la regla de texto toma el tatweel de «هـ» como adorno.
- No entraron: نطاقات (los rangos dependen de la actividad y el tamaño, no se sostiene con un dato
  oficial simple), المقابل المالي sobre trabajadores extranjeros (sin fuente oficial legible),
  salario mínimo (no hay uno general).

## Checks (corridos el 24/10 con sa publicado)

- tsc sin errores; check_paises sa OK (24 datos, 59 calculadoras); check_paises_casos sa OK (76
  casos en 19 archivos); check_textos_paises sa OK (825 textos, 0 avisos); check_fronteras OK (7675
  archivos); check_eol OK (8347); check_motor --generar-cargadores OK (2353 pruebas);
  check_medicion_mercados --escribir OK (57 mercados); check_seo_intl OK (7684 páginas);
  check_mundo OK (sa incluido); check_datos_paises OK (89 pruebas).
- check_hreflang: 924 fallas, todas del clúster de inflación por au/nz/sg/hk/my/ph, que no listan las
  mismas páginas que el resto; sa suma 24 líneas como cualquier otro país del clúster (el mismo
  problema que vio tn con 900). Ajeno.
- check_ofertas_intl: 15 fallas, todas de cl (sueldo-liquido y finiquito, tope en UF). Ajeno.
- check-all: 148/150 suites verdes; fallan check_hreflang y check_ofertas_intl solo por lo de arriba.

## Pendientes y riesgos

- **Revisión de un hablante nativo pendiente**: todos los textos (contenido, etiquetas, errores,
  observaciones, aviso y novedad) están en árabe estándar moderno escrito por el agente; conviene que
  un saudí los lea antes de promocionar el país, sobre todo títulos y FAQ.
- `sa.dependent-fee`: leer el monto en una fuente oficial (absher, الجوازات o my.gov.sa) y pasar
  `dependent-fee-calculator` a publicada.
- Serie `sa.cpi-yoy`: cargar a mano el punto de octubre cuando salga el boletín (mediados de
  noviembre); vence el 30/11/2026.
- El aviso de alcance (`sa.labour-law-scope`) aplica a las calculadoras laborales.
- No se miró en `next dev` (Turbopack rechaza la junction de node_modules y no se hizo `npm ci`) ni se
  corrió el build.
- `src/paises/index.ts` y los cargadores generados van a chocar con otras ramas (eg en paralelo):
  regenerar al mergear.
- Sin push ni PR (sin permiso de escritura); sin credenciales de Supabase, Vercel ni PayPal.

## Merge de las universales ar al día (24/10, tarde)

`7cdfb46c` mergea `claude/mundo-trad-ar` en `88bc6692` (universales ar sobre el motor ar puesto al día
con main 7d190a68: calendario, horas, rankings, sueldos reales y afiliados en árabe, rtl de las hojas
nuevas, coma árabe en las uniones armadas por código, zz-ar en `ar-001`). Sin conflictos; los
generadores no cambiaron nada (sin commit aparte).

- `check_motor --generar-cargadores`: 2353 pruebas OK · `check_medicion_mercados --escribir`: 57
  mercados · `gen_idiomas_universales`: 0 index reescritos
- `npx tsc --noEmit -p .`: OK
- `check_paises sa`: 24 datos, 1 serie, 59 calculadoras, publicado, 0 avisos
- `check_paises_casos sa`: 76 casos en 19 archivos · `check_textos_paises sa`: 825 textos, 0 avisos
- `check_seo_intl`: 7684 páginas intl OK · `check_universales`: 41 universales, 4664 casos
- `check_hreflang`: 1924 fallas, todas del clúster de inflación (inflation-calculator, ipc,
  correcao-pelo-ipca, teuerungsrechner y sus pares); 74 tocan `/sa/inflation-calculator` por estar en
  ese clúster. Ninguna de zz-ar ni de las páginas nuevas en árabe. Falla conocida de main.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
