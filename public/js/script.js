

document.addEventListener('DOMContentLoaded', () => {

    const scrollTopBtn = document.getElementById('scrollTopBtn');


    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { 
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });


    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    navLinks.forEach(link => {

        link.classList.remove('active');


        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '/' && link.getAttribute('href') === '/') {
         
            link.classList.add('active');
        }
    });


    const contactForm = document.getElementById('contactForm');
    const formResponseDiv = document.getElementById('formResponse');

    if (contactForm) { 
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

         
            formResponseDiv.textContent = '';
            formResponseDiv.classList.remove('success', 'error');

            try {
                const response = await fetch('/submit-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    formResponseDiv.classList.add('success');
                    formResponseDiv.textContent = result.message + (result.suggestion ? ` ${result.suggestion}` : '');
                    contactForm.reset(); 
                } else {
                    formResponseDiv.classList.add('error');
                    formResponseDiv.textContent = result.message || 'An error occurred during submission.';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formResponseDiv.classList.add('error');
                formResponseDiv.textContent = 'Network error or server is unreachable. Please try again later.';
            }
   
            formResponseDiv.style.opacity = '1';
            formResponseDiv.style.visibility = 'visible';
        });
    }


});
