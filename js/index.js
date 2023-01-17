import { Feeds } from "./Feeds.js";
import { route, handleLocation } from "./router.js";

window.onload = () => {
  const path = window.location.pathname;
  console.log(path);
  if (path == "/hpny/") {
    Feeds();
  }
};

window.onpopstate = back;
function back() {
  handleLocation();
  if (window.location.pathname == "/hpny/") {
    Feeds();
  }
}
window.route = route;

handleLocation();
