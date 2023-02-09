import { Defaults } from "./Defaults.js";

// base class for filter logic
class Filter {
    _Settings = new Defaults();
    constructor(SettingsObject = new Defaults, userMessage) {
        this._Settings = SettingsObject;
        this._msg = userMessage;
    }

    set Settings (SettingsObject = new Defaults) {
        this._Settings = SettingsObject;
    }

    get Settings () {
        return this._Settings;
    }

    set msg (text) {
        this._msg = text;
    }

    get msg () {
        return this._msg;
    }

    execute (faqEntry) {
        return [];
    }

    accept (visitor) {
        visitor.accept(this);
        return visitor;
    }
}

class Strict extends Filter {
    constructor(SettingsObject = new Defaults, userMessage) {
        super(SettingsObject, userMessage);
    }

    execute (FAQ = []) {
        const temp = [];

        this.msg.forEach( userKeyword => {
            FAQ.forEach( faqKeyword => {
                if (userKeyword.toLowerCase() == faqKeyword.toLowerCase()) temp.push(userKeyword);
            });
        });

        return temp;
    }
}

class SemiStrict extends Filter {
    constructor(SettingsObject = new Defaults, userMessage) {
        super(SettingsObject, userMessage);
    }

    execute (faqEntry = []) {
         // destructoring required defaults
        // note by using the .settings get method we are only receiving a copy and not the actual variable
        const { consecutiveCount } = this.Settings.settings;

        // filter keywords arrays by removing entries.length < SettingsObject.consecutiveCount
        const   faq = [...faqEntry].filter( (word) => !(word.length < consecutiveCount) ),
                msg = [...this.msg].filter( (word) => !(word.length < consecutiveCount) ),
            // init for output
            temp = []; 
        
        msg.forEach( (msgKeyword, k) => {
            // slice gives you exactly the same length as consecutive
            const message = msgKeyword.slice(0, consecutiveCount).toLowerCase(); // ['ins','ont','com']
        
            faq.forEach( (faqKeyword, j) => {
                // converting keyword to lowercase for direct string comparison
                const answer = faqKeyword.slice(0, consecutiveCount).toLowerCase(); // ['why','nee', 'ins', etc]
        
                if (message == answer) temp.push(msg[k]);
            } );
        } ); 
        
        return temp; 
    }
}

export { Strict, SemiStrict, Partial }

////////////////////////////// ignore everything below this point ///////////

class Partial extends Filter {
    constructor(SettingsObject = new Defaults) {
        super(SettingsObject);
    }
    
    execute (faqEntry) {
        // console.log(`   - recieved input -`);
        // console.log(`   msg:\n`, msg);
        // console.log(`   faqEntry:\n`, faqEntry);
        // console.log(``);
        throw new Error('Partial currently out of order')
        return []; // exit

         // console.log(`       filterParial running`);
        const temp = partialComparison(faq, txt, defaults); 

        if (temp.length >! 0) return; 

        matchedIndex.add(i);
        temp.forEach( key => matchedKeywords.add(key) )
    }
}

const partialComparison = function (
FAQ = [], // FROZEN FAQ is an array of words 
MSG = [], // array of words 
// defaults = { bool: true, consecutive: 3 } // be very careful with this variable // todo fix all object parameters
defaults = new Controller()
) {
// destructoring required defaults
const { consecutiveCount } = defaults;

// debug verify if this is working as expected as well as other comparison functions

// review code
//note we should probably do a strict check for words smaller than defaults.consecutive, to catch things like 'VM'
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