const mainPic = document.querySelector('.main-pic img');
const mouseCircle = document.querySelector('.mouse-circle');
const mainBtns = document.querySelectorAll('.main-btn');
const navLines = document.querySelector('.nav-lines');
const navbar = document.querySelector('.navbar');
const projects = document.querySelectorAll('.project');
const formHeading = document.querySelector('.form-heading');
const formInputs = document.querySelectorAll('.contact-form-input');
const form = document.querySelector(".contact-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const messages = document.querySelectorAll(".message");

let mX = 0;
let mY = 0;
const mainPicAnim = (x, y, e) => {
    if (x > mX) {
        mainPic.style.left = '-15%'
    } else if (x < mX) {
        mainPic.style.left = '15%'
    }
    if (y > mY) {
        mainPic.style.top = '-15%'
    } else if (y < mY) {
        mainPic.style.top = '15%'
    }
    mX = e.clientX;
    mY = e.clientY;
}

const mouseAnim = (x, y) => {
    mouseCircle.style.left = `${x}px`;
    mouseCircle.style.top = `${y}px`;
}

let ripple;
mainBtns.forEach((btn) => {
    btn.addEventListener('mouseenter', (e) => {
        const left = e.clientX - e.target.getBoundingClientRect().left;
        const top = e.clientY - e.target.getBoundingClientRect().top;
        ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = `${left}px`;
        ripple.style.top = `${top}px`;
        btn.prepend(ripple);
    })
    btn.addEventListener('mouseleave', () => {
        btn.removeChild(ripple);
    })
})

document.addEventListener('mousemove', (e) => {
    mouseCircle.style.visibility = 'visible';
    let x = e.clientX;
    let y = e.clientY;
    mainPicAnim(x, y, e);
    mouseAnim(x, y);
})

document.addEventListener('mouseleave', () => {
    mouseCircle.style.visibility = 'hidden';
})

document.addEventListener('scroll', (e) => {
    if (window.scrollY === 0) {
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
        navLines.style.visibility = 'hidden';
        navLines.style.opacity = '0';
    } else {
        navbar.style.visibility = 'hidden';
        navbar.style.opacity = '0';
        navLines.style.visibility = 'visible';
        navLines.style.opacity = '1';
    }
})

navLines.addEventListener('click', () => {
    navbar.style.visibility = 'visible';
    navbar.style.opacity = '1';
    navLines.style.visibility = 'hidden';
    navLines.style.opacity = '0';
})

projects.forEach((project, i) => {
    project.addEventListener('mouseenter', () => {
        project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight - project.offsetHeight + 15}px`;

    })
    project.addEventListener('mouseleave', () => {
        project.firstElementChild.style.top = '1rem';

    })
})

formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
        formHeading.style.opacity = '0';
        setTimeout(() => {
            formHeading.textContent = `Your ${input.placeholder}`;
            formHeading.style.opacity = '1';
        }, 300)
    })
    input.addEventListener('blur', () => {
        formHeading.style.opacity = '0';
        setTimeout(() => {
            formHeading.textContent = "Let's Talk";
            formHeading.style.opacity = '1';
        }, 300)
    })
})

const error = (input, message) => {
    input.nextElementSibling.classList.add('error');
    input.nextElementSibling.textContent = message;
}

const success = (input) => {
    input.nextElementSibling.classList.remove('error');
}

const checkRequiredFields = (inputArray) => {
    inputArray.forEach((input) => {
        if (input.value.trim() === '') {
            error(input, `${input.id} is required`)
        }
    })
}

const checkLength = (input, min) => {
    if (input.value.trim().length < min) {
        error(input, `${input.id} must be at least ${min} characters`)
    } else {
        success(input);
    }
}

const checkEmail = (input) => {
    const regEx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEx.test(input.value.trim())) {
        success(input);
    } else {
        error(input, "Email is not valid");
    }
};

form.addEventListener("submit", (e) => {
    checkLength(username, 2);
    checkLength(subject, 2);
    checkLength(message, 10);
    checkEmail(email);
    checkRequiredFields([username, email, subject, message]);

    messages.forEach((m) => {
        if (m.classList.contains("error")) {
            e.preventDefault()
        }
    })
});





