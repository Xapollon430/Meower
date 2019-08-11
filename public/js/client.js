const form = document.querySelector(".mew-form");
const formSpinner = document.querySelector(".spinner-border");
const mewsDiv = document.querySelector("#mews .mewResults");
const mewSpinner = document.querySelector("#mews .spinner-border");
const previousButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const number = document.querySelector(".number");

getFirstMews();

async function showMews(mews, page) {
  mewsDiv.innerHTML = "";
  mewSpinner.classList.remove("hide");
  mews.forEach(mew => {
    let mewDiv = document.createElement("div");

    mewDiv.innerHTML = `
    <div class="card mb-2">
          <div class="card-body">
             <div> <h5> ${mew.name} </h5>
            <span> ${mew.content} </span>
           </div> 
         </div>
      </div> `;
    mewsDiv.appendChild(mewDiv);
  });
  number.innerHTML = page;
  mewSpinner.classList.add("hide");
}

async function getFirstMews() {
  console.log(number.innerHTML);
  let response = await fetch(
    `http://localhost:3000/v2/mews?type=next&number=${
      number.innerHTML
    }&initialize=true`
  );
  let data = await response.json();
  showMews(data.tenMews, data.page);
}

previousButton.addEventListener("click", async () => {
  let response = await fetch(
    `http://localhost:3000/v2/mews?type=prev&number=${number.innerHTML}`
  );
  let data = await response.json();
  showMews(data.tenMews, data.page);
});

nextButton.addEventListener("click", async () => {
  let response = await fetch(
    `http://localhost:3000/v2/mews?type=next&number=${number.innerHTML}`
  );
  let data = await response.json();
  console.log(data.tenMews, data.page);
  showMews(data.tenMews, data.page);
});

form.addEventListener("submit", async e => {
  e.preventDefault();
  formSpinner.classList.remove("hide");
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const mew = JSON.stringify({
    name,
    content
  });

  let response = await fetch("http://localhost:3000/mews", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: mew // body data type must match "Content-Type" header
  });

  let data = await response.json();
  formSpinner.classList.add("hide");
  getMews();
});
