export default class WordFrequency {
    constructor(text) {
        this.text = text;
    }

    getText() {
        return this.text;
    }

    removeUnnecessarySpecialCharacters() {
        this.text = this.text.replace(/[^-'\w\s.]|(?<!\.[a-zA-Z])\.(?![a-zA-Z]\.)/g, '')

        return this;
    }

    removeUnnecessarySpecialCharactersSkipAcronyms() {
        this.text = this.text.replace(/[^'\w\s]/g, '')

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
        this.text = this.text.toLowerCase();

        const words = this
            .breakWordJoiners()
            .removeUnnecessarySpecialCharacters()
            .toWordsArray();

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
