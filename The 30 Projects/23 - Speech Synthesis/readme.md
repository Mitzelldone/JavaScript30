# Speech Synthesis (Text-to-Speech)
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/23%20-%20Speech%20Synthesis/index.html)
![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/23.demo.png)
Today we'll learn how to do speech synthesis (text to speech) with JavaScript. Web Speech API [@ MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API);

---

## Set up elements

```Javascript
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;
```

The **SpeechSynthesisUtterance** represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.) The **SpeechSynthesisUtterance** object has various properties that can be set, to manipulate the speech generated.

- `.lang` - Gets and sets the language of the utterance.
- `.pitch` - Gets and sets the pitch at which the utterance will be spoken at.
- `.rate`- Gets and sets the speed at which the utterance will be spoken at.
- `.text` - Gets and sets the text that will be synthesized when the utterance is spoken.
- `.voice` - Gets and sets the voice that will be used to speak the utterance.
- `.volume` - Gets and sets the volume that the utterance will be spoken at.

This is the most basic thing you need to do to generate speech : -

```Javascript
const msg = new SpeechSynthesisUtterance();

// .text should be set, all other properties have defaults
msg.text = "Hello There";

// speak() does the actual synthesis - uses default voice
speechSynthesis.speak(msg);
```

### Get the default text

We want the app to speak whatever text we have in the text area, so lets set the initial value of the msg text to that.

```Javascript
msg.text = document.querySelector('[name="text"]').value;
```

## Select a custom voice

Setting the voice property - we use `voiceschanged` event to listen to when all the voices have been loaded.

```Javascript
function populateVoices(){
  // array of SpeechSynthesisVoice objects
  voices = this.getVoices()
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('')
}
speechSynthesis.addEventListener('voiceschanged', populateVoices);
```

We get the voices from the `speechSynthesis` object. Then, filter only those which are english. Next, create option tags (as strings) and add them to the `innerHTML` of the select component.

Now when the user selects the voice, we want to change the utterance to use that.

```Javascript
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value)
};
voicesDropdown.addEventListener('change', setVoice)
```

We search through the array of voices to find the correct `SpeechSynthesisVoice`. We then set the `msg.voice` to that object.

```Javascript
// A example SpeechSynthesisVoice object
{
  default:true, lang:"en-IN",
  localService:true, name:"Veena",
  voiceURI:"Veena"
}
```

## Rate, pitch, user entered text

Our `options` variable is a NodeList of three elements, the rate, pitch range elements and the text area. We can deal with all three inputs in one function

```Javascript
const options = document.querySelectorAll('[type="range"], [name="text"]')

function setOption() {
  msg[this.name] = this.value
}

options.forEach(option => option.addEventListener('change', setOption))
```

The name of each of the input elements match with the corresponding property name in `msg`, and the value can be extracted in the same way using `this.value`.

## Start and stop the speech

Creat function to trigger _start_ and _stop_ button.

```Javascript
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
```

- `toggle()` cancels anything that is already playing, and in case `startOver` is true (which is the default case), then it replays the current text with the current settings.
- `startOver` is set to **false** in the stop button, so it doesn't start playing anything after is cancels the current speech.

We'll also use toggle in `setOption()` to re-start the speech after a change in settings.

```Javascript
function setOption() {
  msg[this.name] = this.value
  toggle()
}
```
