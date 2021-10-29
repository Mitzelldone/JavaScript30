# Native Speech Recognition

## Project Explaination

What we have to do is understand the speech in real time using the speech recognition API, and once the user has finished speaking a sentence (rather pauses the speech), append a `<p>` tag to the `div.words` and start listening for the next time the user speaks.

#

### The SpeechRecognition

```Javascript
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
```

-`window.SpeechRecognition` is a Web Speech API. You can learn more about speech recognition @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).

-`recognition.interimResults = true` makes sure that results are available while we are speaking

**Append a paragraph to the `div.words`, this is where the converted text goes initially.**

```Javascript
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
```

- use `document.createElement` to create a paragraph and _append_ it to the `.words` div.

### Add Transcripts

```JavaScript
recognition.addEventListener('result', e => {
const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')

        if(e.results[0].isFinal) {
            p = document.createElement('p');
            words.appendChild(p);
        }
});
```

- add an `eventListener` on `result` event of SpeechRecognition, in the event we will get `e.results` and assign to the `transcript` variable.

- `e.results` is a list **NOT** an array.

- each `0th` element of the list is the text data we need, so we have to `.map` transcript on `result[0]`.

- return `transcript` and `.join` everything so that it forms a single string.

- If the first `SpeechRecognitionResult` has a `isFinal` property set to true, then we understand that it the user has stopped speaking and the API is done translating. We create a new `<p>` element and add it to the `div.words`. Anything spoken after now goes into the new paragraph.

### Start the speech recognition on page load

```Javascript
recognition.start();
recognition.addEventListener('end', recognition.start);
```

- `recognition.start()` Starts the speech recognition service listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
- Once the user pauses and the API finishes converting speech to text, a `end` event is triggered on the recognition object.
- We pass `recognition.start` to ask the browser to start listening again **(otherwise the browser stops listening, and speech to text happens only once)**.
