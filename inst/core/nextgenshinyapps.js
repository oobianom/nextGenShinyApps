document.addEventListener("DOMContentLoaded", () => {
//console.log = function () {};
var classHolder = document.getElementsByTagName("BODY")[0],
  /**
   * Load from localstorage
   **/
  themeSettings = (localStorage.getItem('themeSettings')) ? JSON.parse(localStorage.getItem('themeSettings')) :
    {},
  themeURL = themeSettings.themeURL || '',
  themeOptions = themeSettings.themeOptions || '';
/**
 * Load theme options
 **/
if (themeSettings.themeOptions) {
  classHolder.className = themeSettings.themeOptions;
} else {
}
if (themeSettings.themeURL && !document.getElementById('mytheme')) {
  var cssfile = document.createElement('link');
  cssfile.id = 'mytheme';
  cssfile.rel = 'stylesheet';
  cssfile.href = themeURL;
  document.getElementsByTagName('head')[0].appendChild(cssfile);

} else if (themeSettings.themeURL && document.getElementById('mytheme')) {
  document.getElementById('mytheme').href = themeSettings.themeURL;
}
/**
 * Save to localstorage
 **/
var saveSettings = function () {
  themeSettings.themeOptions = String(classHolder.className).split(/[^\w-]+/).filter(function (item) {
    return /^(nav|header|footer|mod|display)-/i.test(item);
  }).join(' ');
  if (document.getElementById('mytheme')) {
    themeSettings.themeURL = document.getElementById('mytheme').getAttribute("href");
  }
  ;
  localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
}
/**
 * Reset settings
 **/
var resetSettings = function () {
  localStorage.setItem("themeSettings", "");
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//sleep(500).then(() => {


  /*! jQuery UI - v1.11.4 - 2016-03-02
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, draggable.js, droppable.js, sortable.js, effect.js, effect-slide.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

  (function (factory) {
    if (typeof define === "function" && define.amd) {

      // AMD. Register as an anonymous module.
      define(["jquery"], factory);
    } else {

      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    /*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */


// $.ui might exist from components with no dependencies, e.g., $.ui.position
    $.ui = $.ui || {};

    $.extend($.ui, {
      version: "1.11.4",

      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      }
    });

// plugins
    $.fn.extend({
      scrollParent: function (includeHidden) {
        var position = this.css("position"),
          excludeStaticParent = position === "absolute",
          overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          scrollParent = this.parents().filter(function () {
            var parent = $(this);
            if (excludeStaticParent && parent.css("position") === "static") {
              return false;
            }
            return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
          }).eq(0);

        return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
      },

      uniqueId: (function () {
        var uuid = 0;

        return function () {
          return this.each(function () {
            if (!this.id) {
              this.id = "ui-id-" + (++uuid);
            }
          });
        };
      })(),

      removeUniqueId: function () {
        return this.each(function () {
          if (/^ui-id-\d+$/.test(this.id)) {
            $(this).removeAttr("id");
          }
        });
      }
    });

// selectors
    function focusable(element, isTabIndexNotNaN) {
      var map, mapName, img,
        nodeName = element.nodeName.toLowerCase();
      if ("area" === nodeName) {
        map = element.parentNode;
        mapName = map.name;
        if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
          return false;
        }
        img = $("img[usemap='#" + mapName + "']")[0];
        return !!img && visible(img);
      }
      return (/^(input|select|textarea|button|object)$/.test(nodeName) ?
        !element.disabled :
        "a" === nodeName ?
          element.href || isTabIndexNotNaN :
          isTabIndexNotNaN) &&
        // the element and all of its ancestors must be visible
        visible(element);
    }

    function visible(element) {
      return $.expr.filters.visible(element) &&
        !$(element).parents().addBack().filter(function () {
          return $.css(this, "visibility") === "hidden";
        }).length;
    }

    $.extend($.expr[":"], {
      data: $.expr.createPseudo ?
        $.expr.createPseudo(function (dataName) {
          return function (elem) {
            return !!$.data(elem, dataName);
          };
        }) :
        // support: jQuery <1.8
        function (elem, i, match) {
          return !!$.data(elem, match[3]);
        },

      focusable: function (element) {
        return focusable(element, !isNaN($.attr(element, "tabindex")));
      },

      tabbable: function (element) {
        var tabIndex = $.attr(element, "tabindex"),
          isTabIndexNaN = isNaN(tabIndex);
        return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
      }
    });

// support: jQuery <1.8
    if (!$("<a>").outerWidth(1).jquery) {
      $.each(["Width", "Height"], function (i, name) {
        var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
          type = name.toLowerCase(),
          orig = {
            innerWidth: $.fn.innerWidth,
            innerHeight: $.fn.innerHeight,
            outerWidth: $.fn.outerWidth,
            outerHeight: $.fn.outerHeight
          };

        function reduce(elem, size, border, margin) {
          $.each(side, function () {
            size -= parseFloat($.css(elem, "padding" + this)) || 0;
            if (border) {
              size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
            }
            if (margin) {
              size -= parseFloat($.css(elem, "margin" + this)) || 0;
            }
          });
          return size;
        }

        $.fn["inner" + name] = function (size) {
          if (size === undefined) {
            return orig["inner" + name].call(this);
          }

          return this.each(function () {
            $(this).css(type, reduce(this, size) + "px");
          });
        };

        $.fn["outer" + name] = function (size, margin) {
          if (typeof size !== "number") {
            return orig["outer" + name].call(this, size);
          }

          return this.each(function () {
            $(this).css(type, reduce(this, size, true, margin) + "px");
          });
        };
      });
    }

// support: jQuery <1.8
    if (!$.fn.addBack) {
      $.fn.addBack = function (selector) {
        return this.add(selector == null ?
          this.prevObject : this.prevObject.filter(selector)
        );
      };
    }

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
    if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
      $.fn.removeData = (function (removeData) {
        return function (key) {
          if (arguments.length) {
            return removeData.call(this, $.camelCase(key));
          } else {
            return removeData.call(this);
          }
        };
      })($.fn.removeData);
    }

// deprecated
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());

    $.fn.extend({
      focus: (function (orig) {
        return function (delay, fn) {
          return typeof delay === "number" ?
            this.each(function () {
              var elem = this;
              setTimeout(function () {
                $(elem).focus();
                if (fn) {
                  fn.call(elem);
                }
              }, delay);
            }) :
            orig.apply(this, arguments);
        };
      })($.fn.focus),

      disableSelection: (function () {
        var eventType = "onselectstart" in document.createElement("div") ?
          "selectstart" :
          "mousedown";

        return function () {
          return this.bind(eventType + ".ui-disableSelection", function (event) {
            event.preventDefault();
          });
        };
      })(),

      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },

      zIndex: function (zIndex) {
        if (zIndex !== undefined) {
          return this.css("zIndex", zIndex);
        }

        if (this.length) {
          var elem = $(this[0]), position, value;
          while (elem.length && elem[0] !== document) {
            // Ignore z-index if position is set to a value where z-index is ignored by the browser
            // This makes behavior of this function consistent across browsers
            // WebKit always returns auto if the element is positioned
            position = elem.css("position");
            if (position === "absolute" || position === "relative" || position === "fixed") {
              // IE returns 0 when zIndex is not specified
              // other browsers return a string
              // we ignore the case of nested elements with an explicit value of 0
              // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
              value = parseInt(elem.css("zIndex"), 10);
              if (!isNaN(value) && value !== 0) {
                return value;
              }
            }
            elem = elem.parent();
          }
        }

        return 0;
      }
    });

// $.ui.plugin is deprecated. Use $.widget() extensions instead.
    $.ui.plugin = {
      add: function (module, option, set) {
        var i,
          proto = $.ui[module].prototype;
        for (i in set) {
          proto.plugins[i] = proto.plugins[i] || [];
          proto.plugins[i].push([option, set[i]]);
        }
      },
      call: function (instance, name, args, allowDisconnected) {
        var i,
          set = instance.plugins[name];

        if (!set) {
          return;
        }

        if (!allowDisconnected && (!instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11)) {
          return;
        }

        for (i = 0; i < set.length; i++) {
          if (instance.options[set[i][0]]) {
            set[i][1].apply(instance.element, args);
          }
        }
      }
    };


    /*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


    var widget_uuid = 0,
      widget_slice = Array.prototype.slice;

    $.cleanData = (function (orig) {
      return function (elems) {
        var events, elem, i;
        for (i = 0; (elem = elems[i]) != null; i++) {
          try {

            // Only trigger remove when necessary to save time
            events = $._data(elem, "events");
            if (events && events.remove) {
              $(elem).triggerHandler("remove");
            }

            // http://bugs.jquery.com/ticket/8235
          } catch (e) {
          }
        }
        orig(elems);
      };
    })($.cleanData);

    $.widget = function (name, base, prototype) {
      var fullName, existingConstructor, constructor, basePrototype,
        // proxiedPrototype allows the provided prototype to remain unmodified
        // so that it can be used as a mixin for multiple widgets (#8876)
        proxiedPrototype = {},
        namespace = name.split(".")[0];

      name = name.split(".")[1];
      fullName = namespace + "-" + name;

      if (!prototype) {
        prototype = base;
        base = $.Widget;
      }

      // create selector for plugin
      $.expr[":"][fullName.toLowerCase()] = function (elem) {
        return !!$.data(elem, fullName);
      };

      $[namespace] = $[namespace] || {};
      existingConstructor = $[namespace][name];
      constructor = $[namespace][name] = function (options, element) {
        // allow instantiation without "new" keyword
        if (!this._createWidget) {
          return new constructor(options, element);
        }

        // allow instantiation without initializing for simple inheritance
        // must use "new" keyword (the code above always passes args)
        if (arguments.length) {
          this._createWidget(options, element);
        }
      };
      // extend with the existing constructor to carry over any static properties
      $.extend(constructor, existingConstructor, {
        version: prototype.version,
        // copy the object used to create the prototype in case we need to
        // redefine the widget later
        _proto: $.extend({}, prototype),
        // track widgets that inherit from this widget in case this widget is
        // redefined after a widget inherits from it
        _childConstructors: []
      });

      basePrototype = new base();
      // we need to make the options hash a property directly on the new instance
      // otherwise we'll modify the options hash on the prototype that we're
      // inheriting from
      basePrototype.options = $.widget.extend({}, basePrototype.options);
      $.each(prototype, function (prop, value) {
        if (!$.isFunction(value)) {
          proxiedPrototype[prop] = value;
          return;
        }
        proxiedPrototype[prop] = (function () {
          var _super = function () {
              return base.prototype[prop].apply(this, arguments);
            },
            _superApply = function (args) {
              return base.prototype[prop].apply(this, args);
            };
          return function () {
            var __super = this._super,
              __superApply = this._superApply,
              returnValue;

            this._super = _super;
            this._superApply = _superApply;

            returnValue = value.apply(this, arguments);

            this._super = __super;
            this._superApply = __superApply;

            return returnValue;
          };
        })();
      });
      constructor.prototype = $.widget.extend(basePrototype, {
        // TODO: remove support for widgetEventPrefix
        // always use the name + a colon as the prefix, e.g., draggable:start
        // don't prefix for widgets that aren't DOM-based
        widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
      }, proxiedPrototype, {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName
      });

      // If this widget is being redefined then we need to find all widgets that
      // are inheriting from it and redefine all of them so that they inherit from
      // the new version of this widget. We're essentially trying to replace one
      // level in the prototype chain.
      if (existingConstructor) {
        $.each(existingConstructor._childConstructors, function (i, child) {
          var childPrototype = child.prototype;

          // redefine the child widget using the same prototype that was
          // originally used, but inherit from the new version of the base
          $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
        });
        // remove the list of existing child constructors from the old constructor
        // so the old child constructors can be garbage collected
        delete existingConstructor._childConstructors;
      } else {
        base._childConstructors.push(constructor);
      }

      $.widget.bridge(name, constructor);

      return constructor;
    };

    $.widget.extend = function (target) {
      var input = widget_slice.call(arguments, 1),
        inputIndex = 0,
        inputLength = input.length,
        key,
        value;
      for (; inputIndex < inputLength; inputIndex++) {
        for (key in input[inputIndex]) {
          value = input[inputIndex][key];
          if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
            // Clone objects
            if ($.isPlainObject(value)) {
              target[key] = $.isPlainObject(target[key]) ?
                $.widget.extend({}, target[key], value) :
                // Don't extend strings, arrays, etc. with objects
                $.widget.extend({}, value);
              // Copy everything else by reference
            } else {
              target[key] = value;
            }
          }
        }
      }
      return target;
    };

    $.widget.bridge = function (name, object) {
      var fullName = object.prototype.widgetFullName || name;
      $.fn[name] = function (options) {
        var isMethodCall = typeof options === "string",
          args = widget_slice.call(arguments, 1),
          returnValue = this;

        if (isMethodCall) {
          this.each(function () {
            var methodValue,
              instance = $.data(this, fullName);
            if (options === "instance") {
              returnValue = instance;
              return false;
            }
            if (!instance) {
              return $.error("cannot call methods on " + name + " prior to initialization; " +
                "attempted to call method '" + options + "'");
            }
            if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
              return $.error("no such method '" + options + "' for " + name + " widget instance");
            }
            methodValue = instance[options].apply(instance, args);
            if (methodValue !== instance && methodValue !== undefined) {
              returnValue = methodValue && methodValue.jquery ?
                returnValue.pushStack(methodValue.get()) :
                methodValue;
              return false;
            }
          });
        } else {

          // Allow multiple hashes to be passed on init
          if (args.length) {
            options = $.widget.extend.apply(null, [options].concat(args));
          }

          this.each(function () {
            var instance = $.data(this, fullName);
            if (instance) {
              instance.option(options || {});
              if (instance._init) {
                instance._init();
              }
            } else {
              $.data(this, fullName, new object(options, this));
            }
          });
        }

        return returnValue;
      };
    };

    $.Widget = function ( /* options, element */) {
    };
    $.Widget._childConstructors = [];

    $.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: {
        disabled: false,

        // callbacks
        create: null
      },
      _createWidget: function (options, element) {
        element = $(element || this.defaultElement || this)[0];
        this.element = $(element);
        this.uuid = widget_uuid++;
        this.eventNamespace = "." + this.widgetName + this.uuid;

        this.bindings = $();
        this.hoverable = $();
        this.focusable = $();

        if (element !== this) {
          $.data(element, this.widgetFullName, this);
          this._on(true, this.element, {
            remove: function (event) {
              if (event.target === element) {
                this.destroy();
              }
            }
          });
          this.document = $(element.style ?
            // element within the document
            element.ownerDocument :
            // element is window or document
            element.document || element);
          this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
        }

        this.options = $.widget.extend({},
          this.options,
          this._getCreateOptions(),
          options);

        this._create();
        this._trigger("create", null, this._getCreateEventData());
        this._init();
      },
      _getCreateOptions: $.noop,
      _getCreateEventData: $.noop,
      _create: $.noop,
      _init: $.noop,

      destroy: function () {
        this._destroy();
        // we can probably remove the unbind calls in 2.0
        // all event bindings should go through this._on()
        this.element
          .unbind(this.eventNamespace)
          .removeData(this.widgetFullName)
          // support: jquery <1.6.3
          // http://bugs.jquery.com/ticket/9413
          .removeData($.camelCase(this.widgetFullName));
        this.widget()
          .unbind(this.eventNamespace)
          .removeAttr("aria-disabled")
          .removeClass(
            this.widgetFullName + "-disabled " +
            "ui-state-disabled");

        // clean up events and states
        this.bindings.unbind(this.eventNamespace);
        this.hoverable.removeClass("ui-state-hover");
        this.focusable.removeClass("ui-state-focus");
      },
      _destroy: $.noop,

      widget: function () {
        return this.element;
      },

      option: function (key, value) {
        var options = key,
          parts,
          curOption,
          i;

        if (arguments.length === 0) {
          // don't return a reference to the internal hash
          return $.widget.extend({}, this.options);
        }

        if (typeof key === "string") {
          // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
          options = {};
          parts = key.split(".");
          key = parts.shift();
          if (parts.length) {
            curOption = options[key] = $.widget.extend({}, this.options[key]);
            for (i = 0; i < parts.length - 1; i++) {
              curOption[parts[i]] = curOption[parts[i]] || {};
              curOption = curOption[parts[i]];
            }
            key = parts.pop();
            if (arguments.length === 1) {
              return curOption[key] === undefined ? null : curOption[key];
            }
            curOption[key] = value;
          } else {
            if (arguments.length === 1) {
              return this.options[key] === undefined ? null : this.options[key];
            }
            options[key] = value;
          }
        }

        this._setOptions(options);

        return this;
      },
      _setOptions: function (options) {
        var key;

        for (key in options) {
          this._setOption(key, options[key]);
        }

        return this;
      },
      _setOption: function (key, value) {
        this.options[key] = value;

        if (key === "disabled") {
          this.widget()
            .toggleClass(this.widgetFullName + "-disabled", !!value);

          // If the widget is becoming disabled, then nothing is interactive
          if (value) {
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
          }
        }

        return this;
      },

      enable: function () {
        return this._setOptions({disabled: false});
      },
      disable: function () {
        return this._setOptions({disabled: true});
      },

      _on: function (suppressDisabledCheck, element, handlers) {
        var delegateElement,
          instance = this;

        // no suppressDisabledCheck flag, shuffle arguments
        if (typeof suppressDisabledCheck !== "boolean") {
          handlers = element;
          element = suppressDisabledCheck;
          suppressDisabledCheck = false;
        }

        // no element argument, shuffle and use this.element
        if (!handlers) {
          handlers = element;
          element = this.element;
          delegateElement = this.widget();
        } else {
          element = delegateElement = $(element);
          this.bindings = this.bindings.add(element);
        }

        $.each(handlers, function (event, handler) {
          function handlerProxy() {
            // allow widgets to customize the disabled handling
            // - disabled as an array instead of boolean
            // - disabled class as method for disabling individual parts
            if (!suppressDisabledCheck &&
              (instance.options.disabled === true ||
                $(this).hasClass("ui-state-disabled"))) {
              return;
            }
            return (typeof handler === "string" ? instance[handler] : handler)
              .apply(instance, arguments);
          }

          // copy the guid so direct unbinding works
          if (typeof handler !== "string") {
            handlerProxy.guid = handler.guid =
              handler.guid || handlerProxy.guid || $.guid++;
          }

          var match = event.match(/^([\w:-]*)\s*(.*)$/),
            eventName = match[1] + instance.eventNamespace,
            selector = match[2];
          if (selector) {
            delegateElement.delegate(selector, eventName, handlerProxy);
          } else {
            element.bind(eventName, handlerProxy);
          }
        });
      },

      _off: function (element, eventName) {
        eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace;
        element.unbind(eventName).undelegate(eventName);

        // Clear the stack to avoid memory leaks (#10056)
        this.bindings = $(this.bindings.not(element).get());
        this.focusable = $(this.focusable.not(element).get());
        this.hoverable = $(this.hoverable.not(element).get());
      },

      _delay: function (handler, delay) {
        function handlerProxy() {
          return (typeof handler === "string" ? instance[handler] : handler)
            .apply(instance, arguments);
        }

        var instance = this;
        return setTimeout(handlerProxy, delay || 0);
      },

      _hoverable: function (element) {
        this.hoverable = this.hoverable.add(element);
        this._on(element, {
          mouseenter: function (event) {
            $(event.currentTarget).addClass("ui-state-hover");
          },
          mouseleave: function (event) {
            $(event.currentTarget).removeClass("ui-state-hover");
          }
        });
      },

      _focusable: function (element) {
        this.focusable = this.focusable.add(element);
        this._on(element, {
          focusin: function (event) {
            $(event.currentTarget).addClass("ui-state-focus");
          },
          focusout: function (event) {
            $(event.currentTarget).removeClass("ui-state-focus");
          }
        });
      },

      _trigger: function (type, event, data) {
        var prop, orig,
          callback = this.options[type];

        data = data || {};
        event = $.Event(event);
        event.type = (type === this.widgetEventPrefix ?
          type :
          this.widgetEventPrefix + type).toLowerCase();
        // the original event may come from any element
        // so we need to reset the target on the new event
        event.target = this.element[0];

        // copy original event properties over to the new event
        orig = event.originalEvent;
        if (orig) {
          for (prop in orig) {
            if (!(prop in event)) {
              event[prop] = orig[prop];
            }
          }
        }

        this.element.trigger(event, data);
        return !($.isFunction(callback) &&
          callback.apply(this.element[0], [event].concat(data)) === false ||
          event.isDefaultPrevented());
      }
    };

    $.each({show: "fadeIn", hide: "fadeOut"}, function (method, defaultEffect) {
      $.Widget.prototype["_" + method] = function (element, options, callback) {
        if (typeof options === "string") {
          options = {effect: options};
        }
        var hasOptions,
          effectName = !options ?
            method :
            options === true || typeof options === "number" ?
              defaultEffect :
              options.effect || defaultEffect;
        options = options || {};
        if (typeof options === "number") {
          options = {duration: options};
        }
        hasOptions = !$.isEmptyObject(options);
        options.complete = callback;
        if (options.delay) {
          element.delay(options.delay);
        }
        if (hasOptions && $.effects && $.effects.effect[effectName]) {
          element[method](options);
        } else if (effectName !== method && element[effectName]) {
          element[effectName](options.duration, options.easing, callback);
        } else {
          element.queue(function (next) {
            $(this)[method]();
            if (callback) {
              callback.call(element[0]);
            }
            next();
          });
        }
      };
    });

    var widget = $.widget;


    /*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */


    var mouseHandled = false;
    $(document).mouseup(function () {
      mouseHandled = false;
    });

    var mouse = $.widget("ui.mouse", {
      version: "1.11.4",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0
      },
      _mouseInit: function () {
        var that = this;

        this.element
          .bind("mousedown." + this.widgetName, function (event) {
            return that._mouseDown(event);
          })
          .bind("click." + this.widgetName, function (event) {
            if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
              $.removeData(event.target, that.widgetName + ".preventClickEvent");
              event.stopImmediatePropagation();
              return false;
            }
          });

        this.started = false;
      },

      // TODO: make sure destroying one instance of mouse doesn't mess with
      // other instances of mouse
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName);
        if (this._mouseMoveDelegate) {
          this.document
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        }
      },

      _mouseDown: function (event) {
        // don't let more than one widget handle mouseStart
        if (mouseHandled) {
          return;
        }

        this._mouseMoved = false;

        // we may have missed mouseup (out of window)
        (this._mouseStarted && this._mouseUp(event));

        this._mouseDownEvent = event;

        var that = this,
          btnIsLeft = (event.which === 1),
          // event.target.nodeName works around a bug in IE 8 with
          // disabled inputs (#7620)
          elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
        if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
          return true;
        }

        this.mouseDelayMet = !this.options.delay;
        if (!this.mouseDelayMet) {
          this._mouseDelayTimer = setTimeout(function () {
            that.mouseDelayMet = true;
          }, this.options.delay);
        }

        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
          this._mouseStarted = (this._mouseStart(event) !== false);
          if (!this._mouseStarted) {
            event.preventDefault();
            return true;
          }
        }

        // Click event may never have fired (Gecko & Opera)
        if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
          $.removeData(event.target, this.widgetName + ".preventClickEvent");
        }

        // these delegates are required to keep context
        this._mouseMoveDelegate = function (event) {
          return that._mouseMove(event);
        };
        this._mouseUpDelegate = function (event) {
          return that._mouseUp(event);
        };

        this.document
          .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
          .bind("mouseup." + this.widgetName, this._mouseUpDelegate);

        event.preventDefault();

        mouseHandled = true;
        return true;
      },

      _mouseMove: function (event) {
        // Only check for mouseups outside the document if you've moved inside the document
        // at least once. This prevents the firing of mouseup in the case of IE<9, which will
        // fire a mousemove event if content is placed under the cursor. See #7778
        // Support: IE <9
        if (this._mouseMoved) {
          // IE mouseup check - mouseup happened when mouse was out of window
          if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
            return this._mouseUp(event);

            // Iframe mouseup check - mouseup occurred in another document
          } else if (!event.which) {
            return this._mouseUp(event);
          }
        }

        if (event.which || event.button) {
          this._mouseMoved = true;
        }

        if (this._mouseStarted) {
          this._mouseDrag(event);
          return event.preventDefault();
        }

        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
          this._mouseStarted =
            (this._mouseStart(this._mouseDownEvent, event) !== false);
          (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
        }

        return !this._mouseStarted;
      },

      _mouseUp: function (event) {
        this.document
          .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
          .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);

        if (this._mouseStarted) {
          this._mouseStarted = false;

          if (event.target === this._mouseDownEvent.target) {
            $.data(event.target, this.widgetName + ".preventClickEvent", true);
          }

          this._mouseStop(event);
        }

        mouseHandled = false;
        return false;
      },

      _mouseDistanceMet: function (event) {
        return (Math.max(
            Math.abs(this._mouseDownEvent.pageX - event.pageX),
            Math.abs(this._mouseDownEvent.pageY - event.pageY)
          ) >= this.options.distance
        );
      },

      _mouseDelayMet: function (/* event */) {
        return this.mouseDelayMet;
      },

      // These are placeholder methods, to be overriden by extending plugin
      _mouseStart: function (/* event */) {
      },
      _mouseDrag: function (/* event */) {
      },
      _mouseStop: function (/* event */) {
      },
      _mouseCapture: function (/* event */) {
        return true;
      }
    });


    /*!
 * jQuery UI Draggable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */


    $.widget("ui.draggable", $.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "drag",
      options: {
        addClasses: true,
        appendTo: "parent",
        axis: false,
        connectToSortable: false,
        containment: false,
        cursor: "auto",
        cursorAt: false,
        grid: false,
        handle: false,
        helper: "original",
        iframeFix: false,
        opacity: false,
        refreshPositions: false,
        revert: false,
        revertDuration: 500,
        scope: "default",
        scroll: true,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: false,
        snapMode: "both",
        snapTolerance: 20,
        stack: false,
        zIndex: false,

        // callbacks
        drag: null,
        start: null,
        stop: null
      },
      _create: function () {

        if (this.options.helper === "original") {
          this._setPositionRelative();
        }
        if (this.options.addClasses) {
          this.element.addClass("ui-draggable");
        }
        if (this.options.disabled) {
          this.element.addClass("ui-draggable-disabled");
        }
        this._setHandleClassName();

        this._mouseInit();
      },

      _setOption: function (key, value) {
        this._super(key, value);
        if (key === "handle") {
          this._removeHandleClassName();
          this._setHandleClassName();
        }
      },

      _destroy: function () {
        if ((this.helper || this.element).is(".ui-draggable-dragging")) {
          this.destroyOnClear = true;
          return;
        }
        this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
        this._removeHandleClassName();
        this._mouseDestroy();
      },

      _mouseCapture: function (event) {
        var o = this.options;

        this._blurActiveElement(event);

        // among others, prevent a drag on a resizable-handle
        if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
          return false;
        }

        //Quit if we're not on a valid handle
        this.handle = this._getHandle(event);
        if (!this.handle) {
          return false;
        }

        this._blockFrames(o.iframeFix === true ? "iframe" : o.iframeFix);

        return true;

      },

      _blockFrames: function (selector) {
        this.iframeBlocks = this.document.find(selector).map(function () {
          var iframe = $(this);

          return $("<div>")
            .css("position", "absolute")
            .appendTo(iframe.parent())
            .outerWidth(iframe.outerWidth())
            .outerHeight(iframe.outerHeight())
            .offset(iframe.offset())[0];
        });
      },

      _unblockFrames: function () {
        if (this.iframeBlocks) {
          this.iframeBlocks.remove();
          delete this.iframeBlocks;
        }
      },

      _blurActiveElement: function (event) {
        var document = this.document[0];

        // Only need to blur if the event occurred on the draggable itself, see #10527
        if (!this.handleElement.is(event.target)) {
          return;
        }

        // support: IE9
        // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
        try {

          // Support: IE9, IE10
          // If the <body> is blurred, IE will switch windows, see #9520
          if (document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body") {

            // Blur any element that currently has focus, see #4261
            $(document.activeElement).blur();
          }
        } catch (error) {
        }
      },

      _mouseStart: function (event) {

        var o = this.options;

        //Create and append the visible helper
        this.helper = this._createHelper(event);

        this.helper.addClass("ui-draggable-dragging");

        //Cache the helper size
        this._cacheHelperProportions();

        //If ddmanager is used for droppables, set the global draggable
        if ($.ui.ddmanager) {
          $.ui.ddmanager.current = this;
        }

        /*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

        //Cache the margins of the original element
        this._cacheMargins();

        //Store the helper's css position
        this.cssPosition = this.helper.css("position");
        this.scrollParent = this.helper.scrollParent(true);
        this.offsetParent = this.helper.offsetParent();
        this.hasFixedAncestor = this.helper.parents().filter(function () {
          return $(this).css("position") === "fixed";
        }).length > 0;

        //The element's absolute position on the page minus margins
        this.positionAbs = this.element.offset();
        this._refreshOffsets(event);

        //Generate the original position
        this.originalPosition = this.position = this._generatePosition(event, false);
        this.originalPageX = event.pageX;
        this.originalPageY = event.pageY;

        //Adjust the mouse offset relative to the helper if "cursorAt" is supplied
        (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

        //Set a containment if given in the options
        this._setContainment();

        //Trigger event + callbacks
        if (this._trigger("start", event) === false) {
          this._clear();
          return false;
        }

        //Recache the helper size
        this._cacheHelperProportions();

        //Prepare the droppable offsets
        if ($.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(this, event);
        }

        // Reset helper's right/bottom css if they're set and set explicit width/height instead
        // as this prevents resizing of elements with right/bottom set (see #7772)
        this._normalizeRightBottom();

        this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position

        //If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
        if ($.ui.ddmanager) {
          $.ui.ddmanager.dragStart(this, event);
        }

        return true;
      },

      _refreshOffsets: function (event) {
        this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: false,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        };

        this.offset.click = {
          left: event.pageX - this.offset.left,
          top: event.pageY - this.offset.top
        };
      },

      _mouseDrag: function (event, noPropagation) {
        // reset any necessary cached properties (see #5009)
        if (this.hasFixedAncestor) {
          this.offset.parent = this._getParentOffset();
        }

        //Compute the helpers position
        this.position = this._generatePosition(event, true);
        this.positionAbs = this._convertPositionTo("absolute");

        //Call plugins and callbacks and use the resulting position if something is returned
        if (!noPropagation) {
          var ui = this._uiHash();
          if (this._trigger("drag", event, ui) === false) {
            this._mouseUp({});
            return false;
          }
          this.position = ui.position;
        }

        this.helper[0].style.left = this.position.left + "px";
        this.helper[0].style.top = this.position.top + "px";

        if ($.ui.ddmanager) {
          $.ui.ddmanager.drag(this, event);
        }

        return false;
      },

      _mouseStop: function (event) {

        //If we are using droppables, inform the manager about the drop
        var that = this,
          dropped = false;
        if ($.ui.ddmanager && !this.options.dropBehaviour) {
          dropped = $.ui.ddmanager.drop(this, event);
        }

        //if a drop comes from outside (a sortable)
        if (this.dropped) {
          dropped = this.dropped;
          this.dropped = false;
        }

        if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
          $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
            if (that._trigger("stop", event) !== false) {
              that._clear();
            }
          });
        } else {
          if (this._trigger("stop", event) !== false) {
            this._clear();
          }
        }

        return false;
      },

      _mouseUp: function (event) {
        this._unblockFrames();

        //If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
        if ($.ui.ddmanager) {
          $.ui.ddmanager.dragStop(this, event);
        }

        // Only need to focus if the event occurred on the draggable itself, see #10527
        if (this.handleElement.is(event.target)) {
          // The interaction is over; whether or not the click resulted in a drag, focus the element
          this.element.focus();
        }

        return $.ui.mouse.prototype._mouseUp.call(this, event);
      },

      cancel: function () {

        if (this.helper.is(".ui-draggable-dragging")) {
          this._mouseUp({});
        } else {
          this._clear();
        }

        return this;

      },

      _getHandle: function (event) {
        return this.options.handle ?
          !!$(event.target).closest(this.element.find(this.options.handle)).length :
          true;
      },

      _setHandleClassName: function () {
        this.handleElement = this.options.handle ?
          this.element.find(this.options.handle) : this.element;
        this.handleElement.addClass("ui-draggable-handle");
      },

      _removeHandleClassName: function () {
        this.handleElement.removeClass("ui-draggable-handle");
      },

      _createHelper: function (event) {

        var o = this.options,
          helperIsFunction = $.isFunction(o.helper),
          helper = helperIsFunction ?
            $(o.helper.apply(this.element[0], [event])) :
            (o.helper === "clone" ?
              this.element.clone().removeAttr("id") :
              this.element);

        if (!helper.parents("body").length) {
          helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
        }

        // http://bugs.jqueryui.com/ticket/9446
        // a helper function can return the original element
        // which wouldn't have been set to relative in _create
        if (helperIsFunction && helper[0] === this.element[0]) {
          this._setPositionRelative();
        }

        if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
          helper.css("position", "absolute");
        }

        return helper;

      },

      _setPositionRelative: function () {
        if (!(/^(?:r|a|f)/).test(this.element.css("position"))) {
          this.element[0].style.position = "relative";
        }
      },

      _adjustOffsetFromHelper: function (obj) {
        if (typeof obj === "string") {
          obj = obj.split(" ");
        }
        if ($.isArray(obj)) {
          obj = {left: +obj[0], top: +obj[1] || 0};
        }
        if ("left" in obj) {
          this.offset.click.left = obj.left + this.margins.left;
        }
        if ("right" in obj) {
          this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
        }
        if ("top" in obj) {
          this.offset.click.top = obj.top + this.margins.top;
        }
        if ("bottom" in obj) {
          this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
        }
      },

      _isRootNode: function (element) {
        return (/(html|body)/i).test(element.tagName) || element === this.document[0];
      },

      _getParentOffset: function () {

        //Get the offsetParent and cache its position
        var po = this.offsetParent.offset(),
          document = this.document[0];

        // This is a special case where we need to modify a offset calculated on start, since the following happened:
        // 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
        // 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
        //    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
        if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
          po.left += this.scrollParent.scrollLeft();
          po.top += this.scrollParent.scrollTop();
        }

        if (this._isRootNode(this.offsetParent[0])) {
          po = {top: 0, left: 0};
        }

        return {
          top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
          left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
        };

      },

      _getRelativeOffset: function () {
        if (this.cssPosition !== "relative") {
          return {top: 0, left: 0};
        }

        var p = this.element.position(),
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

        return {
          top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollTop() : 0),
          left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollLeft() : 0)
        };

      },

      _cacheMargins: function () {
        this.margins = {
          left: (parseInt(this.element.css("marginLeft"), 10) || 0),
          top: (parseInt(this.element.css("marginTop"), 10) || 0),
          right: (parseInt(this.element.css("marginRight"), 10) || 0),
          bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
        };
      },

      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        };
      },

      _setContainment: function () {

        var isUserScrollable, c, ce,
          o = this.options,
          document = this.document[0];

        this.relativeContainer = null;

        if (!o.containment) {
          this.containment = null;
          return;
        }

        if (o.containment === "window") {
          this.containment = [
            $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
            $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
            $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left,
            $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
          ];
          return;
        }

        if (o.containment === "document") {
          this.containment = [
            0,
            0,
            $(document).width() - this.helperProportions.width - this.margins.left,
            ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
          ];
          return;
        }

        if (o.containment.constructor === Array) {
          this.containment = o.containment;
          return;
        }

        if (o.containment === "parent") {
          o.containment = this.helper[0].parentNode;
        }

        c = $(o.containment);
        ce = c[0];

        if (!ce) {
          return;
        }

        isUserScrollable = /(scroll|auto)/.test(c.css("overflow"));

        this.containment = [
          (parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0),
          (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0),
          (isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) -
          (parseInt(c.css("borderRightWidth"), 10) || 0) -
          (parseInt(c.css("paddingRight"), 10) || 0) -
          this.helperProportions.width -
          this.margins.left -
          this.margins.right,
          (isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) -
          (parseInt(c.css("borderBottomWidth"), 10) || 0) -
          (parseInt(c.css("paddingBottom"), 10) || 0) -
          this.helperProportions.height -
          this.margins.top -
          this.margins.bottom
        ];
        this.relativeContainer = c;
      },

      _convertPositionTo: function (d, pos) {

        if (!pos) {
          pos = this.position;
        }

        var mod = d === "absolute" ? 1 : -1,
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

        return {
          top: (
            pos.top +																// The absolute mouse position
            this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.parent.top * mod -										// The offsetParent's offset without borders (offset + border)
            ((this.cssPosition === "fixed" ? -this.offset.scroll.top : (scrollIsRootNode ? 0 : this.offset.scroll.top)) * mod)
          ),
          left: (
            pos.left +																// The absolute mouse position
            this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.parent.left * mod -										// The offsetParent's offset without borders (offset + border)
            ((this.cssPosition === "fixed" ? -this.offset.scroll.left : (scrollIsRootNode ? 0 : this.offset.scroll.left)) * mod)
          )
        };

      },

      _generatePosition: function (event, constrainPosition) {

        var containment, co, top, left,
          o = this.options,
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
          pageX = event.pageX,
          pageY = event.pageY;

        // Cache the scroll
        if (!scrollIsRootNode || !this.offset.scroll) {
          this.offset.scroll = {
            top: this.scrollParent.scrollTop(),
            left: this.scrollParent.scrollLeft()
          };
        }

        /*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

        // If we are not dragging yet, we won't check for options
        if (constrainPosition) {
          if (this.containment) {
            if (this.relativeContainer) {
              co = this.relativeContainer.offset();
              containment = [
                this.containment[0] + co.left,
                this.containment[1] + co.top,
                this.containment[2] + co.left,
                this.containment[3] + co.top
              ];
            } else {
              containment = this.containment;
            }

            if (event.pageX - this.offset.click.left < containment[0]) {
              pageX = containment[0] + this.offset.click.left;
            }
            if (event.pageY - this.offset.click.top < containment[1]) {
              pageY = containment[1] + this.offset.click.top;
            }
            if (event.pageX - this.offset.click.left > containment[2]) {
              pageX = containment[2] + this.offset.click.left;
            }
            if (event.pageY - this.offset.click.top > containment[3]) {
              pageY = containment[3] + this.offset.click.top;
            }
          }

          if (o.grid) {
            //Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
            top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
            pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

            left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
            pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
          }

          if (o.axis === "y") {
            pageX = this.originalPageX;
          }

          if (o.axis === "x") {
            pageY = this.originalPageY;
          }
        }

        return {
          top: (
            pageY -																	// The absolute mouse position
            this.offset.click.top -												// Click offset (relative to the element)
            this.offset.relative.top -												// Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
            (this.cssPosition === "fixed" ? -this.offset.scroll.top : (scrollIsRootNode ? 0 : this.offset.scroll.top))
          ),
          left: (
            pageX -																	// The absolute mouse position
            this.offset.click.left -												// Click offset (relative to the element)
            this.offset.relative.left -												// Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
            (this.cssPosition === "fixed" ? -this.offset.scroll.left : (scrollIsRootNode ? 0 : this.offset.scroll.left))
          )
        };

      },

      _clear: function () {
        this.helper.removeClass("ui-draggable-dragging");
        if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
          this.helper.remove();
        }
        this.helper = null;
        this.cancelHelperRemoval = false;
        if (this.destroyOnClear) {
          this.destroy();
        }
      },

      _normalizeRightBottom: function () {
        if (this.options.axis !== "y" && this.helper.css("right") !== "auto") {
          this.helper.width(this.helper.width());
          this.helper.css("right", "auto");
        }
        if (this.options.axis !== "x" && this.helper.css("bottom") !== "auto") {
          this.helper.height(this.helper.height());
          this.helper.css("bottom", "auto");
        }
      },

      // From now on bulk stuff - mainly helpers

      _trigger: function (type, event, ui) {
        ui = ui || this._uiHash();
        $.ui.plugin.call(this, type, [event, ui, this], true);

        // Absolute position and offset (see #6884 ) have to be recalculated after plugins
        if (/^(drag|start|stop)/.test(type)) {
          this.positionAbs = this._convertPositionTo("absolute");
          ui.offset = this.positionAbs;
        }
        return $.Widget.prototype._trigger.call(this, type, event, ui);
      },

      plugins: {},

      _uiHash: function () {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs
        };
      }

    });

    $.ui.plugin.add("draggable", "connectToSortable", {
      start: function (event, ui, draggable) {
        var uiSortable = $.extend({}, ui, {
          item: draggable.element
        });

        draggable.sortables = [];
        $(draggable.options.connectToSortable).each(function () {
          var sortable = $(this).sortable("instance");

          if (sortable && !sortable.options.disabled) {
            draggable.sortables.push(sortable);

            // refreshPositions is called at drag start to refresh the containerCache
            // which is used in drag. This ensures it's initialized and synchronized
            // with any changes that might have happened on the page since initialization.
            sortable.refreshPositions();
            sortable._trigger("activate", event, uiSortable);
          }
        });
      },
      stop: function (event, ui, draggable) {
        var uiSortable = $.extend({}, ui, {
          item: draggable.element
        });

        draggable.cancelHelperRemoval = false;

        $.each(draggable.sortables, function () {
          var sortable = this;

          if (sortable.isOver) {
            sortable.isOver = 0;

            // Allow this sortable to handle removing the helper
            draggable.cancelHelperRemoval = true;
            sortable.cancelHelperRemoval = false;

            // Use _storedCSS To restore properties in the sortable,
            // as this also handles revert (#9675) since the draggable
            // may have modified them in unexpected ways (#8809)
            sortable._storedCSS = {
              position: sortable.placeholder.css("position"),
              top: sortable.placeholder.css("top"),
              left: sortable.placeholder.css("left")
            };

            sortable._mouseStop(event);

            // Once drag has ended, the sortable should return to using
            // its original helper, not the shared helper from draggable
            sortable.options.helper = sortable.options._helper;
          } else {
            // Prevent this Sortable from removing the helper.
            // However, don't set the draggable to remove the helper
            // either as another connected Sortable may yet handle the removal.
            sortable.cancelHelperRemoval = true;

            sortable._trigger("deactivate", event, uiSortable);
          }
        });
      },
      drag: function (event, ui, draggable) {
        $.each(draggable.sortables, function () {
          var innermostIntersecting = false,
            sortable = this;

          // Copy over variables that sortable's _intersectsWith uses
          sortable.positionAbs = draggable.positionAbs;
          sortable.helperProportions = draggable.helperProportions;
          sortable.offset.click = draggable.offset.click;

          if (sortable._intersectsWith(sortable.containerCache)) {
            innermostIntersecting = true;

            $.each(draggable.sortables, function () {
              // Copy over variables that sortable's _intersectsWith uses
              this.positionAbs = draggable.positionAbs;
              this.helperProportions = draggable.helperProportions;
              this.offset.click = draggable.offset.click;

              if (this !== sortable &&
                this._intersectsWith(this.containerCache) &&
                $.contains(sortable.element[0], this.element[0])) {
                innermostIntersecting = false;
              }

              return innermostIntersecting;
            });
          }

          if (innermostIntersecting) {
            // If it intersects, we use a little isOver variable and set it once,
            // so that the move-in stuff gets fired only once.
            if (!sortable.isOver) {
              sortable.isOver = 1;

              // Store draggable's parent in case we need to reappend to it later.
              draggable._parent = ui.helper.parent();

              sortable.currentItem = ui.helper
                .appendTo(sortable.element)
                .data("ui-sortable-item", true);

              // Store helper option to later restore it
              sortable.options._helper = sortable.options.helper;

              sortable.options.helper = function () {
                return ui.helper[0];
              };

              // Fire the start events of the sortable with our passed browser event,
              // and our own helper (so it doesn't create a new one)
              event.target = sortable.currentItem[0];
              sortable._mouseCapture(event, true);
              sortable._mouseStart(event, true, true);

              // Because the browser event is way off the new appended portlet,
              // modify necessary variables to reflect the changes
              sortable.offset.click.top = draggable.offset.click.top;
              sortable.offset.click.left = draggable.offset.click.left;
              sortable.offset.parent.left -= draggable.offset.parent.left -
                sortable.offset.parent.left;
              sortable.offset.parent.top -= draggable.offset.parent.top -
                sortable.offset.parent.top;

              draggable._trigger("toSortable", event);

              // Inform draggable that the helper is in a valid drop zone,
              // used solely in the revert option to handle "valid/invalid".
              draggable.dropped = sortable.element;

              // Need to refreshPositions of all sortables in the case that
              // adding to one sortable changes the location of the other sortables (#9675)
              $.each(draggable.sortables, function () {
                this.refreshPositions();
              });

              // hack so receive/update callbacks work (mostly)
              draggable.currentItem = draggable.element;
              sortable.fromOutside = draggable;
            }

            if (sortable.currentItem) {
              sortable._mouseDrag(event);
              // Copy the sortable's position because the draggable's can potentially reflect
              // a relative position, while sortable is always absolute, which the dragged
              // element has now become. (#8809)
              ui.position = sortable.position;
            }
          } else {
            // If it doesn't intersect with the sortable, and it intersected before,
            // we fake the drag stop of the sortable, but make sure it doesn't remove
            // the helper by using cancelHelperRemoval.
            if (sortable.isOver) {

              sortable.isOver = 0;
              sortable.cancelHelperRemoval = true;

              // Calling sortable's mouseStop would trigger a revert,
              // so revert must be temporarily false until after mouseStop is called.
              sortable.options._revert = sortable.options.revert;
              sortable.options.revert = false;

              sortable._trigger("out", event, sortable._uiHash(sortable));
              sortable._mouseStop(event, true);

              // restore sortable behaviors that were modfied
              // when the draggable entered the sortable area (#9481)
              sortable.options.revert = sortable.options._revert;
              sortable.options.helper = sortable.options._helper;

              if (sortable.placeholder) {
                sortable.placeholder.remove();
              }

              // Restore and recalculate the draggable's offset considering the sortable
              // may have modified them in unexpected ways. (#8809, #10669)
              ui.helper.appendTo(draggable._parent);
              draggable._refreshOffsets(event);
              ui.position = draggable._generatePosition(event, true);

              draggable._trigger("fromSortable", event);

              // Inform draggable that the helper is no longer in a valid drop zone
              draggable.dropped = false;

              // Need to refreshPositions of all sortables just in case removing
              // from one sortable changes the location of other sortables (#9675)
              $.each(draggable.sortables, function () {
                this.refreshPositions();
              });
            }
          }
        });
      }
    });

    $.ui.plugin.add("draggable", "cursor", {
      start: function (event, ui, instance) {
        var t = $("body"),
          o = instance.options;

        if (t.css("cursor")) {
          o._cursor = t.css("cursor");
        }
        t.css("cursor", o.cursor);
      },
      stop: function (event, ui, instance) {
        var o = instance.options;
        if (o._cursor) {
          $("body").css("cursor", o._cursor);
        }
      }
    });

    $.ui.plugin.add("draggable", "opacity", {
      start: function (event, ui, instance) {
        var t = $(ui.helper),
          o = instance.options;
        if (t.css("opacity")) {
          o._opacity = t.css("opacity");
        }
        t.css("opacity", o.opacity);
      },
      stop: function (event, ui, instance) {
        var o = instance.options;
        if (o._opacity) {
          $(ui.helper).css("opacity", o._opacity);
        }
      }
    });

    $.ui.plugin.add("draggable", "scroll", {
      start: function (event, ui, i) {
        if (!i.scrollParentNotHidden) {
          i.scrollParentNotHidden = i.helper.scrollParent(false);
        }

        if (i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== "HTML") {
          i.overflowOffset = i.scrollParentNotHidden.offset();
        }
      },
      drag: function (event, ui, i) {

        var o = i.options,
          scrolled = false,
          scrollParent = i.scrollParentNotHidden[0],
          document = i.document[0];

        if (scrollParent !== document && scrollParent.tagName !== "HTML") {
          if (!o.axis || o.axis !== "x") {
            if ((i.overflowOffset.top + scrollParent.offsetHeight) - event.pageY < o.scrollSensitivity) {
              scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
            } else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
              scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
            }
          }

          if (!o.axis || o.axis !== "y") {
            if ((i.overflowOffset.left + scrollParent.offsetWidth) - event.pageX < o.scrollSensitivity) {
              scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
            } else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
              scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
            }
          }

        } else {

          if (!o.axis || o.axis !== "x") {
            if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
              scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
            } else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
              scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
            }
          }

          if (!o.axis || o.axis !== "y") {
            if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
              scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
            } else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
              scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
            }
          }

        }

        if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(i, event);
        }

      }
    });

    $.ui.plugin.add("draggable", "snap", {
      start: function (event, ui, i) {

        var o = i.options;

        i.snapElements = [];

        $(o.snap.constructor !== String ? (o.snap.items || ":data(ui-draggable)") : o.snap).each(function () {
          var $t = $(this),
            $o = $t.offset();
          if (this !== i.element[0]) {
            i.snapElements.push({
              item: this,
              width: $t.outerWidth(), height: $t.outerHeight(),
              top: $o.top, left: $o.left
            });
          }
        });

      },
      drag: function (event, ui, inst) {

        var ts, bs, ls, rs, l, r, t, b, i, first,
          o = inst.options,
          d = o.snapTolerance,
          x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
          y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

        for (i = inst.snapElements.length - 1; i >= 0; i--) {

          l = inst.snapElements[i].left - inst.margins.left;
          r = l + inst.snapElements[i].width;
          t = inst.snapElements[i].top - inst.margins.top;
          b = t + inst.snapElements[i].height;

          if (x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item)) {
            if (inst.snapElements[i].snapping) {
              (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {snapItem: inst.snapElements[i].item})));
            }
            inst.snapElements[i].snapping = false;
            continue;
          }

          if (o.snapMode !== "inner") {
            ts = Math.abs(t - y2) <= d;
            bs = Math.abs(b - y1) <= d;
            ls = Math.abs(l - x2) <= d;
            rs = Math.abs(r - x1) <= d;
            if (ts) {
              ui.position.top = inst._convertPositionTo("relative", {
                top: t - inst.helperProportions.height,
                left: 0
              }).top;
            }
            if (bs) {
              ui.position.top = inst._convertPositionTo("relative", {top: b, left: 0}).top;
            }
            if (ls) {
              ui.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: l - inst.helperProportions.width
              }).left;
            }
            if (rs) {
              ui.position.left = inst._convertPositionTo("relative", {top: 0, left: r}).left;
            }
          }

          first = (ts || bs || ls || rs);

          if (o.snapMode !== "outer") {
            ts = Math.abs(t - y1) <= d;
            bs = Math.abs(b - y2) <= d;
            ls = Math.abs(l - x1) <= d;
            rs = Math.abs(r - x2) <= d;
            if (ts) {
              ui.position.top = inst._convertPositionTo("relative", {top: t, left: 0}).top;
            }
            if (bs) {
              ui.position.top = inst._convertPositionTo("relative", {
                top: b - inst.helperProportions.height,
                left: 0
              }).top;
            }
            if (ls) {
              ui.position.left = inst._convertPositionTo("relative", {top: 0, left: l}).left;
            }
            if (rs) {
              ui.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: r - inst.helperProportions.width
              }).left;
            }
          }

          if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
            (inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {snapItem: inst.snapElements[i].item})));
          }
          inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

        }

      }
    });

    $.ui.plugin.add("draggable", "stack", {
      start: function (event, ui, instance) {
        var min,
          o = instance.options,
          group = $.makeArray($(o.stack)).sort(function (a, b) {
            return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
          });

        if (!group.length) {
          return;
        }

        min = parseInt($(group[0]).css("zIndex"), 10) || 0;
        $(group).each(function (i) {
          $(this).css("zIndex", min + i);
        });
        this.css("zIndex", (min + group.length));
      }
    });

    $.ui.plugin.add("draggable", "zIndex", {
      start: function (event, ui, instance) {
        var t = $(ui.helper),
          o = instance.options;

        if (t.css("zIndex")) {
          o._zIndex = t.css("zIndex");
        }
        t.css("zIndex", o.zIndex);
      },
      stop: function (event, ui, instance) {
        var o = instance.options;

        if (o._zIndex) {
          $(ui.helper).css("zIndex", o._zIndex);
        }
      }
    });

    var draggable = $.ui.draggable;


    /*!
 * jQuery UI Droppable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */


    $.widget("ui.droppable", {
      version: "1.11.4",
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        activeClass: false,
        addClasses: true,
        greedy: false,
        hoverClass: false,
        scope: "default",
        tolerance: "intersect",

        // callbacks
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null
      },
      _create: function () {

        var proportions,
          o = this.options,
          accept = o.accept;

        this.isover = false;
        this.isout = true;

        this.accept = $.isFunction(accept) ? accept : function (d) {
          return d.is(accept);
        };

        this.proportions = function ( /* valueToWrite */) {
          if (arguments.length) {
            // Store the droppable's proportions
            proportions = arguments[0];
          } else {
            // Retrieve or derive the droppable's proportions
            return proportions ?
              proportions :
              proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
              };
          }
        };

        this._addToManager(o.scope);

        o.addClasses && this.element.addClass("ui-droppable");

      },

      _addToManager: function (scope) {
        // Add the reference and positions to the manager
        $.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [];
        $.ui.ddmanager.droppables[scope].push(this);
      },

      _splice: function (drop) {
        var i = 0;
        for (; i < drop.length; i++) {
          if (drop[i] === this) {
            drop.splice(i, 1);
          }
        }
      },

      _destroy: function () {
        var drop = $.ui.ddmanager.droppables[this.options.scope];

        this._splice(drop);

        this.element.removeClass("ui-droppable ui-droppable-disabled");
      },

      _setOption: function (key, value) {

        if (key === "accept") {
          this.accept = $.isFunction(value) ? value : function (d) {
            return d.is(value);
          };
        } else if (key === "scope") {
          var drop = $.ui.ddmanager.droppables[this.options.scope];

          this._splice(drop);
          this._addToManager(value);
        }

        this._super(key, value);
      },

      _activate: function (event) {
        var draggable = $.ui.ddmanager.current;
        if (this.options.activeClass) {
          this.element.addClass(this.options.activeClass);
        }
        if (draggable) {
          this._trigger("activate", event, this.ui(draggable));
        }
      },

      _deactivate: function (event) {
        var draggable = $.ui.ddmanager.current;
        if (this.options.activeClass) {
          this.element.removeClass(this.options.activeClass);
        }
        if (draggable) {
          this._trigger("deactivate", event, this.ui(draggable));
        }
      },

      _over: function (event) {

        var draggable = $.ui.ddmanager.current;

        // Bail if draggable and droppable are same element
        if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
          return;
        }

        if (this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
          if (this.options.hoverClass) {
            this.element.addClass(this.options.hoverClass);
          }
          this._trigger("over", event, this.ui(draggable));
        }

      },

      _out: function (event) {

        var draggable = $.ui.ddmanager.current;

        // Bail if draggable and droppable are same element
        if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
          return;
        }

        if (this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
          if (this.options.hoverClass) {
            this.element.removeClass(this.options.hoverClass);
          }
          this._trigger("out", event, this.ui(draggable));
        }

      },

      _drop: function (event, custom) {

        var draggable = custom || $.ui.ddmanager.current,
          childrenIntersection = false;

        // Bail if draggable and droppable are same element
        if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
          return false;
        }

        this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
          var inst = $(this).droppable("instance");
          if (
            inst.options.greedy &&
            !inst.options.disabled &&
            inst.options.scope === draggable.options.scope &&
            inst.accept.call(inst.element[0], (draggable.currentItem || draggable.element)) &&
            $.ui.intersect(draggable, $.extend(inst, {offset: inst.element.offset()}), inst.options.tolerance, event)
          ) {
            childrenIntersection = true;
            return false;
          }
        });
        if (childrenIntersection) {
          return false;
        }

        if (this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
          if (this.options.activeClass) {
            this.element.removeClass(this.options.activeClass);
          }
          if (this.options.hoverClass) {
            this.element.removeClass(this.options.hoverClass);
          }
          this._trigger("drop", event, this.ui(draggable));
          return this.element;
        }

        return false;

      },

      ui: function (c) {
        return {
          draggable: (c.currentItem || c.element),
          helper: c.helper,
          position: c.position,
          offset: c.positionAbs
        };
      }

    });

    $.ui.intersect = (function () {
      function isOverAxis(x, reference, size) {
        return (x >= reference) && (x < (reference + size));
      }

      return function (draggable, droppable, toleranceMode, event) {

        if (!droppable.offset) {
          return false;
        }

        var x1 = (draggable.positionAbs || draggable.position.absolute).left + draggable.margins.left,
          y1 = (draggable.positionAbs || draggable.position.absolute).top + draggable.margins.top,
          x2 = x1 + draggable.helperProportions.width,
          y2 = y1 + draggable.helperProportions.height,
          l = droppable.offset.left,
          t = droppable.offset.top,
          r = l + droppable.proportions().width,
          b = t + droppable.proportions().height;

        switch (toleranceMode) {
          case "fit":
            return (l <= x1 && x2 <= r && t <= y1 && y2 <= b);
          case "intersect":
            return (l < x1 + (draggable.helperProportions.width / 2) && // Right Half
              x2 - (draggable.helperProportions.width / 2) < r && // Left Half
              t < y1 + (draggable.helperProportions.height / 2) && // Bottom Half
              y2 - (draggable.helperProportions.height / 2) < b); // Top Half
          case "pointer":
            return isOverAxis(event.pageY, t, droppable.proportions().height) && isOverAxis(event.pageX, l, droppable.proportions().width);
          case "touch":
            return (
              (y1 >= t && y1 <= b) || // Top edge touching
              (y2 >= t && y2 <= b) || // Bottom edge touching
              (y1 < t && y2 > b) // Surrounded vertically
            ) && (
              (x1 >= l && x1 <= r) || // Left edge touching
              (x2 >= l && x2 <= r) || // Right edge touching
              (x1 < l && x2 > r) // Surrounded horizontally
            );
          default:
            return false;
        }
      };
    })();

    /*
	This manager tracks offsets of draggables and droppables
*/
    $.ui.ddmanager = {
      current: null,
      droppables: {"default": []},
      prepareOffsets: function (t, event) {

        var i, j,
          m = $.ui.ddmanager.droppables[t.options.scope] || [],
          type = event ? event.type : null, // workaround for #2317
          list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();

        droppablesLoop: for (i = 0; i < m.length; i++) {

          // No disabled and non-accepted
          if (m[i].options.disabled || (t && !m[i].accept.call(m[i].element[0], (t.currentItem || t.element)))) {
            continue;
          }

          // Filter out elements in the current dragged item
          for (j = 0; j < list.length; j++) {
            if (list[j] === m[i].element[0]) {
              m[i].proportions().height = 0;
              continue droppablesLoop;
            }
          }

          m[i].visible = m[i].element.css("display") !== "none";
          if (!m[i].visible) {
            continue;
          }

          // Activate the droppable if used directly from draggables
          if (type === "mousedown") {
            m[i]._activate.call(m[i], event);
          }

          m[i].offset = m[i].element.offset();
          m[i].proportions({
            width: m[i].element[0].offsetWidth,
            height: m[i].element[0].offsetHeight
          });

        }

      },
      drop: function (draggable, event) {

        var dropped = false;
        // Create a copy of the droppables in case the list changes during the drop (#9116)
        $.each(($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(), function () {

          if (!this.options) {
            return;
          }
          if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance, event)) {
            dropped = this._drop.call(this, event) || dropped;
          }

          if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
            this.isout = true;
            this.isover = false;
            this._deactivate.call(this, event);
          }

        });
        return dropped;

      },
      dragStart: function (draggable, event) {
        // Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
        draggable.element.parentsUntil("body").bind("scroll.droppable", function () {
          if (!draggable.options.refreshPositions) {
            $.ui.ddmanager.prepareOffsets(draggable, event);
          }
        });
      },
      drag: function (draggable, event) {

        // If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
        if (draggable.options.refreshPositions) {
          $.ui.ddmanager.prepareOffsets(draggable, event);
        }

        // Run through all droppables and check their positions based on specific tolerance options
        $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function () {

          if (this.options.disabled || this.greedyChild || !this.visible) {
            return;
          }

          var parentInstance, scope, parent,
            intersects = $.ui.intersect(draggable, this, this.options.tolerance, event),
            c = !intersects && this.isover ? "isout" : (intersects && !this.isover ? "isover" : null);
          if (!c) {
            return;
          }

          if (this.options.greedy) {
            // find droppable parents with same scope
            scope = this.options.scope;
            parent = this.element.parents(":data(ui-droppable)").filter(function () {
              return $(this).droppable("instance").options.scope === scope;
            });

            if (parent.length) {
              parentInstance = $(parent[0]).droppable("instance");
              parentInstance.greedyChild = (c === "isover");
            }
          }

          // we just moved into a greedy child
          if (parentInstance && c === "isover") {
            parentInstance.isover = false;
            parentInstance.isout = true;
            parentInstance._out.call(parentInstance, event);
          }

          this[c] = true;
          this[c === "isout" ? "isover" : "isout"] = false;
          this[c === "isover" ? "_over" : "_out"].call(this, event);

          // we just moved out of a greedy child
          if (parentInstance && c === "isout") {
            parentInstance.isout = false;
            parentInstance.isover = true;
            parentInstance._over.call(parentInstance, event);
          }
        });

      },
      dragStop: function (draggable, event) {
        draggable.element.parentsUntil("body").unbind("scroll.droppable");
        // Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
        if (!draggable.options.refreshPositions) {
          $.ui.ddmanager.prepareOffsets(draggable, event);
        }
      }
    };

    var droppable = $.ui.droppable;


    /*!
 * jQuery UI Sortable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */


    var sortable = $.widget("ui.sortable", $.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "sort",
      ready: false,
      options: {
        appendTo: "parent",
        axis: false,
        connectWith: false,
        containment: false,
        cursor: "auto",
        cursorAt: false,
        dropOnEmpty: true,
        forcePlaceholderSize: false,
        forceHelperSize: false,
        grid: false,
        handle: false,
        helper: "original",
        items: "> *",
        opacity: false,
        placeholder: false,
        revert: false,
        scroll: true,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1000,

        // callbacks
        activate: null,
        beforeStop: null,
        change: null,
        deactivate: null,
        out: null,
        over: null,
        receive: null,
        remove: null,
        sort: null,
        start: null,
        stop: null,
        update: null
      },

      _isOverAxis: function (x, reference, size) {
        return (x >= reference) && (x < (reference + size));
      },

      _isFloating: function (item) {
        return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
      },

      _create: function () {
        this.containerCache = {};
        this.element.addClass("ui-sortable");

        //Get the items
        this.refresh();

        //Let's determine the parent's offset
        this.offset = this.element.offset();

        //Initialize mouse events for interaction
        this._mouseInit();

        this._setHandleClassName();

        //We're ready to go
        this.ready = true;

      },

      _setOption: function (key, value) {
        this._super(key, value);

        if (key === "handle") {
          this._setHandleClassName();
        }
      },

      _setHandleClassName: function () {
        this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");
        $.each(this.items, function () {
          (this.instance.options.handle ?
            this.item.find(this.instance.options.handle) : this.item)
            .addClass("ui-sortable-handle");
        });
      },

      _destroy: function () {
        this.element
          .removeClass("ui-sortable ui-sortable-disabled")
          .find(".ui-sortable-handle")
          .removeClass("ui-sortable-handle");
        this._mouseDestroy();

        for (var i = this.items.length - 1; i >= 0; i--) {
          this.items[i].item.removeData(this.widgetName + "-item");
        }

        return this;
      },

      _mouseCapture: function (event, overrideHandle) {
        var currentItem = null,
          validHandle = false,
          that = this;

        if (this.reverting) {
          return false;
        }

        if (this.options.disabled || this.options.type === "static") {
          return false;
        }

        //We have to refresh the items data once first
        this._refreshItems(event);

        //Find out if the clicked node (or one of its parents) is a actual item in this.items
        $(event.target).parents().each(function () {
          if ($.data(this, that.widgetName + "-item") === that) {
            currentItem = $(this);
            return false;
          }
        });
        if ($.data(event.target, that.widgetName + "-item") === that) {
          currentItem = $(event.target);
        }

        if (!currentItem) {
          return false;
        }
        if (this.options.handle && !overrideHandle) {
          $(this.options.handle, currentItem).find("*").addBack().each(function () {
            if (this === event.target) {
              validHandle = true;
            }
          });
          if (!validHandle) {
            return false;
          }
        }

        this.currentItem = currentItem;
        this._removeCurrentsFromItems();
        return true;

      },

      _mouseStart: function (event, overrideHandle, noActivation) {

        var i, body,
          o = this.options;

        this.currentContainer = this;

        //We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
        this.refreshPositions();

        //Create and append the visible helper
        this.helper = this._createHelper(event);

        //Cache the helper size
        this._cacheHelperProportions();

        /*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

        //Cache the margins of the original element
        this._cacheMargins();

        //Get the next scrolling parent
        this.scrollParent = this.helper.scrollParent();

        //The element's absolute position on the page minus margins
        this.offset = this.currentItem.offset();
        this.offset = {
          top: this.offset.top - this.margins.top,
          left: this.offset.left - this.margins.left
        };

        $.extend(this.offset, {
          click: { //Where the click happened, relative to the element
            left: event.pageX - this.offset.left,
            top: event.pageY - this.offset.top
          },
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
        });

        // Only after we got the offset, we can change the helper's position to absolute
        // TODO: Still need to figure out a way to make relative sorting possible
        this.helper.css("position", "absolute");
        this.cssPosition = this.helper.css("position");

        //Generate the original position
        this.originalPosition = this._generatePosition(event);
        this.originalPageX = event.pageX;
        this.originalPageY = event.pageY;

        //Adjust the mouse offset relative to the helper if "cursorAt" is supplied
        (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

        //Cache the former DOM position
        this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]};

        //If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
        if (this.helper[0] !== this.currentItem[0]) {
          this.currentItem.hide();
        }

        //Create the placeholder
        this._createPlaceholder();

        //Set a containment if given in the options
        if (o.containment) {
          this._setContainment();
        }

        if (o.cursor && o.cursor !== "auto") { // cursor option
          body = this.document.find("body");

          // support: IE
          this.storedCursor = body.css("cursor");
          body.css("cursor", o.cursor);

          this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body);
        }

        if (o.opacity) { // opacity option
          if (this.helper.css("opacity")) {
            this._storedOpacity = this.helper.css("opacity");
          }
          this.helper.css("opacity", o.opacity);
        }

        if (o.zIndex) { // zIndex option
          if (this.helper.css("zIndex")) {
            this._storedZIndex = this.helper.css("zIndex");
          }
          this.helper.css("zIndex", o.zIndex);
        }

        //Prepare scrolling
        if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
          this.overflowOffset = this.scrollParent.offset();
        }

        //Call callbacks
        this._trigger("start", event, this._uiHash());

        //Recache the helper size
        if (!this._preserveHelperProportions) {
          this._cacheHelperProportions();
        }


        //Post "activate" events to possible containers
        if (!noActivation) {
          for (i = this.containers.length - 1; i >= 0; i--) {
            this.containers[i]._trigger("activate", event, this._uiHash(this));
          }
        }

        //Prepare possible droppables
        if ($.ui.ddmanager) {
          $.ui.ddmanager.current = this;
        }

        if ($.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(this, event);
        }

        this.dragging = true;

        this.helper.addClass("ui-sortable-helper");
        this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
        return true;

      },

      _mouseDrag: function (event) {
        var i, item, itemElement, intersection,
          o = this.options,
          scrolled = false;

        //Compute the helpers position
        this.position = this._generatePosition(event);
        this.positionAbs = this._convertPositionTo("absolute");

        if (!this.lastPositionAbs) {
          this.lastPositionAbs = this.positionAbs;
        }

        //Do scrolling
        if (this.options.scroll) {
          if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {

            if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
              this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
            } else if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
              this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
            }

            if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
              this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
            } else if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
              this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
            }

          } else {

            if (event.pageY - this.document.scrollTop() < o.scrollSensitivity) {
              scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);
            } else if (this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity) {
              scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);
            }

            if (event.pageX - this.document.scrollLeft() < o.scrollSensitivity) {
              scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed);
            } else if (this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity) {
              scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed);
            }

          }

          if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
            $.ui.ddmanager.prepareOffsets(this, event);
          }
        }

        //Regenerate the absolute position used for position checks
        this.positionAbs = this._convertPositionTo("absolute");

        //Set the helper position
        if (!this.options.axis || this.options.axis !== "y") {
          this.helper[0].style.left = this.position.left + "px";
        }
        if (!this.options.axis || this.options.axis !== "x") {
          this.helper[0].style.top = this.position.top + "px";
        }

        //Rearrange
        for (i = this.items.length - 1; i >= 0; i--) {

          //Cache variables and intersection, continue if no intersection
          item = this.items[i];
          itemElement = item.item[0];
          intersection = this._intersectsWithPointer(item);
          if (!intersection) {
            continue;
          }

          // Only put the placeholder inside the current Container, skip all
          // items from other containers. This works because when moving
          // an item from one container to another the
          // currentContainer is switched before the placeholder is moved.
          //
          // Without this, moving items in "sub-sortables" can cause
          // the placeholder to jitter between the outer and inner container.
          if (item.instance !== this.currentContainer) {
            continue;
          }

          // cannot intersect with itself
          // no useless actions that have been done before
          // no action if the item moved is the parent of the item checked
          if (itemElement !== this.currentItem[0] &&
            this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement &&
            !$.contains(this.placeholder[0], itemElement) &&
            (this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)
          ) {

            this.direction = intersection === 1 ? "down" : "up";

            if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
              this._rearrange(event, item);
            } else {
              break;
            }

            this._trigger("change", event, this._uiHash());
            break;
          }
        }

        //Post events to containers
        this._contactContainers(event);

        //Interconnect with droppables
        if ($.ui.ddmanager) {
          $.ui.ddmanager.drag(this, event);
        }

        //Call callbacks
        this._trigger("sort", event, this._uiHash());

        this.lastPositionAbs = this.positionAbs;
        return false;

      },

      _mouseStop: function (event, noPropagation) {

        if (!event) {
          return;
        }

        //If we are using droppables, inform the manager about the drop
        if ($.ui.ddmanager && !this.options.dropBehaviour) {
          $.ui.ddmanager.drop(this, event);
        }

        if (this.options.revert) {
          var that = this,
            cur = this.placeholder.offset(),
            axis = this.options.axis,
            animation = {};

          if (!axis || axis === "x") {
            animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft);
          }
          if (!axis || axis === "y") {
            animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop);
          }
          this.reverting = true;
          $(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function () {
            that._clear(event);
          });
        } else {
          this._clear(event, noPropagation);
        }

        return false;

      },

      cancel: function () {

        if (this.dragging) {

          this._mouseUp({target: null});

          if (this.options.helper === "original") {
            this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
          } else {
            this.currentItem.show();
          }

          //Post deactivating events to containers
          for (var i = this.containers.length - 1; i >= 0; i--) {
            this.containers[i]._trigger("deactivate", null, this._uiHash(this));
            if (this.containers[i].containerCache.over) {
              this.containers[i]._trigger("out", null, this._uiHash(this));
              this.containers[i].containerCache.over = 0;
            }
          }

        }

        if (this.placeholder) {
          //$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
          if (this.placeholder[0].parentNode) {
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
          }
          if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
            this.helper.remove();
          }

          $.extend(this, {
            helper: null,
            dragging: false,
            reverting: false,
            _noFinalSort: null
          });

          if (this.domPosition.prev) {
            $(this.domPosition.prev).after(this.currentItem);
          } else {
            $(this.domPosition.parent).prepend(this.currentItem);
          }
        }

        return this;

      },

      serialize: function (o) {

        var items = this._getItemsAsjQuery(o && o.connected),
          str = [];
        o = o || {};

        $(items).each(function () {
          var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));
          if (res) {
            str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
          }
        });

        if (!str.length && o.key) {
          str.push(o.key + "=");
        }

        return str.join("&");

      },

      toArray: function (o) {

        var items = this._getItemsAsjQuery(o && o.connected),
          ret = [];

        o = o || {};

        items.each(function () {
          ret.push($(o.item || this).attr(o.attribute || "id") || "");
        });
        return ret;

      },

      /* Be careful with the following core functions */
      _intersectsWith: function (item) {

        var x1 = this.positionAbs.left,
          x2 = x1 + this.helperProportions.width,
          y1 = this.positionAbs.top,
          y2 = y1 + this.helperProportions.height,
          l = item.left,
          r = l + item.width,
          t = item.top,
          b = t + item.height,
          dyClick = this.offset.click.top,
          dxClick = this.offset.click.left,
          isOverElementHeight = (this.options.axis === "x") || ((y1 + dyClick) > t && (y1 + dyClick) < b),
          isOverElementWidth = (this.options.axis === "y") || ((x1 + dxClick) > l && (x1 + dxClick) < r),
          isOverElement = isOverElementHeight && isOverElementWidth;

        if (this.options.tolerance === "pointer" ||
          this.options.forcePointerForContainers ||
          (this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])
        ) {
          return isOverElement;
        } else {

          return (l < x1 + (this.helperProportions.width / 2) && // Right Half
            x2 - (this.helperProportions.width / 2) < r && // Left Half
            t < y1 + (this.helperProportions.height / 2) && // Bottom Half
            y2 - (this.helperProportions.height / 2) < b); // Top Half

        }
      },

      _intersectsWithPointer: function (item) {

        var isOverElementHeight = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
          isOverElementWidth = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
          isOverElement = isOverElementHeight && isOverElementWidth,
          verticalDirection = this._getDragVerticalDirection(),
          horizontalDirection = this._getDragHorizontalDirection();

        if (!isOverElement) {
          return false;
        }

        return this.floating ?
          (((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1)
          : (verticalDirection && (verticalDirection === "down" ? 2 : 1));

      },

      _intersectsWithSides: function (item) {

        var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height / 2), item.height),
          isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width / 2), item.width),
          verticalDirection = this._getDragVerticalDirection(),
          horizontalDirection = this._getDragHorizontalDirection();

        if (this.floating && horizontalDirection) {
          return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));
        } else {
          return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));
        }

      },

      _getDragVerticalDirection: function () {
        var delta = this.positionAbs.top - this.lastPositionAbs.top;
        return delta !== 0 && (delta > 0 ? "down" : "up");
      },

      _getDragHorizontalDirection: function () {
        var delta = this.positionAbs.left - this.lastPositionAbs.left;
        return delta !== 0 && (delta > 0 ? "right" : "left");
      },

      refresh: function (event) {
        this._refreshItems(event);
        this._setHandleClassName();
        this.refreshPositions();
        return this;
      },

      _connectWith: function () {
        var options = this.options;
        return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
      },

      _getItemsAsjQuery: function (connected) {

        var i, j, cur, inst,
          items = [],
          queries = [],
          connectWith = this._connectWith();

        if (connectWith && connected) {
          for (i = connectWith.length - 1; i >= 0; i--) {
            cur = $(connectWith[i], this.document[0]);
            for (j = cur.length - 1; j >= 0; j--) {
              inst = $.data(cur[j], this.widgetFullName);
              if (inst && inst !== this && !inst.options.disabled) {
                queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
              }
            }
          }
        }

        queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
          options: this.options,
          item: this.currentItem
        }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

        function addItems() {
          items.push(this);
        }

        for (i = queries.length - 1; i >= 0; i--) {
          queries[i][0].each(addItems);
        }

        return $(items);

      },

      _removeCurrentsFromItems: function () {

        var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

        this.items = $.grep(this.items, function (item) {
          for (var j = 0; j < list.length; j++) {
            if (list[j] === item.item[0]) {
              return false;
            }
          }
          return true;
        });

      },

      _refreshItems: function (event) {

        this.items = [];
        this.containers = [this];

        var i, j, cur, inst, targetData, _queries, item, queriesLength,
          items = this.items,
          queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {item: this.currentItem}) : $(this.options.items, this.element), this]],
          connectWith = this._connectWith();

        if (connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
          for (i = connectWith.length - 1; i >= 0; i--) {
            cur = $(connectWith[i], this.document[0]);
            for (j = cur.length - 1; j >= 0; j--) {
              inst = $.data(cur[j], this.widgetFullName);
              if (inst && inst !== this && !inst.options.disabled) {
                queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {item: this.currentItem}) : $(inst.options.items, inst.element), inst]);
                this.containers.push(inst);
              }
            }
          }
        }

        for (i = queries.length - 1; i >= 0; i--) {
          targetData = queries[i][1];
          _queries = queries[i][0];

          for (j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
            item = $(_queries[j]);

            item.data(this.widgetName + "-item", targetData); // Data for target checking (mouse manager)

            items.push({
              item: item,
              instance: targetData,
              width: 0, height: 0,
              left: 0, top: 0
            });
          }
        }

      },

      refreshPositions: function (fast) {

        // Determine whether items are being displayed horizontally
        this.floating = this.items.length ?
          this.options.axis === "x" || this._isFloating(this.items[0].item) :
          false;

        //This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
        if (this.offsetParent && this.helper) {
          this.offset.parent = this._getParentOffset();
        }

        var i, item, t, p;

        for (i = this.items.length - 1; i >= 0; i--) {
          item = this.items[i];

          //We ignore calculating positions of all connected containers when we're not over them
          if (item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
            continue;
          }

          t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

          if (!fast) {
            item.width = t.outerWidth();
            item.height = t.outerHeight();
          }

          p = t.offset();
          item.left = p.left;
          item.top = p.top;
        }

        if (this.options.custom && this.options.custom.refreshContainers) {
          this.options.custom.refreshContainers.call(this);
        } else {
          for (i = this.containers.length - 1; i >= 0; i--) {
            p = this.containers[i].element.offset();
            this.containers[i].containerCache.left = p.left;
            this.containers[i].containerCache.top = p.top;
            this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
            this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
          }
        }

        return this;
      },

      _createPlaceholder: function (that) {
        that = that || this;
        var className,
          o = that.options;

        if (!o.placeholder || o.placeholder.constructor === String) {
          className = o.placeholder;
          o.placeholder = {
            element: function () {

              var nodeName = that.currentItem[0].nodeName.toLowerCase(),
                element = $("<" + nodeName + ">", that.document[0])
                  .addClass(className || that.currentItem[0].className + " ui-sortable-placeholder")
                  .removeClass("ui-sortable-helper");

              if (nodeName === "tbody") {
                that._createTrPlaceholder(
                  that.currentItem.find("tr").eq(0),
                  $("<tr>", that.document[0]).appendTo(element)
                );
              } else if (nodeName === "tr") {
                that._createTrPlaceholder(that.currentItem, element);
              } else if (nodeName === "img") {
                element.attr("src", that.currentItem.attr("src"));
              }

              if (!className) {
                element.css("visibility", "hidden");
              }

              return element;
            },
            update: function (container, p) {

              // 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
              // 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
              if (className && !o.forcePlaceholderSize) {
                return;
              }

              //If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
              if (!p.height()) {
                p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10));
              }
              if (!p.width()) {
                p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10));
              }
            }
          };
        }

        //Create the placeholder
        that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

        //Append it after the actual current item
        that.currentItem.after(that.placeholder);

        //Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
        o.placeholder.update(that, that.placeholder);

      },

      _createTrPlaceholder: function (sourceTr, targetTr) {
        var that = this;

        sourceTr.children().each(function () {
          $("<td>&#160;</td>", that.document[0])
            .attr("colspan", $(this).attr("colspan") || 1)
            .appendTo(targetTr);
        });
      },

      _contactContainers: function (event) {
        var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom, floating,
          axis,
          innermostContainer = null,
          innermostIndex = null;

        // get innermost container that intersects with item
        for (i = this.containers.length - 1; i >= 0; i--) {

          // never consider a container that's located within the item itself
          if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
            continue;
          }

          if (this._intersectsWith(this.containers[i].containerCache)) {

            // if we've already found a container and it's more "inner" than this, then continue
            if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
              continue;
            }

            innermostContainer = this.containers[i];
            innermostIndex = i;

          } else {
            // container doesn't intersect. trigger "out" event if necessary
            if (this.containers[i].containerCache.over) {
              this.containers[i]._trigger("out", event, this._uiHash(this));
              this.containers[i].containerCache.over = 0;
            }
          }

        }

        // if no intersecting containers found, return
        if (!innermostContainer) {
          return;
        }

        // move the item into the container if it's not there already
        if (this.containers.length === 1) {
          if (!this.containers[innermostIndex].containerCache.over) {
            this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
            this.containers[innermostIndex].containerCache.over = 1;
          }
        } else {

          //When entering a new container, we will find the item with the least distance and append our item near it
          dist = 10000;
          itemWithLeastDistance = null;
          floating = innermostContainer.floating || this._isFloating(this.currentItem);
          posProperty = floating ? "left" : "top";
          sizeProperty = floating ? "width" : "height";
          axis = floating ? "clientX" : "clientY";

          for (j = this.items.length - 1; j >= 0; j--) {
            if (!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
              continue;
            }
            if (this.items[j].item[0] === this.currentItem[0]) {
              continue;
            }

            cur = this.items[j].item.offset()[posProperty];
            nearBottom = false;
            if (event[axis] - cur > this.items[j][sizeProperty] / 2) {
              nearBottom = true;
            }

            if (Math.abs(event[axis] - cur) < dist) {
              dist = Math.abs(event[axis] - cur);
              itemWithLeastDistance = this.items[j];
              this.direction = nearBottom ? "up" : "down";
            }
          }

          //Check if dropOnEmpty is enabled
          if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
            return;
          }

          if (this.currentContainer === this.containers[innermostIndex]) {
            if (!this.currentContainer.containerCache.over) {
              this.containers[innermostIndex]._trigger("over", event, this._uiHash());
              this.currentContainer.containerCache.over = 1;
            }
            return;
          }

          itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
          this._trigger("change", event, this._uiHash());
          this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
          this.currentContainer = this.containers[innermostIndex];

          //Update the placeholder
          this.options.placeholder.update(this.currentContainer, this.placeholder);

          this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
          this.containers[innermostIndex].containerCache.over = 1;
        }


      },

      _createHelper: function (event) {

        var o = this.options,
          helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);

        //Add the helper to the DOM if that didn't happen already
        if (!helper.parents("body").length) {
          $(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
        }

        if (helper[0] === this.currentItem[0]) {
          this._storedCSS = {
            width: this.currentItem[0].style.width,
            height: this.currentItem[0].style.height,
            position: this.currentItem.css("position"),
            top: this.currentItem.css("top"),
            left: this.currentItem.css("left")
          };
        }

        if (!helper[0].style.width || o.forceHelperSize) {
          helper.width(this.currentItem.width());
        }
        if (!helper[0].style.height || o.forceHelperSize) {
          helper.height(this.currentItem.height());
        }

        return helper;

      },

      _adjustOffsetFromHelper: function (obj) {
        if (typeof obj === "string") {
          obj = obj.split(" ");
        }
        if ($.isArray(obj)) {
          obj = {left: +obj[0], top: +obj[1] || 0};
        }
        if ("left" in obj) {
          this.offset.click.left = obj.left + this.margins.left;
        }
        if ("right" in obj) {
          this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
        }
        if ("top" in obj) {
          this.offset.click.top = obj.top + this.margins.top;
        }
        if ("bottom" in obj) {
          this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
        }
      },

      _getParentOffset: function () {


        //Get the offsetParent and cache its position
        this.offsetParent = this.helper.offsetParent();
        var po = this.offsetParent.offset();

        // This is a special case where we need to modify a offset calculated on start, since the following happened:
        // 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
        // 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
        //    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
        if (this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) {
          po.left += this.scrollParent.scrollLeft();
          po.top += this.scrollParent.scrollTop();
        }

        // This needs to be actually done for all browsers, since pageX/pageY includes this information
        // with an ugly IE fix
        if (this.offsetParent[0] === this.document[0].body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
          po = {top: 0, left: 0};
        }

        return {
          top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
          left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
        };

      },

      _getRelativeOffset: function () {

        if (this.cssPosition === "relative") {
          var p = this.currentItem.position();
          return {
            top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
            left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
          };
        } else {
          return {top: 0, left: 0};
        }

      },

      _cacheMargins: function () {
        this.margins = {
          left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
          top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
        };
      },

      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        };
      },

      _setContainment: function () {

        var ce, co, over,
          o = this.options;
        if (o.containment === "parent") {
          o.containment = this.helper[0].parentNode;
        }
        if (o.containment === "document" || o.containment === "window") {
          this.containment = [
            0 - this.offset.relative.left - this.offset.parent.left,
            0 - this.offset.relative.top - this.offset.parent.top,
            o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left,
            (o.containment === "document" ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
          ];
        }

        if (!(/^(document|window|parent)$/).test(o.containment)) {
          ce = $(o.containment)[0];
          co = $(o.containment).offset();
          over = ($(ce).css("overflow") !== "hidden");

          this.containment = [
            co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left,
            co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top,
            co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left,
            co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top
          ];
        }

      },

      _convertPositionTo: function (d, pos) {

        if (!pos) {
          pos = this.position;
        }
        var mod = d === "absolute" ? 1 : -1,
          scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
          scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

        return {
          top: (
            pos.top +																// The absolute mouse position
            this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.parent.top * mod -											// The offsetParent's offset without borders (offset + border)
            ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())) * mod)
          ),
          left: (
            pos.left +																// The absolute mouse position
            this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.parent.left * mod -										// The offsetParent's offset without borders (offset + border)
            ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod)
          )
        };

      },

      _generatePosition: function (event) {

        var top, left,
          o = this.options,
          pageX = event.pageX,
          pageY = event.pageY,
          scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
          scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

        // This is another very weird special case that only happens for relative elements:
        // 1. If the css position is relative
        // 2. and the scroll parent is the document or similar to the offset parent
        // we have to refresh the relative offset during the scroll so there are no jumps
        if (this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
          this.offset.relative = this._getRelativeOffset();
        }

        /*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

        if (this.originalPosition) { //If we are not dragging yet, we won't check for options

          if (this.containment) {
            if (event.pageX - this.offset.click.left < this.containment[0]) {
              pageX = this.containment[0] + this.offset.click.left;
            }
            if (event.pageY - this.offset.click.top < this.containment[1]) {
              pageY = this.containment[1] + this.offset.click.top;
            }
            if (event.pageX - this.offset.click.left > this.containment[2]) {
              pageX = this.containment[2] + this.offset.click.left;
            }
            if (event.pageY - this.offset.click.top > this.containment[3]) {
              pageY = this.containment[3] + this.offset.click.top;
            }
          }

          if (o.grid) {
            top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
            pageY = this.containment ? ((top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

            left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
            pageX = this.containment ? ((left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
          }

        }

        return {
          top: (
            pageY -																// The absolute mouse position
            this.offset.click.top -													// Click offset (relative to the element)
            this.offset.relative.top -											// Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
            ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())))
          ),
          left: (
            pageX -																// The absolute mouse position
            this.offset.click.left -												// Click offset (relative to the element)
            this.offset.relative.left -											// Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
            ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()))
          )
        };

      },

      _rearrange: function (event, i, a, hardRefresh) {

        a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));

        //Various things done here to improve the performance:
        // 1. we create a setTimeout, that calls refreshPositions
        // 2. on the instance, we have a counter variable, that get's higher after every append
        // 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
        // 4. this lets only the last addition to the timeout stack through
        this.counter = this.counter ? ++this.counter : 1;
        var counter = this.counter;

        this._delay(function () {
          if (counter === this.counter) {
            this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
          }
        });

      },

      _clear: function (event, noPropagation) {

        this.reverting = false;
        // We delay all events that have to be triggered to after the point where the placeholder has been removed and
        // everything else normalized again
        var i,
          delayedTriggers = [];

        // We first have to update the dom position of the actual currentItem
        // Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
        if (!this._noFinalSort && this.currentItem.parent().length) {
          this.placeholder.before(this.currentItem);
        }
        this._noFinalSort = null;

        if (this.helper[0] === this.currentItem[0]) {
          for (i in this._storedCSS) {
            if (this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
              this._storedCSS[i] = "";
            }
          }
          this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
        } else {
          this.currentItem.show();
        }

        if (this.fromOutside && !noPropagation) {
          delayedTriggers.push(function (event) {
            this._trigger("receive", event, this._uiHash(this.fromOutside));
          });
        }
        if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
          delayedTriggers.push(function (event) {
            this._trigger("update", event, this._uiHash());
          }); //Trigger update callback if the DOM position has changed
        }

        // Check if the items Container has Changed and trigger appropriate
        // events.
        if (this !== this.currentContainer) {
          if (!noPropagation) {
            delayedTriggers.push(function (event) {
              this._trigger("remove", event, this._uiHash());
            });
            delayedTriggers.push((function (c) {
              return function (event) {
                c._trigger("receive", event, this._uiHash(this));
              };
            }).call(this, this.currentContainer));
            delayedTriggers.push((function (c) {
              return function (event) {
                c._trigger("update", event, this._uiHash(this));
              };
            }).call(this, this.currentContainer));
          }
        }


        //Post events to containers
        function delayEvent(type, instance, container) {
          return function (event) {
            container._trigger(type, event, instance._uiHash(instance));
          };
        }

        for (i = this.containers.length - 1; i >= 0; i--) {
          if (!noPropagation) {
            delayedTriggers.push(delayEvent("deactivate", this, this.containers[i]));
          }
          if (this.containers[i].containerCache.over) {
            delayedTriggers.push(delayEvent("out", this, this.containers[i]));
            this.containers[i].containerCache.over = 0;
          }
        }

        //Do what was originally in plugins
        if (this.storedCursor) {
          this.document.find("body").css("cursor", this.storedCursor);
          this.storedStylesheet.remove();
        }
        if (this._storedOpacity) {
          this.helper.css("opacity", this._storedOpacity);
        }
        if (this._storedZIndex) {
          this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
        }

        this.dragging = false;

        if (!noPropagation) {
          this._trigger("beforeStop", event, this._uiHash());
        }

        //$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
        this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

        if (!this.cancelHelperRemoval) {
          if (this.helper[0] !== this.currentItem[0]) {
            this.helper.remove();
          }
          this.helper = null;
        }

        if (!noPropagation) {
          for (i = 0; i < delayedTriggers.length; i++) {
            delayedTriggers[i].call(this, event);
          } //Trigger all delayed events
          this._trigger("stop", event, this._uiHash());
        }

        this.fromOutside = false;
        return !this.cancelHelperRemoval;

      },

      _trigger: function () {
        if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
          this.cancel();
        }
      },

      _uiHash: function (_inst) {
        var inst = _inst || this;
        return {
          helper: inst.helper,
          placeholder: inst.placeholder || $([]),
          position: inst.position,
          originalPosition: inst.originalPosition,
          offset: inst.positionAbs,
          item: inst.currentItem,
          sender: _inst ? _inst.element : null
        };
      }

    });


    /*!
 * jQuery UI Effects 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */


    var dataSpace = "ui-effects-",

      // Create a local jQuery because jQuery Color relies on it and the
      // global may not exist with AMD and a custom build (#10199)
      jQuery = $;

    $.effects = {
      effect: {}
    };

    /*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
    (function (jQuery, undefined) {

      var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

        // plusequals test for += 100 -= 100
        rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
        // a set of RE's that can match strings and generate color tuples.
        stringParsers = [{
          re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function (execResult) {
            return [
              execResult[1],
              execResult[2],
              execResult[3],
              execResult[4]
            ];
          }
        }, {
          re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function (execResult) {
            return [
              execResult[1] * 2.55,
              execResult[2] * 2.55,
              execResult[3] * 2.55,
              execResult[4]
            ];
          }
        }, {
          // this regex ignores A-F because it's compared against an already lowercased string
          re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
          parse: function (execResult) {
            return [
              parseInt(execResult[1], 16),
              parseInt(execResult[2], 16),
              parseInt(execResult[3], 16)
            ];
          }
        }, {
          // this regex ignores A-F because it's compared against an already lowercased string
          re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
          parse: function (execResult) {
            return [
              parseInt(execResult[1] + execResult[1], 16),
              parseInt(execResult[2] + execResult[2], 16),
              parseInt(execResult[3] + execResult[3], 16)
            ];
          }
        }, {
          re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          space: "hsla",
          parse: function (execResult) {
            return [
              execResult[1],
              execResult[2] / 100,
              execResult[3] / 100,
              execResult[4]
            ];
          }
        }],

        // jQuery.Color( )
        color = jQuery.Color = function (color, green, blue, alpha) {
          return new jQuery.Color.fn.parse(color, green, blue, alpha);
        },
        spaces = {
          rgba: {
            props: {
              red: {
                idx: 0,
                type: "byte"
              },
              green: {
                idx: 1,
                type: "byte"
              },
              blue: {
                idx: 2,
                type: "byte"
              }
            }
          },

          hsla: {
            props: {
              hue: {
                idx: 0,
                type: "degrees"
              },
              saturation: {
                idx: 1,
                type: "percent"
              },
              lightness: {
                idx: 2,
                type: "percent"
              }
            }
          }
        },
        propTypes = {
          "byte": {
            floor: true,
            max: 255
          },
          "percent": {
            max: 1
          },
          "degrees": {
            mod: 360,
            floor: true
          }
        },
        support = color.support = {},

        // element for support tests
        supportElem = jQuery("<p>")[0],

        // colors = jQuery.Color.names
        colors,

        // local aliases of functions called often
        each = jQuery.each;

// determine rgba support immediately
      supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
      support.rgba = supportElem.style.backgroundColor.indexOf("rgba") > -1;

// define cache name and alpha properties
// for rgba and hsla spaces
      each(spaces, function (spaceName, space) {
        space.cache = "_" + spaceName;
        space.props.alpha = {
          idx: 3,
          type: "percent",
          def: 1
        };
      });

      function clamp(value, prop, allowEmpty) {
        var type = propTypes[prop.type] || {};

        if (value == null) {
          return (allowEmpty || !prop.def) ? null : prop.def;
        }

        // ~~ is an short way of doing floor for positive numbers
        value = type.floor ? ~~value : parseFloat(value);

        // IE will pass in empty strings as value for alpha,
        // which will hit this case
        if (isNaN(value)) {
          return prop.def;
        }

        if (type.mod) {
          // we add mod before modding to make sure that negatives values
          // get converted properly: -10 -> 350
          return (value + type.mod) % type.mod;
        }

        // for now all property types without mod have min and max
        return 0 > value ? 0 : type.max < value ? type.max : value;
      }

      function stringParse(string) {
        var inst = color(),
          rgba = inst._rgba = [];

        string = string.toLowerCase();

        each(stringParsers, function (i, parser) {
          var parsed,
            match = parser.re.exec(string),
            values = match && parser.parse(match),
            spaceName = parser.space || "rgba";

          if (values) {
            parsed = inst[spaceName](values);

            // if this was an rgba parse the assignment might happen twice
            // oh well....
            inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];
            rgba = inst._rgba = parsed._rgba;

            // exit each( stringParsers ) here because we matched
            return false;
          }
        });

        // Found a stringParser that handled it
        if (rgba.length) {

          // if this came from a parsed string, force "transparent" when alpha is 0
          // chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
          if (rgba.join() === "0,0,0,0") {
            jQuery.extend(rgba, colors.transparent);
          }
          return inst;
        }

        // named colors
        return colors[string];
      }

      color.fn = jQuery.extend(color.prototype, {
        parse: function (red, green, blue, alpha) {
          if (red === undefined) {
            this._rgba = [null, null, null, null];
            return this;
          }
          if (red.jquery || red.nodeType) {
            red = jQuery(red).css(green);
            green = undefined;
          }

          var inst = this,
            type = jQuery.type(red),
            rgba = this._rgba = [];

          // more than 1 argument specified - assume ( red, green, blue, alpha )
          if (green !== undefined) {
            red = [red, green, blue, alpha];
            type = "array";
          }

          if (type === "string") {
            return this.parse(stringParse(red) || colors._default);
          }

          if (type === "array") {
            each(spaces.rgba.props, function (key, prop) {
              rgba[prop.idx] = clamp(red[prop.idx], prop);
            });
            return this;
          }

          if (type === "object") {
            if (red instanceof color) {
              each(spaces, function (spaceName, space) {
                if (red[space.cache]) {
                  inst[space.cache] = red[space.cache].slice();
                }
              });
            } else {
              each(spaces, function (spaceName, space) {
                var cache = space.cache;
                each(space.props, function (key, prop) {

                  // if the cache doesn't exist, and we know how to convert
                  if (!inst[cache] && space.to) {

                    // if the value was null, we don't need to copy it
                    // if the key was alpha, we don't need to copy it either
                    if (key === "alpha" || red[key] == null) {
                      return;
                    }
                    inst[cache] = space.to(inst._rgba);
                  }

                  // this is the only case where we allow nulls for ALL properties.
                  // call clamp with alwaysAllowEmpty
                  inst[cache][prop.idx] = clamp(red[key], prop, true);
                });

                // everything defined but alpha?
                if (inst[cache] && jQuery.inArray(null, inst[cache].slice(0, 3)) < 0) {
                  // use the default of 1
                  inst[cache][3] = 1;
                  if (space.from) {
                    inst._rgba = space.from(inst[cache]);
                  }
                }
              });
            }
            return this;
          }
        },
        is: function (compare) {
          var is = color(compare),
            same = true,
            inst = this;

          each(spaces, function (_, space) {
            var localCache,
              isCache = is[space.cache];
            if (isCache) {
              localCache = inst[space.cache] || space.to && space.to(inst._rgba) || [];
              each(space.props, function (_, prop) {
                if (isCache[prop.idx] != null) {
                  same = (isCache[prop.idx] === localCache[prop.idx]);
                  return same;
                }
              });
            }
            return same;
          });
          return same;
        },
        _space: function () {
          var used = [],
            inst = this;
          each(spaces, function (spaceName, space) {
            if (inst[space.cache]) {
              used.push(spaceName);
            }
          });
          return used.pop();
        },
        transition: function (other, distance) {
          var end = color(other),
            spaceName = end._space(),
            space = spaces[spaceName],
            startColor = this.alpha() === 0 ? color("transparent") : this,
            start = startColor[space.cache] || space.to(startColor._rgba),
            result = start.slice();

          end = end[space.cache];
          each(space.props, function (key, prop) {
            var index = prop.idx,
              startValue = start[index],
              endValue = end[index],
              type = propTypes[prop.type] || {};

            // if null, don't override start value
            if (endValue === null) {
              return;
            }
            // if null - use end
            if (startValue === null) {
              result[index] = endValue;
            } else {
              if (type.mod) {
                if (endValue - startValue > type.mod / 2) {
                  startValue += type.mod;
                } else if (startValue - endValue > type.mod / 2) {
                  startValue -= type.mod;
                }
              }
              result[index] = clamp((endValue - startValue) * distance + startValue, prop);
            }
          });
          return this[spaceName](result);
        },
        blend: function (opaque) {
          // if we are already opaque - return ourself
          if (this._rgba[3] === 1) {
            return this;
          }

          var rgb = this._rgba.slice(),
            a = rgb.pop(),
            blend = color(opaque)._rgba;

          return color(jQuery.map(rgb, function (v, i) {
            return (1 - a) * blend[i] + a * v;
          }));
        },
        toRgbaString: function () {
          var prefix = "rgba(",
            rgba = jQuery.map(this._rgba, function (v, i) {
              return v == null ? (i > 2 ? 1 : 0) : v;
            });

          if (rgba[3] === 1) {
            rgba.pop();
            prefix = "rgb(";
          }

          return prefix + rgba.join() + ")";
        },
        toHslaString: function () {
          var prefix = "hsla(",
            hsla = jQuery.map(this.hsla(), function (v, i) {
              if (v == null) {
                v = i > 2 ? 1 : 0;
              }

              // catch 1 and 2
              if (i && i < 3) {
                v = Math.round(v * 100) + "%";
              }
              return v;
            });

          if (hsla[3] === 1) {
            hsla.pop();
            prefix = "hsl(";
          }
          return prefix + hsla.join() + ")";
        },
        toHexString: function (includeAlpha) {
          var rgba = this._rgba.slice(),
            alpha = rgba.pop();

          if (includeAlpha) {
            rgba.push(~~(alpha * 255));
          }

          return "#" + jQuery.map(rgba, function (v) {

            // default to 0 when nulls exist
            v = (v || 0).toString(16);
            return v.length === 1 ? "0" + v : v;
          }).join("");
        },
        toString: function () {
          return this._rgba[3] === 0 ? "transparent" : this.toRgbaString();
        }
      });
      color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

      function hue2rgb(p, q, h) {
        h = (h + 1) % 1;
        if (h * 6 < 1) {
          return p + (q - p) * h * 6;
        }
        if (h * 2 < 1) {
          return q;
        }
        if (h * 3 < 2) {
          return p + (q - p) * ((2 / 3) - h) * 6;
        }
        return p;
      }

      spaces.hsla.to = function (rgba) {
        if (rgba[0] == null || rgba[1] == null || rgba[2] == null) {
          return [null, null, null, rgba[3]];
        }
        var r = rgba[0] / 255,
          g = rgba[1] / 255,
          b = rgba[2] / 255,
          a = rgba[3],
          max = Math.max(r, g, b),
          min = Math.min(r, g, b),
          diff = max - min,
          add = max + min,
          l = add * 0.5,
          h, s;

        if (min === max) {
          h = 0;
        } else if (r === max) {
          h = (60 * (g - b) / diff) + 360;
        } else if (g === max) {
          h = (60 * (b - r) / diff) + 120;
        } else {
          h = (60 * (r - g) / diff) + 240;
        }

        // chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
        // otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
        if (diff === 0) {
          s = 0;
        } else if (l <= 0.5) {
          s = diff / add;
        } else {
          s = diff / (2 - add);
        }
        return [Math.round(h) % 360, s, l, a == null ? 1 : a];
      };

      spaces.hsla.from = function (hsla) {
        if (hsla[0] == null || hsla[1] == null || hsla[2] == null) {
          return [null, null, null, hsla[3]];
        }
        var h = hsla[0] / 360,
          s = hsla[1],
          l = hsla[2],
          a = hsla[3],
          q = l <= 0.5 ? l * (1 + s) : l + s - l * s,
          p = 2 * l - q;

        return [
          Math.round(hue2rgb(p, q, h + (1 / 3)) * 255),
          Math.round(hue2rgb(p, q, h) * 255),
          Math.round(hue2rgb(p, q, h - (1 / 3)) * 255),
          a
        ];
      };

      each(spaces, function (spaceName, space) {
        var props = space.props,
          cache = space.cache,
          to = space.to,
          from = space.from;

        // makes rgba() and hsla()
        color.fn[spaceName] = function (value) {

          // generate a cache for this space if it doesn't exist
          if (to && !this[cache]) {
            this[cache] = to(this._rgba);
          }
          if (value === undefined) {
            return this[cache].slice();
          }

          var ret,
            type = jQuery.type(value),
            arr = (type === "array" || type === "object") ? value : arguments,
            local = this[cache].slice();

          each(props, function (key, prop) {
            var val = arr[type === "object" ? key : prop.idx];
            if (val == null) {
              val = local[prop.idx];
            }
            local[prop.idx] = clamp(val, prop);
          });

          if (from) {
            ret = color(from(local));
            ret[cache] = local;
            return ret;
          } else {
            return color(local);
          }
        };

        // makes red() green() blue() alpha() hue() saturation() lightness()
        each(props, function (key, prop) {
          // alpha is included in more than one space
          if (color.fn[key]) {
            return;
          }
          color.fn[key] = function (value) {
            var vtype = jQuery.type(value),
              fn = (key === "alpha" ? (this._hsla ? "hsla" : "rgba") : spaceName),
              local = this[fn](),
              cur = local[prop.idx],
              match;

            if (vtype === "undefined") {
              return cur;
            }

            if (vtype === "function") {
              value = value.call(this, cur);
              vtype = jQuery.type(value);
            }
            if (value == null && prop.empty) {
              return this;
            }
            if (vtype === "string") {
              match = rplusequals.exec(value);
              if (match) {
                value = cur + parseFloat(match[2]) * (match[1] === "+" ? 1 : -1);
              }
            }
            local[prop.idx] = value;
            return this[fn](local);
          };
        });
      });

// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
      color.hook = function (hook) {
        var hooks = hook.split(" ");
        each(hooks, function (i, hook) {
          jQuery.cssHooks[hook] = {
            set: function (elem, value) {
              var parsed, curElem,
                backgroundColor = "";

              if (value !== "transparent" && (jQuery.type(value) !== "string" || (parsed = stringParse(value)))) {
                value = color(parsed || value);
                if (!support.rgba && value._rgba[3] !== 1) {
                  curElem = hook === "backgroundColor" ? elem.parentNode : elem;
                  while (
                    (backgroundColor === "" || backgroundColor === "transparent") &&
                    curElem && curElem.style
                    ) {
                    try {
                      backgroundColor = jQuery.css(curElem, "backgroundColor");
                      curElem = curElem.parentNode;
                    } catch (e) {
                    }
                  }

                  value = value.blend(backgroundColor && backgroundColor !== "transparent" ?
                    backgroundColor :
                    "_default");
                }

                value = value.toRgbaString();
              }
              try {
                elem.style[hook] = value;
              } catch (e) {
                // wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
              }
            }
          };
          jQuery.fx.step[hook] = function (fx) {
            if (!fx.colorInit) {
              fx.start = color(fx.elem, hook);
              fx.end = color(fx.end);
              fx.colorInit = true;
            }
            jQuery.cssHooks[hook].set(fx.elem, fx.start.transition(fx.end, fx.pos));
          };
        });

      };

      color.hook(stepHooks);

      jQuery.cssHooks.borderColor = {
        expand: function (value) {
          var expanded = {};

          each(["Top", "Right", "Bottom", "Left"], function (i, part) {
            expanded["border" + part + "Color"] = value;
          });
          return expanded;
        }
      };

// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
      colors = jQuery.Color.names = {
        // 4.1. Basic color keywords
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",

        // 4.2.3. "transparent" color keyword
        transparent: [null, null, null, 0],

        _default: "#ffffff"
      };

    })(jQuery);

    /******************************************************************************/
    /****************************** CLASS ANIMATIONS ******************************/
    /******************************************************************************/
    (function () {

      var classAnimationActions = ["add", "remove", "toggle"],
        shorthandStyles = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1
        };

      $.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (_, prop) {
        $.fx.step[prop] = function (fx) {
          if (fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr) {
            jQuery.style(fx.elem, prop, fx.end);
            fx.setAttr = true;
          }
        };
      });

      function getElementStyles(elem) {
        var key, len,
          style = elem.ownerDocument.defaultView ?
            elem.ownerDocument.defaultView.getComputedStyle(elem, null) :
            elem.currentStyle,
          styles = {};

        if (style && style.length && style[0] && style[style[0]]) {
          len = style.length;
          while (len--) {
            key = style[len];
            if (typeof style[key] === "string") {
              styles[$.camelCase(key)] = style[key];
            }
          }
          // support: Opera, IE <9
        } else {
          for (key in style) {
            if (typeof style[key] === "string") {
              styles[key] = style[key];
            }
          }
        }

        return styles;
      }

      function styleDifference(oldStyle, newStyle) {
        var diff = {},
          name, value;

        for (name in newStyle) {
          value = newStyle[name];
          if (oldStyle[name] !== value) {
            if (!shorthandStyles[name]) {
              if ($.fx.step[name] || !isNaN(parseFloat(value))) {
                diff[name] = value;
              }
            }
          }
        }

        return diff;
      }

// support: jQuery <1.8
      if (!$.fn.addBack) {
        $.fn.addBack = function (selector) {
          return this.add(selector == null ?
            this.prevObject : this.prevObject.filter(selector)
          );
        };
      }

      $.effects.animateClass = function (value, duration, easing, callback) {
        var o = $.speed(duration, easing, callback);

        return this.queue(function () {
          var animated = $(this),
            baseClass = animated.attr("class") || "",
            applyClassChange,
            allAnimations = o.children ? animated.find("*").addBack() : animated;

          // map the animated objects to store the original styles.
          allAnimations = allAnimations.map(function () {
            var el = $(this);
            return {
              el: el,
              start: getElementStyles(this)
            };
          });

          // apply class change
          applyClassChange = function () {
            $.each(classAnimationActions, function (i, action) {
              if (value[action]) {
                animated[action + "Class"](value[action]);
              }
            });
          };
          applyClassChange();

          // map all animated objects again - calculate new styles and diff
          allAnimations = allAnimations.map(function () {
            this.end = getElementStyles(this.el[0]);
            this.diff = styleDifference(this.start, this.end);
            return this;
          });

          // apply original class
          animated.attr("class", baseClass);

          // map all animated objects again - this time collecting a promise
          allAnimations = allAnimations.map(function () {
            var styleInfo = this,
              dfd = $.Deferred(),
              opts = $.extend({}, o, {
                queue: false,
                complete: function () {
                  dfd.resolve(styleInfo);
                }
              });

            this.el.animate(this.diff, opts);
            return dfd.promise();
          });

          // once all animations have completed:
          $.when.apply($, allAnimations.get()).done(function () {

            // set the final class
            applyClassChange();

            // for each animated element,
            // clear all css properties that were animated
            $.each(arguments, function () {
              var el = this.el;
              $.each(this.diff, function (key) {
                el.css(key, "");
              });
            });

            // this is guarnteed to be there if you use jQuery.speed()
            // it also handles dequeuing the next anim...
            o.complete.call(animated[0]);
          });
        });
      };

      $.fn.extend({
        addClass: (function (orig) {
          return function (classNames, speed, easing, callback) {
            return speed ?
              $.effects.animateClass.call(this,
                {add: classNames}, speed, easing, callback) :
              orig.apply(this, arguments);
          };
        })($.fn.addClass),

        removeClass: (function (orig) {
          return function (classNames, speed, easing, callback) {
            return arguments.length > 1 ?
              $.effects.animateClass.call(this,
                {remove: classNames}, speed, easing, callback) :
              orig.apply(this, arguments);
          };
        })($.fn.removeClass),

        toggleClass: (function (orig) {
          return function (classNames, force, speed, easing, callback) {
            if (typeof force === "boolean" || force === undefined) {
              if (!speed) {
                // without speed parameter
                return orig.apply(this, arguments);
              } else {
                return $.effects.animateClass.call(this,
                  (force ? {add: classNames} : {remove: classNames}),
                  speed, easing, callback);
              }
            } else {
              // without force parameter
              return $.effects.animateClass.call(this,
                {toggle: classNames}, force, speed, easing);
            }
          };
        })($.fn.toggleClass),

        switchClass: function (remove, add, speed, easing, callback) {
          return $.effects.animateClass.call(this, {
            add: add,
            remove: remove
          }, speed, easing, callback);
        }
      });

    })();

    /******************************************************************************/
    /*********************************** EFFECTS **********************************/
    /******************************************************************************/

    (function () {

      $.extend($.effects, {
        version: "1.11.4",

        // Saves a set of properties in a data storage
        save: function (element, set) {
          for (var i = 0; i < set.length; i++) {
            if (set[i] !== null) {
              element.data(dataSpace + set[i], element[0].style[set[i]]);
            }
          }
        },

        // Restores a set of previously saved properties from a data storage
        restore: function (element, set) {
          var val, i;
          for (i = 0; i < set.length; i++) {
            if (set[i] !== null) {
              val = element.data(dataSpace + set[i]);
              // support: jQuery 1.6.2
              // http://bugs.jquery.com/ticket/9917
              // jQuery 1.6.2 incorrectly returns undefined for any falsy value.
              // We can't differentiate between "" and 0 here, so we just assume
              // empty string since it's likely to be a more common value...
              if (val === undefined) {
                val = "";
              }
              element.css(set[i], val);
            }
          }
        },

        setMode: function (el, mode) {
          if (mode === "toggle") {
            mode = el.is(":hidden") ? "show" : "hide";
          }
          return mode;
        },

        // Translates a [top,left] array into a baseline value
        // this should be a little more flexible in the future to handle a string & hash
        getBaseline: function (origin, original) {
          var y, x;
          switch (origin[0]) {
            case "top":
              y = 0;
              break;
            case "middle":
              y = 0.5;
              break;
            case "bottom":
              y = 1;
              break;
            default:
              y = origin[0] / original.height;
          }
          switch (origin[1]) {
            case "left":
              x = 0;
              break;
            case "center":
              x = 0.5;
              break;
            case "right":
              x = 1;
              break;
            default:
              x = origin[1] / original.width;
          }
          return {
            x: x,
            y: y
          };
        },

        // Wraps the element around a wrapper that copies position properties
        createWrapper: function (element) {

          // if the element is already wrapped, return it
          if (element.parent().is(".ui-effects-wrapper")) {
            return element.parent();
          }

          // wrap the element
          var props = {
              width: element.outerWidth(true),
              height: element.outerHeight(true),
              "float": element.css("float")
            },
            wrapper = $("<div></div>")
              .addClass("ui-effects-wrapper")
              .css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
              }),
            // Store the size in case width/height are defined in % - Fixes #5245
            size = {
              width: element.width(),
              height: element.height()
            },
            active = document.activeElement;

          // support: Firefox
          // Firefox incorrectly exposes anonymous content
          // https://bugzilla.mozilla.org/show_bug.cgi?id=561664
          try {
            active.id;
          } catch (e) {
            active = document.body;
          }

          element.wrap(wrapper);

          // Fixes #7595 - Elements lose focus when wrapped.
          if (element[0] === active || $.contains(element[0], active)) {
            $(active).focus();
          }

          wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually lose the reference to the wrapped element

          // transfer positioning properties to the wrapper
          if (element.css("position") === "static") {
            wrapper.css({position: "relative"});
            element.css({position: "relative"});
          } else {
            $.extend(props, {
              position: element.css("position"),
              zIndex: element.css("z-index")
            });
            $.each(["top", "left", "bottom", "right"], function (i, pos) {
              props[pos] = element.css(pos);
              if (isNaN(parseInt(props[pos], 10))) {
                props[pos] = "auto";
              }
            });
            element.css({
              position: "relative",
              top: 0,
              left: 0,
              right: "auto",
              bottom: "auto"
            });
          }
          element.css(size);

          return wrapper.css(props).show();
        },

        removeWrapper: function (element) {
          var active = document.activeElement;

          if (element.parent().is(".ui-effects-wrapper")) {
            element.parent().replaceWith(element);

            // Fixes #7595 - Elements lose focus when wrapped.
            if (element[0] === active || $.contains(element[0], active)) {
              $(active).focus();
            }
          }

          return element;
        },

        setTransition: function (element, list, factor, value) {
          value = value || {};
          $.each(list, function (i, x) {
            var unit = element.cssUnit(x);
            if (unit[0] > 0) {
              value[x] = unit[0] * factor + unit[1];
            }
          });
          return value;
        }
      });

// return an effect options object for the given parameters:
      function _normalizeArguments(effect, options, speed, callback) {

        // allow passing all options as the first parameter
        if ($.isPlainObject(effect)) {
          options = effect;
          effect = effect.effect;
        }

        // convert to an object
        effect = {effect: effect};

        // catch (effect, null, ...)
        if (options == null) {
          options = {};
        }

        // catch (effect, callback)
        if ($.isFunction(options)) {
          callback = options;
          speed = null;
          options = {};
        }

        // catch (effect, speed, ?)
        if (typeof options === "number" || $.fx.speeds[options]) {
          callback = speed;
          speed = options;
          options = {};
        }

        // catch (effect, options, callback)
        if ($.isFunction(speed)) {
          callback = speed;
          speed = null;
        }

        // add options to effect
        if (options) {
          $.extend(effect, options);
        }

        speed = speed || options.duration;
        effect.duration = $.fx.off ? 0 :
          typeof speed === "number" ? speed :
            speed in $.fx.speeds ? $.fx.speeds[speed] :
              $.fx.speeds._default;

        effect.complete = callback || options.complete;

        return effect;
      }

      function standardAnimationOption(option) {
        // Valid standard speeds (nothing, number, named speed)
        if (!option || typeof option === "number" || $.fx.speeds[option]) {
          return true;
        }

        // Invalid strings - treat as "normal" speed
        if (typeof option === "string" && !$.effects.effect[option]) {
          return true;
        }

        // Complete callback
        if ($.isFunction(option)) {
          return true;
        }

        // Options hash (but not naming an effect)
        if (typeof option === "object" && !option.effect) {
          return true;
        }

        // Didn't match any standard API
        return false;
      }

      $.fn.extend({
        effect: function ( /* effect, options, speed, callback */) {
          var args = _normalizeArguments.apply(this, arguments),
            mode = args.mode,
            queue = args.queue,
            effectMethod = $.effects.effect[args.effect];

          if ($.fx.off || !effectMethod) {
            // delegate to the original method (e.g., .show()) if possible
            if (mode) {
              return this[mode](args.duration, args.complete);
            } else {
              return this.each(function () {
                if (args.complete) {
                  args.complete.call(this);
                }
              });
            }
          }

          function run(next) {
            var elem = $(this),
              complete = args.complete,
              mode = args.mode;

            function done() {
              if ($.isFunction(complete)) {
                complete.call(elem[0]);
              }
              if ($.isFunction(next)) {
                next();
              }
            }

            // If the element already has the correct final state, delegate to
            // the core methods so the internal tracking of "olddisplay" works.
            if (elem.is(":hidden") ? mode === "hide" : mode === "show") {
              elem[mode]();
              done();
            } else {
              effectMethod.call(elem[0], args, done);
            }
          }

          return queue === false ? this.each(run) : this.queue(queue || "fx", run);
        },

        show: (function (orig) {
          return function (option) {
            if (standardAnimationOption(option)) {
              return orig.apply(this, arguments);
            } else {
              var args = _normalizeArguments.apply(this, arguments);
              args.mode = "show";
              return this.effect.call(this, args);
            }
          };
        })($.fn.show),

        hide: (function (orig) {
          return function (option) {
            if (standardAnimationOption(option)) {
              return orig.apply(this, arguments);
            } else {
              var args = _normalizeArguments.apply(this, arguments);
              args.mode = "hide";
              return this.effect.call(this, args);
            }
          };
        })($.fn.hide),

        toggle: (function (orig) {
          return function (option) {
            if (standardAnimationOption(option) || typeof option === "boolean") {
              return orig.apply(this, arguments);
            } else {
              var args = _normalizeArguments.apply(this, arguments);
              args.mode = "toggle";
              return this.effect.call(this, args);
            }
          };
        })($.fn.toggle),

        // helper functions
        cssUnit: function (key) {
          var style = this.css(key),
            val = [];

          $.each(["em", "px", "%", "pt"], function (i, unit) {
            if (style.indexOf(unit) > 0) {
              val = [parseFloat(style), unit];
            }
          });
          return val;
        }
      });

    })();

    /******************************************************************************/
    /*********************************** EASING ***********************************/
    /******************************************************************************/

    (function () {

// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

      var baseEasings = {};

      $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (i, name) {
        baseEasings[name] = function (p) {
          return Math.pow(p, i + 2);
        };
      });

      $.extend(baseEasings, {
        Sine: function (p) {
          return 1 - Math.cos(p * Math.PI / 2);
        },
        Circ: function (p) {
          return 1 - Math.sqrt(1 - p * p);
        },
        Elastic: function (p) {
          return p === 0 || p === 1 ? p :
            -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
        },
        Back: function (p) {
          return p * p * (3 * p - 2);
        },
        Bounce: function (p) {
          var pow2,
            bounce = 4;

          while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {
          }
          return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
        }
      });

      $.each(baseEasings, function (name, easeIn) {
        $.easing["easeIn" + name] = easeIn;
        $.easing["easeOut" + name] = function (p) {
          return 1 - easeIn(1 - p);
        };
        $.easing["easeInOut" + name] = function (p) {
          return p < 0.5 ?
            easeIn(p * 2) / 2 :
            1 - easeIn(p * -2 + 2) / 2;
        };
      });

    })();

    var effect = $.effects;


    /*!
 * jQuery UI Effects Slide 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slide-effect/
 */


    /*var effectSlide = $.effects.effect.slide = function( o, done ) {

	// Create element
	var el = $( this ),
		props = [ "position", "top", "bottom", "left", "right", "width", "height" ],
		mode = $.effects.setMode( el, o.mode || "show" ),
		show = mode === "show",
		direction = o.direction || "left",
		ref = (direction === "up" || direction === "down") ? "top" : "left",
		positiveMotion = (direction === "up" || direction === "left"),
		distance,
		animation = {};

	// Adjust
	$.effects.save( el, props );
	el.show();
	distance = o.distance || el[ ref === "top" ? "outerHeight" : "outerWidth" ]( true );

	$.effects.createWrapper( el ).css({
		overflow: "hidden"
	});

	if ( show ) {
		el.css( ref, positiveMotion ? (isNaN(distance) ? "-" + distance : -distance) : distance );
	}

	// Animation
	animation[ ref ] = ( show ?
		( positiveMotion ? "+=" : "-=") :
		( positiveMotion ? "-=" : "+=")) +
		distance;

	// Animate
	el.animate( animation, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: function() {
			if ( mode === "hide" ) {
				el.hide();
			}
			$.effects.restore( el, props );
			$.effects.removeWrapper( el );
			done();
		}
	});
};
*/


  }));
  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.15.0
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
        (global.Popper = factory());
  }(this, (function () {


    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    var timeoutDuration = 0;
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        timeoutDuration = 1;
        break;
      }
    }

    function microtaskDebounce(fn) {
      var called = false;
      return function () {
        if (called) {
          return;
        }
        called = true;
        window.Promise.resolve().then(function () {
          called = false;
          fn();
        });
      };
    }

    function taskDebounce(fn) {
      var scheduled = false;
      return function () {
        if (!scheduled) {
          scheduled = true;
          setTimeout(function () {
            scheduled = false;
            fn();
          }, timeoutDuration);
        }
      };
    }

    var supportsMicroTasks = isBrowser && window.Promise;

    /**
     * Create a debounced version of a method, that's asynchronously deferred
     * but called in the minimum time possible.
     *
     * @method
     * @memberof Popper.Utils
     * @argument {Function} fn
     * @returns {Function}
     */
    var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

    /**
     * Check if the given variable is a function
     * @method
     * @memberof Popper.Utils
     * @argument {Any} functionToCheck - variable to check
     * @returns {Boolean} answer to: is a function?
     */
    function isFunction(functionToCheck) {
      var getType = {};
      return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    /**
     * Get CSS computed property of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Eement} element
     * @argument {String} property
     */
    function getStyleComputedProperty(element, property) {
      if (element.nodeType !== 1) {
        return [];
      }
      // NOTE: 1 DOM access here
      var window = element.ownerDocument.defaultView;
      var css = window.getComputedStyle(element, null);
      return property ? css[property] : css;
    }

    /**
     * Returns the parentNode or the host of the element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} parent
     */
    function getParentNode(element) {
      if (element.nodeName === 'HTML') {
        return element;
      }
      return element.parentNode || element.host;
    }

    /**
     * Returns the scrolling parent of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} scroll parent
     */
    function getScrollParent(element) {
      // Return body, `getScroll` will take care to get the correct `scrollTop` from it
      if (!element) {
        return document.body;
      }

      switch (element.nodeName) {
        case 'HTML':
        case 'BODY':
          return element.ownerDocument.body;
        case '#document':
          return element.body;
      }

      // Firefox want us to check `-x` and `-y` variations as well

      var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

      if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
        return element;
      }

      return getScrollParent(getParentNode(element));
    }

    var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
    var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

    /**
     * Determines if the browser is Internet Explorer
     * @method
     * @memberof Popper.Utils
     * @param {Number} version to check
     * @returns {Boolean} isIE
     */
    function isIE(version) {
      if (version === 11) {
        return isIE11;
      }
      if (version === 10) {
        return isIE10;
      }
      return isIE11 || isIE10;
    }

    /**
     * Returns the offset parent of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} offset parent
     */
    function getOffsetParent(element) {
      if (!element) {
        return document.documentElement;
      }

      var noOffsetParent = isIE(10) ? document.body : null;

      // NOTE: 1 DOM access here
      var offsetParent = element.offsetParent || null;
      // Skip hidden elements which don't have an offsetParent
      while (offsetParent === noOffsetParent && element.nextElementSibling) {
        offsetParent = (element = element.nextElementSibling).offsetParent;
      }

      var nodeName = offsetParent && offsetParent.nodeName;

      if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
        return element ? element.ownerDocument.documentElement : document.documentElement;
      }

      // .offsetParent will return the closest TH, TD or TABLE in case
      // no offsetParent is present, I hate this job...
      if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
        return getOffsetParent(offsetParent);
      }

      return offsetParent;
    }

    function isOffsetContainer(element) {
      var nodeName = element.nodeName;

      if (nodeName === 'BODY') {
        return false;
      }
      return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
    }

    /**
     * Finds the root node (document, shadowDOM root) of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} node
     * @returns {Element} root node
     */
    function getRoot(node) {
      if (node.parentNode !== null) {
        return getRoot(node.parentNode);
      }

      return node;
    }

    /**
     * Finds the offset parent common to the two provided nodes
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element1
     * @argument {Element} element2
     * @returns {Element} common offset parent
     */
    function findCommonOffsetParent(element1, element2) {
      // This check is needed to avoid errors in case one of the elements isn't defined for any reason
      if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
        return document.documentElement;
      }

      // Here we make sure to give as "start" the element that comes first in the DOM
      var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
      var start = order ? element1 : element2;
      var end = order ? element2 : element1;

      // Get common ancestor container
      var range = document.createRange();
      range.setStart(start, 0);
      range.setEnd(end, 0);
      var commonAncestorContainer = range.commonAncestorContainer;

      // Both nodes are inside #document

      if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
        if (isOffsetContainer(commonAncestorContainer)) {
          return commonAncestorContainer;
        }

        return getOffsetParent(commonAncestorContainer);
      }

      // one of the nodes is inside shadowDOM, find which one
      var element1root = getRoot(element1);
      if (element1root.host) {
        return findCommonOffsetParent(element1root.host, element2);
      } else {
        return findCommonOffsetParent(element1, getRoot(element2).host);
      }
    }

    /**
     * Gets the scroll value of the given element in the given side (top and left)
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @argument {String} side `top` or `left`
     * @returns {number} amount of scrolled pixels
     */
    function getScroll(element) {
      var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

      var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
      var nodeName = element.nodeName;

      if (nodeName === 'BODY' || nodeName === 'HTML') {
        var html = element.ownerDocument.documentElement;
        var scrollingElement = element.ownerDocument.scrollingElement || html;
        return scrollingElement[upperSide];
      }

      return element[upperSide];
    }

    /*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
    function includeScroll(rect, element) {
      var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      var modifier = subtract ? -1 : 1;
      rect.top += scrollTop * modifier;
      rect.bottom += scrollTop * modifier;
      rect.left += scrollLeft * modifier;
      rect.right += scrollLeft * modifier;
      return rect;
    }

    /*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

    function getBordersSize(styles, axis) {
      var sideA = axis === 'x' ? 'Left' : 'Top';
      var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

      return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
    }

    function getSize(axis, body, html, computedStyle) {
      return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
    }

    function getWindowSizes(document) {
      var body = document.body;
      var html = document.documentElement;
      var computedStyle = isIE(10) && getComputedStyle(html);

      return {
        height: getSize('Height', body, html, computedStyle),
        width: getSize('Width', body, html, computedStyle)
      };
    }

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();


    var defineProperty = function (obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    };

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /**
     * Given element offsets, generate an output similar to getBoundingClientRect
     * @method
     * @memberof Popper.Utils
     * @argument {Object} offsets
     * @returns {Object} ClientRect like output
     */
    function getClientRect(offsets) {
      return _extends({}, offsets, {
        right: offsets.left + offsets.width,
        bottom: offsets.top + offsets.height
      });
    }

    /**
     * Get bounding client rect of given element
     * @method
     * @memberof Popper.Utils
     * @param {HTMLElement} element
     * @return {Object} client rect
     */
    function getBoundingClientRect(element) {
      var rect = {};

      // IE10 10 FIX: Please, don't ask, the element isn't
      // considered in DOM in some circumstances...
      // This isn't reproducible in IE10 compatibility mode of IE11
      try {
        if (isIE(10)) {
          rect = element.getBoundingClientRect();
          var scrollTop = getScroll(element, 'top');
          var scrollLeft = getScroll(element, 'left');
          rect.top += scrollTop;
          rect.left += scrollLeft;
          rect.bottom += scrollTop;
          rect.right += scrollLeft;
        } else {
          rect = element.getBoundingClientRect();
        }
      } catch (e) {
      }

      var result = {
        left: rect.left,
        top: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };

      // subtract scrollbar size from sizes
      var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
      var width = sizes.width || element.clientWidth || result.right - result.left;
      var height = sizes.height || element.clientHeight || result.bottom - result.top;

      var horizScrollbar = element.offsetWidth - width;
      var vertScrollbar = element.offsetHeight - height;

      // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
      // we make this check conditional for performance reasons
      if (horizScrollbar || vertScrollbar) {
        var styles = getStyleComputedProperty(element);
        horizScrollbar -= getBordersSize(styles, 'x');
        vertScrollbar -= getBordersSize(styles, 'y');

        result.width -= horizScrollbar;
        result.height -= vertScrollbar;
      }

      return getClientRect(result);
    }

    function getOffsetRectRelativeToArbitraryNode(children, parent) {
      var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var isIE10 = isIE(10);
      var isHTML = parent.nodeName === 'HTML';
      var childrenRect = getBoundingClientRect(children);
      var parentRect = getBoundingClientRect(parent);
      var scrollParent = getScrollParent(children);

      var styles = getStyleComputedProperty(parent);
      var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
      var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

      // In cases where the parent is fixed, we must ignore negative scroll in offset calc
      if (fixedPosition && isHTML) {
        parentRect.top = Math.max(parentRect.top, 0);
        parentRect.left = Math.max(parentRect.left, 0);
      }
      var offsets = getClientRect({
        top: childrenRect.top - parentRect.top - borderTopWidth,
        left: childrenRect.left - parentRect.left - borderLeftWidth,
        width: childrenRect.width,
        height: childrenRect.height
      });
      offsets.marginTop = 0;
      offsets.marginLeft = 0;

      // Subtract margins of documentElement in case it's being used as parent
      // we do this only on HTML because it's the only element that behaves
      // differently when margins are applied to it. The margins are included in
      // the box of the documentElement, in the other cases not.
      if (!isIE10 && isHTML) {
        var marginTop = parseFloat(styles.marginTop, 10);
        var marginLeft = parseFloat(styles.marginLeft, 10);

        offsets.top -= borderTopWidth - marginTop;
        offsets.bottom -= borderTopWidth - marginTop;
        offsets.left -= borderLeftWidth - marginLeft;
        offsets.right -= borderLeftWidth - marginLeft;

        // Attach marginTop and marginLeft because in some circumstances we may need them
        offsets.marginTop = marginTop;
        offsets.marginLeft = marginLeft;
      }

      if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
        offsets = includeScroll(offsets, parent);
      }

      return offsets;
    }

    function getViewportOffsetRectRelativeToArtbitraryNode(element) {
      var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var html = element.ownerDocument.documentElement;
      var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
      var width = Math.max(html.clientWidth, window.innerWidth || 0);
      var height = Math.max(html.clientHeight, window.innerHeight || 0);

      var scrollTop = !excludeScroll ? getScroll(html) : 0;
      var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

      var offset = {
        top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
        left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
        width: width,
        height: height
      };

      return getClientRect(offset);
    }

    /**
     * Check if the given element is fixed or is inside a fixed parent
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @argument {Element} customContainer
     * @returns {Boolean} answer to "isFixed?"
     */
    function isFixed(element) {
      var nodeName = element.nodeName;
      if (nodeName === 'BODY' || nodeName === 'HTML') {
        return false;
      }
      if (getStyleComputedProperty(element, 'position') === 'fixed') {
        return true;
      }
      var parentNode = getParentNode(element);
      if (!parentNode) {
        return false;
      }
      return isFixed(parentNode);
    }

    /**
     * Finds the first parent of an element that has a transformed property defined
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} first transformed parent or documentElement
     */

    function getFixedPositionOffsetParent(element) {
      // This check is needed to avoid errors in case one of the elements isn't defined for any reason
      if (!element || !element.parentElement || isIE()) {
        return document.documentElement;
      }
      var el = element.parentElement;
      while (el && getStyleComputedProperty(el, 'transform') === 'none') {
        el = el.parentElement;
      }
      return el || document.documentElement;
    }

    /**
     * Computed the boundaries limits and return them
     * @method
     * @memberof Popper.Utils
     * @param {HTMLElement} popper
     * @param {HTMLElement} reference
     * @param {number} padding
     * @param {HTMLElement} boundariesElement - Element used to define the boundaries
     * @param {Boolean} fixedPosition - Is in fixed position mode
     * @returns {Object} Coordinates of the boundaries
     */
    function getBoundaries(popper, reference, padding, boundariesElement) {
      var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      // NOTE: 1 DOM access here

      var boundaries = {top: 0, left: 0};
      var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

      // Handle viewport case
      if (boundariesElement === 'viewport') {
        boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
      } else {
        // Handle other cases based on DOM element used as boundaries
        var boundariesNode = void 0;
        if (boundariesElement === 'scrollParent') {
          boundariesNode = getScrollParent(getParentNode(reference));
          if (boundariesNode.nodeName === 'BODY') {
            boundariesNode = popper.ownerDocument.documentElement;
          }
        } else if (boundariesElement === 'window') {
          boundariesNode = popper.ownerDocument.documentElement;
        } else {
          boundariesNode = boundariesElement;
        }

        var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

        // In case of HTML, we need a different computation
        if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
          var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

          boundaries.top += offsets.top - offsets.marginTop;
          boundaries.bottom = height + offsets.top;
          boundaries.left += offsets.left - offsets.marginLeft;
          boundaries.right = width + offsets.left;
        } else {
          // for all the other DOM elements, this one is good
          boundaries = offsets;
        }
      }

      // Add paddings
      padding = padding || 0;
      var isPaddingNumber = typeof padding === 'number';
      boundaries.left += isPaddingNumber ? padding : padding.left || 0;
      boundaries.top += isPaddingNumber ? padding : padding.top || 0;
      boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
      boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

      return boundaries;
    }

    function getArea(_ref) {
      var width = _ref.width,
        height = _ref.height;

      return width * height;
    }

    /**
     * Utility used to transform the `auto` placement to the placement with more
     * available space.
     * @method
     * @memberof Popper.Utils
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
      var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

      if (placement.indexOf('auto') === -1) {
        return placement;
      }

      var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

      var rects = {
        top: {
          width: boundaries.width,
          height: refRect.top - boundaries.top
        },
        right: {
          width: boundaries.right - refRect.right,
          height: boundaries.height
        },
        bottom: {
          width: boundaries.width,
          height: boundaries.bottom - refRect.bottom
        },
        left: {
          width: refRect.left - boundaries.left,
          height: boundaries.height
        }
      };

      var sortedAreas = Object.keys(rects).map(function (key) {
        return _extends({
          key: key
        }, rects[key], {
          area: getArea(rects[key])
        });
      }).sort(function (a, b) {
        return b.area - a.area;
      });

      var filteredAreas = sortedAreas.filter(function (_ref2) {
        var width = _ref2.width,
          height = _ref2.height;
        return width >= popper.clientWidth && height >= popper.clientHeight;
      });

      var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

      var variation = placement.split('-')[1];

      return computedPlacement + (variation ? '-' + variation : '');
    }

    /**
     * Get offsets to the reference element
     * @method
     * @memberof Popper.Utils
     * @param {Object} state
     * @param {Element} popper - the popper element
     * @param {Element} reference - the reference element (the popper will be relative to this)
     * @param {Element} fixedPosition - is in fixed position mode
     * @returns {Object} An object containing the offsets which will be applied to the popper
     */
    function getReferenceOffsets(state, popper, reference) {
      var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
      return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
    }

    /**
     * Get the outer sizes of the given element (offset size + margins)
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Object} object containing width and height properties
     */
    function getOuterSizes(element) {
      var window = element.ownerDocument.defaultView;
      var styles = window.getComputedStyle(element);
      var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
      var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
      var result = {
        width: element.offsetWidth + y,
        height: element.offsetHeight + x
      };
      return result;
    }

    /**
     * Get the opposite placement of the given one
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement
     * @returns {String} flipped placement
     */
    function getOppositePlacement(placement) {
      var hash = {left: 'right', right: 'left', bottom: 'top', top: 'bottom'};
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash[matched];
      });
    }

    /**
     * Get offsets to the popper
     * @method
     * @memberof Popper.Utils
     * @param {Object} position - CSS position the Popper will get applied
     * @param {HTMLElement} popper - the popper element
     * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
     * @param {String} placement - one of the valid placement options
     * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
     */
    function getPopperOffsets(popper, referenceOffsets, placement) {
      placement = placement.split('-')[0];

      // Get popper node sizes
      var popperRect = getOuterSizes(popper);

      // Add position, width and height to our offsets object
      var popperOffsets = {
        width: popperRect.width,
        height: popperRect.height
      };

      // depending by the popper placement we have to compute its offsets slightly differently
      var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
      var mainSide = isHoriz ? 'top' : 'left';
      var secondarySide = isHoriz ? 'left' : 'top';
      var measurement = isHoriz ? 'height' : 'width';
      var secondaryMeasurement = !isHoriz ? 'height' : 'width';

      popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
      if (placement === secondarySide) {
        popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
      } else {
        popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
      }

      return popperOffsets;
    }

    /**
     * Mimics the `find` method of Array
     * @method
     * @memberof Popper.Utils
     * @argument {Array} arr
     * @argument prop
     * @argument value
     * @returns index or -1
     */

    function find(arr, check) {
      // use native find if supported
      if (Array.prototype.find) {
        return arr.find(check);
      }

      // use `filter` to obtain the same behavior of `find`
      return arr.filter(check)[0];
    }

    /**
     * Return the index of the matching object
     * @method
     * @memberof Popper.Utils
     * @argument {Array} arr
     * @argument prop
     * @argument value
     * @returns index or -1
     */
    function findIndex(arr, prop, value) {
      // use native findIndex if supported
      if (Array.prototype.findIndex) {
        return arr.findIndex(function (cur) {
          return cur[prop] === value;
        });
      }

      // use `find` + `indexOf` if `findIndex` isn't supported
      var match = find(arr, function (obj) {
        return obj[prop] === value;
      });
      return arr.indexOf(match);
    }

    /**
     * Loop trough the list of modifiers and run them in order,
     * each of them will then edit the data object.
     * @method
     * @memberof Popper.Utils
     * @param {dataObject} data
     * @param {Array} modifiers
     * @param {String} ends - Optional modifier name used as stopper
     * @returns {dataObject}
     */
    function runModifiers(modifiers, data, ends) {
      var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

      modifiersToRun.forEach(function (modifier) {
        if (modifier['function']) {
          // eslint-disable-line dot-notation
          console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
        }
        var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
        if (modifier.enabled && isFunction(fn)) {
          // Add properties to offsets to make them a complete clientRect object
          // we do this before each modifier to make sure the previous one doesn't
          // mess with these values
          data.offsets.popper = getClientRect(data.offsets.popper);
          data.offsets.reference = getClientRect(data.offsets.reference);

          data = fn(data, modifier);
        }
      });

      return data;
    }

    /**
     * Updates the position of the popper, computing the new offsets and applying
     * the new style.<br />
     * Prefer `scheduleUpdate` over `update` because of performance reasons.
     * @method
     * @memberof Popper
     */
    function update() {
      // if popper is destroyed, don't perform any further update
      if (this.state.isDestroyed) {
        return;
      }

      var data = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: false,
        offsets: {}
      };

      // compute reference element offsets
      data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

      // compute auto placement, store placement inside the data object,
      // modifiers will be able to edit `placement` if needed
      // and refer to originalPlacement to know the original value
      data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

      // store the computed placement inside `originalPlacement`
      data.originalPlacement = data.placement;

      data.positionFixed = this.options.positionFixed;

      // compute the popper offsets
      data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

      data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

      // run the modifiers
      data = runModifiers(this.modifiers, data);

      // the first `update` will call `onCreate` callback
      // the other ones will call `onUpdate` callback
      if (!this.state.isCreated) {
        this.state.isCreated = true;
        this.options.onCreate(data);
      } else {
        this.options.onUpdate(data);
      }
    }

    /**
     * Helper used to know if the given modifier is enabled.
     * @method
     * @memberof Popper.Utils
     * @returns {Boolean}
     */
    function isModifierEnabled(modifiers, modifierName) {
      return modifiers.some(function (_ref) {
        var name = _ref.name,
          enabled = _ref.enabled;
        return enabled && name === modifierName;
      });
    }

    /**
     * Get the prefixed supported property name
     * @method
     * @memberof Popper.Utils
     * @argument {String} property (camelCase)
     * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
     */
    function getSupportedPropertyName(property) {
      var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
      var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

      for (var i = 0; i < prefixes.length; i++) {
        var prefix = prefixes[i];
        var toCheck = prefix ? '' + prefix + upperProp : property;
        if (typeof document.body.style[toCheck] !== 'undefined') {
          return toCheck;
        }
      }
      return null;
    }

    /**
     * Destroys the popper.
     * @method
     * @memberof Popper
     */
    function destroy() {
      this.state.isDestroyed = true;

      // touch DOM only if `applyStyle` modifier is enabled
      if (isModifierEnabled(this.modifiers, 'applyStyle')) {
        this.popper.removeAttribute('x-placement');
        this.popper.style.position = '';
        this.popper.style.top = '';
        this.popper.style.left = '';
        this.popper.style.right = '';
        this.popper.style.bottom = '';
        this.popper.style.willChange = '';
        this.popper.style[getSupportedPropertyName('transform')] = '';
      }

      this.disableEventListeners();

      // remove the popper if user explicity asked for the deletion on destroy
      // do not use `remove` because IE11 doesn't support it
      if (this.options.removeOnDestroy) {
        this.popper.parentNode.removeChild(this.popper);
      }
      return this;
    }

    /**
     * Get the window associated with the element
     * @argument {Element} element
     * @returns {Window}
     */
    function getWindow(element) {
      var ownerDocument = element.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView : window;
    }

    function attachToScrollParents(scrollParent, event, callback, scrollParents) {
      var isBody = scrollParent.nodeName === 'BODY';
      var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
      target.addEventListener(event, callback, {passive: true});

      if (!isBody) {
        attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
      }
      scrollParents.push(target);
    }

    /**
     * Setup needed event listeners used to update the popper position
     * @method
     * @memberof Popper.Utils
     * @private
     */
    function setupEventListeners(reference, options, state, updateBound) {
      // Resize event listener on window
      state.updateBound = updateBound;
      getWindow(reference).addEventListener('resize', state.updateBound, {passive: true});

      // Scroll event listener on scroll parents
      var scrollElement = getScrollParent(reference);
      attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
      state.scrollElement = scrollElement;
      state.eventsEnabled = true;

      return state;
    }

    /**
     * It will add resize/scroll events and start recalculating
     * position of the popper element when they are triggered.
     * @method
     * @memberof Popper
     */
    function enableEventListeners() {
      if (!this.state.eventsEnabled) {
        this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
      }
    }

    /**
     * Remove event listeners used to update the popper position
     * @method
     * @memberof Popper.Utils
     * @private
     */
    function removeEventListeners(reference, state) {
      // Remove resize event listener on window
      getWindow(reference).removeEventListener('resize', state.updateBound);

      // Remove scroll event listener on scroll parents
      state.scrollParents.forEach(function (target) {
        target.removeEventListener('scroll', state.updateBound);
      });

      // Reset state
      state.updateBound = null;
      state.scrollParents = [];
      state.scrollElement = null;
      state.eventsEnabled = false;
      return state;
    }

    /**
     * It will remove resize/scroll events and won't recalculate popper position
     * when they are triggered. It also won't trigger `onUpdate` callback anymore,
     * unless you call `update` method manually.
     * @method
     * @memberof Popper
     */
    function disableEventListeners() {
      if (this.state.eventsEnabled) {
        cancelAnimationFrame(this.scheduleUpdate);
        this.state = removeEventListeners(this.reference, this.state);
      }
    }

    /**
     * Tells if a given input is a number
     * @method
     * @memberof Popper.Utils
     * @param {*} input to check
     * @return {Boolean}
     */
    function isNumeric(n) {
      return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Set the style to the given popper
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element - Element to apply the style to
     * @argument {Object} styles
     * Object with a list of properties and values which will be applied to the element
     */
    function setStyles(element, styles) {
      Object.keys(styles).forEach(function (prop) {
        var unit = '';
        // add unit if the value is numeric and is one of the following
        if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
          unit = 'px';
        }
        element.style[prop] = styles[prop] + unit;
      });
    }

    /**
     * Set the attributes to the given popper
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element - Element to apply the attributes to
     * @argument {Object} styles
     * Object with a list of properties and values which will be applied to the element
     */
    function setAttributes(element, attributes) {
      Object.keys(attributes).forEach(function (prop) {
        var value = attributes[prop];
        if (value !== false) {
          element.setAttribute(prop, attributes[prop]);
        } else {
          element.removeAttribute(prop);
        }
      });
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} data.styles - List of style properties - values to apply to popper element
     * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The same data object
     */
    function applyStyle(data) {
      // any property present in `data.styles` will be applied to the popper,
      // in this way we can make the 3rd party modifiers add custom styles to it
      // Be aware, modifiers could override the properties defined in the previous
      // lines of this modifier!
      setStyles(data.instance.popper, data.styles);

      // any property present in `data.attributes` will be applied to the popper,
      // they will be set as HTML attributes of the element
      setAttributes(data.instance.popper, data.attributes);

      // if arrowElement is defined and arrowStyles has some properties
      if (data.arrowElement && Object.keys(data.arrowStyles).length) {
        setStyles(data.arrowElement, data.arrowStyles);
      }

      return data;
    }

    /**
     * Set the x-placement attribute before everything else because it could be used
     * to add margins to the popper margins needs to be calculated to get the
     * correct popper offsets.
     * @method
     * @memberof Popper.modifiers
     * @param {HTMLElement} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as popper
     * @param {Object} options - Popper.js options
     */
    function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
      // compute reference element offsets
      var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

      // compute auto placement, store placement inside the data object,
      // modifiers will be able to edit `placement` if needed
      // and refer to originalPlacement to know the original value
      var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

      popper.setAttribute('x-placement', placement);

      // Apply `position` to popper before anything else because
      // without the position applied we can't guarantee correct computations
      setStyles(popper, {position: options.positionFixed ? 'fixed' : 'absolute'});

      return options;
    }

    /**
     * @function
     * @memberof Popper.Utils
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Boolean} shouldRound - If the offsets should be rounded at all
     * @returns {Object} The popper's position offsets rounded
     *
     * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
     * good as it can be within reason.
     * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
     *
     * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
     * as well on High DPI screens).
     *
     * Firefox prefers no rounding for positioning and does not have blurriness on
     * high DPI screens.
     *
     * Only horizontal placement and left/right values need to be considered.
     */
    function getRoundedOffsets(data, shouldRound) {
      var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
      var round = Math.round,
        floor = Math.floor;

      var noRound = function noRound(v) {
        return v;
      };

      var referenceWidth = round(reference.width);
      var popperWidth = round(popper.width);

      var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
      var isVariation = data.placement.indexOf('-') !== -1;
      var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
      var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

      var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
      var verticalToInteger = !shouldRound ? noRound : round;

      return {
        left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
        top: verticalToInteger(popper.top),
        bottom: verticalToInteger(popper.bottom),
        right: horizontalToInteger(popper.right)
      };
    }

    var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function computeStyle(data, options) {
      var x = options.x,
        y = options.y;
      var popper = data.offsets.popper;

      // Remove this legacy support in Popper.js v2

      var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
        return modifier.name === 'applyStyle';
      }).gpuAcceleration;
      if (legacyGpuAccelerationOption !== undefined) {
        console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
      }
      var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

      var offsetParent = getOffsetParent(data.instance.popper);
      var offsetParentRect = getBoundingClientRect(offsetParent);

      // Styles
      var styles = {
        position: popper.position
      };

      var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

      var sideA = x === 'bottom' ? 'top' : 'bottom';
      var sideB = y === 'right' ? 'left' : 'right';

      // if gpuAcceleration is set to `true` and transform is supported,
      //  we use `translate3d` to apply the position to the popper we
      // automatically use the supported prefixed version if needed
      var prefixedProperty = getSupportedPropertyName('transform');

      // now, let's make a step back and look at this code closely (wtf?)
      // If the content of the popper grows once it's been positioned, it
      // may happen that the popper gets misplaced because of the new content
      // overflowing its reference element
      // To avoid this problem, we provide two options (x and y), which allow
      // the consumer to define the offset origin.
      // If we position a popper on top of a reference element, we can set
      // `x` to `top` to make the popper grow towards its top instead of
      // its bottom.
      var left = void 0,
        top = void 0;
      if (sideA === 'bottom') {
        // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
        // and not the bottom of the html element
        if (offsetParent.nodeName === 'HTML') {
          top = -offsetParent.clientHeight + offsets.bottom;
        } else {
          top = -offsetParentRect.height + offsets.bottom;
        }
      } else {
        top = offsets.top;
      }
      if (sideB === 'right') {
        if (offsetParent.nodeName === 'HTML') {
          left = -offsetParent.clientWidth + offsets.right;
        } else {
          left = -offsetParentRect.width + offsets.right;
        }
      } else {
        left = offsets.left;
      }
      if (gpuAcceleration && prefixedProperty) {
        styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
        styles[sideA] = 0;
        styles[sideB] = 0;
        styles.willChange = 'transform';
      } else {
        // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
        var invertTop = sideA === 'bottom' ? -1 : 1;
        var invertLeft = sideB === 'right' ? -1 : 1;
        styles[sideA] = top * invertTop;
        styles[sideB] = left * invertLeft;
        styles.willChange = sideA + ', ' + sideB;
      }

      // Attributes
      var attributes = {
        'x-placement': data.placement
      };

      // Update `data` attributes, styles and arrowStyles
      data.attributes = _extends({}, attributes, data.attributes);
      data.styles = _extends({}, styles, data.styles);
      data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

      return data;
    }

    /**
     * Helper used to know if the given modifier depends from another one.<br />
     * It checks if the needed modifier is listed and enabled.
     * @method
     * @memberof Popper.Utils
     * @param {Array} modifiers - list of modifiers
     * @param {String} requestingName - name of requesting modifier
     * @param {String} requestedName - name of requested modifier
     * @returns {Boolean}
     */
    function isModifierRequired(modifiers, requestingName, requestedName) {
      var requesting = find(modifiers, function (_ref) {
        var name = _ref.name;
        return name === requestingName;
      });

      var isRequired = !!requesting && modifiers.some(function (modifier) {
        return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
      });

      if (!isRequired) {
        var _requesting = '`' + requestingName + '`';
        var requested = '`' + requestedName + '`';
        console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
      }
      return isRequired;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function arrow(data, options) {
      var _data$offsets$arrow;

      // arrow depends on keepTogether in order to work
      if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
        return data;
      }

      var arrowElement = options.element;

      // if arrowElement is a string, suppose it's a CSS selector
      if (typeof arrowElement === 'string') {
        arrowElement = data.instance.popper.querySelector(arrowElement);

        // if arrowElement is not found, don't run the modifier
        if (!arrowElement) {
          return data;
        }
      } else {
        // if the arrowElement isn't a query selector we must check that the
        // provided DOM node is child of its popper node
        if (!data.instance.popper.contains(arrowElement)) {
          console.warn('WARNING: `arrow.element` must be child of its popper element!');
          return data;
        }
      }

      var placement = data.placement.split('-')[0];
      var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

      var isVertical = ['left', 'right'].indexOf(placement) !== -1;

      var len = isVertical ? 'height' : 'width';
      var sideCapitalized = isVertical ? 'Top' : 'Left';
      var side = sideCapitalized.toLowerCase();
      var altSide = isVertical ? 'left' : 'top';
      var opSide = isVertical ? 'bottom' : 'right';
      var arrowElementSize = getOuterSizes(arrowElement)[len];

      //
      // extends keepTogether behavior making sure the popper and its
      // reference have enough pixels in conjunction
      //

      // top/left side
      if (reference[opSide] - arrowElementSize < popper[side]) {
        data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
      }
      // bottom/right side
      if (reference[side] + arrowElementSize > popper[opSide]) {
        data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
      }
      data.offsets.popper = getClientRect(data.offsets.popper);

      // compute center of the popper
      var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

      // Compute the sideValue using the updated popper offsets
      // take popper margin in account because we don't have this info available
      var css = getStyleComputedProperty(data.instance.popper);
      var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
      var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
      var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

      // prevent arrowElement from being placed not contiguously to its popper
      sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

      data.arrowElement = arrowElement;
      data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

      return data;
    }

    /**
     * Get the opposite placement variation of the given one
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement variation
     * @returns {String} flipped placement variation
     */
    function getOppositeVariation(variation) {
      if (variation === 'end') {
        return 'start';
      } else if (variation === 'start') {
        return 'end';
      }
      return variation;
    }

    /**
     * List of accepted placements to use as values of the `placement` option.<br />
     * Valid placements are:
     * - `auto`
     * - `top`
     * - `right`
     * - `bottom`
     * - `left`
     *
     * Each placement can have a variation from this list:
     * - `-start`
     * - `-end`
     *
     * Variations are interpreted easily if you think of them as the left to right
     * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
     * is right.<br />
     * Vertically (`left` and `right`), `start` is top and `end` is bottom.
     *
     * Some valid examples are:
     * - `top-end` (on top of reference, right aligned)
     * - `right-start` (on right of reference, top aligned)
     * - `bottom` (on bottom, centered)
     * - `auto-end` (on the side with more space available, alignment depends by placement)
     *
     * @static
     * @type {Array}
     * @enum {String}
     * @readonly
     * @method placements
     * @memberof Popper
     */
    var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
    var validPlacements = placements.slice(3);

    /**
     * Given an initial placement, returns all the subsequent placements
     * clockwise (or counter-clockwise).
     *
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement - A valid placement (it accepts variations)
     * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
     * @returns {Array} placements including their variations
     */
    function clockwise(placement) {
      var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var index = validPlacements.indexOf(placement);
      var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
      return counter ? arr.reverse() : arr;
    }

    var BEHAVIORS = {
      FLIP: 'flip',
      CLOCKWISE: 'clockwise',
      COUNTERCLOCKWISE: 'counterclockwise'
    };

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function flip(data, options) {
      // if `inner` modifier is enabled, we can't use the `flip` modifier
      if (isModifierEnabled(data.instance.modifiers, 'inner')) {
        return data;
      }

      if (data.flipped && data.placement === data.originalPlacement) {
        // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
        return data;
      }

      var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

      var placement = data.placement.split('-')[0];
      var placementOpposite = getOppositePlacement(placement);
      var variation = data.placement.split('-')[1] || '';

      var flipOrder = [];

      switch (options.behavior) {
        case BEHAVIORS.FLIP:
          flipOrder = [placement, placementOpposite];
          break;
        case BEHAVIORS.CLOCKWISE:
          flipOrder = clockwise(placement);
          break;
        case BEHAVIORS.COUNTERCLOCKWISE:
          flipOrder = clockwise(placement, true);
          break;
        default:
          flipOrder = options.behavior;
      }

      flipOrder.forEach(function (step, index) {
        if (placement !== step || flipOrder.length === index + 1) {
          return data;
        }

        placement = data.placement.split('-')[0];
        placementOpposite = getOppositePlacement(placement);

        var popperOffsets = data.offsets.popper;
        var refOffsets = data.offsets.reference;

        // using floor because the reference offsets may contain decimals we are not going to consider here
        var floor = Math.floor;
        var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

        var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
        var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
        var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
        var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

        var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

        // flip the variation if required
        var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

        // flips variation if reference element overflows boundaries
        var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

        // flips variation if popper content overflows boundaries
        var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

        var flippedVariation = flippedVariationByRef || flippedVariationByContent;

        if (overlapsRef || overflowsBoundaries || flippedVariation) {
          // this boolean to detect any flip loop
          data.flipped = true;

          if (overlapsRef || overflowsBoundaries) {
            placement = flipOrder[index + 1];
          }

          if (flippedVariation) {
            variation = getOppositeVariation(variation);
          }

          data.placement = placement + (variation ? '-' + variation : '');

          // this object contains `position`, we want to preserve it along with
          // any additional property we may add in the future
          data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

          data = runModifiers(data.instance.modifiers, data, 'flip');
        }
      });
      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function keepTogether(data) {
      var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

      var placement = data.placement.split('-')[0];
      var floor = Math.floor;
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var side = isVertical ? 'right' : 'bottom';
      var opSide = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      if (popper[side] < floor(reference[opSide])) {
        data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
      }
      if (popper[opSide] > floor(reference[side])) {
        data.offsets.popper[opSide] = floor(reference[side]);
      }

      return data;
    }

    /**
     * Converts a string containing value + unit into a px value number
     * @function
     * @memberof {modifiers~offset}
     * @private
     * @argument {String} str - Value + unit string
     * @argument {String} measurement - `height` or `width`
     * @argument {Object} popperOffsets
     * @argument {Object} referenceOffsets
     * @returns {Number|String}
     * Value in pixels, or original string if no values were extracted
     */
    function toValue(str, measurement, popperOffsets, referenceOffsets) {
      // separate value from unit
      var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
      var value = +split[1];
      var unit = split[2];

      // If it's not a number it's an operator, I guess
      if (!value) {
        return str;
      }

      if (unit.indexOf('%') === 0) {
        var element = void 0;
        switch (unit) {
          case '%p':
            element = popperOffsets;
            break;
          case '%':
          case '%r':
          default:
            element = referenceOffsets;
        }

        var rect = getClientRect(element);
        return rect[measurement] / 100 * value;
      } else if (unit === 'vh' || unit === 'vw') {
        // if is a vh or vw, we calculate the size based on the viewport
        var size = void 0;
        if (unit === 'vh') {
          size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        } else {
          size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }
        return size / 100 * value;
      } else {
        // if is an explicit pixel unit, we get rid of the unit and keep the value
        // if is an implicit unit, it's px, and we return just the value
        return value;
      }
    }

    /**
     * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
     * @function
     * @memberof {modifiers~offset}
     * @private
     * @argument {String} offset
     * @argument {Object} popperOffsets
     * @argument {Object} referenceOffsets
     * @argument {String} basePlacement
     * @returns {Array} a two cells array with x and y offsets in numbers
     */
    function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
      var offsets = [0, 0];

      // Use height if placement is left or right and index is 0 otherwise use width
      // in this way the first offset will use an axis and the second one
      // will use the other one
      var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

      // Split the offset string to obtain a list of values and operands
      // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
      var fragments = offset.split(/(\+|\-)/).map(function (frag) {
        return frag.trim();
      });

      // Detect if the offset string contains a pair of values or a single one
      // they could be separated by comma or space
      var divider = fragments.indexOf(find(fragments, function (frag) {
        return frag.search(/,|\s/) !== -1;
      }));

      if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
        console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
      }

      // If divider is found, we divide the list of values and operands to divide
      // them by ofset X and Y.
      var splitRegex = /\s*,\s*|\s+/;
      var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

      // Convert the values with units to absolute pixels to allow our computations
      ops = ops.map(function (op, index) {
        // Most of the units rely on the orientation of the popper
        var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
        var mergeWithPrevious = false;
        return op
          // This aggregates any `+` or `-` sign that aren't considered operators
          // e.g.: 10 + +5 => [10, +, +5]
          .reduce(function (a, b) {
            if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
              a[a.length - 1] = b;
              mergeWithPrevious = true;
              return a;
            } else if (mergeWithPrevious) {
              a[a.length - 1] += b;
              mergeWithPrevious = false;
              return a;
            } else {
              return a.concat(b);
            }
          }, [])
          // Here we convert the string values into number values (in px)
          .map(function (str) {
            return toValue(str, measurement, popperOffsets, referenceOffsets);
          });
      });

      // Loop trough the offsets arrays and execute the operations
      ops.forEach(function (op, index) {
        op.forEach(function (frag, index2) {
          if (isNumeric(frag)) {
            offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
          }
        });
      });
      return offsets;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @argument {Number|String} options.offset=0
     * The offset value as described in the modifier description
     * @returns {Object} The data object, properly modified
     */
    function offset(data, _ref) {
      var offset = _ref.offset;
      var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

      var basePlacement = placement.split('-')[0];

      var offsets = void 0;
      if (isNumeric(+offset)) {
        offsets = [+offset, 0];
      } else {
        offsets = parseOffset(offset, popper, reference, basePlacement);
      }

      if (basePlacement === 'left') {
        popper.top += offsets[0];
        popper.left -= offsets[1];
      } else if (basePlacement === 'right') {
        popper.top += offsets[0];
        popper.left += offsets[1];
      } else if (basePlacement === 'top') {
        popper.left += offsets[0];
        popper.top -= offsets[1];
      } else if (basePlacement === 'bottom') {
        popper.left += offsets[0];
        popper.top += offsets[1];
      }

      data.popper = popper;
      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function preventOverflow(data, options) {
      var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

      // If offsetParent is the reference element, we really want to
      // go one step up and use the next offsetParent as reference to
      // avoid to make this modifier completely useless and look like broken
      if (data.instance.reference === boundariesElement) {
        boundariesElement = getOffsetParent(boundariesElement);
      }

      // NOTE: DOM access here
      // resets the popper's position so that the document size can be calculated excluding
      // the size of the popper element itself
      var transformProp = getSupportedPropertyName('transform');
      var popperStyles = data.instance.popper.style; // assignment to help minification
      var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

      popperStyles.top = '';
      popperStyles.left = '';
      popperStyles[transformProp] = '';

      var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

      // NOTE: DOM access here
      // restores the original style properties after the offsets have been computed
      popperStyles.top = top;
      popperStyles.left = left;
      popperStyles[transformProp] = transform;

      options.boundaries = boundaries;

      var order = options.priority;
      var popper = data.offsets.popper;

      var check = {
        primary: function primary(placement) {
          var value = popper[placement];
          if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
            value = Math.max(popper[placement], boundaries[placement]);
          }
          return defineProperty({}, placement, value);
        },
        secondary: function secondary(placement) {
          var mainSide = placement === 'right' ? 'left' : 'top';
          var value = popper[mainSide];
          if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
            value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
          }
          return defineProperty({}, mainSide, value);
        }
      };

      order.forEach(function (placement) {
        var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
        popper = _extends({}, popper, check[side](placement));
      });

      data.offsets.popper = popper;

      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function shift(data) {
      var placement = data.placement;
      var basePlacement = placement.split('-')[0];
      var shiftvariation = placement.split('-')[1];

      // if shift shiftvariation is specified, run the modifier
      if (shiftvariation) {
        var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

        var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
        var side = isVertical ? 'left' : 'top';
        var measurement = isVertical ? 'width' : 'height';

        var shiftOffsets = {
          start: defineProperty({}, side, reference[side]),
          end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
        };

        data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
      }

      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function hide(data) {
      if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
        return data;
      }

      var refRect = data.offsets.reference;
      var bound = find(data.instance.modifiers, function (modifier) {
        return modifier.name === 'preventOverflow';
      }).boundaries;

      if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (data.hide === true) {
          return data;
        }

        data.hide = true;
        data.attributes['x-out-of-boundaries'] = '';
      } else {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (data.hide === false) {
          return data;
        }

        data.hide = false;
        data.attributes['x-out-of-boundaries'] = false;
      }

      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function inner(data) {
      var placement = data.placement;
      var basePlacement = placement.split('-')[0];
      var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

      var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

      var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

      popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

      data.placement = getOppositePlacement(placement);
      data.offsets.popper = getClientRect(popper);

      return data;
    }

    /**
     * Modifier function, each modifier can have a function of this type assigned
     * to its `fn` property.<br />
     * These functions will be called on each update, this means that you must
     * make sure they are performant enough to avoid performance bottlenecks.
     *
     * @function ModifierFn
     * @argument {dataObject} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {dataObject} The data object, properly modified
     */

    /**
     * Modifiers are plugins used to alter the behavior of your poppers.<br />
     * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
     * needed by the library.
     *
     * Usually you don't want to override the `order`, `fn` and `onLoad` props.
     * All the other properties are configurations that could be tweaked.
     * @namespace modifiers
     */
    var modifiers = {
      /**
       * Modifier used to shift the popper on the start or end of its reference
       * element.<br />
       * It will read the variation of the `placement` property.<br />
       * It can be one either `-end` or `-start`.
       * @memberof modifiers
       * @inner
       */
      shift: {
        /** @prop {number} order=100 - Index used to define the order of execution */
        order: 100,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: shift
      },

      /**
       * The `offset` modifier can shift your popper on both its axis.
       *
       * It accepts the following units:
       * - `px` or unit-less, interpreted as pixels
       * - `%` or `%r`, percentage relative to the length of the reference element
       * - `%p`, percentage relative to the length of the popper element
       * - `vw`, CSS viewport width unit
       * - `vh`, CSS viewport height unit
       *
       * For length is intended the main axis relative to the placement of the popper.<br />
       * This means that if the placement is `top` or `bottom`, the length will be the
       * `width`. In case of `left` or `right`, it will be the `height`.
       *
       * You can provide a single value (as `Number` or `String`), or a pair of values
       * as `String` divided by a comma or one (or more) white spaces.<br />
       * The latter is a deprecated method because it leads to confusion and will be
       * removed in v2.<br />
       * Additionally, it accepts additions and subtractions between different units.
       * Note that multiplications and divisions aren't supported.
       *
       * Valid examples are:
       * ```
       * 10
       * '10%'
       * '10, 10'
       * '10%, 10'
       * '10 + 10%'
       * '10 - 5vh + 3%'
       * '-10px + 5vh, 5px - 6%'
       * ```
       * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
       * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
       * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
       *
       * @memberof modifiers
       * @inner
       */
      offset: {
        /** @prop {number} order=200 - Index used to define the order of execution */
        order: 200,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: offset,
        /** @prop {Number|String} offset=0
         * The offset value as described in the modifier description
         */
        offset: 0
      },

      /**
       * Modifier used to prevent the popper from being positioned outside the boundary.
       *
       * A scenario exists where the reference itself is not within the boundaries.<br />
       * We can say it has "escaped the boundaries" — or just "escaped".<br />
       * In this case we need to decide whether the popper should either:
       *
       * - detach from the reference and remain "trapped" in the boundaries, or
       * - if it should ignore the boundary and "escape with its reference"
       *
       * When `escapeWithReference` is set to`true` and reference is completely
       * outside its boundaries, the popper will overflow (or completely leave)
       * the boundaries in order to remain attached to the edge of the reference.
       *
       * @memberof modifiers
       * @inner
       */
      preventOverflow: {
        /** @prop {number} order=300 - Index used to define the order of execution */
        order: 300,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: preventOverflow,
        /**
         * @prop {Array} [priority=['left','right','top','bottom']]
         * Popper will try to prevent overflow following these priorities by default,
         * then, it could overflow on the left and on top of the `boundariesElement`
         */
        priority: ['left', 'right', 'top', 'bottom'],
        /**
         * @prop {number} padding=5
         * Amount of pixel used to define a minimum distance between the boundaries
         * and the popper. This makes sure the popper always has a little padding
         * between the edges of its container
         */
        padding: 5,
        /**
         * @prop {String|HTMLElement} boundariesElement='scrollParent'
         * Boundaries used by the modifier. Can be `scrollParent`, `window`,
         * `viewport` or any DOM element.
         */
        boundariesElement: 'scrollParent'
      },

      /**
       * Modifier used to make sure the reference and its popper stay near each other
       * without leaving any gap between the two. Especially useful when the arrow is
       * enabled and you want to ensure that it points to its reference element.
       * It cares only about the first axis. You can still have poppers with margin
       * between the popper and its reference element.
       * @memberof modifiers
       * @inner
       */
      keepTogether: {
        /** @prop {number} order=400 - Index used to define the order of execution */
        order: 400,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: keepTogether
      },

      /**
       * This modifier is used to move the `arrowElement` of the popper to make
       * sure it is positioned between the reference element and its popper element.
       * It will read the outer size of the `arrowElement` node to detect how many
       * pixels of conjunction are needed.
       *
       * It has no effect if no `arrowElement` is provided.
       * @memberof modifiers
       * @inner
       */
      arrow: {
        /** @prop {number} order=500 - Index used to define the order of execution */
        order: 500,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: arrow,
        /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
        element: '[x-arrow]'
      },

      /**
       * Modifier used to flip the popper's placement when it starts to overlap its
       * reference element.
       *
       * Requires the `preventOverflow` modifier before it in order to work.
       *
       * **NOTE:** this modifier will interrupt the current update cycle and will
       * restart it if it detects the need to flip the placement.
       * @memberof modifiers
       * @inner
       */
      flip: {
        /** @prop {number} order=600 - Index used to define the order of execution */
        order: 600,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: flip,
        /**
         * @prop {String|Array} behavior='flip'
         * The behavior used to change the popper's placement. It can be one of
         * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
         * placements (with optional variations)
         */
        behavior: 'flip',
        /**
         * @prop {number} padding=5
         * The popper will flip if it hits the edges of the `boundariesElement`
         */
        padding: 5,
        /**
         * @prop {String|HTMLElement} boundariesElement='viewport'
         * The element which will define the boundaries of the popper position.
         * The popper will never be placed outside of the defined boundaries
         * (except if `keepTogether` is enabled)
         */
        boundariesElement: 'viewport',
        /**
         * @prop {Boolean} flipVariations=false
         * The popper will switch placement variation between `-start` and `-end` when
         * the reference element overlaps its boundaries.
         *
         * The original placement should have a set variation.
         */
        flipVariations: false,
        /**
         * @prop {Boolean} flipVariationsByContent=false
         * The popper will switch placement variation between `-start` and `-end` when
         * the popper element overlaps its reference boundaries.
         *
         * The original placement should have a set variation.
         */
        flipVariationsByContent: false
      },

      /**
       * Modifier used to make the popper flow toward the inner of the reference element.
       * By default, when this modifier is disabled, the popper will be placed outside
       * the reference element.
       * @memberof modifiers
       * @inner
       */
      inner: {
        /** @prop {number} order=700 - Index used to define the order of execution */
        order: 700,
        /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
        enabled: false,
        /** @prop {ModifierFn} */
        fn: inner
      },

      /**
       * Modifier used to hide the popper when its reference element is outside of the
       * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
       * be used to hide with a CSS selector the popper when its reference is
       * out of boundaries.
       *
       * Requires the `preventOverflow` modifier before it in order to work.
       * @memberof modifiers
       * @inner
       */
      hide: {
        /** @prop {number} order=800 - Index used to define the order of execution */
        order: 800,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: hide
      },

      /**
       * Computes the style that will be applied to the popper element to gets
       * properly positioned.
       *
       * Note that this modifier will not touch the DOM, it just prepares the styles
       * so that `applyStyle` modifier can apply it. This separation is useful
       * in case you need to replace `applyStyle` with a custom implementation.
       *
       * This modifier has `850` as `order` value to maintain backward compatibility
       * with previous versions of Popper.js. Expect the modifiers ordering method
       * to change in future major versions of the library.
       *
       * @memberof modifiers
       * @inner
       */
      computeStyle: {
        /** @prop {number} order=850 - Index used to define the order of execution */
        order: 850,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: computeStyle,
        /**
         * @prop {Boolean} gpuAcceleration=true
         * If true, it uses the CSS 3D transformation to position the popper.
         * Otherwise, it will use the `top` and `left` properties
         */
        gpuAcceleration: true,
        /**
         * @prop {string} [x='bottom']
         * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
         * Change this if your popper should grow in a direction different from `bottom`
         */
        x: 'bottom',
        /**
         * @prop {string} [x='left']
         * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
         * Change this if your popper should grow in a direction different from `right`
         */
        y: 'right'
      },

      /**
       * Applies the computed styles to the popper element.
       *
       * All the DOM manipulations are limited to this modifier. This is useful in case
       * you want to integrate Popper.js inside a framework or view library and you
       * want to delegate all the DOM manipulations to it.
       *
       * Note that if you disable this modifier, you must make sure the popper element
       * has its position set to `absolute` before Popper.js can do its work!
       *
       * Just disable this modifier and define your own to achieve the desired effect.
       *
       * @memberof modifiers
       * @inner
       */
      applyStyle: {
        /** @prop {number} order=900 - Index used to define the order of execution */
        order: 900,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: applyStyle,
        /** @prop {Function} */
        onLoad: applyStyleOnLoad,
        /**
         * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
         * @prop {Boolean} gpuAcceleration=true
         * If true, it uses the CSS 3D transformation to position the popper.
         * Otherwise, it will use the `top` and `left` properties
         */
        gpuAcceleration: undefined
      }
    };

    /**
     * The `dataObject` is an object containing all the information used by Popper.js.
     * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
     * @name dataObject
     * @property {Object} data.instance The Popper.js instance
     * @property {String} data.placement Placement applied to popper
     * @property {String} data.originalPlacement Placement originally defined on init
     * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
     * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
     * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
     * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
     * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
     * @property {Object} data.boundaries Offsets of the popper boundaries
     * @property {Object} data.offsets The measurements of popper, reference and arrow elements
     * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
     * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
     * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
     */

    /**
     * Default options provided to Popper.js constructor.<br />
     * These can be overridden using the `options` argument of Popper.js.<br />
     * To override an option, simply pass an object with the same
     * structure of the `options` object, as the 3rd argument. For example:
     * ```
     * new Popper(ref, pop, {
     *   modifiers: {
     *     preventOverflow: { enabled: false }
     *   }
     * })
     * ```
     * @type {Object}
     * @static
     * @memberof Popper
     */
    var Defaults = {
      /**
       * Popper's placement.
       * @prop {Popper.placements} placement='bottom'
       */
      placement: 'bottom',

      /**
       * Set this to true if you want popper to position it self in 'fixed' mode
       * @prop {Boolean} positionFixed=false
       */
      positionFixed: false,

      /**
       * Whether events (resize, scroll) are initially enabled.
       * @prop {Boolean} eventsEnabled=true
       */
      eventsEnabled: true,

      /**
       * Set to true if you want to automatically remove the popper when
       * you call the `destroy` method.
       * @prop {Boolean} removeOnDestroy=false
       */
      removeOnDestroy: false,

      /**
       * Callback called when the popper is created.<br />
       * By default, it is set to no-op.<br />
       * Access Popper.js instance with `data.instance`.
       * @prop {onCreate}
       */
      onCreate: function onCreate() {
      },

      /**
       * Callback called when the popper is updated. This callback is not called
       * on the initialization/creation of the popper, but only on subsequent
       * updates.<br />
       * By default, it is set to no-op.<br />
       * Access Popper.js instance with `data.instance`.
       * @prop {onUpdate}
       */
      onUpdate: function onUpdate() {
      },

      /**
       * List of modifiers used to modify the offsets before they are applied to the popper.
       * They provide most of the functionalities of Popper.js.
       * @prop {modifiers}
       */
      modifiers: modifiers
    };

    /**
     * @callback onCreate
     * @param {dataObject} data
     */

    /**
     * @callback onUpdate
     * @param {dataObject} data
     */

// Utils
// Methods
    var Popper = function () {
      /**
       * Creates a new Popper.js instance.
       * @class Popper
       * @param {Element|referenceObject} reference - The reference element used to position the popper
       * @param {Element} popper - The HTML / XML element used as the popper
       * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
       * @return {Object} instance - The generated Popper.js instance
       */
      function Popper(reference, popper) {
        var _this = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        classCallCheck(this, Popper);

        this.scheduleUpdate = function () {
          return requestAnimationFrame(_this.update);
        };

        // make update() debounced, so that it only runs at most once-per-tick
        this.update = debounce(this.update.bind(this));

        // with {} we create a new object with the options inside it
        this.options = _extends({}, Popper.Defaults, options);

        // init state
        this.state = {
          isDestroyed: false,
          isCreated: false,
          scrollParents: []
        };

        // get reference and popper elements (allow jQuery wrappers)
        this.reference = reference && reference.jquery ? reference[0] : reference;
        this.popper = popper && popper.jquery ? popper[0] : popper;

        // Deep merge modifiers options
        this.options.modifiers = {};
        Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
          _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
        });

        // Refactoring modifiers' list (Object => Array)
        this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
          return _extends({
            name: name
          }, _this.options.modifiers[name]);
        })
          // sort the modifiers by order
          .sort(function (a, b) {
            return a.order - b.order;
          });

        // modifiers have the ability to execute arbitrary code when Popper.js get inited
        // such code is executed in the same order of its modifier
        // they could add new properties to their options configuration
        // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
        this.modifiers.forEach(function (modifierOptions) {
          if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
            modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
          }
        });

        // fire the first update to position the popper in the right place
        this.update();

        var eventsEnabled = this.options.eventsEnabled;
        if (eventsEnabled) {
          // setup event listeners, they will take care of update the position in specific situations
          this.enableEventListeners();
        }

        this.state.eventsEnabled = eventsEnabled;
      }

      // We can't use class properties because they don't get listed in the
      // class prototype and break stuff like Sinon stubs


      createClass(Popper, [{
        key: 'update',
        value: function update$$1() {
          return update.call(this);
        }
      }, {
        key: 'destroy',
        value: function destroy$$1() {
          return destroy.call(this);
        }
      }, {
        key: 'enableEventListeners',
        value: function enableEventListeners$$1() {
          return enableEventListeners.call(this);
        }
      }, {
        key: 'disableEventListeners',
        value: function disableEventListeners$$1() {
          return disableEventListeners.call(this);
        }

        /**
         * Schedules an update. It will run on the next UI update available.
         * @method scheduleUpdate
         * @memberof Popper
         */


        /**
         * Collection of utilities useful when writing custom modifiers.
         * Starting from version 1.7, this method is available only if you
         * include `popper-utils.js` before `popper.js`.
         *
         * **DEPRECATION**: This way to access PopperUtils is deprecated
         * and will be removed in v2! Use the PopperUtils module directly instead.
         * Due to the high instability of the methods contained in Utils, we can't
         * guarantee them to follow semver. Use them at your own risk!
         * @static
         * @private
         * @type {Object}
         * @deprecated since version 1.8
         * @member Utils
         * @memberof Popper
         */

      }]);
      return Popper;
    }();

    /**
     * The `referenceObject` is an object that provides an interface compatible with Popper.js
     * and lets you use it as replacement of a real DOM node.<br />
     * You can use this method to position a popper relatively to a set of coordinates
     * in case you don't have a DOM node to use as reference.
     *
     * ```
     * new Popper(referenceObject, popperNode);
     * ```
     *
     * NB: This feature isn't supported in Internet Explorer 10.
     * @name referenceObject
     * @property {Function} data.getBoundingClientRect
     * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
     * @property {number} data.clientWidth
     * An ES6 getter that will return the width of the virtual reference element.
     * @property {number} data.clientHeight
     * An ES6 getter that will return the height of the virtual reference element.
     */


    Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
    Popper.placements = placements;
    Popper.Defaults = Defaults;

    return Popper;

  })));

//# sourceMappingURL=popper.js.map

  /*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
      typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
        (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
  }(this, function (exports, $, Popper) {


    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
    Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }

        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }

      return target;
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $.fn.emulateTransitionEnd = transitionEndEmulator;
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          var hrefAttr = element.getAttribute('href');
          selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $(element).css('transition-duration');
        var transitionDelay = $(element).css('transition-delay');
        var floatTransitionDuration = parseFloat(transitionDuration);
        var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      },
      findShadowRoot: function findShadowRoot(element) {
        if (!document.documentElement.attachShadow) {
          return null;
        } // Can find the shadow root otherwise it'll return the document


        if (typeof element.getRootNode === 'function') {
          var root = element.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }

        if (element instanceof ShadowRoot) {
          return element;
        } // when we don't find a shadow root


        if (!element.parentNode) {
          return null;
        }

        return Util.findShadowRoot(element.parentNode);
      }
    };
    setTransitionEndSupport();

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'alert';
    var VERSION = '4.3.1';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
      /*#__PURE__*/
      function () {
        function Alert(element) {
          this._element = element;
        } // Getters


        var _proto = Alert.prototype;

        // Public
        _proto.close = function close(element) {
          var rootElement = this._element;

          if (element) {
            rootElement = this._getRootElement(element);
          }

          var customEvent = this._triggerCloseEvent(rootElement);

          if (customEvent.isDefaultPrevented()) {
            return;
          }

          this._removeElement(rootElement);
        };

        _proto.dispose = function dispose() {
          $.removeData(this._element, DATA_KEY);
          this._element = null;
        } // Private
        ;

        _proto._getRootElement = function _getRootElement(element) {
          var selector = Util.getSelectorFromElement(element);
          var parent = false;

          if (selector) {
            parent = document.querySelector(selector);
          }

          if (!parent) {
            parent = $(element).closest("." + ClassName.ALERT)[0];
          }

          return parent;
        };

        _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
          var closeEvent = $.Event(Event.CLOSE);
          $(element).trigger(closeEvent);
          return closeEvent;
        };

        _proto._removeElement = function _removeElement(element) {
          var _this = this;

          $(element).removeClass(ClassName.SHOW);

          if (!$(element).hasClass(ClassName.FADE)) {
            this._destroyElement(element);

            return;
          }

          var transitionDuration = Util.getTransitionDurationFromElement(element);
          $(element).one(Util.TRANSITION_END, function (event) {
            return _this._destroyElement(element, event);
          }).emulateTransitionEnd(transitionDuration);
        };

        _proto._destroyElement = function _destroyElement(element) {
          $(element).detach().trigger(Event.CLOSED).remove();
        } // Static
        ;

        Alert._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Alert(this);
              $element.data(DATA_KEY, data);
            }

            if (config === 'close') {
              data[config](this);
            }
          });
        };

        Alert._handleDismiss = function _handleDismiss(alertInstance) {
          return function (event) {
            if (event) {
              event.preventDefault();
            }

            alertInstance.close(this);
          };
        };

        _createClass(Alert, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }]);

        return Alert;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$1 = 'button';
    var VERSION$1 = '4.3.1';
    var DATA_KEY$1 = 'bs.button';
    var EVENT_KEY$1 = "." + DATA_KEY$1;
    var DATA_API_KEY$1 = '.data-api';
    var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
    var ClassName$1 = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector$1 = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input:not([type="hidden"])',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event$1 = {
      CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
      /*#__PURE__*/
      function () {
        function Button(element) {
          this._element = element;
        } // Getters


        var _proto = Button.prototype;

        // Public
        _proto.toggle = function toggle() {
          var triggerChangeEvent = true;
          var addAriaPressed = true;
          var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

          if (rootElement) {
            var input = this._element.querySelector(Selector$1.INPUT);

            if (input) {
              if (input.type === 'radio') {
                if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
                  triggerChangeEvent = false;
                } else {
                  var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

                  if (activeElement) {
                    $(activeElement).removeClass(ClassName$1.ACTIVE);
                  }
                }
              }

              if (triggerChangeEvent) {
                if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                  return;
                }

                input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
                $(input).trigger('change');
              }

              input.focus();
              addAriaPressed = false;
            }
          }

          if (addAriaPressed) {
            this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
          }

          if (triggerChangeEvent) {
            $(this._element).toggleClass(ClassName$1.ACTIVE);
          }
        };

        _proto.dispose = function dispose() {
          $.removeData(this._element, DATA_KEY$1);
          this._element = null;
        } // Static
        ;

        Button._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY$1);

            if (!data) {
              data = new Button(this);
              $(this).data(DATA_KEY$1, data);
            }

            if (config === 'toggle') {
              data[config]();
            }
          });
        };

        _createClass(Button, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$1;
          }
        }]);

        return Button;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$(button).hasClass(ClassName$1.BUTTON)) {
        button = $(button).closest(Selector$1.BUTTON);
      }

      Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
      var button = $(event.target).closest(Selector$1.BUTTON)[0];
      $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$1] = Button._jQueryInterface;
    $.fn[NAME$1].Constructor = Button;

    $.fn[NAME$1].noConflict = function () {
      $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Button._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$2 = 'carousel';
    var VERSION$2 = '4.3.1';
    var DATA_KEY$2 = 'bs.carousel';
    var EVENT_KEY$2 = "." + DATA_KEY$2;
    var DATA_API_KEY$2 = '.data-api';
    var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var SWIPE_THRESHOLD = 40;
    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true,
      touch: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean',
      touch: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event$2 = {
      SLIDE: "slide" + EVENT_KEY$2,
      SLID: "slid" + EVENT_KEY$2,
      KEYDOWN: "keydown" + EVENT_KEY$2,
      MOUSEENTER: "mouseenter" + EVENT_KEY$2,
      MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
      TOUCHSTART: "touchstart" + EVENT_KEY$2,
      TOUCHMOVE: "touchmove" + EVENT_KEY$2,
      TOUCHEND: "touchend" + EVENT_KEY$2,
      POINTERDOWN: "pointerdown" + EVENT_KEY$2,
      POINTERUP: "pointerup" + EVENT_KEY$2,
      DRAG_START: "dragstart" + EVENT_KEY$2,
      LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
      CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
    };
    var ClassName$2 = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item',
      POINTER_EVENT: 'pointer-event'
    };
    var Selector$2 = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      ITEM_IMG: '.carousel-item img',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
    };
    var PointerType = {
      TOUCH: 'touch',
      PEN: 'pen'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
      /*#__PURE__*/
      function () {
        function Carousel(element, config) {
          this._items = null;
          this._interval = null;
          this._activeElement = null;
          this._isPaused = false;
          this._isSliding = false;
          this.touchTimeout = null;
          this.touchStartX = 0;
          this.touchDeltaX = 0;
          this._config = this._getConfig(config);
          this._element = element;
          this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
          this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
          this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

          this._addEventListeners();
        } // Getters


        var _proto = Carousel.prototype;

        // Public
        _proto.next = function next() {
          if (!this._isSliding) {
            this._slide(Direction.NEXT);
          }
        };

        _proto.nextWhenVisible = function nextWhenVisible() {
          // Don't call next when the page isn't visible
          // or the carousel or its parent isn't visible
          if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
            this.next();
          }
        };

        _proto.prev = function prev() {
          if (!this._isSliding) {
            this._slide(Direction.PREV);
          }
        };

        _proto.pause = function pause(event) {
          if (!event) {
            this._isPaused = true;
          }

          if (this._element.querySelector(Selector$2.NEXT_PREV)) {
            Util.triggerTransitionEnd(this._element);
            this.cycle(true);
          }

          clearInterval(this._interval);
          this._interval = null;
        };

        _proto.cycle = function cycle(event) {
          if (!event) {
            this._isPaused = false;
          }

          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }

          if (this._config.interval && !this._isPaused) {
            this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
          }
        };

        _proto.to = function to(index) {
          var _this = this;

          this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

          var activeIndex = this._getItemIndex(this._activeElement);

          if (index > this._items.length - 1 || index < 0) {
            return;
          }

          if (this._isSliding) {
            $(this._element).one(Event$2.SLID, function () {
              return _this.to(index);
            });
            return;
          }

          if (activeIndex === index) {
            this.pause();
            this.cycle();
            return;
          }

          var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

          this._slide(direction, this._items[index]);
        };

        _proto.dispose = function dispose() {
          $(this._element).off(EVENT_KEY$2);
          $.removeData(this._element, DATA_KEY$2);
          this._items = null;
          this._config = null;
          this._element = null;
          this._interval = null;
          this._isPaused = null;
          this._isSliding = null;
          this._activeElement = null;
          this._indicatorsElement = null;
        } // Private
        ;

        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default, config);
          Util.typeCheckConfig(NAME$2, config, DefaultType);
          return config;
        };

        _proto._handleSwipe = function _handleSwipe() {
          var absDeltax = Math.abs(this.touchDeltaX);

          if (absDeltax <= SWIPE_THRESHOLD) {
            return;
          }

          var direction = absDeltax / this.touchDeltaX; // swipe left

          if (direction > 0) {
            this.prev();
          } // swipe right


          if (direction < 0) {
            this.next();
          }
        };

        _proto._addEventListeners = function _addEventListeners() {
          var _this2 = this;

          if (this._config.keyboard) {
            $(this._element).on(Event$2.KEYDOWN, function (event) {
              return _this2._keydown(event);
            });
          }

          if (this._config.pause === 'hover') {
            $(this._element).on(Event$2.MOUSEENTER, function (event) {
              return _this2.pause(event);
            }).on(Event$2.MOUSELEAVE, function (event) {
              return _this2.cycle(event);
            });
          }

          if (this._config.touch) {
            this._addTouchEventListeners();
          }
        };

        _proto._addTouchEventListeners = function _addTouchEventListeners() {
          var _this3 = this;

          if (!this._touchSupported) {
            return;
          }

          var start = function start(event) {
            if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
              _this3.touchStartX = event.originalEvent.clientX;
            } else if (!_this3._pointerEvent) {
              _this3.touchStartX = event.originalEvent.touches[0].clientX;
            }
          };

          var move = function move(event) {
            // ensure swiping with one touch and not pinching
            if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
              _this3.touchDeltaX = 0;
            } else {
              _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
            }
          };

          var end = function end(event) {
            if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
              _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
            }

            _this3._handleSwipe();

            if (_this3._config.pause === 'hover') {
              // If it's a touch-enabled device, mouseenter/leave are fired as
              // part of the mouse compatibility events on first tap - the carousel
              // would stop cycling until user tapped out of it;
              // here, we listen for touchend, explicitly pause the carousel
              // (as if it's the second time we tap on it, mouseenter compat event
              // is NOT fired) and after a timeout (to allow for mouse compatibility
              // events to fire) we explicitly restart cycling
              _this3.pause();

              if (_this3.touchTimeout) {
                clearTimeout(_this3.touchTimeout);
              }

              _this3.touchTimeout = setTimeout(function (event) {
                return _this3.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
            }
          };

          $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
            return e.preventDefault();
          });

          if (this._pointerEvent) {
            $(this._element).on(Event$2.POINTERDOWN, function (event) {
              return start(event);
            });
            $(this._element).on(Event$2.POINTERUP, function (event) {
              return end(event);
            });

            this._element.classList.add(ClassName$2.POINTER_EVENT);
          } else {
            $(this._element).on(Event$2.TOUCHSTART, function (event) {
              return start(event);
            });
            $(this._element).on(Event$2.TOUCHMOVE, function (event) {
              return move(event);
            });
            $(this._element).on(Event$2.TOUCHEND, function (event) {
              return end(event);
            });
          }
        };

        _proto._keydown = function _keydown(event) {
          if (/input|textarea/i.test(event.target.tagName)) {
            return;
          }

          switch (event.which) {
            case ARROW_LEFT_KEYCODE:
              event.preventDefault();
              this.prev();
              break;

            case ARROW_RIGHT_KEYCODE:
              event.preventDefault();
              this.next();
              break;

            default:
          }
        };

        _proto._getItemIndex = function _getItemIndex(element) {
          this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
          return this._items.indexOf(element);
        };

        _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
          var isNextDirection = direction === Direction.NEXT;
          var isPrevDirection = direction === Direction.PREV;

          var activeIndex = this._getItemIndex(activeElement);

          var lastItemIndex = this._items.length - 1;
          var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

          if (isGoingToWrap && !this._config.wrap) {
            return activeElement;
          }

          var delta = direction === Direction.PREV ? -1 : 1;
          var itemIndex = (activeIndex + delta) % this._items.length;
          return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
        };

        _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
          var targetIndex = this._getItemIndex(relatedTarget);

          var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

          var slideEvent = $.Event(Event$2.SLIDE, {
            relatedTarget: relatedTarget,
            direction: eventDirectionName,
            from: fromIndex,
            to: targetIndex
          });
          $(this._element).trigger(slideEvent);
          return slideEvent;
        };

        _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
          if (this._indicatorsElement) {
            var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
            $(indicators).removeClass(ClassName$2.ACTIVE);

            var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

            if (nextIndicator) {
              $(nextIndicator).addClass(ClassName$2.ACTIVE);
            }
          }
        };

        _proto._slide = function _slide(direction, element) {
          var _this4 = this;

          var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

          var activeElementIndex = this._getItemIndex(activeElement);

          var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

          var nextElementIndex = this._getItemIndex(nextElement);

          var isCycling = Boolean(this._interval);
          var directionalClassName;
          var orderClassName;
          var eventDirectionName;

          if (direction === Direction.NEXT) {
            directionalClassName = ClassName$2.LEFT;
            orderClassName = ClassName$2.NEXT;
            eventDirectionName = Direction.LEFT;
          } else {
            directionalClassName = ClassName$2.RIGHT;
            orderClassName = ClassName$2.PREV;
            eventDirectionName = Direction.RIGHT;
          }

          if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
            this._isSliding = false;
            return;
          }

          var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

          if (slideEvent.isDefaultPrevented()) {
            return;
          }

          if (!activeElement || !nextElement) {
            // Some weirdness is happening, so we bail
            return;
          }

          this._isSliding = true;

          if (isCycling) {
            this.pause();
          }

          this._setActiveIndicatorElement(nextElement);

          var slidEvent = $.Event(Event$2.SLID, {
            relatedTarget: nextElement,
            direction: eventDirectionName,
            from: activeElementIndex,
            to: nextElementIndex
          });

          if ($(this._element).hasClass(ClassName$2.SLIDE)) {
            $(nextElement).addClass(orderClassName);
            Util.reflow(nextElement);
            $(activeElement).addClass(directionalClassName);
            $(nextElement).addClass(directionalClassName);
            var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

            if (nextElementInterval) {
              this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
              this._config.interval = nextElementInterval;
            } else {
              this._config.interval = this._config.defaultInterval || this._config.interval;
            }

            var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
            $(activeElement).one(Util.TRANSITION_END, function () {
              $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
              $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
              _this4._isSliding = false;
              setTimeout(function () {
                return $(_this4._element).trigger(slidEvent);
              }, 0);
            }).emulateTransitionEnd(transitionDuration);
          } else {
            $(activeElement).removeClass(ClassName$2.ACTIVE);
            $(nextElement).addClass(ClassName$2.ACTIVE);
            this._isSliding = false;
            $(this._element).trigger(slidEvent);
          }

          if (isCycling) {
            this.cycle();
          }
        } // Static
        ;

        Carousel._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY$2);

            var _config = _objectSpread({}, Default, $(this).data());

            if (typeof config === 'object') {
              _config = _objectSpread({}, _config, config);
            }

            var action = typeof config === 'string' ? config : _config.slide;

            if (!data) {
              data = new Carousel(this, _config);
              $(this).data(DATA_KEY$2, data);
            }

            if (typeof config === 'number') {
              data.to(config);
            } else if (typeof action === 'string') {
              if (typeof data[action] === 'undefined') {
                throw new TypeError("No method named \"" + action + "\"");
              }

              data[action]();
            } else if (_config.interval && _config.ride) {
              data.pause();
              data.cycle();
            }
          });
        };

        Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
          var selector = Util.getSelectorFromElement(this);

          if (!selector) {
            return;
          }

          var target = $(selector)[0];

          if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
            return;
          }

          var config = _objectSpread({}, $(target).data(), $(this).data());

          var slideIndex = this.getAttribute('data-slide-to');

          if (slideIndex) {
            config.interval = false;
          }

          Carousel._jQueryInterface.call($(target), config);

          if (slideIndex) {
            $(target).data(DATA_KEY$2).to(slideIndex);
          }

          event.preventDefault();
        };

        _createClass(Carousel, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$2;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }]);

        return Carousel;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
    $(window).on(Event$2.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$2] = Carousel._jQueryInterface;
    $.fn[NAME$2].Constructor = Carousel;

    $.fn[NAME$2].noConflict = function () {
      $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
      return Carousel._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$3 = 'collapse';
    var VERSION$3 = '4.3.1';
    var DATA_KEY$3 = 'bs.collapse';
    var EVENT_KEY$3 = "." + DATA_KEY$3;
    var DATA_API_KEY$3 = '.data-api';
    var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
    var Default$1 = {
      toggle: true,
      parent: ''
    };
    var DefaultType$1 = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event$3 = {
      SHOW: "show" + EVENT_KEY$3,
      SHOWN: "shown" + EVENT_KEY$3,
      HIDE: "hide" + EVENT_KEY$3,
      HIDDEN: "hidden" + EVENT_KEY$3,
      CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
    };
    var ClassName$3 = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector$3 = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
      /*#__PURE__*/
      function () {
        function Collapse(element, config) {
          this._isTransitioning = false;
          this._element = element;
          this._config = this._getConfig(config);
          this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
          var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

          for (var i = 0, len = toggleList.length; i < len; i++) {
            var elem = toggleList[i];
            var selector = Util.getSelectorFromElement(elem);
            var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
              return foundElem === element;
            });

            if (selector !== null && filterElement.length > 0) {
              this._selector = selector;

              this._triggerArray.push(elem);
            }
          }

          this._parent = this._config.parent ? this._getParent() : null;

          if (!this._config.parent) {
            this._addAriaAndCollapsedClass(this._element, this._triggerArray);
          }

          if (this._config.toggle) {
            this.toggle();
          }
        } // Getters


        var _proto = Collapse.prototype;

        // Public
        _proto.toggle = function toggle() {
          if ($(this._element).hasClass(ClassName$3.SHOW)) {
            this.hide();
          } else {
            this.show();
          }
        };

        _proto.show = function show() {
          var _this = this;

          if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
            return;
          }

          var actives;
          var activesData;

          if (this._parent) {
            actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
              if (typeof _this._config.parent === 'string') {
                return elem.getAttribute('data-parent') === _this._config.parent;
              }

              return elem.classList.contains(ClassName$3.COLLAPSE);
            });

            if (actives.length === 0) {
              actives = null;
            }
          }

          if (actives) {
            activesData = $(actives).not(this._selector).data(DATA_KEY$3);

            if (activesData && activesData._isTransitioning) {
              return;
            }
          }

          var startEvent = $.Event(Event$3.SHOW);
          $(this._element).trigger(startEvent);

          if (startEvent.isDefaultPrevented()) {
            return;
          }

          if (actives) {
            Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

            if (!activesData) {
              $(actives).data(DATA_KEY$3, null);
            }
          }

          var dimension = this._getDimension();

          $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
          this._element.style[dimension] = 0;

          if (this._triggerArray.length) {
            $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
          }

          this.setTransitioning(true);

          var complete = function complete() {
            $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
            _this._element.style[dimension] = '';

            _this.setTransitioning(false);

            $(_this._element).trigger(Event$3.SHOWN);
          };

          var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
          var scrollSize = "scroll" + capitalizedDimension;
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          this._element.style[dimension] = this._element[scrollSize] + "px";
        };

        _proto.hide = function hide() {
          var _this2 = this;

          if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
            return;
          }

          var startEvent = $.Event(Event$3.HIDE);
          $(this._element).trigger(startEvent);

          if (startEvent.isDefaultPrevented()) {
            return;
          }

          var dimension = this._getDimension();

          this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
          Util.reflow(this._element);
          $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
          var triggerArrayLength = this._triggerArray.length;

          if (triggerArrayLength > 0) {
            for (var i = 0; i < triggerArrayLength; i++) {
              var trigger = this._triggerArray[i];
              var selector = Util.getSelectorFromElement(trigger);

              if (selector !== null) {
                var $elem = $([].slice.call(document.querySelectorAll(selector)));

                if (!$elem.hasClass(ClassName$3.SHOW)) {
                  $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
                }
              }
            }
          }

          this.setTransitioning(true);

          var complete = function complete() {
            _this2.setTransitioning(false);

            $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
          };

          this._element.style[dimension] = '';
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        };

        _proto.setTransitioning = function setTransitioning(isTransitioning) {
          this._isTransitioning = isTransitioning;
        };

        _proto.dispose = function dispose() {
          $.removeData(this._element, DATA_KEY$3);
          this._config = null;
          this._parent = null;
          this._element = null;
          this._triggerArray = null;
          this._isTransitioning = null;
        } // Private
        ;

        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default$1, config);
          config.toggle = Boolean(config.toggle); // Coerce string values

          Util.typeCheckConfig(NAME$3, config, DefaultType$1);
          return config;
        };

        _proto._getDimension = function _getDimension() {
          var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
          return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
        };

        _proto._getParent = function _getParent() {
          var _this3 = this;

          var parent;

          if (Util.isElement(this._config.parent)) {
            parent = this._config.parent; // It's a jQuery object

            if (typeof this._config.parent.jquery !== 'undefined') {
              parent = this._config.parent[0];
            }
          } else {
            parent = document.querySelector(this._config.parent);
          }

          var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
          var children = [].slice.call(parent.querySelectorAll(selector));
          $(children).each(function (i, element) {
            _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
          });
          return parent;
        };

        _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
          var isOpen = $(element).hasClass(ClassName$3.SHOW);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        } // Static
        ;

        Collapse._getTargetFromElement = function _getTargetFromElement(element) {
          var selector = Util.getSelectorFromElement(element);
          return selector ? document.querySelector(selector) : null;
        };

        Collapse._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var $this = $(this);
            var data = $this.data(DATA_KEY$3);

            var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

            if (!data && _config.toggle && /show|hide/.test(config)) {
              _config.toggle = false;
            }

            if (!data) {
              data = new Collapse(this, _config);
              $this.data(DATA_KEY$3, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config]();
            }
          });
        };

        _createClass(Collapse, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$3;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default$1;
          }
        }]);

        return Collapse;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $(selectors).each(function () {
        var $target = $(this);
        var data = $target.data(DATA_KEY$3);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$3] = Collapse._jQueryInterface;
    $.fn[NAME$3].Constructor = Collapse;

    $.fn[NAME$3].noConflict = function () {
      $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
      return Collapse._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$4 = 'dropdown';
    var VERSION$4 = '4.3.1';
    var DATA_KEY$4 = 'bs.dropdown';
    var EVENT_KEY$4 = "." + DATA_KEY$4;
    var DATA_API_KEY$4 = '.data-api';
    var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event$4 = {
      HIDE: "hide" + EVENT_KEY$4,
      HIDDEN: "hidden" + EVENT_KEY$4,
      SHOW: "show" + EVENT_KEY$4,
      SHOWN: "shown" + EVENT_KEY$4,
      CLICK: "click" + EVENT_KEY$4,
      CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
      KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
    };
    var ClassName$4 = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector$4 = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default$2 = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType$2 = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
      /*#__PURE__*/
      function () {
        function Dropdown(element, config) {
          this._element = element;
          this._popper = null;
          this._config = this._getConfig(config);
          this._menu = this._getMenuElement();
          this._inNavbar = this._detectNavbar();

          this._addEventListeners();
        } // Getters


        var _proto = Dropdown.prototype;

        // Public
        _proto.toggle = function toggle() {
          if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
            return;
          }

          var parent = Dropdown._getParentFromElement(this._element);

          var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

          Dropdown._clearMenus();

          if (isActive) {
            return;
          }

          var relatedTarget = {
            relatedTarget: this._element
          };
          var showEvent = $.Event(Event$4.SHOW, relatedTarget);
          $(parent).trigger(showEvent);

          if (showEvent.isDefaultPrevented()) {
            return;
          } // Disable totally Popper.js for Dropdown in Navbar


          if (!this._inNavbar) {
            /**
             * Check for Popper dependency
             * Popper - https://popper.js.org
             */
            if (typeof Popper === 'undefined') {
              throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
            }

            var referenceElement = this._element;

            if (this._config.reference === 'parent') {
              referenceElement = parent;
            } else if (Util.isElement(this._config.reference)) {
              referenceElement = this._config.reference; // Check if it's jQuery element

              if (typeof this._config.reference.jquery !== 'undefined') {
                referenceElement = this._config.reference[0];
              }
            } // If boundary is not `scrollParent`, then set position to `static`
            // to allow the menu to "escape" the scroll parent's boundaries
            // https://github.com/twbs/bootstrap/issues/24251


            if (this._config.boundary !== 'scrollParent') {
              $(parent).addClass(ClassName$4.POSITION_STATIC);
            }

            this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
          } // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


          if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
            $(document.body).children().on('mouseover', null, $.noop);
          }

          this._element.focus();

          this._element.setAttribute('aria-expanded', true);

          $(this._menu).toggleClass(ClassName$4.SHOW);
          $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
        };

        _proto.show = function show() {
          if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
            return;
          }

          var relatedTarget = {
            relatedTarget: this._element
          };
          var showEvent = $.Event(Event$4.SHOW, relatedTarget);

          var parent = Dropdown._getParentFromElement(this._element);

          $(parent).trigger(showEvent);

          if (showEvent.isDefaultPrevented()) {
            return;
          }

          $(this._menu).toggleClass(ClassName$4.SHOW);
          $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
        };

        _proto.hide = function hide() {
          if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
            return;
          }

          var relatedTarget = {
            relatedTarget: this._element
          };
          var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

          var parent = Dropdown._getParentFromElement(this._element);

          $(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            return;
          }

          $(this._menu).toggleClass(ClassName$4.SHOW);
          $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
        };

        _proto.dispose = function dispose() {
          $.removeData(this._element, DATA_KEY$4);
          $(this._element).off(EVENT_KEY$4);
          this._element = null;
          this._menu = null;

          if (this._popper !== null) {
            this._popper.destroy();

            this._popper = null;
          }
        };

        _proto.update = function update() {
          this._inNavbar = this._detectNavbar();

          if (this._popper !== null) {
            this._popper.scheduleUpdate();
          }
        } // Private
        ;

        _proto._addEventListeners = function _addEventListeners() {
          var _this = this;

          $(this._element).on(Event$4.CLICK, function (event) {
            event.preventDefault();
            event.stopPropagation();

            _this.toggle();
          });
        };

        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
          Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
          return config;
        };

        _proto._getMenuElement = function _getMenuElement() {
          if (!this._menu) {
            var parent = Dropdown._getParentFromElement(this._element);

            if (parent) {
              this._menu = parent.querySelector(Selector$4.MENU);
            }
          }

          return this._menu;
        };

        _proto._getPlacement = function _getPlacement() {
          var $parentDropdown = $(this._element.parentNode);
          var placement = AttachmentMap.BOTTOM; // Handle dropup

          if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
            placement = AttachmentMap.TOP;

            if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
              placement = AttachmentMap.TOPEND;
            }
          } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
            placement = AttachmentMap.RIGHT;
          } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
            placement = AttachmentMap.LEFT;
          } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
            placement = AttachmentMap.BOTTOMEND;
          }

          return placement;
        };

        _proto._detectNavbar = function _detectNavbar() {
          return $(this._element).closest('.navbar').length > 0;
        };

        _proto._getOffset = function _getOffset() {
          var _this2 = this;

          var offset = {};

          if (typeof this._config.offset === 'function') {
            offset.fn = function (data) {
              data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
              return data;
            };
          } else {
            offset.offset = this._config.offset;
          }

          return offset;
        };

        _proto._getPopperConfig = function _getPopperConfig() {
          var popperConfig = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: {
                enabled: this._config.flip
              },
              preventOverflow: {
                boundariesElement: this._config.boundary
              }
            } // Disable Popper.js if we have a static display

          };

          if (this._config.display === 'static') {
            popperConfig.modifiers.applyStyle = {
              enabled: false
            };
          }

          return popperConfig;
        } // Static
        ;

        Dropdown._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY$4);

            var _config = typeof config === 'object' ? config : null;

            if (!data) {
              data = new Dropdown(this, _config);
              $(this).data(DATA_KEY$4, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config]();
            }
          });
        };

        Dropdown._clearMenus = function _clearMenus(event) {
          if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
            return;
          }

          var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

          for (var i = 0, len = toggles.length; i < len; i++) {
            var parent = Dropdown._getParentFromElement(toggles[i]);

            var context = $(toggles[i]).data(DATA_KEY$4);
            var relatedTarget = {
              relatedTarget: toggles[i]
            };

            if (event && event.type === 'click') {
              relatedTarget.clickEvent = event;
            }

            if (!context) {
              continue;
            }

            var dropdownMenu = context._menu;

            if (!$(parent).hasClass(ClassName$4.SHOW)) {
              continue;
            }

            if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
              continue;
            }

            var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
            $(parent).trigger(hideEvent);

            if (hideEvent.isDefaultPrevented()) {
              continue;
            } // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support


            if ('ontouchstart' in document.documentElement) {
              $(document.body).children().off('mouseover', null, $.noop);
            }

            toggles[i].setAttribute('aria-expanded', 'false');
            $(dropdownMenu).removeClass(ClassName$4.SHOW);
            $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
          }
        };

        Dropdown._getParentFromElement = function _getParentFromElement(element) {
          var parent;
          var selector = Util.getSelectorFromElement(element);

          if (selector) {
            parent = document.querySelector(selector);
          }

          return parent || element.parentNode;
        } // eslint-disable-next-line complexity
        ;

        Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
          // If not input/textarea:
          //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
          // If input/textarea:
          //  - If space key => not a dropdown command
          //  - If key is other than escape
          //    - If key is not up or down => not a dropdown command
          //    - If trigger inside the menu => not a dropdown command
          if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
            return;
          }

          var parent = Dropdown._getParentFromElement(this);

          var isActive = $(parent).hasClass(ClassName$4.SHOW);

          if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
            if (event.which === ESCAPE_KEYCODE) {
              var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
              $(toggle).trigger('focus');
            }

            $(this).trigger('click');
            return;
          }

          var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

          if (items.length === 0) {
            return;
          }

          var index = items.indexOf(event.target);

          if (event.which === ARROW_UP_KEYCODE && index > 0) {
            // Up
            index--;
          }

          if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
            // Down
            index++;
          }

          if (index < 0) {
            index = 0;
          }

          items[index].focus();
        };

        _createClass(Dropdown, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$4;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default$2;
          }
        }, {
          key: "DefaultType",
          get: function get() {
            return DefaultType$2;
          }
        }]);

        return Dropdown;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($(this), 'toggle');
    }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$4] = Dropdown._jQueryInterface;
    $.fn[NAME$4].Constructor = Dropdown;

    $.fn[NAME$4].noConflict = function () {
      $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
      return Dropdown._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$5 = 'modal';
    var VERSION$5 = '4.3.1';
    var DATA_KEY$5 = 'bs.modal';
    var EVENT_KEY$5 = "." + DATA_KEY$5;
    var DATA_API_KEY$5 = '.data-api';
    var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
    var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default$3 = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType$3 = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event$5 = {
      HIDE: "hide" + EVENT_KEY$5,
      HIDDEN: "hidden" + EVENT_KEY$5,
      SHOW: "show" + EVENT_KEY$5,
      SHOWN: "shown" + EVENT_KEY$5,
      FOCUSIN: "focusin" + EVENT_KEY$5,
      RESIZE: "resize" + EVENT_KEY$5,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
      CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
    };
    var ClassName$5 = {
      SCROLLABLE: 'modal-dialog-scrollable',
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector$5 = {
      DIALOG: '.modal-dialog',
      MODAL_BODY: '.modal-body',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
      /*#__PURE__*/
      function () {
        function Modal(element, config) {
          this._config = this._getConfig(config);
          this._element = element;
          this._dialog = element.querySelector(Selector$5.DIALOG);
          this._backdrop = null;
          this._isShown = false;
          this._isBodyOverflowing = false;
          this._ignoreBackdropClick = false;
          this._isTransitioning = false;
          this._scrollbarWidth = 0;
        } // Getters


        var _proto = Modal.prototype;

        // Public
        _proto.toggle = function toggle(relatedTarget) {
          return this._isShown ? this.hide() : this.show(relatedTarget);
        };

        _proto.show = function show(relatedTarget) {
          var _this = this;

          if (this._isShown || this._isTransitioning) {
            return;
          }

          if ($(this._element).hasClass(ClassName$5.FADE)) {
            this._isTransitioning = true;
          }

          var showEvent = $.Event(Event$5.SHOW, {
            relatedTarget: relatedTarget
          });
          $(this._element).trigger(showEvent);

          if (this._isShown || showEvent.isDefaultPrevented()) {
            return;
          }

          this._isShown = true;

          this._checkScrollbar();

          this._setScrollbar();

          this._adjustDialog();

          this._setEscapeEvent();

          this._setResizeEvent();

          $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
            return _this.hide(event);
          });
          $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
            $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
              if ($(event.target).is(_this._element)) {
                _this._ignoreBackdropClick = true;
              }
            });
          });

          this._showBackdrop(function () {
            return _this._showElement(relatedTarget);
          });
        };

        _proto.hide = function hide(event) {
          var _this2 = this;

          if (event) {
            event.preventDefault();
          }

          if (!this._isShown || this._isTransitioning) {
            return;
          }

          var hideEvent = $.Event(Event$5.HIDE);
          $(this._element).trigger(hideEvent);

          if (!this._isShown || hideEvent.isDefaultPrevented()) {
            return;
          }

          this._isShown = false;
          var transition = $(this._element).hasClass(ClassName$5.FADE);

          if (transition) {
            this._isTransitioning = true;
          }

          this._setEscapeEvent();

          this._setResizeEvent();

          $(document).off(Event$5.FOCUSIN);
          $(this._element).removeClass(ClassName$5.SHOW);
          $(this._element).off(Event$5.CLICK_DISMISS);
          $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

          if (transition) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, function (event) {
              return _this2._hideModal(event);
            }).emulateTransitionEnd(transitionDuration);
          } else {
            this._hideModal();
          }
        };

        _proto.dispose = function dispose() {
          [window, this._element, this._dialog].forEach(function (htmlElement) {
            return $(htmlElement).off(EVENT_KEY$5);
          });
          /**
           * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
           * Do not move `document` in `htmlElements` array
           * It will remove `Event.CLICK_DATA_API` event that should remain
           */

          $(document).off(Event$5.FOCUSIN);
          $.removeData(this._element, DATA_KEY$5);
          this._config = null;
          this._element = null;
          this._dialog = null;
          this._backdrop = null;
          this._isShown = null;
          this._isBodyOverflowing = null;
          this._ignoreBackdropClick = null;
          this._isTransitioning = null;
          this._scrollbarWidth = null;
        };

        _proto.handleUpdate = function handleUpdate() {
          this._adjustDialog();
        } // Private
        ;

        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default$3, config);
          Util.typeCheckConfig(NAME$5, config, DefaultType$3);
          return config;
        };

        _proto._showElement = function _showElement(relatedTarget) {
          var _this3 = this;

          var transition = $(this._element).hasClass(ClassName$5.FADE);

          if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // Don't move modal's DOM position
            document.body.appendChild(this._element);
          }

          this._element.style.display = 'block';

          this._element.removeAttribute('aria-hidden');

          this._element.setAttribute('aria-modal', true);

          if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
            this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
          } else {
            this._element.scrollTop = 0;
          }

          if (transition) {
            Util.reflow(this._element);
          }

          $(this._element).addClass(ClassName$5.SHOW);

          if (this._config.focus) {
            this._enforceFocus();
          }

          var shownEvent = $.Event(Event$5.SHOWN, {
            relatedTarget: relatedTarget
          });

          var transitionComplete = function transitionComplete() {
            if (_this3._config.focus) {
              _this3._element.focus();
            }

            _this3._isTransitioning = false;
            $(_this3._element).trigger(shownEvent);
          };

          if (transition) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
            $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
          } else {
            transitionComplete();
          }
        };

        _proto._enforceFocus = function _enforceFocus() {
          var _this4 = this;

          $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
            .on(Event$5.FOCUSIN, function (event) {
              if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
                _this4._element.focus();
              }
            });
        };

        _proto._setEscapeEvent = function _setEscapeEvent() {
          var _this5 = this;

          if (this._isShown && this._config.keyboard) {
            $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
              if (event.which === ESCAPE_KEYCODE$1) {
                event.preventDefault();

                _this5.hide();
              }
            });
          } else if (!this._isShown) {
            $(this._element).off(Event$5.KEYDOWN_DISMISS);
          }
        };

        _proto._setResizeEvent = function _setResizeEvent() {
          var _this6 = this;

          if (this._isShown) {
            $(window).on(Event$5.RESIZE, function (event) {
              return _this6.handleUpdate(event);
            });
          } else {
            $(window).off(Event$5.RESIZE);
          }
        };

        _proto._hideModal = function _hideModal() {
          var _this7 = this;

          this._element.style.display = 'none';

          this._element.setAttribute('aria-hidden', true);

          this._element.removeAttribute('aria-modal');

          this._isTransitioning = false;

          this._showBackdrop(function () {
            $(document.body).removeClass(ClassName$5.OPEN);

            _this7._resetAdjustments();

            _this7._resetScrollbar();

            $(_this7._element).trigger(Event$5.HIDDEN);
          });
        };

        _proto._removeBackdrop = function _removeBackdrop() {
          if (this._backdrop) {
            $(this._backdrop).remove();
            this._backdrop = null;
          }
        };

        _proto._showBackdrop = function _showBackdrop(callback) {
          var _this8 = this;

          var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

          if (this._isShown && this._config.backdrop) {
            this._backdrop = document.createElement('div');
            this._backdrop.className = ClassName$5.BACKDROP;

            if (animate) {
              this._backdrop.classList.add(animate);
            }

            $(this._backdrop).appendTo(document.body);
            $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
              if (_this8._ignoreBackdropClick) {
                _this8._ignoreBackdropClick = false;
                return;
              }

              if (event.target !== event.currentTarget) {
                return;
              }

              if (_this8._config.backdrop === 'static') {
                _this8._element.focus();
              } else {
                _this8.hide();
              }
            });

            if (animate) {
              Util.reflow(this._backdrop);
            }

            $(this._backdrop).addClass(ClassName$5.SHOW);

            if (!callback) {
              return;
            }

            if (!animate) {
              callback();
              return;
            }

            var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
            $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
          } else if (!this._isShown && this._backdrop) {
            $(this._backdrop).removeClass(ClassName$5.SHOW);

            var callbackRemove = function callbackRemove() {
              _this8._removeBackdrop();

              if (callback) {
                callback();
              }
            };

            if ($(this._element).hasClass(ClassName$5.FADE)) {
              var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

              $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
            } else {
              callbackRemove();
            }
          } else if (callback) {
            callback();
          }
        } // ----------------------------------------------------------------------
        // the following methods are used to handle overflowing modals
        // todo (fat): these should probably be refactored out of modal.js
        // ----------------------------------------------------------------------
        ;

        _proto._adjustDialog = function _adjustDialog() {
          var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

          if (!this._isBodyOverflowing && isModalOverflowing) {
            this._element.style.paddingLeft = this._scrollbarWidth + "px";
          }

          if (this._isBodyOverflowing && !isModalOverflowing) {
            this._element.style.paddingRight = this._scrollbarWidth + "px";
          }
        };

        _proto._resetAdjustments = function _resetAdjustments() {
          this._element.style.paddingLeft = '';
          this._element.style.paddingRight = '';
        };

        _proto._checkScrollbar = function _checkScrollbar() {
          var rect = document.body.getBoundingClientRect();
          this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
          this._scrollbarWidth = this._getScrollbarWidth();
        };

        _proto._setScrollbar = function _setScrollbar() {
          var _this9 = this;

          if (this._isBodyOverflowing) {
            // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
            //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
            var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
            var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

            $(fixedContent).each(function (index, element) {
              var actualPadding = element.style.paddingRight;
              var calculatedPadding = $(element).css('padding-right');
              $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
            }); // Adjust sticky content margin

            $(stickyContent).each(function (index, element) {
              var actualMargin = element.style.marginRight;
              var calculatedMargin = $(element).css('margin-right');
              $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
            }); // Adjust body padding

            var actualPadding = document.body.style.paddingRight;
            var calculatedPadding = $(document.body).css('padding-right');
            $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
          }

          $(document.body).addClass(ClassName$5.OPEN);
        };

        _proto._resetScrollbar = function _resetScrollbar() {
          // Restore fixed content padding
          var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
          $(fixedContent).each(function (index, element) {
            var padding = $(element).data('padding-right');
            $(element).removeData('padding-right');
            element.style.paddingRight = padding ? padding : '';
          }); // Restore sticky content

          var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
          $(elements).each(function (index, element) {
            var margin = $(element).data('margin-right');

            if (typeof margin !== 'undefined') {
              $(element).css('margin-right', margin).removeData('margin-right');
            }
          }); // Restore body padding

          var padding = $(document.body).data('padding-right');
          $(document.body).removeData('padding-right');
          document.body.style.paddingRight = padding ? padding : '';
        };

        _proto._getScrollbarWidth = function _getScrollbarWidth() {
          // thx d.walsh
          var scrollDiv = document.createElement('div');
          scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
          document.body.appendChild(scrollDiv);
          var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
          document.body.removeChild(scrollDiv);
          return scrollbarWidth;
        } // Static
        ;

        Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY$5);

            var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

            if (!data) {
              data = new Modal(this, _config);
              $(this).data(DATA_KEY$5, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config](relatedTarget);
            } else if (_config.show) {
              data.show(relatedTarget);
            }
          });
        };

        _createClass(Modal, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$5;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default$3;
          }
        }]);

        return Modal;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $(target).one(Event$5.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event$5.HIDDEN, function () {
          if ($(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$5] = Modal._jQueryInterface;
    $.fn[NAME$5].Constructor = Modal;

    $.fn[NAME$5].noConflict = function () {
      $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
      return Modal._jQueryInterface;
    };

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): tools/sanitizer.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DefaultWhitelist = {
      // Global attributes allowed on any supplied element below.
      '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
      a: ['target', 'href', 'title', 'rel'],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['src', 'alt', 'title', 'width', 'height'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
      /**
       * A pattern that recognizes a commonly useful subset of URLs that are safe.
       *
       * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
       */

    };
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
    /**
     * A pattern that matches safe data URLs. Only matches image, video and audio types.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function allowedAttribute(attr, allowedAttributeList) {
      var attrName = attr.nodeName.toLowerCase();

      if (allowedAttributeList.indexOf(attrName) !== -1) {
        if (uriAttrs.indexOf(attrName) !== -1) {
          return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
        }

        return true;
      }

      var regExp = allowedAttributeList.filter(function (attrRegex) {
        return attrRegex instanceof RegExp;
      }); // Check if a regular expression validates the attribute.

      for (var i = 0, l = regExp.length; i < l; i++) {
        if (attrName.match(regExp[i])) {
          return true;
        }
      }

      return false;
    }

    function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
      if (unsafeHtml.length === 0) {
        return unsafeHtml;
      }

      if (sanitizeFn && typeof sanitizeFn === 'function') {
        return sanitizeFn(unsafeHtml);
      }

      var domParser = new window.DOMParser();
      var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
      var whitelistKeys = Object.keys(whiteList);
      var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

      var _loop = function _loop(i, len) {
        var el = elements[i];
        var elName = el.nodeName.toLowerCase();

        if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
          el.parentNode.removeChild(el);
          return "continue";
        }

        var attributeList = [].slice.call(el.attributes);
        var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
        attributeList.forEach(function (attr) {
          if (!allowedAttribute(attr, whitelistedAttributes)) {
            el.removeAttribute(attr.nodeName);
          }
        });
      };

      for (var i = 0, len = elements.length; i < len; i++) {
        var _ret = _loop(i, len);

        if (_ret === "continue") continue;
      }

      return createdDocument.body.innerHTML;
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$6 = 'tooltip';
    var VERSION$6 = '4.3.1';
    var DATA_KEY$6 = 'bs.tooltip';
    var EVENT_KEY$6 = "." + DATA_KEY$6;
    var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
    var DefaultType$4 = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string|function)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      whiteList: 'object'
    };
    var AttachmentMap$1 = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default$4 = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent',
      sanitize: true,
      sanitizeFn: null,
      whiteList: DefaultWhitelist
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event$6 = {
      HIDE: "hide" + EVENT_KEY$6,
      HIDDEN: "hidden" + EVENT_KEY$6,
      SHOW: "show" + EVENT_KEY$6,
      SHOWN: "shown" + EVENT_KEY$6,
      INSERTED: "inserted" + EVENT_KEY$6,
      CLICK: "click" + EVENT_KEY$6,
      FOCUSIN: "focusin" + EVENT_KEY$6,
      FOCUSOUT: "focusout" + EVENT_KEY$6,
      MOUSEENTER: "mouseenter" + EVENT_KEY$6,
      MOUSELEAVE: "mouseleave" + EVENT_KEY$6
    };
    var ClassName$6 = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector$6 = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
      /*#__PURE__*/
      function () {
        function Tooltip(element, config) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
          } // private


          this._isEnabled = true;
          this._timeout = 0;
          this._hoverState = '';
          this._activeTrigger = {};
          this._popper = null; // Protected

          this.element = element;
          this.config = this._getConfig(config);
          this.tip = null;

          this._setListeners();
        } // Getters


        var _proto = Tooltip.prototype;

        // Public
        _proto.enable = function enable() {
          this._isEnabled = true;
        };

        _proto.disable = function disable() {
          this._isEnabled = false;
        };

        _proto.toggleEnabled = function toggleEnabled() {
          this._isEnabled = !this._isEnabled;
        };

        _proto.toggle = function toggle(event) {
          if (!this._isEnabled) {
            return;
          }

          if (event) {
            var dataKey = this.constructor.DATA_KEY;
            var context = $(event.currentTarget).data(dataKey);

            if (!context) {
              context = new this.constructor(event.currentTarget, this._getDelegateConfig());
              $(event.currentTarget).data(dataKey, context);
            }

            context._activeTrigger.click = !context._activeTrigger.click;

            if (context._isWithActiveTrigger()) {
              context._enter(null, context);
            } else {
              context._leave(null, context);
            }
          } else {
            if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
              this._leave(null, this);

              return;
            }

            this._enter(null, this);
          }
        };

        _proto.dispose = function dispose() {
          clearTimeout(this._timeout);
          $.removeData(this.element, this.constructor.DATA_KEY);
          $(this.element).off(this.constructor.EVENT_KEY);
          $(this.element).closest('.modal').off('hide.bs.modal');

          if (this.tip) {
            $(this.tip).remove();
          }

          this._isEnabled = null;
          this._timeout = null;
          this._hoverState = null;
          this._activeTrigger = null;

          if (this._popper !== null) {
            this._popper.destroy();
          }

          this._popper = null;
          this.element = null;
          this.config = null;
          this.tip = null;
        };

        _proto.show = function show() {
          var _this = this;

          if ($(this.element).css('display') === 'none') {
            throw new Error('Please use show on visible elements');
          }

          var showEvent = $.Event(this.constructor.Event.SHOW);

          if (this.isWithContent() && this._isEnabled) {
            $(this.element).trigger(showEvent);
            var shadowRoot = Util.findShadowRoot(this.element);
            var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

            if (showEvent.isDefaultPrevented() || !isInTheDom) {
              return;
            }

            var tip = this.getTipElement();
            var tipId = Util.getUID(this.constructor.NAME);
            tip.setAttribute('id', tipId);
            this.element.setAttribute('aria-describedby', tipId);
            this.setContent();

            if (this.config.animation) {
              $(tip).addClass(ClassName$6.FADE);
            }

            var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

            var attachment = this._getAttachment(placement);

            this.addAttachmentClass(attachment);

            var container = this._getContainer();

            $(tip).data(this.constructor.DATA_KEY, this);

            if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
              $(tip).appendTo(container);
            }

            $(this.element).trigger(this.constructor.Event.INSERTED);
            this._popper = new Popper(this.element, tip, {
              placement: attachment,
              modifiers: {
                offset: this._getOffset(),
                flip: {
                  behavior: this.config.fallbackPlacement
                },
                arrow: {
                  element: Selector$6.ARROW
                },
                preventOverflow: {
                  boundariesElement: this.config.boundary
                }
              },
              onCreate: function onCreate(data) {
                if (data.originalPlacement !== data.placement) {
                  _this._handlePopperPlacementChange(data);
                }
              },
              onUpdate: function onUpdate(data) {
                return _this._handlePopperPlacementChange(data);
              }
            });
            $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

            if ('ontouchstart' in document.documentElement) {
              $(document.body).children().on('mouseover', null, $.noop);
            }

            var complete = function complete() {
              if (_this.config.animation) {
                _this._fixTransition();
              }

              var prevHoverState = _this._hoverState;
              _this._hoverState = null;
              $(_this.element).trigger(_this.constructor.Event.SHOWN);

              if (prevHoverState === HoverState.OUT) {
                _this._leave(null, _this);
              }
            };

            if ($(this.tip).hasClass(ClassName$6.FADE)) {
              var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
              $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            } else {
              complete();
            }
          }
        };

        _proto.hide = function hide(callback) {
          var _this2 = this;

          var tip = this.getTipElement();
          var hideEvent = $.Event(this.constructor.Event.HIDE);

          var complete = function complete() {
            if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
              tip.parentNode.removeChild(tip);
            }

            _this2._cleanTipClass();

            _this2.element.removeAttribute('aria-describedby');

            $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

            if (_this2._popper !== null) {
              _this2._popper.destroy();
            }

            if (callback) {
              callback();
            }
          };

          $(this.element).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            return;
          }

          $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support

          if ('ontouchstart' in document.documentElement) {
            $(document.body).children().off('mouseover', null, $.noop);
          }

          this._activeTrigger[Trigger.CLICK] = false;
          this._activeTrigger[Trigger.FOCUS] = false;
          this._activeTrigger[Trigger.HOVER] = false;

          if ($(this.tip).hasClass(ClassName$6.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(tip);
            $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }

          this._hoverState = '';
        };

        _proto.update = function update() {
          if (this._popper !== null) {
            this._popper.scheduleUpdate();
          }
        } // Protected
        ;

        _proto.isWithContent = function isWithContent() {
          return Boolean(this.getTitle());
        };

        _proto.addAttachmentClass = function addAttachmentClass(attachment) {
          $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
        };

        _proto.getTipElement = function getTipElement() {
          this.tip = this.tip || $(this.config.template)[0];
          return this.tip;
        };

        _proto.setContent = function setContent() {
          var tip = this.getTipElement();
          this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
          $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
        };

        _proto.setElementContent = function setElementContent($element, content) {
          if (typeof content === 'object' && (content.nodeType || content.jquery)) {
            // Content is a DOM node or a jQuery
            if (this.config.html) {
              if (!$(content).parent().is($element)) {
                $element.empty().append(content);
              }
            } else {
              $element.text($(content).text());
            }

            return;
          }

          if (this.config.html) {
            if (this.config.sanitize) {
              content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
            }

            $element.html(content);
          } else {
            $element.text(content);
          }
        };

        _proto.getTitle = function getTitle() {
          var title = this.element.getAttribute('data-original-title');

          if (!title) {
            title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
          }

          return title;
        } // Private
        ;

        _proto._getOffset = function _getOffset() {
          var _this3 = this;

          var offset = {};

          if (typeof this.config.offset === 'function') {
            offset.fn = function (data) {
              data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
              return data;
            };
          } else {
            offset.offset = this.config.offset;
          }

          return offset;
        };

        _proto._getContainer = function _getContainer() {
          if (this.config.container === false) {
            return document.body;
          }

          if (Util.isElement(this.config.container)) {
            return $(this.config.container);
          }

          return $(document).find(this.config.container);
        };

        _proto._getAttachment = function _getAttachment(placement) {
          return AttachmentMap$1[placement.toUpperCase()];
        };

        _proto._setListeners = function _setListeners() {
          var _this4 = this;

          var triggers = this.config.trigger.split(' ');
          triggers.forEach(function (trigger) {
            if (trigger === 'click') {
              $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
                return _this4.toggle(event);
              });
            } else if (trigger !== Trigger.MANUAL) {
              var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
              var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
              $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
                return _this4._enter(event);
              }).on(eventOut, _this4.config.selector, function (event) {
                return _this4._leave(event);
              });
            }
          });
          $(this.element).closest('.modal').on('hide.bs.modal', function () {
            if (_this4.element) {
              _this4.hide();
            }
          });

          if (this.config.selector) {
            this.config = _objectSpread({}, this.config, {
              trigger: 'manual',
              selector: ''
            });
          } else {
            this._fixTitle();
          }
        };

        _proto._fixTitle = function _fixTitle() {
          var titleType = typeof this.element.getAttribute('data-original-title');

          if (this.element.getAttribute('title') || titleType !== 'string') {
            this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
            this.element.setAttribute('title', '');
          }
        };

        _proto._enter = function _enter(event, context) {
          var dataKey = this.constructor.DATA_KEY;
          context = context || $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          if (event) {
            context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
          }

          if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
            context._hoverState = HoverState.SHOW;
            return;
          }

          clearTimeout(context._timeout);
          context._hoverState = HoverState.SHOW;

          if (!context.config.delay || !context.config.delay.show) {
            context.show();
            return;
          }

          context._timeout = setTimeout(function () {
            if (context._hoverState === HoverState.SHOW) {
              context.show();
            }
          }, context.config.delay.show);
        };

        _proto._leave = function _leave(event, context) {
          var dataKey = this.constructor.DATA_KEY;
          context = context || $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          if (event) {
            context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
          }

          if (context._isWithActiveTrigger()) {
            return;
          }

          clearTimeout(context._timeout);
          context._hoverState = HoverState.OUT;

          if (!context.config.delay || !context.config.delay.hide) {
            context.hide();
            return;
          }

          context._timeout = setTimeout(function () {
            if (context._hoverState === HoverState.OUT) {
              context.hide();
            }
          }, context.config.delay.hide);
        };

        _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
          for (var trigger in this._activeTrigger) {
            if (this._activeTrigger[trigger]) {
              return true;
            }
          }

          return false;
        };

        _proto._getConfig = function _getConfig(config) {
          var dataAttributes = $(this.element).data();
          Object.keys(dataAttributes).forEach(function (dataAttr) {
            if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
              delete dataAttributes[dataAttr];
            }
          });
          config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

          if (typeof config.delay === 'number') {
            config.delay = {
              show: config.delay,
              hide: config.delay
            };
          }

          if (typeof config.title === 'number') {
            config.title = config.title.toString();
          }

          if (typeof config.content === 'number') {
            config.content = config.content.toString();
          }

          Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

          if (config.sanitize) {
            config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
          }

          return config;
        };

        _proto._getDelegateConfig = function _getDelegateConfig() {
          var config = {};

          if (this.config) {
            for (var key in this.config) {
              if (this.constructor.Default[key] !== this.config[key]) {
                config[key] = this.config[key];
              }
            }
          }

          return config;
        };

        _proto._cleanTipClass = function _cleanTipClass() {
          var $tip = $(this.getTipElement());
          var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

          if (tabClass !== null && tabClass.length) {
            $tip.removeClass(tabClass.join(''));
          }
        };

        _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
          var popperInstance = popperData.instance;
          this.tip = popperInstance.popper;

          this._cleanTipClass();

          this.addAttachmentClass(this._getAttachment(popperData.placement));
        };

        _proto._fixTransition = function _fixTransition() {
          var tip = this.getTipElement();
          var initConfigAnimation = this.config.animation;

          if (tip.getAttribute('x-placement') !== null) {
            return;
          }

          $(tip).removeClass(ClassName$6.FADE);
          this.config.animation = false;
          this.hide();
          this.show();
          this.config.animation = initConfigAnimation;
        } // Static
        ;

        Tooltip._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY$6);

            var _config = typeof config === 'object' && config;

            if (!data && /dispose|hide/.test(config)) {
              return;
            }

            if (!data) {
              data = new Tooltip(this, _config);
              $(this).data(DATA_KEY$6, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config]();
            }
          });
        };

        _createClass(Tooltip, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$6;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default$4;
          }
        }, {
          key: "NAME",
          get: function get() {
            return NAME$6;
          }
        }, {
          key: "DATA_KEY",
          get: function get() {
            return DATA_KEY$6;
          }
        }, {
          key: "Event",
          get: function get() {
            return Event$6;
          }
        }, {
          key: "EVENT_KEY",
          get: function get() {
            return EVENT_KEY$6;
          }
        }, {
          key: "DefaultType",
          get: function get() {
            return DefaultType$4;
          }
        }]);

        return Tooltip;
      }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[NAME$6] = Tooltip._jQueryInterface;
    $.fn[NAME$6].Constructor = Tooltip;

    $.fn[NAME$6].noConflict = function () {
      $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
      return Tooltip._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$7 = 'popover';
    var VERSION$7 = '4.3.1';
    var DATA_KEY$7 = 'bs.popover';
    var EVENT_KEY$7 = "." + DATA_KEY$7;
    var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
    var CLASS_PREFIX$1 = 'bs-popover';
    var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

    var Default$5 = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName$7 = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector$7 = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event$7 = {
      HIDE: "hide" + EVENT_KEY$7,
      HIDDEN: "hidden" + EVENT_KEY$7,
      SHOW: "show" + EVENT_KEY$7,
      SHOWN: "shown" + EVENT_KEY$7,
      INSERTED: "inserted" + EVENT_KEY$7,
      CLICK: "click" + EVENT_KEY$7,
      FOCUSIN: "focusin" + EVENT_KEY$7,
      FOCUSOUT: "focusout" + EVENT_KEY$7,
      MOUSEENTER: "mouseenter" + EVENT_KEY$7,
      MOUSELEAVE: "mouseleave" + EVENT_KEY$7
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
      /*#__PURE__*/
      function (_Tooltip) {
        _inheritsLoose(Popover, _Tooltip);

        function Popover() {
          return _Tooltip.apply(this, arguments) || this;
        }

        var _proto = Popover.prototype;

        // Overrides
        _proto.isWithContent = function isWithContent() {
          return this.getTitle() || this._getContent();
        };

        _proto.addAttachmentClass = function addAttachmentClass(attachment) {
          $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
        };

        _proto.getTipElement = function getTipElement() {
          this.tip = this.tip || $(this.config.template)[0];
          return this.tip;
        };

        _proto.setContent = function setContent() {
          var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

          this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

          var content = this._getContent();

          if (typeof content === 'function') {
            content = content.call(this.element);
          }

          this.setElementContent($tip.find(Selector$7.CONTENT), content);
          $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
        } // Private
        ;

        _proto._getContent = function _getContent() {
          return this.element.getAttribute('data-content') || this.config.content;
        };

        _proto._cleanTipClass = function _cleanTipClass() {
          var $tip = $(this.getTipElement());
          var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

          if (tabClass !== null && tabClass.length > 0) {
            $tip.removeClass(tabClass.join(''));
          }
        } // Static
        ;

        Popover._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY$7);

            var _config = typeof config === 'object' ? config : null;

            if (!data && /dispose|hide/.test(config)) {
              return;
            }

            if (!data) {
              data = new Popover(this, _config);
              $(this).data(DATA_KEY$7, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config]();
            }
          });
        };

        _createClass(Popover, null, [{
          key: "VERSION",
          // Getters
          get: function get() {
            return VERSION$7;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default$5;
          }
        }, {
          key: "NAME",
          get: function get() {
            return NAME$7;
          }
        }, {
          key: "DATA_KEY",
          get: function get() {
            return DATA_KEY$7;
          }
        }, {
          key: "Event",
          get: function get() {
            return Event$7;
          }
        }, {
          key: "EVENT_KEY",
          get: function get() {
            return EVENT_KEY$7;
          }
        }, {
          key: "DefaultType",
          get: function get() {
            return DefaultType$5;
          }
        }]);

        return Popover;
      }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[NAME$7] = Popover._jQueryInterface;
    $.fn[NAME$7].Constructor = Popover;

    $.fn[NAME$7].noConflict = function () {
      $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
      return Popover._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$8 = 'scrollspy';
    var VERSION$8 = '4.3.1';
    var DATA_KEY$8 = 'bs.scrollspy';
    var EVENT_KEY$8 = "." + DATA_KEY$8;
    var DATA_API_KEY$6 = '.data-api';
    var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
    var Default$6 = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType$6 = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event$8 = {
      ACTIVATE: "activate" + EVENT_KEY$8,
      SCROLL: "scroll" + EVENT_KEY$8,
      LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
    };
    var ClassName$8 = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector$8 = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
      /*#__PURE__*/
      function () {
        function ScrollSpy(element, config) {
          var _this = this;

          this._element = element;
          this._scrollElement = element.tagName === 'BODY' ? window : element;
          this._config = this._getConfig(config);
          this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
          this._offsets = [];
          this._targets = [];
          this._activeTarget = null;
          this._scrollHeight = 0;
          $(this._scrollElement).on(Event$8.SCROLL, function (event) {
            return _this._process(event);
          });
          this.refresh();

          this._process();
        } // Getters


        var _proto = ScrollSpy.prototype;

        // Public
        _proto.refresh = function refresh() {
          var _this2 = this;

          var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
          var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
          var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
          this._offsets = [];
          this._targets = [];
          this._scrollHeight = this._getScrollHeight();
          var targets = [].slice.call(document.querySelectorAll(this._selector));
          targets.map(function (element) {
            var target;
            var targetSelector = Util.getSelectorFromElement(element);

            if (targetSelector) {
              target = document.querySelector(targetSelector);
            }

            if (target) {
              var targetBCR = target.getBoundingClientRect();

              if (targetBCR.width || targetBCR.height) {
                // TODO (fat): remove sketch reliance on jQuery position/offset
                return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
              }
            }

            return null;
          }).filter(function (item) {
            return item;
          }).sort(function (a, b) {
            return a[0] - b[0];
          }).forEach(function (item) {
            _this2._offsets.push(item[0]);

            _this2._targets.push(item[1]);
          });
        };

        _proto.dispose = function dispose() {
          $.removeData(this._element, DATA_KEY$8);
          $(this._scrollElement).off(EVENT_KEY$8);
          this._element = null;
          this._scrollElement = null;
          this._config = null;
          this._selector = null;
          this._offsets = null;
          this._targets = null;
          this._activeTarget = null;
          this._scrollHeight = null;
        } // Private
        ;

        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

          if (typeof config.target !== 'string') {
            var id = $(config.target).attr('id');

            if (!id) {
              id = Util.getUID(NAME$8);
              $(config.target).attr('id', id);
            }

            config.target = "#" + id;
          }

          Util.typeCheckConfig(NAME$8, config, DefaultType$6);
          return config;
        };

        _proto._getScrollTop = function _getScrollTop() {
          return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        };

        _proto._getScrollHeight = function _getScrollHeight() {
          return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        };

        _proto._getOffsetHeight = function _getOffsetHeight() {
          return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        };

        _proto._process = function _process() {
          var scrollTop = this._getScrollTop() + this._config.offset;

          var scrollHeight = this._getScrollHeight();

          var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

          if (this._scrollHeight !== scrollHeight) {
            this.refresh();
          }

          if (scrollTop >= maxScroll) {
            var target = this._targets[this._targets.length - 1];

            if (this._activeTarget !== target) {
              this._activate(target);
            }

            return;
          }

          if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
            this._activeTarget = null;

            this._clear();

            return;
          }

          var offsetLength = this._offsets.length;

          for (var i = offsetLength; i--;) {
            var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

            if (isActiveTarget) {
              this._activate(this._targets[i]);
            }
          }
        };

        _proto._activate = function _activate(target) {
          this._activeTarget = target;

          this._clear();

          var queries = this._selector.split(',').map(function (selector) {
            return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
          });

          var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

          if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
            $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
            $link.addClass(ClassName$8.ACTIVE);
          } else {
            // Set triggered link as active
            $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
            // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

            $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

            $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
          }

          $(this._scrollElement).trigger(Event$8.ACTIVATE, {
            relatedTarget: target
          });
        };

        _proto._clear = function _clear() {
          [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
            return node.classList.contains(ClassName$8.ACTIVE);
          }).forEach(function (node) {
            return node.classList.remove(ClassName$8.ACTIVE);
          });
        } // Static
        ;

        ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY$8);

            var _config = typeof config === 'object' && config;

            if (!data) {
              data = new ScrollSpy(this, _config);
              $(this).data(DATA_KEY$8, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config]();
            }
          });
        };

        _createClass(ScrollSpy, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$8;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default$6;
          }
        }]);

        return ScrollSpy;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(window).on(Event$8.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$8] = ScrollSpy._jQueryInterface;
    $.fn[NAME$8].Constructor = ScrollSpy;

    $.fn[NAME$8].noConflict = function () {
      $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
      return ScrollSpy._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$9 = 'tab';
    var VERSION$9 = '4.3.1';
    var DATA_KEY$9 = 'bs.tab';
    var EVENT_KEY$9 = "." + DATA_KEY$9;
    var DATA_API_KEY$7 = '.data-api';
    var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
    var Event$9 = {
      HIDE: "hide" + EVENT_KEY$9,
      HIDDEN: "hidden" + EVENT_KEY$9,
      SHOW: "show" + EVENT_KEY$9,
      SHOWN: "shown" + EVENT_KEY$9,
      CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
    };
    var ClassName$9 = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector$9 = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
      /*#__PURE__*/
      function () {
        function Tab(element) {
          this._element = element;
        } // Getters


        var _proto = Tab.prototype;

        // Public
        _proto.show = function show() {
          var _this = this;

          if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
            return;
          }

          var target;
          var previous;
          var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
          var selector = Util.getSelectorFromElement(this._element);

          if (listElement) {
            var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
            previous = $.makeArray($(listElement).find(itemSelector));
            previous = previous[previous.length - 1];
          }

          var hideEvent = $.Event(Event$9.HIDE, {
            relatedTarget: this._element
          });
          var showEvent = $.Event(Event$9.SHOW, {
            relatedTarget: previous
          });

          if (previous) {
            $(previous).trigger(hideEvent);
          }

          $(this._element).trigger(showEvent);

          if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
            return;
          }

          if (selector) {
            target = document.querySelector(selector);
          }

          this._activate(this._element, listElement);

          var complete = function complete() {
            var hiddenEvent = $.Event(Event$9.HIDDEN, {
              relatedTarget: _this._element
            });
            var shownEvent = $.Event(Event$9.SHOWN, {
              relatedTarget: previous
            });
            $(previous).trigger(hiddenEvent);
            $(_this._element).trigger(shownEvent);
          };

          if (target) {
            this._activate(target, target.parentNode, complete);
          } else {
            complete();
          }
        };

        _proto.dispose = function dispose() {
          $.removeData(this._element, DATA_KEY$9);
          this._element = null;
        } // Private
        ;

        _proto._activate = function _activate(element, container, callback) {
          var _this2 = this;

          var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
          var active = activeElements[0];
          var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

          var complete = function complete() {
            return _this2._transitionComplete(element, active, callback);
          };

          if (active && isTransitioning) {
            var transitionDuration = Util.getTransitionDurationFromElement(active);
            $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        };

        _proto._transitionComplete = function _transitionComplete(element, active, callback) {
          if (active) {
            $(active).removeClass(ClassName$9.ACTIVE);
            var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

            if (dropdownChild) {
              $(dropdownChild).removeClass(ClassName$9.ACTIVE);
            }

            if (active.getAttribute('role') === 'tab') {
              active.setAttribute('aria-selected', false);
            }
          }

          $(element).addClass(ClassName$9.ACTIVE);

          if (element.getAttribute('role') === 'tab') {
            element.setAttribute('aria-selected', true);
          }

          Util.reflow(element);

          if (element.classList.contains(ClassName$9.FADE)) {
            element.classList.add(ClassName$9.SHOW);
          }

          if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
            var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

            if (dropdownElement) {
              var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
              $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
            }

            element.setAttribute('aria-expanded', true);
          }

          if (callback) {
            callback();
          }
        } // Static
        ;

        Tab._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var $this = $(this);
            var data = $this.data(DATA_KEY$9);

            if (!data) {
              data = new Tab(this);
              $this.data(DATA_KEY$9, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config]();
            }
          });
        };

        _createClass(Tab, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$9;
          }
        }]);

        return Tab;
      }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$9] = Tab._jQueryInterface;
    $.fn[NAME$9].Constructor = Tab;

    $.fn[NAME$9].noConflict = function () {
      $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
      return Tab._jQueryInterface;
    };

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$a = 'toast';
    var VERSION$a = '4.3.1';
    var DATA_KEY$a = 'bs.toast';
    var EVENT_KEY$a = "." + DATA_KEY$a;
    var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
    var Event$a = {
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
      HIDE: "hide" + EVENT_KEY$a,
      HIDDEN: "hidden" + EVENT_KEY$a,
      SHOW: "show" + EVENT_KEY$a,
      SHOWN: "shown" + EVENT_KEY$a
    };
    var ClassName$a = {
      FADE: 'fade',
      HIDE: 'hide',
      SHOW: 'show',
      SHOWING: 'showing'
    };
    var DefaultType$7 = {
      animation: 'boolean',
      autohide: 'boolean',
      delay: 'number'
    };
    var Default$7 = {
      animation: true,
      autohide: true,
      delay: 500
    };
    var Selector$a = {
      DATA_DISMISS: '[data-dismiss="toast"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Toast =
      /*#__PURE__*/
      function () {
        function Toast(element, config) {
          this._element = element;
          this._config = this._getConfig(config);
          this._timeout = null;

          this._setListeners();
        } // Getters


        var _proto = Toast.prototype;

        // Public
        _proto.show = function show() {
          var _this = this;

          $(this._element).trigger(Event$a.SHOW);

          if (this._config.animation) {
            this._element.classList.add(ClassName$a.FADE);
          }

          var complete = function complete() {
            _this._element.classList.remove(ClassName$a.SHOWING);

            _this._element.classList.add(ClassName$a.SHOW);

            $(_this._element).trigger(Event$a.SHOWN);

            if (_this._config.autohide) {
              _this.hide();
            }
          };

          this._element.classList.remove(ClassName$a.HIDE);

          this._element.classList.add(ClassName$a.SHOWING);

          if (this._config.animation) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        };

        _proto.hide = function hide(withoutTimeout) {
          var _this2 = this;

          if (!this._element.classList.contains(ClassName$a.SHOW)) {
            return;
          }

          $(this._element).trigger(Event$a.HIDE);

          if (withoutTimeout) {
            this._close();
          } else {
            this._timeout = setTimeout(function () {
              _this2._close();
            }, this._config.delay);
          }
        };

        _proto.dispose = function dispose() {
          clearTimeout(this._timeout);
          this._timeout = null;

          if (this._element.classList.contains(ClassName$a.SHOW)) {
            this._element.classList.remove(ClassName$a.SHOW);
          }

          $(this._element).off(Event$a.CLICK_DISMISS);
          $.removeData(this._element, DATA_KEY$a);
          this._element = null;
          this._config = null;
        } // Private
        ;

        _proto._getConfig = function _getConfig(config) {
          config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
          Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
          return config;
        };

        _proto._setListeners = function _setListeners() {
          var _this3 = this;

          $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
            return _this3.hide(true);
          });
        };

        _proto._close = function _close() {
          var _this4 = this;

          var complete = function complete() {
            _this4._element.classList.add(ClassName$a.HIDE);

            $(_this4._element).trigger(Event$a.HIDDEN);
          };

          this._element.classList.remove(ClassName$a.SHOW);

          if (this._config.animation) {
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        } // Static
        ;

        Toast._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY$a);

            var _config = typeof config === 'object' && config;

            if (!data) {
              data = new Toast(this, _config);
              $element.data(DATA_KEY$a, data);
            }

            if (typeof config === 'string') {
              if (typeof data[config] === 'undefined') {
                throw new TypeError("No method named \"" + config + "\"");
              }

              data[config](this);
            }
          });
        };

        _createClass(Toast, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION$a;
          }
        }, {
          key: "DefaultType",
          get: function get() {
            return DefaultType$7;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default$7;
          }
        }]);

        return Toast;
      }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[NAME$a] = Toast._jQueryInterface;
    $.fn[NAME$a].Constructor = Toast;

    $.fn[NAME$a].noConflict = function () {
      $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
      return Toast._jQueryInterface;
    };

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    (function () {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    })();

    exports.Util = Util;
    exports.Alert = Alert;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
    exports.Modal = Modal;
    exports.Popover = Popover;
    exports.Scrollspy = ScrollSpy;
    exports.Tab = Tab;
    exports.Toast = Toast;
    exports.Tooltip = Tooltip;

    Object.defineProperty(exports, '__esModule', {value: true});

  }));
//# sourceMappingURL=bootstrap.js.map

  /*! @preserve
 * bootbox.js
 * version: 5.1.1
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
  (function (root, factory) {

    if (typeof define === 'function' && define.amd) {
      // AMD
      define(['jquery'], factory);
    } else if (typeof exports === 'object') {
      // Node, CommonJS-like
      module.exports = factory(require('jquery'));
    } else {
      // Browser globals (root is window)
      root.bootbox = factory(root.jQuery);
    }
  }(this, function init($, undefined) {


    //  Polyfills Object.keys, if necessary.
    //  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
      Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

        return function (obj) {
          if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
          }

          var result = [], prop, i;

          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }

          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }

          return result;
        };
      }());
    }

    var exports = {};

    var VERSION = '5.0.0';
    exports.VERSION = VERSION;

    var locales = {};

    var templates = {
      dialog:
        '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-body"><div class="bootbox-body"></div></div>' +
        '</div>' +
        '</div>' +
        '</div>',
      header:
        '<div class="modal-header">' +
        '<h5 class="modal-title"></h5>' +
        '</div>',
      footer:
        '<div class="modal-footer"></div>',
      closeButton:
        '<button type="button" class="bootbox-close-button close" aria-hidden="true">&times;</button>',
      form:
        '<form class="bootbox-form"></form>',
      button:
        '<button type="button" class="btn"></button>',
      option:
        '<option></option>',
      promptMessage:
        '<div class="bootbox-prompt-message"></div>',
      inputs: {
        text:
          '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
        textarea:
          '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
        email:
          '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
        select:
          '<select class="bootbox-input bootbox-input-select form-control"></select>',
        checkbox:
          '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
        radio:
          '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
        date:
          '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
        time:
          '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
        number:
          '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
        password:
          '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
        range:
          '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'
      }
    };


    var defaults = {
      // default language
      locale: 'en',
      // show backdrop or not. Default to static so user has to interact with dialog
      backdrop: 'static',
      // animate the modal in/out
      animate: true,
      // additional class string applied to the top level dialog
      className: null,
      // whether or not to include a close button
      closeButton: true,
      // show the dialog immediately by default
      show: true,
      // dialog container
      container: 'body',
      // default value (used by the prompt helper)
      value: '',
      // default input type (used by the prompt helper)
      inputType: 'text',
      // switch button order from cancel/confirm (default) to confirm/cancel
      swapButtonOrder: false,
      // center modal vertically in page
      centerVertical: false,
      // Append "multiple" property to the select when using the "prompt" helper
      multiple: false,
      // Automatically scroll modal content when height exceeds viewport height
      scrollable: false
    };


    // PUBLIC FUNCTIONS
    // *************************************************************************************************************

    // Return all currently registered locales, or a specific locale if "name" is defined
    exports.locales = function (name) {
      return name ? locales[name] : locales;
    };


    // Register localized strings for the OK, Confirm, and Cancel buttons
    exports.addLocale = function (name, values) {
      $.each(['OK', 'CANCEL', 'CONFIRM'], function (_, v) {
        if (!values[v]) {
          throw new Error('Please supply a translation for "' + v + '"');
        }
      });

      locales[name] = {
        OK: values.OK,
        CANCEL: values.CANCEL,
        CONFIRM: values.CONFIRM
      };

      return exports;
    };


    // Remove a previously-registered locale
    exports.removeLocale = function (name) {
      if (name !== 'en') {
        delete locales[name];
      } else {
        throw new Error('"en" is used as the default and fallback locale and cannot be removed.');
      }

      return exports;
    };


    // Set the default locale
    exports.setLocale = function (name) {
      return exports.setDefaults('locale', name);
    };


    // Override default value(s) of Bootbox.
    exports.setDefaults = function () {
      var values = {};

      if (arguments.length === 2) {
        // allow passing of single key/value...
        values[arguments[0]] = arguments[1];
      } else {
        // ... and as an object too
        values = arguments[0];
      }

      $.extend(defaults, values);

      return exports;
    };

    exports.setTemplates = function () {
      var values = {};

      if (arguments.length === 3) {
        // allow passing of {key1: {key2: value}} as setTemplates(key1, key2, value)...
        values[arguments[0]] = {};
        values[arguments[0]][arguments[1]] = arguments[2];
      } else if (arguments.length === 2) {
        // ...or allow passing of {key: value} as setTemplates(key, value)...
        values[arguments[0]] = arguments[1];
      } else {
        // ... and as an object too setTemplates(value)
        values = arguments[0];
      }

      $.extend(templates, values);
    };


    // Hides all currently active Bootbox modals
    exports.hideAll = function () {
      $('.bootbox').modal('hide');

      return exports;
    };


    // Allows the base init() function to be overridden
    exports.init = function (_$) {
      return init(_$ || $);
    };


    // CORE HELPER FUNCTIONS
    // *************************************************************************************************************

    // Core dialog function
    exports.dialog = function (options) {
      if ($.fn.modal === undefined) {
        throw new Error(
          '"$.fn.modal" is not defined; please double check you have included ' +
          'the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ ' +
          'for more details.'
        );
      }

      options = sanitize(options);

      if ($.fn.modal.Constructor.VERSION) {
        options.fullBootstrapVersion = $.fn.modal.Constructor.VERSION;
        var i = options.fullBootstrapVersion.indexOf('.');
        options.bootstrap = options.fullBootstrapVersion.substring(0, i);
      } else {
        // Assuming version 2.3.2, as that was the last "supported" 2.x version
        options.bootstrap = '2';
        options.fullBootstrapVersion = '2.3.2';
        console.warn('Bootbox will *mostly* work with Bootstrap 2, but we do not officially support it. Please upgrade, if possible.');
      }

      var dialog = $(templates.dialog);
      var innerDialog = dialog.find('.modal-dialog');
      var body = dialog.find('.modal-body');
      var header = $(templates.header);
      var footer = $(templates.footer);
      var buttons = options.buttons;

      var callbacks = {
        onEscape: options.onEscape
      };

      body.find('.bootbox-body').html(options.message);

      // Only attempt to create buttons if at least one has
      // been defined in the options object
      if (getKeyLength(options.buttons) > 0) {
        each(buttons, function (key, b) {
          var button = $(templates.button);
          button.data('bb-handler', key);
          button.addClass(b.className);

          switch (key) {
            case 'ok':
            case 'confirm':
              button.addClass('bootbox-accept');
              break;

            case 'cancel':
              button.addClass('bootbox-cancel');
              break;
          }

          button.html(b.label);
          footer.append(button);

          callbacks[key] = b.callback;
        });

        body.after(footer);
      }

      if (options.animate === true) {
        dialog.addClass('fade');
      }

      if (options.className) {
        dialog.addClass(options.className);
      }

      if (options.size) {
        // Requires Bootstrap 3.1.0 or higher
        if (options.fullBootstrapVersion.substring(0, 3) < '3.1') {
          console.warn('"size" requires Bootstrap 3.1.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
        }

        switch (options.size) {
          case 'small':
          case 'sm':
            innerDialog.addClass('modal-sm');
            break;

          case 'large':
          case 'lg':
            innerDialog.addClass('modal-lg');
            break;

          case 'xl':
          case 'extra-large':
            // Requires Bootstrap 4.2.0 or higher
            if (options.fullBootstrapVersion.substring(0, 3) < '4.2') {
              console.warn('Using size "xl"/"extra-large" requires Bootstrap 4.2.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
            }
            innerDialog.addClass('modal-xl');
            break;
        }
      }

      if (options.scrollable) {
        // Requires Bootstrap 4.3.0 or higher
        if (options.fullBootstrapVersion.substring(0, 3) < '4.3') {
          console.warn('Using "scrollable" requires Bootstrap 4.3.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
        }

        innerDialog.addClass('modal-dialog-scrollable');
      }

      if (options.title) {
        body.before(header);
        dialog.find('.modal-title').html(options.title);
      }

      if (options.closeButton) {
        var closeButton = $(templates.closeButton);

        if (options.title) {
          if (options.bootstrap > 3) {
            dialog.find('.modal-header').append(closeButton);
          } else {
            dialog.find('.modal-header').prepend(closeButton);
          }
        } else {
          closeButton.prependTo(body);
        }
      }

      if (options.centerVertical) {
        // Requires Bootstrap 4.0.0-beta.3 or higher
        if (options.fullBootstrapVersion < '4.0.0') {
          console.warn('"centerVertical" requires Bootstrap 4.0.0-beta.3 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
        }

        innerDialog.addClass('modal-dialog-centered');
      }

      // Bootstrap event listeners; these handle extra
      // setup & teardown required after the underlying
      // modal has performed certain actions.

      // make sure we unbind any listeners once the dialog has definitively been dismissed
      dialog.one('hide.bs.modal', function (e) {
        if (e.target === this) {
          dialog.off('escape.close.bb');
          dialog.off('click');
        }
      });

      dialog.one('hidden.bs.modal', function (e) {
        // ensure we don't accidentally intercept hidden events triggered
        // by children of the current dialog. We shouldn't need to handle this anymore,
        // now that Bootstrap namespaces its events, but still worth doing.
        if (e.target === this) {
          dialog.remove();
        }
      });

      dialog.one('shown.bs.modal', function () {
        dialog.find('.bootbox-accept:first').trigger('focus');
      });

      // Bootbox event listeners; used to decouple some
      // behaviours from their respective triggers

      if (options.backdrop !== 'static') {
        // A boolean true/false according to the Bootstrap docs
        // should show a dialog the user can dismiss by clicking on
        // the background.
        // We always only ever pass static/false to the actual
        // $.modal function because with "true" we can't trap
        // this event (the .modal-backdrop swallows it)
        // However, we still want to sort of respect true
        // and invoke the escape mechanism instead
        dialog.on('click.dismiss.bs.modal', function (e) {
          // @NOTE: the target varies in >= 3.3.x releases since the modal backdrop
          // moved *inside* the outer dialog rather than *alongside* it
          if (dialog.children('.modal-backdrop').length) {
            e.currentTarget = dialog.children('.modal-backdrop').get(0);
          }

          if (e.target !== e.currentTarget) {
            return;
          }

          dialog.trigger('escape.close.bb');
        });
      }

      dialog.on('escape.close.bb', function (e) {
        // the if statement looks redundant but it isn't; without it
        // if we *didn't* have an onEscape handler then processCallback
        // would automatically dismiss the dialog
        if (callbacks.onEscape) {
          processCallback(e, dialog, callbacks.onEscape);
        }
      });


      dialog.on('click', '.modal-footer button:not(.disabled)', function (e) {
        var callbackKey = $(this).data('bb-handler');

        processCallback(e, dialog, callbacks[callbackKey]);
      });

      dialog.on('click', '.bootbox-close-button', function (e) {
        // onEscape might be falsy but that's fine; the fact is
        // if the user has managed to click the close button we
        // have to close the dialog, callback or not
        processCallback(e, dialog, callbacks.onEscape);
      });

      dialog.on('keyup', function (e) {
        if (e.which === 27) {
          dialog.trigger('escape.close.bb');
        }
      });

      // the remainder of this method simply deals with adding our
      // dialogent to the DOM, augmenting it with Bootstrap's modal
      // functionality and then giving the resulting object back
      // to our caller

      $(options.container).append(dialog);

      dialog.modal({
        backdrop: options.backdrop ? 'static' : false,
        keyboard: false,
        show: false
      });

      if (options.show) {
        dialog.modal('show');
      }

      return dialog;
    };


    // Helper function to simulate the native alert() behavior. **NOTE**: This is non-blocking, so any
    // code that must happen after the alert is dismissed should be placed within the callback function
    // for this alert.
    exports.alert = function () {
      var options;

      options = mergeDialogOptions('alert', ['ok'], ['message', 'callback'], arguments);

      // @TODO: can this move inside exports.dialog when we're iterating over each
      // button and checking its button.callback value instead?
      if (options.callback && !$.isFunction(options.callback)) {
        throw new Error('alert requires the "callback" property to be a function when provided');
      }

      // override the ok and escape callback to make sure they just invoke
      // the single user-supplied one (if provided)
      options.buttons.ok.callback = options.onEscape = function () {
        if ($.isFunction(options.callback)) {
          return options.callback.call(this);
        }

        return true;
      };

      return exports.dialog(options);
    };


    // Helper function to simulate the native confirm() behavior. **NOTE**: This is non-blocking, so any
    // code that must happen after the confirm is dismissed should be placed within the callback function
    // for this confirm.
    exports.confirm = function () {
      var options;

      options = mergeDialogOptions('confirm', ['cancel', 'confirm'], ['message', 'callback'], arguments);

      // confirm specific validation; they don't make sense without a callback so make
      // sure it's present
      if (!$.isFunction(options.callback)) {
        throw new Error('confirm requires a callback');
      }

      // overrides; undo anything the user tried to set they shouldn't have
      options.buttons.cancel.callback = options.onEscape = function () {
        return options.callback.call(this, false);
      };

      options.buttons.confirm.callback = function () {
        return options.callback.call(this, true);
      };

      return exports.dialog(options);
    };


    // Helper function to simulate the native prompt() behavior. **NOTE**: This is non-blocking, so any
    // code that must happen after the prompt is dismissed should be placed within the callback function
    // for this prompt.
    exports.prompt = function () {
      var options;
      var promptDialog;
      var form;
      var input;
      var shouldShow;
      var inputOptions;

      // we have to create our form first otherwise
      // its value is undefined when gearing up our options
      // @TODO this could be solved by allowing message to
      // be a function instead...
      form = $(templates.form);

      // prompt defaults are more complex than others in that
      // users can override more defaults
      options = mergeDialogOptions('prompt', ['cancel', 'confirm'], ['title', 'callback'], arguments);

      if (!options.value) {
        options.value = defaults.value;
      }

      if (!options.inputType) {
        options.inputType = defaults.inputType;
      }

      // capture the user's show value; we always set this to false before
      // spawning the dialog to give us a chance to attach some handlers to
      // it, but we need to make sure we respect a preference not to show it
      shouldShow = (options.show === undefined) ? defaults.show : options.show;
      // This is required prior to calling the dialog builder below - we need to
      // add an event handler just before the prompt is shown
      options.show = false;

      // Handles the 'cancel' action
      options.buttons.cancel.callback = options.onEscape = function () {
        return options.callback.call(this, null);
      };

      // Prompt submitted - extract the prompt value. This requires a bit of work,
      // given the different input types available.
      options.buttons.confirm.callback = function () {
        var value;

        if (options.inputType === 'checkbox') {
          value = input.find('input:checked').map(function () {
            return $(this).val();
          }).get();
        } else if (options.inputType === 'radio') {
          value = input.find('input:checked').val();
        } else {
          if (input[0].checkValidity && !input[0].checkValidity()) {
            // prevents button callback from being called
            return false;
          } else {
            if (options.inputType === 'select' && options.multiple === true) {
              value = input.find('option:selected').map(function () {
                return $(this).val();
              }).get();
            } else {
              value = input.val();
            }
          }
        }

        return options.callback.call(this, value);
      };

      // prompt-specific validation
      if (!options.title) {
        throw new Error('prompt requires a title');
      }

      if (!$.isFunction(options.callback)) {
        throw new Error('prompt requires a callback');
      }

      if (!templates.inputs[options.inputType]) {
        throw new Error('Invalid prompt type');
      }

      // create the input based on the supplied type
      input = $(templates.inputs[options.inputType]);

      switch (options.inputType) {
        case 'text':
        case 'textarea':
        case 'email':
        case 'password':
          input.val(options.value);

          if (options.placeholder) {
            input.attr('placeholder', options.placeholder);
          }

          if (options.pattern) {
            input.attr('pattern', options.pattern);
          }

          if (options.maxlength) {
            input.attr('maxlength', options.maxlength);
          }

          if (options.required) {
            input.prop({'required': true});
          }

          if (options.rows && !isNaN(parseInt(options.rows))) {
            if (options.inputType === 'textarea') {
              input.attr({'rows': options.rows});
            }
          }

          break;


        case 'date':
        case 'time':
        case 'number':
        case 'range':
          input.val(options.value);

          if (options.placeholder) {
            input.attr('placeholder', options.placeholder);
          }

          if (options.pattern) {
            input.attr('pattern', options.pattern);
          }

          if (options.required) {
            input.prop({'required': true});
          }

          // These input types have extra attributes which affect their input validation.
          // Warning: For most browsers, date inputs are buggy in their implementation of 'step', so
          // this attribute will have no effect. Therefore, we don't set the attribute for date inputs.
          // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#Setting_maximum_and_minimum_dates
          if (options.inputType !== 'date') {
            if (options.step) {
              if (options.step === 'any' || (!isNaN(options.step) && parseInt(options.step) > 0)) {
                input.attr('step', options.step);
              } else {
                throw new Error('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
              }
            }
          }

          if (minAndMaxAreValid(options.inputType, options.min, options.max)) {
            if (options.min !== undefined) {
              input.attr('min', options.min);
            }
            if (options.max !== undefined) {
              input.attr('max', options.max);
            }
          }

          break;


        case 'select':
          var groups = {};
          inputOptions = options.inputOptions || [];

          if (!$.isArray(inputOptions)) {
            throw new Error('Please pass an array of input options');
          }

          if (!inputOptions.length) {
            throw new Error('prompt with "inputType" set to "select" requires at least one option');
          }

          // placeholder is not actually a valid attribute for select,
          // but we'll allow it, assuming it might be used for a plugin
          if (options.placeholder) {
            input.attr('placeholder', options.placeholder);
          }

          if (options.required) {
            input.prop({'required': true});
          }

          if (options.multiple) {
            input.prop({'multiple': true});
          }

          each(inputOptions, function (_, option) {
            // assume the element to attach to is the input...
            var elem = input;

            if (option.value === undefined || option.text === undefined) {
              throw new Error('each option needs a "value" property and a "text" property');
            }

            // ... but override that element if this option sits in a group

            if (option.group) {
              // initialise group if necessary
              if (!groups[option.group]) {
                groups[option.group] = $('<optgroup />').attr('label', option.group);
              }

              elem = groups[option.group];
            }

            var o = $(templates.option);
            o.attr('value', option.value).text(option.text);
            elem.append(o);
          });

          each(groups, function (_, group) {
            input.append(group);
          });

          // safe to set a select's value as per a normal input
          input.val(options.value);

          break;


        case 'checkbox':
          var checkboxValues = $.isArray(options.value) ? options.value : [options.value];
          inputOptions = options.inputOptions || [];

          if (!inputOptions.length) {
            throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');
          }

          // checkboxes have to nest within a containing element, so
          // they break the rules a bit and we end up re-assigning
          // our 'input' element to this container instead
          input = $('<div class="bootbox-checkbox-list"></div>');

          each(inputOptions, function (_, option) {
            if (option.value === undefined || option.text === undefined) {
              throw new Error('each option needs a "value" property and a "text" property');
            }

            var checkbox = $(templates.inputs[options.inputType]);

            checkbox.find('input').attr('value', option.value);
            checkbox.find('label').append('\n' + option.text);

            // we've ensured values is an array so we can always iterate over it
            each(checkboxValues, function (_, value) {
              if (value === option.value) {
                checkbox.find('input').prop('checked', true);
              }
            });

            input.append(checkbox);
          });
          break;


        case 'radio':
          // Make sure that value is not an array (only a single radio can ever be checked)
          if (options.value !== undefined && $.isArray(options.value)) {
            throw new Error('prompt with "inputType" set to "radio" requires a single, non-array value for "value"');
          }

          inputOptions = options.inputOptions || [];

          if (!inputOptions.length) {
            throw new Error('prompt with "inputType" set to "radio" requires at least one option');
          }

          // Radiobuttons have to nest within a containing element, so
          // they break the rules a bit and we end up re-assigning
          // our 'input' element to this container instead
          input = $('<div class="bootbox-radiobutton-list"></div>');

          // Radiobuttons should always have an initial checked input checked in a "group".
          // If value is undefined or doesn't match an input option, select the first radiobutton
          var checkFirstRadio = true;

          each(inputOptions, function (_, option) {
            if (option.value === undefined || option.text === undefined) {
              throw new Error('each option needs a "value" property and a "text" property');
            }

            var radio = $(templates.inputs[options.inputType]);

            radio.find('input').attr('value', option.value);
            radio.find('label').append('\n' + option.text);

            if (options.value !== undefined) {
              if (option.value === options.value) {
                radio.find('input').prop('checked', true);
                checkFirstRadio = false;
              }
            }

            input.append(radio);
          });

          if (checkFirstRadio) {
            input.find('input[type="radio"]').first().prop('checked', true);
          }
          break;
      }

      // now place it in our form
      form.append(input);

      form.on('submit', function (e) {
        e.preventDefault();
        // Fix for SammyJS (or similar JS routing library) hijacking the form post.
        e.stopPropagation();

        // @TODO can we actually click *the* button object instead?
        // e.g. buttons.confirm.click() or similar
        promptDialog.find('.bootbox-accept').trigger('click');
      });

      if ($.trim(options.message) !== '') {
        // Add the form to whatever content the user may have added.
        var message = $(templates.promptMessage).html(options.message);
        form.prepend(message);
        options.message = form;
      } else {
        options.message = form;
      }

      // Generate the dialog
      promptDialog = exports.dialog(options);

      // clear the existing handler focusing the submit button...
      promptDialog.off('shown.bs.modal');

      // ...and replace it with one focusing our input, if possible
      promptDialog.on('shown.bs.modal', function () {
        // need the closure here since input isn't
        // an object otherwise
        input.focus();
      });

      if (shouldShow === true) {
        promptDialog.modal('show');
      }

      return promptDialog;
    };


    // INTERNAL FUNCTIONS
    // *************************************************************************************************************

    // Map a flexible set of arguments into a single returned object
    // If args.length is already one just return it, otherwise
    // use the properties argument to map the unnamed args to
    // object properties.
    // So in the latter case:
    //  mapArguments(["foo", $.noop], ["message", "callback"])
    //  -> { message: "foo", callback: $.noop }
    function mapArguments(args, properties) {
      var argn = args.length;
      var options = {};

      if (argn < 1 || argn > 2) {
        throw new Error('Invalid argument length');
      }

      if (argn === 2 || typeof args[0] === 'string') {
        options[properties[0]] = args[0];
        options[properties[1]] = args[1];
      } else {
        options = args[0];
      }

      return options;
    }


    //  Merge a set of default dialog options with user supplied arguments
    function mergeArguments(defaults, args, properties) {
      return $.extend(
        // deep merge
        true,
        // ensure the target is an empty, unreferenced object
        {},
        // the base options object for this type of dialog (often just buttons)
        defaults,
        // args could be an object or array; if it's an array properties will
        // map it to a proper options object
        mapArguments(
          args,
          properties
        )
      );
    }


    //  This entry-level method makes heavy use of composition to take a simple
    //  range of inputs and return valid options suitable for passing to bootbox.dialog
    function mergeDialogOptions(className, labels, properties, args) {
      var locale;
      if (args && args[0]) {
        locale = args[0].locale || defaults.locale;
        var swapButtons = args[0].swapButtonOrder || defaults.swapButtonOrder;

        if (swapButtons) {
          labels = labels.reverse();
        }
      }

      //  build up a base set of dialog properties
      var baseOptions = {
        className: 'bootbox-' + className,
        buttons: createLabels(labels, locale)
      };

      // Ensure the buttons properties generated, *after* merging
      // with user args are still valid against the supplied labels
      return validateButtons(
        // merge the generated base properties with user supplied arguments
        mergeArguments(
          baseOptions,
          args,
          // if args.length > 1, properties specify how each arg maps to an object key
          properties
        ),
        labels
      );
    }


    //  Checks each button object to see if key is valid.
    //  This function will only be called by the alert, confirm, and prompt helpers.
    function validateButtons(options, buttons) {
      var allowedButtons = {};
      each(buttons, function (key, value) {
        allowedButtons[value] = true;
      });

      each(options.buttons, function (key) {
        if (allowedButtons[key] === undefined) {
          throw new Error('button key "' + key + '" is not allowed (options are ' + buttons.join(' ') + ')');
        }
      });

      return options;
    }


    //  From a given list of arguments, return a suitable object of button labels.
    //  All this does is normalise the given labels and translate them where possible.
    //  e.g. "ok", "confirm" -> { ok: "OK", cancel: "Annuleren" }
    function createLabels(labels, locale) {
      var buttons = {};

      for (var i = 0, j = labels.length; i < j; i++) {
        var argument = labels[i];
        var key = argument.toLowerCase();
        var value = argument.toUpperCase();

        buttons[key] = {
          label: getText(value, locale)
        };
      }

      return buttons;
    }


    //  Get localized text from a locale. Defaults to 'en' locale if no locale
    //  provided or a non-registered locale is requested
    function getText(key, locale) {
      var labels = locales[locale];

      return labels ? labels[key] : locales.en[key];
    }


    //  Filter and tidy up any user supplied parameters to this dialog.
    //  Also looks for any shorthands used and ensures that the options
    //  which are returned are all normalized properly
    function sanitize(options) {
      var buttons;
      var total;

      if (typeof options !== 'object') {
        throw new Error('Please supply an object of options');
      }

      if (!options.message) {
        throw new Error('"message" option must not be null or an empty string.');
      }

      // make sure any supplied options take precedence over defaults
      options = $.extend({}, defaults, options);

      // no buttons is still a valid dialog but it's cleaner to always have
      // a buttons object to iterate over, even if it's empty
      if (!options.buttons) {
        options.buttons = {};
      }

      buttons = options.buttons;

      total = getKeyLength(buttons);

      each(buttons, function (key, button, index) {
        if ($.isFunction(button)) {
          // short form, assume value is our callback. Since button
          // isn't an object it isn't a reference either so re-assign it
          button = buttons[key] = {
            callback: button
          };
        }

        // before any further checks make sure by now button is the correct type
        if ($.type(button) !== 'object') {
          throw new Error('button with key "' + key + '" must be an object');
        }

        if (!button.label) {
          // the lack of an explicit label means we'll assume the key is good enough
          button.label = key;
        }

        if (!button.className) {
          var isPrimary = false;
          if (options.swapButtonOrder) {
            isPrimary = index === 0;
          } else {
            isPrimary = index === total - 1;
          }

          if (total <= 2 && isPrimary) {
            // always add a primary to the main option in a one or two-button dialog
            button.className = 'btn-primary';
          } else {
            // adding both classes allows us to target both BS3 and BS4 without needing to check the version
            button.className = 'btn-secondary btn-default';
          }
        }
      });

      return options;
    }


    //  Returns a count of the properties defined on the object
    function getKeyLength(obj) {
      return Object.keys(obj).length;
    }


    //  Tiny wrapper function around jQuery.each; just adds index as the third parameter
    function each(collection, iterator) {
      var index = 0;
      $.each(collection, function (key, value) {
        iterator(key, value, index++);
      });
    }


    //  Handle the invoked dialog callback
    function processCallback(e, dialog, callback) {
      e.stopPropagation();
      e.preventDefault();

      // by default we assume a callback will get rid of the dialog,
      // although it is given the opportunity to override this

      // so, if the callback can be invoked and it *explicitly returns false*
      // then we'll set a flag to keep the dialog active...
      var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;

      // ... otherwise we'll bin it
      if (!preserveDialog) {
        dialog.modal('hide');
      }
    }

    // Validate `min` and `max` values based on the current `inputType` value
    function minAndMaxAreValid(type, min, max) {
      var result = false;
      var minValid = true;
      var maxValid = true;

      if (type === 'date') {
        if (min !== undefined && !(minValid = dateIsValid(min))) {
          console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your min value may not be enforced by this browser.');
        } else if (max !== undefined && !(maxValid = dateIsValid(max))) {
          console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your max value may not be enforced by this browser.');
        }
      } else if (type === 'time') {
        if (min !== undefined && !(minValid = timeIsValid(min))) {
          throw new Error('"min" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');
        } else if (max !== undefined && !(maxValid = timeIsValid(max))) {
          throw new Error('"max" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');
        }
      } else {
        if (min !== undefined && isNaN(min)) {
          throw new Error('"min" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-min for more information.');
        }

        if (max !== undefined && isNaN(max)) {
          throw new Error('"max" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');
        }
      }

      if (minValid && maxValid) {
        if (max <= min) {
          throw new Error('"max" must be greater than "min". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');
        } else {
          result = true;
        }
      }

      return result;
    }

    function timeIsValid(value) {
      return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(value);
    }

    function dateIsValid(value) {
      return /(\d{4})-(\d{2})-(\d{2})/.test(value);
    }


    //  Register the default locale
    exports.addLocale('en', {
      OK: 'OK',
      CANCEL: 'Cancel',
      CONFIRM: 'OK'
    });


    //  The Bootbox object
    return exports;
  }));
  bootbox.setTemplates({
    dialog:
      '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-body"><div class="bootbox-body"></div></div>' +
      '</div>' +
      '</div>' +
      '</div>',
    header:
      '<div class="modal-header">' +
      '<h5 class="modal-title"></h5>' +
      '</div>',
    footer:
      '<div class="modal-footer"></div>',
    closeButton:
      '<button type="button" class="bootbox-close-button close" aria-hidden="true"><i class="fal fa-times"></i></button>',
    form:
      '<form class="bootbox-form"></form>',
    button:
      '<button type="button" class="btn"></button>',
    option:
      '<option></option>',
    promptMessage:
      '<div class="bootbox-prompt-message"></div>',
    inputs: {
      text:
        '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
      textarea:
        '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
      email:
        '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
      select:
        '<select class="bootbox-input bootbox-input-select form-control"></select>',
      checkbox:
        '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
      radio:
        '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
      date:
        '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
      time:
        '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
      number:
        '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
      password:
        '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
      range:
        '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'
    }

  });

  /**
   * author: andreas johan virkus
   * snippet url: https://gist.github.com/andreasvirkus/bfaedc839de0d46ffe4c
   *
   * Remove classes that have given prefix
   * Example: You have an element with classes "apple juiceSmall juiceBig banana"
   * You run:
   *   $elem.removeClassPrefix('juice');
   * The resulting classes are "apple banana"
   */
  $.fn.removeClassPrefix = function (prefix) {
    this.each(function (i, it) {
      var classes = it.className.split(" ").map(function (item) {
        return item.indexOf(prefix) === 0 ? "" : item;
      });
      it.className = classes.join(" ");
    });

    return this;
  };

  /**
   * "http://dummy.com/?technology=jquery&blog=jquerybyexample".
   * 1 var tech = getUrlParameter('technology');
   * 2 var blog = getUrlParameter('blog');
   * note: we are using this inside icon generator page
   */
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  /**
   * detect IE
   * returns version of IE or false, if browser is not Internet Explorer
   */
  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

  /*
 * Toggle text
 * $(".example").toggleText('Initial', 'Secondary');
 * https://stackoverflow.com/questions/2155453/jquery-toggle-text
 */
  jQuery.fn.extend({
    toggleText: function (a, b) {
      var that = this;
      if (that.text() != a && that.text() != b) {
        that.text(a);
      } else if (that.text() == a) {
        that.text(b);
      } else if (that.text() == b) {
        that.text(a);
      }
      return this;
    }
  });

  /*
 * Convert RGB to HEX
 * rgb2hex(hex_value)
 */
  function rgb2hex(rgb) {
    if(rgb != null){
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
  }

  /*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery throttle / debounce: Sometimes, less is more!
//
// *Version: 1.1, Last updated: 3/7/2010*
//
// Project Home - http://benalman.com/projects/jquery-throttle-debounce-plugin/
// GitHub       - http://github.com/cowboy/jquery-throttle-debounce/
// Source       - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.js
// (Minified)   - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.min.js (0.7kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
//
// Throttle - http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
// Debounce - http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - none, 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-throttle-debounce/unit/
//
// About: Release History
//
// 1.1 - (3/7/2010) Fixed a bug in <jQuery.throttle> where trailing callbacks
//       executed later than they should. Reworked a fair amount of internal
//       logic as well.
// 1.0 - (3/6/2010) Initial release as a stand-alone project. Migrated over
//       from jquery-misc repo v0.4 to jquery-throttle repo v1.0, added the
//       no_trailing throttle parameter and debounce functionality.
//
// Topic: Note for non-jQuery users
//
// jQuery isn't actually required for this plugin, because nothing internal
// uses any jQuery methods or properties. jQuery is just used as a namespace
// under which these methods can exist.
//
// Since jQuery isn't actually required for this plugin, if jQuery doesn't exist
// when this plugin is loaded, the method described below will be created in
// the `Cowboy` namespace. Usage will be exactly the same, but instead of
// $.method() or jQuery.method(), you'll need to use Cowboy.method().

  (function (window, undefined) {
    '$:nomunge'; // Used by YUI compressor.

    // Since jQuery really isn't required for this plugin, use `jQuery` as the
    // namespace only if it already exists, otherwise use the `Cowboy` namespace,
    // creating it if necessary.
    var $ = window.jQuery || window.Cowboy || (window.Cowboy = {}),

      // Internal method reference.
      jq_throttle;



    $.throttle = jq_throttle = function (delay, no_trailing, callback, debounce_mode) {
      // After wrapper has stopped being called, this timeout ensures that
      // `callback` is executed at the proper times in `throttle` and `end`
      // debounce modes.
      var timeout_id,

        // Keep track of the last time `callback` was executed.
        last_exec = 0;

      // `no_trailing` defaults to falsy.
      if (typeof no_trailing !== 'boolean') {
        debounce_mode = callback;
        callback = no_trailing;
        no_trailing = undefined;
      }

      // The `wrapper` function encapsulates all of the throttling / debouncing
      // functionality and when executed will limit the rate at which `callback`
      // is executed.
      function wrapper() {
        var that = this,
          elapsed = +new Date() - last_exec,
          args = arguments;

        // Execute `callback` and update the `last_exec` timestamp.
        function exec() {
          last_exec = +new Date();
          callback.apply(that, args);
        };

        // If `debounce_mode` is true (at_begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
          timeout_id = undefined;
        };

        if (debounce_mode && !timeout_id) {
          // Since `wrapper` is being called for the first time and
          // `debounce_mode` is true (at_begin), execute `callback`.
          exec();
        }

        // Clear any existing timeout.
        timeout_id && clearTimeout(timeout_id);

        if (debounce_mode === undefined && elapsed > delay) {
          // In throttle mode, if `delay` time has been exceeded, execute
          // `callback`.
          exec();

        } else if (no_trailing !== true) {
          // In trailing throttle mode, since `delay` time has not been
          // exceeded, schedule `callback` to execute `delay` ms after most
          // recent execution.
          //
          // If `debounce_mode` is true (at_begin), schedule `clear` to execute
          // after `delay` ms.
          //
          // If `debounce_mode` is false (at end), schedule `callback` to
          // execute after `delay` ms.
          timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
        }
      };

      // Set the guid of `wrapper` function to the same of original callback, so
      // it can be removed in jQuery 1.4+ .unbind or .die by using the original
      // callback as a reference.
      if ($.guid) {
        wrapper.guid = callback.guid = callback.guid || $.guid++;
      }

      // Return the wrapper function.
      return wrapper;
    };



    $.debounce = function (delay, at_begin, callback) {
      return callback === undefined
        ? jq_throttle(delay, at_begin, false)
        : jq_throttle(delay, callback, at_begin !== false);
    };

  })(this);

  /*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
  (function ($) {

    $.fn.extend({
      slimScroll: function (options) {

        var defaults = {

          // width in pixels of the visible scroll area
          width: 'auto',

          // height in pixels of the visible scroll area
          height: '250px',

          // width in pixels of the scrollbar and rail
          size: '7px',

          // scrollbar color, accepts any hex/color value
          color: '#000',

          // scrollbar position - left/right
          position: 'right',

          // distance in pixels between the side edge and the scrollbar
          distance: '1px',

          // default scroll position on load - top / bottom / $('selector')
          start: 'top',

          // sets scrollbar opacity
          opacity: .4,

          // enables always-on mode for the scrollbar
          alwaysVisible: false,

          // check if we should hide the scrollbar when user is hovering over
          disableFadeOut: false,

          // sets visibility of the rail
          railVisible: false,

          // sets rail color
          railColor: '#333',

          // sets rail opacity
          railOpacity: .2,

          // whether  we should use jQuery UI Draggable to enable bar dragging
          railDraggable: true,

          // defautlt CSS class of the slimscroll rail
          railClass: 'slimScrollRail',

          // defautlt CSS class of the slimscroll bar
          barClass: 'slimScrollBar',

          // defautlt CSS class of the slimscroll wrapper
          wrapperClass: 'slimScrollDiv',

          // check if mousewheel should scroll the window if we reach top/bottom
          allowPageScroll: false,

          // scroll amount applied to each mouse wheel step
          wheelStep: 20,

          // scroll amount applied when user is using gestures
          touchScrollStep: 200,

          // sets border radius
          borderRadius: '7px',

          // sets border radius of the rail
          railBorderRadius: '7px'
        };

        var o = $.extend(defaults, options);

        // do it for every element that matches selector
        this.each(function () {

          var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
            barHeight, percentScroll, lastScroll,
            divS = '<div></div>',
            minBarHeight = 30,
            releaseScroll = false;

          // used in event handlers and for better minification
          var me = $(this);

          // ensure we are not binding it again
          if (me.parent().hasClass(o.wrapperClass)) {
            // start from last bar position
            var offset = me.scrollTop();

            // find bar and rail
            bar = me.siblings('.' + o.barClass);
            rail = me.siblings('.' + o.railClass);

            getBarHeight();

            // check if we should scroll existing instance
            if ($.isPlainObject(options)) {
              // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
              if ('height' in options && options.height == 'auto') {
                me.parent().css('height', 'auto');
                me.css('height', 'auto');
                var height = me.parent().parent().height();
                me.parent().css('height', height);
                me.css('height', height);
              } else if ('height' in options) {
                var h = options.height;
                me.parent().css('height', h);
                me.css('height', h);
              }

              if ('scrollTo' in options) {
                // jump to a static point
                offset = parseInt(o.scrollTo);
              } else if ('scrollBy' in options) {
                // jump by value pixels
                offset += parseInt(o.scrollBy);
              } else if ('destroy' in options) {
                // remove slimscroll elements
                bar.remove();
                rail.remove();
                me.unwrap();
                return;
              }

              // scroll content by the given offset
              scrollContent(offset, false, true);
            }

            return;
          } else if ($.isPlainObject(options)) {
            if ('destroy' in options) {
              return;
            }
          }

          // optionally set height to the parent's height
          o.height = (o.height == 'auto') ? me.parent().height() : o.height;

          // wrap content
          var wrapper = $(divS)
            .addClass(o.wrapperClass)
            .css({
              position: 'relative',
              overflow: 'hidden',
              width: o.width,
              height: o.height
            });

          // update style for the div
          me.css({
            overflow: 'hidden',
            width: o.width,
            height: o.height
          });

          // create scrollbar rail
          var rail = $(divS)
            .addClass(o.railClass)
            .css({
              width: o.size,
              height: '100%',
              position: 'absolute',
              top: 0,
              display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
              'border-radius': o.railBorderRadius,
              background: o.railColor,
              opacity: o.railOpacity,
              zIndex: 90
            });

          // create scrollbar
          var bar = $(divS)
            .addClass(o.barClass)
            .css({
              background: o.color,
              width: o.size,
              position: 'absolute',
              top: 0,
              opacity: o.opacity,
              display: o.alwaysVisible ? 'block' : 'none',
              'border-radius': o.borderRadius,
              BorderRadius: o.borderRadius,
              MozBorderRadius: o.borderRadius,
              WebkitBorderRadius: o.borderRadius,
              zIndex: 99
            });

          // set position
          var posCss = (o.position == 'right') ? {right: o.distance} : {left: o.distance};
          rail.css(posCss);
          bar.css(posCss);

          // wrap it
          me.wrap(wrapper);

          // append to parent div
          me.parent().append(bar);
          me.parent().append(rail);

          // make it draggable and no longer dependent on the jqueryUI
          if (o.railDraggable) {
            bar.bind("mousedown", function (e) {
              var $doc = $(document);
              isDragg = true;
              t = parseFloat(bar.css('top'));
              pageY = e.pageY;

              $doc.bind("mousemove.slimscroll", function (e) {
                currTop = t + e.pageY - pageY;
                bar.css('top', currTop);
                scrollContent(0, bar.position().top, false);// scroll content
              });

              $doc.bind("mouseup.slimscroll", function (e) {
                isDragg = false;
                hideBar();
                $doc.unbind('.slimscroll');
              });
              return false;
            }).bind("selectstart.slimscroll", function (e) {
              e.stopPropagation();
              e.preventDefault();
              return false;
            });
          }

          // on rail over
          rail.hover(function () {
            showBar();
          }, function () {
            hideBar();
          });

          // on bar over
          bar.hover(function () {
            isOverBar = true;
          }, function () {
            isOverBar = false;
          });

          // show on parent mouseover
          me.hover(function () {
            isOverPanel = true;
            showBar();
            hideBar();
          }, function () {
            isOverPanel = false;
            hideBar();
          });

          // support for mobile
          me.bind('touchstart', function (e, b) {
            if (e.originalEvent.touches.length) {
              // record where touch started
              touchDif = e.originalEvent.touches[0].pageY;
            }
          });

          me.bind('touchmove', function (e) {
            // prevent scrolling the page if necessary
            if (!releaseScroll) {
              e.originalEvent.preventDefault();
            }
            if (e.originalEvent.touches.length) {
              // see how far user swiped
              var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
              // scroll content
              scrollContent(diff, true);
              touchDif = e.originalEvent.touches[0].pageY;
            }
          });

          // set up initial height
          getBarHeight();

          // check start position
          if (o.start === 'bottom') {
            // scroll content to bottom
            bar.css({top: me.outerHeight() - bar.outerHeight()});
            scrollContent(0, true);
          } else if (o.start !== 'top') {
            // assume jQuery selector
            scrollContent($(o.start).position().top, null, true);

            // make sure bar stays hidden
            if (!o.alwaysVisible) {
              bar.hide();
            }
          }

          // attach scroll events
          attachWheel(this);

          function _onWheel(e) {
            // use mouse wheel only when mouse is over
            if (!isOverPanel) {
              return;
            }

            var e = e || window.event;

            var delta = 0;
            if (e.wheelDelta) {
              delta = -e.wheelDelta / 120;
            }
            if (e.detail) {
              delta = e.detail / 3;
            }

            var target = e.target || e.srcTarget || e.srcElement;
            if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
              // scroll content
              scrollContent(delta, true);
            }

            // stop window scroll
            if (e.preventDefault && !releaseScroll) {
              e.preventDefault();
            }
            if (!releaseScroll) {
              e.returnValue = false;
            }
          }

          function scrollContent(y, isWheel, isJump) {
            releaseScroll = false;
            var delta = y;
            var maxTop = me.outerHeight() - bar.outerHeight();

            if (isWheel) {
              // move bar with mouse wheel
              delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

              // move bar, make sure it doesn't go out
              delta = Math.min(Math.max(delta, 0), maxTop);

              // if scrolling down, make sure a fractional change to the
              // scroll position isn't rounded away when the scrollbar's CSS is set
              // this flooring of delta would happened automatically when
              // bar.css is set below, but we floor here for clarity
              delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

              // scroll the scrollbar
              bar.css({top: delta + 'px'});
            }

            // calculate actual scroll amount
            percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
            delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

            if (isJump) {
              delta = y;
              var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
              offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
              bar.css({top: offsetTop + 'px'});
            }

            // scroll content
            me.scrollTop(delta);

            // fire scrolling event
            me.trigger('slimscrolling', ~~delta);

            // ensure bar is visible
            showBar();

            // trigger hide when scroll is stopped
            hideBar();
          }

          function attachWheel(target) {
            if (window.addEventListener) {
              target.addEventListener('DOMMouseScroll', _onWheel, false);
              target.addEventListener('mousewheel', _onWheel, false);
            } else {
              document.attachEvent("onmousewheel", _onWheel)
            }
          }

          function getBarHeight() {
            // calculate scrollbar height and make sure it is not too small
            barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
            bar.css({height: barHeight + 'px'});

            // hide scrollbar if content is not long enough
            var display = barHeight == me.outerHeight() ? 'none' : 'block';
            bar.css({display: display});
          }

          function showBar() {
            // recalculate bar height
            getBarHeight();
            clearTimeout(queueHide);

            // when bar reached top or bottom
            if (percentScroll == ~~percentScroll) {
              //release wheel
              releaseScroll = o.allowPageScroll;

              // publish approporiate event
              if (lastScroll != percentScroll) {
                var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
                me.trigger('slimscroll', msg);
              }
            } else {
              releaseScroll = false;
            }
            lastScroll = percentScroll;

            // show only when required
            if (barHeight >= me.outerHeight()) {
              //allow window scroll
              releaseScroll = true;
              return;
            }
            bar.stop(true, true).fadeIn('fast');
            if (o.railVisible) {
              rail.stop(true, true).fadeIn('fast');
            }
          }

          function hideBar() {
            // only hide when options allow it
            if (!o.alwaysVisible) {
              queueHide = setTimeout(function () {
                if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
                  bar.fadeOut('slow');
                  rail.fadeOut('slow');
                }
              }, 1000);
            }
          }

        });

        // maintain chainability
        return this;
      }
    });

    $.fn.extend({
      slimscroll: $.fn.slimScroll
    });

  })(jQuery);

  /*!
 * Waves v0.7.6
 * http://fian.my.id/Waves
 *
 * Copyright 2014-2018 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

  ;(function (window, factory) {


    // AMD. Register as an anonymous module.  Wrap in function so we have access
    // to root via `this`.
    if (typeof define === 'function' && define.amd) {
      define([], function () {
        window.Waves = factory.call(window);
        return window.Waves;
      });
    }

      // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    else if (typeof exports === 'object') {
      module.exports = factory.call(window);
    }

    // Browser globals.
    else {
      window.Waves = factory.call(window);
    }
  })(typeof global === 'object' ? global : this, function () {


    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);
    var toString = Object.prototype.toString;
    var isTouchAvailable = 'ontouchstart' in window;


    // Find exact position of element
    function isWindow(obj) {
      return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
      return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function isObject(value) {
      var type = typeof value;
      return type === 'function' || type === 'object' && !!value;
    }

    function isDOMNode(obj) {
      return isObject(obj) && obj.nodeType > 0;
    }

    function getWavesElements(nodes) {
      var stringRepr = toString.call(nodes);

      if (stringRepr === '[object String]') {
        return $$(nodes);
      } else if (isObject(nodes) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
        return nodes;
      } else if (isDOMNode(nodes)) {
        return [nodes];
      }

      return [];
    }

    function offset(elem) {
      var docElem, win,
        box = {top: 0, left: 0},
        doc = elem && elem.ownerDocument;

      docElem = doc.documentElement;

      if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    }

    function convertStyle(styleObj) {
      var style = '';

      for (var prop in styleObj) {
        if (styleObj.hasOwnProperty(prop)) {
          style += (prop + ':' + styleObj[prop] + ';');
        }
      }

      return style;
    }

    var Effect = {

      // Effect duration
      duration: 750,

      // Effect delay (check for scroll before showing effect)
      delay: 200,

      show: function (e, element, velocity) {

        // Disable right click
        if (e.button === 2) {
          return false;
        }

        element = element || this;

        // Create ripple
        var ripple = document.createElement('div');
        ripple.className = 'waves-ripple waves-rippling';
        element.appendChild(ripple);

        // Get click coordinate and element width
        var pos = offset(element);
        var relativeY = 0;
        var relativeX = 0;
        // Support for touch devices
        if ('touches' in e && e.touches.length) {
          relativeY = (e.touches[0].pageY - pos.top);
          relativeX = (e.touches[0].pageX - pos.left);
        }
        //Normal case
        else {
          relativeY = (e.pageY - pos.top);
          relativeX = (e.pageX - pos.left);
        }
        // Support for synthetic events
        relativeX = relativeX >= 0 ? relativeX : 0;
        relativeY = relativeY >= 0 ? relativeY : 0;

        var scale = 'scale(' + ((element.clientWidth / 100) * 3) + ')';
        var translate = 'translate(0,0)';

        if (velocity) {
          translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
        }

        // Attach data to element
        ripple.setAttribute('data-hold', Date.now());
        ripple.setAttribute('data-x', relativeX);
        ripple.setAttribute('data-y', relativeY);
        ripple.setAttribute('data-scale', scale);
        ripple.setAttribute('data-translate', translate);

        // Set ripple position
        var rippleStyle = {
          top: relativeY + 'px',
          left: relativeX + 'px'
        };

        ripple.classList.add('waves-notransition');
        ripple.setAttribute('style', convertStyle(rippleStyle));
        ripple.classList.remove('waves-notransition');

        // Scale the ripple
        rippleStyle['-webkit-transform'] = scale + ' ' + translate;
        rippleStyle['-moz-transform'] = scale + ' ' + translate;
        rippleStyle['-ms-transform'] = scale + ' ' + translate;
        rippleStyle['-o-transform'] = scale + ' ' + translate;
        rippleStyle.transform = scale + ' ' + translate;
        rippleStyle.opacity = '1';

        var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
        rippleStyle['-webkit-transition-duration'] = duration + 'ms';
        rippleStyle['-moz-transition-duration'] = duration + 'ms';
        rippleStyle['-o-transition-duration'] = duration + 'ms';
        rippleStyle['transition-duration'] = duration + 'ms';

        ripple.setAttribute('style', convertStyle(rippleStyle));
      },

      hide: function (e, element) {
        element = element || this;

        var ripples = element.getElementsByClassName('waves-rippling');

        for (var i = 0, len = ripples.length; i < len; i++) {
          removeRipple(e, element, ripples[i]);
        }

        if (isTouchAvailable) {
          element.removeEventListener('touchend', Effect.hide);
          element.removeEventListener('touchcancel', Effect.hide);
        }

        element.removeEventListener('mouseup', Effect.hide);
        element.removeEventListener('mouseleave', Effect.hide);
      }
    };

    /**
     * Collection of wrapper for HTML element that only have single tag
     * like <input> and <img>
     */
    var TagWrapper = {

      // Wrap <input> tag so it can perform the effect
      input: function (element) {

        var parent = element.parentNode;

        // If input already have parent just pass through
        if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
          return;
        }

        // Put element class and style to the specified parent
        var wrapper = document.createElement('i');
        wrapper.className = element.className + ' waves-input-wrapper';
        element.className = 'waves-button-input';

        // Put element as child
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);

        // Apply element color and background color to wrapper
        var elementStyle = window.getComputedStyle(element, null);
        var color = elementStyle.color;
        var backgroundColor = elementStyle.backgroundColor;

        wrapper.setAttribute('style', 'color:' + color + ';background:' + backgroundColor);
        element.setAttribute('style', 'background-color:rgba(0,0,0,0);');

      },

      // Wrap <img> tag so it can perform the effect
      img: function (element) {

        var parent = element.parentNode;

        // If input already have parent just pass through
        if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
          return;
        }

        // Put element as child
        var wrapper = document.createElement('i');
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);

      }
    };

    /**
     * Hide the effect and remove the ripple. Must be
     * a separate function to pass the JSLint...
     */
    function removeRipple(e, el, ripple) {

      // Check if the ripple still exist
      if (!ripple) {
        return;
      }

      ripple.classList.remove('waves-rippling');

      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');
      var translate = ripple.getAttribute('data-translate');

      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;

      if (delay < 0) {
        delay = 0;
      }

      if (e.type === 'mousemove') {
        delay = 150;
      }

      // Fade out ripple after delay
      var duration = e.type === 'mousemove' ? 2500 : Effect.duration;

      setTimeout(function () {

        var style = {
          top: relativeY + 'px',
          left: relativeX + 'px',
          opacity: '0',

          // Duration
          '-webkit-transition-duration': duration + 'ms',
          '-moz-transition-duration': duration + 'ms',
          '-o-transition-duration': duration + 'ms',
          'transition-duration': duration + 'ms',
          '-webkit-transform': scale + ' ' + translate,
          '-moz-transform': scale + ' ' + translate,
          '-ms-transform': scale + ' ' + translate,
          '-o-transform': scale + ' ' + translate,
          'transform': scale + ' ' + translate
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, duration);

      }, delay);
    }


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {

      /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
      touches: 0,

      allowEvent: function (e) {

        var allow = true;

        if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
          allow = false;
        }

        return allow;
      },
      registerEvent: function (e) {
        var eType = e.type;

        if (eType === 'touchstart') {

          TouchHandler.touches += 1; // push

        } else if (/^(touchend|touchcancel)$/.test(eType)) {

          setTimeout(function () {
            if (TouchHandler.touches) {
              TouchHandler.touches -= 1; // pop after 500ms
            }
          }, 500);

        }
      }
    };


    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {

      if (TouchHandler.allowEvent(e) === false) {
        return null;
      }

      var element = null;
      var target = e.target || e.srcElement;

      while (target.parentElement) {
        if ((!(target instanceof SVGElement)) && target.classList.contains('waves-effect')) {
          element = target;
          break;
        }
        target = target.parentElement;
      }

      return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {

      // Disable effect if element has "disabled" property on it
      // In some cases, the event is not triggered by the current element
      // if (e.target.getAttribute('disabled') !== null) {
      //     return;
      // }

      var element = getWavesEffectElement(e);

      if (element !== null) {

        // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
        if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
          return;
        }

        TouchHandler.registerEvent(e);

        if (e.type === 'touchstart' && Effect.delay) {

          var hidden = false;

          var timer = setTimeout(function () {
            timer = null;
            Effect.show(e, element);
          }, Effect.delay);

          var hideEffect = function (hideEvent) {

            // if touch hasn't moved, and effect not yet started: start effect now
            if (timer) {
              clearTimeout(timer);
              timer = null;
              Effect.show(e, element);
            }
            if (!hidden) {
              hidden = true;
              Effect.hide(hideEvent, element);
            }

            removeListeners();
          };

          var touchMove = function (moveEvent) {
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }
            hideEffect(moveEvent);

            removeListeners();
          };

          element.addEventListener('touchmove', touchMove, false);
          element.addEventListener('touchend', hideEffect, false);
          element.addEventListener('touchcancel', hideEffect, false);

          var removeListeners = function () {
            element.removeEventListener('touchmove', touchMove);
            element.removeEventListener('touchend', hideEffect);
            element.removeEventListener('touchcancel', hideEffect);
          };
        } else {

          Effect.show(e, element);

          if (isTouchAvailable) {
            element.addEventListener('touchend', Effect.hide, false);
            element.addEventListener('touchcancel', Effect.hide, false);
          }

          element.addEventListener('mouseup', Effect.hide, false);
          element.addEventListener('mouseleave', Effect.hide, false);
        }
      }
    }

    Waves.init = function (options) {
      var body = document.body;

      options = options || {};

      if ('duration' in options) {
        Effect.duration = options.duration;
      }

      if ('delay' in options) {
        Effect.delay = options.delay;
      }

      if (isTouchAvailable) {
        body.addEventListener('touchstart', showEffect, false);
        body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
        body.addEventListener('touchend', TouchHandler.registerEvent, false);
      }

      body.addEventListener('mousedown', showEffect, false);
    };


    /**
     * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
     * waves classes to a set of elements. Set drag to true if the ripple mouseover
     * or skimming effect should be applied to the elements.
     */
    Waves.attach = function (elements, classes) {

      elements = getWavesElements(elements);

      if (toString.call(classes) === '[object Array]') {
        classes = classes.join(' ');
      }

      classes = classes ? ' ' + classes : '';

      var element, tagName;

      for (var i = 0, len = elements.length; i < len; i++) {

        element = elements[i];
        tagName = element.tagName.toLowerCase();

        if (['input', 'img'].indexOf(tagName) !== -1) {
          TagWrapper[tagName](element);
          element = element.parentElement;
        }

        if (element.className.indexOf('waves-effect') === -1) {
          element.className += ' waves-effect' + classes;
        }
      }
    };


    /**
     * Cause a ripple to appear in an element via code.
     */
    Waves.ripple = function (elements, options) {
      elements = getWavesElements(elements);
      var elementsLen = elements.length;

      options = options || {};
      options.wait = options.wait || 0;
      options.position = options.position || null; // default = centre of element


      if (elementsLen) {
        var element, pos, off, centre = {}, i = 0;
        var mousedown = {
          type: 'mousedown',
          button: 1
        };
        var hideRipple = function (mouseup, element) {
          return function () {
            Effect.hide(mouseup, element);
          };
        };

        for (; i < elementsLen; i++) {
          element = elements[i];
          pos = options.position || {
            x: element.clientWidth / 2,
            y: element.clientHeight / 2
          };

          off = offset(element);
          centre.x = off.left + pos.x;
          centre.y = off.top + pos.y;

          mousedown.pageX = centre.x;
          mousedown.pageY = centre.y;

          Effect.show(mousedown, element);

          if (options.wait >= 0 && options.wait !== null) {
            var mouseup = {
              type: 'mouseup',
              button: 1
            };

            setTimeout(hideRipple(mouseup, element), options.wait);
          }
        }
      }
    };

    /**
     * Remove all ripples from an element.
     */
    Waves.calm = function (elements) {
      elements = getWavesElements(elements);
      var mouseup = {
        type: 'mouseup',
        button: 1
      };

      for (var i = 0, len = elements.length; i < len; i++) {
        Effect.hide(mouseup, elements[i]);
      }
    };

    /**
     * Deprecated API fallback
     */
    Waves.displayEffect = function (options) {
      console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
      Waves.init(options);
    };

    return Waves;
  });

  /*!
 * jQuery SmartPanels v1.0.0
 *
 * Copyright 2019, 2020 SmartAdmin WebApp
 * Released under Marketplace License (see your license details for usage)
 *
 * Publish Date: 2018-01-01T17:42Z
 */

  (function ($, window, document, undefined) {

    //

    var pluginName = 'smartPanel';

    /**
     * Check for touch support and set right click events.
     **/
    /*var clickEvent = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch ?
		'clickEvent' : 'click') + '.' + pluginName;*/

    var clickEvent;

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      clickEvent = 'click tap';
    } else {
      clickEvent = 'click';
    }

    function Plugin(element, options) {
      /**
       * Variables.
       **/
      this.obj = $(element);
      this.o = $.extend({}, $.fn[pluginName].defaults, options);
      this.objId = this.obj.attr('id');
      this.panel = this.obj.find(this.o.panels);
      this.storage = {enabled: this.o.localStorage};
      this.initialized = false;
      this.init();
    }

    Plugin.prototype = {

      /**
       * Function for the indicator image.
       *
       * @param:
       **/
      _runPanelLoader: function (elm) {
        var self = this;

        if (self.o.localStorage === true) {
          elm.closest(self.o.panels)
            .find('.panel-saving')
            .stop(true, true)
            .fadeIn(100)
            .delay(600)
            .fadeOut(100);
        }
      },

      _loadKeys: function () {

        var self = this;
        var panel_url = self.o.pageKey || location.pathname;

        self.storage.keySettings = 'smartPanel_settings_' + panel_url + '_' + self.objId;
        self.storage.keyPosition = 'smartPanel_position_' + panel_url + '_' + self.objId;
      },

      /**
       * Save all settings to the localStorage.
       *
       * @param:
       **/
      _savePanelSettings: function () {

        var self = this;
        var storage = self.storage;

        self._loadKeys();

        var storeSettings = self.obj.find(self.o.panels)
          .map(function () {
            var storeSettingsStr = {};
            storeSettingsStr.id = $(this)
              .attr('id');
            storeSettingsStr.style = $(this)
              .attr('data-panel-attstyle');
            storeSettingsStr.locked = ($(this)
              .hasClass('panel-locked') ? 1 : 0);
            storeSettingsStr.collapsed = ($(this)
              .hasClass('panel-collapsed') ? 1 : 0);
            return storeSettingsStr;
          }).get();

        var storeSettingsObj = JSON.stringify({
          'panel': storeSettings
        });

        /* Place it in the storage(only if needed) */
        if (storage.enabled && storage.getKeySettings != storeSettingsObj) {
          localStorage.setItem(storage.keySettings, storeSettingsObj);
          storage.getKeySettings = storeSettingsObj;

          //if (myapp_config.debugState)
          //console.log("storeSettingsObj:" + storeSettingsObj)
        }

        /**
         * Run the callback function.
         **/

        if (typeof self.o.onSave == 'function') {
          self.o.onSave.call(this, null, storeSettingsObj, storage.keySettings);

          if (myapp_config.debugState)
            console.log("keySettings: " + storage.keySettings)
        }
      },

      /**
       * Save positions to the localStorage.
       *
       * @param:
       **/
      _savePanelPosition: function () {

        var self = this;
        var storage = self.storage;

        self._loadKeys();

        var mainArr = self.obj.find(self.o.grid + '.sortable-grid')
          .map(function () {
            var subArr = $(this)
              .children(self.o.panels)
              .map(function () {
                return {
                  'id': $(this).attr('id')
                };
              }).get();
            return {
              'section': subArr
            };
          }).get();

        var storePositionObj = JSON.stringify({
          'grid': mainArr
        });

        /* Place it in the storage(only if needed) */
        if (storage.enabled && storage.getKeyPosition != storePositionObj) {
          localStorage.setItem(storage.keyPosition, storePositionObj);
          storage.getKeyPosition = storePositionObj
        }

        /**
         * Run the callback function.
         **/
        if (typeof self.o.onSave == 'function') {
          self.o.onSave.call(this, storePositionObj, storage.keyPosition);
        }
      },

      /**
       * Code that we run at the start.
       *
       * @param:
       **/
      init: function () {

        var self = this;

        if (self.initialized) return;

        self._initStorage(self.storage);

        /**
         * Force users to use an id(it's needed for the local storage).
         **/
        if (!$('#' + self.objId)
          .length) {

          //alert('Your panel ID is missing!');
          if (typeof bootbox != 'undefined') {
            bootbox.alert("Your panel ID is missing!");
          } else {
            alert('Your panel ID is missing!');
          }

        }

        /**
         * This will add an extra class that we use to store the
         * panels in the right order.(savety)
         **/

        $(self.o.grid)
          .each(function () {
            if ($(this)
              .find(self.o.panels)
              .length) {
              $(this)
                .addClass('sortable-grid');
            }
          });


        /**
         * SET POSITION PANEL
         **/

        /**
         * Run if data is present.
         **/
        if (self.storage.enabled && self.storage.getKeyPosition) {

          var jsonPosition = JSON.parse(self.storage.getKeyPosition);

          /**
           * Loop the data, and put every panels on the right place.
           **/
          for (var key in jsonPosition.grid) {
            var changeOrder = self.obj.find(self.o.grid + '.sortable-grid')
              .eq(key);
            for (var key2 in jsonPosition.grid[key].section) {
              changeOrder.append($('#' + jsonPosition.grid[key].section[key2].id));
            }
          }

        }

        /**
         * SET SETTINGS PANEL
         **/

        /**
         * Run if data is present.
         **/
        if (self.storage.enabled && self.storage.getKeySettings) {

          var jsonSettings = JSON.parse(self.storage.getKeySettings);
/**
          if (myapp_config.debugState)
            console.log("Panel settings loaded: " + self.storage.getKeySettings)


           * Loop the data and hide/show the panels and set the inputs in
           * panel to checked(if hidden) and add an indicator class to the div.
           * Loop all labels and update the panel titles.
           **/
          for (var key in jsonSettings.panel) {
            var panelId = $('#' + jsonSettings.panel[key].id);

            /**
             * Set a style(if present).
             **/
            if (jsonSettings.panel[key].style) {
              panelId.attr('data-panel-attstyle', '' + jsonSettings.panel[key].style + '')
                .children('.panel-hdr')
                .removeClassPrefix('bg-')
                .addClass(jsonSettings.panel[key].style);
            }

            /**
             * Toggle content panel.
             **/
            if (jsonSettings.panel[key].collapsed == 1) {
              panelId.addClass('panel-collapsed')
                .children('.panel-container').addClass('collapse').removeClass('show');
            }

            /**
             * Locked panel from sorting.
             **/
            if (jsonSettings.panel[key].locked == 1) {
              panelId.addClass('panel-locked');
            }

          }
        }

        /**
         * Format colors
         **/

        if (self.o.panelColors && self.o.colorButton) {
          var formatedPanelColors = [];
          for (var key in self.o.panelColors) {
            formatedPanelColors.push('<a href="#" class="btn d-inline-block ' + self.o.panelColors[key] + ' width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot" data-panel-setstyle="' + self.o.panelColors[key] + '" style="margin:1px;"></a>');
          }
        }


        /**
         * LOOP ALL PANELS
         **/
        self.panel.each(function () {

          var tPanel = $(this),
            closeButton,
            fullscreenButton,
            collapseButton,
            lockedButton,
            refreshButton,
            colorButton,
            resetButton,
            customButton,
            thisHeader = $(this).children('.panel-hdr'),
            thisContainer = $(this).children('.panel-container');

          /**
           * Dont double wrap(check).
           **/
          if (!thisHeader.parent().attr('role')) {

            /**
             * Adding a helper class to all sortable panels, this will be
             * used to find the panels that are sortable, it will skip the panels
             * that have the dataset 'panels-sortable="false"' set to false.
             **/
            if (self.o.sortable === true && tPanel.data('panel-sortable') === undefined) {
              tPanel.addClass('panel-sortable');
            }

            /**
             * Add a close button to the panel header (if set to true)
             **/
            if (self.o.closeButton === true && tPanel.data('panel-close') === undefined) {
              closeButton = '<a href="#" class="btn btn-panel hover-effect-dot js-panel-close" data-toggle="tooltip" data-offset="0,10" data-original-title="Close"></a>';
            } else {
              closeButton = '';
            }

            /**
             * Add a fullscreen button to the panel header (if set to true).
             **/
            if (self.o.fullscreenButton === true && tPanel.data('panel-fullscreen') === undefined) {
              fullscreenButton = '<a href="#" class="btn btn-panel hover-effect-dot js-panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></a>';
            } else {
              fullscreenButton = '';
            }

            /**
             * Add a collapse button to the panel header (if set to true).
             **/
            if (self.o.collapseButton === true && tPanel.data('panel-collapsed') === undefined) {
              collapseButton = '<a href="#" class="btn btn-panel hover-effect-dot js-panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></a>'
            } else {
              collapseButton = '';
            }

            /**
             * Add a locked button to the panel header (if set to true).
             **/
            if (self.o.lockedButton === true && tPanel.data('panel-locked') === undefined) {
              lockedButton = '<a href="#" class="dropdown-item js-panel-locked"><span data-i18n="drpdwn.lockpanel">' + self.o.lockedButtonLabel + '</span></a>'
            } else {
              lockedButton = '';
            }

            /**
             * Add a refresh button to the panel header (if set to true).
             **/
            if (self.o.refreshButton === true && tPanel.data('panel-refresh') === undefined) {
              refreshButton = '<a href="#" class="dropdown-item js-panel-refresh"><span data-i18n="drpdwn.refreshpanel">' + self.o.refreshButtonLabel + '</span></a>';
              thisContainer.prepend(
                '<div class="loader"><i class="fal fa-spinner-third fa-spin-4x fs-xxl"></i></div>'
              );
              //append** conflicts with panel > container > content:last child, so changed to prepend

            } else {
              refreshButton = '';
            }

            /**
             * Add a color select button to the panel header (if set to true).
             **/
            if (self.o.colorButton === true && tPanel.data('panel-color') === undefined) {
              colorButton = ' <div class="dropdown-multilevel dropdown-multilevel-left">\
											<div class="dropdown-item">\
												<span data-i18n="drpdwn.panelcolor">' + self.o.colorButtonLabel + '</span>\
											</div>\
											<div class="dropdown-menu d-flex flex-wrap" style="min-width: 9.5rem; width: 9.5rem; padding: 0.5rem">' + formatedPanelColors.join(" ") + '</div>\
										</div>'
            } else {
              colorButton = '';
            }

            /**
             * Add a reset widget button to the panel header (if set to true).
             **/
            if (self.o.resetButton === true && tPanel.data('panel-reset') === undefined) {
              resetButton = '<div class="dropdown-divider m-0"></div><a href="#" class="dropdown-item js-panel-reset"><span data-i18n="drpdwn.resetpanel">' + self.o.resetButtonLabel + '</span></a>'
            } else {
              resetButton = '';
            }

            /**
             * Add a custom button to the panel header (if set to true).
             **/
            if (self.o.customButton === true && tPanel.data('panel-custombutton') === undefined) {
              customButton = '<a href="#" class="dropdown-item js-panel-custombutton pl-4"><span data-i18n="drpdwn.custombutton">' + self.o.customButtonLabel + '</span></a>'
            } else {
              customButton = '';
            }

            /**
             * Append the image to the panel header.
             **/
            thisHeader.append(
              '<div class="panel-saving mr-2" style="display:none"><i class="fal fa-spinner-third fa-spin-4x fs-xl"></i></div>'
            );

            /**
             * Set the buttons order.
             **/
            var formatButtons = self.o.buttonOrder
              .replace(/%close%/g, closeButton)
              .replace(/%fullscreen%/g, fullscreenButton)
              .replace(/%collapse%/g, collapseButton);

            /**
             * Add a button wrapper to the header.
             **/
            if (closeButton !== '' || fullscreenButton !== '' || collapseButton !== '') {
              thisHeader.append('<div class="panel-toolbar">' + formatButtons + '</div>');
            }

            /**
             * Set the dropdown buttons order.
             **/
            var formatDropdownButtons = self.o.buttonOrderDropdown
              .replace(/%locked%/g, lockedButton)
              .replace(/%color%/g, colorButton)
              .replace(/%refresh%/g, refreshButton)
              .replace(/%reset%/g, resetButton)
              .replace(/%custom%/g, customButton);

            /**
             * Add a button wrapper to the header.
             **/
            if (lockedButton !== '' || colorButton !== '' || refreshButton !== '' || resetButton !== '' || customButton !== '') {
              thisHeader.append('<div class="panel-toolbar"><a href="#" class="btn btn-toolbar-master" data-toggle="dropdown"><i class="fal fa-ellipsis-v"></i></a><div class="dropdown-menu dropdown-menu-animated dropdown-menu-right p-0">' + formatDropdownButtons + '</div></div>');
            }

            /**
             * Adding roles to some parts.
             **/
            tPanel.attr('role', 'widget')
              .children('div')
              .attr('role', 'content')
              .prev('.panel-hdr')
              .attr('role', 'heading')
              .children('.panel-toolbar')
              .attr('role', 'menu');
          }
        });


        /**
         * SORTABLE
         **/
        /**
         * jQuery UI soratble, this allows users to sort the panels.
         * Notice that this part needs the jquery-ui core to work.
         **/
        if (self.o.sortable === true && jQuery.ui) {
          var sortItem = self.obj.find(self.o.grid + '.sortable-grid')
            .not('[data-panel-excludegrid]');
          sortItem.sortable({
            items: sortItem.find(self.o.panels + '.panel-sortable'),
            connectWith: sortItem,
            placeholder: self.o.placeholderClass,
            cursor: 'move',
            //revert: true,
            opacity: self.o.opacity,
            delay: 0,
            revert: 350,
            cancel: '.btn-panel, .panel-fullscreen .panel-fullscreen, .mod-panel-disable .panel-sortable, .panel-locked.panel-sortable',
            zIndex: 10000,
            handle: self.o.dragHandle,
            forcePlaceholderSize: true,
            forceHelperSize: true,
            update: function (event, ui) {
              /* run pre-loader in the panel */
              self._runPanelLoader(ui.item.children());
              /* store the positions of the plugins */
              self._savePanelPosition();
              /**
               * Run the callback function.
               **/
              if (typeof self.o.onChange == 'function') {
                self.o.onChange.call(this, ui.item);
              }
            }
          }); //you can add  }).disableSelection() if you don't want text to be selected accidently.
        }

        /**
         * CLICKEVENTS
         **/
        self._clickEvents();


        /**
         * DELETE LOCAL STORAGE KEYS
         **/
        if (self.storage.enabled) {

          // Delete the settings key.
          $(self.o.deleteSettingsKey)
            .on(clickEvent, this, function (e) {
              var cleared = confirm(self.o.settingsKeyLabel);
              if (cleared) {
                localStorage.removeItem(keySettings);
              }
              e.preventDefault();
            });

          // Delete the position key.
          $(self.o.deletePositionKey)
            .on(clickEvent, this, function (e) {
              var cleared = confirm(self.o.positionKeyLabel);
              if (cleared) {
                localStorage.removeItem(keyPosition);
              }
              e.preventDefault();
            });
        }

        initialized = true;
      },

      /**
       * Initialize storage.
       *
       * @param:
       **/
      _initStorage: function (storage) {

        /**
         * LOCALSTORAGE CHECK
         **/
        storage.enabled = storage.enabled && !!function () {
          var result, uid = +new Date();
          try {
            localStorage.setItem(uid, uid);
            result = localStorage.getItem(uid) == uid;
            localStorage.removeItem(uid);
            return result;
          } catch (e) {
          }
        }();

        this._loadKeys();

        if (storage.enabled) {

          storage.getKeySettings = localStorage.getItem(storage.keySettings);
          storage.getKeyPosition = localStorage.getItem(storage.keyPosition);

        } // end if

      },

      /**
       * Register all click events.
       *
       * @param:
       **/
      _clickEvents: function () {

        var self = this;
        var headers = self.panel.children('.panel-hdr');

        /**
         * Allow users to toggle collapse.
         **/
        headers.on(clickEvent, '.js-panel-collapse', function (e) {

          var tPanel = $(this),
            pPanel = tPanel.closest(self.o.panels);

          /**
           * Close tooltip
           **/
          if (typeof ($.fn.tooltip) !== 'undefined' && $('[data-toggle="tooltip"]').length) {
            $(this).tooltip('hide');
          } else {

          }

          /**
           * Run function for the indicator image.
           **/
          // pPanel.toggleClass("panel-collapsed");

          pPanel.children('.panel-container').collapse('toggle')
            .on('shown.bs.collapse', function () {
              pPanel.removeClass('panel-collapsed');
              self._savePanelSettings();
            }).on('hidden.bs.collapse', function () {
            pPanel.addClass('panel-collapsed');
            self._savePanelSettings();
          });

          /*if (pPanel.hasClass('panel-collapsed')) {
					pPanel.removeClass('panel-collapsed')
						.children('.panel-container')
						.slideDown(400, function () {
							self._savePanelSettings();
						});
				} else {
					pPanel.addClass('panel-collapsed')
						.children('.panel-container')
						.slideUp(400, function () {
							self._savePanelSettings();
						});
				}*/

          /**
           * Run function for the indicator image.
           **/
          self._runPanelLoader(tPanel);


          /**
           * Run the callback function.
           **/
          if (typeof self.o.onCollapse == 'function') {
            self.o.onCollapse.call(this, pPanel);
          }

          /**
           * Lets save the setings.
           **/
          // self._savePanelSettings();

          e.preventDefault();
        });

        /**
         * Allow users to toggle fullscreen.
         **/
        headers.on(clickEvent, '.js-panel-fullscreen', function (e) {

          var tPanel = $(this),
            pPanel = tPanel.closest(self.o.panels);

          /**
           * Close tooltip
           **/
          if (typeof ($.fn.tooltip) !== 'undefined' && $('[data-toggle="tooltip"]').length) {
            $(this).tooltip('hide');
          } else {

          }

          /**
           * Run function for the indicator image.
           **/
          pPanel.toggleClass("panel-fullscreen");
          myapp_config.root_.toggleClass('panel-fullscreen');

          /**
           * Run function for the indicator image.
           **/
          self._runPanelLoader(tPanel);


          /**
           * Run the callback function.
           **/
          if (typeof self.o.onFullscreen == 'function') {
            self.o.onFullscreen.call(this, pPanel);
          }

          e.preventDefault();
        });

        /**
         * Allow users to close the panel.
         **/
        headers.on(clickEvent, '.js-panel-close', function (e) {

          var tPanel = $(this),
            pPanel = tPanel.closest(self.o.panels),
            pTitle = pPanel.children('.panel-hdr').children('h2').text().trim();

          /**
           * Close tooltip
           **/
          if (typeof ($.fn.tooltip) !== 'undefined' && $('[data-toggle="tooltip"]').length) {
            $(this).tooltip('hide');
          } else {

          }


          var killPanel = function () {

            /**
             * Run function for the indicator image.
             **/
            pPanel.fadeOut(500, function () {
              /* remove panel */
              $(this).remove();
              /**
               * Run the callback function.
               **/
              if (typeof self.o.onClosepanel == 'function') {
                self.o.onClosepanel.call(this, pPanel);
              }
            });

            /**
             * Run function for the indicator image.
             **/
            self._runPanelLoader(tPanel);

          };


          //backdrop sound
          initApp.playSound('media/sound', 'messagebox')

          if (typeof bootbox != 'undefined') {

            bootbox.confirm({
              title: "<i class='fal fa-times-circle text-danger mr-2'></i> Do you wish to delete panel <span class='fw-500'>&nbsp;'" + pTitle + "'&nbsp;</span>?",
              message: "<span><strong>Warning:</strong> This action cannot be undone!</span>",
              centerVertical: true,
              swapButtonOrder: true,
              buttons: {
                confirm: {
                  label: 'Yes',
                  className: 'btn-danger shadow-0'
                },
                cancel: {
                  label: 'No',
                  className: 'btn-default'
                }
              },
              className: "modal-alert",
              closeButton: false,
              callback: function (result) {
                if (result == true) {
                  //close panel
                  killPanel();
                }
              }
            });

          } else {

            if (confirm('Do you wish to delete panel ' + pTitle + '?')) {
              killPanel();
            }

          }

          e.preventDefault();
        });

        /**
         * Allow users to set widget style (color).
         **/
        headers.on(clickEvent, '.js-panel-color', function (e) {

          var tPanel = $(this),
            pPanel = tPanel.closest(self.o.panels),
            selectedHdr = tPanel.closest('.panel-hdr'),
            val = tPanel.data('panel-setstyle');

          /**
           * Run the callback function.
           **/
          selectedHdr.removeClassPrefix('bg-')
            .addClass(val)
            .closest('.panel')
            .attr('data-panel-attstyle', '' + val + '');

          /**
           * Run the callback function.
           **/
          if (typeof self.o.onColor == 'function') {
            self.o.onColor.call(this, pPanel);
          }

          /**
           * Run function for the indicator image.
           **/
          self._runPanelLoader(tPanel);

          /**
           * Lets save the setings.
           **/
          self._savePanelSettings();

          e.preventDefault();
        });

        /**
         * Allow users to lock widget to grid - preventing draging.
         **/
        headers.on(clickEvent, '.js-panel-locked', function (e) {

          var tPanel = $(this),
            pPanel = tPanel.closest(self.o.panels);

          /**
           * Run function for the indicator image.
           **/
          pPanel.toggleClass('panel-locked');

          /**
           * Run function for the indicator image.
           **/
          self._runPanelLoader(tPanel);


          /**
           * Run the callback function.
           **/
          if (typeof self.o.onLocked == 'function') {
            self.o.onLocked.call(this, pPanel);
          }

          /**
           * Lets save the setings.
           **/
          self._savePanelSettings();

          e.preventDefault();
        });

        /**
         * Allow users to toggle refresh widget content.
         **/
        headers.on(clickEvent, '.js-panel-refresh', function (e) {

          var tPanel = $(this),
            pPanel = tPanel.closest(self.o.panels),
            //pContainer = pPanel.children('.panel-container'),
            dTimer = pPanel.attr('data-refresh-timer') || 1500;

          /**
           * Run function for the indicator image.
           **/
          pPanel.addClass('panel-refresh').children('.panel-container').addClass('enable-loader')
            .stop(true, true)
            .delay(dTimer).queue(function () {
            //pContainer.removeClass('enable-spinner').dequeue();
            pPanel.removeClass('panel-refresh').children('.panel-container').removeClass('enable-loader').dequeue();

          });


          /**
           * Run the callback function.
           **/
          if (typeof self.o.onRefresh == 'function') {
            self.o.onRefresh.call(this, pPanel);
          }

          e.preventDefault();
        });

        /**
         * Allow users to toggle reset widget settings.
         **/
        headers.on(clickEvent, '.js-panel-reset', function (e) {

          var tPanel = $(this),
            pPanel = tPanel.closest(self.o.panels),
            selectedHdr = tPanel.closest('.panel-hdr');

          /**
           * Remove all setting classes.
           **/
          selectedHdr.removeClassPrefix('bg-')
            .closest('.panel')
            .removeClass('panel-collapsed panel-fullscreen panel-locked')
            .attr('data-panel-attstyle', '')
            .children('.panel-container').collapse('show');


          /**
           * Run function for the indicator image.
           **/
          self._runPanelLoader(tPanel);

          /**
           * Lets save the setings.
           **/
          self._savePanelSettings();

          /**
           * Run the callback function.
           **/
          if (typeof self.o.onReset == 'function') {
            self.o.onReset.call(this, pPanel);
          }

          e.preventDefault();
        });

        headers = null;

      },

      /**
       * Destroy.
       *
       * @param:
       **/
      destroy: function () {
        var self = this,
          namespace = '.' + pluginName,
          sortItem = self.obj.find(self.o.grid + '.sortable-grid').not('[data-panel-excludegrid]');
        self.panel.removeClass('panel-sortable');
        sortItem.sortable('destroy');
        self.panel.children('.panel-hdr').off(namespace);
        $(self.o.deletePositionKey).off(namespace);
        $(window).off(namespace);
        self.obj.removeData(pluginName);
        self.initialized = false;
      }
    };

    $.fn[pluginName] = function (option) {
      return this.each(function () {

        var $this = $(this),
          data = $this.data(pluginName);

        if (!data) {
          var options = typeof option == 'object' && option;
          $this.data(pluginName, (data = new Plugin(this, options)));
        }
        if (typeof option == 'string') {
          data[option]();
        }
      });
    };

    /**
     * Default settings(dont change).
     * You can globally override these options
     * by using $.fn.pluginName.key = 'value';
     **/

    $.fn[pluginName].defaults = {
      grid: '[class*="col-"]',
      panels: '.panel',
      placeholderClass: 'panel-placeholder',
      dragHandle: '> .panel-hdr > h2',
      localStorage: true,
      onChange: function () {
      },
      onSave: function () {
      },
      opacity: 1,
      deleteSettingsKey: '',
      settingsKeyLabel: 'Reset settings?',
      deletePositionKey: '',
      positionKeyLabel: 'Reset position?',
      sortable: true,
      buttonOrder: '%collapse% %fullscreen% %close%',
      buttonOrderDropdown: '%refresh% %locked% %color% %custom% %reset%',
      customButton: false,
      customButtonLabel: "Custom Label",
      onCustom: function () {
      },
      closeButton: true,
      onClosepanel: function () {

      },
      fullscreenButton: true,
      onFullscreen: function () {

      },
      collapseButton: true,
      onCollapse: function () {

      },
      lockedButton: true,
      lockedButtonLabel: "Lock Position",
      onLocked: function () {

      },
      refreshButton: true,
      refreshButtonLabel: "Refresh Content",
      onRefresh: function () {

      },
      colorButton: true,
      colorButtonLabel: "Panel Style",
      onColor: function () {

      },
      panelColors: ['bg-primary-700 bg-success-gradient',
        'bg-primary-500 bg-info-gradient',
        'bg-primary-600 bg-primary-gradient',
        'bg-info-600 bg-primray-gradient',
        'bg-info-600 bg-info-gradient',
        'bg-info-700 bg-success-gradient',
        'bg-success-900 bg-info-gradient',
        'bg-success-700 bg-primary-gradient',
        'bg-success-600 bg-success-gradient',
        'bg-danger-900 bg-info-gradient',
        'bg-fusion-400 bg-fusion-gradient',
        'bg-faded'],
      resetButton: true,
      resetButtonLabel: "Reset Panel",
      onReset: function () {

      }
    };

  })(jQuery, window, document);


//--------------------------------------------------------------------------
// HEADSUP!
// Please be sure to re-run gulp again if you do not see the config changes
//--------------------------------------------------------------------------
  var myapp_config = {
    /*
	APP VERSION
	*/
    VERSION: '4.0.2',
    /*
	SAVE INSTANCE REFERENCE
	Save a reference to the global object (window in the browser)
	*/
    root_: $('body'), // used for core app reference
    root_logo: $('.page-sidebar > .page-logo'), // used for core app reference
    /*
	DELAY VAR FOR FIRING REPEATED EVENTS (eg., scroll & resize events)
	Lowering the variable makes faster response time but taxing on the CPU
	Reference: http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
	*/
    throttleDelay: 450, // for window.scrolling & window.resizing
    filterDelay: 150,   // for keyup.functions
    /*
	DETECT MOBILE DEVICES
	Description: Detects mobile device - if any of the listed device is
	detected a class is inserted to $.root_ and the variable thisDevice
	is decleard. (so far this is covering most hand held devices)
	*/
    thisDevice: null, // desktop or mobile
    isMobile: (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())), //popular device types available on the market
    mobileMenuTrigger: null, // used by pagescrolling and appHeight script, do not change!
    mobileResolutionTrigger: 992, //the resolution when the mobile activation fires
    /*
	DETECT IF WEBKIT
	Description: this variable is used to fire the custom scroll plugin.
	If it is a non-webkit it will fire the plugin.
	*/
    isWebkit: ((!!window.chrome && !!window.chrome.webstore) === true || Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 === true),
    /*
	DETECT CHROME
	Description: this variable is used to fire the custom CSS hacks
	*/
    isChrome: (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())),
    /*
	DETECT IE (it only detects the newer versions of IE)
	Description: this variable is used to fire the custom CSS hacks
	*/
    isIE: ((window.navigator.userAgent.indexOf('Trident/')) > 0 === true),
    /*
	DEBUGGING MODE
	debugState = true; will spit all debuging message inside browser console.
	*/
    debugState: true, // outputs debug information on browser console
    /*
	Turn on ripple effect for buttons and touch events
	Dependency:
	*/
    rippleEffect: true, // material design effect that appears on all buttons
    /*
	Primary theme anchor point ID
	This anchor is created dynamically and CSS is loaded as an override theme
	*/
    mythemeAnchor: '#mytheme',
    /*
	Primary menu anchor point #js-primary-nav
	This is the root anchor point where the menu script will begin its build
	*/
    navAnchor: $('#js-primary-nav'), //changing this may implicate slimscroll plugin target
    navHooks: $('#js-nav-menu'), //changing this may implicate CSS targets
    navAccordion: true, //nav item when one is expanded the other closes
    navInitalized: 'js-nav-built', //nav finished class
    navFilterInput: $('#nav_filter_input'), //changing this may implicate CSS targets
    navHorizontalWrapperId: 'js-nav-menu-wrapper',
    /*
	The rate at which the menu expands revealing child elements on click
	Lower rate reels faster expansion of nav childs
	*/
    navSpeed: 500, //ms
    /*
	Color profile reference hook (needed for getting CSS value for theme colors in charts and various graphs)
	*/
    mythemeColorProfileID: $('#js-color-profile'),
    /*
	Nav close and open signs
	This uses the fontawesome css class
	*/
    navClosedSign: 'fal fa-angle-down',
    navOpenedSign: 'fal fa-angle-up',
    /*
	App date ID
	found inside the breadcrumb unit, displays current date to the app on pageload
	*/
    appDateHook: $('.js-get-date'),
    /*
	* SaveSettings to localStorage
	* DOC: to store settings to a DB instead of LocalStorage see below:
	*    initApp.pushSettings("className1 className2") //sets value
	*    var DB_string = initApp.getSettings(); //returns setting string
	*/
    storeLocally: true,
    /*
	* Used with initApp.loadScripts
	* DOC: Please leave it blank
	*/
    jsArray: []
  };

  /*!
 * jQuery app.navigation v1.0.0
 *
 * Copyright 2019, 2020 SmartAdmin WebApp
 * Released under Marketplace License (see your license details for usage)
 *
 * Publish Date: 2018-01-01T17:42Z
 */

  (function ($) {

    /**
     * Menu Plugin
     **/
    $.fn.extend({

      /**
       * pass the options variable to the function
       *
       *   $(id).navigation({
       *       accordion: true,
       *       animate: 'easeOutExpo',
       *       speed: 200,
       *       closedSign: '[+]',
       *       openedSign: '[-]',
       *       initClass: 'js-nav-built'
       *   });
       *
       **/

      navigation: function (options) {

        var defaults = {
            accordion: true,
            animate: 'easeOutExpo',
            speed: 200,
            closedSign: '[+]',
            openedSign: '[-]',
            initClass: 'js-nav-built'
          },

          /**
           * extend our default options with those provided.
           **/
          opts = $.extend(defaults, options),

          /**
           * assign current element to variable, in this case is UL element
           **/
          self = $(this);

        if (!self.hasClass(opts.initClass)) {

          /**
           * confirm build to prevent rebuild error
           **/
          self.addClass(opts.initClass);

          /**
           * add a mark [+] to a multilevel menu
           **/
          self.find("li").each(function () {
            if ($(this).find("ul").length !== 0) {

              /**
               * add the multilevel sign next to the link
               **/
              $(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

              /**
               * avoid jumping to the top of the page when the href is an #
               **/
              if ($(this).find("a:first").attr('href') == "#") {
                $(this).find("a:first").click(function () {
                  return false;
                });
              }
            }
          });

          /**
           * add open sign to all active lists
           **/
          self.find("li.active").each(function () {
            $(this).parents("ul")
              .parent("li")
              .find("a:first")
              .attr('aria-expanded', true)
              .find("b:first")
              .html(opts.openedSign);
          });

          /**
           * click events
           **/
          self.find("li a").on('mousedown', function (e) {

            if ($(this).parent().find("ul").length !== 0) {

              if (opts.accordion) {

                /**
                 * do nothing when the list is open
                 **/
                if (!$(this).parent().find("ul").is(':visible')) {

                  parents = $(this).parent().parents("ul");
                  visible = self.find("ul:visible");
                  visible.each(function (visibleIndex) {
                    var close = true;
                    parents.each(function (parentIndex) {

                      if (parents[parentIndex] == visible[visibleIndex]) {

                        close = false;
                        return false;
                      }
                    });
                    if (close) {

                      if ($(this).parent().find("ul") != visible[visibleIndex]) {

                        $(visible[visibleIndex]).slideUp(opts.speed + 300, opts.animate, function () {
                          $(this).parent("li")
                            .removeClass("open")
                            .find("a:first")
                            .attr('aria-expanded', false)
                            .find("b:first")
                            .html(opts.closedSign);


                        });
                      }
                    }
                  });
                }
              }

              /**
               * Add active class to open element
               **/
              if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {

                $(this).parent().find("ul:first").slideUp(opts.speed + 100, opts.animate, function () {
                  $(this).parent("li")
                    .removeClass("open")
                    .find("a:first")
                    .attr('aria-expanded', false)
                    .find("b:first").delay(opts.speed)
                    .html(opts.closedSign);


                });
              } else {
                $(this).parent().find("ul:first").slideDown(opts.speed, opts.animate, function () {

                  $(this).parent("li")
                    .addClass("open")
                    .find("a:first")
                    .attr('aria-expanded', true)
                    .find("b:first").delay(opts.speed)
                    .html(opts.openedSign);



                });
              }
            }
          });

        } else {


        }

      },

      /**
       * DOC: $(id).destroy();
       **/
      navigationDestroy: function () {

        self = $(this);

        if (self.hasClass(myapp_config.navInitalized)) {
          self.find("li").removeClass("active open");
          self.find("li a").off('mousedown').removeClass("active").removeAttr("aria-expanded").find(".collapse-sign").remove();
          self.removeClass(myapp_config.navInitalized).find("ul").removeAttr("style");



        } else {

        }


      }
    });

  })(jQuery, window, document);
  /*!
 * jQuery menuSlider v1.0.0
 *
 * Copyright 2019, 2020 SmartAdmin WebApp
 * Released under Marketplace License (see your license details for usage)
 *
 * Publish Date: 2019-01-01T17:42Z
 */


  ;
  (function ($) {
    var pluginName = 'menuSlider';

    function Plugin(element, options) {

      var $el = $(element),
        el = element;
      options = $.extend({}, $.fn[pluginName].defaults, options);

      function init() {

        /* reset margin */
        $el.css('margin-left', '0px');

        /* add wrapper around navigation */
        $el.wrap('<div id="' + options.wrapperId + '" class="nav-menu-wrapper d-flex flex-grow-1 width-0 overflow-hidden"></div>');

        /* add buttons for scroller */
        $('#' + options.wrapperId).before('<a href="#" id="' + options.wrapperId + '-left-btn" class="d-flex align-items-center justify-content-center width-4 btn mt-1 mb-1 mr-2 ml-1 p-0 fs-xxl text-primary"><i class="fal fa-angle-left"></i></a>');
        $('#' + options.wrapperId).after('<a href="#" id="' + options.wrapperId + '-right-btn" class="d-flex align-items-center justify-content-center width-4 btn mt-1 mb-1 mr-1 ml-2 p-0 fs-xxl text-primary"><i class="fal fa-angle-right"></i></a>');

        var getListWidth = $.map($el.children('li:not(.nav-title)'), function (val) {
            return $(val).outerWidth(true);
          }),
          /* define variables */
          wrapperWidth,
          currentMarginLeft,
          contentWidth,
          setMargin,
          maxMargin,


          /* update variables for margin calculations */
          _getValues = function () {
            wrapperWidth = $('#' + options.wrapperId).outerWidth(); /* incase its changed we get it again */
            contentWidth = $.map($el.children('li:not(.nav-title)'), function (val) {
              return $(val).outerWidth(true);
            }).reduce(function (a, b) {
              return a + b;
            }, 0);
            currentMarginLeft = parseFloat($el.css('margin-left'));

            /*console.log("got new values");
                    console.log("wrapperWidth :" + wrapperWidth);
                    console.log("contentWidth :" + contentWidth);
                    console.log("currentMarginLeft :" + currentMarginLeft);*/
          },

          /* scroll right */
          navMenuScrollRight = function () {

            _getValues();

            if (-currentMarginLeft + wrapperWidth < contentWidth) {
              setMargin = Math.max(currentMarginLeft - wrapperWidth, -(contentWidth - wrapperWidth));
            } else {
              setMargin = currentMarginLeft;
            }

            $el.css({
              marginLeft: setMargin
            });

          },

          /* scroll left */
          navMenuScrollLeft = function () {

            _getValues();

            if (currentMarginLeft < 0) {
              setMargin = Math.min(currentMarginLeft + wrapperWidth, 0);
            } else {
              setMargin = currentMarginLeft;
            }

            $el.css({
              marginLeft: setMargin
            });

          };

        /* assign buttons for right*/
        $('#' + options.wrapperId + '-left-btn').click(function (e) {

          navMenuScrollLeft();

          e.preventDefault();
        });

        /* assign buttons for left */
        $('#' + options.wrapperId + '-right-btn').click(function (e) {

          navMenuScrollRight();

          e.preventDefault();
        });

        hook('onInit');
      }

      function option(key, val) {
        if (val) {
          options[key] = val;
        } else {
          return options[key];
        }
      }

      function destroy(options) {
        $el.each(function () {
          var el = this;
          var $el = $(this);

          // Add code to restore the element to its original state...

          $el.css('margin-left', '0px');
          $el.unwrap(parent);
          $el.prev().off().remove();
          $el.next().off().remove();

          hook('onDestroy');
          $el.removeData('plugin_' + pluginName);
        });
      }

      function hook(hookName) {
        if (options[hookName] !== undefined) {
          options[hookName].call(el);
        }
      }

      init();

      return {
        option: option,
        destroy: destroy
      };
    }

    $.fn[pluginName] = function (options) {
      if (typeof arguments[0] === 'string') {
        var methodName = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var returnVal;
        this.each(function () {
          if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
            returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
          } else {
            throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
          }
        });
        if (returnVal !== undefined) {
          return returnVal;
        } else {
          return this;
        }
      } else if (typeof options === "object" || !options) {
        return this.each(function () {
          if (!$.data(this, 'plugin_' + pluginName)) {
            $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
          }
        });
      }
    };

    $.fn[pluginName].defaults = {
      onInit: function () {
      },
      onDestroy: function () {
      },
      element: myapp_config.navHooks,
      wrapperId: myapp_config.navHorizontalWrapperId
    };


  })(jQuery);

  /*!
 * jQuery SmartAdmin v4.0.0
 *
 * Copyright 2019, 2020 SmartAdmin WebApp
 * Released under Marketplace License (see your license details for usage)
 *
 * Publish Date: 2019-01-01T17:42Z
 */
  var initApp = (function (app) {

    /**
     * List filter
     * DOC: searches list items, it could be UL or DIV elements
     * usage: initApp.listFilter($('.list'), $('#intput-id'));
     *        inside the .list you will need to insert 'data-filter-tags' inside <a>
     * @param  list
     * @param  input
     * @param  anchor
     * @return
     */
    app.listFilter = function (list, input, anchor) {

      /* add class to filter hide/show */
      if (anchor) {
        $(anchor).addClass('js-list-filter');
      } else {
        $(list).addClass('js-list-filter');
      }

      /* on change keyboard */
      $(input).change(function () {

        var filter = $(this).val().toLowerCase(),
          listPrev = $(list).next().filter('.js-filter-message');

        /* when user types more than 1 letter start search filter */
        if (filter.length > 1) {

          /* this finds all data-filter-tags in a list that contain the input val,
				   hiding the ones not containing the input while showing the ones that do */

          /* (1) hide all that does not match */
          $(list).find($("[data-filter-tags]:not([data-filter-tags*='" + filter + "'])"))
            .parentsUntil(list).removeClass('js-filter-show')
            .addClass('js-filter-hide');

          /* (2) hide all that does match */
          $(list).find($("[data-filter-tags*='" + filter + "']"))
            .parentsUntil(list).removeClass('js-filter-hide')
            .addClass('js-filter-show');

          /* if element exists then print results */
          if (listPrev) {
            listPrev.text("showing " + $(list).find('li.js-filter-show').length + " from " + $(list).find('[data-filter-tags]').length + " total");
          }

        } else {

          /* when filter length is blank reset the classes */
          $(list).find('[data-filter-tags]').parentsUntil(list).removeClass('js-filter-hide js-filter-show');

          /* if element exists reset print results */
          if (listPrev) {
            listPrev.text("");
          }
        }

        return false;

      }).keyup($.debounce(myapp_config.filterDelay, function (e) {

        /* fire the above change event after every letter is typed with a delay of 250ms */
        $(this).change();

        /*if(e.keyCode == 13) {
				console.log( $(list).find(".filter-show:not(.filter-hide) > a") );
			}*/

      }));
    };

    /**
     * Load scripts using lazyload method
     * usage: initApp.loadScript("js/my_lovely_script.js", myFunction);
     * @param  {[type]}   scriptName
     * @param  {Function} callback
     * @return {[type]}
     */
    app.loadScript = function (scriptName, callback) {

      if (!myapp_config.jsArray[scriptName]) {
        var promise = jQuery.Deferred();

        /* adding the script tag to the head as suggested before */
        var body = document.getElementsByTagName('body')[0],
          script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptName;

        /* then bind the event to the callback function
			   there are several events for cross browser compatibility */
        script.onload = function () {
          promise.resolve();
        };

        /* fire the loading */
        body.appendChild(script);
        myapp_config.jsArray[scriptName] = promise.promise();
      }

      myapp_config.jsArray[scriptName].then(function () {
        if (typeof callback === 'function') {
          callback();
        }
      });
    };

    /**
     * Javascript Animation for save settings
     * @return
     **/
    app.saveSettings = function () {

      /* if saveSettings function exists */
      if (typeof saveSettings !== 'undefined' && $.isFunction(saveSettings) && myapp_config.storeLocally) {

        /* call accessIndicator animation */
        initApp.accessIndicator();

        /* call saveSettings function from myapp_config.root_ (HTML) */
        saveSettings();



      } else {

      }

    };

    /**
     * Reset settings
     * DOC: removes all classes from root_ then saves
     * @return {[type]}
     **/
    app.resetSettings = function () {

      /* remove all setting classes nav|header|mod|display */
      myapp_config.root_.removeClass(function (index, className) {
        return (className.match(/(^|\s)(nav-|header-|mod-|display-)\S+/g) || []).join(' ');
      });

      /* detach custom css skin */
      $(myapp_config.mythemeAnchor).attr('href', "");

      /* check non-conflicting plugins */
      initApp.checkNavigationOrientation();

      /* save settings if "storeLocally == true" */
      initApp.saveSettings();


    };

    /**
     * Factory Reset
     * DOC: Resets all of localstorage
     * @return {[type]}
     **/
    app.factoryReset = function () {

      //backdrop sound
      initApp.playSound('media/sound', 'messagebox');
      //hide settings modal to bootstrap avoid modal bug
      $('.js-modal-settings').modal('hide');

      if (typeof bootbox != 'undefined') {

        bootbox.confirm({
          title: "<i class='fal fa-exclamation-triangle text-warning mr-2'></i> You are about to reset all of your localStorage settings",
          message: "<span><strong>Warning:</strong> This action is not reversable. You will lose all your layout settings.</span>",
          centerVertical: true,
          swapButtonOrder: true,
          buttons: {
            confirm: {
              label: 'Factory Reset',
              className: 'btn-warning shadow-0'
            },
            cancel: {
              label: 'Cancel',
              className: 'btn-success'
            }
          },
          className: "modal-alert",
          closeButton: false,
          callback: function (result) {
            if (result == true) {
              //close panel
              localStorage.clear();
              initApp.resetSettings();
              location.reload();
            }
          }
        });

      } else {

        if (confirm('You are about to reset all of your localStorage to null state. Do you wish to continue?')) {
          localStorage.clear();
          initApp.resetSettings();
          location.reload();
        }

      }

      //e.preventDefault();


    };

    /**
     * Access Indicator
     * DOC: spinning icon that appears whenever you
     * access localstorage or change settings
     * @return {[type]}
     **/
    app.accessIndicator = function () {

      myapp_config.root_.addClass('saving').delay(600).queue(function () {
        $(this).removeClass('saving').dequeue();
        return true;
      });

    };

    /*
	 * usage: initApp.pushSettings("className1 className2")
	 * save settings to localstorage: initApp.pushSettings("className1 className2", true)
	 * DOC: pushSettings will also auto save to localStorage if "storeLocally == true"
	 * we will use this "pushSettings" when loading settings from a database
	 * @param  {[type]} DB_string
	 * @param  {[type]} saveToLocal
	 * @return {[type]}
	 */
    app.pushSettings = function (DB_string, saveToLocal) {

      /* clear localstorage variable 'themeSettings' */
      if (saveToLocal != false)
        localStorage.setItem("themeSettings", "");

      /* replace classes from <body> with fetched DB string */
      myapp_config.root_.addClass(DB_string); //ommited .removeClass()

      /* destroy or enable slimscroll */
      initApp.checkNavigationOrientation();

      /* save settings if "storeLocally == true" && "saveToLocal is true" */
      if (saveToLocal != false)
        initApp.saveSettings();

      /* return string */
      return DB_string;
    };

    /*
	 * usage: var DB_string = initApp.getSettings();
	 * we will use this "getSettings" when storing settings to a database
	 * @return {[type]}
	 */
    app.getSettings = function () {

      return myapp_config.root_.attr('class').split(/[^\w-]+/).filter(function (item) {
        return /^(nav|header|mod|display)-/i.test(item);
      }).join(' ');
    };

    /*
	 * Play Sounds
	 * usage: initApp.playSound(path, sound);
	 * @param  {[string]} path
	 * @param  {[string]} sound
	 */
    app.playSound = function (path, sound) {
      var audioElement = document.createElement('audio');
      if (navigator.userAgent.match('Firefox/'))
        audioElement.setAttribute('src', path + "/" + sound + '.ogg');
      else
        audioElement.setAttribute('src', path + "/" + sound + '.mp3');

      //$.get();// <-- ??
      audioElement.addEventListener("load", function () {
        audioElement.play();
      }, true);

      audioElement.pause();
      audioElement.play();
    }

    /*
	 * Checks and sets active settings selections
	 * DOC: ?
	 */
    /*app.indicateSelections = function () {

		var classNames = initApp.getSettings()
			.split(' ')
			.map(function(c) {
				return '[data-class="' +  c + '"].js-indicateSelections';
			})
			.join(',');

		$('[data-class].active.js-indicateSelections').removeClass('active');
		$(classNames).addClass('active');

		if (myapp_config.debugState)
			console.log(classNames);
	}*/

    /**
     * detect browser type
     * DOC: detect if browser supports webkit CSS
     * @return {[type]}
     **/
    app.detectBrowserType = function () {

      /* safari, chrome or IE detect */
      if (myapp_config.isChrome) {

        myapp_config.root_.addClass('chrome webkit');
        return 'chrome webkit';

      } else if (myapp_config.isWebkit) {

        myapp_config.root_.addClass('webkit');
        return 'webkit';

      } else if (myapp_config.isIE) {

        myapp_config.root_.addClass('ie');
        return 'ie';
      }

    };

    /**
     * Add device type
     * DOC: Detect if mobile or desktop
     **/
    app.addDeviceType = function () {

      if (!myapp_config.isMobile) {

        /* desktop */
        myapp_config.root_.addClass('desktop');
        myapp_config.thisDevice = 'desktop';

      } else {

        /* mobile */
        myapp_config.root_.addClass('mobile');
        myapp_config.thisDevice = 'mobile';

      }

      return myapp_config.thisDevice;

    };

    /**
     * Fix logo position on .header-function-fixed & .nav-function-hidden
     * DOC: Counters browser bug for fixed position and overflow:hidden for the logo (firefox/IE/Safari)
     *      Will not fire for webkit devices or Chrome as its not needed
     * @return {[type]}
     **/
    app.windowScrollEvents = function () {
      if (myapp_config.root_.is('.nav-function-hidden.header-function-fixed:not(.nav-function-top)') && myapp_config.thisDevice === 'desktop') {
        myapp_config.root_logo.css({
          'top': $(window).scrollTop()
        });
      } else if (myapp_config.root_.is('.header-function-fixed:not(.nav-function-top):not(.nav-function-hidden)') && myapp_config.thisDevice === 'desktop') {
        myapp_config.root_logo.attr("style", "");
      }
    };

    /**
     * checkNavigationOrientation by checking layout conditions
     * DOC: sometimes settings can trigger certain plugins; so we check this condition and activate accordingly
     * E.g: the fixed navigation activates custom scroll plugin for the navigation, but this only happens when
     *    it detects desktop browser and destroys the plugin when navigation is on top or if its not fixed.
     * @return {[type]}
     **/
    app.checkNavigationOrientation = function () {

      /**
       * DOC: add the plugin with the following rules: fixed navigation is selected, top navigation is not active, minify nav is not active,
       * and the device is desktop. We do not need to activate the plugin when loading from a mobile phone as it is not needed for touch screens.
       **/
      switch (true) {

        case (myapp_config.root_.hasClass('nav-function-fixed') && !myapp_config.root_.is('.nav-function-top, .nav-function-minify, .mod-main-boxed') && myapp_config.thisDevice === 'desktop'):

          /* start slimscroll on nav */
          if (typeof $.fn.slimScroll !== 'undefined') {
            myapp_config.navAnchor.slimScroll({
              height: '100%',
              color: '#fff',
              size: '4px',
              distance: '4px',
              railOpacity: 0.4,
              wheelStep: 10
            });

            if (document.getElementById(myapp_config.navHorizontalWrapperId)) {
              myapp_config.navHooks.menuSlider('destroy');


            }



          } else {

          }

          break;

        case (myapp_config.navAnchor.parent().hasClass('slimScrollDiv') && myapp_config.thisDevice === 'desktop' && typeof $.fn.slimScroll !== 'undefined'):

          /* destroy the plugin if it is in violation of rules above */
          myapp_config.navAnchor.slimScroll({destroy: true});
          myapp_config.navAnchor.attr('style', '');

          /* clear event listners (IE bug) */
          events = jQuery._data(myapp_config.navAnchor[0], "events");

          if (events)
            jQuery._removeData(myapp_config.navAnchor[0], "events");



          break;

      }

      switch (true) {


        /* fires when user switches to nav-function-top on desktop view */
        case ($.fn.menuSlider && myapp_config.root_.hasClass('nav-function-top') && $("#js-nav-menu-wrapper").length == false && !myapp_config.root_.hasClass('mobile-view-activated')):

          /* build horizontal navigation */
          myapp_config.navHooks.menuSlider({
            element: myapp_config.navHooks,
            wrapperId: myapp_config.navHorizontalWrapperId
          });

          /* build horizontal nav */


          break;

        /* fires when user resizes screen to mobile size or app is loaded on mobile resolution */
        case (myapp_config.root_.hasClass('nav-function-top') && $("#js-nav-menu-wrapper").length == true && myapp_config.root_.hasClass('mobile-view-activated')):

          /* destroy horizontal nav */
          myapp_config.navHooks.menuSlider('destroy');

          /* build horizontal nav */


          break;

        /* fires when users switch off nav-function-top class */
        case (!myapp_config.root_.hasClass('nav-function-top') && $("#js-nav-menu-wrapper").length == true):

          /* destroy horizontal nav */
          myapp_config.navHooks.menuSlider('destroy');

          /* build horizontal nav */


          break;

      }

    };

    /**
     * Activate Nav
     * DOC: activation should not take place if top navigation is on
     * @param  {[type]} id
     * @return {[type]}
     **/
    app.buildNavigation = function (id) {

      /**
       * build nav
       * app.navigation.js
       **/
      if ($.fn.navigation) {

        $(id).navigation({

          accordion: myapp_config.navAccordion,
          speed: myapp_config.navSpeed,
          closedSign: '<em class="' + myapp_config.navClosedSign + '"></em>',
          openedSign: '<em class="' + myapp_config.navOpenedSign + '"></em>',
          initClass: myapp_config.navInitalized

        });

        return (id);
      } else {



      }
    };

    /**
     * Destroy Nav
     * @param  {[type]} id
     * @return {[type]}
     **/
    app.destroyNavigation = function (id) {

      /**
       * destroy nav
       * app.navigation.js
       **/
      if ($.fn.navigation) {

        $(id).navigationDestroy();

        return (id);
      } else {



      }
    };

    /**
     * App Forms
     * DOC: detects if input is selected or blured
     * @param  {[type]} parentClass
     * @param  {[type]} focusClass
     * @param  {[type]} disabledClass
     * @return {[type]}
     **/
    app.appForms = function (parentClass, focusClass, disabledClass) {

      /* go through each .form-control */
      /*$('.form-control').each(function () {
			checkLength(this);
		});*/

      /* if input has 'some value' add class .has-length to .form-group */

      /*function checkLength(e) {
			if (e.value.length > 0 ) {
				$(e).parents(parentClass).addClass(focusClass);
				if($(e).is('[readonly]') || $(e).is('[disabled]')) {
					$(e).parents(parentClass).addClass(disabledClass);
				}
			} else {
				$(e).parents(parentClass).removeClass(focusClass);
				if($(e).is('[readonly]') || $(e).is('[disabled]')) {
					$(e).parents(parentClass).removeClass(disabledClass);
				}
			}
		}*/

      function setClass(e, parentClass, focusClass) {
        $(e).parents(parentClass).addClass(focusClass);
      }

      function deleteClass(e, parentClass, focusClass) {
        /*if(e.value.length) {

			} else {*/
        $(e).parents(parentClass).removeClass(focusClass);
        /*}*/
      }

      $(parentClass).each(function () {
        var input = $(this).find('.form-control');
        input.on('focus', function () {
          setClass(this, parentClass, focusClass);
        });
        input.on('blur', function () {
          deleteClass(this, parentClass, focusClass);
        });
      });
    };

    /**
     * Mobile Check Activate
     * DOC: check on window resize if screen width is less than [value]
     * @return {int}
     */
    app.mobileCheckActivation = function () {

      if (window.innerWidth < myapp_config.mobileResolutionTrigger) {

        myapp_config.root_.addClass('mobile-view-activated');
        myapp_config.mobileMenuTrigger = true;

      } else {

        myapp_config.root_.removeClass('mobile-view-activated');
        myapp_config.mobileMenuTrigger = false;

      }



      return myapp_config.mobileMenuTrigger;
    };

    /**
     *  Toggle visibility
     *  DOC: show and hide content with a button action
     *  Usage: onclick="initApp.toggleVisibility('foo');"
     *  @param  {[type]} id
     *  @return {[type]}
     **/
    app.toggleVisibility = function (id) {
      var e = document.getElementById(id);
      if (e.style.display == 'block')
        e.style.display = 'none';
      else
        e.style.display = 'block';
    };

    /**
     * Miscelaneous DOM ready functions
     * DOC: start jQuery(document).ready calls
     * @return {[type]}
     **/
    app.domReadyMisc = function () {

      /* Add file name path to input files */
      $('.custom-file input').change(function (e) {
        var files = [];
        for (var i = 0; i < $(this)[0].files.length; i++) {
          files.push($(this)[0].files[i].name);
        }
        $(this).next('.custom-file-label').html(files.join(', '));
      });

      /* Give modal backdrop an extra class to make it customizable */
      $('.modal-backdrop-transparent').on('show.bs.modal', function (e) {
        setTimeout(function () {
          $('.modal-backdrop').addClass('modal-backdrop-transparent');
        });
      });

      /* Add app date to js-get-date */
      if (myapp_config.appDateHook.length) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          now = new Date(),
          formatted = day[now.getDay()] + ', ' +
            months[now.getMonth()] + ' ' +
            now.getDate() + ', ' +
            now.getFullYear();
        myapp_config.appDateHook.text(formatted);
      }

      /* Check conflicting classes to build/destroy slimscroll */
      initApp.checkNavigationOrientation();

      /* Activate the last tab clicked using localStorage */
      var lastTab = localStorage.getItem('lastTab');

      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        localStorage.setItem('lastTab', $(this).attr('href'));
      });

      if (lastTab) {
        $('[href="' + lastTab + '"]').tab('show');
      }

      /**
       * all options:
       * --------------
       width: '300px',
       height: '500px',
       size: '10px',
       position: 'left',
       color: '#ffcc00',
       alwaysVisible: true,
       distance: '20px',
       start: $('#child_image_element'),
       railVisible: true,
       railColor: '#222',
       railOpacity: 0.3,
       wheelStep: 10,
       allowPageScroll: false,
       disableFadeOut: false
       **/
      if (typeof $.fn.slimScroll !== 'undefined' && myapp_config.thisDevice === 'desktop') {

        $('.custom-scroll:not(.disable-slimscroll) >:first-child').slimscroll({
          height: $(this).data('scrollHeight') || '100%',
          size: $(this).data('scrollSize') || '4px',
          position: $(this).data('scrollPosition') || 'right',
          color: $(this).data('scrollColor') || 'rgba(0,0,0,0.6)',
          alwaysVisible: $(this).data('scrollAlwaysVisible') || false,
          distance: $(this).data('scrollDistance') || '4px',
          railVisible: $(this).data('scrollRailVisible') || false,
          railColor: $(this).data('scrollRailColor') || '#fafafa',
          allowPageScroll: false,
          disableFadeOut: false
        });



      } else {

        myapp_config.root_.addClass("no-slimscroll");
      }

      /**
       * Activate listFilters
       * usage: <input id="inputID" data-listfilter="listFilter" />
       **/
      if (typeof initApp.listFilter !== 'undefined' && $.isFunction(initApp.listFilter) && $('[data-listfilter]').length) {


        var inputID = $('[data-listfilter]').attr('id'),
          listFilter = $('[data-listfilter]').attr("data-listfilter");

        /* initApp.listFilter($('.list'), $('#intput-id')); */
        initApp.listFilter(listFilter, '#' + inputID);
      }

      /**
       * Start bootstrap tooltips
       **/
      if (typeof ($.fn.tooltip) !== 'undefined' && $('[data-toggle="tooltip"]').length) {
        $('[data-toggle="tooltip"]').tooltip(); /*{html: true}*/
      } else {

      }

      /**
       * Start bootstrap popovers
       **/
      if (typeof ($.fn.popover) !== 'undefined' && $('[data-toggle="popover"]').length) {

        /* BS4 sanatize */
        var myDefaultWhiteList = $.fn.tooltip.Constructor.Default.whiteList

        /* init popover */
        /* data-sanitize="false" was not working so had to add this globally */
        /* DOC: https://getbootstrap.com/docs/4.3/getting-started/javascript/#sanitizer */
        $('[data-toggle="popover"]').popover({sanitize: false}); /*{trigger: "focus"}*/

      } /*else {
			console.log("OOPS! bs.popover is not loaded");
			console.log("this")
		}*/

      /*
		 * Disable popper.js's forced hardware accelaration styles
		 */
      if (typeof ($.fn.dropdown) !== 'undefined') {
        Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;
      } else {

      }

      /**
       * Dropdowns will not close on click
       * doc: close dropdowns on click outside hit area
       **/
      $(document).on('click', '.dropdown-menu:not(.js-auto-close)', function (e) {
        e.stopPropagation();
      });

      /**
       * Waves effect (plugin has issues with IE9)
       * DOC: http://fian.my.id/Waves/#start
       **/
      if (window.Waves && myapp_config.rippleEffect) {

        Waves.attach('.nav-menu:not(.js-waves-off) a, .btn:not(.js-waves-off):not(.btn-switch), .js-waves-on', ['waves-themed']);
        Waves.init();



      } else {


      }

      /**
       * Action buttons
       **/
      myapp_config.root_
        .on('click touchend', '[data-action]', function (e) {

          var actiontype = $(this).data('action');

          switch (true) {

            /**
             * toggle trigger
             * Usage 1 (body): <a href="#" data-action="toggle" data-class="add-this-class-to-body">...</a>
             * Usage 2 (target): <a href="#" data-action="toggle" data-class="add-this-class-to-target" data-target="target">...</a>
             **/
            case (actiontype === 'toggle'):

              var target = $(this).attr('data-target') || myapp_config.root_,
                dataClass = $(this).attr('data-class'),
                inputFocus = $(this).attr('data-focus');

              /* remove previous background image if alternate is selected */
              if (dataClass.indexOf('mod-bg-') !== -1) {
                $(target).removeClass(function (index, css) {
                  return (css.match(/(^|\s)mod-bg-\S+/g) || []).join(' ');
                });
              }

              /* trigger class change */
              $(target).toggleClass(dataClass);

              /* this allows us to add active class for dropdown toggle components */
              if ($(this).hasClass('dropdown-item')) {
                $(this).toggleClass('active');
              }

              /* focus input if available
						   FAQ: We had to put a delay timer to slow it down for chrome
						*/
              if (inputFocus != undefined) {
                setTimeout(function () {
                  $('#' + inputFocus).focus();
                }, 200);
              }

              /* save settings */
              if (typeof classHolder != 'undefined' || classHolder != null) {

                /* NOTE: saveSettings function is located right after <body> tag */
                initApp.checkNavigationOrientation();
                initApp.saveSettings();
              }

              break;

            /**
             * toggle swap trigger
             * Usage (target): <a href="#" data-action="toggle-swap" data-class=".add-this-class-to-target .another-class" data-target="#id">...</a>
             **/
            case (actiontype === 'toggle-swap'):

              var target = $(this).attr('data-target'),
                dataClass = $(this).attr('data-class');

              /* trigger class change */
              $(target).removeClass().addClass(dataClass);

              break;

            /**
             * panel 'collapse' trigger
             **/
            case (actiontype === 'panel-collapse'):

              var selectedPanel = $(this).closest('.panel');

              selectedPanel.children('.panel-container').collapse('toggle')
                .on('show.bs.collapse', function () {
                  selectedPanel.removeClass("panel-collapsed");

                  if (myapp_config.debugState)
                    console.log("panel id:" + selectedPanel.attr('id') + " | action: uncollapsed");

                }).on('hidden.bs.collapse', function () {
                selectedPanel.addClass("panel-collapsed");

                if (myapp_config.debugState)
                  console.log("panel id:" + selectedPanel.attr('id') + " | action: collapsed");

              });

              /* return ID of panel */
              //return selectedPanel.attr('id');

              break;

            /**
             * panel 'fullscreen' trigger
             **/
            case (actiontype === 'panel-fullscreen'):

              var selectedPanel = $(this).closest('.panel');

              selectedPanel.toggleClass('panel-fullscreen');
              myapp_config.root_.toggleClass('panel-fullscreen');

              if (myapp_config.debugState)
                console.log("panel id:" + selectedPanel.attr('id') + " | action: fullscreen");

              /* return ID of panel */
              //return selectedPanel.attr('id');

              break;

            /**
             * panel 'close' trigger
             **/
            case (actiontype === 'panel-close'):

              var selectedPanel = $(this).closest('.panel');

              var killPanel = function () {

                selectedPanel.fadeOut(500, function () {
                  /* remove panel */
                  $(this).remove();


                });

              };

              if (typeof bootbox != 'undefined') {

                initApp.playSound('media/sound', 'messagebox')

                bootbox.confirm({
                  title: "<i class='fal fa-times-circle text-danger mr-2'></i> Do you wish to delete panel <span class='fw-500'>&nbsp;'" + selectedPanel.children('.panel-hdr').children('h2').text().trim() + "'&nbsp;</span>?",
                  message: "<span><strong>Warning:</strong> This action cannot be undone!</span>",
                  centerVertical: true,
                  swapButtonOrder: true,
                  buttons: {
                    confirm: {
                      label: 'Yes',
                      className: 'btn-danger shadow-0'
                    },
                    cancel: {
                      label: 'No',
                      className: 'btn-default'
                    }
                  },
                  className: "modal-alert",
                  closeButton: false,
                  callback: function (result) {

                    if (result == true) {
                      killPanel();
                    }
                  }
                });

              } else {

                if (confirm('Do you wish to delete panel ' + selectedPanel.children('.panel-hdr').children('h2').text().trim() + '?')) {
                  killPanel();
                }

              }

              break;

            /**
             * update header css, 'theme-update' trigger
             * eg:  data-action = "theme-update"
             *      data-theme = "css/cust-theme-1.css"
             **/
            case (actiontype === 'theme-update'):

              if ($(myapp_config.mythemeAnchor).length) {
                $(myapp_config.mythemeAnchor).attr('href', $(this).attr('data-theme'));
              } else {
                var mytheme = $("<link>", {
                  id: myapp_config.mythemeAnchor.replace('#', ''),
                  "rel": "stylesheet",
                  "href": $(this).attr('data-theme')
                });
                $('head').append(mytheme);
              }

              if ($(this).attr('data-themesave') != undefined) {

                initApp.saveSettings();
              }

              break;

            /**
             * theme 'app-reset' trigger
             **/
            case (actiontype === 'app-reset'):

              initApp.resetSettings();

              break;

            /**
             * theme 'factory-reset' trigger
             **/
            case (actiontype === 'factory-reset'):

              initApp.factoryReset();

              break;

            /**
             * app print
             * starts print priview for browser
             **/
            case (actiontype === 'app-print'):

              window.print();

              break;

            /**
             * ondemand
             * load onDemand scripts
             **/
            case (actiontype === 'app-loadscript'):

              var loadurl = $(this).attr('data-loadurl'),
                loadfunction = $(this).attr('data-loadfunction');

              initApp.loadScript(loadurl, loadfunction);

              break;

            /**
             * app language selection
             * lazyloads i18n plugin and activates selected language
             **/
            case (actiontype === 'lang'):

              var applang = $(this).attr('data-lang').toString();

              if (!$.i18n) {
                //jQuery.getScript('http://url/to/the/script');

                initApp.loadScript("js/i18n/i18n.js",

                  function activateLang() {

                    $.i18n.init({
                      resGetPath: 'media/data/__lng__.json',
                      load: 'unspecific',
                      fallbackLng: false,
                      lng: applang
                    }, function (t) {
                      $('[data-i18n]').i18n();
                    });

                  }
                );

              } else {

                i18n.setLng(applang, function () {
                  $('[data-i18n]').i18n();
                  $('[data-lang]').removeClass('active');
                  $(this).addClass('active');
                });

              }

              break;

            /**
             * app 'fullscreen' trigger
             **/
            case (actiontype === 'app-fullscreen'):

              /* NOTE: this may not work for all browsers if the browser security does not permit it
						   IE issues: http://stackoverflow.com/questions/33732805/fullscreen-not-working-in-ie */

              if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {

                if (document.documentElement.requestFullscreen) {
                  /* Standard browsers */
                  document.documentElement.requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                  /* Internet Explorer */
                  document.documentElement.msRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                  /* Firefox */
                  document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                  /* Chrome */
                  document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }

                if (myapp_config.debugState)
                  console.log("app fullscreen toggle active");

              } else {

                if (document.exitFullscreen) {
                  document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
                }

                if (myapp_config.debugState)
                  console.log("%capp fullscreen toggle inactive! ", "color: #ed1c24");
              }

              break;

            /**
             * app 'playsound' trigger
             * usage: data-action="playsound" data-soundpath="media/sound/" data-soundfile="filename" (no file extensions)
             **/
            case (actiontype === 'playsound'):

              var path = $(this).attr('data-soundpath') || "media/sound/",
                sound = $(this).attr('data-soundfile');

              initApp.playSound(path, sound);

              break;

          }

          /* hide tooltip if any present */
          $(this).tooltip('hide');

          if (myapp_config.debugState)
            console.log("data-action clicked: " + actiontype);

          /* stop default link action */
          e.stopPropagation();
          e.preventDefault();
        });

      /**
       * Windows mobile 8 fix ~
       * DOC: bootstrap related
       **/
      if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(
          document.createTextNode(
            '@-ms-viewport{width:auto!important}'
          )
        );
        document.head.appendChild(msViewportStyle)
      }
      ;

      /**
       * Display APP version
       * DOC: only show this if debug state tree
       **/
      if (myapp_config.debugState)
        console.log("%c✔ Finished app.init() v" + myapp_config.VERSION + '\n' + "---------------------------", "color: #148f32");
    };

    return app;

  })({});

  /*
	"Night is a bag that bursts with the golden dust of dawn..."

	Oh wow, you actually opened this file and read it all the way though! Congrats!
	Please do drop me a line at @myplaneticket :)

*/
  /**
   * Bind the throttled handler to the resize event.
   * NOTE: Please do not change the order displayed (e.g. 1a, 1b, 2a, 2b...etc)
   **/
  $(window).resize(
    $.throttle(myapp_config.throttleDelay, function (e) {

      /**
       * (1a) ADD CLASS WHEN BELOW CERTAIN WIDTH (MOBILE MENU)
       * Description: tracks the page min-width of #CONTENT and NAV when navigation is resized.
       * This is to counter bugs for minimum page width on many desktop and mobile devices.
       **/
      initApp.mobileCheckActivation();

      /**
       * (1b) CHECK NAVIGATION STATUS (IF HORIZONTAL OR VERTICAL)
       * Description: fires an event to check for navigation orientation.
       * Based on the condition, it will initliaze or destroy the slimscroll, or horizontal nav plugins
       **/
      initApp.checkNavigationOrientation();


      /** -- insert your resize codes below this line -- **/

    })
  );

  /**
   * Bind the throttled handler to the scroll event
   **/
  $(window).scroll(
    $.throttle(myapp_config.throttleDelay, function (e) {

      /**
       * FIX APP HEIGHT
       * Compare the height of nav and content;
       * If one is longer/shorter than the other, measure them to be equal.
       * This event is only fired on desktop.
       **/


      /** -- insert your other scroll codes below this line -- **/

    })
  );

  /**
   * Initiate scroll events
   **/
  $(window).on('scroll', initApp.windowScrollEvents);

  /**
   * DOCUMENT LOADED EVENT
   * DOC: Fire when DOM is ready
   * Do not change order a, b, c, d...
   **/

  document.addEventListener('DOMContentLoaded', function () {

    /**
     * detect desktop or mobile
     **/
    initApp.addDeviceType();

    /**
     * detect Webkit Browser
     **/
    initApp.detectBrowserType();

    /**
     * a. check for mobile view width and add class .mobile-view-activated
     **/
    initApp.mobileCheckActivation();

    /**
     * b. build navigation
     **/
    initApp.buildNavigation(myapp_config.navHooks);

    /**
     * c. initialize nav filter
     **/
    initApp.listFilter(myapp_config.navHooks, myapp_config.navFilterInput, myapp_config.navAnchor);

    /**
     * d. run DOM misc functions
     **/
    initApp.domReadyMisc();

    /**
     * e. run app forms class detectors [parentClass,focusClass,disabledClass]
     **/
    initApp.appForms('.input-group', 'has-length', 'has-disabled');

  });

  /**
   * Mobile orientation change events
   * DOC: recalculates app height
   **/
  $(window).on("orientationchange", function (event) {
    /* reset any .CSS heights and force appHeight function to recalculate */

    if (myapp_config.debugState)
      console.log("orientationchange event");
  });

  /**
   * Window load function
   * DOC: window focus blur detection
   **/
  $(window).on("blur focus", function (e) {
    var prevType = $(this).data("prevType");
    /**
     * reduce double fire issues
     **/
    if (prevType != e.type) {
      switch (e.type) {
        case "blur":
          myapp_config.root_.toggleClass("blur")

          if (myapp_config.debugState)
            console.log("blur");

          break;
        case "focus":
          myapp_config.root_.toggleClass("blur")
          if (myapp_config.debugState)

            console.log("focused");

          break;
      }
    }

    $(this).data("prevType", e.type);
  })

  $('#js-page-content').smartPanel();
  $('#js-page-content2').smartPanel();
  $('#js-page-content3').smartPanel();
  $('#js-page-content4').smartPanel();

  var color = ({
    primary: {
      _50: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-50').css('color')) || '#ccbfdf',
      _100: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-100').css('color')) || '#beaed7',
      _200: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-200').css('color')) || '#b19dce',
      _300: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-300').css('color')) || '#a38cc6',
      _400: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-400').css('color')) || '#967bbd',
      _500: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-500').css('color')) || '#886ab5',
      _600: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-600').css('color')) || '#7a59ad',
      _700: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-700').css('color')) || '#6e4e9e',
      _800: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-800').css('color')) || '#62468d',
      _900: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-primary-900').css('color')) || '#563d7c'
    },
    success: {
      _50: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-50').css('color')) || '#7aece0',
      _100: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-100').css('color')) || '#63e9db',
      _200: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-200').css('color')) || '#4de5d5',
      _300: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-300').css('color')) || '#37e2d0',
      _400: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-400').css('color')) || '#21dfcb',
      _500: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-500').css('color')) || '#1dc9b7',
      _600: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-600').css('color')) || '#1ab3a3',
      _700: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-700').css('color')) || '#179c8e',
      _800: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-800').css('color')) || '#13867a',
      _900: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-success-900').css('color')) || '#107066'
    },
    info: {
      _50: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-50').css('color')) || '#9acffa',
      _100: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-100').css('color')) || '#82c4f8',
      _200: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-200').css('color')) || '#6ab8f7',
      _300: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-300').css('color')) || '#51adf6',
      _400: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-400').css('color')) || '#39a1f4',
      _500: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-500').css('color')) || '#2196F3',
      _600: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-600').css('color')) || '#0d8aee',
      _700: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-700').css('color')) || '#0c7cd5',
      _800: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-800').css('color')) || '#0a6ebd',
      _900: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-info-900').css('color')) || '#0960a5'
    },
    warning: {
      _50: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-50').css('color')) || '#ffebc1',
      _100: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-100').css('color')) || '#ffe3a7',
      _200: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-200').css('color')) || '#ffdb8e',
      _300: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-300').css('color')) || '#ffd274',
      _400: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-400').css('color')) || '#ffca5b',
      _500: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-500').css('color')) || '#ffc241',
      _600: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-600').css('color')) || '#ffba28',
      _700: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-700').css('color')) || '#ffb20e',
      _800: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-800').css('color')) || '#f4a500',
      _900: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-warning-900').css('color')) || '#da9400'
    },
    danger: {
      _50: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-50').css('color')) || '#feb7d9',
      _100: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-100').css('color')) || '#fe9ecb',
      _200: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-200').css('color')) || '#fe85be',
      _300: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-300').css('color')) || '#fe6bb0',
      _400: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-400').css('color')) || '#fd52a3',
      _500: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-500').css('color')) || '#fd3995',
      _600: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-600').css('color')) || '#fd2087',
      _700: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-700').css('color')) || '#fc077a',
      _800: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-800').css('color')) || '#e7026e',
      _900: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-danger-900').css('color')) || '#ce0262'
    },
    fusion: {
      _50: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-50').css('color')) || '#909090',
      _100: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-100').css('color')) || '#838383',
      _200: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-200').css('color')) || '#767676',
      _300: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-300').css('color')) || '#696969',
      _400: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-400').css('color')) || '#5d5d5d',
      _500: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-500').css('color')) || '#505050',
      _600: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-600').css('color')) || '#434343',
      _700: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-700').css('color')) || '#363636',
      _800: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-800').css('color')) || '#2a2a2a',
      _900: rgb2hex(myapp_config.mythemeColorProfileID.find('.color-fusion-900').css('color')) || '#1d1d1d'
    }
  });

});



/*knobs*/
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var t={},n=Math.max,r=Math.min;t.c={};t.c.d=e(document);t.c.t=function(e){return e.originalEvent.touches.length-1};t.o=function(){var n=this;this.o=null;this.$=null;this.i=null;this.g=null;this.v=null;this.cv=null;this.x=0;this.y=0;this.w=0;this.h=0;this.$c=null;this.c=null;this.t=0;this.isInit=false;this.fgColor=null;this.pColor=null;this.dH=null;this.cH=null;this.eH=null;this.rH=null;this.scale=1;this.relative=false;this.relativeWidth=false;this.relativeHeight=false;this.$div=null;this.run=function(){var t=function(e,t){var r;for(r in t){n.o[r]=t[r]}n._carve().init();n._configure()._draw()};if(this.$.data("kontroled"))return;this.$.data("kontroled",true);this.extend();this.o=e.extend({min:this.$.data("min")!==undefined?this.$.data("min"):0,max:this.$.data("max")!==undefined?this.$.data("max"):100,stopper:true,readOnly:this.$.data("readonly")||this.$.attr("readonly")==="readonly",cursor:this.$.data("cursor")===true&&30||this.$.data("cursor")||0,thickness:this.$.data("thickness")&&Math.max(Math.min(this.$.data("thickness"),1),.01)||.35,lineCap:this.$.data("linecap")||"butt",width:this.$.data("width")||200,height:this.$.data("height")||200,displayInput:this.$.data("displayinput")==null||this.$.data("displayinput"),displayPrevious:this.$.data("displayprevious"),fgColor:this.$.data("fgcolor")||"#87CEEB",inputColor:this.$.data("inputcolor"),font:this.$.data("font")||"Arial",fontWeight:this.$.data("font-weight")||"bold",inline:false,step:this.$.data("step")||1,rotation:this.$.data("rotation"),draw:null,change:null,cancel:null,release:null,format:function(e){return e},parse:function(e){return parseFloat(e)}},this.o);this.o.flip=this.o.rotation==="anticlockwise"||this.o.rotation==="acw";if(!this.o.inputColor){this.o.inputColor=this.o.fgColor}if(this.$.is("fieldset")){this.v={};this.i=this.$.find("input");this.i.each(function(t){var r=e(this);n.i[t]=r;n.v[t]=n.o.parse(r.val());r.bind("change blur",function(){var e={};e[t]=r.val();n.val(n._validate(e))})});this.$.find("legend").remove()}else{this.i=this.$;this.v=this.o.parse(this.$.val());this.v===""&&(this.v=this.o.min);this.$.bind("change blur",function(){n.val(n._validate(n.o.parse(n.$.val())))})}!this.o.displayInput&&this.$.hide();this.$c=e(document.createElement("canvas")).attr({width:this.o.width,height:this.o.height});this.$div=e('<div style="'+(this.o.inline?"display:inline;":"")+"width:"+this.o.width+"px;height:"+this.o.height+"px;"+'"></div>');this.$.wrap(this.$div).before(this.$c);this.$div=this.$.parent();if(typeof G_vmlCanvasManager!=="undefined"){G_vmlCanvasManager.initElement(this.$c[0])}this.c=this.$c[0].getContext?this.$c[0].getContext("2d"):null;if(!this.c){throw{name:"CanvasNotSupportedException",message:"Canvas not supported. Please use excanvas on IE8.0.",toString:function(){return this.name+": "+this.message}}}this.scale=(window.devicePixelRatio||1)/(this.c.webkitBackingStorePixelRatio||this.c.mozBackingStorePixelRatio||this.c.msBackingStorePixelRatio||this.c.oBackingStorePixelRatio||this.c.backingStorePixelRatio||1);this.relativeWidth=this.o.width%1!==0&&this.o.width.indexOf("%");this.relativeHeight=this.o.height%1!==0&&this.o.height.indexOf("%");this.relative=this.relativeWidth||this.relativeHeight;this._carve();if(this.v instanceof Object){this.cv={};this.copy(this.v,this.cv)}else{this.cv=this.v}this.$.bind("configure",t).parent().bind("configure",t);this._listen()._configure()._xy().init();this.isInit=true;this.$.val(this.o.format(this.v));this._draw();return this};this._carve=function(){if(this.relative){var e=this.relativeWidth?this.$div.parent().width()*parseInt(this.o.width)/100:this.$div.parent().width(),t=this.relativeHeight?this.$div.parent().height()*parseInt(this.o.height)/100:this.$div.parent().height();this.w=this.h=Math.min(e,t)}else{this.w=this.o.width;this.h=this.o.height}this.$div.css({width:this.w+"px",height:this.h+"px"});this.$c.attr({width:this.w,height:this.h});if(this.scale!==1){this.$c[0].width=this.$c[0].width*this.scale;this.$c[0].height=this.$c[0].height*this.scale;this.$c.width(this.w);this.$c.height(this.h)}return this};this._draw=function(){var e=true;n.g=n.c;n.clear();n.dH&&(e=n.dH());e!==false&&n.draw()};this._touch=function(e){var r=function(e){var t=n.xy2val(e.originalEvent.touches[n.t].pageX,e.originalEvent.touches[n.t].pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};this.t=t.c.t(e);r(e);t.c.d.bind("touchmove.k",r).bind("touchend.k",function(){t.c.d.unbind("touchmove.k touchend.k");n.val(n.cv)});return this};this._mouse=function(e){var r=function(e){var t=n.xy2val(e.pageX,e.pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};r(e);t.c.d.bind("mousemove.k",r).bind("keyup.k",function(e){if(e.keyCode===27){t.c.d.unbind("mouseup.k mousemove.k keyup.k");if(n.eH&&n.eH()===false)return;n.cancel()}}).bind("mouseup.k",function(e){t.c.d.unbind("mousemove.k mouseup.k keyup.k");n.val(n.cv)});return this};this._xy=function(){var e=this.$c.offset();this.x=e.left;this.y=e.top;return this};this._listen=function(){if(!this.o.readOnly){this.$c.bind("mousedown",function(e){e.preventDefault();n._xy()._mouse(e)}).bind("touchstart",function(e){e.preventDefault();n._xy()._touch(e)});this.listen()}else{this.$.attr("readonly","readonly")}if(this.relative){e(window).resize(function(){n._carve().init();n._draw()})}return this};this._configure=function(){if(this.o.draw)this.dH=this.o.draw;if(this.o.change)this.cH=this.o.change;if(this.o.cancel)this.eH=this.o.cancel;if(this.o.release)this.rH=this.o.release;if(this.o.displayPrevious){this.pColor=this.h2rgba(this.o.fgColor,"0.4");this.fgColor=this.h2rgba(this.o.fgColor,"0.6")}else{this.fgColor=this.o.fgColor}return this};this._clear=function(){this.$c[0].width=this.$c[0].width};this._validate=function(e){var t=~~((e<0?-.5:.5)+e/this.o.step)*this.o.step;return Math.round(t*100)/100};this.listen=function(){};this.extend=function(){};this.init=function(){};this.change=function(e){};this.val=function(e){};this.xy2val=function(e,t){};this.draw=function(){};this.clear=function(){this._clear()};this.h2rgba=function(e,t){var n;e=e.substring(1,7);n=[parseInt(e.substring(0,2),16),parseInt(e.substring(2,4),16),parseInt(e.substring(4,6),16)];return"rgba("+n[0]+","+n[1]+","+n[2]+","+t+")"};this.copy=function(e,t){for(var n in e){t[n]=e[n]}}};t.Dial=function(){t.o.call(this);this.startAngle=null;this.xy=null;this.radius=null;this.lineWidth=null;this.cursorExt=null;this.w2=null;this.PI2=2*Math.PI;this.extend=function(){this.o=e.extend({bgColor:this.$.data("bgcolor")||"#EEEEEE",angleOffset:this.$.data("angleoffset")||0,angleArc:this.$.data("anglearc")||360,inline:true},this.o)};this.val=function(e,t){if(null!=e){e=this.o.parse(e);if(t!==false&&e!=this.v&&this.rH&&this.rH(e)===false){return}this.cv=this.o.stopper?n(r(e,this.o.max),this.o.min):e;this.v=this.cv;this.$.val(this.o.format(this.v));this._draw()}else{return this.v}};this.xy2val=function(e,t){var i,s;i=Math.atan2(e-(this.x+this.w2),-(t-this.y-this.w2))-this.angleOffset;if(this.o.flip){i=this.angleArc-i-this.PI2}if(this.angleArc!=this.PI2&&i<0&&i>-.5){i=0}else if(i<0){i+=this.PI2}s=i*(this.o.max-this.o.min)/this.angleArc+this.o.min;this.o.stopper&&(s=n(r(s,this.o.max),this.o.min));return s};this.listen=function(){var t=this,i,s,o=function(e){e.preventDefault();var o=e.originalEvent,u=o.detail||o.wheelDeltaX,a=o.detail||o.wheelDeltaY,f=t._validate(t.o.parse(t.$.val()))+(u>0||a>0?t.o.step:u<0||a<0?-t.o.step:0);f=n(r(f,t.o.max),t.o.min);t.val(f,false);if(t.rH){clearTimeout(i);i=setTimeout(function(){t.rH(f);i=null},100);if(!s){s=setTimeout(function(){if(i)t.rH(f);s=null},200)}}},u,a,f=1,l={37:-t.o.step,38:t.o.step,39:t.o.step,40:-t.o.step};this.$.bind("keydown",function(i){var s=i.keyCode;if(s>=96&&s<=105){s=i.keyCode=s-48}u=parseInt(String.fromCharCode(s));if(isNaN(u)){s!==13&&s!==8&&s!==9&&s!==189&&(s!==190||t.$.val().match(/\./))&&i.preventDefault();if(e.inArray(s,[37,38,39,40])>-1){i.preventDefault();var o=t.o.parse(t.$.val())+l[s]*f;t.o.stopper&&(o=n(r(o,t.o.max),t.o.min));t.change(t._validate(o));t._draw();a=window.setTimeout(function(){f*=2},30)}}}).bind("keyup",function(e){if(isNaN(u)){if(a){window.clearTimeout(a);a=null;f=1;t.val(t.$.val())}}else{t.$.val()>t.o.max&&t.$.val(t.o.max)||t.$.val()<t.o.min&&t.$.val(t.o.min)}});this.$c.bind("mousewheel DOMMouseScroll",o);this.$.bind("mousewheel DOMMouseScroll",o)};this.init=function(){if(this.v<this.o.min||this.v>this.o.max){this.v=this.o.min}this.$.val(this.v);this.w2=this.w/2;this.cursorExt=this.o.cursor/100;this.xy=this.w2*this.scale;this.lineWidth=this.xy*this.o.thickness;this.lineCap=this.o.lineCap;this.radius=this.xy-this.lineWidth/2;this.o.angleOffset&&(this.o.angleOffset=isNaN(this.o.angleOffset)?0:this.o.angleOffset);this.o.angleArc&&(this.o.angleArc=isNaN(this.o.angleArc)?this.PI2:this.o.angleArc);this.angleOffset=this.o.angleOffset*Math.PI/180;this.angleArc=this.o.angleArc*Math.PI/180;this.startAngle=1.5*Math.PI+this.angleOffset;this.endAngle=1.5*Math.PI+this.angleOffset+this.angleArc;var e=n(String(Math.abs(this.o.max)).length,String(Math.abs(this.o.min)).length,2)+2;this.o.displayInput&&this.i.css({width:(this.w/2+4>>0)+"px",height:(this.w/3>>0)+"px",position:"absolute","vertical-align":"middle","margin-top":(this.w/3>>0)+"px","margin-left":"-"+(this.w*3/4+2>>0)+"px",border:0,background:"none",font:this.o.fontWeight+" "+(this.w/e>>0)+"px "+this.o.font,"text-align":"center",color:this.o.inputColor||this.o.fgColor,padding:"0px","-webkit-appearance":"none"})||this.i.css({width:"0px",visibility:"hidden"})};this.change=function(e){this.cv=e;this.$.val(this.o.format(e))};this.angle=function(e){return(e-this.o.min)*this.angleArc/(this.o.max-this.o.min)};this.arc=function(e){var t,n;e=this.angle(e);if(this.o.flip){t=this.endAngle+1e-5;n=t-e-1e-5}else{t=this.startAngle-1e-5;n=t+e+1e-5}this.o.cursor&&(t=n-this.cursorExt)&&(n=n+this.cursorExt);return{s:t,e:n,d:this.o.flip&&!this.o.cursor}};this.draw=function(){var e=this.g,t=this.arc(this.cv),n,r=1;e.lineWidth=this.lineWidth;e.lineCap=this.lineCap;if(this.o.bgColor!=="none"){e.beginPath();e.strokeStyle=this.o.bgColor;e.arc(this.xy,this.xy,this.radius,this.endAngle-1e-5,this.startAngle+1e-5,true);e.stroke()}if(this.o.displayPrevious){n=this.arc(this.v);e.beginPath();e.strokeStyle=this.pColor;e.arc(this.xy,this.xy,this.radius,n.s,n.e,n.d);e.stroke();r=this.cv==this.v}e.beginPath();e.strokeStyle=r?this.o.fgColor:this.fgColor;e.arc(this.xy,this.xy,this.radius,t.s,t.e,t.d);e.stroke()};this.cancel=function(){this.val(this.v)}};e.fn.dial=e.fn.knob=function(n){return this.each(function(){var r=new t.Dial;r.o=n;r.$=e(this);r.run()}).parent()}})



function chnagknob(e){

}
$(function($) {
$(document).on('shiny:sessioninitialized', function(event) {
  Shiny.addCustomMessageHandler("sendKnobInputMessage", function(e){
    //$("#"+e[0]).val(e[1]).change()
    console.log("#"+e[0]);
$("#"+e[0]).closest("canvas").scroll();
//var e = $.Event( "keypress", { which: 13 } );
//$("#"+e[0]).trigger(e);
});
});
    $(".knob").knob({
        change : function (value) {
           console.log("change : " + value);

        },
        release : function (value) {
          $("#"+this.$.attr('id')).val(value).change();
            //console.log($("#"+this.$.attr('id')).val());
            //console.log("released : " + value);
        },
        cancel : function () {
            console.log("cancel : ", this);
        },
        /*format : function (value) {
         return value + '%';
         },*/
        draw : function () {

            // "tron" case
            if(this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                    , pa                   // Previous arc
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });

    // Example of infinite knob, iPod click wheel
    var v, up=0,down=0,i=0
        ,$idir = $("div.idir")
        ,$ival = $("div.ival")
        ,incr = function() { i++; $idir.show().html("+").fadeOut(); $ival.html(i); }
        ,decr = function() { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
    $("input.infinite").knob(
        {
            min : 0
            , max : 20
            , stopper : false
            , change : function () {
            if(v > this.cv){
                if(up){
                    decr();
                    up=0;
                }else{up=1;down=0;}
            } else {
                if(v < this.cv){
                    if(down){
                        incr();
                        down=0;
                    }else{down=1;up=0;}
                }
            }
            v = this.cv;
        }
        });
});





//Superpose (clock) function

function clock() {
    var $s = $(".second"),
        $m = $(".minute"),
        $h = $(".hour");
    d = new Date(),
        s = d.getSeconds(),
        m = d.getMinutes(),
        h = d.getHours();
    $s.val(s).trigger("change");
    $m.val(m).trigger("change");
    $h.val(h).trigger("change");
    setTimeout("clock()", 1000);
}
clock();




