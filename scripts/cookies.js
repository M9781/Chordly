//   ╔════════════════════════════════════════════════════╗
//   ║             Cookies management Module              ║
//   ╚════════════════════════════════════════════════════╝

// function returns a parsed cookie.
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(`${name}=`)) {
      const value = decodeURIComponent(cookie.substring(`${name}=`.length));
      return value.split("\n");
    }
  }
  return null;
}

//function returns an object of parsed cookies data
function getAllCookies() {
  const allCookies = {};
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    const name = cookie.substring(0, cookie.indexOf("="));
    let value = decodeURIComponent(cookie.substring(`${name}=`.length));
    if (value.includes(",")) {
      value = value.split(",");
    } else if (value == "true") {
      value = true;
    } else if (value == "false") {
      value = false;
    } else if (isNumeric(value)) {
      value = parseFloat(value);
    } else {
      value;
    }

    assign(allCookies, name, value);
  }
  return allCookies;
}

// function loads cookies data to the app object.
function loadCookies() {
  const allCookies = getAllCookies();
  for (const cookie in allCookies) {
    assign(app, cookie, allCookies[cookie]);
  }
}

// function loads default data to cookies and app object.
function loadDefaultCookies() {
  for (const cookie in app) {
    passCookie(cookie, app[cookie]);
  }
  // save data to the app object
  loadCookies();
}

//function updates a cookie (and the app object)
function updateCookie(cookie, value) {
  // save data to a cookie
  passCookie(cookie, value);
  // save data to the app object
  loadCookies();
}
// function saves data to cookie
function passCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}
// function adds/rewrites property value of an object (given its name as string)
function assign(obj, prop, value) {
  if (typeof prop === "string") prop = prop.split(".");

  if (prop.length > 1) {
    const e = prop.shift();
    assign(
      (obj[e] =
        Object.prototype.toString.call(obj[e]) === "[object Object]"
          ? obj[e]
          : {}),
      prop,
      value
    );
  } else obj[prop[0]] = value;
}

//check if a string consists of digits only
function isNumeric(value) {
  return /^-?\d+$/.test(value);
}
