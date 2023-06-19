let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");
const homeScreen = document.getElementById("home-screen");
const mainScreen = document.getElementById("main-screen");
const getStartedBtn = document.getElementById("get-started-btn");

if (leadsFromLocalStorage && leadsFromLocalStorage.length > 0) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
    showMainScreen();
}

function showMainScreen() {
    homeScreen.style.display = "none";
    mainScreen.style.display = "block";
}

function showHomeScreen() {
    homeScreen.style.display = "block";
    mainScreen.style.display = "none";
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
        showMainScreen();
    });
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li class="list-group-item">
                <a target="_blank" href="${leads[i]}">${leads[i]}</a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;

    const emptyListMsg = document.getElementById("empty-list-msg");
    if (leads.length === 0) {
        ulEl.style.display = "none";
        emptyListMsg.style.display = "block";
    } else {
        ulEl.style.display = "block";
        emptyListMsg.style.display = "none";
    }
}


deleteBtn.addEventListener("click", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    showMainScreen();
});

getStartedBtn.addEventListener("click", function () {
    showMainScreen();
});
