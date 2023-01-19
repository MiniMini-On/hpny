import { Feeds } from "./Feeds.js";
import { route, handleLocation } from "./router.js";
import { FeedDetail } from "./FeedDetail.js";
import { Edit } from "./Edit.js";

window.onload = () => {
  const path = window.location.pathname;
  console.log(path);
  if (path == "/") {
    route().then((res) => Feeds(res));
  } else if (path == "/detail") {
    console.log(location.hash);
    let hash = location.hash.slice(1);
    console.log(hash);
    route().then((res) => FeedDetail(hash, res));
  } else if (path == "/edit") {
    console.log(location.hash);
    let hash = location.hash.slice(1);
    console.log(hash);
    route().then((res) => Edit(hash, res));
  }
};

window.onpopstate = () => {
  const path = window.location.pathname;
  console.log(path);
  if (path == "/") {
    handleLocation().then((res) => Feeds(res));
  } else if (path == "/detail") {
    console.log(location.hash);
    let hash = location.hash.slice(1);
    console.log(hash);
    handleLocation().then((res) => FeedDetail(hash, res));
  } else if (path == "/edit") {
    console.log(location.hash);
    let hash = location.hash.slice(1);
    console.log(hash);
    handleLocation().then((res) => Edit(hash, res));
  }
};

window.route = route;

handleLocation();
