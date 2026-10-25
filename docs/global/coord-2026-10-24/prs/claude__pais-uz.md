# País uz: Oʻzbekiston en uzbeko latino (60 calculadoras, 19 locales, publicado)

**Depende de `claude/mundo-motor-uz`** (motor uzbeko, ADR 0002 D16, sin mergear). La rama se creó con
`git checkout -b claude/pais-uz claude/mundo-motor-uz` y después se mergeó `origin/main`. Hay que
mergear primero el motor uz (o este PR lo trae entero).

## Qué incluye

Mercado `src/paises/uz/` (codigo `uz`, pais `UZ`, idioma `uz`, locale `uz-UZ`, trato `usted` según D16
(«Siz», imperativo en -ing), moneda UZS redondeada al soʻm, escala 12000, nombre «Oʻzbekiston», zona
Asia/Tashkent), publicado en el commit `publicar uz` (estado `publicado`, alta al final de `PAISES`,
cargadores y medición regenerados). Escritura latina con U+02BB y U+02BC, sin cirílico; slugs ASCII.

19 calculadoras locales (18 publicadas, 1 en borrador):

| slug | concepto | estado |
|---|---|---|
| ish-haqi-kalkulyatori | sueldo-neto (JShDS 12 %, INPS dentro del impuesto, ijtimoiy soliq del empleador; entra en «Tu sueldo en el mundo») | publicado |
| sof-ish-haqi-hisoblash | propio (neto a bruto) | publicado |
| ijtimoiy-soliq-kalkulyatori | costo-empleador (12 % y 25 % budjet) | publicado |
| daromad-soligi-kalkulyatori | impuesto-renta (rezident/norezident, dividendos) | publicado |
| eng-kam-ish-haqi | salario-minimo (MHTEKM, parcial) | publicado |
| bhm-kalkulyatori | conversor-unidad (BHM ↔ soʻm para multas y tasas) | publicado |
| otpusknoy-hisoblash | vacaciones (promedio ÷ 25,3, sin domingos, feriados fijos alargan) | publicado |
| ortacha-ish-haqi-hisoblash | propio (257-modda) | publicado |
| kasallik-nafaqasi | propio (régimen nuevo desde 1/7/2026: 60/80 %, +20, −10 tras 77 días, tope 10 MHTEKM, 182 días) | publicado |
| dekret-puli-hisoblash | propio (homiladorlik va tugʻish, 126/140 días, 75/85/100 %) | publicado |
| ishdan-boshatish-nafaqasi | indemnizacion-despido (50 a 200 % por antigüedad) | publicado |
| ogohlantirish-muddati | preaviso (14 días, 2 meses, 2 semanas, 3 días) | publicado |
| ortiqcha-ish-vaqti | horas-extra (1,5 dos primeras horas, 2 el resto, descanso y noche) | publicado |
| aylanma-soligi-kalkulyatori | regimen-simplificado (4/2/1 %, 1 % YTT 2026, tope 1 mlrd) | publicado |
| mol-mulk-soligi-kalkulyatori | propio (0,36 a 1,5 %, base mínima 42 mln, exención 60 kv.m) | publicado |
| yer-soligi-kalkulyatori | propio (tasas base por región y zona de Toshkent) | publicado |
| inflyatsiya-kalkulyatori | inflacion (IPC de stat.uz) | publicado |
| depozit-kalkulyatori | plazo-fijo (sin impuesto, 378-modda) | publicado |
| valyuta-kalkulyatori | tipo-de-cambio | **borrador**: cbu.uz no responde desde fuera de Uzbekistán |

- 41 universales en uzbeko con `universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "uz.qqs" } }] }`
  (QQS 12 % verificado, la universal `qqs-kalkulyatori` usa el dato del país).
- SEO propio por página con las búsquedas uzbekas: «ish haqi hisoblash», «otpusknoy hisoblash»,
  «BHM 2026», «eng kam ish haqi 2026», «kasallik nafaqasi (bolnichniy)», «dekret puli hisoblash»,
  «aylanma soligʻi», «mol-mulk soligʻi», «yer soligʻi», «depozit kalkulyatori».
- `series.json`: `uz.cpi` (IPC mensual MIIT-2018 encadenado, dic. 2020 = 100, hasta 2026-09).
  `avisos.json` (1: coeficientes locales), `novedades.ts` (4), `fuentes.ts` (5 detectores) y
  `scripts/paises/uz/probar_detectores.ts` (corrido contra la red real: los 5 responden; IPC 70
  puntos con último 2026-09-01 = 164,7551; los 4 de normas parsean el buscador de lex.uz, 0 hallazgos
  posteriores al 24/10).

## Datos

23 datos, 24 tramos verificados el 24/10/2026 en fuentes primarias, 1 no verificado.

- lex.uz: Soliq kodeksi (redacción vigente 21/10/2026; la futura del 12/12/2026 no cambia los
  artículos usados): 258 (QQS), 381-382 (JShDS), 385 (INPS dentro del impuesto), 378 (depósitos
  exentos), 369 (prestaciones), 405 (ijtimoiy soliq), 420-423 (mol-mulk), 437 (yer soligʻi), 461 y
  467 (aylanma, OʻRQ-1108). Mehnat kodeksi (redacción 15/10/2026): 160, 165, 173, 188-190, 208,
  217, 221, 231, 233-234, 245, 257-258, 262-264. PF-115 del 23/06/2026 (MHTEKM 1 360 000 y BHM
  440 000 desde 1/9/2026). VM 796 del 17/12/2025, 4-ilova (prestaciones del seguro social).
  OʻRQ-1095 (horas extra, vigente desde la publicación del 12/11/2025).
- president.uz: decreto del 3/6/2025 (MHTEKM 1 271 000 y BHM 412 000 desde 1/8/2025).
- stat.uz (api.siat.stat.uz, dataset 1.11.01.0002): IPC mensual.
- No verificado: `uz.kurs-usd` (cbu.uz y su JSON rechazan la conexión desde fuera del país, también
  por WebFetch). Por eso `valyuta-kalkulyatori` queda en borrador y no hay detector de kurs.
- No hecho por falta de fuente leída: asosiy stavka del CBU (mismo bloqueo), davlat boji (ley con
  muchas tasas, no verificada), tasa INPS (0,1 %: solo en prensa; no cambia el neto porque sale del
  12 %), compensación de vacaciones no gozadas (la regla de domingos sobre días sin fecha no está
  clara en el 234).

## Decisiones

- Las hayit (fecha lunar por decreto anual) no se cargan: la licencia avisa y kasallik las pide
  como dato del usuario; los feriados fijos del 208 se cuentan solos.
- Día de descanso con sueldo mensual: una vez la tarifa aparte del sueldo (texto del 263); con
  tarifa horaria, el doble. Noche: se muestra solo el 0,5 adicional.
- El impuesto a la tierra no se prorratea por meses (no lo leí en el 439); el de bienes sí (423).
- El promedio por debajo del MHTEKM solo avisa (el piso legal vale para jornada completa).

## Checks (con uz registrado)

- `npx tsc --noEmit -p .`: OK.
- `check_paises uz`: OK (23 datos, 60 calculadoras, estado publicado; aviso: el IPC deja de ser
  publicable si no llega el dato de octubre antes del 15/11, el detector lo trae).
- `check_paises_casos uz`: 64 casos en 18 archivos OK. `check_textos_paises uz`: 829 textos, 0 avisos.
- `check_fronteras`: 7741 archivos OK. `check_eol`: 8576 archivos en LF.
- `check_motor --generar-cargadores`: 2348 pruebas OK. `check_mundo`: OK, UZ entra declarado (12 %).
- `check_medicion_mercados --escribir`: 57 mercados. `check_seo_intl`: 7686 páginas OK.
- `check_ofertas_intl uz`: OK.
- `check_hreflang`: 1978 fallas, todas del clúster de inflación (falla conocida de main, arreglada en
  `claude/mundo-arreglos-2026-10-24`); las 86 que nombran /uz/ son todas `inflyatsiya-kalkulyatori`
  en ese clúster, ninguna propia fuera de él.
- `check-all`: 150/155 suites verdes. Fallaron: check_guiones (mío, arreglado en el commit
  siguiente; `check_guiones` solo da OK), check_hreflang (clúster de inflación, ajeno),
  check_ofertas_intl completo (cl/finiquito UF, falla conocida de main), check_mes_en_render
  (src/app/(ar), ajeno al país) y check_panel_sql (tablas ca_sueldos_* de otra rama, ajeno).
- Sin push ni PR (sin permiso); sin Supabase/Vercel/PayPal. No se corrió `npm run build` ni `next dev`.

## Pendientes y riesgos

- **Revisión de un hablante nativo de uzbeko** de todos los textos (contenido, etiquetas,
  observaciones y novedades): están escritos con el vocabulario de soliq.uz, lex.uz y los bancos,
  pero sin revisión humana.
- Kurs del CBU y asosiy stavka: verificar desde una red con acceso a cbu.uz y pasar
  `valyuta-kalkulyatori` a una serie con detector.
- `publicar uz` choca con otras ramas en `src/paises/index.ts` y los cargadores generados: regenerar
  al mergear.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
