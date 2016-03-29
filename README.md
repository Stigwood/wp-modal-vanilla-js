# wp-modal-vanilla-js
Vanilla JS that adds an automatic lightbox to wordpress images in posts

This is an attempt to bring an extremely simple lightbox style window to wordpress post images, without the addition of both lightbox and jQuery.

Instructions - have your theme load the script.  I prefer to put something like 

wp_enqueue_script( 'simpleModal', get_template_directory_uri() . '/js/modal.js');

in the functions.php of your current theme, but you can also load it at the head, at the foot, whatever you like.  

This is designed to seek out any images produced under the class 'wp-caption' and add a simple modal/lightbox function 
to open the image in a larger size.  It finds original image when you select 'media' when adding the image in your post.  
