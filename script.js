//커서 깜빡임 즉시 실행 함수
(function () {
  const txtEl = document.querySelector('main h4');
  setInterval(function () {
    txtEl.classList.toggle('active');
  }, 500);
})();

//텍스트 작성과 삭제 즉시 실행 함수
(function () {
  //span 요소 노드 가져오기
  const spanEl = document.querySelector('main h4 span');

  //화면에 표시할 문장 배열
  const txtArr = [
    'design values.',
    'design experiences.',
    'love communication.',
    'love growing together.'
  ];

  //배열의 인덱스 초깃값
  let index = 0;

  //화면에 표시할 문장 배열에서 텍스트를 하나 가져온 뒤, 배열로 만들기
  let currentTxt = txtArr[index].split('');

  function writeTxt() {
    spanEl.innerText += currentTxt.shift();
    if (currentTxt.length !== 0) {
      setTimeout(writeTxt, Math.floor(Math.random() * 100));
    } else {
      currentTxt = spanEl.innerText.split('');
      setTimeout(deleteTxt, 3000);
    }
  }
  writeTxt();

  function deleteTxt() {
    currentTxt.pop();
    spanEl.innerText = currentTxt.join('');
    if (currentTxt.length !== 0) {
      setTimeout(deleteTxt, Math.floor(Math.random() * 100));
    } else {
      index = (index + 1) % txtArr.length;
      currentTxt = txtArr[index].split('');
      writeTxt();
    }
  }
})();

//수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제*/
let headerEl = document.querySelector('header');
window.addEventListener('scroll', function () {
  this.requestAnimationFrame(scrollCheck);
});
function scrollCheck() {
  let browerScrollY = window.pageYOffset;
  if (browerScrollY > 0) {
    headerEl.classList.add('active');
  } else {
    headerEl.classList.remove('active');
  }
}

/* 애니메이션 스크롤 이동 */
const animationMove = function (selector) {
  //selector 매개변수로 이동할 대상 요소 노드 가져오기
  const targetEl = document.querySelector(selector);
  //현재 브라우저의 스크롤 정보(y값)
  const browserScrollY = window.pageYOffset;
  //이동할 대상의 위치(y값)
  const targetScrollY = targetEl.getBoundingClientRect().top + browserScrollY;
  //스크롤 이동
  window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
};

//스크롤 이벤트 연결하기
const scrollMoveEl = document.querySelectorAll(
  '[data-animation-scroll="true"]'
);
for (let i = 0; i < scrollMoveEl.length; i++) {
  scrollMoveEl[i].addEventListener('click', function (e) {
    const target = this.dataset.target;
    animationMove(target);
  });
}
