const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log('Error', error));
}

fetchData('https://dog.ceo/api/breeds/image/random')
  .then(data => generateImage(data.message))

fetchData('https://dog.ceo/api/breeds/list')
  .then(data => generateOptions(data.message));

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateOptions(data) {
  for (let i = 0; i < data.length; i++) {
    select.innerHTML += `<option value='${data[i]}'>${data[i]}</option>`;
  }
}

function generateImage(data) {
  const html = `<img src='${data}' alt><p>Click to view images of ${select.value}s</p>`;
  card.innerHTML = html;
}

function fetchBreedImage() {
  const breed = select.value;
  const img = card.querySelector('img');
  const p = card.querySelector('p');
  
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => { 
      img.src= data.message;
      img.alt= breed;
      p.textContent = `Click to view more ${breed}s.`;
    });

}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, comment: comment })
  };
  
  fetch('https://jsonplaceholder.typicode.com/comments', config)
    .then(res => res.json())
    .then(data => console.log(data))

}
