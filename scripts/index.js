const main = document.querySelector("main");
const featureButtons = document.querySelectorAll(".feature-button");
let featureIndex = 0;
let featureTimer = undefined;

main.addEventListener("scroll", scrollRender);
featureButtons[0].addEventListener("click", () => {switchFeature(-1);});
featureButtons[1].addEventListener("click", () => {switchFeature(1);});

function switchFeature (change) {
  const featureSlides = document.querySelectorAll(".slide");
  featureIndex = (featureIndex+change+featureSlides.length)%featureSlides.length;
  for (let i=0; i<featureSlides.length; i++) {
    featureSlides[i].style.display = "none";
  }
  featureSlides[featureIndex].style.display = "flex";
}

function resetFeatureTimer () {
  const container = document.querySelector(".outer-slide-wrapper");
  if (container.classList.contains("reveal") && !featureTimer) {
    featureTimer = window.setInterval(() => {
      switchFeature(1);
    },5000);
  }
  else if ((!container.classList.contains("reveal")) && featureTimer) {
    featureIndex = 0;
    switchFeature(0);
    window.clearInterval(featureTimer);
    featureTimer = undefined;
  }
}

function reveal() {
  const reveals = document.querySelectorAll(".hidden");
  for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementBottom = reveals[i].getBoundingClientRect().bottom;
      const elementVisible = 70;
      if ((elementTop < windowHeight - elementVisible) && (elementBottom > elementVisible)) {
        reveals[i].classList.add("reveal");
      } else {
        reveals[i].classList.remove("reveal");
      }
  }
}

function scrollRender () {
  reveal();
  resetFeatureTimer();
}

scrollRender();