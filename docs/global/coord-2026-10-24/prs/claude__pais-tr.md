# País tr: Türkiye en turco (20 calculadoras locales y 40 universales)

Depende de `claude/mundo-motor-tr` (motor turco sin mergear): esta rama sale de ahí, con `origin/main`
mergeado encima. Mergear primero el motor.

## Qué incluye

- `src/paises/tr/`: mercado (codigo tr, pais TR, idioma tr, locale tr-TR, trato "usted" según D12,
  moneda TRY, escala 42, nombre Türkiye), datos con vigencia, series, avisos, novedades, detectores y
  20 calculadoras locales con casos, cliente y contenido propio en turco.
- `scripts/paises/tr/probar_detectores.ts`: corre los detectores contra las fuentes reales sin escribir nada.
- Commit `publicar tr`: `estado: "publicado"`, alta al final de `PAISES`, cargadores generados
  (`cargadores/tr.ts`, `cargadores/mercados.ts`) y `mercados-registro.ts`.

### Calculadoras locales (todas publicadas, ninguna en borrador)

| Slug | Concepto |
|---|---|
| brutten-nete-maas-hesaplama | sueldo-neto (entra en «Tu sueldo en el mundo», declarado: neto = promedio mensual del año) |
| netten-brute-maas-hesaplama | propio |
| asgari-ucret-hesaplama | salario-minimo |
| isveren-maliyeti-hesaplama | costo-empleador |
| sgk-prim-hesaplama | aportes-seguridad-social |
| kidem-tazminati-hesaplama | indemnizacion-despido |
| ihbar-tazminati-hesaplama | preaviso |
| yillik-izin-hesaplama | vacaciones |
| fazla-mesai-hesaplama | horas-extra |
| gelir-vergisi-hesaplama | impuesto-renta |
| kdv-hesaplama | iva (%20, %10, %1; reemplaza a la universal, que cae por concepto) |
| tapu-harci-hesaplama | propio |
| emlak-vergisi-hesaplama | propio |
| kira-artis-orani-hesaplama | propio (TÜFE 12 aylık ortalama, TBK md. 344) |
| enflasyon-hesaplama | inflacion |
| doviz-hesaplama | tipo-de-cambio |
| mevduat-faizi-hesaplama | plazo-fijo (stopaj por vade) |
| serbest-meslek-makbuzu-hesaplama | retencion-honorarios |
| kira-stopaji-hesaplama | propio |
| damga-vergisi-hesaplama | propio |

Universales: 40 de 41 con `{ todas: true }` (la de KDV se cae porque hay local del mismo concepto).

### Datos (19 datos, 22 tramos, todos verificados el 24/10/2026 en fuente primaria)

- csgb.gov.tr: asgari ücret 2026 (33.030 TL brüt, tabla de net y costo), kıdem tavanı 2025-2 / 2026-1 /
  2026-2 (PDF 1980-2026: 53.919,68 / 64.948,77 / 73.729,87), texto de la Ley 4857 (md. 17, 41, 49, 53,
  63) y SSS (kıdem: 30 días por año, solo damga).
- sgk.gov.tr: prim oranları 2026 (MYÖ 9/12, GSS 5/7,5, KVSK 2,25, işsizlik 1/2), PEK 2026 (33.030 /
  297.270), teşvik 2026 (2 puan, imalat 5 puan hasta fin de 2026).
- gib.gov.tr (PDF oficiales en cdn.gib.gov.tr): tarifa GV 2026 (332 Seri No.lu tebliğ), KDV, tablas (1) y
  (2) de la DVK, tope de damga 2026 (tebliğ 71), Ley 7566 (RG 19/12/2025), guía geçici 67 (stopaj de
  mevduat 17,5/15/10), GVK 94 (%20), guía de emlak vergisi.
- tkgm.gov.tr: tapu harcı binde 20 por parte.
- Series: TÜFE (2003=100, 285 meses) del servicio del enflasyon hesaplayıcı de la TCMB (da %31,49 de
  12 aylık ortalama para Eylül 2026, igual que el boletín de TÜİK, y el mismo resultado que el
  hesaplayıcı); USD, EUR y GBP döviz alış de `tcmb.gov.tr/kurlar` (60 días).

No verificados: ninguno cargado. Lo que no se pudo verificar quedó afuera (ver Pendientes).

### Detectores (probados contra la fuente real con `probar_detectores.ts`)

- Series: `tr.usd-tcmb`, `tr.eur-tcmb`, `tr.gbp-tcmb` (today.xml, devuelven el boletín del 23/10) y
  `tr.tufe-tcmb` (POST al servicio de la TCMB, devuelve jul-sep 2026; un mes no publicado responde error y se salta).
- Normas: `tr.csgb-asgari-ucret` y `tr.csgb-kidem-tavani` (períodos nuevos en las páginas del ministerio:
  hoy devuelven []), `tr.gib-gelir-vergisi-tarifesi`, `tr.gib-gecici-67` y `tr.gib-ucret-rehberi`
  (aparición del PDF del año siguiente en el CDN de GİB: hoy 400, devuelven []).
- Con inflación alta el TÜFE vence a los 70 días y los kurlar a los 10: el cron tiene que correr.

## Checks (con tr registrado)

- `check_motor --generar-cargadores`: 2352 pruebas OK.
- `check_medicion_mercados --escribir`: 57 mercados.
- `check_paises tr`: OK (3 avisos esperados: series que vencen si no corre el cron).
- `check_paises_casos tr`: 76 casos en 20 archivos, OK.
- `check_textos_paises tr`: 966 textos, 0 avisos.
- `check_fronteras`: 7744 archivos OK. `check_eol`: OK.
- `check_mundo`: TR entra (15,0 / 27,6 / 37,3 % de carga), TODO OK.
- `check_ofertas_intl`: 15 FALLAS, todas de `cl` (sueldo-liquido y finiquito, tope en UF), ninguna de tr.
- `tsc --noEmit`: 14 errores, todos en `src/motor/**` (ver Riesgos), ninguno en `src/paises/tr`.
- `check_hreflang` y `check_seo_intl`: se caen con `slugRanking` (rankings sin slug `tr`), también sin tr
  registrado (lo dispara zz-tr). Ajeno a este frente.
- `check-all`: 145/154 suites verdes. Fallan, todas ajenas a `src/paises/tr` (comprobado: con tr fuera
  del registro fallan igual): `check_horas`, `check_i18n`, `check_rankings`, `check_sueldos` (faltan los
  diccionarios `tr` de los módulos nuevos de main), `check_hreflang` y `check_seo_intl` (la misma causa,
  `rankings/rutas.ts`), `check_mes_en_render` (11 páginas de `(ar)`), `check_ofertas_intl` (15 de `cl`) y
  `check_panel_sql` (grants de Supabase).

## Checks después de mergear el motor tr al día (claude/mundo-motor-tr 2ab6593a, merge 854bb3cf)

El motor turco quedó al día con main 7d190a68 (calendario `maas-takvimi`, horas `kac-saatlik-calisma`,
rankings `ulke-siralamasi`, sueldos reales `gercek-maaslar` y afiliados en turco) y se mergeó en esta
rama sin conflictos. `--generar-cargadores` y `--escribir` no cambiaron archivos.

- `tsc --noEmit`: 0 errores (antes 14 en `src/motor`).
- `check_motor --generar-cargadores`: 2352 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_paises tr`: OK, 3 avisos esperados (TÜFE y kurlar vencen si no corre el cron).
- `check_paises_casos tr`: 76 casos en 20 archivos OK. `check_textos_paises tr`: 966 textos, 0 avisos.
- `check_seo_intl`: TODO OK, 7688 páginas (antes se caía).
- `check_horas` (32 países), `check_rankings` (3 rankings, 352 filas, 44 países), `check_sueldos`
  (15436 pasadas, 0 fallas), `check_i18n` (30375 textos), `check_calendario` (91 fechas): OK.
- `check_hreflang`: 1978 FALLAS, todas del clúster de inflación (bug conocido de main, arreglado en
  `claude/mundo-arreglos-2026-10-24`); las 86 que nombran tr son de `tr/enflasyon-hesaplama` dentro de
  ese clúster. Ninguna falla de rankings ni de otra página tr.
- `check-all`: 151/155 suites verdes. Fallan, todas ajenas: `check_hreflang` (clúster de inflación),
  `check_mes_en_render` (las mismas 11 páginas de `(ar)`), `check_ofertas_intl` (15 de `cl`, UF) y
  `check_panel_sql` (tablas y funciones de `ca_sueldos` de main contra la lista esperada del check).

## Decisiones

- Trato «siz» (D12) y sin sufijos pegados a cifras ni a marcadores: las fechas van como «2026 yılının
  Ocak ayında», los montos después de dos puntos.
- Bordro acumulativo: el GV se calcula sobre el kümülatif matrah; la asgari ücret istisnası usa el
  kümülatif propio del salario mínimo (por eso en julio pasa al %20) y no supera el impuesto calculado.
  Damga solo sobre lo que excede el salario mínimo. Casos cruzados con una implementación independiente.
- Kıdem: tavan del semestre de la fecha de salida (lee los tramos verificados de datos.json); fecha fuera
  de los semestres cargados da error en vez de inventar.
- Saat ücreti = aylık / 30 / 7,5 (md. 49 y 63). İhbar: GV sobre el kümülatif que da el usuario (ihbar es
  ücret, özelge GİB 23421) y sin SGK (página PEK de SGK).
- Kira artışı: tasa del mes anterior a la renovación; si no está publicada, la última con aviso.
- Mevduat: hasta 183 días = «6 aya kadar», hasta 366 = «1 yıla kadar».
- Tarifa GV, asgari ücret, PEK, teşvik y tope de damga con `hasta: 2026-12-31`: en enero de 2027 esas
  calculadoras salen de lo publicable hasta cargar los valores nuevos (los detectores avisan).

## Pasos saltados

- Sin push ni PR (sin permiso de escritura): este archivo es el cuerpo del PR.
- `npm run build` no se corrió (opcional; check-all ya corrió con tsc en 0).
- resmigazete.gov.tr y mevzuat.gov.tr no responden desde esta red (timeout en curl y WebFetch): se usaron
  los PDF oficiales de GİB, csgb y SGK, que reproducen los textos.

## Pendientes y riesgos

- **Motor tr**: resuelto. Esta rama depende de `claude/mundo-motor-tr` (sin mergear en main), que ya está
  al día con main 7d190a68; conviene mergear el motor antes o junto con esta rama.
- **Revisión de un hablante nativo pendiente** de todos los textos turcos (contenido, etiquetas,
  observaciones, novedades y avisos).
- MTV no se hizo: la tarifa 2026 está como imagen en la guía de GİB y el tebliğ 58 está en la Resmî
  Gazete, que no abre desde aquí.
- Sin doğum izni (posible reforma 2025 no verificable en mevzuat) ni kira geliri vergisi (la declaración
  de marzo usa la tarifa 2025, no cargada).
- Stopaj de mevduat: verificado en la guía de GİB de febrero de 2026; un Cumhurbaşkanı Kararı posterior
  lo cambiaría sin que el detector lo note hasta la guía 2027.
- Emlak vergisi: tasas de la guía de GİB 2025 (son las de la ley 1319, que la 7566 no cambió).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
