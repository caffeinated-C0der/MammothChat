// warning this file is a bit messy, still need to clean previous drafts
// const FAQ = [
//     `Q: How do I login it service now?
//     A: go to the web page www.youareanidiot.com and click login?`,
// ]; 

// const FAQpaired = [
//     [`Q: How do I login it service now?`],
//     [`A: go to the web page www.youareanidiot.com and click login?`]
// ]; 

const blacklistKeywords = [
        'to', 'the', 'like', 'do', 'that', 'is', 'can', 
    ]; // keywords that doesn't contribute to the filter like "to, the, like, do, that", etc

const punctuationArr = [ 
    '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', 
    '-', '.', '/', ':', ';', '?', '@', '[', ']', '^', '_', 
    '{', '|', '}', '~' ]; // does not include backtilt and backslash as those don't like being in strings

// replace characters function
const replaceByArray = function (text = '', punctuationArray = [ ...punctuationArr ], replacementChar = ' ') {
    const output = text.slice(0); // dont mutate parameters
    punctuationArray.forEach (char => output.replaceAll(`${char}`, `${replacementChar}`));
    return output;
}

// note assumed input data: // delete?
// FAQ: aray of string Q and A responses. 1 topic per entry.
// user messages: string block seperated by spaces

// todo punctuation could result in unforseen errors // delete
// idea work with temp arrays to preserve integrity? // delete

// filters out blacklisted words from an array and return filtered array // I dont think this mutates input
// const filterBlacklisted = function(userInputArr = ['to'], blacklistedArr = blacklistKeywords) { 
//     return userInputArr.filter(userWord => {
//         return !blacklistedArr.find(blacklistWord => { // if not blacklisted return
//             return userWord.toLocaleUpperCase() == blacklistWord.toLocaleLowerCase();
//         });
//     });
// }

// return a copy of an array that has the correct keywords removed
// dont pull default data from top 
// this function removes invalid keywords from an array of keywords
const removeFalsePositives = function(strArr = [''], keywordsToRemove = ['']) { 
    // return userInputArr.filter(userWord => {
    //     return !blacklistedArr.find(blacklistWord => { // if not blacklisted return
    //         return userWord.toLowerCase() == blacklistWord.toLowerCase();
    //     });
    // });

    // make a copy of the original then filter array
        // by not returning the entries that are found within the remove array
    const filteredArr = [ ...strArr ]
            .filter (word => !keywordsToRemove.find (remove => word.toLowerCase() == remove.toLowerCase(), false)); 

    return filteredArr; // return new array rather than mutating parameter
}

// filter FAQ array for keywords that match the user input then returns the filtered FAQ array // I don't think this mutates either
// dont pull defaults from top scope let the function supply them
const filterFAQ = function (userInputArr, FAQarr, strict = true) { 
    // remove the default but also enforce the correct type
    const FAQ = ( typeof FAQarr == Array ) ? [ ...FAQarr ] : [ '' ]; // copy
    const txt = ( typeof userInputArr == Array ) ? [ ...userInputArr ] : [ '' ]; // copy

    // store array of index rather than filter array to preserve original copy
    // and allow a new array to be filtered by the index rather than the content
    // const index = []; 
    const output = [];

    FAQ // ['Q: this. A: that.'] 
        .map (sentence => replaceByArray(sentence, punctuationArr, ' ')) // ['Q  this   A  that '] // remove punctuation
        .split (' ') // ['Q', ' ', ' ', 'this', ' ', ' ', ' ', 'A', ' ', ' ', 'that', ' '] // split into array
        .filter (el => el != ' ') // ['Q', 'this', 'A', 'that'] // remove spaces
        .map ((faq, i) => {
            if (txt.find (msg => faq.toLowerCase() = msg.toLowerCase())) output.push(i);
        });

    // if (strict) { // todo
    // } else {
    //     // not supported yet
    // }

    // return FAQ.filter(FAQquery => { // delete
    //     return userInputArr.find(userWord => {
    //         return FAQquery // punctuation will intefere with string comparison
    //             .replaceAll('.', '')
    //             .replaceAll(':', '')
    //             .replaceAll(',', '')
    //             .split(' ') // split sentence into array
    //             .find(FAQword => { return userWord.toLowerCase() == FAQword.toLowerCase() });
    //     });
    // });

    // array of indexes that had a keyword match
    return [ ...output ]; // make copy again
}

// this function will construct the FAQ output message for the chat
// instead of the normal way of declaring parameters the function accepts an object of settings
    // this allows the programer to choose which paramters they wish to declare
    // and in what order, this also makes it easier to add additional parameters later
    // without having to make major changes elsewhere in the code
    // and if you do it wont affect the rest of the app (if done within reason)
// using defaults to specify expected data types
// some of the default values act as commands to abort certain actions
    // that might otherwise result in an error 
// note that partial comparison might result in a more intensive comparison (performance)
const outputFAQ = function (settings = { 
        userTxt: `!abort`, // clean user message string (can be multi-lined)
        FAQ: [`!abort`], // array of FAQ current testing format ['Q: this. /n A: that.'] 
        wordsToIgnore: blacklistKeywords, // common words that result in a false positive when comparing
        punctuationToReplace: punctuationArr, // array of punctuation to replace with '' when comparing string
        punctuationReplaceChar: '', // character to replace punctuation
        strictFilter: true, // strict string comparison or partial comparison // not implemented yet // todo
        consecutiveMatch: 3 // how many consecutive characters need to match in a parial comparison // todo
    }) {

    // a litte destructoring // avoids having to use settings. for every variable
    // FAQ renamed so that I can use it as a new variable called FAQ
    const {userTxt, FAQ: questions, wordsToIgnore, punctuationToReplace, punctuationReplaceChar, strictFilter, consecutiveMatch} = settings;
    
    let text = userTxt.slice(0); // make a copy
    const FAQ = [...questions]; // copy
    const filteredFAQ = []; 

    // guard clause for the !abort command // delete !abort9ik./.?
    if (text.toLowerCase() == '!abort' || // testing user text [strict]
        text.toLowerCase().split(' ').find(txt => txt == '!abort') || // testing user text [semi-strict]
        FAQ[0].toLowerCase() == '!abort' || // testing first index of FAQ
        FAQ[0][0].toLowerCase() == '!abort' || // testing first index of an array within FAQ array
        FAQ[0][1].toLowerCase() == '!abort' // testing second index of an array within FAQ array
    ) return '*FAQ aborted*'; // if the user sends '!abort' through this function they will stop the FAQ
    // instead of throwing an error the expected result which is string is returned

    // text = userTxt // delete
    //         .replaceAll('.', '') // replace all fullstops // keywords with punctuation might cause problems
    //         .split(' '); // split user input into array using spaces

    // if there is something to replace then replace it
    // accepts str returns str
    if (punctuationToReplace.length > 0 ) text = replaceByArray(text, punctuationToReplace, punctuationReplaceChar);
        // {punctuationToReplace.forEach (char => text.replaceAll(`${char}`, `${punctuationReplaceChar}`))};

    text = text.split(' '); // makes string an array

    // accepts array returns array
    if (wordsToIgnore.length > 0) text = removeFalsePositives(text, wordsToIgnore);
    
    // debug
    console.log(`if this isn't and array then fixme`, text); 
    console.log(`FAQ might also cause problems at this point`, FAQ);

    // get index for filtering the FAQ
    const index = filterFAQ(text, FAQ); // array of indexes

    index.forEach(index => {
        filteredFAQ.push(FAQ[index]);
    });

    console.log(`final result FAQ array`,filteredFAQ );

    // filter FAQ based on user's query
    // if (strictFilter) { // todo
    // } else {
    //     // not supported yet
    // }

    // filter out blacklisted keys
    // const userKeywords = filterBlacklisted(userStr);

    // filter FAQ
    // const filteredFAQ = filterFAQ(userKeywords);

    // const outputMessage = filteredFAQ.join(' '); 
    // return outputMessage? outputMessage : 'I failed to compile any FAQ related to your problem.'; // string
    // return 'FAQ placeholder';

    // const outputMessage = ( filteredFAQ.length > 0 )? filteredFAQ.join(' '): 'I failed to compile any FAQ related to your problem.';
    // return outputMessage; // string

    return ( filteredFAQ.length > 0 ) ? filteredFAQ.join(' \n') : 'I failed to compile any FAQ related to your problem.'; // string
}

export { outputFAQ }; 

// todo elsewhere
// post an option to wait for a living moderator

// note might consider returning output or something that can be recognised as a command that indicates that the FAQ failed