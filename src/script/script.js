

$(document).ready(function(){
    $('ul.tabs').tabs();
    $('.sidenav').sidenav();
    $('.modal').modal();
  });


  /*
   * Sets a new cookie, with name, value and days given.
   * W3Schools ©
   */
  function setCookie(cookieName, cookieValue, expDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expDays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires;
  }

  /*
   * Retuns the value of the cookie with the name given.
   * W3Schools ©
   */
  function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /*
   * Deletes all the cookies stored of the document.
   * W3Schools ©
   */
  function deleteAllCookies() {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
  }


  /*
   * Manages the login part. Gets the email and password and check if the email
   * is already in the cookies. If it is stored in the cookie, the form is filled,
   * if not, a new cookie with the email and password introduced is created.
   */
  function submitLogin() {
    // Get email entered
    var userEmail = document.getElementById('login-email').value;
    // Get password entered
    var userPassword = document.getElementById('login-password').value;
    // Hide login modal
    document.getElementById('login-modal').style.display =  "none";
    // Check if email entered is known
    if (getCookie("email") != userEmail) {
      // New user! Delete old cookies
      deleteAllCookies();
      // Store new cookie for email
      setCookie("email", userEmail, 30);
      // Store new cookie for password
      setCookie("password", userPassword, 30);
    }
    // Load cookies data and fill the fotm
    loadCookiesData();
  }

  /*
   * Stores the new data entered by the user in the form in new cookies, and alert
   * the user about the fields modified.
   */
  function submitChanges() {
    // Get the input and select elements of the form
    var formFields = document.getElementsByClassName('sections-container')[0].querySelectorAll('input, select');
    // This will be store the name of the fields modified
    var changes = "";
    // Go through all the form fields
    for (var i = 0; i < formFields.length; i++) {
      // Check if it has been modified
      if (getCookie(formFields[i].name) != formFields[i].value) {
        // If so, save the name of the field modified...
        changes += "- " + formFields[i].name.capitalize() + "\n";
        // ...and store the new value
        setCookie(formFields[i].name, formFields[i].value, 30);
      }
    }
    // Show the modified fields to the user
    alert("Fields modified:\n" + changes);
    // Load the new data
    loadCookiesData();
  }
