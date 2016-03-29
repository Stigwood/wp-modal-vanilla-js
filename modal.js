function openModalWindow () {
// Doesn't actually open modal window, is simply in place for HTML semantics when replacing href with onclick function
  console.log ('Open!');      
}

(function() {    
// Common practice javascript IIFE (immediately invoked functional expression) function.  In other words, javascript will only load after DOM.  In this case the function must test if containers exist with the class nameOfClass.  

  document.addEventListener("DOMContentLoaded", function() {

// insert name of class that you want targetted.  Two most common are 'wp-caption' and 'gallery-item'.
    var nameOfClass = 'wp-caption';
    
// Check if there are any classes containers on the page.  
    var wpCaptionArray = document.getElementsByClassName(nameOfClass);
    
    // If not, return. 
    if ( !wpCaptionArray[0] ){      
      return;
    }
    
// Now load the function that will closes the modal image window.  It is written as a named function (rather than anonymously)  as it will be called three times:  mouse click on the image, mouse click on the close window, or by pressing the 'esc' key.  
    
    function removeIt () {
    
      var removalDiv = document.getElementById("inner-overlay-t1e2e"); 
// before removing the div, we need to eliminate the background gif loader animation, so it doesn't look funny. 

      removalDiv.parentNode.removeChild(removalDiv);  
      
// By targetting the style of the <body> directly (instead of by css), this avoid overwriting any overflow styles that might be present or absent in the original site's style-sheet.  
      document.body.style.removeProperty('overflow'); 

// We keep the modal overlay in case the user wants to click again, but turn it off.  Opacity is used (rather than display: none) to maintain the fade effect.    
      modalOverlay.style.opacity = '0';
      modalOverlay.style.pointerEvents = 'none';

    } // End function removeIt

/* 
  Having established that images are present, we will add two elements:
  1) A semi-transparent full width background, with a nice transitional fade
  2) A mini style sheet that will control all the new elements.  
  
*/
    
    var modalOverlay = document.createElement('div');
  
    var actualBody =  document.getElementsByTagName('body') [0];
// Simply put, appendChild puts a container at the end, insert before (firstChild) puts it at the beginning, which is important for a full bleed opaque cover.  
    actualBody.insertBefore(modalOverlay, actualBody.firstChild);
   
    modalOverlay.setAttribute("id","modal-overlay-t1e2e");
    // using a stupid string instead of wasting time checking for the id
    
// Now that this is done, we're going to add a css file to apply to the three elements.  
    
    var addedCss = "#modal-overlay-t1e2e { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba( 255, 255, 255, .5 ); background-size: 20%; z-index: 100; opacity: 0; -webkit-transition: opacity 400ms ease-in; -moz-transition: opacity 400ms ease-in; transition: opacity 400ms ease-in; pointer-events: none; overflow: scroll; }   #inner-overlay-t1e2e  {position: relative;  margin: 5% auto; cursor: pointer; border: .7rem solid #ddd; background: #444; color: #ddd;} .close-div-t1e2e {background: #ddd; color: #444; cursor: pointer; padding:.7rem; position: absolute; top: -.5rem; right: -.5rem; font-family: Helvetica, sans-serif;} #spinner8329 {position: relative; margin: 10% auto; width: 150px;height: 150px; -webkit-animation: bob8329 1s infinite linear; -moz-animation: bob8329 1s infinite linear; -o-animation: bob8329 1s infinite linear; animation: bob8329 1s infinite linear; border-radius:75px; border-bottom:5px solid #666;} @-webkit-keyframes bob8329 { to { -webkit-transform: rotate(360deg); } } @-moz-keyframes bob8329 { to { -moz-transform: rotate(360deg); } } @-o-keyframes bob8329 { to { -o-transform: rotate(360deg); } } @keyframes bob8329 { to { transform: rotate(360deg); } }";

// Add the following css for positioning.  If you like, you make move it to your main style file. It's included here so that the script may work independently on any page.

    var addedStyle = document.createElement('style');

    if (addedStyle.styleSheet) 
      {addedStyle.styleSheet.cssText = addedCss;} 
    else 
      {addedStyle.appendChild(document.createTextNode(addedCss));}
    // as far as I know, the use of createTextNode is used for browsers that don't supoort styleSheet.  
   
    document.getElementsByTagName('head')[0].appendChild(addedStyle);
    
    
   
// Find all the wp-captions on the page
    
    for (var i = 0; i < wpCaptionArray.length; i++) {
    
      var temp_link = wpCaptionArray [i].getElementsByTagName('a')[0].getAttribute('href');
      
      if ( !temp_link ) {
        console.log ('no link within wp-caption');
        return;
      }
      else
        console.log ('link extant');
      
      wpCaptionArray [i].getElementsByTagName('a')[0].removeAttribute('href'); // Call off linking function
      wpCaptionArray [i].getElementsByTagName('a')[0].setAttribute('onclick', 'openModalWindow (); return false;' ); // replace with unnecessary onclick within html
      wpCaptionArray [i].setAttribute('modalImage', temp_link ); // install link to image in ID called modalImage
      // removeAttribuet href
      wpCaptionArray [i].style.cursor = 'pointer';
      
      wpCaptionArray [i].onclick = function () {  // Adds click to image. 
// First add the background image 

// Second turn on the modal overlay  

        modalOverlay.style.opacity = '1';
        modalOverlay.style.pointerEvents = 'auto';  // This is turned off while overlay is hidden to allow links to function on page. 
      
      document.body.style.overflow = "hidden"; // This works in firefox, but not safari, which may have other characteristics to close.  
      // document.body.style.height = "100%";  // This holds Safari, but causes page to reset to top.  The compromise is better.
      
      var spinnerDiv = document.createElement("div");
      spinnerDiv.setAttribute("id", "spinner8329");
      modalOverlay.appendChild(spinnerDiv);

      
      var centerDiv = document.createElement("div");
      
      centerDiv.setAttribute("id","inner-overlay-t1e2e");

// Add loading image.  
/*

      var loadImage = document.createElement("img");
      loadImage.src = url_object.themeURL + '/js/rotate_line_no_letters.svg';

      modalOverlay.appendChild(loadImage);
*/


      var newImage = document.createElement("img"); 
      newImage.src = this.getAttribute('modalImage');
      newImage.style.visibility = 'hidden';
      //modalOverlay.style.backgroundImage = "url('')";

      //newImage.setAttribute("id","inner-image"); // This allows it to be deleted at close.
      //newImage.setAttribute("style", "margin: 0 auto;");
      //centerDiv.style.cssText = 'position: relative;  margin: 5% auto;  padding: 0 2rem; height: 100%;';

// Close box
      
      var closeDiv = document.createElement("div"); 
      closeDiv.setAttribute("class","close-div-t1e2e");
      centerDiv.onmouseover = function () {closeDiv.getElementsByTagName('a')[0].style.color = 'white'}
      centerDiv.onmouseout = function () {closeDiv.getElementsByTagName('a')[0].style.color = '#444'}

  
// set the width before we even do anything - 
        
      newImage.onload = function() {
      
      modalOverlay.removeChild(spinnerDiv);  
        
      var natWidth = this.naturalWidth;
      var screenWidth = window.innerWidth *.95; // 95% of screen for border.  
      console.log (screenWidth + '-' + natWidth);

        if (natWidth>screenWidth) 
      
        {centerDiv.style.maxWidth =  (.95 * screenWidth) + 'px';
          console.log (screenWidth + 'px');
        }
        
        else
        {centerDiv.style.maxWidth = natWidth + 'px';}
        closeDiv.innerHTML = '<a onclick = "openModalWindow (); return false"><b>X</b></a>';
        newImage.style.visibility = 'visible';
        
      modalOverlay.appendChild(centerDiv);
      centerDiv.appendChild(newImage);
      centerDiv.appendChild(closeDiv);

      }    
      

      
      newImage.onclick = removeIt;
      closeDiv.onclick = removeIt;
// Esc key functionality

      document.addEventListener('keyup', function(e) {
        if (e.keyCode == 27) {
          if (document.getElementById("inner-overlay-t1e2e")){
            removeIt ();
            console.log ('ESC');
          }
          
          else
            return;
        }
      });
      
      } // End onclick add
    
    } // End for loop.
  
  }); // Event Listener end

}()); // IIFE end  
