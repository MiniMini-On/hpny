import { Feeds } from "./Feeds.js";
import { route } from "./router.js";

//피드 수정
export function Edit(detailId) {
  async function geteditData() {
    const response = await fetch(`http://43.201.103.199/post/${detailId}`);
    const detail = await response.json();
    console.log("detail.data.post");
    console.log(detail.data.post);
    return detail.data.post;
  }
  geteditData().then((feed) => {
    const editElement = document.createElement("div");
    editElement.classList.add("editFeedForm");
    editElement.innerHTML = `
            <div class="originalImgBox">
              <img src=${feed.image}>
            </div>
            <div class="inputBox">
              <h2>제목</h2>
              <input type="text" value=${feed.title} placeholder="글 제목을 입력해주세요." >
              <hr />
              <h2>내용</h2>
              <textarea placeholder="글 내용을 입력해주세요.">${feed.content}</textarea>
            </div>
            <a id="edittBtn" href="/">수정하기</a>
        `;
    editElement.querySelector("#edittBtn").onclick = async (event) => {
      event = event || window.event;
      const editInput = document.querySelector(".editFeedForm input");
      const editContent = document.querySelector(".editFeedForm textarea");
      const title = editInput.value;
      const content = editContent.value;
      if (!title) {
        alert("제목을 입력해주세요");
        event.preventDefault();
      } else if (!content) {
        alert("내용을 입력해주세요");
        event.preventDefault();
      } else {
        route().then((res) => Feeds(res));

        await fetch(`api/post/${detailId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: content,
            image: "https://source.unsplash.com/random/360×360",
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    };
    document.getElementById("editContainer").append(editElement);
  });
}
