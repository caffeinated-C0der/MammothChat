// stored externally to allow remote changes without changing outputFAQ functionality
// different level of abstraction to avoid altering the FAQ function
import { blacklistKeywords, punctuationArr } from "./settings.js"; 

// replace characters function
const replaceByArray = function (text = '', punctuationArray = [ ...punctuationArr ], replacementChar = ' ') {
    let output = text.slice(0); // dont mutate parameters // replaceAll doesn't mutate it returns new str

    punctuationArray.forEach (char => { output = output.replaceAll(`${char}`, `${replacementChar}`); }); 

    return output;
}

// return a copy of an array that has the correct keywords removed
// dont pull default data from top 
// this function removes invalid keywords from an array of keywords
const removeFalsePositives = function(strArr = [''], keywordsToRemove = ['']) { 
    // make a copy of the original then filter array
        // by not returning the entries that are found within the remove array
    const filteredArr = [ ...strArr ]
            .filter (word => !keywordsToRemove.find (remove => word.toLowerCase() == remove.toLowerCase(), false)); 

    return filteredArr; // return new array rather than mutating parameter
}

// idea return object instead of values
// dont mutate parameters
// Partial string comparison by comparing a certain amount of character instead of the whole word
// compares from the start of the word up to the consecutive length for both sets of keywords
const nonStrictComparison = function (
        FAQ = [], // FROZEN FAQ is an array of words 
        MSG = [], // array of words 
        settings = { bool: true, consecutive: 3 } // be very careful with this variable // todo fix all object parameters
) {
    // .map((val, i, arr) => {if (!i) {console.log(`array:`, arr);}; return val}) // use this to see data  
    const   faq = [...FAQ] // array of char ['Q',  ' ', 'w', 'h', 'y', ' ', 'd', 'o', ' ', 'i']
                        .join('').split(' ') // ['Q', 'why','do','i','need',o','install','a', etc]
                        // remove everything smaller than consecutive length
                        .filter( (word) => !(word.length < settings.consecutive) ), // ['why','need', 'install','virtual','machine, etc]
            msg = [...MSG] // [ 'install', 'vm', 'onto', 'computer' ]
                        .filter( (word) => !(word.length < settings.consecutive) ); // [ 'install', 'onto', 'computer' ]
    
    const match = [];

    msg.forEach( (msgKeyword, i) => {
        // slice gives you exactly the same length as consecutive
        const message = msgKeyword.slice(0, settings.consecutive).toLowerCase(); // ['ins','ont','com']

        faq.forEach( (faqKeyword) => {
            // converting keyword to lowercase for direct string comparison
            const answer = faqKeyword.slice(0, settings.consecutive).toLowerCase(); // ['why','nee', 'ins', etc]

            if (message != answer) return match;
            // else
            match.push(msg[i]);
        } );
    } );

    // idea maybe return an object? object in object out
    return match; 
}

// filter FAQ array for keywords that match the user input then returns the filtered FAQ array // I don't think this mutates either
// dont pull defaults from top scope let the function supply them
// todo abstract object settings from parameters to avoid accidental parameter deletion 
const filterFAQ = function (userInputArr, FAQarr, strict = { bool: false, consecutive: 3 }, trace = { bool: true }) { 
    // remove the default but also enforce the correct type
    const FAQ = (  Array.isArray(FAQarr) ) ? [ ...FAQarr ] : [ '' ]; // copy
    const txt = (  Array.isArray(userInputArr) ) ? [ ...userInputArr ] : [ '' ]; // copy

    // store array of index rather than filter array to preserve original copy
    // and allow a new array to be filtered by the index rather than the content
    const outputIndexArray = [], matchedKeywordsArray = []; 
    const outputIndexArrayP = [], matchedKeywordsArrayP = []; // delete just for testing
    let faqWithSpaces;

    FAQ // ['Q: this. A: that.'] 
        .map(sentenceStr => sentenceStr.replaceAll('\n', ' ')) // remove \n tags before we split else headache
        .map (sentenceStr => {
            faqWithSpaces = replaceByArray(sentenceStr, punctuationArr, '');
            return faqWithSpaces // ['Q  this   A  that '] // remove punctuation
            .split (' ') // ['Q', '', '', 'this', '', '', '', 'A', '', '', 'that', ''] // split into array  
            .filter (el => el != '' && el != ' ') // ['Q', 'this', 'A', 'that'] // remove spaces 
            // .map((val, i, arr) => {if (!i) {console.log(`array:`, arr);}; return val}) // delete
        })
        // this map is more like a forEach
        .map ((faq, i, ar) => { // faq is an array of words
            /* i= 5 
                faq = [ 'Q', 'why', 'do', 'i', 'need', 'to', 'install',  'a', 'virtual',  'machine\nA', 
                        'because', 'cross', 'platform', 'support', 'is', 'a', 'bit', 'janky', 'without',  'a', 'vm' ]  */
            Object.freeze(faq); // frozen

            // fix logic // priority ***
            // refactor use sets // priority *
            // note calculate strict keywords add them to set
            // note then add partial keywords and test all before returning functionality
            // note if partial not enabled then dont add them to keywords

            // note dont overwrite i
            // non strict comparison
            if (true) { // debug delete once working
            // if (!strict.bool) { // debug uncomment once working

            // note words like chemistry and biochemistry wont match with current partial Matching
            // todo revise or expand working functionality to include partial matches within words
                const temp = [...nonStrictComparison(faqWithSpaces, txt, strict)];

                if (temp.length > 0) {  // match found
                    outputIndexArrayP.push(i); // debug remove P once working and delete declaration
                    matchedKeywordsArrayP.push( ...temp ); // debug remove P once working and delete declaration
                }
                
                // return faq; // remember to return with map // debug uncomment once working
            }; // else strict comparison // idea do both rather than just one depending on bool
            txt.forEach( (userKeyword, k, arr) => { // [ 'install', 'vm', 'onto', 'computer' ]
                Object.freeze(userKeyword); // frozen
                // let index;
                const findKeyword = faq.find( (faqKeyword, j, arr) => {
                    // index = j; // fixed there is your problem
                    return faqKeyword.toLowerCase() == userKeyword.toLowerCase();
                } ); // returns true or undefined

                // if keyword not found exit else store result
                if (!findKeyword) return; // if undefined return // foreach return not .map

                // console.log(`storing result as index: keyword`,'-', index,':',key);
                // console.log(`find i: arr`,k,':', t); // this is array of words within faq
                // console.log(`foreach i:`,i); 

                outputIndexArray.push(i);
                matchedKeywordsArray.push(userKeyword);
            });

            return faq; // remember to return with map // refactor this is a forEach, dont need to map
        }); // end FAQ.map();
    
        console.log(`>>>>>>>>>>>>> results >>>>>>>>>>>>>`);
        console.log(`--- strict ---`); 
        console.log(`index:`, outputIndexArray, '||', 'expected result', [5]); // fixme convert to set to remove duplicates
        console.log(`keywords:`, matchedKeywordsArray, '||', 'expected result', ['install', 'vm']);
        console.log(``);

        console.log(`--- Partial ---`);
        console.log(`index:`, outputIndexArrayP, '||', 'expected result', [4, 5]); // fixme storing every index // note however nothing out of bounds
        console.log(`keywords:`, matchedKeywordsArrayP, '||', 'expected result', ['install']); // fixme storing only one match length +1 times
        console.log(``);
        
    // tracing exists in order to add more works to the filter
    // this is a manual process but with some time most keywords will be relevant
    if (trace.bool) {
        //currently only outputing strict
        console.log(`Matching Type :` , `${(true)? 'STRICT' : 'PARTIAL'}`); // todo strict and partial
        console.log(`Keywords      :`, ( matchedKeywordsArray.length > 0) ? [ ...new Set(matchedKeywordsArray)] : 'none'); // todo strict and partial
        console.log(`indexes       :`, outputIndexArray);
    }

    console.log(`   ----------------`);

    // array of indexes that had a keyword match
    // set eliminates any possible duplicates
    // set needs to be spread because it's an object not an array
    // return [ ...new Set(outputIndexArray) ]; 
    // return [ ...new Set((strict.bool)? outputIndexArray : matchedKeywordsArrayP) ]; // returning keywords like a dumbass
    return [ ...new Set((strict.bool)? outputIndexArray : outputIndexArrayP) ]; // delete outputIndexArrayP partial works
}

// consider moving main function to the top of the scope - functions are hoisted
// this function will construct the FAQ output message for the chat
// instead of the normal way of declaring parameters the function accepts an object of settings // wip
    // this allows the programer to choose which paramters they wish to declare
    // and in what order, this also makes it easier to add additional parameters later
    // without having to make major changes elsewhere in the code
    // and if you do it wont affect the rest of the app (if done within reason)
// using defaults to specify expected data types
const outputFAQ = function (
    userTxt = ``, // clean user message string (can be multi-lined)
    FAQquestions = [``], // array of FAQ current format array of string ['Q: this. /n A: that.'] 
    // unforseen error: when trying to alter one or more keywords in settings you overwrite the entire object, deleting the other defaults
    // abstraction of settings
    settings = { // be careful when overwriting this // refactor  // fixme
        wordsToIgnore: blacklistKeywords, // common words that result in a false positive when comparing
        punctuationToReplace: punctuationArr, // array of punctuation to replace with '' when comparing string
        punctuationReplaceChar: '', // character to replace punctuation
        strictFilter: true, // strict string comparison or partial comparison // not implemented yet // todo 
        consecutiveMatch: 3 // how many consecutive characters need to match in a parial comparison // todo 
    }) {

    // a litte destructoring // avoids having to use settings. for every variable
    // FAQ renamed so that I can use it as a new variable called FAQ
    const { wordsToIgnore, punctuationToReplace, punctuationReplaceChar, strictFilter, consecutiveMatch } = settings; // fixme 
    // idea for every setting, check if it exists then use it else use default, objects overwrite defaults 

    let text = userTxt.slice(0); // make a copy
    const FAQ = [...FAQquestions]; // copy
    const filteredFAQ = []; 

    // if there is something to replace then replace it
    // accepts str returns str
    if (punctuationToReplace.length > 0 ) text = replaceByArray(text, punctuationToReplace, punctuationReplaceChar);

    text = text.split(' '); // makes string an array

    // accepts array returns array
    if (wordsToIgnore.length > 0) text = removeFalsePositives(text, wordsToIgnore);
    
    // get index for filtering the FAQ // array of indexes
    const indexArray = filterFAQ(text, FAQ, {bool: strictFilter, consecutive: consecutiveMatch}, {bool: true}); 

    indexArray.forEach(index => {
        filteredFAQ.push(FAQ[index]);
    });

    // debug // delete
    console.log(`FAQ:`); 
    // FAQquestions.forEach ( (str, i) => console.log(`#`,i,' - ', str.replace('A:', '        A:')) ); // like a genius forgot this is all 
    filteredFAQ.forEach ( (str, i) => console.log(str.replace('A:', '        A:')) );
    console.log(``);
    console.log(`   Total Matches:`, [ ...new Set(filteredFAQ)].length);
    console.log(`Expected results:`, `strict -`, 1, '||', 'partial -', 2);
    console.log(``);

    // set is similar to an array except it cant hold duplicates and is an object not array
    // by spreading the set object '...' it can be converted into an array format
    return ( filteredFAQ.length > 0 ) ? [ ...new Set(filteredFAQ)].join('\n') : 'I failed to compile any FAQ related to your problem.'; // string
}

export { outputFAQ }; 

// refactor change some arrays to sets to eliminate duplication 