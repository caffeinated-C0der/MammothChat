// user story // sortoff

// output sample/ expected output or execution
/*
*${user} enters chat*
BOT: Greetings fleshy lump how may we help you? You may use the command "!resolve" at any time to mark your ticket as resolved.
User: User shovels their shit out of their ass...
BOT: I have compiled these FAQ questions related to your problem.
    Would you like to join the queue to speak to another fleshy lump? (Please respond "!yes" or "!no").     
    Please note that after 10 minutes outside of the queue we will assume the problem has been resolved and will close the ticket)
User: !yes moron
BOT: Invalid command
User: yes!
BOT: Invalid command 
User: !yes
BOT: See was that so hard? You have been placed #183th in queue. A fleshy lump will be assigned to you once available
User: !resolve.
BOT: Invalid command
User: !resolve
BOT: Thank you for contacting support, you have been removed from the queue and your ticked has been marked as resolved.
*Ticket Closed*

----

*${user} enters chat*
BOT: Greetings fleshy lump how may we help you? You may use the command "!resolve" at any time to mark your ticket as resolved.
User: My brain is broken.
BOT: I failed to compile any FAQ related to your problem. 
    You have been moved to position #7 in the queue to speak to another fleshy lump.
BOT: Admin Murphy has been assigned to your ticket.
ADMIN: Have you tried taking an asprin?
User: I am allergic to asprin
ADMIN: Try drinking panado or 1g in total of paracetamol.
User: thanks i will try that
ADMIN: !resolve
BOT: Thank you for contacting support, your ticked has been marked as resolved.
*Ticket Closed*
*/

// created a script execution keyword execute chatbot.js directly (npm run faq)
// I am using this block to test the FAQ function
import { outputFAQ } from './outputFAQ.js';

console.log(``);
console.log(`-------------- FAQ --------------`);
console.log(``);

// junk data - meant to be humorous
const faqInputArray = [
    `Q: can't log into service now?\nA: Grow a pair`,
    `Q: Why do I need a password?\nA: I mean if you're that dumb...`,
    `Q: To login to the services the first time.\nA: The password will be your credit card number, remember to change it`,
    `Q: Do you require assistance?\nA: how much are you willing to pay?`,
    `Q: Security won't let me park inside.\nA: because I told them to stop idiots like you from taking my parking spot`,
    `Q: why do i need to install a virtual machine\nA: because cross platform support is a bit janky without a vm`
];

const userMessages = [
    'I am struggling to login to the website',
    "The webpage doesn't allow me to login",
    'How do I reset my password?',
    'What is the first password that I need to use?',
    'Where can I find the help desk?',
    'Can I park inside the campus',
    'How do I install a vm onto my computer'
];

// very DRY, I dont care
if (false) { // bulk
    userMessages.forEach((question, i) => {  
    console.log(`- testing case #`, i +1, '-');
    console.log(`User: ${question}`);
    console.log(`---`);
    let output = 'ERROR';
    try { // just to catch unforseen errors
        console.log(`FAQ Trace:`);
        output = outputFAQ(question, faqInputArray);
    } catch (error) {
        console.error(`FAQ failed`, error);
    } 
    console.log(`Result:\n${output}`);
    console.log(`-- end case #`, i +1, '--');
    console.log(``);
})} else { // single
    const [question] = userMessages.slice(-1);
    console.log(`- testing case #`, userMessages.length -1, '-');
    console.log(`User: ${question}`);
    console.log(`---`);
    try { // just to catch unforseen errors
        console.log(`FAQ Trace:`);
        const output = outputFAQ(question, faqInputArray);
        console.log(`Result:\n${output}`);
    } catch (error) {
        console.warn(` === FAQ failed === `);
        console.error(error);
        console.log(``);
    } 
    console.log(`-- end case #`, userMessages.length -1, '--');
    console.log(``);
}

console.log(``);
console.log(`========================= END =========================`);
console.log(``);

// idea !commands?