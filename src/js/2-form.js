const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

const formData = {
    email: "",
    message: "",
};

form.addEventListener("input", (e) => {
    const data = new FormData(form);
    const obj = {
        emailForm: data.get("email"),
        messageForm: data.get("message"),
    }

    formData.email = obj.emailForm;
    formData.message = obj.messageForm;
    
    const json = JSON.stringify(formData);
    const addLS = localStorage.setItem(STORAGE_KEY, json);

});

document.addEventListener("DOMContentLoaded", (e) => {
    const userForm = loadFromLS(STORAGE_KEY, {});
    form.elements.email.value = userForm.email || "";
    form.elements.message.value = userForm.message || "";

});

function loadFromLS(key, defaultValue) {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    try {
        const parseData = JSON.parse(jsonData);
        return parseData ?? defaultValue;
    } catch {
        return jsonData ?? defaultValue;
    }
};

form.addEventListener("submit", e => {
    e.preventDefault();
    if (form.elements.email.value.trim() === "" || form.elements.message.value.trim() === "") {
        alert("Fill please all fields");
    } else {
        console.log(formData);
        localStorage.removeItem(STORAGE_KEY);
        formData.email = "";
        formData.message = "";
        form.reset();
    }
});