const form = document.querySelector("#contact-form");

form.addEventListener("submit", function(page) {
page.preventDefault();

form.reset();


const message = document.querySelector("#answer");
message.style.visibility = "visible";

setTimeout(() => {
    message.style.visibility = "hidden";
  }, 3000);
});