
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateTestUser } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
export let backlogDiv = null;
export let readyDiv = null;
export let inProgressDiv = null;
export let finishedDiv = null;
let allDivs = [backlogDiv, readyDiv, inProgressDiv, finishedDiv];
const divsObject = {
	get ready() { return readyDiv; },
	get backlog() { return backlogDiv; },
	get in_progress() { return inProgressDiv; },
	get finished() { return finishedDiv; }
};
export const appState = new State();

const loginForm = document.querySelector("#app-login-form");
const body = document.querySelector(".main");
const popup = document.querySelector(".popup-edit");
const popupClose = popup.querySelector(".popup-close");
const popupCancel = popup.querySelector("#popup-cancel");

const popupSave = document.querySelector("#popup-save");
const popupDelete = document.querySelector("#popup-delete");


const headerRightPart = document.querySelector("#header-right-part");


const contentDiv = document.querySelector("#content");
contentDiv.innerHTML = defaultTemplate;

// generateTestUser(User);
if (!localStorage.getItem("users")) generateTestUser(User);
// admins
if (!localStorage.getItem("admins")) {
	const firstAdmin = new User("admin", "admin", true);
	User.save(firstAdmin);
}


loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  let fieldHTMLContent = authUser(login, password)
    ? taskFieldTemplate
    : noAccessTemplate;

  document.querySelector("#content").innerHTML = fieldHTMLContent;
});
