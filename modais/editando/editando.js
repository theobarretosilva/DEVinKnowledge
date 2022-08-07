export const modalEditando = document.getElementsByClassName('modal');
export const mudarModalEditando = () => {
    const actualStyle = modalEditando.style.display;
    if(actualStyle == 'block'){
        modalEditando.style.display = 'none'
    }else{
        modalEditando.style.display = 'block'
    }
}