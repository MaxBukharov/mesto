export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    open(){
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('keydown', )
        console.log('Open')
    }
    close(){
        this._popup.classList.remove('popup_opened');
    }
    _handleEscapeClose(){
        this._popup.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.close()
                console.log('Close')
            }
        })
        
    }
    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === this._popup.querySelector('popup__close')) {
                this.close();
            }
            else if (evt.target === this._popup) {
                this.close();
            }
        })
    }
}