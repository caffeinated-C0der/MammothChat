import { filterFAQ, replaceByArray, replacePunctuationByArray, nonStrictComparison, removeFalsePositives } from './faqFunctionsLib.js'
// import { Controller } from '../faqController.js';
import { Defaults } from './Defaults.js';

const outputFAQ = function ( userTxt = ``, Def = new Defaults() ) {
    // a litte destructoring // avoids having to use settings. for every variable
        // like how we are using defaultValues.
    // using destructoring as a practical way of redefining undefined settings
    // all of these variables need to exist in the scope of this function
    const { // todo let functions pull their data from the defaults Object instead of this function using settings
        // todo make all these settings variables obsolete 
        wordsToIgnore, 
        punctuationToReplace,
        punctuationReplaceChar,
        filterStrict,
        filterSemiStrict,
        filterParial,
        consecutiveCount,
        FAQ
    } = Def;  // review comment
    // most of the sub functions of the lib module will have their own settings object
        // this is to manage the repective function and allow for more modular execution

    let text = userTxt.slice(0); // make a copy
    // const FAQ = [...settings.FAQ]; // copy

    // if there is something to replace then replace it
    // accepts str returns str
    if ( punctuationToReplace.length > 0 ) text = replacePunctuationByArray(text, Def); 

    if (!Array.isArray(text)) text = text.split(' '); // makes string an array
    // const txt = [...text]; // consider

    // accepts array returns array
    if (wordsToIgnore.length > 0) text = removeFalsePositives(text, wordsToIgnore); 
    
    // get index for filtering the FAQ // array of indexes
    // indexes already in set which means there shouldn't be any futher duplicatation
    const indexArray = [ ...filterFAQ(text, Def).values() ]; 
    const filteredFAQ = []; // output
    
    // set is similar to an array except it cant hold duplicates and is an object not array
    if (indexArray.length > 0) indexArray.forEach(index => filteredFAQ.push( FAQ[index] ));
    else return ''; // early exit

    // review returning null if nothing found
    // return ( filteredFAQ.length > 0 ) ? filteredFAQ.values().join('\n') : 'I failed to compile any FAQ related to your problem.'; // string
    // final safety net
    return ( filteredFAQ.length > 0 ) ? [...filteredFAQ].join('\n') : ''; // string
}

export { outputFAQ };

    // resolved matched keywords empty [], but the indexes stored [ 0 ]
    // resolved posible issue storing first index without keyword then ending execution

    // report update matches working as intended but matched indexes stores all
    // report identify if its just one filter or all and if it may be how all process index

    // report all 3 filters has exactly the same results which mean the general filter logic is bugged