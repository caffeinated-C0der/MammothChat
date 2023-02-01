import { Defaults } from "./Defaults.js"

// ---------------------- * Main Filter Logic * ---------------------- //

// filter FAQ array for keywords that match the user input then returns the filtered FAQ array // I don't think this mutates either
// dont pull defaults from top scope let the function supply them
const filterFAQ = function (userInputArr, settings = new Defaults()) { // abstracted FAQ into defaults
    // destructoring dependancies
    const { filterParial, filterSemiStrict, filterStrict, consecutiveCount, FAQ } = settings;

    // remove the default but also enforce the correct type
    // const FAQ = (  Array.isArray(settings.FAQ) ) ? [ ...FAQ ] : [ '' ]; // copy
    const txt = (  Array.isArray(userInputArr) ) ? [ ...userInputArr ] : [ '' ]; // copy

    // store array of index rather than filter array to preserve original copy
    // and allow a new array to be filtered by the index rather than the content
    const matchedKeywords = new Set(), 
          matchedIndex    = new Set();

    const faqWithSpaces = [];

    FAQ // ['Q: this. A: that.'] 
        .map(sentenceStr => sentenceStr.replaceAll('\n', ' ')) // remove \n tags before we split else headache
        .map (sentenceStr => {
            faqWithSpaces.push( replacePunctuationByArray(sentenceStr, settings) ); 

            // console.log(`faqWithSpaces`, faqWithSpaces);
            // console.log(`sentenceStr`, sentenceStr);

            return faqWithSpaces[0] // ['Q  this   A  that '] // remove punctuation
                // note due to changes in code faqWithSpaces is already in the correct format for filtering
                .split (' ') // ['Q', '', '', 'this', '', '', '', 'A', '', '', 'that', ''] // split into array  
                .filter (el => el != '' && el != ' ') // ['Q', 'this', 'A', 'that'] // remove spaces 
            // .map((val, i, arr) => {if (!i) {console.log(`array:`, arr);}; return val}) // tool
        })
        // this map is more like a forEach
        .forEach ((faq, i) => { // faq is an array of words
            // console.log(`faqWithSpaces inside forEach\n`, faq);
            // note dont overwrite i 
            /* i= 5  ***(example from old testing data)***
                faq = [ 'Q', 'why', 'do', 'i', 'need', 'to', 'install',  'a', 'virtual',  'machine\nA', 
                        'because', 'cross', 'platform', 'support', 'is', 'a', 'bit', 'janky', 'without',  'a', 'vm' ]  */
            // Object.freeze(faq); // frozen

            // each filter down will most likely have more matches
            // thus more results but also less related results

            // strict comparison
            if (filterStrict){ 
                txt.forEach( userKeyword => { // [ 'install', 'vm', 'onto', 'computer' ]
                    // const findKeyword = faq.find( faqKeyword => faqKeyword.toLowerCase() == userKeyword.toLowerCase() ); 
                    const findKeyword = faq.find( faqKeyword => { // debug delete
                        // console.log(`   comparison`);
                        // console.log(`       faqKeyword.toLowerCase() == userKeyword.toLowerCase()`);
                        // console.log(`       ${faqKeyword.toLowerCase()} == ${userKeyword.toLowerCase()}`);
                        return faqKeyword.toLowerCase() == userKeyword.toLowerCase();
                    }); 
                    // console.log(`faq`, faq);
                    // console.log(`keyword`, userKeyword);
                    // console.log(`   findKeyword`, findKeyword);
                    // returns true or undefined

                    // if keyword not found exit else store result
                    if (!findKeyword) return; // if undefined return // foreach return not .map

                    matchedIndex.add(i);
                    matchedKeywords.add(userKeyword);
                });
            }

            // partially strict comparison
            if (filterSemiStrict) { 
                const temp = [...nonStrictComparison([faqWithSpaces[i]], txt, settings)]; 

                if (temp.length >! 0) return;  // return if match not found
                // else match found and continue

                matchedIndex.add(i);
                temp.forEach( key => matchedKeywords.add(key) );
            }; 

            // daniel's partial comparison
            // same logic as semi strict
            if (filterParial) { 
                const temp = partialComparison(faq, txt, settings); 

                if (temp.length >! 0) return; 

                matchedIndex.add(i);
                temp.forEach( key => matchedKeywords.add(key) )
            }

            // todo filterNonConsecutivePartialStrict
            // strict matching of keywords the same length as keyword
            // example vm and vm-windows
            // matching smaller than consecutive

        } // end final inner
    ); // end outer
    
    // report matched keywords empty [], but the indexes stored [ 0 ]
    // report posible issue storing first index without keyword then ending execution

    // report update matches working as intended but matched indexes stores all
    // report identify if its just one filter or all and if it may be how all process index

    console.log(`- Filter Results -`);
    console.log(`   matchedKeywords: `.padEnd(20), [ ...matchedKeywords.values() ]);
    console.log(`   matchedIndex: `.padEnd(20), [ ...matchedIndex.values() ]);
        
    console.log(`   ----------------`);

    // array/ set of indexes that had a keyword match
    // set eliminates duplicatation but needs to be spread and returned within array
    return matchedIndex;
}

// ---------------------- * Helper functions * ---------------------- //
// helper function abstraction of replacePunctuationByArray
// same functionality as replacePunctuationByArray but without strict settings
// this is to allow other executions with same method if so desired
const replaceByArray = (strToReplace = '', arrToReplace = [''], replacementStr = '') => 
    { arrToReplace.forEach(str => strToReplace.replaceAll(`${str}`, `${replacementStr}`)) }

// replace characters function
const replacePunctuationByArray = function (text = '', settings = new Defaults()) {
    let output = text.slice(0); // dont mutate parameters // replaceAll doesn't mutate it returns new str

    // destructoring for required settings
    const {punctuationArray, replacementChar} = settings;

    replaceByArray(output, punctuationArray, replacementChar);

    return output;
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

// ---------------------- * Comparison functions * ---------------------- //

// note might need to refactor subfunctions of filter due to duplicated code
// same input and several steps identical

// dont mutate parameters
// Partial string comparison by comparing a certain amount of character instead of the whole word
// compares from the start of the word up to the consecutive length for both sets of keywords
const nonStrictComparison = function (
        FAQ = [], // FROZEN FAQ is an array of words - this isn't the original FAQ array but a manipulation
        MSG = [], // array of words 
        // settings = { bool: true, consecutive: 3 } // be very careful with this variable // todo fix all object 
        // note bool was absolete in this context
        settings = new Controller()
) {
    // destructoring required settings
    const { consecutiveCount } = settings;

    // review code
    // .map((val, i, arr) => {if (!i) {console.log(`array:`, arr);}; return val}) // use this to see data  
    const   faq = [...FAQ] // array of char ['Q',  ' ', 'w', 'h', 'y', ' ', 'd', 'o', ' ', 'i']
                        .join('').split(' ') // ['Q', 'why','do','i','need',o','install','a', etc]
                        // remove everything smaller than consecutive length
                        .filter( (word) => !(word.length < consecutiveCount) ), // ['why','need', 'install','virtual','machine, etc]
            msg = [...MSG] // [ 'install', 'vm', 'onto', 'computer' ]
                        .filter( (word) => !(word.length < consecutiveCount) ); // [ 'install', 'onto', 'computer' ]
    
    const match = [];

    msg.forEach( (msgKeyword, i) => {
        // slice gives you exactly the same length as consecutive
        const message = msgKeyword.slice(0, consecutiveCount).toLowerCase(); // ['ins','ont','com']

        faq.forEach( (faqKeyword) => {
            // converting keyword to lowercase for direct string comparison
            const answer = faqKeyword.slice(0, consecutiveCount).toLowerCase(); // ['why','nee', 'ins', etc]

            if (message != answer) return match;
            // else
            match.push(msg[i]);
        } );
    } );

    return match; 
}

// refactor // todo split existing comparison filters each into their own sub function
// note we currently have strict, strictPartial & partial

// refactor version of partial matching by daniel
// refactor work it back into the main logic the start should be the same as current logic 
// refactor with only the lower part being different
// rename into parial existing two methods are strict and strictPartial respectively
//a different version of partial match. Looks to find matches to any substring of length specified in settings obj
const partialComparison = function (
    FAQ = [], // FROZEN FAQ is an array of words 
    MSG = [], // array of words 
    // settings = { bool: true, consecutive: 3 } // be very careful with this variable // todo fix all object parameters
    settings = new Controller()
) {
    // destructoring required settings
    const { consecutiveCount } = settings;

    // debug verify if this is working as expected as well as other comparison functions

    // review code
    //note we should probably do a strict check for words smaller than settings.consecutive, to catch things like 'VM'
    // .map((val, i, arr) => {if (!i) {console.log(`array:`, arr);}; return val}) // use this to see data  
    const   faq = [...FAQ] // array of char ['Q',  ' ', 'w', 'h', 'y', ' ', 'd', 'o', ' ', 'i']
                        .join('').split(' ') // ['Q', 'why','do','i','need',o','install','a', etc]
                        // remove everything smaller than consecutive length
                        .filter( (word) => !(word.length < consecutiveCount) ), // ['why','need', 'install','virtual','machine, etc]
            msg = [...MSG] // [ 'install', 'vm', 'onto', 'computer' ]
                        .filter( (word) => !(word.length < consecutiveCount) ); // [ 'install', 'onto', 'computer' ]
    const match = [];
    //just making copies, variable naming is terrible i know
    const faq2 = [];
    const msg2 = [];
    //taking every substring of length == consecutive and pushing to faq2
    faq.forEach((word) => {
        for(let i = 0; i + consecutiveCount <= word.length; i++){
            let tempWord = word.slice(i, i + consecutiveCount);
            faq2.push(tempWord);
        }
    })
    //taking every substring of length == consecutiveCount and pushing to msg2
    msg.forEach((word) => {
        for(let i = 0; i + consecutiveCount <= word.length; i++){
            let tempWord = word.slice(i, i + consecutiveCount);
            msg2.push(tempWord);
        }
    })
    //comparing every keyword between msg2 and faq2, and pushing any matches to the array 'match'
    msg2.forEach( (faqKeyword, i) => {
        faq2.forEach( (msgKeyword, j) => {
            if(faqKeyword != msgKeyword) {
                return match;
            }
            else{
                match.push(msg2[i]);
            }
        })
    });

    return match;
}

export { filterFAQ, replaceByArray, replacePunctuationByArray, nonStrictComparison, removeFalsePositives }

// ---------------------- * Main execution/ controller/ exported function * ---------------------- //

// review comment
// defaults stored as a global viarable 
// to avoid some DRY duplication and to optimize declaration
// meaning we only have to change defaults once
// reason why defaults are assigned twice matters
    // first to aid whoever calls the exported function (refer as caller)
        // it shows them what variables they have access to
        // and the expected data types for those variables
    // the second reason they are assigned twice is due to the nature of objects
    // unfortunatly if the caller changes one variables the other dependant variables would be lost
    // in order to ensure that the caller can change a few specific variables without
        // losing the other declared paramerters
    // we thus need to define them outside of the function paramerters
    // however if we move the defaults out of the paramerters
    // the caller wont have access to/ be able to see which variables they have access to
// hence the DRY duplication of defaults
// the global viarable for defaults exist to simplify the DRY code
// these settings are meant to allow the admin/ mod to adjust the functionality of the FAQ as needed

// abstracted into its own module
// this function will construct the FAQ output message for the chat
// instead of the normal way of declaring parameters the function accepts an object of settings
    // this allows the programer to choose which paramters they wish to declare
    // and in what order, this also makes it easier to add additional parameters later
    // without having to make major changes elsewhere in the code
    // and if you do it wont affect the rest of the app (if done within reason)
// using defaults to specify expected data types
// const outputFAQ = function (
//     userTxt = ``, // clean user message string (can be multi-lined)
//     // FAQquestions = [``], // array of FAQ current format array of string ['Q: this. /n A: that.'] 
//     settings = new Controller() // Defaults doesnt have the FAQ array 
//     // delete once moved relevant comments consider moving descriptions into class for a describe method
//     // unforseen error: when trying to alter one or more keywords in settings you overwrite the entire object, deleting the other defaults
//         // this error is being accounted for by declaring the defaults twice 
//     // setting abstraction
//     // settings = { 
//     //     // *main functionality
//     //     wordsToIgnore: [...defaultValues.wordsToIgnore], // common words that result in a false positive when comparing
//     //     punctuationToReplace: [...defaultValues.punctuationToReplace], // array of punctuation to replace with '' when comparing string
//     //     punctuationReplaceChar: defaultValues.punctuationReplaceChar, // character to replace punctuation

//     //     // *filter functionality
//     //     // filter controls how expansive the FAQ results may be
//     //         // depending on how many cases are true more results would be displayed 
//     //         // depending on the respective strictness setting
//     //         // note that although these are their own subsection
//     //             // I did not split them into their own subsection 
//     //             // that would overcomplicate calling this function even futher
//     //     filterStrict: defaultValues.filterStrict, // strict word comparison
//     //     // following filters depended on consecutiveCount
//     //         filterSemiStrict: defaultValues.filterSemiStrict, // partial word comparison - first consecutive characters
//     //         filterParial: defaultValues.filterParial, // partial character comparison - anywhere consecutive characters

//     //     consecutiveCount: defaultValues.consecutiveCount // how many consecutive characters need to match in a parial comparison
//     // }
//     ) {

//     // a litte destructoring // avoids having to use settings. for every variable
//         // like how we are using defaultValues.
//     // using destructoring as a practical way of redefining undefined settings
//     // all of these variables need to exist in the scope of this function
//     const { // todo let functions pull their data from the defaults Object instead of this function using settings
//         // todo make all these settings variables obsolete 
//         wordsToIgnore, 
//         punctuationToReplace,
//         punctuationReplaceChar,
//         filterStrict,
//         filterSemiStrict,
//         filterParial,
//         consecutiveCount,
//         // FAQ
//     } = settings;  // review comment
//     // these settings would be split into new objects wherever they are relevant
//     // within the sub functions of this module the defaults would not be redined again
//         // the sub functions will rely on this function to handle defaults
//         // however the sub functions will have null equivalent default values
//             // mainly to indicate expected data types
//     // most of the sub functions of this module will have their own settings object
//         // this is to manage the repective function and allow for more modular execution

//     console.log(`   settings.FAQ at outputFAQ`, settings.FAQ); 

//     let text = userTxt.slice(0); // make a copy
//     const FAQ = [...settings.FAQ]; // copy

//     // report FAQ is somewhere [''] which causes the FAQ function to glitch


//     // if there is something to replace then replace it
//     // accepts str returns str
//     if ( punctuationToReplace.length > 0 ) text = replacePunctuationByArray(text, settings); 

//     if (!Array.isArray(text)) text = text.split(' '); // makes string an array
//     // const txt = [...text]; // consider

//     // accepts array returns array
//     if (wordsToIgnore.length > 0) text = removeFalsePositives(text, wordsToIgnore); 
    
//     // get index for filtering the FAQ // array of indexes
//     // indexes already in set which means there shouldn't be any futher duplicatation
//     const indexArray = [ ...filterFAQ(text, settings).values() ]; 
//     const filteredFAQ = []; // output
    
//     // console.log(`[...indexArray.values()]`, [...indexArray.values()]);
    
//     // set is similar to an array except it cant hold duplicates and is an object not array
//     if (indexArray.length > 0) indexArray.forEach(index => filteredFAQ.push( FAQ[index] ));
//     else return ''; // early exit

//     // review returning null if nothing found
//     // return ( filteredFAQ.length > 0 ) ? filteredFAQ.values().join('\n') : 'I failed to compile any FAQ related to your problem.'; // string
//     // final safety net
//     return ( filteredFAQ.length > 0 ) ? [...filteredFAQ].join('\n') : ''; // string
// }

// abstracted classes into its own module

// ---------------------- * Module End * ---------------------- //

// the Controller it the control unit for this module
// due to the strict handling of the data flow, the controller makes it easier to use this module
// it is also the best way to expand the functionality with minimal effort
// where to add more features or to give 'safer' control to the caller
// export { outputFAQ }; 
