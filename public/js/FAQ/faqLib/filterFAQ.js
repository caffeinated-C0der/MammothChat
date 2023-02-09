import { Defaults } from "./Defaults.js"
import { Strict, SemiStrict, Partial } from "./Filter.js";

// ---------------------- * Main Filter Logic * ---------------------- //

// filter FAQ array for keywords that match the user input then returns the filtered FAQ array // I don't think this mutates either
// dont pull defaults from top scope let the function supply them
const filterFAQ = function (userInputArr, defaults = new Defaults()) { // abstracted FAQ into defaults
    // called by outputFAQ

    // destructoring dependancies
    const { filterSemiStrict, filterStrict, FAQ } = defaults;

    // in this instance txt is constant and wont be changed
    const txt = (  Array.isArray(userInputArr) ) ? [ ...userInputArr ] : [ '' ]; // copy

    // populating filter array
    // consider making this more dynamic
    const filters = [];
    if (filterStrict) filters.push(new Strict(defaults, txt));
    if (filterSemiStrict) filters.push(new SemiStrict(defaults, txt));
    // if (filterParial) filters.push(new Partial(defaults, txt));
    // if (filterParial) console.warn(`Filter partial isn't currently supported`);

    // store array of index rather than filter array to preserve original copy
    // and allow a new array to be filtered by the index rather than the content
    /// the use of sets will eliminate the need to check for duplication
    const matchedKeywords = new Set(), 
          matchedIndex    = new Set();

    let last; // just for catching incorrect iteration/ looping errors

    defaults.report('Pushing defaults down into filters.');

    FAQ // ['Q: this. A: that.'] 
        .map(sentenceStr => sentenceStr.replaceAll('\n', ' ')) // remove \n tags before we split else headache
        .map (sentenceStr => {
            return replacePunctuationByArray(sentenceStr, defaults) // ['Q  this   A  that '] // remove punctuation
                .split (' ') // split into array  
                .filter (el => el != '' && el != ' ') // remove spaces // ['Q', 'this', 'A', 'that']  
            // .map((val, i, arr) => {if (!i) {console.log(`*array:\n`, arr);}; return val}) // tool
        })
        // this map is more like a forEach
        .forEach ((faq, i, ar) => { // faq is an array of words
            const now = faq;

            if (now == last) throw new Error('- FAQ not iterating properly within filterFAQ. Last entry equal to current entry. -');
            else last = now;

            // the less strict the filter the more results but also more possible unrelated results

            if (filters.length > 0) filters.forEach (klass => {
                const temp = klass.execute(faq);
                if (temp.length > 0) temp.forEach( keyword => matchedKeywords.add(keyword));
                if (temp.length > 0) matchedIndex.add(i);
            });
        } // end final inner
    ); // end outer

    defaults.report(`Matched Keywords - [${[...matchedKeywords].toString()}]`);
    defaults.report(`Resulting Indexes - [${[...matchedIndex].toString()}]`);
    
    console.log(`   ----------------`);

    // array/ set of indexes that had a keyword match
    // set eliminates duplicatation but needs to be spread and returned within array
    return matchedIndex;
}

// ---------------------- * Helper functions * ---------------------- //
// helper function abstraction of replacePunctuationByArray
// same functionality as replacePunctuationByArray but without strict defaults
// this is to allow other executions with same method if so desired
const replaceByArray = (inputString = '', arrToReplace = [''], replacementStr = '') => { 
    let replaced = inputString.slice(0);

    arrToReplace.forEach(replaceThis => {
        // note replaceAll doesn't work and rexes require a lot of effort to make work due to replacing symbols
        while (replaced.split('').find(char => char.toLowerCase() == replaceThis.toLowerCase()) ) 
            replaced = replaced.replace(replaceThis, replacementStr)
    });
    return replaced;
}

// replace characters function
const replacePunctuationByArray = function (text = '', defaults = new Defaults()) {
    // destructoring for required defaults
    const { punctuationToReplace, punctuationReplaceChar } = defaults.settings;
 
    return replaceByArray(text.slice(0), punctuationToReplace, punctuationReplaceChar);
}

// this function removes invalid keywords from an array of keywords
// return a copy of an array that has the correct keywords removed
// only define defaults as the correct data type of a null equivalent, let the main function handle data defaults
const removeFalsePositives = function(strArr = [''], keywordsToRemove = ['']) { 
    // make a copy of the original then filter array
        // by not returning the entries that are found within the remove array
    const filteredArr = [ ...strArr ]
            .filter (word => !keywordsToRemove.find (remove => word.toLowerCase() == remove.toLowerCase(), false)); 

    return filteredArr; // return new array rather than mutating parameter
}

export { filterFAQ, replaceByArray, replacePunctuationByArray, removeFalsePositives }
