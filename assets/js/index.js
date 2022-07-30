import {mudarModalSucesso} from "../../modals/sucesso/sucesso.js";
import {modalSucesso} from "../../modals/sucesso/sucesso.js";

const btnEnviar = document.getElementById('enviarDica');
btnEnviar.addEventListener('click', mudarModalSucesso);

window.onclick = function(event){
    if(event.target == modalSucesso){
        mudarModalSucesso();
    }
}

import {mudarModalEditando} from "../../modals/editando/editando.js";
import {modalEditando} from "../../modals/editando/editando.js";

const btnEditarCard = document.getElementById('editarDica');
btnEditarCard.addEventListener('click', mudarModalEditando);

window.onclick = function(event){
    if(event.targe == modalEditando){
        mudarModalEditando();
    }
}