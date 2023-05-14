export default class UserInfo {
    constructor(name, description) {
        this._name = document.querySelector(name)
        this._description = document.querySelector(description)
    }

    getUserInfo() {
        return {"form-name": this._name.textContent, "form-description": this._description.textContent}
    }

    setUserInfo({"form-name": name, "form-description": description}) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
}
