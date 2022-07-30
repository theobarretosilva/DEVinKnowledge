export const modalSucesso = document.getElementsByClassName('modal');
export const mudarModalSucesso = () => {
    const actualStyle = modalSucesso.style.display;
    if(actualStyle == 'block'){
        modalSucesso.style.display = 'none'
    }else{
        modalSucesso.style.display = 'block'
    }
}