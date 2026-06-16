# PromoSense

**Analisador de Sentimento aplicado ao e-commerce**, desenvolvido como proposta de solução de Inteligência Artificial para investigar como a recorrência mensal de eventos de descontos agressivos influencia a **percepção do consumidor**, a **credibilidade das ofertas** e o **comportamento de compra** no ambiente digital.

Interface web responsiva (mobile-first), construída com React e preparada para funcionar como **PWA** (Progressive Web App).

---

## Funcionalidades

O sistema atende aos seguintes requisitos funcionais:

| ID | Funcionalidade |
|----|----------------|
| **RF01** | Classificar o sentimento de avaliações em **positivo**, **negativo** ou **neutro** |
| **RF02** | Filtrar avaliações por **período promocional** (Black Friday, Double Dates, Dia do Consumidor, etc.) |
| **RF03** | Gerar **dashboard** com indicadores e distribuição dos resultados da análise |
| **RF04** | Analisar sentimento por **aspectos**: preço, entrega e qualidade, além do sentimento geral |

---

## Tecnologias

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [React Router DOM](https://reactrouter.com/) — navegação entre páginas
- [Tailwind CSS 4](https://tailwindcss.com/) — estilização utilitária
- [React Icons](https://react-icons.github.io/react-icons/) — ícones da interface
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — suporte a PWA e cache offline

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (incluído com o Node.js)

---

## Como rodar o projeto

```bash
cd promosense
npm install
npm run dev          # desenvolvimento → http://localhost:5173
npm run build        # produção
npm run preview      # preview do build → http://localhost:4173
npm run lint         # ESLint
```

A aplicação consome a API de análise de sentimento. Por padrão, usa `https://backend-promosense.onrender.com`. Para apontar para outro backend, copie `.env.example` para `.env` e ajuste `VITE_API_URL`.

---

## Testes

Dois tipos se complementam: **automatizados** (rápidos, repetíveis) e **manuais** (layout real, mobile, PWA).

| Tipo | Ferramenta | Quando usar |
|------|------------|-------------|
| Automatizado | Vitest + Testing Library | A cada alteração de código; antes de entregar |
| Manual | Navegador + DevTools | Validar visual, responsivo e instalação PWA |

### Testes automatizados

Na pasta `promosense/`:

```bash
npm test              # roda uma vez
npm run test:watch    # reexecuta ao salvar
```

**Três níveis** — do menor ao maior escopo:

| Nível | Testa | Arquivos |
|-------|--------|----------|
| **Unitário (UT)** | Função ou componente isolado | `src/utils/analytics.test.js`, `SentimentBadge.test.jsx`, `PromoPeriodFilter.test.jsx` |
| **Integração (IT)** | Página inteira com carregamento de dados da API | `src/pages/*/index.test.jsx` |
| **Sistema (ST)** | App com rotas e navegação | `src/App.system.test.jsx` |

**Cenários cobertos pelo `npm test`**

| ID | O que valida |
|----|----------------|
| UT-01 | Filtro por período (`all` e campanha específica) |
| UT-02 | Filtro por sentimento |
| UT-03 | Contagem por sentimento |
| UT-04 | Percentuais com lista vazia → 0% |
| UT-05 | Cálculo de percentuais (50% / 25% / 25%) |
| UT-06 | Resumo de aspectos (ex.: preço negativo) |
| UT-07 | Snapshot do dashboard por período |
| UT-08 | Badge de sentimento (rótulo e cor) |
| UT-09 | Badge no modo compacto |
| UT-10 | Filtro promocional: botão ativo e `onChange` |
| IT-01 | Dashboard: Black Friday atualiza métricas |
| IT-02 | Dashboard: troca de período e volta para “todos” |
| IT-03 | Dashboard: percentuais somam ~100% |
| IT-04 | Avaliações: filtro Dia do Consumidor |
| IT-05 | Avaliações: só negativas |
| IT-06 | Avaliações: período + sentimento juntos |
| IT-07 | Avaliações: lista vazia com mensagem |
| IT-08 | Avaliações: card com autor, texto e sentimentos (Cliente Shopee #8411) |
| IT-10 | Home: links dos módulos |
| ST-01 | Fluxo Início → Dashboard → Avaliações com filtros |
| ST-02 | Home: banner e módulos |
| ST-03 | Header: link ativo destacado |
| ST-09 | Filtros com rótulos acessíveis (ARIA) |

> **ST-04 a ST-08** não rodam no terminal — use o roteiro manual abaixo.

### Testes manuais

**Preparação:** `npm run dev` (ou `build` + `preview` para PWA).

Marque ✅ quando o resultado for o esperado.

| ID | Passo | Resultado esperado |
|----|--------|-------------------|
| **ST-04** | Abra `/` | Banner da pesquisa e cards “Dashboard” / “Avaliações” visíveis |
| **ST-04** | Vá em `/dashboard`, clique em períodos diferentes | KPIs, barras e cards de aspecto mudam |
| **ST-04** | Vá em `/avaliacoes`, combine período e sentimento | Contador “Exibindo X de Y” e cards coerentes com o filtro |
| **ST-05** | Reduza a janela (menos de 768px) ou DevTools em modo mobile | Menu hambúrguer; links abrem a página correta |
| **ST-06** | Clique Início → Dashboard → Avaliações no header | Página correta; item ativo com fundo claro |
| **ST-07** | `build` + `preview` → instalar app (Chrome: “Instalar PromoSense”) | App abre em janela própria; ícone na área de trabalho |
| **ST-08** | Com app instalado, desligue a rede e navegue entre rotas | Páginas principais ainda abrem (cache PWA) |

**PWA — dica:** após mudar ícone ou cache, use **Ctrl+Shift+R** ou limpe o Service Worker em DevTools → **Application**.

---

## Estrutura de pastas

```
frontend react/
├── README.md
└── promosense/             # Aplicação React
    ├── public/             # Arquivos estáticos (logo, favicon, ícones PWA)
    │   ├── logo.png
    │   └── favicon.ico
    ├── src/
    │   ├── assets/         # Imagens usadas nos componentes (logo, etc.)
    │   ├── api/            # Cliente HTTP e mapeamento da API
    │   ├── components/     # Componentes reutilizáveis da UI
    │   ├── config/         # Configurações (navegação, destaques da home)
    │   ├── constants/      # Constantes de domínio (sentimentos, aspectos)
    │   ├── data/           # Dados estáticos de fallback (períodos promocionais)
    │   ├── hooks/          # Carregamento de dados (dashboard, avaliações, períodos)
    │   ├── pages/          # Páginas da aplicação (uma pasta por rota)
    │   ├── utils/          # Funções utilitárias (cálculos do dashboard)
    │   ├── App.jsx         # Definição das rotas
    │   ├── main.jsx        # Ponto de entrada React
    │   └── global.css      # Estilos globais e import do Tailwind
    ├── index.html
    ├── vite.config.js      # Vite + Tailwind + PWA
    └── package.json
```

---

## Principais páginas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `promosense/src/pages/home/index.jsx` | Página inicial com proposta do projeto e acesso aos módulos |
| `/dashboard` | `promosense/src/pages/dashboard/index.jsx` | Relatório consolidado: métricas, distribuição de sentimentos e análise por aspecto |
| `/avaliacoes` | `promosense/src/pages/reviews/index.jsx` | Lista de avaliações classificadas, com filtro por período promocional |

Todas as páginas são renderizadas dentro do `AppLayout`, que inclui o cabeçalho fixo em todas as rotas.

---

## Principais componentes

### Layout e navegação

| Componente | Utilização |
|------------|------------|
| **AppLayout** | Envolve todas as páginas; exibe o `SiteHeader` e o conteúdo da rota atual via `<Outlet />` |
| **SiteHeader** | Cabeçalho fixo com logo (link para início), menu desktop e menu hambúrguer no mobile |
| **PrimaryNav** | Lista de links de navegação; aceita `variant="mobile"` para layout em coluna |
| **NavAction** | Item individual do menu; usa `NavLink` do React Router com estado ativo visual |
| **PageShell** | Wrapper padrão das páginas: título, subtítulo e área de conteúdo com largura máxima responsiva |

### Home

| Componente | Utilização |
|------------|------------|
| **ResearchBanner** | Banner escuro com a proposta de pesquisa e os três eixos: percepção, credibilidade e comportamento |
| **FeatureSpotlight** | Card de módulo com ícone, título, descrição e link “Acessar módulo” |

### Dashboard e análise

| Componente | Utilização |
|------------|------------|
| **PromoPeriodFilter** | Botões para filtrar dados por período promocional (RF02); scroll horizontal no mobile |
| **MetricHighlight** | Card de KPI (total de avaliações, % positivo, neutro, negativo) |
| **SentimentDistribution** | Barras de progresso com a distribuição percentual de cada sentimento (RF01 / RF03) |
| **AspectInsightCard** | Resumo do sentimento dominante e percentuais por aspecto (preço, entrega, qualidade) no dashboard (RF04) |

### Avaliações

| Componente | Utilização |
|------------|------------|
| **ReviewInsightCard** | Card de uma avaliação: autor, período, data, texto, sentimento geral e aspectos |
| **SentimentBadge** | Etiqueta visual (positivo / neutro / negativo) com ícone e cor |
| **AspectTagRow** | Linha de tags com sentimento por aspecto dentro de cada avaliação |

### Dados e utilitários

| Arquivo | Utilização |
|---------|------------|
| `promosense/src/api/promosenseApi.js` | Chamadas à API (dashboard, avaliações, períodos promocionais) |
| `promosense/src/api/mappers.js` | Conversão dos payloads da API para o formato da interface |
| `promosense/src/hooks/useDashboard.js` | Carrega o snapshot do dashboard conforme o período selecionado |
| `promosense/src/hooks/useReviews.js` | Carrega avaliações paginadas com filtros de período e sentimento |
| `promosense/src/hooks/usePromotionalPeriods.js` | Carrega períodos promocionais da API (com fallback local) |
| `promosense/src/data/promotionalPeriods.js` | Períodos promocionais usados como fallback quando a API falha |
| `promosense/src/utils/analytics.js` | Funções para filtrar avaliações e montar o snapshot do dashboard |
| `promosense/src/constants/sentiment.js` | Labels e listas de sentimentos e aspectos |
| `promosense/src/config/navigation.js` | Itens do menu principal |
| `promosense/src/config/features.js` | Cards de funcionalidades exibidos na home |

---

## PWA

- **Manifest**: gerado em build (`manifest.webmanifest`)
- **Service Worker**: cache de assets e fallback SPA para rotas offline
- **Ícone**: `promosense/public/logo.png` (aba do navegador e instalação do app)
- **Atualização**: `registerType: 'autoUpdate'` — nova versão aplicada ao recarregar

---

## Scripts disponíveis

Execute os comandos dentro da pasta `promosense/`:

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção na pasta `dist/` |
| `npm run preview` | Preview local do build |
| `npm run lint` | Verificação ESLint |
| `npm test` | Testes automatizados (Vitest) |
| `npm run test:watch` | Testes em modo observação |

---

## Licença

Projeto acadêmico / de pesquisa. Uso conforme orientações da instituição responsável pelo trabalho.
