const API_KEY = "AIzaSyBkoxo2Vy6-mjNMplzMB2sRnsZ39yqzgjg"

// let loader;


async function fetchData(loader) {
    const input = document.getElementById('inp').value;
    document.getElementById("btn").disabled = true;
    try{
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: input
                            }
                        ],
                    },
                ],
            }),
        },
    )
    console.log(res)
    const data = await res.json()
    loader.style.display = "none"
    display(data.candidates[0].content.parts[0].text);
    }catch(error){
        console.error("Error:", error);
        loader.style.display = "none";
    }finally {
        btn.disabled = false;
    }
    
}
function display(v) {
    console.log(v);
    const answerparagrapgh = document.createElement("p")
    let formatted = v.replace(/\*\s*\*\*(.*?)\*\*/g, "<br><strong>$1</strong>");

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<br><strong>$1</strong>");

    formatted = formatted.replace(/\*/g, "<br>*");
    answerparagrapgh.innerHTML = formatted;
    answerparagrapgh.classList.add("bg-light", "p-2", "me-auto", "rounded-3", "d-inline-block", "text-wrap");
    document.getElementById("answer").appendChild(answerparagrapgh);
    scrollToBottom();
}
document.getElementById('btn').addEventListener('click', () => {


    const userInput = document.createElement("p");
    userInput.textContent = document.getElementById('inp').value;
    userInput.classList.add("bg-light", "ms-auto", "p-2", "rounded-3", "d-inline-block", "text-wrap");
    userInput.style.maxWidth = "75%";
    userInput.style.marginLeft = "100px";
    userInput.style.backgroundColor = "red"
    document.getElementById("answer").append(userInput);
    const loader = document.createElement('div')
    loader.classList.add('loader')
    loader.style.display = "block"

    document.getElementById("answer").append(loader);

    scrollToBottom();
    fetchData(loader);
    document.getElementById('inp').value = "";
})

const inputBox = document.getElementById("inputbox");
const chatIcon = document.getElementById("icon")
const disapperInputBox = document.getElementById('disapperInputBox');
const welcome = document.getElementById('welcome');

document.getElementById('btn').addEventListener('click', function () {
    welcome.style.display = "none";
});

chatIcon.addEventListener('click', function () {
    if (inputBox.style.display === "none") {
        inputBox.style.display = "block";
        chatIcon.style.display = "none"
    } else {
        inputBox.style.display = "none";
    }
})

disapperInputBox.addEventListener('click', function () {
    
        inputBox.style.display = "none";
        chatIcon.style.display = "block"
    
})

let now = new Date();
let hours = now.getHours();
const time = document.createElement('h4')
time.classList.add('text-center')
if (hours < 12) {
    time.textContent = "Good Moring sir 😊,"
}
else if (hours > 12 && hours < 16) {
    time.textContent = "Good Afternoon sir 😊,"
}
else {
    time.textContent = "Good Evening sir 😊,"
}
welcome.prepend(time);

function scrollToBottom() {
    const chatBox = document.getElementById("answer");
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth"
    });
}











