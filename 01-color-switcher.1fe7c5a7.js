const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let r=null;t.addEventListener("click",(function(){t.setAttribute("disabled",!0),e.removeAttribute("disabled"),r=setInterval((()=>{document.querySelector("body").style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){e.setAttribute("disabled",!0),clearInterval(r),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.1fe7c5a7.js.map
