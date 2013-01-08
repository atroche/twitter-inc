// Generated from seed-templates/handlebars-module-template.js
YUI.add('squarespace-offer-popup-template', function(Y) {
  var Handlebars = Y.Handlebars;
  (function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['offer-popup.html'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;
function program1(depth0,data) {
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <div class=\"description-wrapper\">\n        <div class=\"description\">\n          <h1>";
  foundHelper = helpers.header;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.header; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n          <div class=\"desc-body\">";
  foundHelper = helpers.body;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </div>\n      </div>\n    ";
  return buffer;}
  buffer += "<div class=\"close\"></div>\n<div class=\"overlay-wrapper\">\n  <div class=\"body\">\n    <div class=\"logo-wrapper\">\n      <div class=\"logo\">";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    </div>\n    ";
  stack1 = depth0.description;
  stack1 = helpers['with'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <div class=\"footer\">\n    <div class=\"offer-wrapper\">\n      <div class=\"offer\">\n        <h2>10% Discount code</h2>\n        <div class=\"code\">";
  foundHelper = helpers.code;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.code; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n      </div>\n    </div>\n  </div>\n</div>\n";
  return buffer;});
})();
  var filename = 'offer-popup.html';
  Y.Handlebars.registerPartial(filename.replace('/', '.'), Handlebars.templates[filename]);
}, '1.0', {
  requires: [
    "handlebars-base"
  ]
});


YUI.add('squarespace-offer-popup', function(Y) {
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

  var OfferPopup = Y.namespace('Squarespace').OfferPopup = Y.Base.create('offerPopup', Y.Overlay, [], {
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
        this.get('contentBox').setContent(Y.Squarespace.UITemplates.getCompiledTemplate('offer-popup.html')(this.getAttrs()));
        var closeBtn = this.get('contentBox').one('.close');
        closeBtn.on('click', this.destroy, this);

        var snowboxBB = this._snowBox.get('boundingBox');
        snowboxBB.on('click', this.destroy, this);

        if (window.ESC_MANAGER) {
          var TALLink = this.get('contentBox').one('.desc-body a');
          TALLink.on('click', function() {
            window.location = 'http://www.thisamericanlife.org/';
          });
        }
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
      description: { },
      width: {
        value: 627
      },
      height: {
        value: 379
      },
      zIndex: {
        value: 100000
      }
    },
    CSS_PREFIX: 'sqs-offer-popup'
  });
}, '1.0', {
  requires: [
    'base',
    'base-build',
    'overlay',
    'widget-anim',
    'squarespace-ui-templates',
    'squarespace-offer-popup-template'
  ]
});
