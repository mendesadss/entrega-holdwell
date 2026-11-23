# Holdwellco: tudo para resolver a loja

Análise de 23/11/2026. Nota de hoje: 6.2 de 10. A oferta é honesta e o preço é forte, mas as avaliações e a promessa de rugas colocam a loja em risco.

## Comece aqui

1. Baixe e descompacte esta pasta.
2. Abra o Claude Code ou o Codex nela e cole: `Leia o arquivo INSTRUCOES-PARA-O-AGENTE.md e execute`.
3. Responda quando ele pedir seu sim e confira o link de prévia. Quem publica é você.

Antes, tenha o acesso de administrador da loja e o Claude Code ou o Codex instalado.

## O que tem nesta pasta

- `INSTRUCOES-PARA-O-AGENTE.md` e `CONTEXTO.md`: o que o agente lê primeiro.
- `skill-shopify-dev/`, `relatorio/` e `dados/`: apoio do agente.
- `1-relatorio.pdf`: o que está bom, os consertos em ordem e o porquê.
- `2-instrucoes-para-o-claude.md`: o texto que você cola no Claude Code. Já tem o código da loja nova dentro.
- `3-codigo-do-tema/`: os mesmos arquivos de código, soltos, caso o Claude peça.
- `4-fotos-novas/`: 5 fotos novas, cada uma com a referência, a foto real para anexar e o prompt.
- `5-loja-nova/`: como a loja vai ficar. Abra os dois arquivos no navegador.

## Ordem para resolver

### 1. Os consertos que travam a venda

1. **Tire as avaliações que vieram de outro site.** Abra o app de avaliações, confira a origem e apague todas que não vieram de clientes seus.
2. **Tire a promessa de reduzir rugas.** Troque a faixa por fatos: 7 modos de luz, 180 LEDs, sem fio, 10 minutos.
3. **Troque os nomes que falam de tratamento.** Renomeie para Wind Down, Self-Care, Posture & Back Essentials e Comfort Kit. No Admin: Produtos, Coleções; menu em Loja virtual, Navegação.
4. **Troque a primeira foto da máscara.** Coloque primeiro uma foto limpa da máscara e, em seguida, a máscara em uso.
5. **Mostre o preço real da oferta extra.** Mostre o preço com desconto, $39.92, ao lado do preço normal, se o desconto for real.

### 2. As fotos novas

Siga o `4-fotos-novas/prompts.md`, uma foto por vez. Até ficarem prontas, a loja usa as fotos de hoje.

### 3. Prepare o acesso do Claude (só na primeira vez)

1. Instale o app do Claude no computador, entre na sua conta e abra a aba **Code**.
2. Crie uma pasta na Mesa chamada **minha-loja** e abra essa pasta no Claude Code. Copie para dentro dela esta pasta inteira.
3. No Admin da Shopify: **Configurações**, **Domínios**. Anote o endereço que termina em **.myshopify.com**.
4. **Configurações**, **Apps**, **Desenvolver apps**. Se aparecer **Permitir desenvolvimento de apps**, clique e confirme.
5. Crie um app chamado **Claude** e marque as permissões: read_themes, write_themes, read_products, write_products, read_files, write_files, read_discounts, write_discounts, read_online_store_navigation, write_online_store_navigation, read_content, write_content (e, se aparecerem, write_legal_policies, write_locales, write_markets). Instale o app e copie o token (começa com shpat_). Se a Shopify te levar ao Dev Dashboard, copie o ID do cliente e a Chave secreta.
6. No Claude Code, escreva: **crie um arquivo .env com SHOPIFY_STORE=, SHOPIFY_ADMIN_TOKEN=, SHOPIFY_CLIENT_ID= e SHOPIFY_CLIENT_SECRET= e abra para mim**. Cole os dados depois do sinal de igual e salve. Não mande isso para ninguém.

### 4. Mande o Claude montar a loja nova

1. No Claude Code, escreva: **leia o arquivo 2-instrucoes-para-o-claude.md e siga do começo ao fim**.
2. Ele trabalha numa cópia do tema, escondida. A loja no ar não muda.
3. Ele vai pedir o seu sim antes de mexer em preço, kit, foto, política ou qualquer coisa que muda a loja no ar (6 pontos). Leia e responda.
4. Quando ele pedir as fotos novas, cole a lista: Foto 1: endereço, Foto 2: endereço...
5. No fim ele manda um **link de prévia**.

### 5. Confira antes de publicar

- Abri o link de prévia no celular e no computador.
- No celular, o botão de comprar aparece sem rolar.
- Os preços e o kit estão certos.
- Pus um produto no carrinho e ele apareceu lá.
- Não sobrou nenhum texto entre [colchetes] na página.

### 6. Publique

No Admin: **Loja virtual**, **Temas**, na cópia **Global Brand otimizado 2026-11-23**, clique em **Publicar**. Não gostou? Publique de novo o tema antigo, que continua lá do jeito que estava.

## Antes de começar, tenha a resposta destas perguntas

- De onde vieram as 335 avaliações que estão no app hoje?
- O desconto de 20% no massageador é aplicado de verdade no carrinho?
- Você tem algum documento do fornecedor sobre os 180 LEDs e a segurança da máscara?
