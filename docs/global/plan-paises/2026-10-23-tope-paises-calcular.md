# Cuántos países pueden tener su calculadora con fuente oficial

Relevamiento del 2026-10-23 para calcularya.com. Sirve para saber hasta dónde se puede llegar respetando
la regla del brief: **solo se publica un dato leído en una fuente primaria oficial con URL https**.

## Resultado

| Nivel | Países | Qué significa |
|---|---|---|
| **A: fuentes oficiales sólidas** | **87** | Portales oficiales accesibles, buena capacidad estadística (SPI ≥ 70) y sistema laboral y fiscal documentado. Acá está el tope realista. |
| **B: se puede, con más trabajo** | **58** | Las fuentes existen, pero hay portales caídos o lentos, PDFs, otros idiomas o datos con huecos. Algunas calculadoras van a quedar en borrador. |
| **C: no conviene** | **50** | Faltan fuentes, el Estado publica poco online, hay conflicto o sanciones, o es un microestado. |
| **Total** | **195** | 193 miembros de la ONU más Vaticano y Palestina. |

- **Tope realista: 87 países.** Ya hay 17 hechos (Argentina en calcular.ar y 16 en calcularya), así que quedan **70**.
- **Techo con trabajo extra: 145 países** (A + B). Pasar de ahí no tiene sentido: los 50 del nivel C no permiten cumplir la regla de la fuente primaria de forma sostenida.
- El cuello de botella fuera de los países hispanohablantes no son las fuentes sino el **idioma**: de los 70 A pendientes, solo 1 es de habla hispana (España). El resto exige textos, vocabulario y lectura de normas en otro idioma.

## Cómo se midió (todo verificable)

Cada país se cruzó con cuatro fuentes:

1. **Portales oficiales probados en vivo** el 2026-10-23 desde Argentina (la misma red que usa el agente): agencia de impuestos, ministerio de trabajo, seguridad social, banco central e instituto de estadística. Fueron 975 URLs por HTTPS con TLS estricto y reintentos (con y sin `www.`, y con dominios alternativos cuando el primero no existía). Referencia de la columna «Portales», en ese orden:
   ✓ responde · ⏱ no respondió desde AR (en general bloqueo por país o anti-bot: el sitio existe; pasa con mintrabajo.gov.co y ccss.sa.cr, que el agente sí usó) · 🔓 HTTPS con certificado roto (el detector necesita `tlsTolerante`) · ✗ no se encontró en el dominio probado · · sin organismo identificado.
2. **SPI del Banco Mundial** (Statistical Performance Indicators, 0 a 100): mide si el país produce y publica datos oficiales de calidad. Último valor disponible. API: `api.worldbank.org/v2/country/all/indicator/IQ.SPI.OVRL`.
3. **PwC Worldwide Tax Summaries**: si el sistema de impuesto a la renta personal está documentado (146 jurisdicciones; 133 de ellas son países de esta lista). https://taxsummaries.pwc.com/quick-charts/personal-income-tax-pit-rates
4. **Salario mínimo de la OIT (ILOSTAT)**: último año y tipo de mínimo cargado desde la legislación de cada país. Dataflow SDMX `DF_EAR_INEE_NOC_NB` en `sdmx.ilo.org`. «no publica» quiere decir que el país no tiene mínimo legal (lo fijan los convenios, como en los nórdicos, Italia, Austria, Suiza o Singapur) o que la OIT no lo tiene.

Demanda: «Usuarios internet (M)» = población × % de personas que usan internet (Banco Mundial `SP.POP.TOTL` e `IT.NET.USER.ZS`). Las tablas están ordenadas por esa columna.

**Regla de nivel:**
- **A:** ya hecho, o SPI ≥ 70, PwC lo cubre, al menos 4 de 5 portales que responden (o que existen pero no responden desde AR o tienen TLS roto), salario mínimo OIT vigente (2024 o después) o país OCDE o SPI ≥ 85 (casos sin mínimo legal), y sin riesgo de sanciones o conflicto.
- **B:** SPI ≥ 55, al menos 3 de 5 portales y PwC o salario mínimo OIT vigente.
- **C:** el resto.

**Límites (para no venderlo como más de lo que es):** que un portal responda prueba que existe y es accesible, no que publique cada valor que necesita una calculadora. El SPI y PwC son la señal de que esos valores existen y están documentados. La confirmación final de cada dato la sigue haciendo el agente del país, como dice el brief. Los dominios ✗ pueden ser un error del dominio probado y no del país: antes de descartar uno de nivel B, conviene buscar el portal.

## Nivel A: 87 países (tope realista)

| País | ISO | SPI | Usuarios internet (M) | Portales | PwC | Salario mínimo (OIT) | Nota |
|---|---|---|---|---|---|---|---|
| India | `in` | 74 | 1024.7 | ✓✓✓✓✓ | sí | 2024 piso nacional |  |
| Estados Unidos | `us` | 90 | 323.6 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Indonesia | `id` | 82 | 208 | ✓✓✓✓✓ | sí | 2024 regional |  |
| Brasil | `br` | 82 | 179.7 | ✓✓✓✓✓ | sí | 2024 piso nacional |  |
| México | `mx` | 91 | 109.7 | ✓✓✓✓✓ | sí | 2024 piso nacional | **ya hecho** |
| Japón | `jp` | 91 | 105.5 | ✓✓🔓✓✓ | sí | 2024 regional |  |
| Bangladés | `bd` | 72 | 93.9 | ✓✓·✓✓ | sí | 2024 nacional |  |
| Egipto | `eg` | 78 | 88.4 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Filipinas | `ph` | 84 | 78.6 | 🔓✓✓✓🔓 | sí | 2024 regional (lowest provincial rate in non-agriculture) |  |
| Alemania | `de` | 90 | 78.1 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Turquía | `tr` | 79 | 77.1 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Reino Unido | `gb` | 88 | 66.3 | ✓✓✓✓✓ | sí | 2024 piso nacional |  |
| Tailandia | `th` | 85 | 65.1 | ✓✓✓✓✓ | sí | 2024 |  |
| Francia | `fr` | 88 | 60.9 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Italia | `it` | 91 | 52.6 | ✓✓✓✓✓ | sí | no publica |  |
| Sudáfrica | `za` | 81 | 50.7 | ✓✓⏱✓✓ | sí | 2024 Occupational |  |
| Corea del Sur | `kr` | 92 | 50.6 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| España | `es` | 92 | 47.3 | ✓✓✓✓✓ | sí | 2026 nacional | español |
| Colombia | `co` | 83 | 42.4 | ✓⏱✓✓🔓 | no | 2024 nacional | **ya hecho** |
| Argentina | `ar` | 80 | 41.1 | ✓✓✓✓✓ | sí | 2024 nacional | **ya hecho** |
| Canadá | `ca` | 92 | 39.3 | ✓✓✓✓✓ | sí | 2024 regional |  |
| Arabia Saudita | `sa` | 83 | 37 | ✓✓✓✓✓ | sí | 2024 |  |
| Malasia | `my` | 85 | 35.3 | ✓⏱✓✓✓ | sí | 2024 |  |
| Marruecos | `ma` | 73 | 35 | ✓⏱⏱✓✓ | sí | 2024 Rate of the SMIG when SMIG/SMAG system |  |
| Uzbekistán | `uz` | 81 | 33.2 | ⏱✓·⏱✓ | sí | 2024 nacional |  |
| Polonia | `pl` | 91 | 32.3 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Ucrania | `ua` | 76 | 32.1 | ✓🔓✓✓⏱ | sí | 2026 |  |
| Perú | `pe` | 82 | 28.3 | ✓✓✓✓✓ | sí | 2024 nacional | **ya hecho** |
| Australia | `au` | 89 | 26.5 | ✓✓✓✓✓ | sí | 2024 piso nacional |  |
| Venezuela | `ve` | 39 | 21.9 | ⏱✗⏱✓✓ | sí | 2024 nacional | **ya hecho** ⚠ acceso desde AR inestable |
| Kenia | `ke` | 73 | 20.1 | ✓🔓✓✓✓ | sí | 2024 Occupational |  |
| Kazajistán | `kz` | 85 | 19.5 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Chile | `cl` | 89 | 19 | ✓✓✓✓✓ | sí | 2024 nacional | **ya hecho** |
| Países Bajos | `nl` | 85 | 17.5 | ✓✓✓✓🔓 | sí | 2026 nacional |  |
| Rumania | `ro` | 91 | 17.4 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Ecuador | `ec` | 80 | 14.1 | ✓⏱✓✓✓ | sí | 2024 nacional | **ya hecho** |
| Costa de Marfil | `ci` | 70 | 13.6 | ✓✓✓✓🔓 | sí | 2024 Rate of the SMIG when SMIG/SMAG system |  |
| Bélgica | `be` | 87 | 11.4 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Senegal | `sn` | 81 | 11.4 | 🔓✓⏱✓✓ | sí | 2024 Rate of the SMIG when SMIG/SMAG system |  |
| Guatemala | `gt` | 79 | 11.3 | ✓✓✓✓✓ | sí | 2024 sectorial | **ya hecho** |
| Jordania | `jo` | 79 | 11 | ✓✓✓✓✓ | sí | 2024 piso nacional |  |
| República Dominicana | `do` | 75 | 10.5 | ✓✓✓✓🔓 | sí | 2024 Average of minimum wages based on establishment size | **ya hecho** |
| Suecia | `se` | 93 | 10.1 | ✓✓✓✓✓ | sí | no publica |  |
| Bolivia | `bo` | 70 | 10 | ✓✓✓✓✓ | sí | 2024 nacional | **ya hecho** |
| Portugal | `pt` | 91 | 9.6 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Chequia | `cz` | 87 | 9.5 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Túnez | `tn` | 75 | 9.4 | 🔓✓✓✓✓ | sí | 2024 Rate of the SMIG when SMIG/SMAG system |  |
| Grecia | `gr` | 87 | 9 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Hungría | `hu` | 88 | 8.9 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Israel | `il` | 90 | 8.9 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Suiza | `ch` | 89 | 8.8 | ✓✓✓✓✓ | sí | 2024 regional |  |
| Austria | `at` | 89 | 8.5 | ✓✓✓✓✓ | sí | no publica |  |
| Honduras | `hn` | 66 | 6.5 | ✓✓✓✓✓ | sí | 2024 sectorial | **ya hecho** |
| Dinamarca | `dk` | 92 | 6 | ✓✓✓✓✓ | sí | no publica |  |
| Singapur | `sg` | 88 | 5.8 | ✓✓✓✓✓ | sí | no publica |  |
| Paraguay | `py` | 74 | 5.7 | ✓✓🔓✓✓ | sí | 2024 piso nacional for adults | **ya hecho** |
| Serbia | `rs` | 80 | 5.7 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Noruega | `no` | 94 | 5.6 | ✓✓✓✓✓ | sí | no publica |  |
| Bulgaria | `bg` | 84 | 5.3 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Finlandia | `fi` | 90 | 5.3 | ✓✓✓✓✓ | sí | no publica |  |
| Irlanda | `ie` | 88 | 5.3 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Nueva Zelanda | `nz` | 92 | 5 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Eslovaquia | `sk` | 83 | 4.9 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Ruanda | `rw` | 73 | 4.6 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Costa Rica | `cr` | 91 | 4.5 | ✓✓⏱✓✓ | sí | 2024 Occupational (unskilled workers) | **ya hecho** |
| Nicaragua | `ni` | 56 | 4.3 | ✓⏱✓✓✓ | sí | 2024 sectorial | **ya hecho** |
| El Salvador | `sv` | 74 | 4.2 | ✓✓✓✓✓ | sí | 2024 sectorial | **ya hecho** |
| Georgia | `ge` | 88 | 3.3 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Panamá | `pa` | 78 | 3.3 | ✓✓✓✓✓ | sí | 2024 sectorial | **ya hecho** |
| Croacia | `hr` | 85 | 3.2 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Uruguay | `uy` | 80 | 3.1 | ✗✓✓✓✓ | sí | 2024 nacional | **ya hecho** |
| Mongolia | `mn` | 84 | 3 | ✗✓✓✓✓ | sí | 2024 nacional |  |
| Jamaica | `jm` | 73 | 2.6 | ✓✓·✓✓ | sí | 2024 piso nacional |  |
| Lituania | `lt` | 89 | 2.6 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Armenia | `am` | 82 | 2.5 | ✓✓✗✓✓ | sí | 2024 nacional |  |
| Albania | `al` | 84 | 2 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Eslovenia | `si` | 91 | 1.9 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Moldavia | `md` | 86 | 1.8 | ✓✓✓✓✓ | sí | 2026 |  |
| Letonia | `lv` | 88 | 1.7 | ⏱⏱⏱✓✓ | sí | 2026 nacional |  |
| Macedonia del Norte | `mk` | 87 | 1.7 | ✓⏱✓✓✓ | sí | 2026 nacional |  |
| Estonia | `ee` | 89 | 1.3 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Chipre | `cy` | 85 | 1.2 | ✗✓✓✓✓ | sí | 2026 |  |
| Mauricio | `mu` | 80 | 0.9 | ✓✓✓✓✓ | sí | 2024 Occupational (unskilled workers) |  |
| Luxemburgo | `lu` | 86 | 0.7 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Montenegro | `me` | 74 | 0.6 | ✗✓✓✓✓ | sí | 2026 nacional |  |
| Malta | `mt` | 84 | 0.5 | ✓✓✓✓✓ | sí | 2026 nacional |  |
| Islandia | `is` | 81 | 0.4 | ✓✓✓✓✓ | sí | 2024 sectorial |  |

## Nivel B: 58 países (con más trabajo)

| País | ISO | SPI | Usuarios internet (M) | Portales | PwC | Salario mínimo (OIT) | Nota |
|---|---|---|---|---|---|---|---|
| China | `cn` | 58 | 1288.4 | ✓✓·✓✓ | sí | 2024 regional |  |
| Pakistán | `pk` | 68 | 146.1 | ✓·🔓✓✓ | sí | 2024 Occupational (unskilled workers) |  |
| Rusia | `ru` | 82 | 135.4 | ✓✓✓✓🔓 | no | 2024 piso nacional |  ⚠ sanciones |
| Nigeria | `ng` | 69 | 97.9 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Vietnam | `vn` | 67 | 85.5 | ⏱✓✓✓✓ | sí | 2024 regional |  |
| Irán | `ir` | 64 | 78.9 | ⏱⏱✓✓🔓 | no | 2024 nacional |  ⚠ sanciones |
| Argelia | `dz` | 55 | 36.7 | ⏱⏱⏱✓✓ | no | 2024 nacional |  |
| Etiopía | `et` | 62 | 29.7 | ✓⏱·✓✓ | sí | no publica |  |
| Ghana | `gh` | 66 | 25.3 | ✓⏱✓✓✓ | sí | 2024 nacional |  |
| Myanmar | `mm` | 65 | 24.9 | ✓✓✓✓✓ | sí | 2024 nacional |  ⚠ conflicto |
| Tanzania | `tz` | 68 | 22 | ✓✓✓✓✓ | sí | 2024 sectorial |  |
| Angola | `ao` | 58 | 15.9 | ✓🔓✓✓✓ | sí | 2024 piso nacional |  |
| Camerún | `cm` | 66 | 13.8 | ✓⏱✓✓✓ | sí | 2024 nacional |  |
| Nepal | `np` | 60 | 13.7 | ⏱⏱✗⏱⏱ | no | 2024 piso nacional |  |
| Camboya | `kh` | 63 | 12.2 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Sri Lanka | `lk` | 75 | 11.9 | ✓✓✓✓✓ | no | 2024 nacional |  |
| Emiratos Árabes Unidos | `ae` | 79 | 11.5 | ✓⏱✓✓✓ | sí | no publica |  |
| Azerbaiyán | `az` | 69 | 9.3 | ✓✓✗⏱✓ | sí | 2024 nacional |  |
| Malí | `ml` | 67 | 9.3 | ✓·🔓✓✗ | no | 2024 Rate of the SMIG when SMIG/SMAG system |  |
| Bielorrusia | `by` | 77 | 8.6 | ✓⏱⏱⏱⏱ | no | 2024 nacional |  ⚠ sanciones |
| Mozambique | `mz` | 67 | 7.3 | ✓✗✓✓✓ | sí | 2024 sectorial |  |
| Burkina Faso | `bf` | 76 | 6.8 | ⏱🔓✓✓✓ | no | 2024 Rate of the SMIG when SMIG/SMAG system |  |
| Kirguistán | `kg` | 79 | 6.8 | ✓✓✗✓🔓 | no | 2024 nacional |  |
| Madagascar | `mg` | 57 | 6.1 | ✓✗✓✓✓ | sí | 2024 Rate of the SMIG when SMIG/SMAG system |  |
| Tayikistán | `tj` | 64 | 6 | ✓✗·✓✓ | no | 2024 nacional |  |
| Laos | `la` | 61 | 5.2 | ✓✗·✓✓ | sí | 2024 nacional |  |
| Omán | `om` | 59 | 5.2 | ✓✓⏱✓✓ | sí | 2024 nacional |  |
| Benín | `bj` | 71 | 5 | ⏱✓✓✓✓ | no | 2024 nacional |  |
| Kuwait | `kw` | 63 | 4.9 | ⏱⏱✓✓✓ | sí | 2024 sectorial |  |
| Líbano | `lb` | 58 | 4.7 | ✓✓✓✓✓ | sí | 2024 nacional |  ⚠ crisis económica |
| Palestina | `ps` | 74 | 4.7 | ⏱✓·✓✓ | sí | no publica |  |
| Uganda | `ug` | 69 | 4.6 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Níger | `ne` | 70 | 4.3 | 🔓·✓✓✓ | no | 2024 nacional |  |
| Malaui | `mw` | 64 | 4.2 | ✓✓·✓✓ | no | 2024 nacional |  |
| Zambia | `zm` | 64 | 3.7 | ✓✓✓✓✓ | sí | 2024 Occupational (unskilled workers) |  |
| Togo | `tg` | 67 | 3.4 | ✓·✓✓✓ | no | 2024 Rate of the SMIG when SMIG/SMAG system |  |
| Catar | `qa` | 68 | 2.9 | ✓⏱✓✓✓ | sí | 2024 nacional |  |
| Bosnia y Herzegovina | `ba` | 69 | 2.7 | ✓⏱·✓✓ | sí | 2024 nacional |  |
| Mauritania | `mr` | 58 | 2.4 | ✗·✓✓✓ | sí | 2022 Rate of the SMIG when SMIG/SMAG system |  |
| Namibia | `na` | 56 | 2 | ✓✓✓✓✓ | sí | no publica |  |
| Liberia | `lr` | 59 | 1.8 | ✓🔓✗✓✓ | sí | 2024 Occupational (unskilled workers) |  |
| Botsuana | `bw` | 64 | 1.5 | ✓🔓·🔓✓ | sí | 2024 sectorial |  |
| Gambia | `gm` | 67 | 1.4 | ✓·✓✓✓ | no | 2024 nacional |  |
| Lesoto | `ls` | 58 | 1.2 | ✓✓·✓✓ | no | 2024 piso nacional |  |
| Trinidad y Tobago | `tt` | 59 | 1.1 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Esuatini | `sz` | 61 | 0.8 | 🔓⏱✓✓✗ | sí | 2024 Occupational (unskilled workers) |  |
| Bután | `bt` | 58 | 0.7 | ⏱✗✓🔓✓ | no | 2024 Occupational |  |
| Fiyi | `fj` | 68 | 0.7 | ✓⏱✓✓✓ | no | 2024 piso nacional |  |
| Surinam | `sr` | 59 | 0.6 | ✓✓·✓✓ | no | 2024 piso nacional |  |
| Timor Oriental | `tl` | 61 | 0.5 | ✓·✓✗✓ | no | 2024 nacional |  |
| Brunéi | `bn` | 61 | 0.4 | ✓🔓✓✓✓ | sí | no publica |  |
| Cabo Verde | `cv` | 60 | 0.4 | ✓✓✓✓✓ | sí | 2024 nacional |  |
| Belice | `bz` | 68 | 0.3 | 🔓✓✓✓✓ | no | 2024 nacional |  |
| Barbados | `bb` | 62 | 0.2 | ✓✓✓✓🔓 | sí | 2024 nacional |  |
| Antigua y Barbuda | `ag` | 63 | 0.1 | ✓⏱✓✓✓ | no | 2024 nacional |  |
| Santa Lucía | `lc` | 64 | 0.1 | ✓✓✗✓✓ | sí | no publica |  |
| Seychelles | `sc` | 65 | 0.1 | ✓✓🔓✓✓ | no | 2024 |  |
| Samoa | `ws` | 63 | s/d | ✓✓✓✓✓ | no | 2024 Rate of the SMIG when SMIG/SMAG system |  |

## Nivel C: 50 países (no conviene)

| País | ISO | Motivo |
|---|---|---|
| Irak | `iq` | SPI 54 |
| RD Congo | `cd` | SPI 46 |
| Cuba | `cu` | sanciones/sin pagos, SPI s/d |
| Yemen | `ye` | conflicto, SPI 37, sin PwC ni mínimo OIT vigente |
| Afganistán | `af` | conflicto, SPI 54 |
| Zimbabue | `zw` | sin PwC ni mínimo OIT vigente |
| Libia | `ly` | conflicto, SPI 35 |
| Haití | `ht` | crisis institucional, SPI 39 |
| Somalia | `so` | conflicto, SPI 52, 2/5 portales, sin PwC ni mínimo OIT vigente |
| Guinea | `gn` | SPI 50 |
| Congo | `cg` | SPI 39 |
| Chad | `td` | SPI 54 |
| Sierra Leona | `sl` | 2/5 portales |
| Papúa Nueva Guinea | `pg` | SPI 44 |
| Gabón | `ga` | SPI 45 |
| Baréin | `bh` | SPI 52 |
| Burundi | `bi` | SPI 45 |
| Guinea Ecuatorial | `gq` | SPI 32, 1/5 portales |
| República Centroafricana | `cf` | SPI 47 |
| Yibuti | `dj` | SPI 38, sin PwC ni mínimo OIT vigente |
| Sudán del Sur | `ss` | conflicto, SPI 27, sin PwC ni mínimo OIT vigente |
| Guinea-Bisáu | `gw` | SPI 48, 2/5 portales |
| Guyana | `gy` | SPI 54 |
| Eritrea | `er` | SPI s/d, 0/5 portales, sin PwC ni mínimo OIT vigente |
| Maldivas | `mv` | sin PwC ni mínimo OIT vigente |
| Bahamas | `bs` | SPI 51 |
| Comoras | `km` | SPI 51, 2/5 portales |
| Islas Salomón | `sb` | SPI 51 |
| Andorra | `ad` | SPI 50 |
| Dominica | `dm` | SPI 41 |
| Granada | `gd` | SPI 51 |
| Kiribati | `ki` | SPI 50, 2/5 portales |
| San Vicente y las Granadinas | `vc` | SPI 52 |
| Santo Tomé y Príncipe | `st` | SPI 53, 2/5 portales, sin PwC ni mínimo OIT vigente |
| Tonga | `to` | sin PwC ni mínimo OIT vigente |
| Corea del Norte | `kp` | sanciones, SPI s/d, 0/5 portales, sin PwC ni mínimo OIT vigente |
| Liechtenstein | `li` | SPI s/d |
| Islas Marshall | `mh` | SPI 44, 0/5 portales |
| Micronesia | `fm` | SPI 37, 0/5 portales, sin PwC ni mínimo OIT vigente |
| Mónaco | `mc` | SPI s/d |
| Nauru | `nr` | SPI 48, 0/5 portales, sin PwC ni mínimo OIT vigente |
| Palaos | `pw` | 0/5 portales |
| San Cristóbal y Nieves | `kn` | SPI 43 |
| San Marino | `sm` | SPI s/d |
| Sudán | `sd` | conflicto, SPI 42, 2/5 portales |
| Siria | `sy` | conflicto/sanciones, SPI 32, 2/5 portales |
| Turkmenistán | `tm` | SPI 30, 2/5 portales |
| Tuvalu | `tv` | SPI 43, 0/5 portales, sin PwC ni mínimo OIT vigente |
| Vanuatu | `vu` | SPI 53 |
| Vaticano | `va` | SPI s/d, 0/5 portales, sin PwC ni mínimo OIT vigente |

## Orden sugerido para los A pendientes

Ordenados por usuarios de internet. Se pueden agrupar por idioma para reusar textos y vocabulario:

- **otro idioma (uno por país):** Indonesia (208 M), Japón (105.5 M), Bangladés (93.9 M), Egipto (88.4 M), Turquía (77.1 M), Tailandia (65.1 M), Corea del Sur (50.6 M), Arabia Saudita (37 M), Malasia (35.3 M), Uzbekistán (33.2 M), Polonia (32.3 M), Ucrania (32.1 M), Kazajistán (19.5 M), Países Bajos (17.5 M), Rumania (17.4 M), Jordania (11 M), Suecia (10.1 M), Chequia (9.5 M), Grecia (9 M), Hungría (8.9 M), Israel (8.9 M), Dinamarca (6 M), Serbia (5.7 M), Noruega (5.6 M), Bulgaria (5.3 M), Finlandia (5.3 M), Eslovaquia (4.9 M), Georgia (3.3 M), Croacia (3.2 M), Mongolia (3 M), Lituania (2.6 M), Armenia (2.5 M), Albania (2 M), Eslovenia (1.9 M), Moldavia (1.8 M), Letonia (1.7 M), Macedonia del Norte (1.7 M), Estonia (1.3 M), Chipre (1.2 M), Montenegro (0.6 M), Islandia (0.4 M)
- **inglés:** Estados Unidos (323.6 M), Reino Unido (66.3 M), Sudáfrica (50.7 M), Australia (26.5 M), Kenia (20.1 M), Singapur (5.8 M), Irlanda (5.3 M), Nueva Zelanda (5 M), Jamaica (2.6 M)
- **francés:** Francia (60.9 M), Costa de Marfil (13.6 M), Senegal (11.4 M)
- **portugués:** Brasil (179.7 M), Portugal (9.6 M)
- **alemán:** Alemania (78.1 M), Austria (8.5 M)
- **inglés/francés:** Canadá (39.3 M), Mauricio (0.9 M)
- **francés/árabe:** Marruecos (35 M), Túnez (9.4 M)
- **inglés/hindi:** India (1024.7 M)
- **inglés/filipino:** Filipinas (78.6 M)
- **italiano:** Italia (52.6 M)
- **español:** España (47.3 M)
- **francés/neerlandés:** Bélgica (11.4 M)
- **alemán/francés/italiano:** Suiza (8.8 M)
- **inglés/francés/kinyarwanda:** Ruanda (4.6 M)
- **francés/alemán:** Luxemburgo (0.7 M)
- **inglés/maltés:** Malta (0.5 M)

El archivo `2026-10-23-tope-paises-calcular.csv`, al lado de este, tiene los mismos datos por país más el dominio probado y el resultado de cada uno de los 5 portales.
