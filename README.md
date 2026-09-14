# RNB - Site Replica (Desenvolvimento Local)

Este é um mirror local do site rnb.pt para desenvolvimento e manutenção.

## Estrutura do Projeto

```
rnb-site/
├── index.html              # Página principal com todas as seções
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos CSS modernos (já incluído)
│   ├── js/
│   │   └── script.js       # JavaScript interativo (já incluído)
│   └── img/
│       ├── logo.svg        # Logo padrão (PRECISA SER ADICIONADO)
│       ├── logo-white.svg  # Logo branco (PRECISA SER ADICIONADO)
│       ├── favicon.svg     # Favicon (PRECISA SER ADICIONADO)
│       ├── hero-antena.jpg
│       ├── hero-tecnico.jpg
│       ├── hero-manutencao.jpg
│       ├── partners/       # Logos dos parceiros
│       │   ├── meo.png
│       │   ├── nos.png
│       │   ├── vodafone.png
│       │   └── tntsat.png
│       └── gallery/        # Galeria de imagens (6 imagens)
│           ├── galeria-1.jpg
│           ├── galeria-2.jpg
│           ├── galeria-3.jpg
│           ├── galeria-4.jpg
│           ├── galeria-5.jpg
│           └── galeria-6.jpg
```

## O Que Fazer Agora

### 1. **Adicionar Imagens**
- Adicione todos os arquivos de imagem nas pastas correspondentes
- Certifique-se que as imagens têm os nomes corretos conforme referenciado no HTML

### 2. **Testar Localmente**
```bash
# Opção 1: Usar Python
python -m http.server 8000

# Opção 2: Usar Node.js (http-server)
npx http-server

# Opção 3: Usar VS Code Live Server (extensão)
```
Depois acesse: `http://localhost:8000`

### 3. **Sections do Site**

**Início (Hero)**
- Título e subtítulo
- CTA "Contacte-nos"
- 3 cards com imagens dos serviços

**Empresa**
- Título "Uma Equipa de Confiança"
- Descrição da empresa

**Serviços**
- 4 cards com ícones SVG:
  - Instalação de Antenas
  - Vigilância por Vídeo
  - Reparação de Electrodomésticos
  - Assistência Técnica

**Portfolio**
- 4 logos de parceiros (MEO, NOS, Vodafone, TNT Sat)

**Galeria**
- Grid responsivo com 6 imagens

**Contactos**
- Informações de contacto
- Mapa do Google Maps (já configurado)
- Link para Facebook

### 4. **Informações de Contacto**
- **Morada:** Rua da Salgueirinha, 5A, 2435-689 Pederneira, Ourém, Portugal
- **Telefone:** 249 570 010
- **Telemóvel:** 937 335 067
- **Email:** geral@rnb.pt
- **Facebook:** https://www.facebook.com/rnb.pt

### 5. **Cores & Design**
- **Cor Primária:** #1e40af (Azul)
- **Cor Secundária:** #0f766e (Verde-azulado)
- **Cor de Acento:** #ea580c (Laranja)
- **Fonte:** Poppins (já importada via Google Fonts)

## Funcionalidades Implementadas

✅ Menu responsivo (mobile-friendly)
✅ Navegação suave entre seções
✅ Layout responsivo (desktop, tablet, mobile)
✅ Cards com hover effects
✅ Botão "Ligue Agora" no header
✅ Footer com ano dinâmico
✅ Integração com Google Maps
✅ Links para redes sociais

## Próximos Passos

1. Adicione todas as imagens necessárias
2. Teste o site localmente
3. Verifique os links de contacto (telefone, email)
4. Ajuste cores se necessário
5. Otimize imagens para web
6. Implemente funcionalidades adicionais conforme necessário

## Notas

- O HTML usa semântica correta
- O CSS é moderno com CSS Grid e Flexbox
- O JavaScript é vanilla (sem dependências)
- Suporta todos os navegadores modernos
- SEO-friendly com meta tags apropriadas

---

Desenvolvido como base de trabalho para o site RNB.pt
