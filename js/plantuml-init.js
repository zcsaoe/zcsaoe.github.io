const loadScript = (url, onloadFunction) => {
  var newScript = document.createElement("script");
  newScript.onerror =  (oError) => {
    throw new URIError("The script " + oError.target.src + " didn't load correctly.");
  };
  if (onloadFunction) { newScript.onload = onloadFunction; }
  document.head.insertAdjacentElement('beforeend', newScript);
  newScript.src = url;
}

const loadPlantUMLOnNeed = () => {
  let plantumlPrefix = "language-plantuml";

  if (document.querySelectorAll("[class^=" + plantumlPrefix + "]").length > 0) {
    loadScript('https://cdn.jsdelivr.net/gh/jmnote/plantuml-encoder@1.2.4/dist/plantuml-encoder.min.js', () => {
      (function(){
        Array.prototype.forEach.call(document.querySelectorAll("[class^=" + plantumlPrefix + "]"), function(code){
          let image = document.createElement("IMG");
          image.loading = 'lazy';
          image.src = 'http://www.plantuml.com/plantuml/svg/~1' + plantumlEncoder.encode(code.innerText);
          code.parentNode.insertBefore(image, code);
          code.style.display = 'none';
        });
      })();

      console.log("PlantUML init done");
    })
  }
}

// cook_aoe:plantuml
window.addEventListener('load', function(event) {
  loadPlantUMLOnNeed();
});
