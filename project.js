// Highlight active navigation link
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.style.textDecoration = "underline";
    }
});

// Contact Form Validation
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.querySelector("input[type='text']");
        const email = form.querySelector("input[type='email']");
        const bio = form.querySelector("textarea");

        if (name.value.trim() === "") {
            alert("Please enter your name");
            name.focus();
            return;
        }

        if (email.value.trim() === "") {
            alert("Please enter your email");
            email.focus();
            return;
        }

        if (!email.value.includes("@")) {
            alert("Please enter a valid email");
            email.focus();
            return;
        }

        if (bio.value.length > 200) {
            alert("Bio must be within 200 characters");
            return;
        }

        alert("Form submitted successfully!");
        form.reset();
    });
}

// Character counter for Bio
const bioField = document.querySelector("textarea");

if (bioField) {
    bioField.addEventListener("input", () => {
        if (bioField.value.length > 200) {
            bioField.value = bioField.value.substring(0, 200);
        }
    });
}
