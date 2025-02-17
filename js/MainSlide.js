// 슬라이드 요소들을 모두 선택
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const totalSlides = slides.length;
const slideInterval = 3000; // 3초마다 전환

// 현재 인덱스의 슬라이드를 보이도록 active 클래스 토글
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

// 다음 슬라이드로 전환
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// 3초마다 슬라이드 전환
setInterval(nextSlide, slideInterval);