import { BandSiteApi } from './band-site-api';

class Comment {
    constructor(nameText, commentText) {
        this.nameText = nameText;
        this.commentText = commentText;
    }
}

let dataArray = [
    new Comment("John", "This is a comment from John."),
    new Comment("Bob", "This is a comment from Bob."),
    new Comment("Ashley", "This is a comment from Ashley."),
];

const form = document.getElementById("commentsForm");

const commentsList = document.getElementsByClassName("comments__list")[0];

const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");

const inputFields = [nameInput, commentInput];

document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = await register();
    const bandSiteApi = new BandSiteApi(apiKey);

    await addPredefinedArraysToList(bandSiteApi);

    form.addEventListener("submit", async function (event) {

        event.preventDefault();
        const newComment = new Comment(nameInput.value, commentInput.value);
        await postComment(bandSiteApi, newComment);
        await addNewComment(newComment);
    });
});

async function register() {
    try {
        const response = await fetch('https://unit-2-project-api-25c1595833b2.herokuapp.com/register');
        const data = await response.json();
        return data.api_key;
    } catch (error) {
        console.error('Error registering with the API:', error);
        throw error;
    }
}

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

    dataArray.push(comment);

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

async function addPredefinedArraysToList(api) {
    try {
        const comments = await api.getComments();
        comments.forEach(comment => {
            addNewComment(comment);
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

async function postComment(api, comment) {
    try {
        const response = await api.postComment(comment);
        console.log('Posted comment:', response);
    } catch (error) {
        console.error('Error posting comment:', error);
    }
}

function clearInputFields(inputs) {
    inputs.forEach(inputField => {
        inputField.value = "";
    });
}
