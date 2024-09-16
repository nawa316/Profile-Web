function showNav() {
  if (document.getElementById("navigator").style.display == "none") {
    document.getElementById("navigator").style.display = "flex";
    document.getElementById("button-menu").style.backgroundColor = "#808080";
  } else {
    document.getElementById("navigator").style.display = "none";
    document.getElementById("button-menu").style.backgroundColor = "white";
  }
}


