/*
  DADOS DO SITE DO PROJETO VASSOURAL
  ----------------------------------
  Este é o arquivo que a equipe edita para atualizar o site.
  Guia passo a passo: COMO-ATUALIZAR.md

  Regras gerais:
  - Texto entre aspas. Não apague vírgulas entre os itens.
  - "confirmado: false" esconde o item da versão pública (ele aparece só na prévia).
  - Datas no formato "AAAA-MM" ou "AAAA-MM-DD".
*/

window.VASSOURAL = {

  contato: {
    instagram: "@projetovassoural",
    instagramUrl: "https://www.instagram.com/projetovassoural/",
    // Abre a conversa direto no Instagram (no celular, abre o app)
    mensagemUrl: "https://ig.me/m/projetovassoural"
  },

  /* TURMAS
     Escreva como você diria a um responsável, numa frase.
     Com confirmado: false, o site público mostra só "Gratuito" e manda falar pelo Instagram. */
  turmas: [
    {
      id: "jiu-jitsu",
      nome: "Jiu-jítsu",
      paraQuem: "",        // ex.: "Crianças de 8 a 14 anos"
      quando: "",          // ex.: "segundas e sextas, das 19h15 às 20h"
      onde: "",            // ex.: "no Centro Comunitário do Vassoural, Rua ..., nº ..."
      custo: "Gratuito",
      comoEntrar: "",      // ex.: "É só aparecer com um responsável no primeiro treino."
      confirmado: false
    },
    {
      id: "ingles",
      nome: "Inglês",
      paraQuem: "",
      quando: "",
      onde: "",
      custo: "Gratuito",
      comoEntrar: "",
      confirmado: false
    }
  ],

  /* FONTES
     Cada história e cada número do site aponta para uma fonte.
     Cole o link em "url". Sem link, o site mostra só o nome da fonte, sem link,
     e a prévia marca "link da fonte pendente". */
  fontes: {
    "prefeitura-clovis-2017": {
      rotulo: "Prefeitura de Louveira, 24/05/2017",
      url: "https://louveira.sp.gov.br/conteudo/professor-e-atleta-de-jiu-jitsu-visita-gabinete"
    },
    "camara-clovis":        { rotulo: "Perfil na Câmara Municipal", url: "" },
    "prefeitura-2018":      { rotulo: "Prefeitura de Louveira", url: "" },
    "medalha-2019":         { rotulo: "Registro da homenagem", url: "" },
    "copa-keisei-2025":     { rotulo: "Copa Keisei", url: "" },
    "graduacao-nov-2025":   { rotulo: "Graduação de novembro", url: "" },
    "truco-2026":           { rotulo: "Truco Solidário", url: "" },
    "mocao-10-anos":        { rotulo: "Moção pelos 10 anos", url: "" },
    "garra-relato":         { rotulo: "Relato da Garra BJJ", url: "" },
    "acao-outubro-2026":    { rotulo: "Ação de outubro", url: "" },
    "dia-criancas-2026":    { rotulo: "Dia das Crianças", url: "" },
    "natal-2026":           { rotulo: "Anúncio do Natal Solidário", url: "" }
  },

  /* CAMPANHAS
     status: "em-andamento" ou "encerrada".
     Depois do encerramento, preencha "resultado" e mude o status. */
  campanhas: [
    {
      id: "natal-2026",
      titulo: "Natal Solidário 2026",
      status: "em-andamento",
      inicio: "2026-10",
      fim: "",                       // data de encerramento: a confirmar
      necessidade: "Caixas Mágicas Solidárias em comércios de Louveira recebem alimentos e brinquedos para o Natal.",
      comoColaborar: "Deixe a sua doação numa das caixas.",
      comoColaborarPublico: "Pergunte ao projeto qual comércio perto de você tem uma caixa.",
      resultado: "",
      fonte: "natal-2026"
    },
    {
      id: "truco-2026",
      titulo: "1º Truco Solidário",
      status: "encerrada",
      inicio: "2026-08",
      fim: "2026-08",
      necessidade: "Cestas básicas para famílias de Louveira.",
      comoColaborar: "Torneio de truco com arrecadação para cestas básicas.",
      resultado: "Mais de 100 cestas básicas arrecadadas, segundo o projeto.",
      fonte: "truco-2026"
    },
    {
      id: "graduacao-2025",
      titulo: "Graduação conjunta de novembro de 2025",
      status: "encerrada",
      inicio: "2025-11",
      fim: "2025-11",
      necessidade: "Alimentos para a ação de Natal do projeto.",
      comoColaborar: "Arrecadação durante a graduação, que reuniu mais de 600 atletas.",
      resultado: "Mais de uma tonelada de alimentos arrecadada nesse evento.",
      fonte: "graduacao-nov-2025"
    },
    {
      id: "copa-keisei-2025",
      titulo: "Copa Keisei de junho de 2025",
      status: "encerrada",
      inicio: "2025-06",
      fim: "2025-06",
      necessidade: "Alimentos para cestas destinadas a famílias da cidade, incluindo famílias atendidas pelo Vassoural.",
      comoColaborar: "Arrecadação durante o campeonato.",
      resultado: "Quase três toneladas de alimentos arrecadadas nesse evento.",
      fonte: "copa-keisei-2025"
    }
  ],

  /* PRESTAÇÃO DE CONTAS
     Uma linha por atualização. Separe o que foi arrecadado do que foi entregue.
     Deixe "entregue" vazio enquanto a entrega não tiver registro.
     Só relacione valores em reais a quimonos, materiais ou cestas com custo confirmado. */
  contas: [
    {
      data: "2026-08",
      campanha: "1º Truco Solidário",
      arrecadado: "Mais de 100 cestas básicas (segundo o projeto)",
      entregue: "",
      fonte: "truco-2026"
    },
    {
      data: "2025-11",
      campanha: "Graduação conjunta de novembro",
      arrecadado: "Mais de 1 tonelada de alimentos, para a ação de Natal do projeto",
      entregue: "",
      fonte: "graduacao-nov-2025"
    },
    {
      data: "2025-06",
      campanha: "Copa Keisei",
      arrecadado: "Quase 3 toneladas de alimentos, para cestas a famílias da cidade",
      entregue: "",
      fonte: "copa-keisei-2025"
    },
    {
      data: "2018-01",
      campanha: "Graduação do fim de 2017 (equipes do Vassoural BJJ)",
      arrecadado: "Cerca de 400 kg de alimentos",
      entregue: "Entregues à Cáritas de Louveira em janeiro de 2018",
      fonte: "prefeitura-2018"
    }
  ],

  /* PONTOS DE ENTREGA / CAIXAS MÁGICAS
     Só aparecem na versão pública com confirmado: true. */
  pontosDeEntrega: [
    // Exemplo para copiar (apague as barras // do começo das linhas):
    // { nome: "Nome do comércio", endereco: "Rua, número, bairro", horario: "Seg a sáb, 8h às 18h", campanha: "Natal Solidário 2026", confirmado: true },
  ],

  /* ITENS ACEITOS
     Lista para a equipe confirmar. Com confirmado: false, só aparece na prévia. */
  itensAceitos: {
    confirmado: false,
    itens: [
      "Arroz", "Feijão", "Óleo", "Açúcar", "Café", "Macarrão",
      "Farinha", "Leite em pó ou de caixinha", "Sardinha ou outros enlatados", "Molho de tomate"
    ]
  },

  /* PIX
     Só ative depois que a equipe confirmar o canal e o titular.
     qrImagem: coloque a imagem do QR Code em img/ e escreva o caminho, ex.: "img/pix-qr.png". */
  pix: {
    ativo: false,
    recebedor: "",
    chave: "",
    copiaECola: "",
    qrImagem: ""
  },

  /* APOIO MENSAL
     Só aparece quando a equipe aprovar. */
  apoioMensal: {
    aprovado: false,
    link: "",
    texto: ""
  },

  /* EQUIPE
     Preencha nome e função quando confirmados. */
  equipe: [
    { grupo: "Professores", nome: "", funcao: "", confirmado: false },
    { grupo: "Voluntários", nome: "", funcao: "", confirmado: false },
    { grupo: "Responsáveis pelas cestas", nome: "", funcao: "", confirmado: false }
  ],

  /* NOVIDADES
     Publicações selecionadas do Instagram: data, legenda curta e link do post.
     Sem link, o item fica só na prévia. */
  novidades: [
    { data: "2026-10", legenda: "Natal Solidário: as Caixas Mágicas Solidárias chegam aos comércios de Louveira.", url: "" },
    { data: "2026-10", legenda: "Calçados personalizados: cada criança escolheu como queria o seu.", url: "" },
    { data: "2026-09", legenda: "O registro da moção recebida na Câmara pelos 10 anos do projeto.", url: "" },
    { data: "2026-08", legenda: "1º Truco Solidário: mais de 100 cestas básicas, segundo o projeto.", url: "" }
  ]
};
