# Mapa de pesquisa

Retrato coletado em 07/11/2026. https://shopify.dev/docs registra arquivos, fontes e falhas. Busque por termos e caminhos com `rg -n -i 'termo' https://shopify.dev/docs. Leia os resultados relevantes e verifique versão vigente no site oficial. A Central de Ajuda em inglês está em https://shopify.dev/docs, com manifest próprio. Referências locais não incluem automaticamente todas as versões históricas, idiomas ou páginas fora dos sitemaps coletados.

- Temas, editor, arquitetura, otimização, acessibilidade e CLI: https://shopify.dev/docs/storefronts/themes
- Referência completa de tags, filtros e objetos Liquid: https://shopify.dev/docs/api/liquid
- AJAX, carrinho e renderização de seções: https://shopify.dev/docs/api/ajax
- Aplicativos e extensões de temas: https://shopify.dev/docs/apps/build/online-store/theme-app-extensions
- API, versões e limites: https://shopify.dev/docs/api/usage/versioning
- Configuração e ajuda ao lojista: https://help.shopify.com/en/manual
- Políticas da loja: https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos
- Checkout: https://help.shopify.com/en/manual/checkout-settings
- Toolkit oficial: https://shopify.dev/docs/apps/build/ai-toolkit. Cópia local em https://shopify.dev/docs, com referências por superfície; scripts externos requerem leitura e dependências antes de executar.
- Dawn: código fixado em https://shopify.dev/docs; origem e versão em [dawn.md](dawn.md). Migração de outro tema, paridade e armadilhas medidas em [dawn-paridade.md](dawn-paridade.md).

As políticas reais devem refletir práticas reais da loja e legislação aplicável. Shopify distingue requisitos de recursos, disponibilidade por plano/região e configurações individuais. Confira no momento do trabalho.

## Pesquisa por necessidade

- Montagem da página: `architecture/layouts`, `templates`, `section-groups`, `sections`, `blocks`, `snippets`, `settings`, `config` e `locales`.
- Recursos de produto: objetos e filtros Liquid de produto, variantes, `form`, URLs e imagens; confira venda por plano, mercados, disponibilidade, propriedades de linha e regras de quantidade no caso concreto.
- Editor: schema, presets, blocos, eventos de ciclo de vida e testes de customização sem reload completo.
- API: `docs/api/usage`, a referência específica da API e a versão ativa. Em GraphQL inspecione escopos, esquema, paginação, erros e limites antes de enviar mutações.
- Operação: pesquise a Central de Ajuda por configuração real de conta, mercados, frete, tributos, pagamentos, checkout, privacidade e políticas, sem presumir habilitação por código de tema.
- Diagnóstico: encontre a evidência da loja e confirme a causa antes de corrigir. APIs de carrinho e renderização podem ter sucesso parcial; confira estado remoto antes de repetir operação.

Procedência e limites: [fontes.md](fontes.md).
