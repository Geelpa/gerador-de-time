function criarJogador(nome, ataque, defesa, vigor) {
    const media = ((ataque + defesa + vigor) / 3).toFixed(2);
    return {
        nome,
        ataque,
        defesa,
        vigor,
        media: parseFloat(media),
    };
}
