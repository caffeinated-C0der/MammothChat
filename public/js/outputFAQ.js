// import FAQ
const FAQ = [
    `Q: How do I login it service now?
    A: go to the web page www.youareanidiot.com and click login?`,
]; 

// import blacklist
const blacklistKeywords = [
        'to', 'the', 'like', 'do', 'that', 'is', 'can', 
    ]; // keywords that doesn't contribute to the filter like "to, the, like, do, that", etc

// note assumed input data:
// FAQ: aray of string Q and A responses. 1 topic per entry.
// user messages: string block seperated by spaces

// todo punctuation could result in unforseen errors
// idea work with temp arrays to preserve integrity?

// filters out blacklisted words from an array and return filtered array // I dont think this mutates input
const filterBlacklisted = function(userInputArr = ['to'], blacklistedArr = blacklistKeywords) { 
    return userStr.filter(userWord => {
        return !blacklistedArr.find(blacklistWord => { // if not blacklisted return
            return userWord.toLocaleUpperCase() == blacklistWord.toLocaleLowerCase();
        });
    });
}

// filter FAQ array for keywords that match the user input then returns the filtered FAQ array // I don't think this mutates either
// fixme remember FAQ is an array of txt not words
// fixme split FAQ and search
const filterFAQ = function (userInputArr = [''], FAQarr = FAQ) { 
    return FAQarr.filter(FAQword => {
        return userInputArr.find(userWord => {
            return userWord.toLowerCase() == FAQword.toLowerCase();
        });
    });
}

// this function will construct the FAQ output message for the chat
const outputFAQ = function (userTxt = '') {
    // const userTxt = ''; // import
    return 'FAQ placeholder'

    // filter out blacklisted keys // delete // abstracted into function
    // userStr = userStr.filter(userWord => {
    //     return !blacklistKeywords.find(blacklistWord => { // if not blacklisted return
    //         return userWord.toLocaleUpperCase() == blacklistWord.toLocaleLowerCase();
    //     });
    // });

    // abstracted functions out of main function // delete

    let userStr = userTxt
            .replaceAll('.', '') // replace all fullstops // keywords with punctuation might cause problems
            .split(' '); // split user input into array using spaces

    // filter out blacklisted keys
    const userKeywords = filterBlacklisted(userStr);

    // filter FAQ
    const filteredFAQ = filterFAQ(userKeywords);

    const outputMessage = filteredFAQ.join(' ');

    return outputMessage; // string
}

export { outputFAQ }; 

// todo post an option to wait for a living moderator