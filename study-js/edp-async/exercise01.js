// JS Engine -> *.js -> interpreted
// JIT Compilation
const timerId = setInterval(() => {
    console.log(`Hello Mars: ${new Date()}`);
}, 1000)

setTimeout(() => {
    clearInterval(timerId);
}, 20_000)

// Events: user-triggered events, system events,...
// Event -> Callback Function
// Event Queue -> Execution Thread -> invokes callback function
// long-running process/job -> asynchronous function ?