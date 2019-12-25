const submitButton = document.querySelector(".query-form > button#submit");
const queryField = document.querySelector("input#query");
submitButton.addEventListener("click", () => {
  let formattedQuery = queryField.value.split(' ').join('+');

  fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${formattedQuery}&format=json&origin=*`)
  .then(res => {
    return res.json();
  })
  .then(res => {
    // display the snippets of each article that matched out query
    const matches = document.getElementById("matches");
    //first clear matches for previous query
    while(matches.firstChild) {
      matches.removeChild(matches.firstChild);
    }
    res.query.search.forEach(match => {
      let listElement = document.createElement("li");
      listElement.innerHTML = match.snippet;
      matches.appendChild(listElement);
    })
  })
    .catch(err => {
      // TODO handle error
    });
});
