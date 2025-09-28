document.addEventListener('DOMContentLoaded', () => {
    // 버튼 클릭 시 알림창 띄우기
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('이 기능은 아직 개발 중입니다. 곧 만나보실 수 있습니다!');
        });
    });

    // 스크롤 이벤트에 따라 요소 나타나게 하기 (예시)
    const features = document.querySelectorAll('.feature-item');
    const observerOptions = {
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(feature);
    });
});
