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

> Os dados exibidos atualmente são **mock** (simulados), prontos para integração futura com uma API de IA.

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

## Como testar o projeto

### 1. Instalar dependências

```bash
cd promosense
npm install
```

### 2. Executar em desenvolvimento

```bash
npm run dev
```

Acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

### 3. Build de produção

```bash
npm run build
npm run preview
```

O preview sobe uma versão otimizada (geralmente em `http://localhost:4173`).

### 4. Testar o PWA

1. Execute `npm run build` e `npm run preview`
2. Abra o site em **localhost** ou **HTTPS**
3. No Chrome/Edge: menu do navegador → **Instalar aplicativo** / **Instalar PromoSense**
4. No celular: **Adicionar à Tela de Início**

Para atualizar o ícone ou o cache após mudanças: use **Ctrl+Shift+R** ou desregistre o Service Worker em DevTools → **Application** → **Service Workers**.

### 5. Lint

```bash
npm run lint
```

### Roteiro de teste manual

1. **Início** — verifique o banner da proposta de pesquisa e os cards dos módulos
2. **Dashboard** — altere o filtro de período promocional e observe métricas e gráficos
3. **Avaliações** — filtre por campanha e confira sentimento geral e por aspecto em cada card
4. **Mobile** — redimensione a janela ou use DevTools; o menu hambúrguer aparece abaixo de 768px
5. **Navegação** — confirme que os links do header destacam a página ativa

---

## Estrutura de pastas

```
promosense/
├── public/                 # Arquivos estáticos (logo, favicon, ícones PWA)
│   ├── logo.png
│   └── favicon.ico
├── src/
│   ├── assets/             # Imagens usadas nos componentes (logo, etc.)
│   ├── components/         # Componentes reutilizáveis da UI
│   ├── config/             # Configurações (navegação, destaques da home)
│   ├── constants/          # Constantes de domínio (sentimentos, aspectos)
│   ├── data/               # Dados mock (avaliações, períodos promocionais)
│   ├── pages/              # Páginas da aplicação (uma pasta por rota)
│   ├── utils/              # Funções utilitárias (cálculos do dashboard)
│   ├── App.jsx             # Definição das rotas
│   ├── main.jsx            # Ponto de entrada React
│   └── global.css          # Estilos globais e import do Tailwind
├── index.html
├── vite.config.js          # Vite + Tailwind + PWA
└── package.json
```

---

## Principais páginas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `src/pages/home/index.jsx` | Página inicial com proposta do projeto e acesso aos módulos |
| `/dashboard` | `src/pages/dashboard/index.jsx` | Relatório consolidado: métricas, distribuição de sentimentos e análise por aspecto |
| `/avaliacoes` | `src/pages/reviews/index.jsx` | Lista de avaliações classificadas, com filtro por período promocional |

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
| `src/data/reviews.js` | Avaliações mock com sentimento geral e por aspecto |
| `src/data/promotionalPeriods.js` | Períodos promocionais disponíveis no filtro |
| `src/utils/analytics.js` | Funções para filtrar avaliações e montar o snapshot do dashboard |
| `src/constants/sentiment.js` | Labels e listas de sentimentos e aspectos |
| `src/config/navigation.js` | Itens do menu principal |
| `src/config/features.js` | Cards de funcionalidades exibidos na home |

---

## PWA

- **Manifest**: gerado em build (`manifest.webmanifest`)
- **Service Worker**: cache de assets e fallback SPA para rotas offline
- **Ícone**: `public/logo.png` (aba do navegador e instalação do app)
- **Atualização**: `registerType: 'autoUpdate'` — nova versão aplicada ao recarregar

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção na pasta `dist/` |
| `npm run preview` | Preview local do build |
| `npm run lint` | Verificação ESLint |

---

## Licença

Projeto acadêmico / de pesquisa. Uso conforme orientações da instituição responsável pelo trabalho.
