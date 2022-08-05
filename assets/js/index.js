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
            <h1 id="tituloDica">${element.titulo}</h1>
            <p><strong>Linguagem/Skill: </strong>${element.linguagem}</p>
            <p><strong>Categoria: </strong>${element.categoria}</p>
            <p class="descricao" id="descricaoCard">${element.descricao}</p>
            <div class="botoesCard">
                <button value="${element.id}" id="deletaDica" onclick="deletaCard(${element.id})"><img id="imgDeletaDica" src="./assets/imgs/deletaDica.png" alt="Botão para deletar dica"></button>
                <button id="editaDica"><img id="imgEditaDica" src="./assets/imgs/editaDica.png" alt="Botão para editar dica"></button>
                <button id="videoDica"><img id="imgVideoDica" src="./assets/imgs/videoDica.png" alt="Botão para ver o vídeo da dica"></button>
            </div>
        </div>`
    });

    listaCards.innerHTML = cards;

    popularTagsCateg();
}

let tagTotal = 0;
let tagFrontEnd = 0;
let tagBackEnd = 0;
let tagFullStack = 0;
let tagSoftSkill = 0;

function popularTagsCateg(){
    const dados = JSON.parse(localStorage.getItem("Dados"));
    
    dados.forEach(element => {
        if(element.categoria == "FrontEnd"){
            tagFrontEnd+=1;
        }
        else if(element.categoria == "BackEnd"){
            tagBackEnd+=1;
        }
        else if(element.categoria == "FullStack"){
            tagFullStack+=1;
        }
        else if(element.categoria == "Comportamental/Soft"){
            tagSoftSkill+=1;
        }
        tagTotal+=1
    })

    document.getElementById('pTotal').innerText = tagTotal;
    document.getElementById('pFrontEnd').innerText = tagFrontEnd;
    document.getElementById('pBackEnd').innerText = tagBackEnd;
    document.getElementById('pFullStack').innerText = tagFullStack;
    document.getElementById('pSoftSkill').innerText = tagSoftSkill;
}

function pesquisar(){
    let barraDePesquisa = document.getElementById('barraPesquisa').value;
    barraDePesquisa=barraDePesquisa.toLowerCase();
    let tituloCard = document.getElementById('tituloDica').value;

    for(i = 0; i < tituloCard.lenght; i++){
        if(!tituloCard[i].innerHTML.toLowerCase().includes(barraDePesquisa)){
            tituloCard[i].style.display="none";
        }
        else{
            tituloCard[i].style.display="list-item";
        }
    }

}

const btnPesquisa = document.getElementById('pesquisar');
btnPesquisa.onclick = pesquisar;

function pegarCardPorId(card, id){
    return card.id == id;
}

function deletaCard(id){
    let dados = JSON.parse(localStorage.getItem("Dados"));

    let dadosCard = dados.find(card => card.id == id);

    localStorage.removeItem("dados", dadosCard);
}

const btnDeleta = document.getElementById('deletaDica');
btnDeleta.onclick = deletaCard;