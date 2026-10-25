# Calendario laboral y fiscal (octubre 2026)

Página por edición con las fechas que cambian el sueldo en los próximos 12 meses y los últimos 2,
cada una con fuente oficial, calculadora y «Agregar a mi calendario» (.ics o Google Calendar), más
suscripción `webcal://` al calendario entero. Busca tráfico estacional («cuándo sube el salario
mínimo 2027 en Perú») y que la gente vuelva.

## Decisiones

- **De dónde salen las fechas.** Del registro, nunca de texto propio. Fuentes aceptadas: tramos nuevos
  de datos.json (con tramo anterior o cargados antes de regir), puntos de series de unidades de
  referencia (UTM, UR), novedades con `vigenteDesde` (se fusionan con un tramo del mismo día solo si es el
  único dato que cambia ese día entre los que pide la primera calculadora de la nota y ninguna otra nota
  lo tomó: título de la nota, valor del tramo; si no, la nota es un evento aparte) y el campo opcional
  `Dato.calendario` para días fijos de pago.
- **Lo que se descartó.** Avisos (su `desde` es la ventana de visibilidad, no la norma: cl.reajuste-imm
  arranca el 1/10 y habla del 1/1). Puntos de IPC y demás índices (fecha del período medido). Tramos
  sin anterior con `desde <= verificadoEl` (Ghana: 24 «cambios» del 18/10 que eran la carga del dato).
- **Campo nuevo `Dato.calendario`** (tipos.ts, aditivo). El plazo de pago de un bono está en prosa en
  las notas de los datos (`ni.aguinaldo-plazo-dias`, `ec.decimo-cuarto-mes-inicio`), no como dato. Se
  declara en el dato cuya norma lo fija para heredar su fuente; la validación vive en el motor del
  calendario (no en datos.ts) para no tocar el validador compartido.
- **Publicable = al menos una fecha por delante.** Un calendario con solo pasado es página fina.
- **Tema del evento** por las calculadoras que usan el dato: salario mínimo gana, después impuestos,
  aportes, sueldo neto según el tipo del dato, índices y el resto «reglas laborales».
- **Rendimiento.** Datos en el HTML (ISR 1 h la página, 1 día .ics y OG). En el navegador solo la cuenta
  regresiva contra el día de quien mira (useSyncExternalStore, sin desajuste de hidratación), el
  filtro (un atributo y CSS, sin recorrer la lista) y copiar el enlace.
- **hreflang** solo entre ediciones del mismo país (ch, ch-fr, ch-it), x-default en la principal: son
  el mismo calendario en otro idioma. Entre países el contenido es otro.

## Estado al 24/10/2026

19 ediciones con calendario y 63 fechas. Ninguna fecha de pago de bono todavía: 33 calculadoras de
bono sin `calendario` declarado (lista en `check_calendario`). ca-fr sin calendario porque los nombres
de `ca.minimum-wage` y `ca.rrsp-dollar-limit` no están traducidos en la edición.

## Correcciones del 24/10/2026 (rama `claude/fase2-fix-datos`)

- **Nota pegada al tramo equivocado.** La fusión tomaba el primer tramo del día que compartiera alguna
  calculadora con la nota: en Suiza el 2027-01-01 cambian el tarifario federal, la rebaja por hijo, el tope
  del pilar 3a y la renta AHV, y el tope del 3a salía titulado «Bundessteuer 2027». Ahora se fusiona solo
  con candidato único (ver arriba). check_calendario arma ese escenario con un registro de prueba.
- **Año del título.** Salía de los años de las fechas por delante: en octubre de 2026 Perú decía
  «Calendario laboral 2027». Ahora es el período de la grilla de 12 meses que muestra la página
  («2026-2027», o un solo año si la grilla arranca en enero), en título, ceja y OG, en los 10 idiomas.
- **.ics:** escapa también un retorno de carro suelto y solo escribe `URL:` si es https.

## Fechas de pago de bonos cargadas (2026-10-24)

Leídas en el texto de la misma fuente del tramo: MX LFT art. 87 (antes del 20/12 → 19/12), GT
Decreto 76-78 art. 2 (50 % hasta el 15/12, 50 % hasta el 31/1) y Decreto 42-92 art. 3 (Bono 14,
15/7), DO Código de Trabajo art. 220 (20/12), HN Decreto 112-82 art. 11 (diciembre → 31/12) y
Acuerdo 02-95 art. 5 (junio → 30/6), SV Código de Trabajo art. 200 (1/10 al 20/12), PE Ley 27735
art. 5 (15/7 y 15/12), EC Acuerdo MDT-2015-0087 (15/3 Costa e Insular, 15/8 Sierra y Amazonía) y
NL Wet minimumloon art. 17 (vakantiegeld en junio → 30/6). «En el mes de X» se carga como el último
día del mes. Quedan sin fecha, con motivo: los que la ley fija relativa a otro hecho (MX PTU, PE y
EC utilidades, DO bonificación, VE, BO prima), los que no la fija (CL, ES, IT, AT, CH, CO por la
fuente del dato), los que no tienen dato propio en el registro (PT, UY, CR, PY), NI (digesto con
403), BR (la fecha está en la Lei 4.749, no en la fuente del dato) y BO aguinaldo (instructivo anual).
