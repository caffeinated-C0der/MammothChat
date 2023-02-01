const blacklistKeywords = [
    'to', 'the', 'like', 'do', 'that', 'is', 'can', 'i', 'am', 'a', 'how', 'my', 'me',
     'you', 'what', 'need',  'your', 'who', 'are', 'could', 'for', 'out', 'of'
]; // keywords that doesn't contribute to the filter like "to, the, like, do, that", etc

const punctuationArr = [ 
'!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', 
'-', '.', '/', ':', ';', '?', '@', '[', ']', '^', '_', 
'{', '|', '}', '~' ]; // does not include backtilt and backslash as those don't like being in strings
// might need to try using other methods to include those into strings for comparison

// import { blacklistKeywords, punctuationArr } from "./config.js"; 

class Settings { // base 
    _log = [];
    constructor() {
        
    }

    get log () {
        console.log(`--- Status Report ---`);
        this._log.forEach((status, i) => console.log('  ', `${`${i}`.padStart(3, 0)}: ${status}`));
        console.log(`---  Status End  ---`);
        // return this._log.join('\n');
        return this._log;
    }

    report (status = '') {
        this._log.push( status );
    }

    execute (value = null) {
        return value;
    }

    test (testArr = []) {
        testArr.forEach(el => this.execute(el));
        // this.log;
        // return testArr;

        return this.log;
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
    _FAQ = []; // to relieve dependancies
    
    // defaults act as the parameters for settings hence why we extend
    // in order for the settings object to work correctly it requires all the settings
    // in the event that more settings would be added if you get undefined just add the property to this settings sub class
    constructor() { 
        super() 
        this._settings = {
           wordsToIgnore          : this._wordsToIgnore, 
           punctuationToReplace   : this._punctuationToReplace, 
           punctuationReplaceChar : this._punctuationReplaceChar, 
           filterStrict           : this._filterStrict, 
           filterSemiStrict       : this._filterSemiStrict, 
           filterParial           : this._filterParial, 
           consecutiveCount       : this._consecutiveCount,
           FAQ                    : this._FAQ
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
        this.report('wordsToIgnore has been overwriten');
        return this._wordsToIgnore = arr;
    }

    set punctuationToReplace (arr = [...punctuationArr]) {
        this.report('set punctuationToReplace (arr = [...punctuationArr]) { has been overwriten');
        return this._punctuationToReplace = arr;
    }

    set punctuationReplaceChar (str = '') {
        this.report('punctuationReplaceChar has been overwriten');
        return this._punctuationReplaceChar = str;
    }

    set filterStrict (bool = true) {
        this.report('filterStrict has been overwriten');
        return this._filterStrict = bool;
    }

    set filterSemiStrict (bool = true) {
        this.report('filterSemiStrict has been overwriten');
        return this._filterSemiStrict = bool;
    }

    set filterParial (bool = true) {
        this.report('filterParial has been overwriten');
        return this._filterParial = bool;
    }

    set consecutiveCount (int = 3) {
        this.report('consecutiveCount has been overwriten');
        return this._consecutiveCount = int;
    }

    set FAQ (arr = []) {
        if (this.FAQ.length > 0) this.report(`Deleting entries in FAQ, [${this.FAQ}]`);
        while (this.FAQ.length > 0) this._FAQ.pop();
        this.report('FAQ has been overwriten');
        
        return this._FAQ.push(...arr);
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

    get FAQ () {
        return this._FAQ;
    }
}

export { Defaults, Settings }


// // this is the controller for FAQ settings // abstracted into its own module
//     // to use this controller you just have to run execute
//     // constructor will ensure that you have the FAQ
//         // it also ensures that you don't have to define FAQ everytime you call executable
//     // the execute runs on the user message
//     // you can change any of the settings through their base set methods
//     // by not changing the variables their assumed defaults will be used
// class Controller extends Defaults { // base for controller
//     _FAQ;
//     constructor (faqArr = ['']) {
//         super();
//         this._FAQ = faqArr;
//         if ( !Array.isArray(this.FAQ) ) {
//             this.report('Failed to instanciate Controller due to FAQ input incorrect type');
//             throw new Error(`Failed to initialize FAQ, -${FAQ}-. In order for the controller to function it requires an array of FAQ. Questions and their respective Answer should be a single combined entry within the array. ex ['Q... A...', 'Q... A...'] `);
//         }
//     }

//     set FAQ (arr = ['']) { return this._FAQ = arr }
//     get FAQ () { return this._FAQ }

//     test (msgArr = ['']) {
//         // console.log(`FAQ.length > 0 in controller test`, this.FAQ.length > 0); // this is not the problem

//         msgArr.forEach ((msg, i) => {
//             console.log(`- testing case #`, i +1, '-');
//             console.log(`Input:`);
//             console.log(msg);
//             try { // just to catch unforseen errors
//                 const result = this.execute(msg);
//                 console.log(`Result:`);
//                 console.log(result);
//             } catch (error) {
//                 this.report('FAQ test Failed')
//                 console.warn(`------ FAQ failed ------`);
//                 console.error(error);
//                 console.log(`------ * ------`);
//             } 
//             console.log(`-- end case #`, i +1, '--');
//             console.log(``);
//         });

//         return this.log;
//     }

//     execute (msg = '') {
//         console.log(`FAQ.length > 0 in controller execute`, this.FAQ.length > 0); // this is not the problem
//         return outputFAQ(msg, this.settings); 
//     }
// }
