export const modalSucesso = document.getElementsByClassName('modal');
export const mudarModalSucesso = () => {
    const actualStyle = modalSucesso[0].style.display;
    if(actualStyle == 'block'){
        modalSucesso[0].style.display = 'none'
    }else{
        modalSucesso[0].style.display = 'block'
    }
}