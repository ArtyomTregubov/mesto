export default class UserInfo {
    constructor(name, description) {
        this._name = document.querySelector(name)
        this._description = document.querySelector(description)
    }

    getUserInfo() {
        return {"name": this._name.textContent, "about": this._description.textContent}
    }

    setUserInfo({"name": name, "about": description}) {
        this._name.textContent = name;
        this._description.textContent = description;
    }


}
