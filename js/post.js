async function feedBtnClick(event) {
  event = event || window.event;
  console.log(event);
  event.preventDefault();
  const feedInput = document.querySelector("#newFeedForm input");
  const feedContent = document.querySelector("#newFeedForm textarea");

  const title = feedInput.value;
  const content = feedContent.value;
  console.log(title, content);
  if (!title) alert("제목을 입력해주세요");
  else if (!content) alert("내용을 입력해주세요");
  else {
    await fetch("api/post", {
      method: "POST",
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

    window.history.back();
  }
}
