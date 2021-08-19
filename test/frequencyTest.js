import {expect, should} from "chai";
import WordFrequency from '../src/WordFrequency.js';

should();

it('should be able to get passed text', function () {
    const frequency = new WordFrequency('i am a boy');

    frequency.text.should.be.equal('i am a boy');
    frequency.text = 'i am'

    frequency.getText().should.be.equal('i am')
});

it('Frequency can remove special characters except spaces, dashes, slashes and new lines', function () {
    const text = (new WordFrequency(
        'and others. The Wikimedia# Foundation (WMF) is a non-profit\norganization —headquartered in San( Francisco, U.S.A. —that runs the'
    ))
        .removeUnnecessarySpecialCharactersSkipCharactersInSkipAcronymWords()
        .getText();

    text.should.be.equal('and others The Wikimedia Foundation WMF is a non-profit\norganization headquartered in San Francisco U.S.A. that runs the')
});

it('Frequency remove special characters skips acronyms', function () {
    const text = (new WordFrequency('a"# u.s.a. a /word')).removeUnnecessarySpecialCharactersSkipCharactersInSkipAcronymWords().getText();

    text.should.equal('a u.s.a. a word')
});

it('should break word joiners', function () {
    const text = (new WordFrequency('free/libre open-source U.S.A. that')).breakWordJoiners().getText();
    const text2 = (new WordFrequency('free/libre= op#en-source')).breakWordJoiners().getText();

    text.should.be.equal('free libre open source U.S.A. that')
    text2.should.be.equal('free libre= op en source')
});

it('should get accurate word frequency', function () {
    const frequency = (new WordFrequency(
        `In order to give you more text text to work on, this this paragraph is about`
    )).getFrequency()

    const frequency2 = (new WordFrequency(
        `am#am i am a-boy isn't it 4#it`
    )).getFrequency()

    const frequency3 = (new WordFrequency(
        `MediaWiki is a particular
wiki engine developed for and used by Wikipedia and the other
Wikimedia projects; it is free/libre open-source software.`
    )).getFrequency()

    frequency.should.be.instanceof(Object);
    frequency.to.should.equal(2)
    frequency.this.should.equal(2)
    frequency.text.should.equal(2)
    frequency.in.should.equal(1)

    Object.keys(frequency2).should.have.length(6)

    frequency3.is.should.equal(2)
    frequency3.mediawiki.should.equal(1)
    frequency3.wikipedia.should.equal(1)
});
