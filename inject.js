function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

function removeElementById(id) {
  const element = document.getElementById(id);
  if(element) {
    element.parentNode.removeChild(element);
  }
}

//Recommendations menu
removeElementsByClass("ytd-item-section-renderer")
removeElementsByClass("ytd-watch-next-secondary-results-renderer")

//homepage
removeElementsByClass("ytd-two-column-browse-results-renderer")


//Left side bar
removeElementById("guide-renderer")