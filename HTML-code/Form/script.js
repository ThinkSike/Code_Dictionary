document.getElementById("registrationForm").addEventListener("submit", function(e) {
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const phonePattern = /^\d{10}$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        e.preventDefault();
    }

    if (!phonePattern.test(phone)) {
        alert("Phone number must be 10 digits.");
        e.preventDefault();
    }
});

document.getElementById("searchClub").addEventListener("keyup", function() {
    const filter = this.value.toLowerCase();
    const labels = document.querySelectorAll("#clubList label");

    labels.forEach(label => {
        const text = label.textContent.toLowerCase();
        label.style.display = text.includes(filter) ? "" : "none";
    });
});
