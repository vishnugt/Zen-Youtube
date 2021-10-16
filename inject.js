function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function removeElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.parentNode.removeChild(element);
  }
}

function removeYoutubeElements() {
    //Recommendations menu
    removeElementById("related")
  
    //homepage
    removeElementsByClass("ytd-rich-grid-renderer")
  
    //Left side bar
    removeElementById("guide-renderer")
  
  
    //Comments section
    removeElementById("comments")
  
    //youtube premium banner
    removeElementById("masthead-ad")
    removeElementsByClass("ytd-banner-promo-renderer-inline-image") //redundant
    removeElementsByClass("ytd-banner-promo-renderer") //redundant
}

let observer = new MutationObserver((mutations) => {
  removeYoutubeElements();
})

observer.observe(document.body, {
  childList: true
  , subtree: true
})
