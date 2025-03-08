const inputImagem = document.getElementById('inputImagem');
const botaoEscolherArquivo = document.getElementById('escolherArquivo');
const botaoAdicionarImagem = document.getElementById('adicionarImagem');
const galeria = document.getElementById('galeria');

function adicionarImagemAoDOM(url, id) {
  const divImagem = document.createElement('div');
  divImagem.classList.add('imagem');
  divImagem.setAttribute('data-id', id);

  const img = document.createElement('img');
  img.src = url;

  const botaoRemover = document.createElement('button');
  botaoRemover.classList.add('remover');
  botaoRemover.textContent = 'X';

  botaoRemover.addEventListener('click', () => removerImagem(id));

  divImagem.appendChild(img);
  divImagem.appendChild(botaoRemover);
  galeria.appendChild(divImagem);
}

function adicionarImagemAoLocalStorage(imagemData) {
  let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
  imagens.push(imagemData);
  localStorage.setItem('imagens', JSON.stringify(imagens));
}

function carregarImagensDoLocalStorage() {
  let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
  imagens.forEach(imagem => {
  adicionarImagemAoDOM(imagem.url, imagem.id);
  });
}

function removerImagemDoLocalStorage(id) {
  let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
  imagens = imagens.filter(imagem => imagem.id !== id);
  localStorage.setItem('imagens', JSON.stringify(imagens));
}

function removerImagem(id) {
  const imagemDiv = document.querySelector(`div[data-id='${id}']`);
  if (imagemDiv) {
    galeria.removeChild(imagemDiv);
  }
  removerImagemDoLocalStorage(id);
}

botaoEscolherArquivo.addEventListener('click', () => {
  inputImagem.click();  
});

inputImagem.addEventListener('change', (event) => {
  const arquivo = event.target.files[0];
  if (arquivo) {
    nomeArquivo.textContent = arquivo.name; 
  } else {
    nomeArquivo.textContent = "Nenhum arquivo selecionado";
  }
});

botaoAdicionarImagem.addEventListener('click', () => {
  const arquivo = inputImagem.files[0];
  if (arquivo) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const id = new Date().getTime(); 
      const imagemData = { url: event.target.result, id: id };
      adicionarImagemAoDOM(imagemData.url, imagemData.id);
      adicionarImagemAoLocalStorage(imagemData);
    };
    reader.readAsDataURL(arquivo);
  } else {
    alert("Por favor, escolha um arquivo antes de adicionar.");
  }
});

window.onload = carregarImagensDoLocalStorage;