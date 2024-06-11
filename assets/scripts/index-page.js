import { BandSiteApi } from './band-site-api.js';

class Comment {
    constructor(comment, id, likes, name, timestamp) {
        this.comment = comment;
        this.id = id;
        this.likes = likes;
        this.name = name;
        this.timestamp = timestamp;
    }
}

const form = document.getElementById("commentsForm");

const commentsList = document.getElementsByClassName("comments__list")[0];

const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");

const inputFields = [nameInput, commentInput];

document.addEventListener("DOMContentLoaded", async function () {
    let bandSiteApi = new BandSiteApi("");
    bandSiteApi.apiKey = await bandSiteApi.register();

    await addPredefinedArraysToList(bandSiteApi);

    form.addEventListener("submit", async function (event) {

        event.preventDefault();
        const newComment = new Comment(commentInput.value, Math.random() * 1000000, 0, nameInput.value, Date.now());
        await postComment(bandSiteApi, newComment);
        await addNewComment(commentsList, newComment);
    });
});

function addNewComment(commentsList, comment) {

    console.log(comment);

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
    author.textContent = comment.name;

    let date = document.createElement("div");
    date.className = "comment__date";
    date.textContent = getFormattedDate(comment.timestamp);

    let content = document.createElement("div");
    content.className = "comment__content";
    content.textContent = comment.comment;

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

function getFormattedDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();

    const formattedDate = `${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}/${year}`;

    return formattedDate;
}

async function addPredefinedArraysToList(api) {
    try {
        console.log(api);
        const comments = await api.getComments();
        console.log(comments);
        comments.forEach(comment => {
            addNewComment(commentsList, comment);
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

async function postComment(api, comment) {
    try {
        const response = await api.postComment(comment.comment, comment.name);
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
