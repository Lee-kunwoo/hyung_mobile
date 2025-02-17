// 모달박스
document.addEventListener("DOMContentLoaded", function () {
  const xiBars = document.querySelector(".sandwich");
  const menuModal = document.querySelector(".menuModal");
  const xiClose = document.querySelector(".xi-close");

  xiBars.addEventListener("click", () => {
    menuModal.classList.add("on");
  });

  xiClose.addEventListener("click", () => {
    menuModal.classList.remove("on");
  });

  // 아코디언 메뉴 스크립트
  const accordionLinks = document.querySelectorAll(".modalMenu > li > a");
  accordionLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const parentLi = link.parentElement;
      parentLi.classList.toggle("active");
    });
  });
});