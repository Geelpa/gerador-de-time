const form = document.getElementById("formJogador");
const lista = document.getElementById("listaJogadores");
const erroMsg = document.createElement("div");
erroMsg.classList.add("erro");
form.appendChild(erroMsg);

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroMsg.textContent = ""; // limpa erro anterior

    const nome = document.getElementById("nome").value.trim();
    const ataque = parseFloat(document.getElementById("ataque").value);
    const defesa = parseFloat(document.getElementById("defesa").value);
    const vigor = parseFloat(document.getElementById("vigor").value);

    if (!nome || isNaN(ataque) || isNaN(defesa) || isNaN(vigor)) {
        erroMsg.textContent = "Preencha todos os campos corretamente.";
        return;
    }

    if ([ataque, defesa, vigor].some(n => n < 0 || n > 10)) {
        erroMsg.textContent = "As notas devem estar entre 0 e 10.";
        return;
    }

    try {
        const jogador = criarJogador(nome, ataque, defesa, vigor);
        firebase.firestore().collection("jogadores").add(jogador)
            .then(() => {
                console.log("Jogador salvo com sucesso!");
                form.reset();
                carregarJogadores();
            })
            .catch((error) => {
                console.error("Erro ao salvar jogador:", error);
            });


        form.reset();
        carregarJogadores();
    } catch (erro) {
        console.error("Erro ao salvar jogador:", erro);
        erroMsg.textContent = "Erro ao salvar jogador. Veja o console.";
    }
});

async function carregarJogadores() {
    lista.innerHTML = "<em>Carregando jogadores...</em>";

    try {
        const snapshot = await db.collection("jogadores").orderBy("media", "desc").get();
        lista.innerHTML = "";

        if (snapshot.empty) {
            lista.innerHTML = "<p>Nenhum jogador cadastrado ainda.</p>";
            return;
        }

        snapshot.forEach(doc => {
            const j = doc.data();
            lista.innerHTML += `
          <div class="jogador">
            <strong>${j.nome}</strong><br>
            Ataque: ${j.ataque}, Defesa: ${j.defesa}, Vigor: ${j.vigor}<br>
            Média: <strong>${j.media}</strong>
          </div>
        `;
        });
    } catch (erro) {
        console.error("Erro ao carregar jogadores:", erro);
        lista.innerHTML = "<p style='color:red;'>Erro ao carregar jogadores.</p>";
    }
}

carregarJogadores();
