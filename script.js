const perguntas = [
  {
    enunciado: "Pergunta 1",
    alternativas: ["Alternativa 1", "Alternativa 2"],
  },
  {
    enunciado: "Pergunta 2",
    alternativas: ["Alternativa 1", "Alternativa 2"],
  },
];

const $ = (selector) => document.querySelector(selector);

function renderPerguntas() {
  const container = $("#quiz");

  if (!container) return;

  container.innerHTML = perguntas
    .map(
      (pergunta, indice) => `
        <div class="pergunta">
          <h3>${indice + 1}. ${pergunta.enunciado}</h3>
          <div class="alternativas">
            ${pergunta.alternativas
              .map(
                (alternativa, altIndex) => `
                  <label>
                    <input type="radio" name="pergunta-${indice}" value="${altIndex}" />
                    ${alternativa}
                  </label>
                `
              )
              .join("")}
          </div>
        </div>
      `
    )
    .join("");
}

function verificarRespostas() {
  const respostas = Array.from(document.querySelectorAll("input[type='radio']:checked"));

  if (respostas.length !== perguntas.length) {
    alert("Responda todas as perguntas antes de enviar.");
    return;
  }

  const totalAcertos = respostas.reduce((acertos, input) => {
    const indicePergunta = Number(input.name.replace("pergunta-", ""));
    return acertos + (Number(input.value) === 0 ? 1 : 0);
  }, 0);

  alert(`Você acertou ${totalAcertos} de ${perguntas.length} perguntas.`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderPerguntas();

  const botao = $("#enviar");
  if (botao) {
    botao.addEventListener("click", verificarRespostas);
  }
});
