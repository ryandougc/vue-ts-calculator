import{d as t,c as n,a as e,w as s,v as i,o as l,r as a,b as r}from"./vendor.b786214e.js";!function(t=".",n="__import__"){try{self[n]=new Function("u","return import(u)")}catch(e){const s=new URL(t,location),i=t=>{URL.revokeObjectURL(t.src),t.remove()};self[n]=t=>new Promise(((e,l)=>{const a=new URL(t,s);if(self[n].moduleMap[a])return e(self[n].moduleMap[a]);const r=new Blob([`import * as m from '${a}';`,`${n}.moduleMap['${a}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){l(new Error(`Failed to import: ${t}`)),i(o)},onload(){e(self[n].moduleMap[a]),i(o)}});document.head.appendChild(o)})),self[n].moduleMap={}}}("/assets/");class o{constructor(t=""){this._total=0,this._equationStr=t,this._equation=this.bedmasify(this.strToArray(this._equationStr)),this._total=this.evaluate(this._equation)}strToArray(t){const n=/[\*\/\^\+\(\-]/;let e=t.split(/(\-*[0-9]+|[\*\/\+\(\)\%\^\-])/).filter((t=>{if(t&&" "!==t)return t}));for(let s=0;s<e.length;s++)if(parseInt(e[s])<0&&!e[s-1].match(n)){let t=(-1*parseInt(e[s])).toString();e[s]="-",e.splice(s+1,0,t)}for(let s=0;s<e.length;s++)(parseInt(e[s])&&"("===e[s+1]||")"===e[s]&&parseInt(e[s+1]))&&(e.splice(s+1,0,"*"),s++);return e}bedmasify(t){let n=JSON.parse(JSON.stringify(t));for(let e=0;e<3;e++)for(let t=0;t<n.length;t++)if(0===e){if("("===n[t]){const e=n.length-(n.length-t);let s=n.splice(0,e);n.splice(0,1);let i=this.bedmasify(n.splice(0));n=[...s,...i],t-=1;continue}}else if(1===e)if("^"===n[t]){const e=n.length-(n.length-t)-1;let s=n.splice(0,e),i=n.splice(0,3),l=n.splice(0);n=[...s,i,...l],t-=1}else"%"===n[t]&&(n[t-1]=this.percentage(n[t-1]),n.splice(t,1));else if(2===e){if("object"==typeof n[t])continue;if(n[t].match(/^[\*\/]$/)&&"("!==n[t+1]){const e=n.length-(n.length-t)-1;let s=n.splice(0,e),i=n.splice(0,3),l=n.splice(0);n=[...s,i,...l],t-=1}else if(")"===n[t]){let e=n.splice(0,t);return n.splice(0,1),[e,...n]}}return n}evaluate(t){let n=JSON.parse(JSON.stringify(t)),e="",s=0;const i=/^\-*[0-9]*\.?[0-9]+?$/;for(let l=0;l<n.length;l++)if("object"==typeof n[l]&&(n[l]=this.evaluate(n[l]).toString()),n[l].match(i)){let t=parseFloat(n[l]);"*"===e?s*=t:"/"===e?s/=t:"+"===e||""===e?s+=t:"-"===e?s-=t:"^"===e&&(s=Math.pow(s,t)),e=""}else e=n[l];return s}get total(){return this._total}get equationStr(){return this._equationStr}get equation(){return this._equation}add(t){this._total+=t}subtract(t){this._total-=t}multiply(t){this._total*=t}divide(t){this._total/=t}percentage(t){return(.01*parseInt(t)).toString()}}var c=t({name:"Calc",data:()=>({input:"",total:"",num1:null,num2:null,nextOperation:null}),computed:{numOfPar(){return(this.input.match(/\(/g)||[]).length}},methods:{equals(){const t=new o(this.input);this.total=t.total.toFixed(7),console.log(typeof this.total,this.total),this.input=this.total},del(){this.input=this.input.slice(0,-1)},clear(){this.input="",this.total="",this.num1=null,this.num2=null,this.nextOperation=null},charBtn(t){t.match(/\-*[.0-9+\s\(\)\*\/\+\-]/)&&(this.input=this.input+""+t)}},watch:{input(t){const n=/[\+\*\/\-]/,e=t.length,s=t.charAt(e-1),i=t.charAt(e-2);if(t.match(/^[0-9\+\-\/\*\(\)\%\^]*$/)){if("("!==i||")"!==s&&"*"!==s&&"/"!==s&&"+"!==s||(this.input=t.slice(0,-1)),(t.match(/\)/g)||[]).length>this.numOfPar&&(this.input=t.slice(0,-1)),t.match(/[\+\*\/\)\-]{2,}$/)){if("("===s)return;if(i.match(n)&&")"===s)this.input=t.slice(0,-1);else if(")"!==i){const n=t.slice(e-1,e);this.input=t.slice(0,-2),this.input=this.input+n}}}else this.input=t.slice(0,-1)}}});const u={id:"calc"},p={class:"container mx-w-md pt-20"},h={class:"bg-gray-800 w-1/4 mx-auto shadow-xl px-5 py-3 rounded-md"},b=e("div",{class:"flex justify-between text-gray-600"},[e("p",null,"DouglasDesigns"),e("p",null,"c1")],-1),d={id:"buttons",class:"grid grid-cols-4 gap-4 mt-2 mb-3 h-32xl"};c.render=function(t,a,r,o,c,m){return l(),n("div",u,[e("div",p,[e("div",h,[b,s(e("input",{type:"text",class:"w-full h-12 border border-gray-300 bg-white my-6 rounded px-3 text-gray-800",id:"numberInput","onUpdate:modelValue":a[1]||(a[1]=n=>t.input=n)},null,512),[[i,t.input]]),e("div",d,[e("button",{class:"btn btn-secondary",id:"pOpenBtn",onClick:a[2]||(a[2]=n=>t.charBtn("("))}," ( "),e("button",{class:"btn btn-secondary",id:"pCloseBtn",onClick:a[3]||(a[3]=n=>t.charBtn(")"))}," ) "),e("button",{class:"btn btn-secondary",onClick:a[4]||(a[4]=n=>t.del())}," CE "),e("button",{class:"btn btn-secondary",id:"delBtn",onClick:a[5]||(a[5]=n=>t.clear())}," C "),e("button",{class:"btn btn-primary",onClick:a[6]||(a[6]=n=>t.charBtn("7"))}," 7 "),e("button",{class:"btn btn-primary",onClick:a[7]||(a[7]=n=>t.charBtn("8"))}," 8 "),e("button",{class:"btn btn-primary",onClick:a[8]||(a[8]=n=>t.charBtn("9"))}," 9 "),e("button",{class:"btn btn-secondary",id:"divBtn",onClick:a[9]||(a[9]=n=>t.charBtn("/"))}," ÷ "),e("button",{class:"btn btn-primary",onClick:a[10]||(a[10]=n=>t.charBtn("4"))}," 4 "),e("button",{class:"btn btn-primary",onClick:a[11]||(a[11]=n=>t.charBtn("5"))}," 5 "),e("button",{class:"btn btn-primary",onClick:a[12]||(a[12]=n=>t.charBtn("6"))}," 6 "),e("button",{class:"btn btn-secondary",id:"mulBtn",onClick:a[13]||(a[13]=n=>t.charBtn("*"))}," * "),e("button",{class:"btn btn-primary",onClick:a[14]||(a[14]=n=>t.charBtn("1"))}," 1 "),e("button",{class:"btn btn-primary",onClick:a[15]||(a[15]=n=>t.charBtn("2"))}," 2 "),e("button",{class:"btn btn-primary",onClick:a[16]||(a[16]=n=>t.charBtn("3"))}," 3 "),e("button",{class:"btn btn-secondary",id:"subBtn",onClick:a[17]||(a[17]=n=>t.charBtn("-"))}," - "),e("button",{class:"btn btn-primary",onClick:a[18]||(a[18]=n=>t.charBtn("0"))}," 0 "),e("button",{class:"btn btn-secondary",onClick:a[19]||(a[19]=n=>t.charBtn("."))}," . "),e("button",{class:"btn bg-green-700",id:"divBtn",onClick:a[20]||(a[20]=n=>t.equals())}," = "),e("button",{class:"btn btn-secondary",id:"addBtn",onClick:a[21]||(a[21]=n=>t.charBtn("+"))}," + ")])])])])};var m=t({name:"App",components:{Calc:c}});m.render=function(t,e,s,i,r,o){const c=a("Calc");return l(),n(c)};r(m).mount("#app");
