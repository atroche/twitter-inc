// Generated from seed-templates/handlebars-module-template.js
YUI.add('squarespace-edu-offer-popup-template', function(Y) {
  var Handlebars = Y.Handlebars;
  (function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['edu-offer-popup.html'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;
  buffer += "<div class=\"close\"></div>\n<div class=\"overlay-wrapper\">\n  <div class=\"body\">\n    <div class=\"description-wrapper\">\n      <div class=\"description\">\n        <h1>";
  foundHelper = helpers.header;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.header; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n        <div class=\"desc-body\">";
  foundHelper = helpers.body;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <div class=\"desc-footer\">";
  foundHelper = helpers.footer;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.footer; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n      </div>\n    </div>\n  </div>\n</div>\n";
  return buffer;});
})();
  var filename = 'edu-offer-popup.html';
  Y.Handlebars.registerPartial(filename.replace('/', '.'), Handlebars.templates[filename]);
}, '1.0', {
  requires: [
    "handlebars-base",
  ]
});

YUI.add('squarespace-education-offer-popup', function(Y) {

  var Snowbox = Y.namespace('Squarespace').Snowbox = Y.Base.create('snowbox', Y.Overlay, [], {
    initializer: function() {
      this.plug(Y.Plugin.WidgetAnim);
      this.anim.get('animShow').setAttrs({
        'to.opacity': 0.85,
        duration: 0.3,
        easing: Y.Easing.easeOutStrong
      });
    }
  }, {
    ATTRS: {
      align: {
        value: {
          points: [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TL]
        }
      },
      width: {
        value: '100%'
      },
      height: {
        value: '100%'
      }
    },
    CSS_PREFIX: 'sqs-snowbox'
  });

  var OfferPopup = Y.namespace('Squarespace').EduOfferPopup = Y.Base.create('offerPopup', Y.Overlay, [], {
    initializer: function() {
      this._snowBox = new Y.Squarespace.Snowbox({ zIndex: this.get('zIndex') - 1, visible: false });
      this.plug(Y.Plugin.WidgetAnim);
      this.anim.get('animShow').setAttrs({
        duration: 0.3,
        easing: Y.Easing.easeOutStrong
      });
    },

    renderUI: function() {
      this._snowBox.render();

      this._snowBox.anim.get('animShow').onceAfter('end', function() {
        this.get('contentBox').setContent(Y.Squarespace.UITemplates.getCompiledTemplate('edu-offer-popup.html')(this.getAttrs()));
        var closeBtn = this.get('contentBox').one('.close');
        closeBtn.on('click', this.destroy, this);

        var snowboxBB = this._snowBox.get('boundingBox');
        snowboxBB.on('click', this.destroy, this);

        this.show();
      }, this);
      
      this._snowBox.show();
    },

    destructor: function() {
      this._snowBox.destroy();
    }
  }, {
    ATTRS: {
      visible: { value: false },
      title: { },
      code: { },
      header: { },
      body: { },
      footer: { },
      width: {
        value: 641
      },
      height: {
        value: 379
      },
      zIndex: {
        value: 100000
      }
    },
    CSS_PREFIX: 'sqs-edu-offer-popup'
  });
}, '1.0', {
  requires: [
    'base',
    'base-build',
    'overlay',
    'widget-anim',
    'squarespace-ui-templates',
    'squarespace-edu-offer-popup-template'
  ]
});

