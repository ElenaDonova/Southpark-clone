const addCommentButton = document.querySelector(".add-comment");
const table = document.querySelector(".add-comment-table");

addCommentButton.addEventListener("click", () => {
  table.style.display = "block";
  addCommentButton.style.display = "none";
});

let comments = [];

const submitCommentButton = document.querySelector("#add-comment-submit");
submitCommentButton.addEventListener("click", () => {
  let commentName = document.querySelector(".add-comment-area-name");
  let commentBody = document.querySelector("#add-comment-area-comment");

  let comment = {
    name: commentName.value,
    body: commentBody.value,
    time: Math.floor(Date.now() / 1000),
  };
  commentName.value = "";
  commentBody.value = "";
  comments.push(comment);
  saveComments();
  showComments();
});

const saveComments = () => {
  localStorage.setItem("comments", JSON.stringify(comments));
};

let loadComments = () => {
  if (localStorage.getItem("comments"))
    comments = JSON.parse(localStorage.getItem("comments"));
  showComments();
};

const showComments = () => {
  let commentArea = document.querySelector(".comment-area");
  let out = "";
  comments.forEach((item) => {
    out = `
          <table class="comment-area-comment-table">
            <tbody>
              <tr>
                <td rowspan="3" class="comment-area-avatar">
                  <img class="avatar" src="avatar.png" alt="">
                </td>
                <td class="comment-area-title">
                  <div class="comment-area-title-wrapper">
                    <div class="comment-area-title-wrap">
                      <div class="comment-area-name">${item.name} 
                      <span class="comment-area-name-writes">пишет</span>
                    </div>
                      <span class="comment-area-votes">0</span>
                    </div>
                      <div class="comment-area-date">${timeConverter(
                        item.time
                      )}</div>
                  </div>
                </td>
              </tr>
              <tr class="comment-area-comment-content">
                <td class="comment-area-comment-message">${item.body}</td>
              </tr>
              <tr>
                <td class="comment-area-comment-answwer"></td>
              </tr>
            </tbody>
          </table>
        `;
  });
  commentArea.innerHTML += out;
};

const timeConverter = (UNIX_timestamp) => {
  let a = new Date(UNIX_timestamp * 1000);
  let s = new Date();
  let hour = a.getHours();
  let min = a.getMinutes();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (min < 10) {
    min = "0" + min;
  }
  let time =
    s.toLocaleDateString("pt-PT").replace("/", ".").replace("/", ".") +
    " " +
    hour +
    ":" +
    min;
  return time;
};

let burger = document.querySelector(".burger-menu");
let accordion = document.querySelector(".description-more-episodes");

burger.addEventListener("click", () => {
  accordion.classList.toggle("active");
});
