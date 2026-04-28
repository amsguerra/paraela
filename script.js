gsap.registerPlugin(ScrollTrigger);

const target = document.querySelector(".js-fill > span");

if (target && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.to(target, {
    backgroundSize: "200% 200%",
    ease: "none",
    scrollTrigger: {
      trigger: ".js-fill",
      start: "top 80%",
      end: "bottom 35%",
      scrub: true
    }
  });
}

const cont = document.querySelector(".img-carousel");

if (cont) {
  gsap.to(".img-carousel img", {
    ease: "none",
    x: () => -(cont.scrollWidth - window.innerWidth),
    scrollTrigger: {
      trigger: cont,
      pin: cont,
      start: "center center",
      end: () => "+=" + (cont.scrollWidth - window.innerWidth),
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}