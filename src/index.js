const createHandler = require('./createInternalHandler');

(function () {
    /**
     * addDelegateListenerInternal
     * @param eventType
     * @param selector
     * @param handler
     * @returns {{off: off}}
     */
    const addDelegateListenerInternal = function (eventType, selector, handler) {

        let internalHandler = createHandler(this, selector, handler);

        this.addEventListener(eventType, internalHandler, false);

        return {
            off: () => {
                this.removeEventListener(eventType, internalHandler, false);
                internalHandler = null;
            }
        }
    };

    /**
     * addDelegateListener
     * @param eventType
     * @param selector
     * @param handler
     * @returns {boolean|Array|{off: off}}
     */
    const addDelegateListener = function (eventType, selector, handler) {

        if (this instanceof NodeList) {
            let handlersList = [];
            const length = this.length;
            for (let i = 0; i < length; ++i) {
                handlersList.push(addDelegateListenerInternal.call(this[i], eventType, selector, handler));
            }
            return handlersList;
        }

        if (this instanceof Element) {
            return addDelegateListenerInternal.call(this, eventType, selector, handler);
        }

        console.warn('Cannot bind event on non-Element objects');
        return false;
    };

    Element.prototype.addDelegateListener = addDelegateListener;
    NodeList.prototype.addDelegateListener = addDelegateListener;
})();