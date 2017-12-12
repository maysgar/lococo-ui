$(document).ready(function() {
  $('.sidenav').sidenav();
  $('.modal').modal();
  checkCookies();
  $('.dropdown-trigger').dropdown();
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

function loadCookiesData() {
  $('#nav-desktop > li').hide();
  $('#nav-mobile > li').hide();

  $('#nav-desktop').append("<li><a class='btn transparent z-depth-0 dropdown-trigger' data-target='dropdown1'>" + getCookie('email') + '</a></li>');
  $('#nav-mobile').append("<li><div class='user-view'><span class='name'>" + "KELOOKKK" + "</span><span class='email'>" + getCookie('email') + "</span></div></li>");
  $('#nav-mobile').append("<li><a onclick='logout()' class='btn black'>Sign out</a></li>");
  $('.modal').modal('close');
}

function checkCookies() {
  if(getCookie('email') != "" && getCookie('password') != "") {
    loadCookiesData();
  }
}

function logout() {
  deleteAllCookies();
  $('#nav-desktop > li').show();
  $('.dropdown-trigger').hide();
}
