const dataArray = [
    { nameText: "John", commentText: "This is a comment from John." },
    { nameText: "Alice", commentText: "This is a comment from Alice." },
    { nameText: "Bob", commentText: "This is a comment from Bob." }
];

const form = document.getElementById("commentsForm");

const commentsList = document.getElementsByClassName("comments__list")[0];

const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");

document.addEventListener("DOMContentLoaded", function () {

    addPredefinedArraysToList();

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        addNewComment(commentsList, nameInput.value, commentInput.value);
    });
});

function addNewComment(commentsList, nameText, commentText) {

    let newCommentContainer = document.createElement("div");
    newCommentContainer.className = "comment__container";

    let divider = document.createElement("div");
    divider.className = "divider";

    let commentComponent = document.createElement("div");
    commentComponent.className = "comment commentComponent";

    let avatar = document.createElement("div");
    avatar.className = "comment__avatar";

    let details = document.createElement("div");
    details.className = "comment__details";

    let authorAndDateContainer = document.createElement("div");
    authorAndDateContainer.className = "comment__authorAndDateContainer";

    let author = document.createElement("div");
    author.className = "comment__author";
    author.textContent = nameText;

    let date = document.createElement("div");
    date.className = "comment__date";
    date.textContent = getFormattedTodayDate();

    let content = document.createElement("div");
    content.className = "comment__content";
    content.textContent = commentText;

    commentsList.append(newCommentContainer);
    newCommentContainer.append(divider);
    newCommentContainer.append(commentComponent);
    commentComponent.append(avatar);
    commentComponent.append(details);
    details.append(authorAndDateContainer);
    details.append(content);
    authorAndDateContainer.append(author);
    authorAndDateContainer.append(date);

    nameInput.value = "";
    commentInput.value = "";
}

function getFormattedTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattedDate = `${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}/${year}`;

    return formattedDate;
}

function addPredefinedArraysToList() {
    dataArray.forEach(element => {
        addNewComment(commentsList, element.nameText, element.commentText);
    })
}
