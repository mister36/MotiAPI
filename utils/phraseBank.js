// Phrase bank for different situations

exports.startingVoice = (name) => {
  return [
    `<speak>
      <prosody rate="120%">I'm glad to see you. Let's begin.</prosody></speak>`,
    `<speak>
      <prosody rate="120%">Welcome ${name}. Let's not waste any time</prosody>
    </speak>`,
  ];
};

exports.sessionVoice = (name) => {
  return [
    `<speak>
    <prosody rate="125%" >Now is not the time to quit, ${name}. <break strength="medium" /> Don't lose that energy</prosody></speak>`,

    `<speak>
    <prosody rate="110%" >You're fate is literally in your hands</prosody></speak>`,

    `<speak>
    <prosody rate="120%" >${name}, say it with me.</prosody>
    no. <prosody rate="110%" pitch="-1st">more.</prosody>
    <prosody pitch="-2st">excuses</prosody>
</speak>`,

    `<speak>
    <prosody rate="115%">Stop waiting for life to happen to you.Get out and take action</prosody>
</speak>`,

    `<speak>
    <prosody  rate="115%"><emphasis level="strong">What is your goal? If you die tomorrow, what do you want to be remembered for?</emphasis></prosody>
</speak>`,

    `<speak>
    <prosody  rate="115%">Don't be bothered by the little things. Stick to the end goal, and you shall succeed.</prosody>
</speak>`,

    `<speak>
    <prosody  >Go. <prosody volume="+6dB">Go.</prosody> <prosody volume="+8dB"><emphasis level="strong">Go.</emphasis></prosody></prosody>
</speak>`,

    `<speak>
    <prosody rate="125%"><emphasis level="strong">C'mon, you can work harder than that.</emphasis></prosody>
</speak>`,

    `<speak>
<prosody  rate="115%"> Don't let others limit you.</prosody>
</speak>`,

    `<speak>
      <prosody rate="120%"> I know it can be tough for you. But ${name}, good things don't come easy</prosody>
</speak>`,

    `<speak>
<prosody  rate="115%"><emphasis level="strong">I will not let you give up without a fight</emphasis></prosody>
</speak>`,

    `<speak>
    <prosody rate="115%" ><emphasis level="strong">Get up ${name}! Stand up! Get that blood flowing</emphasis></prosody>
  </speak>`,

    `<speak>
  <prosody rate="118%" ><emphasis level="strong">Get angry ${name}! Be mad at where you're at now!</emphasis></prosody>Imagine where you can be.
</speak>`,

    `<speak>
    <prosody rate="115%" >If it was easy, everyone would do it! <emphasis level="strong">Go harder ${name}!</emphasis></prosody>
    </speak>`,

    `<speak>
  <prosody>If you want to achieve greatness, stop asking for permission.</prosody>
</speak>`,

    `<speak>
<prosody rate="115%" >Lose your fear of failure. It will be you're greatest teacher</prosody>
  </speak>`,

    `<speak>
    <prosody  rate="130%" ><emphasis level="strong">You're better today than yesterday. You'll be better tomorrow than today. Liv those words!</emphasis></prosody>
      </speak>`,

    `<speak>
    <prosody  rate="120%" >Cut all the crap you don't need. Focus on excellent work. <break time="500ms" /> <emphasis level="strong">Focus</emphasis></prosody>
      </speak>`,

    `<speak>
        <prosody  rate="120%" ><emphasis level="strong">Don't let the fear of losing be greater than the excitement of winning</emphasis></prosody>
          </speak>`,

    `<speak>
          <prosody rate="110%" >The only motivation you need is desire. <prosody rate="100%" pitch="-3st">How bad do you want it?</prosody></prosody>
          </speak>`,
    `<speak>
     <prosody rate="110%">It's okay to fail, ${name}. Just one thing: <prosody >get back up </prosody></prosody>
   </speak>`,

    `<speak>
   <prosody  rate="115%"><emphasis level="strong">Push yourself ${name}, because no one else is going to do it for you</emphasis></prosody>
 </speak>`,

    `<speak>
    <prosody rate="120%">Great things don't come when your comfortable. <emphasis level="strong">You need that pain</emphasis></prosody>
  </speak> `,

    `<speak>
  <prosody rate="115%"><emphasis level="strong">Work hard now,</emphasis> <break time="300ms" />relax later</prosody>
</speak>  `,

    `<speak>
<prosody  rate="105%">Don't stop when you're tired?. <emphasis level="strong">stop when you're done</emphasis></prosody>
</speak>`,

    `<speak>
<prosody  rate="118%"><emphasis level="strong">If your not ready, quit. If you don't like it, quit! If you want it, <prosody pitch="-1st" rate="100%">then work</prosody>
</emphasis>
</prosody> 
</speak>`,

    `<speak>
<prosody rate="110%">It's not easy, <emphasis level="strong">but it's simple</emphasis></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="110%">Be phenomenal, <emphasis level="strong">or be forgotten.</emphasis></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">Keep going! Keep going! <prosody pitch="2st" rate="95%">Do you feel alive yet?</prosody></prosody>
</speak>`,

    `<speak>
<prosody  rate="115%">If you want to achieve something, <prosody pitch="-2st">you must be aggressive</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%" pitch="+1st">It starts in the mind. Believe you can do it ${name}, and you will? </prosody>
</speak>`,

    `<speak>
<prosody rate="110%">No one can set limits on you except yourself. <emphasis level="strong">Break free from them</emphasis></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">As long as you're alive, there's a chance.<prosody pitch="2st"><emphasis level="strong">Work.</emphasis></prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">Your goal should not be easy.Difficult goals are the best.</prosody>
</speak>`,

    `<speak>
<prosody rate="110%">You have to love what you do. If you don't, <emphasis level="strong">do something else!</emphasis></prosody>
</speak>`,

    `<speak>
    <prosody rate="110%">Knowing is not enough, <break time="300ms" /><prosody pitch="-4st"> We must apply.</prosody> Willing is not enough, <break time="300ms" /> <prosody pitch="-4st">We must do</prosody></prosody>
    </speak>`,

    `<speak>
<prosody rate="110%">I can see the power within you, ${name}.</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">You attract what you are, not what you want. If you want great, <prosody rate="80%"> then bee great.</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">Don’t talk, just act. Don’t say, just show. Don’t promise,just prove</prosody>
</speak>`,

    `<speak>
<prosody rate="110%">${name}, Are you a fighter? Cuz real fighters don't quit!</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Work while they sleep, Learn while they party, Save while they spend, Live like they dream.</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">The world is up for the taking. Grab it.</prosody>
</speak>`,

    `<speak>
    <prosody rate="105%">Keep going until you brake.And when you break, go for it again</prosody>
    </speak>`,

    `<speak>
    <prosody rate="105%">You're the hero of this story. Will you dominate, or will you crumble?</prosody>
    </speak>`,

    `<speak>
    <prosody rate="105%">Keep fighting until you're last breath</prosody>
    </speak>`,

    `<speak>
    <prosody rate="115%">${name}, is that all you've got? <emphasis level="strong">Let's go soldier</emphasis></prosody>
    </speak>`,

    `<speak>
    <prosody rate="115%">The only one that's in control of you, is you</prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%">Do you trust me ${name}? If you do, than believe me when I say this:<break time="400ms" /> you're a beast</prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%">When danger comes, stand tall.</prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%">You came,<break time="300ms" /> you saw,<break time="300ms" /> and with patience, you will conquer.</prosody>
    </speak>`,

    `<speak>
    <prosody rate="113%">Cowards die many times before their actual deaths. Let's be fearless</prosody>
    </speak>`,

    `<speak>
    <prosody rate="113%">Failure is the early morning darkness which precedes the brightness of success.</prosody>
    </speak>`,

    `<speak>
    <prosody rate="105%">Either find a way ${name}, or make one</prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%">Victory is inevitable; <prosody pitch="-2st">let's continue working</prosody></prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%">Obtain victory.<prosody pitch="-5st">no matter the cost</prosody></prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%" pitch="-1st">Your back is against the wall. There are monsters all around you. Will you allow yourself to be destroyed, or fight your way out?</prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%" pitch="-1st">You will not win by accident, ${name}. <prosody pitch="-1st">Sacrifice is necessary</prosody></prosody>
    </speak>`,

    `<speak>
    <prosody rate="115%" pitch="-1st">Being realistic is the most common path to mediocrity.</prosody>
    </speak>`,

    `<speak>
    <prosody rate="112%">Here's a secret: <break time="500ms"/> <prosody pitch="-2st">no one else will rescue you.</prosody> <emphasis level="strong">You must do it yourself</emphasis></prosody>
    </speak>`,

    `<speak>
    <prosody rate="108%" pitch="-1.5st">Take time to think,<break time="300ms"/> but when it's time for action, <prosody pitch="-3st"><emphasis level="strong">stop thinking and go in</emphasis></prosody></prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%" pitch="-1st">Never trade what you want most for what you want in the moment</prosody>
    </speak>`,

    `<speak>
    <prosody rate="107%" pitch="-1st">Death is nothing, but to live defeated and without glory is to die daily</prosody>
    </speak>`,

    `<speak>
    <prosody rate="112%" pitch="-2st">Victory only comes to those with the most perseverance</prosody>
    </speak>`,

    `<speak>
    <prosody rate="112%">${name}, you must show them what greatness looks like<emphasis level="strong">Don't stop</emphasis></prosody>
    </speak>`,

    `<speak>
    <prosody rate="112%" pitch="-2st">There is a joy in danger, ${name}<prosody pitch="0st">Learn to love it,and who can stop you?</prosody></prosody>
    </speak>`,

    `<speak>
    <prosody rate="112%" pitch="-1.5st">Nothing is forever gone,<break time="300ms"/> as long as courage remains</prosody>
    </speak>`,

    `<speak>
    <prosody rate="112%" pitch="-1.5st"><emphasis level="strong">The battlefield may be bloody,<break time="300ms" />the situation not in your favor.But with an iron grip and a solid mind,<break time="300ms" />the war, is won</emphasis></prosody>
    </speak>`,
  ];
};

// console.log(exports.sessionVoice("hello").length);
