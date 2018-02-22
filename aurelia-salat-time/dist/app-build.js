"bundle";!function(){var a=System.amdDefine;a("app.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="nav-bar.html"></require><require from="bootstrap/css/bootstrap.css"></require><nav-bar router.bind="router"></nav-bar><div class="page-host"><router-view></router-view></div></template>'})}(),System.register("app.js",[],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d;return{setters:[],execute:function(){a("App",d=function(){function a(){c(this,a)}return a.prototype.configureRouter=function(a,b){a.title="Aurelia",a.map([{route:["","praytime"],name:"praytime",moduleId:"praytime",nav:!0,title:"Prayer Time"}]),this.router=b},a}()),a("App",d)}}}),System.register("main.js",["bootstrap"],function(a,b){"use strict";function c(a){a.use.standardConfiguration().developmentLogging(),a.start().then(function(){return a.setRoot()})}return a("configure",c),{setters:[function(a){}],execute:function(){}}}),function(){var a=System.amdDefine;a("nav-bar.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template bindable="router"><nav class="navbar navbar-default navbar-fixed-top" role="navigation"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#skeleton-navigation-navbar-collapse"><span class="sr-only">Toggle Navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#"><i class="fa fa-home"></i> <span>${router.title}</span></a></div><div class="collapse navbar-collapse" id="skeleton-navigation-navbar-collapse"><ul class="nav navbar-nav"><li repeat.for="row of router.navigation" class="${row.isActive ? \'active\' : \'\'}"><a data-toggle="collapse" data-target="#skeleton-navigation-navbar-collapse.in" href.bind="row.href">${row.title}</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="loader" if.bind="router.isNavigating"><i class="fa fa-spinner fa-spin fa-2x"></i></li></ul></div></nav></template>'})}(),function(){var a=System.amdDefine;a("praytime.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><section class="au-animate"><h1>${today}</h1><div class="col-md-4 well" style="text-align:justify"><h4>Fajr: ${timings.Fajr}</h4><h4>Dhuhr: ${timings.Dhuhr}</h4><h4>Asr: ${timings.Asr}</h4><h4>Maghrib: ${timings.Maghrib}</h4><h4>Isha: ${timings.Isha}</h4></div><div class="col-md-6" style="text-align:right"><h3>${heading} ${location}</h3></div></section></template>'})}(),System.register("geo-service.js",[],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d;return{setters:[],execute:function(){a("geoService",d=function(){function a(){c(this,a)}return a.locate=function(){return new Promise(function(a,b){"geolocation"in navigator?navigator.geolocation.getCurrentPosition(a,b,{enableHighAccuracy:!0}):b(Error("Geolocation not available"))})},a}()),a("geoService",d)}}}),System.register("config/salatConfig.js",[],function(a,b){"use strict";var c;return{setters:[],execute:function(){c={},c.locationApiUrl="https://nominatim.openstreetmap.org/reverse?format=json&zoom=15&addressdetails=1",c.salatApiUrl="http://api.aladhan.com/v1/timings/",a("default",c)}}}),System.register("praytime.js",["aurelia-framework","aurelia-fetch-client","min-url","moment","./geo-service","./config/salatConfig"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e,f,g,h,i,j,k,l;return{setters:[function(a){d=a.inject},function(a){e=a.HttpClient},function(a){f=a.default},function(a){g=a.default},function(a){h=a.geoService},function(a){i=a.default}],execute:function(){a("praytime",(j=d(e),l=j(k=function(){function a(b){var d=this;c(this,a),this.heading="Prayer time for ",this.location="loading...",this.timings={},this.updateClock(),setInterval(function(){return d.updateClock()},1e3),b.configure(function(a){a.useStandardConfiguration().withDefaults({headers:{referer:"salat-time-test"}})}),this.client=b}return a.prototype.activate=function(){var a=this;return this.getCoordinates().then(function(b){console.log(a.composePrayTimeUrl(b)),a.client.fetch(a.composeLocationUrl(b)).then(function(a){return a.json()}).then(function(b){a.location=b.display_name}),a.client.fetch(a.composePrayTimeUrl(b)).then(function(a){return a.json()}).then(function(b){a.timings=b.data.timings})})},a.prototype.getCoordinates=function(){return h.locate().then(function(a){return a.coords},function(){return"no geo"})},a.prototype.updateClock=function(){this.today=g().format("lll")},a.prototype.composePrayTimeUrl=function(a){var b=g().format("X"),c=f.parse(i.salatApiUrl+b,!0);return c.query.latitude=a.latitude,c.query.longitude=a.longitude,f.format(c)},a.prototype.composeLocationUrl=function(a){var b=f.parse(i.locationApiUrl,!0);return b.query.lat=a.latitude,b.query.lon=a.longitude,f.format(b)},a}())||k)),a("praytime",l)}}});