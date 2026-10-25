# Corea del Sur (kr): 62 calculadoras en coreano, publicado

Rama `claude/pais-kr` (último commit `3ebee634 publicar kr`). Se basa en `origin/main` (merge en
`0f072b39`, conflictos en `scripts/check_ofertas_intl.ts` y `src/lib/pagos/textos/index.ts` resueltos a
favor de main: `resolver` pasó a `resolverTrato` y la venta ja/ko/zh ya estaba en main). No depende de
ninguna rama de motor.

**Antes de publicar en producción hace falta la revisión de un hablante nativo de coreano** sobre una
muestra de páginas (lo pide `docs/global/ESTADO.md` para ja/ko/zh). Los textos están escritos en 해요체
con las reglas de D8, pero no los revisó una persona coreana.

## Qué incluye

- `src/paises/kr/**`: mercado `kr` (ko-KR, 해요체 con `trato: "usted"`, KRW sin decimales,
  Asia/Seoul, escala 1400, nombre 대한민국), 53 datos con 56 tramos verificados, 3 series del Banco de
  Corea, 4 avisos, 4 novedades y 21 detectores.
- 21 calculadoras locales, todas publicadas, con casos y contenido SEO propio (title, description,
  h1, FAQ de 3 o 4 preguntas, glosario):

| slug | búsqueda en Corea | concepto |
|---|---|---|
| take-home-pay | 연봉 실수령액 계산기 | sueldo-neto (entra en «Tu sueldo en el mundo») |
| social-insurance | 4대보험 계산기 | aportes-seguridad-social |
| minimum-wage | 최저임금 계산기 | salario-minimo |
| weekly-holiday-pay | 주휴수당 계산기 | propio |
| annual-leave | 연차 계산기, 연차수당 | vacaciones |
| overtime-pay | 연장근로수당, 야근수당 | horas-extra |
| severance-pay | 퇴직금 계산기 | indemnizacion-despido |
| retirement-income-tax | 퇴직소득세 계산기 | propio |
| unemployment-benefit | 실업급여 계산기 | propio |
| parental-leave-benefit | 육아휴직 급여 계산기 | propio |
| income-tax | 종합소득세 계산기 | impuesto-renta |
| year-end-tax-settlement | 연말정산 계산기 | propio |
| capital-gains-tax | 양도소득세 계산기 | propio |
| acquisition-tax | 취득세 계산기 | propio |
| gift-tax | 증여세 계산기 | propio |
| inheritance-tax | 상속세 계산기 | propio |
| brokerage-fee | 중개수수료 계산기(복비) | propio |
| jeonwolse-conversion | 전월세 전환율 계산기 | propio |
| deposit-interest | 적금 이자 계산기 | plazo-fijo |
| inflation-calculator | 물가상승률 계산기 | inflacion |
| usd-to-krw | 환율 계산기 | tipo-de-cambio |

- 41 universales en coreano con una línea: `universales: { todas: true, ajustes: [{ id: "iva",
  datos: { tasa: "kr.vat" } }] }`, con el 부가가치세 10 % verificado (부가가치세법 제30조).
- Slugs en inglés (D8: el término en inglés cuando existe; romanización revisada solo en
  `jeonwolse-conversion`, que no tiene equivalente). Sin choques con los slugs ko de las universales.
- Commit `publicar kr`: `estado: "publicado"`, alta al final de `PAISES`, cargadores generados
  (`cargadores/kr.ts`) y medición de mercados regenerada (57 mercados).

## Fuentes (todas primarias, leídas el 24/10/2026)

- 국가법령정보센터 (law.go.kr, API DRF): 소득세법 (제12조, 제47조, 제48조, 제50조, 제51조의3, 제52조,
  제55조, 제59조, 제59조의2, 제59조의4, 제95조, 제103조, 제104조, 제129조, 제146조), 소득세법 시행령
  (제156조, 제160조), 지방세법 (제11조, 제13조의2, 제20조, 제92조, 제103조의13, 제151조),
  농어촌특별세법 y su 시행령, 국민연금법 (제88조 y 부칙 2025.4.2: 4,75 % en 2026, 5 % en 2027),
  국민건강보험법 y su 시행령 (7,19 %), 노인장기요양보험법 y su 시행령 (0,9448 %), 고용보험법 (제40조,
  제45조, 제46조, 제50조, 별표 1) y su 시행령 (제68조, tope 113.500; 제95조, 육아휴직), 징수법 y su
  시행령 (제12조), 근로기준법 (제2조, 제18조, 제55조, 제56조, 제60조) y su 시행령 (별표 1 y 2),
  근로자퇴직급여 보장법 (제4조, 제8조, 제9조), 최저임금법, 상속세 및 증여세법 (제18조 a 제21조,
  제25조, 제26조, 제53조, 제55조, 제56조, 제67조 a 제69조), 민법 제1009조, 공인중개사법 시행규칙
  (제20조, 별표 1 y 2), 주택임대차보호법 y su 시행령 (제9조), 부가가치세법 제30조.
- 고시 en law.go.kr (행정규칙): 2026년 y 2027년 적용 최저임금 고시 (10.320 y 10.700 won, 209 horas;
  PDF oficial leído), 국민연금 기준소득월액 하한액과 상한액 (고시 제2026-31호: 400/6.370 mil hasta
  junio de 2026 y 410/6.590 mil desde julio).
- 한국은행 ECOS (clave pública `sample`): 기준금리 (722Y001), 원/달러 매매기준율 (731Y001) y
  소비자물가지수 2020=100 (901Y009, original de 국가데이터처), de 2000 a septiembre de 2026.

## Checks (corridos con el país registrado)

- `npx tsc --noEmit -p .`: OK.
- `check_paises kr`: OK (53 datos, 56 tramos verificados, 0 pendientes, 3 series, 62 calculadoras). 2 avisos esperados: `kr.base-rate` y `kr.usd-krw` necesitan el cron antes del 24/11.
- `check_paises_casos kr`: 73 casos en 21 archivos, todos OK.
- `check_textos_paises kr`: 1.178 textos, 0 avisos.
- `check_fronteras`: 7.593 archivos OK. `check_eol`: 8.264 archivos en LF.
- `check_motor --generar-cargadores`: 2.297 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_seo_intl` (sin server): 7.648 páginas intl OK en los dos modos.
- `check_mundo`: kr entra declarado (`kr.take-home-pay`, 12 pagas).
- `check_hreflang`: falla, ajeno a kr. Sin kr registrado da 900 fallas, todas del clúster `inflacion` (au, nz, sg, hk, my, ph y otros no listan las mismas páginas); con kr da 1.050, porque `kr/inflation-calculator` entra en ese mismo clúster roto (150 pares). Ninguna falla de kr fuera de ese clúster.
- `check_ofertas_intl`: 15 fallas, todas de Chile (`cl/sueldo-liquido` y `cl/finiquito`, tope en UF de planilla contra calculadora). kr sin fallas; la oferta sale sola por concepto en ko.
- `check-all`: 148 de 150 suites verdes; fallan solo `check_hreflang` y `check_ofertas_intl` por lo de arriba.
- `datos-paises/correr.ts --mercado kr` contra la red: 21 detectores sin error, sin novedades.
- Build y `next dev`: no corridos (opcionales con check-all).

## Decisiones

- 실수령액 y 연말정산: el impuesto se calcula con la fórmula anual del 연말정산 (근로소득공제,
  기본공제, 연금보험료공제, 보험료공제, 근로소득세액공제 con su tope, 자녀세액공제, 표준세액공제), no
  con el 간이세액표 mensual (una tabla de miles de filas). La página lo aclara.
- Los seguros y los impuestos se truncan a 10 won (국고금 관리법 제47조); el 장기요양보험료 sale del
  건강보험료 por el cociente de las dos tasas redondeado a 4 decimales (노인장기요양보험법 제9조).
- 1일 통상임금 = 월 통상임금 ÷ 209 × 8 (las 209 horas del 고시 del salario mínimo).
- 실업급여: el 기초일액 se toma como el 평균임금 de los 3 meses previos. El texto vigente del 제45조 ①
  que devuelve la API ya es la versión que rige desde 2028 (base de 1 año, 부칙 제21473호); la versión
  en vigor hoy no se pudo leer por la API (pide registro), así que esa definición se apoya en el
  근로기준법 제2조 y queda un aviso con el cambio de 2028. Los montos (60 %, 80 %, tope, días) sí
  están verificados.
- 상속세: 일괄공제, 기초공제 + 자녀공제 y 배우자 상속공제 con el tope de la parte legal (1,5 frente a
  1 por hijo, 민법 제1009조). Sin 금융재산공제, 동거주택공제 ni suma de donaciones previas.
- 양도소득세 y 취득세: sin 중과세율 de 다주택, 비사업용 토지, 분양권 ni 감면 (avisos de cautela).
- 4대보험: el 산재보험료율 lo pone la persona (depende del rubro), por defecto 0.
- Detectores: ECOS con la clave `sample` (10 filas por pedido: primero el total, después las últimas
  10) y la API DRF de law.go.kr (`OC=test`): una reforma promulgada después del 24/10/2026 o un 고시
  nuevo es hallazgo. Probados contra la red con `datos-paises/correr.ts --mercado kr`: 21 detectores
  sin error, sin novedades.

## Pendientes y riesgos

- Revisión de un hablante nativo de coreano antes de publicar en producción.
- Sin credenciales: no se hizo push ni PR (la cuenta no tiene permiso), no se probó Vercel ni Supabase.
- `kr.base-rate` y `kr.usd-krw` vencen en 10 y 7 días si el cron no corre: el detector ya está.
- Los detectores de leyes solo ven reformas cuando el buscador las marca como 현행 (al entrar en
  vigor), no al promulgarse.
- `check_hreflang` y `check_ofertas_intl` fallan por cosas ajenas a kr (ver Checks).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
