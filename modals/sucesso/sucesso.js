export const modal = document.getElementsByClassName('modal');
export const mudarModal = () => {
    const actualStyle = modal.style.display;
    if(actualStyle == 'block'){
        modal.style.display = 'none'
    }else{
        modal.style.display = 'block'
    }
}