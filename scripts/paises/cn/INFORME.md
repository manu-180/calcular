# China continental (`cn`): informe del agente

- Rama: `claude/pais-cn` (base `origin/main`).
- Mercado: `cn`, chino simplificado (`zh-CN`), CNY, `Asia/Shanghai`, escala 7, `estado: "interno"`. `src/paises/index.ts` no se commitea (lo registra el coordinador).
- Trato: `mercado.trato` es `"tu"` (fila de PAISES.md), pero `scripts/reglas_idioma.ts` rechaza «你» en todo mercado zh. Los textos usan «您» o evitan el pronombre, como espera el motor.
- Total: **57 calculadoras** = 17 locales + 40 universales (`universales: "todas"`; la universal de IVA se cae sola porque hay `zengzhishui` local). Las universales salen en simplificado: revisé las 57 con `problemasDeEscritura(…, "zh-CN")` y no hay caracteres tradicionales ni 「」 (ej.: hipoteca muestra «房屋总价»).

## Calculadoras locales (17, todas `publicado`, todas con datos verificados)

| Slug | Concepto | Base |
|---|---|---|
| shuihou-gongzi | sueldo-neto (declara `mundo`) | 个人所得税法, 公告2018年第61号 (累计预扣法), 国发〔2005〕38号 (养老8%), 国发〔1998〕44号 (医疗2%), 住房公积金管理条例 art. 18 (mín. 5%) |
| geshui-jisuanqi | impuesto-renta | 个人所得税法 arts. 3 y 6 y tabla de 综合所得 (年度汇算, 应补/应退) |
| gongzi-geshui-yukou | propio | 公告2018年第61号, art. 6 y 预扣率表一 |
| nianzhongjiang-geshui | propio | 财政部 税务总局公告2023年第30号 y su anexo 按月换算后的综合所得税率表 (vigente hasta 2027-12-31) |
| laowu-baochou-geshui | retencion-honorarios | 公告2018年第61号, art. 8 y 预扣率表二 |
| jingying-suode-geshui | regimen-simplificado | 个人所得税法, tabla de 经营所得 |
| zhuanxiang-fujia-kouchu | propio | 国发〔2018〕41号 (暂行办法) y 公告2023年第14号 |
| jingji-buchangjin | indemnizacion-despido | 劳动合同法 arts. 40, 46, 47, 87; 实施条例 arts. 20, 25, 27 (N, N＋1, 2N, tope 3× y 12 años) |
| jiabanfei | horas-extra | 劳动法 art. 44; 人社部发〔2025〕2号 (21.75 días) |
| nianxiujia | vacaciones | 职工带薪年休假条例 arts. 2 a 5 y 7 |
| chanjia | propio | 女职工劳动保护特别规定 arts. 7 y 8 (solo estándar nacional) |
| shiyongqi-gongzi | propio | 劳动合同法 arts. 19 y 20 |
| weiqian-hetong-shuangbei-gongzi | propio | 劳动合同法 art. 82; 实施条例 arts. 6 y 7 |
| zengzhishui | iva | 增值税法 (vigente desde 2026-01-01) arts. 9 a 12 y 22 |
| yinhuashui | propio | 印花税法 y su 税目税率表 |
| renminbi-huilv | tipo-de-cambio | 人民币汇率中间价 de CFETS (USD, EUR, 100 JPY, HKD), con detector |
| guangzhou-zuidi-gongzi | salario-minimo | 广州市人社局, 最低工资标准 desde 2026-09-01 (2680 元/月, 25.4 元/hora) |

Slugs en pinyin kebab-case ASCII; no chocan con las universales zh (que usan slugs en inglés).

## Datos

- **30 datos con 30 tramos verificados y 0 sin verificar**, más 4 series (USD, EUR, 100 JPY y HKD del 中间价, del 2026-09-15 al 2026-10-29). Todo leído hoy (`verificadoEl: 2026-10-29`) en fuente primaria https:
  - Textos de ley del 国家法律法规数据库 (flk.npc.gov.cn): la página es una SPA; el texto oficial se baja con `law-search/download/pc?format=docx&bbbs=` (docx oficial) y la búsqueda es `POST law-search/search/list`. URL citada: `https://flk.npc.gov.cn/detail?id=<bbbs>`.
  - gov.cn: 国务院公报 (公告2018年第61号 con las tablas de 预扣率), PDF del anexo del 公告2023年第30号, 国发〔2018〕41号, 人社部发〔2025〕2号.
  - fgk.chinatax.gov.cn: 公告2023年第14号, 国发〔2005〕38号, 国发〔1998〕44号.
  - chinamoney.com.cn (CFETS): JSON `CcprHisNew`.
  - gz.gov.cn: aviso del 广州市人社局 sobre el salario mínimo.
- La tabla anual de 综合所得 no trae 速算扣除数 en la ley: se calcula por tramos (`aplicarEscalaMarginal`) y el 速算扣除数 que muestran los resultados se deriva de la misma tabla (coincide con la tabla oficial del 公告2018年第61号).

## Lo que no se pudo y quedó afuera (sin cargar datos)

- **mohrss.gov.cn** responde con un desafío anti-bot en JavaScript; no lo esquivé. Por eso no hay salario mínimo por provincia ni datos nacionales de 社保 del ministerio.
- **Salario mínimo**: solo Guangzhou (aviso del 人社局 de la ciudad). Shanghái: el PDF oficial de rsj.sh.gov.cn devolvió 404; Shenzhen (sz.gov.cn) corta el TLS. Lo demás eran notas de prensa. Por eso la calculadora es de Guangzhou y no nacional.
- **五险一金 por ciudad**: no leí 缴费基数上下限 ni tasas de ninguna ciudad en su sitio oficial. `shuihou-gongzi` usa lo nacional verificado (养老 8 %, 医疗 2 %, mínimo de 公积金 5 %) y deja el 失业保险 y el porcentaje de 公积金 como campos del usuario (失业 por defecto 0 %, 公积金 5 %), y la base como campo opcional.
- No incluí: 个体户 减半 y otras rebajas temporales, exención de 印花税 para vivienda de personas físicas, 延长生育假 provinciales, 社保 empleador (costo empleador) y CPI de stats.gov.cn. No los leí en fuente primaria en esta sesión, y los textos no los afirman.
- npc.gov.cn (sitio principal) corta el TLS; flk.npc.gov.cn sí funciona.

## Detectores (13) y prueba

`npx tsx scripts/paises/cn/probar-detectores.ts`, corrido hoy contra las fuentes reales:
- 4 de tipo de cambio de CFETS (`api-json`): cada uno devolvió los puntos del 16 al 29 de octubre de 2026 (USD 6,7147; EUR 7,4570; 100 JPY 4,2453; HKD 0,85596 el 29).
- 8 de normas por versión nueva en flk (`api-json`, usan `http.postJson`; si el Http no lo trae devuelven null): 个人所得税法, 劳动合同法, 劳动法, 年休假条例, 女职工劳动保护特别规定, 增值税法, 印花税法, 住房公积金管理条例. Todos `[]`.
- `cn.guangzhou-zuidi-gongzi` (html, lista de avisos de gz.gov.cn): `[]`. Es frágil: si el portal cambia la forma de la lista también devuelve `[]`.
- Ninguno vigila 公告2018年第61号, 2023年第30号, 2023年第14号, 国发 de 社保 ni 人社部发〔2025〕2号 (no tienen versión en flk). El 年终奖 tiene `proximaRevision` 2027-12-31.

## Checks (corridos, con `cn` registrado localmente)

- `npx tsc --noEmit`: sin errores.
- `check_paises cn`: OK, 30 datos, 4 series, 57 calculadoras. 1 aviso esperable: `renminbi-huilv` deja de ser publicable el 2026-11-28 si no corre el detector.
- `check_paises_casos cn`: 73 casos en 17 archivos, OK.
- `check_textos_paises cn`: 838 textos, 0 avisos.
- `check_seo_pais cn`: OK, 0 avisos.
- `check_fronteras`: 14 484 archivos sin cruces. `check_eol`: 15 837 archivos en LF.
- `check_mundo`: OK. Con `estado` en `publicado` (solo para la prueba, revertido) entra `CN declarado 15,0 % / 18,6 % / 27,2 %`.
- `check_motor`: 4688 OK, 1 falla ajena (`forint`, ya falla en main).
- No corrí `next dev` ni `next build` (pedido de presupuesto del coordinador).

## Pedidos al motor

- `reglas_idioma.ts` marca «你» en todo mercado zh sin mirar `trato`. Si China debe ir con «你» (PAISES.md dice `tu`), la regla tendría que depender del trato o del locale.

## Riesgos y dudas para el coordinador

1. `shuihou-gongzi` toma como base de 社保 el bruto si el usuario no pone base; en sueldos altos sobreestima los aportes (no hay tope por ciudad). En «Tu sueldo en el mundo» esto baja algo el neto de los brutos altos.
2. Vacaciones: el 300 % del 条例 se presenta como el total del 年休假工资报酬, sin decir si incluye el sueldo normal (eso lo dice el 实施办法 del 人社部, que no leí en fuente primaria).
3. China tiene acceso restringido (ICP, Baidu): ver PAISES.md. El país queda `interno`.
4. 住房公积金管理条例: flk lista una revisión del 2026-08-10 vigente desde el 2026-09-20. Leí el art. 18 (mínimo 5 %) en esa versión, pero no comparé qué más cambió. La novedad solo dice que el mínimo sigue en 5 %.
