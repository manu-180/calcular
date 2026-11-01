# Mongolia (mn): informe del agente de país, 1/11/2026

Depende de `claude/mundo-motor-mn` (mongol en el motor, ADR 0002 D28): esta rama sale de ese motor sin mergear y no
compila sobre un `main` sin él. Estado `interno`; `src/paises/index.ts` sin tocar.

## Calculadoras

56 en total: 16 locales (14 publicables, 2 en borrador) y 40 universales con `universales: "todas"`.

| Slug | Concepto | Publicable | Por qué |
|---|---|---|---|
| tsalingiin-tootsooluur | sueldo-neto | sí | НДШ, ЭМД, ХХОАТ con tramos y хөнгөлөлт, verificados |
| bokhir-tsever-tsalin | propio | sí | inversa del neto |
| ajil-olgogchiin-zardal-tootsooluur | costo-empleador | sí | ley 18.1, decreto ЭМД |
| dood-tsalin | salario-minimo | sí | decreto n.º 03 de 2024 leído en el escaneo |
| khkhoat-tootsooluur | impuesto-renta | sí | ley 21.1 y 23.1 |
| ndsh-tootsooluur | aportes-seguridad-social | sí | ley 18.1 y 19.4 |
| eeljiin-amraltyn-olgovor | vacaciones | sí | Хөдөлмөрийн хууль 99, 110 |
| iluu-tsagiin-khols | horas-extra | sí | 109 |
| khalagdsany-tetgemj | indemnizacion-despido | sí | 82 |
| ajlaas-garakh-medegdel | preaviso | sí | 79.2, 80.4, 80.5 |
| jiremsnii-tetgemj | propio | sí | ley de тэтгэмж, art. 7 |
| ovchnii-tetgemj | propio | sí | ley de тэтгэмж, art. 3 a 5 |
| valyutyn-khansh | tipo-de-cambio | sí | series de Монголбанк |
| inflyatsiin-tootsooluur | inflacion | sí | índice de 1212.mn |
| tetgever-tootsooluur | jubilacion | no, borrador | la fórmula por salario está leída, pero quien nació desde 1979 usa la cuenta nominal y la ley cambia en 2027: daría un número engañoso a la mayoría |
| ul-khodlokh-khorongiin-tatvar | propio | no, borrador | ley no leída (legalinfo inaccesible); el porcentaje lo fija cada aimag |

Universales: 41 menos ninguna excluida a mano. **НӨАТ queda como la universal `noat-tootsooluur`, sin ajuste de tasa**, porque
el 10 % no se pudo leer en fuente primaria (abajo). Por eso no hice la local: una local en borrador con el mismo concepto
hubiera tirado la universal y el país quedaba sin НӨАТ. Falta la `ajilguidliin-tetgemj`: la tabla vigente en 2026 no se
leyó, solo la de 2027.

## Datos no verificados, con motivo

Todos con el motivo en `datos.json`.

- **`mn.noat` (10 %)**: legalinfo.mn no conecta desde este entorno y mof.gov.mn rechaza la conexión. Solo vi el extracto de
  un buscador y una mención histórica de ТЕГ («дөрвөн арвын зарчим»). Al leerlo: pasar a verificado y sumar el ajuste
  `{ id: "iva", datos: { tasa: "mn.noat" } }`.
- **`mn.ul-khodlokh-khuvi-dood` y `-deed`**: igual, solo extracto de buscador (0.6 a 2 %).
- **`mn.khkhoat` y `mn.khongololt` desde 2027**: reforma del paquete tributario del 26/6/2026, ver riesgos.
- **`mn.hhdh-sar` y `mn.hhdh-tsag` desde 2027** (₮ 1,000,000 y 5952.3): la nota del ministerio (mlsp.gov.mn/content/detail/4164)
  devuelve errores PHP y la fecha solo está en prensa.
- **`mn.emd-*` desde 2027**: el decreto es anual y el de 2027 no salió.

## Fuentes que no son el sitio pedido

legalinfo.mn no responde desde acá (conexión rechazada, por curl, WebFetch y navegador). web.archive.org me marcó como tráfico
abusivo y lo dejé. No usé proxies. mta.mn no resuelve: el dominio real es mta.gov.mn, como dice `PAISES.md`. Lo leído en su lugar:

- ХХОАТ 21.1 y 23.1: evaluación oficial de ТЕГ (2025, mta.gov.mn) que transcribe los artículos, cruzada con los tramos de la
  calculadora de ТЕГ.
- Нийгмийн даатгалын ерөнхий хууль y тэтгэмж: PDF consolidados de ndaatgal.mn (8/2026).
- ЭМД 2 % + 2 %: decreto n.º 01 del 7/1/2026, escaneo en emd.gov.mn, leído a ojo.
- **Хөдөлмөрийн хууль: PDF de 2021 en nczd.gov.mn (organismo oficial, pero el texto originario).** No pude cotejar reformas
  posteriores. El art. 109 lo cotejé con una respuesta del ministerio, los art. 82 y 99 no.

## Registro (D28)

Contrastado: coincide. 1212.mn: «Та тогтмол мэдээлэл авч байхыг хүсвэл ... бүртгүүлнэ үү». mta.gov.mn: «Цалин оруулна уу», «Саналаа
бичнэ үү», botón en «Тооцоолуур». Único matiz: mta.gov.mn pone exclamación en los errores de validación; acá no van, por la regla.

## Decisiones de cálculo que conviene mirar

- La base del ХХОАТ resta НДШ y ЭМД. ТЕГ resta «Нийгмийн даатгалын шимтгэл» con un porcentaje que escribe el usuario: incluir ЭМД es
  mi lectura, no un texto leído.
- ЭМД se calcula sobre el sueldo entero, sin el tope de 19.4: el decreto habla de la remuneración, y la ley de ЭМД no se leyó.
  Solo cambia sueldos por encima de ₮ 7,920,000.
- El empleador paga sin tope hasta 2028: lo deduzco de que el tope (19.5) arranca ahí y de la nota del ministerio. No hay frase que lo
  diga para 2026.
- Días: vacaciones usa promedio / 21 (el reglamento А/191 no se leyó, avisado en pantalla). Maternidad usa 7.3 y 7.4, agregados por
  la ley del 2/7/2026 sin nota de vigencia; días hábiles estimados en 5/7 si no se cargan.
- Prima nocturna: 1.2 en 109.3 se toma como 0.2 adicional al sumarla (109.5).

## Detectores (prueba real: `scripts/paises/mn/probar_detectores.ts`, 1/11/2026)

| Detector | Resultado |
|---|---|
| mn.fx-usd, cny, rub, eur (POST de Монголбанк) | 15 puntos cada uno, último 2026-11-01 |
| mn.ipc-1212, mn.inflyatsi-1212 (PXWeb) | 24 puntos, último 2026-09-01 |
| mn.ndaatgal-laws (WordPress) | responde, 0 hallazgos |
| mn.emd-tolgool (html) | responde, 0 hallazgos |

Los FX y PXWeb necesitan `http.postJson`; sin él devuelven null. La página de ханш de Монголбанк carga reCAPTCHA v3, pero el endpoint de
datos respondió sin token: si lo exigen, el detector devuelve null y el coordinador lo verá. No hay detector de `mn.bodlogyn-khuu` (12.5 %,
leído en la portada con navegador, se pinta con JS): tiene `proximaRevision`.

## Checks (con el país registrado localmente)

`tsc --noEmit` limpio; `check_paises mn` OK (38 datos, 6 series, 56 calculadoras; 2 avisos de series que vencen sin cron);
`check_paises_casos mn` 41 casos en 14 archivos; `check_textos_paises mn` 702 textos, 0 avisos; `check_ofertas_intl mn` OK;
`check_seo_pais mn` OK con 13 avisos de bajo objetivo (126 a 202 palabras, objetivo 220); `check_fronteras` y `check_eol` OK.
`check_mundo` da 1 falla ajena (Bélgica). No miré `next dev` (pide `npm ci` real en el worktree).

## Riesgos

1. **La reforma entra en 60 días.** ХХОАТ, хөнгөлөлт, ЭМД y mínimo tienen `hasta: 2026-12-31`, a propósito: el 1/1/2027 sueldo neto, ХХОАТ,
   НДШ, costo del empleador, mínimo y las prestaciones que usan el mínimo **dejan de publicarse** hasta cargar 2027. Es preferible a mostrar
   un impuesto viejo, pero hace falta leer el texto de la ley desde un acceso que llegue a legalinfo.mn. La prensa (ikon.mn) da 0 % hasta ₮ 792,000
   desde 2027 y 1 % hasta ₮ 2,000,000 desde 2028, con fechas que no pude confirmar.
2. El aviso `mn.khkhoat-2027` cita ikon.mn como secundaria: no hallé otra fuente legible del paquete.
3. Mongol revisado por reglas, sin hablante nativo. Conviene que alguien lea los términos del seguro social y los slugs.
4. Los slugs salen de la transliteración de D28 y de los términos oficiales: no pude confirmar autocompletar de Google Mongolia.
