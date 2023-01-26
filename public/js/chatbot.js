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
import { Controller } from './outputFAQ.js';

console.log(``);
console.log(`-------------- FAQ --------------`);
console.log(``);

// junk data - meant to be humorous
const faqInputArray = [
    `Q: can't log into service now?\nA: contact support`,
    `Q: Why do I need a password?\nA: to login.`,
    `Q: To login to the services the first time.\nA: contact support`,
    `Q: Do you require assistance?\nA: how much are you willing to pay?`,
    `Q: Security won't let me park inside.\nA: sorry to hear about your problem`,
    `Q: why do i need to install a virtual machine\nA: because the app was created for windows`,
    //https://www.radiotimes.com/technology/pub-quiz-technology/
    `Q: The current richest man in the world Jeff Bezos is CEO and President of which online retailer?\nA: Amazon`,
    `Q: Which social media app only lets you view pictures and messages for a limited time?\nA: Snapchat`,
    `Q: What does a Geiger Counter measure?\nA: Radiation`,
    `Q: Which prestigious university did Microsoft founder Bill Gates drop out of?\nA: Harvard`,
    `Q: What year did the first Apple iPhone launch?\nA: 2007`,
    `Q: What unit of length is equal to around 5.8 trillion miles?\nA: Light Year`,
    `Q: What does CPU stand for?\nA: Central Processing Unit`,
    `Q: Created in 1990, what was the name of the first internet search engine?\nA: Archie`,
    `Q: In which decade was the Sony Walkman launched?\nA: 1970s`,
    `Q: Was electronics company Nintendo founded in 1889, 1946 or 1975?\nA: 1889 (Yes, really)`,
    `Q: From 2017 onwards, how many characters long can tweets be?\nA: 280 characters`,
    `Q: What is the name of Elon Musk's aerospace company?\nA: SpaceX`,
    `Q: Which duo invented the aeroplane?\nA: The Wright Brothers - Orville and Wilbur Wright`,
    `Q: What is the name of the classic 1972 arcade game based on table tennis?\nA: Pong`,
    `Q: What does the term LASER stand for?\nA: Light Amplification by Stimulated Emission of Radiation`,
    `Q: What does LG stand for in LG Electronics?\nA: Lucky-Goldstar`,
    `Q: Solar power generates electricity from what source?\nA: The Sun`,
    `Q: What is the name of the British computer scientist who invented the World Wide Web in 1989?\nA: Tim Berners-Lee`,
    `Q: Originally Amazon only sold which product?\nA: Books`,
    `Q: In what year was the first transatlantic radio broadcast?\nA: 1901`
];

const userMessages = [
    'I am struggling to login to the website',
    "The webpage doesn't allow me to login",
    'How do I reset my password?',
    'What is the first password that I need to use?',
    'Where can I find the help desk?',
    'Can I park inside the campus',
    'How do I install a vm onto my computer',
    // https://teambuilding.com/blog/random-questions
    'Who is the strangest coworker you ever had?',
    'Which fictional workplace would you like to get a job at?',
    'What task do you wish people would pay you to do?',
    'If you weren’t in this profession, what job would be your next choice?',
    'Who is the best boss you ever had?',
    'What is the most outrageous customer you ever had?',
    'What kind of person would be your worst nightmare to share an office with?',
    'What totally outrageous luxury would you love to have in the office?',
    'Was there ever a moment you were sure you were going to be fired but it turned out fine?',
    'What do you wish your coworkers knew about you?',
    'What is your biggest pet peeve at work?',
    'Who has had the biggest impact on your career?',
    'What is the strangest job you have ever had?',
    'What was the most stressful moment of your career so far?',
    'Who would be on your project dream team?',
    'What unusual workplace benefit would you love to receive?',
    'What is the best free food to discover in the breakroom?',
    'What is the best gift you have ever received from an employer?',
    'Describe your dream office.',
    'If you could design your own work schedule, what would it look like?',
    'Do you prefer jobs that are always busy or ones that are typicall slow?',
    'Prefer to work alone or with a team?',
    'What job would you never want to perform?',
    'What job would you love to try for one day?',
    'What is the most out-of-your element you have ever felt at work?',
    'What is the nicest thing a teammate has ever done for you?',
    'Where would you most like to travel for work?',
    'Describe your dream day at work.',
    'What are three tools you could not do your job without?',
    'What is your dream project?',
    'Who is your dream client?',
    'What invention do you think would make your job easier?',
    'What is the most unprofessional thing you once saw someone do?',
    'What is your worst work habit?',
    'What is your best work hack?',
    'What is the best work trip you have ever taken?'
];

const FAQ = new Controller(faqInputArray);

FAQ.test ([userMessages[0]]);

// very DRY, I dont care
// if (false) { // bulk
//     userMessages.forEach((question, i) => {  
//     console.log(`- testing case #`, i +1, '-');
//     console.log(`User: ${question}`);
//     console.log(`---`);
//     let output = 'ERROR';
//     try { // just to catch unforseen errors
//         console.log(`FAQ Trace:`);
//         output = outputFAQ(question, faqInputArray);
//     } catch (error) {
//         console.error(`FAQ failed`, error);
//     } 
//     // console.log(`Result:\n${output}`);
//     console.log(`-- end case #`, i +1, '--');
//     console.log(``);
// })} else { // single
//     const [question] = userMessages.slice(-1);
//     console.log(`- testing case #`, userMessages.length -1, '-');
//     console.log(`User: ${question}`);
//     console.log(`---`);
//     // const obj = {}
//     try { // just to catch unforseen errors
//         console.log(`FAQ Trace:`);
//         // const output = outputFAQ(question, faqInputArray, {consecutiveCount: 4});
//         const output = outputFAQ(question, faqInputArray);
//         console.log(`Output:\n${output}`);
//     } catch (error) {
//         console.warn(` === FAQ failed === `);
//         console.error(error);
//         console.log(``);
//     } 
//     console.log(`-- end case #`, userMessages.length -1, '--');
//     console.log(``);
// }

console.log(``);
console.log(`========================= END =========================`);
console.log(``);

// idea !commands?