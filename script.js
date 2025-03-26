document.addEventListener("DOMContentLoaded", () => {
    const bookmarkInput = document.getElementById("bookmarkInput");
    const addBookmarkBtn = document.getElementById("addBookmarkBtn");
    const bookmarkList = document.getElementById("bookmarkList");

    let bookmarks = [];
    let bookmarksJSON = "";

    function renderBookmarks() {
        bookmarkList.innerHTML = "";
        bookmarks.forEach((bookmark, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
            <button class="edit" data-index="${index}">✎</button>
            <button class="delete" data-index="${index}">X</button>
            `;
        bookmarkList.appendChild(li);
    });

    bookmarksJSON = JSON.stringify(bookmarks);
    console.log("Збережені закладки у JSON:", bookmarksJSON);
}

addBookmarkBtn.addEventListener("click", () => {
    const url = bookmarkInput.value.trim();
    if (url) {
        bookmarks.push({ url });
        bookmarkInput.value = "";
        renderBookmarks();
    }
});

bookmarkList.addEventListener("click", (event) => {
    const index = event.target.dataset.index;
    if (event.target.classList.contains("delete")) {
        bookmarks.splice(index, 1);
        renderBookmarks();
    }
    if (event.target.classList.contains("edit")) {
        const newUrl = prompt("Введіть новий URL", bookmarks[index].url);
        if (newUrl) {
            bookmarks[index].url = newUrl;
            renderBookmarks();
        }
    }
});

    renderBookmarks();
});