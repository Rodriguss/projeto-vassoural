# Como atualizar o site do Projeto Vassoural

Quase tudo o que muda com frequência fica num arquivo só: **`js/dados.js`**. Abra esse arquivo num editor de texto (Bloco de Notas ou VS Code), troque o texto entre aspas e salve.

## Ver a prévia e a versão pública

- **Versão pública:** abra `index.html`. Os blocos que dependem de validação ficam escondidos.
- **Prévia da equipe:** abra `index.html?previa=1`. Os blocos pendentes aparecem com contorno tracejado e uma etiqueta que diz o que falta. A lista completa está em `pendencias.html?previa=1`.
- Para sair da prévia, use o link "Ver como o público vê" na faixa amarela do topo.

## Tarefas comuns

### Dias, horários e endereço das turmas
Em `turmas`, preencha cada campo como se estivesse falando com um responsável. Depois mude `confirmado` para `true`:
```js
paraQuem: "Crianças de 8 a 14 anos",
quando: "segundas e sextas, das 19h15 às 20h",
onde: "no Centro Comunitário do Vassoural (Rua ..., nº ...)",
comoEntrar: "É só aparecer com um responsável no primeiro treino.",
confirmado: true
```
O site junta tudo numa frase, na página inicial e em Como participar.

### Trocar o logo
Salve o arquivo original como `img/logo.svg`. Em cada página, troque o `<svg>...</svg>` que está dentro de `<a class="marca">` por `<img src="img/logo.svg" alt="Projeto Vassoural" height="42">`.

### Colar o link de uma fonte
Em `fontes`, preencha `url` com o link da matéria, do post ou do documento:
```js
"truco-2026": { rotulo: "Truco Solidário", url: "https://www.instagram.com/p/XXXX/" },
```
Nas páginas, a fonte fica dentro da frase (por exemplo, "segundo a Prefeitura de Louveira"). Sem link, o texto aparece sem link.

### Abrir ou encerrar uma campanha
Em `campanhas`, copie um bloco existente e ajuste os campos. Quando a campanha terminar:
1. mude `status` para `"encerrada"`;
2. preencha `fim` e `resultado` (por exemplo, `"320 kg de alimentos e 85 brinquedos."`);
3. acrescente uma linha em `contas`.

### Registrar na prestação de contas
Em `contas`, uma linha por atualização. Mantenha separado o que foi **arrecadado** e o que foi **entregue**. Deixe `entregue: ""` enquanto a entrega não tiver registro.

### Pontos de coleta (Caixas Mágicas)
Em `pontosDeEntrega`, um item por comércio. Só aparece no site público com `confirmado: true`.

### Ativar o Pix
Só depois de confirmar o canal e o titular:
1. salve a imagem do QR Code em `img/pix-qr.png`;
2. em `pix`, preencha `recebedor`, `chave`, `copiaECola` (o código "Pix copia e cola") e `qrImagem: "img/pix-qr.png"`;
3. mude `ativo` para `true`.

O botão "Falar com o projeto sobre doações" sai sozinho, e entram o QR Code e o botão "Copiar código Pix".

### Equipe e novidades
Em `equipe`, preencha `nome` e `funcao` e mude `confirmado` para `true`. Em `novidades`, cole o link do post em `url`. Sem link, o item não aparece no site público.

## Trocar um espaço reservado por uma foto

Nos arquivos `.html`, procure o bloco da foto, por exemplo:
```html
<figure class="foto">
  <div class="foto-vaga" ... data-pendente="...">[Foto: ...]</div>
  <figcaption>[Legenda ...]</figcaption>
</figure>
```
1. Salve a foto em `img/`, com até 1600 px de largura em formato `.jpg` ou `.webp`. Deixe cada arquivo com menos de 300 KB.
2. Troque a linha `<div class="foto-vaga ...">...</div>` por:
   ```html
   <img src="img/treino-vassoural.jpg" alt="Crianças de quimono treinando no tatame do Vassoural" width="1600" height="700" loading="lazy">
   ```
   Na foto de abertura, tire o `loading="lazy"`. A foto de abertura ocupa o bloco verde ao lado do título: use uma foto horizontal ampla.
3. Escreva a legenda real no `<figcaption>`.
4. O `data-pendente` ficava na linha que você trocou, então a foto já aparece no site público.

**Antes de publicar uma foto:** confirme a autorização e, se houver crianças identificáveis, a autorização dos responsáveis.

## Liberar um texto pendente
Escreva o texto confirmado no lugar do que está entre colchetes `[...]` e apague o `data-pendente="..."` do elemento.

## Publicar
O site é estático: basta enviar a pasta inteira para qualquer hospedagem de arquivos, como GitHub Pages, Netlify ou a hospedagem da escola ou da prefeitura.
