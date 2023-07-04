// document.addEventListener('DOMContentLoaded', () => {


    //about the box of login and register
    const wrapaper = document.querySelector('.wrapaper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    // const RestLink = document.querySelector('.Rest-link');
    // const loginRest = document.querySelector('.loginRest')
    const btnPupup = document.querySelector('.btnLogin-popup');
    const iconclose = document.querySelector('.icon-close');


    //about login button and get username and pssword
    const btnLogin = document.getElementById("btnlogin");
    const inputuser = document.getElementById("inputuser");
    const inputpassword = document.getElementById("inputpassword");
    const remember = document.getElementById("remember");


    //about register button and get new user
    const btnregister = document.getElementById("btnregister");
    const newFirstName = document.getElementById("newFirstName");
    const newLastName = document.getElementById("newLastName");
    const newusername = document.getElementById("newusername")
    const newpassword = document.getElementById("newpassword");
    const newgender = document.getElementById("newgender");
    const newphonenumber = document.getElementById("newphonenumber")
    const checkbox = document.getElementById("terms");


    //about Restpassword and get username 
    const btnRestPassword = document.getElementById("btnRestPassword");
    const Restuser = document.getElementById("Restuser");


    // call back function for click buttons
    // RestLink.addEventListener('click', () => {
    //     wrapaper.classList.add('activePass')
    // });

    registerLink.addEventListener('click', () => {
        wrapaper.classList.add('active')
    });

    loginLink.addEventListener('click', () => {
        wrapaper.classList.remove('active')
    });

    btnPupup.addEventListener('click', () => {
        wrapaper.classList.add('active-popup')
    });

    iconclose.addEventListener('click', () => {
        wrapaper.classList.remove('active-popup')
    });    // loginRest.addEventListener('click', () => {
    //     wrapaper.classList.remove('activePass')
    // });



    //function for login key and check username and password
    btnLogin.addEventListener('click', async (event) => {
        
        
        try {
            console.log('/*/*/*/*/*/')
            event.preventDefault();
            const username = inputuser.value;
            const password = inputpassword.value;
            console.log(JSON.stringify({ username, password }))
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json();
            console.log(data)
            if (data) {
                window.location.href = "login.html";

                // redirect
            }
            else{
                console.log("12312");
            }
        } catch (error) {
            console.log(error)
        }

    });

    //function for register key and check username and email exists
    btnregister.addEventListener('click', (event) => {
        event.preventDefault();
        const firstName = newFirstName.value;
        const lastName = newLastName.value;
        const username = newusername.value;
        const password = newpassword.value;
        const gender = newgender.value;
        const phonenumber = newphonenumber.value;
        fetch("/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, password: password, gender: gender, phonenumber: phonenumber })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "register.html";
                } else {
                    alert("username is already exists")
                }
            })
            .catch(error => {
                console.error("Failed connect to server.js:", error)
            });


        // console.log({username:newfirstName, password:password, email:email, age: ages});
    });


    // function for checkbox terms and dis btnregister
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            btnregister.removeAttribute('disabled')
            btnregister.style.color = 'white'
            btnregister.style.cursor = 'pointer'
        } else {
            btnregister.setAttribute("disabled", "true");
            btnregister.style.color = 'red'
            btnregister.style.cursor = 'not-allowed'
        }
    })

    // load window and get username and password in localStorage
    // window.addEventListener('load', ()=>{
    //         inputuser.value = localStorage.getItem('username')
    //         inputpassword.value = localStorage.getItem('password')
    // })





    //function for RestPassword Link and ckeck the username and email exists 
    // btnRestPassword.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     const username = Restuser.value;

    //     fetch("/Rest-password", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ username: username })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 console.log("Restpassword");
    //             } else {
    //                 alert("username is not exists in  server")

    //             }
    //         }).catch(error => {
    //             console.error("Failed connect to server.js:", error)
    //         })



    // })

// });




window.addEventListener('DOMContentLoaded', () => {
    const usernameElement = document.querySelector('.username');
    const imageProfileElement = document.getElementById('imageProfile');
  
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { username, profileImage } = JSON.parse(userData);

      usernameElement.textContent = username;

      imageProfileElement.src = profileImage;
    }
  });
  