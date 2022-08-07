const form = document.getElementById('formulario');
form.onsubmit = cadastrarDica;

document.body.onload = popularTagsCateg;

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

    abreModal();
    criarCard();
    limparForm();
}

function criarCard(array) {
    const dados = JSON.parse(localStorage.getItem("Dados") || "[]");
    const listaCards = document.getElementById("cardDicas");
    listaCards.innerHTML = "";

    dados.forEach((element) => {
      const section = document.createElement("section");
      const h1Titulo = document.createElement("h1");
      const pLinguagem = document.createElement("p");
      const strongLinguagem = document.createElement("strong");
      const pCategoria = document.createElement("p");
      const strongCategoria = document.createElement("strong");
      const pDescricao = document.createElement("p");
      const divButtons = document.createElement("div");
      const buttonEditar = document.createElement("button");
      const imgEditar = document.createElement("img");
      const buttonDeletar = document.createElement("button");
      const imgDeletar = document.createElement("img");
      const aVideo = document.createElement("a");
      const imgVideo = document.createElement("img");
      const buttonVideo = document.createElement("button");
      section.classList.add("dica");
      h1Titulo.classList.add("tituloDica");
      pDescricao.classList.add("descricao");
      divButtons.classList.add("botoesCard");
      h1Titulo.id = "tituloDica";
      pDescricao.id = "descricaoCard";
      imgDeletar.id = "imgDeletaDica";
      buttonDeletar.id = "deletaDica";
      imgEditar.id = "imgEditaDica";
      buttonEditar.id = "editaDica";
      aVideo.id = "linkYT";
      buttonVideo.id = "videoDica";
      imgVideo.id = "imgVideoDica";
      h1Titulo.innerText = element.titulo;
      section.appendChild(h1Titulo);
      strongLinguagem.innerText = "Linguagem/Skill:";
      pLinguagem.appendChild(strongLinguagem);
      pLinguagem.append(` ${element.linguagem}`);
      section.appendChild(pLinguagem);
      strongCategoria.innerText = "Categoria:";
      pCategoria.appendChild(strongCategoria);
      pCategoria.append(` ${element.categoria}`);
      section.appendChild(pCategoria);
      pDescricao.innerText = element.descricao;
      section.appendChild(pDescricao);
      imgDeletar.src = "./assets/imgs/deletaDica.png";
      imgDeletar.alt = "Botão para deletar dica";
      buttonDeletar.appendChild(imgDeletar);
      buttonDeletar.value = element.id;
      buttonDeletar.onclick = () => deletaCard(element.id);
      divButtons.appendChild(buttonDeletar);
      imgEditar.src = "./assets/imgs/editaDica.png";
      imgEditar.alt = "Botão para editar dica";
      buttonEditar.appendChild(imgEditar);
      buttonEditar.value = element.id;
      buttonEditar.onclick = () => editaCard(element.id);
      divButtons.appendChild(buttonEditar);
      if (element.linkYT) {
        imgVideo.src = "./assets/imgs/videoDica.png";
        imgVideo.alt = "Botão para ver o vídeo da dica";
        aVideo.value = element.linkYT;
        aVideo.href = element.linkYT;
        aVideo.target = "_blank";
        buttonVideo.appendChild(imgVideo);
        aVideo.appendChild(buttonVideo);
        divButtons.appendChild(aVideo);
      }
      section.appendChild(divButtons);
      listaCards.appendChild(section);
    });

}

function limparForm(){
    document.getElementById('titulo').value = "";
    document.getElementById('linguagem').value = "";
    document.getElementById('inputCategoria').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('inputLink').value = "";
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

    criarCard();
}

let barraDePesquisa = document.getElementById('barraPesquisa');
let dados = JSON.parse(localStorage.getItem("Dados"));
let tituloCard = document.getElementsByClassName('tituloDica');

function deletaCard(id){
    let dados = JSON.parse(localStorage.getItem("Dados"));
    let dadosDoCard = dados.filter(card => card.id != id)

    localStorage.setItem("Dados", JSON.stringify(dadosDoCard));

    criarCard();
    document.location.reload();
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

function criarCardPesquisa(array) {
    const dados = JSON.parse(localStorage.getItem("Dados") || "[]");
    const listaCards = document.getElementById("cardDicas");
    listaCards.innerHTML = "";

    array.forEach((element) => {
      const section = document.createElement("section");
      const h1Titulo = document.createElement("h1");
      const pLinguagem = document.createElement("p");
      const strongLinguagem = document.createElement("strong");
      const pCategoria = document.createElement("p");
      const strongCategoria = document.createElement("strong");
      const pDescricao = document.createElement("p");
      const divButtons = document.createElement("div");
      const buttonEditar = document.createElement("button");
      const imgEditar = document.createElement("img");
      const buttonDeletar = document.createElement("button");
      const imgDeletar = document.createElement("img");
      const aVideo = document.createElement("a");
      const imgVideo = document.createElement("img");
      const buttonVideo = document.createElement("button");
      section.classList.add("dica");
      h1Titulo.classList.add("tituloDica");
      pDescricao.classList.add("descricao");
      divButtons.classList.add("botoesCard");
      h1Titulo.id = "tituloDica";
      pDescricao.id = "descricaoCard";
      imgDeletar.id = "imgDeletaDica";
      buttonDeletar.id = "deletaDica";
      imgEditar.id = "imgEditaDica";
      buttonEditar.id = "editaDica";
      aVideo.id = "linkYT";
      buttonVideo.id = "videoDica";
      imgVideo.id = "imgVideoDica";
      h1Titulo.innerText = element.titulo;
      section.appendChild(h1Titulo);
      strongLinguagem.innerText = "Linguagem/Skill:";
      pLinguagem.appendChild(strongLinguagem);
      pLinguagem.append(` ${element.linguagem}`);
      section.appendChild(pLinguagem);
      strongCategoria.innerText = "Categoria:";
      pCategoria.appendChild(strongCategoria);
      pCategoria.append(` ${element.categoria}`);
      section.appendChild(pCategoria);
      pDescricao.innerText = element.descricao;
      section.appendChild(pDescricao);
      imgDeletar.src = "./assets/imgs/deletaDica.png";
      imgDeletar.alt = "Botão para deletar dica";
      buttonDeletar.appendChild(imgDeletar);
      buttonDeletar.value = element.id;
      buttonDeletar.onclick = () => deletaCard(element.id);
      divButtons.appendChild(buttonDeletar);
      imgEditar.src = "./assets/imgs/editaDica.png";
      imgEditar.alt = "Botão para editar dica";
      buttonEditar.appendChild(imgEditar);
      buttonEditar.value = element.id;
      buttonEditar.onclick = () => editaCard(element.id);
      divButtons.appendChild(buttonEditar);
      if (element.linkYT) {
        imgVideo.src = "./assets/imgs/videoDica.png";
        imgVideo.alt = "Botão para ver o vídeo da dica";
        aVideo.value = element.linkYT;
        aVideo.href = element.linkYT;
        aVideo.target = "_blank";
        buttonVideo.appendChild(imgVideo);
        aVideo.appendChild(buttonVideo);
        divButtons.appendChild(aVideo);
      }
      section.appendChild(divButtons);
      listaCards.appendChild(section);
    });
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

    const hrefLinkBtnVideo = linkBtnVideo.href;

    if(hrefLinkBtnVideo === "http://127.0.0.1:5500/index.html?"){
        linkBtnVideo.style.visibility = "hidden";
        btnVideo.style.visibility = "hidden";
        imgVideo.style.visibility = "hidden";
    }
}


function abreModal(){
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('content');
    modal.style.display = "flex";
    modalContent.style.display = "flex";
}

const btnFechar = document.getElementById('buttonOk');
btnFechar.onclick = fechaModal;
function fechaModal(){
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}