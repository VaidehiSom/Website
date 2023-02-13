// Base URL
// const base_url = 'http://localhost:3000/'
const base_url = 'https://becon-edc.azurewebsites.net/';

// Register form
const registerForm = document.getElementById('registerForm');
const registerLoader = document.getElementById('registerLoader');
registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    registerLoader.classList.add("display");
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const mobile = document.getElementById('registerMobile').value;
    const institute = document.getElementById('registerInstitute').value;
    const city = document.getElementById('registerCity').value;
    const state = document.getElementById('registerState').value;
    const howKnowAboutUs = document.getElementById('howKnowAboutUs').value;
    const referCode = document.getElementById('referCode').value;
    const formData = {
        name: name,
        email: email,
        mobile: mobile,
        institute: institute,
        city: city,
        state: state,
        howKnowAboutUs: howKnowAboutUs,
        referCode: referCode,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }
    const url = `${base_url}api/registration`;
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.status == 201) {
                    name.value = '';
                    email.value = '';
                    mobile.value = '';
                    institute.value = '';
                    city.value = '';
                    state.value = '';
                    howKnowAboutUs.value = '';
                    referCode.value = '';
                    registerLoader.classList.remove("display");
                    document.getElementById('registerButtonClose').click()
                    swal({
                        title: "Registered successfully",
                        text: "Keep checking your mail. Confirmation email will be send in next 24 hours.",
                        icon: "success",
                    });
                }
                else {
                    swal({
                        title: "Email already exist",
                        text: "Please login in with this email",
                        icon: "info",
                    });
                    registerLoader.classList.remove("display");
                }
            })
    }
    catch (error) {
        console.log('Error:' + error);
        swal({
            title: "Some Error occured",
            icon: "error",
        });
        registerLoader.classList.remove("display");
    }
})

// Contact Form
const contactForm = document.getElementById('contactForm');
const contactLoader = document.getElementById('contactLoader');
contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log(document.getElementById('contactName').value)
    contactLoader.classList.add("display");
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }
    const url = `${base_url}api/message`;
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.status == 201) {
                    name.value = '';
                    email.value = '';
                    subject.value = '';
                    message.value = '';
                    contactLoader.classList.remove("display");
                    swal({
                        title: "Message sent successfully",
                        icon: "success",
                    });
                }
                else {
                    swal({
                        title: "Something went wrong",
                        text: data.message,
                        icon: "info",
                    });
                    contactLoader.classList.remove("display");
                }
            })
    }
    catch (error) {
        console.log('Error:' + error);
        swal({
            title: "Some Error occured",
            icon: "error",
        });
        contactLoader.classList.remove("display");
    }
})

document.getElementById('howKnowAboutUs').addEventListener('change', function () {
    if (document.getElementById('howKnowAboutUs').value == "Campus Ambassador") {
        document.getElementById('referCode').classList.add('display');
        document.getElementById('referCode').setAttribute('required', true);
    }
    else {
        document.getElementById('referCode').classList.remove('display');
        document.getElementById('referCode').removeAttribute('required', true);
    }
});
