import { FeedDetail } from "./FeedDetail.js";
import { route } from "./router.js";

export function Feeds() {
  async function getFeeds() {
    const response = await fetch("api/posts");
    const msg = await response.json();
    console.log(msg.data.posts);
    return msg.data.posts;
  }
  getFeeds().then((msg) => {
    const mainElement = document.createElement("main");
    mainElement.classList.add("msg");

    mainElement.innerHTML = `<ul class="msgList"></ul>`;
    const msgList = mainElement.querySelector(".msgList");
    msg = msg.slice().reverse();
    msg.forEach((item) => {
      console.log(item);
      const msgDetailList = document.createElement("li");
      msgDetailList.id = `${item.postId}`;

      msgDetailList.innerHTML = `
        <a class="msg-link" href = '/detail#${item.postId}'>                        
        </a>
        <div class="msg-item">
          <div class="msg-img">
              <img src="${item.image}">
          </div>
          <div class="msg-text">
            <h3 class="msg-title">${item.title}</h3>
            <p class="msg-content">${item.content}</p>
          </div>
        </div>
        `;
      msgDetailList.onclick = () => {
        const detailId = item.postId;
        console.log(detailId);
        route();
        FeedDetail(detailId);
      };
      msgList.append(msgDetailList);
    });

    document.getElementById("feedBox").append(mainElement);
  });
}
