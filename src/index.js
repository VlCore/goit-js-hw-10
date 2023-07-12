import { CatApiFetch } from './cat-api.js';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SlimSelect from 'slim-select';

const selectEl = document.querySelector('.breed-select')
const descrDiv = document.querySelector('.cat-info')

const catFetcher = new CatApiFetch()

Loading.dots('Wait for kitty ;)', {
    backgroundColor: 'rgba(0,0,0,0.5)',
    svgSize: '200px',
    svgColor: 'purple',
    messageFontSize: '70px',
    messageColor: 'purple',
});
catFetcher
  .fetchEl(`/breeds`)
  .then(addBreeds)
  .catch(handleError)
  .finally(handleFinally)

function addBreeds(breeds) {
  const allBreeds = breeds.map(formatSelectHTML).join('')
  selectEl.insertAdjacentHTML('beforeend', allBreeds)

  selectEl.classList.remove('visually-hidden')

  new SlimSelect({
    select: '#single',
  })
}

selectEl.addEventListener('change', handlSelectedBreed)

function handlSelectedBreed(evt) {
  Loading.dots('Wait for kitty ;)', {
    backgroundColor: 'rgba(0,0,0,0.5)',
    svgSize: '200px',
    svgColor: 'purple',
    messageFontSize: '70px',
    messageColor: 'purple',
})

  descrDiv.innerHTML = ''
  catFetcher
    .fetchEl('/images/search', { breed_ids: evt.target.value })
    .then(renderBreedDescription)
    .catch(handleError)
    .finally(handleFinally)
}

function renderBreedDescription(breed) {
  const breedDescriptionHTML = breed.map(formatBreedDescriptionHTML).join('')
  descrDiv.insertAdjacentHTML('beforeend', breedDescriptionHTML)

  Loading.remove()
}
function showErrorModal() {
  Report.failure(
    'Oopsy!',
    'Something went wrong! Try reloading the page!',
    'Okidoki :('
  );
}

function formatSelectHTML(breed) {
  return `<option value="${breed.id}">${breed.name}</option>`
}

function formatBreedDescriptionHTML(el) {
  const { name, description, temperament } = el.breeds[0]
  return `<div class="picture-container">
      <img class="breed-picture"
        src="${el.url}"
        alt="${name}"
      >
      </div>
      <div class="description-container">
        <h1>${name}</h1>
          <p>${description}</p>
          <p><span class="text-selection">Temperament: </span>${temperament}</p>
      </div>`
    }

  function handleError() {
  selectEl.classList.add('visually-hidden')
  showErrorModal()
}
  function handleFinally() {
  Loading.remove()
}