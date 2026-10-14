# Países del mundo: referencia para la expansión de calcularya.com

Fecha: 2026-10-13. Cubre los 193 miembros de la ONU más Taiwán, Hong Kong, Macao, Puerto Rico, Kosovo y Palestina (199 filas). Sirve para decidir qué países construir, en qué idioma y con qué organismos verificar los datos.

Cómo se armó: conocimiento propio más verificación web de lo dudoso. Lo que no se confirmó lleva «(verificar)». Lo que no se sabe quedó vacío. La sección 4 detalla qué se verificó y qué no.

## 1. Resumen

### Tier 1: los 15 primeros países a construir, en orden

Orden por puntaje (usuarios de internet × índice de ingreso × facilidad). Los 16 países ya publicados no cuentan para esta lista.

| # | iso | País | Ediciones | Puntaje | Por qué |
|---|---|---|---|---|---|
| 1 | us | Estados Unidos | us en en-US; us-es es es-US | 310.0 | Mayor mercado publicitario del mundo e inglés ya soportado. Pide datos de sales tax por estado y unidades imperiales. La edición us-es suma unos 40 millones de hispanohablantes con el motor en español. |
| 2 | de | Alemania | de de de-DE | 46.8 | Segundo ingreso y CPM de Europa. Alemán ya soportado. Brutto/Netto, Elterngeld y Steuerklassen tienen demanda enorme, y la misma base sirve a AT y CH. |
| 3 | gb | Reino Unido | gb en en-GB | 46.2 | Inglés, CPM alto y búsquedas masivas de PAYE, student loan y stamp duty. Ruta gb, locale en-GB. |
| 4 | in | India | in en en-IN; in-hi hi hi-IN | 28.0 | 800 millones de usuarios con inglés ya soportado. Entra por volumen (GST, EMI, SIP, HRA): CPM bajo y poca disposición a pagar informes, así que se monetiza con anuncios. Compite con Groww y ClearTax. |
| 5 | fr | Francia | fr fr fr-FR | 26.1 | Francés ya soportado y reutilizable en CA, BE, CH, LU y el Magreb. TVA, impôt sur le revenu y salaire brut/net. |
| 6 | ca | Canadá | ca en en-CA; ca-fr fr fr-CA | 21.6 | Dos ediciones con idiomas ya soportados (en-CA y fr-CA). CPM alto. Los impuestos provinciales dan muchas páginas por país. |
| 7 | au | Australia | au en en-AU | 18.4 | Inglés, CPM alto y 24 millones de usuarios. Superannuation, PAYG y HECS concentran búsquedas. |
| 8 | br | Brasil | br pt pt-BR | 18.1 | Mayor audiencia de las Américas después de EE. UU. Portugués ya soportado. CLT, INSS, FGTS y 13o salario. CPM bajo y tributos complejos (ICMS por estado, reforma IBS/CBS en transición). |
| 9 | it | Italia | it it it-IT | 17.5 | Italiano ya soportado. IVA, TFR, stipendio netto y regime forfettario. Fiscalidad compleja pero demanda constante. |
| 10 | es | España | es es es-ES | 13.2 | El motor y los 16 países publicados ya están en español, así que es el menor costo de entrada de la lista. IRPF, nómina, finiquito y autónomos. |
| 11 | nl | Países Bajos | nl nl nl-NL | 9.9 | Neerlandés ya soportado, ingreso y CPM altos. Box 1, toeslagen e hipoteca. La edición sirve también a BE (nl-BE) y a Surinam. |
| 12 | ch | Suiza | ch de de-CH; ch-fr fr fr-CH; ch-it it it-CH | 7.1 | CPM más alto de la lista. Tres ediciones (de, fr, it), todas ya soportadas. Los cantones exigen datos por cantón. |
| 13 | za | Sudáfrica | za en en-ZA | 6.8 | Inglés, 45 millones de usuarios y mercado de calculadoras maduro (PAYE, UIF, VAT, bond). Mejor candidato de África. |
| 14 | be | Bélgica | be nl nl-BE; be-fr fr fr-BE | 5.8 | Dos ediciones con idiomas ya soportados (nl-BE y fr-BE). Ingreso alto. Nettoloon y salaire net. |
| 15 | at | Austria | at de de-AT | 4.5 | Alemán ya soportado. Reutiliza casi todo el contenido de DE con datos propios (Nettolohn, 13. y 14. Gehalt, Familienbonus). |

### Cómo se calcula el tier

`puntaje = usuarios de internet (millones) × índice de ingreso × facilidad`

- **Usuarios**: estimación redonda de usuarios de internet (ronda 2024/2025, fuentes tipo DataReportal y UIT). Es orden de magnitud, no un dato exacto.
- **Índice de ingreso**: de 0 a 1, con EE. UU. = 1. Mezcla CPM de anuncios y capacidad de pago de un informe de USD 3 a 9. Es criterio propio, no una medición.
- **Facilidad**: 1,0 si el idioma principal ya está en el motor (es pt en fr de it nl). 0,4 si es un idioma nuevo de alfabeto latino. 0,1 si es nuevo con otra escritura o escritura de derecha a izquierda. Casos con fricción extra (sanciones, sin PayPal, bloqueo de internet, guerra) bajan más: Rusia, Bielorrusia, Irán, Cuba, Siria, Sudán, Yemen, Myanmar, Corea del Norte, China.
- **Cortes**: tier 1 = los 15 mejores entre los países aún no construidos; tier 2 = puestos 16 a 55; tier 3 = puestos 56 a 115; tier 4 = el resto. Los países ya publicados se ubican con los mismos cortes. Distribución final de las 199 filas: tier 1 = 17 (15 a construir y 2 ya publicados), tier 2 = 51, tier 3 = 64, tier 4 = 67.
- Para cambiar el orden hay que cambiar una de las tres entradas de la columna «puntaje» de la tabla maestra, que muestra las tres.

### Idiomas necesarios

Ordenados por usuarios de internet de los países donde es la edición principal. «Países (todas)» cuenta además las ediciones secundarias.

| Idioma | Código | Soportado hoy | Países (principal) | Países (todas) | Usuarios (M, principal) | Valor del idioma (puntaje sin penalizar el idioma, sin publicados) | Países principales |
|---|---|---|---|---|---|---|---|
| Inglés | en | si | 69 | 73 | 1897 | 475 | in, us, pk, ng, ph, bd, gb, za, ca, my, et, au, ... |
| Chino | zh | no | 3 | 4 | 1122 | 29 | cn, tw, mo |
| Español | es | si | 22 | 23 | 367 | 15 | mx, es, co, ar, pe, ve, cl, ec, gt, do, bo, cu, ... |
| Francés | fr | si | 25 | 29 | 245 | 35 | fr, dz, ma, cd, ci, cm, sn, tn, ml, bf, bj, mg, ... |
| Indonesio | id | no | 1 | 1 | 215 | 11 | id |
| Portugués | pt | si | 8 | 8 | 214 | 21 | br, ao, pt, mz, tl, gw, cv, st |
| Árabe | ar | no | 12 | 19 | 207 | 21 | eg, sa, iq, sd, sy, jo, ly, ye, lb, om, ps, mr |
| Ruso | ru | no | 7 | 7 | 194 | 17 | ru, uz, kz, by, kg, tj, tm |
| Japonés | ja | no | 1 | 1 | 118 | 35 | jp |
| Alemán | de | si | 4 | 5 | 95 | 58 | de, ch, at, li |
| Persa | fa | no | 2 | 2 | 78 | 1 | ir, af |
| Vietnamita | vi | no | 1 | 1 | 78 | 5 | vn |
| Turco | tr | no | 1 | 1 | 75 | 8 | tr |
| Tailandés | th | no | 1 | 1 | 62 | 6 | th |
| Italiano | it | si | 2 | 3 | 50 | 18 | it, sm |
| Coreano | ko | no | 2 | 2 | 50 | 20 | kr, kp |
| Polaco | pl | no | 1 | 1 | 32 | 8 | pl |
| Ucraniano | uk | no | 1 | 1 | 31 | 3 | ua |
| Neerlandés | nl | si | 3 | 3 | 27 | 16 | nl, be, sr |
| Birmano | my | no | 1 | 1 | 25 | 0 | mm |
| Rumano | ro | no | 2 | 2 | 20 | 3 | ro, md |
| Jemer | km | no | 1 | 1 | 12 | 1 | kh |
| Sueco | sv | no | 1 | 1 | 10 | 6 | se |
| Griego | el | no | 2 | 2 | 10 | 2 | gr, cy |
| Checo | cs | no | 1 | 1 | 10 | 2 | cz |
| Azerí | az | no | 1 | 1 | 9 | 1 | az |
| Húngaro | hu | no | 1 | 1 | 9 | 2 | hu |
| Hebreo | he | no | 1 | 1 | 8 | 4 | il |
| Serbio | sr | no | 2 | 2 | 7 | 1 | rs, me |
| Danés | da | no | 1 | 1 | 6 | 4 | dk |
| Búlgaro | bg | no | 1 | 1 | 6 | 1 | bg |
| Finés | fi | no | 1 | 1 | 5 | 3 | fi |
| Noruego | nb | no | 1 | 1 | 5 | 4 | no |
| Lao | lo | no | 1 | 1 | 5 | 0 | la |
| Eslovaco | sk | no | 1 | 1 | 5 | 1 | sk |
| Albanés | sq | no | 2 | 2 | 4 | 0 | al, xk |
| Croata | hr | no | 1 | 1 | 4 | 1 | hr |
| Bosnio | bs | no | 1 | 1 | 3 | 0 | ba |
| Georgiano | ka | no | 1 | 1 | 3 | 0 | ge |
| Mongol | mn | no | 1 | 1 | 3 | 0 | mn |
| Somalí | so | no | 1 | 1 | 3 | 0 | so |
| Armenio | hy | no | 1 | 1 | 3 | 0 | am |
| Lituano | lt | no | 1 | 1 | 2 | 1 | lt |
| Esloveno | sl | no | 1 | 1 | 2 | 1 | si |
| Letón | lv | no | 1 | 1 | 2 | 0 | lv |
| Macedonio | mk | no | 1 | 1 | 2 | 0 | mk |
| Estonio | et | no | 1 | 1 | 1 | 1 | ee |
| Islandés | is | no | 1 | 1 | 0 | 0 | is |
| Hindi | hi | no | 0 | 1 | 0 | 0 |  |
| Malayo | ms | no | 0 | 1 | 0 | 0 |  |

La columna de usuarios es bruta: Chino pesa 1.100 M por China, pero China tiene acceso muy restringido (ICP, buscadores propios), y Persa, Ruso y parte del Árabe cargan sanciones o falta de PayPal. Por eso el orden práctico para idiomas nuevos sale del valor del idioma: la suma de usuarios × ingreso × fricción de los países cuya edición principal sería ese idioma, sin la penalización por ser idioma nuevo (se paga una sola vez al agregarlo).

Los siete idiomas ya soportados cubren 133 países como edición principal. Idiomas nuevos por valor del idioma: Japonés (1 país, 118 M usuarios, valor 35), Chino (3 países, 1122 M usuarios, valor 29), Árabe (12 países, 207 M usuarios, valor 21), Coreano (2 países, 50 M usuarios, valor 20), Ruso (7 países, 194 M usuarios, valor 17), Indonesio (1 país, 215 M usuarios, valor 11), Polaco (1 país, 32 M usuarios, valor 8), Turco (1 país, 75 M usuarios, valor 8).

### Ediciones multilingües

Convención del ADR 0002: la edición principal usa el código ISO y las demás llevan sufijo con el idioma. Formato `ruta idioma locale`.

| País | Ediciones |
|---|---|
| Arabia Saudita (sa) | `sa ar ar-SA`; `sa-en en en-SA` |
| Argelia (dz) | `dz fr fr-DZ`; `dz-ar ar ar-DZ` |
| Baréin (bh) | `bh en en-BH`; `bh-ar ar ar-BH` |
| Bélgica (be) | `be nl nl-BE`; `be-fr fr fr-BE` |
| Camerún (cm) | `cm fr fr-CM`; `cm-en en en-CM` |
| Canadá (ca) | `ca en en-CA`; `ca-fr fr fr-CA` |
| Catar (qa) | `qa en en-QA`; `qa-ar ar ar-QA` |
| Chipre (cy) | `cy el el-CY`; `cy-en en en-CY` |
| Emiratos Árabes Unidos (ae) | `ae en en-AE`; `ae-ar ar ar-AE` |
| Estados Unidos (us) | `us en en-US`; `us-es es es-US` |
| Hong Kong (hk) | `hk en en-HK`; `hk-zh zh zh-HK` |
| India (in) | `in en en-IN`; `in-hi hi hi-IN` |
| Kuwait (kw) | `kw en en-KW`; `kw-ar ar ar-KW` |
| Luxemburgo (lu) | `lu fr fr-LU`; `lu-de de de-LU` |
| Malasia (my) | `my en en-MY`; `my-ms ms ms-MY` |
| Marruecos (ma) | `ma fr fr-MA`; `ma-ar ar ar-MA` |
| Mauricio (mu) | `mu en en-MU`; `mu-fr fr fr-MU` |
| Omán (om) | `om ar ar-OM`; `om-en en en-OM` |
| Suiza (ch) | `ch de de-CH`; `ch-fr fr fr-CH`; `ch-it it it-CH` |
| Túnez (tn) | `tn fr fr-TN`; `tn-ar ar ar-TN` |

Sin edición secundaria a propósito (el idioma existe pero no compensa por ahora): Bélgica en alemán, Finlandia en sueco, España en catalán, gallego y euskera, Filipinas en filipino, Pakistán en urdu, Bangladés en bengalí, Kenia y Tanzania en suajili, Sudáfrica en afrikáans y zulú, Singapur en chino y malayo, Israel en árabe, Luxemburgo en inglés.

### Ya publicados

En calcularya.com (mercados en `src/paises/`): Bolivia (bo), Chile (cl), Colombia (co), Costa Rica (cr), Ecuador (ec), El Salvador (sv), Guatemala (gt), Honduras (hn), México (mx), Nicaragua (ni), Panamá (pa), Paraguay (py), Perú (pe), República Dominicana (do), Uruguay (uy), Venezuela (ve). Argentina vive en calcular.ar.

## 2. Tabla maestra

Cómo leer las columnas:

- **Ediciones**: `ruta idioma locale BCP47`, separadas por `;`. Se eligió el idioma que más se usa para buscar calculadoras y trámites en internet en ese país. Las justificaciones de los casos dudosos están en la sección 3.
- **Trato**: uno por edición, en el mismo orden. `tu` = registro informal o neutro (tú, you, je, du, você, 你). `usted` = registro formal (usted, vous, Sie, Lei, вы, polite). `vos` = voseo. Para es sigue el trato ya configurado en `src/paises/<m>/mercado.ts`; en los demás países de habla hispana es criterio propio. Todo es recomendación para un sitio de herramientas.
- **Moneda**: ISO 4217 principal y, tras `;`, el dólar si circula mucho. **Zona**: IANA principal. **Unidades**: solo EE. UU., Liberia y Myanmar son imperial según el brief; Puerto Rico también (US customary, ver sección 3).
- **Escala**: unidades de la moneda local equivalentes a más o menos un dólar, redondeado, solo para escalar montos de ejemplo. Son aproximaciones de 2026 que no se verificaron una por una; donde el cambio oficial y el informal difieren mucho se dice en la sección 3.
- **Impuesto (pista, verificar)**: nombre local y tasa estándar. Es una pista, no un dato para publicar. Antes de usar una tasa hay que leerla en el ente recaudador.
- **Organismos**: solo dominios (todos `https`), un máximo de uno por rol. `of` = diario oficial o legislación, `rec` = ente recaudador o ministerio de finanzas, `bc` = banco central, `trab` = ministerio de trabajo o seguridad social. Cada dominio resuelve por DNS el 2026-10-13; eso confirma que existe, no que sea el organismo correcto ni que el contenido sea el esperado. Vacío = no se supo con certeza.
- **PayPal**: `si` = el país figura en la lista oficial de países de PayPal (consultada el 2026-10-13), `no` = no figura, `limitado` = figura pero con restricciones conocidas para pagos locales. No confirma que cada caso de uso funcione.
- **Tier** y **puntaje**: ver la sección 1. El puntaje muestra `usuarios (M) · ingreso · facilidad = puntaje`.

| iso | País | Nombre nativo | Ediciones | Trato | Moneda | Zona | Unid. | Escala | Impuesto (pista, verificar) | Organismos | PayPal | Tier | Puntaje |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| af | Afganistán | افغانستان | `af fa fa-AF` | usted | AFN | Asia/Kabul | metrico | 70 | sin IVA general (verificar) | rec: mof.gov.af; bc: dab.gov.af | no | 4 | 8 · 0.01 · 0.1 = 0.0 |
| al | Albania | Shqipëria | `al sq sq-AL` | usted | ALL | Europe/Tirane | metrico | 90 | TVSH 20% | of: qbz.gov.al; rec: tatime.gov.al; bc: bankofalbania.org | si | 3 | 2.5 · 0.08 · 0.4 = 0.1 |
| de | Alemania | Deutschland | `de de de-DE` | usted | EUR | Europe/Berlin | metrico | 0.9 | MwSt 19% | of: gesetze-im-internet.de; rec: bundesfinanzministerium.de; bc: bundesbank.de; trab: bmas.de | si | 1 | 78 · 0.6 · 1 = 46.8 |
| ad | Andorra | Andorra | `ad es es-AD` | tu | EUR | Europe/Andorra | metrico | 0.9 | IGI 4,5% | of: bopa.ad | si | 4 | 0.08 · 0.5 · 1 = 0.0 |
| ao | Angola | Angola | `ao pt pt-AO` | usted | AOA | Africa/Luanda | metrico | 900 | IVA 14% | bc: bna.ao; rec: agt.minfin.gov.ao | si | 2 | 15 · 0.05 · 1 = 0.8 |
| ag | Antigua y Barbuda | Antigua and Barbuda | `ag en en-AG` | tu | XCD | America/Antigua | metrico | 3 | ABST 17% | bc: eccb-centralbank.org; rec: ird.gov.ag | si | 4 | 0.07 · 0.2 · 1 = 0.0 |
| sa | Arabia Saudita | المملكة العربية السعودية | `sa ar ar-SA`; `sa-en en en-SA` | usted; tu | SAR | Asia/Riyadh | metrico | 4 | ضريبة القيمة المضافة 15% | rec: zatca.gov.sa; bc: sama.gov.sa; trab: hrsd.gov.sa; of: laws.boe.gov.sa | si | 2 | 36 · 0.3 · 0.1 = 1.1 |
| dz | Argelia | الجزائر / Algérie | `dz fr fr-DZ`; `dz-ar ar ar-DZ` | usted; usted | DZD | Africa/Algiers | metrico | 135 | TVA 19% | rec: mfdgi.gov.dz; bc: bank-of-algeria.dz; of: joradp.dz | si | 2 | 33 · 0.05 · 1 = 1.7 |
| ar | Argentina (calcular.ar) | Argentina | `ar es es-AR` | vos | ARS; USD | America/Argentina/Buenos_Aires | metrico | 1500 | IVA 21% | of: boletinoficial.gob.ar; rec: arca.gob.ar; bc: bcra.gob.ar; trab: argentina.gob.ar | si | 1 | 39 · 0.12 · 1 = 4.7 |
| am | Armenia | Հայաստան | `am hy hy-AM` | usted | AMD | Asia/Yerevan | metrico | 400 | ԱԱՀ (VAT) 20% | rec: petekamutner.am; bc: cba.am; of: arlis.am | si | 4 | 2.6 · 0.12 · 0.1 = 0.0 |
| au | Australia | Australia | `au en en-AU` | tu | AUD | Australia/Sydney | metrico | 1.5 | GST 10% | of: legislation.gov.au; rec: ato.gov.au; bc: rba.gov.au; trab: fairwork.gov.au | si | 1 | 24.5 · 0.75 · 1 = 18.4 |
| at | Austria | Österreich | `at de de-AT` | usted | EUR | Europe/Vienna | metrico | 0.9 | USt (MwSt) 20% | of: ris.bka.gv.at; rec: bmf.gv.at; bc: oenb.at; trab: sozialministerium.gv.at | si | 1 | 8.2 · 0.55 · 1 = 4.5 |
| az | Azerbaiyán | Azərbaycan | `az az az-AZ` | usted | AZN | Asia/Baku | metrico | 2 | ƏDV 18% | rec: taxes.gov.az; bc: cbar.az; of: e-qanun.az | si | 3 | 9 · 0.1 · 0.4 = 0.4 |
| bs | Bahamas | Bahamas | `bs en en-BS` | tu | BSD | America/Nassau | metrico | 1 | VAT 10% | bc: centralbankbahamas.com | si | 3 | 0.37 · 0.6 · 1 = 0.2 |
| bd | Bangladés | বাংলাদেশ | `bd en en-BD` | tu | BDT | Asia/Dhaka | metrico | 120 | VAT 15% | rec: nbr.gov.bd; bc: bb.org.bd; of: bdlaws.minlaw.gov.bd; trab: mole.gov.bd | no | 2 | 77 · 0.02 · 1 = 1.5 |
| bb | Barbados | Barbados | `bb en en-BB` | tu | BBD | America/Barbados | metrico | 2 | VAT 17,5% | rec: bra.gov.bb; bc: centralbank.org.bb | si | 3 | 0.24 · 0.4 · 1 = 0.1 |
| bh | Baréin | البحرين | `bh en en-BH`; `bh-ar ar ar-BH` | tu; usted | BHD | Asia/Bahrain | metrico | 0.4 | VAT 10% | rec: nbr.gov.bh; bc: cbb.gov.bh; trab: lmra.gov.bh | si | 3 | 1.6 · 0.3 · 1 = 0.5 |
| be | Bélgica | België / Belgique | `be nl nl-BE`; `be-fr fr fr-BE` | tu; usted | EUR | Europe/Brussels | metrico | 0.9 | BTW/TVA 21% | of: ejustice.just.fgov.be; rec: finances.belgium.be; bc: nbb.be; trab: employment.belgium.be | si | 1 | 10.5 · 0.55 · 1 = 5.8 |
| bz | Belice | Belize | `bz en en-BZ` | tu | BZD | America/Belize | metrico | 2 | GST 12,5% | bc: centralbank.org.bz | si | 4 | 0.3 · 0.15 · 1 = 0.0 |
| bj | Benín | Bénin | `bj fr fr-BJ` | usted | XOF | Africa/Porto-Novo | metrico | 600 | TVA 18% | bc: bceao.int | si | 3 | 5 · 0.03 · 1 = 0.1 |
| by | Bielorrusia | Беларусь | `by ru ru-BY` | usted | BYN | Europe/Minsk | metrico | 3 | НДС 20% | rec: nalog.gov.by; bc: nbrb.by; of: pravo.by; trab: mintrud.gov.by | limitado (verificar) | 3 | 8.5 · 0.1 · 0.1 = 0.1 |
| bo | Bolivia (publicado) | Bolivia | `bo es es-BO` | usted | BOB; USD | America/La_Paz | metrico | 7 | IVA 13% | rec: impuestos.gob.bo; bc: bcb.gob.bo; trab: mintrabajo.gob.bo | si | 2 | 8 · 0.08 · 1 = 0.6 |
| ba | Bosnia y Herzegovina | Bosna i Hercegovina | `ba bs bs-BA` | usted | BAM | Europe/Sarajevo | metrico | 2 | PDV 17% | rec: uino.gov.ba; bc: cbbh.ba | si | 3 | 3 · 0.12 · 0.4 = 0.1 |
| bw | Botsuana | Botswana | `bw en en-BW` | tu | BWP | Africa/Gaborone | metrico | 14 | VAT 14% | rec: burs.org.bw; bc: bankofbotswana.bw | si | 3 | 1.5 · 0.15 · 1 = 0.2 |
| br | Brasil | Brasil | `br pt pt-BR` | tu | BRL | America/Sao_Paulo | metrico | 5 | ICMS 17-23% según estado (más IPI, ISS, PIS/COFINS; reforma IBS/CBS en transición) | of: in.gov.br; rec: receita.fazenda.gov.br; bc: bcb.gov.br; trab: gov.br | si | 1 | 181 · 0.1 · 1 = 18.1 |
| bn | Brunéi | Brunei Darussalam | `bn en en-BN` | tu | BND | Asia/Brunei | metrico | 1 | sin IVA | rec: mofe.gov.bn | si | 3 | 0.45 · 0.5 · 1 = 0.2 |
| bg | Bulgaria | България | `bg bg bg-BG` | usted | EUR | Europe/Sofia | metrico | 0.9 | ДДС 20% | rec: nra.bg; bc: bnb.bg; of: dv.parliament.bg | si | 3 | 5.5 · 0.12 · 0.1 = 0.1 |
| bf | Burkina Faso | Burkina Faso | `bf fr fr-BF` | usted | XOF | Africa/Ouagadougou | metrico | 600 | TVA 18% | bc: bceao.int | si | 3 | 6 · 0.03 · 1 = 0.2 |
| bi | Burundi | Burundi | `bi fr fr-BI` | usted | BIF | Africa/Bujumbura | metrico | 3000 | TVA 18% | rec: obr.bi; bc: brb.bi | si | 4 | 1.5 · 0.01 · 1 = 0.0 |
| bt | Bután | འབྲུག | `bt en en-BT` | tu | BTN | Asia/Thimphu | metrico | 85 | GST 5% desde 1/1/2026 (pista, verificar; antes sales tax 7%) | bc: rma.org.bt | si | 4 | 0.55 · 0.1 · 1 = 0.1 |
| cv | Cabo Verde | Cabo Verde | `cv pt pt-CV` | usted | CVE | Atlantic/Cape_Verde | metrico | 100 | IVA 15% | bc: bcv.cv | si | 4 | 0.4 · 0.15 · 1 = 0.1 |
| kh | Camboya | កម្ពុជា | `kh km km-KH` | usted | KHR; USD | Asia/Phnom_Penh | metrico | 4000 | VAT 10% | rec: tax.gov.kh; bc: nbc.gov.kh | si | 3 | 12 · 0.05 · 0.1 = 0.1 |
| cm | Camerún | Cameroun / Cameroon | `cm fr fr-CM`; `cm-en en en-CM` | usted; tu | XAF | Africa/Douala | metrico | 600 | TVA 19,25% | rec: impots.cm; bc: beac.int | si | 3 | 12 · 0.04 · 1 = 0.5 |
| ca | Canadá | Canada | `ca en en-CA`; `ca-fr fr fr-CA` | tu; usted | CAD | America/Toronto | metrico | 1.4 | GST 5% (más HST/PST/QST según provincia, 5-15%) | of: canadagazette.gc.ca; rec: canada.ca; bc: bankofcanada.ca; trab: canada.ca | si | 1 | 36 · 0.6 · 1 = 21.6 |
| qa | Catar | قطر | `qa en en-QA`; `qa-ar ar ar-QA` | tu; usted | QAR | Asia/Qatar | metrico | 4 | sin IVA | rec: gta.gov.qa; bc: qcb.gov.qa; trab: mol.gov.qa | si | 2 | 2.9 · 0.5 · 1 = 1.4 |
| td | Chad | Tchad / تشاد | `td fr fr-TD` | usted | XAF | Africa/Ndjamena | metrico | 600 | TVA 18% | bc: beac.int | si | 4 | 3.5 · 0.01 · 1 = 0.0 |
| cz | Chequia | Česko | `cz cs cs-CZ` | usted | CZK | Europe/Prague | metrico | 22 | DPH 21% | rec: financnisprava.cz; bc: cnb.cz; of: e-sbirka.cz; trab: mpsv.cz | si | 2 | 9.5 · 0.25 · 0.4 = 1.0 |
| cl | Chile (publicado) | Chile | `cl es es-CL` | tu | CLP | America/Santiago | metrico | 950 | IVA 19% | of: diariooficial.interior.gob.cl; rec: sii.cl; bc: bcentral.cl; trab: dt.gob.cl | si | 2 | 18 · 0.2 · 1 = 3.6 |
| cn | China | 中国 | `cn zh zh-CN` | tu | CNY | Asia/Shanghai | metrico | 7 | 增值税 (VAT) 13% | rec: chinatax.gov.cn; bc: pbc.gov.cn; of: gov.cn; trab: mohrss.gov.cn | limitado (verificar) | 2 | 1100 · 0.1 · 0.02 = 2.2 |
| cy | Chipre | Κύπρος / Kıbrıs | `cy el el-CY`; `cy-en en en-CY` | usted; tu | EUR | Asia/Nicosia | metrico | 0.9 | ΦΠΑ 19% | rec: mof.gov.cy; bc: centralbank.cy; of: cylaw.org; trab: mlsi.gov.cy | si | 4 | 1.3 · 0.35 · 0.1 = 0.0 |
| co | Colombia (publicado) | Colombia | `co es es-CO` | tu | COP | America/Bogota | metrico | 4000 | IVA 19% | of: suin-juriscol.gov.co; rec: dian.gov.co; bc: banrep.gov.co; trab: mintrabajo.gov.co | si | 2 | 40 · 0.1 · 1 = 4.0 |
| km | Comoras | Komori / Comores | `km fr fr-KM` | usted | KMF | Indian/Comoro | metrico | 450 | TVA 10% (verificar) |  | si | 4 | 0.35 · 0.02 · 1 = 0.0 |
| cg | Congo | Congo-Brazzaville | `cg fr fr-CG` | usted | XAF | Africa/Brazzaville | metrico | 600 | TVA 18,9% (verificar) | bc: beac.int | si | 4 | 1.6 · 0.03 · 1 = 0.0 |
| kp | Corea del Norte | 조선민주주의인민공화국 | `kp ko ko-KP` | usted | KPW | Asia/Pyongyang | metrico | 900 | sin datos |  | no | 4 | 0 · 0.001 · 0.01 = 0.0 |
| kr | Corea del Sur | 대한민국 | `kr ko ko-KR` | usted | KRW | Asia/Seoul | metrico | 1400 | 부가가치세 (VAT) 10% | rec: nts.go.kr; bc: bok.or.kr; of: law.go.kr; trab: moel.go.kr | si | 2 | 50 · 0.4 · 0.1 = 2.0 |
| ci | Costa de Marfil | Côte d'Ivoire | `ci fr fr-CI` | usted | XOF | Africa/Abidjan | metrico | 600 | TVA 18% | rec: dgi.gouv.ci; bc: bceao.int | si | 2 | 14 · 0.06 · 1 = 0.8 |
| cr | Costa Rica (publicado) | Costa Rica | `cr es es-CR` | usted | CRC; USD | America/Costa_Rica | metrico | 500 | IVA 13% | of: imprentanacional.go.cr; rec: hacienda.go.cr; bc: bccr.fi.cr; trab: mtss.go.cr | si | 2 | 4.7 · 0.2 · 1 = 0.9 |
| hr | Croacia | Hrvatska | `hr hr hr-HR` | usted | EUR | Europe/Zagreb | metrico | 0.9 | PDV 25% | of: narodne-novine.nn.hr; rec: porezna-uprava.gov.hr; bc: hnb.hr | si | 3 | 3.5 · 0.22 · 0.4 = 0.3 |
| cu | Cuba | Cuba | `cu es es-CU` | tu | CUP; USD | America/Havana | metrico | 120 | impuesto sobre ventas (verificar) | rec: onat.gob.cu; bc: bc.gob.cu; trab: mtss.gob.cu | no | 4 | 8 · 0.02 · 0.1 = 0.0 |
| dk | Dinamarca | Danmark | `dk da da-DK` | tu | DKK | Europe/Copenhagen | metrico | 7 | moms 25% | rec: skat.dk; bc: nationalbanken.dk; of: retsinformation.dk | si | 2 | 5.7 · 0.7 · 0.4 = 1.6 |
| dm | Dominica | Dominica | `dm en en-DM` | tu | XCD | America/Dominica | metrico | 3 | VAT 15% | rec: ird.gov.dm; bc: eccb-centralbank.org | si | 4 | 0.05 · 0.2 · 1 = 0.0 |
| ec | Ecuador (publicado) | Ecuador | `ec es es-EC` | tu | USD | America/Guayaquil | metrico | 1 | IVA 15% | rec: sri.gob.ec; bc: bce.fin.ec; of: registroficial.gob.ec; trab: trabajo.gob.ec | si | 2 | 14 · 0.1 · 1 = 1.4 |
| eg | Egipto | مصر | `eg ar ar-EG` | usted | EGP | Africa/Cairo | metrico | 50 | ضريبة القيمة المضافة 14% | rec: eta.gov.eg; bc: cbe.org.eg; trab: manpower.gov.eg | si | 3 | 82 · 0.04 · 0.1 = 0.3 |
| sv | El Salvador (publicado) | El Salvador | `sv es es-SV` | usted | USD | America/El_Salvador | metrico | 1 | IVA 13% | rec: mh.gob.sv; bc: bcr.gob.sv; of: diariooficial.gob.sv; trab: mtps.gob.sv | si | 3 | 4 · 0.12 · 1 = 0.5 |
| ae | Emiratos Árabes Unidos | الإمارات العربية المتحدة | `ae en en-AE`; `ae-ar ar ar-AE` | tu; usted | AED | Asia/Dubai | metrico | 4 | VAT 5% | rec: tax.gov.ae; bc: centralbank.ae; trab: mohre.gov.ae; of: uaelegislation.gov.ae | si | 2 | 10 · 0.4 · 1 = 4.0 |
| er | Eritrea | ኤርትራ | `er en en-ER` | tu | ERN | Africa/Asmara | metrico | 15 | sin datos (verificar) |  | si | 4 | 0.1 · 0.01 · 0.1 = 0.0 |
| sk | Eslovaquia | Slovensko | `sk sk sk-SK` | usted | EUR | Europe/Bratislava | metrico | 0.9 | DPH 23% | rec: financnasprava.sk; bc: nbs.sk; of: slov-lex.sk; trab: employment.gov.sk | si | 3 | 5 · 0.22 · 0.4 = 0.4 |
| si | Eslovenia | Slovenija | `si sl sl-SI` | usted | EUR | Europe/Ljubljana | metrico | 0.9 | DDV 22% | rec: fu.gov.si; bc: bsi.si; of: uradni-list.si; trab: gov.si | si | 3 | 1.8 · 0.3 · 0.4 = 0.2 |
| es | España | España | `es es es-ES` | tu | EUR | Europe/Madrid | metrico | 0.9 | IVA 21% | of: boe.es; rec: agenciatributaria.es; bc: bde.es; trab: seg-social.es | si | 1 | 44 · 0.3 · 1 = 13.2 |
| us | Estados Unidos | United States | `us en en-US`; `us-es es es-US` | tu; tu | USD | America/New_York | imperial | 1 | sin IVA federal; sales tax estatal y local 0-10% | of: federalregister.gov; rec: irs.gov; bc: federalreserve.gov; trab: dol.gov | si | 1 | 310 · 1 · 1 = 310.0 |
| ee | Estonia | Eesti | `ee et et-EE` | tu | EUR | Europe/Tallinn | metrico | 0.9 | käibemaks 24% | of: riigiteataja.ee; rec: emta.ee; bc: eestipank.ee; trab: sm.ee | si | 3 | 1.3 · 0.4 · 0.4 = 0.2 |
| sz | Esuatini | Eswatini | `sz en en-SZ` | tu | SZL | Africa/Mbabane | metrico | 18 | VAT 15% | rec: sra.org.sz; bc: centralbank.org.sz | si | 4 | 0.6 · 0.08 · 1 = 0.0 |
| et | Etiopía | ኢትዮጵያ | `et en en-ET` | tu | ETB | Africa/Addis_Ababa | metrico | 150 | VAT 15% | rec: mor.gov.et; bc: nbe.gov.et | si | 3 | 25 · 0.02 · 1 = 0.5 |
| ph | Filipinas | Pilipinas | `ph en en-PH` | tu | PHP | Asia/Manila | metrico | 58 | VAT 12% | rec: bir.gov.ph; bc: bsp.gov.ph; of: officialgazette.gov.ph; trab: dole.gov.ph | si | 2 | 85 · 0.05 · 1 = 4.2 |
| fi | Finlandia | Suomi | `fi fi fi-FI` | tu | EUR | Europe/Helsinki | metrico | 0.9 | ALV 25,5% | rec: vero.fi; bc: suomenpankki.fi; of: finlex.fi; trab: tem.fi | si | 2 | 5.3 · 0.55 · 0.4 = 1.2 |
| fj | Fiyi | Fiji | `fj en en-FJ` | tu | FJD | Pacific/Fiji | metrico | 2 | VAT 15% | rec: frcs.org.fj; bc: rbf.gov.fj | si | 3 | 0.65 · 0.15 · 1 = 0.1 |
| fr | Francia | France | `fr fr fr-FR` | usted | EUR | Europe/Paris | metrico | 0.9 | TVA 20% | of: legifrance.gouv.fr; rec: impots.gouv.fr; bc: banque-france.fr; trab: travail-emploi.gouv.fr | si | 1 | 58 · 0.45 · 1 = 26.1 |
| ga | Gabón | Gabon | `ga fr fr-GA` | usted | XAF | Africa/Libreville | metrico | 600 | TVA 18% | bc: beac.int | si | 3 | 1.5 · 0.07 · 1 = 0.1 |
| gm | Gambia | The Gambia | `gm en en-GM` | tu | GMD | Africa/Banjul | metrico | 70 | VAT 15% | rec: gra.gm; bc: cbg.gm | si | 4 | 1.2 · 0.02 · 1 = 0.0 |
| ge | Georgia | საქართველო | `ge ka ka-GE` | tu | GEL | Asia/Tbilisi | metrico | 3 | დღგ (VAT) 18% | rec: rs.ge; bc: nbg.gov.ge; of: matsne.gov.ge | si | 4 | 3 · 0.15 · 0.1 = 0.0 |
| gh | Ghana | Ghana | `gh en en-GH` | tu | GHS | Africa/Accra | metrico | 12 | VAT 15% más NHIL y GETFund 5% (efectivo 20% desde 1/1/2026; verificar) | rec: gra.gov.gh; bc: bog.gov.gh | no | 2 | 24 · 0.04 · 1 = 1.0 |
| gd | Granada | Grenada | `gd en en-GD` | tu | XCD | America/Grenada | metrico | 3 | VAT 15% | rec: ird.gov.gd; bc: eccb-centralbank.org | si | 4 | 0.09 · 0.2 · 1 = 0.0 |
| gr | Grecia | Ελλάδα | `gr el el-GR` | usted | EUR | Europe/Athens | metrico | 0.9 | ΦΠΑ 24% | of: et.gr; rec: aade.gr; bc: bankofgreece.gr; trab: ypergasias.gov.gr | si | 3 | 8.5 · 0.22 · 0.1 = 0.2 |
| gt | Guatemala (publicado) | Guatemala | `gt es es-GT` | usted | GTQ | America/Guatemala | metrico | 8 | IVA 12% | rec: sat.gob.gt; bc: banguat.gob.gt; of: dca.gob.gt; trab: mintrabajo.gob.gt | si | 2 | 9.5 · 0.1 · 1 = 1.0 |
| gn | Guinea | Guinée | `gn fr fr-GN` | usted | GNF | Africa/Conakry | metrico | 9000 | TVA 18% | rec: dgi.gov.gn; bc: bcrg-guinee.org | si | 3 | 4.5 · 0.02 · 1 = 0.1 |
| gq | Guinea Ecuatorial | Guinea Ecuatorial | `gq es es-GQ` | usted | XAF | Africa/Malabo | metrico | 600 | IVA 15% (verificar) | bc: beac.int | no | 4 | 0.5 · 0.1 · 0.7 = 0.0 |
| gw | Guinea-Bisáu | Guiné-Bissau | `gw pt pt-GW` | usted | XOF | Africa/Bissau | metrico | 600 | IGV 15% (verificar) | bc: bceao.int | si | 4 | 0.5 · 0.01 · 1 = 0.0 |
| gy | Guyana | Guyana | `gy en en-GY` | tu | GYD | America/Guyana | metrico | 210 | VAT 14% | rec: gra.gov.gy; bc: bankofguyana.org.gy | si | 3 | 0.6 · 0.2 · 1 = 0.1 |
| ht | Haití | Ayiti / Haïti | `ht fr fr-HT` | usted | HTG; USD | America/Port-au-Prince | metrico | 130 | TCA 10% | rec: dgi.gouv.ht; bc: brh.ht | no | 3 | 3.5 · 0.02 · 1 = 0.1 |
| hn | Honduras (publicado) | Honduras | `hn es es-HN` | usted | HNL | America/Tegucigalpa | metrico | 26 | ISV 15% | rec: sar.gob.hn; bc: bch.hn; of: lagaceta.hn; trab: trabajo.gob.hn | si | 3 | 5 · 0.08 · 1 = 0.4 |
| hk | Hong Kong | 香港 | `hk en en-HK`; `hk-zh zh zh-HK` | tu; tu | HKD | Asia/Hong_Kong | metrico | 8 | sin IVA | rec: ird.gov.hk; bc: hkma.gov.hk; trab: labour.gov.hk; of: elegislation.gov.hk | si | 2 | 6.9 · 0.6 · 1 = 4.1 |
| hu | Hungría | Magyarország | `hu hu hu-HU` | usted | HUF | Europe/Budapest | metrico | 350 | ÁFA 27% | of: magyarkozlony.hu; rec: nav.gov.hu; bc: mnb.hu | si | 2 | 8.8 · 0.2 · 0.4 = 0.7 |
| in | India | भारत | `in en en-IN`; `in-hi hi hi-IN` | tu; usted | INR | Asia/Kolkata | metrico | 90 | GST 18% (tramos 5% y 18%; 40% bienes de lujo) | of: egazette.gov.in; rec: incometax.gov.in; bc: rbi.org.in; trab: labour.gov.in | limitado (verificar) | 1 | 800 · 0.035 · 1 = 28.0 |
| id | Indonesia | Indonesia | `id id id-ID` | usted | IDR | Asia/Jakarta | metrico | 16000 | PPN 12% nominal (efectivo 11% en lo general; verificar) | rec: pajak.go.id; bc: bi.go.id; of: peraturan.go.id; trab: kemnaker.go.id | limitado (verificar) | 2 | 215 · 0.05 · 0.4 = 4.3 |
| iq | Irak | العراق | `iq ar ar-IQ` | usted | IQD; USD | Asia/Baghdad | metrico | 1300 | sin IVA general (verificar) | bc: cbi.iq | no | 3 | 30 · 0.04 · 0.2 = 0.2 |
| ir | Irán | ایران | `ir fa fa-IR` | usted | IRR | Asia/Tehran | metrico | 1000000 | ارزش افزوده 10% (verificar) | rec: tax.gov.ir; bc: cbi.ir; trab: mcls.gov.ir | no | 3 | 70 · 0.03 · 0.05 = 0.1 |
| ie | Irlanda | Éire / Ireland | `ie en en-IE` | tu | EUR | Europe/Dublin | metrico | 0.9 | VAT 23% | of: irishstatutebook.ie; rec: revenue.ie; bc: centralbank.ie; trab: workplacerelations.ie | si | 2 | 4.8 · 0.6 · 1 = 2.9 |
| is | Islandia | Ísland | `is is is-IS` | tu | ISK | Atlantic/Reykjavik | metrico | 130 | VSK 24% | rec: skatturinn.is; bc: cb.is | si | 3 | 0.38 · 0.6 · 0.4 = 0.1 |
| mh | Islas Marshall | Marshall Islands | `mh en en-MH` | tu | USD | Pacific/Majuro | metrico | 1 | sin IVA (impuesto sobre ingresos brutos, verificar) |  | si | 4 | 0.03 · 0.08 · 1 = 0.0 |
| sb | Islas Salomón | Solomon Islands | `sb en en-SB` | tu | SBD | Pacific/Guadalcanal | metrico | 8 | sales tax (verificar) |  | si | 4 | 0.2 · 0.03 · 1 = 0.0 |
| il | Israel | ישראל | `il he he-IL` | tu | ILS | Asia/Jerusalem | metrico | 3.5 | מע"מ 18% | rec: gov.il; bc: boi.org.il | si | 3 | 8.5 · 0.5 · 0.1 = 0.4 |
| it | Italia | Italia | `it it it-IT` | usted | EUR | Europe/Rome | metrico | 0.9 | IVA 22% | of: gazzettaufficiale.it; rec: agenziaentrate.gov.it; bc: bancaditalia.it; trab: lavoro.gov.it | si | 1 | 50 · 0.35 · 1 = 17.5 |
| jm | Jamaica | Jamaica | `jm en en-JM` | tu | JMD | America/Jamaica | metrico | 160 | GCT 15% | rec: jamaicatax.gov.jm; bc: boj.org.jm; trab: mlss.gov.jm | si | 3 | 2.2 · 0.15 · 1 = 0.3 |
| jp | Japón | 日本 | `jp ja ja-JP` | usted | JPY | Asia/Tokyo | metrico | 150 | 消費税 10% | of: kanpou.npb.go.jp; rec: nta.go.jp; bc: boj.or.jp; trab: mhlw.go.jp | si | 2 | 118 · 0.3 · 0.1 = 3.5 |
| jo | Jordania | الأردن | `jo ar ar-JO` | usted | JOD | Asia/Amman | metrico | 0.7 | ضريبة المبيعات 16% | rec: istd.gov.jo; bc: cbj.gov.jo; trab: mol.gov.jo | si | 3 | 9.5 · 0.12 · 0.1 = 0.1 |
| kz | Kazajistán | Қазақстан | `kz ru ru-KZ` | usted | KZT | Asia/Almaty | metrico | 500 | НДС 16% (desde 1/1/2026) | rec: kgd.gov.kz; bc: nationalbank.kz; of: adilet.zan.kz; trab: enbek.gov.kz | si | 3 | 18 · 0.15 · 0.1 = 0.3 |
| ke | Kenia | Kenya | `ke en en-KE` | tu | KES | Africa/Nairobi | metrico | 130 | VAT 16% | of: kenyalaw.org; rec: kra.go.ke; bc: centralbank.go.ke; trab: labour.go.ke | si | 2 | 23 · 0.04 · 1 = 0.9 |
| kg | Kirguistán | Кыргызстан | `kg ru ru-KG` | usted | KGS | Asia/Bishkek | metrico | 87 | НДС 12% | rec: sti.gov.kg; bc: nbkr.kg | si | 4 | 5.3 · 0.04 · 0.1 = 0.0 |
| ki | Kiribati | Kiribati | `ki en en-KI` | tu | AUD | Pacific/Tarawa | metrico | 1.5 | VAT 12,5% (verificar) |  | si | 4 | 0.05 · 0.05 · 1 = 0.0 |
| xk | Kosovo | Kosova | `xk sq sq-XK` | usted | EUR | Europe/Belgrade | metrico | 0.9 | TVSH 18% | rec: atk-ks.org; bc: bqk-kos.org; of: gzk.rks-gov.net | no | 3 | 1.6 · 0.1 · 0.4 = 0.1 |
| kw | Kuwait | الكويت | `kw en en-KW`; `kw-ar ar ar-KW` | tu; usted | KWD | Asia/Kuwait | metrico | 0.3 | sin IVA | rec: mof.gov.kw; bc: cbk.gov.kw | si | 2 | 4.3 · 0.4 · 1 = 1.7 |
| la | Laos | ລາວ | `la lo lo-LA` | usted | LAK | Asia/Vientiane | metrico | 21000 | VAT 10% (verificar) | bc: bol.gov.la | si | 4 | 5 · 0.03 · 0.1 = 0.0 |
| ls | Lesoto | Lesotho | `ls en en-LS` | tu | LSL | Africa/Maseru | metrico | 18 | VAT 15% | rec: lra.org.ls; bc: centralbank.org.ls | si | 4 | 0.8 · 0.03 · 1 = 0.0 |
| lv | Letonia | Latvija | `lv lv lv-LV` | usted | EUR | Europe/Riga | metrico | 0.9 | PVN 21% | rec: vid.gov.lv; bc: bank.lv; of: likumi.lv; trab: lm.gov.lv | si | 3 | 1.7 · 0.25 · 0.4 = 0.2 |
| lb | Líbano | لبنان | `lb ar ar-LB` | usted | LBP; USD | Asia/Beirut | metrico | 90000 | TVA 11% | rec: finance.gov.lb; bc: bdl.gov.lb; trab: labor.gov.lb | no | 3 | 5 · 0.1 · 0.3 = 0.1 |
| lr | Liberia | Liberia | `lr en en-LR` | tu | LRD; USD | Africa/Monrovia | imperial | 200 | GST 10% | rec: lra.gov.lr; bc: cbl.org.lr | no | 4 | 1.2 · 0.02 · 1 = 0.0 |
| ly | Libia | ليبيا | `ly ar ar-LY` | usted | LYD | Africa/Tripoli | metrico | 5 | sin IVA | bc: cbl.gov.ly | no | 4 | 6 · 0.06 · 0.1 = 0.0 |
| li | Liechtenstein | Liechtenstein | `li de de-LI` | usted | CHF | Europe/Vaduz | metrico | 0.8 | MWST 8,1% | rec: llv.li; of: gesetze.li | si | 4 | 0.04 · 0.85 · 1 = 0.0 |
| lt | Lituania | Lietuva | `lt lt lt-LT` | usted | EUR | Europe/Vilnius | metrico | 0.9 | PVM 21% | rec: vmi.lt; bc: lb.lt; of: e-tar.lt; trab: socmin.lt | si | 3 | 2.5 · 0.25 · 0.4 = 0.2 |
| lu | Luxemburgo | Lëtzebuerg / Luxembourg | `lu fr fr-LU`; `lu-de de de-LU` | usted; usted | EUR | Europe/Luxembourg | metrico | 0.9 | TVA 17% | of: legilux.public.lu; rec: guichet.public.lu; bc: bcl.lu | si | 3 | 0.62 · 0.8 · 1 = 0.5 |
| mo | Macao | 澳門 / Macau | `mo zh zh-MO` | tu | MOP | Asia/Macau | metrico | 8 | sin IVA | rec: dsf.gov.mo; bc: amcm.gov.mo; trab: dsal.gov.mo | no | 4 | 0.6 · 0.5 · 0.1 = 0.0 |
| mk | Macedonia del Norte | Северна Македонија | `mk mk mk-MK` | usted | MKD | Europe/Skopje | metrico | 55 | ДДВ 18% | rec: ujp.gov.mk; bc: nbrm.mk | si | 4 | 1.7 · 0.12 · 0.1 = 0.0 |
| mg | Madagascar | Madagasikara / Madagascar | `mg fr fr-MG` | usted | MGA | Indian/Antananarivo | metrico | 4500 | TVA 20% | rec: impots.mg; bc: banque-centrale.mg | si | 4 | 5 · 0.01 · 1 = 0.1 |
| my | Malasia | Malaysia | `my en en-MY`; `my-ms ms ms-MY` | tu; usted | MYR | Asia/Kuala_Lumpur | metrico | 4.5 | SST: sales tax 5-10% y service tax 6-8% | rec: hasil.gov.my; bc: bnm.gov.my; trab: mohr.gov.my | si | 2 | 33 · 0.12 · 1 = 4.0 |
| mw | Malaui | Malawi | `mw en en-MW` | tu | MWK | Africa/Blantyre | metrico | 1750 | VAT 16,5% | rec: mra.mw; bc: rbm.mw | si | 4 | 3.5 · 0.01 · 1 = 0.0 |
| mv | Maldivas | ދިވެހިރާއްޖެ | `mv en en-MV` | tu | MVR | Indian/Maldives | metrico | 15 | GST 8% (17% turismo) | rec: mira.gov.mv; bc: mma.gov.mv | si | 3 | 0.5 · 0.25 · 1 = 0.1 |
| ml | Malí | Mali | `ml fr fr-ML` | usted | XOF | Africa/Bamako | metrico | 600 | TVA 18% | bc: bceao.int | si | 3 | 8 · 0.02 · 1 = 0.2 |
| mt | Malta | Malta | `mt en en-MT` | tu | EUR | Europe/Malta | metrico | 0.9 | VAT 18% | of: legislation.mt; rec: cfr.gov.mt; bc: centralbankmalta.org | si | 3 | 0.5 · 0.35 · 1 = 0.2 |
| ma | Marruecos | المغرب / Maroc | `ma fr fr-MA`; `ma-ar ar ar-MA` | usted; usted | MAD | Africa/Casablanca | metrico | 10 | TVA 20% | of: sgg.gov.ma; rec: tax.gov.ma; bc: bkam.ma; trab: travail.gov.ma | si | 2 | 33 · 0.08 · 1 = 2.6 |
| mu | Mauricio | Maurice / Mauritius | `mu en en-MU`; `mu-fr fr fr-MU` | tu; usted | MUR | Indian/Mauritius | metrico | 45 | VAT 15% | rec: mra.mu; bc: bom.mu | si | 3 | 1.2 · 0.2 · 1 = 0.2 |
| mr | Mauritania | موريتانيا / Mauritanie | `mr ar ar-MR` | usted | MRU | Africa/Nouakchott | metrico | 40 | TVA 16% | bc: bcm.mr | si | 4 | 1.9 · 0.03 · 0.1 = 0.0 |
| mx | México (publicado) | México | `mx es es-MX` | tu | MXN | America/Mexico_City | metrico | 20 | IVA 16% | of: dof.gob.mx; rec: sat.gob.mx; bc: banxico.org.mx; trab: stps.gob.mx | si | 1 | 100 · 0.1 · 1 = 10.0 |
| fm | Micronesia | Micronesia | `fm en en-FM` | tu | USD | Pacific/Pohnpei | metrico | 1 | sin IVA (verificar) |  | si | 4 | 0.06 · 0.06 · 1 = 0.0 |
| md | Moldavia | Moldova | `md ro ro-MD` | usted | MDL | Europe/Chisinau | metrico | 18 | TVA 20% | rec: sfs.md; bc: bnm.md; of: legis.md | si | 3 | 2.5 · 0.1 · 0.4 = 0.1 |
| mc | Mónaco | Monaco | `mc fr fr-MC` | usted | EUR | Europe/Monaco | metrico | 0.9 | TVA 20% | of: legimonaco.mc; rec: service-public-entreprises.gouv.mc | si | 4 | 0.04 · 0.8 · 1 = 0.0 |
| mn | Mongolia | Монгол Улс | `mn mn mn-MN` | usted | MNT | Asia/Ulaanbaatar | metrico | 3500 | НӨАТ 10% | rec: mta.gov.mn; bc: mongolbank.mn; of: legalinfo.mn; trab: mlsp.gov.mn | si | 4 | 2.8 · 0.1 · 0.1 = 0.0 |
| me | Montenegro | Crna Gora | `me sr sr-ME` | usted | EUR | Europe/Podgorica | metrico | 0.9 | PDV 21% | bc: cbcg.me | si | 4 | 0.55 · 0.2 · 0.1 = 0.0 |
| mz | Mozambique | Moçambique | `mz pt pt-MZ` | usted | MZN | Africa/Maputo | metrico | 64 | IVA 16% | rec: at.gov.mz; bc: bancomoc.mz | si | 3 | 7 · 0.02 · 1 = 0.1 |
| mm | Myanmar | မြန်မာ | `mm my my-MM` | usted | MMK; USD | Asia/Yangon | imperial | 2000 | commercial tax 5% (verificar) | rec: ird.gov.mm; bc: cbm.gov.mm | no | 4 | 25 · 0.03 · 0.05 = 0.0 |
| na | Namibia | Namibia | `na en en-NA` | tu | NAD | Africa/Windhoek | metrico | 18 | VAT 15% | rec: namra.org.na; bc: bon.com.na | si | 3 | 1.7 · 0.12 · 1 = 0.2 |
| nr | Nauru | Nauru | `nr en en-NR` | tu | AUD | Pacific/Nauru | metrico | 1.5 | sin IVA (verificar) |  | si | 4 | 0.01 · 0.05 · 1 = 0.0 |
| np | Nepal | नेपाल | `np en en-NP` | tu | NPR | Asia/Kathmandu | metrico | 140 | VAT 13% | rec: ird.gov.np; bc: nrb.org.np; of: lawcommission.gov.np; trab: moless.gov.np | si | 3 | 15 · 0.03 · 1 = 0.4 |
| ni | Nicaragua (publicado) | Nicaragua | `ni es es-NI` | vos | NIO; USD | America/Managua | metrico | 37 | IVA 15% | rec: dgi.gob.ni; bc: bcn.gob.ni; trab: mitrab.gob.ni | si | 3 | 3.5 · 0.06 · 1 = 0.2 |
| ne | Níger | Niger | `ne fr fr-NE` | usted | XOF | Africa/Niamey | metrico | 600 | TVA 19% | bc: bceao.int | si | 4 | 4 · 0.01 · 1 = 0.0 |
| ng | Nigeria | Nigeria | `ng en en-NG` | tu | NGN | Africa/Lagos | metrico | 1500 | VAT 7,5% | rec: firs.gov.ng; bc: cbn.gov.ng; trab: labour.gov.ng | si | 2 | 100 · 0.03 · 1 = 3.0 |
| no | Noruega | Norge | `no nb nb-NO` | tu | NOK | Europe/Oslo | metrico | 10 | MVA 25% | rec: skatteetaten.no; bc: norges-bank.no; of: lovdata.no; trab: nav.no | si | 2 | 5.3 · 0.75 · 0.4 = 1.6 |
| nz | Nueva Zelanda | New Zealand / Aotearoa | `nz en en-NZ` | tu | NZD | Pacific/Auckland | metrico | 1.7 | GST 15% | rec: ird.govt.nz; bc: rbnz.govt.nz; of: legislation.govt.nz; trab: employment.govt.nz | si | 2 | 4.8 · 0.65 · 1 = 3.1 |
| om | Omán | عُمان | `om ar ar-OM`; `om-en en en-OM` | usted; tu | OMR | Asia/Muscat | metrico | 0.4 | VAT 5% | rec: taxoman.gov.om; bc: cbo.gov.om; trab: mol.gov.om | si | 3 | 4.8 · 0.3 · 0.1 = 0.1 |
| nl | Países Bajos | Nederland | `nl nl nl-NL` | tu | EUR | Europe/Amsterdam | metrico | 0.9 | BTW 21% | of: officielebekendmakingen.nl; rec: belastingdienst.nl; bc: dnb.nl; trab: uwv.nl | si | 1 | 16.5 · 0.6 · 1 = 9.9 |
| pk | Pakistán | پاکستان | `pk en en-PK` | tu | PKR | Asia/Karachi | metrico | 280 | GST 18% | rec: fbr.gov.pk; bc: sbp.org.pk; of: pakistancode.gov.pk | no | 2 | 110 · 0.025 · 1 = 2.8 |
| pw | Palaos | Palau | `pw en en-PW` | tu | USD | Pacific/Palau | metrico | 1 | sin IVA (impuesto sobre ingresos brutos, verificar) |  | si | 4 | 0.02 · 0.15 · 1 = 0.0 |
| ps | Palestina | فلسطين | `ps ar ar-PS` | usted | ILS; USD | Asia/Hebron | metrico | 3.5 | VAT 16% | rec: mof.gov.ps; bc: pma.ps | no | 4 | 3.8 · 0.08 · 0.1 = 0.0 |
| pa | Panamá (publicado) | Panamá | `pa es es-PA` | tu | PAB; USD | America/Panama | metrico | 1 | ITBMS 7% | rec: dgi.mef.gob.pa; of: gacetaoficial.gob.pa; trab: mitradel.gob.pa | si | 2 | 3.7 · 0.2 · 1 = 0.7 |
| pg | Papúa Nueva Guinea | Papua Niugini | `pg en en-PG` | tu | PGK | Pacific/Port_Moresby | metrico | 4 | GST 10% | rec: irc.gov.pg; bc: bankpng.gov.pg | si | 4 | 1.5 · 0.04 · 1 = 0.1 |
| py | Paraguay (publicado) | Paraguay | `py es es-PY` | vos | PYG | America/Asuncion | metrico | 7500 | IVA 10% | rec: dnit.gov.py; bc: bcp.gov.py; of: gacetaoficial.gov.py; trab: mtess.gov.py | si | 3 | 6 · 0.08 · 1 = 0.5 |
| pe | Perú (publicado) | Perú | `pe es es-PE` | tu | PEN; USD | America/Lima | metrico | 4 | IGV 18% (16% más 2% IPM) | rec: sunat.gob.pe; bc: bcrp.gob.pe; of: elperuano.pe; trab: gob.pe | si | 2 | 24 · 0.1 · 1 = 2.4 |
| pl | Polonia | Polska | `pl pl pl-PL` | tu | PLN | Europe/Warsaw | metrico | 4 | VAT (PTU) 23% | of: isap.sejm.gov.pl; rec: podatki.gov.pl; bc: nbp.pl; trab: zus.pl | si | 2 | 32 · 0.25 · 0.4 = 3.2 |
| pt | Portugal | Portugal | `pt pt pt-PT` | usted | EUR | Europe/Lisbon | metrico | 0.9 | IVA 23% | of: diariodarepublica.pt; rec: portaldasfinancas.gov.pt; bc: bportugal.pt; trab: seg-social.pt | si | 2 | 8.7 · 0.25 · 1 = 2.2 |
| pr | Puerto Rico | Puerto Rico | `pr es es-PR` | tu | USD | America/Puerto_Rico | imperial | 1 | IVU 11,5% (10,5% estatal más 1% municipal) | rec: hacienda.pr.gov; trab: trabajo.pr.gov | si (via EE. UU., verificar) | 2 | 2.9 · 0.45 · 1 = 1.3 |
| gb | Reino Unido | United Kingdom | `gb en en-GB` | tu | GBP | Europe/London | metrico | 0.8 | VAT 20% | of: legislation.gov.uk; rec: gov.uk; bc: bankofengland.co.uk; trab: acas.org.uk | si | 1 | 66 · 0.7 · 1 = 46.2 |
| cf | República Centroafricana | Centrafrique | `cf fr fr-CF` | usted | XAF | Africa/Bangui | metrico | 600 | TVA 19% | bc: beac.int | no | 4 | 0.5 · 0.01 · 1 = 0.0 |
| cd | República Democrática del Congo | RD Congo | `cd fr fr-CD` | usted | CDF | Africa/Kinshasa | metrico | 3000 | TVA 16% | rec: dgi.gouv.cd; bc: bcc.cd | si | 3 | 25 · 0.01 · 1 = 0.2 |
| do | República Dominicana (publicado) | República Dominicana | `do es es-DO` | tu | DOP; USD | America/Santo_Domingo | metrico | 60 | ITBIS 18% | rec: dgii.gov.do; bc: bancentral.gov.do; trab: mt.gob.do | si | 2 | 9 · 0.1 · 1 = 0.9 |
| rw | Ruanda | Rwanda | `rw en en-RW` | tu | RWF | Africa/Kigali | metrico | 1450 | VAT 18% | rec: rra.gov.rw; bc: bnr.rw | si | 3 | 4 · 0.03 · 1 = 0.1 |
| ro | Rumania | România | `ro ro ro-RO` | usted | RON | Europe/Bucharest | metrico | 4.5 | TVA 21% | rec: anaf.ro; bc: bnr.ro; of: monitoruloficial.ro; trab: mmuncii.gov.ro | si | 2 | 17 · 0.15 · 0.4 = 1.0 |
| ru | Rusia | Россия | `ru ru ru-RU` | usted | RUB | Europe/Moscow | metrico | 85 | НДС 22% (desde 1/1/2026) | rec: nalog.gov.ru; bc: cbr.ru; of: publication.pravo.gov.ru; trab: mintrud.gov.ru | no | 2 | 130 · 0.15 · 0.05 = 1.0 |
| ws | Samoa | Sāmoa | `ws en en-WS` | tu | WST | Pacific/Apia | metrico | 3 | VAGST 15% | rec: revenue.gov.ws; bc: cbs.gov.ws | si | 4 | 0.1 · 0.06 · 1 = 0.0 |
| kn | San Cristóbal y Nieves | Saint Kitts and Nevis | `kn en en-KN` | tu | XCD | America/St_Kitts | metrico | 3 | VAT 17% | bc: eccb-centralbank.org | si | 4 | 0.04 · 0.2 · 1 = 0.0 |
| sm | San Marino | San Marino | `sm it it-SM` | usted | EUR | Europe/San_Marino | metrico | 0.9 | IGR 17% (verificar) |  | si | 4 | 0.03 · 0.5 · 1 = 0.0 |
| vc | San Vicente y las Granadinas | Saint Vincent and the Grenadines | `vc en en-VC` | tu | XCD | America/St_Vincent | metrico | 3 | VAT 16% | rec: ird.gov.vc; bc: eccb-centralbank.org | si | 4 | 0.08 · 0.12 · 1 = 0.0 |
| lc | Santa Lucía | Saint Lucia | `lc en en-LC` | tu | XCD | America/St_Lucia | metrico | 3 | VAT 12,5% | rec: ird.gov.lc; bc: eccb-centralbank.org | si | 4 | 0.15 · 0.15 · 1 = 0.0 |
| st | Santo Tomé y Príncipe | São Tomé e Príncipe | `st pt pt-ST` | usted | STN | Africa/Sao_Tome | metrico | 22 | IVA 15% (verificar) | bc: bcstp.st | si | 4 | 0.12 · 0.02 · 1 = 0.0 |
| sn | Senegal | Sénégal | `sn fr fr-SN` | usted | XOF | Africa/Dakar | metrico | 600 | TVA 18% | bc: bceao.int | si | 3 | 11 · 0.05 · 1 = 0.6 |
| rs | Serbia | Србија / Srbija | `rs sr sr-RS` | usted | RSD | Europe/Belgrade | metrico | 100 | PDV 20% | rec: purs.gov.rs; bc: nbs.rs; trab: minrzs.gov.rs | si | 3 | 6 · 0.18 · 0.1 = 0.1 |
| sc | Seychelles | Seychelles | `sc en en-SC` | tu | SCR | Indian/Mahe | metrico | 14 | VAT 15% | rec: src.gov.sc; bc: cbs.sc | si | 4 | 0.1 · 0.3 · 1 = 0.0 |
| sl | Sierra Leona | Sierra Leone | `sl en en-SL` | tu | SLE | Africa/Freetown | metrico | 23 | GST 15% | rec: nra.gov.sl; bc: bsl.gov.sl | si | 4 | 1.5 · 0.01 · 1 = 0.0 |
| sg | Singapur | Singapore | `sg en en-SG` | tu | SGD | Asia/Singapore | metrico | 1 | GST 9% | rec: iras.gov.sg; bc: mas.gov.sg; of: sso.agc.gov.sg; trab: mom.gov.sg | si | 2 | 5.5 · 0.6 · 1 = 3.3 |
| sy | Siria | سوريا | `sy ar ar-SY` | usted | SYP; USD | Asia/Damascus | metrico | 120 | sin datos (verificar) | bc: cb.gov.sy | no | 4 | 10 · 0.01 · 0.05 = 0.0 |
| so | Somalia | Soomaaliya | `so so so-SO` | tu | SOS; USD | Africa/Mogadishu | metrico | 570 | sin IVA general (verificar) |  | si | 4 | 2.8 · 0.01 · 0.4 = 0.0 |
| lk | Sri Lanka | ශ්‍රී ලංකා / இலங்கை | `lk en en-LK` | tu | LKR | Asia/Colombo | metrico | 300 | VAT 18% | rec: ird.gov.lk; bc: cbsl.gov.lk; of: documents.gov.lk; trab: labourdept.gov.lk | si | 2 | 12 · 0.06 · 1 = 0.7 |
| za | Sudáfrica | South Africa | `za en en-ZA` | tu | ZAR | Africa/Johannesburg | metrico | 18 | VAT 15% | of: gpwonline.co.za; rec: sars.gov.za; bc: resbank.co.za; trab: labour.gov.za | si | 1 | 45 · 0.15 · 1 = 6.8 |
| sd | Sudán | السودان | `sd ar ar-SD` | usted | SDG | Africa/Khartoum | metrico | 600 | VAT 17% (verificar) | bc: cbos.gov.sd | no | 4 | 12 · 0.01 · 0.05 = 0.0 |
| ss | Sudán del Sur | South Sudan | `ss en en-SS` | tu | SSP; USD | Africa/Juba | metrico | 5000 | sin datos (verificar) |  | no | 4 | 1 · 0.005 · 0.1 = 0.0 |
| se | Suecia | Sverige | `se sv sv-SE` | tu | SEK | Europe/Stockholm | metrico | 10 | moms 25% | rec: skatteverket.se; bc: riksbank.se; of: riksdagen.se; trab: arbetsformedlingen.se | si | 2 | 9.9 · 0.65 · 0.4 = 2.6 |
| ch | Suiza | Schweiz / Suisse / Svizzera | `ch de de-CH`; `ch-fr fr fr-CH`; `ch-it it it-CH` | usted; usted; usted | CHF | Europe/Zurich | metrico | 0.8 | MWST/TVA/IVA 8,1% | of: fedlex.admin.ch; rec: estv.admin.ch; bc: snb.ch; trab: seco.admin.ch | si | 1 | 8.4 · 0.85 · 1 = 7.1 |
| sr | Surinam | Suriname | `sr nl nl-SR` | tu | SRD | America/Paramaribo | metrico | 38 | BTW 10% | bc: cbvs.sr | si | 3 | 0.45 · 0.15 · 1 = 0.1 |
| th | Tailandia | ประเทศไทย | `th th th-TH` | usted | THB | Asia/Bangkok | metrico | 33 | VAT 7% | rec: rd.go.th; bc: bot.or.th; of: ratchakitcha.soc.go.th; trab: mol.go.th | si | 2 | 62 · 0.1 · 0.1 = 0.6 |
| tw | Taiwán | 臺灣 | `tw zh zh-TW` | tu | TWD | Asia/Taipei | metrico | 32 | 營業稅 (VAT) 5% | rec: ntbt.gov.tw; bc: cbc.gov.tw; trab: mol.gov.tw; of: law.moj.gov.tw | si | 2 | 21 · 0.3 · 0.1 = 0.6 |
| tz | Tanzania | Tanzania | `tz en en-TZ` | tu | TZS | Africa/Dar_es_Salaam | metrico | 2500 | VAT 18% | rec: tra.go.tz; bc: bot.go.tz | si | 3 | 18 · 0.03 · 1 = 0.5 |
| tj | Tayikistán | Тоҷикистон | `tj ru ru-TJ` | usted | TJS | Asia/Dushanbe | metrico | 10 | НДС 14% (verificar) | bc: nbt.tj | si | 4 | 4 · 0.03 · 0.2 = 0.0 |
| tl | Timor Oriental | Timor-Leste | `tl pt pt-TL` | usted | USD | Asia/Dili | metrico | 1 | sales tax 2,5% (verificar) |  | no | 4 | 0.8 · 0.05 · 1 = 0.0 |
| tg | Togo | Togo | `tg fr fr-TG` | usted | XOF | Africa/Lome | metrico | 600 | TVA 18% | rec: otr.tg; bc: bceao.int | si | 3 | 3.5 · 0.02 · 1 = 0.1 |
| to | Tonga | Tonga | `to en en-TO` | tu | TOP | Pacific/Tongatapu | metrico | 2 | CT 15% | bc: reservebank.to | si | 4 | 0.06 · 0.05 · 1 = 0.0 |
| tt | Trinidad y Tobago | Trinidad and Tobago | `tt en en-TT` | tu | TTD | America/Port_of_Spain | metrico | 7 | VAT 12,5% | rec: ird.gov.tt; bc: central-bank.org.tt | si | 3 | 1.1 · 0.3 · 1 = 0.3 |
| tn | Túnez | تونس / Tunisie | `tn fr fr-TN`; `tn-ar ar ar-TN` | usted; usted | TND | Africa/Tunis | metrico | 3 | TVA 19% | rec: finances.gov.tn; bc: bct.gov.tn; of: iort.gov.tn; trab: social.gov.tn | si | 2 | 9 · 0.08 · 1 = 0.7 |
| tm | Turkmenistán | Türkmenistan | `tm ru ru-TM` | usted | TMT | Asia/Ashgabat | metrico | 4 | НДС 15% | bc: cbt.tm | si | 4 | 1.5 · 0.03 · 0.05 = 0.0 |
| tr | Turquía | Türkiye | `tr tr tr-TR` | usted | TRY | Europe/Istanbul | metrico | 42 | KDV 20% | rec: gib.gov.tr; bc: tcmb.gov.tr; of: resmigazete.gov.tr; trab: csgb.gov.tr | no | 2 | 75 · 0.1 · 0.4 = 3.0 |
| tv | Tuvalu | Tuvalu | `tv en en-TV` | tu | AUD | Pacific/Funafuti | metrico | 1.5 | sin datos (verificar) |  | si | 4 | 0.01 · 0.05 · 1 = 0.0 |
| ua | Ucrania | Україна | `ua uk uk-UA` | usted | UAH | Europe/Kyiv | metrico | 40 | ПДВ 20% | rec: tax.gov.ua; bc: bank.gov.ua; of: zakon.rada.gov.ua; trab: msp.gov.ua | si | 3 | 31 · 0.1 · 0.1 = 0.3 |
| ug | Uganda | Uganda | `ug en en-UG` | tu | UGX | Africa/Kampala | metrico | 4000 | VAT 18% | rec: ura.go.ug; bc: bou.or.ug; trab: mglsd.go.ug | si | 3 | 13 · 0.02 · 1 = 0.3 |
| uy | Uruguay (publicado) | Uruguay | `uy es es-UY` | vos | UYU; USD | America/Montevideo | metrico | 40 | IVA 22% | rec: dgi.gub.uy; bc: bcu.gub.uy; of: impo.com.uy; trab: mtss.gub.uy | si | 2 | 3.2 · 0.25 · 1 = 0.8 |
| uz | Uzbekistán | Oʻzbekiston | `uz ru ru-UZ` | usted | UZS | Asia/Tashkent | metrico | 12000 | QQS (НДС) 12% | rec: soliq.uz; bc: cbu.uz; of: lex.uz; trab: mehnat.uz | no | 3 | 27 · 0.06 · 0.2 = 0.3 |
| vu | Vanuatu | Vanuatu | `vu en en-VU` | tu | VUV | Pacific/Efate | metrico | 120 | VAT 15% (verificar) | bc: rbv.gov.vu | si | 4 | 0.15 · 0.04 · 1 = 0.0 |
| ve | Venezuela (publicado) | Venezuela | `ve es es-VE` | tu | VES; USD | America/Caracas | metrico | 300 | IVA 16% | rec: seniat.gob.ve; bc: bcv.org.ve | si | 2 | 20 · 0.04 · 1 = 0.8 |
| vn | Vietnam | Việt Nam | `vn vi vi-VN` | tu | VND | Asia/Ho_Chi_Minh | metrico | 25000 | VAT (GTGT) 10% (8% reducido temporal, verificar) | rec: gdt.gov.vn; bc: sbv.gov.vn; of: vbpl.vn; trab: molisa.gov.vn | limitado (verificar) | 2 | 78 · 0.06 · 0.4 = 1.9 |
| ye | Yemen | اليمن | `ye ar ar-YE` | usted | YER | Asia/Aden | metrico | 1600 | sales tax 5% (verificar) | bc: centralbank.gov.ye | si | 4 | 6 · 0.005 · 0.05 = 0.0 |
| dj | Yibuti | Djibouti | `dj fr fr-DJ` | usted | DJF | Africa/Djibouti | metrico | 180 | TVA 10% (verificar) |  | si | 4 | 0.8 · 0.05 · 1 = 0.0 |
| zm | Zambia | Zambia | `zm en en-ZM` | tu | ZMW | Africa/Lusaka | metrico | 25 | VAT 16% | rec: zra.org.zm; bc: boz.zm; trab: mlss.gov.zm | si | 3 | 6 · 0.03 · 1 = 0.2 |
| zw | Zimbabue | Zimbabwe | `zw en en-ZW` | tu | USD; ZWG | Africa/Harare | metrico | 1 | VAT 15% | rec: zimra.co.zw; bc: rbz.co.zw | si | 3 | 5 · 0.02 · 1 = 0.1 |

## 3. Decisiones de idioma y notas por país

Solo los países con algo que aclarar. Las justificaciones de idioma pedidas van primero.

- **Filipinas (ph)**: en es idioma oficial y el de BIR, SSS, PhilHealth y Pag-IBIG online; filipino (fil) como segunda edición futura.
- **Malasia (my)**: en domina EPF, SOCSO y LHDN online; ms como segunda edición.
- **Nigeria (ng)**: Idioma oficial y dominante online.
- **Kenia (ke)**: en domina PAYE, NSSF, SHA y Housing Levy online; sw (suajili) como segunda edición futura.
- **Marruecos (ma)**: fr primero: la DGI, la CNSS y el empleo formal operan en francés, tiene más CPM y no exige RTL; ar como segunda edición.
- **Argelia (dz)**: fr para lo fiscal y laboral (el Maghreb busca trámites y empleo en francés); ar como segunda edición.
- **Túnez (tn)**: fr para lo fiscal y laboral; ar como segunda edición.
- **Emiratos Árabes Unidos (ae)**: Expatriados mayoritarios (88%): en primero.
- **Arabia Saudita (sa)**: ar primero (mayoría saudí); GOSI en gosi.gov.sa.
- **Hong Kong (hk)**: en primero: ya soportado, finanzas y empleo profesional online en inglés; zh-HK como segunda edición.
- **India (in)**: Compite con Groww, ClearTax y similares.
- **Pakistán (pk)**: Urdu (ur) como segunda edición futura; sin PayPal.
- **Bangladés (bd)**: Bengalí (bn) como segunda edición futura; en domina lo fiscal y laboral online.
- **Afganistán (af)**: Dari; sin pagos ni anunciantes viables.
- **Andorra (ad)**: El catalán es oficial; se elige es por búsquedas y porque ya está soportado.
- **Argentina (ar)**: Sitio propio calcular.ar.
- **Baréin (bh)**: Expatriados mayoritarios: en primero.
- **Bélgica (be)**: El alemán (comunidad germanófona) no se cubre.
- **Bielorrusia (by)**: Sanciones y anuncios restringidos.
- **Bulgaria (bg)**: Euro desde 1/1/2026.
- **Camerún (cm)**: País oficialmente bilingüe; fr mayoritario.
- **Catar (qa)**: Expatriados mayoritarios: en primero.
- **China (cn)**: Requiere ICP, hosting local y SEO en Baidu.
- **Corea del Norte (kp)**: Sin internet público ni pagos; sanciones.
- **Cuba (cu)**: Bloqueo financiero; el cambio oficial y el informal difieren mucho.
- **Estados Unidos (us)**: es-US (tú) cubre a unos 40 millones de hispanohablantes.
- **Etiopía (et)**: Amárico (am) como segunda edición futura.
- **Guinea Ecuatorial (gq)**: Es, fr y pt son oficiales; es por ser el idioma de la administración.
- **Haití (ht)**: El criollo (ht) es el idioma de todos; fr para trámites y negocio.
- **Irán (ir)**: Sanciones; sin PayPal.
- **Kazajistán (kz)**: Ruso domina las búsquedas; kk como segunda edición futura.
- **Kosovo (xk)**: XK no es ISO oficial; la IANA lo cubre con Europe/Belgrade (verificar Europe/Pristina).
- **Kuwait (kw)**: Expatriados mayoritarios: en primero.
- **Líbano (lb)**: La economía opera en dólares; sin PayPal.
- **Liberia (lr)**: Imperial por el brief.
- **Libia (ly)**: Sin PayPal.
- **Luxemburgo (lu)**: El inglés es muy usado por expatriados; sin edición propia por ahora.
- **Macao (mo)**: Portugués oficial pero minoritario en la web.
- **Myanmar (mm)**: Imperial por el brief; conflicto armado, pagos inviables.
- **Nepal (np)**: Nepalí (ne) como segunda edición futura.
- **Omán (om)**: Mitad de la población es expatriada pero el árabe domina; en como segunda edición.
- **Palestina (ps)**: Sin PayPal.
- **Puerto Rico (pr)**: Territorio de EE. UU.: unidades de uso cotidiano imperiales aunque el brief solo lista US, LR y MM.
- **Reino Unido (gb)**: Ruta gb (ISO); en la vida diaria usa millas y pintas, el brief fija métrico.
- **Rusia (ru)**: Sanciones, sin PayPal y anuncios restringidos.
- **Siria (sy)**: Libra nueva desde 1/1/2026 (se quitaron dos ceros); sanciones; sin PayPal.
- **Sri Lanka (lk)**: Cingalés (si) y tamil (ta) como ediciones futuras.
- **Sudán (sd)**: Guerra civil; sin PayPal.
- **Tanzania (tz)**: en para impuestos y planilla; suajili (sw) es el idioma de la mayoría y va como segunda edición.
- **Timor Oriental (tl)**: Tetun y portugués oficiales.
- **Turkmenistán (tm)**: Internet muy restringido.
- **Turquía (tr)**: PayPal salió en 2016.
- **Uzbekistán (uz)**: Uzbeko (uz) como segunda edición futura; sin PayPal.
- **Yemen (ye)**: Guerra; sin PayPal para pagos locales.

Criterios generales de la elección de idioma:

- Se prefiere el idioma de las búsquedas fiscales, laborales y de trámites, no necesariamente el más hablado en casa. Por eso Filipinas, Malasia, Nigeria, Kenia, Pakistán, Bangladés, Nepal, Sri Lanka, Etiopía y Tanzania van en inglés: es el idioma de los formularios del recaudador y de los portales de empleo, y los idiomas locales quedan como segunda edición futura.
- Magreb: francés primero porque la administración fiscal y laboral, el empleo formal y las búsquedas de mayor CPM están en francés, y evita la escritura de derecha a izquierda en la primera etapa. El árabe va como segunda edición.
- Golfo: inglés primero donde los expatriados son mayoría (Emiratos, Catar, Kuwait, Baréin) y árabe primero donde mandan los nacionales (Arabia Saudita, Omán).
- Unidades: el brief fija imperial solo para EE. UU., Liberia y Myanmar. Reino Unido y Canadá figuran como métrico aunque usen millas, libras o pintas en la vida diaria, por lo que algunas calculadoras de medidas pueden necesitar un ajuste local. Puerto Rico se marcó imperial por ser territorio de EE. UU.
- Tasas del IVA con cambios recientes ya reflejados: Bulgaria entra al euro el 1/1/2026, Rusia 22 % y Kazajistán 16 % desde 1/1/2026, Ghana 15 % más 5 % de gravámenes desde 1/1/2026, Bután GST 5 % desde 1/1/2026, Rumania 21 %, Estonia 24 %, Finlandia 25,5 %, Eslovaquia 23 % e Israel 18 %.

## 4. Qué se verificó y qué no

**Verificado con fuente en esta sesión (2026-10-13):**

- Lista de países de PayPal: página oficial `paypal.com/us/webapps/mpp/country-worldwide`, descargada y leída completa. De ahí sale la columna PayPal. Faltan en la lista, entre otros: Afganistán, Bangladés, Cuba, Irán, Irak, Líbano, Libia, Myanmar, Corea del Norte, Pakistán, Siria, Sudán, Sudán del Sur, Rusia, Turquía, Uzbekistán, Haití, República Centroafricana, Guinea Ecuatorial, Liberia, Ghana, Timor Oriental, Macao, Kosovo, Palestina.
- Bulgaria en el euro desde 1/1/2026; IVA de Rusia 22 % y de Kazajistán 16 % desde 1/1/2026; Siria con libra redenominada desde 1/1/2026; Ghana (Ley 1151); Indonesia (PPN 12 % nominal, 11 % efectivo); Bután (GST 5 % desde 1/1/2026); India (GST de dos tramos desde 22/9/2025). Todo por búsqueda web.
- Que cada dominio de la columna Organismos existe: 487 dominios consultados por DNS. 12 no resolvieron; 6 se reemplazaron por otro que sí resuelve y 6 se quitaron.
- Los 16 tratos del español de países ya publicados se tomaron de `src/paises/<m>/mercado.ts`.

**Sin verificar (conocimiento propio, tratar como pista):**

- Tasas de impuesto: las 33 marcadas «(verificar)» (af, bt, cg, cu, dj, er, fm, gh, gq, gw, id, iq, ir, ki, km, la, mh, mm, nr, pw, sb, sd, sm, so, ss, st, sy, tj, tl, tv, vn, vu, ye) y, en menor grado, todas las demás. Ninguna tasa se leyó en su recaudador.
- Organismos: 15 países sin ningún dominio (dj, er, fm, ki, km, kp, mh, nr, pw, sb, sm, so, ss, tl, tv). Para el resto, falta confirmar que cada dominio sea el organismo correcto y vigente, sobre todo en África, Oceanía y el Caribe.
- Escala de monedas: aproximada; en Cuba, Venezuela, Etiopía, Sudán, Sudán del Sur, Siria, Líbano, Myanmar, Yemen, Irán, Argentina y Nigeria el cambio oficial y el real difieren o se mueven rápido.
- Usuarios de internet e índice de ingreso: estimaciones redondas del autor. Mueven el orden de tier 2 a 4; el tier 1 es estable salvo India (muy sensible al índice de ingreso).
- Trato: criterio propio salvo los 16 países publicados. Alemán y francés formales (Sie, vous) siguen el pedido; italiano formal (Lei), neerlandés informal (je), polaco informal y los demás idiomas nuevos son criterio propio por validar con hablantes nativos.
- Zona horaria de Kosovo (XK no es ISO oficial; la IANA lo trata como Europe/Belgrade) y de Palestina (Asia/Hebron para Cisjordania; Gaza usa Asia/Gaza).
- PayPal «limitado»: India, China, Vietnam, Indonesia y Bielorrusia están marcados por restricciones conocidas de pagos locales, sin confirmar cada caso. Puerto Rico figura bajo EE. UU. en la lista oficial.
- Nombres nativos y locales: revisados de memoria; las variantes (ru-BY, ar-PS, sr-ME, bs-BA, zh-MO) son las convenciones habituales, no una lista oficial.

