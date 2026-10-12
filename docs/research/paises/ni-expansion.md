# Nicaragua: expansión a 40 calculadoras (2026-10-12)

Rama `claude/pais-ni`. De 12 calculadoras pasamos a 40, todas publicadas. Todos los datos están
`verificado` en fuente primaria con `verificadoEl` 2026-10-12; no hay tramos `no-verificado`.

## Fuentes primarias usadas

| Norma | Dónde se leyó | Para qué |
|---|---|---|
| Ley 185, Código del Trabajo | Digesto Jurídico (asamblea.gob.ni), texto consolidado | período de prueba, renuncia, séptimo día, feriados, permisos, prescripción, confianza, riesgos, trabajo doméstico, maternidad, art. 86 (atraso del salario), art. 95 (aguinaldo atrasado) |
| Ley 822 LCT, reformas Ley 891 y Ley 987 | Digesto (PDF de La Gaceta 240/2014 y 41/2019) | IR anual, cuota fija, anticipo y pago mínimo, retenciones, alquiler, rentas de capital, transmisión de bienes, exención y retención de indemnizaciones |
| Ley de Seguridad Social y reglamento | Digesto | INSS facultativo, pensión de vejez, subsidios |
| Código de Familia | Digesto | pensión alimenticia |
| INIDE | planillas mensuales de canasta básica 2026 | canasta básica |
| BCN | SOAP de tipo de cambio | tipo de cambio, jubilación, venta de inmuebles |

## Calculadoras sumadas al cierre

- `ir-indemnizacion`: LCT art. 19 num. 3 (Ley 891): exentas hasta 5 meses de salario y, sobre eso,
  hasta C$500,000 más; el excedente paga retención definitiva del art. 24 num. 1, 15 % desde la
  Ley 987 (La Gaceta 41, 28/2/2019; antes 10 %). Se verificó que la Ley 987 no tocó el art. 19.
- `salario-atrasado`: Código del Trabajo art. 86: un décimo más de lo debido por cada una de las dos
  semanas siguientes a la primera. Se cuentan semanas completas (lectura conservadora); tope 20 %.
  No corre por fuerza mayor o caso fortuito.

## Dudas legales

- `salario-atrasado`: el art. 86 no dice si la semana se cuenta completa o iniciada. Usamos
  completas, que da el monto menor; se aclara en el resultado.
- `ir-indemnizacion`: el tope de cinco meses usa el salario mensual que pone la persona. Si la
  indemnización se calculó con un promedio distinto, el resultado puede diferir.
- `inflacion` deja de ser publicable el 2026-11-11 si el IPC del BCN no se actualiza (aviso del check).
