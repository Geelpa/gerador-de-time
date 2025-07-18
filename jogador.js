form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const ataque = parseFloat(form.ataque.value);
    const defesa = parseFloat(form.defesa.value);
    const vigor = parseFloat(form.vigor.value);

    if (!nome || isNaN(ataque) || isNaN(defesa) || isNaN(vigor)) {
        console.error("Preencha todos os campos corretamente.");
        return;
    }

    const media = ((ataque + defesa + vigor) / 3).toFixed(2);

    try {
        await addDoc(collection(db, "jogadores"), {
            nome,
            ataque,
            defesa,
            vigor,
            media: parseFloat(media),
        });

        console.log("Jogador salvo com sucesso!");
        form.reset();
        carregarJogadores();
    } catch (err) {
        console.error("Erro ao salvar jogador:", err);
    }
});
