# Tema Holdwellco: código do desenho aprovado

Base: Dawn 16.1.1. Nada aqui foi enviado para a loja. Nenhum `index.json` nem `product.json` foi tocado.

## Arquivos (`tema/`)
- `sections/gb-*.liquid`: 25 seções, uma por `<!-- secao: nome -->` do desenho, na mesma ordem. Home usa 19, produto usa 22. As repetidas (fatos, ritual, modos, passos, retrato, caixa, comparação, oferta, cuidado, avaliações, perguntas, linha, cadastro, rodapé) são o mesmo arquivo com textos diferentes no JSON.
- `snippets/gb-assets.liquid` (fontes, CSS, JS), `gb-foto.liquid` (foto com recorte), `gb-icon.liquid`, `gb-aviso-editor.liquid` (aviso que só aparece no editor).
- `assets/gb-loja.css` e `assets/gb-loja.js`.
- `templates/index.gb-zeraya.json` e `templates/product.gb-zeraya.json`.

## Prévia
Copiar os arquivos para um tema duplicado (nunca o publicado) e abrir, com o id da cópia no lugar de `<id>`:
- `/?view=gb-zeraya&preview_theme_id=<id>`
- `/products/led-glow-mask?view=gb-zeraya&preview_theme_id=<id>`

Sem `preview_theme_id` a prévia abre o tema publicado, que não tem esses arquivos. Em loja com senha, digite a senha antes no mesmo navegador. Nos links entre páginas da prévia (por exemplo, home para produto) os parâmetros se perdem: abra cada página pelo endereço acima.

Os templates `index.gb-zeraya.json` e `product.gb-zeraya.json` não substituem nada. Quem ativa o desenho é o passo final abaixo, só com o sim do dono.

A faixa de cabeçalho e o rodapé do Dawn são escondidos por CSS só nas páginas que usam as seções `gb-cabecalho` e `gb-rodape`.

## Kits de 2 e 3 máscaras (o que precisa ser confirmado)
- O JS da loja atual só envia `{id, quantity}` ao carrinho e mostra o preço do kit calculado no navegador. O banner da loja fala de desconto automático até 30/11 ("No code needed"). Não foi possível conferir o carrinho real (a loja devolveu 429 nas consultas).
- Por isso os kits nascem desligados: `kits_confirmados` falso nas seções `gb-compra` e `gb-oferta`. Desligado, a página mostra só 1 máscara pelo preço do produto.
- Quando ligados, a conta é a mesma no Liquid e no JS: `arredondar(preço x quantidade x (100 - desconto) / 100)`, com 15% para 2 e 30% para 3. Com $59.99: 2 máscaras $101.98 e 3 máscaras $125.98.
- O tema não cobra nada: ele adiciona 2 ou 3 unidades da mesma variante pelo Ajax (`/cart/add.js`) e abre a gaveta do Dawn. Quem dá o desconto é o desconto automático da loja. Se ele sair do ar (termina em 30/11), o carrinho cobra preço cheio e a tela mostraria preço errado.
- Para ligar: criar os 2 descontos automáticos (15% em 2, 30% em 3, sem código, sem data de fim) ou renovar o atual, conferir o `endsAt` e os totais $101.98 e $125.98 no carrinho, e só então ligar `kits_confirmados` nas duas seções, com os mesmos percentuais. Sem o desconto automático, a tela diria $101.98 e o carrinho cobraria $119.98.
- Com os kits desligados, a página mostra 1 máscara e o botão. Isso é o estado normal deste pacote e não é divergência do desenho: os cartões de 2 e 3 só aparecem depois do sim do dono e dos totais conferidos no carrinho.
- Cada cartão da seção `gb-oferta` marca a quantidade na seção de compra (link com `?qty=N` ou clique, lido por `gb-loja.js`). Com os kits desligados, os cartões nem aparecem e nada muda.
- O guia digital incluso (`guia_confirmado`) também precisa vir da loja, como brinde ou desconto. O código do tema não coloca o guia no carrinho. Nasce desligado.
- Kit 2 marcado ao abrir só se o dono aprovar: `kit_inicial` nasce em 1.

## Travas (tudo nasce desligado)
| Seção | Opção | O que depende |
|---|---|---|
| `gb-aviso` | `ativo` | texto de frete e devolução bate com a política publicada |
| `gb-compra` | `kits_confirmados`, `guia_confirmado`, `politica_confirmada`, `adicional_ativo`, `descricao_confirmada` | carrinho com desconto automático; política; preço do massageador ($49.90, sem desconto exibido); descrição do produto revisada |
| `gb-oferta` | `kits_confirmados`, `guia_confirmado`, `politica_confirmada` | igual à compra |
| `gb-garantias`, `gb-entrega` | `politica_confirmada` | frete grátis a partir de $49, envio em 1 a 3 dias úteis, chegada estimada em 7 a 12, devolução 30 dias |
| `gb-perguntas` | `politica_confirmada`, `guia_confirmado` | as perguntas de entrega, devolução e guia só aparecem ligadas |
| `gb-guia` | `guia_confirmado` | guia incluso nos kits |
| `gb-comparacao` | `ativo` | "One real price" depende do preço comparado de $139.79 do kit completo e da oferta com data de Black Friday; as frases dizem que não há contador |
| `gb-avaliacoes` | `ativo` | só com avaliação de pedido real (plano M1) |
| `gb-cadastro` | `ativo` | o título promete novidades; usa o formulário nativo de cliente |

Nem promoção, nem contador, nem selo de política nova existem no código.

## Menu do celular, contato e rastreio
O cabeçalho tem menu para o celular (`<details>`, sem JavaScript obrigatório) com os mesmos links do menu de cima mais Contact e Track Order. Os dois últimos, e os links de mesmo nome no rodapé, vêm de campos `url` das seções `gb-cabecalho` e `gb-rodape`. Nasceram vazios e vazio esconde o link, porque a coleta da loja não achou página de contato nem de rastreio (só as quatro políticas). Preencha com páginas que já existem.

## Descrição do produto e dados estruturados
- `gb-compra` escreve `{{ product | structured_data }}` em JSON-LD. Este modelo de produto não usa a seção `main-product` do Dawn, então não duplica.
- A descrição do produto pode aparecer num bloco fechado ("Product details"), atrás de `descricao_confirmada`, que nasce desligado. Revise a descrição no Admin antes de ligar: a coleta de 23/11 viu uma descrição sem a promessa de rugas, mas o texto pode ter outras partes. Se ela repetir a promessa de rugas e de linhas finas que o plano M2 manda tirar, deixe desligado.
- Adicional com mais de uma variante (o massageador tem 2): aparece o nome da variante no rótulo e um seletor logo abaixo.

## Avaliações
A seção `gb-avaliacoes` não carrega o widget do app (BK Reviews) e não esconde nada por CSS. O widget atual pode injetar estrelas por conta própria em outros blocos do tema: conferir na prévia e desligar o app embed no editor se aparecer. A origem das 335 avaliações atuais é decisão do dono.

## Fotos
Todas as imagens usam `shopify://shop_images/<arquivo>` com os nomes reais do CDN (Configurações > Arquivos). As fotos originais têm texto gravado, então cada seção traz o campo "Recorte" (x, y, largura, altura em %) com a área limpa. Ao trocar a foto, apague o campo Recorte.

Posições marcadas "trocar" no desenho, que ficam com foto provisória da própria loja até haver foto nova:
1. Retrato da home: usa a foto de carregamento USB-C recortada.
2. Retrato do produto: usa a foto do sofá.
3. Primeira foto da galeria (a selfie com marca d'água sai): entra `holdwell-mascara-led-perfil-lateral-fundo-creme.webp`, e a foto do criado-mudo passa a ser a segunda. A galeria do tema é feita de blocos da seção `gb-compra`; a mídia do produto só muda com o sim do dono (plano M4).
4 e 5. Duas fotos do massageador na ficha dele: ficam fora deste código, a troca é no produto.

## O que precisa do dono
- Desconto automático dos kits e conferência dos totais no carrinho.
- Guia digital incluso: como entra no carrinho.
- Preço de $49.90 do massageador adicional, sem texto de 20% até confirmar se o desconto existe.
- Tirar a oferta de Black Friday e o aviso de 30/11 das outras partes da loja.
- Preço comparado do kit completo ($139.79) antes de ligar a tabela de comparação.
- Documento do fornecedor sobre os 180 LEDs e a segurança da máscara.
- Aprovar "Many LED mask stores" contra Holdwellco na tabela.
- Origem das avaliações (M1).
- Para onde vai o e-mail do cadastro (serviço de e-mail da loja).
- Frete, prazo e devolução: conferir que as políticas publicadas seguem iguais.

## Passo final: ativar o desenho (só com o sim do dono)
Nada abaixo acontece sem o "sim". Antes, a prévia da cópia precisa estar conferida, no celular e no computador.
1. Na cópia do tema (nunca no publicado), guarde o `templates/index.json` original em `otimizacao/original/` e grave nele o conteúdo de `templates/index.gb-zeraya.json`. Isso só vale ao vivo quando a cópia for publicada.
2. Aplicar o `templateSuffix` `gb-zeraya` ao produto `led-glow-mask` (`productUpdate`, confira o campo em shopify.dev). Atenção: o sufixo é um campo do produto e vale para todos os temas. O tema publicado hoje não tem `product.gb-zeraya.json`, então ele cai no modelo padrão; no instante em que a cópia for publicada, a página do produto passa a usar o desenho novo. Aplicado com o tema publicado já contendo o arquivo, a mudança vale ao vivo na hora. Por isso, aplique junto da publicação e anote o sufixo antigo em `otimizacao/volta-atras.md`.

## Validação
`shopify theme check` (CLI 4.9.4) numa cópia do Dawn 16.1.1 com estes arquivos: 0 erros e nenhum aviso nos arquivos `gb-*`. As fontes (Fraunces e Inter) vêm do Google Fonts: a regra RemoteAsset está desligada com comentário no snippet `gb-assets`.
