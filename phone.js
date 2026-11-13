{
    const workSection = document.querySelector("#my-work");

    if (workSection && typeof HTMLDialogElement !== "undefined") {
        const preview = document.createElement("dialog");
        preview.className = "work-lightbox";
        preview.setAttribute("aria-labelledby", "work-lightbox-title");

        preview.innerHTML = `
            <div class="work-lightbox__content">
                <div class="work-lightbox__header">
                    <h2 id="work-lightbox-title">Design preview</h2>
                    <form method="dialog">
                        <button type="submit" autofocus>Close</button>
                    </form>
                </div>
                <img class="work-lightbox__image" alt="">
            </div>
        `;

        document.body.append(preview);

        const previewTitle = preview.querySelector("#work-lightbox-title");
        const previewImage = preview.querySelector(".work-lightbox__image");

        workSection.addEventListener("click", (event) => {
            const link = event.target.closest(
                'article[data-category="design"] a.portfolio-work__preview'
            );

            if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            event.preventDefault();

            const card = link.closest("article");
            const title = card.querySelector("h4").textContent.trim();

            previewTitle.textContent = title;
            previewImage.alt = title;
            previewImage.src = link.href;
            preview.showModal();
        });

        preview.addEventListener("click", (event) => {
            if (event.target === preview) {
                preview.close();
            }
        });

        preview.addEventListener("close", () => {
            previewImage.removeAttribute("src");
        });
    }
}