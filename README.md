# CampoVivo - Landing Page

Landing page profissional para o CampoVivo, plataforma de agricultura inteligente.

## Estrutura do Projeto

```
campovivo-landing/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos CSS
├── js/
│   └── main.js         # JavaScript
├── images/
│   ├── favicon.svg     # Ícone do site
│   └── (adicionar imagens aqui)
└── README.md           # Este arquivo
```

## Como Usar

1. **Abrir localmente**: Basta abrir o arquivo `index.html` no navegador

2. **Servidor local**: Para desenvolvimento, use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js
   npx serve
   ```

3. **Deploy**: Faça upload dos arquivos para qualquer hospedagem estática (Vercel, Netlify, GitHub Pages, etc.)

## Personalização

### Cores
Edite as variáveis CSS no início do arquivo `css/style.css`:
```css
:root {
  --color-primary: #22C55E;
  --color-primary-dark: #16A34A;
  /* ... outras cores */
}
```

### Conteúdo
Edite diretamente o arquivo `index.html` para alterar textos, links e informações.

### Imagens
Adicione suas imagens na pasta `images/` e atualize os caminhos no HTML:
- `app-mockup-phone.png` - Screenshot do app mobile
- `app-mockup-tablet.png` - Screenshot do app tablet
- `app-screen-mobile.png` - Tela do app para seção mobile

## Seções da Página

1. **Header** - Navegação fixa com logo e links
2. **Hero** - Título principal, CTA e estatísticas
3. **Trust** - Logos de clientes/parceiros
4. **Features** - 6 recursos principais do app
5. **How It Works** - 3 passos para começar
6. **NDVI** - Destaque do monitoramento por satélite
7. **Mobile** - Seção do aplicativo móvel
8. **Pricing** - 3 planos de preços
9. **Testimonials** - Depoimentos de usuários
10. **CTA** - Chamada para ação final
11. **Contact** - Formulário de contato
12. **Footer** - Links e redes sociais

## Responsividade

A página é totalmente responsiva com breakpoints em:
- 1024px (tablets)
- 768px (tablets pequenos)
- 480px (smartphones)

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis e flexbox/grid
- JavaScript vanilla (sem dependências)
- Google Fonts (Inter)

## Licença

Todos os direitos reservados © 2024 CampoVivo
