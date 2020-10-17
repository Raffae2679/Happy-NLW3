// Create Map
const map = L.map('mapid').setView([-27.222633,-49.6455874], 15);

// Create and add titleLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);


// Create Icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
   
})

let marker;


// create and add marker
map.on('click', (event) => {

    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;


    // remove last icon
    // Se for verdadeiro (se existir marker) ele executa 
    // o map.removeLayer, senão ele vai pra linha debaixo
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat,lng], { icon })
    .addTo(map)
})



// adicionar o campo de fotos
function addPhotosField(){
    // Pegar o container de fotos #images
    const container = document.querySelector('#images')
    // Pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    // Realizar a duplicação da última imagem adicionada.
    const newFieldContainer = fieldsContainer[fieldsContainer.length-1].cloneNode(true)

    // Verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]

    if(input.value==""){
        return 
    }
    // Limpar o campo antes de adicionar ao container de imagens
    input.value=""

    // Adicionar a duplicação ao container de #images
    container.appendChild(newFieldContainer)
}

function deleteField(event){
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2 ){
        // Limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // Deletar o campo
    span.parentNode.remove();


}

// Select yes or no
function toggleSelect(event){

    // Retirar a class .active dos botões
    document.querySelectorAll('.button-select button')
    .forEach(function(button) {
        button.classList.remove('active')
    })

    // Colocar a classe .active
    const button = event.currentTarget
    button.classList.add('active')

    // Atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')

    input.value = button.dataset.value

   
}


