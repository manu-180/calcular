# Planilla Mi Sueldo 2026 — research de producto

Consultado el 6 de octubre de 2026. Regla: dato legal o fiscal sólo con fuente oficial. Todo lo
normativo de abajo ya está verificado en el repo (archivo y fecha de verificación al lado); lo que
salió de fuentes secundarias está marcado y no se usa como afirmación en el producto.

## 1. Quién compra y en qué situación

Un empleado en relación de dependencia, de cualquier convenio, que acaba de usar `/sueldo-neto`.
Llegó con una de estas tres preguntas:

1. **«¿Me están descontando bien?»** — mira el recibo y no sabe si el 11 + 3 + 3 está bien
   aplicado, si la cuota sindical es la que corresponde o por qué el neto no da.
2. **«¿Mi sueldo le gana a la inflación?»** — hace meses que no le aumentan (o le aumentaron
   poco) y siente que no le alcanza. Quiere el número, no la sensación.
3. **«¿Cuánto pido?»** — tiene que negociar (revisión anual, cambio de puesto, oferta de otro lado)
   y necesita un argumento que no se pueda discutir.

Qué hace con el entregable al día siguiente: carga los recibos que tiene (los descarga del portal
de su empleador o los fotografía), ve en una columna si cada uno cuadra y, si no, qué línea mirar;
y se lleva impresa (o en PDF) una hoja con «desde mi último aumento la inflación fue X %, para
recuperar el poder de compra necesito Y %» con la fuente del INDEC. Esa hoja es lo que justifica
pagar: es la conversación con el jefe o con RR. HH. armada con un dato oficial.

## 2. Qué hay hoy (gratis y pago) y el hueco

| Quién | Qué | Precio | Hueco |
|---|---|---|---|
| Calculadoras online de salario real ([hacecuentas.com](https://hacecuentas.com/calculadora-salario-real-inflacion), [jonatanalmeira.com](https://www.jonatanalmeira.com/calculadora-de-inflacion-argentina/), calcular.ar/inflacion) | Un cálculo suelto: sueldo viejo vs. sueldo nuevo | Gratis | No guardan la historia, no controlan el recibo, no arman nada para llevar |
| Modelos de recibo en Excel ([ignacioonline](https://www.ignacioonline.com.ar/modelo-de-recibo-de-sueldo-en-excel-editable/)) | Recibo editable para el empleador (Decreto 407/2026) | Gratis / pago | Son para liquidar, no para que el empleado controle el suyo |
| Contadores / estudios | Revisión de recibos puntual | Honorarios | Caro para una duda mensual |

Ninguno junta las tres cosas en un archivo que la persona guarda: **control del recibo mes a mes +
sueldo real contra el IPC oficial + resumen imprimible para pedir aumento**. Posicionamiento:
$6.900 pago único, menos que una hora de consulta, y el IPC se actualiza solo cada mes.

## 3. Normas que usa (todas ya verificadas en el repo)

| Dato | Fuente oficial | Dónde vive en el repo | Verificado |
|---|---|---|---|
| Jubilación 11 % | [Ley 24.241, art. 11 (InfoLEG)](https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm) | `src/data/sueldo.ts` | 1/9/2026 |
| Ley 19.032 (PAMI) 3 % | [Ley 19.032](https://www.argentina.gob.ar/normativa/nacional/ley-19032-21581) | `src/data/sueldo.ts` | 1/9/2026 |
| Obra social 3 % | [Ley 23.660 (InfoLEG)](https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm) | `src/data/sueldo.ts` | 1/9/2026 |
| Tope de la base imponible (cambia cada mes) | [Res. ANSES 257/2026 (B.O.)](https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901) | `src/data/prestaciones.ts` → `TOPE_SIPA` | 1/9/2026 |
| IPC nivel general | [API de series de tiempo, INDEC](https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json&limit=1000) | `src/data/ipc-serie.ts` (lo regenera el workflow datos-vivos) | 28/9/2026 |
| Aguinaldo = 50 % de la mejor remuneración del semestre; vence 30/6 y 18/12 | [Ley 23.041](https://www.argentina.gob.ar/normativa/nacional/ley-23041-1983-28165), [LCT arts. 121-123](https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm) | `src/data/aguinaldo.ts` | 11/6/2026 |
| Ganancias 4ª categoría: MNI, deducción especial, cargas de familia (2º sem. 2026) | [ARCA, deducciones art. 30](https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/documentos/Deducciones-personales-art-30-jul-dic-2026.pdf) | `src/data/ganancias.ts` | 29/7/2026 |
| Recibo con 4 secciones y costo laboral (Ley 27.802 + Decreto 407/2026) | [Decreto 407/2026 (B.O. 1/6/2026)](https://www.boletinoficial.gob.ar/detalleAviso/primera/342620/20260601) | `src/data/recibo-sueldo.ts` | 15/6/2026 |
| Cuota solidaria con tope de 2 % desde la Ley 27.802; la cuota de afiliación queda afuera del tope | LCT art. 133 / Ley 14.250 art. 9 (texto Ley 27.802) | `src/data/descuentos-sueldo.ts` | 20/8/2026 |
| Prescripción de créditos laborales: 2 años | LCT art. 256 | `src/data/conservacion-recibos.ts` | 26/8/2026 |

La Ley 27.802 no cambió el 17 % de aportes ni el cálculo de Ganancias del sueldo (verificado en el
repo: `src/data/ganancias.ts`, comentario de cabecera).

## 4. Qué entra en el producto (y qué no)

- **Control del recibo** con el mismo motor de `/sueldo-neto` (`brutoANeto`): 17 % sobre lo
  remunerativo con el tope vigente y cuota sindical opcional. Lo no remunerativo depende del
  convenio (en Comercio, por ejemplo, aporta obra social): la planilla pregunta, no asume.
- **Sueldo real contra el IPC** con la misma cuenta que `sueldoVsInflacion` (lib/inflacion):
  índice del último mes publicado / índice del mes del último aumento.
- **Aguinaldo proyectado** con la cuenta de `calcularAguinaldo` (semestre completo).
- **Ganancias: sólo un aviso de cercanía al piso**, con la misma estimación anual del sitio
  (`estimarGananciasAnual`). No se calcula la retención mes a mes: depende de deducciones que la
  planilla no conoce (prepaga, alquiler, servicio doméstico) y del método acumulado del empleador.

## 5. Límites YMYL (cómo se dice)

- Es una **referencia de cálculo con datos oficiales**, no una liquidación ni asesoramiento legal.
- Una diferencia en el control es «para revisar con tu empleador o RR. HH.», no «te están robando».
  Hay razones legítimas (el tope del mes del recibo no es el de hoy, conceptos de convenio).
- El resumen para pedir aumento no promete que el aumento corresponda: muestra cuánto perdió el
  sueldo frente al IPC. Lo que se negocia es de la persona.
- Nada de datos personales en la metadata del pago: nombre y puesto se escriben en el archivo,
  nunca viajan. Lo que viaja: bruto, % sindical, mes del cálculo, mes del último aumento y cargas
  de familia para el aviso de Ganancias.
