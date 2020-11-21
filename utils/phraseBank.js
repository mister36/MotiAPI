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

exports.heroBank = (name) => {
  return [
    `<speak>
    <prosody rate="105%">You're the hero of this story. Will you dominate, or will you crumble?</prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%" pitch="-1st"><emphasis level="moderate">When danger comes your way, stand tall</emphasis></prosody>
  </speak>`,

    `<speak>
    <prosody rate="110%" pitch="-2st">${name},Are you a fighter? Cuz real fighters don't quit!</prosody>
    </speak>`,

    `<speak>
    <prosody rate="105%" pitch="-1st">As a hero, you must lose your fear of failure.Let it guide you</prosody>
    </speak>`,

    `<speak>
    <prosody rate="105%" pitch="-1st">Sometimes by losing a battle, you find a new way to win the war</prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%">${name}, is that all you've got? <prosody rate="97%"><emphasis level="strong">Let's go soldier</emphasis></prosody></prosody>
    </speak>`,

    `<speak>
    <prosody rate="107%"><emphasis level="moderate">Keep fighting until your very, last, breath</emphasis></prosody>
    </speak>`,

    `<speak>
    <prosody rate="110%">Victory is inevitable; <break time="400ms"/> <prosody pitch="-2st">let's continue working</prosody></prosody>
    </speak>`,

    `<speak>
    <prosody pitch="-2.5st" rate="100%">Behind you is infinite power. Before you is endless possibility.Around you is boundless opportunity</prosody>
    </speak> `,

    `<speak>
    <prosody rate="110%">Obtain victory.<prosody pitch="-5st">no matter the cost</prosody></prosody>
    </speak>`,

    `<speak>
    <prosody pitch=".5st" rate="110%">${name}, I want you to show me what greatness looks like. <prosody pitch="-2st"><emphasis level="moderate">Let's go</emphasis></prosody></prosody>
    </speak>`,

    `<speak>
    You never know how strong you are,<break time="400ms"/><prosody pitch="-1.5st"><emphasis level="moderate"> until being strong is your only choice</emphasis></prosody>
  </speak>`,

    `<speak>
  <prosody pitch="-1st">Go to the battlefield expecting victory ${name}, <break time="300ms"/> <prosody pitch="-2st"> and you will come out untouched</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-2st">The war is not over. Don't stop when your tired, <prosody pitch="-1st">stop when your done</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-3st" rate="95%">Can you feel the power that flows through your body? Use it</prosody>
</speak>`,

    `<speak>
<prosody pitch="-2st" rate="95%">If you plan to win, don't just win small.<prosody pitch="-3st">Conquer everything before you</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">When evil is in front of you, ${name}, <prosody pitch="-4st">don't stop until it is defeated</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="95%">Fight now, fight tomorrow?, <prosody pitch="-3st">fight forever</prosody></prosody>
</speak>`,

    `<speak>
${name}, the greatest war you must win? <break time="300ms"/> <prosody pitch="1st">is within yourself</prosody>
</speak>`,

    `<speak>
<prosody pitch="1st" rate="90%">Win. <break time="400ms"/> <prosody pitch="2st">Win</prosody><break time="100ms"/> <prosody pitch="4st">Win</prosody></prosody>
</speak>`,

    `<speak>
<prosody>On the count of 3, destroy your enemy. <prosody rate="90%" pitch="2st">1. 2. <prosody volume="x-loud">three.</prosody></prosody>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="110%">Evil is in front of you. Behind you. Above you. Below you.<break time="300ms"/> <prosody pitch="-2st" volume="loud" rate="90%">Eliminate it</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-2st" rate="105%">Pledge your life to discipline ${name}, and there will be nothing that can stop you</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="97%">Rain, hail, blood, pain: <prosody pitch="-2st" rate="105%">either way, you must overcome it</prosody>
</prosody>
</speak>`,

    `<speak>
The question isn’t who is going to let you:<break time="400ms"/> <prosody pitch="-2st" rate="97%">it’s who is going to stop you!</prosody>
</speak>`,

    `<speak>
Ride off into the battlefield, and when you get there<prosody pitch="1st">show everyone that you are the true ruler!</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">They may curse you, hurt you, and desert you. But you will return as their ruler</prosody>
</speak>`,

    `<speak>
Forget everyone who deserted you, ${name}. <prosody rate="95%">All you need is yourself to conquer the world</prosody>
</speak>`,

    `<speak>
<prosody rate="95%">Unleash your inner animal; <prosody pitch="-1.5st">strike hard, and strike fast!</prosody>
</prosody>
</speak>`,

    `<speak>
Give it everything you have. <prosody pitch="-1st">don’t leave a single ounce of energy in your body</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Do you feel that flame in your heart? <prosody rate="85%">Pull it out, wear it, and save the world with it</prosody></prosody>
</speak>`,

    `<speak>
When you feel useless, pick your head up. <prosody pitch="-2st">Remember, you are the hero</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Being a warrior is more than just a part time thing. <prosody pitch="-2st">It is your destiny ${name}</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="97%" pitch="-1st">Victory belongs to those who fight the longest
</prosody>
</speak>`,

    `<speak>
<prosody rate="110%" pitch="-1st">${name}, you will become strong by defying defeat,<break time="400ms"/> and turning failure into success
</prosody>
</speak>`,

    `<speak>
<prosody rate="105%" pitch="-1st">Take time to think, but when it's time for action?<prosody pitch="-2st">stop thinking and go in</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">No one will just hand you power, ${name}. <prosody pitch="-2st">You must take it for yourself</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-2st">Nothing great was ever achieved without a little danger
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Fear, and love.<break time="400ms"/> <prosody pitch="-2st" >These are your most powerful weapons</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="95%">If you wish to be obeyed,<break time="300ms"/> then don't be afraid to command
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">Stop limiting yourself. <prosody rate="95%">Remember, the world needs you</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Lightning shakes the ground.<break time="300ms"/> Thunder blasts the air. <prosody pitch="-1st" rate="105%">The world is waiting, for you</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Don’t just stay down after suffering. <prosody pitch="-1st"> Stand up, and fight</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Your mind is the greatest weapon you have. <prosody pitch="-1st">Never stop using it</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody rate="105%" pitch="-1st">Remain brave ${name},<break time="300ms"/> <prosody rate="95%" pitch="-2st">and no weapon can strike you</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">What is it that you desire the most? <break time="500ms"/> <prosody pitch="-2st" rate="110%"><emphasis level="moderate">Fight for it</emphasis></prosody></prosody>
</speak>`,

    `<speak>
Either win, or be destroyed. <prosody rate="95%">Which will you choose?</prosody>
</speak>`,

    `<speak>
<prosody pitch="1st">Whatever needs to be done, get to it, <prosody pitch="-1st"><emphasis level="strong">right now</emphasis></prosody>
</prosody>
</speak>`,

    `<speak>
<prosody rate="92%">Do. Not. Stop
</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Don’t let a crisis stop you, ${name}. <prosody pitch="-1st" rate="92%">Look, laugh, and keep fighting</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody rate="95%">I know you have more than that in you<prosody pitch="1st"><emphasis level="strong">Let’s go!</emphasis></prosody>
</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">${name}, will you look back and regret what you accomplished? Or look back and remember the day, you became, <prosody pitch="-2st">the greatest?</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">Everyone you love is on top of that mountain. <prosody pitch="-2.5st">Will you climb up to save them?</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="110%">Hard work is meaningless without results, ${name}. <emphasis level="strong">Keep fighting</emphasis>
</prosody>
</speak>`,

    `<speak>
Head up.<break time="300ms"/> Chest up.<break time="300ms"/> Sword up. <emphasis level="strong">Attack</emphasis>
</speak>`,

    `<speak>
<prosody pitch="-1st">It’s okay if you’re bloody. It’s okay if you failed. Stand yourself up, and keep.on.<emphasis level="strong">going</emphasis>
</prosody>
</speak>`,

    `<speak>
Be loved. Be feared. And I promise you, <prosody pitch="-1st">you won’t be forgotten.</prosody>
</speak>`,

    `<speak>
Many journeys await.<prosody pitch="-1st">I hope you are prepared</prosody>
</speak>`,

    `<speak>
Your name will be remembered for all time, <prosody pitch="1st">either as the one who gave up?</prosody>or the one who persevered
</speak>`,

    `<speak>
<prosody rate="105%">Chaos reigns,<break time="200ms"/> <prosody pitch="-1st">but you must learn to love it</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="1st">It’s not easy being a hero ${name}. <prosody pitch="-1st">But if you want an extraordinary life</prosody>, you must do extraordinary things</prosody>
</speak>`,

    `<speak>
You might not make it today. <break time="200ms"/> Maybe not tomorrow. <prosody pitch="-1st">But I promise, <break time="400ms"/> <prosody rate="95%">one day you will</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">One step at a time, ${name}. <prosody pitch="1st">That’s all it takes</prosody>
</prosody>
</speak>`,

    `<speak>
Train hard.<break time="400ms"/>Train tough<break time="400ms"/>.<prosody pitch="-1st" rate="95%">Sooon, there will be war</prosody>
</speak>`,

    `<speak>
<prosody pitch="1st">Heroes are made in the hour of defeat.<break time="400ms"/> <prosody pitch="-2st">Remain tough</prosody>
</prosody>
</speak>`,

    `<speak>
Heroes are made by the path they choose. <prosody pitch="-1st">Which shall you take today</prosody>
</speak>`,

    `<speak>
Give your life to something bigger than yourself, <prosody pitch="-1st">and the results will be glorious</prosody>
</speak>`,

    `<speak>
<prosody>Never stop the pursuit of your goals. <prosody pitch="-2st">Never</prosody>
</prosody>
</speak>`,

    `<speak>
You don’t have to know where you’re going. <prosody pitch="-1st">Just be ready to get moving</prosody>
</speak>`,

    `<speak>
Forget what anyone else says. If it’s in your heart, <prosody pitch="-2st" rate="95%">do anything to get it</prosody>
</speak>`,

    `<speak>
<prosody pitch="1st">Power, plus precision, <prosody pitch="-2st">equals victory</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">No power is out of your reach,<break time="400ms"/> <prosody pitch="-2st"> but you must work for it</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="98%" pitch="4st">Fight.<break time="400ms"/> <emphasis level="moderate">Fight.<break time="400ms"/></emphasis> <emphasis level="strong">Fight.</emphasis>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">If anyone stands in the way of your success,<break time="200ms"/> leap over, and continue on
</prosody>
</speak>`,

    `<speak>
<prosody>${name}. <break time="500ms"/><prosody pitch="-1st">You,<break time="400ms"/> can,<break time="400ms"/> do,<break time="400ms"/> this</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Free yourself from the cage, ${name}. <emphasis level="moderate">Get yourself out!</emphasis>
</prosody>
</speak>`,

    `<speak>
Run.<break time="400ms"/> Keep running, until you find your treasure
</speak>`,

    `<speak>
<prosody rate="97%">You’re in the dark,<break time="300ms"/> <prosody pitch="1st">but the light is within you</prosody>
</prosody>
</speak>`,

    `<speak>
If you’re surrounded by the enemy, that means there’s nowhere for them to hide. <emphasis level="strong">Finish them</emphasis>
</speak>`,

    `<speak>
It’s now or never.<break time="500ms"/> <prosody pitch="-1st">Decide your fate</prosody>
</speak>`,

    `<speak>
You must endure.<break time="300ms"/> You are the tiger.<break time="400ms"/> <prosody pitch="-1st">Never forget</prosody>
</speak>`,

    `<speak>
<prosody pitch="1st">If you don’t like the hand you were dealt, <break time="200ms"/><prosody pitch="-1st" rate="107%">fight now,<break time="300ms"/> for a new one</prosody>
</prosody>
</speak>`,

    `<speak>
No whining.<break time="300ms"/> No complaining.<break time="300ms"/> You are not a victim
</speak>`,

    `<speak>
<prosody rate="105%">When you protect something special to you, <prosody pitch="-1st">then you become as strong as you can be</prosody>
</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">${name}, you’ll only grow stronger after facing hardships
</prosody>
</speak>`,

    `<speak>
<prosody rate="95%">When you enter this game, either you win, or you’re destroyed. C’mon
</prosody>
</speak>`,

    `<speak>
If you fear losing, <prosody pitch="-2st">you’ve already lost</prosody>
</speak>`,

    `<speak>
<prosody rate="95%">It’s a deep, dark world. <prosody pitch="-1st" rate="105%">You have the ability to rescue it</prosody></prosody>
</speak>`,

    `<speak>
They are coming:<break time="400ms"/> the monsters that want to end you. <prosody>Fight,<break time="300ms"/> <prosody pitch="-.5st">them</prosody><prosody pitch="-1st">off</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Race on the thunder,<break time="300ms"/> rise on the heat;<break time="300ms"/> <prosody rate="97%" pitch="1st">the world needs you</prosody></prosody>
</speak>`,

    `<speak>
There’s fire in your blood.<break time="500ms"/> <prosody pitch="-2st">Light the world with it</prosody>
</speak>`,

    `<speak>
An icy heart,<break time="300ms"/> <prosody pitch="1st">a diamond hand,</prosody><prosody pitch="-1st">a stoic mind.</prosody><break time="400ms"/> ${name}, <prosody pitch="-.5st">you have arrived</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">Don’t let your whill break</prosody>, and you will be invincible
</speak>`,

    `<speak>
<prosody rate="95%" pitch="-1st">Climb that tower of success ${name}.</prosody> <prosody pitch="-2st">Just a few more steps left</prosody> 
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">The clock shall strike soon.</prosody> <emphasis level="moderate">Hurry up, and take victory</emphasis>
</speak>`,

    `<speak>
<prosody pitch="-1.5st">Allow yourself to become one <break time="200ms"/> with the tiger</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="93%">Defend what needs to be defended</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="95%">Save what needs to be saved</prosody>
</speak>`,

    `<speak>
There is a great power rushing through your veins. <prosody pitch="-1st">What will you do with it?</prosody>
</speak>`,

    `<speak>
We don’t give up around here. <emphasis level="moderate">Stay strong ${name}</emphasis>
</speak>`,

    `<speak>
What is sacred must be protected. <prosody volume="+3dB">Fight</prosody>
</speak>`,
  ];
};

// console.log(exports.heroBank("hello").length);

exports.riseBank = (name) => {
  return [
    `<speak>
      ${name}, say it with me.
      no. <prosody rate="110%" pitch="-1st">more.</prosody>
      <prosody pitch="-2st">excuses</prosody>
  </speak>`,

    `<speak>
  <prosody rate="108%">Stop waiting for life to happen to you.Get out and take action</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">A lion doesn't concern himself with the opinions of the sheep</prosody>
</speak>`,

    `<speak>
<prosody rate="105%"> I know it can be tough for you. But ${name}, <prosody pitch="-1st">good things don't come easy</prosody></prosody>
</speak>`,

    `<speak>
If you want to achieve greatness, <prosody pitch="-1st">stop asking for permission.</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">It starts in the mind. Believe you can do it ${name}, <prosody pitch="1st">and you will</prosody></prosody>
</speak>`,

    `<speak>
<prosody>You attract what you are, not what you want. If you want great, <break time="400ms"/><prosody pitch="-1st" rate="95%">then, be great.</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%" pitch="-1st">The first step is to expect great things. The next step: <emphasis level="moderate">to accomplish them</emphasis></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">If it was easy, everyone would do it! <emphasis level="strong">Go harder ${name}</emphasis></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Once you are able to control yourself, <break time="400ms"/><prosody pitch="-2st">you will control all</prosody></prosody>
</speak>`,

    `<speak>
<prosody>Don’t talk, just act. Don’t say, just show. Don’t promise,<break time="200ms"/> <prosody pitch="-2st">just do</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="107%">Push yourself ${name},<prosody pitch="-1st">because no one else is going to do it for you</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">If you want to achieve something, <prosody pitch="-1st">you must be aggressive in your pursuit</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">If you die tomorrow, <prosody pitch="-1st">what do you want to be remembered for?</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">You're better today than yesterday. <prosody pitch="1st">You'll be better tomorrow than today.</prosody><prosody pitch="-1st">Keep improving</prosody></prosody></speak>`,

    `<speak>
<prosody rate="95%">You're destiny is in.<break time="400ms"/> your.<break time="400ms"/> <prosody pitch="2st">hands</prosody></prosody></speak>`,

    `<speak>
<prosody rate="105%">Don't be bothered by little things. <prosody pitch="-1st">Stick to the end goal, and you shall taste success.</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="95%">Go. <prosody>Go.</prosody> <emphasis level="strong">Go.</emphasis></prosody>
</speak>`,

    `<speak>
C'mon, <prosody pitch="-1st">you can work harder than that.</prosody>
</speak>`,

    `<speak>
<prosody rate="95%">I will not allow you to give up. Let's go ${name}</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Cut all that crap you don't need. <prosody pitch="-1st">Focus on what matters</prosody></prosody>
 </speak>`,

    `<speak>
 <prosody rate="105%">The only person that can set limits on you, <prosody pitch="1st">is you.</prosody></prosody>
 </speak>`,

    `<speak>
 <prosody pitch="-.5st">You can relax later.<break time="500ms"/></prosody><prosody pitch="-1st">Work hard now</prosody>
</speak>`,

    `<speak>
<prosody rate="93%">It's not you vs the world, ${name}. <prosody pitch="-1st">It's you vs yourself</prosody></prosody>
</speak>`,

    `<speak>
Keep going until you break.<prosody pitch="1st">And when you break,<break time="100ms"/></prosody> <prosody pitch="-2st">go for it again</prosody>
</speak>`,

    `<speak>
<prosody>Either find a way,${name}? <break time="300ms"/><prosody pitch="-2st">or make one</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">It's okay to fail, ${name}. Just one thing: <break time="300ms"/><prosody pitch="-1st">get back up </prosody></prosody>
</speak>`,

    `<speak>
<prosody>Be phenomenal,<break time="300ms"/><prosody pitch="-1st">or be forgotten.</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">You will not win by accident, ${name}. <prosody pitch="-2st">Sacrifice is necessary</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Don't ever quit, ${name}. <prosody pitch="-1st">If you quit once, you'll quit again</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">Don't crack under pressure. <prosody pitch="-1st">That's just an opportunity to rise up</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%" pitch="-1st">There's going to be sweat and tears. But they only make success taste sweeter.</prosody>
</speak>`,

    `<speak>
<prosody rate="110%" pitch="-1st">Great things don't come when your comfortable. <prosody pitch="-2st">No pain,<break time="200ms"/> no gain</prosody></prosody>
</speak> `,

    `<speak>
Lose your fear of failure. <prosody pitch="-1st" rate="105%">It will be you're greatest teacher</prosody>
  </speak>`,

    `<speak>
  If your not ready, quit. If you don't like it, quit! If you want it, <prosody pitch="-1st">then work</prosody>
  </speak>`,

    `<speak>
  <prosody pitch="-1st" rate="95%">Nothing great is ever achieved without danger</prosody>
</speak>`,

    `<speak>
<prosody>Work hard in silence, <prosody pitch="-2st">and success will be your noise</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Don't ever try to be someone else.<prosody pitch="-2st">Besides, you have your own journey here</prosody></prosody>
</speak>`,

    `<speak>
<prosody>If your not courageous ${name}, <prosody pitch="-1.5st">consider yourself defeated</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%" pitch="-1st">Don't let the fear of losing <break time="100ms"/> be greater than the excitement of winning</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">When danger comes,<break time="300ms"/><prosody pitch="-1st">stand tall.</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Now isn't the time to relax?</prosody><prosody pitch="-1.5st">It's time to rise</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">Victory only comes to those who can persevere</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">Greatness will only come, by pushing yourself when no one's watching</prosody>
</speak>`,

    `<speak>
<prosody rate="90%">Play big?<break time="200ms"/><prosody pitch="-2st">or go home</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">As long as the mind is willing</prosody><prosody rate="105%" pitch="-.5st">you can continue forever</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">No matter what you do,${name},<break time="400ms"/>don't stop. <prosody pitch="-1st">Never stop</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">stop seeking approval,<break time="300ms"/> <prosody pitch="-1st"><emphasis level="moderate">start seeking results</emphasis></prosody></prosody>
</speak>`,

    `<speak>
Get ready. get fired up. do the work. Again
</speak>`,

    `<speak>
The longer you hesitate ${name},<prosody pitch="-1st">the more potential you waste</prosody>
</speak>`,

    `<speak>
Without passion you have no energy.without energy,<break time="100ms"/><prosody pitch="-1.5st">you have nothing.</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">It's harder to re-start <prosody pitch="-1st">than to just keep going</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="108%">Are you committed to it, ${name}? <prosody pitch="-1st">Cuz That's the only way you'll achieve the impossible </prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">A true champion must be willing to fight through the worst</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">The only thing you can depend on while under pressure <prosody pitch="-3st">is your willpower</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="1st" rate="107%">The only one that's in control of you. <prosody pitch="1st">is you</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Success is not final,<break time="300ms"/> failure is not fatal,<break time="300ms"/> <prosody pitch="1st">No stopping</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="108%">Not many people can handle it, ${name}. <break time="400ms"/><prosody pitch="1st" rate="95%">Can you?</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">The world is up for the taking. <prosody pitch="-1st">Grab it.</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Don't allow anyone to take what you've worked for</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">You must be obsessed, ${name}. Whatever you want, <prosody pitch="-1st">obsess over it</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="103%">Failing today is not an excuse for quitting tomorrow.<break, time="400ms"/><prosody pitch="-1st">Let's go</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="103%" pitch="-1st">We don't look backwards?</prosody><break time="100ms"/> <prosody pitch="-.5st">the only direction is ahead</prosody>
</speak>`,

    `<speak>
<prosody>Truth iz, <prosody pitch="-.5st">you don't need many supporters.</prosody><prosody pitch="-1st" rate="90%">You just need your heart</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">If you can stay focused for long enough,you can have any victory possible</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Don't doubt yourself. <prosody pitch="-2st">I see power within you, ${name}.</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="95%">Never give up what you want the most</prosody>
</speak>`,

    `<speak>
<prosody pitch="-.5st">Failure can't last forever?</prosody><break time="200ms"/> <prosody pitch="-2st" rate="110%">not as long as courage remains</prosody>
</speak>`,

    `<speak>
<prosody rate="110%">Life goes on, ${name}.<break time="500ms"/><prosody pitch="-1st" rate="95%">Keep trying</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Put a goal in your head. envision it. </prosody><break time="100ms"/><prosody pitch="-1st">Now, get to work</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="105%">You came,<break time="300ms" /> you saw,<break time="300ms" /> and with patience, you will conquer.</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Danger is your best friend, ${name}<prosody pitch="-1st">Learn to love it,and who can stop you?</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%" pitch="-1st">Hey ${name},<break time="200ms"/>enough talking.</prosody><prosody pitch="-1st" rate="98%">Talk is cheap. <break time="300ms"/>Actions are strong</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">${name}, if you want power, <break time="300ms"/><prosody pitch="-2st">you must take it by force</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">No one can rescue you from yourself. <break time="400ms"/><prosody pitch="-1st">Get strong</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">If you don't control yourself, <break time="300ms"/><prosody pitch="-1st">someone else will?</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">As long as you're alive, there's a chance.<emphasis level="moderate">Don't stop.</emphasis></prosody>
</speak>`,

    `<speak>
<prosody rate="110%">The past doesn't matter, ${name}.<prosody pitch="-1st">All that exists is what's coming next</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Why repeat what others have done?</prosody> Be a trailblazer
</speak>`,

    `<speak>
<prosody rate="105%" pitch="-1st">Wanting something isn't enough.</prosody> <break time="100ms"/><prosody pitch="-2st">Fight for it</prosody>
</speak>`,

    `<speak>
If you want change, <prosody pitch="-1st">stop waiting.</prosody><prosody pitch="-2st" rate="95%"><break time="200ms"/>Become the change</prosody>
</speak>`,

    `<speak>
<prosody rate="90%">There will be pain. There will be struggle. <break time="400ms"/></prosody><prosody pitch="-1st"> That doesn't mean you quit</prosody>
</speak>`,

    `<speak>
Never stop building. <prosody pitch="-1st">Let's get better ${name}</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Ideas are useless without action, ${name}. <prosody pitch="-1st">Stop dreaming</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">The only motivation you need is desire.</prosody> <prosody pitch="-.5st">How much do you want it?</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st"> Don't let anyone limit you, ${name}.</prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Time to stop being ordinary.</prosody> <emphasis level="moderate">Rise up</emphasis>
</speak>`,

    `<speak>
<prosody>The future is in your control. <prosody pitch="-1st">Never forget</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">There's no time to feel sorry for yourself. <prosody pitch="-1st">Keep,<break time="300ms"/>Pressing,<break time="300ms"/>On</prosody></prosody>
</speak>`,

    `<speak>
Are you going to complain? <prosody pitch="-1st">or are you going to work</prosody>
</speak>`,

    `<speak>
Either you can argue what you should have, <prosody pitch="-1st">or take it yourself</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Liv large. Take charge. <prosody pitch="-1st">Let's go</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="105%">${name}, when your truly motivated, <prosody pitch="-.5st">all obstacles vanish</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st">Life won't be easy, <prosody pitch="-1st">but you can build the strength to endure it</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="95%">Hunt, <prosody pitch="-2st">or be hunted</prosody></prosody>
</speak>`,

    `<speak>
<prosody pitch="-1st" rate="110%">There's no room for softness. There's no room for weakness.<prosody pitch="-1st" rate="95%">Step up</prosody></prosody>
</speak>`,

    `<speak>
${name}, <prosody pitch="-1st">go in to everything like you have nothing to lose</prosody>
</speak>`,

    `<speak>
<prosody rate="105%">Success is your only option.<break time="400ms"/><prosody pitch="-2st" rate="95%">absolutely Your only option</prosody></prosody>
</speak>`,

    `<speak>
<prosody rate="95%">When you feel weak, find that inner strength, <prosody pitch="-1st">and get up</prosody></prosody>
</speak>`,

    `<speak>
<prosody>Stand up.<break time="300ms"/> Face your demons.<break time="300ms"/> <prosody pitch="-2st">Hold your ground</prosody></prosody>
</speak>`,
  ];
};

// console.log(exports.riseBank("hello").length);

exports.sessionVoice = (name) => {
  return [
    `<speak>
    <prosody rate="115%" ><emphasis level="strong">Get up ${name}! Stand up! Get that blood flowing</emphasis></prosody>
  </speak>`,

    `<speak>
  <prosody rate="118%" ><emphasis level="strong">Get angry ${name}! Be mad at where you're at now!</emphasis></prosody>Imagine where you can be.
</speak>`,

    `<speak>
<prosody rate="110%">Your goal should not be easy.Difficult goals are the best.</prosody>
</speak>`,

    `<speak>
<prosody rate="110%">You have to love what you do. If you don't, <emphasis level="strong">do something else!</emphasis></prosody>
</speak>`,

    `<speak>
    <prosody rate="110%">Do you trust me ${name}? If you do, than believe me when I say this:<break time="400ms" /> you're a beast</prosody>
    </speak>`,

    `<speak>
<prosody pitch="-3st" rate="110%"><emphasis level="strong">The unwise destroy themselves when crisis comes. But you ${name},will accept them, hold them, <emphasis level="medium">and control them.</emphasis></emphasis></prosody>
</speak>`,

    `<speak>
<prosody pitch="-2st" rate="110%">It is not strength.<break time="400ms"/> It is not intelligence.<break time="400ms"/> It is continuous effort that will unleash you, ${name}</prosody>
</speak>`,

    `<speak>
<prosody pitch="-2.5st" rate="115%"><emphasis level="moderate">Don't ever feel sorry for yourself!</emphasis>Nothing good comes out of it</prosody>
</speak>`,

    `<speak>
<prosody pitch="-2st" rate="100%">Obsession is the key to turning nothing into something</prosody>
</speak>`,

    `<speak>
    <prosody pitch="-2.5st" rate="105%">There is an animal inside you that wants to feast and conquer.<emphasis level="strong">Let it out</emphasis></prosody>
    </speak>`,
  ];
};

// console.log(exports.sessionVoice("hello").length);
