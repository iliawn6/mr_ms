let saveButton = document.querySelector("#save_button");
let submitButton = document.querySelector("#submit_button");
let clearButton = document.querySelector("#clear_button")



// handler for save button after click
function saveHandler() {
    console.log("hello");
    let maleButton = document.querySelector("#male_button")
    let femaleButton = document.querySelector("#female_button")
    let inputValue = document.querySelector("#name_input_box").value;
    let gender;
    let checkButtonsSelected = true
    let regex = /^[a-zA-Z ]*$/;
    // check which radio button is selected
    if (maleButton.checked) {
        gender = "male"
    }
    else if (femaleButton.checked) {
        gender = "female"
    }
    else {
        checkButtonsSelected = false
    }
    let result = document.querySelector("#saved_answer")
    if (checkButtonsSelected == false ||
        (inputValue.length == 0 ||
            inputValue.length > 255 ||
            (!regex.test(inputValue)))) {
        result.innerText = "Please fill out requirements!!"
    }
    else {
        savedAnswer.name = document.querySelector("#name_input_box").value
        savedAnswer.gender = gender
        result.innerText = "name: " + savedAnswer.name + " , " + "gender: " + savedAnswer.gender
        localStorage.setItem(savedAnswer.name, gender)
    }
}



// handler for submit button after click
function submitHandler() {
    let inputValue = document.querySelector("#name_input_box").value;
    let regex = /^[a-zA-Z ]*$/;
    if (inputValue.length > 255 || (!regex.test(inputValue))) {
        console.log("Name length is too long!!");
    }
    else {
        console.log(inputValue);
        if (localStorage.getItem(inputValue) == null) {
            document.querySelector("#saved_answer").innerText = ""
        }
        else {
            document.querySelector("#saved_answer").innerText = "name: " + inputValue + " , gender: " + localStorage.getItem(inputValue)
        }
        loadNames();
    }
}


// handler for clear button after click
function clearHandler() {
    let inputValue = document.querySelector("#name_input_box").value;
    if (inputValue == "") {
        document.querySelector("#saved_answer").innerText = "Please enter name!"
    }
    else {
        if (localStorage.getItem(inputValue) !== null) {
            localStorage.removeItem(inputValue)
            document.querySelector("#saved_answer").innerText = "name has been removed!"
        }
        else {
            document.querySelector("#saved_answer").innerText = "given name doesn't exist!"
        }
    }
}


// request to predict given name gender
async function loadNames() {
    let url = "https://api.genderize.io/?name=" + document.querySelector("#name_input_box").value;
    let result;
    try {
        const response = await fetch(url);
        const names = await response.json();
        obj.name = names.name
        obj.prediction = names.probability
        if (names.gender == null) {
            result = "Name doesn't exist!!"
            document.querySelector("#prediction_result").innerText = result
        }
        else {
            result = "name: " + names.name + " , " + "probability: " + names.probability
            console.log(result)
            document.querySelector("#prediction_result").innerText = result
        }
    }
    catch (e) {
        console.log("error!!")
    }
}



var obj = { "name": "", "prediction": 0 }
var savedAnswer = { "name": "", "gender": "" }
console.log(obj);



submitButton.addEventListener("click", submitHandler);
saveButton.addEventListener("click", saveHandler);
submitButton.addEventListener("click", loadNames)
clearButton.addEventListener("click", clearHandler)
