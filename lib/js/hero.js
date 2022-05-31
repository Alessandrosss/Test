(() => {
    const path = document.querySelectorAll("main .logo-container svg path");
    
    anime({
        targets: path,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1500,
        delay: function (el, i) {
            return i * 250;
        },
        direction: "alternate",
        loop: false,
        onComplete: anim2(),
    });
    
    function anim2() {
        const banner = document.querySelector(".hero-animation");
        const container = document.querySelector("#hero-container .container");
        const earth = document.querySelector(".circle");
      
  
      const timeLine = gsap.timeline();
  
      timeLine.fromTo(
        banner,
        {
          visibility: "hidden",
        },
        {
          visibility: "visible",
          zIndex: "9",
        },
        "+=2"
      );
      timeLine.from(
        container,
        1,
        {
          x: -150,
          opacity: 0
        }
        );
  
      timeLine.from(
        earth,
        0.8,
        { scale: 3, ease: Bounce.easeOut, y: 50, opacity: 0 },
        "-=0.5"
      );
    }
  
    const btn = document.querySelector(".btn-hero")
    const timeLine = gsap.timeline();
    earth.addEventListener("mouseover", ()=>{
      timeLine.to(earth, 0.4, {scale:2})
    })
    earth.addEventListener("mouseout", ()=>{
  
      timeLine.to(earth, 0.4, {scale:1})
    })
  })();
  