# Informe del país: Macedonia del Norte (mk)

**Depende de `claude/mundo-motor-mk`** (motor sin mergear, ADR 0002 D36): la rama `claude/pais-mk` sale de ahí.
Hay que integrar primero el motor. Estado del mercado: `interno`. `src/paises/index.ts` no se commitea.

## Calculadoras locales

61 en total: 21 locales (20 publicables y 1 borrador) y 40 universales con `universales: "todas"`. De las 41 en
macedonio cae `iva`, que la cubre la local `ddv-kalkulator`.

| Slug | Concepto | Publicable | Nota |
|---|---|---|---|
| kalkulator-za-plata | sueldo-neto | sí | УЈП y ЗПЗСО; `mundo` declarado |
| kalkulator-neto-vo-bruto | propio | sí | Inversa por bisección |
| trosok-na-rabotodavach | costo-empleador | sí | Las contribuciones salen del bruto, el costo base es el bruto |
| kalkulator-za-pridonesi | aportes-seguridad-social | sí | Con piso y techo, también autónomos |
| kalkulator-za-personalen-danok | impuesto-renta | sí | 10 % sobre plata |
| ddv-kalkulator | iva | sí | 18, 10 y 5 % (Ley con Сл. весник 267/25) |
| moj-ddv-povrat | propio | sí | 20 y 10 % de la portada de finance.gov.mk; no se leyeron condiciones ni topes |
| kalkulator-za-danok-na-dobivka | propio | sí | 10 %; 1 % sobre ingresos de 3 a 6 millones |
| kalkulator-za-godishen-odmor | vacaciones | sí | ЗРО, 137 a 144 |
| kalkulator-za-regres | propio | sí, alcance público | Convenio del sector público; base la ingresa la persona |
| kalkulator-za-otpremnina | indemnizacion-despido | sí | ЗРО, 97 (la ley dice «испратнина») |
| otkazen-rok | preaviso | sí | ЗРО, 88 a 90 |
| prekuvremena-rabota | horas-extra | sí, alcance público | Límites de ЗРО 117; 35 % del convenio público; privado: % a mano |
| kalkulator-za-boleduvanje | propio | sí, alcance público | Convenio público, art. 19; hasta 30 días |
| porodilno-otsustvo | propio | sí, solo fechas | ЗРО 165 y 166; sin monto |
| danok-na-promet-na-nedvizhnosti | propio | sí | 2 a 4 %, art. 22 |
| danok-na-imot | propio | sí | 0,10 a 0,20 %, art. 6 |
| danok-na-nasledstvo-i-podarok | propio | sí | Art. 16 |
| kalkulator-za-inflacija | inflacion | sí | Proyección con la última tasa anual |
| prosechna-plata | propio | sí | Serie de ДЗС |
| minimalna-plata | salario-minimo | **no, borrador** | Monto 2026 sin fuente primaria |

## Datos

27 datos: 28 tramos verificados el 2026-11-01, 1 no verificado. 3 series (ДЗС).

### No verificados

- **Минимална плата 2026** (`mk.minimalna-plata`). 38.507 bruto y 26.046 neto aparecen solo en extractos de buscador
  y contadores privados: no verifica. slvesnik.com.mk rechaza la conexión. economy.gov.mk (ministerio ahora competente)
  publica la tabla hasta marzo de 2022 y no se encontró la объава de marzo de 2026. La fórmula sí se leyó
  (Сл. весник 41/22). La cuenta con 28 % y 10.932 da 26.046, coincide, pero no es fuente.

### Fuentes que no se pudieron leer (sin eludir)

- nbrm.mk: 403. Sin calculadora de tipo de cambio.
- slvesnik.com.mk: ECONNREFUSED.
- fzo.org.mk: 403 en sus PDF. Por eso el porcentaje general de боледување y el monto de породилно no se usan. Se leyó
  un texto consolidado de 2016 en portal.mdt.gov.mk, viejo: no se cargó.
- Convenio colectivo del sector privado: solo en sitios de sindicato, empleadores y terceros, no en sitio oficial.
  Regres, horas extra y боледување quedan con los valores del sector público y un aviso `cautela`.
- mtsp.gov.mk ya no tiene las leyes laborales: pasaron a economy.gov.mk, que enlaza a portal.mdt.gov.mk (usado).

### Dudas de los datos

- finance.gov.mk todavía muestra las tasas viejas de contribuciones (18,8 y 1,2 %). УЈП y la ley consolidada 07/2026
  dicen 19,9 y 0,1 % desde julio de 2026: mandan esas.
- La tasa del art. 25 vale «заклучно со платата за декември 2026»: el tramo termina el 2026-12-31 a propósito.
  Sin actualización, las calculadoras de plata dejan de publicarse el 1/1/2027.
- El ЗРО es el consolidado de 2023; se leyeron las reformas 39/25, 74/25 y 124/25 y no tocan estos artículos.
- `desde` de varias normas es la fecha del texto leído, no la de la entrada en vigor original.
- La serie de inflación tiene huecos: mayo, junio y julio de 2026 dieron 404 con el patrón de URL. Por eso no hay
  índice encadenado y la calculadora proyecta con la última tasa anual.

## Detectores

Probados contra las fuentes reales con `scripts/paises/mk/probar_detectores.ts` (sin cabeceras falsas):

- `mk.neto-plata-dzs`: 2026-08-01, 48.733. `mk.bruto-plata-dzs`: 2026-08-01, 73.336.
- `mk.ujp-licno-osloboduvanje` y `mk.ujp-prosechna-plata`: `[]`, sin novedades.

No hay detector para la inflación anual: el dato está solo en el comunicado mensual, con URL por mes.

## Checks

Con el país registrado localmente: `tsc` sin errores; `check_paises mk` OK (27 datos, 61 calculadoras);
`check_paises_casos mk` 62 casos; `check_textos_paises mk`; `check_seo_pais mk`; `check_ofertas_intl mk`;
`check_fronteras`; `check_eol`; `check_motor` 5427 pruebas. `check_mundo` falla solo por `be`, ajeno a esta rama.

`scripts/paises/mk/ver_textos.ts` resuelve marcadores y busca «ден..». Locales: 0.

## Riesgos y pendientes

- **Universales del motor:** 25 líneas con «ден..» o «ден.,» (ej. `kalkulator-za-kredit`, `kalkulator-za-popust`), contra
  la regla de D36. Son textos de `src/motor/universales/*/contenido/mk.ts`, fuera de este encargo: para la rama del motor.
- Sin revisión por hablante nativo.
- Sin mirada en `next dev`: Turbopack no acepta la junction y no se hizo `npm ci`.
- Slugs elegidos por el vocabulario de УЈП, leyes y resultados de búsqueda; WebSearch es de EE. UU.: no se comprobó el
  autocompletar de Google desde Macedonia.
- Regres, боледување y додатоци son del sector público: el título y el aviso lo dicen.
- Боледување: el art. 19 se aplica con un solo porcentaje al período entero; es lectura del texto.
