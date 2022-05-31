"use strict";
const prevBtn = document.getElementById('prev');
const mainImg = document.querySelector("#carousel .carousel_wrapper .currentImg");
const nextBtn = document.getElementById('next');
const lightbox = document.querySelector('#carousel .lightBox');
const controls = document.querySelector('#carousel .carousel_controls');
const counter = document.querySelector("#carousel .carousel_controls .carousel_counter");
const thumbSection = document.querySelector("#carousel .carousel_thumbnails");
const pauseBtn = document.querySelector("#carousel .carousel_controls .carousel_controls_buttons .pause");
const playBtn = document.querySelector("#carousel .carousel_controls .carousel_controls_buttons .play");
const images = [
    './lib/bilder/italy.jpg',
    './lib/bilder/spain.jpg',
    './lib/bilder/england.jpg',
    './lib/bilder/frankreich.jpg',
    './lib/bilder/belgium.jpg',
    './lib/bilder/portugal.jpg'
];

let currentIndex = 0;
let timer = null;

function startCarousel(images) {

    registerEventListeners();
    playAuto();
    updateCarousel(images[currentIndex]);
    createThumbnails();


    mainImg.addEventListener('click', () => {

        stop();

        lightbox.classList.add('live');
        document.body.style.overflowY = 'hidden';


        const imgLB = document.createElement('img');

        imgLB.classList.add('img_lightbox');

        imgLB.setAttribute('src', mainImg.src)


        if (imgLB.src !== mainImg.src) {
            lightbox.removeChild(imgLB)
        }
        lightbox.appendChild(counter);
        lightbox.appendChild(imgLB)


        const closeLBbtn = document.createElement('button');
        closeLBbtn.setAttribute('id', 'closeLightBox');
        lightbox.append(closeLBbtn);

        //lightbox.append(imgLB);

        function closeLightBox() {
            lightbox.classList.remove('live');
            lightbox.removeChild(closeLBbtn)
            lightbox.removeChild(imgLB)
            lightbox.removeChild(counter);

            controls.prepend(counter);

            document.body.style.overflowY = 'auto';
        }

        closeLBbtn.addEventListener('click', closeLightBox);

    });

    function registerEventListeners() {
        prevBtn.addEventListener("click", () => {
            move("prev");
            stop();
            playAuto();
        })
        nextBtn.addEventListener("click", () => {
            move("next");
            stop();
            playAuto();
        })
        pauseBtn.addEventListener("click", stop);
        playBtn.addEventListener("click", playAuto);
    }

    function playAuto() {
        stop()
        timer = setInterval(move, 2500);
        pauseBtn.classList.remove("hidden");
        playBtn.classList.add("hidden");

    }

    function stop() {
        clearInterval(timer)
        pauseBtn.classList.add("hidden");
        playBtn.classList.remove("hidden");
    }

    function createThumbnails() {
        images.forEach((img, index) => {
            const thumbnail = document.createElement("img");
            thumbnail.classList.add("thumbnail");

            if (index === currentIndex) {
                thumbnail.classList.add('active');
            }

            thumbnail.setAttribute('src', img);
            thumbnail.addEventListener("click", () => {
                stop()
                playAuto()
                moveTo(index);
            })

            thumbSection.appendChild(thumbnail);
        })

    }

    function move(direction = "next") {
        if (direction === "prev") {
            currentIndex -= 1;
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
        } else {
            currentIndex += 1;
            if (currentIndex > images.length - 1) {
                currentIndex = 0;
            }
        }
        updateCarousel(images[currentIndex]);
    }

    function moveTo(goToIndex) {
        currentIndex = goToIndex;
        updateCarousel(images[currentIndex]);
    }

    function updateCarousel(imageSrc) {
        mainImg.setAttribute("src", imageSrc);
        const currentThumbnail = document.querySelectorAll('.thumbnail');

        currentThumbnail.forEach((thumb, index) => {
            thumb.classList.remove('active');
            if (index === currentIndex) {
                thumb.classList.add('active');

            }
        })

        const lands = [
            '<a href="#">Italien</a>',
            '<a href="#">Spanien</a>',
            '<a href="#">Groß Britannien</a>',
            '<a href="#">Frankreich</a>',
            '<a href="#">Belgium</a>',
            '<a href="#">Portugal</a>',
        ]



        counter.innerHTML = `${lands[currentIndex]}`


        //counter.innerText = `${currentIndex+1} | ${images.length}`;
    }

}

startCarousel(images);