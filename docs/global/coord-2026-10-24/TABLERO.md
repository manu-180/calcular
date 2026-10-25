# Tablero del coordinador (24/10/2026)

| Frente | Rama | Base | Estado |
|---|---|---|---|
| Motor eu (núcleo nb fi) | claude/mundo-motor-eu | origin WIP | en curso |
| Motor ar (núcleo y venta) | claude/mundo-motor-ar | origin WIP | en curso |
| Universales pl | claude/mundo-trad-pl | motor-eu | en curso |
| Universales sv | claude/mundo-trad-sv | motor-eu | TERMINADO 4d66bb20 (41, 4497 casos) |
| Universales da | claude/mundo-trad-da | motor-eu | en curso |
| Corea del Sur | claude/pais-kr | origin | en curso |
| Costa de Marfil | claude/pais-ci | origin WIP | en curso |
| Túnez (fr) | claude/pais-tn | origin WIP | en curso |
| Angola | claude/pais-ao | origin WIP | en curso |
| Universales sv | claude/mundo-trad-sv | motor-eu | TERMINADO 4d66bb20 (41, 4497 casos) |
| Universales da | claude/mundo-trad-da | motor-eu | TERMINADO 8ba88bf0 (41, 4330 casos) |
| Uganda | claude/pais-ug | origin WIP | en curso |

Cola: edicion-us-es, trad-nb y trad-fi (cuando motor-eu tenga nb/fi), trad-ar (cuando motor-ar cierre), jm mu rw mt (en), motores id bn tr th uk ro cs el hu he ...
| Universales pl | claude/mundo-trad-pl | motor-eu | TERMINADO 6072a9d1 (41, 4330 casos; tsc rojo por núcleo) |
| Edición us-es | claude/edicion-us-es | origin WIP | en curso |
| Motor eu | claude/mundo-motor-eu | origin WIP | TERMINADO 738b5e15 (núcleo 5 idiomas, D9, zz-*) |
| Motor id | claude/mundo-motor-id | origin/main | en curso (núcleo + universales) |
| Motor ar | claude/mundo-motor-ar | origin WIP | TERMINADO 778db5db (núcleo, venta, D10) |
| Universales ar | claude/mundo-trad-ar | motor-ar | en curso |
| Costa de Marfil | claude/pais-ci | origin WIP | TERMINADO 30d670aa publicar ci (58 calc, 36/36 datos) |
| Polonia | claude/pais-pl | motor-eu + trad-pl | en curso |

Fallas ajenas recurrentes: check_hreflang ~900 (series de inflación vencidas en otros países), check_ofertas_intl 15 (cl UF). Candidato a frente de arreglo.
| Angola | claude/pais-ao | origin WIP | TERMINADO e38224e8 publicar ao (60 calc, 46 datos) |
| Arreglos transversales (hreflang, UF cl, pt europeo en África) | claude/mundo-arreglos-2026-10-24 | origin/main | en curso |
| Motor id | claude/mundo-motor-id | origin/main | TERMINADO b13930b5 (núcleo+venta+41 univ, D11, ruta gaji-di-dunia) |
| Indonesia | claude/pais-id | motor-id | en curso |

Numeración ADR: D9 eu, D10 ar, D11 id. Próximos motores: D12 tr, D13 th, D14 bn, D15 uk, D16 ro, ... (asignar en el encargo).
Pendiente motor-eu: ruta /[mercado]/<slug mundo> para pl sv da nb fi (id la creó; eu no).
| Túnez (fr) | claude/pais-tn | origin WIP | TERMINADO 53fcb7c1 (59 calc, smig en borrador: JORT 2026-67 no legible) |
| Motor tr | claude/mundo-motor-tr | origin/main | en curso (D12) |
| Universales ar | claude/mundo-trad-ar | motor-ar | TERMINADO b7aad46f (41, 4664 casos) |
| Egipto | claude/pais-eg | trad-ar | en curso |
| Edición us-es | claude/edicion-us-es | origin WIP | TERMINADO 454513da publicar us-es (63 calc, trato tú) |
| Arabia Saudita | claude/pais-sa | trad-ar | en curso |
Aviso: us.cpi-u se queda sin valores recientes antes del 23/11 (inflación us deja de publicarse).
| Uganda | claude/pais-ug | origin WIP | TERMINADO d9ab3863 publicar ug (60 calc, stamp duty en borrador) |
| Motor th | claude/mundo-motor-th | origin/main | en curso (D13) |
| Corea del Sur | claude/pais-kr | origin | TERMINADO 3ebee634 publicar kr (62 calc, 53 datos; revisión nativa pendiente) |
| Motor bn | claude/mundo-motor-bn | origin/main | en curso (D14) |
| Motor tr | claude/mundo-motor-tr | origin/main | TERMINADO 872dd98c (núcleo+venta+41 univ, D12) |
| Turquía | claude/pais-tr | motor-tr | en curso |
| Arreglos | claude/mundo-arreglos-2026-10-24 | origin/main | TERMINADO 05971bfa (hreflang, UF cl, pt europeo, 3 decimales; check-all 150/150) |
| Motor uk | claude/mundo-motor-uk | origin/main | en curso (D15) |
Series sin fuente: ni.ipc (agosto sin publicar, sale el 25/10), us.cpi-u (BLS 503, vence a inicios de nov), kw.cpi (~31/10, sin detector).
| Motor bn | claude/mundo-motor-bn | origin/main | TERMINADO 6642698f (núcleo+venta+41 univ, D14, dígitos bengalíes) |
| Bangladés | claude/pais-bd | motor-bn | en curso |
Pedido al motor: fin de semana por país (vie-sáb en bd, países árabes) para dias-entre-fechas y sumar-dias.
| Polonia | claude/pais-pl | motor-eu + trad-pl | TERMINADO d32b745c (64 calc, 42 datos; cargar valores 2027 antes del 1/1) |
| Motor uz | claude/mundo-motor-uz | origin/main | en curso (D16) |
| Arabia Saudita | claude/pais-sa | trad-ar | TERMINADO 39fca76f (59 calc, rasum al-murafiqin en borrador) |
| Jordania | claude/pais-jo | trad-ar | en curso |
| Motor th | claude/mundo-motor-th | origin/main | TERMINADO b6a07ac4 (incluye calendario/horas/rankings/sueldos de main) |
| Puesta al día motor eu + rutas mundo + trad pl/sv/da | claude/mundo-motor-eu | | en curso |
Main avanzó 28 commits (calendario, horas, rankings, sueldos reales): cada motor necesita puesta al día (BRIEF-ACTUALIZAR-MOTOR). Pendientes: ar, id, tr, bn (eu en curso; th ya incluye).
| Egipto | claude/pais-eg | trad-ar | TERMINADO bed8874b (62 calc, dólar CBE en borrador por 403) |
| Puesta al día motor ar + trad-ar | claude/mundo-motor-ar | | en curso |
| Motor uk | claude/mundo-motor-uk | origin/main | TERMINADO 77abd933 (D15, incluye rankings/horas/calendario/sueldos) |
| Ucrania | claude/pais-ua | motor-uk | en curso |
| Indonesia | claude/pais-id | motor-id | TERMINADO 8b8d237c (62 publicables, 58 datos; zakat en borrador; UMP 12/38 provincias) |
| Motor ru (para kz) | claude/mundo-motor-ru | origin/main | en curso (D17) |
| Motor uz | claude/mundo-motor-uz | origin/main | TERMINADO d5bef51d (D16, incluye páginas globales de main) |
| Uzbekistán | claude/pais-uz | motor-uz | en curso |
| Bangladés | claude/pais-bd | motor-bn | TERMINADO 130851d1 (59 calc; dólar en borrador) BLOQUEADO hasta puesta al día motor-bn |
| Puesta al día motor bn + merge en bd | claude/mundo-motor-bn | | en curso |
Regla: cada puesta al día de motor mergea también en sus países (eu→pl, ar→trad-ar→eg/sa/jo, bn→bd; faltan id→pais-id, tr→pais-tr).
| Turquía | claude/pais-tr | motor-tr | TERMINADO 05b1113b (60 calc, 19 datos) BLOQUEADO hasta puesta al día motor-tr |
| Puesta al día motor tr + merge en tr | claude/mundo-motor-tr | | en curso |
check-all ahora tiene 154 suites; mes_en_render (páginas (ar)) y panel_sql (Supabase) fallan en main también.
| Motor ru | claude/mundo-motor-ru | origin/main | TERMINADO 8c8e8683 (D17; plural.ts choca con eu y uk) |
| Kazajistán (ru) | claude/pais-kz | motor-ru | en curso |
| Puesta al día motor eu | claude/mundo-motor-eu | | TERMINADO e371d144 (+ rutas mundo eu; mergeado en trad-pl/sv/da y pais-pl) |
| Universales nb y fi | claude/mundo-trad-nb, claude/mundo-trad-fi | motor-eu e371d144 | en curso |
| Jordania | claude/pais-jo | trad-ar | TERMINADO 069da939 (59 calc; dinar-usd y registro de tierras en borrador) |
Pendiente: puesta al día de claude/mundo-arreglos con main nuevo (módulos nuevos arman hreflang con locale crudo, sin etiquetaIdioma()).
| Motor ro (ro y md) | claude/mundo-motor-ro | origin/main | en curso (D18) |
| Universales nb y fi | claude/mundo-trad-nb 9f8c32a4, claude/mundo-trad-fi 6fcbbbd1 | motor-eu | TERMINADO |
| Suecia | claude/pais-se | motor-eu + trad-sv | en curso |
| Puesta al día motor tr | claude/mundo-motor-tr | | TERMINADO 2ab6593a; pais-tr mergeado 854bb3cf (tsc 0) |
| Puesta al día motor id + merge en pais-id | claude/mundo-motor-id | | en curso |
Fallas ajenas de main hoy: hreflang (inflación), ofertas_intl (cl), mes_en_render ((ar)), panel_sql (ca_sueldos).
| Ucrania | claude/pais-ua | motor-uk | TERMINADO 899c3a4a (62 calc, 28 datos/81 tramos) |
| Motor cs | claude/mundo-motor-cs | origin/main | en curso (D19) |
| Motor ro | claude/mundo-motor-ro | origin/main 7d190a68 | TERMINADO abdbf938 (D18; md necesita simbolos MDL) |
| Rumania | claude/pais-ro | motor-ro | en curso |
Idea: rama de integración de motores (eu, ar, id, tr, bn, th, uk, uz, ru, ro, cs...) para resolver una vez los choques (plural.ts, FormasUnidad, resultadosPocos/De, IDIOMAS, Record).
| Puesta al día motor bn | claude/mundo-motor-bn | | TERMINADO 6955756d; pais-bd 8291f333 (tsc 0, desbloqueado) |
| Dinamarca | claude/pais-dk | motor-eu + trad-da | en curso |
| Puesta al día motor ar | claude/mundo-motor-ar 7d9ed77b | | TERMINADO; trad-ar 88bc6692, eg 85839187, sa 7cdfb46c, jo 43643bb5 |
| Arreglos al día con main (+panel_sql, mes_en_render) | claude/mundo-arreglos-2026-10-24 | | en curso |
| Uzbekistán | claude/pais-uz | motor-uz | TERMINADO 1b3dec5a (60 calc; kurs CBU en borrador) |
| Noruega | claude/pais-no | motor-eu + trad-nb | en curso |
| Motor cs | claude/mundo-motor-cs | origin/main 286ecb06 | TERMINADO 9601eb6b (D19) |
| Chequia | claude/pais-cz | motor-cs | en curso |
| Puesta al día motor id | claude/mundo-motor-id c2186ba6 | | TERMINADO; pais-id 60b0d424 (tsc 0) |
| Motor el (gr, cy) | claude/mundo-motor-el | origin/main | en curso (D20) |
| Kazajistán (ru) | claude/pais-kz | motor-ru | TERMINADO 9542d287 (62 calc, 45 datos; normas leídas vía web.archive.org de adilet) |
| Finlandia | claude/pais-fi | motor-eu + trad-fi | en curso |
| Arreglos al día | claude/mundo-arreglos-2026-10-24 | main 286ecb06 | TERMINADO 968dade2 (check-all 155/155) |
| Motor hu | claude/mundo-motor-hu | origin/main | en curso (D21) |
| Suecia | claude/pais-se | motor-eu + trad-sv | TERMINADO b7e7cec9 (64 calc, 48 datos, 290 kommuner) |
| Motor he (RTL) | claude/mundo-motor-he | motor-ar recomendado | en curso (D22) |
| Motor el | claude/mundo-motor-el | origin/main 286ecb06 | TERMINADO 629378ca (D20) |
| Grecia | claude/pais-gr | motor-el | en curso |
| Rumania | claude/pais-ro | motor-ro | TERMINADO 47546087 (60 calc, 55 publicables; 5 en borrador por legislatie.just.ro inaccesible) |
| Integración de motores | claude/mundo-idiomas-integrado | origin/main + arreglos + 12 motores + 6 trad | en curso |
| Noruega | claude/pais-no | motor-eu + trad-nb | TERMINADO e137ec28 (61 calc, 52 datos) |
| Jamaica | claude/pais-jm | origin/main | en curso |
| Dinamarca | claude/pais-dk | motor-eu + trad-da | TERMINADO 48a0404e (62 calc, 55 datos, 98 kommuner) |
| Mauricio | claude/pais-mu | origin/main | en curso |
| Motor hu | claude/mundo-motor-hu | origin/main | casi terminado 710b3fb6 (D21, zz-hu) |
| Hungría | claude/pais-hu | motor-hu | en curso |
| Motor hu | claude/mundo-motor-hu | origin/main | TERMINADO 710b3fb6 (D21, tegezés) |
| Motor he | claude/mundo-motor-he | motor-ar | TERMINADO 4388c295 (D22, og-rtl) |
| Israel | claude/pais-il | motor-he | en curso |
main avanzó: 777a00d3 arregla check_panel_sql (#85). Avisado a integración (grupo 6: hu, he + origin/main).
| Chequia | claude/pais-cz | motor-cs | TERMINADO 67840d40 (61 calc, 46 datos/80 tramos) |
| Motor sr (rs, me) | claude/mundo-motor-sr | origin/main | en curso (D23) |
| Finlandia | claude/pais-fi | motor-eu + trad-fi | TERMINADO 67f6d7db (63 calc, 58 datos, 308 kunnat) |
| Motor bg | claude/mundo-motor-bg | origin/main | en curso (D24) |
