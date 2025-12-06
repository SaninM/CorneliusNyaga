// Navigation functionality
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            return false;
        }
        
        function toggleMobileMenu() {
            document.querySelector('.nav-links').classList.toggle('active');
        }
        
        // Contact form handling
        function handleContactForm(event) {
            event.preventDefault(); // Prevent the default form submission

            // Gather form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Here you can add code to send the data to your server or email service

            // Display a success message
            const formResponse = document.getElementById('formResponse');
            formResponse.style.display = 'block';
            formResponse.innerHTML = `<p>Thank you, ${name}! Your message has been sent successfully.</p>`;
            
            // Reset the form
            document.getElementById('contactForm').reset();
        }
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.querySelector('.nav-links').classList.remove('active');
            });
        });
        
        // Copy email template to clipboard
        function copyEmailTemplate() {
            const emailTemplate = `Dear [Sponsor Name],

I hope this email finds you well. My name is Cornelius Nyaga, a Cybersecurity student and creative technologist based in Kiambu, Kenya.

I'm reaching out because Im seeking strategic partners to invest in my professional development. As a multidisciplinary digital creator with skills in web development, graphic design, and photography, I'm positioned to deliver high-value digital services to the growing Kenyan market.

However, my progress is currently limited by inadequate equipment. I've created a detailed proposal outlining how an investment of $2,500 in professional tools would enable me to:

• Deliver world-class web development and design services
• Build a professional photography portfolio
• Increase my service capacity and quality significantly

In return for sponsorship, I offer multiple recognition and partnership benefits detailed in the attached proposal.

I would appreciate the opportunity to discuss this further. You can view my portfolio here: [Your Website URL]

Thank you for your consideration.

Best regards,
Cornelius Nyaga
Cybersecurity Student & Creative Technologist
Phone: +254 704 440 164
Portfolio: [Your Website URL]`;

            navigator.clipboard.writeText(emailTemplate).then(() => {
                alert('Email template copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
        
        // Print functionality
        function printProposal() {
            window.print();
        }
        
        document.addEventListener('DOMContentLoaded', function () {
            // existing handlers (showSection, toggleMobileMenu, contact form ...) are here
            // --- new portfolio interactions ---

            // Toggle project-details when a skill-tag is clicked; show specific skill-detail
            document.querySelectorAll('.skill-tag').forEach(tag => {
                tag.addEventListener('click', function () {
                    const card = tag.closest('.project-card');
                    if (!card) return;
                    const details = card.querySelector('.project-details');
                    if (!details) return;

                    // toggle visibility of the entire details block
                    const isHidden = details.hasAttribute('hidden');
                    if (isHidden) details.removeAttribute('hidden'); else details.setAttribute('hidden', '');

                    // show only the relevant skill-detail inside details (if exists)
                    const skillKey = tag.dataset.skill;
                    details.querySelectorAll('.skill-detail').forEach(sd => {
                        if (sd.dataset.skill === skillKey) sd.hidden = false;
                        else sd.hidden = true;
                    });

                    // scroll into view for better UX
                    if (!isHidden) return;
                    details.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
            });

            // Add photo button triggers file input; file input change creates thumbnails
            document.querySelectorAll('.project-card').forEach(card => {
                const addBtn = card.querySelector('.add-photo-btn');
                const fileInput = card.querySelector('.project-file-input');
                const thumbsWrap = card.querySelector('.gallery-thumbs');

                if (addBtn && fileInput) {
                    addBtn.addEventListener('click', () => fileInput.click());
                }

                if (fileInput && thumbsWrap) {
                    fileInput.addEventListener('change', (e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach(file => {
                            if (!file.type.startsWith('image/')) return;
                            const url = URL.createObjectURL(file);
                            const thumb = document.createElement('div');
                            thumb.className = 'gallery-thumb';
                            thumb.innerHTML = `
                                <img src="${url}" alt="${file.name}">
                                <button class="remove-thumb" title="Remove">&times;</button>
                            `;
                            // open full image on click
                            thumb.querySelector('img').addEventListener('click', () => window.open(url, '_blank'));
                            // remove thumb and revoke object URL
                            thumb.querySelector('.remove-thumb').addEventListener('click', (ev) => {
                                ev.stopPropagation();
                                thumb.remove();
                                URL.revokeObjectURL(url);
                            });
                            thumbsWrap.appendChild(thumb);
                        });
                        // reset so same-file can be reselected later
                        fileInput.value = '';
                    });
                }
            });
        });

