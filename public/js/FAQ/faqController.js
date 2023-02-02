import { outputFAQ } from "./faqLib/outputFAQ.js";
import { Defaults } from './faqLib/Defaults.js';

// this is the controller for FAQ settings
    // to use this controller you just have to run execute
    // constructor will ensure that you have the FAQ
        // it also ensures that you don't have to define FAQ everytime you call executable
    // the execute runs on the user message
    // you can change any of the settings through their base set methods
    // by not changing the variables their assumed defaults will be used
    class Controller extends Defaults { // base for controller
        // _FAQ; // abstracted
        constructor (faqArr = []) {
            super();
            this.report('FAQ Controller Created');
            // console.log(`Init controller FAQ constructor Input:\n`, faqArr);
            // console.log(`   ------------------------------------------------`);
            this.FAQ = faqArr;
            // console.log(`Controller is FAQ valid?\n`, this.FAQ);
            // console.log(`   ------------------------------------------------`);
            if ( !Array.isArray(this.FAQ) ) {
                this.report('Failed to instanciate Controller due to FAQ input incorrect type');
                throw new Error(
            `Failed to initialize FAQ, "-${this.FAQ}-". \nIn order for the FAQ filter controller to function as intended, it requires an array of FAQ. \nQuestions and their respective Answer should be a single combined entry within the array. ex ['0: Q... A...', '1: Q... A...'] \nNote that the numerical values in this instance refers to the index position and not any required format. However if you do include numerical values like in the example rest assured it won't impact the search results. It may however be confusing for the user to see as an example 0, then 5, then 11 once filtered.\n`);
            }
        }
    
        // set FAQ (arr = ['']) { this._FAQ = arr } // abstracted into defaults
        // get FAQ () { return this._FAQ } 
    
        test (msgArr = ['']) {
            // console.log(`FAQ.length > 0 in controller test`, this.FAQ.length > 0); // this is not the problem
            this.report('Running controller test.');
    
            msgArr.forEach ((msg, i) => {
                console.log(`- testing case #`, i +1, '-');
                console.log(`Input:`);
                console.log(msg);
                try { // just to catch unforseen errors
                    const result = this.execute(msg);
                    console.log(`Result:`);
                    console.log(result);
                } catch (error) {
                    this.report('FAQ test Failed')
                    console.warn(`------ FAQ failed ------`);
                    console.error(error);
                    console.log(`------ * ------`);
                } 
                console.log(`-- end case #`, i +1, '--');
                console.log(``);
            });
    
            this.report('Ending controller test.');
            return this.log;
        }
    
        execute (msg = '') {
            this.report('Running controller execute.');
            const result = outputFAQ(msg, this.settings); 
            this.report('Ending controller execute.');
            return result;
        }
    }

    export { Controller }