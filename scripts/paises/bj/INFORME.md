# Benín (`bj`): informe del agente

- Rama: `claude/pais-bj` (base `origin/main`, con el avance parcial anterior como punto de partida).
- Mercado: `bj`, francés (`fr-BJ`), XOF, trato de usted, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **62 calculadoras** = 22 locales + 40 universales (la universal de IVA se cae sola por `calcul-tva`).

## Calculadoras locales (22, todas `publicado`)

| Slug | Concepto | Base |
|---|---|---|
| calcul-salaire-net | sueldo-neto (declara `mundo`) | CGI art. 125, Decreto 94-258 |
| calcul-its | impuesto-renta | CGI art. 125 |
| cotisations-cnss | aportes-seguridad-social | Decreto 94-258 |
| cout-employeur | costo-empleador | Decreto 94-258, CGI art. 194 |
| smig | salario-minimo | Decreto 2022-692 |
| calcul-tva | iva | CGI art. 241 |
| heures-supplementaires | horas-extra | Código de Trabajo arts. 142, 145, 147 |
| conges-payes | vacaciones | Código de Trabajo art. 158 |
| preavis | preaviso | Código de Trabajo arts. 53 a 55 |
| indemnite-licenciement-abusif | indemnizacion-despido | Ley 2017-05 arts. 29 a 31 |
| taxe-professionnelle-synthetique | regimen-simplificado | CGI arts. 178, 183 a 185 |
| impot-sur-les-societes | propio | CGI arts. 46 y 47 |
| impot-sur-les-benefices-d-affaires | propio | CGI arts. 63 y 64 |
| impot-revenus-fonciers | propio | CGI arts. 103 a 106 |
| plus-value-immobiliere | propio | CGI arts. 111 a 115 |
| impot-revenus-capitaux-mobiliers | retencion-honorarios | CGI arts. 85 a 88 |
| acompte-aib | propio | CGI art. 132 |
| taxe-vehicules-a-moteur | propio | CGI arts. 166 a 169 |
| avantages-en-nature | propio | CGI arts. 123 y 124 |
| its-treizieme-mois | propio | CGI art. 126 |
| convertisseur-euro-fcfa | tipo-de-cambio | paridad fija (BCEAO) |
| convertisseur-dollar-fcfa | propio (serie USD/XOF) | BCEAO |

## Datos

- 45 datos con 45 tramos verificados y 0 sin verificar, más 1 serie (USD/XOF). Fuentes primarias: Código General de Impuestos 2026 (apisiteweb.impots.bj), SGG (Código de Trabajo, decretos, Ley 2017-05) y BCEAO. Las cifras de las nuevas calculadoras se contrastaron en esta sesión con el texto del CGI 2026, del Código de Trabajo y de la Ley 2017-05.
- Valores fijos en código y no en datos: la redevance ORTB de 4 000 F del IS y del IBA (CGI art. 47 §6 y 64 §4).

## Alcance recortado a propósito

- Umbral de cifra de negocio de la TPS: lo fija un arrêté que no se leyó; el texto lo dice sin dar monto.
- Valores de adquisición de referencia de la plus-valía (art. 112): por arrêté, no leído.
- Atenuación del art. 126 para indemnización de fin de carrera: sólo se trata el decimotercer mes.

## Riesgos

1. `its-treizieme-mois` usa una lectura del art. 126 (11 meses habituales más el mes del pago). El texto no precisa cómo se arma el promedio de 12 meses; la página lo dice.
2. `convertisseur-dollar-fcfa` deja de ser publicable 10 días después del último punto de la serie si no corre el detector.
3. `check_motor` falla en una prueba ajena a bj (formato forint con ICU de Linux).
