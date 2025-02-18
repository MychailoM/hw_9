document.addEventListener('DOMContentLoaded', () => {
    const bookmarkInput = document.getElementById("bookmarkInput");
    const addBookmarkBtn = document.getElementById("addBookmarkBtn");
    const bookmarkList = document.getElementById("bookmarkList");

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    function renderBooksmark() {
        bookmarkList.innerHTML = '';
        bookmarks.forEach((bookmark, index) => {
            const li = document.createElement('li')

            li.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
            <button class="edit" data-index="${index}">✎</button>
            <button class="delete" data-index="${index}">X</button>
            `;
            bookmarkList.appendChild(li);
        })
    }


    addBookmarkBtn.addEventListener('click', () => {
        const url = bookmarkInput.value.trim();
        if (url) {
            bookmarks.push({ url });
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            bookmarkInput.value = '';
            renderBooksmark();
        }
    });

    bookmarkList.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('delete')) {
            bookmarks.splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            renderBooksmark();
        }
        if (event.target.classList.contains('edit')) {
            const newUrl = prompt('введіть новий URL', bookmarks[index].url);
            if (newUrl) {
                bookmarks[index].url = newUrl;
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                renderBooksmark();
            }
        }
    });

    renderBooksmark();

})




function saveData() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

  // Зберігаємо дані в localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
}

// Функція для завантаження даних з localStorage
function loadData() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

  // Якщо дані існують, заповнюємо поля вводу
    if (username) {
    document.getElementById("username").value = username;
    }
    if (password) {
    document.getElementById("password").value = password;
    }
}

// Завантаження даних при відкритті сторінки
window.onload = function () {
    loadData();

  // Додаємо обробник події на кнопку
    document.getElementById("saveBtn").addEventListener("click", saveData);
};