document.addEventListener("DOMContentLoaded", function (){
    const pokeButton = document.getElementById("poke-button");
    const pokeSoundButton = document.getElementById("poke-Sound");
    let pokemonAudio = "";

    pokeButton.addEventListener("click", async function () {
        try{
            let pokeInputText =
            document.getElementById("pokemon").value;

            if(!pokeInputText){
                return alert("Campo de nome/id vazio!");
            }

            let resposta = await fetch(`
                https://pokeapi.co/api/v2/pokemon/${pokeInputText}/`);

            let dados = await resposta.json();
            pokemonAudio = dados.cries.latest;

            let pokeImage = document.getElementById("poke-img");
            pokeImage.src = dados.sprites.front_default;

            document.getElementById("poke-name").textContent = dados.name;
            document.getElementById("poke-id").textContent = dados.id;
            document.getElementById("poke-height").textContent = dados.height;
            document.getElementById("poke-weight").textContent = dados.weight;
            document.getElementById("poke-type").textContent = dados.types[0].type.name;

        }catch (error){
            console.log("Erro: " + error);
        }
    });

    document.getElementById("pokemon").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            pokeButton.click();
        }
    });
    pokeSoundButton.addEventListener("click", function () { 
    console.log("pokemonAudio:", pokemonAudio); 
    
    if (pokemonAudio) { 
        let audio = new Audio(pokemonAudio);

        audio.play().catch(function (error) {
            console.log("Erro ao tocar o áudio:", error);
        });

    } else { 
        alert("Nenhum Pokémon carregado para reproduzir o som."); 
    } 
});
});