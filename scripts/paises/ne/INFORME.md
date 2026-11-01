# Informe del país: Níger (ne)

Fecha: 2026-10-29. Idioma fr (fr-NE), trato usted, XOF, Africa/Niamey, escala 600. Estado: interno.

## Calculadoras

| Slug | Concepto | Estado | Nota |
|---|---|---|---|
| calcul-its | impuesto-renta | publicable | Barème mensuel del art. 150 CGI (ordonnance 2025-44). Solo el barème sobre el revenu net imposable: sin abattements ni cotisations |
| taxe-transferts-argent | propio | publicable | TDTA 0,5 %, 5 % sobre 2 000 000 F. El texto no precisa si el 5 % toca todo el monto; se aplica a todo y se avisa en observaciones |
| taxe-paiements-numeraire | propio | publicable | 1 %, exento hasta 100 000 F |
| taxe-jeux-de-hasard | propio | publicable | 15 % recettes brutes, 35 % marge brute (cote fixe) |
| droit-commande-publique | propio | publicable | 5 % público, 2 % privado, bons de commande < 1 000 000 F exentos |
| droits-conservation-fonciere | propio | publicable | Art. 1041 CGI: derechos proporcionales y fijos |
| convertisseur-euro-fcfa | propio | publicable | 655,957 (BCEAO) |
| convertisseur-dollar-fcfa | propio | publicable | Serie BCEAO, media compra y venta |
| calcul-tva | iva | borrador | Tasa 19 % no verificada en el CGI vigente |
| smig | salario-minimo | borrador | 42 000 F anunciado, decreto no leído |

Universales: todas (40). Total 50 calculadoras. No hay sueldo neto local (sin datos verificados), por lo que no entra en `mundo`.

## Datos

Verificados (fuente primaria, leídos el 2026-10-29): todo lo que sale de la ordonnance n° 2025-44 del 31/12/2025 (finances.gouv.ne, PDF bajado y leído con pdftotext): barème ITS, TDTA, taxe sur paiements en numéraire, jeux, droit de commande, derechos fonciers. Paridad del euro y cotización del dólar: bceao.int.

No verificados:
- ne.tva (19 %): impots.gouv.ne no responde (503 y sin conexión). El 19 % se lee en el art. 226 del CGI de 2012 copiado en niger.eregulations.org, pero un nuevo CGI rige desde 2026-01-01 (numeración distinta) y no se pudo leer.
- ne.smig (42 000 F): comunicado del Consejo de Ministros del 22/10/2025 habla de un proyecto de decreto y de «taux horaire», sin fecha de vigencia. Decreto publicado no encontrado.

No cargados por falta de fuente primaria legible: CNSS (cnss.ne no publica tasas ni topes), Código del Trabajo (preaviso, vacaciones, indemnización, horas extra), abattements del ITS (frais professionnels, charges de famille), impuesto de sociedades, IRCM, contribución foncière. Por eso no hay sueldo neto, costo empleador ni calculadoras laborales.

## Pendientes y riesgos

- Ordonnance n° 2026-45 (primera rectificación de la ley de finanzas 2026, finances.gouv.ne, archivo 1351) es un escaneo sin texto: no se pudo leer. Puede modificar el barème ITS o las tasas nuevas. El detector `ne.finances-ordonnances` avisa de ordenanzas nuevas, pero esta ya figura como «leída» en su lista: revisar a mano.
- La fecha de vigencia de los arts. 394 bis a 394 noniesdecies (creación) se asume 2026-01-01 por ser parte de la ley de finanzas del año budgétaire 2026.
- La URL de la fuente es la página de descarga del ministerio (formulario Phoca), no un enlace directo al PDF.
- Serie del dólar: un solo punto cargado; vence a los 10 días hasta que el cron la actualice.
- Palabras propias bajo el objetivo de 220 en los dos convertidores (aviso, no falla).

## Detectores

`ne.finances-ordonnances` (norma, página Lois de finances del ministerio) y `ne.bceao-dollar` (serie, home de la BCEAO; el patrón se probó contra la home real: «Dollar us 586,250 593,250»).
