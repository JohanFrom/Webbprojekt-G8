//HTML FUNCITONS ETC ETC

//HAMBURGER MENU

const hamburger_menu = document.querySelector(".hamburger-menu");
const container = document.querySelector(".container");

hamburger_menu.addEventListener("click", () => {
  container.classList.toggle("active");
});


//DROPDOWNS

//POKEMON DROPDOWN
function pokemonDropdown() {
  document.getElementById("pokemon-content-list").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
document.getElementById("pokemon-content-list").onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//POKEMON DROPDOWN 2
function pokemonDropdownTwo() {
  document.getElementById("pokemon-content-listTwo").classList.toggle("showTwo");
}

// Close the dropdown if the user clicks outside of it
document.getElementById("pokemon-content-listTwo").onclick = function(event) {
  if (!event.target.matches('.dropbtnTwo')) {
    var dropdowns = document.getElementsByClassName("dropdown-contentTwo");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('showTwo')) {
        openDropdown.classList.remove('showTwo');
      }
    }
  }
}


//LOL DROPDOWN
// LEAUGE OF LEGENDS DROPDOWN - REGIONDROPDOWN
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}