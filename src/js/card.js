export default class Card {
    constructor(api) {
        this.element = document.createElement('div');
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.api = api;
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this.element.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
        this.element.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
        this.element.remove();
    }

    create(data) {
        this.element.classList.add('place-card');
        this.element.insertAdjacentHTML('beforeend', `
                                       <div class="place-card__image" style="background-image: url(${data.link})">
                                       <button class="place-card__delete-icon"></button>
                                   </div>
                                   <div class="place-card__description">
                                       <h3 class="place-card__name">${data.name}</h3>
                                       <div class="place-card__like-container">
                                            <button class="place-card__like-icon"></button>
                                            <span class="place-card__like-counter">0</span>
                                        </div>
                                   </div>
                               `);

        this.setEventListeners();
        return this.element;
    }

    setEventListeners() {
        this.element.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.element.querySelector('.place-card__delete-icon').addEventListener('click', (event) => {

            this.remove();
        });
    }
}



