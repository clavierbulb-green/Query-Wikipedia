const submitButton = document.querySelector(".query-form > button#submit");
const queryField = document.querySelector("input#query");
const matches = document.getElementById("matches");

submitButton.addEventListener("click", async () => {
  const snippets = [];
  try {
    const data = await queryWikipedia(queryField.value)
    if (data) {
      data.query.search.forEach(match => {
        snippets.push(match.snippet);
      })
    }
  } 
  catch(e) {
    console.log(e);
  }
  finally {
    updateList(matches, snippets);
  }
})

function updateList(list, items) {
  /* updates a given DOM element list with <li> for each item in items */

  // first clear list
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // append each item as a list item to the list
  items.forEach(item => {
    let listElement = document.createElement("li");
    listElement.innerHTML = item;
    list.appendChild(listElement);
  });
}

async function queryWikipedia(query) {
  /* return JSON data for Wikipedia articles matching a given search query */
  let formattedQuery = query.split(' ').join('+');

  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${formattedQuery}&format=json&origin=*`)

    return await response.json()
  }
  catch (e) {
    console.log(e);
  }
};
