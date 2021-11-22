var ce=Object.defineProperty,ae=Object.defineProperties;var le=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var ft=Object.prototype.hasOwnProperty,gt=Object.prototype.propertyIsEnumerable;var wt=(t,n,e)=>n in t?ce(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,h=(t,n)=>{for(var e in n||(n={}))ft.call(n,e)&&wt(t,e,n[e]);if(j)for(var e of j(n))gt.call(n,e)&&wt(t,e,n[e]);return t},p=(t,n)=>ae(t,le(n));var xt=(t,n)=>{var e={};for(var o in t)ft.call(t,o)&&n.indexOf(o)<0&&(e[o]=t[o]);if(t!=null&&j)for(var o of j(t))n.indexOf(o)<0&&gt.call(t,o)&&(e[o]=t[o]);return e};import{c as de,a as Q,b as yt,d as mt,u as V,j as s,I as O,A as X,r as b,B as P,S as he,K as pe,T as vt,e as Y,f as ue,E as Et,g as I,G as fe,R as bt,H as It,h as tt,i as ge,C as we,k as xe,l as ye,m as me,s as ve,n as Ct,o as Ee,P as et,L as be,F as Bt,p as Ie,q as Pt,t as Ce,v as Be,w as zt,x as Pe,y as ze,z as Mt,D as H,J as nt,M as Tt,N as Me,O as Te,Q as Re,U as ke,V as Fe,W,X as ot,Y as it,Z as Se,_ as Ae,$ as Z,a0 as Oe,a1 as Le,a2 as De,a3 as $e,a4 as Ne,a5 as Ke,a6 as Ge,a7 as Je,a8 as je}from"./vendor.4cc16d1c.js";const He=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}};He();const rt={path:"/TaskFlow/"},Rt="/TaskFlow/flow/:id",q={path:Rt,url:t=>`/TaskFlow/flow/${t.id}`,matchSelector:de(Rt)},st={palette:{mode:"dark"},typography:{button:{textTransform:"none"}}},We=Q(st),kt=Q(p(h({},st),{typography:{fontSize:10}}));Q(p(h({},st),{typography:{fontSize:13}}));const ct={stagePadding:16,indent:2,m:40,card:{width:240,height:94}},Ze=()=>null,at=()=>{const t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");for(let n=0,e=t.length;n<e;n+=1)switch(t[n]){case"x":t[n]=Math.floor(Math.random()*16).toString(16);break;case"y":t[n]=(Math.floor(Math.random()*4)+8).toString(16);break}return t.join("")},{card:g,indent:F,m:u,stagePadding:Ft}=ct,St=(t,n=[],e={})=>{const{flowIndex:o=0,type:r="task",direction:i="vertical",open:c=!0,text:l=""}=e;return{id:t,childIds:n,flowIndex:o,type:r,direction:i,open:c,text:l}},At=(t,n,e)=>{const o=n[t];if(!o)throw new Error;const{direction:r,childIds:i}=o,c=o.childIds.map((l,a)=>At(l,n,{id:t,direction:r,childIds:i,index:a}));return p(h({},o),{children:c,parent:e,tree:void 0,point:void 0,addable:void 0})},Ot=t=>{const{direction:n}=t;if(!t.open)return p(h({},t),{tree:g});if(t.children.length===0){const i=n==="vertical"?F*u+g.width:g.width+u,c=n==="horizontal"?F*u+g.height:g.height+u;return p(h({},t),{tree:{width:i,height:c}})}const e=t.children.map(i=>Ot(i)),o=n==="vertical"?F*u+Math.max(...e.map(i=>i.tree.width))+u:g.width+u+e.map(i=>i.tree.width+u).reduce((i,c)=>i+c),r=n==="horizontal"?F*u+Math.max(...e.map(i=>i.tree.height))+u:g.height+u+e.map(i=>i.tree.height+u).reduce((i,c)=>i+c);return p(h({},t),{tree:{width:o,height:r},children:e})},Lt=(t,n)=>{const{direction:e}=t;if(!t.open||t.children.length===0)return p(h({},t),{point:n});let o=0;const r=t.children.map(i=>{const c=n.x+(e==="vertical"?F*u:g.width+u+o),l=n.y+(e==="horizontal"?F*u:g.height+u+o);return o+=(e==="vertical"?i.tree.height:i.tree.width)+u,Lt(i,{x:c,y:l})});return p(h({},t),{point:n,children:r})},Dt=(t,n,e=0)=>{if(!t.point||!t.tree)return t;const o=[],r=[];if(t.open){const{id:c,point:l,direction:a,childIds:E,tree:f}=t,v={id:c,direction:a,childIds:E,index:0},d=l.x+(a==="vertical"?F*u+g.width/2:g.width+u/2),w=l.y+(a==="horizontal"?F*u+g.height/2:g.height+u/2);o.push({parent:v,left:d,top:w});const T=l.x+(a==="vertical"?0:g.width/2),M=l.y+(a==="horizontal"?0:g.height/2),R=a==="vertical"?f.width:g.width+u,k=a==="horizontal"?f.height:g.height+u;r.push({parent:v,from:c,depth:e+1,x:T,y:M,width:R,height:k})}if(n){const{id:c,point:l,direction:a,childIds:E,tree:f}=n;if(!l||!f)throw new Error;const v={id:c,direction:a,childIds:E,index:E.indexOf(t.id)+1},d=t.point.x+(a==="vertical"?g.width/2:t.tree.width+u/2),w=t.point.y+(a==="horizontal"?g.height/2:t.tree.height+u/2);o.push({parent:v,left:d,top:w});const T=a==="vertical"?l.x:t.point.x+t.tree.width-g.width*.5,M=a==="horizontal"?l.y:t.point.y+t.tree.height-g.height*.5,R=a==="vertical"?f.width:g.width+u,k=a==="horizontal"?f.height:g.height+u;r.push({parent:v,from:t.id,depth:e,x:T,y:M,width:R,height:k})}const i=t.children.map(c=>Dt(c,t,e+1));return p(h({},t),{addable:{points:o,zones:r},children:i})},$t=t=>{const o=t,{children:n}=o,e=xt(o,["children"]);return[e].concat(n.flatMap((r,i)=>{const{id:c,direction:l,childIds:a}=e;return $t(p(h({},r),{parent:{id:c,direction:l,childIds:a,index:i}}))}))},z=(t,n)=>{const{flow:e}=t;if(!e)throw new Error;const{rootId:o}=e;if(!t.entities[o])throw new Error;let r=At(o,t.entities);r=Ot(r),r=Lt(r,{x:Ft,y:Ft}),r=Dt(r,void 0);const i=$t(r).map((c,l)=>p(h({},c),{flowIndex:l}));t.addablePoints=i.flatMap(c=>{var l,a;return(a=(l=c.addable)==null?void 0:l.points)!=null?a:[]}),t.dropZones=i.flatMap(c=>{var l,a;return(a=(l=c.addable)==null?void 0:l.zones)!=null?a:[]}).sort((c,l)=>l.depth-c.depth),i.forEach(c=>delete c.addable),n.setAll(t,i)},y=yt(),qe=y.getInitialState({addablePoints:[],dropZones:[]}),m=mt({name:"flow-entity",initialState:qe,reducers:{setFlow(t,{payload:n}){y.removeAll(t),t.selected=void 0;const{id:e,title:o,rootId:r,entities:i}=n;t.flow={id:e,title:o,rootId:r},y.setAll(t,i),z(t,y)},add(t,{payload:n}){const e=t.entities[n.id];if(!e)throw new Error;const o=at();e.childIds.splice(n.index,0,o);const r=St(o,[],{open:!1});y.addOne(t,r),z(t,y)},update(t,{payload:n}){y.updateOne(t,n),z(t,y)},delete(t,{payload:n}){const e=t.entities[n.id];if(!e)throw new Error;const o=e.childIds.splice(n.index,1)[0];y.removeOne(t,o),t.selected=void 0,z(t,y)},select(t,{payload:n}){n?t.selected={id:n,status:"selected"}:t.selected=void 0,z(t,y)},editStart(t){if(!t.selected)throw new Error;t.selected.status="editing",z(t,y)},editEnd(t){if(!t.selected)throw new Error;t.selected.status="selected",z(t,y)},dragStart(t){if(!t.selected)throw new Error;t.selected.status="dragging";const{id:n}=t.selected;y.updateOne(t,{id:n,changes:{open:!1}}),z(t,y)},dragEnter(t,{payload:n}){if(!t.selected)throw new Error;const e=t.entities[t.selected.id];if(!e||!e.parent)throw new Error;if(e.parent.id===n.id){const o=t.entities[n.id];if(!o)throw new Error;e.parent.index<n.index?(o.childIds.splice(n.index,0,e.id),o.childIds.splice(e.parent.index,1)):(o.childIds.splice(e.parent.index,1),o.childIds.splice(n.index,0,e.id))}else{const o=t.entities[n.id];if(!o)throw new Error;o.childIds.splice(n.index,0,e.id);const r=t.entities[e.parent.id];if(!r)throw new Error;r.childIds.splice(e.parent.index,1)}z(t,y)},dragEnd(t){if(!t.selected)throw new Error;t.selected.status="moving",z(t,y)},finishMoving(t){if(!t.selected)throw new Error;t.selected.status="selected",z(t,y)}}}),Nt=y.getSelectors(t=>t.entity),Ue=({point:t})=>{const n=V(),{parent:e,top:o,left:r}=t;return s(O,{size:"small",sx:{position:"absolute",left:r,top:o,transform:"translate3d(-50%, -50%, 0)"},onClick:()=>n(m.actions.add(e)),children:s(X,{fontSize:"inherit"})})},_e=({stageSize:t,children:n,refs:e})=>{const[o,r]=b.exports.useState({width:0,height:0}),i=b.exports.useRef(),c=b.exports.useRef(),l=b.exports.useCallback(f=>{if(f){i.current=f,c.current&&e&&e(f,c.current);const{width:v,height:d}=f.getBoundingClientRect();r({width:v,height:d})}},[]),a=b.exports.useCallback(f=>{f&&(c.current=f,i.current&&e&&e(i.current,f))},[]);b.exports.useEffect(()=>{const f=()=>{if(i.current){const{width:d,height:w}=i.current.getBoundingClientRect();r({width:d,height:w})}};window.addEventListener("resize",f),f();const v=()=>{if(i.current&&c.current){const d=i.current.scrollLeft,w=i.current.scrollTop;c.current.container().style.transform=`translate(${d}px, ${w}px)`,c.current.x(-d),c.current.y(-w)}};return i.current&&i.current.addEventListener("scroll",v),()=>window.removeEventListener("resize",f)},[]);const E={width:Math.max(t.width,o.width)+o.width,height:Math.max(t.height,o.height)+o.width};return s(P,{ref:l,sx:{width:"100%",height:"100%",overflow:"auto"},children:s(P,{sx:p(h({},E),{overflow:"hidden"}),children:s(he,p(h({ref:a},o),{children:n}))})})},{card:C}=ct,U=7,L=4,lt="#444a",dt=pe.Easings.EaseOut,Qe=t=>{if(t.length<2)return;const n=t[0],e=t[t.length-1],o=(n.time-e.time)/400;return{x:(n.x-e.x)/o,y:(n.y-e.y)/o}},Ve=({entity:t,dropZones:n,selectedStatus:e})=>{const o=V(),{id:r,parent:i,point:c,tree:l,open:a,direction:E,childIds:f,text:v}=t,d=b.exports.useRef(null),w=b.exports.useRef(),T=b.exports.useRef([]);!w.current&&c&&(w.current=c);const M=(e==null?void 0:e.id)===r&&e.status==="selected",R=(e==null?void 0:e.id)===r&&e.status==="editing",k=(e==null?void 0:e.id)===r&&e.status==="dragging",Gt=(e==null?void 0:e.id)===r&&e.status==="moving";if(b.exports.useEffect(()=>{var B;if(!w.current||!c||k)return;(w.current.x!==c.x||w.current.y!==c.y)&&((B=d.current)==null||B.to(p(h({},c),{easing:dt})),w.current=c)},[c]),b.exports.useEffect(()=>{let x;const B=()=>{if(d.current&&w.current){const N=d.current.x()-w.current.x,K=d.current.y()-w.current.y,S=Date.now();T.current=T.current.concat({x:N,y:K,time:S}).sort((G,J)=>J.time-G.time).slice(0,12)}};return k?x||(x=window.setInterval(B,60)):T.current=[],()=>window.clearInterval(x)},[k]),!c||!l)return null;const Jt=p(h({},w.current),{ref:d,draggable:Boolean(i),onMouseEnter(){(!e||e.status==="selected"&&(e==null?void 0:e.id)!==r)&&(o(m.actions.select(r)),a||(document.body.style.cursor="grab"))},onMouseLeave(){document.body.style.cursor="default"},onMouseDown(){!a&&Boolean(i)&&(document.body.style.cursor="grabbing")},onMouseUp(){if(!a&&Boolean(i)&&(document.body.style.cursor="grab"),!d.current||(e==null?void 0:e.status)!=="dragging")return;const x=()=>o(m.actions.finishMoving());d.current.to(p(h({},c),{easing:dt,onFinish:x})),o(m.actions.dragEnd())},onDragStart(){o(m.actions.dragStart())},onDragMove(x){var J,ut;if((e==null?void 0:e.status)==="moving"||!i||!w.current)return;const B=Qe(T.current),N=x.currentTarget.x()+C.width/2+((J=B==null?void 0:B.x)!=null?J:0),K=x.currentTarget.y()+C.height/2+((ut=B==null?void 0:B.y)!=null?ut:0),S=n.find(A=>A.x<N&&N<A.x+A.width&&A.y<K&&K<A.y+A.height),G=i.childIds.indexOf(r);S&&(S.parent.id!==i.id||S.parent.index!==G&&S.parent.index-1!==G)&&o(m.actions.dragEnter(S.parent))},onDragEnd(){if(document.body.style.cursor="grab",!d.current)return;const x=()=>o(m.actions.finishMoving());d.current.to(p(h({},c),{easing:dt,onFinish:x})),o(m.actions.dragEnd())}}),jt=p(h({},l),{onMouseEnter(){M&&o(m.actions.select(void 0))}}),Ht=!Gt&&s(bt,p(h({},jt),{fill:"#00aaff08"})),Wt=h({},C),Zt={text:v,fontSize:14,lineHeight:1.43,x:U,y:U,width:C.width-U*2,height:C.height-U*1.5},qt=!R&&s(ge,p(h({},Zt),{fill:"#fff"})),Ut=R&&s(vt,{variant:"standard",sx:{position:"absolute",left:0,top:0,width:C.width,height:C.height},InputProps:{sx:{px:.87,py:.8,fontSize:14}},autoFocus:!0,multiline:!0,rows:4,value:v,onChange:x=>o(m.actions.update({id:r,changes:{text:x.target.value}})),onKeyDown:x=>{x.code==="Enter"&&!x.shiftKey&&!x.nativeEvent.isComposing&&o(m.actions.editEnd())}}),_t=R&&s(Y,{variant:"contained",size:"small",sx:{position:"absolute",left:C.width,top:C.height+6,transform:"translate3d(-100%, 0, 0)"},onClick:()=>o(m.actions.editEnd()),children:"OK"}),Qt=i&&M&&s(P,{sx:{position:"absolute",left:L,top:L,p:.5,bgcolor:lt,borderRadius:1},children:s(O,p(h({},{size:"small",onClick:()=>{if(!i)throw new Error;o(m.actions.delete(i))}}),{children:s(we,{fontSize:"inherit"})}))}),Vt={position:"absolute",left:C.width-L,top:L,transform:"translate3d(-100%, 0, 0)",p:.5,bgcolor:lt,borderRadius:1},Xt=M&&s(P,{sx:Vt,children:s(O,p(h({},{size:"small",onClick:()=>{o(m.actions.editStart())}}),{children:s(xe,{fontSize:"inherit"})}))}),Yt="all 300ms 0s ease",te=E==="horizontal"?"rotate(-90deg)":void 0,ee=M&&a&&s(O,p(h({},{size:"small",sx:{mr:.5},onClick:()=>{const x=E!=="vertical"?"vertical":"horizontal";o(m.actions.update({id:r,changes:{direction:x}}))}}),{children:s(ye,{fontSize:"inherit",sx:{transition:Yt,transform:te}})})),ne={size:"small",onClick:()=>o(m.actions.update({id:r,changes:{open:!a}}))},oe=f.length!==0?s(ue,{color:"primary",variant:"dot",children:s(Et,{fontSize:"inherit"})}):s(Et,{fontSize:"inherit"}),ie=s(O,p(h({},ne),{children:a?s(me,{fontSize:"inherit"}):oe})),re={position:"absolute",left:C.width-L,top:C.height-L,transform:"translate3d(-100%, -100%, 0)",display:"flex",p:.5,bgcolor:lt,borderRadius:1},se=(M||!R&&!k&&!a&&f.length!==0)&&I(P,{sx:re,children:[ee,ie]});return I(fe,p(h({},Jt),{children:[Ht,s(bt,p(h({},Wt),{fill:"#2348"})),qt,s(It,{children:s(tt,{theme:kt,children:I(P,{sx:{width:0,height:0,position:"relative"},children:[Ut,_t,Qt,Xt,se]})})})]}))},Xe=ve("main")(({theme:{breakpoints:t}})=>({height:"calc(100vh - 56px)",[`${t.up("xs")} and (orientation: landscape)`]:{height:"calc(100vh - 48px)"},[t.up("sm")]:{height:"calc(100vh - 64px)"}})),Ye=({stageSize:t,entities:n,selected:e,addablePoints:o,dropZones:r})=>s(Xe,{children:s(Ee.Consumer,{children:({store:i})=>s(_e,{stageSize:t,children:s(et,{store:i,children:I(be,{children:[n.map(c=>s(Ve,{entity:c,dropZones:r,selectedStatus:e},c.id)),s(It,{children:s(tt,{theme:kt,children:s(et,{store:i,children:s(P,{sx:{width:0,height:0,position:"relative"},children:(!e||e.status==="selected")&&o.map(c=>s(Ue,{point:c},`${c.left}:${c.top}`))})})})})]})})})})}),tn=t=>{const{flow:n,selected:e,addablePoints:o,dropZones:r}=t.entity;if(!n)throw new Error;const i=t.entity.entities[n.rootId];if(!i)throw new Error;const{tree:c}=i;if(!c)throw new Error;const{stagePadding:l}=ct,a={width:c.width+l*2,height:c.height+l*2},E=Nt.selectAll(t);return{stageSize:a,entities:E,selected:e,addablePoints:o,dropZones:r}},en=Ct(tn)(Ye),Kt=t=>{const n=at(),e=at(),o=St(e,[],{type:"root"});return{id:n,title:t,rootId:e,entities:[o]}},$=yt(),nn=$.getInitialState(),D=mt({name:"flow",initialState:nn,reducers:{load(t,{payload:n}){$.addMany(t,n)},add(t,{payload:n}){$.addOne(t,n)},set(t,{payload:n}){$.setOne(t,n)}}}),ht=$.getSelectors(t=>t.flow),on=()=>{const t=V(),[n,e]=b.exports.useState(null),[o,r]=b.exports.useState(""),i=d=>{e(d.currentTarget)},c=()=>{r(""),e(null)},l=d=>r(d.target.value),a=()=>{const d=Kt(o);t(D.actions.add(d)),r(""),e(null)},E=d=>{if(d.code==="Enter"&&!d.nativeEvent.isComposing){const w=Kt(o);t(D.actions.add(w)),window.setTimeout(()=>{r(""),e(null)},0)}},f=Boolean(n),v=f?"simple-popover":void 0;return I(Bt,{children:[s(O,{"aria-describedby":v,onClick:i,children:s(X,{fontSize:"inherit"})}),s(Ie,{id:v,open:f,anchorEl:n,onClose:c,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:I(P,{sx:{p:2},children:[s(vt,{id:"create-flow-title",label:"Flow Title",onChange:l,onKeyDown:E,autoFocus:!0,fullWidth:!0}),s(Y,{sx:{mt:2},variant:"contained",startIcon:s(X,{}),fullWidth:!0,onClick:a,children:"New Flow"})]})})]})},rn=()=>s(on,{}),sn=({flows:t})=>s(P,{component:"main",sx:{p:2},children:s(Pt,{container:!0,spacing:2,children:t.map(n=>s(Pt,{item:!0,xs:6,md:4,lg:3,children:s(Ce,{children:s(Be,{component:zt,to:q.url({id:n.id}),disableRipple:!0,children:s(Pe,{sx:{height:200},children:s(ze,{children:n.title})})})})},n.id))})}),cn=t=>({flows:ht.selectAll(t)}),an=Ct(cn)(sn),ln=()=>I(Mt,{children:[s(H,{path:rt.path,exact:!0,children:s(an,{})}),s(H,{path:q.path,children:s(en,{})})]}),dn=nt("div")(({theme:t})=>({position:"relative",borderRadius:t.shape.borderRadius,backgroundColor:Tt(t.palette.common.white,.15),"&:hover":{backgroundColor:Tt(t.palette.common.white,.25)},marginLeft:0,width:"100%",[t.breakpoints.up("sm")]:{width:"auto"}})),hn=nt("div")(({theme:t})=>({padding:t.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),pn=nt(Me)(({theme:t})=>({color:"inherit",width:"100%","& .MuiInputBase-input":{padding:t.spacing(1,1,1,0),paddingLeft:`calc(1em + ${t.spacing(4)})`,transition:t.transitions.create("width"),width:"100%",[t.breakpoints.up("md")]:{width:"20ch"}}})),un=()=>s(Te,{position:"static",children:I(Re,{children:[I(P,{sx:{display:{xs:"none",sm:"flex"}},children:[s(Y,{component:zt,to:rt.path,size:"large",children:"Task Flow"}),s(ke,{orientation:"vertical",flexItem:!0,variant:"middle",sx:{mx:1}})]}),I(Mt,{children:[s(H,{path:rt.path,exact:!0,children:s(rn,{})}),s(H,{path:q.path,children:s(Ze,{})})]}),s(P,{sx:{flexGrow:1,pl:1}}),I(dn,{children:[s(hn,{children:s(Fe,{})}),s(pn,{placeholder:"Search\u2026",inputProps:{"aria-label":"search"}})]})]})}),fn=()=>I(Bt,{children:[s(un,{}),s(ln,{})]}),_="flows";function*gn(){const t=localStorage.getItem(_),n=t?JSON.parse(t):[];yield W(D.actions.load(n))}function*wn(){for(;;){const{payload:t}=yield ot(D.actions.add.toString()),n=localStorage.getItem(_),e=n?JSON.parse(n):[];localStorage.setItem(_,JSON.stringify(e.concat(t)))}}function*xn(){for(;;){const{type:t}=yield ot("*");if(t.startsWith("flow-entity")){const n=yield it(),{flow:e}=n.entity;if(!e)throw new Error;const o=Nt.selectAll(n);yield W(D.actions.set(p(h({},e),{entities:o})));const r=yield it(ht.selectAll);localStorage.setItem(_,JSON.stringify(r))}}}function*yn(){for(;;){yield ot(Ae);const t=yield it(),n=q.matchSelector(t);if(!n||!n.isExact)continue;const e=ht.selectById(t,n.params.id);if(!e){yield W(Se("/"));continue}yield W(m.actions.setFlow(e))}}function*mn(){yield Z(yn),yield Z(gn),yield Z(wn),yield Z(xn)}const pt=Oe(),vn=Le({router:De(pt),flow:D.reducer,entity:m.reducer}),En=()=>{const t=$e(pt),n=Ne(),e=Ke({reducer:vn,middleware:o=>o({thunk:!1}).concat([t,n])});return n.run(mn),e},bn=En(),In=()=>s(et,{store:bn,children:s(Je,{history:pt,children:I(tt,{theme:We,children:[s(je,{}),s(fn,{})]})})});Ge.exports.render(s(In,{}),document.querySelector("#root"));
