const form = document.querySelector(".mew-form");
const spinner = document.querySelector(".spinner-border");

form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const mew = {
    name,
    content
  };
  spinner.classList.remove("hide");
});
