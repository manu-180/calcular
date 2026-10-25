import type { Metadata } from "next";
import Link from "next/link";
import { CATALOGO } from "@/lib/mp";
import { BuscadorHero } from "@/components/buscador/BuscadorHero";
import { DestacadoHoras } from "@/components/inicio/DestacadoHoras";
import { FirmaAutor } from "@/components/FirmaAutor";
import { GRUPOS_DE_CALCULADORAS, MAS_USADAS, grupo, paginaDeRuta, paginasDelGrupo } from "@/data/navegacion";
import { bonoVigente, prestacionesVigentes } from "@/data/prestaciones";
import { etiquetaMes, smvmVigente } from "@/lib/desempleo";
import { NovedadesRecientes } from "@/components/novedades/NovedadesRecientes";
import { formatARS, formatPct } from "@/lib/formato";
import { nombrePeriodo, ULTIMO_PERIODO, variacionMensual } from "@/lib/inflacion";
import { etiquetaPeriodo } from "@/lib/jubilacion";
import { ultimoCambio } from "@/lib/novedades";

export const metadata: Metadata = {
  title: "CalculAR: calculadoras de sueldo, impuestos y ANSES",
  description:
    "Calculadoras gratis para la Argentina con datos oficiales: sueldo neto, aguinaldo, indemnización, monotributo, Ganancias y jubilación. Al día cada mes.",
};

// Texto que rankea: cada descripción es contenido indexado de la home. Se puede reordenar
// y presentar distinto, pero no recortar.
const herramientas: { href: string; titulo: string; descripcion: string }[] = [
  {
    href: "/monotributo",
    titulo: "Calculadora de monotributo",
    descripcion:
      "Sabé en qué categoría estás y cuánto pagás por mes según lo que facturás. Con la tabla vigente de ARCA.",
  },
  {
    href: "/monotributo/categorias",
    titulo: "Categorías del monotributo 2026",
    descripcion:
      "La tabla completa y al día: topes de facturación, cuotas, superficie, energía y alquileres de cada categoría.",
  },
  {
    href: "/monotributo/recategorizacion",
    titulo: "Recategorización 2026",
    descripcion:
      "Cuándo es, cómo se hace y cómo saber si te toca cambiar de categoría. Próxima ventana: hasta el 5 de agosto.",
  },
  {
    href: "/sueldo-neto",
    titulo: "Calculadora de sueldo neto",
    descripcion:
      "Pasá de bruto a en mano y al revés. Con los aportes de ley (17%), el tope de aportes, la cuota sindical y una estimación de Ganancias. También te dice qué bruto pedir para cobrar el neto que querés.",
  },
  {
    href: "/ganancias",
    titulo: "Calculadora de Ganancias 4ª categoría",
    descripcion:
      "Cuánto te descuenta tu empleador de Ganancias cada mes. Usa el método acumulado oficial (RG ARCA 5008) y suma el aguinaldo en junio y diciembre.",
  },
  {
    href: "/ganancias-sociedades",
    titulo: "Ganancias de sociedades",
    descripcion:
      "La escala del 25, 30 y 35% para SA, SAS y SRL, ajustada por IPC cada año. Te da el impuesto del ejercicio, la alícuota efectiva y el 7% de los dividendos.",
  },
  {
    href: "/ganancias-jubilados",
    titulo: "Ganancias para jubilados",
    descripcion:
      "Desde qué haber paga Ganancias un jubilado o pensionado. Con la deducción de ocho haberes mínimos sumada mes a mes, las cargas de familia que se restan aparte y en qué casos se pierde.",
  },
  {
    href: "/ganancias-autonomos",
    titulo: "Ganancias para autónomos",
    descripcion:
      "Para profesionales, oficios y emprendedores. La deducción especial del año, la más alta para nuevos profesionales (hasta tres años de matrícula) y por qué dejar de aportar te sube el impuesto.",
  },
  {
    href: "/deducciones-generales-ganancias",
    titulo: "Deducciones generales de Ganancias",
    descripcion:
      "Prepaga, honorarios médicos, seguro de vida y de retiro, donaciones e intereses hipotecarios. Cuánto entra de cada uno, el tope del seguro ajustado por IPC y cuánta plata te vuelve de verdad.",
  },
  {
    href: "/deduccion-empleada-domestica",
    titulo: "Deducción de empleada doméstica en Ganancias",
    descripcion:
      "Cuánta plata te vuelve de verdad por tener empleada registrada. El tope es la ganancia no imponible, pero una deducción te devuelve tu alícuota, no el monto. Y qué parte de lo que pagás a ARCA entra en la cuenta y cuál no.",
  },
  {
    href: "/deduccion-alquiler",
    titulo: "Deducción de alquiler en Ganancias",
    descripcion:
      "Cuánto te vuelve por deducir el alquiler: el 40%, con tope en la ganancia no imponible (un tope que solo pesa con alquileres altísimos). Y el cambio de 2026 que dejó afuera el 10% del inciso k).",
  },
  {
    href: "/aguinaldo",
    titulo: "Calculadora de aguinaldo",
    descripcion:
      "Cuánto cobrás de aguinaldo (SAC) en junio y diciembre, en bruto y en mano. Con el proporcional si no trabajaste el semestre completo.",
  },
  {
    href: "/vacaciones",
    titulo: "Calculadora de vacaciones",
    descripcion:
      "Cuántos días te tocan por antigüedad y cuánto cobrás con el plus vacacional. Con la reforma 2026.",
  },
  {
    href: "/indemnizacion",
    titulo: "Calculadora de indemnización",
    descripcion:
      "Cuánto te corresponde por despido sin causa: antigüedad, preaviso, aguinaldo y vacaciones. Con el nuevo art. 245.",
  },
  {
    href: "/actualizacion-creditos-laborales",
    titulo: "Actualización de créditos laborales",
    descripcion:
      "Cuánto vale hoy lo que te deben. Desde marzo de 2026 lo fija la ley y no los jueces: IPC del INDEC más 3% anual, desde que te lo debían hasta que te pagan (art. 276 LCT). Tiene en cuenta el atraso con que se publica el índice, que nadie descuenta, y los topes del art. 277.",
  },
  {
    href: "/indemnizacion-art",
    titulo: "Indemnización por accidente de trabajo (ART)",
    descripcion:
      "La Ley 24.557 todavía dice que la indemnización «en ningún caso será superior» a $180.000. El Decreto 1694/2009 sacó ese tope y convirtió el mismo número en piso. Hoy vale $114.354.110 por el porcentaje de incapacidad, y se actualiza por RIPTE cada seis meses.",
  },
  {
    href: "/art-empleada-domestica",
    titulo: "ART de la empleada doméstica",
    descripcion:
      "La cobertura es obligatoria y la paga el empleador. Pero la prestación no se calcula sobre el sueldo que cobra ella: el reglamento manda usar el mínimo de la categoría. Por eso casi siempre se cobra el piso de la SRT y no lo que da la fórmula.",
  },
  {
    href: "/comision-medica",
    titulo: "Comisión médica: los plazos del reclamo a la ART",
    descripcion:
      "Antes de demandar a la ART tenés que pasar por la comisión médica, que tiene 60 días hábiles administrativos para resolver. Ese plazo no se estira: si vence, podés ir a la justicia sin esperar el dictamen. Y el trámite lo paga la ART, no vos.",
  },
  {
    href: "/empleador-sin-art",
    titulo: "Mi empleador no tiene la ART al día: ¿quién me paga?",
    descripcion:
      "Que la empresa deba cuotas no te deja sin cobertura: la ART te tiene que atender igual y después le cobra a ella. Si trabajás sin registrar y la empresa tiene ART, también. Solo la extinción del contrato corta la cobertura, y aun así quedan tres meses de atención médica.",
  },
  {
    href: "/rechazo-art",
    titulo: "La ART rechazó el accidente: ¿llegó en plazo?",
    descripcion:
      "Los 10 días se cuentan en hábiles administrativos, no corridos. La prórroga solo vale si se avisó dentro de ese primer plazo. Y el motivo del rechazo decide si el reclamo va a la comisión médica o a otra autoridad.",
  },
  {
    href: "/pluriempleo-art",
    titulo: "Dos trabajos y un accidente: ¿qué ART paga?",
    descripcion:
      "La ART que paga puede no ser la del lugar del accidente, y la prestación puede sumar los ingresos de varios trabajos. Si es un segundo accidente, calculá la incapacidad nueva sobre la capacidad que te quedaba.",
  },
  {
    href: "/aportes-jubilatorios-obligatorios",
    titulo: "¿Tenés que aportar al sistema previsional?",
    descripcion:
      "Obligatorio, voluntario o exceptuado, con el inciso exacto. El umbral del socio no es un porcentaje fijo: es cien dividido la cantidad de socios. Y no estar en relación de dependencia no te deja exento: el que dirige aporta como autónomo aunque no cobre nada.",
  },
  {
    href: "/derechohabientes-art",
    titulo: "Quién cobra la indemnización por muerte laboral",
    descripcion:
      "La misma muerte genera dos indemnizaciones con dos listas distintas de beneficiarios: la de la ART y la del empleador. Un conviviente de tres años cobra una y no la otra. Persona por persona, con la norma que lo decide.",
  },
  {
    href: "/indemnizacion-por-fallecimiento",
    titulo: "Indemnización por fallecimiento del trabajador",
    descripcion:
      "Qué le corresponde a la familia cuando muere un trabajador. El art. 248 de la LCT tiene texto nuevo desde marzo de 2026: cambió quiénes cobran, y ahora se reparte en partes iguales contando a cada titular como uno. Es la mitad de la indemnización por despido y va aparte de lo que pague la ART. El empleador tiene 30 días para pagarla.",
  },
  {
    href: "/certificado-de-trabajo",
    titulo: "Certificado de trabajo (art. 80 LCT)",
    descripcion:
      "El empleador tiene 45 días hábiles desde que terminó el contrato. Calculá la fecha límite exacta, sin fines de semana ni feriados. Y algo que casi nadie publicó: la multa de tres sueldos por no entregarlo ya no está en la ley. El artículo que la creaba se derogó y el art. 80 se reescribió entero, así que lo que podés reclamar depende de cuándo terminó tu contrato.",
  },
  {
    href: "/periodo-de-prueba",
    titulo: "Despido en período de prueba: qué te tienen que pagar",
    descripcion:
      "Durante veintidós años la respuesta fue «te tienen que preavisar 15 días». Desde el 6 de marzo de 2026 ya no: el art. 48 de la Ley 27.802 sacó el período de prueba de la escala del preaviso y dice lo contrario. Pero algo te corresponde igual: el aguinaldo y las vacaciones proporcionales, porque el período de prueba cuenta como tiempo de servicio.",
  },
  {
    href: "/despido-empleada-domestica",
    titulo: "Despido de empleada doméstica: la liquidación final",
    descripcion:
      "El régimen de casas particulares tiene sus propios artículos: el preaviso es de 10 o 30 días y la indemnización del art. 48 no tiene tope. El 6 de marzo de 2026 cambiaron dos cosas de fondo que casi nadie publicó: el período de prueba pasó de 30 días a seis meses, y la Ley de Contrato de Trabajo ya no se aplica para cubrir lo que este régimen no dice.",
  },
  {
    href: "/practicas-desleales-sindicales",
    titulo: "Prácticas desleales del sindicato: las ocho conductas nuevas y cuánto cuestan",
    descripcion:
      "Durante 38 años la Ley 23.551 solo castigó prácticas desleales de una parte: el empleador. El 6 de marzo de 2026 apareció el art. 53 bis, con ocho conductas de los sindicatos, y el art. 54 habilitó a «todo damnificado» a querellar. La multa ya no remite a una ley de 1972: sale del Anexo II de la Ley 25.212, se calcula sobre el salario mínimo y llega al 2.000% por cada trabajador afectado en las infracciones muy graves. Las conductas se explicaron en todos lados; el importe, no.",
  },
  {
    href: "/indemnizacion-por-clientela",
    titulo: "Indemnización por clientela: el 25% del viajante de comercio",
    descripcion:
      "El art. 14 de la Ley 14.546 no cambió desde 1958. Paga el 25% de lo que correspondería por un despido sin aviso y sin causa, sea cual sea el motivo por el que terminó el contrato, incluida la renuncia. La Ley 27.802 le puso fecha de vencimiento: el 1° de enero de 2027 se deroga el estatuto entero, y con él la clientela, la comisión indirecta y la garantía de zona.",
  },
  {
    href: "/indemnizacion-periodista",
    titulo: "Indemnización de un periodista: los seis sueldos que se terminan en 2027",
    descripcion:
      "El art. 43 del Estatuto del Periodista no cambió desde 1965 y paga tres indemnizaciones, no una: antigüedad con piso de dos meses, la que reemplaza al preaviso (dos o cuatro meses) y una especial de seis meses de sueldo que se cobra «haya o no mediado preaviso». Esa última no existe en la Ley de Contrato de Trabajo. El art. 197 de la Ley 27.802 deroga el estatuto entero el 1° de enero de 2027: la calculadora muestra las dos cuentas y la diferencia en pesos.",
  },
  {
    href: "/despido-de-delegado-gremial",
    titulo: "Despido de un delegado gremial: cuánto se cobra hoy",
    descripcion:
      "El artículo 52 de la Ley 23.551 (el que fija la indemnización agravada por violar la tutela sindical) estuvo igual desde 1988, y el 6 de marzo de 2026 la Ley 27.802 lo reescribió entero. Los cambios son de fondo: los suplentes quedaron afuera, los congresales tienen cupo y plazo, el candidato que no llega al 5% de los votos pierde la protección y el año extra ya no se suma al art. 245 bis de la LCT. Casi todo lo publicado comenta el texto viejo.",
  },
  {
    href: "/rifl",
    titulo: "RIFL: cuánto baja el costo de contratar",
    descripcion:
      "Para un empleador es el número más grande de la reforma, y circula como noticia en vez de como cuenta. Por cada alta nueva que califique, las contribuciones patronales de SIPA, Fondo Nacional de Empleo, Asignaciones Familiares e INSSJP bajan del 18% o 20,40% a un 5% total durante 48 meses. Hay dos plazos distintos: la ventana para dar el alta cierra el 30 de abril de 2027, pero el beneficio de cada contratación sigue cuatro años desde el alta.",
  },
  {
    href: "/repartidores-de-apps",
    titulo: "Repartidor o conductor de app: cuánto te queda por mes",
    descripcion:
      "El 6 de marzo de 2026 apareció un régimen entero que antes no existía. El Título XII de la Ley 27.802 define al repartidor y al conductor de plataformas como «prestador independiente», fuera de la Ley de Contrato de Trabajo. La parte legal se explicó en todos lados; el número, no. Acá está: qué categoría de monotributo te toca, cuánto te queda limpio y cuánto valen en pesos el aguinaldo y el plus de vacaciones que dejaste de cobrar.",
  },
  {
    href: "/descuentos-del-sueldo",
    titulo: "Cuánto te pueden descontar del sueldo",
    descripcion:
      "El tope del 20% del art. 133 es correcto y sigue igual desde 1974. Por eso el tema parece cubierto, pero hay tres números oficiales más que casi nadie muestra. Desde marzo de 2026 la cuota solidaria tiene un techo del 2% que antes no existía, la retención de Ganancias puede pasar el 20% sin ningún límite, y el embargo judicial se calcula sobre el bruto, recién arriba de un salario mínimo.",
  },
  {
    href: "/derivar-aportes-a-prepaga",
    titulo: "Aportes de obra social y derivación a prepaga",
    descripcion:
      "De los 9 puntos que se aportan sobre tu sueldo, a tu obra social le llega el 85%: el resto va al Fondo Solidario. Calculá cuánto llega y cuánto ponés de tu bolsillo si derivás a una prepaga.",
  },
  {
    href: "/obra-social-monotributo",
    titulo: "Obra social del monotributo: desde cuándo te cubre",
    descripcion:
      "La cobertura no arranca completa el primer día. Lo ambulatorio va desde el alta, la internación recién a los 3 meses, y alto costo y discapacidad a los 6. Tus tres fechas exactas.",
  },
  {
    href: "/hasta-cuando-tengo-obra-social",
    titulo: "¿Hasta cuándo tenés obra social?",
    descripcion:
      "Los tres meses después del despido existen, pero solo si trabajaste más de tres meses seguidos. Y hay otros siete casos con plazos distintos: la fecha exacta de cada uno.",
  },
  {
    href: "/horas-extras",
    titulo: "Horas extras: 50%, 100% y el banco de horas",
    descripcion:
      "El recargo del art. 201 no cambió desde 1974, por eso todas las calculadoras dan el mismo número. Lo que cambió en marzo de 2026 es quién puede pactar que esas horas se compensen con francos en vez de plata: antes solo un convenio colectivo, ahora vos y el empleador, uno a uno y por escrito. Acá tenés el importe, los francos equivalentes en las dos lecturas posibles y el tope de 30 horas mensuales que sigue vigente.",
  },
  {
    href: "/reingreso",
    titulo: "Reingreso al mismo empleador",
    descripcion:
      "Te indemnizaron, te volvieron a tomar y te vuelven a despedir. Desde marzo de 2026 el art. 18 de la LCT borra la antigüedad anterior si entre la salida y el reingreso pasaron dos años. Y el art. 255 descuenta lo que cobraste actualizado por IPC (no en pesos de aquel momento), con un piso para que ese descuento no se coma el despido nuevo.",
  },
  {
    href: "/tiempo-parcial",
    titulo: "Media jornada: cuánto te tienen que pagar",
    descripcion:
      "La Ley 27.802 reescribió el art. 92 ter en marzo de 2026. Ya no existe el tope de dos tercios de la jornada, y con él se cayó la obligación de pagar el sueldo completo si se pasaba. A cambio, las horas suplementarias pasaron de prohibidas a permitidas. Acá tenés el piso legal de tu sueldo, las horas extra con y sin recargo y el aporte de obra social, que no se reduce en proporción.",
  },
  {
    href: "/renuncia",
    titulo: "Renuncia: qué te tienen que pagar",
    descripcion:
      "Renunciar no es irse con las manos vacías. Los arts. 123 y 156 dicen «por cualquier causa», así que te pagan los días del mes, el aguinaldo proporcional y las vacaciones no gozadas. Vos también debés 15 días de preaviso. Desde marzo de 2026 el telegrama puede ser digital y ya no hace falta ir en persona: el art. 240 se reescribió y casi nadie lo cuenta.",
  },
  {
    href: "/temeridad-y-malicia",
    titulo: "Temeridad y malicia: la sanción que ya no existe",
    descripcion:
      "El art. 275 de la LCT castigaba al empleador que litigaba de mala fe con hasta 2,5 veces el interés bancario. Desde 2011, además, el juez tenía que considerar temerario y malicioso, aunque nadie lo pidiera, no cumplir un acuerdo homologado. La Ley 27.802 lo derogó en marzo de 2026 y, el mismo día, sumó al art. 20 las costas solidarias del trabajador y su abogado por reclamar de más. Acá ves cuánta plata era cada cosa.",
  },
  {
    href: "/trabajo-de-mujeres",
    titulo: "Trabajo de mujeres: qué quedó vigente",
    descripcion:
      "El Capítulo I del Título VII de la LCT quedó vacío en marzo de 2026. Se cayeron el descanso de dos horas al mediodía, la prohibición de trabajo a domicilio y la de tareas penosas, peligrosas o insalubres. Siguen en pie el art. 172 y todo el capítulo de maternidad. Acá está el texto exacto de lo que se derogó (InfoLEG ya no lo muestra) y cuántas horas de tu día cambian.",
  },
  {
    href: "/propinas",
    titulo: "Propinas: ¿son remunerativas?",
    descripcion:
      "Ya no. Desde marzo de 2026 el art. 104 de la LCT dice que las propinas nunca son remuneración, aunque sean habituales, y el art. 113 (el que las regulaba) quedó derogado. Las seguís cobrando, pero no cuentan para el aguinaldo, las vacaciones, la indemnización ni los aportes. Acá ves cuánta plata es.",
  },
  {
    href: "/salario-minimo",
    titulo: "Salario mínimo, vital y móvil",
    descripcion:
      "El monto que se publica es el de la jornada completa. Si trabajás menos horas cobrás la proporción, y el valor por hora no cambia. Con la escala completa hasta abril de 2027 (el laudo la fijó de una vez) y los siete números del derecho laboral que dependen del mínimo.",
  },
  {
    href: "/desempleo",
    titulo: "Prestación por desempleo",
    descripcion:
      "Cuánto cobrás de seguro de desempleo y por cuántos meses, cuota por cuota. El 75% sale del neto, no del bruto, y desde el quinto mes la cuota baja. Acá lo ves.",
  },
  {
    href: "/licencia-por-maternidad",
    titulo: "Licencia por maternidad",
    descripcion:
      "El día exacto en que empieza y termina tu licencia según la fecha de parto. El mínimo antes del parto es de 10 días (no 15) y durante la licencia cobrás el bruto, no el neto.",
  },
  {
    href: "/empleada-domestica",
    titulo: "Empleada doméstica: escala oficial",
    descripcion:
      "Las 5 categorías de casas particulares, con y sin retiro, por hora y por mes, del anexo oficial de la CNTCP. Con zona desfavorable, horas extras y la cuenta por las horas que se trabajan de verdad.",
  },
  {
    href: "/aportes-empleada-domestica",
    titulo: "Aportes de empleada doméstica",
    descripcion:
      "Lo que el empleador le paga a ARCA por mes, separado en obra social, jubilación y ART (un desglose que nadie publica). Con menos de 16 horas semanales el aporte no alcanza para que tenga obra social, y acá ves cuánto falta.",
  },
  {
    href: "/licencias-especiales",
    titulo: "Licencias especiales (art. 158)",
    descripcion:
      "Matrimonio, nacimiento, fallecimiento y examen: hasta qué día exacto, con los feriados oficiales. Y lo que casi nadie liquida bien: el día se paga a sueldo ÷ 25, no ÷ 30.",
  },
  {
    href: "/licencia-por-enfermedad",
    titulo: "Licencia por enfermedad",
    descripcion:
      "Hasta qué día exacto cobrás sueldo según el art. 208: 3, 6 o 12 meses según antigüedad y cargas de familia. Si ya faltaste por lo mismo hace menos de 2 años, el plazo no vuelve a cero. Acá ves cuánto te queda.",
  },
  {
    href: "/puam",
    titulo: "PUAM: pensión del adulto mayor",
    descripcion:
      "Cuánto se cobra a los 65 sin los 30 años de aportes (el 80% del haber mínimo). Y la letra chica que casi nadie cuenta: desde 2018 no se puede cobrar trabajando y no deja pensión para el cónyuge.",
  },
  {
    href: "/edad-avanzada",
    titulo: "Prestación por edad avanzada",
    descripcion:
      "A los 70 años con 10 de aportes. Todas las notas dicen «el 70% de la PBU», pero eso no es lo que se cobra: queda muy por debajo del haber mínimo, que es el piso garantizado. Además, el requisito que más solicitudes voltea (5 de esos años tienen que caer en los últimos 8) y el que ANSES pide sin que esté en la ley.",
  },
  {
    href: "/pension-no-contributiva",
    titulo: "Pensiones no contributivas",
    descripcion:
      "Cuánto paga cada una este mes (discapacidad, vejez, madres de 7 hijos y PUAM) y hasta cuánto podés trabajar sin perderla. Desde la Ley 27.793 el tope son dos salarios mínimos.",
  },
  {
    href: "/jubilacion",
    titulo: "Jubilación: aumento y bono",
    descripcion:
      "Cuánto cobrás con tu haber, no con la mínima: si cobrás más, el bono se recorta. Con la resolución de ANSES del mes y el aumento que ya está definido.",
  },
  {
    href: "/asignaciones-familiares",
    titulo: "Asignaciones familiares y AUH",
    descripcion:
      "Cuánto cobrás por hijo según lo que entra en tu casa: los cuatro tramos, las cinco zonas, el tope que deja afuera a toda la familia por un solo sueldo y el 20% que la AUH retiene.",
  },
  {
    href: "/canasta-basica",
    titulo: "Canasta básica y línea de pobreza",
    descripcion:
      "Cuánto necesita tu hogar para no ser pobre, según quiénes viven en él. Con la canasta del INDEC y la tabla oficial de adultos equivalentes.",
  },
  {
    href: "/cuota-alimentaria",
    titulo: "Cuota alimentaria",
    descripcion:
      "Una referencia con la canasta de crianza del INDEC, y el coeficiente para actualizar una cuota que se fijó hace meses.",
  },
  {
    href: "/convenios/comercio",
    titulo: "Sueldo de Empleados de Comercio",
    descripcion:
      "Tu sueldo de convenio por categoría, con antigüedad y presentismo. La escala oficial de FAECYS y los $120.000 no remunerativos, explicados.",
  },
  {
    href: "/convenios",
    titulo: "Sueldos por convenio: UOCRA y más",
    descripcion:
      "Escalas salariales verificadas contra la circular oficial de cada gremio, con calculadora por categoría, zona y jornada.",
  },
  {
    href: "/plazo-fijo",
    titulo: "Calculadora de plazo fijo",
    descripcion:
      "Cuánto gana tu plata a 30 días o más, con la tasa del BCRA ya cargada. Y si le ganás o no a la inflación.",
  },
  {
    href: "/inflacion",
    titulo: "Calculadora de inflación",
    descripcion:
      "Actualizá cualquier monto con el IPC oficial del INDEC y fijate si tu sueldo le ganó o le perdió a la inflación.",
  },
  {
    href: "/inflacion/alquiler",
    titulo: "Ajuste de alquiler por IPC",
    descripcion:
      "Todos los aumentos de tu contrato (cada 3, 4, 6 o 12 meses) y una estimación del próximo ajuste.",
  },
];

// Dentro de cada tema, el orden en que la gente busca: lo que se cobra todos los meses primero.
// Lo que no figura acá va al final de su tema, así que una calculadora nueva nunca queda invisible.
const ORDEN = [
  "/monotributo", "/monotributo/categorias", "/monotributo/recategorizacion", "/obra-social-monotributo",
  "/sueldo-neto", "/aguinaldo", "/vacaciones", "/horas-extras", "/salario-minimo", "/tiempo-parcial",
  "/descuentos-del-sueldo", "/derivar-aportes-a-prepaga", "/hasta-cuando-tengo-obra-social", "/propinas",
  "/convenios", "/convenios/comercio",
  "/ganancias", "/deduccion-empleada-domestica", "/deduccion-alquiler", "/deducciones-generales-ganancias",
  "/ganancias-jubilados", "/ganancias-autonomos", "/ganancias-sociedades",
  "/indemnizacion", "/periodo-de-prueba", "/renuncia", "/desempleo", "/certificado-de-trabajo",
  "/actualizacion-creditos-laborales", "/indemnizacion-por-fallecimiento", "/indemnizacion-art",
  "/comision-medica", "/derechohabientes-art", "/empleador-sin-art", "/rechazo-art", "/pluriempleo-art",
  "/reingreso",
  "/licencia-por-maternidad", "/licencia-por-enfermedad", "/licencias-especiales",
  "/empleada-domestica", "/aportes-empleada-domestica", "/despido-empleada-domestica", "/art-empleada-domestica",
  "/repartidores-de-apps", "/rifl",
  "/despido-de-delegado-gremial", "/practicas-desleales-sindicales", "/temeridad-y-malicia",
  "/jubilacion", "/asignaciones-familiares", "/puam", "/edad-avanzada", "/pension-no-contributiva",
  "/inflacion", "/inflacion/alquiler", "/plazo-fijo", "/canasta-basica", "/cuota-alimentaria",
];

function datosDelMes() {
  const SMVM = smvmVigente().mes;
  // "Actualizado el <día del build>" afirmaba una revisión en cada deploy, hubiera o no dato nuevo.
  const ULTIMO_CAMBIO = ultimoCambio();
  const IPC_MES = variacionMensual(ULTIMO_PERIODO);

  const CIFRAS = [
    {
      href: "/salario-minimo",
      etiqueta: "Salario mínimo",
      valor: formatARS(SMVM.mensual, 0),
      detalle: `Por mes, en ${etiquetaMes(SMVM.periodo)}`,
    },
    {
      href: "/jubilacion",
      etiqueta: "Jubilación mínima",
      valor: formatARS(prestacionesVigentes().haberMinimo, 0),
      detalle: `Más el bono de ${formatARS(bonoVigente().monto, 0)}, en ${etiquetaPeriodo(prestacionesVigentes().periodo)}`,
    },
    ...(IPC_MES === null
      ? []
      : [
          {
            href: "/inflacion",
            etiqueta: "Inflación del mes",
            valor: formatPct(IPC_MES, 1),
            detalle: `IPC del INDEC de ${nombrePeriodo(ULTIMO_PERIODO)}`,
          },
        ]),
  ];
  return { SMVM, ULTIMO_CAMBIO, IPC_MES, CIFRAS };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d)).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Flecha({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Item = { href: string; titulo: string; descripcion: string };

function etiquetaCorta(titulo: string): string {
  const t = titulo.replace(/^Calculadora de /, "");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function Fila({ h }: { h: Item }) {
  return (
    <Link href={h.href} className="ca-fila group">
      <span className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold leading-snug text-zinc-900 transition-colors duration-150 group-hover:text-emerald-700">
          {h.titulo}
        </h3>
        {h.descripcion && <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-zinc-600">{h.descripcion}</p>}
      </span>
      <Flecha className="ca-fila-flecha size-4" />
    </Link>
  );
}

export default function Home() {
  const { ULTIMO_CAMBIO, CIFRAS } = datosDelMes();
  const textos = new Map(herramientas.map((h) => [h.href, h]));
  const posicion = new Map(ORDEN.map((h, i) => [h, i]));

  const temas = GRUPOS_DE_CALCULADORAS.map((id) => {
    const g = grupo(id);
    const items: Item[] = paginasDelGrupo(id)
      .map((p, i) => ({ p, i }))
      .sort((a, b) => (posicion.get(a.p.href) ?? 1000 + a.i) - (posicion.get(b.p.href) ?? 1000 + b.i))
      .map(({ p }) => textos.get(p.href) ?? { href: p.href, titulo: p.titulo, descripcion: p.descripcion ?? "" });
    return { g, items };
  });

  const enHome = new Set(temas.flatMap((t) => t.items.map((i) => i.href)));
  const sueltas = herramientas.filter((h) => !enHome.has(h.href));
  const cantidad = temas.reduce((n, t) => n + t.items.length, 0) + sueltas.length;
  const atajos = MAS_USADAS.map((h) => paginaDeRuta(h)).filter((p) => p !== undefined);

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* El H1 no se anima: es candidato a LCP y arrancarlo en opacity 0 retrasaría la métrica.
          Sólo se dibuja el "=" debajo de la palabra, que es un pseudo-elemento. */}
      <section className="relative -mx-4 -mt-8 overflow-hidden px-4 pb-12 pt-10 sm:mx-0 sm:mt-0 sm:rounded-[2rem] sm:border sm:border-zinc-900/[0.06] sm:bg-white/35 sm:px-10 sm:pb-12 sm:pt-14">
        <div aria-hidden className="ca-cuadricula pointer-events-none absolute inset-0 -z-10" />

        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/85 px-3 py-1 text-xs font-medium text-emerald-800">
          <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
          Cada número, con su fuente oficial y su fecha
        </p>

        <h1 className="mt-5">
          <span className="block text-[15px] font-semibold text-emerald-700 sm:text-base">
            Calculadoras claras para la Argentina
          </span>
          <span className="mt-2 block text-display font-bold text-zinc-950">
            ¿Qué querés <span className="ca-igual">calcular</span>?
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty text-zinc-600 sm:text-[17px]">
          Sacá en segundos las cuentas de sueldo, impuestos y derechos laborales, con los valores que
          fijan los documentos oficiales. Sin vueltas y sin letra chica.
        </p>

        <div className="mt-7 max-w-2xl">
          <BuscadorHero />
        </div>

        <div className="mt-6">
          <p className="mb-2.5 text-xs font-medium text-zinc-500">Lo más buscado</p>
          <ul className="flex flex-wrap gap-2">
            {atajos.map((p, i) => (
              <li key={p.href} className={i >= 6 ? "max-sm:hidden" : undefined}>
                <Link href={p.href} className="ca-atajo">
                  {etiquetaCorta(p.titulo)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-zinc-900/[0.07] pt-5">
          {[
            { n: String(cantidad), t: "calculadoras" },
            { n: "100%", t: "con fuente citada" },
            { n: "$0", t: "y sin registro" },
          ].map((s) => (
            <div key={s.t}>
              <dt className="text-xl font-bold tabular-nums tracking-tight text-zinc-900 sm:text-2xl">{s.n}</dt>
              <dd className="mt-0.5 text-xs text-zinc-500">{s.t}</dd>
            </div>
          ))}
        </dl>
      </section>

      <DestacadoHoras />

      <section aria-labelledby="cifras" className="space-y-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="cifras" className="text-titular font-bold text-zinc-900">
            Los números vigentes
          </h2>
          <p className="text-sm text-zinc-500">Salen del documento oficial y se actualizan solos.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {CIFRAS.map((c) => (
            <Link key={c.href} href={c.href} className="ca-cifra group">
              <span className="ca-cifra-nucleo relative flex flex-col">
                <Flecha className="absolute right-4 top-4 size-4 text-emerald-600 sm:hidden" />
                <span className="text-sm font-medium text-zinc-500">{c.etiqueta}</span>
                <span className="mt-2 text-[1.75rem] font-bold leading-none tracking-tight tabular-nums text-zinc-950">
                  {c.valor}
                </span>
                <span className="mt-2 text-xs leading-snug text-zinc-500">{c.detalle}</span>
                <span className="mt-4 hidden items-center gap-1.5 text-sm font-medium text-emerald-700 sm:inline-flex">
                  Calculá tu caso
                  <Flecha className="size-3.5 transition-transform duration-300 ease-fluid group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <NovedadesRecientes />

      <section aria-labelledby="todas" className="space-y-5">
        <div className="space-y-2">
          <h2 id="todas" className="text-titular font-bold text-zinc-900">
            Todas las calculadoras
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-pretty text-zinc-500">
            Ordenadas por tema, de lo que se cobra todos los meses a lo que pasa una vez. Si ya sabés lo
            que buscás, el buscador es más rápido.
          </p>
        </div>
        <nav aria-label="Temas">
          <ul className="flex flex-wrap gap-2">
            {temas.map(({ g, items }) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="ca-atajo gap-2">
                  {g.titulo}
                  <span className="text-xs tabular-nums text-zinc-400">{items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {temas.map(({ g, items }) => (
        <section key={g.id} id={g.id} aria-labelledby={`${g.id}-titulo`} className="ca-diferido space-y-3">
          <div className="flex items-start justify-between gap-3 border-b border-zinc-900/[0.08] pb-3">
            <div className="min-w-0">
              <h2 id={`${g.id}-titulo`} className="text-lg font-bold tracking-tight text-zinc-900">
                {g.titulo}
              </h2>
              <p className="mt-0.5 text-sm leading-snug text-zinc-500">{g.nota}</p>
            </div>
            <span className="mt-1 shrink-0 rounded-full bg-zinc-900/[0.05] px-2 py-0.5 text-xs font-medium tabular-nums text-zinc-500">
              {items.length}
            </span>
          </div>
          <div className="grid sm:-mx-4 sm:grid-cols-2 sm:gap-x-2">
            {items.map((h) => (
              <Fila key={h.href} h={h} />
            ))}
          </div>
        </section>
      ))}

      {sueltas.length > 0 && (
        <section aria-labelledby="ademas-titulo" className="ca-diferido space-y-3">
          <div className="border-b border-zinc-900/[0.08] pb-3">
            <h2 id="ademas-titulo" className="text-lg font-bold tracking-tight text-zinc-900">
              Y además
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500">Otras cuentas que resolvemos</p>
          </div>
          <div className="grid sm:-mx-4 sm:grid-cols-2 sm:gap-x-2">
            {sueltas.map((h) => (
              <Fila key={h.href} h={h} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="planillas-titulo" className="ca-diferido">
        <div className="rounded-[1.75rem] border border-zinc-900/[0.06] bg-zinc-900/[0.025] p-1.5">
          <div className="grid gap-8 rounded-[calc(1.75rem-0.375rem)] bg-white p-6 shadow-apoyo sm:p-8 lg:grid-cols-[1fr_1.35fr]">
            <div>
              <p className="text-xs font-semibold text-emerald-700">Para quien liquida sueldos o factura</p>
              <h2 id="planillas-titulo" className="mt-2 text-titular font-bold text-zinc-900">
                Planillas para llevarte
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-zinc-500">
                La misma cuenta de la calculadora, en Excel y Google Sheets, al día todo el año.
              </p>
              <Link
                href="/convenios"
                className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 transition-[border-color,background-color,transform] duration-200 ease-fluid hover:border-amber-300 hover:bg-amber-50 active:scale-[0.99]"
              >
                <span>
                  <span className="block text-sm font-semibold text-zinc-900 group-hover:text-amber-800">
                    Escalas por convenio, mes por mes · gratis
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-zinc-600">
                    Comercio, UOCRA y Camioneros, cargados solo con la circular oficial del gremio en la mano.
                  </span>
                </span>
                <Flecha className="size-4 shrink-0 text-amber-700 transition-transform duration-300 ease-fluid group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="divide-y divide-zinc-900/[0.06]">
              {CATALOGO.map((p) => (
                <li key={p.slug}>
                  <Link href={`${p.rutaLanding}?desde=home`} className="group flex items-start gap-4 py-4">
                    <span className="min-w-0 flex-1">
                      <h3 className="font-semibold text-zinc-900 transition-colors group-hover:text-emerald-700">{p.titulo}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{p.paraQuien}.</p>
                    </span>
                    <span className="shrink-0 pt-0.5 text-right">
                      <span className="block text-sm font-semibold tabular-nums text-zinc-900">
                        ARS {p.precio.toLocaleString("es-AR")}
                      </span>
                      <span className="block text-xs text-zinc-500">pago único</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="confianza-titulo" className="ca-diferido space-y-6">
        <h2 id="confianza-titulo" className="text-titular font-bold text-zinc-900">
          Por qué confiar en estos números
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              t: "Sale del documento, no de un blog",
              d: "Cada calculadora cita la ley, la resolución o la circular de la que salió el número, con la fecha en que se verificó.",
            },
            {
              t: "Te mostramos la cuenta",
              d: "No te damos solo el resultado: abajo está el desglose, línea por línea, para que lo puedas chequear.",
            },
            {
              t: "Si no está verificado, no se publica",
              d: "Cuando un dato todavía no tiene documento oficial, lo decimos en vez de estimarlo.",
            },
          ].map((x, i) => (
            <div key={x.t} className="border-t border-zinc-900/[0.1] pt-4">
              <p className="text-xs font-semibold tabular-nums text-emerald-700">0{i + 1}</p>
              <h3 className="mt-2 font-semibold text-zinc-900">{x.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-zinc-600">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-900/[0.06] bg-white/70 p-5 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-pretty">
            Los datos del INDEC, el BCRA y ANSES se revisan solos tres veces por día: si algo cambia, el
            sitio se actualiza. <FirmaAutor prefijo="Cada cuenta la escribe y la verifica" />.
          </p>
          {ULTIMO_CAMBIO && (
            <Link href="/novedades" className="shrink-0 text-xs text-zinc-500 underline decoration-zinc-300 underline-offset-2 hover:text-emerald-700">
              Último dato cargado el {fechaLarga(ULTIMO_CAMBIO)}
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
