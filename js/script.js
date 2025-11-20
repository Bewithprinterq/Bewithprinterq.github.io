// Function สำหรับจัดการ Contact Modal
function setupContactModal() {
    const contactMenu = document.getElementById('contact-menu');
    const contactModal = document.getElementById('contact-modal');
    
    if (contactMenu && contactModal) {
        // เปิด/ปิด Modal เมื่อคลิกปุ่ม Contact
        contactMenu.addEventListener('click', (e) => {
            e.preventDefault(); 
            contactModal.classList.toggle('active');
        });

        // ปิด Modal เมื่อคลิกนอกพื้นที่
        document.addEventListener('click', (e) => {
            const isClickInsideModal = contactModal.contains(e.target);
            const isClickOnMenu = contactMenu.contains(e.target);

            // ถ้า Modal เปิดอยู่ และไม่ได้คลิกที่ Modal หรือปุ่ม Contact
            if (contactModal.classList.contains('active') && !isClickInsideModal && !isClickOnMenu) {
                 contactModal.classList.remove('active');
            }
        });
    }
}

// Function สำหรับจัดการ Hamburger Menu (ใช้โค้ดเดิม)
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('is-active');
            
            // ปิด Contact Modal ด้วย เมื่อเปิด/ปิด Hamburger
            document.getElementById('contact-modal').classList.remove('active');
        });

        // หากมีการคลิกที่ลิงก์ในเมนู Mobile ให้ปิดเมนูอัตโนมัติ
        navLinks.querySelectorAll('a').forEach(link => {
            // ไม่ต้องปิด Hamburger เมื่อกด Contact เพราะมันจะจัดการ Modal แทน
            if (link.id !== 'contact-menu') {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburgerBtn.classList.remove('is-active');
                });
            }
        });
    }
}

// Function สำหรับ Animation: Fade in Elements (ใช้โค้ดเดิม)
function setupAnimations() {
    document.querySelectorAll('.animate-on-load').forEach(el => {
        el.classList.add('fade-in');
    });
}

// Function สำหรับจัดการ Image Slider (Carousel)
function setupImageSliders() {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        const images = item.querySelectorAll('.slider-image');
        const buttons = item.querySelectorAll('.slider-btn');
        let currentIndex = 0;

        // ฟังก์ชันแสดงรูปภาพตาม Index
        const updateSlider = (index) => {
            images.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
        };

        // ฟังก์ชันจัดการการคลิกปุ่ม
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const direction = parseInt(button.dataset.direction); // -1 คือ Prev, 1 คือ Next
                currentIndex += direction;

                // วนรอบเมื่อถึงขอบ
                if (currentIndex >= images.length) {
                    currentIndex = 0;
                } else if (currentIndex < 0) {
                    currentIndex = images.length - 1;
                }

                updateSlider(currentIndex);
            });
        });
        
        // แสดงรูปแรกเมื่อโหลด
        updateSlider(currentIndex); 
    });
}

// เริ่มต้นการทำงานเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    setupContactModal(); // 🆕 เปลี่ยนมาเรียกใช้ Contact Modal
    setupHamburgerMenu();
    setupAnimations();
    setupImageSliders();
});