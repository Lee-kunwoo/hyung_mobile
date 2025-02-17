 
// 진행률 관련 (PC/모바일 공용 scroll)
document.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  let p1 = document.getElementById("p1");
  let p2 = document.getElementById("p2");
  let p3 = document.getElementById("p3");
  
  let calWidth = (scroll, start, end) => {
    if (scroll < start) return 0;
    if (scroll > end) return 100;
    return ((scroll - start) / (end - start)) * 100;
  };
  
  if(p1) p1.style.width = `${calWidth(scrollY, 482, 595)}%`;
  if(p2) p2.style.width = `${calWidth(scrollY, 596, 709)}%`;
  if(p3) p3.style.width = `${calWidth(scrollY, 710, 832)}%`;

});
console.log(window.scrollY);


/* ========= 동영상 및 배경 변경 ========= */
$(document).ready(function () {
  let hide = true;
  let topPrev = $(window).scrollTop();
  const movieTop = Math.trunc($('#movie').offset().top) - 300;
  
  // PC: wheel 이벤트 처리
  $(window).on('wheel', e => {
    const topNow = $(window).scrollTop();
    const delta = topNow - topPrev;
    if ($(window).scrollTop() > 100 && delta > 0 && hide) {
      $('#bgChange').removeClass('hide');
    }
    if ($(window).scrollTop() > 300 && delta > 0 && hide) {
      $('#movie video').addClass('big');
      hide = false;
    } else if ($(window).scrollTop() <= movieTop && delta < 0 && hide === false) {
      $('#movie video').removeClass('big');
      $('#bgChange').addClass('hide');
      hide = true;
    }
    topPrev = topNow;
  });
  
  // Mobile: 터치 스와이프로 세로 스크롤 효과 모방
  let touchStartY = 0, touchEndY = 0;
  document.addEventListener("touchstart", function (e) {
    touchStartY = e.touches[0].clientY;
  });
  document.addEventListener("touchend", function (e) {
    touchEndY = e.changedTouches[0].clientY;
    let deltaY = touchStartY - touchEndY;
    let currentScroll = $(window).scrollTop();
    if (currentScroll > 100 && deltaY > 30 && hide) {
      $('#bgChange').removeClass('hide');
    }
    if (currentScroll > 300 && deltaY > 30 && hide) {
      $('#movie video').addClass('big');
      hide = false;
    } else if (currentScroll <= movieTop && deltaY < -30 && hide === false) {
      $('#movie video').removeClass('big');
      $('#bgChange').addClass('hide');
      hide = true;
    }
    topPrev = currentScroll;
  });
});


/* ========= our_brand 영역 활성화 ========= */
document.addEventListener('DOMContentLoaded', () => {
  const our_brand = document.getElementById('our_brand');
  let yPrev = window.pageYOffset || document.documentElement.scrollTop;
  
  // PC: scroll 이벤트
  window.addEventListener('scroll', () => {
    const ourBrandTop = our_brand.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    if (ourBrandTop <= viewportHeight && ourBrandTop >= 0) {
      our_brand.querySelector('div').classList.add('active');
    } else {
      our_brand.querySelector('div').classList.remove('active');
    }
  });
  
  // Mobile: 터치 이벤트를 통한 활성화 (터치 후 스크롤 변화 기준)
  document.addEventListener("touchstart", function () {
    yPrev = window.pageYOffset || document.documentElement.scrollTop;
  });
  document.addEventListener("touchend", function () {
    let yCurrent = window.pageYOffset || document.documentElement.scrollTop;
    let deltaY = yCurrent - yPrev;
    if (deltaY > 20 && yCurrent > 200) {
      our_brand.querySelector('div').classList.add('active');
    }
  });
});

// 파트너 로고 자동이동
$(document).ready( ()=> {
    //오른쪽방향 자동이동
    const toRight = () => {
        $('#partner_slide_1').css('transition' , '0.2s');
        $('#partner_slide_1').css('left' , '+=10px');          
        $('#partner_slide_1').position().left >= -250 ? call_2() : null;         
    }
    const call_2 = ()=> {
        $('#partner_slide_1').css('transition' , 'none');
        $('#partner_slide_1').css('left' , '-500px');
        $('#partner_slide_1').prepend( $('#partner_slide_1').children().last() );
    }
    setInterval( toRight , 10);

    //왼쪽방향 자동이동
    const toLeft = () => {
        $('#partner_slide_2').css('transition' , '0.2s');
        $('#partner_slide_2').css('left' , '-=10px');    
        $('#partner_slide_2').position().left <= -500 ? call_3() : null;         
    }
    const call_3 = ()=> {
        $('#partner_slide_2').css('transition' , 'none');
        $('#partner_slide_2').css('left' , '-250px');
        $('#partner_slide_2').append( $('#partner_slide_2').children().first() );
    }
    setInterval( toLeft , 10);


});// js end....................

/* ========= ESG 섹션 전환 (PC: wheel, Mobile: 터치 스와이프) ========= */
const sections = [
  document.querySelector('#esg1st'),
  document.querySelector('#esg2nd'),
  document.querySelector('#esg3rd')
];
const esgContainer = document.querySelector('#esg');
let currentIndex = 0;

// 초기 섹션 위치 설정
sections.forEach(section => {
  section.style.top = '150px';
});

// Intersection Observer를 통해 #esg 영역 감지 (공용)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sections[currentIndex].classList.add('active');
      } else {
        sections.forEach(section => section.classList.remove('active'));
      }
    });
  },
  { threshold: 0.5 }
);
observer.observe(esgContainer);

// Mobile: 터치 스와이프로 ESG 섹션 전환
let esgTouchStartY = 0, esgTouchEndY = 0;
function handleEsgSwipe() {
  const deltaY = esgTouchStartY - esgTouchEndY;
  if (deltaY > 50) { // 위로 스와이프 → 다음 섹션
    if (currentIndex < sections.length - 1) {
      sections[currentIndex].classList.remove('active');
      currentIndex++;
      sections[currentIndex].classList.add('active');
    }
  } else if (deltaY < -50) { // 아래로 스와이프 → 이전 섹션
    if (currentIndex > 0) {
      sections[currentIndex].classList.remove('active');
      currentIndex--;
      sections[currentIndex].classList.add('active');
    }
  }
}
document.addEventListener("touchstart", function (e) {
  esgTouchStartY = e.touches[0].clientY;
});
document.addEventListener("touchend", function (e) {
  esgTouchEndY = e.changedTouches[0].clientY;
  handleEsgSwipe();
});
