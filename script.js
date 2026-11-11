document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const shortcutCards = document.querySelectorAll('.shortcut-card');
  const navBar = document.querySelector('.nav-bar');

  // URL 여부를 판별하는 함수
  function isUrl(text) {
    // http:// 또는 https://로 시작하거나, 도메인 형태(example.com)를 띤 경우
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i;
    return urlPattern.test(text);
  }

  // 1. 엔터 키 입력 시 이동 또는 검색 실행
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (!query) return;

      if (isUrl(query)) {
        // http://나 https://가 없으면 붙여서 브라우저 주소로 이동
        const targetUrl = /^https?:\/\//i.test(query) ? query : `https://${query}`;
        window.open(targetUrl, '_blank');
      } else {
        // 일반 검색어는 구글 검색 실행
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      }
    }
  });

  // 2. ESC 키 입력 시 검색창 비우기 및 포커스 해제
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchInput.blur();
    }
  });

  // 3. 바로가기 카드 클릭 마이크로 인터랙션 (CSS 클래스로 관리 권장)
  shortcutCards.forEach(card => {
    card.addEventListener('mousedown', () => {
      card.classList.add('active');
    });

    card.addEventListener('mouseup', () => {
      card.classList.remove('active');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('active');
    });
  });

  // 4. 스크롤 위치에 따른 네비게이션 바 스타일 변경
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navBar.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
      navBar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
      navBar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      navBar.style.borderBottom = 'none';
    }
  });
});