  const progressBar = document.querySelector(".scroll-progress");
const revealElements = document.querySelectorAll("[data-reveal]");

let lastScrollY = window.scrollY;
let scrollingUp = false;
let framePending = false;

// Hide missing images so the text and portrait letter can show.
document.querySelectorAll(".brand img, .portrait-art img").forEach((image) => {
    const removeMissingImage = () => image.remove();

    image.addEventListener("error", removeMissingImage, { once: true });

    if (image.complete && image.naturalWidth === 0) {
        removeMissingImage();
    }
});

function updateProgress() {
    const page = document.documentElement;
    const scrollDistance = page.scrollHeight - page.clientHeight;
    const progress = scrollDistance > 0 ? window.scrollY / scrollDistance : 0;
    const boundedProgress = Math.min(1, Math.max(0, progress));

    progressBar.style.transform = `scaleX(${boundedProgress})`;
    framePending = false;
}

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY !== lastScrollY) {
        scrollingUp = currentScrollY < lastScrollY;
        lastScrollY = currentScrollY;
    }

    if (!framePending) {
        framePending = true;
        requestAnimationFrame(updateProgress);
    }
}, { passive: true });

window.addEventListener("resize", updateProgress);
updateProgress();

// Reset the animation offscreen so it plays again when you scroll back.
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const element = entry.target;

            if (!entry.isIntersecting) {
                element.classList.remove("is-revealing");
                return;
            }

            const offset = scrollingUp ? "-28px" : "28px";
            element.style.setProperty("--reveal-offset", offset);
            element.classList.add("is-revealing");
        });
    });

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}


// (() => {
//     const showcase = document.querySelector(".project-showcase");
//     const screen = document.querySelector("#showcase-screen");

//     if (!showcase || !screen) return;

//     const buttons = showcase.querySelectorAll("[data-project]");

//     buttons.forEach((button) => {
//       button.addEventListener("click", () => {
//         screen.src = button.dataset.project;
//         screen.title = `${button.textContent.trim()} live preview`;

//         buttons.forEach((choice) => {
//           choice.setAttribute("aria-pressed", String(choice === button));
//         });
//       });
//     });
//   })();

const workShowcase = document.querySelector(".work-showcase");

if (workShowcase) {
    const projects = {
        klib: {
            title: "K-Lib",
            story: "K-Lib is one of my practice web ",
            goal: "I did this by sketching the webstie and got to programming the web and giving it animations best viewed on desktop",
            demo: "./CAMP%20CODE/k-lib.html",
            source: ""
        },
        estate: {
            title: "Estate Website",
            story: "A real estate website",
            goal: "Help visitors browse properties and send an enquiry. Is not responsive and did it for fun",
            demo: "./CAMP%20CODE/estate.html",
            source: ""
        },
        health: {
            title: "Health Website",
            story: "A healthcare website that introduces available services and contact information.",
            goal: "Just HTML and CSS not responsive just did it for fun",
            demo: "./CAMP%20CODE/project1.html",
            source: ""
        },
        about: {
            title: "First Rough Work",
            story: "I did this using an inspo online",
            goal: "Just HTML and CSS not responsive",
            demo: "./CAMP%20CODE/about.html",
            source: ""
        },
        first: {
            title: "My First work",
            story: "Just my first website i did it while watching the tutorial and following up",
            goal: "Just HTML and CSS not responsive",
            demo: "./CAMP%20CODE/index.html",
            source: ""
        }
    };

    const buttons = workShowcase.querySelectorAll(".work-tabs [data-project]");
    const title = workShowcase.querySelector("#work-title");
    const story = workShowcase.querySelector("#work-story");
    const goal = workShowcase.querySelector("#work-goal");
    const preview = workShowcase.querySelector("#work-preview");
    const demo = workShowcase.querySelector("#work-demo");
    const source = workShowcase.querySelector("#work-source");

    function showProject(selectedButton) {
        const project = projects[selectedButton.dataset.project];

        buttons.forEach((button) => {
            button.setAttribute("aria-pressed", String(button === selectedButton));
        });

        title.textContent = project.title;
        story.textContent = project.story;
        goal.textContent = project.goal;

        preview.title = `Interactive preview of ${project.title}`;

        if (preview.getAttribute("src") !== project.demo) {
            preview.src = project.demo;
        }

        demo.href = project.demo;

        if (project.source) {
            source.href = project.source;
            source.hidden = false;
        } else {
            source.hidden = true;
            source.removeAttribute("href");
        }
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => showProject(button));
    });
}
