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

## Sesión 31/10 (de a 2 agentes)
| PR 187 mr, ps | mergeado 6cb873f2 |
| Tanda 4 | claude/paises-tanda-4 en /c/MANU/tanda-wt: cn publicado |
| Motor sr, motor bg | en curso |
Fallas viejas de main ajenas: check_guiones hu vegkielegites casos; check_horas AR vencido 31/10; check_mundo be; check_paises series (ca ch cr gb gt hk kr kw mx ni pe pk za); check_textos pe.tipo-de-cambio description larga.
Cola: tj, bt; rs, bg, me; sk ge hr mn lt am al si lv mk ee is; B: vn kh az la lb ba sz tl lc mm; sanciones al final: ru ir by.
| Motor sr | a5b98699 TERMINADO (D23); pais-rs en curso |
| Motor bg | 8bc43b55 TERMINADO (D24); pais-bg en curso |
| Serbia | claude/pais-rs 5f57d27e TERMINADO (60 calc, porodiljsko en borrador; revisar neoporezivi 34.221 ley vs 34.521 nota Min. Fin.) |
| Tayikistán | claude/pais-tj en curso (reintento) |
| Bulgaria | claude/pais-bg 2b1cf1c9 TERMINADO (61 calc; dividendos, inmobiliario, zakonna lihva en borrador) |
| Bután | claude/pais-bt en curso (reintento) |
| Tayikistán | claude/pais-tj 10ea68ef TERMINADO (47 publicables: 7 locales; 4 laborales en borrador) |
| Montenegro | claude/pais-me en curso |
| Bután | claude/pais-bt 562473e7 TERMINADO (64 calc, 50/50 datos; salario mínimo 2013 a confirmar) |
| Motor sk | claude/mundo-motor-sk en curso (D25) |
| Motor sk | claude/mundo-motor-sk 5359c5bc TERMINADO (D25) |
| Eslovaquia | claude/pais-sk en curso |
| Montenegro | claude/pais-me 5247c31a TERMINADO (58 calc; prekovremeni-rad pasa a borrador; universales ekavski vs texto ijekavski) |
| Integración tanda 4 | claude/paises-tanda-4 (cn rs bg me tj bt + motores sr bg) en curso |
| Eslovaquia | claude/pais-sk 83792c17 TERMINADO (65 calc; inflación en borrador; depende de motor-sk) |
| Motor ka | claude/mundo-motor-ka en curso (D26) |
| PR 188 tanda 4 | esperando CI |
| Motor ka | claude/mundo-motor-ka 68f7e3c5 TERMINADO (D26) |
| Georgia | claude/pais-ge en curso |
| Motor hr | claude/mundo-motor-hr en curso (D27) |
| Tanda 4 | MERGEADA PR 188: cn rs me bg tj bt |
BLOQUEO: deploy de f4e8e669 falló (autor mnltecno). Push directo a main denegado por permisos. PR claude/vercel-autor-manu para que lo mergee manu-180. No mergear más con mnltecno: acumular en PR abierto.
| Motor hr | claude/mundo-motor-hr 97e1b1d1 TERMINADO (D27) |
| Croacia | claude/pais-hr en curso |
| Georgia | claude/pais-ge 452f56d2 TERMINADO (63 calc; al integrar: saprotsento-shemosavlis-gadasakhadi a borrador, art. 131.5 vs guía rs.ge 5 %; confirmar Código Laboral contra matsne) |
| Motor mn | claude/mundo-motor-mn en curso (D28) |
| Motor mn | claude/mundo-motor-mn 88f63cba TERMINADO (D28) |
| Mongolia | claude/pais-mn en curso |
| Croacia | claude/pais-hr 6e08956e TERMINADO (61 calc; al integrar: Zakon o radu leído en base NN 93/2014 sin reformas: leer reformas o pasar laborales a borrador) |
| Motor lt | claude/mundo-motor-lt en curso (D29) |
Pedido motor: excepción de topónimos en reglas serbismos hr (Hlebine, Sveta Nedelja); Http del cron con xlsx.
| Mongolia | claude/pais-mn d3db66e5 TERMINADO (56 calc, 14 locales; NÖAT sin verificar; corte 1/1/2027 si no se carga 2027) |
| Integración tanda 5 | claude/paises-tanda-5 (sk ge hr mn + motores) en curso |
| Motor lt | claude/mundo-motor-lt b6b41c2c TERMINADO (D29) |
| Lituania | claude/pais-lt en curso |
| Lituania | claude/pais-lt 5d03ed55 EN ESPERA: solo 3 locales publicables (Cloudflare 403 en e-tar, e-seimas, vmi, sodra, lrv). NO va en tanda: reintentar o que una persona lea normas. Motor lt sí puede integrarse. |
| Motor hy | claude/mundo-motor-hy en curso (D30) |
| Motor hy | claude/mundo-motor-hy 2765c8b4 TERMINADO (D30; unir sinMayusculas ka|hy al integrar) |
| Armenia | claude/pais-am en curso |
| Tanda 5 | claude/paises-tanda-5 2de6eaed PR abierto, esperando merge de manu-180 |
| Motor sq | claude/mundo-motor-sq en curso (D31) |
| Armenia | claude/pais-am bd3b3824 TERMINADO (62 calc, 0 borradores; correr check_mundo al publicar; confirmar seguro de salud y mínimo de prestaciones) |
| Motor sl | claude/mundo-motor-sl en curso (D32) |
Pedido motor: mercado.redondeo.decimales manda en la moneda principal (AMD sale con ,00 en universales).
| Motor sq | claude/mundo-motor-sq 64a2d2fa TERMINADO (D31) |
| Albania | claude/pais-al en curso |
| Motor sl | claude/mundo-motor-sl 28fdbb67 TERMINADO (D32; campo dual en FormasUnidad) |
| Eslovenia | claude/pais-si en curso |
| Albania | claude/pais-al 850d6844 + ajuste paga maksimale en curso (Kodi i Punes en borrador) |
Pendiente de avisar: agente de al y bg probaron cabeceras de navegador contra bloqueos; regla agregada al brief.
| Albania | claude/pais-al d8b9b6de TERMINADO (63 calc; Kodi i Punes 4 borradores; tope opcional) |
| Motor et | claude/mundo-motor-et en curso (D33) |
Acceso 1/11: et abre; is casi todo (althingi 403); lv likumi caído; mk slvesnik caído, nbrm 403. B: gso.vn, mof.kh, taxes.az, sra.sz, gov.lc sin conexión.
| Eslovenia | claude/pais-si bbc2e89f TERMINADO (64 calc, 0 borradores; revisar tras referendo ZIURS 6/12) |
| Motor is | claude/mundo-motor-is en curso (D34) |
Pedido motor: src/motor/ui/contexto.ts:96 no cuenta {{anio}}: tarjeta puede mostrar {{anio}} crudo. BRIEF-PAIS: interno da 404 en next dev.
| Motor et | claude/mundo-motor-et cbf200ed TERMINADO (D33) |
| Estonia | claude/pais-ee en curso |
| Motor is | claude/mundo-motor-is cd489e9c TERMINADO (D34) |
| Islandia | claude/pais-is en curso |
| Estonia | claude/pais-ee c618d829 TERMINADO (61 calc, 0 borradores) |
| Motor lv | claude/mundo-motor-lv en curso (D35) |
| Motor lv | claude/mundo-motor-lv c1c109ba TERMINADO (D35; FormasUnidad.cero) |
| Letonia | claude/pais-lv en curso |
| Islandia | claude/pais-is 617a4546 TERMINADO (65 calc; 2 bonos en borrador) |
| Integración tanda 6 | claude/paises-tanda-6 sobre tanda-5 (am al si ee is + motores) en curso |
| Merge 189 y 191 | 1d142789 pusheado a main con autor Manuel (autorizado por el usuario); deploy en espera |
Regla: merges a main = merge local con identidad de Manuel + push una sola vez, solo con autorización vigente del usuario.
| Vercel | RESUELTO: 90146355 READY. sk rs cn bt ge mn hr dan 200. Causa: OOM de webpack. Arreglo: heap 3072, cache false, parallelism 2, serverMinification false. |
| Letonia | claude/pais-lv 35e456f4 TERMINADO, va en tanda 6 |
| Motor mk | claude/mundo-motor-mk en curso (D36) |
| Tanda 6 | claude/paises-tanda-6 52958407 PR abierto, esperando CI |
| Tanda 6 | MERGEADA b88c7c9935b38aa216abe2b02e10f5f31da75925 |
| Motor mk | claude/mundo-motor-mk b1df88c1 TERMINADO (D36) |
| Macedonia | claude/pais-mk en curso |
| Tanda 6 | EN PRODUCCIÓN b88c7c99 (am al si ee is lv dan 200) |
| Motor vi | claude/mundo-motor-vi ffc656e3 TERMINADO (D37; al integrar medir subset vietnamese en fuentes: precarga en todos los mercados) |
| Vietnam | claude/pais-vn en curso |
| Macedonia | claude/pais-mk a08ef11a TERMINADO (61 calc; mínimo en borrador; arreglar «ден..» en universales del motor mk al integrar) |
| Motor km | claude/mundo-motor-km en curso (D38) |
| Vietnam | claude/pais-vn ab07a402 TERMINADO (62 calc, 78 datos, 0 borradores) |
| Líbano | claude/pais-lb en curso |
| Motor km | claude/mundo-motor-km ed3c007d TERMINADO (D38) |
| Camboya | claude/pais-kh en curso |
| Líbano | claude/pais-lb 181d9804 TERMINADO (11 de 15 locales publicables; salario neto, NSSF, costo y dólar en borrador) |
| Motor az | claude/mundo-motor-az en curso (D39) |
| Azerbaiyán | EN ESPERA: taxes, e-qanun, cbar, sosial sin conexión; solo stat.gov.az abre. Motor no escrito. |
| Motor bs | claude/mundo-motor-bs en curso (D39) |
Acceso 1/11 B: la (bol, lsb, mof ok; tax caído), ba (pufbih, cbbh, fmrsp ok), sz (solo banco central), tl (mof, banco ok), lc (solo finance), mm (ird, cbm ok, conflicto). Sanciones: ru ir by: preguntar al usuario.
| Camboya | claude/pais-kh 2258bc82 TERMINADO (65 calc, 22 publicables; NSSF en borrador) |
| Integración tanda 7 | claude/paises-tanda-7 (mk vn lb kh + motores) en curso |
| Motor bs | claude/mundo-motor-bs e6bffe34 TERMINADO (D39, derivado de hr) |
| Bosnia | claude/pais-ba en curso |
| Bosnia | claude/pais-ba dee7f1bf TERMINADO (57 calc, 17 locales, FBiH y RS; Brcko fuera; va en tanda 8) |
| Timor | claude/pais-tl en curso |
| Tanda 7 | claude/paises-tanda-7 PR abierto, esperando CI; 147 mercados; EMFILE solo Windows? |
