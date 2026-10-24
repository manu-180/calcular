# Calendario laboral y fiscal (octubre 2026)

Página por edición con las fechas que cambian el sueldo en los próximos 12 meses y los últimos 2,
cada una con fuente oficial, calculadora y «Agregar a mi calendario» (.ics o Google Calendar), más
suscripción `webcal://` al calendario entero. Busca tráfico estacional («cuándo sube el salario
mínimo 2027 en Perú») y que la gente vuelva.

## Decisiones

- **De dónde salen las fechas.** Del registro, nunca de texto propio. Fuentes aceptadas: tramos nuevos
  de datos.json (con tramo anterior o cargados antes de regir), puntos de series de unidades de
  referencia (UTM, UR), novedades con `vigenteDesde` (si coinciden con un tramo el mismo día y la
  misma calculadora, se fusionan: título de la nota, valor del tramo) y el campo opcional
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
