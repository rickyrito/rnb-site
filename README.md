# RNB - Site

Site institucional da RNB, migrado de HTML/JavaScript vanilla para React com Vite.

## Desenvolvimento

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
npm run dev
```

O servidor local ficará disponível no endereço indicado pelo Vite, normalmente `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

- `src/main.jsx`: componentes React, dados da página e estado do menu mobile.
- `src/i18n.jsx`: traduções (PT/EN/FR), contexto de idioma (`LocaleProvider`/`useLocale`) e persistência em `localStorage`.
- `src/SearchOverlay.jsx`: modal de pesquisa do site, com índice construído a partir do conteúdo traduzido.
- `index.html`: shell HTML, metadados SEO e ponto de montagem React.
- `assets/css/style.css`: estilos existentes do site, reutilizados pela aplicação.
- `assets/img/`: logos, fotografias, galeria e parceiros.
- `vite.config.js`: configuração do bundler Vite.

O menu mobile, o seletor de idioma, a pesquisa e o ano do rodapé são controlados pelo React. Os assets continuam em `assets/` para preservar os caminhos e o conteúdo já existente.

### Idiomas

O site suporta Português, Inglês e Francês. Para adicionar ou editar textos, atualiza as três entradas correspondentes em `src/i18n.jsx` (`pt`, `en`, `fr`) — as chaves têm de existir nos três idiomas.