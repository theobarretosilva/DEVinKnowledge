import {mudarModal} from "../../modals/sucesso/sucesso.js";
import {modal} from "../../modals/sucesso/sucesso.js";

const btnEnviar = document.getElementById('enviarDica');
btnEnviar.addEventListener('click', mudarModal);

window.onclick = function(event){
    if(event.target == modal){
        mudarModal();
    }
}