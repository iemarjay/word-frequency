export default class WordFrequency {
    constructor(text) {
        this.text = text;
        this.beforeHook = (text) => {}
        this.afterHook = (text) => {}
    }

    getText() {
        return this.text;
    }

    beforeTextTransformHook(callback) {
        if (!callback instanceof Function) {
            throw new Error('callback should be a function')
        }

        this.beforeHook = callback;

        return this;
    }

    afterTextTransformHook(callback) {
        if (!callback instanceof Function) {
            throw new Error('callback should be a function')
        }

        this.afterHook = callback;

        return this;
    }

    removeUnnecessarySpecialCharactersSkipCharactersInSkipAcronymWords() {
        this.text = this.text.replace(/[^-'\w\s.]|(?<!\.[a-zA-Z])\.(?![a-zA-Z]\.)/g, '')

        return this;
    }

    breakWordJoiners() {
        this.text = this.text.replace(/(?<=[a-zA-Z\d]{2,}|[^\w\s'’])([^\w\s'’]+)(?=[a-zA-Z\d]|[^\w\s'’])/g, ' ')

        return this;
    }

    toWordsArray() {
        return this.text.split(/[\s]/);
    }

    getFrequency() {
        this.beforeHook(this.text);

        this.text = this.text
            .toLowerCase()
            .breakWordJoiners()
            .removeUnnecessarySpecialCharactersSkipCharactersInSkipAcronymWords();

        this.afterHook(this.text);

        const words = this.toWordsArray();

        return words.reduce((carry, item) => {
            if (!carry.hasOwnProperty(item)) {
                carry[item] = 1;
            } else {
                carry[item] += 1;
            }

            return carry;
        }, {})
    }
}
