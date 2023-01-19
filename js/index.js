import { Feeds } from "./Feeds.js";
import { route, handleLocation } from "./router.js";
import { FeedDetail } from "./FeedDetail.js";
import { Edit } from "./Edit.js";

window.onload = () => {
  const path = window.location.pathname;
  console.log(path);
  if (path == "/") {
    Feeds();
  } else if (path == "/detail") {
    console.log(location.hash);
    let hash = location.hash.slice(1);
    console.log(hash);
    FeedDetail(hash);
  } else if (path == "/edit") {
    console.log(location.hash);
    let hash = location.hash.slice(1);
    console.log(hash);
    Edit(hash);
  }
};

window.onpopstate = back;
function back() {
  handleLocation();
  const path = window.location.pathname;
  if (path == "/") {
    Feeds();
  } else if (path == "/detail") {
    console.log(location.hash);
    let hash = location.hash.slice(1);
    console.log(hash);
    FeedDetail(hash);
  } else if (path == "/edit") {
    console.log(location.hash);
    let hash = location.hash.slice(1);
    console.log(hash);
    Edit(hash);
  }
}
window.route = route;

handleLocation();
