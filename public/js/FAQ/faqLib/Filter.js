import { Defaults } from "./Defaults.js";

// done import and execute filters in filterFAQ

// resolved creates filter classes to .execute
// resolved fix filter logic in filterFAQ

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

    //  strictComparison (keyword) {
    //     const findKeyword = faq.find( faqKeyword => { 
    //         if (faqKeyword.toLowerCase() == userKeyword.toLowerCase()) 
    //             console.log(`    Matched\n   ${faqKeyword.toLowerCase()} && ${userKeyword.toLowerCase()}`);

    //         return faqKeyword.toLowerCase() == userKeyword.toLowerCase();
    //     }); 
    // }

    execute (FAQ = []) {
        // this.Settings.report('Executing Strict Filter');
        // console.log(`   - recieved input -`);
        // console.log(`   msg:\n`, msg);
        // console.log(`   FAQ:\n`, FAQ);
        
        // console.log(`\n       - Strict filter -`);
        // console.log(`msg:   `,this.msg);
        // console.log(`faq:   `,FAQ);
        // console.log(``);

        const temp = [];

        this.msg.forEach( userKeyword => {
            FAQ.forEach( faqKeyword => {
                if (userKeyword.toLowerCase() == faqKeyword.toLowerCase()) temp.push(userKeyword);
            });
        });

        return temp;

        // delete old logic
        // txt.forEach( userKeyword => { // [ 'install', 'vm', 'onto', 'computer' ]
        //     // const findKeyword = faq.find( faqKeyword => faqKeyword.toLowerCase() == userKeyword.toLowerCase() ); 
        //     // todo change to same format as other 2 filters
        //     // todo then debug the iteration issue
    
        //     const temp = [...strictComparison()];
    
        //     // if keyword not found exit else store result
        //     if (temp.length >! 0) return; // return if match not found 
    
        //     console.log(`   Match found>>>>>>>>>`, temp);
        //     console.log(`       Index>>>`, i);
        //     console.log(`       faq>>>`, faq);
    
        //     matchedIndex.add(i);
        //     temp.forEach( key => matchedKeywords.add(key) );
    
        // });
    }
}

class SemiStrict extends Filter {
    constructor(SettingsObject = new Defaults, userMessage) {
        super(SettingsObject, userMessage);
    }

    nonStrictComparison ( FAQ = [] ) {
        // destructoring required defaults
        // note by using the .settings get method we are only receiving a copy and not the actual variable
        const { consecutiveCount } = this.Settings.settings;

        // console.log(`this is message:\n`, this.msg); // resolved didnt store input on init
        // console.log(` * FAQ input *     -`, FAQ); // resolved FAQ was already in correct format
        
        // .map((val, i, arr) => {if (!i) {console.log(`array:`, arr);}; return val}) // use this to see data  
        // const   faq = [...FAQ] // array of char ['Q',  ' ', 'w', 'h', 'y', ' ', 'd', 'o', ' ', 'i']
        //                     .join('').split(' ') // ['Q', 'why','do','i','need',o','install','a', etc]
        //                     // remove everything smaller than consecutive length
        //                     .filter( (word) => !(word.length < consecutiveCount) ), // ['why','need', 'install','virtual','machine, etc]

        // filter keywords arrays by removing entries.length < SettingsObject.consecutiveCount
        const   faq = [...FAQ].filter( (word) => !(word.length < consecutiveCount) ),
                msg = [...this.msg].filter( (word) => !(word.length < consecutiveCount) ),
            // init for output
            match = []; 
        
        // console.log(``);
        // console.log(` - partial match breakdown: - `);
        // console.log(`faq:   -`, faq);
        // console.log(`msg:   -`, msg);
        // console.log(``);
        
        msg.forEach( (msgKeyword, k) => {
            // slice gives you exactly the same length as consecutive
            const message = msgKeyword.slice(0, consecutiveCount).toLowerCase(); // ['ins','ont','com']
        
            faq.forEach( (faqKeyword, j) => {
                // converting keyword to lowercase for direct string comparison
                const answer = faqKeyword.slice(0, consecutiveCount).toLowerCase(); // ['why','nee', 'ins', etc]
        
                if (message == answer) match.push(msg[k]);
                
                    // console.log(``);
                    // console.log(`   ============================    `);
                    // console.log(`    = MATCHED = `);
                    // console.log(`key: ${msg[k]}/ as: (${message})    +    key: ${faq[j]}/ as: (${answer})`);
                    // console.log(`foreach msgKeyword: ${msgKeyword}    +    faqKeyword: ${faqKeyword}`);
                    // console.log(`   ============================    `);

                    // return match; // exit early
                
    
            } );
        } ); 

        // console.log(`   FINAL MATCHED:`, match);
        // console.log(`Conclusion:    - ${match.length > 0? '': 'DONT '}STORE INDEX -`);
        // console.log(``);
        
        return match; 
    }

    execute (faqEntry = []) {
        // console.log(`   - received input -`);
        // console.log(`   msg:\n`, this.msg);
        // console.log(`   faqEntry:\n`, faqEntry);
        // console.log(``);

        const temp = [...this.nonStrictComparison(faqEntry)]; 

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
