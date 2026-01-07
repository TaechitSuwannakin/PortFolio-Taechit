// script.js

// 1. แก้เรื่อง Scroll (ให้กลับมาบนสุดทุกครั้งที่รีเฟรช)
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.onload = function() {
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {

    // --- ส่วนที่ 1: จัดการเมนูมือถือ ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
        // กดลิงก์แล้วหุบเมนู
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }

    // --- ส่วนที่ 2: Animation (ค่อยๆ โผล่) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));


    // --- ส่วนที่ 3 (พระเอกของเรา): สั่งให้เลื่อนช้าๆ ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                smoothScroll(targetElement,1000); 
            }
        });
    });

});

// ฟังก์ชันคำนวณคณิตศาสตร์เพื่อเลื่อนหน้าจอ (ไม่ต้องแก้ตรงนี้)
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80; // ลบ 80 คือเผื่อที่ให้ Navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // สูตร Easing (ทำให้เริ่มช้า-ตรงกลางเร็ว-ตอนจบช้า) ดูสมูท
        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        window.scrollTo(0, ease(timeElapsed, startPosition, distance, duration));

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}