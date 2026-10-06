# Informe de liquidación final por despido — research de producto (2026-10-06)

## Quién compra y en qué situación
Alguien al que acaban de despedir sin causa (o que se considera despedido) y que tiene, o va a tener en días,
un número que le pasa la empresa. Tiene miedo de que lo estafen, no sabe leer un recibo de liquidación y
tiene una cita por delante: la empresa (firmar el recibo), el SECLO o la conciliación provincial, o un
abogado/sindicato. Ya usó la calculadora gratis de /indemnizacion y tiene un total, pero un total no le sirve
para discutir.

## Qué hace con el entregable al día siguiente
1. Pone la oferta al lado de lo que surge de la ley y pregunta por el rubro que no cierra (no por el total).
2. Lo lleva impreso o en el celular a la conciliación / al abogado, con los papeles que tiene que juntar.
3. Sabe hasta cuándo le tienen que pagar, cuándo le deben el certificado y hasta cuándo pedir el desempleo.

→ Producto: cada rubro con artículo y cuenta; comparación oferta vs ley (carga en el navegador, o columna en
blanco para escribir a mano); Ganancias; checklist «antes de firmar» con lo que dice la ley tras la reforma;
papeles; plazos con fecha calculada; glosario; nota YMYL; fuentes con fecha.

## Mercado (consultado 2026-10-06)
- Gratis: decenas de calculadoras (estudios, medios). Dan un total; casi ninguna la cuenta por rubro con
  artículo, ninguna compara contra la oferta, y muchas siguen con reglas previas a la Ley 27.802.
- Pago: estudiovilaplana.com.ar vende «liquidación estimativa en PDF» + 30 min de consulta telefónica por
  **$30.000**, entrega en <24 h hábiles (https://estudiovilaplana.com.ar/calculo-indemnizacion-despido/).
- Hueco: documento inmediato, con la ley vigente, la oferta comparada y los plazos con fecha, a $7.900. No
  compite con la consulta del abogado: la ordena.

## Normas verificadas (texto actualizado de la LCT en InfoLEG, leído entero el 2026-10-06)
https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm
- Art. 245 (sust. art. 51 Ley 27.802): base, habitual = 6 meses, normal = promedio, tope 3× CCT, piso 67%,
  mínimo 1 mes, fondo de cese por CCT, y **«única reparación… Su percepción importa la extinción definitiva de
  cualquier reclamo… vinculado al despido, incluidos los de naturaleza civil»**, salvo ilícitos penales.
- Art. 231 inc. b (sust. art. 48 Ley 27.802): 1 mes hasta 5 años, 2 meses si es superior; sin preaviso en
  período de prueba. Art. 232: indemnización sustitutiva. Art. 233: integración; no procede en período de prueba.
- Art. 12 (sust. art. 6 Ley 27.802): nula toda convención que suprima o reduzca derechos, también los
  «provenientes de su extinción».
- Art. 15 (sust. art. 7 Ley 27.802): acuerdos transaccionales/conciliatorios/liberatorios sólo válidos con
  intervención judicial o administrativa y resolución fundada de justa composición; la homologación da cosa juzgada.
- Art. 80 (sust. art. 25 Ley 27.802): 45 días hábiles desde la extinción; cumplido también si la información
  está en el sistema de ARCA. (Ya verificado en `src/data/certificado-trabajo.ts`, 17/8/2026.)
- Art. 255 bis → art. 128: pago de la liquidación en 4 días hábiles desde la extinción.
- Art. 256: prescripción de 2 años. Art. 260: pago insuficiente = entrega a cuenta aunque se reciba sin
  reservas; queda la acción por la diferencia.
- Art. 277: el pago en 6/12 cuotas es sólo para **sentencias** judiciales (no para la liquidación): no se
  menciona en el informe para no confundir.
- Ley 24.013 art. 115: 90 días para pedir el desempleo (`src/data/desempleo.ts`, verificado 2/9/2026).
- Ley de Ganancias art. 26 inc. i): `src/data/indemnizacion.ts` (verificado 21/9/2026).
- SECLO: instancia obligatoria previa al juicio para empresas con domicilio en CABA, gratuita para el
  trabajador, con abogado o representación sindical — https://www.argentina.gob.ar/trabajo/seclo (2026-10-06).

## Decisiones
- Motor: `calcularIndemnizacion` + `tratamientoGanancias` sin tocar. El informe suma los **días trabajados
  del mes** con `diasDelMesTrabajados` × sueldo ÷ 30 (misma regla que /renuncia y /periodo-de-prueba) y deja a
  la vista el subtotal que coincide con la calculadora. Sueldo del mes editable en el navegador.
- Plazos con fecha: `sumarDiasHabiles` del motor del certificado (lun-vie sin feriados nacionales). Para
  despidos anteriores al 6/3/2026 el certificado no lleva fecha (rige otro texto).
- Viajan en la metadata: sueldo, fechas de ingreso y despido, preaviso sí/no, tope. No viajan: nombre,
  empresa, montos ofrecidos.

## Límites YMYL
- Referencia de cálculo, no asesoramiento; nunca «te corresponde seguro» ni lo que dirá un juez.
- Se dice de frente que cobrar la indemnización del 245 cierra los reclamos vinculados al despido (Ley 27.802)
  y que un acuerdo liberatorio necesita homologación: son las dos cosas que más plata cuestan si se ignoran.
- Una diferencia contra la oferta se presenta como algo para preguntar, no como prueba de estafa.
- No se suman multas derogadas (Ley 27.742).
