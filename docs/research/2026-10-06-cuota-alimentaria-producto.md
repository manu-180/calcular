# Informe de cuota alimentaria — investigación de producto

Fecha de consulta de todas las fuentes: **2026-10-06** (salvo la canasta, que ya estaba en el repo con su propia fecha).

## 1. Qué dice la ley (texto oficial, no resúmenes)

Fuente primaria: Código Civil y Comercial, Ley 26.994, texto en InfoLEG
<https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/norma.htm> (leído completo el 2026-10-06).

| Art. | Qué dice (paráfrasis fiel; entre comillas lo textual) | Cómo lo usa el informe |
|---|---|---|
| 658 | Ambos progenitores deben criar, alimentar y educar a sus hijos «conforme a su condición y fortuna, aunque el cuidado personal esté a cargo de uno de ellos». Hasta los 21 años. | Los dos deben el costo de crianza. |
| 659 | Contenido: manutención, educación, esparcimiento, vestimenta, habitación, asistencia, salud, profesión u oficio. Los alimentos «son proporcionales a las posibilidades económicas de los obligados y necesidades del alimentado». | **Base del prorrateo por ingresos.** |
| 660 | «Las tareas cotidianas que realiza el progenitor que ha asumido el cuidado personal del hijo tienen un valor económico y constituyen un aporte a su manutención.» | Por qué el componente «cuidado» de la canasta cuenta como aporte de quien convive. |
| 661 | Quién puede reclamar: el otro progenitor, el hijo con madurez suficiente con abogado, subsidiariamente parientes o Ministerio Público. | Glosario. |
| 663 | Hasta los 25 si estudia o se capacita y eso le impide sostenerse. | Nota de edad. |
| 666 | Cuidado personal compartido: con recursos equivalentes, cada uno se hace cargo cuando el hijo está con él; si no son equivalentes, el de mayores ingresos pasa una cuota para que el hijo tenga el mismo nivel de vida en ambos hogares. | Sólo para el caso de cuidado compartido. |
| 669 | Los alimentos se deben desde la demanda o desde la interpelación fehaciente (si se demanda dentro de los 6 meses). | Glosario: por qué conviene no dejar pasar el tiempo (sin consejo legal). |
| 670 | Ante incumplimiento se aplican las medidas de alimentos entre parientes. | Glosario. |

**Hallazgo a corregir en el sitio:** el motor (`src/lib/cuota-alimentaria.ts`) y la página citan el **art. 666** como la regla general de reparto por capacidad, y el **art. 721** como «el monto lo acuerdan o lo fija el juez». En el texto oficial, la proporcionalidad general está en el **art. 659** (y 658: «condición y fortuna»); el 666 es la regla del **cuidado compartido**, y el 721 son **medidas provisionales en divorcio/nulidad**. La cita del 721 viene de la página del Ministerio de Justicia («Derecho fácil»), que lo menciona, pero el texto del artículo no dice eso. En los archivos de este frente se corrige; `src/lib/cuota-alimentaria.ts` (comentarios) queda para el coordinador.

Fuente secundaria oficial: Ministerio de Justicia, «Los alimentos de los hijos»
<https://www.argentina.gob.ar/justicia/derechofacil/aplicalaley/los-alimentos-de-los-hijos>. Menciona alimentos provisorios durante el juicio y que, sin acuerdo, decide el juez.

## 2. Mediación prejudicial

- **Ley 26.589** (mediación prejudicial obligatoria, ámbito de la justicia nacional = CABA), InfoLEG
  <https://servicios.infoleg.gob.ar/infolegInternet/anexos/165000-169999/166999/norma.htm>.
  Art. 31: la mediación familiar comprende «Alimentos entre cónyuges o derivados del parentesco, salvo los provisorios». Art. 5 b) excluye filiación, responsabilidad parental, adopción, etc., salvo sus cuestiones patrimoniales.
- Las provincias tienen sus propios regímenes de etapa previa (mediación o conciliación familiar). **No** afirmamos el régimen de cada provincia: el informe dice «en muchas jurisdicciones hay una instancia previa obligatoria; en CABA, la Ley 26.589 la exige para alimentos (salvo los provisorios)».
- Hay proyectos de ley (HCDN 0707-D-2023, 0852-D-2025, entre otros) para sacar los alimentos de la mediación obligatoria en casos de violencia. No son ley: no se mencionan como vigentes.

## 3. La canasta de crianza como referencia judicial

- **INDEC**, «Canasta de crianza de la primera infancia, la niñez y la adolescencia», serie mensual por tramo
  <https://www.indec.gob.ar/ftp/cuadros/sociedad/serie_canasta_crianza.xlsx> (en el repo: consultada 2026-09-28, último período agosto 2026). Dos componentes: bienes y servicios + cuidado valorizado. Cuatro tramos hasta los 12 años inclusive.
- **Ministerio de Economía — DNEIyG, «¿Para qué sirve el Índice Crianza?» (noviembre 2023)**
  <https://argentina.gob.ar/sites/default/files/2023/11/informe_fallos_nov_2023.pdf>. Analiza 22 resoluciones de 11 jurisdicciones: en 21 se fijó la cuota usando la canasta como referencia; «En promedio, los jueces dictaron el 70,8% de la Canasta de Crianza como valor de la cuota alimentaria»; en 18 casos, 50% o más; 16 de los 22 fueron alimentos provisorios; en 12 se usó para actualizar una cuota previa.
  → Esto respalda decir que la canasta **es usada por juzgados como referencia**, sin prometer que un juez vaya a usarla en un caso concreto. El 70,8% es un promedio de 22 fallos de 2023: se menciona como dato del informe oficial, nunca como «lo que te van a dar».
- Prensa (no fuente de datos, sólo señal de mercado): iProfesional y Diario Judicial cubren cada mes el dato y fallos que fijan la cuota por la canasta en vez del SMVM (p. ej. iProfesional 31/7/2026, «nuevo fallo fija cuota alimentaria por índice de crianza INDEC y no SMVM»).

## 4. Qué le sirve a alguien en una mediación

Síntesis de guías y foros (señal cualitativa, no fuente legal: hacecuentas.com/blog «qué gastos conviene documentar», portaldeabogados.com):

1. **Un número fundado**, no «lo que me parece». Llegar con una propuesta concreta y su respaldo.
2. **La fuente oficial a la vista** (INDEC, mes del dato): el otro lado no puede descartarla como opinión.
3. **Cómo se reparte** entre los dos, con los ingresos de cada uno — la discusión real en la mesa.
4. **Cómo se actualiza** (atar a la canasta o al IPC): la cláusula de actualización evita volver a litigar.
5. **Separar gastos habituales de extraordinarios** (colegio privado, salud, actividades) y llevar comprobantes.
6. Algo que **se pueda imprimir y dejar sobre la mesa**: la mediación es presencial o por videollamada con documentos.

## 5. Qué hay hoy en el mercado

- **Gratis**: notas de prensa mensuales con la tabla de la canasta (iProfesional, Río Negro, Diario Judicial); calculadoras gratis (hacecuentas.com tiene varias: «estimación», «porcentaje del sueldo»); la propia calculadora de calcular.ar. Ninguna entrega un documento imprimible con fuente, reparto y actualización.
- **Pago**: no encontramos un informe imprimible de bajo precio. La alternativa paga es la consulta con abogado de familia (honorarios mínimos de colegios profesionales, muy por encima de $4.900) o el patrocinio gratuito (defensorías).
- **Hueco**: un documento de 2-3 páginas, sereno, con la cuenta hecha con datos oficiales, que se lleva a la mediación o a la primera consulta con el abogado. Precio de impulso ($4.900) frente a lo que está en juego (una cuota mensual por años).

## 6. Límites que el producto respeta (YMYL)

- Es una **referencia de cálculo**, no asesoramiento legal ni una cuota fijada. Lo dice en el informe y en la landing sin dramatizar.
- No extrapola mayores de 12 años (el INDEC no publica ese tramo).
- No proyecta meses futuros: muestra cómo se movió el mismo caso con los meses ya publicados y explica la regla de actualización.
- No promete resultados judiciales ni usa el 70,8% como pronóstico.
