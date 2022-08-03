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
    
function cadastrarDica(){
    const titulo = document.getElementById('titulo').value;
    const linguagem = document.getElementById('linguagem').value;
    const categoria = document.getElementById('inputCategoria').value;
    const descricao = document.getElementById('descricao').value;
    const linkYT = document.getElementById('inputLink').value;

    var dados = JSON.parse(localStorage.getItem(titulo));

    if(dados == null){
        localStorage.setItem(titulo, "[]");
        dados = [];
    }
    
    const auxRegistro = {
        titulo : titulo,
        linguagem : linguagem,
        categoria : categoria,
        descricao : descricao,
        linkYT : linkYT
    }

    dados.push(auxRegistro);
    localStorage.setItem(titulo, JSON.stringify(dados));
}