export const route = (event) => {
  console.log("click");
  event = event || window.event;
  console.log(event);
  event.preventDefault();
  window.history.pushState({}, "", event.target.href); //페이지 이동없이 주소만 바꿔줌, (브라우저 이동시 넘겨줄 데이터, 변경할 브라우저 제목, 변경할 주소 )
  console.log(window.history);
  return handleLocation();
};

export const routes = {
  404: "./pages/404.html",
  "/": "./pages/index.html",
  "/post": "./pages/post.html",
  "/edit": "./pages/edit.html",
  "/detail": "./pages/detail.html",
};

export const handleLocation = async () => {
  const path = window.location.pathname;
  console.log(path);
  const route = routes[path] || routes[404];

  const html = await fetch(route).then((data) => data.text());
  return (document.getElementById("main-page").innerHTML = html);
};
