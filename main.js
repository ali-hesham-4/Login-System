// HTML     Elements

var nameInput = document.getElementById("Name")
var emailInput = document.getElementById("Email")
var passwordInput = document.getElementById("password")
var message = document.getElementById("message")
var signUpBtn = document.getElementById("signUpBtn")
var loginBtn = document.getElementById("loginBtn")
var welcome = document.getElementById("welcome") 


// to get base url (localhost)
var pathparts = location.pathname.split('/');
var baseURL = ''
for (var a = 0; a < pathparts.length - 1; a++) {
    baseURL += '/' + pathparts[a]
}

// App      Variables

var accounts = [] 
var user = {
    name: "" ,
    email: "" ,
    password: ""
}

// Functions

//>>>> Sign Up functions <<<<

if (localStorage.getItem("user") == null ) {
    accounts = [] 
}else{
    accounts =  JSON.parse(localStorage.getItem("user"))
}

//to check inputs is empty or not

function isEmpty(){
    if(nameInput.value == "" || emailInput.value == "" || passwordInput.value == "" ){
        return true;
    }else{
        return false;
    }
}

// to check email is exist

function isEmailExist() {
    for(var i = 0 ; i < accounts.length ; i++){
        if(accounts[i].email.toLowerCase() == emailInput.value.toLowerCase()){
            return true
        }
    }
}


// to clear form

function clear(){
    nameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
}

// Sign Up function

function signUp(){
        if(isEmpty() == true){
            message.innerHTML = `<p class = "text-center text-danger m-3">All Inputs Are Required</p>`
        }else{
    
// to store all value as object
    
        user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }
        if(accounts.length == 0){
            accounts.push(user)
            localStorage.setItem("user",JSON.stringify(accounts))
            message.innerHTML = `<p class = "text-center text-successs m-3">Success</p>`
        }else{
            if (isEmailExist() == true) {
                message.innerHTML = `<p class = "text-center text-danger m-3">Email is Already Exsit</p>`
            }else{
                accounts.push(user)
                localStorage.setItem("user",JSON.stringify(accounts))
                message.innerHTML = `<p class = "text-center text-successs m-3">Success</p>`
            }
            }
        } 
        console.log(accounts);
    }

//>>>> Login functions <<<<

//to check inputs is empty or not

function isLoginEmpty(){
    if(emailInput.value == "" || passwordInput.value == "" ){
        return true;
    }else{
        return false;
    }
}

// to check Email and Password Are Correct

function isCorrectEmailAndPassword(){
    for(var i = 0 ; i < accounts.length ; i++ ){
        if(accounts[i].email.toLowerCase() == emailInput.value.toLowerCase()  && accounts[i].password.toLowerCase() == passwordInput.value.toLowerCase()){
            localStorage.setItem('sessionUserName', accounts[i].name)
            return true
        }
    }
}


// Login function

function login(){
    if(isLoginEmpty() == true ){
        message.innerHTML = `<p class = "text-center text-danger m-3">All Inputs Are Required</p>`
    }else{
        if(isCorrectEmailAndPassword() == true ){
            message.innerHTML = `<p class = "text-center text-successs m-3">Success</p>`
            location.replace(`${location.origin+baseURL}/home.html`)
        }else{
            message.innerHTML = `<p class = "text-center text-danger m-3">Incorrect Email or Password</p>`
        }
    }
}


// to say welcome in home page
var userName = localStorage.getItem('sessionUserName')
if (userName) {
    welcome.innerHTML = "Welcome " + userName
}

// log out function

function logOut(){
    location.replace(`${location.origin+baseURL}/index.html`)
}