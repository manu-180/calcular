# Planilla de plazos fijos 2026 — research de producto (6/10/2026)

## Quién compra y en qué situación está
Un ahorrista en pesos (empleado, jubilado, monotributista) que acaba de usar /plazo-fijo porque tiene,
o está por armar, uno o varios plazos fijos, muchas veces en bancos distintos para buscar la mejor
TNA del mes o repartir el riesgo. Sus dolores concretos:
- **No sabe cuándo le vence cada uno** ni cuánta plata se le acredita cada semana (los tiene
  repartidos entre el home banking de dos o tres bancos y una billetera).
- **No sabe si de verdad le ganó a la inflación.** El banco le muestra el interés en pesos; nadie le
  muestra el resultado real contra el IPC que después publica el INDEC.
- **Renueva por inercia**: no tiene a mano cuánto termina teniendo si renueva capital + intereses
  todo el año, ni a partir de qué inflación el UVA termina con más que el tradicional.
- **Quiere liquidez sin cortar el plazo fijo** (la «escalera»: varios plazos que vencen escalonados).

Qué hace con el entregable al día siguiente: carga sus plazos fijos (banco, fecha, capital, TNA,
días), mira el calendario de vencimientos y, cuando vence uno, ve si le ganó al IPC oficial antes de
decidir por su cuenta qué hacer con esa plata. A fin de año, el resumen: cuánto cobró de intereses y
cuál fue la ganancia real.

## Qué hay hoy (gratis/pago) y el hueco
- Simuladores de cada banco y comparadores de tasas (BCRA publica la tasa promedio): simulan UN plazo
  fijo, no llevan registro, no miden contra el IPC real, no comparan con UVA con la regla del BCRA.
- Búsqueda «planilla excel plazo fijo control inflación Argentina» (6/10/2026): no aparece un
  producto específico; sólo notas periodísticas y planillas de ajuste por inflación impositivo.
- La calculadora gratis de calcular.ar resuelve UN caso con una inflación estimada.

**Hueco:** un registro multi-banco que, con el IPC oficial del INDEC ya cargado, diga plazo por plazo
si le ganó o no a la inflación, con calendario, renovación, UVA y escalera, y que se actualice solo.

## Normas y datos (con fecha de consulta)
- Interés simple, año de 365 días: convención del motor `src/lib/plazofijo.ts` (misma calculadora).
- Plazo fijo UVA: Com. «A» 8246/2025 BCRA, vigente desde 2/6/2025 — inversiones UVA de personas
  humanas con opción de cancelación anticipada, **plazo mínimo 90 días** (TO Depósitos e Inversiones
  a Plazo, punto 2.3.1.2); la precancelación se ejerce después de un lapso no menor a 30 días
  (punto 2.3.2). https://www.bcra.gob.ar/Pdfs/comytexord/A8246.pdf — leído el 6/10/2026.
- Garantía de los depósitos: Com. «A» 8407 BCRA (5/3/2026), **$50.000.000 desde el 1/4/2026**;
  cubre capital, intereses y ajuste CER/UVA (punto 5.3.1); el total por persona por acumulación de
  cuentas y depósitos no supera ese tope (5.3.3); en cuentas con varios titulares se reparte
  (5.3.2); quedan excluidos, entre otros, los depósitos a tasas superiores a las de referencia del
  BCRA (5.2.2). https://www.bcra.gob.ar/archivos/Pdfs/comytexord/A8407.pdf — leído el 6/10/2026.
- TNA de referencia: BCRA, serie 12 (depósitos a 30 días, promedio de entidades). La rota el
  workflow datos-vivos (`scripts/datos-vivos/rotar_plazofijo.ts`) y la planilla la toma de
  `TNA_FALLBACK` con su fecha.
- IPC: INDEC, serie 148.3_INIVELNAL_DICI_M_26 (`src/data/ipc-serie.ts`, regenerada por datos-vivos).
- Ganancias: intereses de plazo fijo exentos para personas humanas (art. 26 inc. h, t.o. 2019, según
  Ley 27.802); Bienes Personales: depósitos a plazo fijo exentos (art. 21 inc. h, Ley 23.966).
  Verificado en el repo el 30/7/2026 (`src/data/plazofijo.ts`); se menciona como dato, sin consejo.

## Convención para «le ganó a la inflación»
- Si el INDEC ya publicó todos los meses que abarca el plazo fijo: IPC oficial con interpolación
  geométrica diaria (el índice de un mes se toma como el nivel del último día del mes; un día k de un
  mes de N días vale IPC(mes anterior) × (IPC(mes)/IPC(mes anterior))^(k/N)). Es la convención
  estándar de los índices diarios y no depende de en qué día del mes se armó el plazo fijo.
- Si falta algún mes: la inflación mensual estimada, compuesta por días/30, **exactamente** como
  `calcularPlazoFijo()` de la calculadora. La planilla dice cuál de las dos usó en cada fila.

## Límites YMYL
- No es asesoramiento de inversión: herramienta de cálculo y control. Nada de «te conviene», nada de
  nombrar ni recomendar bancos o productos (los ejemplos dicen «Banco A (ejemplo)»).
- UVA vs tradicional: se informa la inflación que los empata, sin decir cuál elegir.
- La TNA real la fija cada banco el día que se constituye; la planilla usa la que carga la persona.
- Garantía: se muestra el tope y cuándo se supera por banco; no se opina sobre la solvencia de nadie.
