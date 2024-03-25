	/*SLIDESHOW JAVA SCRIPT PART*/
	
	var myIndex = 0;
	carousel();
	function carousel() {
	  var i;
	  var x = document.getElementsByClassName("slides");
	  for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";  
	  }
	  myIndex++;
	  if (myIndex > x.length) {myIndex = 1}    
	  x[myIndex-1].style.display = "block";  
	  setTimeout(carousel, 2000); // Change image 
	}

	/*References 
W3Schools (2019). How to Create a Slideshow. [online] W3schools.com. Available at: 
https://www.w3schools.com/howto/howto_js_slideshow.asp.*/