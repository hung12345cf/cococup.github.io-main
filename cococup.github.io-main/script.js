emailjs.init("2u-FrKkjfIr_ui8dj");

document.addEventListener('DOMContentLoaded', () => {
    // Parse URL parameters to preselect product
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (product) {
        const sanPhamSelect = document.getElementById('san-pham');
        if (sanPhamSelect) {
            sanPhamSelect.value = decodeURIComponent(product);
            document.getElementById('mua-hang').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle purchase form submission
    const muaHangForm = document.getElementById('form-mua-hang');
    if (muaHangForm) {
        muaHangForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(muaHangForm);
            const hoTen = formData.get('ho-ten').trim();
            const soDienThoai = formData.get('so-dien-thoai').trim();
            const email = formData.get('email').trim();
            const diaChi = formData.get('dia-chi').trim();
            const ghiChu = formData.get('ghi-chu').trim();
            const sanPham = formData.get('san-pham').trim();

            if (hoTen && soDienThoai && diaChi && sanPham) {
                const emailParams = {
                    ho_ten: hoTen,
                    so_dien_thoai: soDienThoai,
                    email: email || 'Không cung cấp',
                    dia_chi: diaChi,
                    ghi_chu: ghiChu || 'Không có',
                    san_pham: sanPham
                };

                emailjs.send('service_xkie75h', 'template_34f1kdm', emailParams)
                    .then(() => {
                        const modal = document.getElementById('modal-thong-bao');
                        if (modal) {
                            modal.style.display = 'block';
                        }
                        muaHangForm.reset();
                    }, (error) => {
                        console.error('Email sending failed:', error);
                        alert('Có lỗi khi gửi đơn hàng. Vui lòng thử lại!');
                    });
            } else {
                alert('Vui lòng điền đầy đủ các trường bắt buộc!');
            }
        });
    }

    // Handle "Mua Ngay" buttons
    const buyNowButtons = document.querySelectorAll('.buy-now-btn');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
           if (window.location.pathname.includes('san-pham.html')) {
    window.location.href = `index.html?product=${encodeURIComponent(product)}#mua-hang`;
}
 else {
                const muaHangSection = document.getElementById('mua-hang');
                const sanPhamSelect = document.getElementById('san-pham');
                if (muaHangSection && sanPhamSelect) {
                    muaHangSection.scrollIntoView({ behavior: 'smooth' });
                    sanPhamSelect.value = product;
                }
            }
        });
    });

    // Close modal
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const modal = document.getElementById('modal-thong-bao');
            if (modal) modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal-thong-bao');
        if (modal && e.target.classList.contains('modal')) {
            modal.style.display = 'none';
        }
    });

    // Handle contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            if (formData.get('name') && formData.get('email') && formData.get('message')) {
                document.getElementById('modal-thong-bao').style.display = 'block';
                contactForm.reset();
            } else {
                alert('Vui lòng điền đầy đủ!');
            }
        });
    }

    // Handle search
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                const productItems = document.querySelectorAll('.product-item');
                let foundCount = 0;
                
                productItems.forEach((item) => {
                    const name = item.querySelector('h3')?.textContent.toLowerCase() || '';
                    const matches = name.includes(searchTerm);
                    
                    if (matches) {
                        item.style.display = 'block';
                        foundCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                searchInput.value = '';
            } else {
                const productItems = document.querySelectorAll('.product-item');
                productItems.forEach((item) => {
                    item.style.display = 'block';
                });
            }
        }
    }

    // Initialize Google Maps
    const mapElement = document.getElementById('map');
    if (mapElement) {
        function initMap() {
            const location = { lat: 10.0124518, lng: 105.7324316 };
            const map = new google.maps.Map(mapElement, {
                center: location,
                zoom: 15,
            });
            new google.maps.Marker({
                position: location,
                map: map,
                title: 'Lá Dừa Eco - Trường Đại học FPT Cần Thơ',
            });
        }
        initMap();
    }
});