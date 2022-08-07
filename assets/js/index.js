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

// import { openModal } from "../../modais/sucesso/sucesso.js";

const form = document.getElementById('formulario');
form.onsubmit = cadastrarDica;

document.body.onload = criarCard;

function cadastrarDica(event){
    event.preventDefault();

    const id = localStorage.getItem("CardEditado");
    if(id){
        mandarDicaEditada();
    }
    else{
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
    }

    criarCard();
}

function criarCard(array){
    const dados = JSON.parse(localStorage.getItem("Dados") || "[]");
    const listaCards = document.getElementById('cardDicas');
    let cards = "";

    listaCards.innerHTML = "";

    dados.forEach(element => {
        cards += 
        `<div class="dica">
            <h1 value=""${element.titulo} class="tituloDica" id="tituloDica">${element.titulo}</h1>
            <p><strong>Linguagem/Skill: </strong>${element.linguagem}</p>
            <p><strong>Categoria: </strong>${element.categoria}</p>
            <p class="descricao" id="descricaoCard">${element.descricao}</p>
            <div class="botoesCard">
                <button value="${element.id}" id="deletaDica" onclick="deletaCard(${element.id})"><img id="imgDeletaDica" src="./assets/imgs/deletaDica.png" alt="Botão para deletar dica"></button>
                <button value="${element.id}" id="editaDica" onclick="editaCard(${element.id})"><img id="imgEditaDica" src="./assets/imgs/editaDica.png" alt="Botão para editar dica"></button>
                <a id="linkYT" value="${element.linkYT}" href="${element.linkYT}" target="_blank"><button id="videoDica"><img id="imgVideoDica" src="./assets/imgs/videoDica.png" alt="Botão para ver o vídeo da dica"></button></a>
            </div>
        </div>`
    });

    listaCards.innerHTML = cards;

    popularTagsCateg();
    desaparecerBtnVideo();
}

let tagTotal = 0;
let tagFrontEnd = 0;
let tagBackEnd = 0;
let tagFullStack = 0;
let tagSoftSkill = 0;

function popularTagsCateg(){
    const dados = JSON.parse(localStorage.getItem("Dados") || "[]");
    
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

let barraDePesquisa = document.getElementById('barraPesquisa');
let dados = JSON.parse(localStorage.getItem("Dados"));
let tituloCard = document.getElementsByClassName('tituloDica');

function deletaCard(id){
    let dados = JSON.parse(localStorage.getItem("Dados"));
    let dadosDoCard = dados.filter(card => card.id != id)

    localStorage.setItem("Dados", JSON.stringify(dadosDoCard));

    criarCard();
}

function editaCard(id){
    let dados = JSON.parse(localStorage.getItem("Dados"));
    let element = dados.find(card => card.id == id);

    document.getElementById('titulo').value = element.titulo;
    document.getElementById('linguagem').value = element.linguagem;
    document.getElementById('inputCategoria').value = element.categoria;
    document.getElementById('descricao').value = element.descricao;
    document.getElementById('inputLink').value = element.linkYT;

    localStorage.setItem("CardEditado", element.id)
}

function mandarDicaEditada(){
    let dados = JSON.parse(localStorage.getItem("Dados"));

    const id = parseInt(localStorage.getItem("CardEditado"));
    const titulo = document.getElementById('titulo').value;
    const linguagem = document.getElementById('linguagem').value;
    const categoria = document.getElementById('inputCategoria').value;
    const descricao = document.getElementById('descricao').value;
    const linkYT = document.getElementById('inputLink').value;
    
    const card = {
        id,
        titulo,
        linguagem,
        categoria,
        descricao,
        linkYT,
    }

    const posicao = dados.findIndex((el) => {
        return el.id == id;
    })

    dados.splice(posicao, 1, card);

    localStorage.setItem("Dados", JSON.stringify(dados))
    localStorage.setItem("CardEditado", "")
}

function criarCardPesquisa(array){
    const dados = JSON.parse(localStorage.getItem("Dados") || "[]");
    const listaCards = document.getElementById('cardDicas');
    let cards = "";

    listaCards.innerHTML = "";

    array.forEach(element => {
        cards += 
        `<div class="dica">
            <h1 value=""${element.titulo} class="tituloDica" id="tituloDica">${element.titulo}</h1>
            <p><strong>Linguagem/Skill: </strong>${element.linguagem}</p>
            <p><strong>Categoria: </strong>${element.categoria}</p>
            <p class="descricao" id="descricaoCard">${element.descricao}</p>
            <div class="botoesCard">
                <button value="${element.id}" id="deletaDica" onclick="deletaCard(${element.id})"><img id="imgDeletaDica" src="./assets/imgs/deletaDica.png" alt="Botão para deletar dica"></button>
                <button value="${element.id}" id="editaDica" onclick="editaCard(${element.id})"><img id="imgEditaDica" src="./assets/imgs/editaDica.png" alt="Botão para editar dica"></button>
                <a href="${element.linkYT}" target="_blank"><button id="videoDica"><img id="imgVideoDica" src="./assets/imgs/videoDica.png" alt="Botão para ver o vídeo da dica"></button></a>
            </div>
        </div>`
    });

    listaCards.innerHTML = cards;

    popularTagsCateg();
}

function pesquisa(){
    let dados = JSON.parse(localStorage.getItem("Dados"));
    let input = document.getElementById('barraPesquisa');
    let inputPesquisa = (input.value).toLocaleLowerCase();

    const listaFiltrada = dados.filter((element, i)=> {
        return element.titulo.toLocaleLowerCase().includes(inputPesquisa)
    });
    
    criarCardPesquisa(listaFiltrada);
}
const btnPesquisa = document.getElementById('pesquisar');
btnPesquisa.onclick = pesquisa;

function limparBarraPesquisa(){
    let input = document.getElementById('barraPesquisa');

    input.value = "";
    
    criarCard();
}
const btnLimpaPesquisa = document.getElementById('limparPesquisa');
btnLimpaPesquisa.onclick = limparBarraPesquisa;

function desaparecerBtnVideo(){
    const linkBtnVideo = document.getElementById('linkYT');
    const btnVideo = document.getElementById('videoDica');
    const imgVideo = document.getElementById('imgVideoDica');

    if(linkBtnVideo == ""){
        linkBtnVideo.style.visibility = "hidden";
        btnVideo.style.visibility = "hidden";
        imgVideo.style.visibility = "hidden";
    }
}