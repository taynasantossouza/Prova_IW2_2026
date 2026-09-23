document.addEventListener("DOMContentLoaded", function () {

    const pokeButton = document.getElementById("poke-button");
    const pokeSoundButton = document.getElementById("poke-Sound");
    const pokemonInput = document.getElementById("pokemon");

    let pokemonAudio = "";

    pokeButton.addEventListener("click", async function () {

        try {

            let pokeInputText = pokemonInput.value.trim();

            if (!pokeInputText) {
                alert("Campo de nome/id vazio!");
                return;
            }

            let resposta = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokeInputText.toLowerCase()}/`
            );

            if (!resposta.ok) {
                throw new Error("Pokémon não encontrado.");
            }

            let dados = await resposta.json();

            pokemonAudio = dados.cries.latest;

            let pokeImage = document.getElementById("poke-img");

            pokeImage.src = dados.sprites.front_default;

            document.getElementById("poke-name").textContent =
                "Nome: " + dados.name;

            document.getElementById("poke-id").textContent =
                "ID: " + dados.id;

            document.getElementById("poke-height").textContent =
                "Altura: " + (dados.height / 10) + " m";

            document.getElementById("poke-weight").textContent =
                "Peso: " + (dados.weight / 10) + " kg";

            document.getElementById("poke-type").textContent =
                "Tipo: " + dados.types[0].type.name;

            let pokeTop = document.querySelector(".poke-top");
            let pokeBottom = document.querySelector(".poke-bottom");

            pokeTop.classList.add("open");
            pokeBottom.classList.add("open");
           

        } catch (error) {

            console.log("Erro:", error);
            alert("Pokémon não encontrado!");

        }

    });

    pokemonInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            pokeButton.click();
        }

    });

    pokeSoundButton.addEventListener("click", function () {

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