class UserInfo {
    constructor(form, api, popupClass) {
        this.formObj = form;
        this.api = api;
        this.renderData = this.renderData.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.popupClass = popupClass;
    }

    renderData() {
        //загрузка данных во время загрузки страницы

        this.api.getUserInfo()
            .then(res => {
                document.querySelector('.user-info__name').textContent = res.name;
                document.querySelector('.user-info__job').textContent = res.about;
                document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;

                this.formObj.name.value = res.name;
                this.formObj.info.value = res.about;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    setUserInfo() {
        //обновление данных на сервере

        this.api.patchUserInfo(this.formObj)
            .then((res) => {
                this.formObj.name.value = res.name;
                this.formObj.info.value = res.about;
            })
            .then(() => {
                this.updateUserInfo();
            })
            .then(() => {
                this.popupClass.close();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateUserInfo() {
        //отрисовка в DOM

        const editName = document.querySelector('.user-info__name');
        const editInfo = document.querySelector('.user-info__job');
        
        editName.textContent = this.formObj.name.value;
        editInfo.textContent = this.formObj.info.value;
    }
}


