// ===============================
// DEMO AUTH
// Backend authentication comes later
// ===============================

const DEMO_USER = "saro";
const DEMO_PASSWORD = "change-this-password";

const servers = [
    {
        id: 1,
        name: "Survival",
        software: "Paper",
        version: "1.21.11",
        status: "online",
        players: 12
    },
    {
        id: 2,
        name: "Lifesteal",
        software: "Paper",
        version: "1.21.11",
        status: "offline",
        players: 0
    }
];


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        if (
            username === DEMO_USER &&
            password === DEMO_PASSWORD
        ) {

            localStorage.setItem(
                "saroPanelLoggedIn",
                "true"
            );

            localStorage.setItem(
                "saroPanelUser",
                username
            );

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("loginError").textContent =
                "Invalid username or password.";

        }

    });

}


// DASHBOARD AUTH CHECK

if (
    window.location.pathname.endsWith("dashboard.html") &&
    localStorage.getItem("saroPanelLoggedIn") !== "true"
) {

    window.location.href = "index.html";

}


// USERNAME

const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser) {

    const user =
        localStorage.getItem("saroPanelUser") || "User";

    welcomeUser.textContent =
        `Welcome, ${user}`;

}


// NAVIGATION

document.querySelectorAll(".nav-item").forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        document.querySelectorAll(".nav-item")
            .forEach(item => item.classList.remove("active"));

        button.classList.add("active");

        document.querySelectorAll(".page")
            .forEach(section => section.classList.remove("active"));

        const target =
            document.getElementById(`page-${page}`);

        if (target) {
            target.classList.add("active");
        }

        const title =
            document.getElementById("pageTitle");

        if (title) {
            title.textContent =
                button.textContent.replace(/^[^\w]+/, "").trim();
        }

        renderServers();

    });

});


// LOGOUT

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("saroPanelLoggedIn");
        localStorage.removeItem("saroPanelUser");

        window.location.href = "index.html";

    });

}


// SERVER RENDER

function createServerCard(server) {

    const online =
        server.status === "online";

    return `
        <div class="server-card">

            <h3>🎮 ${server.name}</h3>

            <div class="version">
                ${server.software} ${server.version}
            </div>

            <div class="server-status">
                <span class="${online ? "online" : ""}">
                    ● ${online ? "Online" : "Offline"}
                </span>

                ${
                    online
                    ? `<span class="muted"> · ${server.players} players</span>`
                    : ""
                }
            </div>

            <div class="server-actions">

                <button onclick="manageServer(${server.id})">
                    Manage
                </button>

                <button onclick="restartServer(${server.id})">
                    Restart
                </button>

            </div>

        </div>
    `;
}


function renderServers() {

    const list =
        document.getElementById("serverList");

    const all =
        document.getElementById("allServers");

    const html =
        servers.map(createServerCard).join("");

    if (list) list.innerHTML = html;
    if (all) all.innerHTML = html;
}

renderServers();


// SERVER ACTIONS

function manageServer(id) {

    const server =
        servers.find(s => s.id === id);

    alert(
        `Server management for ${server.name} will be connected to the VPS API.`
    );
}


function restartServer(id) {

    const server =
        servers.find(s => s.id === id);

    alert(
        `Restart request for ${server.name} will be sent to the VPS API.`
    );
}


// CREATE SERVER

function openCreateServer() {

    document
        .getElementById("serverModal")
        .classList.add("show");

}


function closeCreateServer() {

    document
        .getElementById("serverModal")
        .classList.remove("show");

}


function createServer() {

    const name =
        document.getElementById("serverName").value.trim();

    const software =
        document.getElementById("software").value;

    const version =
        document.getElementById("version").value;

    if (!name) {

        alert("Enter a server name.");
        return;

    }

    servers.push({

        id: Date.now(),

        name,

        software,

        version,

        status: "offline",

        players: 0

    });

    renderServers();

    closeCreateServer();

    document.getElementById("serverName").value = "";

    alert(
        "Server added to the panel. VPS creation will be connected in the backend."
    );

}
