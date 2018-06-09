// function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//   return parent.appendChild(el);
// }


// Get the list where we will place out data
const ul1 = document.getElementById('endangered'); 
// Get all the endangered species
const url = 'http://apiv3.iucnredlist.org/api/v3/species/category/EN?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee';
fetch(url)
  .then(data => {
    // Here you get the data to modify as you please
    data.json().then(res => console.log(res.result))
    })
  .catch(error => {
    console.log(error)
  });   

  const ul2 = document.getElementById('extinct'); 
// Get all the extinct species
const url2 = 'http://apiv3.iucnredlist.org/api/v3/species/category/EX?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee';
fetch(url2)
  .then(data => {
    // Here you get the data to modify as you please
    data.json().then(res => console.log(res.result))
    })
  .catch(error => {
    console.log(error)
  });   

  const ul3 = document.getElementById('countries'); 
  // Get all the species in US
  const url3 = 'http://apiv3.iucnredlist.org/api/v3/country/getspecies/US?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee';
  fetch(url3)
    .then(data => {
      // Here you get the data to modify as you please
      data.json().then(res => console.log(res.result))
      })
    .catch(error => {
      console.log(error)
    });   






//   fetch(url)
//   .then((resp) => resp.json())
//   .then(function(data) {
//     let authors = data.results;
//     return authors.map(function(author) {
//       let li = createNode('li'),
//           img = createNode('img'),
//           span = createNode('span');
//       img.src = author.picture.medium;
//       span.innerHTML = `${author.name.first} ${author.name.last}`;
//       append(li, img);
//       append(li, span);
//       append(ul, li);
//     })
//   })
//   .catch(function(error) {
//     console.log(error);
//   });   