//피드 디테일 페이지
import { route } from "./router.js";
import { Edit } from "./Edit.js";

export function FeedDetail(detailId) {
  async function getmsgSigleData() {
    const response = await fetch(`http://43.201.103.199/post/${detailId}`);
    const detail = await response.json();
    console.log("detail.data.post");
    console.log(detail.data.post);
    return detail.data;
  }
  getmsgSigleData().then((data) => {
    document.getElementById("feedDetail-container").innerHTML = "";

    const feed = data.post;
    const reviews = data.comments;
    const detailElement = document.createElement("article");
    detailElement.classList.add("detail");
    detailElement.innerHTML = `
      <img src=${feed.image}>
      <h3>${feed.title}</h3>
      <p class="date">${feed.createdAt.slice(0, 10)}</p>
      <div class="content">${feed.content}</div>
      <div class="container">    
      <a id="editBtn" href="/Edit"></a>
      <i class="fa-regular fa-pen-to-square"></i>
      <button id="removeBtn" href="/"><i class="fa-regular fa-trash-can"></i></button>
      </div>
      <hr>
      <div id=commentView>
      </div>
      <div class="CommentWrite">
        <input type="text" id="commentInput">
        <button id="commentBtn"><i class="fa-regular fa-paper-plane"></i></button>
      </div>
      `;
    detailElement.querySelector("#removeBtn").onclick = async () => {
      await fetch(`http://43.201.103.199/post/${detailId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      window.history.back();
    };

    detailElement.querySelector("#editBtn").onclick = () => {
      route();
      Edit(detailId);
    };

    detailElement.querySelector("#commentBtn").onclick = () => {
      reviewBtnClick(detailId);
      reviewGet(reviews);
    };

    document.getElementById("feedDetail-container").append(detailElement);
    reviewGet(reviews);
  });
}

//댓글 작성
async function reviewBtnClick(postId) {
  const reviewInput = document.querySelector("#commentInput");

  const content = reviewInput.value;

  console.log(content);

  await fetch(`http://43.201.103.199/comment/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  FeedDetail(postId);
}

//댓글 불러오기 및 삭제

function reviewGet(reviews) {
  const commentContainer = document.getElementById("commentView");
  commentContainer.innerHTML = "";

  reviews.forEach((item) => {
    console.log(item);
    const commentBox = document.createElement("div");
    commentBox.id = `${item.commentId}`;
    commentBox.classList.add("reviewItem");

    commentBox.innerHTML = `
                      <div class="content">${item.content}</div>
                      <div><button class= "reviewDelete" id='${item.commentId}'><i class="fa-solid fa-xmark"></i></button></div>                        
                  `;
    commentBox.querySelector(".reviewDelete").onclick = async () => {
      await fetch(`http://43.201.103.199/comment/${item.commentId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      FeedDetail(item.postId);
    };
    commentContainer.append(commentBox);
  });
}
