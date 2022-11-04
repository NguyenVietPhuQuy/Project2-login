/**------------------------------- SHOW POP-UP -------------------------------**/
//Modal SHOW  DOM///
var modal = document.getElementById('modal-container')
var registerClick = document.getElementById('register');
var closeModal = document.getElementById('closeModal')

// //===Modal Show==//
if (registerClick) {
    registerClick.addEventListener('click', () => {
        modal.classList.add('modal__active')
        modal.classList.remove('modal__transition')
    })
}
// //==Modal hidden==//
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('modal__active')
        modal.classList.add('modal__transition')
    })
}

/**------------------------------- Call API to get Data  -------------------------------**/

var account = [];
async function getAPImember() {
    await axios({
        url: `https://635205159d64d7c7130c9c5f.mockapi.io/members`,
        method: "GET",
    })
        .then(function (response) { account = mapData(response.data); console.log(account) })
        .catch(function (err) { console.log(err) });
}

function checkLogin() {
    accountCheck = document.getElementById('account__login').value;
    console.log(accountCheck)
    passwordCheck = document.getElementById('account__password').value;
    for (let item of account) {
        if (accountCheck === item.nameMember && passwordCheck === item.passwordMember) { window.location.href = "https://project2-cyber-soft-qtk9-8d405nbx9-nguyenvietphuquy.vercel.app/"; alert('successful login'); break }
        else {
            return alert('failed to login');
        }
    }
    // account.forEach(account => {
    //     if (account.nameMember === accountCheck && account.passwordMember === passwordCheck) 
    //     {window.location.href = "../Index.html"; alert('suscess');}
    //     return
    // });
}

// nếu có data có phương thức thì xài mapData để chuyển từ string về lại value
function mapData(replaceList) {
    var replaceEmployee = []
    for (var i = 0; i < replaceList.length; i++) {
        var replace = replaceList[i]
        var result = new memberAccount(
            replace.idMember,
            replace.nameMember,
            replace.passwordMember,
            replace.emailMember,
        )
        replaceEmployee.push(result);
    }
    return replaceEmployee;
}


/**------------------------------- Register Account and request back to API to Back-End Data  -------------------------------**/

function createMemberHK() {
    let validate =validateForm();
    if(!validate) return;
    let idHK = document.getElementById('modal__ID').value;
    let accountHK = document.getElementById('modal__account').value;
    let passwordHK = document.getElementById('modal__password').value;
    let rePasswordHK = document.getElementById('modal__repassword').value;
    let emailHK = document.getElementById('modal__gmail').value;

    if (rePasswordHK === passwordHK) {
        var listAccount = new memberAccount(idHK,accountHK, passwordHK, emailHK);
        alert('Successful Register');
        account.push(listAccount);
        console.log(account); 
    } else return alert("password is not match");

    var promise = axios({
        url: `https://635205159d64d7c7130c9c5f.mockapi.io/members`,
        method: "POST",
        data: listAccount,
    })
    promise.then(function (response) {console.log(response),getAPImember()})
    .catch(function (err) { console.log(err) })
}

/**------------------------------- VALIDATE-FORM---------------------------------**/

// --ValidateForm--//
function validateForm() {
    let isValid = true;
    //registar
    isValid &= require('modal__account', 'modal__spanaccount') && length('modal__account','modal__spanaccount',6,9) && patternName('modal__account','modal__spanaccount');
    isValid &= require('modal__password', 'modal__spanpassword') && patternPass('modal__password', 'modal__spanpassword');
    isValid &= require('modal__repassword', 'modal__spanrepassword') && patternPass('modal__repassword', 'modal__spanrepassword');
    isValid &= require('modal__gmail', 'modal__spangmail') && patternEmail('modal__gmail', 'modal__spangmail');
    return isValid;
}

// 1- tạo requirement

function require(id, span) {
    let idDiv = document.getElementById(id).value;
    let idSpan = document.getElementById(span);
    if (idDiv ==="") {
        idSpan.style.color = "red";
        idSpan.style.display = "inline-block";
        idSpan.innerHTML = "This field is required"
        return false;
    }
    idSpan.innerHTML = "";
    return true;
}
//2- tạo length

function length(id,span,min,max){
    let lengthID = document.getElementById(id).value;
    let lengthSpan = document.getElementById(span);
    if (lengthID.length<min || lengthID.length>max)
    {
        lengthSpan.style.color = "red";
        lengthSpan.style.display = "inline-block";
        lengthSpan.innerHTML = `Texts must be around ${min} to ${max}`
        return false;
    }
    lengthSpan.innerHTML = "";
    return true;
}


//3- tạo pattern

function patternName(id, span) {
    var spanAccount = document.getElementById(span);
    var result = document.getElementById(id).value;
    var pattern = /^[A-z/s]+$/g;
    if (pattern.test(result)) {
        spanAccount.innerHTML = ""
        return true;
    }
    spanAccount.style.color = "red";
    spanAccount.style.display = "inline-block";
    spanAccount.innerHTML = `*only word is accepted`;
    return false;
}

function patternPass(id,span){
    let patternID = document.getElementById(id).value;
    let patternSpan = document.getElementById(span);
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,10}$/g;
    if(pattern.test(patternID))
    {patternSpan.innerHTML =''
    return true;}
    patternSpan.style.color = "red";
    patternSpan.style.display = "inline-block";
    patternSpan.innerHTML = `*Need at least 1-Uppercase,1-number, limit from 6-10 words`;
    return false;
}

function patternEmail(id, span) {
    var spanAccount = document.getElementById(span);
    var result = document.getElementById(id).value;
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    if (pattern.test(result)) {
        spanAccount.innerHTML = ""
        return true;
    }
    spanAccount.style.color = "red";
    spanAccount.style.display = "inline-block";
    spanAccount.innerHTML = `*need form @gmail.com`;
    return false;   
}

window.onload = function () {
    getAPImember()
};