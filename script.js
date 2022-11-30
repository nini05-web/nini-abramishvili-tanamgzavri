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
    title: "slider title 1",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1528465424850-54d22f092f9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHw%3D&w=1000&q=80",
    title: "slider title 2",
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?cs=srgb&dl=pexels-pixabay-268941.jpg&fm=jpg",
    title: "slider title 3",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1528465424850-54d22f092f9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHw%3D&w=1000&q=80",
    title: "slider title 4",
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
  DivTag.appendChild(tagTitle);

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

// Put all links in a variable
const links = document.querySelectorAll('.js-scroll');

// Add event listener to all links
links.forEach(function (elem) {
    elem.addEventListener('click', smoothScroll)
});

// Magic function to scroll smooth!
function smoothScroll(e) {
    // Prevent default anchor behaviour
    e.preventDefault();

    // Get clicked links href attribute
    const link = this.getAttribute("href");

    // Get the targets position
    const offsetTop = document.querySelector(link).offsetTop;

    // Finally scroll to target
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}

