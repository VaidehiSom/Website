// Base URL
// const base_url_2 = 'http://localhost:3000/'
const base_url_2 = 'https://becon-edc.azurewebsites.net/';

// login logout show hide
const loginLogoutShowHide = () => {
    if (localStorage.email === undefined) {
        const loginButtonShow = document.getElementById('loginButtonShow');
        loginButtonShow.style.display = 'inline-block';
    }
    else {
        const logoutButtonShow = document.getElementById('logoutButtonShow');
        logoutButtonShow.style.display = 'inline-block';
    }
}

(function () {
    "use strict";
    loginLogoutShowHide()
})()

// login form
const loginForm = document.getElementById('loginForm');
const loginLoader = document.getElementById('loginLoader');
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    loginLoader.style.visibility = 'visible';
    const email = document.getElementById('loginEmail');
    const pass = document.getElementById('loginPass');
    const formData = {
        "email": email.value,
        "password": pass.value,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }
    const url = `${base_url_2}api/login`;
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.status === 200) {
                    localStorage.email = data.studentDetails.email
                    localStorage.name = data.studentDetails.name
                    email.value = '';
                    pass.value = '';
                    loginLoader.style.visibility = 'hidden';
                    document.getElementById('loginCloseButton').click()
                    swal({
                        title: "Login successfully",
                        text: "You may now register for event",
                        icon: "success",
                    }).then(() => {
                        location.reload()
                    })
                }
                else {
                    loginLoader.style.visibility = 'hidden';
                    swal({
                        title: "Something went wrong",
                        text: data.message,
                        icon: "info",
                    });
                }
            })
    }
    catch (error) {
        loginLoader.style.visibility = 'hidden';
        console.log('Error:' + error);
        swal({
            title: "Some Error occured",
            icon: "error",
        });
    }
})

// forgot password form
const forgotForm = document.getElementById('forgotPassForm');
const forgotLoader = document.getElementById('forgotPassLoader');
forgotForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    forgotLoader.style.visibility = 'visible';
    const email = document.getElementById('forgotPassEmail');
    const formData = {
        "email": email.value,
    }
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }
    const url = `${base_url}api/login/forgotPassword`;
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.status == 200) {
                    email.value = '';
                    forgotLoader.style.visibility = 'hidden';
                    document.getElementById('forgotPassCloseButton').click()
                    swal({
                        title: "Password changed successful",
                        text: "Keeping checking your mail, updated password will be send soon.",
                        icon: "success",
                    })
                }
                else {
                    forgotLoader.style.visibility = 'hidden';
                    swal({
                        title: "Something went wrong",
                        text: data.message,
                        icon: "info",
                    });
                }
            })
    }
    catch (error) {
        console.log('Error:' + error);
        forgotLoader.style.visibility = 'hidden';
        swal({
            title: "Some Error occured",
            icon: "error",
        });
    }
})

const logout = () => {
    localStorage.clear();
    window.open('./index.html', '_self');
}