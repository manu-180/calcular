# El Salvador: expansión de calculadoras (12/10/2026)

Objetivo: pasar de 10 calculadoras publicadas a 30 o más, cada una con su dato leído en fuente
primaria. Demanda: **estimación cualitativa** (calendario legal, competidores vistos en Google:
finiquitojusto.com, toptrabajos.com, rivermate.com, medios). Sin Keyword Planner ni Trends.

## Pendientes resueltos

| Pendiente | Resultado | Fuente primaria |
|---|---|---|
| Reforma del aguinaldo 2026 | D.L. 669 (D.O. 177, tomo 452, 24/9/2026): pago del 1/10 al 20/12, fecha de referencia para el año completo y la escala: **12 de diciembre** (arts. 197, 200 y 202). Rige desde el 24/9/2026 | Diario Oficial, https://www.diariooficial.gob.sv/seleccion/31854 (pág. 6 a 8, imagen leída) |
| Aguinaldo libre de renta 2026 | D.L. 673 (mismo D.O.): no gravable hasta **$1,500** si se paga entre el 1/10 y el 20/12/2026 | ídem, pág. 17 a 19 |
| ISSS trabajador y patrono | Ley del Seguro Social, art. 29 (texto vigente de la Asamblea): **3 %** trabajador, **7.5 %** patrono | https://www.asamblea.gob.sv/sites/default/files/documents/decretos/942D37A6-2092-4347-A68C-2542389B481D.pdf |
| Techo de cotización ISSS | **$1,000** desde agosto de 2015 (antes $685.71). El reglamento no está publicado en texto vigente; lo dice el boletín oficial del Ministerio de Hacienda | https://www.mh.gob.sv/wp-content/uploads/2020/11/700-EDUFIS-IF-2016-00026.pdf |
| Pensiones (D.L. 672, 24/9/2026) | La pensión de navidad se paga del primer día hábil de octubre al quinto de diciembre | Diario Oficial, pág. 14 a 16 |

Hallazgo de herramientas: el Diario Oficial tiene API (`POST https://www.diariooficial.gob.sv/api/v1/diarios-disponibles`
con `year` y `month`) y cada número se baja en `/seleccion/<Id>`. Los decretos vienen como imagen;
el sumario de la primera página es texto. La Asamblea publica el texto vigente de cada ley en la
ficha del decreto original (`/leyes-y-decretos/view/<id>`, botón «Abrir documento»).

## Lista rankeada

Estado: **P** = publicada, **B** = borrador (falta dato), **N** = nueva.

| # | Calculadora (slug) | Demanda | Norma | Fuente primaria | Estado |
|---|---|---|---|---|---|
| 1 | aguinaldo | Muy alta (oct a dic) | CT 196 a 202, D.L. 669/2026, D.L. 673/2026 | Código de Trabajo (CSJ), Diario Oficial | P, actualizada |
| 2 | salario-liquido | Alta | LSS art. 29, LISP art. 16, D.E. 10/2025 | Asamblea, MH | P |
| 3 | retencion-de-renta | Alta | D.E. 10/2025 | jurisprudencia.gob.sv | P |
| 4 | indemnizacion | Alta | CT 58 | Código de Trabajo | P |
| 5 | liquidacion | Alta | CT 58, 187, 202 | Código de Trabajo | P |
| 6 | quincena-25 | Alta en enero | D.L. 499/2026 | Asamblea | P |
| 7 | salario-minimo | Media | D.E. 11/2025 | jurisprudencia.gob.sv | P |
| 8 | renuncia-voluntaria | Media | D.L. 592/2013 | Asamblea | P |
| 9 | vacaciones | Media | CT 177 | Código de Trabajo | P |
| 10 | horas-extra | Media | CT 161, 168, 169 | Código de Trabajo | P |
| 11 | descuentos-isss-afp | Media | LSS 29, LISP 16 | Asamblea, MH | P |
| 12 | costo-empleador | Media (pymes) | LSS 29, LISP 16, CT | Asamblea, MH | P |
| 13 | declaracion-de-renta (anual) | Media (marzo y abril) | LISR 37 y 29 num. 7 | Asamblea | P |
| 14 | retencion-servicios-profesionales (10 %) | Media | CT trib. 156 | Asamblea | P |
| 15 | incapacidad (subsidio ISSS y art. 307) | Media | CT 307, ISSS | Código, isss.gob.sv | P |
| 16 | licencia-por-maternidad | Media | CT 309, ISSS | Código, isss.gob.sv | P |
| 17 | dia-de-asueto | Media (feriados) | CT 190 a 192 | Código de Trabajo | P |
| 18 | salario-por-hora | Media | CT 142, 161 | Código de Trabajo | P |
| 19 | pension-por-vejez | Media | LISP 96 a 98, 114, 124 a 126 | Asamblea | N, pendiente |
| 20 | impuesto-bienes-raices | Media | Ley ITBR art. 4 | Asamblea, formulario MH | P |
| 21 | plazo-fijo (depósito a plazo) | Media | LISR 4 num. 5, CT trib. 159 | Asamblea | P |
| 22 | colones-a-dolares | Media | Ley de Integración Monetaria art. 1 | Asamblea | P |
| 23 | inflacion | Baja-media | IPC BCR | BCR | P |
| 24 | iva | Media | Ley IVA art. 54 | Asamblea | P |
| 25 | embargo-de-salario | Baja-media | CT 133 | Código de Trabajo | P |
| 26 | descanso-semanal | Baja-media | CT 175 | Código de Trabajo | P |
| 27 | nocturnidad | Baja-media | CT 161, 168 | Código de Trabajo | P |
| 28 | periodo-de-prueba | Baja-media | CT 28 | Código de Trabajo | P |
| 29 | preaviso-de-renuncia | Baja-media | D.L. 592 arts. 2 y 3 | Asamblea | P |
| 30 | despido-contrato-a-plazo | Baja | CT 59 | Código de Trabajo | P |
| 31 | salario-de-aprendiz | Baja | CT 69 | Código de Trabajo | P |
| 32 | prestacion-por-muerte | Baja | CT 313 | Código de Trabajo | P |
| 33 | ganancia-de-capital | Baja | LISR 42 | Asamblea | N, pendiente |
| 34 | renta-empresas (persona jurídica) | Baja | LISR 41 | Asamblea | N, pendiente |
| 35 | pago-a-cuenta | Baja-media (contadores) | CT trib. 151 | Asamblea | P |
| 36 | retencion-iva | Baja (contadores) | CT trib. 162 y 163 | Asamblea | P |

## Descartadas o en espera

| Idea | Motivo |
|---|---|
| INSAFORP 1 % en costo empleador | Ley de Formación Profesional sin texto vigente legible; hay un proyecto de ley que lo reemplaza (INCAF). Se menciona sin número |
| Pensión alimenticia | El Código de Familia no fija fórmula: la cuota la decide el juez. Calcular sería inventar |
| Trabajo doméstico | No tiene salario mínimo propio en el D.E. 11/2025; el resto (asueto, aguinaldo, vacaciones) ya lo cubren otras calculadoras |
| Licencia por paternidad | Tres días de salario (CT 29, 6.ª d). Muy chica para una página propia; queda en el FAQ de maternidad |
| Anticipo de saldo AFP | La Ley Integral de 2022 lo menciona solo en pasado (art. 98); no hay anticipo vigente |
| Pensión mínima por vejez en dólares de 2026 | El art. 114 dice $304.17; el art. 98 suma 30 % y redondea a $400. Se usa esa regla, sin cifra aparte |
| Tipo de cambio | El país usa el dólar; el colón se cubre con el conversor fijo |

## Pedidos al motor

- Un tipo de campo «lista de meses» para promediar salarios variables (incapacidad, vacaciones por comisión).
- Un formato de resultado «fecha» que acepte cálculo de días hábiles con feriados por país (preaviso, prueba).

## Cierre (12/10/2026)

33 calculadoras publicadas. Quedan para la próxima tanda, con los datos ya verificados en `datos.json`:
pension-por-vejez (#19: pide saldo acumulado, años cotizados y las reglas de devolución y BET; es una calculadora de varias ramas, no entró en este cierre), ganancia-de-capital (#33: dentro de los 12 meses la ganancia se suma a la renta ordinaria y eso pide la escala anual completa) y renta-empresas (#34).

Releído en fuente primaria al cerrar: Código Tributario arts. 151, 159, 162 y 163; LISR art. 4 num. 5
(«inferior a» $25,000: el saldo igual al límite ya retiene); Ley de Integración Monetaria art. 1; Ley
de Transferencia de Bienes Raíces arts. 2, 4 y 7 (la declaración se presenta aunque esté exento) y el
formulario de Hacienda («3 % sobre el exceso de $28,571.43»).
