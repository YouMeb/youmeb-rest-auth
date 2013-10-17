Youmeb-Rest-Auth
============

A YouMebJS package. It will help you build rest-auth architeture easily.You can inject `$restAuth` to invoke this package in controller . 

[![Build Status](https://travis-ci.org/YouMeb/youmeb-rest-auth.png?branch=master)](https://travis-ci.org/YouMeb/youmeb-rest-auth)

##Usage

Install:

```bash
npm install youmeb-rest-auth
```

init API:
* get a nonce:

`/nonce`(method:get),you will get:

```javascript 
{
  "success": true,
  "data": {
    "nonce": "5fafe83c23b98d5f704684f8750720ea79481bf5",
    "key": "3VoCBsDXwtTH7cdMRjtHNy4L"
  }
}
```


* login Authentication

On a common REST-authentication architecture, we need clien browser build a Cnonce constant and crypo clien's `"password code"+snonce( nonce form server)+c_nonce` and send it back to your server.


If your server get this code and authenticate it, it will callback json.

(Pass authentication):
```javascript
{
	data: {
		loginSuccess: true
		token: "lB1bMFFCXSQfzGfszXWrAEaP"
	}
	success: true
}
```
(Failed)
```javascript
{
	data: {
		loginSuccess: false	
	}
	success: true
}
```


After getting a token:

If your server get users token, you can use `$restAuth.getUser` to decode user's id .  


###Reference:

About RESTful Authentication, We sugguest you to read follow paper:

* [Cryptographic nonce](http://en.wikipedia.org/wiki/Cryptographic_nonce)
* [Digest access authentication](http://en.wikipedia.org/wiki/Digest_access_authentication)
