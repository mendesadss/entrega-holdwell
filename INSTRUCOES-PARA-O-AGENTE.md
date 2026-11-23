# Instruções para o agente (Claude Code ou Codex)

## Passo 0

1. Leia `CONTEXTO.md` inteiro.
2. Instale a skill: siga `skill-shopify-dev/COMO-INSTALAR.md`.
3. Confira se o Shopify CLI está instalado e peça ao dono o login na loja holdwellco.com.

## Execução

1. Liste os temas, usando o domínio `.myshopify.com` que aparece no Admin:

```bash
shopify theme list --store <loja>.myshopify.com
```

2. Peça ao dono para duplicar o tema publicado pelo Admin (Loja virtual, Temas, Duplicar), com o nome `Global Brand otimizado 2026-11-23`, e anote o id da cópia.
3. Baixe a cópia, junte `3-codigo-do-tema/` e valide:

```bash
shopify theme pull --theme <id da cópia>
```

```bash
shopify theme check
```

4. Grave só na cópia, arquivo por arquivo:

```bash
shopify theme push --theme <id da cópia> --only <arquivo> --nodelete
```

5. Siga `2-instrucoes-para-o-claude.md`, da primeira mudança até M9.
6. Entregue o link de prévia ao dono e pare.

## Regras

- Só altere a cópia. Nunca publique o tema.
- Peça o sim do dono antes de: M1, M3, M4, M5, M7, M9.
- Não mude preço, kit, promessa, política ou template do produto sem o sim do dono.
- Não invente avaliação, número, prazo ou garantia. Nunca importe avaliação de marketplace.
- Foto de outra loja serve só como direção e nunca vai para a loja.
