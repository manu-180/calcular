# Informe del país Croacia (hr)

Rama `claude/pais-hr`. **Depende de `claude/mundo-motor-hr` (motor croata sin mergear):** hay que integrar esa rama antes.
Mercado `hr`, idioma `hr`, locale `hr-HR`, EUR, escala 0.9, `trato: "usted"` («vi» en minúscula, 2.ª plural), ijekavski, `estado: "interno"`.

## Calculadoras: 21 locales + 40 universales = 61

| slug | concepto | publicable | motivo |
|---|---|---|---|
| bruto-neto-kalkulator | sueldo-neto | sí | 556 gradova i općina; `mundo` declarado |
| neto-bruto-kalkulator | propio | sí | misma base, por bisección |
| trosak-poslodavca | costo-empleador | sí | |
| minimalna-placa | salario-minimo | sí | 1.050 (2026), 1.130 (2027, NN 124/2026) |
| porez-na-dohodak | impuesto-renta | sí | anual, con umanjenje para menores de 30 |
| doprinosi-na-placu | aportes-seguridad-social | sí | con art. 21.a |
| pausalni-obrt | regimen-simplificado | sí | tabla de Porezna uprava |
| doprinosi-za-obrtnike | propio | **no, borrador** | tasas fuera del paušal sin leer, ver abajo |
| pdv-kalkulator | iva | sí | 25/13/5; reemplaza a la universal del mismo slug |
| godisnji-odmor | vacaciones | sí | divisor por día declarado como estimación |
| regres | propio | sí | prigodne nagrade |
| izracun-otpremnine | indemnizacion-despido | sí | mínimo legal, art. 126 |
| otkazni-rok | preaviso | sí | art. 122 |
| prekovremeni-rad | horas-extra | sí | la ley no fija porcentaje: lo ingresa la persona (50 % es ejemplo) |
| bolovanje | propio | sí | prorrateo por 30 días declarado como estimación |
| rodiljna-naknada | propio | sí | HZZO |
| porez-na-promet-nekretnina | propio | sí | 3 % |
| porez-na-dobit | propio | sí | 10/18 % |
| kalkulator-inflacije | inflacion | sí | HICP |
| tecaj-hnb | tipo-de-cambio | sí | API de HNB |
| prosjecna-placa | propio | sí | sumada por demanda de búsqueda |

Universales: `"todas"`. Cae solo la de IVA, por haber local del mismo concepto.

## Datos

57 datos (58 tramos verificados, 1 pendiente) y 12 series, leídos el 1/11/2026.

**Fuentes leídas:** Narodne novine (uredbas de mínimo 2025, 2026 y 2027; NN 152/2024; NN 114/2023; Naredba NN 150/2025; Zakon o radu NN 93/2014), Porezna uprava (páginas y tabla xlsx de tasas 2026), HZZO, DZS, API de HNB, Eurostat.

**No verificado:**
- `hr.stope-samostalni` (15, 5 y 16,5 % para obrt na dohodak, obrt na dobit y slobodna zanimanja): esas tasas solo se leyeron en la página de paušalistas. El folleto de Porezna es de 2016 y el Zakon o doprinosima no se pudo abrir en NN. `doprinosi-za-obrtnike` queda en borrador, sin casos. Las bases sí están verificadas.

**Para mirar:**
- **Tope de la najviša osnovica.** Se aplica solo al mirovinsko y el zdravstveno va sobre todo el bruto. Porezna uprava dice que el tope se aplica «u izračunu doprinosa zaposlenika» y RRIF (secundaria) da el ejemplo con 15.000 euros, pero no se leyó el art. 205 de la ley. Solo afecta a brutos de más de 11.958 euros.
- **Zakon o radu.** Se leyó el texto base NN 93/2014, con fetch resumido. Las reformas 127/17, 98/19, 151/22 y 64/23 no se compararon artículo por artículo. Conviene cotejar arts. 65, 77-82, 94, 122 y 126 con un refundido.
- **Prebivalište.** Que la tasa sigue al domicilio sale de NN 121/2019, visto en el extracto de búsqueda, no abierto entero.
- **Naredba 2026:** un portal privado marca una versión del 28/3/2026. No se encontró ninguna modificación en NN; sin confirmar.
- **Inflación:** es el HICP de Eurostat, no el IPC nacional de DZS, porque DZS no tiene una serie legible por máquina. La FAQ lo aclara.
- **Series sin detector:** `hr.prosjecna-*` y `hr.medijalna-*` (DZS publica PDF con URL no predecible). Hay que cargarlas a mano cada mes; con 120 días sin carga `prosjecna-placa` deja de publicarse (`check_paises` avisa antes del 1/12).
- **Bases y paušal 2027:** salen en diciembre. Hasta cargarlas, una fecha de 2027 usa las de 2026. `proximaRevision` está en los datos.
- `bolovanje`: la parte a cargo del empleador no lleva tope (la ley dice «al menos 70 %»). Rodiljni sin tope, según HZZO.
- **Sin construir:** ugovor o djelu. Las fuentes de Porezna se contradicen sobre el zdravstveno (7,5 o 16,5 %).

## Pedido al motor

`reglas_idioma` marca como serbismo dos topónimos reales: **Hlebine** (`hleb…`) y **Sveta Nedelja** (`nedelj…`, dos unidades). Sin exención, esas tres opciones van sin etiqueta y el selector muestra la clave (`hlebine`, `sveta-nedelja-4324`, `sveta-nedelja-4367`). La tasa es correcta y el texto queda feo. Al eximirlos, hay que sumar sus `etiquetas` en `hr.stopa-niza` y `hr.stopa-visa`. No se usaron caracteres invisibles para esquivar la regla.

## Detectores y prueba real

`scripts/paises/hr/probar_detectores.ts`, corrido el 1/11/2026 contra las fuentes:

| detector | resultado |
|---|---|
| hr.usd/gbp/chf/bam/pln/huf/czk-hnb | 1 punto cada uno: 1,1172; 0,8338; 0,9194; 1,95583; 4,4038; 366,33; 24,353 |
| hr.ipc-eurostat | 321 puntos, último 09/2026: 105,42 |
| hr.stope-dohodak | 0 hallazgos: la tabla más nueva sigue siendo 2026 |
| hr.nn-* (12, por título en la búsqueda de NN) | 0 hallazgos |

HNB ya devuelve la lista con fecha de aplicación de mañana (vi 2/11 el día 1/11). `series.json` guarda la del día. Los detectores de NN leen las 200 publicaciones más recientes (la búsqueda no filtra por título): si el cron deja de correr mucho tiempo, puede perder un hallazgo. No se probó el camino con un hallazgo real; la Uredba 2027 está excluida por su id, así que `hr.nn-minimalna` da 0.

## Checks (con hr registrado localmente)

- `tsc --noEmit -p .`: sin errores.
- `check_motor`: 4883 pruebas OK.
- `check_paises hr`: OK, 61 calculadoras, 3 avisos (series que vencen si el cron no corre).
- `check_paises_casos hr`: 85 casos en 20 archivos.
- `check_textos_paises hr`: 2099 textos.
- `check_seo_pais hr`: OK, 0 avisos.
- `check_ofertas_intl hr`: OK.
- `check_fronteras`, `check_eol`: OK.
- `check_mundo`: 1 falla ajena (`be`). `hr` no figura mientras esté interno: hay que mirarlo al publicar. `mundo` va declarado. El neto mínimo da 799,24 (2026) y 843,90 (2027), coherente con lo que publica la prensa (sin usarla como fuente).

**No corrido:** las páginas en `next dev`. Con `npm ci` real, y `NEXT_PUBLIC_SITIO_INTL_URL` puesto, `next.config` muere con un error de apertura de archivo al cargar el registro (`mw/calculadoras/...`). Sin esa variable arranca, pero `/hr` da 404. **El selector de 556 opciones no se vio renderizado:** sumarán unos 30 KB de HTML en cada una de las cinco páginas que lo usan.

## Riesgos

- Textos escritos por un no nativo: D23 y D27 piden revisión por hablante nativo antes de publicar.
- Slugs (`bruto-neto-kalkulator`, `pdv-kalkulator`, `izracun-otpremnine`...) elegidos por búsquedas conocidas, sin verificar en el autocompletar de Google Croacia.
- Las tasas municipales cambian: las decisiones se adoptan hasta fin de noviembre para el 1 de enero. Hay que recargar la tabla 2027 (`hr.stope-dohodak` lo detecta). `gen_datos.py` no está en el repo: la tabla se generó del xlsx oficial en el scratchpad.
- `godisnji-odmor` usa 52 semanas para el valor del día, divisor que la ley no fija. Está dicho en los textos.
- `porez-na-dohodak` considera todo el ingreso como sueldo para la reducción de jóvenes y no incluye el régimen de zonas asistidas ni la invalidez.
