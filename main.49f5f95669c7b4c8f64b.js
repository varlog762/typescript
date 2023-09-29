!function(){"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){var t;e.g.importScripts&&(t=e.g.location+"");var r=e.g.document;if(!t&&r&&(r.currentScript&&(t=r.currentScript.src),!t)){var s=r.getElementsByTagName("script");if(s.length)for(var n=s.length-1;n>-1&&!t;)t=s[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t}();var t=class{constructor(e,t){this.baseLink=e,this.options=t}getResp(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:()=>{console.error("No callback for GET response")};this.load("GET",e.endpoint,t,e.options)}errorHandler(e){if(!e.ok)throw 401!==e.status&&404!==e.status||console.log("Sorry, but there is ".concat(e.status," error: ").concat(e.statusText)),Error(e.statusText);return e}makeUrl(e,t){const r={...this.options,...e};let s="".concat(this.baseLink).concat(t,"?");return Object.keys(r).forEach((e=>{s+="".concat(e,"=").concat(r[e],"&")})),s.slice(0,-1)}load(e,t,r){let s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};fetch(this.makeUrl(s,t),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>r(e))).catch((e=>console.error(e)))}};var r=class extends t{constructor(){super("https://newsapi.org/v2/",{apiKey:"1a63bc83f68044919f1f0ebd2e2394d6"})}};var s=class extends r{getSources(e){super.getResp({endpoint:"sources"},e)}getNews(e,t){if("string"!=typeof e){let r=e.target;const s=e.currentTarget;for(;r!==s;){if(r&&r.classList.contains("source__item")){const e=r.getAttribute("data-source-id");if(e&&s.getAttribute("data-source")!==e){s.setAttribute("data-source",e);const r={endpoint:"everything",options:{sources:e}};super.getResp(r,t)}return}r&&(r=r.parentNode)}}else{const r={endpoint:"everything",options:{q:e,language:"en"}};super.getResp(r,t)}}};var n=(e,t,r)=>{const s=document.createElement(e);return s.classList.add(r),t.append(s),s};let o;var c;(c=o||(o={})).newsContainer=document.querySelector(".news"),c.searchFormHeader=document.forms[0],c.searchInputHeader=document.forms[0].elements[0],c.searchFormBurger=document.forms[1],c.searchInputBurger=document.forms[1].elements[0],c.burgerMenuContainer=document.querySelector(".header__burger-menu-container"),c.sourcesCarousel=document.querySelector(".sources__carousel"),c.sourcesContainer=document.querySelector(".sources"),c.sourcesPrevBtn=document.querySelector(".prev-button"),c.sourcesNextBtn=document.querySelector(".next-button");var a=class{constructor(){this.newsCollection=[]}draw(e){e.length>=10?this.newsCollection=e.filter(((e,t)=>t<10)):this.newsCollection=e;const t=document.createDocumentFragment();this.newsCollection.forEach(((e,r)=>{const s=document.createElement("div");s.classList.add("newsItemTemp");const o=n("div",s,"news__item");r%2&&o.classList.add("alt");const c=n("div",o,"news__meta"),a=n("div",c,"news__meta-photo");a.classList.add("default-img"),a.style.backgroundImage="url(".concat(e.urlToImage||"assets/img/news_placeholder.jpg",")");const i=n("div",c,"news__meta-details-container"),u=n("ul",i,"news__meta-details");n("li",u,"news__meta-author").textContent=e.author||e.source.name;n("li",u,"news__meta-date").textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-");const l=n("div",o,"news__description");n("h3",l,"news__description-source").textContent=e.source.name;n("h2",l,"news__description-title").textContent=e.title;n("p",l,"news__description-content").textContent=e.description;const d=n("p",l,"news__read-more"),h=n("a",d,"news__read-more-link");h.setAttribute("href",e.url),h.textContent="Read More",t.append(s)})),o.newsContainer&&(o.newsContainer.innerHTML="",o.newsContainer.appendChild(t))}};var i=class{draw(e){const t=document.createDocumentFragment();e.forEach((e=>{const r=document.createElement("div");r.classList.add("source__item-container");const s=document.createElement("div");s.setAttribute("data-source-id",e.id),s.classList.add("source__item"),r.append(s);const n=document.createElement("span");n.classList.add("source__item-name"),n.textContent=e.name,s.append(n),t.append(r)})),null!==o.sourcesContainer&&o.sourcesContainer.append(t)}};class u{constructor(){this.news=new a,this.sources=new i}drawNews(e){const t=null!=e&&e.articles?null==e?void 0:e.articles:[];this.news.draw(t)}drawSources(e){const t=null!=e&&e.sources?null==e?void 0:e.sources:[];this.sources.draw(t)}}let l=function(e){return e.Travel="travel",e.Sport="sport",e.Music="music",e.Technologies="technologies",e}({});var d=class{constructor(){this.controller=new s,this.view=new u}start(){const e=e=>e&&this.view.drawNews(e);this.controller.getNews("finance",e),document.body.addEventListener("click",(t=>{const r=t.target;r.closest(".category")?Object.keys(l).forEach((t=>{var s;t===(null===(s=r.closest(".category"))||void 0===s?void 0:s.id.split("Burger").join(""))&&(this.controller.getNews(t,e),this.hideBurgerMenu())})):r.closest(".source__item-container")?this.controller.getNews(t,e):r.closest(".header__burger-menu-close-btn")||r===o.burgerMenuContainer?this.hideBurgerMenu():r.closest(".header__burger-btn")?this.showBurgerMenu():r.closest(".prev-button")?o.sourcesContainer.scrollLeft-=100:r.closest(".next-button")&&(o.sourcesContainer.scrollLeft+=100)})),document.body.addEventListener("submit",(t=>{let r;t.preventDefault(),r=t.target===o.searchFormBurger?o.searchInputBurger.value:o.searchInputHeader.value,r&&(this.controller.getNews(r,e),this.hideBurgerMenu())})),this.controller.getSources((e=>{e&&this.view.drawSources(e)}))}showBurgerMenu(){document.body.classList.add("body__burger_active"),o.burgerMenuContainer.classList.add("header__burger-menu_active")}hideBurgerMenu(){document.body.classList.remove("body__burger_active"),o.burgerMenuContainer.classList.remove("header__burger-menu_active")}};e.p,e.p;(new d).start()}();