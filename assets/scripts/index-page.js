document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("commentsForm");

    const commentsList = document.getElementsByClassName("comments__list")[0];

    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");

    console.log(commentsList);

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameText = nameInput.value;
        const commentText = commentInput.value;

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
    });
});

function getFormattedTodayDate() {
    const today = new Date();

    // Get the year, month, and day
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();

    // Format the date as MM/DD/YYYY
    const formattedDate = `${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}/${year}`;

    return formattedDate;
}
