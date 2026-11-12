/* Comportamento do site. O conteúdo editável fica em js/dados.js. */
(function () {
  "use strict";

  var D = window.VASSOURAL || {};
  var previa = document.documentElement.classList.contains("previa");
  var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
    "agosto", "setembro", "outubro", "novembro", "dezembro"];

  function el(tag, attrs, filhos) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "texto") n.textContent = attrs[k];
      else if (k === "classe") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (filhos || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }

  function data(s, maiuscula) {
    if (!s) return "";
    var p = s.split("-");
    var t = (p[2] ? parseInt(p[2], 10) + " de " : "") + MESES[parseInt(p[1], 10) - 1] + " de " + p[0];
    return maiuscula ? t.charAt(0).toUpperCase() + t.slice(1) : t;
  }

  /* Fonte dentro do texto: <a data-fonte="id">relato da Garra BJJ</a>.
     Com link, vira link. Sem link, fica o texto puro (e a prévia avisa). */
  function fontes() {
    document.querySelectorAll("a[data-fonte]").forEach(function (a) {
      var f = (D.fontes || {})[a.getAttribute("data-fonte")];
      if (f && f.url) { a.href = f.url; a.rel = "noopener"; return; }
      var s = el("span", { texto: a.textContent });
      s.appendChild(el("span", { classe: "fonte-pendente", texto: "link pendente" }));
      a.replaceWith(s);
    });
  }

  function linkFonte(id, texto) {
    var f = (D.fontes || {})[id];
    if (f && f.url) return el("a", { href: f.url, rel: "noopener", texto: texto || f.rotulo });
    var s = el("span", { texto: texto || (f ? f.rotulo : "") });
    s.appendChild(el("span", { classe: "fonte-pendente", texto: "link pendente" }));
    return s;
  }

  function contatos() {
    document.querySelectorAll("[data-contato='mensagem']").forEach(function (a) { a.href = D.contato.mensagemUrl; });
    document.querySelectorAll("[data-contato='instagram']").forEach(function (a) { a.href = D.contato.instagramUrl; });
  }

  /* Turmas: uma frase por atividade */
  function fraseTurma(t) {
    var partes = [];
    if (t.paraQuem) partes.push(t.paraQuem);
    if (t.quando) partes.push(t.quando);
    if (t.onde) partes.push(t.onde);
    var frase = partes.join(", ");
    return (frase ? frase + ". " : "") + (t.custo ? t.custo + ". " : "") + (t.comoEntrar || "");
  }

  function turmas() {
    var lista = D.turmas || [];
    document.querySelectorAll("[data-turma]").forEach(function (p) {
      var t = lista.filter(function (x) { return x.id === p.getAttribute("data-turma"); })[0];
      if (!t) return;
      if (t.confirmado) { p.appendChild(document.createTextNode(fraseTurma(t))); return; }
      p.appendChild(el("span", {}, [
        (t.custo || "Gratuito") + ". Dias, horários e vagas: ",
        el("a", { href: D.contato.mensagemUrl, rel: "noopener", texto: "pergunte pelo Instagram" }), "."
      ]));
    });
    var ul = document.getElementById("turmas");
    if (ul) {
      var conf = lista.filter(function (t) { return t.confirmado || previa; });
      if (!conf.length) { ul.hidden = true; return; }
      conf.forEach(function (t) {
        ul.appendChild(el("li", t.confirmado ? {} : { "data-pendente": "dados da turma confirmados em js/dados.js" }, [
          el("strong", { texto: t.nome + ": " }),
          t.confirmado ? fraseTurma(t) : "[para quem, quando, onde, como entrar]"
        ]));
      });
    }
  }

  function copiar(texto, fb) {
    function ok() { if (fb) fb.textContent = "Copiado."; }
    function manual() {
      var t = el("textarea", {}); t.value = texto; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); ok(); } catch (e) { if (fb) fb.textContent = "Selecione e copie."; }
      document.body.removeChild(t);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(ok, manual);
    else manual();
  }

  /* Compartilhar a campanha pelo celular (referência: JustGiving) */
  function compartilhar(c) {
    var b = el("button", { type: "button", classe: "botao botao--linha", texto: "Compartilhar" });
    var fb = el("span", { classe: "feedback", "aria-live": "polite" });
    b.addEventListener("click", function () {
      var url = location.href.split("#")[0].split("?")[0].replace(/[^/]*$/, "resultados.html") + "#" + c.id;
      if (navigator.share) navigator.share({ title: c.titulo + " · Projeto Vassoural", url: url }).catch(function () {});
      else copiar(url, fb);
    });
    return [b, fb];
  }

  /* Campanha contada em frases, não em ficha */
  function campanha(c) {
    var andamento = c.status === "em-andamento";
    var quando = andamento
      ? "Desde " + data(c.inicio) + (c.fim ? " até " + data(c.fim) : "")
      : data(c.inicio, true);
    var cab = el("p", { classe: "campanha-data" }, [quando]);
    if (andamento) cab.appendChild(el("span", { classe: "em-andamento", texto: "aberta agora" }));

    var corpo = el("p", {}, [c.necessidade + " "]);
    var temPontos = (D.pontosDeEntrega || []).some(function (p) { return p.confirmado; });
    if (andamento) {
      corpo.appendChild(document.createTextNode((temPontos || !c.comoColaborarPublico ? c.comoColaborar : c.comoColaborarPublico) + " "));
    } else {
      corpo.appendChild(document.createTextNode(c.comoColaborar + " "));
    }

    var art = el("article", { classe: "campanha", id: c.id }, [cab, el("h3", { texto: c.titulo }), corpo]);
    if (c.resultado) art.appendChild(el("p", {}, [el("strong", { texto: "Resultado: " }), c.resultado + " ", linkFonte(c.fonte, "Fonte")]));
    else art.appendChild(el("p", { classe: "apoio" }, ["O resultado aparece aqui quando a campanha terminar. ", linkFonte(c.fonte, "Ver o anúncio")]));

    if (andamento) {
      var botoes = el("div", { classe: "botoes" });
      botoes.appendChild(el("a", {
        classe: "botao",
        href: temPontos ? "apoiar.html#pontos" : D.contato.mensagemUrl,
        rel: "noopener",
        texto: temPontos ? "Ver onde doar" : "Perguntar onde doar"
      }));
      compartilhar(c).forEach(function (n) { botoes.appendChild(n); });
      art.appendChild(botoes);
      if (!temPontos) art.appendChild(el("p", { classe: "apoio", "data-pendente": "pontos de coleta e data de encerramento confirmados", style: "margin-top:12px" }, ["[Lista das Caixas Mágicas Solidárias e data de encerramento]"]));
    }
    return art;
  }

  function campanhas() {
    var cs = D.campanhas || [];
    var destaque = document.getElementById("campanha-destaque");
    if (destaque) {
      var atual = cs.filter(function (c) { return c.status === "em-andamento"; })[0];
      if (atual) destaque.appendChild(campanha(atual));
    }
    var lista = document.getElementById("lista-campanhas");
    if (lista) {
      cs.slice().sort(function (a, b) {
        if (a.status !== b.status) return a.status === "em-andamento" ? -1 : 1;
        return (b.inicio || "").localeCompare(a.inicio || "");
      }).forEach(function (c) { lista.appendChild(campanha(c)); });
    }
  }

  function contas() {
    var corpo = document.getElementById("contas-corpo");
    if (!corpo) return;
    (D.contas || []).slice().sort(function (a, b) { return b.data.localeCompare(a.data); }).forEach(function (l) {
      corpo.appendChild(el("tr", {}, [
        el("td", { texto: data(l.data, true) }),
        el("td", { "data-rotulo": "Campanha" }, [linkFonte(l.fonte, l.campanha)]),
        el("td", { "data-rotulo": "Arrecadado", texto: l.arrecadado }),
        l.entregue
          ? el("td", { "data-rotulo": "Entregue", texto: l.entregue })
          : el("td", { "data-rotulo": "Entregue", classe: "sem-registro", texto: "Entrega ainda não registrada" })
      ]));
    });
  }

  function pontos() {
    var alvo = document.getElementById("pontos-entrega");
    if (!alvo) return;
    var pts = (D.pontosDeEntrega || []).filter(function (p) { return p.confirmado || previa; });
    if (!pts.length) { alvo.hidden = true; return; }
    var vazio = document.getElementById("pontos-vazio");
    if (vazio && pts.some(function (p) { return p.confirmado; })) vazio.hidden = true;
    pts.forEach(function (p) {
      alvo.appendChild(el("li", p.confirmado ? {} : { "data-pendente": "ponto não confirmado" }, [
        el("strong", { texto: p.nome }), " · " + p.endereco + (p.horario ? " · " + p.horario : "")
      ]));
    });
  }

  function itens() {
    var alvo = document.getElementById("itens-aceitos");
    if (!alvo || !D.itensAceitos) return;
    if (D.itensAceitos.confirmado) {
      alvo.closest("[data-itens]").removeAttribute("data-pendente");
      var fb = document.getElementById("itens-publico"); if (fb) fb.hidden = true;
    }
    D.itensAceitos.itens.forEach(function (i) { alvo.appendChild(el("li", { texto: i })); });
  }

  function pix() {
    var alvo = document.getElementById("pix");
    if (!alvo) return;
    var p = D.pix || {};
    if (!p.ativo) { alvo.hidden = true; return; }
    var fallback = document.getElementById("pix-publico"); if (fallback) fallback.hidden = true;
    var fb = el("span", { classe: "feedback", "aria-live": "polite" });
    var b = el("button", { type: "button", classe: "botao", texto: "Copiar código Pix" });
    b.addEventListener("click", function () { copiar(p.copiaECola, fb); });
    alvo.appendChild(el("div", { classe: "pix" }, [
      p.qrImagem ? el("img", { src: p.qrImagem, alt: "QR Code do Pix do Projeto Vassoural", width: "200", height: "200" }) : null,
      el("div", {}, [
        el("p", {}, ["Pix em nome de ", el("strong", { texto: p.recebedor }), "."]),
        p.chave ? el("p", { texto: "Chave: " + p.chave }) : null,
        el("p", { classe: "apoio", texto: "No celular, copie o código e cole na opção Pix copia e cola do seu banco." }),
        el("div", { classe: "pix-codigo", texto: p.copiaECola }),
        b, fb
      ])
    ]));
  }

  function apoioMensal() {
    var alvo = document.getElementById("apoio-mensal");
    var a = D.apoioMensal || {};
    if (!alvo || !a.aprovado) return;
    alvo.removeAttribute("data-pendente");
    if (a.texto) alvo.querySelector("[data-texto]").textContent = a.texto;
    if (a.link) { var l = alvo.querySelector("[data-link]"); l.href = a.link; l.hidden = false; }
  }

  function equipe() {
    var alvo = document.getElementById("equipe");
    if (!alvo) return;
    var conf = (D.equipe || []).filter(function (m) { return m.confirmado; });
    if (conf.length) {
      alvo.removeAttribute("data-pendente");
      alvo.textContent = "Quem faz o projeto com Clóvis hoje: " + conf.map(function (m) {
        return m.nome + (m.funcao ? " (" + m.funcao + ")" : "");
      }).join(", ") + ".";
    }
  }

  function novidades() {
    var alvo = document.getElementById("novidades");
    if (!alvo) return;
    var ns = (D.novidades || []).filter(function (n) { return n.url || previa; });
    if (!ns.length) { alvo.closest("section").hidden = true; return; }
    ns.forEach(function (n) {
      alvo.appendChild(el("li", n.url ? {} : { "data-pendente": "link do post" }, [
        el("strong", { texto: data(n.data, true) }),
        el("span", { texto: n.legenda }),
        n.url ? el("a", { href: n.url, rel: "noopener", texto: "Ver no Instagram" }) : null
      ]));
    });
  }

  function menu() {
    var b = document.querySelector(".menu-botao");
    var alvo = document.getElementById("nav-extra");
    if (!b || !alvo) return;
    b.addEventListener("click", function () {
      var aberto = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", String(!aberto));
      alvo.classList.toggle("aberto", !aberto);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && b.getAttribute("aria-expanded") === "true") {
        b.setAttribute("aria-expanded", "false"); alvo.classList.remove("aberto"); b.focus();
      }
    });
  }

  function barraPrevia() {
    if (!previa) return;
    var aqui = location.pathname.split("/").pop() || "index.html";
    document.body.insertBefore(el("div", { classe: "barra-previa", role: "note" }, [
      el("div", { classe: "envoltorio" }, [
        el("span", { texto: "Prévia da equipe. O que está tracejado ainda não aparece no site público." }),
        el("a", { href: "pendencias.html", texto: "O que falta validar" }),
        el("a", { href: "fotos.html", texto: "Fotos que precisamos" }),
        el("a", { href: aqui + "?previa=0", texto: "Ver como o público vê" })
      ])
    ]), document.body.firstChild.nextSibling);
  }

  function propagarPrevia() {
    if (!previa) return;
    document.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (!/^[\w-]+\.html/.test(h) || h.indexOf("previa=") > -1) return;
      var p = h.split("#");
      a.setAttribute("href", p[0] + "?previa=1" + (p[1] ? "#" + p[1] : ""));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    contatos();
    turmas();
    campanhas();
    contas();
    pontos();
    itens();
    pix();
    apoioMensal();
    equipe();
    novidades();
    fontes();
    menu();
    barraPrevia();
    propagarPrevia();
  });
})();
