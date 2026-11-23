# Holdwellco: contexto completo da análise

> Nesta versão, as coletas brutas e os prints das lojas de referência ficam de fora. As citações a `coleta-*.json` e a prints dessas lojas registram de onde veio cada conclusão, e nada na execução depende desses arquivos.


Loja: holdwellco.com. Data: 2026-11-23. Tema atual: Dawn migraçao 16.1.1.

## Índice

1. Decisão e nota
2. Consertos
3. Achados técnicos
4. Mercado e referências
5. Marca
6. Loja nova e oferta
7. Mudanças
8. O que não foi medido

## Função de cada arquivo

- `INSTRUCOES-PARA-O-AGENTE.md`: ordem de execução e regras.
- `2-instrucoes-para-o-claude.md`: passo a passo detalhado, com o código.
- `3-codigo-do-tema/`: seções, snippets, assets e templates.
- `4-fotos-novas/`: prompts, foto real e referência.
- `5-loja-nova/`: desenho em HTML.
- `relatorio/` e `1-relatorio.pdf`: relatório do dono.
- `dados/`: dados brutos da pesquisa.
- `skill-shopify-dev/`: skill usada para o tema.

## 1. Decisão e nota

Nota 6.2 de 10. A oferta é honesta e o preço é forte, mas as avaliações e a promessa de rugas colocam a loja em risco.

O que já funciona:

- Nos kits de 2 e 3 máscaras a conta na tela fecha; falta conferir no carrinho.
- A página avisa que a máscara é cosmética e diz quem não deve usar.
- Frete, prazo e devolução de 30 dias aparecem perto do botão de comprar.

## 2. Consertos

### 1. Tire as avaliações que vieram de outro site

Hoje: Parte das avaliações tem imagens hospedadas no AliExpress e há textos em português com nomes americanos. Confira a origem no app BK Reviews.

Fazer: Abra o app de avaliações, confira a origem e apague todas que não vieram de clientes seus.

Por quê: O cliente pode desconfiar, e avaliação copiada pode derrubar a loja no Google.

Referência: solawave.co.

### 2. Tire a promessa de reduzir rugas

Hoje: A faixa da página do produto diz que a máscara reduz rugas e linhas finas.

Fazer: Troque a faixa por fatos: 7 modos de luz, 180 LEDs, sem fio, 10 minutos.

Por quê: Sem estudo que comprove, essa promessa pode reprovar a loja e os anúncios.

Referência: irish-supply.com.

### 3. Troque os nomes que falam de tratamento

Hoje: O menu mostra Recovery, e coleções e kit usam Recovery e Relief, palavras que soam como tratamento de saúde.

Fazer: Renomeie para Wind Down, Self-Care, Posture & Back Essentials e Comfort Kit. No Admin: Produtos, Coleções; menu em Loja virtual, Navegação.

Por quê: O Google lê esses nomes como promessa de saúde, mesmo fora da página da máscara.

Referência: undefined.

### 4. Troque a primeira foto da máscara

Hoje: A primeira foto parece uma selfie, tem pouca nitidez e marca d'água no canto.

Fazer: Coloque primeiro uma foto limpa da máscara e, em seguida, a máscara em uso.

Por quê: A primeira foto decide se o cliente confia no produto e continua na página.

Referência: lumenvira.com.

### 5. Mostre o preço real da oferta extra

Hoje: O massageador diz 20% de desconto, mas mostra $49.90, que é o preço normal dele.

Fazer: Mostre o preço com desconto, $39.92, ao lado do preço normal, se o desconto for real.

Por quê: Quando a conta não fecha, o cliente desconfia da oferta inteira.

Referência: solawave.co.

Depois dos consertos:

- Repita no carrinho o frete grátis e a devolução de 30 dias.
- Reduza o peso das imagens da página do produto para ela abrir mais rápido.
- Confira se o preço antigo do Complete Relief Kit é a soma real dos itens.
- Tire a oferta de 30 de novembro assim que a data passar.
- Mostre no carrinho a frase de tamanho só em produto que tem tamanho.
- Deixe uma oferta principal na tela, em vez de três ao mesmo tempo.
- Suba a barra fixa do celular para ela não cobrir o fim do rodapé.

Perguntas ao dono:

- De onde vieram as 335 avaliações que estão no app hoje?
- O desconto de 20% no massageador é aplicado de verdade no carrinho?
- Você tem algum documento do fornecedor sobre os 180 LEDs e a segurança da máscara?

## 3. Achados técnicos

# Achados internos: holdwellco.com (23/11/2026)

## Conferência do engenheiro-chefe
- Reviews: o render de 23/11 mostra 4.7 (335 Reviews) e 40 de 75 imagens da PDP no CDN aliexpress-media.com. O app BK Reviews (extensão bk-reviews-431) aparece no render, mas a coleta devolveu `apps: []` e não o detectou. A origem das avaliações não está provada: confirmar no Admin (app, importação, data de criação).
- Promessa: "Smooths the look of fine lines" e "Reduces the appearance of wrinkles" confirmadas no texto renderizado.
- Garantia e frete: a política de reembolso não foi lida (a coleta só confirma que ela existe), então "30-day money-back", 30 dias após a entrega e processamento de 1 a 3 dias úteis seguem não confrontados com a política publicada. Conferir antes de ligar `politica_confirmada`.
- Divergências não reconciliadas: Lumenvira ($174 no print, 99,99 na coleta) e Swirise (produto do print difere da coleta). Não usar esses preços como fato.
- Apeborn bloqueou prints (429) duas vezes; entrou só pelos dados da coleta. Quinta referência com print: Lumenvira.

Análise somente leitura, 23/11/2026. Mercado EUA, loja em inglês, tema Dawn 16.1.1. Caminhos de print são relativos a P (`analise-holdwellcocom-20261123`). Conteúdo de sites tratado como dado.

Convenção das provas: `AP/` = `auditoria/prints/`; `RP/<loja>/` = `pesquisa/prints/<loja>/`; `coleta` = `pesquisa/coleta-<loja>.json`; `VEL-home` e `VEL-pdp` = `qa/velocidade-holdwellco.com-home-mobile.json` e `-produto-mobile.json`. Fatias do print inteiro: `produto-390x844-inteira.jpg` (12.724 px de altura), citadas por faixa de y.

## 1. Notas por bloco (0 a 5, null = não medido)

Régua usada: a geral do dept 09 (5 = boa prática presente e provada; 4 = presente com falha pequena; 3 = correto com falha perceptível; 2 = falha que atrapalha a compra; 1 = falha grave que custa venda; 0 = ausente com prova; null = sem dado). Semáforo da decisão C2: 4 ou mais bom; 2,5 a 3,9 melhorar; abaixo de 2,5 ou qualquer P0 consertar. Velocidade pela decisão C1 (70 ou mais bom, 50 a 69 melhorar, abaixo de 50 consertar).

| Bloco | Peso | Nota | Semáforo | Critérios usados e motivo |
|---|---|---|---|---|
| marca_design | 5 | 3,5 | melhorar | MRC-04, MRC-07, MRC-08, MRC-22, MOB-13. Paleta, Fraunces + Inter e botões consistentes; contraste de texto calculado de `entrega/marca.json` (corpo ~6,7:1, botão ~11:1, rodapé ~7:1). Perde por foto hero de baixa resolução com marca d'água e mistura de estilos de foto (UGC, selfie, render de estúdio). |
| navegacao_busca | 10 | 3,5 | melhorar | NAV-01, NAV-11, NAV-13, NAV-22. Busca presente no cabeçalho de home, coleção, PDP e carrinho; menu desktop de 6 itens; "Filter and sort" na coleção. Coleções finas (1 produto) e menu mobile e busca não abertos. |
| pdp | 20 | 3,5 | melhorar | PDP-01, 02, 03, 04, 05, 11, 13, 16, 17. Acima da dobra no mobile: foto, nome, nota, preço e barra fixa de compra; frete e prazo ao lado do botão; 11 imagens; FAQ com 7 perguntas incluindo "Who shouldn't use it?". Perde por abertura genérica da descrição, foto hero fraca e a barra de selos de "appearance of wrinkles". |
| oferta | 15 | 3,5 | melhorar | OFE-05, 09, 12, 13, 14, 17. Conta dos pacotes correta, brinde com preço real, sem preço riscado no produto foco. Perde por add-on com preço ambíguo, três mecanismos de upsell na mesma tela e itens P0 não verificáveis (garantia x política, total 2 e 3 máscaras no carrinho). |
| prova_confianca | 15 | 1,5 | consertar (P0) | PROV-01, 02, 07, 04, 12, 14, 20. Indício forte de review importado (ver achado 1). Pontos a favor: 4 políticas existem, "Your Privacy Choices" no rodapé, e-mail de suporte. |
| retencao_pos_compra | 5 | null | sem_dado | Só a captura de e-mail "First to know" foi vista (AP/produto-390x844-3.jpg, fim). Página de agradecimento, e-mails, fluxos e rastreio não medidos (sem pedido de teste: TRAVA-16). |
| mobile | 10 | 4,0 | bom | MOB-01 a 05, 10, 11. `prints.json`: rolagem horizontal falsa e sem diálogo aberto em todas as páginas; barra fixa de compra; cabeçalho com logo, busca, conta e carrinho; texto de corpo legível. Perde por barra fixa cobrindo a última linha do rodapé e página de 12.724 px sem voltar ao topo visível. Alvo de toque por DOM não medido. |
| carrinho_checkout | 10 | 3,0 | melhorar | CHK-02 a 05, 08, 14. Só o carrinho com 1 máscara foi visto; checkout não aberto (regra). Botão dominante, PayPal e Google Pay expressos, remover item; perde por "shipping calculated at checkout" contra promessa de frete grátis, sem garantia no carrinho e texto de "size" que não se aplica. |
| velocidade_tecnica | 10 | 2,5 | melhorar | VEL-02, 04, 06, 10, 14, 15, 25. Lab mobile mediana de 3 rodadas: home 66, PDP 62; LCP 8.890 ms e 8.552 ms ("ruim"); TBT 9 e 184 ms; CLS 0 e 0,059. PDP com 9.121 KB e 320 requisições. Campo (CrUX): sem dado. |

Nota ponderada pelos pesos medidos: 3,1 de 5 (cobertura de 95% dos pesos; retencao_pos_compra fora, sem virar zero). Há P0 em prova_confianca e em promessa: o semáforo geral é consertar.

## 2. Achados

### P0

**A1. PROV-01, PROV-02, PROV-07 (TRAVA-01 e TRAVA-04): reviews com forte indício de importação.**
- A PDP mostra "4.7 (335 Reviews)" (`AP/produto-390x844.jpg`; `AP/produto-1440x900.jpg`). A distribuição 272/36/14/7/6 fecha em 335 e a média bate (4,68).
- Reviews em português numa loja em inglês para os EUA, com nomes americanos: "Eficiente, faz o que promete!" (Wayne Shaw), "É excelente qualidade e a entrega é rápida, TOP!" (Judy Washington). Prova: `AP/produto-390x844-inteira.jpg`, faixa y 6800 a 8500.
- Reviews de quem não usou ainda e com 5 estrelas: "Will give a better comment after using it", "I liked it but haven't used it yet", "I've only been using it for a short time, I still have no results", "I read very good reviews, I hope...". Prova: mesma imagem, faixa y 8500 a 10200.
- A página do produto baixa 1.484 KB de `aliexpress-media.com` (`VEL-pdp`, campo `detalhes.terceiros`), compatível com mídia de review hospedada no AliExpress.
- O que NÃO está provado: a origem do widget. `coleta-holdwellco.com.json` traz `apps: []`, então o app de reviews não foi detectado. Confirmar no Admin (app, importação, data de criação dos reviews). Se confirmada a importação, é veto: remover tudo e zerar contador e média.
- Como a melhor referência resolve: nenhuma referência dá modelo de review autêntico verificável. A mais limpa na PDP é Solawave, com app Okendo detectado (`coleta-solawave.co.json`, campo `apps`) e contagem 358 (`RP/solawave.co/produto-1440x900.jpg`).

**A2. TRAVA-11 e TRAVA-09: afirmação de efeito na faixa de texto da PDP.**
- Faixa rolante com "Reduces the appearance of wrinkles" e "...look of fine lines" (`AP/produto-1440x900-2.jpg`; `AP/produto-390x844-3.jpg`). Sem evidência na loja, e a mesma PDP declara "Cosmetic device, not a medical device". Redução de rugas é promessa de resultado.
- Como a melhor referência resolve: Irish Supply usa linguagem frouxa ("Supports smoother, healthier-looking skin in 10-minute sessions", `RP/irish-supply.com/produto-1440x900.jpg`) e Lumenvira descreve o ritual e o uso sem número de resultado no título (`RP/lumenvira.com/produto-1440x900.jpg`). Nenhuma das duas serve de licença para afirmar efeito.

**A3. TRAVA-11: "relief" e "recovery" na estrutura da loja (fora do produto foco).**
- Menu principal "Recovery" (`AP/produto-1440x900.jpg`), coleções "Recovery" e "Self-Care & Recovery" (`coleta-holdwellco.com.json`, campo `colecoes`), produto "Complete Relief Kit" (campo `produtos`) e a frase "Relief for a tight neck and shoulders after long days at the desk." (`AP/colecao-390x844.jpg`). O catálogo lista "relief" e "recovery" como palavras de alegação de saúde sem evidência.
- Como a melhor referência resolve: a mais próxima do tema cosmético, Solawave, nomeia o menu por categoria e função ("Shop All", "The Science", "Before & Afters", `RP/solawave.co/produto-1440x900.jpg`), mas apoia isso em claims que a Holdwell não pode usar (seção 5).

### P1

**A4. OFE-09, OFE-14: add-on "20% off" com preço ambíguo.** Mostra "$49.90" com "20% off when you add it to the mask" (`AP/produto-390x844-2.jpg`), mas $49,90 é o preço de tabela do produto (`coleta-holdwellco.com.json`, `led-neck-face-massager`, `preco_minimo` 49,9). Se o desconto vale, o preço final seria $39,92 e a tela não mostra. Melhor referência: Solawave mostra "$399 + FREE, Choose a 2nd item, free when it's the same price or less" com a regra escrita (`RP/solawave.co/produto-1440x900-inteira.jpg`, faixa y 800 a 1900); Lumenvira mostra "You save $173" por faixa (`RP/lumenvira.com/produto-1440x900-inteira.jpg`, faixa y 800 a 1900).

**A5. CHK-03, CHK-08, PROV-10: carrinho contradiz a promessa e não reforça confiança.** A PDP promete "Free US shipping from $49" e 30 dias de devolução, mas o carrinho com $59,99 diz "Taxes included. Discounts and shipping calculated at checkout" e não repete garantia nem prazo (`AP/carrinho-390x844.jpg`). Melhor referência: o carrinho da Solawave repete frete expresso, devolução de 100 dias e garantia de 1 ano em bloco próprio (`RP/solawave.co/carrinho-390x844.jpg`, carrinho vazio, bloco de rodapé do carrinho).

**A6. VEL-02, VEL-04: LCP de laboratório ruim.** Home 8.890 ms e PDP 8.552 ms (`VEL-home` e `VEL-pdp`, campo `lab_mediana.lcp_ms`), notas 66 e 62. O elemento LCP já está com `loading="eager"` e `fetchpriority="high"`; as partes mostram `elementRenderDelay` de 2.023 ms e 1.880 ms. Divergência: a soma das partes (~2,3 s) não fecha com a mediana (8,9 s), então o detalhe vem de uma rodada só. Causa do atraso de renderização não medida. Sem referência com velocidade medida nesta pesquisa: null.

**A7. VEL-10, VEL-15, VEL-31: peso e requisições da PDP.** 9.121 KB e 320 requisições na PDP; Shopify 6.031 KB e `aliexpress-media.com` 1.484 KB (`VEL-pdp`, campo `detalhes`). Home: 2.727 KB e 316 requisições (`VEL-home`). Referência de velocidade: null (não coletada).

**A8. PDP-22, MRC-22: hero com foto fraca.** A primeira imagem da galeria, a do hero e a do card da home é um enquadramento tipo selfie, de baixa resolução, com marca d'água "Holdwellco" no canto (`AP/produto-1440x900.jpg`, `AP/produto-390x844.jpg`, `AP/home-390x844.jpg`), ao lado de imagens de estúdio polidas na mesma galeria. Melhor referência: Lumenvira abre com packshot limpo e depois uso, escala e caixa (`RP/lumenvira.com/produto-1440x900.jpg`); Solawave idem (`RP/solawave.co/produto-1440x900.jpg`).

**A9. OFE-05 (verificar): "Complete Relief Kit" com preço comparado.** `preco_minimo` 99,9 e `preco_comparado` 139,79 (`coleta-holdwellco.com.json`). Os demais produtos não têm preço comparado. Só é legítimo se 139,79 for a soma real dos itens do kit; os componentes do kit não foram medidos. Melhor referência: nenhuma usa a soma dos itens de forma comprovável (Lumenvira usa comparado exatamente 2x o preço em 152 dos 196 produtos com comparado, padrão a não copiar, `coleta-lumenvira.com.json`).

### P2

- **A10. OFE-17:** três mecanismos de ticket na mesma tela (pacotes 2 e 3, brinde de guia, add-on) (`AP/produto-390x844-2.jpg`). Melhor referência: Solawave concentra em um (BOGO com brinde), `RP/solawave.co/produto-1440x900-inteira.jpg`.
- **A11. OFE-03 (confirmar):** "Offer ends Nov 30" é data fixa, não contador (`AP/produto-1440x900.jpg`). Se a oferta voltar depois de 30/11 sem mudança, vira escassez falsa. Contraste com o que não copiar: contadores de Swirise e Irish Supply (seção 5).
- **A12. COP-09:** carrinho diz "Need to change your size or add something to your order?" em produto sem tamanho (`AP/carrinho-390x844.jpg`).
- **A13. PDP-11, MOB-10:** a barra fixa cobre a última linha do rodapé ("© 2026 Holdwellco Powered by Shopify · Privacy policy") (`AP/produto-390x844-fim.jpg`).
- **A14. MRC-13:** ponto de "verificado" ao lado dos nomes dos reviews sem legenda (`AP/produto-390x844-inteira.jpg`, faixa y 6800 a 10200).
- **A15. PROV-22:** rodapé diz "About Holdwell" e o cabeçalho "Holdwellco" (`AP/produto-390x844-fim.jpg`). Comparar com Merchant e Ads: null.
- **A16. NAV-17, COP-12:** coleção "Neck & Shoulder" com 1 produto (`AP/colecao-390x844.jpg`; `coleta-holdwellco.com.json`, `colecoes`) e coleção `frontpage` com título em português "Página inicial" no catálogo (não visível nos prints: confirmar que não aparece ao cliente).
- **A17. VEL-25:** Google Fonts 84 KB como terceiro (`VEL-home`, campo `terceiros`). Fontes autohospedadas evitam a requisição externa.
- **A18. MOB-11:** nenhum botão de voltar ao topo nem sumário visível nos prints da PDP de 12.724 px (`AP/produto-390x844-inteira.jpg`).

## 3. O que a loja já faz bem

1. **Pacotes com conta certa e âncora honesta.** 2 máscaras: 2 x 59,99 = 119,98 riscado, 15% de desconto = 101,98 (50,99 cada); 3 máscaras: 179,97 riscado, 30% = 125,98 (41,99 cada). O produto de 1 máscara não tem preço comparado. Prova: `AP/produto-390x844-2.jpg`, `AP/produto-1440x900.jpg`; `coleta-holdwellco.com.json` (`led-glow-mask`, `preco_comparado` null). Brinde do guia digital com valor real: $14,90 bate com o produto `zeraya-glow-companion` (`preco_minimo` 14,9).
2. **Aviso de segurança e limites do aparelho.** "Cosmetic device, not a medical device. Results vary." na descrição, caixa com contraindicações (gravidez, epilepsia, fotossensibilidade, medicação) e FAQ "Who shouldn't use it?". Prova: `AP/produto-390x844-2.jpg`.
3. **Frete, prazo e devolução claros perto do botão, com barra fixa de compra no mobile.** "Free US shipping from $49. Ships in 1 to 3 business days, arrives 7 to 12 business days", "30-day returns from delivery" e barra fixa com preço. Prova: `AP/produto-390x844-2.jpg`, `AP/produto-390x844-inteira.jpg` (faixa y 5100 a 6800), `AP/produto-390x844.jpg`.

## 4. Tabela de oferta das referências

Valores lidos dos prints (indicados) e da coleta. `null` = não visto. Os prints de produto das referências cobrem uma tela e um recorte do print inteiro; o carrinho das cinco referências saiu vazio, então carrinho de referência é null. Tráfego e anúncios de `pesquisa/referencias.json` não provam venda.

| Loja (produto) | Quantidade com desconto | Kit | Brinde | Frete grátis | Garantia | Parcelamento | Preço | Preço comparado |
|---|---|---|---|---|---|---|---|---|
| Holdwellco (Zeraya LED Face Mask) | 2 un.: $101,98 (15%); 3 un.: $125,98 (30%) | Add-on Neck & Face Massager "20% off", exibido $49,90 | Guia digital ($14,90) nos pacotes de 2 e 3 | US a partir de $49 | 30 dias de devolução e "30-day money-back" (política não lida) | null | $59,99 | null (pacotes: 119,98 e 179,97) |
| solawave.co (Wrinkle Retreat Pro; `RP/solawave.co/produto-1440x900.jpg` e recorte) | Compre 1 leve 1 grátis (2º item de mesmo preço ou menor) | Escolha um 2º item | LightBoost Eye Cream ($44 de valor, igual ao preço no catálogo da coleta) | "Free Expedited Shipping"; carrinho: pedidos acima de $75 | Devolução de 100 dias; 1 ano de garantia | Affirm, a partir de $33,25/mês; HSA/FSA | $399 | null (coleta: 399 = 399) |
| swirise.com (LED Light Therapy Face Mask; `RP/swirise.com/produto-1440x900.jpg`) | null | Set da máscara: $359 | FirmCare Sheet Mask ($29,9 de valor) com barra "16% left" | "Free Shipping" (barra superior) | 1 ano de garantia; selo "Money-Back Guarantee" sem prazo visto; "90-day price guarantee" | Klarna e "flex" (HSA/FSA) nos ícones | $249 | $459 ("Save $210"); coleta do Laser & LED: $279 contra $719 |
| kenzzi.com (LED Light Therapy Mask; `RP/kenzzi.com/produto-390x844.jpg`) | null | Variante "LED Face Mask + Neck Kit" (preço null) | null | null | null | null | $449 | null. Botão é "buy now at walmart": sem checkout próprio |
| irish-supply.com (Dermalume 7-Colour; `RP/irish-supply.com/produto-1440x900.jpg` e recorte) | Níveis: Mask Only €69,95; Mask + Serum €84,95; Mask + Serum + 4 Collagen Masks €89,95 | Mask + Serum; Mask + Serum + Collagen Masks | Serum e máscaras de colágeno dentro dos níveis | Selo "Free Delivery" | Selos "14 days money back" e "100% satisfaction guaranteed" | null | €69,95 / €84,95 / €89,95 (moeda em euro para mercado US) | €129,95 / €149,95 / €159,95 (coleta: 69,95 e 159,95) |
| lumenvira.com (Glowence Aurelis 7 Colour; `RP/lumenvira.com/produto-1440x900.jpg` e recorte) | Compre 1: $174; compre 3: $443,70 total; compre 4: $556,80 total; nível de 2 un. coberto pela barra fixa: null | null | null | "Fast and Free Shipping" | "30 Day Return Guarantee" | null | $174 (coleta: mínimo 99,99, divergência não reconciliada) | $347; $1.041; $1.388 (coleta: 199,98). Comparado igual a 2x o preço em 152 dos 196 produtos com comparado |
| apebornfitness.com (Red Light Therapy Mask; só `coleta-apebornfitness.com.json`) | null | null | null | null | null | null | $149,99 | $299,99 (2x). 1 variante; apps: Google Tag Manager, Meta Pixel, Klaviyo, Gorgias, Loox; 4 políticas existem |

Ponto de leitura: o preço da Holdwell ($59,99) é o menor do conjunto, mas o mais próximo é Irish Supply, que roda desconto de $50 sobre comparado inflado. A oferta da Holdwell (pacote 2 e 3 com conta fechada) é a mais honesta do conjunto; o que as referências têm a mais e é comercial, não de claim, é parcelamento (Solawave, Swirise) e garantia mais longa (Solawave 100 dias).

## 5. Risco de promessa (categoria cosmética)

### Textos da Holdwell que prometem efeito (ver A2 e A3)
- "Reduces the appearance of wrinkles" e "...look of fine lines" na faixa da PDP: `AP/produto-1440x900-2.jpg`, `AP/produto-390x844-3.jpg`. Remover ou substituir por descrição de uso ("Seven light modes", "10 minutes at home").
- "Recovery", "Self-Care & Recovery", "Complete Relief Kit", "Relief for a tight neck and shoulders": menu, coleções, produto e subtítulo de coleção (A3).
- Sem problema como está: "Spa-style LED light", "Seven light modes", "Three steps to glow", "Your me-time, upgraded", "Cosmetic device, not a medical device. Results vary." e instruções de uso (3 a 5 vezes por semana, 10 a 15 minutos).
- Texto de review com promessa (ex.: "faz o que promete") entra no problema da A1, não é copy da loja.
- Não lido: respostas fechadas do FAQ, texto de "Shipping & returns", política de reembolso, página About, conteúdo do "Zeraya Glow Companion". Null.

### Afirmações das referências que a Holdwell NÃO pode copiar (sem prova na loja)
- **Solawave:** "FDA-Cleared", "Clinically proven to reduce fine lines & wrinkles", "Reduce your wrinkles in 30 days", "Awarded #1 Flexible LED Face Mask by Forbes", "Best Light Therapy Device" (The Strategist), "Loved by 726,000+ customers", "1.028+ clinicians recommend", "We are in 2.100+ U.S. retail stores" (Ulta, Nordstrom, Neiman Marcus), "71+ awards", "65mW/cm² irradiance, more than double the intensity of most competitors", dermatologistas e médicos como endossantes, tabela comparativa com Omnilux. Também só entra se a Holdwell realmente oferecer: devolução de 100 dias, 1 ano de garantia, HSA/FSA, Affirm, BOGO. Prova: `RP/solawave.co/produto-1440x900.jpg` e recorte, `RP/solawave.co/produto-390x844.jpg`, `RP/solawave.co/produto-390x844-inteira.jpg`.
- **Swirise:** "FDA-cleared"/"FDA-Registered", "Clinically tested wavelengths", "91% of users reported brighter, healthier-looking skin", "Firms and lifts sagging skin... after only 4-6 sessions", "Soothes redness and calms inflammation", "dermatologist-level treatment at home", "Clinicians' Choice, 1.259 clinicians", especificações de 595/630/850/1064 nm, 416 LEDs e 40 mW/cm², "2026 Lowest Price Guaranteed". Contador regressivo e barra "16% left" também não copiar. Prova: `RP/swirise.com/produto-1440x900.jpg` e recorte, `RP/swirise.com/produto-390x844.jpg`.
- **Kenzzi:** "Reverse Aging and finelines", estimula colágeno e elastina, "Reduce Acne", "reduce inflammation", "promote healing and rejuvenation", "targeting acne, redness and signs of aging", nota "5.0" sem contagem. Prova: `RP/kenzzi.com/produto-390x844-inteira.jpg` e recorte de `produto-1440x900-inteira.jpg`.
- **Irish Supply:** "139 (ou 145) people are viewing this right now", "Only 6 left in stock!" com barra, contador de Black Friday, pop-up "Someone purchased", preço comparado inflado (€129,95, €149,95, €159,95 com mesmo produto a €69,95 no catálogo). São escassez e prova social não comprovadas. Prova: `RP/irish-supply.com/produto-390x844.jpg` e recorte.
- **Lumenvira:** "(+10.000)" avaliações sem contagem real, "Buy 1 Get 50% Off" sobre comparado de 2x, depoimento único de "Hannah W", imagens de antes e depois e "Visibly Reduce Fine Lines & Wrinkles" nas miniaturas. Prova: `RP/lumenvira.com/produto-1440x900.jpg` e recorte; `coleta-lumenvira.com.json`.
- **Todas:** números técnicos (nm, mW/cm², contagem de LEDs) são do fornecedor de cada loja. Usar só o que o fornecedor da Holdwell documentar (a loja diz "180 LEDs" e "7 modes"; sem laudo na coleta).

## 6. Não medido (null)

- OFE-01 e OFE-02: política de reembolso não lida (coleta só confirma que existe); "30-day money-back guarantee" não confrontado com a política.
- OFE-09: carrinho só com 1 máscara; total real dos pacotes de 2 e 3 não conferido.
- OFE-08: prazo de 7 a 12 dias úteis e frete grátis x operação (sem acesso ao fornecedor).
- OFE-06: não se aplica (mercado EUA). OFE-07: feed e Merchant sem acesso.
- PROV-04: dos 335 reviews, 13 são de 1 e 2 estrelas e 14 de 3; nos primeiros 12 exibidos todos são de 5 estrelas. Se 1 a 3 estrelas aparecem depois de "Load more" não foi medido. PROV-06: origem do widget não confirmada (`apps` vazio).
- PROV-09, PROV-23 a 25: idade da loja, domínio no ar há 15 dias, redes e menções de marca.
- PROV-11, PROV-12, PROV-15, PROV-16, PROV-19: conteúdo de About, Contact e das políticas.
- VEL-01 (campo/CrUX), VEL-34 a 41 (robots, sitemap, JSON-LD de Product e de AggregateRating, canonical): sem coleta. Se houver AggregateRating no schema e os reviews forem importados, vira veto adicional (VEL-36).
- MOB-02, MOB-07, MOB-14 (alvo de toque e foco por teclado): sem medição de DOM. NAV-02, NAV-08 (menu mobile aberto e busca preditiva): não abertos.
- CHK-01 (feedback ao adicionar), CHK-12, CHK-14 a 16, CHK-18 e 21: checkout não aberto.
- Bloco retencao_pos_compra inteiro (RET-01 a RET-08).
- Velocidade das referências: não coletada; as comparações de velocidade ficam sem referência.
- Apeborn: prints bloqueados (429); só preço, comparado, apps e políticas da coleta.


## 4. Mercado e referências

# Análise de mercado: máscara facial de LED nos EUA

Leitura de design: página de produto premium para mulheres que compram um momento de autocuidado em casa, com linguagem calma e editorial, em Fraunces e Inter.

## Oferta das referências

| Loja | Quantidade ou kit | Brinde | Frete | Garantia ou devolução | Parcelamento | Preço |
|---|---|---|---|---|---|---|
| Solawave | Compre 1, leve 1 | Creme de $44 | Grátis acima de $75 | 100 dias, 1 ano de garantia | Affirm | $399 |
| Swirise | Máscara ou set de $359 | Sheet mask de $29,90 | Grátis | 1 ano de garantia | Klarna | $249, comparado $459 |
| Kenzzi | Variante com kit de pescoço | Sem dado | Sem dado | Sem dado | Sem dado | $449 |
| Irish Supply | 3 níveis de kit | Sérum e máscaras nos níveis | Grátis | 14 dias | Sem dado | €69,95 a €89,95 |
| Lumenvira | 1 a 4 unidades | Sem dado | Grátis | 30 dias | Sem dado | Divergente: $174 no print, $99,99 na coleta |
| **Holdwellco nova** | **1, 2 e 3 máscaras** | **Guia de $14,90 nos kits** | **Grátis a partir de $49** | **30 dias após a entrega** | Não tem | **$59,99** |

Mecanismo mais forte que cabe na loja: cartões por quantidade com preço por unidade e economia em dinheiro. Não copiamos o preço comparado inflado nem o contador.

## Melhor de cada uma

- **Solawave:** regra da oferta escrita perto do botão e tabela comparativa.
- **Swirise:** escolha em cartões e seções grandes de imagem.
- **Kenzzi:** respiro e pouca informação por tela.
- **Irish Supply:** sete cores bem explicadas e uso simples.
- **Lumenvira:** primeira foto limpa, quantidade em cartões e passos de uso.

## Percepção de valor

As referências sustentam preço com prêmio, estudo, médico e antes e depois. A Holdwellco não pode usar nada disso. O valor vem de preço 76% menor que o da Swirise, conta aberta nos kits, produto completo na caixa e clareza sobre prazo, devolução e limites do aparelho.

## Linguagem visual do segmento

- Foto: máscara acesa em fundo limpo, uso em casa e detalhe dos LEDs.
- Proporção: foto domina, com texto curto entre blocos.
- Fundo: claro e rosado nas marcas fortes, vermelho escuro nas agressivas.
- Tipografia: sem serifa na maioria. A Fraunces da marca é o diferencial editorial.
- Cartões e botões: cantos arredondados e botão em pílula.
- Ícones: traço fino.

## Altura no celular

| Loja | Home | Produto |
|---|---:|---:|
| Solawave | 11.602 | 24.672 |
| Swirise | 6.690 | 14.443 |
| Kenzzi | 4.404 | 3.491 |
| Irish Supply | 9.995 | 12.334 |
| Lumenvira | 13.148 | 13.859 |
| **Mediana** | **9.995** | **13.859** |


- solawave.co: Marca forte de máscara de LED, boa para estudar organização e oferta. https://solawave.co/products/wrinkle-retreat-pro-red-light-therapy-led-face-mask-infrared-fda-cleared
- swirise.com: Vende máscara de LED com anúncios no ar e página longa e visual. https://swirise.com/products/swirise-led-red-light-therapy-face-mask
- lumenvira.com: Vende máscara de 7 cores como a sua, com galeria limpa. https://lumenvira.com/products/glowence-led-light-face-mask-2
- irish-supply.com: Tem a máscara de preço mais próximo do seu, com kits por nível. https://irish-supply.com/products/dermalume-multi-colour-light-therapy-mask
- kenzzi.com: Loja focada em LED, com página curta e visual limpo. https://kenzzi.com/products/kenzzi-led-light-therapy-mask

## 5. Marca

# Marca v3: Holdwellco

**Posicionamento:** a máscara de LED sem fio para os dez minutos que são só seus, vendida com fatos e preço aberto.

**Personalidade:** calma, adulta, direta e honesta. Cuida sem prometer.

**Tom em inglês (5 títulos):**
- Ten quiet minutes. Seven lights.
- One mask. Seven lights.
- Three steps. One button.
- Built for the couch.
- Plain facts, no theater.

**Direção de arte**
- Luz: quente de abajur e fim de tarde, com o LED como ponto de cor.
- Contraste: verde petróleo profundo contra creme e pele. A cor forte vem da luz da máscara, nunca de caixas coloridas.
- Enquadramento: rosto em repouso em primeiro plano, arcos, escalas variadas e detalhe de LED e faixa. Sem antes e depois.
- Paleta: #1F3A3D e #16241F da marca, com creme #F3EEE8, pele #EEDFD3 e rosa #E2C5B4 derivados.
- Tipografia: Fraunces 300, grande, nos títulos e Inter no texto. Botão e etiquetas em pílula.


## 6. Loja nova e oferta

```json
{
 "ideia": "Dez minutos só seus: a Zeraya vira o ritual de fim de dia, vendida por fatos, enquanto as concorrentes vendem promessa de pele.",
 "melhor_de_cada": [
  {
   "loja": "solawave.co",
   "pegamos": "Regra da oferta escrita junto do botão e tabela comparativa"
  },
  {
   "loja": "swirise.com",
   "pegamos": "Escolha do conjunto em cartões com foto e seções grandes de imagem"
  },
  {
   "loja": "kenzzi.com",
   "pegamos": "Respiro, foto grande e pouca informação por tela"
  },
  {
   "loja": "irish-supply.com",
   "pegamos": "Sete cores explicadas e bloco simples de como usar"
  },
  {
   "loja": "lumenvira.com",
   "pegamos": "Primeira foto limpa, cartões por quantidade e passos de uso"
  }
 ],
 "oferta": {
  "titulo": "Kits de 1, 2 e 3 máscaras com a conta aberta",
  "itens": [
   "1 máscara: $59.99",
   "2 máscaras: $101.98, $50.99 cada, economia de $18.00, guia digital de $14.90 incluso, só se o dono aprovar marcar este kit ao abrir",
   "3 máscaras: $125.98, $41.99 cada, economia de $53.99, guia digital de $14.90 incluso, selo de menor preço por máscara",
   "Adicional depois do botão: Neck & Face Massager a $49.90, sem desconto exibido",
   "Frete grátis nos EUA a partir de $49; envio em 1 a 3 dias úteis; chegada em 7 a 12 dias úteis; devolução de 30 dias após a entrega",
   "Sem contador, sem estoque falso e sem preço riscado"
  ],
  "precisa_confirmar": [
   "Testar no carrinho os totais de 2 máscaras ($101.98) e 3 máscaras ($125.98).",
   "Confirmar que o guia de $14.90 sai sozinho nos kits de 2 e 3. A capa diz \"free gift with your order\", o que vale para qualquer pedido.",
   "Massageador a $49.90, sem o texto de 20% até o dono confirmar se o desconto existe.",
   "Tirar a oferta de Black Friday e o aviso de 30/11. A página nova afirma que não há contador.",
   "Conferir o preço comparado de $139.79 do Complete Relief Kit. A frase \"One real price\" depende disso.",
   "Pedir ao fornecedor o documento dos 180 LEDs e da segurança da máscara.",
   "Marcar o kit de 2 ao abrir a página só se o dono aprovar.",
   "Aprovar a tabela \"Many LED mask stores\" contra Holdwellco.",
   "Decidir a origem das 335 avaliações. A seção fica vazia até existir avaliação de pedido real.",
   "Ligar o formulário de e-mail ao serviço usado pela loja."
  ]
 },
 "secoes": {
  "home": [
   {
    "nome": "aviso",
    "frase": "Frete e devolução numa linha."
   },
   {
    "nome": "cabecalho",
    "frase": "Logo, menu e carrinho."
   },
   {
    "nome": "hero",
    "frase": "Título grande e leve com rosto em arco."
   },
   {
    "nome": "fatos",
    "frase": "Os quatro fatos em linha."
   },
   {
    "nome": "ritual",
    "frase": "Foto grande na cama com frase ao lado."
   },
   {
    "nome": "modos",
    "frase": "As sete cores com pílulas."
   },
   {
    "nome": "retrato",
    "frase": "Arco com foto provisória da própria loja."
   },
   {
    "nome": "passos",
    "frase": "Como usar em três passos."
   },
   {
    "nome": "detalhes",
    "frase": "Três fotos em escalas diferentes."
   },
   {
    "nome": "caixa",
    "frase": "Conteúdo, preço e botão."
   },
   {
    "nome": "oferta",
    "frase": "Lista de 1, 2 e 3 máscaras."
   },
   {
    "nome": "comparacao",
    "frase": "Como a loja vende, sem teatro."
   },
   {
    "nome": "linha",
    "frase": "Outros produtos, só em texto."
   },
   {
    "nome": "avaliacoes",
    "frase": "Espaço reservado e vazio."
   },
   {
    "nome": "garantias",
    "frase": "Frete, prazo e devolução."
   },
   {
    "nome": "perguntas",
    "frase": "Dúvidas em abas fechadas."
   },
   {
    "nome": "cuidado",
    "frase": "Aviso cosmético e contraindicações."
   },
   {
    "nome": "cadastro",
    "frase": "E-mail."
   },
   {
    "nome": "rodape",
    "frase": "Políticas e contato."
   }
  ],
  "produto": [
   {
    "nome": "aviso",
    "frase": "Frete e devolução numa linha."
   },
   {
    "nome": "cabecalho",
    "frase": "Logo, menu e carrinho."
   },
   {
    "nome": "compra",
    "frase": "Galeria, preço, pílulas, kits, botão e adicional."
   },
   {
    "nome": "fatos",
    "frase": "Os quatro fatos."
   },
   {
    "nome": "ritual",
    "frase": "Foto grande em uso."
   },
   {
    "nome": "modos",
    "frase": "As sete cores com pílulas."
   },
   {
    "nome": "passos",
    "frase": "Como usar."
   },
   {
    "nome": "leds",
    "frase": "180 LEDs de perto."
   },
   {
    "nome": "semfio",
    "frase": "USB-C e sem fio."
   },
   {
    "nome": "ajuste",
    "frase": "Faixa ajustável."
   },
   {
    "nome": "retrato",
    "frase": "Arco com foto provisória da própria loja."
   },
   {
    "nome": "caixa",
    "frase": "Conteúdo, preço e botão."
   },
   {
    "nome": "comparacao",
    "frase": "Como a loja vende."
   },
   {
    "nome": "guia",
    "frase": "Capa tipográfica do guia de $14.90."
   },
   {
    "nome": "oferta",
    "frase": "Kits perto do fim."
   },
   {
    "nome": "entrega",
    "frase": "Linha do tempo do pedido."
   },
   {
    "nome": "cuidado",
    "frase": "Aviso e contraindicações."
   },
   {
    "nome": "avaliacoes",
    "frase": "Espaço reservado e vazio."
   },
   {
    "nome": "perguntas",
    "frase": "Dúvidas em abas."
   },
   {
    "nome": "linha",
    "frase": "Outros produtos, só em texto."
   },
   {
    "nome": "cadastro",
    "frase": "E-mail."
   },
   {
    "nome": "rodape",
    "frase": "Políticas e contato."
   }
  ]
 },
 "acima_das_referencias": "Aprovada às cegas na volta 1: 9 de premium e 9 de segmento, contra Solawave 7 e 8 e Swirise 3 e 4."
}
```

## 7. Mudanças

### M1 (admin_manual, todas): Conferir a origem das 335 avaliações no app BK Reviews e remover todas que não vieram de clientes reais da loja, na página do produto e na coleção.

Por quê: O widget carrega 40 imagens do AliExpress e mostra textos em português com nomes americanos. As estrelas também aparecem na página da coleção. Avaliação importada engana o cliente e arrisca a aprovação no Google.

Como: Pedir ao dono para abrir o app no Admin e exportar a lista com origem e data. Mostrar quantas têm pedido real ligado. Só depois do sim dele, remover as importadas. Não apagar nada sem o sim. Não esconder só por CSS.

Pronto quando: A página do produto e a coleção mostram apenas avaliações ligadas a pedidos reais, ou nenhuma estrela e nenhum contador se não houver.

Precisa do sim do dono: sim

### M2 (tema, produto): Remover da faixa da página do produto as frases sobre rugas e linhas finas.

Por quê: A loja não tem evidência desse efeito e a própria página declara que o aparelho é cosmético.

Como: No tema duplicado, o template product.<sufixo>.json nasce só com fatos: 7 light modes, 180 LEDs, Cordless USB-C, 10 minutes a day. Não usar reduce, wrinkles, fine lines, collagen, acne, anti-aging, heal, treat ou clinically.

Pronto quando: A busca por wrinkle e fine lines no texto renderizado da prévia devolve zero.

Precisa do sim do dono: não

### M3 (admin_manual, todas): Renomear Recovery, Self-Care & Recovery, Posture & Back Relief e Complete Relief Kit para nomes sem promessa de tratamento, e trocar a descrição da coleção que começa com "Relief for a tight neck and shoulders".

Por quê: Relief e recovery são lidos como alegação de saúde, no nome e na descrição.

Como: Propor ao dono nomes únicos, sem repetir nenhuma coleção que já existe: Recovery para Wind Down; Self-Care & Recovery para Self-Care; Posture & Back Relief para Posture & Back Essentials (a coleção Posture & Back já existe); Complete Relief Kit para Complete Comfort Kit. Na descrição da coleção, trocar "Relief for a tight neck and shoulders after long days at the desk." por uma frase de uso, como "Massagers for long days at the desk." (conferir a descrição de cada coleção renomeada). Mudar só títulos, descrições e menu, manter os handles para não quebrar links. Vale ao vivo, então só com o sim.

Pronto quando: Menu, coleções, descrições de coleção e título do kit não têm relief nem recovery, nenhuma coleção repete o nome de outra, e os links antigos continuam abrindo.

Precisa do sim do dono: sim

### M4 (produto, produto): Trocar a primeira foto da galeria por holdwell-mascara-led-perfil-lateral-fundo-creme.webp, uma foto limpa da máscara sem marca d'água, e usar a foto em uso como segunda.

Por quê: A foto atual parece selfie e tem baixa resolução.

Como: A galeria do desenho é feita de blocos da seção gb-compra: o bloco b1 usa o arquivo holdwell-mascara-led-perfil-lateral-fundo-creme.webp e a foto do criado-mudo passa a ser o b2. A mídia do produto na loja só muda com o sim do dono: mostrar a lista, esperar o sim, subir e reordenar a mídia para essa foto ficar em primeiro. Foto de produto vale no Google na hora.

Pronto quando: A primeira foto no celular e no computador é nítida, sem marca d'água e mostra a máscara real.

Precisa do sim do dono: sim

### M5 (preco, produto): Mostrar o preço real da oferta extra do massageador.

Por quê: A tela diz 20% off e mostra $49.90, que é o preço cheio.

Como: Perguntar ao dono se o desconto é aplicado no carrinho. Se sim, mostrar $39.92 e o preço normal $49.90. Se não, tirar o texto de 20% off e manter $49.90.

Pronto quando: O preço da tela é igual ao do carrinho com os dois itens.

Precisa do sim do dono: sim

### M6 (tema, carrinho): Repetir no carrinho o frete grátis acima de $49 e a devolução de 30 dias, e mostrar a frase sobre mudar o tamanho só quando o carrinho tiver produto com opção de tamanho.

Por quê: O carrinho hoje não confirma o que a página do produto prometeu e fala de tamanho para uma máscara que não tem tamanho.

Como: No tema duplicado, abrir os arquivos do carrinho do Dawn (sections/main-cart-footer.liquid, sections/main-cart-items.liquid e snippets/cart-drawer.liquid; se a frase não estiver neles, procurar em locales/en.default.json ou no app que a injeta). Acrescentar um bloco abaixo do total usando os termos da política publicada. Mostrar a frase de tamanho só se algum item tiver produto com opção de tamanho (o Posture Corrector tem 10 variantes); com a máscara, que não tem tamanho, ela não aparece.

Pronto quando: O carrinho com 1 máscara mostra frete grátis e 30 dias, sem falar de tamanho. Com o Posture Corrector, a frase de tamanho continua aparecendo.

Precisa do sim do dono: não

### M7 (tema, produto): Deixar uma oferta principal na primeira tela: 1 máscara e o botão, com os cartões de 2 e 3 máscaras só depois do sim do dono.

Por quê: Três ofertas juntas confundem o cliente.

Como: Com os kits desligados (estado normal deste pacote, não é divergência do desenho), a primeira tela mostra nome, preço de $59.99 e o botão. Os cartões de $101.98 (2 máscaras) e $125.98 (3 máscaras) só entram depois do sim do dono e dos totais conferidos no carrinho: criar os 2 descontos automáticos (15% e 30%), conferir o endsAt e os totais, e só então ligar kits_confirmados nas seções gb-compra e gb-oferta. Sem desconto automático, a tela diria $101.98 e o carrinho cobraria $119.98. O guia entra como item do cartão só se o carrinho o entregar, e o massageador desce para depois do botão. A promoção nasce desligada no tema.

Pronto quando: Com os kits desligados, a primeira tela do celular mostra nome, preço, 1 máscara e botão, sem parágrafo antes do botão. Os cartões só aparecem depois do sim e dos totais conferidos no carrinho.

Precisa do sim do dono: sim

### M8 (tema, produto): Reduzir o peso da página do produto.

Por quê: A página tem 9 MB e 320 requisições, e demora para mostrar a foto principal.

Como: Usar image_url com largura certa e srcset, carregar sob demanda tudo abaixo da primeira tela e não carregar as imagens externas do widget de avaliações.

Pronto quando: A prévia baixa menos da metade do peso atual no celular.

Precisa do sim do dono: não

### M9 (preco, produto): Conferir o preço comparado do Complete Relief Kit e a data da oferta de 30 de novembro.

Por quê: Preço antigo só vale se for real, e oferta com data não pode voltar depois de vencer.

Como: Somar os itens do kit e comparar com $139.79. Mostrar ao dono. Tirar o preço comparado se não fechar. Remover o aviso da oferta quando a data passar.

Pronto quando: O preço comparado é a soma real dos itens, ou está vazio, e nenhuma oferta vencida aparece.

Precisa do sim do dono: sim

## 8. O que não foi medido

- Não abrimos a finalização de compra nem fizemos pedido de teste.
- Não vimos os e-mails e o que acontece depois da compra.
- Não testamos no carrinho o total dos kits de 2 e 3 máscaras.
- A loja Apeborn bloqueou os prints, então entrou só com o preço dela.
- O tema não foi renderizado na loja real. Testar editor, variantes, carrinho e cabeçalho na prévia.
