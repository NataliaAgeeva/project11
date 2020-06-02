export default class FormValidator {
    constructor(form) {
        this.form = form;
    }

    activateError(errorElement) {
        errorElement.classList.add('popup__input-required_shown');
    }

    resetError(errorElement) {
        errorElement.classList.remove('popup__input-required_shown');
        errorElement.textContent = '';
    }

    checkInputValidity(element) {
        const errorElement = document.querySelector(`#error-${element.id}`);

        const MIN_LENGTH = 2;
        const MAX_LENGTH = 30;
        const NO_SYMBOLS = '';

        if (element.value === NO_SYMBOLS) {
            errorElement.textContent = '��� ������������ ����';
            this.activateError(errorElement);
            return false;
        }

        if (element.id !== 'link') {
            if (element.value.length < MIN_LENGTH || element.value.length > MAX_LENGTH) {
                errorElement.textContent = '������ ���� �� 2 �� 30 ��������';
                this.activateError(errorElement);
                return false;
            }
        }

        if ((element.id === 'link') && element.validity.typeMismatch) {
            errorElement.textContent = '����� ������ ���� ������';
            this.activateError(errorElement);
            return false;
        }
               
        this.resetError(errorElement);
        return true;
    }

    setSubmitButtonState(boolean) {
        const submit = this.form.querySelector('.popup__button');
        if (!boolean) {
            submit.classList.add('popup__button_disabled')
            submit.setAttribute('disabled', true);
        } else {
            submit.classList.remove('popup__button_disabled');
            submit.removeAttribute('disabled', true);
        }

    }

    setEventListeners() {
        const inputs = Array.from(this.form.elements);
        const submit = this.form.querySelector('.popup__button');

        this.form.addEventListener('input', () => {
            let isValid = true;

            inputs.forEach((element) => {
                if (element.id != submit.id && !this.checkInputValidity(element)) {
                    isValid = false;
                }
            });
            this.setSubmitButtonState(isValid);
            
        });
    }
}


