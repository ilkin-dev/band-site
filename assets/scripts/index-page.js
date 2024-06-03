class Comment {
    constructor(nameText, commentText) {
        this.nameText = nameText;
        this.commentText = commentText;
    }
}

const dataArray = [
    new Comment("John", "This is a comment from John."),
    new Comment("Bob", "This is a comment from Bob."),
    new Comment("Ashley", "This is a comment from Ashley."),
];

const form = document.getElementById("commentsForm");

const commentsList = document.getElementsByClassName("comments__list")[0];

const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");

const inputFields = [nameInput, commentInput];

document.addEventListener("DOMContentLoaded", function () {

    addPredefinedArraysToList();

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let newComment = new Comment(nameInput.value, commentInput.value);

        addNewComment(commentsList, newComment);
    });
});

function addNewComment(commentsList, comment) {

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
    author.textContent = comment.nameText;

    let date = document.createElement("div");
    date.className = "comment__date";
    date.textContent = getFormattedTodayDate();

    let content = document.createElement("div");
    content.className = "comment__content";
    content.textContent = comment.commentText;

    commentsList.append(newCommentContainer);
    newCommentContainer.append(divider);
    newCommentContainer.append(commentComponent);
    commentComponent.append(avatar);
    commentComponent.append(details);
    details.append(authorAndDateContainer);
    details.append(content);
    authorAndDateContainer.append(author);
    authorAndDateContainer.append(date);

    clearInputFields(inputFields);
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
    dataArray.forEach(comment => {
        addNewComment(commentsList, comment);
    })
}

function clearInputFields(inputs) {
    inputs.forEach(inputField => {
        inputField.value = "";
    });
}


