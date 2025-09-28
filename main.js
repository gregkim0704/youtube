// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 스크롤 애니메이션 설정
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // 모든 scroll-reveal 요소에 observer 적용
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // 부드러운 스크롤 기능
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 헤더 스크롤 효과
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // 통계 카운터 애니메이션
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        updateCounter();
    }

    // 통계 섹션이 보일 때 카운터 애니메이션 실행
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item h3');
                statItems.forEach((item, index) => {
                    const text = item.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    if (number) {
                        setTimeout(() => {
                            animateCounter(item, number);
                        }, index * 200);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // 모바일 메뉴 토글 (필요시 확장 가능)
    function createMobileMenu() {
        const header = document.querySelector('.header');
        const navContainer = document.querySelector('.nav-container');
        
        // 햄버거 메뉴 버튼 생성
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        `;

        // 모바일에서만 표시
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        function handleMobileMenu(e) {
            if (e.matches) {
                mobileMenuBtn.style.display = 'block';
                navContainer.appendChild(mobileMenuBtn);
            } else {
                mobileMenuBtn.style.display = 'none';
            }
        }

        mediaQuery.addListener(handleMobileMenu);
        handleMobileMenu(mediaQuery);
    }

    // 모바일 메뉴 초기화
    createMobileMenu();

    // 페이지 로드 완료 후 초기 애니메이션
    window.addEventListener('load', () => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }
    });

    // 스크롤 진행률 표시 (선택사항)
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ff6b6b, #ffd700);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 스크롤 진행률 바 생성
    createScrollProgress();

    // 폼 검증 (연락처 폼이 있을 경우)
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 간단한 폼 검증 로직
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // 성공 메시지 표시
                alert('문의가 성공적으로 전송되었습니다!');
                form.reset();
            } else {
                alert('모든 필수 항목을 입력해주세요.');
            }
        });
    });

    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        // ESC 키로 모달 닫기 등의 기능 추가 가능
        if (e.key === 'Escape') {
            // 모달이나 팝업이 있다면 닫기
        }
    });

    console.log('🚀 유튜브 쇼츠 랜딩페이지가 성공적으로 로드되었습니다!');
});
