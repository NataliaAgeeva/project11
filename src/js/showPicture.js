export default class ShowPicture {
    constructor() {
    }

    addLink(event) {
        const image = event.target;
        const style = getComputedStyle(image, null);
        const getUrl = style.backgroundImage;
        const link = getUrl.substr(getUrl.indexOf('"') + 1, getUrl.lastIndexOf('"') - 5);

        const element = document.querySelector('.image-container__image');

        element.src = link;
    }
}


