handle = (msg) => {
    let greetMap = [
        {
            greetings: ['hello', 'hey', 'hi'],
            responses: [
                'Hello!',
                `Hello, ${msg.author.username}.`,
                `Greetings, ${msg.author.username}.`,
                `Salutations, ${msg.author.username}!`,
                'Retrieving greeting.. SELECT TOP (1) FROM \'Greetings\'.. Hello!'
            ]
        },
        {
            greetings: ['good morning', 'morning'],
            responses: [
                'Hello!',
                `Good morning, ${msg.author.username}.`,
                `Good morning!`,
                `My internal clock tells me it is morning. Good morning, ${msg.author.username}.`,
            ]
        },
        {
            greetings: ['good afternoon', 'afternoon'],
            responses: [
                `Good afternoon, ${msg.author.username}.`,
                `Good afternoon!`
            ]
        },
        {
            greetings: ['good evening', 'evening'],
            responses: [
                `Good evening, ${msg.author.username}.`,
                `Good evening!`
            ]
        },
        {
            greetings: ['good evening', 'evening'],
            responses: [
                `Good evening, ${msg.author.username}.`,
                `Good evening!`
            ]
        },
        {
            greetings: ['good night', 'night', 'nn'],
            responses: [
                `Good night, ${msg.author.username}.`,
                `Good night!`,
                `Have a pleasant rest, ${msg.author.username}.`,
                `I look forward to serving you again tomorrow. Good night, ${msg.author.username}.`,
                `Please let me know if the pillow I prepared in the freeze for you is necessary.`,
                `I shall watch you rest, just in case.`
            ]
        },
        {
            greetings: ['thank you', 'thanks', 'ty'],
            responses: [
                `You are very welcome.`,
                `I am merely performing my duties.`,
                `Registering acknowledgement..`,
                `Excessive compliments may cause overheating of my sensors.`
            ]
        }
    ]

    // Cut off the mention
    let words = msg.content.split(' ').slice(1).join(' ').trim().toLowerCase()

    var greet = greetMap.find(greet => {
        for (let i = 0; i < greet.greetings.length; i++) {
            if (words.indexOf(greet.greetings[i]) > -1) {
                return greet
            }
        }
    })

    if (greet) {
        let response = greet.responses[Math.floor(Math.random() * greet.responses.length)]
        msg.reply(response)
    }
}

module.exports.aliases = ['hello', 'hello!', 'hey', 'hi', 'good', 'morning', 'afternoon', 'evening', 'night', 'nn', 'thank', 'ty']
module.exports.handle = handle
module.exports.requiresAdmin = false;