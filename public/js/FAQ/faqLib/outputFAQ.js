import { filterFAQ, replacePunctuationByArray, removeFalsePositives } from './filterFAQ.js'
import { Defaults } from './Defaults.js';

// called by faqController
const outputFAQ = function ( userTxt = ``, defaults = new Defaults() ) {
    // destructuring dependancies
    const { wordsToIgnore, punctuationToReplace, FAQ } = defaults;  

    let text = userTxt.slice(0); // make a copy

    // if there is something to replace then replace it
    // accepts str returns str
    if ( punctuationToReplace.length > 0 ) {
        defaults.report('Retrieving punctuationToReplace.')
        defaults.report('Retrieving punctuationReplaceChar.')
        text = replacePunctuationByArray(text, defaults); 
    }

    if (!Array.isArray(text)) text = text.split(' '); // makes string an array

    // accepts array returns array
    if (wordsToIgnore.length > 0) { 
        defaults.report('Retrieving wordsToIgnore.');
        text = removeFalsePositives(text, wordsToIgnore);
    }; 

    // get index for filtering the FAQ // array of indexes
    // indexes already in set which means there shouldn't be any futher duplicatation
    defaults.report('Pushing Settings down into filterFAQ.')
    const indexArray = [ ...filterFAQ(text, defaults).values() ]; 
    const filteredFAQ = []; // output

    
    defaults.report('Retrieving FAQ.');
    // set is similar to an array except it cant hold duplicates and is an object not array
    if (indexArray.length > 0) indexArray.forEach(index => filteredFAQ.push( FAQ[index] ));
    else return ''; // early exit

    // review returning null if nothing found
    return ( filteredFAQ.length > 0 ) ? [...filteredFAQ].join('\n\n') : ''; // final safety net 
    // returning string
}

export { outputFAQ };

    // resolved matched keywords empty [], but the indexes stored [ 0 ]
    // resolved posible issue storing first index without keyword then ending execution
    // resolved settings not carrying properly
    // resolved replaceByArray not working
    // resolved faq doesnt iterate properly in the filters
    // resolved unable to use .report outside of Default class
    // resolved no matched keywords
    // resolved match indexes contains all indexes instead of those based on keywords
    // resolved-sortoff use class based filter logic
    // resolved fixed strict and non strict consecutive
    // resolved let functions pull their data from the defaults Object instead of this function using settings
    // resolved make all these settings variables obsolete 
    // resolved settings are carrying over correctly
    // resolved fixed replaceAll
    // resolved punctuation not removed
    // resolved defaults not destructured correctly to new class names
    // resolved storing all indexes instead of relevant ones
    // resolved import new filters and execute their logic

    // todo generic regex filter logic
    // todo update existing filters to use regex
