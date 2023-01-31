import { blacklistKeywords, punctuationArr } from "./config.js"; 


class Settings { // base 
    constructor() {
        
    }

    execute (value = null) {
        return value;
    }

    test (testArr = []) {
        testArr.forEach(el => this.execute(el));
        return testArr;
    }
}

// default abstracts the settings for FAQ controller while still providing access to its functionality
class Defaults extends Settings {
    // modern ES6 convention using _ for private variables
    // assigning defaults outside of constructor to allow only specific settings to be changed
    // instead of forcing dev to assign all
    _wordsToIgnore = blacklistKeywords;
    _punctuationToReplace = punctuationArr;
    _punctuationReplaceChar = '';
    _filterStrict = true;
    _filterSemiStrict = true;
    _filterParial = true;
    _consecutiveCount = 3;
    
    // defaults act as the parameters for settings hence why we extend
    constructor() { 
        super() 
        this._settings = {
           wordsToIgnore          : this._wordsToIgnore, 
           punctuationToReplace   : this._punctuationToReplace, 
           punctuationReplaceChar : this._punctuationReplaceChar, 
           filterStrict           : this._filterStrict, 
           filterSemiStrict       : this._filterSemiStrict, 
           filterParial           : this._filterParial, 
           consecutiveCount       : this._consecutiveCount
        };
    }

    // main getter function
    get settings () {
        return this._settings;
    }

    // set addSetting (item) { // cant do this unless variables stored in a map
    //     this.settings.push(item); // consider
    // }

    // set functions to overwrite single settings
    // unfortunatly since this isnt typescript we can't assign default datatypes
    // consider abstracting this class to a typescript file for type handling
    set wordsToIgnore (arr = [...blacklistKeywords]) {
        return this._wordsToIgnore = arr;
    }

    set punctuationToReplace (arr = [...punctuationArr]) {
        return this._punctuationToReplace = arr;
    }

    set punctuationReplaceChar (str = '') {
        return this._punctuationReplaceChar = str;
    }

    set filterStrict (bool = true) {
        return this._filterStrict = bool;
    }

    set filterSemiStrict (bool = true) {
        return this._filterSemiStrict = bool;
    }

    set filterParial (bool = true) {
        return this._filterParial = bool;
    }

    set consecutiveCount (int = 3) {
        return this._consecutiveCount = int;
    }

    // get functions
    get wordsToIgnore () {
        return this._wordsToIgnore;
    }

    get punctuationToReplace () {
        return this._punctuationToReplace;
    }

    get punctuationReplaceChar () {
        return this._punctuationReplaceChar;
    }

    get filterStrict () {
        return this._filterStrict;
    }

    get filterSemiStrict () {
        return this._filterSemiStrict;
    }

    get filterParial () {
        return this._filterParial;
    }

    get consecutiveCount () {
        return this._consecutiveCount;
    }
}

// this is the controller for FAQ settings
    // to use this controller you just have to run execute
    // constructor will ensure that you have the FAQ
        // it also ensures that you don't have to define FAQ everytime you call executable
    // the execute runs on the user message
    // you can change any of the settings through their base set methods
    // by not changing the variables their assumed defaults will be used
class Controller extends Defaults { // base for controller
    _FAQ;
    constructor (faqArr) {
        super();
        this._FAQ = faqArr;
        if ( !Array.isArray(this.FAQ) ) 
            throw new Error(`Failed to initialize FAQ, -${FAQ}-. In order for the controller to function it requires an array of FAQ. Questions and their respective Answer should be a single combined entry within the array. ex ['Q... A...', 'Q... A...'] `);
        // end if
    }

    set FAQ (arr = ['']) { return this._FAQ = arr }
    get FAQ () { return this._FAQ }

    test (msgArr = ['']) {
        msgArr.forEach ((msg, i) => {
            console.log(`- testing case #`, i +1, '-');
            console.log(`Input:`);
            console.log(msg);
            try { // just to catch unforseen errors
                const result = this.execute(msg);
                console.log(`Result:`);
                console.log(result);
            } catch (error) {
                console.warn(`------ FAQ failed ------`);
                console.error(error);
                console.log(`------ * ------`);
            } 
            console.log(`-- end case #`, i +1, '--');
            console.log(``);
        });

        return msgArr;
    }

    execute (msg = '') {
        return outputFAQ(msg, this.FAQ, this.settings); 
    }
}

export { Defaults, Settings, Controller }