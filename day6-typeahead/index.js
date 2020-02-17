const dataEndpoint = 'https://raw.githubusercontent.com/michalsn/australian-suburbs/master/data/suburbs.json';
const searchInput = document.querySelector('.search');
const resultsList = document.querySelector('.results');
let suburbs = [];

fetch(dataEndpoint)
  .then(data => data.json())
  .then(data => {
      suburbs = Array.from(data.data);
  })
  .catch(error => {
      console.log("There was a problem fetching the data: " + error)
  });

function findMatches(toMatch, suburbs) {
    return suburbs.filter(suburb => {
        const regex = new RegExp(toMatch, 'gi');
        return suburb.suburb.match(regex);
    });
}

function display() {
    if (this.value === '') {
        resultsList.innerHTML = '';
    } else {
        const results = findMatches(this.value, suburbs);

        const htmlToDisplay = results.map(result => {
            const regex = new RegExp(this.value, 'gi');
            let suburbNameHtml = result.suburb.replace(regex, `<span class="highlight">${this.value}</span>`);

            return `
            <li>
                ${suburbNameHtml}, ${result.state_name}
            </li>`
        }).join('');
        resultsList.innerHTML = htmlToDisplay;
    }
}

searchInput.addEventListener('input', display)