require("./src/styles/global.css")

exports.onRouteUpdate = (location) => {
  if (location.location.hash) {
    setTimeout(() => {
      document.querySelector(`${location.location.hash}`).scrollIntoView();
    }, 0);
  }
};
