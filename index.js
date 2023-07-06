let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const savedUrlList = document.getElementById("saved-url-list");
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

// display get started screen
function showHomeScreen() {
    homeScreen.style.display = "block";
    mainScreen.style.display = "none";
}

function showMainScreen() {
    homeScreen.style.display = "none";
    mainScreen.style.display = "block";
}

// autosave the current tab url by single click
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
        showMainScreen();
    });
});

// Delete individual URLs from the saved list
function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li class="list-group-item">
                <a target="_blank" href="${leads[i]}">${leads[i]}</a>
                <button class="delete-btn btn btn-danger btn-sm" data-index="${i}">Delete</button>
            </li>
        `;
    }
    savedUrlList.innerHTML = listItems;

    const emptyListMsg = document.getElementById("empty-list-msg");
    if (leads.length === 0) {
        savedUrlList.style.display = "none";
        emptyListMsg.style.display = "block";
    } else {
        savedUrlList.style.display = "block";
        emptyListMsg.style.display = "none";
    }

    // Add event listeners to the delete buttons
    const deleteButtons = document.getElementsByClassName("delete-btn");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"));
            deleteLead(index);
        });
    }
}

function deleteLead(index) {
    myLeads.splice(index, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}

// delete all saved URLs with a single click
deleteBtn.addEventListener("click", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
    showHomeScreen();
});

// enable input btn when input feild not empty
inputEl.addEventListener("input", function () {
    if (inputEl.value.trim() !== "") {
        inputBtn.disabled = false;
    } else {
        inputBtn.disabled = true;
    }
});

// save URLs manually by entering them in the input field
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    showMainScreen();
    inputBtn.disabled = true;
});

// display  main screen
getStartedBtn.addEventListener("click", function () {
    showMainScreen();
});
