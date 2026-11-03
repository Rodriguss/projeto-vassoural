# DESIGN.md — Projeto Vassoural

## 1. Verdade do produto
- Ideia central: **"Aqui a gente aprende junto."** Ela junta o jiu-jítsu, o inglês e as outras atividades sem que uma delas defina o projeto inteiro.
- Quem chega tem duas perguntas: "Isso é para mim?" e "Como eu participo?". A primeira tela responde as duas.
- Públicos: famílias (turmas e apoio alimentar), quem chega pela primeira vez, doadores e comércios de Louveira. A maioria acessa pelo celular, vinda do Instagram.
- Regras: nenhum número sem fonte, nenhuma foto sem autorização (com a dos responsáveis no caso de crianças identificáveis) e nenhum bloco pendente no site público.

## 2. Leitura e intenção
Lendo isto como: o site de um projeto comunitário para famílias e apoiadores de Louveira, com linguagem de foto de ação, fitas de grau e marcas feitas à mão, em HTML, CSS e JS estáticos.

| Página | Intenção | Variação | Movimento | Densidade |
|---|---|---|---|---|
| Inicial | mostrar / convencer | média–alta | médio (uma assinatura) | baixa |
| Como participar | operar | baixa | baixo | média |
| Como apoiar | convencer / operar | média | baixo | média |
| Quem somos | ler | média | baixo | média |
| Resultados | ler | baixa | baixo | média–alta |

## 3. Direção e referências
- **Skateistan (referência principal):** a foto de ação grande abre a página e o esporte puxa a conversa sobre educação. Os títulos de seção parecem coladas na página, levemente tortos, e as histórias aparecem como blocos de foto com corpo colorido. Ficou de fora a janela de newsletter: a primeira visita não tem interrupção.
- **826 Valencia:** marcas feitas à mão, usadas uma vez cada (o sublinhado em "junto" e a seta para o botão), e espaço para a voz da turma na seção "História da turma".
- **Maui Food Bank:** caminhos claros para quem participa e para quem apoia.
- **JustGiving e charity: water:** compartilhamento pelo celular, resultado registrado depois do encerramento e prestação de contas fácil de achar.
- **Fontes dentro do texto**, como numa reportagem ("segundo a Prefeitura de Louveira"). Não há linhas soltas de "Fonte:" nem fichas rotuladas.
- **Proibido:** carrossel, vídeo automático, pop-up, degradê decorativo, contador animado, ícones e emoji.

```design-tokens
fonts: Bricolage Grotesque, Source Sans 3, Montserrat (só no logo)
colors: #fff7e8, #f5e9d0, #252522, #57544c, #164a43, #0e352f, #dce7df, #c99a41
radii: 0, 3px, 6px
```

## 4. Cor (uma função para cada cor)
| Token | Hex | Função |
|---|---|---|
| `--papel` | #FFF7E8 | fundo; dá calor e espaço às fotos |
| `--carvao` | #252522 | texto; o único texto possível sobre dourado |
| `--petroleo` | #164A43 | botões principais e a seção Como apoiar (papel sobre petróleo: 9,4:1) |
| `--nevoa` | #DCE7DF | separa as seções Como participar e Linha do tempo |
| `--dourado` | #C99A41 | do símbolo do logo: fitas, sublinhado, recorte, graus da faixa. Papel sobre dourado dá 2,4:1, então nunca leva texto claro |

## 5. Tipografia
- Bricolage Grotesque, peso 700 a 800, nos títulos, em caixa alta e baixa, para soar como conversa.
- Source Sans 3 no texto, nos horários, nos menus e nos botões. O corpo é de 18px, numa escala de 1.25.

## 6. Assinatura de movimento
O recorte dourado, tirado da diagonal do símbolo, passa uma vez pela foto de abertura e assenta na borda esquerda (950ms, ease-out). Foto, título e botão aparecem de imediato. Fora isso, só há transições de 150ms nos botões, e tudo fica parado com `prefers-reduced-motion`.

## 7. Componentes
- `.fita`: o título de seção sobre dourado, girado de −1,5° a 1°.
- `.historia`: o bloco de história, com foto em cima e corpo em papel, névoa ou carvão.
- `.campanha`: a campanha contada em frases, com data, status, o que precisa, como ajudar e o resultado.
- `.faixa-tempo`: a faixa com os graus dourados.
- Raio de 6px nos botões, nos blocos de história e nas fotos.

## 8. Logo
`img/logo.svg` e o SVG do topo são **provisórios**, redesenhados a partir de um print. É preciso trocar pelo arquivo vetorial original.
