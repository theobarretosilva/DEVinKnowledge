/*import {mudarModalSucesso} from "../../modals/sucesso/sucesso.js";
import {modalSucesso} from "../../modals/sucesso/sucesso.js";

const btnEnviar = document.getElementById('enviarDica');

window.onclick = function(event){
    if(event.target == modalSucesso){
        mudarModalSucesso();
    }
}

import {mudarModalEditando} from "../../modals/editando/editando.js";
import {modalEditando} from "../../modals/editando/editando.js";

const btnEditarCard = document.getElementById('editarDica');

window.onclick = function(event){
    if(event.targe == modalEditando){
        mudarModalEditando();
    }
}*/

const form = document.getElementById('formulario');
form.onsubmit = cadastrarDica;

document.body.onload = criarCard;

function cadastrarDica(event){
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const linguagem = document.getElementById('linguagem').value;
    const categoria = document.getElementById('inputCategoria').value;
    const descricao = document.getElementById('descricao').value;
    const linkYT = document.getElementById('inputLink').value;

    var dados = JSON.parse(localStorage.getItem("Dados"));

    if(dados == null){
        localStorage.setItem("Dados", "[]");
        dados = [];
    }
    
    const auxRegistro = {
        id : new Date().getTime(), 
        titulo : titulo,
        linguagem : linguagem,
        categoria : categoria,
        descricao : descricao,
        linkYT : linkYT
    }

    dados.push(auxRegistro);
    localStorage.setItem("Dados", JSON.stringify(dados));

    //JSON.parse(localStorage.getItem("Dados")).filter(element => element.titulo == );
    
    criarCard();
}

function criarCard(){
    const dados = JSON.parse(localStorage.getItem("Dados"));
    const listaCards = document.getElementById('cardDicas');
    let cards = "";

    listaCards.innerHTML = "";

    dados.forEach(element => {
        cards += 
        `<div class="dica">
            <h1>${element.titulo}</h1>
            <p><strong>Linguagem/Skill: </strong>${element.linguagem}</p>
            <p><strong>Categoria: </strong>${element.categoria}</p>
            <p id="descricaoCard">${element.descricao}</p>
            <div class="botoesCard">
                <button id="deletaDica"><img id="imgDeletaDica" src="./assets/imgs/deletaDica.png" alt="Botão para deletar dica"></button>
                <button id="editaDica"><img id="imgEditaDica" src="./assets/imgs/editaDica.png" alt="Botão para editar dica"></button>
                <button id="videoDica"><img id="imgVideoDica" src="./assets/imgs/videoDica.png" alt="Botão para ver o vídeo da dica"></button>
            </div>
            <p id="idElemento">${element.id}</p>
        </div>`
    });

    listaCards.innerHTML = cards;
}

function deletaCard(){
    
}