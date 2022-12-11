"use strict"

// burger bar
let navigation=document.getElementById("nav-bar");
let burgerBar=document.getElementById("burger-Bar");

burgerBar.addEventListener("click", function () {
    navigation.classList.toggle("toggle");
    burgerBar.classList.toggle("activeBar");

  });

  // slider
// slider
let data = [
  {
    id: 1,
    imageUrl: "images/s.jpg",
    title: "ატარე შენი თანამგზავრი",
  },
  {
    id: 2,
    imageUrl: "images/slide.jpg",
    title: "მზადდება  სიყვარულით",
  },
  {
    id: 3,
    imageUrl: "images/sl.jpg",
    title: "ატარე ქართული",
  },
  {
    id: 4,
    imageUrl: "images/slider.jpg",
    title: "შეუკვეთეთ ჩვენი ხელით ნაქსოვი სამოსი და გახადეთ ის თქვენი მუდმივი თანამგზავრი",
  },
];

let arrowLeft = document.getElementById("arrow-left");
let arrowRight = document.getElementById("arrow-right");
let sliderCOntent = document.getElementById("slider-content");
let sliderIndex = 0;
let dotItem = document.getElementsByClassName("dot");

//დივის ფუნქცია

function createDivTag() {
  let divTag = document.createElement("div");
  divTag.classList.add("slide");

  return divTag;
}

//სურათის ფუნქცია
function createImgTag(item) {
    let tagImage = document.createElement("img");
    tagImage.setAttribute("src", item.imageUrl);
    tagImage.setAttribute("alt", item.title);
    tagImage.classList.add('img-slider');

  return tagImage;
}

//სათაურის ფუნქცია

function createTitleTag(item) {
  let tagTitle = document.createElement("h3");
  tagTitle.textContent = item.title;

  return tagTitle;
}

//ამ ფუქნიის საშუალებიტ ვქმნი dot-ების ლოგიკას

function createDots() {
  const dotsParent = document.createElement("div");
  dotsParent.classList.add("dotParent");

  data.forEach((element) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-id", element.id - 1);
    dotsParent.appendChild(dot);

    dot.addEventListener("click", function (event) {
      // console.log(event.target);
      let id = event.target.getAttribute("data-id");
      sliderIndex = id;
      slide();
    });
  });

  return dotsParent;
}

function slide() {
  sliderCOntent.innerHTML = " ";
  const slideItem = createDivTag(data[sliderIndex]);
  const imgTag = createImgTag(data[sliderIndex]);
  const titleTag = createTitleTag(data[sliderIndex]);
  const dotsElement = createDots();

  slideItem.appendChild(imgTag);
  slideItem.appendChild(titleTag);
  sliderCOntent.appendChild(slideItem);
  sliderCOntent.appendChild(dotsElement);
  slideItem.appendChild(titleTag);

  dotItem[sliderIndex].classList.add("activeDot");
}

function arrowLeftClick() {
  if (sliderIndex == 0) {
    sliderIndex = data.length - 1;
    slide();
    return;
  }
  sliderIndex--;
  slide();
}

function arrowRightClick() {
  if (sliderIndex == data.length - 1) {
    sliderIndex = 0;
    slide();
    return;
  }
  sliderIndex++;
  slide();
}

arrowLeft.addEventListener("click", arrowLeftClick);
arrowRight.addEventListener("click", arrowRightClick);

// setInterval(() => {
//   arrowRightClick();
// }, 3000);

slide();


//form validation
let registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = {};

  //username
  let usernameValue = document.getElementById("usernameField").value;
  if (usernameValue == " ") {
    errors.username = "მომხმარებლის სახელის ფანჯარა არ უნდა იყოს ცარიელი";
  }

  //password
  let passwordValue = document.getElementById("passwordField").value;
  let passwordValue2 = document.getElementById("passwordFieldRepeat").value;

  if (passwordValue == " ") {
    errors.password = "პაროლის ველი არ უნდა იყოს ცარიელი";
  }
  if (passwordValue != passwordValue2) {
    errors.password2 = "პაროლი არ ემთხვევა";
  }

  //checkbox
  let agreeField = document.getElementById("agreeTerms").checked;

  if (!agreeField) {
    errors.agree = "უნდა დაეთანხმო წესებს და პირობებს";
  }

  console.log(errors);

  document.querySelectorAll(".error-text").forEach((item) => {
    item.innerText = " ";
  });

  for (let key in errors) {
    let spanText = document.getElementById("error_" + key);

    if (spanText) {
      spanText.innerText = errors[key];
    }
  }

  if (Object.keys(errors).length == 0) {
    registrationForm.submit();
  }
});

function emailValidation() {
  let emailFiled = document.getElementById('userEmail').value;
  let spanText = document.getElementById('errors_yourEmail');
  let emailStructure = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 

  if (emailFiled.match(emailStructure)) {
      spanText.innerHTML ='Your Email is valid';
      spanText.style.color = 'green';
  } else {
      spanText.innerHTML = 'Your Email is invalid';
      spanText.style.color = 'red'
  }
}





// scroll
/*

    SMOOTH SCROLL VANILA JS

    1) https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    2) https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect 	
    3) https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp

*/


// select all nav links
const navLinks = document.querySelectorAll("[data-link]");

navLinks.forEach((e) => {

    // add click event on every event
    e.addEventListener('click', function (e) {

        // stop default action
        e.preventDefault();

        // get element id
        let targetLink = e.target.href.split('#')[1];

        // find target element in document
        let target = document.getElementById(targetLink);

        // get top position of the window 
        let startScroll = window.pageYOffset;

        // get top position of the target element
        let endScroll = target.getBoundingClientRect().top;

        // set start time to null
        let startTime = null;


        function scrollAnimation(currentTime) { // currentTime is DOMHighResTimeStamp(3)
            let duration = 1000;

            if (startTime === null) {
                startTime = currentTime;
            }

            let runTime = currentTime - startTime;

            let ease = easeInCubic(runTime, startScroll, endScroll, duration);

            window.scrollTo(0, ease);

            if (runTime < duration) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        // ease function 
        function easeInCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(scrollAnimation);
    })
})

// gallery section
