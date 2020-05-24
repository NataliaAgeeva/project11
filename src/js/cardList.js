class CardList {
    constructor(container, card, api) {
        this.container = container;
        this.array = [];
        this.card = card;
        this.api = api;
        this.likeContainer;
        this.render = this.render.bind(this);
    }

    getCards() {
        this.api.getCards()
            .then(res => {
                this.array = res;
            })
            .then(() => {
                this.render();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addCard(template) {
        const cardtemp = this.card(template);
        this.likeContainer = cardtemp.querySelector('.place-card__like-counter');
        this.container.appendChild(cardtemp);
    }

    addNewCard(template) {
        this.api.postNewCard(template)
            .then(res => {
                const cardtemp = this.card(res);
                this.container.appendChild(cardtemp);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        for (let i = 0; i < this.array.length; i++) {
            this.addCard(this.array[i]);
            this.likeContainer.textContent = this.array[i].likes.length;
        }
    }
}

