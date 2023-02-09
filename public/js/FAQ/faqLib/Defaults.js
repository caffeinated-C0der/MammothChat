const blacklistKeywords = [
    'to', 'the', 'like', 'do', 'that', 'is', 'can', 'i', 'am', 'a', 'how', 'my', 'me',
     'you', 'what', 'need',  'your', 'who', 'are', 'could', 'for', 'out', 'of'
]; // keywords that doesn't contribute to the filter like "to, the, like, do, that", etc

const punctuationArr = [ 
'!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', 
'-', '.', '/', ':', ';', '?', '@', '[', ']', '^', '_', 
'{', '|', '}', '~', '`', '\\'];
// might need to try using other methods to include those into strings for comparison

class Settings { // base 
    _log = [];
    _reportStartPaddingAmount = 0; // modify this manually im not going to bother right now
    constructor() {  }

    get log () {
        this.report('Printing log to console');
        console.log(`--- Status Report ---`);
        this._log.forEach((status, i) => console.log(`${'  '.repeat(this._reportStartPaddingAmount)}${`${i}`.padStart(3, 0)}: ${status}`));
        console.log(`---  Status End  ---`);
        // return this._log.join('\n');
        return this._log;
    }

    report (status = '') {
        this._log.push( status );
    }

    execute (value = null) {
        this.report('Base class execute');
        return value;
    }

    test (testArr = []) {
        this.report('Base class test');
        testArr.forEach(el => this.execute(el));

        return this._log;
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
        super();
    }

    // note settings and filters are read-only
    get settings () {
        // this.report('Retrieving copy of *settings* as a frozen object.'); // spam
        return Object.freeze({
            wordsToIgnore          : this._wordsToIgnore, 
            punctuationToReplace   : this._punctuationToReplace, 
            punctuationReplaceChar : this._punctuationReplaceChar, 
            filterStrict           : this._filterStrict, 
            filterSemiStrict       : this._filterSemiStrict, 
            filterParial           : this._filterParial, 
            consecutiveCount       : this._consecutiveCount,
            FAQ                    : this._FAQ
         });
    }

    get filters () {
        // this.report('Retrieving copy of *filters* as a frozen object.'); // spam
        return Object.freeze({
            filterStrict           : this._filterStrict, 
            filterSemiStrict       : this._filterSemiStrict
            // filterParial           : this._filterParial, // redacted
        });
    }

    get me () {
        return this;
    }

    // set addSetting (item) { // cant do this unless variables stored in a map or sub object
    //     this.settings.push(item); // consider
    // }

    // set functions to overwrite single settings
    // unfortunatly since this isnt typescript we can't assign default datatypes
    // consider abstracting this class to a typescript file for type handling
    set wordsToIgnore (arr = [...blacklistKeywords]) {
        this.report(`wordsToIgnore CHANGED*.`);
        return this._wordsToIgnore = arr;
    }

    set punctuationToReplace (arr = [...punctuationArr]) {
        this.report(`punctuationToReplace CHANGED*.`);
        return this._punctuationToReplace = arr;
    }

    appendWordsToIgnore (...stuff) {
        this.report(`Appending to wordsToIgnore. [${stuff}]`);
        // this.wordsToIgnore = this.wordsToIgnore.concat(...stuff); 
        this.wordsToIgnore = [...this._wordsToIgnore, ...stuff];
        return this._wordsToIgnore;
    } 

    appendPunctuationToReplace (...stuff) {
        this.report(`Appending to punctuationToReplace. [${stuff}]`);
        // this.punctuationToReplace = this.punctuationToReplace.concat(...stuff); 
        this.punctuationToReplace = [...this._punctuationToReplace, ...stuff];
        return this._punctuationToReplace; 
    }

    set punctuationReplaceChar (str = '') {
        this.report(`punctuationReplaceChar CHANGED*. (${this._punctuationReplaceChar} ->> ${str})`);
        return this._punctuationReplaceChar = str;
    }

    set filterStrict (bool = true) {
        this.report(`filterStrict CHANGED*. (${this._filterStrict} ->> ${bool})`);
        return this._filterStrict = bool;
    }

    set filterSemiStrict (bool = true) {
        this.report(`filterSemiStrict CHANGED*. (${this._filterSemiStrict} ->> ${bool})`);
        return this._filterSemiStrict = bool;
    }

    set filterParial (bool = true) {
        this.report(`filterParial CHANGED*. (${this._filterParial} ->> ${bool})`);
        return this._filterParial = bool;
    }

    set consecutiveCount (int = 3) {
        this.report(`consecutiveCount CHANGED*. (${this._consecutiveCount} ->> ${int})`);
        return this._consecutiveCount = int;
    }

    set FAQ (arr = []) {
        if (this.FAQ.length > 0) this.report(`Deleting entries in FAQ, [${this._FAQ}]`);
        while (this.FAQ.length > 0) this._FAQ.pop();
        this.report('FAQ CHANGED*');
        
        return this._FAQ.push(...arr);
    }

    // get functions
    get wordsToIgnore () {
        this.report(`Retrieving wordsToIgnore.`);
        return this._wordsToIgnore;
    }

    get punctuationToReplace () {
        this.report(`Retrieving punctuationToReplace.`);
        return this._punctuationToReplace;
    }

    get punctuationReplaceChar () {
        this.report(`Retrieving punctuationReplaceChar.`);
        return this._punctuationReplaceChar;
    }

    get filterStrict () {
        this.report(`Retrieving filterStrict. (${this._filterStrict})`);
        return this._filterStrict;
    }

    get filterSemiStrict () {
        this.report(`Retrieving filterSemiStrict. (${this._filterSemiStrict})`);
        return this._filterSemiStrict;
    }

    get filterParial () {
        this.report(`Retrieving filterParial. (${this._filterParial})`);
        return this._filterParial;
    }

    get consecutiveCount () {
        this.report(`Retrieving consecutiveCount. (${this._consecutiveCount})`);
        return this._consecutiveCount;
    }

    get FAQ () {
        this.report('Retrieving FAQ.');
        return [ ...new Set( this._FAQ ) ]; // global elimination of duplicates on FAQ
    }

    resetFilters (bool = false) {
        this.report(`Reseting Filters *${bool}.`)
        this.filterStrict = bool;
        this.filterSemiStrict = bool;
        // this.filterParial = bool;
    }

    toggleFilterStrict () {
        this.report(`Toggle "FilterStrict" *(${this.filterStrict} ->> ${!this.filterStrict}).`);
        this.filterStrict = !this.filterStrict;
    }

    toggleFilterSemiStrict () { 
        this.report(`Toggle "FilterSemiStrict" *(${this.filterSemiStrict} ->> ${!this.filterSemiStrict}).`);
        this.filterSemiStrict = !this.filterSemiStrict;
    }

    // toggleFilterParial () { 
    //     this.report(`Toggle "FilterParial" *(${this.filterParial} ->> ${!this.filterParial}).`);
    //     this.filterParial = !this.filterParial;
    // }
}

export { Defaults, Settings }