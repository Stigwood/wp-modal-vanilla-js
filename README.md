# wp-modal-vanilla-js
Vanilla JS that automatically adds a lightbox to wordpress images in posts

This is an attempt to bring an extremely simple modal style image enlarging window to wordpress post images, without the addition of both lightbox and jQuery.

Instructions - have your theme load the script.  I prefer to put something like 

wp_enqueue_script( 'simpleModal', get_template_directory_uri() . '/js/modal.js');

in the functions.php of your current theme, but you can also load it at the head, at the foot, whatever you like.  

This is designed to seek out any images produced under the class 'wp-caption' and add a simple modal/lightbox function 
to open the image in a larger size when either the image or caption is clicked.  

When you insert the image into your post select 'Media File' in the 'Link to' dropdown menu.  This is located under 'Attachment Display Settings'.  It adds the url of the full-size image as a link to the original image.  If left alone, it produces a fairly clunky non-styled image, but this is how add-ons like lightbox find the image to display in a window.  

That's in for set-up.  I've take the unusual and possibly unothodox step of putting the css into the javascript file itself, which it adds if it finds an incidence of 'wp-caption'.  It also uses a css spinner to indicate that something is loading.  

CUSTOMIZATION

You can also use this to target other image container classes that use the media target, like 'gallery-item'.  Just change the initial variable nameOfClass at the beginning.  It's possible that I'll create a loop to go through all the possible classes, but we'll just leave it for now.  

Version 0.1

Uploaded.  Needs a bit of fine tuning on the css load animation.  
