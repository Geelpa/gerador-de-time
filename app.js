const listaJogadores = document.getElementById('lista-jogadores');
const form = document.getElementById('form-jogador');
let editandoId = null;

// Salvar novo ou atualizar jogador
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const ataque = parseFloat(form.ataque.value);
    const defesa = parseFloat(form.defesa.value);
    const vigor = parseFloat(form.vigor.value);

    const media = ((ataque + defesa + vigor) / 3).toFixed(2);
    const jogador = { nome, ataque, defesa, vigor, media };

    try {
        const db = firebase.firestore();

        if (editandoId) {
            await db.collection('jogadores').doc(editandoId).update(jogador);
            editandoId = null;
        } else {
            await db.collection('jogadores').add(jogador);
        }

        form.reset();
        carregarJogadores();
    } catch (error) {
        console.error("Erro ao salvar jogador:", error);
    }
});

// Carregar jogadores
async function carregarJogadores() {
    listaJogadores.innerHTML = '';
    const db = firebase.firestore();

    try {
        const snapshot = await db.collection('jogadores').get();

        snapshot.forEach(doc => {
            const jogador = doc.data();
            const li = document.createElement('li');

            li.innerHTML = `
        <strong>${jogador.nome}</strong><br>
        Ataque: ${jogador.ataque} |
        Defesa: ${jogador.defesa} |
        Vigor: ${jogador.vigor} |
        <strong>Média: ${jogador.media}</strong><br>
        <button onclick="editarJogador('${doc.id}', ${jogador.ataque}, ${jogador.defesa}, ${jogador.vigor}, '${jogador.nome}')">✏️ Editar</button>
        <button onclick="excluirJogador('${doc.id}')">🗑️ Excluir</button>
      `;

            listaJogadores.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar jogadores:", error);
    }
}

// Função editar
function editarJogador(id, ataque, defesa, vigor, nome) {
    form.nome.value = nome;
    form.ataque.value = ataque;
    form.defesa.value = defesa;
    form.vigor.value = vigor;
    editandoId = id;
    window.scrollTo(0, 0);
}

// Função excluir
async function excluirJogador(id) {
    if (confirm('Tem certeza que deseja excluir este jogador?')) {
        try {
            const db = firebase.firestore();
            await db.collection('jogadores').doc(id).delete();
            carregarJogadores();
        } catch (error) {
            console.error("Erro ao excluir jogador:", error);
        }
    }
}

// Inicial
document.addEventListener('DOMContentLoaded', carregarJogadores);
