// http://www.omdbapi.com/?i=tt3896198&apikey=963dc1e6
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const outPut = document.getElementById("out_put");

let searchvalue = "friends";
let myKey = "963dc1e6";

function getMovies() {
  var getRequest = new XMLHttpRequest();
  getRequest.open(
    "GET",
    `https://www.omdbapi.com/?i=${searchvalue}'&apikey=${myKey}`
  );

  getRequest.responseType = "json";
  getRequest.send();

  getRequest.onload = function () {
    if ((getRequest.status >= 200) & (getRequest.status < 300)) {
      //201 -» 300
      let fMovies = getRequest.response.Search;
      outPut.innerHTML = "";

      if (searchvalue.trim() === "") {
        alert("Please write any name");
        return;
      }
      if (!fMovies || fMovies.length === 0) {
        outPut.innerHTML = "<p>The film is not find.</p>";
        return;
      }
      for (let i = 0; i < 12; i++) {
        let outputCard = document.createElement("div");
        outPut.appendChild(outputCard);
        outputCard.innerHTML = `
    <div class="result">
    <h3>${fMovies[i].Title || "not found"}</h3>
    <p>${fMovies[i].year}</p>
    <p>${fMovies[i].Type}</p>
    <img src="${fMovies[i].Poster}"></img>
    </div>`;
      }
    } else {
      alert("get a request");
    }
  };
}
getMovies();

searchInput.addEventListener('change', (e) => {
  e.preventDefault();
  searchvalue = e.target.value;
});
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  getMovies();
});
