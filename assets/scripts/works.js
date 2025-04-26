function switchSelected(element) {
    const selected = document.querySelector(".selected");
    selected.classList.add("box");
    selected.classList.replace("selected", "work");
    element.classList.remove("box");
    element.classList.replace("work", "selected");
};

function watcher() {
    const works = document.querySelectorAll("#work");
    const seeMoreModal = document.querySelectorAll(".see-more");
    const renderingModal = document.querySelector(".rendering-modal");
    const flouted = document.querySelector(".disguise");
    const closeModal = document.querySelector(".close-modal");

    window.addEventListener("resize", function () {
        if (window.innerWidth <= 768) {
            renderingModal.style.display = "none";
            flouted.style.display = "none";
            window.removeEventListener("click", outsideClick);
        }
    });

    if (closeModal && renderingModal) {
        closeModal.addEventListener("click", function() {
            renderingModal.style.display = "none";
            flouted.style.display = "none";
            window.removeEventListener("click", outsideClick);
        });
    };

    seeMoreModal.forEach(element => element.addEventListener("click", async function() {
        const content = await getContent(this.id);
        if (content) {
            document.getElementById("title").textContent = content.title;
            document.getElementById("subTitle").textContent = content.subTitle;
            document.getElementById("content").textContent = content.content;

            renderingModal.style.display = "flex";
            flouted.style.display = "inherit";

            window.addEventListener("click", outsideClick);
        } else {
            console.log("Oups petit probleme on a perdue le contenue");
        };
    }));

    function outsideClick(event) {
        if (!renderingModal.contains(event.target)) {
            renderingModal.style.display = "none";
            flouted.style.display = "none";
            window.removeEventListener("click", outsideClick);
        };
    };
    
    works.forEach(element => element.addEventListener("click", function() {
        const learn = document.querySelectorAll("#learn-card");
        const pro = document.querySelectorAll("#pro-card");

        learn.forEach((element) => {
            element.classList.replace("single", "all");
            element.style.display = "inherit";
        });
        pro.forEach((element) => {
            element.classList.replace("single", "all");
            element.style.display = "inherit";
        });

        switchSelected(this);

        if (this.classList.contains("pro")) {
            pro.forEach((element) => {
                element.classList.replace("all", "single");
            });
            learn.forEach((element) => {
                element.style.display = "none";
            });
        } else if (this.classList.contains("learn")) {
            learn.forEach((element) => {
                element.classList.replace("all", "single");
            });
            pro.forEach((element) => {
                element.style.display = "none";
            });
        };
    }));
};

async function getContent(id) {
    try {
        const response = await fetch("./assets/json/content.json");
        const contents = await response.json();
        return contents.all.find(element => element.id === id);
    } catch (error) {
        console.error("Oups petit probleme on a perdue le contenue", error);
        
        return null;
    };
};

watcher();