# Bitácora de mejora continua

Una entrada por corrida, la más nueva arriba. Es la memoria del agente (`docs/medicion/AGENTE.md`):
qué se cambió, con qué hipótesis, contra qué valor de antes y cuándo se evalúa.

Formato:

```
## AAAA-MM-DD
- **<página>** · fuga <paso> (<valor> vs <referencia>, <n> perdidas)
  - Cambio: <qué ve distinto la persona> · <experimento <id> | directo>
  - Antes: <métrica de base, con n>
  - Se evalúa: <fecha o «cuando el experimento tenga veredicto»>
- Evaluado: <cambio anterior> → <resultado con números> · <se queda | se revierte>
```

## 2026-11-12 (ventas en Argentina: el paso que sobra en alquileres y el que vuelve de MercadoPago)
Sin acceso a la base ni a MercadoPago desde esta máquina: la línea de base sale de
`analisis-planillas-2026-11-03.md` y de `ultimo.json` (ventana 26/10 → 9/11). Recorrido en vivo en
celular y escritorio, y la pantalla de pago de MercadoPago abierta sin pagar (se ve bien: marca
CalculAR, cuenta, tarjeta sin cuenta y efectivo).
- **/inflacion/alquiler** · fuga accion sobre la oferta (la página más vista del sitio: 901
  personas y 905 usos en 14 días; 14 toques de compra, 0 ventas de la planilla en 60 días)
  - Cambio: el botón de la oferta pasa de «Ver la planilla» (iba a la landing) a «Comprar mi
    planilla», que va derecho a MercadoPago con el contrato ya cargado. La landing queda como link
    secundario («Ver todo lo que trae la planilla», ubicación `calculadora-landing`) · directo
  - Hipótesis: era la única oferta de calculadora que todavía hacía pasar por la landing a quien ya
    vio su contrato cargado y el precio. La landing no retenía a nadie.
  - Antes: 16 toques de «Ver la planilla» en 30 días (4/10 → 3/11), 0 checkouts; landing
    `/planillas/alquileres` 27 visitas, 0 toques, 54 % de rebote, 9 s de mediana.
  - Se evalúa: 2026-12-15, con `tools/embudo-planillas.ts --dias 30`: checkouts y pagos de
    `planilla-alquileres` con ruta `/inflacion/alquiler`. Si hay 20 checkouts o más y 0 pagos, el
    problema es el producto o el precio para este público y no el camino: pasa a kill criteria
    junto con Monotributo.
- **Todas las compras de calcular.ar** · fuga entre MercadoPago y el pago (4/9 → 3/11: 35 idas a
  MercadoPago, 13 pagos; 37 %)
  - Cambio: quien sale a pagar y vuelve al sitio sin pagar (con «atrás» o reabriendo la página, en
    la hora siguiente) ve una vez un aviso arriba: «¿No pudiste terminar la compra?», con el producto y
    el precio, que se puede pagar con tarjeta sin tener cuenta de MercadoPago o en efectivo, la
    devolución de 7 días, un botón que reintenta la misma compra y un link a contacto
    (`VueltaDePago`, en el layout de `(ar)`). Aclara que si ya pagó no tiene que hacer nada. No
    aparece en gracias, en `/planillas/comprar` ni cuando MercadoPago devuelve con `?pago=`, y se va
    al pasar a otra página · directo
  - Además: la letra chica de las ofertas de calculadora dice ahora «con tarjeta, débito o dinero en
    cuenta por MercadoPago (no hace falta tener cuenta)».
  - Hipótesis: con la compra directa ya no hay mail para un recordatorio. El único momento para
    contestar la duda que frenó el pago es cuando la persona vuelve.
  - Antes: 37 % de checkout a pago, medido con el diálogo del mail (que filtraba curiosos). Con la
    compra directa del 3/11 todavía no hay dato: se lee junto con la evaluación del 1/12.
  - Se evalúa: 2026-12-15. Toques de `cta_compra` con ubicación `vuelta-de-pago` en `ca_eventos` y
    cuántos de esos checkouts terminan en pago. Si en 30 días hay menos de 3 toques, el aviso no le
    habla a nadie: se saca.
- **/empleada-domestica** · fuga accion sobre la oferta (394 personas en 14 días, 2 toques de
  compra; Casas particulares es el producto que mejor cierra: 5 checkouts, 5 ventas)
  - Cambio: en mayo, junio, noviembre y diciembre la oferta abre con «El aguinaldo de
    <junio | diciembre>, ya calculado» en vez de dejarlo último (en casas particulares se paga con
    el sueldo de junio y de diciembre). El resto del año queda igual · directo
  - Antes: 2 toques de compra sobre 394 personas (26/10 → 9/11).
  - Se evalúa: 2026-12-31, toques de compra y ventas desde `/empleada-domestica` en noviembre y
    diciembre contra octubre.
- **/aportes-empleada-domestica** · fuga buscador (0,2 % vs 2,9 %, 982 impresiones, 26 perdidas)
  - Cambio: title «Aportes casas particulares <mes>: $ 45.025 por mes» (antes terminaba en «tabla
    de ARCA») y description que abre con lo que paga el empleador con 16 horas o más y con menos de
    12. Sale de la tabla de ARCA del mes: rota sola · directo
  - Por qué esta página: es la del que paga. Con `/deduccion-empleada-domestica` dio 3 inicios y 3
    ventas de la planilla de Casas particulares.
  - Antes: «aportes y contribuciones casas particulares septiembre 2026» 0/94 (pos 6,3); «aportes
    empleada domestica» 0/71 (pos 9,5); «cargas sociales empleadas domesticas» 0/66 (pos 7,1).
  - Se evalúa: 2026-12-10 (4 semanas en Search Console).
- **Medición** · `vista_oferta` de las ofertas que se montan con el resultado
  - Cambio: `rastreo.ts` vuelve a buscar `[data-oferta]` cada vez que cambia el contenido de
    `<main>` (pendiente 4 del análisis del 3/11). Alquiler, plazo fijo y vacaciones empiezan a
    contar vistas de oferta: su tasa de toque va a bajar en el informe, y esa es la real.
- No se tocó, y por qué: los informes (cuota alimentaria, despido, ganancias, crédito laboral)
  siguen yendo a su landing, porque ahí la persona ve el informe con sus números antes de pagar;
  `PlanillaCTA` en las páginas de aportes y deducción sigue con «Ver la planilla», que es el camino
  que hoy vende; `/convenios/comercio` tiene el experimento `comercio-quien` corriendo.
- Verificación: `tsc` limpio y `check-all` con 158 de 160 suites verdes. Las dos rojas son de
  calcularya y no tocan estos archivos: `check_paises` (series de IPC de 38 países sin dato en 70
  días) y `check_textos_paises` (títulos de `ch.mietzinsrechner` y una description de `ve`). No se
  corrió `next build` en local.
- Para mirar aparte: la serie de IPC de datos.gob.ar sigue en agosto de 2026 al 12/11, así que
  `/inflacion/alquiler` (la página más vista) calcula con dos meses menos de los que ya publicó el
  INDEC. `gen_ipc_serie.ts` nombra el xls del INDEC como fuente alternativa.
- calcularya: el arreglo de `vista_oferta` vale para los dos sitios. El aviso de vuelta de pago y
  el botón de alquileres son del flujo de MercadoPago de calcular.ar; calcularya cobra por otro
  camino (`src/motor/ui/Oferta.tsx`) y queda pendiente llevarle el aviso con sus textos por idioma.

## 2026-11-03 (Comercio: ofrecerle la planilla al que paga, no al que cobra)
- **/convenios/comercio** · fuga accion sobre la oferta (654 vieron la oferta de la planilla en
  30 días, 10 la tocaron: 1,5 %, contra 9,7 % en `/convenios/uocra` y 7,9 % en
  `/convenios/camioneros` con el mismo componente)
  - Cambio: encabezar la oferta con la pregunta que separa públicos. «b» = dos tarjetas arriba de la
    oferta: «¿Liquidás sueldos de comercio?» (la planilla es para vos) y «¿Sos empleado de comercio?»
    (lo tuyo es gratis: copiá o compartí el resultado, o mirá `/sueldo-neto/comercio`). La oferta y
    su botón quedan iguales en las dos variantes · experimento `comercio-quien`
    (`^/convenios/comercio$`, métrica `acciones`, hasta 2026-12-15)
  - Hipótesis: a esta página entran empleados mirando su sueldo («cuánto cobra un empleado de
    comercio por 8 horas», 11.488 impresiones en 14 días) y la planilla liquida sueldos. Si el que
    paga se reconoce antes de la oferta, la toca más; el empleado deja de rebotar contra ella.
  - Antes: 654 vieron / 10 tocaron Comprar (1,5 %), 0 compras desde esta página en 60 días.
  - Se evalúa: cuando el informe dé veredicto (≥ 200 por variante, P ≥ 95 %) o el 2026-12-15. Leer
    `acciones` por variante y, aparte, `cta_compra` y `checkout` por variante en `ca_eventos`: el
    link a `/sueldo-neto/comercio` no lleva `data-evento` a propósito, para que un toque del
    empleado no cuente como acción de la «b».
- **/convenios/comercio/[mes], blog de comercio, /libro-de-sueldos, /certificado-de-trabajo**
  (`PlanillaComercioCTA`) · fuga accion (233 vieron / 26 tocaron «Ver la planilla» / 0 ventas en
  `/convenios/comercio/octubre-2026`; 77 / 11 / 0 en el post del modelo de recibo)
  - Cambio: el CTA dice para quién es antes del botón («Para quien paga sueldos · ¿Liquidás sueldos
    de comercio?»), nombra el recibo imprimible, y al pie manda al empleado a lo gratis
    (`/sueldo-neto/comercio`). El mismo CTA se suma a `/libro-de-sueldos` y `/certificado-de-trabajo`
    (páginas del que paga, antes de «Fuentes») · directo
  - No se sumó a `/aguinaldo`: su calculadora no sabe el convenio de la persona (no hay selector), así
    que no se puede ofrecer la planilla de Comercio sólo a quien liquida comercio.
  - Antes: 233 / 26 / 0 en `octubre-2026`; 77 / 11 / 0 en el post del recibo (30 días al 3/11).
  - Se evalúa: 2026-12-15, con `tools/embudo-planillas.ts --dias 40`: toques de `cta_compra` con
    `ubicacion=calculadora` desde los meses y el blog, y checkouts desde las dos páginas nuevas.
- **/planillas** · fuga buscador (rankea por «calculadora faecys», «calcular sueldo empleado de
  comercio», posición 63: consultas de calculadora, no de planilla)
  - Cambio: title «Planilla de liquidación de sueldos de Comercio 2026 en Excel» y description con
    «liquidar sueldos de empleados de comercio (CCT 130/75)», escala, antigüedad, presentismo, jornada
    parcial y recibo; sin la palabra «calculadora». «Qué trae el archivo» suma la hoja Recibo · directo
  - Antes: posición 63 en consultas de calculadora; sin impresiones registradas para «planilla
    liquidación sueldos comercio excel» en `ultimo.json`.
  - Se evalúa: 2026-12-01 en Search Console: impresiones y posición de «planilla liquidación sueldos
    comercio excel», «planilla sueldos comercio excel», «liquidar sueldo empleado de comercio».
- **Planilla de Comercio** · hoja «Recibo» nueva (`scripts/gen_planilla_comercio.ts`): recibo
  imprimible por duplicado que lee la liquidación del mes (categoría, período, haberes, aportes,
  neto); el check `check_planilla_comercio` evalúa el .xlsx real y exige el mismo bruto y neto que la
  Liquidación y que calcular.ar. Changelog de la planilla con la entrada del 03/11/2026 · directo
  - Hipótesis: los lectores del post «modelo de recibo de sueldo» piden un recibo (14 % de toques,
    0 ventas), y Casas particulares, que lo tiene, vende 5 de 5 checkouts.
  - Se evalúa: 2026-12-15, ventas de Comercio iniciadas desde el post del recibo y desde los meses.

## 2026-11-03 (sesión con Manuel: por qué ven la planilla y no compran)
- **Todas las ofertas de planillas e informes** · fuga accion (2271 vieron una oferta en 30 días,
  128 tocaron Comprar, 27 abrieron el diálogo del mail, 13 llegaron a MercadoPago)
  - Cambio: «Comprar» va derecho a MercadoPago, sin el diálogo que pedía el mail; el mail queda
    opcional en `/planillas/comprar` (sin JS) y en el POST · directo (`docs/decisiones/compra-directa.md`)
  - Hipótesis: el diálogo perdía a la mitad (27 → 13) y el recordatorio que justificaba pedir el
    mail no recuperó ninguna de las 16 ventas de 90 días (todas pagadas a los minutos). MP devuelve
    el mail en el pago: la entrega no lo necesita antes.
  - Antes: 13 checkouts / 128 toques de Comprar (10 %) · MP 4/9 → 3/11: 35 preferencias, 13 pagos
    (37 %) · ~5 ventas/mes.
  - Se evalúa: 2026-12-01 con `tools/embudo-planillas.ts --dias 28` y el informe: checkouts por
    toque, ventas/mes y tasa checkout → pago en MP (si baja de 25 % sin más ventas, se revierte).
- Sin cambio, anotado para el agente (`docs/medicion/analisis-planillas-2026-11-03.md` § Qué sigue):
  Comercio es el 46 % de las vistas de oferta y el 8 % de las ventas; las páginas que la ofrecen
  (`/convenios/comercio`, los meses, el blog de recibos) reciben empleados, no empleadores. No
  gastar experimentos de copy en `/planillas`: el problema es a quién se le ofrece.

## 2026-10-24 (calcular.ar → calcularya: links por concepto)
- **13 calculadoras de calcular.ar** (`/sueldo-neto`, `/aguinaldo`, `/indemnizacion`, `/vacaciones`,
  `/horas-extras`, `/salario-minimo`, `/empleada-domestica`, `/ganancias`, `/monotributo`,
  `/inflacion`, `/plazo-fijo`, `/cuota-alimentaria`, `/jubilacion`) y el footer de todo el sitio
  - Cambio: al final de cada calculadora, «¿Vivís o trabajás en otro país?» con links dofollow
    «<concepto> en <país>» a la calculadora equivalente de calcularya (`src/components/OtrosPaises.tsx`,
    sale de `registro.equivalentes` del concepto en modo producción: un país nuevo se suma solo). Ocho
    a la vista (Uruguay, Chile, España, México, Brasil, Paraguay, Estados Unidos, Italia primero) y el
    resto en un desplegable. 367 links a 367 URLs distintas de calcularya, todas con 200 al probarlas.
    Footer: «CalcularYa: calculadoras para otros países» a la home · directo
  - Hipótesis: calcularya no tiene autoridad propia; los links desde calcular.ar (~5.000 clics/mes de
    Google) son lo único que le pasa peso entre dominios.
  - Antes: calcularya sin propiedad en Search Console (se da de alta hoy); casi ningún link de
    calcular.ar hacia calcularya (solo `/sueldo-en-el-mundo`).
  - Se evalúa: 2026-11-21 a 2026-12-05 (4 a 6 semanas), mirando impresiones y páginas indexadas de
    calcularya en Search Console, por país de las calculadoras enlazadas.

## 2026-10-24 (corrida del agente, publicada)
- Se retoman los dos cambios «listos para la próxima corrida», revalidados con el mismo informe
  (`informes/2026-10-23.md`: siguen siendo las fugas 1 y 2 de Google). Publicados con la regla de
  la línea de base: `check-all` en `main` limpio da rojo en `check_hreflang`, `check_mes_en_render`,
  `check_ofertas_intl` y `check_panel_sql` (heredadas, las mismas de la entrada de abajo); con el
  cambio, las mismas cuatro y nada más (`check_mes_en_render` sigue con sus 11 páginas, ninguna de
  comercio). `npm run build` verde, las dos páginas siguen estáticas.
- **/convenios/comercio** · fuga buscador (0.9 % vs 4.9 %, 4610 impresiones, 181 perdidas)
  - Cambio: title «Sueldo de Comercio octubre 2026: $ 1.458.545 por 8 horas» y description con el
    bruto y el neto de 8 horas de un Vendedor B y «por 4 horas, la mitad», en `generateMetadata`
    desde `calcularComercio` del mes vigente (rota solo) · directo
  - Antes: «cuanto cobra un empleado de comercio por 8 horas» 0/214 (pos 7.6); «cuánto cobra un
    empleado de comercio por 4 horas 2026» 2/198 (pos 4.2); «cuanto cobra un empleado de comercio
    por 4 horas» 1/180 (pos 7.1). Página entera: 0.9 % de CTR sobre 4610 impresiones.
  - Se evalúa: 2026-11-23 (4 semanas en Search Console). Ojo con `/convenios/comercio/por-horas`
    (2026-10-16), que apunta a las mismas consultas: mirar los clics de las dos juntas.
- **/convenios/comercio/[mes]** (fuga en `/convenios/comercio/octubre-2026`, 2.0 % vs 9.4 %, 1372
  impresiones, 102 perdidas)
  - Cambio: title «Sueldo de Comercio <mes>: desde <total más bajo de la escala>» (octubre:
    $ 1.303.900) en vez de «Maestranza A <básico>»; la description arranca con «Cuánto cobra un
    empleado de comercio en <mes>, categoría por categoría». Cambia todos los meses · directo
  - Antes: «sueldo empleado de comercio octubre 2026» 14/733 (pos 4.1); «sueldo comercio octubre
    2026» 0/72 (pos 2.4); «sueldo empleados de comercio octubre 2026» 2/66 (pos 2.7).
  - Se evalúa: 2026-11-23, con las consultas equivalentes de noviembre si octubre ya no tiene
    impresiones.

## 2026-10-24 (corrida del agente)
- Sin cambios publicados: `check-all` da rojo en `main` limpio (probado con el cambio guardado
  aparte), en cuatro suites que no toqué:
  - `check_mes_en_render`: 11 páginas evalúan `textosDe()`/`textosMundo()`/`textosSueldos()` a
    nivel de módulo (auth, cuenta, login, registro, recuperar, sueldo-en-el-mundo, sueldos-reales).
  - `check_panel_sql`: no cuenta las 6 tablas `ca_sueldos_*` ni sus funciones `security definer`
    (llegaron con «sueldos reales», migración `20261024150000`).
  - `check_ofertas_intl`: `cl/sueldo-liquido` y `cl/finiquito` difieren de la planilla en el tope
    imponible (3.707.987 contra 3.708.942: parece la UF desfasada entre planilla y calculadora).
  - `check_hreflang`: clústeres de inflación de calcularya en producción no recíprocos
    (`/xx/inflacion` contra `au`/`nz`/`sg`/`hk`/`my`/`ph`/`kw`/`inflation-calculator`).
- Sin experimentos para cerrar ni cambios anteriores para evaluar.
- Lo elegido, listo para la próxima corrida con `check-all` en verde (no se tocan cifras: todo sale
  de `calcularComercio` y de la escala):
  - **/convenios/comercio** · fuga buscador (0.9 % vs 4.9 %, 4610 impresiones, 181 perdidas)
    - Cambio: `generateMetadata` con la cifra de 8 horas del mes vigente. Title «Sueldo de Comercio
      octubre 2026: $ 1.458.545 por 8 horas»; description «Cuánto cobra un empleado de comercio por
      8 horas en octubre 2026: $ 1.458.545 brutos un Vendedor B con presentismo, unos $ 1.228.792
      en mano. Por 4 horas, la mitad. Calculá tu categoría con la escala de FAECYS.» · directo
    - Antes: «cuanto cobra un empleado de comercio por 8 horas» 0/214 (pos 7.6); «cuánto cobra un
      empleado de comercio por 4 horas 2026» 2/198 (pos 4.2); «cuanto cobra un empleado de comercio
      por 4 horas» 1/180 (pos 7.1). Ojo: `/convenios/comercio/por-horas` es del 2026-10-16 y apunta a
      las mismas consultas; puede que todavía no se vea en los datos.
  - **/convenios/comercio/octubre-2026** · fuga buscador (2.0 % vs 9.4 %, 1372 impresiones, 102 perdidas)
    - Cambio: en la plantilla `[mes]`, title «Sueldo de Comercio <mes>: desde <mínimo de básico +
      no remunerativo entre categorías>» (octubre: $ 1.303.900) en vez del básico de Maestranza A
      solo; la description empieza con «Cuánto cobra un empleado de comercio en <mes>, categoría por
      categoría». Cambia todos los meses de comercio, no sólo octubre · directo
    - Antes: «sueldo empleado de comercio octubre 2026» 14/733 (pos 4.1); «sueldo comercio octubre
      2026» 0/72 (pos 2.4); «sueldo empleados de comercio octubre 2026» 2/66 (pos 2.7).

## 2026-10-24
- Arranca la medición de fugas (migración `20261024160000`): resultado, campo donde se traban,
  clics de rabia, Web Vitals por carga y experimentos A/B. El paso «resultado» y la velocidad
  empiezan a tener datos desde hoy; el primer informe con ventana completa es el del 2026-11-09.
- Primer informe (`informes/2026-10-23.md`): la fuga más grande está antes de entrar, en Google.
  `/convenios/comercio` sale para «cuánto cobra un empleado de comercio por 8 / 4 horas» y casi nadie
  la elige (0/214, 2/198). En el sitio, la home rebota 57 % contra 20 % de referencia.
