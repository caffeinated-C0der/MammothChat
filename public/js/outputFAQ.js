// stored externally to allow remote changes without changing outputFAQ functionality
// different level of abstraction to avoid altering the FAQ function
import { blacklistKeywords, punctuationArr } from "./settings.js"; 

// const blacklistKeywords = [
//         'to', 'the', 'like', 'do', 'that', 'is', 'can', 'i', 'am', 'a', 'how', 'my', 'me'//, 'need', 
//     ]; // keywords that doesn't contribute to the filter like "to, the, like, do, that", etc

// const punctuationArr = [ 
//     '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', 
//     '-', '.', '/', ':', ';', '?', '@', '[', ']', '^', '_', 
//     '{', '|', '}', '~' ]; // does not include backtilt and backslash as those don't like being in strings
//     // might need to try using other methods to include those into strings for comparison

// replace characters function
const replaceByArray = function (text = '', punctuationArray = [ ...punctuationArr ], replacementChar = ' ') {
    let output = text.slice(0); // dont mutate parameters // replaceAll doesn't mutate it returns new str

    punctuationArray.forEach (char => { output = output.replaceAll(`${char}`, `${replacementChar}`); }); // doesnt expressly return

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

// Mutative function. Instead of returning a result and not mutating parameters this function
// will mutate some of the parameters and then return the unmutated version of the first parameter
// I repeat, DONT mutate the first parameter
// todo refactor object settings from parameter to avoid accidental parameter deletion 
// todo return boolean instead of FAQ
const nonStrictComparison = function (
        FAQ = [], // FROZEN FAQ is an array of words 
        MSG = [], // array of words 
        // matchArr = [], // MUTATE array of matched keywords 
        // output = [], // MUTATE array of indexes 
        settings = { bool: true, consecutive: 3 } // be very careful with this variable
        ) {
            // delete logic unused
    // split string into array of char
    // itterate through keywords
    // then compare until a match
    // then increase match counter
    // compare next char
    // if match increase counter until match counter == consecutive or not matching anymore
    // repeat until end of array - consecutive
    // if match mutate matchArr and output
    // let isValid = true, skipCounter = 0;
    // this way we can still output which keyword triggered a match through index of word
    // but also allow us to partial match whole words rather than parts of multiple words
    // faq contains spaces while msg is an array with char arrays for each word
    // msg contains mainly keywords and will be used for comparison


    const   faq = [...FAQ] // array of char ['Q',  ' ', 'w', 'h', 'y', ' ', 'd', 'o', ' ', 'i']
                    .join('').split(' ') // ['Q', 'why','do','i','need',o','install','a','virtual','machine, etc]
                
                // delete first attempt
                // note true keeps char, false discards char 
                // .filter((char, i, arr) => { // remove words with length smaller than consecutive match length
                //     // if ( (((arr.length - i) >! settings.consecutive)) ) // comparison
                //     let count = 0, 
                //         keepChar = true; // assume we keep char and then test if we shouldnt

                //     // we need to skip the testing if a word has been accepted
                //     if (char == ' ' && longEnoughCount) longEnoughWord = false;
                //     if (longEnoughWord && longEnoughCount) {
                //         longEnoughCount--;
                //         return true;
                //     }
                //     else {
                //         longEnoughWord = false;
                //         longEnoughCount = 0;
                //     }

                //     if (longEnoughWord && longEnoughCount) {
                //         console.warn(`Error in FAQ partial comparison`);
                //         throw new Error('this should never have been thrown')
                //     }

                //     // fixme currently removing all spaces, only needs to do so when a word is removed
                //     while ( 
                //             (count < settings.consecutive) && // only test for string length equal to consecutive
                //             (i + settings.consecutive <= arr.length) && // only test until you reach the last possible matching characters
                //             keepChar && !longEnoughWord ) // failsafe
                //         {
                //         if ( arr[i + count].toLowerCase() == ' ' ) keepChar = false; // if char a space dont keep
                //         count++;
                //     }

                //     if (keepChar) {
                //         longEnoughWord = true;
                //         longEnoughCount = settings.consecutive; // subtract until 0 // Boolean(0) == false // any value above 0 == true
                //     }
                    
                //     // console.log(`partial match result`);
                //     // console.log(`arr`, arr);
                //     // console.log(`index & char & keepChar`, i, `'${char}'`, '-', keepChar);
                //     // console.log(`long enough & remaining count`, longEnoughWord, longEnoughCount);
                //     return keepChar;
                // }) 
                // ['Q', 'why','do','i','need',o','install','a','virtual','machine, etc]

                    // remove everything smaller than consecutive length
                    .filter( (word) => !(word.length < settings.consecutive) ), // ['why','need', 'install','virtual','machine, etc]
                    // if (!i) console.log(`Current:`, arr);
                    // console.log(`index: `, i);
                    // console.log(`word: `, word);
                    // console.log(`word length:`, word.length);
                    // console.log(``);
                 
                    // // if skipCounter > 0 then return true and decrease skip
                    // if (skipCounter) { // Boolean(1+) == true
                    //     skipCounter--;
                    //     return true;
                    // } // else Boolean(0) == false
                    
                    // list all filter conditions/ anything that eliminates an option
                    // if word smaller than consecutive then there is no point testing it for a partial match
                    // if (word.length < settings.consecutive) return false; // false filters out

                    // keep everything else
                    // return true;


            // .map((val, i, arr) => {if (!i) {console.log(`array:`, arr);}; return val}) // use this to see data  
    msg = [...MSG] // [ 'install', 'vm', 'onto', 'computer' ]
                // remove everything smaller than consecutive length
                .filter(keyword => !(keyword.length < settings.consecutive) ); // [ 'install', 'onto', 'computer' ]
    // .map(word => word.split('')) // array of array of char [[ 'h', 'e', 'l', 'l', 'o' ], ['w', 'o', 'r', 'l', 'd']]
    
    // todo
    // index of faq is handled outside of the function only index of each word within msg matters

    // })

    // console.log(`- Partial match debugger -`);
    // console.log(`       faq:`, faq); // ['why','need', 'install','virtual','machine, etc]
    // console.log(`       msg:`, msg); // [ 'install', 'onto', 'computer' ]

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

    // maybe return an object? object in object out
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
    const output = [], matched = []; 
    let faqWithSpaces;
    // const allMatches = [];

    FAQ // ['Q: this. A: that.'] 
        .map (sentence => {
            faqWithSpaces = replaceByArray(sentence, punctuationArr, '');
            return faqWithSpaces // ['Q  this   A  that '] // remove punctuation
            .split (' ') // ['Q', '', '', 'this', '', '', '', 'A', '', '', 'that', ''] // split into array  
            .filter (el => el != '' && el != ' ') // ['Q', 'this', 'A', 'that'] // remove spaces       
        })
        .map ((faq, i, ar) => { // faq is an array of words
            let x = 0, found = false, debug;
            Object.freeze(faq); // frozen just incase 

            // faq.forEach(str => { 
            //     // console.log(`str`, str);
            //     const key = txt.find( msg => str.toLowerCase() == msg.toLowerCase() );
            //     if (key) allMatches.push(key);
            //     // console.log(`key`, key);
            // });

            // guard clause format rather than another layer of nesting
            // non strict comparison
            // todo need store index i // refactor // matched.push(  )
            if (nonStrictComparison) {
                const temp = [...nonStrictComparison(faqWithSpaces, txt, strict)];

                if (temp.length >! 0) return faq;  // not match found
                // else match found

                output.push(i);
                matched.push( ...temp );
                
                return faq;
            }; // else

            // const partialOuput = [];
            // nonStrictComparison(faqWithSpaces, txt, partial, partialOuput, strict); // just triggering console.log doesnt affect result

            // strict comparison
            while (x < faq.length) { // try to refactor this
                if (txt.find (el => {  // word
                        // .debug = [el, faq[x]];
                        debug = el;
                        return el.toLowerCase() == faq[x].toLowerCase();
                    })) {
                    output.push(i);
                    found = true;

                    matched.push(debug); // only push if found
                }
                x++;
            }

            return faq; // remember to return with map
        }); 
        
    // console.log(`debug matched keywords:`, matched);

    // tracing exists in order to add more works to the filter
    // this is a manual process but with some time most keywords will be relevant
    if (trace.bool) {
    // console.log(`- start data tracing -`);

        // console.log(`   ALL MATCHES   :`, (allMatches.length > 0) ? [ ...new Set(allMatches)] : 'none');
        console.log(`   ${!strict.bool? 'STRICT MATCH' : 'PARTIAL MATCH'}:`, (matched.length > 0) ? [ ...new Set(matched)] : 'none');
        // else                console.log(`   PARTIAL MATCH :`, (matched.length > 0) ? [ ...new Set(matched)] : 'none'); 

    // console.log(`- end data tracing -`);
    // console.log(``);
    }

    console.log(`   ----------------`);

    // array of indexes that had a keyword match
    // set eliminates any possible duplicates
    // set needs to be spread because it's an object not an array
    return [ ...new Set(output) ]; // fixme somehow outputs all entries
}

// consider moving main function to the top of the scope - functions are hoisted
// this function will construct the FAQ output message for the chat
// instead of the normal way of declaring parameters the function accepts an object of settings
    // this allows the programer to choose which paramters they wish to declare
    // and in what order, this also makes it easier to add additional parameters later
    // without having to make major changes elsewhere in the code
    // and if you do it wont affect the rest of the app (if done within reason)
// using defaults to specify expected data types
// some of the default values act as commands to abort certain actions
    // that might otherwise result in an error 
// note that partial comparison might result in a more intensive comparison (performance wise) 
const outputFAQ = function (
    userTxt = `!abort`, // clean user message string (can be multi-lined)
    FAQquestions = [`!abort`], // array of FAQ current testing format ['Q: this. /n A: that.'] 
    // unforseen error: when trying to alter one or more keywords in settings you overwrite the entire object, deleting the other defaults
    settings = { // be careful when overwriting this // refactor 
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

    // guard clause for the !abort command // delete !abort? 
    if (text.toLowerCase() == '!abort' || // testing user text [strict]
        text.toLowerCase().split(' ').find(txt => txt == '!abort') || // testing user text [semi-strict]
        FAQ[0].toLowerCase() == '!abort' || // testing first index of FAQ
        FAQ[0][0].toLowerCase() == '!abort' || // testing first index of an array within FAQ array
        FAQ[0][1].toLowerCase() == '!abort' // testing second index of an array within FAQ array
    ) return '*FAQ aborted*'; // if the user sends '!abort' through this function they will stop the FAQ
    // instead of throwing an error the expected result which is string is returned

    // if there is something to replace then replace it
    // accepts str returns str
    if (punctuationToReplace.length > 0 ) text = replaceByArray(text, punctuationToReplace, punctuationReplaceChar);
        // {punctuationToReplace.forEach (char => text.replaceAll(`${char}`, `${punctuationReplaceChar}`))};

    text = text.split(' '); // makes string an array

    // accepts array returns array
    if (wordsToIgnore.length > 0) text = removeFalsePositives(text, wordsToIgnore);
    
    // get index for filtering the FAQ
    const index = filterFAQ(text, FAQ, {bool: strictFilter, consecutive: consecutiveMatch}, {bool: true}); // array of indexes

    index.forEach(index => {
        filteredFAQ.push(FAQ[index]);
    });

    console.log(`   Total Matches :`, [ ...new Set(filteredFAQ)].length);
    console.log(``);

    return ( filteredFAQ.length > 0 ) ? [ ...new Set(filteredFAQ)].join('\n') : 'I failed to compile any FAQ related to your problem.'; // string
}

export { outputFAQ }; 

// review keep or discard the command option/ idea 

// refactor change some arrays to sets to eliminate duplication 