# «Tu sueldo en el mundo»: cómo se arma la grilla

2026-10-23. Frente de datos (rama `claude/plaga-datos`). Contrato: `src/motor/mundo/{tipos,calculo,rutas}.ts`.

## Qué es

Para cada país con calculadora de sueldo neto publicada, el motor corre SU calculadora oficial en los
56 brutos anuales de `BRUTOS_GRILLA` (dólares internacionales, de 2.000 a 400.000) y guarda el neto.
Un bruto en dólares internacionales pasa a moneda local con la PPA del consumo privado del Banco
Mundial (`PA.NUS.PRVT.PP`): monto local = bruto × PPA.

## Piezas

| Archivo | Qué hace |
|---|---|
| `src/motor/mundo/grilla.ts` | candidatos del registro, corredor de cada calculadora, validación, armado y vencimiento |
| `src/motor/mundo/adaptadores.ts` | cómo leer las 45 calculadoras de sueldo neto de hoy (campos, pagas, impuesto aparte) |
| `src/motor/mundo/inferir.ts` | lectura automática para un país nuevo |
| `src/motor/mundo/traspaso.ts` | lo que la persona cargó en su calculadora, como bruto anual / 12 en sessionStorage |
| `src/motor/mundo/supuestos.ts` | `SUPUESTOS_MUNDO`, los supuestos que muestra la página |
| `src/motor/mundo/ppa.json` | PPA por ISO2 con su año (generado) |
| `src/lib/mundo/grilla.ts` | `grillaMundo()` e `informeMundo()` para las páginas (server-only) |
| `src/lib/mundo/ar.ts` | Argentina con la cuenta de calcular.ar/sueldo-neto |
| `scripts/check_mundo.ts`, `scripts/mundo/casos.ts` | tabla de incluidos y excluidos, casos |

## Decisiones y porqués

**`grillaMundo()` vive en `src/lib/mundo`, no en el motor.** El contrato la ponía en
`src/motor/mundo/grilla.ts`, pero check_fronteras prohíbe que el motor importe `src/paises` (el
registro), `src/lib` (Argentina) y paquetes como `server-only`; el stub ya rompía ese check. El motor
quedó puro (recibe registro, candidatos y PPA) y `src/lib/mundo/grilla.ts` lo conecta.

**Tres caminos, una vara.** `definicion.mundo` (lo declara el país en su carpeta), la tabla del motor
(las calculadoras que había al construir esto) y la inferencia. La validación es la misma para los
tres y para calcular.ar: neto positivo, no mayor al bruto, al menos 25 % del bruto, que no baje al
subir el bruto. Solo con la inferencia entran 36 de los 40 países del registro: un país nuevo típico
entra sin que nadie toque el motor.

**La inferencia no ve si el neto resta el impuesto a la renta.** Francia y Singapur no lo retienen en
el recibo, Paraguay tampoco (IRP anual) y Suiza lo cobra en el cantón. Para FR, SG y PY el adaptador
resta el impuesto con la calculadora oficial del impuesto del mismo país (`impuesto` en el adaptador).
Suiza queda afuera: el motor tiene solo la federal y la mayor parte es cantonal y comunal. Un país
nuevo que entre «inferido» hay que mirarlo con esto en mente; si su neto no resta el impuesto, declara
`mundo: { excluir }`.

**Pagas de ley.** El bruto anual es todo lo que se cobra en el año. Si la ley paga aguinaldo, 13.º o
14.º y la calculadora pide el sueldo mensual, el bruto se reparte en `pagasAnuales` y cada paga extra
se descuenta como un sueldo. Donde la ley exime al aguinaldo (CR, DO, GT, NI, BO, PY) la carga real
es algo menor: no se aplicaron exenciones que la calculadora del país no modela. Donde la calculadora
ya trae el anual con las pagas (ES, IT, AT, PT) se usa ese. PE y EC tienen su cuenta en el adaptador
(gratificaciones con bonificación extraordinaria; décimo cuarto fijo de un salario básico) y la grilla
busca con secante el sueldo que da cada bruto anual.

**Valores por defecto, salvo que contradigan los supuestos.** Se apagan subsidios que no son sueldo
(auxilio de transporte de CO), aportes voluntarios (401(k), pensión de GB y CA, KiwiSaver) y
deducciones personales (alquiler en IE y NG). India usa el bruto, no el CTC (que incluye PF y
gratuity del empleador). Chile usa la AFP de menor comisión (la que recibe por licitación a los
afiliados nuevos), leída de los datos. Malasia queda afuera: la tasa del EPF no está verificada y el
campo trae un monto fijo. Estados Unidos va sin impuesto estatal.

**Tramo bajo.** En 2.000 dólares internacionales al año Alemania no calcula (es un Minijob) y Austria
tiene el escalón del empleo marginal. Por debajo de 20.000 la grilla extiende en proporción el primer
punto desde el que todo valida, la misma regla con que `netoAnualPpa` extiende fuera de la grilla.
Son sueldos por debajo de un empleo de tiempo completo en esos países. `check_mundo` dice cuántos
puntos se extendieron y por qué.

**Créditos reembolsables.** El trattamento integrativo de Italia o el CIS de Luxemburgo dejan un neto
mayor al bruto en sueldos bajos. Hasta un 15 % por encima se toma carga cero (neto = bruto); más es
un adaptador roto y el país queda afuera.

**Escalones de la ley.** Una caída del neto de hasta 0,1 % se acepta (el umbral del IRP de Paraguay).
Entre dos puntos de la grilla que encierran un escalón, la interpolación lineal se aparta del valor
exacto: 2,6 % en México cerca de 13.000 (subsidio para el empleo), 4,9 % en Paraguay cerca de 28.000
y 2,6 % en Hong Kong cerca de 14.000 (medido el 2026-10-23). En el resto de la grilla el error es
menor a 0,5 %. Achicarlo es densificar la grilla, que es cambiar el contrato.

**PPA vieja.** Se exige 2019 o posterior y no más de 3 años detrás de la más nueva de la tabla: el
Banco Mundial extrapola cada año a todo país con inflación medida, y uno que quedó atrás es uno donde
dejó de hacerlo. Venezuela no tiene dato. Argentina tiene el de 2021 (42,99 ARS por dólar
internacional), que con la inflación posterior deja sueldos de ejemplo por debajo del mínimo; se lo
lleva al último mes con IPC del INDEC y CPI-U del BLS con la inflación relativa, como extrapola el
Banco Mundial (en octubre de 2026, unos 870 ARS). Para el resto la PPA es de 2025; en los países de
inflación alta (NG, GH, PK) eso subestima algo los precios de hoy.

**Vencimiento.** `informeMundo()` vale hasta la próxima medianoche de alguna zona de la grilla y al
rehacerse solo corre los países cuyo día cambió (caché por mercado, calculadora, día y PPA). Con una
clave de día en UTC+14, Nueva Zelanda veía la tabla de ayer casi todo el día. Armar la grilla entera
tarda unos 2 s en una PC (41 países × 56 brutos); por pedido es una comparación de números.

**Traspaso.** `guardarTraspaso` guarda bruto anual / 12, no el sueldo mensual: `compararDesde` lo
multiplica por 12. Lee el monto como lo tipeó la persona sin saber el locale (separador seguido de 3
dígitos = miles) y respeta el selector de período (quincena de México, semana de Australia). Recibe la
definición como cuarto parámetro opcional, para los países que declaran `mundo` o se infieren.
