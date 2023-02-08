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
        constructor (faqArr = []) {
            super();
            this.report('FAQ Controller Created');
            this.FAQ = faqArr;
            if ( !Array.isArray(this.FAQ) ) {
                this.report('Failed to instanciate Controller due to FAQ input incorrect type');
                throw new Error(
            `Failed to initialize FAQ, "-${this.FAQ}-". \nIn order for the FAQ filter controller to function as intended, it requires an array of FAQ. \nQuestions and their respective Answer should be a single combined entry within the array. ex ['0: Q... A...', '1: Q... A...'] \nNote that the numerical values in this instance refers to the index position and not any required format. However if you do include numerical values like in the example rest assured it won't impact the search results. It may however be confusing for the user to see as an example 0, then 5, then 11 once filtered.\n`);
            }
        }
    
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
                    console.error(' >>> ', `${error.name}: ${error.message}`, ' <<< \n\n', error, '\n'); 
                    console.log(`------ * ------`);
                } 
                console.log(`\n-- end case #`, i +1, '--');
                console.log(``);
            });
    
            this.report('Ending controller test.');
            return this.log;
        }
    
        execute (msg = '') {
            // console.log(`   * controller filter settings *\n`, Object.entries(this.filters));
            // console.log(``);

            this.report('Running controller execute.');
            // note this.settings does not include the functions just a frozen copy of the variables
            // const result = outputFAQ(msg, this.settings); 
            // me is the controller and not just limited to the frozen settings obj
            const result = outputFAQ(msg, this.me); 
            this.report('Ending controller execute.');
            return result;
        }
    }

    export { Controller }