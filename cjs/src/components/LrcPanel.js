import React from"./../react.js";const secondsFormat=e=>{let t=e%60+100;return("0"+Math.floor(e/60)).slice(-2)+":"+t.toFixed(2).substring(1)};export default e=>{const{lyric:t="",seconds:r=0}=e;let a=secondsFormat(r+1),l=0;const s=t.split(/[\n\r]/).map((e,t)=>{let r;return(r=e.match(/^\[(\d\d:\d\d\.\d\d)\]/))&&r[1]<a&&(l=t),e.replace(/^\[.*?\]/,"")});return React.createElement("ul",{className:"lrc-panel",style:{transform:`translateY(${-30*(l-5)}px)`}},s.map((e,t)=>React.createElement("li",{key:`${t}`,style:l===t?{color:"#00d1b2"}:{}},e)))};