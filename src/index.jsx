import { createRoot, useState, onDispose, createHandler, useClient } from 'seniman';
import { createServer } from 'seniman/workers';
import { Style, Meta, Title } from 'seniman/head';

const tailwindCssText = `*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:initial;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.relative{position:relative}.mx-5{margin-left:1.25rem;margin-right:1.25rem}.mb-8{margin-bottom:2rem}.flex{display:flex}.table{display:table}.hidden{display:none}.h-full{height:100%}.h-screen{height:100vh}.w-full{width:100%}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.resize{resize:both}.flex-col{flex-direction:column}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-center{justify-content:center}.gap-5{gap:1.25rem}.rounded-lg{border-radius:.5rem}.border-2{border-width:2px}.border-black{--tw-border-opacity:1;border-color:rgb(0 0 0/var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.p-6{padding:1.5rem}.text-center{text-align:center}.text-2xl{font-size:1.5rem;line-height:2rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-5xl{font-size:3rem;line-height:1}.text-lg{font-size:1.125rem}.text-lg,.text-xl{line-height:1.75rem}.text-xl{font-size:1.25rem}.font-bold{font-weight:700}.font-semibold{font-weight:600}.text-blue-600{--tw-text-opacity:1;color:rgb(37 99 235/var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity:1;color:rgb(75 85 99/var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity:1;color:rgb(31 41 55/var(--tw-text-opacity))}.text-green-600{--tw-text-opacity:1;color:rgb(22 163 74/var(--tw-text-opacity))}.shadow-xl{--tw-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}@media (min-width:768px){.md\:flex{display:flex}}`

const calculateTimeLeft = (timezoneOffset) => {
  const targetDateUTC = new Date("2024-03-12T00:00:00.000Z");

  const nowUTC = new Date();

  const clientTime = new Date(nowUTC.getTime() - timezoneOffset);
  const difference = targetDateUTC - clientTime;

  return {
    hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
    jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
    menit: Math.floor((difference / 1000 / 60) % 60),
    detik: Math.floor((difference / 1000) % 60)
  };
};

function App() {
  const [timeLeftState, setTimeLeft] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });
  let interval;
  let clientTimezoneOffset;

  let updateTime = () => setTimeLeft(calculateTimeLeft(clientTimezoneOffset));

  let onTimezoneArrival = (timezoneOffset) => {
    clientTimezoneOffset = timezoneOffset;

    // update right away before the interval starts in 1000ms
    updateTime();

    // start the timer when the timezoneOffset arrives
    interval = setInterval(updateTime, 1000);
  }

  // clear the interval with onDispose when the user goes away
  onDispose(() => {
    clearInterval(interval);
  });

  return (
    <div class="w-full flex text-center  flex-col justify-center items-center h-screen">
      <Meta name="description" content="Join the countdown to Ramadan 2024. Track days, hours, minutes, and seconds left. Embrace the spirit of Ramadan with us." />
      <Title text="Countdown to Ramadan 2024" />
      <Style text={tailwindCssText} />

      <h1 class="text-4xl font-bold text-gray-800 mb-8" role="heading" aria-level="1">Countdown to Ramadan 2024</h1>

      <section aria-labelledby="countdown-title" class="relative flex p-6 border-2 
             bg-white border-black mx-5 shadow-xl rounded-lg">
        <h2 id="countdown-title" class="sr-only">Ramadan Countdown Timer</h2>
        <div class="text-5xl md:flex gap-5 "
        >
          <p class="time-text text-gray-600" role="timer" aria-live="assertive">
            <span id="days" class="font-semibold text-blue-600">{timeLeftState().hari}</span> Hari
          </p>
          <p class="time-text text-gray-600" role="timer" aria-live="assertive">
            <span id="hours" class="font-semibold text-blue-600">{timeLeftState().jam}</span> Jam
          </p>
          <p class="time-numbers text-gray-500">
            <span id="minutes" class="font-semibold  text-green-600">{timeLeftState().menit}</span> Menit
          </p>

          <p class="time-numbers text-gray-500">
            <span id="seconds" class="font-semibold  text-green-600">{timeLeftState().detik}</span> Detik
          </p>
        </div>
      </section>
      <ClientTimezoneChecker onTimezone={onTimezoneArrival} />
    </div>
  );
}

function ClientTimezoneChecker(props) {
  let client = useClient();

  let handleTimezone = createHandler((timezoneOffset) => {
    props.onTimezone(timezoneOffset);
  });

  let sendClientTimezone = $c(() => {
    const timestamp = Date.now();

    const now = new Date(timestamp);
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    console.log(timezoneOffset);

    $s(handleTimezone)(timezoneOffset);
  });

  client.exec(sendClientTimezone);

  return null;
}

let root = createRoot(App);

export default createServer(root);
