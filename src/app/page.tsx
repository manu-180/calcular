import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CalculAR — Calculadoras gratuitas para la Argentina",
  description:
    "Calculadoras argentinas gratuitas y siempre actualizadas: monotributo, aguinaldo, recategorización 2026 y más. Datos oficiales, resultados claros.",
};

const herramientas = [
  {
    href: "/monotributo",
    titulo: "Calculadora de monotributo",
    descripcion:
      "Descubrí tu categoría y cuánto vas a pagar por mes según tu facturación. Con la tabla oficial de ARCA vigente.",
    disponible: true,
  },
  {
    href: "/monotributo/categorias",
    titulo: "Categorías del monotributo 2026",
    descripcion:
      "La tabla completa y actualizada: topes de facturación, cuotas, superficie, energía y alquileres de cada categoría.",
    disponible: true,
  },
  {
    href: "/monotributo/recategorizacion",
    titulo: "Recategorización 2026",
    descripcion:
      "Cuándo es, cómo se hace y cómo saber si te toca cambiar de categoría. Próxima ventana: hasta el 5 de agosto.",
    disponible: true,
  },
  {
    href: "/sueldo-neto",
    titulo: "Calculadora de sueldo neto",
    descripcion:
      "De bruto a en mano y al revés: aportes de ley (17%), tope de aportes, cuota sindical y estimación de Ganancias. Y qué bruto pedir para el neto que querés.",
    disponible: true,
  },
  {
    href: "/ganancias",
    titulo: "Calculadora de Ganancias 4ª categoría",
    descripcion:
      "Cuánto te descuenta tu empleador de Ganancias mes a mes: método acumulado oficial (RG ARCA 5008), con el SAC incluido en junio y diciembre.",
    disponible: true,
  },
  {
    href: "/deduccion-empleada-domestica",
    titulo: "Deducción de empleada doméstica en Ganancias",
    descripcion:
      "Cuánta plata te vuelve de verdad por tener empleada registrada: el tope es la ganancia no imponible, pero una deducción devuelve tu alícuota, no el monto. Con el detalle de qué parte del pago a ARCA entra en la cuenta y cuál no.",
    disponible: true,
  },
  {
    href: "/deduccion-alquiler",
    titulo: "Deducción de alquiler en Ganancias",
    descripcion:
      "Cuánto te vuelve por deducir el alquiler: el 40% con tope en la ganancia no imponible —un tope que recién muerde con alquileres altísimos— y el cambio de 2026 que dejó afuera al 10% del inciso k).",
    disponible: true,
  },
  {
    href: "/aguinaldo",
    titulo: "Calculadora de aguinaldo",
    descripcion:
      "Cuánto cobrás de SAC en junio y diciembre, en bruto y en mano. Con proporcional si no trabajaste el semestre completo.",
    disponible: true,
  },
  {
    href: "/vacaciones",
    titulo: "Calculadora de vacaciones",
    descripcion:
      "Cuántos días te corresponden por antigüedad y cuánto cobrás con el plus vacacional. Con la reforma 2026.",
    disponible: true,
  },
  {
    href: "/indemnizacion",
    titulo: "Calculadora de indemnización",
    descripcion:
      "Cuánto te corresponde por despido sin causa: antigüedad, preaviso, aguinaldo y vacaciones. Con el nuevo art. 245.",
    disponible: true,
  },
  {
    href: "/actualizacion-creditos-laborales",
    titulo: "Actualización de créditos laborales",
    descripcion:
      "Cuánto vale hoy lo que te deben. Desde marzo de 2026 lo dice la ley y no la jurisprudencia: IPC del INDEC más 3% anual, desde que la suma es debida hasta el pago (art. 276 LCT). Con el desfasaje del índice publicado, que nadie descuenta, y los topes del art. 277.",
    disponible: true,
  },
  {
    href: "/indemnizacion-art",
    titulo: "Indemnización por accidente de trabajo (ART)",
    descripcion:
      "El texto de la Ley 24.557 todavía dice que la indemnización «en ningún caso será superior» a $180.000. El Decreto 1694/2009 suprimió ese tope y convirtió el mismo número en piso: hoy vale $114.354.110 por el porcentaje de incapacidad, actualizado por RIPTE cada seis meses.",
    disponible: true,
  },
  {
    href: "/comision-medica",
    titulo: "Comisión médica: los plazos del reclamo a la ART",
    descripcion:
      "Antes de demandarle a la ART hay que agotar la comisión médica, y tiene 60 días hábiles administrativos para expedirse. Son perentorios: vencidos, la vía judicial queda expedita sin esperar el dictamen. Y el trámite lo paga la aseguradora, no el trabajador.",
    disponible: true,
  },
  {
    href: "/indemnizacion-por-fallecimiento",
    titulo: "Indemnización por fallecimiento del trabajador",
    descripcion:
      "Qué le corresponde a la familia cuando muere un trabajador. El art. 248 de la LCT tiene texto nuevo desde marzo de 2026: cambió quiénes cobran, y ahora se reparte en partes iguales contando cada titular como uno. Es la mitad de la indemnización por despido, va aparte de lo que pague la ART, y el empleador tiene 30 días para saldarla.",
    disponible: true,
  },
  {
    href: "/certificado-de-trabajo",
    titulo: "Certificado de trabajo (art. 80 LCT)",
    descripcion:
      "El empleador tiene 45 días hábiles desde que terminó el contrato: calculá la fecha límite exacta, descontando fines de semana y feriados. Y la noticia que casi nadie publicó: la multa de tres sueldos por no entregarlo ya no está en la ley: el artículo que la había creado fue derogado y el art. 80 se reescribió entero. Lo que se puede reclamar depende de cuándo terminó tu contrato.",
    disponible: true,
  },
  {
    href: "/periodo-de-prueba",
    titulo: "Despido en período de prueba: qué te tienen que pagar",
    descripcion:
      "Durante veintidós años la respuesta fue «te tienen que preavisar 15 días». El 6 de marzo de 2026 dejó de ser cierta: el art. 48 de la Ley 27.802 sacó el período de prueba de la escala del preaviso y escribió lo contrario. Pero tampoco es cierto que no te corresponda nada: el aguinaldo y las vacaciones proporcionales se cobran igual, porque el período de prueba cuenta como tiempo de servicio.",
    disponible: true,
  },
  {
    href: "/despido-empleada-domestica",
    titulo: "Despido de empleada doméstica: la liquidación final",
    descripcion:
      "El régimen de casas particulares se liquida con sus propios artículos: el preaviso son 10 o 30 días y la indemnización del art. 48 no tiene tope. Y el 6 de marzo de 2026 cambiaron dos cosas de fondo que casi nadie publicó — el período de prueba pasó de 30 días a seis meses, y la Ley de Contrato de Trabajo dejó de aplicarse supletoriamente a este régimen.",
    disponible: true,
  },
  {
    href: "/practicas-desleales-sindicales",
    titulo: "Prácticas desleales del sindicato: las ocho conductas nuevas y cuánto cuestan",
    descripcion:
      "Durante 38 años la Ley 23.551 tipificó prácticas desleales de una sola parte: el empleador. El 6 de marzo de 2026 apareció el art. 53 bis con ocho conductas de las asociaciones sindicales, el art. 54 pasó a habilitar a «todo damnificado» a querellar, y la multa dejó de remitir a una ley de 1972 para pasar al Anexo II de la Ley 25.212 — que se calcula sobre el salario mínimo, y llega al 2.000% por cada trabajador afectado en las infracciones muy graves. La conducta se explicó en todos lados; el importe no.",
    disponible: true,
  },
  {
    href: "/indemnizacion-por-clientela",
    titulo: "Indemnización por clientela: el 25% del viajante de comercio",
    descripcion:
      "El art. 14 de la Ley 14.546 está escrito igual desde 1958 y paga el 25% de lo que correspondería por un despido intempestivo e injustificado — cualquiera sea el motivo por el que terminó el contrato, incluida la renuncia. La Ley 27.802 le puso fecha de vencimiento: el 1° de enero de 2027 se deroga el estatuto entero, y con él la clientela, la comisión indirecta y la garantía de zona.",
    disponible: true,
  },
  {
    href: "/indemnizacion-periodista",
    titulo: "Indemnización de un periodista: los seis sueldos que se terminan en 2027",
    descripcion:
      "El art. 43 del Estatuto del Periodista está escrito igual desde 1965 y paga tres indemnizaciones, no una: antigüedad con piso de dos meses, sustitutiva del preaviso de dos o cuatro meses, y una indemnización especial de seis meses de sueldo que se cobra «haya o no mediado preaviso» y que la Ley de Contrato de Trabajo no tiene. El art. 197 de la Ley 27.802 deroga el estatuto entero el 1° de enero de 2027: la calculadora muestra las dos cuentas y la diferencia en pesos.",
    disponible: true,
  },
  {
    href: "/despido-de-delegado-gremial",
    titulo: "Despido de un delegado gremial: cuánto se cobra hoy",
    descripcion:
      "El artículo 52 de la Ley 23.551 —el que fija la indemnización agravada por violar la tutela sindical— estuvo escrito igual desde 1988, y el 6 de marzo de 2026 la Ley 27.802 lo reescribió entero. Las diferencias no son de matiz: los suplentes quedaron expresamente afuera, los congresales tienen cupo y reloj, el candidato que no llega al 5% de los votos pierde la protección, y el año extra ya no se acumula con el art. 245 bis de la LCT. Casi todo lo publicado comenta el texto viejo.",
    disponible: true,
  },
  {
    href: "/rifl",
    titulo: "RIFL: cuánto baja el costo de contratar",
    descripcion:
      "Es el número más grande de la reforma para un empleador y circula como noticia en vez de como cuenta: por cada nueva incorporación que califique, las contribuciones patronales de SIPA, Fondo Nacional de Empleo, Asignaciones Familiares e INSSJP pasan del 18% o 20,40% a un 5% total, durante 48 meses. Y hay dos relojes que casi nadie separa: la ventana para dar el alta cierra el 30 de abril de 2027, pero el beneficio de cada contratación sigue corriendo cuatro años desde el alta.",
    disponible: true,
  },
  {
    href: "/repartidores-de-apps",
    titulo: "Repartidor o conductor de app: cuánto te queda por mes",
    descripcion:
      "El 6 de marzo de 2026 apareció un régimen laboral entero que antes no existía: el Título XII de la Ley 27.802 define al repartidor y al conductor de plataformas como «prestador independiente» y saca a la Ley de Contrato de Trabajo del medio. La parte jurídica se explicó en todos lados; el número no. Acá está: qué categoría de monotributo te toca, cuánto te queda limpio y cuánto vale, en pesos, el aguinaldo y el plus de vacaciones que dejaste de cobrar.",
    disponible: true,
  },
  {
    href: "/descuentos-del-sueldo",
    titulo: "Cuánto te pueden descontar del sueldo",
    descripcion:
      "El tope del 20% del art. 133 es correcto y está intacto desde 1974 — por eso el tema parece cubierto y ahí termina todo lo publicado. Al lado hay tres números oficiales que casi nadie muestra: la cuota solidaria tiene desde marzo de 2026 un techo del 2% que antes no existía, la retención de Ganancias puede pasarse del 20% sin ningún límite, y el embargo judicial se calcula sobre el bruto, arrancando recién arriba de un salario mínimo.",
    disponible: true,
  },
  {
    href: "/derivar-aportes-a-prepaga",
    titulo: "Aportes de obra social y derivación a prepaga",
    descripcion:
      "De los 9 puntos que se aportan sobre tu sueldo, a tu entidad le llega el 85%: el resto va al Fondo Solidario. Calculá cuánto llega y cuánto te queda de bolsillo si derivás a una prepaga.",
    disponible: true,
  },
  {
    href: "/obra-social-monotributo",
    titulo: "Obra social del monotributo: desde cuándo te cubre",
    descripcion:
      "La cobertura no arranca completa el día uno: el ambulatorio va desde el alta, la internación recién a los 3 meses y las prestaciones de alto costo y discapacidad a los 6. Tus tres fechas exactas.",
    disponible: true,
  },
  {
    href: "/hasta-cuando-tengo-obra-social",
    titulo: "¿Hasta cuándo tenés obra social?",
    descripcion:
      "Los tres meses después del despido existen, pero sólo si trabajaste más de tres meses seguidos. Y hay otros siete supuestos con plazos distintos: la fecha exacta, caso por caso.",
    disponible: true,
  },
  {
    href: "/horas-extras",
    titulo: "Horas extras: 50%, 100% y el banco de horas",
    descripcion:
      "El recargo del art. 201 no cambió desde 1974 — por eso todas las calculadoras dan el mismo número. Lo que cambió en marzo de 2026 es quién puede pactar que esas horas se compensen con francos en vez de plata: hasta entonces sólo un convenio colectivo, ahora el empleador y vos, uno a uno y por escrito. Acá el importe, los francos equivalentes en las dos lecturas posibles y el tope de 30 horas mensuales que sigue vigente.",
    disponible: true,
  },
  {
    href: "/reingreso",
    titulo: "Reingreso al mismo empleador",
    descripcion:
      "Te indemnizaron, te volvieron a tomar y te vuelven a despedir. Desde marzo de 2026 el art. 18 de la LCT borra la antigüedad anterior si entre el cese y el reingreso pasaron dos años, y el art. 255 deduce lo que cobraste actualizado por IPC — no en pesos de aquel momento. Con el piso que impide que ese descuento se coma el despido nuevo.",
    disponible: true,
  },
  {
    href: "/tiempo-parcial",
    titulo: "Media jornada: cuánto te tienen que pagar",
    descripcion:
      "El tope de dos tercios de la jornada ya no existe, y con él se cayó la obligación de pagar el sueldo completo si se superaba: la Ley 27.802 reescribió el art. 92 ter en marzo de 2026. A cambio, las horas suplementarias pasaron de prohibidas a permitidas. Acá el piso legal de tu sueldo, las horas extra con y sin recargo, y el aporte de obra social que no se prorratea.",
    disponible: true,
  },
  {
    href: "/renuncia",
    titulo: "Renuncia: qué te tienen que pagar",
    descripcion:
      "Renunciar no es irse con las manos vacías: los arts. 123 y 156 dicen «por cualquier causa», así que van los días del mes, el SAC proporcional y las vacaciones no gozadas. Y vos también debés 15 días de preaviso. Desde marzo de 2026 el telegrama puede ser digital y ya no exige presencia personal: el art. 240 se reescribió y casi nadie lo publica.",
    disponible: true,
  },
  {
    href: "/temeridad-y-malicia",
    titulo: "Temeridad y malicia: la sanción que ya no existe",
    descripcion:
      "El art. 275 de la LCT condenaba al empleador que litigaba de mala fe a pagar hasta 2,5 veces el interés bancario, y desde 2011 calificaba de temeraria y maliciosa —de oficio— la falta de cumplimiento de un acuerdo homologado. La Ley 27.802 lo derogó en marzo de 2026 y, el mismo día, metió en el art. 20 las costas solidarias del trabajador y su abogado por reclamar de más. Acá, cuánta plata era cada cosa.",
    disponible: true,
  },
  {
    href: "/trabajo-de-mujeres",
    titulo: "Trabajo de mujeres: qué quedó vigente",
    descripcion:
      "El Capítulo I del Título VII de la LCT quedó vacío en marzo de 2026: se cayeron el descanso de dos horas al mediodía, la prohibición de trabajo a domicilio y la de tareas penosas, peligrosas o insalubres. Siguen en pie el art. 172 y todo el capítulo de maternidad. Acá el texto exacto de lo que se derogó —que InfoLEG ya no muestra— y cuántas horas de tu día cambian.",
    disponible: true,
  },
  {
    href: "/propinas",
    titulo: "Propinas: ¿son remunerativas?",
    descripcion:
      "Ya no. Desde marzo de 2026 el art. 104 de la LCT dice que en ningún caso las propinas son remuneración, aun cuando sean habituales, y el art. 113 —el que las regulaba— quedó derogado. Se siguen cobrando, pero no cuentan para el aguinaldo, las vacaciones, la indemnización ni los aportes: acá se ve cuánta plata es.",
    disponible: true,
  },
  {
    href: "/salario-minimo",
    titulo: "Salario mínimo, vital y móvil",
    descripcion:
      "El monto que se publica es el de la jornada legal completa: quien trabaja menos horas cobra la proporción, y el valor por hora no se prorratea. La escala completa hasta abril de 2027 —el laudo la fijó de una vez— y los siete números del derecho laboral que cuelgan del mínimo.",
    disponible: true,
  },
  {
    href: "/desempleo",
    titulo: "Prestación por desempleo",
    descripcion:
      "Cuánto cobrás de seguro de desempleo y por cuántos meses, cuota por cuota. El 75% sale del neto, no del bruto, y a partir del quinto mes la cuota baja: acá se ve.",
    disponible: true,
  },
  {
    href: "/licencia-por-maternidad",
    titulo: "Licencia por maternidad",
    descripcion:
      "El día exacto en que empieza y termina tu licencia según la fecha de parto. El mínimo antes del parto es de 10 días —no 15— y durante la licencia cobrás el bruto, no el neto.",
    disponible: true,
  },
  {
    href: "/empleada-domestica",
    titulo: "Empleada doméstica: escala oficial",
    descripcion:
      "Las 5 categorías de casas particulares con y sin retiro, por hora y por mes, del anexo oficial de la CNTCP. Con zona desfavorable, horas extras y el cálculo por las horas que se trabajan de verdad.",
    disponible: true,
  },
  {
    href: "/aportes-empleada-domestica",
    titulo: "Aportes de empleada doméstica",
    descripcion:
      "Lo que el empleador le paga a ARCA por mes, con el desglose que nadie publica: obra social, jubilación y ART por separado. Con menos de 16 horas semanales el aporte no alcanza para que tenga obra social, y acá se ve cuánto falta.",
    disponible: true,
  },
  {
    href: "/licencias-especiales",
    titulo: "Licencias especiales (art. 158)",
    descripcion:
      "Matrimonio, nacimiento, fallecimiento y examen: hasta qué día exacto, con los feriados oficiales aplicados. Y lo que casi nadie liquida: el día se paga a sueldo ÷ 25, no ÷ 30.",
    disponible: true,
  },
  {
    href: "/licencia-por-enfermedad",
    titulo: "Licencia por enfermedad",
    descripcion:
      "Hasta qué día exacto cobrás sueldo con el art. 208: 3, 6 o 12 meses según antigüedad y cargas de familia. Si ya faltaste por lo mismo hace menos de 2 años, el plazo no se reinicia —acá se ve cuánto queda.",
    disponible: true,
  },
  {
    href: "/puam",
    titulo: "PUAM: pensión del adulto mayor",
    descripcion:
      "Cuánto se cobra a los 65 sin los 30 años de aportes —el 80% del haber mínimo— y la letra chica que casi nadie publica: desde 2018 es incompatible con trabajar y no deja pensión para el cónyuge.",
    disponible: true,
  },
  {
    href: "/edad-avanzada",
    titulo: "Prestación por edad avanzada",
    descripcion:
      "A los 70 años con 10 de aportes. Todas las notas publican «el 70% de la PBU» y ese número no es lo que se cobra: queda muy por debajo del haber mínimo, que es el piso garantizado. Además, el requisito que voltea más solicitudes —5 de esos años tienen que caer en los últimos 8— y el que ANSES exige sin estar en la ley.",
    disponible: true,
  },
  {
    href: "/pension-no-contributiva",
    titulo: "Pensiones no contributivas",
    descripcion:
      "Cuánto paga cada una este mes —discapacidad, vejez, madres de 7 hijos y PUAM— y hasta cuánto podés trabajar sin perderla: desde la Ley 27.793 el tope son dos salarios mínimos.",
    disponible: true,
  },
  {
    href: "/jubilacion",
    titulo: "Jubilación: aumento y bono",
    descripcion:
      "Cuánto cobrás con TU haber, no con la mínima: el bono se recorta si cobrás por encima. Con la resolución de ANSES del mes y el aumento que ya está definido.",
    disponible: true,
  },
  {
    href: "/asignaciones-familiares",
    titulo: "Asignaciones familiares y AUH",
    descripcion:
      "Cuánto cobrás por hijo según lo que suma tu casa: los cuatro tramos, las cinco zonas, el tope que excluye al grupo entero por un solo sueldo y el 20% que la AUH retiene.",
    disponible: true,
  },
  {
    href: "/canasta-basica",
    titulo: "Canasta básica y línea de pobreza",
    descripcion:
      "Cuánto necesita tu hogar para no ser pobre, según quiénes lo componen. Con la canasta del INDEC y la tabla oficial de adultos equivalentes.",
    disponible: true,
  },
  {
    href: "/cuota-alimentaria",
    titulo: "Cuota alimentaria",
    descripcion:
      "Una referencia orientativa con la canasta de crianza del INDEC, y el coeficiente para actualizar una cuota fijada hace meses.",
    disponible: true,
  },
  {
    href: "/convenios/comercio",
    titulo: "Sueldo de Empleados de Comercio",
    descripcion:
      "Tu sueldo de convenio por categoría, con antigüedad y presentismo. Escala oficial de FAECYS y los $120.000 no remunerativos explicados.",
    disponible: true,
  },
  {
    href: "/convenios",
    titulo: "Sueldos por convenio: UOCRA y más",
    descripcion:
      "Escalas salariales verificadas contra la circular oficial de cada gremio, con calculadora por categoría, zona y jornada.",
    disponible: true,
  },
  {
    href: "/plazo-fijo",
    titulo: "Calculadora de plazo fijo",
    descripcion:
      "Cuánto gana tu plata a 30 días o más, con la tasa del BCRA precargada. Y si le ganás o no a la inflación.",
    disponible: true,
  },
  {
    href: "/inflacion",
    titulo: "Calculadora de inflación",
    descripcion:
      "Actualizá cualquier monto con el IPC oficial del INDEC y descubrí si tu sueldo le ganó o perdió a la inflación.",
    disponible: true,
  },
  {
    href: "/inflacion/alquiler",
    titulo: "Ajuste de alquiler por IPC",
    descripcion:
      "El cronograma completo de aumentos de tu contrato — cada 3, 4, 6 o 12 meses — y la estimación del próximo ajuste.",
    disponible: true,
  },
];

// El orden de las secciones es el orden en que la gente busca: primero lo que se
// cobra todos los meses, al final lo excepcional. Una herramienta que no figure acá
// cae sola en "Y además", así que agregar una calculadora nunca la deja invisible.
const SECCIONES: { titulo: string; nota: string; hrefs: string[] }[] = [
  {
    titulo: "Monotributo",
    nota: "Categoría, cuota y recategorización con la tabla de ARCA",
    hrefs: [
      "/monotributo",
      "/monotributo/categorias",
      "/monotributo/recategorizacion",
      "/obra-social-monotributo",
    ],
  },
  {
    titulo: "Tu sueldo",
    nota: "Lo que cobrás todos los meses, y de dónde sale cada número",
    hrefs: [
      "/sueldo-neto",
      "/aguinaldo",
      "/vacaciones",
      "/horas-extras",
      "/salario-minimo",
      "/tiempo-parcial",
      "/descuentos-del-sueldo",
      "/derivar-aportes-a-prepaga",
      "/hasta-cuando-tengo-obra-social",
      "/propinas",
    ],
  },
  {
    titulo: "Sueldos por convenio",
    nota: "Escalas verificadas contra la circular oficial de cada gremio",
    hrefs: ["/convenios", "/convenios/comercio"],
  },
  {
    titulo: "Impuestos y deducciones",
    nota: "Ganancias y lo que se puede descontar",
    hrefs: ["/ganancias", "/deduccion-empleada-domestica", "/deduccion-alquiler"],
  },
  {
    titulo: "Cuando termina el trabajo",
    nota: "Indemnización, liquidación final y los plazos que corren",
    hrefs: [
      "/indemnizacion",
      "/periodo-de-prueba",
      "/renuncia",
      "/desempleo",
      "/certificado-de-trabajo",
      "/actualizacion-creditos-laborales",
      "/indemnizacion-por-fallecimiento",
      "/indemnizacion-art",
      "/comision-medica",
      "/reingreso",
      "/despido-empleada-domestica",
      "/indemnizacion-por-clientela",
      "/indemnizacion-periodista",
    ],
  },
  {
    titulo: "Licencias y ausencias",
    nota: "Hasta qué día exacto, con los feriados aplicados",
    hrefs: ["/licencia-por-maternidad", "/licencia-por-enfermedad", "/licencias-especiales"],
  },
  {
    titulo: "Casas particulares y regímenes nuevos",
    nota: "Empleada doméstica, apps y los regímenes de la reforma",
    hrefs: [
      "/empleada-domestica",
      "/aportes-empleada-domestica",
      "/repartidores-de-apps",
      "/rifl",
    ],
  },
  {
    titulo: "Sindical y juicio laboral",
    nota: "Lo que cambió en marzo de 2026 y casi nadie publicó",
    hrefs: [
      "/despido-de-delegado-gremial",
      "/practicas-desleales-sindicales",
      "/temeridad-y-malicia",
      "/trabajo-de-mujeres",
    ],
  },
  {
    titulo: "Jubilaciones y ANSES",
    nota: "Haberes, bonos y pensiones, con la resolución del mes",
    hrefs: [
      "/jubilacion",
      "/asignaciones-familiares",
      "/puam",
      "/edad-avanzada",
      "/pension-no-contributiva",
    ],
  },
  {
    titulo: "Plata y precios",
    nota: "Inflación, alquiler y rendimientos con datos del INDEC y el BCRA",
    hrefs: ["/inflacion", "/inflacion/alquiler", "/plazo-fijo", "/canasta-basica", "/cuota-alimentaria"],
  },
];

function Tarjeta({ h }: { h: (typeof herramientas)[number] }) {
  if (!h.disponible) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/60 p-5">
        <h3 className="font-semibold text-zinc-400">
          {h.titulo}{" "}
          <span className="ml-1 rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            Muy pronto
          </span>
        </h3>
        <p className="mt-1.5 line-clamp-3 text-sm text-zinc-400">{h.descripcion}</p>
      </div>
    );
  }
  return (
    <Link
      href={h.href}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_14px_34px_-20px_rgba(16,185,129,0.55)] motion-reduce:hover:translate-y-0"
    >
      {/* Filete que se pinta al pasar: da respuesta al hover sin mover el layout */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <h3 className="font-semibold text-zinc-900 transition-colors duration-150 group-hover:text-emerald-700">
        {h.titulo}
      </h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-zinc-600">{h.descripcion}</p>
    </Link>
  );
}

export default function Home() {
  const porHref = new Map(herramientas.map((h) => [h.href, h]));
  const usados = new Set(SECCIONES.flatMap((s) => s.hrefs));
  const sobrantes = herramientas.filter((h) => !usados.has(h.href));
  const grupos = [
    ...SECCIONES.map((s) => ({
      ...s,
      items: s.hrefs.map((href) => porHref.get(href)).filter((h) => h !== undefined),
    })),
    ...(sobrantes.length
      ? [{ titulo: "Y además", nota: "Otras cuentas que resolvemos", items: sobrantes }]
      : []),
  ].filter((g) => g.items.length > 0);

  return (
    <div className="space-y-12">
      {/* Hero. El H1 no se anima: es el elemento LCP y arrancarlo en opacity 0
          retrasaría la métrica que estamos cuidando. */}
      <section className="relative -mx-4 overflow-hidden border-y border-emerald-100/70 px-4 py-10 sm:mx-0 sm:rounded-3xl sm:border sm:px-8 sm:py-12">
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-sky-50/70"
        />
        <span
          aria-hidden
          className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-emerald-200/25 blur-3xl"
        />
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm backdrop-blur-sm">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
            Cada número, con su fuente oficial y su fecha
          </p>
          <h1 className="mt-4 text-[2rem] font-bold leading-[1.12] tracking-tight text-zinc-900 sm:text-[2.75rem]">
            Calculadoras claras
            <span className="block bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              para la Argentina
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
            Resolvé en segundos las cuentas que todos hacemos —impuestos, sueldos y derechos
            laborales— con los valores que dicen los documentos oficiales. Sin vueltas y sin
            letra chica.
          </p>
          <dl className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              { n: String(herramientas.length), t: "calculadoras" },
              { n: "100%", t: "con fuente citada" },
              { n: "$0", t: "y sin registro" },
            ].map((s) => (
              <div key={s.t} className="text-center">
                <dt className="text-xl font-bold tabular-nums text-emerald-700 sm:text-2xl">
                  {s.n}
                </dt>
                <dd className="mt-0.5 text-xs text-zinc-500">{s.t}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {grupos.map((g) => (
        <section key={g.titulo} className="space-y-4">
          <div className="flex items-start justify-between gap-3 border-b border-zinc-200/80 pb-2.5">
            <div className="min-w-0">
              <h2 className="text-lg font-bold tracking-tight text-zinc-900">{g.titulo}</h2>
              <p className="mt-0.5 text-sm leading-snug text-zinc-500">{g.nota}</p>
            </div>
            <span className="mt-1 shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium tabular-nums text-zinc-500">
              {g.items.length}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {g.items.map((h) => (
              <Tarjeta key={h.href} h={h} />
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2.5">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900">Para profesionales</h2>
          <p className="text-sm text-zinc-500">
            Para estudios contables y quien liquida sueldos todos los meses
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/planillas"
            className="group relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 outline-none transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-[0_14px_34px_-20px_rgba(16,185,129,0.6)] motion-reduce:hover:translate-y-0"
          >
            <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              Disponible · ARS 14.900
            </span>
            <h3 className="mt-2 font-semibold text-zinc-900 transition-colors group-hover:text-emerald-700">
              Planilla de sueldos Comercio 2026
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
              Escala oficial CCT 130/75 embebida, con antigüedad, presentismo y jornada parcial.
              Actualización garantizada con cada paritaria.
            </p>
          </Link>
          <Link
            href="/convenios"
            className="group relative overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 outline-none transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_14px_34px_-20px_rgba(217,119,6,0.55)] motion-reduce:hover:translate-y-0"
          >
            <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              Gratis · escalas oficiales
            </span>
            <h3 className="mt-2 font-semibold text-zinc-900 transition-colors group-hover:text-amber-700">
              Escalas por convenio, mes por mes
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
              Comercio, UOCRA y Camioneros con los básicos de cada mes. Solo cargamos un mes nuevo
              con la circular oficial del gremio en la mano.
            </p>
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <h2 className="text-base font-semibold text-zinc-900">Por qué confiar en estos números</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          {[
            {
              t: "Sale del documento, no de un blog",
              d: "Cada calculadora cita la ley, la resolución o la circular de la que salió el número, con la fecha en que se verificó.",
            },
            {
              t: "Te mostramos la cuenta",
              d: "No te damos solo un resultado: abajo está el desglose, línea por línea, para que puedas chequearlo.",
            },
            {
              t: "Si no está verificado, no se publica",
              d: "Cuando un dato todavía no tiene documento oficial, lo decimos en vez de estimarlo.",
            },
          ].map((x) => (
            <div key={x.t}>
              <div className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500"
                />
                <h3 className="text-sm font-semibold text-zinc-800">{x.t}</h3>
              </div>
              <p className="mt-1.5 pl-3.5 text-sm leading-relaxed text-zinc-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
