/*
 * This is Squarespace 6
 * No doubt about it.
 *
 * Herman Miller Chair Not Included.
 * Shout out to Doug Jones. Gotta get that cache busted.
 */

/*
 * Krystyn's viewport code
 */
var iOS = false, p = navigator.platform;
if((p === 'iPad' || p === 'iPhone' || p === 'iPod') && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', function() {
    document.body.className += ' ios';
  });
}

/*
 * spin.min.js
 */
//fgnass.github.com/spin.js#v1.2.5
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);

/*
 * Julien's Array.shuffle()
 */
Array.prototype.shuffle = function() {
  var s = [];
  while (this.length) s.push(this.splice(Math.random() * this.length, 1));
  while (s.length) this.push(s.pop()[0]);
  return this;
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/*
 * Cookie Helpers
 * from http://www.quirksmode.org/js/cookies.html
 */
function createCookie(name,value,days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires="+date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

/*
 * Get Query Params
 */
var QUERY_PARAMS = {};
(function () {
  var e,
    a = /\+/g,  // Regex for replacing addition symbol with a space
    r = /([^&=]+)=?([^&]*)/g,
    d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
    q = window.location.search.substring(1);

  while (e = r.exec(q)) {
    QUERY_PARAMS[d(e[1])] = d(e[2]);
  }
})();

/*
 * Mustachify
 */
if (QUERY_PARAMS.mustachify && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', function() {
    var d = document.getElementsByTagName('img');
    for (var i = 0; i < d.length; i++) {
      d[i].src = 'http://mustachify.me/?src=' + d[i].src;
    }
  });
}

if (QUERY_PARAMS.vertical) {
  if (QUERY_PARAMS.vertical == 'blog' || QUERY_PARAMS.vertical == 'portfolio') {
    createCookie('defaultVertical', QUERY_PARAMS.vertical + 's');
  }
}

if (QUERY_PARAMS.dev) {
  createCookie('dev', true);
}

/*jshint supernew:true*/

var SQUARESPACE = (function() {

  // cleanup url for html5
  if (!Y.Router.html5) {
    window.location.hash = window.location.pathname;
  }

  // routers
  var router = new Y.Router();
  var ctx = this; // with love.

  // setting the title
  this.setTitle = function(title) {
    document.title = title.capitalize() + " - " + Static.SQUARESPACE_CONTEXT.website.siteTitle;
  };

  // caching
  this._cache = {};
  this.setCache = function(name, value) {
    this._cache[name] = value;
  };

  this.getCache = function(name) {
    return this._cache[name];
  };

  // getter
  this.getRouter = function() { return router; };

  // bind the router
  this._bindRouter = function(func) {
    return func;
  };

  // keep track of the initial page request
  var initialPageRequest = true;
  this.setInitialPageRequest = function(v) { initialPageRequest = v; };
  this.isInitialPageRequest = function(v) { return initialPageRequest; };

  // keep track of the current path
  this.currentPath = null;

  // default behavior
  this._getPage = function(url, func) {
    return function() {
      if (initialPageRequest) {
        console.log('initialPage', url);
        func.call(this);
        initialPageRequest = false;
        return;
      } else {
        console.log('getPage', url);
      }
      var cached = Y.one('#'+url);
      var self = this;

      if (cached) {
        func.call(self, cached._node.innerHTML);
      } else {
        function cacheResult(data) {
          var cacheNode = Y.Node.create('<script type="text/x-json-template" id="'+url+'"></script>');
          cacheNode._node.innerHTML = data;
          func.call(self, data);
        }

        console.log('fetching', url);

        Y.Data.get({
          url: url,
          data: {
            format: 'main-content'
          },
          responseFormat: 'raw',
          success: cacheResult
        });
      }
    };
  };

  this.getPageAndRender = function(params) {
    params = Y.merge({
      selector: '#mainContent .main-content-wrapper',
      navEl: Y.all('.site-navigation a[href*="' + params.url + '"]')
    }, params);

    return function(req) {
      if (ctx.currentPath && ctx.currentPath.replace(/\//g, "") == req.path.replace(/\//g, "")) {
        if (!req.query.q && SF && ctx.currentPath.indexOf('templates') != 0) {
          SF.setValue("");
        }

        return;
      }

      // store the current path
      ctx.currentPath = req.path;

      // handle the destruction of the old page
      if (ctx.currentParams && ctx.currentParams.destructor) {
        ctx.currentParams.destructor.call(ctx.currentParams.context || ctx, req, ctx.currentGismo, params);
      }
      ctx.currentParams = params;

      // handle the current gismo
      if (ctx.currentGismo) {
        ctx.currentGismo._anims.each(function(anim) {
          anim.set('node', document.createElement('div'));
          anim.stop(true);
          anim.destroy();
          // console.log('destroying this dude', anim, anim.get('node')._node);
        });
        ctx.currentGismo.destroyed = true;
        ctx.currentGismo.destructor();
        // delete ctx.currentGismo;
      }
      ctx.currentGismo = new Y.Squarespace.GismoBase();

      var currentActiveLinkEl = Y.all('.site-navigation .active-link');
      if (currentActiveLinkEl) { currentActiveLinkEl.removeClass('active-link'); }

      if (params.navEl) { params.navEl.addClass('active-link'); }

      var url = params.url;

      for (var name in req.params) {
        url = url.replace('*' + name, req.params[name]);
      }

      ctx._getPage(url, function(data) {
        if (!initialPageRequest) {

          Y.one(params.selector).empty(true);

          if (params.contentPreProcessor) {
            data = params.contentPreProcessor(data);
          }

          Y.one(params.selector).setContent(data);
          
          ctx.removeClass(Y.one('body'), 'collection-type-');
          Y.one('body').addClass('collection-type-' + params.type);

          Y.one(Y.config.win).set('scrollTop', 0);

          if (params.title) {
            ctx.setTitle(params.title);
          }

          if (window.pSUPERFLY) {
            pSUPERFLY.virtualPage(url, document.title);
          }

          if (window._gaq) {
            _gaq.push(['_trackPageview', url]);
          }
        }

        // now, some standard every page logic
        if (Y.one('body').hasClass('collection-layout-collection-header')) {
          var headerImgEl = Y.one('.main-banner .main-image img');
          if (headerImgEl) {
            headerImgEl.plug(Y.Squarespace.Loader2);
          }
        }

        if (params.callback) { params.callback.call(params.context || ctx, req, ctx.currentGismo); }
      })();
    };
  };

  // node helpers
  this.removeClass = function(el, root) {
    var classNames = el.get('className').split(' ');
    for (var i = 0; i < classNames.length; i++) {
      if (classNames[i].indexOf(root) !== -1) {
        el.removeClass(classNames[i]);
      }
    }
  };

  // header helpers
  this.goFullWidth = function(gismo) {

    var anim = gismo._anim(Y.one('header'), {
      width: document.body.offsetWidth - 160
    }, {
      duration: 1.2
    });
    anim.on('end', function() {
      gismo._event(Y.one(Y.config.win).on('resize', function() {
        Y.one('header').setStyles({
          width: document.body.offsetWidth - 160
        });
      }));
    });
    anim.run();

  };

  this.goFixedWidth = function() {
    var anim = Y.one('header').anim({
      width: 960
    }, {
      duration: 1.2
    });
    anim.run();
  };

	if (Y.UA.ie) {
  	Y.one('body').addClass('ie-' + Y.UA.ie);
  }

  // straight up from yui3
  Y.one('body').delegate('click', function (e) {
    // native behavior with IE
    if (Y.UA.ie) {
      return;
    }

    // Allow the native behavior on middle/right-click, or when Ctrl or Command
    // are pressed.
    if (e.button !== 1 || e.ctrlKey || e.metaKey) {
      return;
    }

    if (e.currentTarget.get('target') == '_blank') {
      return;
    }

    // Remove the non-path portion of the URL, and any portion of the path that
    // isn't relative to this router's root path.
    var path = router.removeRoot(e.currentTarget.get('href'));

    // If the router has a route that matches this path, then use the
    // router to update the URL and handle the route. Otherwise, let the
    // browser handle the click normally.
    if (router.hasRoute(path) && !SQUARESPACE.isInitialPageRequest()) {
      e.preventDefault();
      router.save(path);
    }
  }, 'a', this);

  // bind login button
  Y.all('a[data-action="login"]').each(function(el) {
    el.on('click', function(e) {
      e.halt();
      // SQUARESPACE_LOGIN.params.externalSwitcher = true;
      // SQUARESPACE_LOGIN.params.allowSocialLogins = false;
      SQUARESPACE_LOGIN.iFrameLoginShow();
    });
  });

  // and tracking
  Y.Squarespace.Analytics.trackInternal("frontsite_view");
  if (Y.Squarespace.Marketing.trackLanding) {
    Y.Squarespace.Marketing.trackLanding();
  }

});

/*jshint supernew:false*/

Y.use( 'router', 'squarespace-signup', 'squarespace-education-offer-popup', 'squarespace-offer-popup', 'squarespace-util', 'squarespace-ui-lang', 'squarespace-brickr', 'squarespace-sitefilter', 'squarespace-abtest',
  function(Y) {

  var oldDefaultSetter = Y.Anim.DEFAULT_SETTER;

  Y.Anim.DEFAULT_SETTER = function(anim, att, from, to, elapsed, duration, fn, unit) {
    if (!anim._node._node) {
      return;
    } else {
      oldDefaultSetter.call(this, anim, att, from, to, elapsed, duration, fn, unit);
    }
  };

  SF = new Y.Squarespace.SiteFilter();
  SF.load();

  // display the tour image.
  function displayHeroImage() {
    var heroEl = Y.one('#hero');
    if (!heroEl) { return; } // 301/404

    var heroImageEl = heroEl.one('.hero-image');
    heroImageEl.setStyles({
      backgroundImage: "url('" +  SF.getImage(entry.heroImageId, 1000) + "')",
      opacity: 0
    });

    heroImageEl.anim({
      opacity: 1
    }, {
      duration: 3
    }).run();

    var customCardLinkEl = heroEl.one('.customer-card a');
    customCardLinkEl.setContent('<h2>' + entry.authorName + '</h2>' + entry.description + '<p class="customer-info">Squarespace Customer</p>');
    customCardLinkEl.setAttribute('href', entry.websiteUrl);
  }

  function attachCustomLightbox() {
    Y.all('[data-custom-lightbox]').each(function(trigger) {
      var content = trigger.getAttribute('data-custom-lightbox');

      // Make sure autoplay is set to true
      content = content.replace(/(src)=["']([^"']*)["']/gi, function(match, name, value) {
        if (value.indexOf('autoplay') === -1) {
          value += '&autoplay=true';
        }
        return "src='" + value + "'";
      });

      trigger.on('click', function (e) {
        var lightbox = Y.Node.create('<div></div>');
        lightbox.addClass('custom-lightbox');
        lightbox.set('innerHTML', content);

        var closeButton = Y.Node.create('<div></div>');
        closeButton.addClass('custom-lightbox-close');

        closeButton.appendTo(lightbox);
        lightbox.appendTo(Y.one('body'));
        lightbox.addClass('custom-lightbox-show');

        lightbox.on('click', function (e) {
          this.remove();
        });
      });
    });
  }

  // promote the first video to a hero video
  function promoteVideoBlock() {
    if (Y.one('.collection-layout-site-secondary-video')) {
      var video = Y.one('.wrapper .sqs-layout .row:first-child .video-block');
      var heroHolder = Y.one('.hero-video');

      if (video && heroHolder) {

        // Create a fake video block
        var videoBlock = Y.Node.create('<div></div>');
        videoBlock.addClass('video-block');
        videoBlock.addClass('content-fill');

        var videoOverlay = Y.Node.create('<img/>');
        videoOverlay.setAttribute('data-image', video.one('img[data-image]').getAttribute('data-image'));

        var playButton = Y.Node.create('<div></div>');
        playButton.addClass('sqs-video-icon');

        // Append
        videoOverlay.appendTo(videoBlock);
        playButton.appendTo(videoBlock);
        videoBlock.appendTo(heroHolder);

        // Load Image
        new Y.Squarespace.Loader({
          img: videoBlock.one('img[data-image]')
        });

        // Prepare custom lightbox
        heroHolder.setAttribute('data-custom-lightbox', video.one('.sqs-video-wrapper').getAttribute('data-html'));
      }
    }
  }

  var entry = SF.getFeaturedCustomers()[0];
  var img = new Image();
  img.src = SF.getImage(entry.heroImageId, 1000);

  Y.on('domready', function() {

    // Y.Squarespace.Marketing.doubleClickEvent('runofsite');

    SQUARESPACE_LOGIN.iFrameLoginLoad()

    window.SQUARESPACE = new SQUARESPACE();

    promoteVideoBlock();
    attachCustomLightbox();

    if (Y.one('body').hasClass('collection-type-page')) {
      return;
    }

    // register pages
    // SQUARESPACE.getRouter().route(/^\/pricing\/?$/, SQUARESPACE.getPageAndRender({
    //   url: '/pricing/',
    //   type: 'pricing',
    //   title: 'Pricing',
    //   callback: function() {
    //     Y.Squarespace.Lang.bindPricingPlanTooltips();
    //   }
    // }));

    SQUARESPACE.getRouter().route(/^\/beta-faq\/?$/, SQUARESPACE.getPageAndRender({
      url: '/beta-faq/',
      type: 'page',
      title: 'FAQ'
    }));

    SQUARESPACE.getRouter().route(/^\/about\/?$/, SQUARESPACE.getPageAndRender({
      url: '/about/',
      type: 'about',
      title: 'About'
    }));

    SQUARESPACE.getRouter().route(/(?:^\/$)|(?:^\/tour\/?$)/, SQUARESPACE.getPageAndRender({
      url: '/tour/',
      type: 'tour',
      title: 'Build a Website',
      navEl: Y.all('nav ul li a[href="/"]'),
      callback: function(req, gismo) {

        var heroEl = Y.one('#hero');
        if (!heroEl) { return; } // 301/404

        displayHeroImage();

        if (QUERY_PARAMS.source == "american") {
          var popup = new Y.Squarespace.OfferPopup({
            code: "AMERICAN10",
            description: {
              header: "Welcome to Squarespace",
              body: 'Bring your stories to life online with Squarespace, the easiest way to create an exceptional website, blog, or portfolio. We\'ve teamed up with <a href="http://www.thisamericanlife.org/">This American Life</a> to bring you a special offer - try us free for 14 days and receive 10% off your first purchase.'
            }
          });

          popup.render();
        } else if (QUERY_PARAMS.schoolname) {
          var schoolName = QUERY_PARAMS.schoolname;
          if (schoolName) {
            var popup = new Y.Squarespace.EduOfferPopup({
              header: schoolName + " Discount",
              body: 'As part of a special relationship with ' + schoolName + ', we are pleased to offer you <strong>50% off</strong> your first year of Squarespace service.',
              footer: "You must sign up with your school email to qualify for this discount."
            });
            popup.render();
          }
        }

        // load all them images
        Y.all('#tour img[data-src]').each(function(img) {
          img.setAttribute('data-image', img.getAttribute('data-src'));
          img.plug(Y.Squarespace.Loader2);
        });

        Y.Squarespace.Marketing.doubleClickEvent('homepage');
          
        if (!Y.UA.ie) {
          var videostarterEvt = Y.one(window).on('scroll', function(e) {
            var pageBuilderVideoEl = Y.one('.page-builder .video');
            if (Y.one('body').get('docScrollY') + Y.one('body').get('winHeight') > pageBuilderVideoEl.get('region').top) {
              // var placeholder = Y.one('.page-builder .video img');
              var videoContainer = pageBuilderVideoEl;
              videoContainer.append('<iframe src="http://player.vimeo.com/video/45145639?title=0&amp;byline=0&amp;portrait=0&amp;color=595959&amp;autoplay=1" style="position:absolute;top:0;left:0;right:0;bottom:0;width:960px;height:540px;" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
              // placeholder.remove();
              videostarterEvt.detach();
            }
          }, this);

          gismo._event(videostarterEvt);
        }

        // setup the top gallery
        var blogsEl = Y.one('article.blogs');
        var gallery = new Y.Squarespace.Gallery2({
          container: blogsEl.one('.viewport'),
          elements: {
            previous: blogsEl.one('.previous'),
            next: blogsEl.one('.next')
          },
          loop: true,
          autoplay: true,
          design: 'stacked',
          designOptions: {
              speed: 1
          }
        });
        gallery.after('currentIndexChange', function(e) {
            Y.one('article.blogs .caption').setContent(this.get('slides').item(this.get('currentIndex')).getAttribute('alt'));
        });

        // bind the watch-demo.
        Y.one('.watch-demo').on('click', function(e) {
          Y.Squarespace.Analytics.trackInternal("frontsite_landing_video_view");

          var lightbox = new Y.Squarespace.Lightbox2({
            content: Y.Node.create('<iframe src="http://player.vimeo.com/video/45734056?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen style="width:100%;height:100%;"></iframe>')
          });
          lightbox.render();
          e.halt();
        });

        var templateEl = Y.one('#tour .templates');
        var insideEl = templateEl.one('.inside');

        insideEl.plug(Y.Squarespace.Animations.Scalable);
        insideEl.hide(true);

        insideEl.one('img').once('load', function() {
          if (monitorGallery) { monitorGallery.set('autoplay', true); }
          insideEl.show();
        });

        var monitorGallery = new Y.Squarespace.Gallery2({
          container: insideEl,
          elements: {
            previous: templateEl.one('.previous'),
            next: templateEl.one('.next')
          },
          loop: true,
          design: 'stacked',
          designOptions: {
            speed: 1,
            autoHeight: false
          }
        });

        templateEl.one('.main.monitor').on('click', function() {
          monitorGallery.nextSlide();
        });

        // instantiate the mobile stuff
        var mainMobileGallery;
        Y.all('.mobile-apps .slideshow').each(function(slideshowEl) {
          var insideEl = slideshowEl.one('.inside');

          var gallery = new Y.Squarespace.Gallery2({
            container: insideEl,
            loop: true,
            design: 'stacked',
            designOptions: {
              speed: 1,
              autoHeight: false
            }
          });

          if (!mainMobileGallery) {
            mainMobileGallery = gallery;
            mainMobileGallery.set('autoplay', true);
          } else {
            mainMobileGallery.addChild(gallery);
          }

          slideshowEl.on('click', function(e) {
            e.halt();
            gallery.nextSlide();
          });

        });

      }
    }));

    // ------------------- TEMPLATES ROUTE -------------------
    SQUARESPACE.getRouter().route(/^(?:\/templates\/?(.*)\/?)|(?:\/portfolios\/?)|(?:\/blogs\/?)|(?:\/websites\/?)$/, (function() {

      return SQUARESPACE.getPageAndRender({
        url: '/templates/',
        navEl: Y.all('ul.site-navigation li a[href*="/templates"]'),
        type: 'template-categories',
        title: 'Pick a Template',
        destructor: function(req, gismo, params) {
          SQUARESPACE.goFixedWidth();
        },
        callback: function(req, gismo) {
        
	        if (Y.UA.ie) {
	        	// Y.one('#templates').prepend('<div class="browser-message"><h1 align="center">Browser Requirements</h1><p>Signing up might require a browser upgrade.</p></div>');
	        }

          gismo._event(Y.one('.template-categories-collection').on('click', function(e) {
            if (SF.lastQuery != "") {
              SF.lastQuery = "";
              SF.clear();
              e.halt();
            }
          }));

          // Map from regexp to route-like params
          req.params = {category: req.params[1]};

          SQUARESPACE.goFullWidth(gismo);

          SF.render();

          Y.one('#sitefilter').removeClass('loading');
          
        }
      });

    })());

    // standard routing
    SQUARESPACE.getRouter().dispatch();

    // Ensure the initialPageRequest var is false in the event the initial page
    // is NOT one of the routed pages.
    // SQUARESPACE.setInitialPageRequest(true);
  });

});
