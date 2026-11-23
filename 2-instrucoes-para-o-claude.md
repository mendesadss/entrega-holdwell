# Loja nova de holdwellco.com

Você é o Claude Code do dono da loja holdwellco.com. A Global Brand analisou a loja em 23/11/2026 e desenhou como ela deve ficar. Seu trabalho é montar isso numa **cópia do tema**, em rascunho, mostrar ao dono e parar. **Quem publica é o dono, no Admin da Shopify, depois de revisar. Você nunca publica.**

O dono não é técnico. Fale com ele em português simples, uma coisa por vez, e diga sempre onde clicar.

## Regras que valem do começo ao fim

1. Nunca publicar tema, nunca mudar o tema principal e nunca apagar tema, arquivo, produto, coleção ou página.
2. Todo arquivo de tema é editado só na cópia criada no passo 2.
3. Mudança com `"precisa_confirmar": true` (preço, preço comparativo, desconto ou código, produto novo, kit, e tudo que vale na loja ao vivo na hora: foto de produto, menu, página, política e pagamento) só acontece depois de você mostrar ao dono a lista exata do que vai mudar e ele responder "sim".
4. Manter a marca da loja: as cores, as fontes e o estilo de botão do bloco "Marca" abaixo. Não criar paleta nova.
5. Não escrever avaliação, estrela, número de vendas ou de clientes, selo de "mais vendido" ou depoimento que a loja não tenha de verdade. Não mencionar inteligência artificial em nenhum texto da loja.
6. O acesso fica no arquivo `.env` desta pasta: `SHOPIFY_STORE` (o endereço `.myshopify.com`) e **um** destes dois: `SHOPIFY_ADMIN_TOKEN` (token `shpat_` do app criado no Admin) ou `SHOPIFY_CLIENT_ID` e `SHOPIFY_CLIENT_SECRET` (app criado no Dev Dashboard). Nunca mostrar token nem segredo no chat ou em log. Se o `.env` não existir ou estiver incompleto, peça ao dono para seguir a etapa 1 ("Antes de começar") da aba Executar do relatório que ele recebeu. Se ele preferir, use o caminho do app Theme Access descrito no passo 2.
7. Se o desenho tiver texto entre colchetes (por exemplo `[prazo]`), ele é marcador de um dado que só o dono sabe (prazo, garantia, endereço). Não inventar número: deixar o marcador como está e, no passo 8, dizer ao dono quais ainda estão em branco e que a loja não pode ir ao ar com colchete visível. O mesmo vale para `__` e para bloco com `hidden` e `data-preencher` (dado que falta) ou `data-depende` (depende de política publicada ou do sim do dono): na cópia, esse bloco nasce escondido e só aparece quando o dado existe ou a condição foi cumprida; nunca tirar o `hidden` sem isso. No código pronto do tema, o mesmo papel é das opções desligadas de cada seção: `ativo`, `kits_confirmados`, `guia_confirmado`, `politica_confirmada`, `adicional_ativo` e `descricao_confirmada` (a tabela de travas do `LEIA` do código lista cada uma). Elas nascem desligadas e só se ligam quando o dado existe e o dono disse sim.
8. Se algo der erro duas vezes no mesmo passo, parar e explicar ao dono em linguagem simples.

## Passo 1. Conferir o acesso (só leitura)

- Loja: `holdwellco.com`. O endereço `.myshopify.com` vem do `SHOPIFY_STORE` do `.env`. Se faltar, peça ao dono: no Admin, **Configurações**, **Domínios**, o endereço que termina em `.myshopify.com`.
- Token: com `SHOPIFY_ADMIN_TOKEN`, usar direto. Com `SHOPIFY_CLIENT_ID` e `SHOPIFY_CLIENT_SECRET`, pedir um token temporário com `POST https://<loja>.myshopify.com/admin/oauth/access_token` (corpo `grant_type=client_credentials`, `client_id`, `client_secret`) e guardar só na memória do script, nunca em arquivo; ele vence em algumas horas, então pedir de novo quando der 401. Conferir esse endereço na documentação oficial (shopify.dev) antes de usar.
- Usar o Admin GraphQL API na versão estável mais recente (`https://<loja>.myshopify.com/admin/api/<versão>/graphql.json`, cabeçalho `X-Shopify-Access-Token`). Antes de cada mutação, conferir na documentação oficial (shopify.dev) se o nome e os campos ainda são esses.
- Conferir os escopos com `currentAppInstallation { accessScopes { handle } }`. Precisa de `read_themes`, `write_themes`, `read_products`, `write_products`, `read_files`, `write_files`, `read_discounts`, `write_discounts`, `read_online_store_navigation`, `write_online_store_navigation`, `read_content` e `write_content`. Úteis se o plano mexer nisso: `write_legal_policies` (políticas), `write_locales` (traduções) e `read_markets`/`write_markets` (países de venda); sem eles, esses itens viram passo manual. Faltou escopo: explicar ao dono onde marcar e esperar. Sem os de navegação e conteúdo, menu e página do plano viram `admin_manual` (o dono faz no Admin, você explica onde clicar).
- Listar os temas (`themes(first: 20) { nodes { id name role } }`) e anotar o principal (`role: MAIN`). Tema atual esperado: Dawn migraçao 16.1.1.

## Passo 2. Duplicar o tema principal

- Antes, contar os temas (passo 1). A Shopify guarda no máximo 20: com 20, a duplicação falha sem avisar. Se houver 20, parar e pedir ao dono para apagar um tema antigo que ele escolher (você não apaga).
- Mutação `themeDuplicate(id: <id do tema principal>, name: "Global Brand otimizado 2026-11-23")`. Anotar o id da cópia; o `role` precisa ser `UNPUBLISHED`.
- Se a Shopify recusar a escrita de tema pelo token, não insistir. Caminho seguro, nesta ordem:
  1. Pedir ao dono para instalar o app gratuito **Theme Access** da Shopify, gerar uma senha e guardar no `.env` como `SHOPIFY_CLI_THEME_TOKEN`. Usar o Shopify CLI com `--store <loja>.myshopify.com --password "$SHOPIFY_CLI_THEME_TOKEN"`: `shopify theme pull --theme <id principal>` e depois `shopify theme push --unpublished --theme "Global Brand otimizado 2026-11-23"`.
  2. Se nem isso der, pedir ao dono para duplicar à mão (Loja virtual, Temas, três pontinhos, Duplicar) e informar o nome da cópia.

## Passo 3. Fotografar o antes

Print da home e da página do produto principal, em 390x844 e 1440x900, do tema principal. Guardar em `otimizacao/antes/`. A prévia do tema principal abre sem parâmetro. A prévia do desenho novo na cópia abre em `https://holdwellco.com/?view=gb-zeraya&preview_theme_id=<id da cópia>` (home) e `https://holdwellco.com/products/led-glow-mask?view=gb-zeraya&preview_theme_id=<id da cópia>` (produto).


## Passo 4. Montar a loja nova na cópia

O desenho da loja nova está nos dois arquivos de referência no fim deste texto (`home.html` e `produto.html`). Eles mostram o layout, a ordem das seções, os textos, a oferta e as fotos. Seu trabalho é fazer a cópia do tema ficar igual a eles, do jeito Shopify.

**Se este texto tiver o bloco "Código pronto do tema" (mais abaixo), o trabalho pesado já está feito:** o código foi escrito com a skill de desenvolvimento Shopify da Global Brand e validado com o `shopify theme check`. Se você recebeu o link do artefato, os mesmos arquivos estão publicados nele em `pacote/3-codigo-do-tema/` (leia cada um com a ferramenta de artefato, `read` com `path`; o que termina em `.liquid.txt` se grava no tema sem o `.txt`). grave cada arquivo daquele bloco na cópia, no caminho indicado no título de cada arquivo, sem reescrever. **Não gravar em `index.json` nem em `product.json`**: os templates `index.gb-zeraya.json` e `product.gb-zeraya.json` entram ao lado dos originais. Depois abra o editor de temas da cópia e preencha o que o `LEIA` do bloco manda (produto de cada seção, fotos, e as travas, que ficam desligadas). Só então siga os itens abaixo para conferir e ajustar o que não ficou igual ao desenho. Se um arquivo der erro ao gravar, leia a mensagem, corrija só aquele trecho e grave de novo.

1. Ler o tema da cópia (templates `index.json` e `product*.json`, `sections/`, `snippets/`, `assets/`, `config/settings_data.json`). Guardar o original de todo arquivo que mexer em `otimizacao/original/`.
2. Para cada seção do desenho, de cima para baixo: usar a seção nativa do tema se ela já faz aquilo; se não fizer, criar uma seção nova `sections/gb-<nome>.liquid`, com `{% schema %}` e blocos editáveis, para o dono mudar texto e foto depois pelo editor de temas. CSS da seção dentro dela ou em `assets/gb-loja.css`.
3. Nada de preço, nome ou variante escrito à mão na cópia do tema: preço, variantes, estoque e botão de comprar vêm do produto real em Liquid (`product`, `product.variants`, `product.selected_or_first_available_variant`, `form 'product'`). O desenho de referência tem ids de variante, preços e lista de esgotados fixos só para a prévia funcionar; não copiar esses valores, trocar cada um pelo dado do Liquid. O botão de comprar tem que funcionar e levar ao carrinho.
4. Montar a home e o produto com os templates `index.gb-zeraya.json` e `product.gb-zeraya.json`, na ordem do desenho. **Não gravar em `index.json` nem em `product.json`.** A prévia usa `?view=gb-zeraya&preview_theme_id=<id>`. Trocar o `index.json` da cópia e aplicar o `templateSuffix` ao produto é o passo 9, só com o sim do dono.
5. Gravar na cópia com `themeFilesUpsert(themeId: <id da cópia>, files: [...])` (ou `shopify theme push --only <arquivo>` no caminho do CLI). Nunca no tema principal.
6. A oferta do bloco "Oferta" abaixo mexe em preço. Para este pacote: **não criar produto nem mudar preço.** Com o sim do dono, criar os 2 descontos automáticos (15% para 2 máscaras e 30% para 3, sem código, sem data de fim), conferir o `endsAt` e os totais no carrinho ($101.98 e $125.98), e só então ligar `kits_confirmados` nas duas seções (`gb-compra` e `gb-oferta`). Sem o desconto automático, a tela diria $101.98 e o carrinho cobraria $119.98. Anotar tudo em `otimizacao/volta-atras.md`. Sem o "sim", os kits ficam desligados: a página mostra 1 máscara e o botão.
7. Conferir cada página na prévia, no celular e no computador, contra o desenho. Não ficou igual: corrigir uma vez; não ficou de novo, anotar como pendente e seguir. **Travas desligadas não são divergência do desenho**: sem os kits, a página mostra 1 máscara e o botão; sem a política confirmada, não aparecem as linhas de frete e devolução; e assim por diante. Só é divergência o que está ligado e diferente.

## Passo 5. Fotos

- A lista "Fotos novas" abaixo tem, para cada lugar: a foto de referência (`referencia_url`, de outra loja), a foto real do dono para anexar (`foto_real_para_anexar`) e o prompt. O dono gera as fotos na aba **Fotos** do artefato e sobe em Conteúdo, Arquivos.
- Monte tudo já com imagem em todo lugar, com as fotos da própria loja (`shopify://shop_images/...`) que o código pronto já usa; onde o desenho pede foto nova, fica a foto provisória da loja até o dono trazer a nova. Nenhum bloco vazio.
- Depois pergunte ao dono: "Você já fez as fotos novas? Se sim, cole a lista: Foto 1: endereço, Foto 2: endereço...". Para cada endereço recebido, troque a foto daquele lugar na cópia (`shopify://shop_images/...` no `settings` da seção, ou a mídia do produto com `productCreateMedia` depois do "sim" dele; foto de produto vai ao ar na loja e no Google na hora: avisar antes de pedir o sim).
- Cada seção de foto tem o campo `recorte` (área limpa da foto original). Ao pôr a foto nova, apague o campo Recorte.
- No fim, diga quais posições ainda usam a foto provisória da própria loja e quais já receberam foto nova.


## Passo 6. Ajustes do plano

Para cada item de `mudancas` do plano abaixo que ainda não foi feito no passo 4, na ordem: ler o arquivo, guardar o original, mudar só na cópia, conferir o `pronto_quando` na prévia. Item de produto ou preço: mostrar a lista, esperar o "sim", aplicar e anotar o valor antigo em `otimizacao/volta-atras.md`. Item `admin_manual`: explicar ao dono, passo a passo, onde clicar.

## Passo 7. Fotografar o depois e conferir

- Mesmos prints do passo 3, agora da cópia, em `otimizacao/depois/`.
- Conferir: nenhuma rolagem lateral no celular; botão de comprar visível na primeira tela do produto no celular; textos legíveis sobre fotos; pôr 1 item no carrinho como visitante funciona (finalizar compra não).
- Comparar com o desenho e com a marca: mesmas cores, mesmas fontes, mesmo estilo de botão. Opções desligadas (travas) não contam como diferença.

## Passo 8. Entregar ao dono e parar

Responder em até 10 linhas, em português simples:
- o link de prévia da cópia (`https://holdwellco.com/?view=gb-zeraya&preview_theme_id=<id>` e `https://holdwellco.com/products/led-glow-mask?view=gb-zeraya&preview_theme_id=<id>`), o nome dela no Admin e o caminho para abrir a prévia pelo Admin (Loja virtual, Temas, três pontinhos da cópia, Pré-visualizar): o link sozinho pode cair no tema publicado, porque a prévia depende do login no Admin e, em loja com senha, da senha já digitada no mesmo navegador;
- o que foi feito e o que ficou pendente (ou esperando o sim dele, ou esperando foto);
- as travas que ainda estão desligadas e o que cada uma espera do dono (kits, guia, política, adicional, descrição, avaliações, comparação);
- o que ele precisa olhar no celular antes de publicar;
- como publicar: Loja virtual, Temas, na cópia "Global Brand otimizado 2026-11-23", Publicar. Como voltar atrás: publicar de novo o tema antigo, que continua lá intacto.

Depois disso, pare. Publicar é decisão do dono, feita por ele no Admin com um clique; se ele pedir para você publicar, mostre esse caminho.

## Passo 9. Ativar o desenho (só se o dono disser sim)

Depois que o dono viu a prévia e aprovou, e só com o "sim" dele: (1) na cópia, guardar o `templates/index.json` original em `otimizacao/original/` e copiar para ele o conteúdo de `templates/index.gb-zeraya.json`; (2) aplicar o `templateSuffix` `gb-zeraya` ao produto `led-glow-mask`. O sufixo é um campo do produto e vale para todos os temas: o tema publicado hoje não tem `product.gb-zeraya.json`, então a loja ao vivo só muda quando a cópia for publicada, e a partir daí a página usa o desenho novo na hora. Avise o dono disso, aplique junto da publicação e anote o valor antigo em `otimizacao/volta-atras.md`. Nunca publique o tema.

## Marca da loja (não inventar fora disto)

```json
{
  "nome": "Holdwellco",
  "lida_em": "2026-11-23",
  "origem": [
    "https://holdwellco.com/",
    "https://holdwellco.com/products/led-glow-mask"
  ],
  "tema": {
    "nome": "Dawn",
    "versao": "16.1.1",
    "id": 160575684800
  },
  "logo": {
    "src": "https://holdwellco.com/cdn/shop/files/holdwell-logo_png.png?v=1789583693&width=90",
    "largura": 45
  },
  "cores": {
    "fundo": "rgb(245, 247, 247)",
    "texto": "rgba(22, 36, 31, 0.75)",
    "titulo": "rgb(22, 36, 31)",
    "cabecalho_fundo": "rgb(245, 247, 247)",
    "cabecalho_texto": "rgba(22, 36, 31, 0.75)",
    "aviso_fundo": null,
    "aviso_texto": "rgb(245, 247, 247)",
    "botao_fundo": "rgb(31, 58, 61)",
    "botao_degrade": null,
    "botao_texto": "rgb(245, 247, 247)",
    "promocao": null,
    "rodape_fundo": "rgb(31, 58, 61)",
    "rodape_texto": "rgba(245, 247, 247, 0.75)"
  },
  "fontes": {
    "titulo": "Fraunces",
    "titulo_pilha": "Fraunces, Georgia, serif",
    "titulo_peso": "500",
    "titulo_caixa": "none",
    "titulo_espaco": "-1.28px",
    "texto": "Inter",
    "texto_pilha": "Inter, sans-serif"
  },
  "botao": {
    "raio": "9999px",
    "caixa": "none",
    "espaco_letras": "normal",
    "borda": "1px solid rgb(31, 58, 61)",
    "peso": "400"
  }
}
```

## Plano de mudanças

```json
{
  "loja": "holdwellco.com",
  "tema_atual": {
    "nome": "Dawn migraçao",
    "versao": "16.1.1"
  },
  "nome_tema_novo": "Global Brand otimizado 2026-11-23",
  "mudancas": [
    {
      "id": "M1",
      "conserto": 1,
      "pagina": "todas",
      "tipo": "admin_manual",
      "o_que": "Conferir a origem das 335 avaliações no app BK Reviews e remover todas que não vieram de clientes reais da loja, na página do produto e na coleção.",
      "por_que": "O widget carrega 40 imagens do AliExpress e mostra textos em português com nomes americanos. As estrelas também aparecem na página da coleção. Avaliação importada engana o cliente e arrisca a aprovação no Google.",
      "como": "Pedir ao dono para abrir o app no Admin e exportar a lista com origem e data. Mostrar quantas têm pedido real ligado. Só depois do sim dele, remover as importadas. Não apagar nada sem o sim. Não esconder só por CSS.",
      "pronto_quando": "A página do produto e a coleção mostram apenas avaliações ligadas a pedidos reais, ou nenhuma estrela e nenhum contador se não houver.",
      "precisa_confirmar": true
    },
    {
      "id": "M2",
      "conserto": 2,
      "pagina": "produto",
      "tipo": "tema",
      "o_que": "Remover da faixa da página do produto as frases sobre rugas e linhas finas.",
      "por_que": "A loja não tem evidência desse efeito e a própria página declara que o aparelho é cosmético.",
      "como": "No tema duplicado, o template product.<sufixo>.json nasce só com fatos: 7 light modes, 180 LEDs, Cordless USB-C, 10 minutes a day. Não usar reduce, wrinkles, fine lines, collagen, acne, anti-aging, heal, treat ou clinically.",
      "pronto_quando": "A busca por wrinkle e fine lines no texto renderizado da prévia devolve zero.",
      "precisa_confirmar": false
    },
    {
      "id": "M3",
      "conserto": 3,
      "pagina": "todas",
      "tipo": "admin_manual",
      "o_que": "Renomear Recovery, Self-Care & Recovery, Posture & Back Relief e Complete Relief Kit para nomes sem promessa de tratamento, e trocar a descrição da coleção que começa com \"Relief for a tight neck and shoulders\".",
      "por_que": "Relief e recovery são lidos como alegação de saúde, no nome e na descrição.",
      "como": "Propor ao dono nomes únicos, sem repetir nenhuma coleção que já existe: Recovery para Wind Down; Self-Care & Recovery para Self-Care; Posture & Back Relief para Posture & Back Essentials (a coleção Posture & Back já existe); Complete Relief Kit para Complete Comfort Kit. Na descrição da coleção, trocar \"Relief for a tight neck and shoulders after long days at the desk.\" por uma frase de uso, como \"Massagers for long days at the desk.\" (conferir a descrição de cada coleção renomeada). Mudar só títulos, descrições e menu, manter os handles para não quebrar links. Vale ao vivo, então só com o sim.",
      "pronto_quando": "Menu, coleções, descrições de coleção e título do kit não têm relief nem recovery, nenhuma coleção repete o nome de outra, e os links antigos continuam abrindo.",
      "precisa_confirmar": true
    },
    {
      "id": "M4",
      "conserto": 4,
      "pagina": "produto",
      "tipo": "produto",
      "o_que": "Trocar a primeira foto da galeria por holdwell-mascara-led-perfil-lateral-fundo-creme.webp, uma foto limpa da máscara sem marca d'água, e usar a foto em uso como segunda.",
      "por_que": "A foto atual parece selfie e tem baixa resolução.",
      "como": "A galeria do desenho é feita de blocos da seção gb-compra: o bloco b1 usa o arquivo holdwell-mascara-led-perfil-lateral-fundo-creme.webp e a foto do criado-mudo passa a ser o b2. A mídia do produto na loja só muda com o sim do dono: mostrar a lista, esperar o sim, subir e reordenar a mídia para essa foto ficar em primeiro. Foto de produto vale no Google na hora.",
      "pronto_quando": "A primeira foto no celular e no computador é nítida, sem marca d'água e mostra a máscara real.",
      "precisa_confirmar": true
    },
    {
      "id": "M5",
      "conserto": 5,
      "pagina": "produto",
      "tipo": "preco",
      "o_que": "Mostrar o preço real da oferta extra do massageador.",
      "por_que": "A tela diz 20% off e mostra $49.90, que é o preço cheio.",
      "como": "Perguntar ao dono se o desconto é aplicado no carrinho. Se sim, mostrar $39.92 e o preço normal $49.90. Se não, tirar o texto de 20% off e manter $49.90.",
      "pronto_quando": "O preço da tela é igual ao do carrinho com os dois itens.",
      "precisa_confirmar": true
    },
    {
      "id": "M6",
      "conserto": 0,
      "pagina": "carrinho",
      "tipo": "tema",
      "o_que": "Repetir no carrinho o frete grátis acima de $49 e a devolução de 30 dias, e mostrar a frase sobre mudar o tamanho só quando o carrinho tiver produto com opção de tamanho.",
      "por_que": "O carrinho hoje não confirma o que a página do produto prometeu e fala de tamanho para uma máscara que não tem tamanho.",
      "como": "No tema duplicado, abrir os arquivos do carrinho do Dawn (sections/main-cart-footer.liquid, sections/main-cart-items.liquid e snippets/cart-drawer.liquid; se a frase não estiver neles, procurar em locales/en.default.json ou no app que a injeta). Acrescentar um bloco abaixo do total usando os termos da política publicada. Mostrar a frase de tamanho só se algum item tiver produto com opção de tamanho (o Posture Corrector tem 10 variantes); com a máscara, que não tem tamanho, ela não aparece.",
      "pronto_quando": "O carrinho com 1 máscara mostra frete grátis e 30 dias, sem falar de tamanho. Com o Posture Corrector, a frase de tamanho continua aparecendo.",
      "precisa_confirmar": false
    },
    {
      "id": "M7",
      "conserto": 0,
      "pagina": "produto",
      "tipo": "tema",
      "o_que": "Deixar uma oferta principal na primeira tela: 1 máscara e o botão, com os cartões de 2 e 3 máscaras só depois do sim do dono.",
      "por_que": "Três ofertas juntas confundem o cliente.",
      "como": "Com os kits desligados (estado normal deste pacote, não é divergência do desenho), a primeira tela mostra nome, preço de $59.99 e o botão. Os cartões de $101.98 (2 máscaras) e $125.98 (3 máscaras) só entram depois do sim do dono e dos totais conferidos no carrinho: criar os 2 descontos automáticos (15% e 30%), conferir o endsAt e os totais, e só então ligar kits_confirmados nas seções gb-compra e gb-oferta. Sem desconto automático, a tela diria $101.98 e o carrinho cobraria $119.98. O guia entra como item do cartão só se o carrinho o entregar, e o massageador desce para depois do botão. A promoção nasce desligada no tema.",
      "pronto_quando": "Com os kits desligados, a primeira tela do celular mostra nome, preço, 1 máscara e botão, sem parágrafo antes do botão. Os cartões só aparecem depois do sim e dos totais conferidos no carrinho.",
      "precisa_confirmar": true
    },
    {
      "id": "M8",
      "conserto": 0,
      "pagina": "produto",
      "tipo": "tema",
      "o_que": "Reduzir o peso da página do produto.",
      "por_que": "A página tem 9 MB e 320 requisições, e demora para mostrar a foto principal.",
      "como": "Usar image_url com largura certa e srcset, carregar sob demanda tudo abaixo da primeira tela e não carregar as imagens externas do widget de avaliações.",
      "pronto_quando": "A prévia baixa menos da metade do peso atual no celular.",
      "precisa_confirmar": false
    },
    {
      "id": "M9",
      "conserto": 0,
      "pagina": "produto",
      "tipo": "preco",
      "o_que": "Conferir o preço comparado do Complete Relief Kit e a data da oferta de 30 de novembro.",
      "por_que": "Preço antigo só vale se for real, e oferta com data não pode voltar depois de vencer.",
      "como": "Somar os itens do kit e comparar com $139.79. Mostrar ao dono. Tirar o preço comparado se não fechar. Remover o aviso da oferta quando a data passar.",
      "pronto_quando": "O preço comparado é a soma real dos itens, ou está vazio, e nenhuma oferta vencida aparece.",
      "precisa_confirmar": true
    }
  ]
}
```


## Oferta da loja nova (preço e kit só com o "sim" do dono)

```json
{
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
}
```

## Seções, de cima para baixo

```json
{
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
}
```

## Fotos (lugar por lugar)

```json
[
  {
    "foto": 1,
    "pagina": "home",
    "onde": "hero",
    "usar_agora": "led-glow-mask-7.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 2,
    "pagina": "produto",
    "onde": "galeria",
    "usar_agora": "led-glow-mask-7.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 3,
    "pagina": "home e produto",
    "onde": "ritual",
    "usar_agora": "led-glow-mask-3.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 4,
    "pagina": "home",
    "onde": "detalhes",
    "usar_agora": "led-glow-mask-2.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 5,
    "pagina": "produto",
    "onde": "galeria",
    "usar_agora": "led-glow-mask-2.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 6,
    "pagina": "home e produto",
    "onde": "sete modos, um recorte por cor",
    "usar_agora": "led-glow-mask-4.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 7,
    "pagina": "home e produto",
    "onde": "LEDs de perto",
    "usar_agora": "led-glow-mask-5.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 8,
    "pagina": "home e produto",
    "onde": "faixa ajustável",
    "usar_agora": "led-glow-mask-6.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 9,
    "pagina": "produto",
    "onde": "sem fio",
    "usar_agora": "led-glow-mask-8.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 10,
    "pagina": "home e produto",
    "onde": "na caixa",
    "usar_agora": "led-glow-mask-10.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 11,
    "pagina": "home e produto",
    "onde": "como usar",
    "usar_agora": "led-glow-mask-11.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 12,
    "pagina": "produto",
    "onde": "primeira foto da galeria, com contexto",
    "usar_agora": "led-glow-mask-11.jpg",
    "trocar": false,
    "motivo": "Foto da própria Zeraya, recortada em arquivo para não levar texto gravado."
  },
  {
    "foto": 13,
    "pagina": "nenhuma",
    "onde": "fora das páginas",
    "usar_agora": "led-glow-mask-9.jpg",
    "trocar": false,
    "motivo": "Arte com texto; o recorte da máscara fica pequeno demais."
  },
  {
    "foto": 14,
    "pagina": "nenhuma",
    "onde": "fora das páginas",
    "usar_agora": "zeraya-glow-companion-1.jpg",
    "trocar": false,
    "motivo": "Capa com texto gravado; o guia virou capa tipográfica."
  },
  {
    "foto": 15,
    "pagina": "home",
    "onde": "retrato-home",
    "usar_agora": "led-glow-mask-8.jpg",
    "trocar": true,
    "motivo": "Retrato em close com a máscara acesa. Falta foto com rosto em primeiro plano.",
    "prompt": "Use the attached photo as the exact product reference. Editorial beauty portrait of a woman in her 30s wearing the same white rigid LED face mask with soft red light, head turned three quarters, bare shoulders, warm cream background, soft window light, 85mm lens, 4:5, photorealistic, natural skin texture on neck and shoulders. No text, no logo, no watermark."
  },
  {
    "foto": 16,
    "pagina": "produto",
    "onde": "retrato-produto",
    "usar_agora": "led-glow-mask-7.jpg",
    "trocar": true,
    "motivo": "Mãos e máscara numa penteadeira clara. Falta foto de ritual com linguagem de cosmético.",
    "prompt": "Use the attached photo as the exact product reference. Editorial still life of a woman's hands lifting the same white rigid LED face mask from a cream vanity with a folded linen towel and a ceramic dish, soft morning light, skin-tone palette, 50mm lens, 4:5, photorealistic. No text, no logo, no product labels."
  },
  {
    "foto": 17,
    "pagina": "produto",
    "onde": "galeria",
    "usar_agora": "led-glow-mask-1.jpg",
    "trocar": true,
    "motivo": "Foto tipo selfie, baixa nitidez e marca d'água. Sai da galeria.",
    "prompt": "Use the attached photo as the exact product reference. Photograph the same white rigid LED face mask with red light on, open eyes, nose and mouth, gray adjustable strap, worn by a woman in her 30s resting on a linen sofa at dusk, eyes closed, warm lamp light, 50mm lens, shallow depth of field, 1:1, photorealistic. No text, no logo, no watermark."
  },
  {
    "foto": 18,
    "pagina": "produto",
    "onde": "ficha do massageador",
    "usar_agora": "led-neck-face-massager-2.jpg",
    "trocar": true,
    "motivo": "Texto gravado na foto promete efeito na pele. Não aparece na loja nova, mas continua na ficha do massageador.",
    "prompt": "Use the attached photo as the exact product reference. Photograph the same white T-shaped neck and face massager with red light, held by a woman at her jawline in a bright bathroom, relaxed expression, soft daylight, 85mm lens, 1:1, photorealistic. No text, no arrows, no labels."
  },
  {
    "foto": 19,
    "pagina": "produto",
    "onde": "ficha do massageador",
    "usar_agora": "led-neck-face-massager-3.jpg",
    "trocar": true,
    "motivo": "Texto gravado na foto promete efeito na pele. Não aparece na loja nova, mas continua na ficha do massageador.",
    "prompt": "Use the attached photo as the exact product reference. Studio still life of the same T-shaped massager in white and black on a pale gray stone surface, soft side light, clean background, 3:2, photorealistic. No text, no icons, no labels."
  }
]
```

## Fotos novas (referência, foto real para anexar e prompt)

```json
[
  {
    "foto": 1,
    "pagina": "home",
    "onde": "retrato-home",
    "ilustracao_no_ar": false,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-mascara-led-lifestyle-mulher-madura-roxo.png?v=1791689402",
    "referencia_loja": "holdwellco.com (foto própria)",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-mascara-led-perfil-lateral-fundo-creme.webp?v=1791689383",
    "prompt": "Use the attached photo as the exact product reference. The product is the Zeraya LED face mask: a rigid, glossy white one-piece shell molded as a smooth neutral face, with two almond-shaped eye openings slightly slanted upward at the outer corners, a small nose opening and a horizontal mouth opening, one small round touch button (plain thin ring, no icon, no text) high on the forehead, a thin glowing light edge running around the whole perimeter of the shell, a translucent pale-pink plastic rear frame, and two parallel flat gray textured elastic straps with a small gray metal slider on each, closing behind the head. The shell carries no logo, no printing and no seams other than the rim. 180 small LEDs sit on the inside surface only and are not visible from outside. Scene: an editorial beauty portrait of a woman in her early 30s, natural skin with visible fine texture and a few freckles, no retouching, hair tied back loosely, bare shoulders in a cream linen wrap, wearing the mask on her face with the straps behind her head, head turned three quarters to camera-left, chin slightly raised, eyes gently closed, relaxed mouth. The mask is switched on with a soft red glow along the rim and through the openings, the red light tints her cheeks and neck subtly. Background: warm cream #F3EEE8 wall with a soft deep teal #1F3A3D shadow falling at the right edge, out of focus. Light: one large soft window light from camera-left, warm 3200K, low contrast, gentle highlight on the glossy white shell, no hard shadows. Camera: 85mm lens, f/2.8, eye-level, tight head-and-shoulders crop with clear space on the right third. Aspect ratio 4:5. Photorealistic commercial beauty photography, natural skin, no beauty filter. No text anywhere.",
    "foto_real_melhor": null
  },
  {
    "foto": 2,
    "pagina": "produto",
    "onde": "retrato-produto",
    "ilustracao_no_ar": false,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-mascara-led-lifestyle-cama-fones-livro-fechado.png?v=1791689388",
    "referencia_loja": "holdwellco.com (foto própria)",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-mascara-led-perfil-lateral-fundo-creme.webp?v=1791689383",
    "prompt": "Use the attached photo as the exact product reference. The product is the Zeraya LED face mask: a rigid, glossy white one-piece shell molded as a smooth neutral face, with two almond-shaped eye openings slightly slanted upward at the outer corners, a small nose opening and a horizontal mouth opening, one small round touch button (plain thin ring, no icon, no text) high on the forehead, a thin glowing light edge running around the whole perimeter of the shell, a translucent pale-pink plastic rear frame, and two parallel flat gray textured elastic straps with a small gray metal slider on each, closing behind the head. The shell carries no logo, no printing and no seams other than the rim. 180 small LEDs sit on the inside surface only and are not visible from outside. Scene: an editorial still life on a cream vanity. Two woman's hands with short natural nails and no jewelry lift the mask, switched off (white glossy shell, no glow), by its sides, the gray straps hanging loose below. A folded cream linen towel and one small matte ceramic dish sit beside it, a soft deep teal #1F3A3D linen cloth at the back. No face in the frame, only hands, wrists and forearms in a cream knit sleeve. Light: soft morning window light from the left, 4500K warm, long gentle shadows, soft highlight rolling across the glossy shell. Camera: 50mm lens, f/4, slightly above eye-level at 30 degrees, mask in the upper third, empty cream surface in the lower third. Aspect ratio 4:5. Photorealistic commercial lifestyle photography, natural skin texture on the hands. No text anywhere.",
    "foto_real_melhor": null
  },
  {
    "foto": 3,
    "pagina": "produto",
    "onde": "galeria",
    "ilustracao_no_ar": false,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-mascara-led-lifestyle-mulher-madura-roxo.png?v=1791689402",
    "referencia_loja": "holdwellco.com (foto própria)",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-mascara-led-perfil-lateral-fundo-creme.webp?v=1791689383",
    "prompt": "Use the attached photo as the exact product reference. The product is the Zeraya LED face mask: a rigid, glossy white one-piece shell molded as a smooth neutral face, with two almond-shaped eye openings slightly slanted upward at the outer corners, a small nose opening and a horizontal mouth opening, one small round touch button (plain thin ring, no icon, no text) high on the forehead, a thin glowing light edge running around the whole perimeter of the shell, a translucent pale-pink plastic rear frame, and two parallel flat gray textured elastic straps with a small gray metal slider on each, closing behind the head. The shell carries no logo, no printing and no seams other than the rim. 180 small LEDs sit on the inside surface only and are not visible from outside. Scene: a woman in her mid 30s resting on a cream linen sofa at dusk, head tilted back against a cushion, wearing the mask with the straps behind her head, eyes closed, relaxed shoulders in a soft cream cotton top. The mask is on with a soft red glow along the rim and through the openings. Background: warm living room, a lit lamp with a cream shade out of focus on the left, a deep teal #16241F wall in shadow on the right, a window with a faint sunset. Light: warm lamp light at 2700K from the left, with the red glow as the only colored accent, gentle contrast. Camera: 50mm lens, f/2, shallow depth of field, slightly below eye-level, three-quarter view, mask and shoulders filling the center with room around. Aspect ratio 1:1. Photorealistic commercial lifestyle photography, natural skin texture, no beauty filter. No text, no watermark anywhere.",
    "foto_real_melhor": null
  },
  {
    "foto": 4,
    "pagina": "produto",
    "onde": "ficha do massageador (led-neck-face-massager-2)",
    "ilustracao_no_ar": false,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-led-benefits-03.jpg?v=1790965155",
    "referencia_loja": "holdwellco.com (foto própria)",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-led-lifestyle-01.jpg?v=1790963367",
    "prompt": "Use the attached photo as the exact product reference. The product is a handheld T-shaped neck and face massager: a glossy white teardrop-shaped handle with one small round power button in the middle of its front, a polished silver ring collar at the neck, and a polished silver crescent T-head with a thin red LED line along the inner edge. Copy its exact proportions, the single button and the silver finish, no logo, no printing. Scene: a woman in her late 30s with natural skin texture, hair loosely down, in a plain white ribbed tank top, holds the massager in one hand with the silver head resting lightly along her jawline, head tilted slightly, calm relaxed expression, eyes closed or looking softly away. The red LED line glows gently on, a faint warm tint on the skin. Background: bright bathroom, soft out-of-focus white tiles, a small green plant and a folded cream towel. Light: soft daylight from a window on the left, 5000K, gentle shadows, soft highlight on the silver. Camera: 85mm lens, f/2.8, eye-level, chest-up crop, aspect ratio 1:1. Photorealistic commercial lifestyle photography, natural skin texture, no skin smoothing. No text of any kind, no arrows, no icons, no banners, no labels.",
    "foto_real_melhor": null
  },
  {
    "foto": 5,
    "pagina": "produto",
    "onde": "ficha do massageador (led-neck-face-massager-3)",
    "ilustracao_no_ar": false,
    "referencia_url": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-led-colors-01.jpg?v=1790967135",
    "referencia_loja": "holdwellco.com (foto própria)",
    "foto_real_para_anexar": "https://cdn.shopify.com/s/files/1/0780/8817/5808/files/holdwell-led-lifestyle-01.jpg?v=1790963367",
    "prompt": "Use the attached photo as the exact product reference. Two handheld T-shaped neck and face massagers, copied exactly from the attached photos: one glossy white and one glossy black, each with a teardrop handle, one small round power button in the middle of the front, a polished silver ring collar and a polished silver crescent T-head with a thin glowing LED line on the inner edge. No logo, no printing on either. Scene: studio still life, the two devices standing upright side by side, the black one slightly behind and to the right, on a pale gray honed stone slab, with a soft pale pink #E2C5B4 blurred shape far behind. The LED lines glow softly in the same soft red on both. Light: one large softbox from camera-left, 5000K, soft long shadows to the right, clean specular highlights on the silver and the glossy shells, subtle reflection on the stone. Camera: 100mm macro-style product lens, f/5.6, eye-level, devices centered with generous empty space on the left third. Aspect ratio 3:2. Photorealistic commercial product photography. Absolutely no text, no letters, no icons, no color swatch miniatures, no banners.",
    "foto_real_melhor": null
  }
]
```

## Código pronto do tema (33 arquivos)

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

### Arquivo: assets/gb-loja.css

```css
/*
  Holdwellco: estilos das seções gb-*.
  Tudo fica escopado em .gb (raiz de cada seção) para não vazar para o tema da loja.
  Cores e fontes vêm do marca.json: verde petróleo #1F3A3D e #16241F, creme #F3EEE8, pele #EEDFD3, rosa #E2C5B4. Fraunces 300 nos títulos, Inter no texto.
  Medidas em px de propósito: o tema da loja usa html com 62,5%, então rem aqui ficaria pequeno.
*/
.gb{--gb-ink:#16241F;--gb-pet:#1F3A3D;--gb-creme:#F3EEE8;--gb-pele:#EEDFD3;--gb-rosa:#E2C5B4;--gb-soft:rgba(22,36,31,.74);--gb-line:rgba(22,36,31,.18);--gb-serif:Fraunces,Georgia,serif;--gb-sans:Inter,sans-serif;font-family:var(--gb-sans);font-size:16px;line-height:1.6;font-weight:400;letter-spacing:normal;text-transform:none;text-align:left;color:var(--gb-ink);background:var(--gb-creme);-webkit-font-smoothing:antialiased;color-scheme:light;box-sizing:border-box;overflow-x:clip}
.gb *,.gb *::before,.gb *::after{box-sizing:inherit}
.gb [hidden]{display:none !important}
.gb h1,.gb h2,.gb h3,.gb p,.gb ul,.gb ol,.gb figure{margin:0;padding:0}
.gb h1,.gb h2,.gb h3{font-family:var(--gb-serif);font-weight:500;color:var(--gb-ink);letter-spacing:-.025em;text-transform:none}
.gb h1{font-size:96px;line-height:.98}
.gb h2{font-size:68px;line-height:1.02}
.gb h3{font-size:30px;line-height:1.15}
.gb p{color:var(--gb-soft)}
.gb ul,.gb ol{list-style:none}
.gb a:not(.gb-btn){color:inherit}
.gb button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-transform:none;letter-spacing:normal}
.gb img{display:block;max-width:100%}
.gb :focus-visible{outline:2px solid var(--gb-pet);outline-offset:2px}
.gb .gb-ico{flex:none}
.gb .gb-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.gb-editor{background:#fff;padding:0}
.gb-editor__txt{margin:0;padding:12px 24px;font-size:13px;border:1px dashed rgba(22,36,31,.4);color:#16241F}
.gb .gb-w{max-width:1320px;margin:0 auto;padding:0 48px}
.gb.gb-sec{padding:128px 0}
.gb .gb-lead{font-size:20px;line-height:1.5}

/* botão */
.gb .gb-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:56px;padding:0 36px;border-radius:9999px;background:var(--gb-pet);border:1px solid var(--gb-pet);color:#F5F7F7;text-decoration:none;font-family:var(--gb-sans);font-weight:500;font-size:16px;line-height:1.2;white-space:nowrap;cursor:pointer;transition:transform .15s,background .15s}
.gb .gb-btn:hover{background:var(--gb-ink);color:#F5F7F7}
.gb .gb-btn:active{transform:scale(.98)}
.gb .gb-btn[aria-disabled="true"],.gb .gb-btn:disabled{opacity:.55;cursor:not-allowed}
.gb .gb-btn[aria-busy="true"]{opacity:.7;cursor:progress}

/* caixas de foto */
.gb .gb-ph{position:relative;overflow:hidden;background:var(--gb-pele);border-radius:4px}
.gb .gb-arco{border-radius:999px 999px 4px 4px}
.gb .gb-fill{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.gb .gb-rec{position:absolute;inset:0;overflow:hidden}
.gb .gb-rec__img{position:absolute;max-width:none;height:auto;width:calc(100% / var(--rw));left:calc(var(--rx) * -100% / var(--rw));top:calc(var(--ry) * -100% / var(--rh))}
@supports (width:1cqw){
  .gb .gb-rec{container-type:size}
  .gb .gb-rec__img{--cw:max(100cqw,calc(100cqh * var(--ar)));width:calc(var(--cw) / var(--rw));height:auto;left:calc((100cqw - var(--cw)) * var(--fx) - var(--rx) * var(--cw) / var(--rw));top:calc((100cqh - var(--cw) / var(--ar)) * var(--fy) - var(--ry) * var(--cw) / var(--rw) / var(--iar))}
}
.gb .gb-cap{display:block;margin-top:14px;font-size:14px;color:rgba(22,36,31,.72)}

/* aviso e cabeçalho */
.gb.gb-aviso{background:var(--gb-pele);color:var(--gb-ink);text-align:center;font-size:13px;padding:9px 16px;line-height:1.5}
.gb.gb-aviso p{color:var(--gb-ink);font-size:13px}
.gb.gb-top{background:var(--gb-creme);position:relative;z-index:20}
.gb .gb-menu{display:none}
.gb .gb-top__in{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.gb .gb-logo{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--gb-serif);font-size:25px;font-weight:500;color:var(--gb-ink)}
.gb .gb-logo img{width:32px;height:32px;border-radius:7px;object-fit:cover}
.gb .gb-nav{display:flex;gap:32px;font-size:14px}
.gb .gb-nav a{text-decoration:none;color:rgba(22,36,31,.8)}
.gb .gb-nav a:hover{color:var(--gb-ink);text-decoration:underline;text-underline-offset:4px}
.gb .gb-cart{position:relative;display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;text-decoration:none}
.gb .gb-cart__n{position:absolute;top:2px;right:0;min-width:18px;height:18px;padding:0 5px;border-radius:9999px;background:var(--gb-pet);color:#F5F7F7;font-size:11px;font-weight:600;line-height:18px;text-align:center}
/* com o cabeçalho e o rodapé desta página, esconde os do tema (o carrinho lateral continua no lugar) */
body:has(.gb-top) .shopify-section-group-header-group{display:none}
body:has(.gb-rodape) .shopify-section-group-footer-group{display:none}

/* hero */
.gb .gb-hero__in{display:grid;grid-template-columns:7fr 5fr;gap:48px;align-items:end;padding-top:28px;padding-bottom:72px}
.gb .gb-hero h1{font-size:86px}
.gb .gb-hero p{font-size:20px;margin:30px 0 34px;max-width:440px}
.gb .gb-hero__f{height:720px}

/* fatos */
.gb.gb-fatos{border-top:1px solid rgba(22,36,31,.16);border-bottom:1px solid rgba(22,36,31,.16)}
.gb .gb-fatos__in{display:flex;justify-content:space-between;gap:20px}
.gb .gb-fato{padding:22px 0;font-size:15px}

/* ritual */
.gb .gb-rit__in{display:grid;grid-template-columns:8fr 4fr;gap:64px;align-items:end}
.gb .gb-rit__f{height:820px}
.gb .gb-rit h2{font-size:56px}

/* modos */
.gb.gb-modos{padding-bottom:96px}
.gb .gb-modos h2{text-align:center;margin-bottom:56px}
.gb .gb-modos__g{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.gb .gb-modo{text-align:center}
.gb .gb-modo__f{aspect-ratio:7/10;border-radius:0}
.gb .gb-modo span{display:inline-block;margin-top:12px;padding:5px 15px;border:1px solid rgba(22,36,31,.3);border-radius:9999px;font-size:13px}

/* retrato */
.gb.gb-ret{background:var(--gb-pele)}
.gb .gb-ret__in{display:grid;grid-template-columns:7fr 5fr;gap:72px;align-items:center}
.gb .gb-ret h2{font-size:84px;line-height:1}
.gb .gb-vago{height:520px;border-radius:999px 999px 4px 4px;background:radial-gradient(ellipse 60% 44% at 50% 44%,#F9EDE4 0,#F0D3C4 46%,#E2C5B4 100%)}

/* passos */
.gb .gb-passos{display:grid;grid-template-columns:5fr 6fr;gap:96px;align-items:center}
.gb .gb-passos__f{height:620px}
.gb .gb-passo{display:grid;grid-template-columns:64px 1fr;align-items:baseline;padding:24px 0;border-top:1px solid var(--gb-line)}
.gb .gb-passo b{font-family:var(--gb-serif);font-weight:500;font-size:30px;color:var(--gb-pet)}
.gb .gb-passo h3{font-size:27px}
.gb .gb-passos h2{margin-bottom:34px}

/* detalhes */
.gb.gb-detalhes{padding-top:0}
.gb .gb-ed{display:grid;grid-template-columns:repeat(12,1fr);gap:72px 28px;align-items:end}
.gb .gb-ed h2{grid-column:1/13}
.gb .gb-e1{grid-column:1/13}.gb .gb-e1 .gb-ph{height:620px}
.gb .gb-e3{grid-column:2/6}.gb .gb-e3 .gb-ph{height:380px}
.gb .gb-e4{grid-column:6/13}.gb .gb-e4 .gb-ph{height:600px}

/* caixa */
.gb.gb-caixa{background:var(--gb-pele)}
.gb .gb-caixa__g{display:grid;grid-template-columns:7fr 5fr;gap:80px;align-items:center}
.gb .gb-caixa__f{aspect-ratio:7/6}
.gb .gb-lista{margin:28px 0}
.gb .gb-lista li{padding:13px 0;border-top:1px solid var(--gb-line);font-size:17px}
.gb .gb-cx-p{font-family:var(--gb-serif);font-weight:500;font-size:40px;margin-bottom:16px;color:var(--gb-ink)}

/* oferta */
.gb .gb-oferta h2{margin-bottom:44px}
.gb .gb-kit{display:grid;grid-template-columns:4fr 4fr 2fr auto;gap:24px;align-items:center;padding:30px 8px;border-top:1px solid rgba(22,36,31,.2);text-decoration:none;color:var(--gb-ink);transition:background .15s}
.gb .gb-kit:hover{background:var(--gb-pele)}
.gb .gb-kit:last-child{border-bottom:1px solid rgba(22,36,31,.2)}
.gb .gb-kit h3{font-size:44px}
.gb .gb-kit small{font-size:15px;color:rgba(22,36,31,.75)}
.gb .gb-kit strong{font-size:24px;font-weight:500}
.gb .gb-seta{font-size:22px}
.gb .gb-tag{display:inline-block;margin-left:10px;vertical-align:middle;background:var(--gb-pet);color:#F5F7F7;border-radius:9999px;padding:3px 11px;font-family:var(--gb-sans);font-size:12px;letter-spacing:0}

/* comparação */
.gb .gb-fatia{border-collapse:collapse;width:100%;font-size:16px}
.gb .gb-fatia th,.gb .gb-fatia td{padding:20px 14px;border:0;border-top:1px solid rgba(22,36,31,.16);text-align:left;font-weight:400;color:var(--gb-ink);background:none}
.gb .gb-fatia thead th{border-top:0;font-size:14px;color:rgba(22,36,31,.72)}
.gb .gb-fatia thead th:last-child{color:var(--gb-pet);font-weight:600}
.gb .gb-fatia td:last-child{font-weight:500;color:var(--gb-pet)}
.gb .gb-compara h2{margin-bottom:40px}

/* linha */
.gb.gb-linha{padding-top:0}
.gb .gb-linha h2{font-size:44px;margin-bottom:24px}
.gb .gb-li{display:flex;justify-content:space-between;gap:16px;align-items:baseline;padding:18px 0;border-top:1px solid var(--gb-line);text-decoration:none;font-family:var(--gb-serif);font-weight:500;font-size:28px}
.gb .gb-li:hover{text-decoration:underline;text-underline-offset:5px}
.gb .gb-li span{font-family:var(--gb-sans);font-size:15px}

/* avaliações */
.gb.gb-rev{padding:60px 0;border-top:1px solid rgba(22,36,31,.14)}
.gb .gb-rev h2{font-size:34px}
.gb .gb-rev p{margin-top:6px}

/* garantias */
.gb.gb-sinais{padding:72px 0}
.gb .gb-sinais__in{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
.gb .gb-sinal{font-family:var(--gb-serif);font-weight:500;font-size:24px;line-height:1.2}
.gb .gb-sinal span{display:block;margin-top:6px;font-family:var(--gb-sans);font-size:14px;color:var(--gb-soft)}

/* perguntas */
.gb .gb-faq__g{display:grid;grid-template-columns:4fr 8fr;gap:64px}
.gb .gb-faq details{border-top:1px solid var(--gb-line)}
.gb .gb-faq details:last-child{border-bottom:1px solid var(--gb-line)}
.gb .gb-faq summary{list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:center;min-height:66px;font-size:17px;cursor:pointer}
.gb .gb-faq summary::-webkit-details-marker{display:none}
.gb .gb-faq summary::after{content:"+";font-size:24px;font-weight:500}
.gb .gb-faq details[open] summary::after{content:"\2212"}
.gb .gb-faq details p{padding:0 32px 22px 0}

/* cuidado */
.gb.gb-cuidado{padding-top:0}
.gb .gb-seguro{border-top:1px solid rgba(22,36,31,.3);padding-top:28px;display:grid;grid-template-columns:4fr 8fr;gap:32px}
.gb .gb-seguro p{color:var(--gb-ink)}

/* cadastro */
.gb.gb-mail{background:var(--gb-pele);padding:80px 0}
.gb .gb-mail__in{display:flex;justify-content:space-between;align-items:center;gap:40px}
.gb .gb-mail h2{font-size:44px}
.gb .gb-mail__f{display:flex;gap:10px;width:470px;max-width:100%}
.gb .gb-mail__c{flex:1;min-width:0}
.gb .gb-mail label{display:block;font-size:13px;margin-bottom:6px}
.gb .gb-mail input[type="email"]{width:100%;height:56px;border-radius:9999px;border:1px solid rgba(22,36,31,.5);padding:0 22px;font:inherit;background:#FFFDFA;color:var(--gb-ink)}
.gb .gb-mail .gb-btn{align-self:flex-end}
.gb .gb-mail__ok,.gb .gb-mail__erro{font-size:14px;color:var(--gb-ink)}
.gb .gb-mail__erro{margin-top:8px;color:#9C2B1F}

/* rodapé */
.gb.gb-rodape{background:var(--gb-pet);color:rgba(245,247,247,.78);padding:64px 0 36px;font-size:14px}
.gb .gb-rodape__g{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px}
.gb.gb-rodape b{display:block;color:#F5F7F7;font-weight:500;margin-bottom:12px}
.gb.gb-rodape a{display:block;text-decoration:none;padding:5px 0;color:rgba(245,247,247,.78)}
.gb.gb-rodape a:hover{color:#F5F7F7;text-decoration:underline;text-underline-offset:4px}
.gb.gb-rodape p{color:rgba(245,247,247,.78);max-width:460px;font-size:14px}
.gb.gb-rodape .gb-marca{font-family:var(--gb-serif);font-weight:500;font-size:30px;color:#F5F7F7;margin-bottom:10px}
.gb .gb-legal{border-top:1px solid rgba(245,247,247,.2);margin-top:40px;padding-top:20px;font-size:13px}

/* compra (produto) */
.gb.gb-compra{padding:16px 0 96px}
.gb .gb-compra__g{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:64px;align-items:start}
.gb .gb-gal-main{position:relative;overflow:hidden;background:var(--gb-pele);border-radius:4px;aspect-ratio:1/1}
.gb .gb-slide{position:absolute;inset:0;display:none}
.gb .gb-slide.is-on{display:block}
.gb .gb-thumbs{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-top:10px}
.gb .gb-thumb{position:relative;display:block;aspect-ratio:1/1;padding:0;border:1px solid transparent;border-radius:4px;overflow:hidden;background:var(--gb-pele);min-height:44px}
.gb .gb-thumb[aria-pressed="true"]{border-color:var(--gb-pet);box-shadow:0 0 0 1px var(--gb-pet)}
.gb .gb-info{position:sticky;top:24px}
.gb .gb-info h1{font-size:58px;line-height:1.02}
.gb .gb-preco{font-size:24px;margin-top:12px;color:var(--gb-ink)}
.gb .gb-bens{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 26px}
.gb .gb-bens li{padding:5px 14px;border:1px solid rgba(22,36,31,.28);border-radius:9999px;font-size:13px}
.gb .gb-var{margin:0 0 18px}
.gb .gb-var__t{font-size:14px;margin-bottom:8px;color:var(--gb-ink)}
.gb .gb-var__v{display:flex;flex-wrap:wrap;gap:8px}
.gb .gb-var__b{min-height:44px;padding:0 18px;border:1px solid rgba(22,36,31,.3);border-radius:9999px;font-size:14px}
.gb .gb-var__b[aria-checked="true"]{border-color:var(--gb-pet);box-shadow:0 0 0 1px var(--gb-pet);background:var(--gb-pele)}
.gb .gb-var__b.is-esgotada{opacity:.5;text-decoration:line-through}
.gb .gb-opts{display:grid;grid-template-columns:repeat(var(--gb-n,3),1fr);gap:10px}
.gb .gb-opt{position:relative;border:1px solid rgba(22,36,31,.3);background:transparent;border-radius:12px;padding:18px 6px 12px;text-align:center;min-height:108px;display:flex;flex-direction:column;align-items:center;transition:border-color .15s}
.gb .gb-opt[aria-checked="true"]{border-color:var(--gb-pet);box-shadow:0 0 0 1px var(--gb-pet);background:var(--gb-pele)}
.gb .gb-opt b{font-weight:400;font-size:14px}
.gb .gb-opt strong{font-size:19px;font-weight:500}
.gb .gb-opt small{font-size:12px;color:rgba(22,36,31,.76);line-height:1.3}
.gb .gb-opt em{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--gb-pet);color:#F5F7F7;font-style:normal;font-size:10.5px;border-radius:9999px;padding:2px 9px;white-space:nowrap}
.gb .gb-conta{font-size:14px;margin:13px 0;min-height:21px;color:rgba(22,36,31,.82)}
.gb .gb-info .gb-btn{width:100%}
.gb .gb-msg{margin-top:10px;font-size:14px;color:#9C2B1F}
.gb .gb-selos{display:flex;justify-content:space-between;gap:10px;margin-top:14px;font-size:13px}
.gb .gb-add{display:grid;grid-template-columns:1fr 26px;gap:14px;align-items:center;width:100%;margin-top:18px;padding:14px 16px;border:1px solid rgba(22,36,31,.24);border-radius:12px;background:transparent;text-align:left}
.gb .gb-add b{display:block;font-size:14px;font-weight:500}
.gb .gb-add small{font-size:13px;color:rgba(22,36,31,.75)}
.gb .gb-add i{width:24px;height:24px;border:1px solid var(--gb-pet);border-radius:7px;display:flex;align-items:center;justify-content:center;color:transparent}
.gb .gb-add[aria-checked="true"]{border-color:var(--gb-pet)}
.gb .gb-add[aria-checked="true"] i{background:var(--gb-pet);color:#F5F7F7}
.gb .gb-addvar{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:14px;color:rgba(22,36,31,.82)}
.gb .gb-addvar select{flex:1;min-height:44px;padding:0 12px;border:1px solid rgba(22,36,31,.24);border-radius:8px;background:transparent;font:inherit;color:var(--gb-ink)}
.gb .gb-desc{margin-top:18px;border-top:1px solid var(--gb-line)}
.gb .gb-desc summary{padding:14px 0;font-size:15px;font-weight:500;cursor:pointer}
.gb .gb-desc__t{padding-bottom:14px;font-size:14.5px;line-height:1.6;color:var(--gb-soft)}
.gb .gb-barra{display:none}

/* macro (leds, sem fio, ajuste) */
.gb.gb-leds,.gb.gb-ajuste{padding-top:0}
.gb.gb-ajuste{padding-top:128px}
.gb .gb-macro{display:grid;grid-template-columns:4fr 8fr;gap:72px;align-items:end}
.gb .gb-macro.inv{grid-template-columns:7fr 5fr;align-items:center}
.gb .gb-macro p{margin-top:16px}
.gb .gb-macro__f.is-5-4{aspect-ratio:5/4}
.gb .gb-macro__f.is-7-5{aspect-ratio:7/5}
.gb .gb-macro__f.is-1-1{aspect-ratio:1/1}

/* guia */
.gb.gb-guia{background:var(--gb-pele)}
.gb .gb-guia__g{display:grid;grid-template-columns:5fr 7fr;gap:88px;align-items:center}
.gb .gb-capa{aspect-ratio:4/5;max-width:400px;width:100%;margin:0 auto;border-radius:999px 999px 4px 4px;background:linear-gradient(180deg,#F8ECE3,#E2C5B4);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;font-family:var(--gb-serif);font-weight:500;font-size:36px;line-height:1.1;color:var(--gb-ink)}
.gb .gb-capa small{font-family:var(--gb-sans);font-size:13px;margin-top:14px}

/* entrega */
.gb.gb-ent{padding-top:0}
.gb .gb-ent h2{margin-bottom:48px}
.gb .gb-tempo{display:grid;grid-template-columns:repeat(4,1fr)}
.gb .gb-tempo li{position:relative;padding:28px 24px 0 0;border-top:1px solid var(--gb-pet)}
.gb .gb-tempo li::before{content:"";position:absolute;top:-5px;left:0;width:9px;height:9px;border-radius:50%;background:var(--gb-pet)}
.gb .gb-tempo b{display:block;font-family:var(--gb-serif);font-weight:500;font-size:28px;line-height:1.2;margin:0}
.gb .gb-tempo span{font-size:14.5px;color:rgba(22,36,31,.75)}

@media (max-width:759px){
  .gb h1{font-size:50px}
  .gb h2{font-size:42px}
  .gb h3{font-size:24px}
  .gb .gb-w{padding:0 22px}
  .gb.gb-sec{padding:76px 0}
  .gb .gb-lead{font-size:17px}
  .gb .gb-nav{display:none}
  .gb .gb-menu{display:block}
  .gb .gb-menu__b{list-style:none;display:inline-flex;width:44px;height:44px;margin-left:-10px;align-items:center;justify-content:center;cursor:pointer}
  .gb .gb-menu__b::-webkit-details-marker{display:none}
  .gb .gb-menu__p{position:absolute;left:0;right:0;top:100%;display:flex;flex-direction:column;padding:6px 22px 14px;background:var(--gb-creme);border-top:1px solid var(--gb-line);border-bottom:1px solid var(--gb-line)}
  .gb .gb-menu__p a{display:block;padding:14px 0;font-size:17px;text-decoration:none;border-bottom:1px solid var(--gb-line)}
  .gb .gb-menu__p a:last-child{border-bottom:0}
  .gb .gb-top__in{height:54px}
  .gb .gb-logo{font-size:22px}
  .gb .gb-logo img{width:28px;height:28px}
  .gb.gb-aviso{font-size:12px;padding:7px 10px}
  .gb .gb-hero__in{display:flex;flex-direction:column-reverse;gap:18px;padding-top:0;padding-bottom:30px}
  .gb .gb-hero h1{font-size:43px}
  .gb .gb-hero p{font-size:16px;margin:10px 0 16px}
  .gb .gb-hero .gb-btn{width:100%}
  .gb .gb-hero__f{height:392px;width:100%}
  .gb .gb-fatos__in{display:grid;grid-template-columns:1fr 1fr;gap:0 12px;padding-top:8px;padding-bottom:8px}
  .gb .gb-fato{padding:9px 0;font-size:14px}
  .gb .gb-rit__in,.gb .gb-ret__in,.gb .gb-passos,.gb .gb-caixa__g,.gb .gb-macro,.gb .gb-macro.inv,.gb .gb-guia__g,.gb .gb-faq__g,.gb .gb-seguro,.gb .gb-compra__g{grid-template-columns:minmax(0,1fr);gap:30px}
  .gb .gb-rit__f{height:470px}
  .gb .gb-rit h2{font-size:38px}
  .gb.gb-modos{padding-bottom:64px}
  .gb .gb-modos h2{margin-bottom:30px}
  .gb .gb-modos__g{display:flex;flex-wrap:wrap;justify-content:center;gap:18px 4px}
  .gb .gb-modo{width:calc(25% - 3px)}
  .gb .gb-modo span{padding:3px 8px;font-size:11.5px;margin-top:7px}
  .gb .gb-ret h2{font-size:48px}
  .gb .gb-vago{height:340px}
  .gb .gb-passos__f{height:620px}
  .gb .gb-passo{grid-template-columns:46px 1fr;padding:18px 0}
  .gb .gb-passo h3{font-size:22px}
  .gb .gb-ed{gap:34px 12px;align-items:start}
  .gb .gb-e1,.gb .gb-e3,.gb .gb-e4{grid-column:1/13}
  .gb .gb-e1 .gb-ph{height:340px}
  .gb .gb-e3 .gb-ph{height:300px}
  .gb .gb-e4 .gb-ph{height:330px}
  .gb .gb-cap{font-size:13px;margin-top:9px}
  .gb .gb-kit{grid-template-columns:1fr auto;gap:2px 12px;padding:22px 2px}
  .gb .gb-kit h3{font-size:32px;grid-column:1/3}
  .gb .gb-kit small{grid-column:1}
  .gb .gb-kit strong{grid-row:2;grid-column:2;font-size:20px}
  .gb .gb-seta{display:none}
  .gb .gb-tag{margin-left:6px;font-size:10.5px;padding:2px 8px}
  .gb .gb-fatia{font-size:14px}
  .gb .gb-fatia th,.gb .gb-fatia td{padding:14px 7px}
  .gb .gb-li{font-size:23px}
  .gb .gb-linha h2{font-size:36px}
  .gb.gb-rev{padding:44px 0}
  .gb .gb-rev h2{font-size:28px}
  .gb .gb-sinais__in{grid-template-columns:1fr 1fr;gap:26px 16px}
  .gb .gb-sinal{font-size:21px}
  .gb.gb-mail{padding:54px 0}
  .gb .gb-mail__in{display:block}
  .gb .gb-mail h2{font-size:34px;margin-bottom:18px}
  .gb .gb-mail__f{width:100%}
  .gb .gb-mail .gb-btn{padding:0 22px}
  .gb .gb-rodape__g{grid-template-columns:1fr 1fr}
  .gb .gb-rodape__g>div:first-child{grid-column:span 2}
  .gb.gb-compra{padding:0 0 56px}
  .gb.gb-compra .gb-w{padding:0}
  .gb .gb-compra__g{gap:0}
  .gb .gb-gal-main{border-radius:0;aspect-ratio:auto;height:272px}
  .gb .gb-thumbs{display:flex;overflow-x:auto;padding:0 22px;margin-top:6px;gap:6px;scrollbar-width:none}
  .gb .gb-thumb{flex:0 0 44px;width:44px;height:44px}
  .gb .gb-info{position:static;padding:10px 22px 0}
  .gb .gb-info h1{font-size:30px}
  .gb .gb-tit{display:flex;justify-content:space-between;gap:10px;align-items:baseline}
  .gb .gb-preco{font-size:20px;margin:0}
  .gb .gb-bens{flex-wrap:nowrap;justify-content:space-between;gap:4px;margin:7px 0 15px}
  .gb .gb-bens li{padding:3px 9px;font-size:11.5px;white-space:nowrap}
  .gb .gb-opts{gap:7px}
  .gb .gb-opt{min-height:88px;padding:12px 3px 7px}
  .gb .gb-opt strong{font-size:17px}
  .gb .gb-opt small{font-size:11px}
  .gb .gb-opt em{font-size:9.5px;padding:2px 7px}
  .gb .gb-conta{font-size:12.5px;margin:7px 0;min-height:18px}
  .gb .gb-info .gb-btn{min-height:50px}
  .gb .gb-selos{font-size:12px}
  .gb.gb-ajuste{padding-top:76px}
  .gb .gb-capa{max-width:270px;font-size:29px}
  .gb .gb-tempo{grid-template-columns:minmax(0,1fr)}
  .gb .gb-tempo li{border-top:0;border-left:1px solid var(--gb-pet);padding:0 0 24px 22px}
  .gb .gb-tempo li::before{top:0;left:-5px}
  .gb .gb-tempo b{font-size:24px}
  .gb .gb-ent h2{margin-bottom:30px}
  .gb .gb-barra{position:fixed;z-index:9;left:0;right:0;bottom:0;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px;background:var(--gb-creme);border-top:1px solid var(--gb-line);display:none}
  .gb .gb-barra.is-on{display:flex}
  .gb .gb-barra .gb-btn{min-height:46px;padding:0 24px}
  .gb .gb-barra b{font-weight:600}
}
```

### Arquivo: assets/gb-loja.js

```js
/* Holdwellco: comportamento das seções gb-*. Sem dependências. Compatível com o editor do tema (shopify:section:load e unload). */
(function () {
  if (window.__gbLoja) return;
  window.__gbLoja = true;

  var cleanups = new WeakMap();

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function openDrawer(resp, trigger) {
    var drawer = document.querySelector('cart-drawer');
    if (!drawer) return false;
    if (resp && resp.sections && typeof drawer.renderContents === 'function') {
      drawer.classList.remove('is-empty');
      drawer.renderContents(resp);
      return true;
    }
    if (typeof drawer.open === 'function') { drawer.open(trigger); return true; }
    return false;
  }

  /* ---------- cabeçalho: o carrinho abre a gaveta do tema, se existir ---------- */
  function initCabecalho(root) {
    var link = $('[data-gb-cart]', root);
    var menu = $('[data-gb-menu]', root);
    if (!link && !menu) return function () {};
    var ctrl = new AbortController();
    if (menu) {
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.open) { menu.open = false; $('summary', menu).focus(); }
      }, { signal: ctrl.signal });
    }
    if (!link) return function () { ctrl.abort(); };
    link.addEventListener('click', function (e) {
      var drawer = document.querySelector('cart-drawer');
      if (drawer && typeof drawer.open === 'function') {
        e.preventDefault();
        drawer.open(link);
      }
    }, { signal: ctrl.signal });
    return function () { ctrl.abort(); };
  }

  function refreshCount() {
    fetch(((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/') + 'cart.js', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (c) {
        if (!c) return;
        $$('[data-gb-cart-count]').forEach(function (el) {
          el.textContent = c.item_count;
          el.hidden = !c.item_count;
        });
      })
      .catch(function () {});
  }

  /* ---------- produto: galeria, variante, kits, adicional e carrinho ---------- */
  function initCompra(root) {
    var dataEl = $('[data-gb-data]', root);
    if (!dataEl) return function () {};
    var data;
    try { data = JSON.parse(dataEl.textContent); } catch (e) { return function () {}; }

    var ctrl = new AbortController();
    var on = function (el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, Object.assign({ signal: ctrl.signal }, opt || {})); };

    var form = $('[data-gb-form]', root);
    var idInput = $('[data-gb-variant-id]', root);
    var addBtn = $('[data-gb-add]', root);
    var bar = $('[data-gb-bar]', root);
    var msg = $('[data-gb-msg]', root);
    var slides = $$('[data-gb-slide]', root);
    var thumbs = $$('[data-gb-thumb]', root);
    var cards = $$('[data-gb-q]', root);
    var variantBtns = $$('[data-gb-vid]', root);
    var addon = $('[data-gb-addon]', root);
    var addonSel = $('[data-gb-addon-var]', root);

    var byId = {};
    data.variantes.forEach(function (v) { byId[v.id] = v; });
    var state = { vid: Number(idInput ? idInput.value : data.variantes[0].id), q: 1, addon: false, avid: data.adicional ? data.adicional.id : 0, busy: false };
    if (data.kits && data.inicial) state.q = Number(data.inicial);
    /* link de um cartão de kit (?qty=2 ou 3): só vale com os kits ligados */
    function qtyFromUrl() {
      var m = /[?&]qty=([123])(?:&|#|$)/.exec(window.location.search + '&');
      return m ? Number(m[1]) : 0;
    }
    if (data.kits && qtyFromUrl()) state.q = qtyFromUrl();
    function adonCents() {
      if (!data.adicional) return 0;
      var vs = data.adicional.variantes || [];
      for (var i = 0; i < vs.length; i++) { if (vs[i].id === state.avid) return vs[i].cents; }
      return data.adicional.cents;
    }

    function fmt(c) {
      try {
        return new Intl.NumberFormat(data.locale || undefined, { style: 'currency', currency: data.moeda || 'USD' }).format(c / 100);
      } catch (e) { return '$' + (c / 100).toFixed(2); }
    }
    function setText(sel, text) { $$(sel, root).forEach(function (el) { el.textContent = text; }); }
    function showMsg(text) { if (msg) { msg.textContent = text || ''; msg.hidden = !text; } }

    /* preço do kit: mesma conta do Liquid, em centavos. Só vale com o desconto automático da loja ligado (kits_confirmados). */
    function tier(unit, q) {
      var pct = 0;
      if (data.kits) { pct = q === 3 ? data.pct3 : (q === 2 ? data.pct2 : 0); }
      return Math.round(unit * q * (100 - pct) / 100);
    }
    function current() { return byId[state.vid] || data.variantes[0]; }

    function render() {
      var v = current();
      var unit = v.cents;
      if (idInput) idInput.value = v.id;
      setText('[data-gb-preco]', fmt(unit));
      [1, 2, 3].forEach(function (n) {
        var t = tier(unit, n);
        setText('[data-gb-cp="' + n + '"]', fmt(t));
        setText('[data-gb-ce="' + n + '"]', fmt(Math.round(t / n)));
      });
      var total = tier(unit, state.q) + (state.addon && data.adicional ? adonCents() : 0);
      var ok = !!v.disponivel;
      [addBtn, $('[data-gb-add-bar]', root)].forEach(function (b) { if (b) { b.disabled = !ok; b.setAttribute('aria-disabled', ok ? 'false' : 'true'); } });
      setText('[data-gb-label]', ok ? data.textos.botao : data.textos.esgotado);
      $$('[data-gb-total-wrap]', root).forEach(function (w) { w.hidden = !ok; });
      setText('[data-gb-total]', fmt(total));
      cards.forEach(function (c) {
        var is = Number(c.getAttribute('data-gb-q')) === state.q;
        c.setAttribute('aria-checked', is ? 'true' : 'false');
        c.tabIndex = is ? 0 : -1;
      });
      variantBtns.forEach(function (b) {
        var is = Number(b.getAttribute('data-gb-vid')) === state.vid;
        b.setAttribute('aria-checked', is ? 'true' : 'false');
        b.tabIndex = is ? 0 : -1;
      });
      if (addon) addon.setAttribute('aria-checked', state.addon ? 'true' : 'false');
      if (data.adicional && data.adicional.variantes) {
        var vsA = data.adicional.variantes;
        for (var k = 0; k < vsA.length; k++) {
          if (vsA[k].id === state.avid) { setText('[data-gb-addon-price]', fmt(vsA[k].cents)); setText('[data-gb-addon-vt]', vsA[k].titulo); }
        }
      }
      var conta = '';
      if (state.q === 1) { conta = data.textos.conta1 || ''; }
      else if (data.kits) {
        var save = unit * state.q - tier(unit, state.q);
        conta = data.textos.economia + ' ' + fmt(save) + (data.textos.guia ? ', ' + data.textos.guia : '');
      }
      setText('[data-gb-conta]', conta);
      showMsg('');
    }

    function showSlide(i) {
      slides.forEach(function (s, n) { s.classList.toggle('is-on', n === i); });
      thumbs.forEach(function (t, n) { t.setAttribute('aria-pressed', n === i ? 'true' : 'false'); });
    }
    thumbs.forEach(function (t, n) { on(t, 'click', function () { showSlide(n); }); });

    function arrows(e, items, apply) {
      var dir = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0);
      if (!dir) return;
      e.preventDefault();
      var i = items.indexOf(e.currentTarget);
      var next = items[(i + dir + items.length) % items.length];
      apply(next);
      next.focus();
    }
    cards.forEach(function (c) {
      on(c, 'click', function () { state.q = Number(c.getAttribute('data-gb-q')); render(); });
      on(c, 'keydown', function (e) { arrows(e, cards, function (n) { state.q = Number(n.getAttribute('data-gb-q')); render(); }); });
    });
    variantBtns.forEach(function (b) {
      on(b, 'click', function () { state.vid = Number(b.getAttribute('data-gb-vid')); render(); });
      on(b, 'keydown', function (e) { arrows(e, variantBtns, function (n) { state.vid = Number(n.getAttribute('data-gb-vid')); render(); }); });
    });
    on(addon, 'click', function () { state.addon = !state.addon; render(); });
    on(addonSel, 'change', function () { state.avid = Number(addonSel.value); render(); });
    /* cartão de kit (seção de kits): marca a quantidade na compra. Sem kits ligados, não muda nada. */
    $$('[data-gb-kit]', document).forEach(function (a) {
      on(a, 'click', function (e) {
        if (!data.kits) return;
        e.preventDefault();
        state.q = Number(a.getAttribute('data-gb-kit'));
        render();
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    /* barra fixa no celular: aparece quando o botão principal sai da tela por cima */
    var io = null;
    if (bar && addBtn && 'IntersectionObserver' in window) {
      var footer = document.querySelector('.gb-rodape');
      io = new IntersectionObserver(function (entries) {
        var e = entries[0];
        var show = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (show && footer && footer.getBoundingClientRect().top < window.innerHeight) show = false;
        bar.classList.toggle('is-on', show);
      });
      io.observe(addBtn);
    }

    /* carrinho: um add.js com todas as unidades; depois abre a gaveta do tema ou vai ao carrinho */
    function add(e) {
      if (e) e.preventDefault();
      var v = current();
      if (state.busy || !v.disponivel) return;
      var items = [{ id: v.id, quantity: state.q }];
      if (state.addon && data.adicional) items.push({ id: state.avid || data.adicional.id, quantity: 1 });
      state.busy = true;
      if (addBtn) addBtn.setAttribute('aria-busy', 'true');
      showMsg('');
      fetch(data.cartAdd, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ items: items, sections: 'cart-drawer,cart-icon-bubble', sections_url: window.location.pathname })
      }).then(function (r) {
        return r.json().then(function (j) { if (!r.ok) throw new Error(j.description || j.message || 'error'); return j; });
      }).then(function (j) {
        state.busy = false;
        if (addBtn) addBtn.removeAttribute('aria-busy');
        refreshCount();
        if (!openDrawer(j, addBtn)) window.location.href = data.cart;
      }).catch(function (err) {
        state.busy = false;
        if (addBtn) addBtn.removeAttribute('aria-busy');
        showMsg(err && err.message && err.message !== 'error' ? err.message : data.textos.erro);
      });
    }
    on(form, 'submit', add);
    on($('[data-gb-add-bar]', root), 'click', function () { add(); });

    render();

    return function () {
      ctrl.abort();
      if (io) io.disconnect();
    };
  }

  var inits = { compra: initCompra, cabecalho: initCabecalho };

  function start(scope) {
    var all = $$('[data-gb-section]', scope);
    if (scope.matches && scope.matches('[data-gb-section]')) all.push(scope);
    all.forEach(function (el) {
      var fn = inits[el.getAttribute('data-gb-section')];
      if (!fn || cleanups.has(el)) return;
      cleanups.set(el, fn(el));
    });
  }
  function stop(scope) {
    var all = $$('[data-gb-section]', scope);
    if (scope.matches && scope.matches('[data-gb-section]')) all.push(scope);
    all.forEach(function (el) {
      var c = cleanups.get(el);
      if (c) { c(); cleanups.delete(el); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { start(document); });
  else start(document);
  document.addEventListener('shopify:section:load', function (e) { start(e.target); });
  document.addEventListener('shopify:section:unload', function (e) { stop(e.target); });
})();
```

### Arquivo: sections/gb-ajuste.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-ajuste">
  <div class="gb-w gb-macro">
      <div>
        <h2>{{ s.titulo | escape }}</h2>
        {%- if s.texto != blank -%}<p class="gb-lead">{{ s.texto | escape }}</p>{%- endif -%}
      </div>
      <div class="gb-ph gb-macro__f is-7-5">
        {%- render 'gb-foto', image: s.foto, alt: s.alt, recorte: s.recorte, fx: s.foco_x, fy: s.foco_y, sizes: '(min-width: 760px) 60vw, 100vw' -%}
      </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: ajuste da faixa",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Slip it on. Adjust the strap."
    },
    {
      "type": "text",
      "id": "texto",
      "label": "Texto",
      "default": ""
    },
    {
      "type": "header",
      "content": "Foto"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto"
    },
    {
      "type": "text",
      "id": "recorte",
      "label": "Recorte da foto (x, y, largura, altura em %)",
      "default": "0,0,100,71.93",
      "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
    },
    {
      "type": "range",
      "id": "foco_x",
      "label": "Foco horizontal",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "range",
      "id": "foco_y",
      "label": "Foco vertical",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 40
    },
    {
      "type": "text",
      "id": "alt",
      "label": "Texto alternativo da foto",
      "default": "Hands adjusting the mask strap"
    }
  ],
  "presets": [
    {
      "name": "Holdwell: ajuste da faixa"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-avaliacoes.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
{%- if s.ativo -%}
  <section class="gb gb-rev" data-depende="avaliacoes-reais">
    <div class="gb-w">
      <h2>{{ s.titulo | escape }}</h2>
      {%- if s.texto != blank -%}<p>{{ s.texto | escape }}</p>{%- endif -%}
    </div>
  </section>
{%- else -%}
  {%- render 'gb-aviso-editor', texto: 'Avaliações desligadas e vazias. Ligue só quando houver avaliação ligada a pedido real (plano M1).' -%}
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: avaliações",
  "tag": "section",
  "settings": [
    {
      "type": "checkbox",
      "id": "ativo",
      "label": "Mostrar",
      "default": false,
      "info": "Nasce desligada e vazia. Esta seção não carrega o widget de avaliações do app. Ligue só com avaliação real de pedido (plano M1); sem nota, sem estrela e sem número."
    },
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Reviews"
    },
    {
      "type": "text",
      "id": "texto",
      "label": "Texto reservado",
      "default": "Reviews from verified orders will appear here."
    }
  ],
  "presets": [
    {
      "name": "Holdwell: avaliações"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-aviso.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
{%- if s.ativo and s.texto != blank -%}
  <div class="gb gb-aviso" data-depende="politica"><p>{{ s.texto | escape }}</p></div>
{%- else -%}
  {%- render 'gb-aviso-editor', texto: 'Faixa de aviso desligada. Ligue só depois de conferir o texto com as políticas publicadas (frete e devolução).' -%}
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: aviso",
  "tag": "section",
  "settings": [
    {
      "type": "checkbox",
      "id": "ativo",
      "label": "Mostrar a faixa",
      "default": false,
      "info": "Frete grátis a partir de $49 e 30 dias de devolução saem da política publicada. Ligue só se a política continuar com esses termos."
    },
    {
      "type": "text",
      "id": "texto",
      "label": "Texto",
      "default": "Free US shipping from $49. 30-day returns."
    }
  ],
  "presets": [
    {
      "name": "Holdwell: aviso"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-cabecalho.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<header class="gb gb-top" data-gb-section="cabecalho">
  <div class="gb-w gb-top__in">
    <details class="gb-menu" data-gb-menu>
      <summary class="gb-menu__b" aria-label="{{ s.menu_aria | escape }}">{%- render 'gb-icon', name: 'menu' -%}</summary>
      <nav class="gb-menu__p" aria-label="{{ s.menu_aria | escape }}">
        {%- for block in section.blocks -%}
          {%- if block.settings.url != blank -%}<a href="{{ block.settings.url }}">{{ block.settings.texto | escape }}</a>{%- endif -%}
        {%- endfor -%}
        {%- if s.contato_url != blank -%}<a href="{{ s.contato_url }}">{{ s.contato_texto | escape }}</a>{%- endif -%}
        {%- if s.rastreio_url != blank -%}<a href="{{ s.rastreio_url }}">{{ s.rastreio_texto | escape }}</a>{%- endif -%}
      </nav>
    </details>
    <a class="gb-logo" href="{{ routes.root_url }}">
      {%- if s.logo != blank -%}{{ s.logo | image_url: width: 96 | image_tag: width: 32, height: 32, alt: '', loading: 'eager' }}{%- endif -%}
      {{ s.nome | escape }}
    </a>
    <nav class="gb-nav" aria-label="{{ s.nav_aria | escape }}">
      {%- for block in section.blocks -%}
        {%- if block.settings.url != blank -%}<a href="{{ block.settings.url }}" {{ block.shopify_attributes }}>{{ block.settings.texto | escape }}</a>{%- endif -%}
      {%- endfor -%}
    </nav>
    <a class="gb-cart" href="{{ routes.cart_url }}" aria-label="{{ s.carrinho | escape }}" data-gb-cart>
      {%- render 'gb-icon', name: 'cart' -%}
      <span class="gb-cart__n" data-gb-cart-count{% if cart.item_count == 0 %} hidden{% endif %}>{{ cart.item_count }}</span>
    </a>
  </div>
</header>

{% schema %}
{
  "name": "Holdwell: cabeçalho",
  "tag": "header",
  "settings": [
    {
      "type": "paragraph",
      "content": "Com esta seção na página, o cabeçalho e o rodapé padrão do tema ficam escondidos só nesta prévia. O carrinho lateral do tema continua funcionando."
    },
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo"
    },
    {
      "type": "text",
      "id": "nome",
      "label": "Nome ao lado do logo",
      "default": "Holdwellco"
    },
    {
      "type": "text",
      "id": "nav_aria",
      "label": "Leitor de tela: menu",
      "default": "Main"
    },
    {
      "type": "text",
      "id": "carrinho",
      "label": "Leitor de tela: carrinho",
      "default": "Cart"
    },
    {
      "type": "header",
      "content": "Menu do celular"
    },
    {
      "type": "text",
      "id": "menu_aria",
      "label": "Leitor de tela: botão do menu",
      "default": "Menu"
    },
    {
      "type": "url",
      "id": "contato_url",
      "label": "Link de Contact",
      "info": "Vazio esconde o link. Use a página de contato que já existe na loja."
    },
    {
      "type": "text",
      "id": "contato_texto",
      "label": "Texto do link de contato",
      "default": "Contact"
    },
    {
      "type": "url",
      "id": "rastreio_url",
      "label": "Link de Track Order",
      "info": "Vazio esconde o link. A coleta não achou página de rastreio: preencha só se ela existir."
    },
    {
      "type": "text",
      "id": "rastreio_texto",
      "label": "Texto do link de rastreio",
      "default": "Track Order"
    }
  ],
  "blocks": [
    {
      "type": "link",
      "name": "Link do menu",
      "settings": [
        {
          "type": "text",
          "id": "texto",
          "label": "Texto",
          "default": "Shop All"
        },
        {
          "type": "url",
          "id": "url",
          "label": "Link"
        }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    {
      "name": "Holdwell: cabeçalho"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-cadastro.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
{%- if s.ativo -%}
  <section class="gb gb-mail" data-depende="cadastro">
    <div class="gb-w gb-mail__in">
      <h2>{{ s.titulo | escape }}</h2>
      {%- form 'customer', id: 'gb-cadastro', class: 'gb-mail__f' -%}
        {%- if form.posted_successfully? -%}
          <p class="gb-mail__ok" role="status">{{ s.ok | escape }}</p>
        {%- else -%}
          <input type="hidden" name="contact[tags]" value="newsletter">
          <div class="gb-mail__c">
            <label for="gb-email-{{ section.id }}">{{ s.campo | escape }}</label>
            <input id="gb-email-{{ section.id }}" type="email" name="contact[email]" autocomplete="email" required{% if form.errors %} aria-invalid="true"{% endif %}>
            {%- if form.errors -%}<p class="gb-mail__erro" role="alert">{{ s.erro | escape }}</p>{%- endif -%}
          </div>
          <button class="gb-btn" type="submit">{{ s.botao | escape }}</button>
        {%- endif -%}
      {%- endform -%}
    </div>
  </section>
{%- else -%}
  {%- render 'gb-aviso-editor', texto: 'Cadastro de e-mail desligado. Ligue só depois de decidir o que o cliente recebe (o título promete algo) e de conferir como a loja trata a lista.' -%}
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: cadastro",
  "tag": "section",
  "settings": [
    {
      "type": "checkbox",
      "id": "ativo",
      "label": "Mostrar o cadastro",
      "default": false,
      "info": "Usa o formulário nativo de cliente da loja (inscrição de e-mail marketing). O título promete novidades: só ligue se a loja for enviar isso."
    },
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "First to know"
    },
    {
      "type": "text",
      "id": "campo",
      "label": "Nome do campo",
      "default": "Email address"
    },
    {
      "type": "text",
      "id": "botao",
      "label": "Botão",
      "default": "Subscribe"
    },
    {
      "type": "text",
      "id": "ok",
      "label": "Mensagem depois de enviar",
      "default": "Thanks for subscribing."
    },
    {
      "type": "text",
      "id": "erro",
      "label": "Mensagem de erro",
      "default": "Enter a valid email address."
    }
  ],
  "presets": [
    {
      "name": "Holdwell: cadastro"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-caixa.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
{%- assign p = s.produto | default: product -%}
<section class="gb gb-sec gb-caixa">
  <div class="gb-w gb-caixa__g">
    <div class="gb-ph gb-caixa__f">
      {%- render 'gb-foto', image: s.foto, alt: s.alt, recorte: s.recorte, fx: s.foco_x, fy: s.foco_y, sizes: '(min-width: 760px) 55vw, 100vw' -%}
    </div>
    <div>
      <h2>{{ s.titulo | escape }}</h2>
      <ul class="gb-lista">
        {%- for block in section.blocks -%}
          <li {{ block.shopify_attributes }}>{{ block.settings.texto | escape }}</li>
        {%- endfor -%}
      </ul>
      {%- if p != blank -%}
        <div class="gb-cx-p">{{ p.price | money }}</div>
        {%- if request.page_type == 'product' -%}
          <a class="gb-btn" href="#comprar">{{ s.botao_produto | escape }}</a>
        {%- else -%}
          <a class="gb-btn" href="{{ p.url }}">{{ s.botao | escape }}</a>
        {%- endif -%}
      {%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: na caixa",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "In the box"
    },
    {
      "type": "product",
      "id": "produto",
      "label": "Produto (o preço vem dele; na página do produto, vazio usa o produto da página)"
    },
    {
      "type": "text",
      "id": "botao",
      "label": "Botão na home",
      "default": "Shop the mask"
    },
    {
      "type": "text",
      "id": "botao_produto",
      "label": "Botão na página do produto",
      "default": "Choose your set"
    },
    {
      "type": "header",
      "content": "Foto"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto"
    },
    {
      "type": "text",
      "id": "recorte",
      "label": "Recorte da foto (x, y, largura, altura em %)",
      "default": "0,13.96,100,86.04",
      "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
    },
    {
      "type": "range",
      "id": "foco_x",
      "label": "Foco horizontal",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "range",
      "id": "foco_y",
      "label": "Foco vertical",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "text",
      "id": "alt",
      "label": "Texto alternativo da foto",
      "default": "Mask, strap, USB-C cable and manual laid out flat"
    }
  ],
  "blocks": [
    {
      "type": "item",
      "name": "Item",
      "settings": [
        {
          "type": "text",
          "id": "texto",
          "label": "Texto",
          "default": "LED face mask"
        }
      ]
    }
  ],
  "max_blocks": 8,
  "presets": [
    {
      "name": "Holdwell: na caixa"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-comparacao.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
{%- if s.ativo -%}
  <section class="gb gb-sec gb-compara" data-depende="comparacao">
    <div class="gb-w">
      <h2>{{ s.titulo | escape }}</h2>
      <table class="gb-fatia">
        <thead><tr><th scope="col"><span class="gb-sr">{{ s.col_tema | escape }}</span></th><th scope="col">{{ s.col_outras | escape }}</th><th scope="col">{{ s.col_nos | escape }}</th></tr></thead>
        <tbody>
          {%- for block in section.blocks -%}
            <tr {{ block.shopify_attributes }}><th scope="row">{{ block.settings.tema | escape }}</th><td>{{ block.settings.outras | escape }}</td><td>{{ block.settings.nos | escape }}</td></tr>
          {%- endfor -%}
        </tbody>
      </table>
    </div>
  </section>
{%- else -%}
  {%- render 'gb-aviso-editor', texto: 'Tabela de comparação desligada. Ligue só depois de resolver o preço comparado do kit completo e a oferta com data, e de aprovar o texto.' -%}
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: comparação",
  "tag": "section",
  "settings": [
    {
      "type": "checkbox",
      "id": "ativo",
      "label": "Mostrar a tabela",
      "default": false,
      "info": "As frases dizem que a loja tem um preço real e nenhum contador. Só ligue se isso for verdade na loja inteira (preço comparado do kit completo e aviso com data de Black Friday conferidos)."
    },
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Plain facts, no theater."
    },
    {
      "type": "text",
      "id": "col_tema",
      "label": "Leitor de tela: coluna do tema",
      "default": "Topic"
    },
    {
      "type": "text",
      "id": "col_outras",
      "label": "Coluna das outras lojas",
      "default": "Many LED mask stores"
    },
    {
      "type": "text",
      "id": "col_nos",
      "label": "Coluna da loja",
      "default": "Holdwellco"
    }
  ],
  "blocks": [
    {
      "type": "linha",
      "name": "Linha",
      "settings": [
        {
          "type": "text",
          "id": "tema",
          "label": "Tema",
          "default": "Price"
        },
        {
          "type": "text",
          "id": "outras",
          "label": "Outras lojas",
          "default": "Inflated \"was\" price"
        },
        {
          "type": "text",
          "id": "nos",
          "label": "Esta loja",
          "default": "One real price"
        }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    {
      "name": "Holdwell: comparação"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-compra.liquid

```liquid
{%- render 'gb-assets' -%}
{%- liquid
  assign s = section.settings
  assign p = s.produto | default: product
  assign kits = false
  if s.kits_confirmados
    assign kits = true
  endif
  assign unit_v = p.selected_or_first_available_variant
  assign unit = unit_v.price
  assign q0 = 1
  if kits
    assign q0 = s.kit_inicial
  endif
  assign guia_on = false
  if kits and s.guia_confirmado and s.guia_produto != blank
    assign guia_on = true
    assign guia_preco = s.guia_produto.price | money
    assign guia_txt = s.guia_texto | replace: '{price}', guia_preco
  endif
  assign ad = s.adicional_produto
  assign ad_on = false
  if s.adicional_ativo and ad != blank and ad.available
    assign ad_on = true
  endif
  assign ad_v = ad.selected_or_first_available_variant
  assign ad_multi = false
  if ad_on and ad.variants.size > 1
    assign ad_multi = true
  endif
-%}
{%- if p == blank -%}
  {%- render 'gb-aviso-editor', texto: 'Escolha o produto nesta seção.' -%}
{%- else -%}
<section class="gb gb-compra" id="comprar" data-gb-section="compra">
  <div class="gb-w">
    <div class="gb-compra__g">
      <div>
        <div class="gb-gal-main">
          {%- for block in section.blocks -%}
            {%- assign b = block.settings -%}
            <div class="gb-slide{% if forloop.first %} is-on{% endif %}" data-gb-slide {{ block.shopify_attributes }}>
              {%- render 'gb-foto', image: b.foto, alt: b.alt, recorte: b.recorte, fx: b.foco_x, fy: b.foco_y, eager: forloop.first, sizes: '(min-width: 760px) 55vw, 100vw' -%}
            </div>
          {%- endfor -%}
        </div>
        <div class="gb-thumbs">
          {%- for block in section.blocks -%}
            {%- assign b = block.settings -%}
            <button class="gb-thumb" type="button" data-gb-thumb aria-pressed="{% if forloop.first %}true{% else %}false{% endif %}" aria-label="{{ s.rotulo_foto | escape }} {{ b.rotulo | escape }}">
              {%- render 'gb-foto', image: b.foto, alt: '', recorte: b.recorte, fx: b.foco_x, fy: b.foco_y, sizes: '120px', width: 320 -%}
            </button>
          {%- endfor -%}
        </div>
      </div>
      <div class="gb-info">
        <div class="gb-tit">
          <h1>{{ p.title | escape }}</h1>
          <div class="gb-preco" data-gb-preco>{{ unit | money }}</div>
        </div>
        <ul class="gb-bens">
          {%- assign lista_bens = s.beneficios | split: '|' -%}
          {%- for item in lista_bens -%}
            <li>{{ item | strip | escape }}</li>
          {%- endfor -%}
        </ul>
        <form method="post" action="{{ routes.cart_add_url }}" accept-charset="UTF-8" enctype="multipart/form-data" data-gb-form>
          <input type="hidden" name="id" value="{{ unit_v.id }}" data-gb-variant-id>
          {%- if p.variants.size > 1 -%}
            <div class="gb-var">
              <div class="gb-var__t" id="gb-var-{{ section.id }}">{{ s.rotulo_variante | escape }}</div>
              <div class="gb-var__v" role="radiogroup" aria-labelledby="gb-var-{{ section.id }}">
                {%- for v in p.variants -%}
                  <button class="gb-var__b{% unless v.available %} is-esgotada{% endunless %}" type="button" role="radio" aria-checked="{% if v.id == unit_v.id %}true{% else %}false{% endif %}" data-gb-vid="{{ v.id }}">{{ v.title | escape }}</button>
                {%- endfor -%}
              </div>
            </div>
          {%- endif -%}
          {%- if kits -%}
            {%- liquid
              assign f2 = 100 | minus: s.pct2
              assign f3 = 100 | minus: s.pct3
              assign p2 = unit | times: 2 | times: f2 | divided_by: 100.0 | round
              assign p3 = unit | times: 3 | times: f3 | divided_by: 100.0 | round
            -%}
            <div class="gb-opts" role="radiogroup" aria-label="{{ s.rotulo_kits | escape }}">
              <button class="gb-opt" type="button" role="radio" aria-checked="{% if q0 == 1 %}true{% else %}false{% endif %}" data-gb-q="1"><b>{{ s.nome_1 | escape }}</b><strong data-gb-cp="1">{{ unit | money }}</strong><small><span data-gb-ce="1">{{ unit | money }}</span> {{ s.cada | escape }}</small></button>
              <button class="gb-opt" type="button" role="radio" aria-checked="{% if q0 == 2 %}true{% else %}false{% endif %}" data-gb-q="2"><b>{{ s.nome_2 | escape }}</b><strong data-gb-cp="2">{{ p2 | money }}</strong><small><span data-gb-ce="2">{{ p2 | divided_by: 2.0 | round | money }}</span> {{ s.cada | escape }}</small></button>
              <button class="gb-opt" type="button" role="radio" aria-checked="{% if q0 == 3 %}true{% else %}false{% endif %}" data-gb-q="3">{% if s.selo != blank %}<em>{{ s.selo | escape }}</em>{% endif %}<b>{{ s.nome_3 | escape }}</b><strong data-gb-cp="3">{{ p3 | money }}</strong><small><span data-gb-ce="3">{{ p3 | divided_by: 3.0 | round | money }}</span> {{ s.cada | escape }}</small></button>
            </div>
            <div class="gb-conta" aria-live="polite" data-gb-conta></div>
          {%- endif -%}
          <button class="gb-btn" type="submit" data-gb-add style="margin-top:14px"><span data-gb-label>{{ s.botao | escape }}</span><span data-gb-total-wrap>,&nbsp;<span data-gb-total>{{ unit | money }}</span></span></button>
          <p class="gb-msg" role="alert" data-gb-msg hidden></p>
        </form>
        {%- if s.politica_confirmada -%}
          <div class="gb-selos" data-depende="politica"><span>{{ s.selo_1 | escape }}</span><span>{{ s.selo_2 | escape }}</span></div>
        {%- endif -%}
        {%- if ad_on -%}
          <button class="gb-add" type="button" role="checkbox" aria-checked="false" data-gb-addon data-depende="adicional"><span><b>{{ s.adicional_texto | escape }} {{ ad.title | escape }}</b><small>{% if ad_multi %}<span data-gb-addon-vt>{{ ad_v.title | escape }}</span>, {% endif %}<span data-gb-addon-price>{{ ad_v.price | money }}</span></small></span><i>{% render 'gb-icon', name: 'check', size: 18 %}</i></button>
          {%- if ad_multi -%}
            <label class="gb-addvar" for="gb-addvar-{{ section.id }}">
              <span>{{ s.adicional_variante | escape }}</span>
              <select id="gb-addvar-{{ section.id }}" data-gb-addon-var>
                {%- for v in ad.variants -%}
                  <option value="{{ v.id }}"{% if v.id == ad_v.id %} selected{% endif %}{% unless v.available %} disabled{% endunless %}>{{ v.title | escape }}</option>
                {%- endfor -%}
              </select>
            </label>
          {%- endif -%}
        {%- endif -%}
        {%- if s.descricao_confirmada and p.description != blank -%}
          <details class="gb-desc" data-depende="descricao-revisada">
            <summary>{{ s.descricao_titulo | escape }}</summary>
            <div class="gb-desc__t">{{ p.description }}</div>
          </details>
        {%- endif -%}
      </div>
    </div>
  </div>
  <div class="gb-barra" data-gb-bar>
    <b data-gb-total-wrap data-gb-total-bar><span data-gb-total>{{ unit | money }}</span></b>
    <button class="gb-btn" type="button" data-gb-add-bar><span data-gb-label>{{ s.botao | escape }}</span></button>
  </div>
  <script type="application/json" data-gb-data>
    {
      "variantes": [{% for v in p.variants %}{"id": {{ v.id }}, "cents": {{ v.price }}, "disponivel": {{ v.available | json }}, "titulo": {{ v.title | json }}}{% unless forloop.last %}, {% endunless %}{% endfor %}],
      "kits": {{ kits | json }},
      "pct2": {{ s.pct2 }},
      "pct3": {{ s.pct3 }},
      "inicial": {{ q0 }},
      "adicional": {% if ad_on %}{"id": {{ ad_v.id }}, "cents": {{ ad_v.price }}, "variantes": [{% for v in ad.variants %}{"id": {{ v.id }}, "cents": {{ v.price }}, "titulo": {{ v.title | json }}}{% unless forloop.last %}, {% endunless %}{% endfor %}]}{% else %}null{% endif %},
      "cartAdd": {{ routes.cart_add_url | append: '.js' | json }},
      "cart": {{ routes.cart_url | json }},
      "moeda": {{ cart.currency.iso_code | json }},
      "locale": {{ request.locale.iso_code | json }},
      "textos": {
        "botao": {{ s.botao | json }},
        "esgotado": {{ s.esgotado | json }},
        "erro": {{ s.erro | json }},
        "conta1": {{ s.conta1 | json }},
        "economia": {{ s.economia | json }},
        "guia": {% if guia_on %}{{ guia_txt | json }}{% else %}""{% endif %}
      }
    }
  </script>
  <script type="application/ld+json">{{ p | structured_data }}</script>
</section>
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: compra",
  "tag": "section",
  "settings": [
    {
      "type": "product",
      "id": "produto",
      "label": "Produto (vazio usa o produto da página)"
    },
    {
      "type": "text",
      "id": "beneficios",
      "label": "Benefícios (separe com |)",
      "default": "7 light modes|180 LEDs|Cordless USB-C",
      "info": "O número de LEDs vem do desenho e depende do documento do fornecedor."
    },
    {
      "type": "text",
      "id": "botao",
      "label": "Botão",
      "default": "Add to cart"
    },
    {
      "type": "text",
      "id": "esgotado",
      "label": "Botão sem estoque",
      "default": "Sold out"
    },
    {
      "type": "text",
      "id": "erro",
      "label": "Mensagem de erro ao adicionar",
      "default": "We could not add this to your cart. Please try again."
    },
    {
      "type": "text",
      "id": "rotulo_foto",
      "label": "Leitor de tela: prefixo da miniatura",
      "default": "Show photo:"
    },
    {
      "type": "text",
      "id": "rotulo_variante",
      "label": "Nome da escolha de variante",
      "default": "Option"
    },
    {
      "type": "header",
      "content": "Kits de 2 e 3 máscaras"
    },
    {
      "type": "checkbox",
      "id": "kits_confirmados",
      "label": "Mostrar os kits",
      "default": false,
      "info": "Os totais dos kits só existem no carrinho se a loja tiver desconto automático (2 máscaras 15%, 3 máscaras 30%, sem código). O tema só mostra a conta; quem cobra é a loja. Confira os totais no carrinho antes de ligar. Desligado, só aparece 1 máscara pelo preço do produto."
    },
    {
      "type": "range",
      "id": "kit_inicial",
      "label": "Kit marcado ao abrir",
      "min": 1,
      "max": 3,
      "step": 1,
      "default": 1,
      "info": "O desenho propõe 2 marcado ao abrir. Isso precisa de aprovação do dono."
    },
    {
      "type": "range",
      "id": "pct2",
      "label": "Desconto de 2 máscaras",
      "min": 1,
      "max": 50,
      "step": 1,
      "unit": "%",
      "default": 15
    },
    {
      "type": "range",
      "id": "pct3",
      "label": "Desconto de 3 máscaras",
      "min": 1,
      "max": 60,
      "step": 1,
      "unit": "%",
      "default": 30
    },
    {
      "type": "text",
      "id": "rotulo_kits",
      "label": "Leitor de tela: grupo de kits",
      "default": "Choose quantity"
    },
    {
      "type": "text",
      "id": "nome_1",
      "label": "Kit 1",
      "default": "1 mask"
    },
    {
      "type": "text",
      "id": "nome_2",
      "label": "Kit 2",
      "default": "2 masks"
    },
    {
      "type": "text",
      "id": "nome_3",
      "label": "Kit 3",
      "default": "3 masks"
    },
    {
      "type": "text",
      "id": "selo",
      "label": "Selo do kit 3",
      "default": "Lowest per mask"
    },
    {
      "type": "text",
      "id": "cada",
      "label": "Depois do preço por máscara",
      "default": "each"
    },
    {
      "type": "text",
      "id": "conta1",
      "label": "Linha de conta do kit 1",
      "default": ""
    },
    {
      "type": "text",
      "id": "economia",
      "label": "Antes da economia",
      "default": "You save"
    },
    {
      "type": "header",
      "content": "Guia digital nos kits"
    },
    {
      "type": "checkbox",
      "id": "guia_confirmado",
      "label": "Dizer que o guia vem junto nos kits de 2 e 3",
      "default": false,
      "info": "Só vale com os kits ligados. Ligue se o carrinho entregar o guia sem cobrar."
    },
    {
      "type": "product",
      "id": "guia_produto",
      "label": "Produto do guia"
    },
    {
      "type": "text",
      "id": "guia_texto",
      "label": "Texto ({price} vira o preço do guia)",
      "default": "plus a {price} guide"
    },
    {
      "type": "header",
      "content": "Frete e devolução"
    },
    {
      "type": "checkbox",
      "id": "politica_confirmada",
      "label": "Mostrar as duas linhas de política",
      "default": false,
      "info": "Política publicada: frete grátis em pedidos de $49 ou mais e devolução em até 30 dias depois da entrega. Ligue só se não mudou."
    },
    {
      "type": "text",
      "id": "selo_1",
      "label": "Linha 1",
      "default": "Free US shipping from $49"
    },
    {
      "type": "text",
      "id": "selo_2",
      "label": "Linha 2",
      "default": "30-day returns"
    },
    {
      "type": "header",
      "content": "Produto adicional"
    },
    {
      "type": "checkbox",
      "id": "adicional_ativo",
      "label": "Mostrar o adicional",
      "default": false,
      "info": "Vende o produto adicional pelo preço dele, sem desconto exibido. Confirme o preço antes de ligar."
    },
    {
      "type": "product",
      "id": "adicional_produto",
      "label": "Produto adicional"
    },
    {
      "type": "text",
      "id": "adicional_texto",
      "label": "Texto antes do nome",
      "default": "Add the"
    },
    {
      "type": "text",
      "id": "adicional_variante",
      "label": "Nome da escolha de variante do adicional",
      "default": "Option"
    },
    {
      "type": "header",
      "content": "Descrição do produto"
    },
    {
      "type": "checkbox",
      "id": "descricao_confirmada",
      "label": "Mostrar a descrição do produto (bloco fechado)",
      "default": false,
      "info": "Leia a descrição no Admin antes de ligar. A descrição atual pode repetir a promessa de rugas e de linhas finas que o plano M2 manda tirar. Só ligue depois de revisar o texto."
    },
    {
      "type": "text",
      "id": "descricao_titulo",
      "label": "Título do bloco",
      "default": "Product details"
    }
  ],
  "blocks": [
    {
      "type": "foto",
      "name": "Foto da galeria",
      "settings": [
        {
          "type": "text",
          "id": "rotulo",
          "label": "Nome da foto (miniatura)",
          "default": ""
        },
        {
          "type": "image_picker",
          "id": "foto",
          "label": "Foto"
        },
        {
          "type": "text",
          "id": "recorte",
          "label": "Recorte da foto (x, y, largura, altura em %)",
          "default": "",
          "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
        },
        {
          "type": "range",
          "id": "foco_x",
          "label": "Foco horizontal",
          "min": 0,
          "max": 100,
          "step": 5,
          "unit": "%",
          "default": 50
        },
        {
          "type": "range",
          "id": "foco_y",
          "label": "Foco vertical",
          "min": 0,
          "max": 100,
          "step": 5,
          "unit": "%",
          "default": 50
        },
        {
          "type": "text",
          "id": "alt",
          "label": "Texto alternativo da foto",
          "default": ""
        }
      ]
    }
  ],
  "max_blocks": 8,
  "presets": [
    {
      "name": "Holdwell: compra"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-cuidado.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-cuidado">
  <div class="gb-w">
    <div class="gb-seguro">
      <h3>{{ s.titulo | escape }}</h3>
      <p>{{ s.texto | escape }}</p>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: cuidado",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Before you start"
    },
    {
      "type": "textarea",
      "id": "texto",
      "label": "Texto",
      "default": "Cosmetic device, not a medical device. Results vary. Keep your eyes closed during use. Do not use if you are pregnant, have epilepsy or a light-sensitive condition, or take medication that makes you sensitive to light. Check with your doctor if you are unsure."
    }
  ],
  "presets": [
    {
      "name": "Holdwell: cuidado"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-detalhes.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-detalhes">
  <div class="gb-w gb-ed">
    <h2>{{ s.titulo | escape }}</h2>
    {%- for block in section.blocks limit: 3 -%}
      {%- case forloop.index -%}
        {%- when 2 -%}{%- assign cls = 'gb-e3' -%}
        {%- when 3 -%}{%- assign cls = 'gb-e4' -%}
        {%- else -%}{%- assign cls = 'gb-e1' -%}
      {%- endcase -%}
      {%- assign b = block.settings -%}
      <figure class="{{ cls }}" {{ block.shopify_attributes }}>
        <div class="gb-ph">
          {%- render 'gb-foto', image: b.foto, alt: b.alt, recorte: b.recorte, fx: b.foco_x, fy: b.foco_y, sizes: '(min-width: 760px) 60vw, 100vw' -%}
        </div>
        {%- if b.legenda != blank -%}<figcaption class="gb-cap">{{ b.legenda | escape }}</figcaption>{%- endif -%}
      </figure>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: detalhes",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Built for the couch."
    }
  ],
  "blocks": [
    {
      "type": "foto",
      "name": "Foto com legenda",
      "settings": [
        {
          "type": "image_picker",
          "id": "foto",
          "label": "Foto"
        },
        {
          "type": "text",
          "id": "recorte",
          "label": "Recorte da foto (x, y, largura, altura em %)",
          "default": "",
          "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
        },
        {
          "type": "range",
          "id": "foco_x",
          "label": "Foco horizontal",
          "min": 0,
          "max": 100,
          "step": 5,
          "unit": "%",
          "default": 50
        },
        {
          "type": "range",
          "id": "foco_y",
          "label": "Foco vertical",
          "min": 0,
          "max": 100,
          "step": 5,
          "unit": "%",
          "default": 50
        },
        {
          "type": "text",
          "id": "alt",
          "label": "Texto alternativo da foto",
          "default": ""
        },
        {
          "type": "text",
          "id": "legenda",
          "label": "Legenda",
          "default": ""
        }
      ]
    }
  ],
  "max_blocks": 3,
  "presets": [
    {
      "name": "Holdwell: detalhes"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-entrega.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
{%- if s.politica_confirmada -%}
  <section class="gb gb-sec gb-ent" data-depende="politica">
    <div class="gb-w">
      <h2>{{ s.titulo | escape }}</h2>
      <ol class="gb-tempo">
        {%- for block in section.blocks -%}
          <li {{ block.shopify_attributes }}><b>{{ block.settings.titulo | escape }}</b><span>{{ block.settings.texto | escape }}</span></li>
        {%- endfor -%}
      </ol>
    </div>
  </section>
{%- else -%}
  {%- render 'gb-aviso-editor', texto: 'Linha do tempo de entrega desligada. Ligue só se a política de envio e a de reembolso publicadas continuarem com estes prazos.' -%}
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: entrega",
  "tag": "section",
  "settings": [
    {
      "type": "checkbox",
      "id": "politica_confirmada",
      "label": "Mostrar a linha do tempo",
      "default": false,
      "info": "Prazos da política publicada: envio em 1 a 3 dias úteis, chegada estimada de 7 a 12 dias úteis, devolução em até 30 dias depois da entrega. Ligue só se não mudaram."
    },
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "From order to your door"
    }
  ],
  "blocks": [
    {
      "type": "etapa",
      "name": "Etapa",
      "settings": [
        {
          "type": "text",
          "id": "titulo",
          "label": "Quando",
          "default": "Today"
        },
        {
          "type": "text",
          "id": "texto",
          "label": "O quê",
          "default": "You place your order"
        }
      ]
    }
  ],
  "max_blocks": 4,
  "presets": [
    {
      "name": "Holdwell: entrega"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-fatos.liquid

```liquid
{%- render 'gb-assets' -%}
<section class="gb gb-fatos">
  <div class="gb-w gb-fatos__in">
    {%- for block in section.blocks -%}
      <div class="gb-fato" {{ block.shopify_attributes }}>{{ block.settings.texto | escape }}</div>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: fatos",
  "tag": "section",
  "settings": [],
  "blocks": [
    {
      "type": "fato",
      "name": "Fato",
      "settings": [
        {
          "type": "text",
          "id": "texto",
          "label": "Texto",
          "default": "7 light modes"
        }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    {
      "name": "Holdwell: fatos"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-garantias.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
{%- if s.politica_confirmada -%}
  <section class="gb gb-sinais" data-depende="politica">
    <div class="gb-w gb-sinais__in">
      {%- for block in section.blocks -%}
        <div class="gb-sinal" {{ block.shopify_attributes }}>{{ block.settings.titulo | escape }}<span>{{ block.settings.texto | escape }}</span></div>
      {%- endfor -%}
    </div>
  </section>
{%- else -%}
  {%- render 'gb-aviso-editor', texto: 'Frete, prazo e devolução desligados. Ligue só se a política de envio e a de reembolso publicadas continuarem com estes termos.' -%}
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: garantias",
  "tag": "section",
  "settings": [
    {
      "type": "checkbox",
      "id": "politica_confirmada",
      "label": "Mostrar frete, prazo e devolução",
      "default": false,
      "info": "Texto da política publicada: frete grátis em pedidos de $49 ou mais, envio em 1 a 3 dias úteis, chegada estimada de 7 a 12 dias úteis nos EUA, devolução em até 30 dias depois da entrega."
    }
  ],
  "blocks": [
    {
      "type": "sinal",
      "name": "Sinal",
      "settings": [
        {
          "type": "text",
          "id": "titulo",
          "label": "Título",
          "default": "Free US shipping"
        },
        {
          "type": "text",
          "id": "texto",
          "label": "Texto",
          "default": "On orders from $49"
        }
      ]
    }
  ],
  "max_blocks": 4,
  "presets": [
    {
      "name": "Holdwell: garantias"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-guia.liquid

```liquid
{%- render 'gb-assets' -%}
{%- liquid
  assign s = section.settings
  assign g = s.guia_produto
-%}
{%- if s.guia_confirmado and g != blank -%}
  {%- assign preco = g.price | money -%}
  <section class="gb gb-sec gb-guia" data-depende="guia">
    <div class="gb-w gb-guia__g">
      <div class="gb-capa">{{ g.title | escape }}<small>{{ s.legenda | escape }}</small></div>
      <div>
        <h2>{{ s.titulo | replace: '{price}', preco | escape }}</h2>
        <p class="gb-lead" style="margin-top:16px">{{ s.texto | escape }}</p>
      </div>
    </div>
  </section>
{%- else -%}
  {%- render 'gb-aviso-editor', texto: 'Guia digital desligado. Ligue só se o carrinho entregar o guia sem cobrar nos kits de 2 e 3 máscaras.' -%}
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: guia digital",
  "tag": "section",
  "settings": [
    {
      "type": "checkbox",
      "id": "guia_confirmado",
      "label": "Mostrar o guia",
      "default": false,
      "info": "A frase diz que o guia vem de graça nos kits de 2 e 3. O código do tema não adiciona o guia ao carrinho: isso tem de vir de brinde ou desconto da loja. Confirmar no carrinho antes de ligar."
    },
    {
      "type": "product",
      "id": "guia_produto",
      "label": "Produto do guia (nome e preço vêm dele)"
    },
    {
      "type": "text",
      "id": "legenda",
      "label": "Legenda da capa",
      "default": "Digital guide"
    },
    {
      "type": "text",
      "id": "titulo",
      "label": "Título ({price} vira o preço)",
      "default": "A {price} guide, included"
    },
    {
      "type": "text",
      "id": "texto",
      "label": "Texto",
      "default": "Comes with the 2 and 3 mask sets."
    }
  ],
  "presets": [
    {
      "name": "Holdwell: guia digital"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-hero.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
{%- assign p = s.produto -%}
<section class="gb gb-hero">
  <div class="gb-w gb-hero__in">
    <div>
      <h1>{{ s.titulo_1 | escape }}{% if s.titulo_2 != blank %}<br>{{ s.titulo_2 | escape }}{% endif %}</h1>
      {%- if s.texto != blank -%}<p>{{ s.texto | escape }}</p>{%- endif -%}
      {%- if p != blank -%}<a class="gb-btn" href="{{ p.url }}">{{ s.botao | escape }}, {{ p.price | money }}</a>{%- endif -%}
    </div>
    <div class="gb-ph gb-arco gb-hero__f">
      {%- render 'gb-foto', image: s.foto, alt: s.alt, recorte: s.recorte, fx: s.foco_x, fy: s.foco_y, eager: true, sizes: '(min-width: 760px) 42vw, 100vw' -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: abertura",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo_1",
      "label": "Título, linha 1",
      "default": "Ten quiet minutes."
    },
    {
      "type": "text",
      "id": "titulo_2",
      "label": "Título, linha 2",
      "default": "Seven lights."
    },
    {
      "type": "textarea",
      "id": "texto",
      "label": "Texto",
      "default": "A cordless LED face mask for the end of your day."
    },
    {
      "type": "product",
      "id": "produto",
      "label": "Produto do botão (o preço vem dele)"
    },
    {
      "type": "text",
      "id": "botao",
      "label": "Botão",
      "default": "Shop the mask"
    },
    {
      "type": "header",
      "content": "Foto"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto"
    },
    {
      "type": "text",
      "id": "recorte",
      "label": "Recorte da foto (x, y, largura, altura em %)",
      "default": "7.97,1.99,72.01,77.99",
      "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
    },
    {
      "type": "range",
      "id": "foco_x",
      "label": "Foco horizontal",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "range",
      "id": "foco_y",
      "label": "Foco vertical",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 20
    },
    {
      "type": "text",
      "id": "alt",
      "label": "Texto alternativo da foto",
      "default": "Woman relaxing at dusk wearing the Zeraya mask in purple light"
    }
  ],
  "presets": [
    {
      "name": "Holdwell: abertura"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-leds.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-leds">
  <div class="gb-w gb-macro">
      <div>
        <h2>{{ s.titulo | escape }}</h2>
        {%- if s.texto != blank -%}<p class="gb-lead">{{ s.texto | escape }}</p>{%- endif -%}
      </div>
      <div class="gb-ph gb-macro__f is-5-4">
        {%- render 'gb-foto', image: s.foto, alt: s.alt, recorte: s.recorte, fx: s.foco_x, fy: s.foco_y, sizes: '(min-width: 760px) 60vw, 100vw' -%}
      </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: LEDs de perto",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Full-face coverage"
    },
    {
      "type": "text",
      "id": "texto",
      "label": "Texto",
      "default": "180 LED beads, from forehead to chin."
    },
    {
      "type": "header",
      "content": "Foto"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto"
    },
    {
      "type": "text",
      "id": "recorte",
      "label": "Recorte da foto (x, y, largura, altura em %)",
      "default": "0,0,100,77.99",
      "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
    },
    {
      "type": "range",
      "id": "foco_x",
      "label": "Foco horizontal",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "range",
      "id": "foco_y",
      "label": "Foco vertical",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "text",
      "id": "alt",
      "label": "Texto alternativo da foto",
      "default": "LED beads inside the mask, close up"
    }
  ],
  "presets": [
    {
      "name": "Holdwell: LEDs de perto"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-linha.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-linha">
  <div class="gb-w">
    <h2>{{ s.titulo | escape }}</h2>
    {%- for block in section.blocks -%}
      {%- assign p = block.settings.produto -%}
      {%- if p != blank -%}
        <a class="gb-li" href="{{ p.url }}" {{ block.shopify_attributes }}>{{ p.title | escape }}<span>{% if p.price_varies %}{{ s.a_partir | escape }} {% endif %}{{ p.price | money }}</span></a>
      {%- endif -%}
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: mais produtos",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "More for your routine"
    },
    {
      "type": "text",
      "id": "a_partir",
      "label": "Texto antes do preço quando varia",
      "default": "From"
    }
  ],
  "blocks": [
    {
      "type": "produto",
      "name": "Produto",
      "settings": [
        {
          "type": "product",
          "id": "produto",
          "label": "Produto"
        }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    {
      "name": "Holdwell: mais produtos"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-modos.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-modos">
  <div class="gb-w">
    <h2>{{ s.titulo | escape }}</h2>
    <div class="gb-modos__g">
      {%- for block in section.blocks -%}
        {%- assign cor_l = block.settings.nome | downcase -%}
        {%- assign alt_txt = s.alt_modelo | replace: '{cor}', cor_l -%}
        <div class="gb-modo" {{ block.shopify_attributes }}>
          <div class="gb-ph gb-modo__f">
            {%- render 'gb-foto', image: s.foto, alt: alt_txt, recorte: block.settings.recorte, fx: 50, fy: 50, sizes: '(min-width: 760px) 70vw, 100vw' -%}
          </div>
          <span>{{ block.settings.nome | escape }}</span>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: sete modos",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "One mask. Seven lights."
    },
    {
      "type": "text",
      "id": "alt_modelo",
      "label": "Texto alternativo ({cor} vira o nome da cor)",
      "default": "Mask in {cor} light"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto com as sete cores (cada cor é um recorte)"
    }
  ],
  "blocks": [
    {
      "type": "modo",
      "name": "Cor",
      "settings": [
        {
          "type": "text",
          "id": "nome",
          "label": "Nome da cor",
          "default": "Red"
        },
        {
          "type": "text",
          "id": "recorte",
          "label": "Recorte na foto (x, y, largura, altura em %)",
          "default": "",
          "info": "Área da foto com esta cor. Ao trocar a foto, refaça o recorte."
        }
      ]
    }
  ],
  "max_blocks": 7,
  "presets": [
    {
      "name": "Holdwell: sete modos"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-oferta.liquid

```liquid
{%- render 'gb-assets' -%}
{%- liquid
  assign s = section.settings
  assign p = s.produto | default: product
  assign g = s.guia_produto
  assign guia_on = false
  if s.guia_confirmado and g != blank
    assign guia_on = true
  endif
  assign on_pdp = false
  if request.page_type == 'product'
    assign on_pdp = true
  endif
-%}
{%- if s.kits_confirmados and p != blank -%}
  {%- liquid
    assign unit = p.selected_or_first_available_variant.price
    assign f2 = 100 | minus: s.pct2
    assign f3 = 100 | minus: s.pct3
    assign p2 = unit | times: 2 | times: f2 | divided_by: 100.0 | round
    assign p3 = unit | times: 3 | times: f3 | divided_by: 100.0 | round
    assign e2 = p2 | divided_by: 2.0 | round
    assign e3 = p3 | divided_by: 3.0 | round
    assign s2 = unit | times: 2 | minus: p2
    assign s3 = unit | times: 3 | minus: p3
    if guia_on
      assign guia_preco = g.price | money
      assign guia_txt = s.guia_texto | replace: '{price}', guia_preco
    endif
  -%}
  <section class="gb gb-sec gb-oferta" data-depende="desconto-dos-kits">
    <div class="gb-w">
      <h2>{{ s.titulo | escape }}</h2>
      <div>
        <a class="gb-kit" href="{% if on_pdp %}#comprar{% else %}{{ p.url }}?qty=1{% endif %}" data-gb-kit="1"><h3>{{ s.nome_1 | escape }}</h3><small>{% if s.politica_confirmada %}{{ s.sub_1 | escape }}{% endif %}</small><strong>{{ unit | money }}</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a>
        <a class="gb-kit" href="{% if on_pdp %}#comprar{% else %}{{ p.url }}?qty=2{% endif %}" data-gb-kit="2"><h3>{{ s.nome_2 | escape }}</h3><small>{{ e2 | money }} {{ s.cada | escape }}, {{ s.economia | escape }} {{ s2 | money }}{% if guia_on %}, {{ guia_txt | escape }}{% endif %}</small><strong>{{ p2 | money }}</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a>
        <a class="gb-kit" href="{% if on_pdp %}#comprar{% else %}{{ p.url }}?qty=3{% endif %}" data-gb-kit="3"><h3>{{ s.nome_3 | escape }}{% if s.selo != blank %}<span class="gb-tag">{{ s.selo | escape }}</span>{% endif %}</h3><small>{{ e3 | money }} {{ s.cada | escape }}, {{ s.economia | escape }} {{ s3 | money }}{% if guia_on %}, {{ guia_txt | escape }}{% endif %}</small><strong>{{ p3 | money }}</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a>
      </div>
    </div>
  </section>
{%- else -%}
  {%- render 'gb-aviso-editor', texto: 'Kits desligados. Ligue só depois de conferir no carrinho que 2 máscaras saem pelo preço da conta e 3 também (desconto automático da loja).' -%}
{%- endif -%}

{% schema %}
{
  "name": "Holdwell: kits",
  "tag": "section",
  "settings": [
    {
      "type": "checkbox",
      "id": "kits_confirmados",
      "label": "Mostrar os kits de 2 e 3 máscaras",
      "default": false,
      "info": "Os preços dos kits só existem no carrinho se a loja tiver o desconto automático (2 máscaras 15%, 3 máscaras 30%, sem código). Ligue só depois de conferir os totais no carrinho. Ligue junto com a mesma opção da seção de compra."
    },
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "One for you. One to give."
    },
    {
      "type": "product",
      "id": "produto",
      "label": "Produto (na página do produto, vazio usa o produto da página)"
    },
    {
      "type": "range",
      "id": "pct2",
      "label": "Desconto de 2 máscaras",
      "min": 1,
      "max": 50,
      "step": 1,
      "unit": "%",
      "default": 15,
      "info": "Tem de ser igual ao desconto automático da loja."
    },
    {
      "type": "range",
      "id": "pct3",
      "label": "Desconto de 3 máscaras",
      "min": 1,
      "max": 60,
      "step": 1,
      "unit": "%",
      "default": 30,
      "info": "Tem de ser igual ao desconto automático da loja."
    },
    {
      "type": "text",
      "id": "nome_1",
      "label": "Kit 1: nome",
      "default": "One mask"
    },
    {
      "type": "text",
      "id": "nome_2",
      "label": "Kit 2: nome",
      "default": "Two masks"
    },
    {
      "type": "text",
      "id": "nome_3",
      "label": "Kit 3: nome",
      "default": "Three masks"
    },
    {
      "type": "text",
      "id": "selo",
      "label": "Selo do kit 3",
      "default": "Lowest per mask"
    },
    {
      "type": "text",
      "id": "cada",
      "label": "Texto depois do preço por máscara",
      "default": "each"
    },
    {
      "type": "text",
      "id": "economia",
      "label": "Texto antes da economia",
      "default": "save"
    },
    {
      "type": "header",
      "content": "Depende da política publicada"
    },
    {
      "type": "checkbox",
      "id": "politica_confirmada",
      "label": "Mostrar a linha de frete do kit 1",
      "default": false,
      "info": "Política de envio publicada: frete grátis em pedidos de $49 ou mais."
    },
    {
      "type": "text",
      "id": "sub_1",
      "label": "Kit 1: linha de apoio",
      "default": "Free US shipping"
    },
    {
      "type": "header",
      "content": "Guia digital"
    },
    {
      "type": "checkbox",
      "id": "guia_confirmado",
      "label": "Mencionar o guia digital como incluso",
      "default": false,
      "info": "Ligue só se o carrinho entregar o guia sem cobrar nos kits de 2 e 3 (brinde ou desconto na loja). O código desta seção não adiciona o guia ao carrinho."
    },
    {
      "type": "product",
      "id": "guia_produto",
      "label": "Produto do guia (o preço vem dele)"
    },
    {
      "type": "text",
      "id": "guia_texto",
      "label": "Texto do guia ({price} vira o preço)",
      "default": "{price} guide included"
    }
  ],
  "presets": [
    {
      "name": "Holdwell: kits"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-passos.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-como">
  <div class="gb-w gb-passos">
    <div class="gb-ph gb-arco gb-passos__f">
      {%- render 'gb-foto', image: s.foto, alt: s.alt, recorte: s.recorte, fx: s.foco_x, fy: s.foco_y, sizes: '(min-width: 760px) 40vw, 100vw' -%}
    </div>
    <div>
      <h2>{{ s.titulo | escape }}</h2>
      {%- for block in section.blocks -%}
        <div class="gb-passo" {{ block.shopify_attributes }}><b>{{ forloop.index }}</b><h3>{{ block.settings.texto | escape }}</h3></div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: passos",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Three steps. One button."
    },
    {
      "type": "header",
      "content": "Foto"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto"
    },
    {
      "type": "text",
      "id": "recorte",
      "label": "Recorte da foto (x, y, largura, altura em %)",
      "default": "0,0,100,76.95",
      "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
    },
    {
      "type": "range",
      "id": "foco_x",
      "label": "Foco horizontal",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 55
    },
    {
      "type": "range",
      "id": "foco_y",
      "label": "Foco vertical",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "text",
      "id": "alt",
      "label": "Texto alternativo da foto",
      "default": "Zeraya mask on a nightstand beside a candle and books"
    }
  ],
  "blocks": [
    {
      "type": "passo",
      "name": "Passo",
      "settings": [
        {
          "type": "text",
          "id": "texto",
          "label": "Texto",
          "default": "Start with clean, dry skin"
        }
      ]
    }
  ],
  "max_blocks": 5,
  "presets": [
    {
      "name": "Holdwell: passos"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-perguntas.liquid

```liquid
{%- render 'gb-assets' -%}
{%- liquid
  assign s = section.settings
  assign g = s.guia_produto
  if g != blank
    assign guia_preco = g.price | money
  endif
-%}
<section class="gb gb-sec gb-faq">
  <div class="gb-w gb-faq__g">
    <h2>{{ s.titulo | escape }}</h2>
    <div>
      {%- for block in section.blocks -%}
        {%- liquid
          assign mostrar = true
          if block.type == 'pergunta_politica' and s.politica_confirmada != true
            assign mostrar = false
          endif
          if block.type == 'pergunta_guia'
            if s.guia_confirmado != true or g == blank
              assign mostrar = false
            endif
          endif
          assign resposta = block.settings.resposta
          if block.type == 'pergunta_guia'
            assign resposta = resposta | replace: '{price}', guia_preco
          endif
        -%}
        {%- if mostrar -%}
          <details {{ block.shopify_attributes }}{% if block.type != 'pergunta' %} data-depende="{% if block.type == 'pergunta_guia' %}guia{% else %}politica{% endif %}"{% endif %}>
            <summary>{{ block.settings.pergunta | escape }}</summary>
            <p>{{ resposta | escape }}</p>
          </details>
        {%- endif -%}
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: perguntas",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Questions"
    },
    {
      "type": "checkbox",
      "id": "politica_confirmada",
      "label": "Mostrar as perguntas de entrega e devolução",
      "default": false,
      "info": "As respostas seguem a política de envio e a de reembolso publicadas. Ligue só se elas não mudaram."
    },
    {
      "type": "checkbox",
      "id": "guia_confirmado",
      "label": "Mostrar a pergunta do guia digital",
      "default": false,
      "info": "Ligue só se o carrinho entregar o guia sem cobrar nos kits de 2 e 3."
    },
    {
      "type": "product",
      "id": "guia_produto",
      "label": "Produto do guia (o preço vem dele)"
    }
  ],
  "blocks": [
    {
      "type": "pergunta",
      "name": "Pergunta",
      "settings": [
        {
          "type": "text",
          "id": "pergunta",
          "label": "Pergunta",
          "default": "How do I use it?"
        },
        {
          "type": "textarea",
          "id": "resposta",
          "label": "Resposta",
          "default": ""
        }
      ]
    },
    {
      "type": "pergunta_politica",
      "name": "Pergunta de entrega ou devolução",
      "settings": [
        {
          "type": "text",
          "id": "pergunta",
          "label": "Pergunta",
          "default": "How long does delivery take?"
        },
        {
          "type": "textarea",
          "id": "resposta",
          "label": "Resposta",
          "default": ""
        }
      ]
    },
    {
      "type": "pergunta_guia",
      "name": "Pergunta do guia",
      "settings": [
        {
          "type": "text",
          "id": "pergunta",
          "label": "Pergunta",
          "default": "What is the digital guide?"
        },
        {
          "type": "textarea",
          "id": "resposta",
          "label": "Resposta ({price} vira o preço do guia)",
          "default": "The Zeraya Glow Companion, a {price} digital guide included with the 2 and 3 mask sets."
        }
      ]
    }
  ],
  "max_blocks": 10,
  "presets": [
    {
      "name": "Holdwell: perguntas"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-retrato.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-ret">
  <div class="gb-w gb-ret__in">
    <h2>{{ s.titulo | escape }}</h2>
    <div class="gb-ph gb-vago" data-foto-provisoria>
      {%- render 'gb-foto', image: s.foto, alt: s.alt, recorte: s.recorte, fx: s.foco_x, fy: s.foco_y, sizes: '(min-width: 760px) 40vw, 100vw' -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: retrato",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Skincare, with the lights low."
    },
    {
      "type": "header",
      "content": "Foto"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto"
    },
    {
      "type": "text",
      "id": "recorte",
      "label": "Recorte da foto (x, y, largura, altura em %)",
      "default": "1.99,29.98,63.96,63.96",
      "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
    },
    {
      "type": "range",
      "id": "foco_x",
      "label": "Foco horizontal",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 45
    },
    {
      "type": "range",
      "id": "foco_y",
      "label": "Foco vertical",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "text",
      "id": "alt",
      "label": "Texto alternativo da foto",
      "default": "Zeraya mask glowing red, seen from the side"
    }
  ],
  "presets": [
    {
      "name": "Holdwell: retrato"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-ritual.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-rit">
  <div class="gb-w gb-rit__in">
    <div class="gb-ph gb-rit__f">
      {%- render 'gb-foto', image: s.foto, alt: s.alt, recorte: s.recorte, fx: s.foco_x, fy: s.foco_y, sizes: '(min-width: 760px) 60vw, 100vw' -%}
    </div>
    <h2>{{ s.titulo | escape }}</h2>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: ritual",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "The part of the day that is only yours."
    },
    {
      "type": "header",
      "content": "Foto"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto"
    },
    {
      "type": "text",
      "id": "recorte",
      "label": "Recorte da foto (x, y, largura, altura em %)",
      "default": "21.93,0,78.07,81.98",
      "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
    },
    {
      "type": "range",
      "id": "foco_x",
      "label": "Foco horizontal",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 50
    },
    {
      "type": "range",
      "id": "foco_y",
      "label": "Foco vertical",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 30
    },
    {
      "type": "text",
      "id": "alt",
      "label": "Texto alternativo da foto",
      "default": "Woman resting in bed wearing the Zeraya mask in red light"
    }
  ],
  "presets": [
    {
      "name": "Holdwell: ritual"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-rodape.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<footer class="gb gb-rodape">
  <div class="gb-w">
    <div class="gb-rodape__g">
      <div>
        <div class="gb-marca">{{ s.nome | escape }}</div>
        {%- if s.texto != blank -%}<p>{{ s.texto | escape }}</p>{%- endif -%}
        {%- if s.email != blank -%}<p style="margin-top:8px">{{ s.email | escape }}</p>{%- endif -%}
      </div>
      <div>
        <b>{{ s.titulo_loja | escape }}</b>
        {%- for block in section.blocks -%}
          {%- if block.settings.url != blank -%}<a href="{{ block.settings.url }}" {{ block.shopify_attributes }}>{{ block.settings.texto | escape }}</a>{%- endif -%}
        {%- endfor -%}
      </div>
      <div>
        <b>{{ s.titulo_ajuda | escape }}</b>
        {%- if shop.shipping_policy != blank -%}<a href="{{ shop.shipping_policy.url }}">{{ s.l_envio | escape }}</a>{%- endif -%}
        {%- if shop.refund_policy != blank -%}<a href="{{ shop.refund_policy.url }}">{{ s.l_devolucao | escape }}</a>{%- endif -%}
        {%- if shop.privacy_policy != blank -%}<a href="{{ shop.privacy_policy.url }}">{{ s.l_privacidade | escape }}</a>{%- endif -%}
        {%- if shop.terms_of_service != blank -%}<a href="{{ shop.terms_of_service.url }}">{{ s.l_termos | escape }}</a>{%- endif -%}
        {%- if s.contato_url != blank -%}<a href="{{ s.contato_url }}">{{ s.l_contato | escape }}</a>{%- endif -%}
        {%- if s.rastreio_url != blank -%}<a href="{{ s.rastreio_url }}">{{ s.l_rastreio | escape }}</a>{%- endif -%}
      </div>
    </div>
    <div class="gb-legal">&copy; {{ 'now' | date: '%Y' }} {{ s.nome | escape }}</div>
  </div>
</footer>

{% schema %}
{
  "name": "Holdwell: rodapé",
  "tag": "footer",
  "settings": [
    {
      "type": "text",
      "id": "nome",
      "label": "Nome da loja",
      "default": "Holdwellco"
    },
    {
      "type": "text",
      "id": "texto",
      "label": "Texto",
      "default": "Cosmetic device, not a medical device. Results vary."
    },
    {
      "type": "text",
      "id": "email",
      "label": "E-mail de contato",
      "default": "support@holdwellco.com"
    },
    {
      "type": "text",
      "id": "titulo_loja",
      "label": "Título da coluna de loja",
      "default": "Shop"
    },
    {
      "type": "text",
      "id": "titulo_ajuda",
      "label": "Título da coluna de ajuda",
      "default": "Help"
    },
    {
      "type": "header",
      "content": "Links de política (só aparecem as políticas publicadas)"
    },
    {
      "type": "text",
      "id": "l_envio",
      "label": "Envio",
      "default": "Shipping"
    },
    {
      "type": "text",
      "id": "l_devolucao",
      "label": "Devolução",
      "default": "Returns"
    },
    {
      "type": "text",
      "id": "l_privacidade",
      "label": "Privacidade",
      "default": "Privacy"
    },
    {
      "type": "text",
      "id": "l_termos",
      "label": "Termos",
      "default": "Terms"
    },
    {
      "type": "header",
      "content": "Contato e rastreio (vazio esconde o link)"
    },
    {
      "type": "url",
      "id": "contato_url",
      "label": "Link de Contact",
      "info": "Use a página de contato que já existe na loja."
    },
    {
      "type": "text",
      "id": "l_contato",
      "label": "Texto de Contact",
      "default": "Contact"
    },
    {
      "type": "url",
      "id": "rastreio_url",
      "label": "Link de Track Order",
      "info": "A coleta não achou página de rastreio: preencha só se ela existir."
    },
    {
      "type": "text",
      "id": "l_rastreio",
      "label": "Texto de Track Order",
      "default": "Track Order"
    }
  ],
  "blocks": [
    {
      "type": "link",
      "name": "Link da coluna de loja",
      "settings": [
        {
          "type": "text",
          "id": "texto",
          "label": "Texto",
          "default": "Shop All"
        },
        {
          "type": "url",
          "id": "url",
          "label": "Link"
        }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    {
      "name": "Holdwell: rodapé"
    }
  ]
}
{% endschema %}
```

### Arquivo: sections/gb-semfio.liquid

```liquid
{%- render 'gb-assets' -%}
{%- assign s = section.settings -%}
<section class="gb gb-sec gb-caixa">
  <div class="gb-w gb-macro inv">
      <div class="gb-ph gb-arco gb-macro__f is-1-1">
        {%- render 'gb-foto', image: s.foto, alt: s.alt, recorte: s.recorte, fx: s.foco_x, fy: s.foco_y, sizes: '(min-width: 760px) 60vw, 100vw' -%}
      </div>
      <div>
        <h2>{{ s.titulo | escape }}</h2>
        {%- if s.texto != blank -%}<p class="gb-lead">{{ s.texto | escape }}</p>{%- endif -%}
      </div>
  </div>
</section>

{% schema %}
{
  "name": "Holdwell: sem fio",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "No cord on your face"
    },
    {
      "type": "text",
      "id": "texto",
      "label": "Texto",
      "default": "Charge by USB-C, then move around while you wear it."
    },
    {
      "type": "header",
      "content": "Foto"
    },
    {
      "type": "image_picker",
      "id": "foto",
      "label": "Foto"
    },
    {
      "type": "text",
      "id": "recorte",
      "label": "Recorte da foto (x, y, largura, altura em %)",
      "default": "34.93,0,65.07,64.99",
      "info": "Área limpa da foto original da loja (o original tem texto gravado em parte da imagem). Ao trocar a foto, apague este campo. Vazio mostra a foto inteira."
    },
    {
      "type": "range",
      "id": "foco_x",
      "label": "Foco horizontal",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 40
    },
    {
      "type": "range",
      "id": "foco_y",
      "label": "Foco vertical",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 40
    },
    {
      "type": "text",
      "id": "alt",
      "label": "Texto alternativo da foto",
      "default": "Mask charging by USB-C"
    }
  ],
  "presets": [
    {
      "name": "Holdwell: sem fio"
    }
  ]
}
{% endschema %}
```

### Arquivo: snippets/gb-assets.liquid

```liquid
{%- comment -%}
  Carrega as fontes (Fraunces e Inter), o CSS e o JS da Holdwellco. Chamado por todas as seções gb-*.
  O navegador não baixa duas vezes o mesmo arquivo; o JS trava a si mesmo se for incluído mais de uma vez.
{%- endcomment -%}
{%- # theme-check-disable RemoteAsset -%}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600&display=swap">
{%- # theme-check-enable RemoteAsset -%}
{{ 'gb-loja.css' | asset_url | stylesheet_tag }}
<script src="{{ 'gb-loja.js' | asset_url }}" defer="defer"></script>
```

### Arquivo: snippets/gb-aviso-editor.liquid

```liquid
{%- comment -%}
  Aviso que só aparece no editor do tema, para seção desligada. Parâmetro: texto.
{%- endcomment -%}
{%- if request.design_mode -%}
  <div class="gb gb-editor"><p class="gb-editor__txt">{{ texto | escape }}</p></div>
{%- endif -%}
```

### Arquivo: snippets/gb-foto.liquid

```liquid
{%- comment -%}
  Foto da loja, com recorte opcional.
  Parâmetros:
    image   imagem do seletor ou da mídia do produto
    alt     texto alternativo
    recorte "x,y,largura,altura" em % da foto original (vazio = foto inteira, preenchendo a caixa)
    fx, fy  ponto de foco dentro do recorte, de 0 a 100 (padrão 50)
    eager   true só para a primeira foto visível da página
    sizes   atributo sizes (padrão 100vw)
    width   maior largura pedida (padrão 1600)
  O recorte existe porque as fotos originais da loja têm texto gravado em parte da imagem: o desenho aprovado usa só a área limpa.
  Ao trocar a foto, apague o recorte. A caixa pai precisa ter altura ou aspect-ratio e position: relative (classe gb-ph).
{%- endcomment -%}
{%- if image != blank -%}
  {%- assign gb_alt = alt | default: image.alt | default: '' -%}
  {%- assign gb_sizes = sizes | default: '100vw' -%}
  {%- assign gb_max = width | default: 1600 -%}
  {%- assign gb_fx = fx | default: 50 -%}
  {%- assign gb_fy = fy | default: 50 -%}
  {%- assign gb_loading = 'lazy' -%}
  {%- assign gb_prio = 'auto' -%}
  {%- if eager -%}
    {%- assign gb_loading = 'eager' -%}
    {%- assign gb_prio = 'high' -%}
  {%- endif -%}
  {%- assign gb_rec = recorte | split: ',' -%}
  {%- if gb_rec.size == 4 -%}
    {%- assign rx = gb_rec[0] | strip | times: 1.0 | divided_by: 100 -%}
    {%- assign ry = gb_rec[1] | strip | times: 1.0 | divided_by: 100 -%}
    {%- assign rw = gb_rec[2] | strip | times: 1.0 | divided_by: 100 -%}
    {%- assign rh = gb_rec[3] | strip | times: 1.0 | divided_by: 100 -%}
    {%- assign ar_rec = image.aspect_ratio | times: rw | divided_by: rh -%}
    {%- assign fxn = gb_fx | times: 1.0 | divided_by: 100 -%}
    {%- assign fyn = gb_fy | times: 1.0 | divided_by: 100 -%}
    {%- assign gb_style = '--rx:' | append: rx | append: ';--ry:' | append: ry | append: ';--rw:' | append: rw | append: ';--rh:' | append: rh | append: ';--ar:' | append: ar_rec | append: ';--iar:' | append: image.aspect_ratio | append: ';--fx:' | append: fxn | append: ';--fy:' | append: fyn -%}
    <div class="gb-rec">
      {{- image | image_url: width: gb_max | image_tag: class: 'gb-rec__img', alt: gb_alt, loading: gb_loading, fetchpriority: gb_prio, widths: '720, 1000, 1254, 1600', sizes: gb_sizes, style: gb_style -}}
    </div>
  {%- else -%}
    {%- assign gb_pos = gb_fx | append: '% ' | append: gb_fy | append: '%' -%}
    {%- assign gb_style = 'object-position:' | append: gb_pos -%}
    {{- image | image_url: width: gb_max | image_tag: class: 'gb-fill', alt: gb_alt, loading: gb_loading, fetchpriority: gb_prio, widths: '360, 540, 720, 900, 1200, 1600', sizes: gb_sizes, style: gb_style -}}
  {%- endif -%}
{%- endif -%}
```

### Arquivo: snippets/gb-icon.liquid

```liquid
{%- comment -%}
  Ícones em linha. Parâmetros: name (cart, check, menu) e size (padrão 22).
{%- endcomment -%}
{%- assign gb_size = size | default: 22 -%}
{%- case name -%}
  {%- when 'cart' -%}
    <svg class="gb-ico" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="{{ gb_size }}" height="{{ gb_size }}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 12H5z"></path><path d="M9 8V6.5a3 3 0 016 0V8"></path></svg>
  {%- when 'check' -%}
    <svg class="gb-ico" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="{{ gb_size }}" height="{{ gb_size }}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
  {%- when 'menu' -%}
    <svg class="gb-ico" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="{{ gb_size }}" height="{{ gb_size }}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>
{%- endcase -%}
```

### Arquivo: templates/index.gb-zeraya.json

```json
{
  "sections": {
    "aviso": {
      "type": "gb-aviso",
      "settings": {}
    },
    "cabecalho": {
      "type": "gb-cabecalho",
      "settings": {
        "logo": "shopify://shop_images/holdwell-logo_png.png"
      },
      "blocks": {
        "b1": {
          "type": "link",
          "settings": {
            "texto": "LED Mask",
            "url": "/products/led-glow-mask"
          }
        },
        "b2": {
          "type": "link",
          "settings": {
            "texto": "Neck & Shoulder",
            "url": "/collections/neck-shoulder"
          }
        },
        "b3": {
          "type": "link",
          "settings": {
            "texto": "Posture & Back",
            "url": "/collections/posture-back"
          }
        },
        "b4": {
          "type": "link",
          "settings": {
            "texto": "Shop All",
            "url": "/collections/all"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "hero": {
      "type": "gb-hero",
      "settings": {
        "produto": "led-glow-mask",
        "foto": "shopify://shop_images/holdwell-mascara-led-lifestyle-mulher-madura-roxo.png"
      }
    },
    "fatos": {
      "type": "gb-fatos",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "fato",
          "settings": {
            "texto": "7 light modes"
          }
        },
        "b2": {
          "type": "fato",
          "settings": {
            "texto": "180 LEDs"
          }
        },
        "b3": {
          "type": "fato",
          "settings": {
            "texto": "Cordless, USB-C"
          }
        },
        "b4": {
          "type": "fato",
          "settings": {
            "texto": "10 to 15 minutes"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "ritual": {
      "type": "gb-ritual",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-lifestyle-cama-fones-livro-fechado.png"
      }
    },
    "modos": {
      "type": "gb-modos",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-sete-cores-quadrado.png"
      },
      "blocks": {
        "b1": {
          "type": "modo",
          "settings": {
            "nome": "Red",
            "recorte": "4.47,19.14,22.33,31.9"
          }
        },
        "b2": {
          "type": "modo",
          "settings": {
            "nome": "Blue",
            "recorte": "27.27,19.14,22.33,31.9"
          }
        },
        "b3": {
          "type": "modo",
          "settings": {
            "nome": "Green",
            "recorte": "50.08,19.14,22.33,31.9"
          }
        },
        "b4": {
          "type": "modo",
          "settings": {
            "nome": "Purple",
            "recorte": "72.89,19.14,22.33,31.9"
          }
        },
        "b5": {
          "type": "modo",
          "settings": {
            "nome": "Yellow",
            "recorte": "15.87,55.42,22.33,31.9"
          }
        },
        "b6": {
          "type": "modo",
          "settings": {
            "nome": "Cyan",
            "recorte": "38.68,55.42,22.33,31.9"
          }
        },
        "b7": {
          "type": "modo",
          "settings": {
            "nome": "White",
            "recorte": "61.48,55.42,22.33,31.9"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6",
        "b7"
      ]
    },
    "retrato": {
      "type": "gb-retrato",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-detalhe-carregamento-usb-c.png"
      }
    },
    "passos": {
      "type": "gb-passos",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-still-life-criado-mudo.png",
        "recorte": "0,0,100,76.95",
        "foco_x": 55,
        "foco_y": 50,
        "alt": "Zeraya mask on a nightstand beside a candle and books"
      },
      "blocks": {
        "b1": {
          "type": "passo",
          "settings": {
            "texto": "Start with clean, dry skin"
          }
        },
        "b2": {
          "type": "passo",
          "settings": {
            "texto": "Pick a light, close your eyes"
          }
        },
        "b3": {
          "type": "passo",
          "settings": {
            "texto": "Relax for 10 to 15 minutes"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ]
    },
    "detalhes": {
      "type": "gb-detalhes",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-macro-interior-vermelho.png",
            "recorte": "0,0,100,77.99",
            "foco_x": 50,
            "foco_y": 50,
            "alt": "Close view of the LEDs inside the mask",
            "legenda": "180 LEDs, forehead to chin"
          }
        },
        "b2": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-ajuste-faixa-cinza.png",
            "recorte": "0,0,100,71.93",
            "foco_x": 50,
            "foco_y": 40,
            "alt": "Hands adjusting the strap behind the head",
            "legenda": "Adjustable strap"
          }
        },
        "b3": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-perfil-lateral-fundo-creme.webp",
            "recorte": "2.95,2.95,94.02,94.02",
            "foco_x": 50,
            "foco_y": 50,
            "alt": "Side view of the white LED mask",
            "legenda": "Open eyes, nose and mouth"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ]
    },
    "caixa": {
      "type": "gb-caixa",
      "settings": {
        "produto": "led-glow-mask",
        "foto": "shopify://shop_images/holdwell-mascara-led-flat-lay-acessorios-linho-creme.png",
        "recorte": "0,13.96,100,86.04",
        "foco_x": 50,
        "foco_y": 50,
        "alt": "Mask, strap, USB-C cable and manual laid out flat"
      },
      "blocks": {
        "b1": {
          "type": "item",
          "settings": {
            "texto": "LED face mask"
          }
        },
        "b2": {
          "type": "item",
          "settings": {
            "texto": "Adjustable strap"
          }
        },
        "b3": {
          "type": "item",
          "settings": {
            "texto": "USB-C cable"
          }
        },
        "b4": {
          "type": "item",
          "settings": {
            "texto": "Manual"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "oferta": {
      "type": "gb-oferta",
      "settings": {
        "produto": "led-glow-mask",
        "guia_produto": "zeraya-glow-companion"
      }
    },
    "comparacao": {
      "type": "gb-comparacao",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "linha",
          "settings": {
            "tema": "Price",
            "outras": "Inflated \"was\" price",
            "nos": "One real price"
          }
        },
        "b2": {
          "type": "linha",
          "settings": {
            "tema": "Urgency",
            "outras": "Countdown timers",
            "nos": "None"
          }
        },
        "b3": {
          "type": "linha",
          "settings": {
            "tema": "Claims",
            "outras": "Big promises",
            "nos": "Plain specs"
          }
        },
        "b4": {
          "type": "linha",
          "settings": {
            "tema": "Returns",
            "outras": "Hard to find",
            "nos": "30 days after delivery"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "linha": {
      "type": "gb-linha",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "produto",
          "settings": {
            "produto": "led-neck-face-massager"
          }
        },
        "b2": {
          "type": "produto",
          "settings": {
            "produto": "neck-shoulder-massager"
          }
        },
        "b3": {
          "type": "produto",
          "settings": {
            "produto": "posture-corrector-core"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ]
    },
    "avaliacoes": {
      "type": "gb-avaliacoes",
      "settings": {}
    },
    "garantias": {
      "type": "gb-garantias",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "sinal",
          "settings": {
            "titulo": "Free US shipping",
            "texto": "On orders from $49"
          }
        },
        "b2": {
          "type": "sinal",
          "settings": {
            "titulo": "Ships in 1 to 3 days",
            "texto": "Business days"
          }
        },
        "b3": {
          "type": "sinal",
          "settings": {
            "titulo": "Arrives in 7 to 12 days",
            "texto": "Estimated, business days"
          }
        },
        "b4": {
          "type": "sinal",
          "settings": {
            "titulo": "30-day returns",
            "texto": "After delivery"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "perguntas": {
      "type": "gb-perguntas",
      "settings": {
        "guia_produto": "zeraya-glow-companion"
      },
      "blocks": {
        "b1": {
          "type": "pergunta",
          "settings": {
            "pergunta": "How do I use it?",
            "resposta": "On clean, dry skin, choose a light mode and relax with your eyes closed for 10 to 15 minutes."
          }
        },
        "b2": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Who should not use it?",
            "resposta": "Do not use if you are pregnant, have epilepsy or a light-sensitive condition, or take medication that makes you sensitive to light. Check with your doctor if you are unsure."
          }
        },
        "b3": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Does it have a cord?",
            "resposta": "No cord while you wear it. It recharges with the included USB-C cable."
          }
        },
        "b4": {
          "type": "pergunta_politica",
          "settings": {
            "pergunta": "How long does delivery take?",
            "resposta": "Orders ship in 1 to 3 business days and are estimated to arrive in 7 to 12 business days in the US. Standard US shipping is free from $49."
          }
        },
        "b5": {
          "type": "pergunta_politica",
          "settings": {
            "pergunta": "How do returns work?",
            "resposta": "Request a return within 30 days after delivery at support@holdwellco.com. Return shipping is on you unless the item arrived damaged, defective or wrong."
          }
        },
        "b6": {
          "type": "pergunta_guia",
          "settings": {
            "pergunta": "What is the digital guide?",
            "resposta": "The Zeraya Glow Companion, a {price} digital guide included with the 2 and 3 mask sets."
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6"
      ]
    },
    "cuidado": {
      "type": "gb-cuidado",
      "settings": {}
    },
    "cadastro": {
      "type": "gb-cadastro",
      "settings": {}
    },
    "rodape": {
      "type": "gb-rodape",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "link",
          "settings": {
            "texto": "LED Mask",
            "url": "/products/led-glow-mask"
          }
        },
        "b2": {
          "type": "link",
          "settings": {
            "texto": "Shop All",
            "url": "/collections/all"
          }
        }
      },
      "block_order": [
        "b1",
        "b2"
      ]
    }
  },
  "order": [
    "aviso",
    "cabecalho",
    "hero",
    "fatos",
    "ritual",
    "modos",
    "retrato",
    "passos",
    "detalhes",
    "caixa",
    "oferta",
    "comparacao",
    "linha",
    "avaliacoes",
    "garantias",
    "perguntas",
    "cuidado",
    "cadastro",
    "rodape"
  ]
}
```

### Arquivo: templates/product.gb-zeraya.json

```json
{
  "sections": {
    "aviso": {
      "type": "gb-aviso",
      "settings": {}
    },
    "cabecalho": {
      "type": "gb-cabecalho",
      "settings": {
        "logo": "shopify://shop_images/holdwell-logo_png.png"
      },
      "blocks": {
        "b1": {
          "type": "link",
          "settings": {
            "texto": "LED Mask",
            "url": "/products/led-glow-mask"
          }
        },
        "b2": {
          "type": "link",
          "settings": {
            "texto": "Neck & Shoulder",
            "url": "/collections/neck-shoulder"
          }
        },
        "b3": {
          "type": "link",
          "settings": {
            "texto": "Posture & Back",
            "url": "/collections/posture-back"
          }
        },
        "b4": {
          "type": "link",
          "settings": {
            "texto": "Shop All",
            "url": "/collections/all"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "compra": {
      "type": "gb-compra",
      "settings": {
        "produto": "led-glow-mask",
        "adicional_produto": "led-neck-face-massager",
        "guia_produto": "zeraya-glow-companion"
      },
      "blocks": {
        "b1": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-perfil-lateral-fundo-creme.webp",
            "recorte": "2.95,2.95,94.02,94.02",
            "foco_x": 50,
            "foco_y": 50,
            "alt": "Side view of the white mask",
            "rotulo": "Side view of the white mask"
          }
        },
        "b2": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-still-life-criado-mudo.png",
            "recorte": "0,0,100,76.95",
            "foco_x": 60,
            "foco_y": 70,
            "alt": "Zeraya LED Face Mask on a nightstand",
            "rotulo": "Mask on a nightstand"
          }
        },
        "b3": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-lifestyle-cama-fones-livro-fechado.png",
            "recorte": "21.93,0,78.07,81.98",
            "foco_x": 50,
            "foco_y": 30,
            "alt": "Mask in use in bed",
            "rotulo": "Mask in use in bed"
          }
        },
        "b4": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-lifestyle-mulher-madura-roxo.png",
            "recorte": "7.97,1.99,72.01,77.99",
            "foco_x": 50,
            "foco_y": 20,
            "alt": "Mask in purple light",
            "rotulo": "Mask in purple light"
          }
        },
        "b5": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-macro-interior-vermelho.png",
            "recorte": "0,0,100,77.99",
            "foco_x": 50,
            "foco_y": 50,
            "alt": "LEDs up close",
            "rotulo": "LEDs up close"
          }
        },
        "b6": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-ajuste-faixa-cinza.png",
            "recorte": "0,0,100,71.93",
            "foco_x": 50,
            "foco_y": 40,
            "alt": "Adjusting the strap",
            "rotulo": "Adjusting the strap"
          }
        },
        "b7": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-detalhe-carregamento-usb-c.png",
            "recorte": "34.93,0,65.07,64.99",
            "foco_x": 40,
            "foco_y": 40,
            "alt": "USB-C charging",
            "rotulo": "USB-C charging"
          }
        },
        "b8": {
          "type": "foto",
          "settings": {
            "foto": "shopify://shop_images/holdwell-mascara-led-flat-lay-acessorios-linho-creme.png",
            "recorte": "0,13.96,100,86.04",
            "foco_x": 50,
            "foco_y": 50,
            "alt": "Everything in the box",
            "rotulo": "Everything in the box"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6",
        "b7",
        "b8"
      ]
    },
    "fatos": {
      "type": "gb-fatos",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "fato",
          "settings": {
            "texto": "7 light modes"
          }
        },
        "b2": {
          "type": "fato",
          "settings": {
            "texto": "180 LEDs"
          }
        },
        "b3": {
          "type": "fato",
          "settings": {
            "texto": "Cordless, USB-C"
          }
        },
        "b4": {
          "type": "fato",
          "settings": {
            "texto": "10 to 15 minutes"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "ritual": {
      "type": "gb-ritual",
      "settings": {
        "titulo": "Ten quiet minutes before bed.",
        "foto": "shopify://shop_images/holdwell-mascara-led-lifestyle-cama-fones-livro-fechado.png"
      }
    },
    "modos": {
      "type": "gb-modos",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-sete-cores-quadrado.png"
      },
      "blocks": {
        "b1": {
          "type": "modo",
          "settings": {
            "nome": "Red",
            "recorte": "4.47,19.14,22.33,31.9"
          }
        },
        "b2": {
          "type": "modo",
          "settings": {
            "nome": "Blue",
            "recorte": "27.27,19.14,22.33,31.9"
          }
        },
        "b3": {
          "type": "modo",
          "settings": {
            "nome": "Green",
            "recorte": "50.08,19.14,22.33,31.9"
          }
        },
        "b4": {
          "type": "modo",
          "settings": {
            "nome": "Purple",
            "recorte": "72.89,19.14,22.33,31.9"
          }
        },
        "b5": {
          "type": "modo",
          "settings": {
            "nome": "Yellow",
            "recorte": "15.87,55.42,22.33,31.9"
          }
        },
        "b6": {
          "type": "modo",
          "settings": {
            "nome": "Cyan",
            "recorte": "38.68,55.42,22.33,31.9"
          }
        },
        "b7": {
          "type": "modo",
          "settings": {
            "nome": "White",
            "recorte": "61.48,55.42,22.33,31.9"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6",
        "b7"
      ]
    },
    "passos": {
      "type": "gb-passos",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-still-life-criado-mudo.png",
        "recorte": "0,0,100,76.95",
        "foco_x": 55,
        "foco_y": 50,
        "alt": "Zeraya mask on a nightstand beside a candle and books"
      },
      "blocks": {
        "b1": {
          "type": "passo",
          "settings": {
            "texto": "Start with clean, dry skin"
          }
        },
        "b2": {
          "type": "passo",
          "settings": {
            "texto": "Pick a light, close your eyes"
          }
        },
        "b3": {
          "type": "passo",
          "settings": {
            "texto": "Relax for 10 to 15 minutes"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ]
    },
    "leds": {
      "type": "gb-leds",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-macro-interior-vermelho.png"
      }
    },
    "semfio": {
      "type": "gb-semfio",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-detalhe-carregamento-usb-c.png"
      }
    },
    "ajuste": {
      "type": "gb-ajuste",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-ajuste-faixa-cinza.png"
      }
    },
    "retrato": {
      "type": "gb-retrato",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-lifestyle-mulher-madura-roxo.png",
        "recorte": "7.97,1.99,72.01,77.99",
        "foco_x": 50,
        "foco_y": 30,
        "alt": "Woman relaxing at dusk wearing the Zeraya mask in purple light"
      }
    },
    "caixa": {
      "type": "gb-caixa",
      "settings": {
        "foto": "shopify://shop_images/holdwell-mascara-led-flat-lay-acessorios-linho-creme.png",
        "recorte": "0,13.96,100,86.04",
        "foco_x": 50,
        "foco_y": 50,
        "alt": "Mask, strap, USB-C cable and manual laid out flat"
      },
      "blocks": {
        "b1": {
          "type": "item",
          "settings": {
            "texto": "LED face mask"
          }
        },
        "b2": {
          "type": "item",
          "settings": {
            "texto": "Adjustable strap"
          }
        },
        "b3": {
          "type": "item",
          "settings": {
            "texto": "USB-C cable"
          }
        },
        "b4": {
          "type": "item",
          "settings": {
            "texto": "Manual"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "comparacao": {
      "type": "gb-comparacao",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "linha",
          "settings": {
            "tema": "Price",
            "outras": "Inflated \"was\" price",
            "nos": "One real price"
          }
        },
        "b2": {
          "type": "linha",
          "settings": {
            "tema": "Urgency",
            "outras": "Countdown timers",
            "nos": "None"
          }
        },
        "b3": {
          "type": "linha",
          "settings": {
            "tema": "Claims",
            "outras": "Big promises",
            "nos": "Plain specs"
          }
        },
        "b4": {
          "type": "linha",
          "settings": {
            "tema": "Returns",
            "outras": "Hard to find",
            "nos": "30 days after delivery"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "guia": {
      "type": "gb-guia",
      "settings": {
        "guia_produto": "zeraya-glow-companion"
      }
    },
    "oferta": {
      "type": "gb-oferta",
      "settings": {
        "titulo": "Pick your set.",
        "guia_produto": "zeraya-glow-companion"
      }
    },
    "entrega": {
      "type": "gb-entrega",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "etapa",
          "settings": {
            "titulo": "Today",
            "texto": "You place your order"
          }
        },
        "b2": {
          "type": "etapa",
          "settings": {
            "titulo": "1 to 3 days",
            "texto": "We ship it, business days"
          }
        },
        "b3": {
          "type": "etapa",
          "settings": {
            "titulo": "7 to 12 days",
            "texto": "Estimated arrival, business days"
          }
        },
        "b4": {
          "type": "etapa",
          "settings": {
            "titulo": "30 days",
            "texto": "To return it after delivery"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4"
      ]
    },
    "cuidado": {
      "type": "gb-cuidado",
      "settings": {}
    },
    "avaliacoes": {
      "type": "gb-avaliacoes",
      "settings": {}
    },
    "perguntas": {
      "type": "gb-perguntas",
      "settings": {
        "guia_produto": "zeraya-glow-companion"
      },
      "blocks": {
        "b1": {
          "type": "pergunta",
          "settings": {
            "pergunta": "How do I use it?",
            "resposta": "On clean, dry skin, choose a light mode and relax with your eyes closed for 10 to 15 minutes."
          }
        },
        "b2": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Who should not use it?",
            "resposta": "Do not use if you are pregnant, have epilepsy or a light-sensitive condition, or take medication that makes you sensitive to light. Check with your doctor if you are unsure."
          }
        },
        "b3": {
          "type": "pergunta",
          "settings": {
            "pergunta": "Does it have a cord?",
            "resposta": "No cord while you wear it. It recharges with the included USB-C cable."
          }
        },
        "b4": {
          "type": "pergunta_politica",
          "settings": {
            "pergunta": "How long does delivery take?",
            "resposta": "Orders ship in 1 to 3 business days and are estimated to arrive in 7 to 12 business days in the US. Standard US shipping is free from $49."
          }
        },
        "b5": {
          "type": "pergunta_politica",
          "settings": {
            "pergunta": "How do returns work?",
            "resposta": "Request a return within 30 days after delivery at support@holdwellco.com. Return shipping is on you unless the item arrived damaged, defective or wrong."
          }
        },
        "b6": {
          "type": "pergunta_guia",
          "settings": {
            "pergunta": "What is the digital guide?",
            "resposta": "The Zeraya Glow Companion, a {price} digital guide included with the 2 and 3 mask sets."
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6"
      ]
    },
    "linha": {
      "type": "gb-linha",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "produto",
          "settings": {
            "produto": "led-neck-face-massager"
          }
        },
        "b2": {
          "type": "produto",
          "settings": {
            "produto": "neck-shoulder-massager"
          }
        },
        "b3": {
          "type": "produto",
          "settings": {
            "produto": "posture-corrector-core"
          }
        }
      },
      "block_order": [
        "b1",
        "b2",
        "b3"
      ]
    },
    "cadastro": {
      "type": "gb-cadastro",
      "settings": {}
    },
    "rodape": {
      "type": "gb-rodape",
      "settings": {},
      "blocks": {
        "b1": {
          "type": "link",
          "settings": {
            "texto": "LED Mask",
            "url": "/products/led-glow-mask"
          }
        },
        "b2": {
          "type": "link",
          "settings": {
            "texto": "Shop All",
            "url": "/collections/all"
          }
        }
      },
      "block_order": [
        "b1",
        "b2"
      ]
    }
  },
  "order": [
    "aviso",
    "cabecalho",
    "compra",
    "fatos",
    "ritual",
    "modos",
    "passos",
    "leds",
    "semfio",
    "ajuste",
    "retrato",
    "caixa",
    "comparacao",
    "guia",
    "oferta",
    "entrega",
    "cuidado",
    "avaliacoes",
    "perguntas",
    "linha",
    "cadastro",
    "rodape"
  ]
}
```


## Desenho de referência: home.html

```html
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Holdwellco | Zeraya LED Face Mask</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#F3EEE8;color:#16241F;font-family:Inter,sans-serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%}a{color:inherit}button{font:inherit;color:inherit;cursor:pointer}
.gb-root{width:100%;overflow:hidden}.gb-w{max-width:1320px;margin:0 auto;padding:0 48px}
h1,h2,h3{font-family:Fraunces,Georgia,serif;font-weight:500;color:#16241F;margin:0;letter-spacing:-.025em}
h1{font-size:96px;line-height:.98}h2{font-size:68px;line-height:1.02}h3{font-size:30px;line-height:1.15}
p{margin:0;color:rgba(22,36,31,.74)}.gb-sec{padding:128px 0}.gb-lead{font-size:20px;line-height:1.5}
.gb-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:56px;padding:0 36px;border-radius:9999px;background:#1F3A3D;border:1px solid #1F3A3D;color:#F5F7F7;text-decoration:none;font-weight:500;font-size:16px;white-space:nowrap;transition:transform .15s,background .15s}.gb-btn:hover{background:#16241F}.gb-btn:active{transform:scale(.98)}
.gb-ph{overflow:hidden;background:#EEDFD3;border-radius:4px}.gb-arco{border-radius:999px 999px 4px 4px}
.gb-cap{display:block;margin-top:14px;font-size:14px;color:rgba(22,36,31,.72)}
.gb-aviso{background:#EEDFD3;color:#16241F;text-align:center;font-size:13px;padding:9px 16px}
.gb-top{background:#F3EEE8;position:relative;z-index:20}.gb-menu{display:none}.gb-top .gb-w{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.gb-logo{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:Fraunces,Georgia,serif;font-size:25px;font-weight:500;color:#16241F}.gb-logo img{width:32px;height:32px;border-radius:7px;object-fit:cover}
.gb-nav{display:flex;gap:32px;font-size:14px}.gb-nav a{text-decoration:none;color:rgba(22,36,31,.8)}.gb-cart{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center}
.gb-hero .gb-w{display:grid;grid-template-columns:7fr 5fr;gap:48px;align-items:end;padding-top:28px;padding-bottom:72px}.gb-hero h1{font-size:86px}.gb-hero p{font-size:20px;margin:30px 0 34px;max-width:440px}.gb-hero-f{height:720px}
.gb-fatos{border-top:1px solid rgba(22,36,31,.16);border-bottom:1px solid rgba(22,36,31,.16)}.gb-fatos .gb-w{display:flex;justify-content:space-between;gap:20px}.gb-fato{padding:22px 0;font-size:15px}
.gb-rit .gb-w{display:grid;grid-template-columns:8fr 4fr;gap:64px;align-items:end}.gb-rit-f{height:820px}.gb-rit h2{font-size:56px}
.gb-modos{padding-bottom:96px}.gb-modos h2{text-align:center;margin-bottom:56px}.gb-modos-g{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}.gb-modo{text-align:center}.gb-modo img{display:block;width:100%;aspect-ratio:7/10;object-fit:cover}.gb-modo span{display:inline-block;margin-top:12px;padding:5px 15px;border:1px solid rgba(22,36,31,.3);border-radius:9999px;font-size:13px}
.gb-ret{background:#EEDFD3}.gb-ret .gb-w{display:grid;grid-template-columns:7fr 5fr;gap:72px;align-items:center}.gb-ret h2{font-size:84px;line-height:1}.gb-vago{height:520px;border-radius:999px 999px 4px 4px;background:radial-gradient(ellipse 60% 44% at 50% 44%,#F9EDE4 0,#F0D3C4 46%,#E2C5B4 100%)}
.gb-passos{display:grid;grid-template-columns:5fr 6fr;gap:96px;align-items:center}.gb-passo{display:grid;grid-template-columns:64px 1fr;align-items:baseline;padding:24px 0;border-top:1px solid rgba(22,36,31,.18)}.gb-passo b{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:30px;color:#1F3A3D}.gb-passo h3{font-size:27px}.gb-passos h2{margin-bottom:34px}
.gb-ed{display:grid;grid-template-columns:repeat(12,1fr);gap:72px 28px;align-items:end}.gb-e1{grid-column:1/13}.gb-e1 .gb-ph{height:620px}.gb-e2{grid-column:9/13}.gb-e2 .gb-ph{height:340px}.gb-e3{grid-column:2/6}.gb-e3 .gb-ph{height:380px}.gb-e4{grid-column:6/13}.gb-e4 .gb-ph{height:600px}.gb-ed h2{grid-column:1/13}
.gb-caixa{background:#EEDFD3}.gb-caixa-g{display:grid;grid-template-columns:7fr 5fr;gap:80px;align-items:center}.gb-lista{list-style:none;margin:28px 0;padding:0}.gb-lista li{padding:13px 0;border-top:1px solid rgba(22,36,31,.18);font-size:17px}.gb-cx-p{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:40px;margin-bottom:16px}
.gb-oferta h2{margin-bottom:44px}.gb-kit{display:grid;grid-template-columns:4fr 4fr 2fr auto;gap:24px;align-items:center;padding:30px 8px;border-top:1px solid rgba(22,36,31,.2);text-decoration:none;color:#16241F;transition:background .15s}.gb-kit:hover{background:#EEDFD3}.gb-kit:last-child{border-bottom:1px solid rgba(22,36,31,.2)}.gb-kit h3{font-size:44px}.gb-kit small{font-size:15px;color:rgba(22,36,31,.75)}.gb-kit strong{font-size:24px;font-weight:500}.gb-seta{font-size:22px}.gb-tag{display:inline-block;margin-left:10px;vertical-align:middle;background:#1F3A3D;color:#F5F7F7;border-radius:9999px;padding:3px 11px;font-family:Inter,sans-serif;font-size:12px;letter-spacing:0}
.gb-fatia{border-collapse:collapse;width:100%;font-size:16px}.gb-fatia th,.gb-fatia td{padding:20px 14px;border-top:1px solid rgba(22,36,31,.16);text-align:left;font-weight:400}.gb-fatia thead th{border-top:0;font-size:14px;color:rgba(22,36,31,.72)}.gb-fatia thead th:last-child{color:#1F3A3D;font-weight:600}.gb-fatia td:last-child{font-weight:500;color:#1F3A3D}.gb-compara h2{margin-bottom:40px}
.gb-linha h2{font-size:44px;margin-bottom:24px}.gb-li{display:flex;justify-content:space-between;gap:16px;align-items:baseline;padding:18px 0;border-top:1px solid rgba(22,36,31,.18);text-decoration:none;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:28px}.gb-li span{font-family:Inter,sans-serif;font-size:15px}
.gb-rev{padding:60px 0;border-top:1px solid rgba(22,36,31,.14)}.gb-rev h2{font-size:34px}.gb-rev p{margin-top:6px}
.gb-sinais .gb-w{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}.gb-sinal{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:24px;line-height:1.2}.gb-sinal span{display:block;margin-top:6px;font-family:Inter,sans-serif;font-size:14px;color:rgba(22,36,31,.74)}
.gb-faq-g{display:grid;grid-template-columns:4fr 8fr;gap:64px}.gb-faq details{border-top:1px solid rgba(22,36,31,.18)}.gb-faq details:last-child{border-bottom:1px solid rgba(22,36,31,.18)}.gb-faq summary{list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:center;min-height:66px;font-size:17px;cursor:pointer}.gb-faq summary::-webkit-details-marker{display:none}.gb-faq summary:after{content:"+";font-size:24px;font-weight:500}.gb-faq details[open] summary:after{content:"\2212"}.gb-faq details p{padding:0 32px 22px 0}
.gb-seguro{border-top:1px solid rgba(22,36,31,.3);padding-top:28px;display:grid;grid-template-columns:4fr 8fr;gap:32px}.gb-seguro p{color:#16241F}
.gb-mail{background:#EEDFD3;padding:80px 0}.gb-mail .gb-w{display:flex;justify-content:space-between;align-items:center;gap:40px}.gb-mail h2{font-size:44px}.gb-mail-f{display:flex;gap:10px;width:470px;max-width:100%}.gb-mail-c{flex:1;min-width:0}.gb-mail label{display:block;font-size:13px;margin-bottom:6px}.gb-mail input{width:100%;height:56px;border-radius:9999px;border:1px solid rgba(22,36,31,.5);padding:0 22px;font:inherit;background:#FFFDFA;color:#16241F}.gb-mail .gb-btn{align-self:flex-end}
.gb-rodape{background:#1F3A3D;color:rgba(245,247,247,.78);padding:64px 0 36px;font-size:14px}.gb-rodape .gb-w>div:first-child{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px}.gb-rodape b{display:block;color:#F5F7F7;font-weight:500;margin-bottom:12px}.gb-rodape a{display:block;text-decoration:none;padding:5px 0;color:rgba(245,247,247,.78)}.gb-rodape p{color:rgba(245,247,247,.78);max-width:460px}.gb-rodape .gb-marca{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:30px;color:#F5F7F7;margin-bottom:10px}.gb-legal{border-top:1px solid rgba(245,247,247,.2);margin-top:40px;padding-top:20px;font-size:13px}
.gb-compra{padding:16px 0 96px}.gb-compra-g{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:64px;align-items:start}.gb-gal-main{overflow:hidden;background:#EEDFD3;border-radius:4px}.gb-thumbs{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-top:10px}.gb-thumb{padding:0;border:1px solid transparent;border-radius:4px;overflow:hidden;background:none;min-height:44px}.gb-thumb.on{border-color:#1F3A3D;box-shadow:0 0 0 1px #1F3A3D}
.gb-info{position:sticky;top:24px}.gb-info h1{font-size:58px;line-height:1.02}.gb-preco{font-size:24px;margin-top:12px}.gb-bens{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:20px 0 26px}.gb-bens li{padding:5px 14px;border:1px solid rgba(22,36,31,.28);border-radius:9999px;font-size:13px}
.gb-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.gb-opt{position:relative;border:1px solid rgba(22,36,31,.3);background:transparent;border-radius:12px;padding:18px 6px 12px;text-align:center;min-height:108px;display:flex;flex-direction:column;align-items:center;transition:border-color .15s}.gb-opt.on{border-color:#1F3A3D;box-shadow:0 0 0 1px #1F3A3D;background:#EEDFD3}.gb-opt b{font-weight:400;font-size:14px}.gb-opt strong{font-size:19px;font-weight:500}.gb-opt small{font-size:12px;color:rgba(22,36,31,.76);line-height:1.3}.gb-opt em{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#1F3A3D;color:#F5F7F7;font-style:normal;font-size:10.5px;border-radius:9999px;padding:2px 9px;white-space:nowrap}
.gb-conta{font-size:14px;margin:13px 0;min-height:21px;color:rgba(22,36,31,.82)}.gb-info .gb-btn{width:100%}.gb-selos{display:flex;justify-content:space-between;gap:10px;margin-top:14px;font-size:13px}
.gb-add{display:grid;grid-template-columns:1fr 26px;gap:14px;align-items:center;width:100%;margin-top:18px;padding:14px 16px;border:1px solid rgba(22,36,31,.24);border-radius:12px;background:transparent;text-align:left}.gb-add b{display:block;font-size:14px;font-weight:500}.gb-add small{font-size:13px;color:rgba(22,36,31,.75)}.gb-add i{width:24px;height:24px;border:1px solid #1F3A3D;border-radius:7px;display:flex;align-items:center;justify-content:center;color:transparent}.gb-add.on{border-color:#1F3A3D}.gb-add.on i{background:#1F3A3D;color:#F5F7F7}
.gb-macro{display:grid;grid-template-columns:4fr 8fr;gap:72px;align-items:end}.gb-macro.inv{grid-template-columns:7fr 5fr;align-items:center}.gb-macro p{margin-top:16px}
.gb-guia{display:grid;grid-template-columns:5fr 7fr;gap:88px;align-items:center}.gb-capa{aspect-ratio:4/5;max-width:400px;width:100%;margin:0 auto;border-radius:999px 999px 4px 4px;background:linear-gradient(180deg,#F8ECE3,#E2C5B4);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:36px;line-height:1.1;color:#16241F}.gb-capa small{font-family:Inter,sans-serif;font-size:13px;margin-top:14px}
.gb-tempo{display:grid;grid-template-columns:repeat(4,1fr);list-style:none;margin:0;padding:0}.gb-tempo li{position:relative;padding:28px 24px 0 0;border-top:1px solid #1F3A3D}.gb-tempo li:before{content:"";position:absolute;top:-5px;left:0;width:9px;height:9px;border-radius:50%;background:#1F3A3D}.gb-tempo b{display:block;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:28px;line-height:1.2}.gb-tempo span{font-size:14.5px;color:rgba(22,36,31,.75)}.gb-ent h2{margin-bottom:48px}.gb-barra{display:none}
@media(max-width:759px){
.gb-w{padding:0 22px}.gb-sec{padding:76px 0}h1{font-size:50px}h2{font-size:42px}h3{font-size:24px}.gb-lead{font-size:17px}.gb-nav{display:none}.gb-menu{display:block}.gb-menu__b{list-style:none;display:inline-flex;width:44px;height:44px;margin-left:-10px;align-items:center;justify-content:center;cursor:pointer}.gb-menu__b::-webkit-details-marker{display:none}.gb-menu__p{position:absolute;left:0;right:0;top:100%;display:flex;flex-direction:column;padding:6px 22px 14px;background:#F3EEE8;border-top:1px solid rgba(22,36,31,.18);border-bottom:1px solid rgba(22,36,31,.18)}.gb-menu__p a{display:block;padding:14px 0;font-size:17px;text-decoration:none;border-bottom:1px solid rgba(22,36,31,.18)}.gb-menu__p a:last-child{border-bottom:0}.gb-top .gb-w{height:54px}.gb-logo{font-size:22px}.gb-logo img{width:28px;height:28px}.gb-aviso{font-size:12px;padding:7px 10px}
.gb-hero .gb-w{display:flex;flex-direction:column-reverse;gap:18px;padding-top:0;padding-bottom:30px}.gb-hero h1{font-size:43px}.gb-hero p{font-size:16px;margin:10px 0 16px}.gb-hero .gb-btn{width:100%}.gb-hero-f{height:392px;width:100%}
.gb-fatos .gb-w{display:grid;grid-template-columns:1fr 1fr;gap:0 12px;padding-top:8px;padding-bottom:8px}.gb-fato{padding:9px 0;font-size:14px}
.gb-rit .gb-w,.gb-ret .gb-w,.gb-passos,.gb-caixa-g,.gb-macro,.gb-macro.inv,.gb-guia,.gb-faq-g,.gb-seguro,.gb-compra-g{grid-template-columns:minmax(0,1fr);gap:30px}.gb-rit-f{height:470px}.gb-rit h2{font-size:38px}
.gb-modos{padding-bottom:64px}.gb-modos h2{margin-bottom:30px}.gb-modos-g{display:flex;flex-wrap:wrap;justify-content:center;gap:18px 4px}.gb-modo{width:calc(25% - 3px)}.gb-modo span{padding:3px 8px;font-size:11.5px;margin-top:7px}
.gb-ret h2{font-size:48px}.gb-vago{height:340px}.gb-passo{grid-template-columns:46px 1fr;padding:18px 0}.gb-passo h3{font-size:22px}
.gb-ed{gap:34px 12px}.gb-e1,.gb-e4{grid-column:1/13}.gb-e1 .gb-ph{height:340px}.gb-e4 .gb-ph{height:330px}.gb-e2{grid-column:1/7}.gb-e3{grid-column:1/13}.gb-e3 .gb-ph{height:300px}.gb-ed{align-items:start}.gb-cap{font-size:13px;margin-top:9px}
.gb-kit{grid-template-columns:1fr auto;gap:2px 12px;padding:22px 2px}.gb-kit h3{font-size:32px;grid-column:1/3}.gb-kit small{grid-column:1}.gb-kit strong{grid-row:2;grid-column:2;font-size:20px}.gb-seta{display:none}.gb-tag{margin-left:6px;font-size:10.5px;padding:2px 8px}
.gb-fatia{font-size:14px}.gb-fatia th,.gb-fatia td{padding:14px 7px}.gb-li{font-size:23px}.gb-linha h2{font-size:36px}.gb-rev{padding:44px 0}.gb-rev h2{font-size:28px}.gb-sinais .gb-w{grid-template-columns:1fr 1fr;gap:26px 16px}.gb-sinal{font-size:21px}.gb-mail{padding:54px 0}.gb-mail .gb-w{display:block}.gb-mail h2{font-size:34px;margin-bottom:18px}.gb-mail-f{width:100%}.gb-mail .gb-btn{padding:0 22px}.gb-rodape .gb-w>div:first-child{grid-template-columns:1fr 1fr}.gb-rodape .gb-w>div:first-child>div:first-child{grid-column:span 2}
.gb-compra{padding:0 0 56px}.gb-compra .gb-w{padding:0}.gb-compra-g{gap:0}.gb-gal-main{border-radius:0;height:272px}.gb-gal-main img{height:100%;aspect-ratio:auto!important}.gb-thumbs{display:flex;overflow-x:auto;padding:0 22px;margin-top:6px;gap:6px;scrollbar-width:none}.gb-thumb{flex:0 0 44px;width:44px;height:44px}.gb-info{position:static;padding:10px 22px 0}.gb-info h1{font-size:30px}.gb-tit{display:flex;justify-content:space-between;gap:10px;align-items:baseline}.gb-preco{font-size:20px;margin:0}.gb-bens{flex-wrap:nowrap;justify-content:space-between;gap:4px;margin:7px 0 15px}.gb-bens li{padding:3px 9px;font-size:11.5px;white-space:nowrap}.gb-opts{gap:7px}.gb-opt{min-height:88px;padding:12px 3px 7px}.gb-opt strong{font-size:17px}.gb-opt small{font-size:11px}.gb-opt em{font-size:9.5px;padding:2px 7px}.gb-conta{font-size:12.5px;margin:7px 0;min-height:18px}.gb-info .gb-btn{min-height:50px}.gb-selos{font-size:12px}
.gb-capa{max-width:270px;font-size:29px}.gb-tempo{grid-template-columns:minmax(0,1fr)}.gb-tempo li{border-top:0;border-left:1px solid #1F3A3D;padding:0 0 24px 22px}.gb-tempo li:before{top:0;left:-5px}.gb-tempo b{font-size:24px}.gb-ent h2{margin-bottom:30px}
}@media(max-width:759px){.gb-barra{position:fixed;z-index:9;left:0;right:0;bottom:0;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px;background:#F3EEE8;border-top:1px solid rgba(22,36,31,.18);display:none}.gb-barra.on{display:flex}.gb-barra .gb-btn{min-height:46px;padding:0 24px}.gb-barra b{font-weight:600}}</style></head><body><div class="gb-root"><!-- secao: aviso -->
<div class="gb-aviso">Free US shipping from $49. 30-day returns.</div>
<!-- secao: cabecalho -->
<header class="gb-top"><div class="gb-w"><details class="gb-menu"><summary class="gb-menu__b" aria-label="Menu"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;flex:none"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg></summary><nav class="gb-menu__p" aria-label="Menu"><a href="produto.html">LED Mask</a><a href="https://holdwellco.com/collections/neck-shoulder">Neck &amp; Shoulder</a><a href="https://holdwellco.com/collections/posture-back">Posture &amp; Back</a><a href="https://holdwellco.com/collections/all">Shop All</a></nav></details><a class="gb-logo" href="home.html"><img src="https://holdwellco.com/cdn/shop/files/holdwell-logo_png.png?v=1789583693&width=1200" alt="Holdwellco logo">Holdwellco</a><nav class="gb-nav" aria-label="Main"><a href="produto.html">LED Mask</a><a href="https://holdwellco.com/collections/neck-shoulder">Neck &amp; Shoulder</a><a href="https://holdwellco.com/collections/posture-back">Posture &amp; Back</a><a href="https://holdwellco.com/collections/all">Shop All</a></nav><a class="gb-cart" href="https://holdwellco.com/cart" aria-label="Cart"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;flex:none"><path d="M6 8h12l1 12H5z"></path><path d="M9 8V6.5a3 3 0 016 0V8"></path></svg></a></div></header>
<!-- secao: hero -->
<section class="gb-hero"><div class="gb-w"><div><h1>Ten quiet minutes.<br>Seven lights.</h1><p>A cordless LED face mask for the end of your day.</p><a class="gb-btn" href="produto.html">Shop the mask, $59.99</a></div><div class="gb-ph gb-arco gb-hero-f"><img src="fotos/r-sofa.jpg" alt="Woman relaxing at dusk wearing the Zeraya mask in purple light" loading="eager" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 18%"></div></div></section>
<!-- secao: fatos -->
<section class="gb-fatos"><div class="gb-w"><div class="gb-fato">7 light modes</div><div class="gb-fato">180 LEDs</div><div class="gb-fato">Cordless, USB-C</div><div class="gb-fato">10 to 15 minutes</div></div></section>
<!-- secao: ritual -->
<section class="gb-sec gb-rit"><div class="gb-w"><div class="gb-ph gb-rit-f"><img src="fotos/r-cama.jpg" alt="Woman resting in bed wearing the Zeraya mask in red light" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 30%"></div><h2>The part of the day that is only yours.</h2></div></section>
<!-- secao: modos -->
<section class="gb-sec gb-modos"><div class="gb-w"><h2>One mask. Seven lights.</h2><div class="gb-modos-g"><div class="gb-modo"><img src="fotos/r-modo-red.jpg" alt="Mask in red light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Red</span></div><div class="gb-modo"><img src="fotos/r-modo-blue.jpg" alt="Mask in blue light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Blue</span></div><div class="gb-modo"><img src="fotos/r-modo-green.jpg" alt="Mask in green light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Green</span></div><div class="gb-modo"><img src="fotos/r-modo-purple.jpg" alt="Mask in purple light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Purple</span></div><div class="gb-modo"><img src="fotos/r-modo-yellow.jpg" alt="Mask in yellow light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Yellow</span></div><div class="gb-modo"><img src="fotos/r-modo-cyan.jpg" alt="Mask in cyan light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Cyan</span></div><div class="gb-modo"><img src="fotos/r-modo-white.jpg" alt="Mask in white light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>White</span></div></div></div></section>
<!-- secao: retrato -->
<section class="gb-sec gb-ret"><div class="gb-w"><h2>Skincare, with the lights low.</h2><div class="gb-vago" data-acao="trocar" data-foto="retrato-home" data-provisoria="true" style="overflow:hidden"><img src="fotos/r-perfil.jpg" alt="Zeraya mask glowing red, seen from the side" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:45% 50%"></div></div></section>
<!-- secao: passos -->
<section class="gb-sec gb-como"><div class="gb-w gb-passos"><div class="gb-ph gb-arco" style="height:620px"><img src="fotos/r-criado.jpg" alt="Zeraya mask on a nightstand beside a candle and books" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:56% 50%"></div><div><h2>Three steps. One button.</h2><div class="gb-passo"><b>1</b><h3>Start with clean, dry skin</h3></div><div class="gb-passo"><b>2</b><h3>Pick a light, close your eyes</h3></div><div class="gb-passo"><b>3</b><h3>Relax for 10 to 15 minutes</h3></div></div></div></section>
<!-- secao: detalhes -->
<section class="gb-sec gb-detalhes" style="padding-top:0"><div class="gb-w gb-ed"><h2>Built for the couch.</h2><figure class="gb-e1" style="margin:0"><div class="gb-ph"><img src="fotos/r-leds.jpg" alt="Close view of the LEDs inside the mask" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%"></div><figcaption class="gb-cap">180 LEDs, forehead to chin</figcaption></figure><figure class="gb-e3" style="margin:0"><div class="gb-ph"><img src="fotos/r-faixa.jpg" alt="Hands adjusting the strap behind the head" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:52% 40%"></div><figcaption class="gb-cap">Adjustable strap</figcaption></figure><figure class="gb-e4" style="margin:0"><div class="gb-ph"><img src="fotos/r-mascara.jpg" alt="Side view of the white LED mask" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 45%"></div><figcaption class="gb-cap">Open eyes, nose and mouth</figcaption></figure></div></section>
<!-- secao: caixa -->
<section class="gb-sec gb-caixa"><div class="gb-w gb-caixa-g"><div class="gb-ph"><img src="fotos/r-caixa.jpg" alt="Mask, strap, USB-C cable and manual laid out flat" loading="lazy" style="display:block;width:100%;aspect-ratio:7/6;object-fit:cover;object-position:50% 50%"></div><div><h2>In the box</h2><ul class="gb-lista"><li>LED face mask</li><li>Adjustable strap</li><li>USB-C cable</li><li>Manual</li></ul><div class="gb-cx-p">$59.99</div><a class="gb-btn" href="produto.html">Shop the mask</a></div></div></section>
<!-- secao: oferta -->
<section class="gb-sec gb-oferta"><div class="gb-w"><h2>One for you. One to give.</h2><div><a class="gb-kit" href="produto.html#comprar"><h3>One mask</h3><small>Free US shipping</small><strong>$59.99</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a><a class="gb-kit" href="produto.html#comprar"><h3>Two masks</h3><small>$50.99 each, save $18.00, $14.90 guide included</small><strong>$101.98</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a><a class="gb-kit" href="produto.html#comprar"><h3>Three masks<span class="gb-tag">Lowest per mask</span></h3><small>$41.99 each, save $53.99, $14.90 guide included</small><strong>$125.98</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a></div></div></section>
<!-- secao: comparacao -->
<section class="gb-sec gb-compara"><div class="gb-w"><h2>Plain facts, no theater.</h2><table class="gb-fatia"><thead><tr><th scope="col"><span style="position:absolute;left:-9999px">Topic</span></th><th scope="col">Many LED mask stores</th><th scope="col">Holdwellco</th></tr></thead><tbody><tr><th scope="row">Price</th><td>Inflated "was" price</td><td>One real price</td></tr><tr><th scope="row">Urgency</th><td>Countdown timers</td><td>None</td></tr><tr><th scope="row">Claims</th><td>Big promises</td><td>Plain specs</td></tr><tr><th scope="row">Returns</th><td>Hard to find</td><td>30 days after delivery</td></tr></tbody></table></div></section>
<!-- secao: linha -->
<section class="gb-sec gb-linha" style="padding-top:0"><div class="gb-w"><h2>More for your routine</h2><a class="gb-li" href="https://holdwellco.com/products/led-neck-face-massager">LED Neck &amp; Face Massager<span>$49.90</span></a><a class="gb-li" href="https://holdwellco.com/products/neck-shoulder-massager">Neck &amp; Shoulder Massager<span>$34.90</span></a><a class="gb-li" href="https://holdwellco.com/products/posture-corrector-core">Posture Corrector<span>$64.90</span></a></div></section>
<!-- secao: avaliacoes -->
<section class="gb-rev" data-depende="avaliacoes-reais"><div class="gb-w"><h2>Reviews</h2><p>Reviews from verified orders will appear here.</p></div></section>
<!-- secao: garantias -->
<section class="gb-sec gb-sinais" style="padding-top:72px;padding-bottom:72px"><div class="gb-w"><div class="gb-sinal">Free US shipping<span>On orders from $49</span></div><div class="gb-sinal">Ships in 1 to 3 days<span>Business days</span></div><div class="gb-sinal">Arrives in 7 to 12 days<span>Business days</span></div><div class="gb-sinal">30-day returns<span>After delivery</span></div></div></section>
<!-- secao: perguntas -->
<section class="gb-sec gb-faq"><div class="gb-w gb-faq-g"><h2>Questions</h2><div><details><summary>How do I use it?</summary><p>On clean, dry skin, choose a light mode and relax with your eyes closed for 10 to 15 minutes.</p></details><details><summary>Who should not use it?</summary><p>Do not use if you are pregnant, have epilepsy or a light-sensitive condition, or take medication that makes you sensitive to light. Check with your doctor if you are unsure.</p></details><details><summary>Does it have a cord?</summary><p>No cord while you wear it. It recharges with the included USB-C cable.</p></details><details><summary>How long does delivery take?</summary><p>Orders ship in 1 to 3 business days and arrive in 7 to 12 business days in the US. Standard US shipping is free from $49.</p></details><details><summary>How do returns work?</summary><p>Request a return within 30 days after delivery at support@holdwellco.com. Return shipping is on you unless the item arrived damaged, defective or wrong.</p></details><details><summary>What is the digital guide?</summary><p>The Zeraya Glow Companion, a $14.90 digital guide included with the 2 and 3 mask sets.</p></details></div></div></section>
<!-- secao: cuidado -->
<section class="gb-sec" style="padding-top:0"><div class="gb-w"><div class="gb-seguro"><h3>Before you start</h3><p>Cosmetic device, not a medical device. Results vary. Keep your eyes closed during use. Do not use if you are pregnant, have epilepsy or a light-sensitive condition, or take medication that makes you sensitive to light. Check with your doctor if you are unsure.</p></div></div></section>
<!-- secao: cadastro -->
<section class="gb-mail"><div class="gb-w"><h2>First to know</h2><div class="gb-mail-f"><div class="gb-mail-c"><label for="gb-email">Email address</label><input id="gb-email" type="email" autocomplete="email"></div><button class="gb-btn" type="button">Subscribe</button></div></div></section>
<!-- secao: rodape -->
<footer class="gb-rodape"><div class="gb-w"><div><div><div class="gb-marca">Holdwellco</div><p>Cosmetic device, not a medical device. Results vary.</p><p style="margin-top:8px">support@holdwellco.com</p></div><div><b>Shop</b><a href="produto.html">LED Mask</a><a href="https://holdwellco.com/collections/all">Shop All</a></div><div><b>Help</b><a href="https://holdwellco.com/policies/shipping-policy">Shipping</a><a href="https://holdwellco.com/policies/refund-policy">Returns</a><a href="https://holdwellco.com/policies/privacy-policy">Privacy</a><a href="https://holdwellco.com/policies/terms-of-service">Terms</a></div></div><div class="gb-legal">&copy; 2026 Holdwellco</div></div></footer>
</div></body></html>
```

## Desenho de referência: produto.html

```html
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Zeraya LED Face Mask | Holdwellco</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#F3EEE8;color:#16241F;font-family:Inter,sans-serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%}a{color:inherit}button{font:inherit;color:inherit;cursor:pointer}
.gb-root{width:100%;overflow:hidden}.gb-w{max-width:1320px;margin:0 auto;padding:0 48px}
h1,h2,h3{font-family:Fraunces,Georgia,serif;font-weight:500;color:#16241F;margin:0;letter-spacing:-.025em}
h1{font-size:96px;line-height:.98}h2{font-size:68px;line-height:1.02}h3{font-size:30px;line-height:1.15}
p{margin:0;color:rgba(22,36,31,.74)}.gb-sec{padding:128px 0}.gb-lead{font-size:20px;line-height:1.5}
.gb-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:56px;padding:0 36px;border-radius:9999px;background:#1F3A3D;border:1px solid #1F3A3D;color:#F5F7F7;text-decoration:none;font-weight:500;font-size:16px;white-space:nowrap;transition:transform .15s,background .15s}.gb-btn:hover{background:#16241F}.gb-btn:active{transform:scale(.98)}
.gb-ph{overflow:hidden;background:#EEDFD3;border-radius:4px}.gb-arco{border-radius:999px 999px 4px 4px}
.gb-cap{display:block;margin-top:14px;font-size:14px;color:rgba(22,36,31,.72)}
.gb-aviso{background:#EEDFD3;color:#16241F;text-align:center;font-size:13px;padding:9px 16px}
.gb-top{background:#F3EEE8;position:relative;z-index:20}.gb-menu{display:none}.gb-top .gb-w{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.gb-logo{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:Fraunces,Georgia,serif;font-size:25px;font-weight:500;color:#16241F}.gb-logo img{width:32px;height:32px;border-radius:7px;object-fit:cover}
.gb-nav{display:flex;gap:32px;font-size:14px}.gb-nav a{text-decoration:none;color:rgba(22,36,31,.8)}.gb-cart{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center}
.gb-hero .gb-w{display:grid;grid-template-columns:7fr 5fr;gap:48px;align-items:end;padding-top:28px;padding-bottom:72px}.gb-hero h1{font-size:86px}.gb-hero p{font-size:20px;margin:30px 0 34px;max-width:440px}.gb-hero-f{height:720px}
.gb-fatos{border-top:1px solid rgba(22,36,31,.16);border-bottom:1px solid rgba(22,36,31,.16)}.gb-fatos .gb-w{display:flex;justify-content:space-between;gap:20px}.gb-fato{padding:22px 0;font-size:15px}
.gb-rit .gb-w{display:grid;grid-template-columns:8fr 4fr;gap:64px;align-items:end}.gb-rit-f{height:820px}.gb-rit h2{font-size:56px}
.gb-modos{padding-bottom:96px}.gb-modos h2{text-align:center;margin-bottom:56px}.gb-modos-g{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}.gb-modo{text-align:center}.gb-modo img{display:block;width:100%;aspect-ratio:7/10;object-fit:cover}.gb-modo span{display:inline-block;margin-top:12px;padding:5px 15px;border:1px solid rgba(22,36,31,.3);border-radius:9999px;font-size:13px}
.gb-ret{background:#EEDFD3}.gb-ret .gb-w{display:grid;grid-template-columns:7fr 5fr;gap:72px;align-items:center}.gb-ret h2{font-size:84px;line-height:1}.gb-vago{height:520px;border-radius:999px 999px 4px 4px;background:radial-gradient(ellipse 60% 44% at 50% 44%,#F9EDE4 0,#F0D3C4 46%,#E2C5B4 100%)}
.gb-passos{display:grid;grid-template-columns:5fr 6fr;gap:96px;align-items:center}.gb-passo{display:grid;grid-template-columns:64px 1fr;align-items:baseline;padding:24px 0;border-top:1px solid rgba(22,36,31,.18)}.gb-passo b{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:30px;color:#1F3A3D}.gb-passo h3{font-size:27px}.gb-passos h2{margin-bottom:34px}
.gb-ed{display:grid;grid-template-columns:repeat(12,1fr);gap:72px 28px;align-items:end}.gb-e1{grid-column:1/13}.gb-e1 .gb-ph{height:620px}.gb-e2{grid-column:9/13}.gb-e2 .gb-ph{height:340px}.gb-e3{grid-column:2/6}.gb-e3 .gb-ph{height:380px}.gb-e4{grid-column:6/13}.gb-e4 .gb-ph{height:600px}.gb-ed h2{grid-column:1/13}
.gb-caixa{background:#EEDFD3}.gb-caixa-g{display:grid;grid-template-columns:7fr 5fr;gap:80px;align-items:center}.gb-lista{list-style:none;margin:28px 0;padding:0}.gb-lista li{padding:13px 0;border-top:1px solid rgba(22,36,31,.18);font-size:17px}.gb-cx-p{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:40px;margin-bottom:16px}
.gb-oferta h2{margin-bottom:44px}.gb-kit{display:grid;grid-template-columns:4fr 4fr 2fr auto;gap:24px;align-items:center;padding:30px 8px;border-top:1px solid rgba(22,36,31,.2);text-decoration:none;color:#16241F;transition:background .15s}.gb-kit:hover{background:#EEDFD3}.gb-kit:last-child{border-bottom:1px solid rgba(22,36,31,.2)}.gb-kit h3{font-size:44px}.gb-kit small{font-size:15px;color:rgba(22,36,31,.75)}.gb-kit strong{font-size:24px;font-weight:500}.gb-seta{font-size:22px}.gb-tag{display:inline-block;margin-left:10px;vertical-align:middle;background:#1F3A3D;color:#F5F7F7;border-radius:9999px;padding:3px 11px;font-family:Inter,sans-serif;font-size:12px;letter-spacing:0}
.gb-fatia{border-collapse:collapse;width:100%;font-size:16px}.gb-fatia th,.gb-fatia td{padding:20px 14px;border-top:1px solid rgba(22,36,31,.16);text-align:left;font-weight:400}.gb-fatia thead th{border-top:0;font-size:14px;color:rgba(22,36,31,.72)}.gb-fatia thead th:last-child{color:#1F3A3D;font-weight:600}.gb-fatia td:last-child{font-weight:500;color:#1F3A3D}.gb-compara h2{margin-bottom:40px}
.gb-linha h2{font-size:44px;margin-bottom:24px}.gb-li{display:flex;justify-content:space-between;gap:16px;align-items:baseline;padding:18px 0;border-top:1px solid rgba(22,36,31,.18);text-decoration:none;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:28px}.gb-li span{font-family:Inter,sans-serif;font-size:15px}
.gb-rev{padding:60px 0;border-top:1px solid rgba(22,36,31,.14)}.gb-rev h2{font-size:34px}.gb-rev p{margin-top:6px}
.gb-sinais .gb-w{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}.gb-sinal{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:24px;line-height:1.2}.gb-sinal span{display:block;margin-top:6px;font-family:Inter,sans-serif;font-size:14px;color:rgba(22,36,31,.74)}
.gb-faq-g{display:grid;grid-template-columns:4fr 8fr;gap:64px}.gb-faq details{border-top:1px solid rgba(22,36,31,.18)}.gb-faq details:last-child{border-bottom:1px solid rgba(22,36,31,.18)}.gb-faq summary{list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:center;min-height:66px;font-size:17px;cursor:pointer}.gb-faq summary::-webkit-details-marker{display:none}.gb-faq summary:after{content:"+";font-size:24px;font-weight:500}.gb-faq details[open] summary:after{content:"\2212"}.gb-faq details p{padding:0 32px 22px 0}
.gb-seguro{border-top:1px solid rgba(22,36,31,.3);padding-top:28px;display:grid;grid-template-columns:4fr 8fr;gap:32px}.gb-seguro p{color:#16241F}
.gb-mail{background:#EEDFD3;padding:80px 0}.gb-mail .gb-w{display:flex;justify-content:space-between;align-items:center;gap:40px}.gb-mail h2{font-size:44px}.gb-mail-f{display:flex;gap:10px;width:470px;max-width:100%}.gb-mail-c{flex:1;min-width:0}.gb-mail label{display:block;font-size:13px;margin-bottom:6px}.gb-mail input{width:100%;height:56px;border-radius:9999px;border:1px solid rgba(22,36,31,.5);padding:0 22px;font:inherit;background:#FFFDFA;color:#16241F}.gb-mail .gb-btn{align-self:flex-end}
.gb-rodape{background:#1F3A3D;color:rgba(245,247,247,.78);padding:64px 0 36px;font-size:14px}.gb-rodape .gb-w>div:first-child{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px}.gb-rodape b{display:block;color:#F5F7F7;font-weight:500;margin-bottom:12px}.gb-rodape a{display:block;text-decoration:none;padding:5px 0;color:rgba(245,247,247,.78)}.gb-rodape p{color:rgba(245,247,247,.78);max-width:460px}.gb-rodape .gb-marca{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:30px;color:#F5F7F7;margin-bottom:10px}.gb-legal{border-top:1px solid rgba(245,247,247,.2);margin-top:40px;padding-top:20px;font-size:13px}
.gb-compra{padding:16px 0 96px}.gb-compra-g{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:64px;align-items:start}.gb-gal-main{overflow:hidden;background:#EEDFD3;border-radius:4px}.gb-thumbs{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-top:10px}.gb-thumb{padding:0;border:1px solid transparent;border-radius:4px;overflow:hidden;background:none;min-height:44px}.gb-thumb.on{border-color:#1F3A3D;box-shadow:0 0 0 1px #1F3A3D}
.gb-info{position:sticky;top:24px}.gb-info h1{font-size:58px;line-height:1.02}.gb-preco{font-size:24px;margin-top:12px}.gb-bens{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:20px 0 26px}.gb-bens li{padding:5px 14px;border:1px solid rgba(22,36,31,.28);border-radius:9999px;font-size:13px}
.gb-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.gb-opt{position:relative;border:1px solid rgba(22,36,31,.3);background:transparent;border-radius:12px;padding:18px 6px 12px;text-align:center;min-height:108px;display:flex;flex-direction:column;align-items:center;transition:border-color .15s}.gb-opt.on{border-color:#1F3A3D;box-shadow:0 0 0 1px #1F3A3D;background:#EEDFD3}.gb-opt b{font-weight:400;font-size:14px}.gb-opt strong{font-size:19px;font-weight:500}.gb-opt small{font-size:12px;color:rgba(22,36,31,.76);line-height:1.3}.gb-opt em{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#1F3A3D;color:#F5F7F7;font-style:normal;font-size:10.5px;border-radius:9999px;padding:2px 9px;white-space:nowrap}
.gb-conta{font-size:14px;margin:13px 0;min-height:21px;color:rgba(22,36,31,.82)}.gb-info .gb-btn{width:100%}.gb-selos{display:flex;justify-content:space-between;gap:10px;margin-top:14px;font-size:13px}
.gb-add{display:grid;grid-template-columns:1fr 26px;gap:14px;align-items:center;width:100%;margin-top:18px;padding:14px 16px;border:1px solid rgba(22,36,31,.24);border-radius:12px;background:transparent;text-align:left}.gb-add b{display:block;font-size:14px;font-weight:500}.gb-add small{font-size:13px;color:rgba(22,36,31,.75)}.gb-add i{width:24px;height:24px;border:1px solid #1F3A3D;border-radius:7px;display:flex;align-items:center;justify-content:center;color:transparent}.gb-add.on{border-color:#1F3A3D}.gb-add.on i{background:#1F3A3D;color:#F5F7F7}
.gb-macro{display:grid;grid-template-columns:4fr 8fr;gap:72px;align-items:end}.gb-macro.inv{grid-template-columns:7fr 5fr;align-items:center}.gb-macro p{margin-top:16px}
.gb-guia{display:grid;grid-template-columns:5fr 7fr;gap:88px;align-items:center}.gb-capa{aspect-ratio:4/5;max-width:400px;width:100%;margin:0 auto;border-radius:999px 999px 4px 4px;background:linear-gradient(180deg,#F8ECE3,#E2C5B4);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:36px;line-height:1.1;color:#16241F}.gb-capa small{font-family:Inter,sans-serif;font-size:13px;margin-top:14px}
.gb-tempo{display:grid;grid-template-columns:repeat(4,1fr);list-style:none;margin:0;padding:0}.gb-tempo li{position:relative;padding:28px 24px 0 0;border-top:1px solid #1F3A3D}.gb-tempo li:before{content:"";position:absolute;top:-5px;left:0;width:9px;height:9px;border-radius:50%;background:#1F3A3D}.gb-tempo b{display:block;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:28px;line-height:1.2}.gb-tempo span{font-size:14.5px;color:rgba(22,36,31,.75)}.gb-ent h2{margin-bottom:48px}.gb-barra{display:none}
@media(max-width:759px){
.gb-w{padding:0 22px}.gb-sec{padding:76px 0}h1{font-size:50px}h2{font-size:42px}h3{font-size:24px}.gb-lead{font-size:17px}.gb-nav{display:none}.gb-menu{display:block}.gb-menu__b{list-style:none;display:inline-flex;width:44px;height:44px;margin-left:-10px;align-items:center;justify-content:center;cursor:pointer}.gb-menu__b::-webkit-details-marker{display:none}.gb-menu__p{position:absolute;left:0;right:0;top:100%;display:flex;flex-direction:column;padding:6px 22px 14px;background:#F3EEE8;border-top:1px solid rgba(22,36,31,.18);border-bottom:1px solid rgba(22,36,31,.18)}.gb-menu__p a{display:block;padding:14px 0;font-size:17px;text-decoration:none;border-bottom:1px solid rgba(22,36,31,.18)}.gb-menu__p a:last-child{border-bottom:0}.gb-top .gb-w{height:54px}.gb-logo{font-size:22px}.gb-logo img{width:28px;height:28px}.gb-aviso{font-size:12px;padding:7px 10px}
.gb-hero .gb-w{display:flex;flex-direction:column-reverse;gap:18px;padding-top:0;padding-bottom:30px}.gb-hero h1{font-size:43px}.gb-hero p{font-size:16px;margin:10px 0 16px}.gb-hero .gb-btn{width:100%}.gb-hero-f{height:392px;width:100%}
.gb-fatos .gb-w{display:grid;grid-template-columns:1fr 1fr;gap:0 12px;padding-top:8px;padding-bottom:8px}.gb-fato{padding:9px 0;font-size:14px}
.gb-rit .gb-w,.gb-ret .gb-w,.gb-passos,.gb-caixa-g,.gb-macro,.gb-macro.inv,.gb-guia,.gb-faq-g,.gb-seguro,.gb-compra-g{grid-template-columns:minmax(0,1fr);gap:30px}.gb-rit-f{height:470px}.gb-rit h2{font-size:38px}
.gb-modos{padding-bottom:64px}.gb-modos h2{margin-bottom:30px}.gb-modos-g{display:flex;flex-wrap:wrap;justify-content:center;gap:18px 4px}.gb-modo{width:calc(25% - 3px)}.gb-modo span{padding:3px 8px;font-size:11.5px;margin-top:7px}
.gb-ret h2{font-size:48px}.gb-vago{height:340px}.gb-passo{grid-template-columns:46px 1fr;padding:18px 0}.gb-passo h3{font-size:22px}
.gb-ed{gap:34px 12px}.gb-e1,.gb-e4{grid-column:1/13}.gb-e1 .gb-ph{height:340px}.gb-e4 .gb-ph{height:330px}.gb-e2{grid-column:1/7}.gb-e3{grid-column:1/13}.gb-e3 .gb-ph{height:300px}.gb-ed{align-items:start}.gb-cap{font-size:13px;margin-top:9px}
.gb-kit{grid-template-columns:1fr auto;gap:2px 12px;padding:22px 2px}.gb-kit h3{font-size:32px;grid-column:1/3}.gb-kit small{grid-column:1}.gb-kit strong{grid-row:2;grid-column:2;font-size:20px}.gb-seta{display:none}.gb-tag{margin-left:6px;font-size:10.5px;padding:2px 8px}
.gb-fatia{font-size:14px}.gb-fatia th,.gb-fatia td{padding:14px 7px}.gb-li{font-size:23px}.gb-linha h2{font-size:36px}.gb-rev{padding:44px 0}.gb-rev h2{font-size:28px}.gb-sinais .gb-w{grid-template-columns:1fr 1fr;gap:26px 16px}.gb-sinal{font-size:21px}.gb-mail{padding:54px 0}.gb-mail .gb-w{display:block}.gb-mail h2{font-size:34px;margin-bottom:18px}.gb-mail-f{width:100%}.gb-mail .gb-btn{padding:0 22px}.gb-rodape .gb-w>div:first-child{grid-template-columns:1fr 1fr}.gb-rodape .gb-w>div:first-child>div:first-child{grid-column:span 2}
.gb-compra{padding:0 0 56px}.gb-compra .gb-w{padding:0}.gb-compra-g{gap:0}.gb-gal-main{border-radius:0;height:272px}.gb-gal-main img{height:100%;aspect-ratio:auto!important}.gb-thumbs{display:flex;overflow-x:auto;padding:0 22px;margin-top:6px;gap:6px;scrollbar-width:none}.gb-thumb{flex:0 0 44px;width:44px;height:44px}.gb-info{position:static;padding:10px 22px 0}.gb-info h1{font-size:30px}.gb-tit{display:flex;justify-content:space-between;gap:10px;align-items:baseline}.gb-preco{font-size:20px;margin:0}.gb-bens{flex-wrap:nowrap;justify-content:space-between;gap:4px;margin:7px 0 15px}.gb-bens li{padding:3px 9px;font-size:11.5px;white-space:nowrap}.gb-opts{gap:7px}.gb-opt{min-height:88px;padding:12px 3px 7px}.gb-opt strong{font-size:17px}.gb-opt small{font-size:11px}.gb-opt em{font-size:9.5px;padding:2px 7px}.gb-conta{font-size:12.5px;margin:7px 0;min-height:18px}.gb-info .gb-btn{min-height:50px}.gb-selos{font-size:12px}
.gb-capa{max-width:270px;font-size:29px}.gb-tempo{grid-template-columns:minmax(0,1fr)}.gb-tempo li{border-top:0;border-left:1px solid #1F3A3D;padding:0 0 24px 22px}.gb-tempo li:before{top:0;left:-5px}.gb-tempo b{font-size:24px}.gb-ent h2{margin-bottom:30px}
}@media(max-width:759px){.gb-barra{position:fixed;z-index:9;left:0;right:0;bottom:0;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px;background:#F3EEE8;border-top:1px solid rgba(22,36,31,.18);display:none}.gb-barra.on{display:flex}.gb-barra .gb-btn{min-height:46px;padding:0 24px}.gb-barra b{font-weight:600}}</style></head><body><div class="gb-root"><!-- secao: aviso -->
<div class="gb-aviso">Free US shipping from $49. 30-day returns.</div>
<!-- secao: cabecalho -->
<header class="gb-top"><div class="gb-w"><details class="gb-menu"><summary class="gb-menu__b" aria-label="Menu"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;flex:none"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg></summary><nav class="gb-menu__p" aria-label="Menu"><a href="produto.html">LED Mask</a><a href="https://holdwellco.com/collections/neck-shoulder">Neck &amp; Shoulder</a><a href="https://holdwellco.com/collections/posture-back">Posture &amp; Back</a><a href="https://holdwellco.com/collections/all">Shop All</a></nav></details><a class="gb-logo" href="home.html"><img src="https://holdwellco.com/cdn/shop/files/holdwell-logo_png.png?v=1789583693&width=1200" alt="Holdwellco logo">Holdwellco</a><nav class="gb-nav" aria-label="Main"><a href="produto.html">LED Mask</a><a href="https://holdwellco.com/collections/neck-shoulder">Neck &amp; Shoulder</a><a href="https://holdwellco.com/collections/posture-back">Posture &amp; Back</a><a href="https://holdwellco.com/collections/all">Shop All</a></nav><a class="gb-cart" href="https://holdwellco.com/cart" aria-label="Cart"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;flex:none"><path d="M6 8h12l1 12H5z"></path><path d="M9 8V6.5a3 3 0 016 0V8"></path></svg></a></div></header>
<!-- secao: compra -->
<section class="gb-compra" id="comprar"><div class="gb-w"><div class="gb-compra-g"><div><div class="gb-gal-main"><img src="fotos/r-mascara.jpg" alt="Side view of the white mask" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover;object-position:50% 50%"></div><div class="gb-thumbs"><button class="gb-thumb on" type="button" data-g="0" aria-label="Show photo: Side view of the white mask"><img src="fotos/r-mascara.jpg" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover"></button><button class="gb-thumb " type="button" data-g="1" aria-label="Show photo: Mask on a nightstand"><img src="fotos/r-criado.jpg" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover"></button><button class="gb-thumb " type="button" data-g="2" aria-label="Show photo: Mask in use in bed"><img src="fotos/r-cama.jpg" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover"></button><button class="gb-thumb " type="button" data-g="3" aria-label="Show photo: Mask in purple light"><img src="fotos/r-sofa.jpg" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover"></button><button class="gb-thumb " type="button" data-g="4" aria-label="Show photo: LEDs up close"><img src="fotos/r-leds.jpg" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover"></button><button class="gb-thumb " type="button" data-g="5" aria-label="Show photo: Adjusting the strap"><img src="fotos/r-faixa.jpg" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover"></button><button class="gb-thumb " type="button" data-g="6" aria-label="Show photo: USB-C charging"><img src="fotos/r-cabo.jpg" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover"></button><button class="gb-thumb " type="button" data-g="7" aria-label="Show photo: Everything in the box"><img src="fotos/r-caixa.jpg" alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover"></button></div></div><div class="gb-info"><div class="gb-tit"><h1>Zeraya LED Face Mask</h1><div class="gb-preco">$59.99</div></div><ul class="gb-bens"><li>7 light modes</li><li>180 LEDs</li><li>Cordless USB-C</li></ul><div class="gb-opts" role="group" aria-label="Choose quantity"><button class="gb-opt " type="button" data-q="1" aria-pressed="false"><b>1 mask</b><strong>$59.99</strong><small>$59.99 each</small></button><button class="gb-opt on" type="button" data-q="2" aria-pressed="true"><b>2 masks</b><strong>$101.98</strong><small>$50.99 each</small></button><button class="gb-opt " type="button" data-q="3" aria-pressed="false"><em>Lowest per mask</em><b>3 masks</b><strong>$125.98</strong><small>$41.99 each</small></button></div><div class="gb-conta"><span data-t="conta">You save $18.00, plus a $14.90 guide</span></div><button class="gb-btn" type="button">Add to cart, <span data-t="total">$101.98</span></button><div class="gb-selos"><span>Free US shipping from $49</span><span>30-day returns</span></div><button class="gb-add " type="button" role="checkbox" aria-checked="false" data-add="1"><span><b>Add the Neck &amp; Face Massager</b><small>$49.90</small></span><i><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;flex:none"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></i></button></div></div></div></section>
<!-- secao: fatos -->
<section class="gb-fatos"><div class="gb-w"><div class="gb-fato">7 light modes</div><div class="gb-fato">180 LEDs</div><div class="gb-fato">Cordless, USB-C</div><div class="gb-fato">10 to 15 minutes</div></div></section>
<!-- secao: ritual -->
<section class="gb-sec gb-rit"><div class="gb-w"><div class="gb-ph gb-rit-f"><img src="fotos/r-cama.jpg" alt="Woman resting in bed wearing the Zeraya mask in red light" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 30%"></div><h2>Ten quiet minutes before bed.</h2></div></section>
<!-- secao: modos -->
<section class="gb-sec gb-modos"><div class="gb-w"><h2>One mask. Seven lights.</h2><div class="gb-modos-g"><div class="gb-modo"><img src="fotos/r-modo-red.jpg" alt="Mask in red light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Red</span></div><div class="gb-modo"><img src="fotos/r-modo-blue.jpg" alt="Mask in blue light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Blue</span></div><div class="gb-modo"><img src="fotos/r-modo-green.jpg" alt="Mask in green light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Green</span></div><div class="gb-modo"><img src="fotos/r-modo-purple.jpg" alt="Mask in purple light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Purple</span></div><div class="gb-modo"><img src="fotos/r-modo-yellow.jpg" alt="Mask in yellow light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Yellow</span></div><div class="gb-modo"><img src="fotos/r-modo-cyan.jpg" alt="Mask in cyan light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>Cyan</span></div><div class="gb-modo"><img src="fotos/r-modo-white.jpg" alt="Mask in white light" loading="lazy" style="display:block;width:100%;aspect-ratio:7/10;object-fit:cover;object-position:50% 50%"><span>White</span></div></div></div></section>
<!-- secao: passos -->
<section class="gb-sec gb-como"><div class="gb-w gb-passos"><div class="gb-ph gb-arco" style="height:620px"><img src="fotos/r-criado.jpg" alt="Zeraya mask on a nightstand beside a candle and books" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:56% 50%"></div><div><h2>Three steps. One button.</h2><div class="gb-passo"><b>1</b><h3>Start with clean, dry skin</h3></div><div class="gb-passo"><b>2</b><h3>Pick a light, close your eyes</h3></div><div class="gb-passo"><b>3</b><h3>Relax for 10 to 15 minutes</h3></div></div></div></section>
<!-- secao: leds -->
<section class="gb-sec" style="padding-top:0"><div class="gb-w gb-macro"><div><h2>Full-face coverage</h2><p class="gb-lead">180 LED beads, from forehead to chin.</p></div><div class="gb-ph" style="aspect-ratio:5/4"><img src="fotos/r-leds.jpg" alt="LED beads inside the mask, close up" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%"></div></div></section>
<!-- secao: semfio -->
<section class="gb-sec gb-caixa"><div class="gb-w gb-macro inv"><div class="gb-ph gb-arco" style="aspect-ratio:1/1"><img src="fotos/r-cabo.jpg" alt="Mask charging by USB-C" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:40% 40%"></div><div><h2>No cord on your face</h2><p class="gb-lead">Charge by USB-C, then move around while you wear it.</p></div></div></section>
<!-- secao: ajuste -->
<section class="gb-sec"><div class="gb-w gb-macro"><div><h2>Slip it on. Adjust the strap.</h2></div><div class="gb-ph" style="aspect-ratio:7/5"><img src="fotos/r-faixa.jpg" alt="Hands adjusting the mask strap" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 40%"></div></div></section>
<!-- secao: retrato -->
<section class="gb-sec gb-ret"><div class="gb-w"><h2>Skincare, with the lights low.</h2><div class="gb-vago" data-acao="trocar" data-foto="retrato-produto" data-provisoria="true" style="overflow:hidden"><img src="fotos/r-sofa.jpg" alt="Woman relaxing at dusk wearing the Zeraya mask in purple light" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 18%"></div></div></section>
<!-- secao: caixa -->
<section class="gb-sec gb-caixa"><div class="gb-w gb-caixa-g"><div class="gb-ph"><img src="fotos/r-caixa.jpg" alt="Mask, strap, USB-C cable and manual laid out flat" loading="lazy" style="display:block;width:100%;aspect-ratio:7/6;object-fit:cover;object-position:50% 50%"></div><div><h2>In the box</h2><ul class="gb-lista"><li>LED face mask</li><li>Adjustable strap</li><li>USB-C cable</li><li>Manual</li></ul><div class="gb-cx-p">$59.99</div><a class="gb-btn" href="#comprar">Choose your set</a></div></div></section>
<!-- secao: comparacao -->
<section class="gb-sec gb-compara"><div class="gb-w"><h2>Plain facts, no theater.</h2><table class="gb-fatia"><thead><tr><th scope="col"><span style="position:absolute;left:-9999px">Topic</span></th><th scope="col">Many LED mask stores</th><th scope="col">Holdwellco</th></tr></thead><tbody><tr><th scope="row">Price</th><td>Inflated "was" price</td><td>One real price</td></tr><tr><th scope="row">Urgency</th><td>Countdown timers</td><td>None</td></tr><tr><th scope="row">Claims</th><td>Big promises</td><td>Plain specs</td></tr><tr><th scope="row">Returns</th><td>Hard to find</td><td>30 days after delivery</td></tr></tbody></table></div></section>
<!-- secao: guia -->
<section class="gb-sec gb-caixa"><div class="gb-w gb-guia"><div class="gb-capa">The Zeraya Glow Companion<small>Digital guide</small></div><div><h2>A $14.90 guide, included</h2><p class="gb-lead" style="margin-top:16px">Comes with the 2 and 3 mask sets.</p></div></div></section>
<!-- secao: oferta -->
<section class="gb-sec gb-oferta"><div class="gb-w"><h2>Pick your set.</h2><div><a class="gb-kit" href="produto.html#comprar"><h3>One mask</h3><small>Free US shipping</small><strong>$59.99</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a><a class="gb-kit" href="produto.html#comprar"><h3>Two masks</h3><small>$50.99 each, save $18.00, $14.90 guide included</small><strong>$101.98</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a><a class="gb-kit" href="produto.html#comprar"><h3>Three masks<span class="gb-tag">Lowest per mask</span></h3><small>$41.99 each, save $53.99, $14.90 guide included</small><strong>$125.98</strong><span class="gb-seta" aria-hidden="true">&#8594;</span></a></div></div></section>
<!-- secao: entrega -->
<section class="gb-sec gb-ent" style="padding-top:0"><div class="gb-w"><h2>From order to your door</h2><ol class="gb-tempo"><li><b>Today</b><span>You place your order</span></li><li><b>1 to 3 days</b><span>We ship it, business days</span></li><li><b>7 to 12 days</b><span>It arrives, business days</span></li><li><b>30 days</b><span>To return it after delivery</span></li></ol></div></section>
<!-- secao: cuidado -->
<section class="gb-sec" style="padding-top:0"><div class="gb-w"><div class="gb-seguro"><h3>Before you start</h3><p>Cosmetic device, not a medical device. Results vary. Keep your eyes closed during use. Do not use if you are pregnant, have epilepsy or a light-sensitive condition, or take medication that makes you sensitive to light. Check with your doctor if you are unsure.</p></div></div></section>
<!-- secao: avaliacoes -->
<section class="gb-rev" data-depende="avaliacoes-reais"><div class="gb-w"><h2>Reviews</h2><p>Reviews from verified orders will appear here.</p></div></section>
<!-- secao: perguntas -->
<section class="gb-sec gb-faq"><div class="gb-w gb-faq-g"><h2>Questions</h2><div><details><summary>How do I use it?</summary><p>On clean, dry skin, choose a light mode and relax with your eyes closed for 10 to 15 minutes.</p></details><details><summary>Who should not use it?</summary><p>Do not use if you are pregnant, have epilepsy or a light-sensitive condition, or take medication that makes you sensitive to light. Check with your doctor if you are unsure.</p></details><details><summary>Does it have a cord?</summary><p>No cord while you wear it. It recharges with the included USB-C cable.</p></details><details><summary>How long does delivery take?</summary><p>Orders ship in 1 to 3 business days and arrive in 7 to 12 business days in the US. Standard US shipping is free from $49.</p></details><details><summary>How do returns work?</summary><p>Request a return within 30 days after delivery at support@holdwellco.com. Return shipping is on you unless the item arrived damaged, defective or wrong.</p></details><details><summary>What is the digital guide?</summary><p>The Zeraya Glow Companion, a $14.90 digital guide included with the 2 and 3 mask sets.</p></details></div></div></section>
<!-- secao: linha -->
<section class="gb-sec gb-linha" style="padding-top:0"><div class="gb-w"><h2>More for your routine</h2><a class="gb-li" href="https://holdwellco.com/products/led-neck-face-massager">LED Neck &amp; Face Massager<span>$49.90</span></a><a class="gb-li" href="https://holdwellco.com/products/neck-shoulder-massager">Neck &amp; Shoulder Massager<span>$34.90</span></a><a class="gb-li" href="https://holdwellco.com/products/posture-corrector-core">Posture Corrector<span>$64.90</span></a></div></section>
<!-- secao: cadastro -->
<section class="gb-mail"><div class="gb-w"><h2>First to know</h2><div class="gb-mail-f"><div class="gb-mail-c"><label for="gb-email">Email address</label><input id="gb-email" type="email" autocomplete="email"></div><button class="gb-btn" type="button">Subscribe</button></div></div></section>
<!-- secao: rodape -->
<footer class="gb-rodape"><div class="gb-w"><div><div><div class="gb-marca">Holdwellco</div><p>Cosmetic device, not a medical device. Results vary.</p><p style="margin-top:8px">support@holdwellco.com</p></div><div><b>Shop</b><a href="produto.html">LED Mask</a><a href="https://holdwellco.com/collections/all">Shop All</a></div><div><b>Help</b><a href="https://holdwellco.com/policies/shipping-policy">Shipping</a><a href="https://holdwellco.com/policies/refund-policy">Returns</a><a href="https://holdwellco.com/policies/privacy-policy">Privacy</a><a href="https://holdwellco.com/policies/terms-of-service">Terms</a></div></div><div class="gb-legal">&copy; 2026 Holdwellco</div></div></footer>
<div class="gb-barra"><b data-t="total">$101.98</b><a class="gb-btn" href="#comprar">Add to cart</a></div></div><script>(function(){var P={1:59.99,2:101.98,3:125.98},T={1:'Free US shipping included',2:'You save $18.00, plus a $14.90 guide',3:'You save $53.99, plus a $14.90 guide'},q=2,a=false,$=function(s){return document.querySelectorAll(s)};function up(){var t='$'+(P[q]+(a?49.9:0)).toFixed(2);$('[data-t=total]').forEach(function(e){e.textContent=t});$('[data-t=conta]').forEach(function(e){e.textContent=T[q]});$('[data-q]').forEach(function(b){var o=+b.dataset.q===q;b.classList.toggle('on',o);b.setAttribute('aria-pressed',o)});$('[data-add]').forEach(function(b){b.classList.toggle('on',a);b.setAttribute('aria-checked',a)})}$('[data-q]').forEach(function(b){b.onclick=function(){q=+b.dataset.q;up()}});$('[data-add]').forEach(function(b){b.onclick=function(){a=!a;up()}});var m=document.querySelector('.gb-gal-main img');$('[data-g]').forEach(function(b){b.onclick=function(){m.src=b.querySelector('img').src;$('[data-g]').forEach(function(x){x.classList.toggle('on',x===b)})}});var c=document.querySelector('.gb-info .gb-btn'),s=document.querySelector('.gb-barra');if(c&&s){var f=document.querySelector('.gb-rodape'),v=function(){s.classList.toggle('on',c.getBoundingClientRect().bottom<0&&f.getBoundingClientRect().top>innerHeight)};addEventListener('scroll',v,{passive:true});v()}up()})();</script></body></html>
```

