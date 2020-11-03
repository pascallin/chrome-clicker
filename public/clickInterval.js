var timer;

function clickInterval(ele, action) {
  if (action === "start") {
    timer = setInterval(function () {
      ele.click();
    }, 1000);
  } else if (action === "stop") {
    clearInterval(timer);
  }
}
