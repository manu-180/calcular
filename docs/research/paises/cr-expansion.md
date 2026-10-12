# Costa Rica: expansión de calculadoras (12 → 30+)

Fecha: 12/10/2026. Base: `docs/research/paises/cr.md` (7/10/2026) y las 12 calculadoras ya publicadas.

## Cómo se midió la demanda

Sin Keyword Planner. Señales usadas (12/10/2026): qué calculadoras de Costa Rica publican los competidores que
aparecen en el buscador (Alegra, AG Legal, TopTrabajos, Siempre al Día, G-Talent), qué temas cubre la prensa
(Observador, El Financiero, La República) y qué trámites tienen fecha fija en el año. Orden cualitativo:
**A** = calculadora propia en 2 o más competidores y tema de prensa todos los años; **B** = una calculadora o
guía con ejemplo; **C** = búsqueda de nicho o estacional.

Competidores vistos con calculadora propia: liquidación, cesantía, aguinaldo, cargas sociales patronales,
retención salarial, incapacidades CCSS e INS, feriados, embargos (AG Legal); horas extra, liquidación,
cesantía, feriados, deducciones CCSS (TopTrabajos); cargas patronales (Alegra). Nadie cubre FCL, ROP,
salario escolar privado, renta de independientes y pymes con los tramos 2026 en un solo sitio.

## Fuente primaria usada

SINALEVI (SCIJ de la Procuraduría). El texto completo se lee con un POST a
`https://sinalevi.go.cr/ResultadosNormativa/_CargarTextoCompleto` (`idFichaNorma`, `version`), que devuelve el
mismo HTML que muestra la página `Informacion?param1=<ficha>&param2=<versión>`. Las URL de `datos.json`
apuntan a esa página. Además: Alcance 191 de La Gaceta (tabla del IVM, página 60 y 61 leídas como imagen),
carta MTSS-DAJ-AER-1076-2025 de feriados 2026 (PDF del MTSS) e indicador 423 del BCCR.

Sin acceso el 12/10: ccss.sa.cr (conexión rechazada), hacienda.go.cr (403). No hacen falta: todas las tasas
de cargas sociales están en sus leyes y reglamentos.

## Lista rankeada

| # | Slug | Demanda | Norma | Fuente primaria | Estado |
|---|---|---|---|---|---|
| 1 | cargas-sociales | A | Reglamento Seguro de Salud art. 62; Reglamento IVM Transitorio XI; Leyes 4351, 5662, 4760, 6868, 7983 | SINALEVI + Alcance 191 | publicada |
| 2 | costo-de-un-empleado | A | ídem + Ley 2412 (aguinaldo) | ídem | publicada |
| 3 | renuncia | A | Código de Trabajo arts. 28, 32, 153; Ley 2412 | SINALEVI | publicada |
| 4 | feriados | A | CT arts. 148, 149, 152; carta MTSS feriados 2026 | SINALEVI + MTSS | publicada |
| 5 | incapacidad | A | Reglamento del Seguro de Salud arts. 34 a 36 y 62 | SINALEVI | publicada |
| 6 | riesgos-del-trabajo | B | CT art. 236 | SINALEVI | publicada (solo primeros 45 días) |
| 7 | embargo-de-salario | A | CT art. 172; Decreto 45303-MTSS | SINALEVI | publicada |
| 8 | renta-trabajador-independiente | A | Ley 7092 art. 15 c; Decreto 45333-H arts. 4 y 5 | SINALEVI | publicada |
| 9 | renta-personas-juridicas | B | Ley 7092 art. 15 a y b; Decreto 45333-H art. 3 | SINALEVI | publicada |
| 10 | maternidad | A | CT art. 95; Reglamento Salud art. 40 | SINALEVI | publicada |
| 11 | licencia-de-paternidad | B | CT art. 95 inciso b | SINALEVI | publicada |
| 12 | trabajo-domestico | A | CT arts. 102, 105; Decreto 45303-MTSS art. 1 c | SINALEVI | publicada |
| 13 | salario-por-hora | B | CT arts. 136, 138; Decreto 45303-MTSS arts. 3 y 7 | SINALEVI | publicada |
| 14 | fcl | B | Ley 7983 arts. 3 y 6 | SINALEVI | publicada |
| 15 | rop | C | Ley 7983 art. 13; Ley 4351 art. 5 | SINALEVI | publicada |
| 16 | certificado-de-deposito | B | Ley 7092 art. 31 ter; TBP del BCCR | SINALEVI + BCCR | publicada |
| 17 | salario-escolar | B | Ley 8682 art. 2 (sector privado) | SINALEVI | publicada |
| 18 | periodo-de-prueba | B | CT arts. 28 y 102 | SINALEVI | publicada |
| 19 | muerte-del-trabajador | C | CT arts. 29 y 85 a | SINALEVI | publicada |
| 20 | cesantia-por-pension | C | CT arts. 29 y 85 e | SINALEVI | publicada |
| 21 | contrato-a-plazo-fijo | C | CT art. 31 | SINALEVI | publicada |
| 22 | impuesto-bienes-inmuebles | B | Ley 7509 arts. 4 e y 23 | SINALEVI | publicada sin la exención del bien único |
| 23 | salario-base | A | Ley 7337; acuerdo del Consejo Superior del Poder Judicial | no ubicada | borrador |

## Descartadas o en espera

| Tema | Motivo |
|---|---|
| Marchamo, impuesto a casas de lujo | Excluidas por pedido |
| Pensión IVM (monto) | Reglamento IVM con tabla de cuantías por múltiplos de salario mínimo y revalorización: falta leerla completa. Próxima tanda |
| Cuota CCSS de trabajador independiente | Escala contributiva aprobada por Junta Directiva de la CCSS; ccss.sa.cr sin acceso |
| Régimen simplificado (RTS) | Factores por actividad en resolución de Hacienda (403) |
| Canasta básica, IPC por rubro | INEC con 403 |
| Salario escolar del sector público | No ubicamos en SINALEVI la norma vigente con el porcentaje |
| Subsidio INS después del día 45 | El tope del 100 % lo fija el reglamento y no lo encontramos en el Decreto 13466-TSS vigente |
| Pensión alimentaria (monto) | La fija el juez; el tope de embargo del 50 % queda en `embargo-de-salario` |
| Salario base (y exención del bien único en bienes inmuebles) | ₡462.200 solo en prensa y EY; falta el acuerdo o la circular del Poder Judicial |

## Trampas de la ley encontradas

- Cargas patronales 26,83 % en 2026: el 3 % del ROP (Ley 7983 art. 13 c) ya incluye lo que las tablas de la CCSS
  muestran como «ROP 2 %» e «INS 1 %»; la suma por ley da lo mismo.
- INA solo con 5 o más trabajadores permanentes (agro: 0,5 % con más de 10). Asignaciones Familiares exceptúa
  planillas de hasta un salario base.
- Embargo: la base es el salario líquido (después de cuotas obligatorias); el mínimo inembargable es el menor
  salario mensual del decreto (hoy el de trabajo doméstico) o el menor por jornada por 26.
- Incapacidad CCSS: la Caja paga desde el cuarto día; si la incapacidad se prorroga dentro de 30 días, desde el
  primero. El subsidio es cuatro veces el aporte total al Seguro de Salud (5,5 + 9,25 + 0,25 = 15 %): 60 %.
- Feriados con pago mensual: ya vienen en el salario; si se trabajan se suma un día sencillo (pago doble). Horas
  extra en feriado: triple.
