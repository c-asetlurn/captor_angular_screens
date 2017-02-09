/* SEARCH MULTISELECT PLUGIN
    AUTHOR: HARIKRISHNAN GOPAL JANAKIRAMAN, UI/UX DEVELOPER OF DEPARTMENT OF CORRECTIONS
 */
$(document).ready(function () {
    var multiselect_focus_enabled = 1;
    var multiselect_dropdown_data_id;
    var multiselect_selector_storage;
    var multiselect_dropdownicon_storage;
    var animation_enabled_multiselect = $('.animation-enabled-for-multiselect').attr("data-id");

    $('body').on('mouseenter, focus', '.multiselect-form-control', function () {
        multiselect_dropdownicon_storage = $(this);
        multiselect_dropdown_data_id = $(this).attr("data-id");
        multiselect_dropdown_data_id = (multiselect_dropdown_data_id - 100);
        multiselect_selector_storage = '.multiselect-dropdown-selector:eq(' + multiselect_dropdown_data_id + ')';
        var multiselect_form_control_width = $(".multiselect-form-group").width();
        var multiselectdd_section_width = (multiselect_form_control_width - 21);
        if (multiselect_form_control_width >= 1) {
            $(".multiselectdd-section").css("width", multiselect_form_control_width);
            if (animation_enabled_multiselect == 999) {
                multiselectdd_section_width = multiselectdd_section_width + 20;
                $(".multiselect-form-control").css("width", multiselectdd_section_width);
            }
            else {
                $(".multiselect-form-control").css("width", multiselectdd_section_width);
            }
           
            $(multiselect_selector_storage).css("display", "block");
            
        }
    });

    $(".multiselect-form-control, .multiselect-dropdown-icon").focusout(function () {
        if (multiselect_focus_enabled == 1) {
            $(multiselect_dropdownicon_storage).click();
            $(multiselect_selector_storage).css("display", "none");
        }
    });

    $(".multiselect-dropdown-icon").click(function () {
        multiselect_dropdown_data_id = $(this).prev().attr("data-id");
        multiselect_dropdown_data_id = (multiselect_dropdown_data_id - 100);
        multiselect_selector_storage = '.multiselect-dropdown-selector:eq(' + multiselect_dropdown_data_id + ')';
        $(this).prev().focus();
        multiselect_dropdownicon_storage = $(this).prev();
        $(multiselect_selector_storage).css("display", "block");
    });

    //Hover Done Through SCSS
    //$(".multiselect-dropdown-icon").hover(function () {
    //    $(this).prev().focus();
    //});

    $('body').on('mouseenter', '.multiselectdd-section', function () {
        multiselect_focus_enabled = 0;
    });

    $('body').on('mouseleave', '.multiselectdd-section', function () {
        $(multiselect_dropdownicon_storage).click();
        $(multiselect_dropdownicon_storage).blur();
        $(multiselect_selector_storage).css("display", "none");
        multiselect_focus_enabled = 1;
    });

    window.onresize = function () {
        var multiselect_form_control_width = $(".multiselect-form-group").width();
        multiselect_form_control_width = multiselect_form_control_width - 21;
        if (multiselect_form_control_width >= 1) {
            if (animation_enabled_multiselect == 999) {
                multiselect_form_control_width = multiselect_form_control_width + 20;
                $(".multiselect-form-control").css("width", multiselect_form_control_width);
            }
            else {
                $(".multiselect-form-control").css("width", multiselect_form_control_width);
            }
        }
    };

  
    $('body').on('click, mouseenter, mouseleave', '.right-sidebar-toggle, .container-fluid, .sidebar-minify-btn, .divider', function () {
        var multiselect_form_control_width = $(".multiselect-form-group").width();
        multiselect_form_control_width = multiselect_form_control_width - 21;
        if (multiselect_form_control_width >= 1) {
            if (animation_enabled_multiselect == 999) {
                multiselect_form_control_width = multiselect_form_control_width + 20;
                $(".multiselect-form-control").css("width", multiselect_form_control_width);
            }
            else {
                $(".multiselect-form-control").css("width", multiselect_form_control_width);
            }
        }
    });

    

    $.prototype.SearchMultiSelect.prototype._globalStyles[".multiselectdd-section__list-item_selected"]["background-color"] = "#555";
    $.prototype.SearchMultiSelect.prototype._globalStyles[".multiselectdd-section__list-item_selected:hover, .multiselectdd-section__list-item_selected.multiselectdd-section__list-item_hover"]["background-color"] = "#555";
    $.prototype.SearchMultiSelect.prototype._globalStyles[".multiselectdd-section__list-item:active, .multiselectdd-section__list-item_selected:active"]["background-color"] = "#555";
});
(function ($) {
        var getField_id = "";
        var SearchMultiSelect = function (arg) {
            getField_id = arg.field_id
			this.init(arg);
		};
		SearchMultiSelect.prototype = {
			"instances": [],
			"_coldInit": 0,		
			"get" : function(key,arg,e){
				var self = this;
				if (typeof key != "string") return;
				key = key.toLowerCase();
				if (typeof e == "undefined") e = true;
				var eTrigger = function(name){
					if (e){
						self.trigger("get", new $.Event(name));
					}
				};
				eTrigger("get:"+key);
				var aliases = {};
				var methodAliases = {};
				if ( typeof aliases[key] == "string" ) {
					key = aliases[key];
				}
				if ( typeof methodAliases[key] == "function" ) {
					key = methodAliases[key];
					if (typeof this[key] != "function"){
						return;
					}
					if (typeof arg == "undefined") arg = Object.create(null);
					return this[key](arg);
				}
				if ( typeof this._props[key] != "undefined" ) {
					return this._props[key];
				}
			},			
			"set" : function(key,value,arg,e){
				var self = this, tmp;
				if (typeof key == "undefined") return false;
				if ( typeof key == "object" ){
					var return_ = Object.create(null);
					for(var prop in key){
						if (!key.hasOwnProperty(prop)) continue;
						return_[prop] = this.set(prop, key[prop]);
					}
					return return_;
				}
				if (typeof key != "string") return false;
				key = key.toLowerCase();
				if (typeof e == "undefined") e = true;

				var eTrigger = function(name){
					if (e){
						var ev = new $.Event(name);
						ev.value = value;
						self.trigger("set", ev);
					}
				};
				eTrigger("set:"+key);
				var aliases = {};
				var methodAliases = {};
				if ( typeof aliases[key] == "string" ) {
					key = aliases[key];
				}
				eTrigger("beforeSet:"+key);
				if ( typeof methodAliases[key] == "string" ) {
					key = methodAliases[key];
					if (typeof this[key] != "function"){
						return false;
					}
					if (typeof arg == "undefined") arg = Object.create(null);
					tmp = this[key](value,arg);
					eTrigger("afterSet:"+key);
					return tmp;
				}
				this._props[key] = value;
				eTrigger("afterSet:"+key);
				return true;
			},
			"getInstances" : function(){
				return this.getInstances.apply(this, arguments);
			},
			"getInstances": function(arg){
				if (!arguments.length) return this.instances;
				if (typeof arg != "object") arg = Object.create(null);
				var name = (  $.inArray(typeof arg.name, ["string","number"]) > -1 ? arg.name : null );
				var tmp = [];
				for(var c=0; c<this.instances.length; c++){
					if (name !== null && this.instances[c].get("name") != name ){
						continue;
					}
					tmp.push(this.instances[c]);
				}
				return tmp;
			},
			"removeInstances": function(arg){
				if (typeof arg != "object"){
					return;
				}
				var name = typeof arg.name != "string" ? null : arg.name;
				var tmp = [];
				for(var c=0; c<this.instances.length; c++){
					if (  this.instances[c].get("name") == name  ){
						$(this.instances[c].get("dbox")).detach();
						continue;
					}
					tmp.push(this.instances[c]);
				}
				this.instances = tmp;
			},
			"_targetEvents": {
				"click": {"name": "click", "event": "click"},
				"keydown": {"name": "keydown", "event": "keydown", "dbox_input": true},
				"keyup": {"name": "keyup", "event": "keyup", "dbox_input": true},
				"hover": {"name": "hover", "event": "hover"},
				"focus": {"name": "focus", "event": "focus"},
				"focusout": {"name": "focusout", "event": "focusout"},
				"change": {"name": "change", "event": "change"}
			},
			"_eventCheckInputEmpty": function(e){
				if (
					this.fx.isTextInput(e.target)
					&& !e.target.value.trim()
				) {
					this.trigger("input:empty", e);
				}
			},		
			"_eventDefaultInputEmpty": function(){
				this.deselectAll();
			},
			"_eventDefaultSet": function(){
				this.trigger(arguments[1].type, arguments[1]);
			},
			"_eventDefaultGet": function(){
				this.trigger(arguments[1].type, arguments[1]);
			},
			"_eventSetList": function(){
				var e = arguments[1];
				this.set("list", e.value, null, false);
				this.reInitList();
			},
			"_eventWindowResize": function(){
				for(var c=0; c<this.instances.length; c++){
					if (  this.instances[c].isActive()  ){
						this.instances[c]._calcListContainerHeight();
						this.instances[c].calcPosition();
					}
				}
			},
			"_eventDefaultKeyUp": function(e){
				var self = this;
				var target = self.get("target");
				var dboxInput = self.get("dbox_input");
				var keyCode	= e.keyCode;
				var list = self.get("list");
				var dbox = self.get("dbox");
				var contextElement	= e.currentTarget;
				var serviceKeyCodes = [37,38,39,40,9,13,18,17,16,20,27];
				if (  self._isDBoxInput(e.target)  ){
					if (  self.fx.isTextInput(target)  ) {
						target.value = dboxInput.value;
					}
				} else if (contextElement == target) {
					if (  $.inArray(e.keyCode, serviceKeyCodes) == -1  ){
						dboxInput.value = target.value;
					}
				}
				clearTimeout(self._timers.autoComplete);
				self._timers.autoComplete = setTimeout(function(){
					var value, v;		
					if (  self.get("autoComplete")  ){
						if (  $.inArray(keyCode, serviceKeyCodes) > -1 ){
						} else {
							var li	= $(".multiselectdd-section__list-item", dbox);
							value	= contextElement.value.toLowerCase();
							value	= self.fx.msplit([';',','],value);
							value = value[value.length-1];
							for(v=0; v<li.length; v++){
								var multiselectddid = parseInt(li[v].getAttribute("data-multiselectddid"));
								var jqLi = $(li[v]);
        						if (  !value  ){
									jqLi.removeClass('multiselectdd-section__list-item_hidden');
								} else if (
									!self._optionFiltersMatcher(self.get("optionFilters"), value, list[multiselectddid].label)
								){
									jqLi.addClass('multiselectdd-section__list-item_hidden');
								} else {
									jqLi.removeClass('multiselectdd-section__list-item_hidden');
								}
								jqLi.removeClass('multiselectdd-section__list-item_hover');
							}
							if (  !self._isMobileState()  ){
								self.calcPosition();
							}
						}
					}
					if (  self.get("multiple")  ){
						if (  keyCode == 8  ){
							value = self.fx.trim(contextElement.value, " ;,", "both");
							value = self.fx.msplit([";",","],value);
							for(v=0; v<value.length; v++){
								value[v] = value[v].trim();
							}
							for(var prop in list){
								if (!list.hasOwnProperty(prop)) continue;
								list[prop].selected = ($.inArray(list[prop].label.trim(), value)> -1);
							}
							self.applySelectedToList();
							self.applySelectedToInput();
						}
					}
				},500);
			},
			"_eventDefaultKeyDownMultipleFalse": function(e){
				var self = this;
				var ul, li, c, L;
				var dbox = self.get("dbox");
				var target = self.get("target");
				if (  self.get("multiple")  ) return; 
				if (  $.inArray(e.keyCode, [37,39,9,18,17,16,20,27]) > -1  ){
				} else if ( e.keyCode == 13 ){
					if (  !self.isActive()  ){
						self.open();
						self._eventFocus.apply(target, [self, e]);
					} else {
						self.close();
					}
				} else if (  $.inArray(e.keyCode, [38,39,40]) > -1 ) {
					if (  !self.isActive()  ) return;
					ul = $("ul", dbox).get(0);
					li = $('li:not(.multiselectdd-section__list-item_hidden)', dbox);
					var selectedLi = -1;
					var jqli;
					for(c=0, L=li.length; c<L; c++){
						jqli = $(li[c]);
						if (  jqli.hasClass("multiselectdd-section__list-item_selected")  ){
							selectedLi = c;
							break;
						}
					}
					var newSelectedLi;
					if ( e.keyCode == 38 ){
						newSelectedLi = (  selectedLi - 1 < 0 ? 0 : selectedLi - 1  );
					} else if ( e.keyCode == 40 ){
						newSelectedLi = (  selectedLi + 1 > li.length - 1 ? li.length - 1 : selectedLi + 1  );
					} else if (e.keyCode == 39){
						return;
					} else {
						return;
					}
					var selectedKey = parseInt(li[newSelectedLi].getAttribute("data-multiselectddid"));
					self._selectByID(selectedKey);
					self._calcScrollBarPosition();
					self.trigger("select", e);
				} 
			},
			"_eventDefaultKeyDownMultipleTrue": function(e){
				var self = this, c, L;
				var dbox = self.get("dbox");
				var selectedKey;
				if (  self.get("multiple")  ){
					if (  $.inArray(e.keyCode, [37,39,9,18,17,16,20,27]) > -1  ){
					} else if (  e.keyCode == 13  ){
						var hoveredLi = $(".multiselectdd-section__list-item_hover",dbox);
						if (  !hoveredLi.length  ) return;
						hoveredLi = hoveredLi.get(0);
						var selectedKeys = self.getSelectedKeys();
						selectedKey = parseInt(hoveredLi.getAttribute('data-multiselectddid'));
						var tmp = $.inArray(selectedKey, selectedKeys);
						if (  tmp > -1  ){
							selectedKeys[tmp] = null;
						} else {
							selectedKeys.push(selectedKey);
						}
						self._selectByID(selectedKeys);
						self.trigger("select", e);
						return;
					}
					if (  $.inArray(e.keyCode, [38,40]) > -1  ) {
						var li = $('.multiselectdd-section__list-item:not(.multiselectdd-section__list-item_hidden)', dbox);
						hoveredLi = -1;
						var jqli;
						for(c=0, L=li.length; c<L; c++){
							jqli = $(li[c]);
							if (  jqli.hasClass("multiselectdd-section__list-item_hover")  ) {
								hoveredLi = c;
							}
						}
						var newHoveredLi;
						if (e.keyCode == 38) {
							newHoveredLi = (  hoveredLi - 1 < 0 ? 0 : hoveredLi - 1  );
						} else if (e.keyCode == 40) {
							newHoveredLi = (  hoveredLi + 1 > li.length - 1 ? li.length - 1 : hoveredLi + 1  );
						} else {
							return;
						}
						$(li[newHoveredLi]).addClass("multiselectdd-section__list-item_hover");
						if (hoveredLi > -1 && newHoveredLi != hoveredLi){
							$(li[hoveredLi]).removeClass("multiselectdd-section__list-item_hover");
						}
						self._calcScrollBarPosition();
					}
				}
			},
			"_eventFocus": function(context,e){
				var multiselectdd_value, c, v;
				var self		= this;
				var list		= self.get("list");
				var dbox	= self.get("dbox");
				self.open();
				var contextElement = e.currentTarget || (this instanceof Element ? this : null);
				if (  self.fx.isTextInput(contextElement)  ){
					multiselectdd_value = contextElement.getAttribute('data-multiselectdd-value');
					if ( multiselectdd_value ) multiselectdd_value = multiselectdd_value.trim();
					if (!multiselectdd_value){
						var value = self.fx.msplit([',',';'],self.fx.trim(contextElement.value,",; ","both"));
						for(c=0; c<value.length; c++){
							value[c] = value[c].trim();
							for(v=0; v<list.length; v++){
								if (list[v].label == value[c]){
									list[v].selected = true;
								}
							}
						}
					} else {
						multiselectdd_value = self.fx.msplit([',',';'],multiselectdd_value);
						for(c=0; c<multiselectdd_value.length; c++){
							multiselectdd_value[c] = multiselectdd_value[c].trim();
							for(v=0; v<list.length; v++){
								if ( list[v].value == multiselectdd_value[c] ){
									list[v].selected = true;
									break;
								}
							}
						}
					}
				}
				var dbox_li = $("li",dbox);
				if (dbox_li.length){
					dbox_li.removeClass('multiselectdd-section__list-item_hidden');
					for (v=0; v<dbox_li.length; v++){
						if (
							(
								typeof contextElement.type != "undefined"
								&& $.inArray(contextElement.type.toLowerCase(), ["submit","button"]) > -1
							)
							|| (  $.inArray(contextElement.tagName.toLowerCase(), ["submit","body","select"]) > -1 )
						){
						} else {
							$(dbox_li[v]).removeClass('multiselectdd-section__list-item_hover');
						}
					}
				}
				if (  !self.get("freeWrite")  ){
					self.applySelectedToInput();
				}
				self.applySelectedToList();
				self._calcScrollBarPosition();
				self._calcListContainerHeight();
			},
			"_initEvents": function(arg){
				var eventName;
				var body = $("body").get(0);
				var self = this;
				this.events = Object.create(null);
				var tmpEvents = {};
				for(eventName in arg){
					if (!arg.hasOwnProperty(eventName)) continue;
					if (typeof arg[eventName] != "function") continue;
					tmpEvents[eventName.replace(/^on/,'')] = arg[eventName];
				}
				for(eventName in arg.events){
					if (!arg.events.hasOwnProperty(eventName)) continue;
					if (typeof arg.events[eventName] != "function") continue;
					tmpEvents[eventName] = arg.events[eventName];
				}
				for(eventName in tmpEvents){
					if (!tmpEvents.hasOwnProperty(eventName)) continue;
					this.on(
						eventName,
						tmpEvents[eventName]
					);
				}
				this.on(
					"keyup",
					function(context, e){
						self._eventCheckInputEmpty(e);
					}
				);
				this.on(
					"change",
					function(context, e){
						self._eventCheckInputEmpty(e);
					}
				);
				this.on(
					"input:empty",
					self._eventDefaultInputEmpty
				);
				this.on("focus", self._eventFocus);
				this.on("click", self._eventFocus);
				//this.on("mouseleave", self._eventFocus);
				this.on(
					"focusout",
					function(context, e){
					
						if (  !e.relatedTarget  ) {
							self._timers.focusoutInputs = setTimeout(
								function(){
									self.close();
								},
								250
							);
							return;
						}

						if (  self._isDBoxInput(e.relatedTarget)  ){
							return;
						}

						if (
							self._isDBoxElement(e.relatedTarget)
							|| self._isTargetElement(e.relatedTarget)
						){
							return;
						}

						self.close();
					}
				);
				$(this.get("dbox_input")).bind("focus", function(){
					clearTimeout(self._timers.focusoutInputs);
				});
				this.on("set",this._eventDefaultSet);
				this.on("get", this._eventDefaultGet);
				this.on("afterSet:list", this._eventSetList);
				if (  self._isColdInit()  ){
					window.addEventListener("resize", self._eventWindowResize.bind(self), false);
				}
			},
			"_deactivateInstances": function(e){
				for(var c=0; c<this.instances.length; c++){
					if (
						this.instances[c]._isDBoxElement(e.target)
						|| this.instances[c]._isTargetElement(e.target)
					){
						continue;
					}
					if (  this.instances[c].isActive()  ) this.instances[c].close();
				}
			},
			"_initTarget": function(){
				var target = this.get("target");
				var c;
				if (
					target
					&& typeof target == "object"
				) {
					if (typeof target == "string") {
						target = $(target);
						this.set("target", (target.length ? target.get(0) : null));

					} else if (  target instanceof Element  ) {
						this.set("target", target);

					} else if (
						typeof target == "object"
						&& typeof target.push != "undefined"
						|| Array.isArray(target)
					) {
						for (c = 0; c < target.length; c++) {
							if (  target[c] instanceof Element  ){
								this.set("target", target[c]);
								break;
							}
						}
					}
				}
			},
			"trigger": function(eventName, e){
				if (typeof eventName != "string") return;
				eventName = eventName.toLowerCase();
				if (
					typeof this.events[eventName] == "object"
					&& Array.isArray(this.events[eventName])
				){
					if (
						!e
						|| (
							e instanceof (window.CustomEvent || new Function()) == false
							&& e instanceof (window.Event || new Function()) == false
							&& e instanceof $.Event == false
						)
					){
						e = $.Event(eventName);
					} else if (e instanceof $.Event == false) {
						e = $.Event(e);
					}
					var events = this.events[eventName];
					for(var c=0; c<events.length; c++){
						if (typeof events[c] != "function") continue;
						events[c].apply(this,[this, e]);
					}
				}
			},
			"on": function(eventName, fx){
				var self = this;
				var target = this.get("target");
				var dboxInput = this.get("dbox_input");
				if (
					typeof eventName != "string"
					|| typeof fx != "function"
				) {
					return false;
				}
				eventName = eventName.toLowerCase();
				if (
					typeof this.events[eventName] != "object"
					|| !Array.isArray(this.events[eventName])
				){
					this.events[eventName] = [];
					if (  this._targetEvents.hasOwnProperty(eventName)  ){
						$(target).bind(
							this._targetEvents[eventName].event,
							function(e){
								self.trigger(eventName, e);
							},
							null
						);
						if (  this._targetEvents[eventName].dbox_input  ){
							$(dboxInput).bind(
								this._targetEvents[eventName].event,
								function(e){
									self.trigger(eventName, e);
								},
								null
							);
						}
					}
				}
				this.events[eventName].push(fx);
				return true;
			},
			"_detectLanguage": function() {
				var lang = (navigator.languages || [])[0]
					|| navigator.language
					|| navigator.systemLanguage
					|| navigator.userLanguage
					|| navigator.browserLanguage
					|| "en-US";
				return lang.split(/[-_]/ig)[0];
			},
			_lastLang: "",
			"_texts": {
				".multiselectdd-section-fade__outside-click-label-text": {
					"en": "Tap to close"
				},
				".multiselectdd-section__search-input": {
					"en": "Search"
				}
			},
			getText: function(key, lang) {
				!lang && (lang = this.get("language") || this._detectLanguage());
				return (this._texts[key] || {})[lang] || "";
			},
			setText: function(text, key, lang) {
				var isProto = true;
				var proto = this instanceof SearchMultiSelect ? !(isProto = false) && Object.getPrototypeOf(this) : this;
				!proto._texts[key] && (proto._texts[key] = {});
				!lang && (lang = (!isProto && this.get("language")) || this._detectLanguage());
				proto._texts[key][lang] = text;
			},
			"_globalElems": {
				"fade": void 0
			},
			"_globalStyles": {
				".multiselectdd-section": {
					position: "absolute", display: "block", padding: '0px', height: "auto", "box-shadow": "0 0px 8px rgba(0, 0, 0, 0.24)", "background-color": "none", "border-radius": "3px", "margin-top":"-17px"
				},
				".multiselectdd-section:after": {
					position: "absolute", "border-left": "10px solid transparent", "border-right": "9px solid transparent", "border-bottom": "10px solid white", top: "-10px", left: "50%", "margin-left": "-10px"
				},
				".multiselectdd-section_bottom:after": {
					content:'\'\'', position: "absolute", "border-left": "10px solid transparent", "border-right": "9px solid transparent", "border-bottom": "none", "border-top": "10px solid white", top: "auto", bottom: "-10px", left: "50%", "margin-left": "-10px"
				},
				".multiselectdd-section__list-container": {
					position: "relative", margin: "0px", padding: "0px", "max-height": "215px", "overflow-x": "hidden"
				},
				".multiselectdd-section__list-item": {
					position: "relative", padding: "5px", "background-color": "none", color: "#bbb", display: "block", "line-height": "100%", cursor: "pointer", "font-size": "15px", "font-weight":"400"
				},
				".multiselectdd-section__list-item:hover, .multiselectdd-section__list-item_hover": {
				    "background-color": "#30373e"
				},
				".multiselectdd-section__list-item_selected": {
				    "background-color": "#30373e", color: "#fff"
				},
				".multiselectdd-section__list-item_selected:hover, .multiselectdd-section__list-item_selected.multiselectdd-section__list-item_hover": {
				    "background-color": "#30373e"
				},
				".multiselectdd-section__list-item:active, .multiselectdd-section__list-item_selected:active": {
				    "background-color": "#30373e", color: "#fff"
				},
				".multiselectdd-section__list-item_hidden": {
					display:"none"
				},
				".multiselectdd-section__search-input": {
					border: "1px solid #a2a2a2", width: "100%", "line-height": "100%", "font-size": "14px", "border-width": "0 0 2px 0", "padding": "8px", "box-sizing": "border-box"
				},
				".multiselectdd-section__search-input-container": {
					"margin-bottom": "12px", display: "none"
				},
				".multiselectdd-section__search-input-container_active": {
					display: "block"
				},
				".multiselectdd-section-fade": {
					display: "none", width: 0, height: 0, left: 0, top: 0
				},
				".multiselectdd-section-fade__outside-click-label": {
					position: "absolute", width: "100%", bottom: 0, "padding": "10px", background: "black", color: "white", "text-align": "center", "font-size": "1em", "box-sizing": "border-box"
				},
				".multiselectdd-section-fade__outside-click-label-text": {},
				".multiselectdd-section-fade__outside-click-label-icon": {
					position: "relative", "border-radius": "50%", "margin-right": "5px", border: "2px solid white", display: "inline-block", height: "16px", width: "16px", "vertical-align": "middle"
				},
				".multiselectdd-section-fade__outside-click-label-icon:after": {
					content:'\'\'', position: "absolute", top: "50%", left: "50%", height: "80%", width: "2px", transform: "rotate(45deg)", "margin-left": "-1px", "margin-top": "-40%", background: "white"
				},
				".multiselectdd-section-fade__outside-click-label-icon:before": {
					content:'\'\'', position: "absolute", top: "50%", left: "50%", height: "80%", width: "2px", transform: "rotate(-45deg)", "margin-left": "-1px", "margin-top": "-40%", background: "white"
				},
				"@media screen and (max-width: 640px)": {
					".multiselectdd-section": {
						position: "fixed", width: "80% !important", padding: "0 !important", left: "10% !important", top:"5% !important", "max-height": "90%", "box-shadow": "none", "border-radius": "0px", "box-sizing": "border-box"
					},
					".multiselectdd-section:after": {
						content: "none"
					},
					".multiselectdd-section__list-container": {
						"max-height": "none"
					},
					".multiselectdd-section__list-item": {
						padding: "1em", "font-size": "1em"
					},
					".multiselectdd-section__search-input-container": {
						"margin-bottom": "12px", display: "block"
					},
					".multiselectdd-section__search-input": {
						"line-height": "1em", "font-size": "1em", "padding": "1em"
					},
					".multiselectdd-section-fade": {
						width: "100%", height: "100%", position: "fixed", left: 0, top: 0, "background-color": "rgba(0, 0, 0, 0.33)", display: "block"
					}
				},
				"@media screen and (max-width: 740px)": {
					"@media screen and (min-resolution: 2dppx)": {
						
					}
				},
				".multiselectdd-section_hidden": {
					display: "none"
				}
			},
			"_initStyles": function(){
				if (  !$('#multiselectdd-section-style').length  ){
					this._buildStyles();
				}
			},
			"_buildStyles": function(){
				this._globalStyles["@media screen and (max-width: 740px)"]["@media screen and (min-resolution: 2dppx)"] = this._globalStyles["@media screen and (max-width: 640px)"];
				var body = $("body");
				var buildCSS= function(obj){
					var str = "";
					for(var styleSelector in obj){
						if (  !Object.prototype.hasOwnProperty.call(obj, styleSelector)  ) continue;
						if (  styleSelector.match(/^@media/)  ){
							str += styleSelector + " {" + buildCSS(obj[styleSelector]) + "} ";
							continue;
						}
						str += styleSelector + " {";
						for(var styleProp in obj[styleSelector]){
							if (  !Object.prototype.hasOwnProperty.call(obj[styleSelector], styleProp)  ) continue;
							str += styleProp + ":" + obj[styleSelector][styleProp] + ";";
						}
						str += "} ";
					}
					return str;
				};
				var css = buildCSS(this._globalStyles);
				var styleElem = $('#multiselectdd-section-style');
				if (  !styleElem.length  ){
					styleElem = $('<style />');
					styleElem.attr("id", "multiselectdd-section-style");
					body.append(styleElem);
				}
				styleElem.html(css);
			},
			"_initProps": function(arg){
				var c, v, prop, defaultProps = {};
				var allowedKeys = [
					{"key":"name", "type": "string"},
					{"key":"list", "type": "array"},
					{"key":"autoApply", "type":"any", "into": "boolean"},
					{"key":"autoPosition", "type":"any", "into":"boolean"},
					{"key":"autoComplete", "type":"any", "into":"boolean"},
					{"key":"target", "type":"object"},
					{"key":"multiple", "type":"any","into":"boolean"},
					{"key":"zIndex", "type":"numeric", "into":"integer"},
					{"key":"width","type":"any"},
					{"key":"embeddedInput", "type":"any", "into": "boolean"},
					{"key":"optionFilters", "type":"array"},
					{"key": "closeButton", "type": "boolean"},
					{"key": "language", "type": "string", "default": this._detectLanguage()},
					{"key":"freeWrite", "type":"any", "into": "boolean"}
				];
				for(c=0; c<allowedKeys.length; c++){
					allowedKeys[c].key = allowedKeys[c].key.toLowerCase();
					if (  "default" in allowedKeys[c]  ) {
						defaultProps[allowedKeys[c].key] = allowedKeys[c].default;
					}
				}
				this.set(defaultProps);
				if (typeof arg != "object") return;
				for(prop in arg){
					if (  !arg.hasOwnProperty(prop)  ) continue;
					var key = prop.toLowerCase();
					var option = null;
					for(v=0; v<allowedKeys.length; v++){
						if (  allowedKeys[v].key.toLowerCase() == key  ){
							option = allowedKeys[v];
							break;
						}
					}
					if (  option  ){
						if (  option.type == "any"  ){
						} else if (  option.type == "array"  ) {
							if (  !Array.isArray(arg[prop])  ){
								throw new Error("Argument data type mismatch (key: '" + prop + "')");
							}
						} else if (  option.type == "numeric"  ){
							if (  isNaN(arg[prop])  ){
								throw new Error("Argument data type mismatch (key: '" + prop + "')");
							}
						} else {
							if (  option.type != typeof arg[prop]  ) {
								throw new Error("Argument data type mismatch (key: '" + prop + "')");
							}
						}
						if (  option.hasOwnProperty("into")  ){
							if (  option.into == "boolean"  ){
								arg[prop] = Boolean(arg[prop])

							} else if (  option.into == "integer"  ) {
								arg[prop] = parseInt(arg[prop])

							} else if (  option.into == "float"  ) {
								arg[prop] = parseFloat(arg[prop])
							}
						}
						if (prop == "width"){
							arg[prop] = (
								typeof arg.width == "undefined"
									?  "min"
									: (
									$.inArray(arg.width, ["min","auto"]) > -1
										? arg.width
										: parseInt(arg.width)
								)
							)
						}
						this.set(key, arg[prop]);
					}
				}
			},
			"_initElements": function(){
				var body = $("body").get(0);
				var lang = this.get("language");
				
				var dbox = document.createElement('div');
				this.set("dbox", dbox);
				dbox.className = "multiselectdd-section multiselectdd-section_hidden multiselect-dropdown-selector";
				var inputgetField_id = getField_id + "search";
				var searchInputContainer = $(
					'<div class="multiselectdd-section__search-input-container">' +
					'<input class="multiselectdd-section__search-input" placeholder="' +
						this.getText(".multiselectdd-section__search-input") + '" type="text" id="' + inputgetField_id + '">' +
					'</div>'
				).get(0);
				this.set("dbox_input", $("input",searchInputContainer).get(0));
				dbox.appendChild(searchInputContainer);
				if (  Boolean(this.get("embeddedInput"))  ){
					searchInputContainer.className += " multiselectdd-section__search-input-container_active";
				}
				this.set("dbox", dbox);
				if (  this.get("zIndex")  ) dbox.style.zIndex = this.get("zIndex");
				dbox.appendChild($('<ul class="multiselectdd-section__list-container" id="' + getField_id + '"></ul>').get(0));
				var width = this.get("width");
				if (width == "auto"){
					dbox.style.width = this.get("target").clientWidth + "px";
				} else if (width == "min") {
				} else {
					dbox.style.width = width + "px";
				}
				body.appendChild(dbox);
			},
			"_initList": function(){
				var c, L;
				if (  !$.isArray(this.get("list"))  ) {
					this.set("list", [], null, false);
					return false;
				}
				var list = this.get("list");
				var dbox = this.get("dbox");
				var tmplist = [];
				for ( c= 0, L = list.length; c<L; c++ ){
					if (  $.inArray(typeof list[c], ["number","string"]) != -1  ){
						tmplist.push({
							"value": list[c].toString(),
							"label": list[c].toString(),
							"selected": false
						});
					} else if ( typeof list[c] == "object" ) {
						if (
							list[c].hasOwnProperty("value")
							&& list[c].hasOwnProperty("label")
						){
							if (  typeof list[c].selected == "undefined"  ){
								list[c].selected = false;
							} else {
								list[c].selected = Boolean(list[c].selected);
							}
							tmplist.push(list[c]);
						}
					}
				}
				list = tmplist;
				this.set("list", tmplist, null, false);
				var ul = $(".multiselectdd-section__list-container", dbox).get(0);
				ul.innerHTML = "";
				var self = this;
				for(var itemKey in list ){
					if (!list.hasOwnProperty(itemKey)) continue;
					var li = document.createElement("li");
					li.className = "multiselectdd-section__list-item";
					li.setAttribute('data-multiselectddid',itemKey);
					$(li).bind(
						"click",
						function(e){
							var selectedKeys = [];
							clearTimeout(self._timers.focusoutInputs);
							var multiselectddid = parseInt(this.getAttribute('data-multiselectddid'));
							if (  self.get("multiple")  ){
								list[multiselectddid].selected = (list[multiselectddid].selected == false);
								selectedKeys = self.getSelectedKeys();
							} else {
								selectedKeys = [multiselectddid];
							}
							self._selectByID(selectedKeys);
							self.trigger("select", e);
							self.calcPosition();
							if (!self.get("multiple")){
								self.close();
							}
						},
						null
					);
					$(li).bind("mouseleave",function(){
						var jqThis = $(this);
						if (  jqThis.hasClass("multiselectdd-section__list-item_hover")  ){
							jqThis.removeClass("multiselectdd-section__list-item_hover");
						}
					},null);
					li.innerHTML = list[itemKey].label;
					ul.appendChild(li);
				}
			},
			"init": function(arg){
				this._props = Object.create(null);
				var self = this;
				var body = $('body').get(0);
				this.events = Object.create(null);
				this._initProps(arg);
				this._initTarget();
				this._initElements();
				this._initEvents(arg);
				this._initList();
				this._initStyles();
				this._timers = Object.create(null);
				this._timers.autoComplete = null;
				this._timers.focusedInputs = null;
				this._timers.focusoutInputs = null;
				var target = this.get("target");
				var dbox = this.get("dbox");
				if (  self.get("name")  ){
					target.setAttribute("data-multiselectdd-name",self.get("name"));
					dbox.setAttribute("data-multiselectdd-name", self.get("name"));
				}
				self.on(
					"keydown",
					function(context, e){
						self._eventDefaultKeyDownMultipleFalse(e);
						self._eventDefaultKeyDownMultipleTrue(e);
					}
				);
				self.on(
					"keyup",
					function(context, e){
						self._eventDefaultKeyUp(e);
					}
				);
				if (  !self.get("optionFilters")  ){
					self.set(
						"optionFilters",
						[self.defaultOptionFilters.default]
					);
				}
				if (  self._isColdInit()  ){
					$(body).bind(
						"click",
						function(e){
							self._deactivateInstances(e);
						}, null
					);
				}
				this.instances.push(this);
			},
			_applyLang: function(lang) {
				if (this._lastLang == lang) return;
				Object.getPrototypeOf(this)._lastLang = lang;
				$(this._globalElems.fade)
					.find(".multiselectdd-section-fade__outside-click-label-text")
					.html(this.getText(".multiselectdd-section-fade__outside-click-label-text"));
			},
			"calcPosition" : function(){
				var self = this;
				var body = $("body").get(0);
				var target = this.get("target", null, null);
				var dbox = this.get("dbox", null, null);
				var jqDBox = $(dbox);
				var offset = $(target).offset();
				var thisWidth = target.clientWidth;
				var thisHeight = target.clientHeight;
				var dboxWidth = dbox.clientWidth;
				jqDBox.removeClass("multiselectdd-section_bottom");
				dbox.style.left = (offset.left + 14 +(thisWidth / 2) - ((dboxWidth + (self._globalStyles[".multiselectdd-section"].padding.replace(/[px]/gi,"") * 2)) / 2)) + "px";
				var scrollY = window.scrollY || body.scrollTop;
				if ( (dbox.clientHeight + offset.top + thisHeight + 12 - scrollY) > window.innerHeight){
					dbox.style.top = (offset.top - 12 - dbox.clientHeight) + "px";
					jqDBox.addClass("multiselectdd-section_bottom");
				} else {
					dbox.style.top = (offset.top + thisHeight + 12) + "px";
				}
			},
			"_calcScrollBarPosition": function(){
				var selectedLi;
				var dbox = this.get("dbox");
				var ul = $(".multiselectdd-section__list-container",dbox).get(0);
				if (  !this.get("multiple")  ){
					selectedLi = $(".multiselectdd-section__list-item_selected",dbox);
				} else {
					selectedLi = $(".multiselectdd-section__list-item_hover",dbox);
				}
				if (!selectedLi.length) return;
				var top = selectedLi.position().top + ul.scrollTop;
				if (  top < ul.clientHeight / 2  ) {
					ul.scrollTop = 0;
					return;
				}
				ul.scrollTop = top - ul.clientHeight / 2;
			},
			"_calcListContainerHeight": function(){
				var listContainer = $(this.get("dbox")).find(".multiselectdd-section__list-container").get(0);
				if (  this._isMobileState()  ){
					var vh = window.innerHeight / 100;
					listContainer.style.maxHeight = ((vh * 90) - 64 - 40) + "px";
					return;
				}
				if (  listContainer.style.maxHeight  ) listContainer.style.maxHeight = "";
			},
			"_isDBoxElement": function(element){
				var dbox = this.get("dbox", null, null);
				var each = $(dbox).find("*");
				if (each){
					each = Array.prototype.slice.call(each,0);
					each.push(dbox);
					for (var c=0; c<each.length; c++){
						if ( each[c] == element ) return true;
					}
				}
				return false;
			},
			"_isTargetElement": function(element){
				var target = this.get("target", null, null);
				var each = $(target).find("*");
				if (each){
					each = Array.prototype.slice.call(each,0);
					each.push(target);
					for(var c=0; c<each.length; c++){
						if (each[c] == element){
							return true;
						}
					}
				}
				return false;
			},
			"_isDBoxInput": function(elem){
				return this.get("dbox_input") === elem;
			},
			"_isMobileState": function(){
				return (
					window.innerWidth <= 640
					|| (
						window.innerWidth <= 740
						&& this.fx.isHDensScreen()
					)
				);
			},
			"_isBoxBottomState": function(){
				var dbox = this.get("dbox", null, null);
				return Boolean(dbox.className.match(new RegExp("multiselectdd-section_bottom")));
			},
			"_isColdInit": function(){
				return !this.instances.length;
			},
			"getSelectedKeys": function(){
				var keys = [];
				var list = this.get("list");
				for (var c=0; c<list.length; c++){
					if (
						typeof list[c]['selected'] != "undefined"
						&& list[c]['selected']
					){
						keys.push(c);
					}
				}
				return keys;
			},
			"getSelectedValues": function(){
				var values = [];
				var list = this.get("list");
				for (var c=0; c<list.length; c++){
					if (
						typeof list[c]['selected'] != "undefined"
						&& list[c]['selected']
					){
						values.push(list[c].value);
					}
				}
				return values;
			},
			"getSelectedLabels": function(){
				var labels = [];
				var list = this.get("list");
				for (var c=0; c<list.length; c++){
					if (
						typeof list[c]['selected'] != "undefined"
						&& list[c]['selected']
					){
						labels.push(list[c].label);
					}
				}
				return labels;
			},
			"hasValue": function(value){
				var list = this.get("list");
				for(var c=0; c<list.length; c++){
					if (  list[c].value === value  ) return true;
				}
				return false;
			},
			"hasLabel": function(label){
				var list = this.get("list");
				for(var c=0; c<list.length; c++){
					if (  list[c].label === label  ) return true;
				}
				return false;
			},
			"applySelectedToList" : function(){
				var dbox = this.get("dbox");
				var list = this.get("list");
				var li = $("li",dbox);
				li.removeClass("multiselectdd-section__list-item_selected");
				for(var c= 0, L=li.length; c<L; c++){
					var multiselectddid = li[c].getAttribute("data-multiselectddid");
					if (
						typeof list[multiselectddid] != "undefined"
						&& list[multiselectddid].selected
					){
						$(li[c]).addClass('multiselectdd-section__list-item_selected');
					}
				}
			},
			"applySelectedToInput" : function(){
				var self			= this;
				var listValue	= self.getSelectedValues();
				var listLabel	= self.getSelectedLabels();
				var target		= this.get("target");
				var dboxInput = this.get("dbox_input");
				dboxInput.value =  listLabel.join(";") + (!listLabel.length || !this.get("multiple") ? "" : ";");
				var tagName = target.tagName.toLowerCase();
				if ( tagName == "input" ){
					if (  self.fx.isTextInput(target)  ) target.value = dboxInput.value;
				} else if ( tagName == "textarea" ) {
					target.value = listLabel.join(";\n") + (!listLabel.length || !this.get("multiple") ? "" : ";\n");
				} else if ( tagName == "select" ) {
					for (var v=0; v<target.options.length; v++) {
						target.options[v].selected = $.inArray(target.options[v].value, listValue) > -1;
					}
				}
				target.setAttribute("data-multiselectdd-value", listValue.join(";") + (!listValue.length || !this.get("multiple") ? "" : ";"));
			},
			"select" : function(arg){
				if (typeof arg != "object" || $.isArray(arg)) return;
				var value, key, blank = true;
				if (typeof arg.blank != "undefined") blank = Boolean(arg.blank);
				if (arg.id){
					if (  !isNaN(arg.id) || $.isArray(arg.id)  ){
						this._selectByID(parseInt(arg.id));
						return;
					}
				}
				if (arg.value) {
					value = arg.value;
					key = "value";
				} else if (arg.label) {
					value = arg.label;
					key = "label";
				} else {
					return;
				}
				if (  $.inArray(typeof value, ["number", "string"]) > -1  ) {
					value = [value];
				} else if (
					typeof value == "object"
					&& $.isArray(value)
				) {

				} else {
					return null;
				}
				if (!this.get("multiple") && value.length > 1) return null;
				var list = this.get("list");
				for(var c=0, L=list.length; c<L; c++){
					if (  $.inArray(list[c][key], value) > -1  ){
						list[c].selected = true;
					} else if ( blank ) {
						list[c].selected = false;
					}
				}
				this.applySelectedToList();
				this.applySelectedToInput();
			},
			"_selectByID": function(arg){
				var c;
				if (  !isNaN(arg)  ){
					arg = [parseInt(arg)];
				} else if (  $.isArray(arg)  ) {
				} else {
					return;
				}
				var list = this.get("list");
				for(c=0; c<list.length; c++){
					list[c].selected = false;
				}
				for(c=0; c<arg.length; c++){
					if (isNaN(arg[c])) continue;
					if (  !list.hasOwnProperty(arg[c])  ) continue;
					list[arg[c]].selected = true;
				}
				if (arg.length) {
					this.applySelectedToInput();
					this.applySelectedToList();
				}
			},
			"_deselectByID": function(arg){
				var c;
				if (  !isNaN(arg)  ){
					arg = [parseInt(arg)];
				} else if (  $.isArray(arg)  ) {
				} else {
					return;
				}
				var list = this.get("list");
				for(c=0; c<arg.length; c++){
					if (isNaN(arg[c])) continue;
					if (  !list.hasOwnProperty(arg[c])  ) continue;
					list[arg[c]].selected = false;
				}
				if (arg.length) {
					this.applySelectedToInput();
					this.applySelectedToList();
				}
			},
			"_optionFiltersMatcher": function(filters, matcherStr, matchedStr){
				if (arguments.length < 3) return true;
				if (typeof filters == "function") filters = [filters];
				if (!$.isArray(filters)) return false;
				for(var c=0; c<filters.length; c++){
					if (  filters[c].apply(this, [matcherStr, matchedStr])  ){
						return true;
					}
				}
				return false;
			},
			"defaultOptionFilters": {
				"default": function(matcherStr, matchedStr){
					if (
						typeof matcherStr != "string"
						|| typeof matchedStr != "string"
					){
						return false;
					}
					var pattern = new RegExp(matcherStr.toLowerCase().trim());
					matchedStr = matchedStr.toString().toLowerCase();
					return Boolean(matchedStr.match(pattern));
				}
			},
			"_hideItems": function(){},
			"_unhideItems": function(){},
			"deselectAll" : function(){
				var list = this.get("list");
				for (var c = 0, L = list.length; c < L; c++) {
					list[c].selected = false;
				}
				this.applySelectedToList();
				this.applySelectedToInput();
			},
			"selectAll" : function(){
				var list = this.get("list");
				if (this.get("multiple")) {
					for (var c = 0, L = list.length; c < L; c++) {
						list[c].selected = true;
					}
					this.applySelectedToList();
					this.applySelectedToInput();
				} else {
					return null;
				}
			},
			"isActive": function(){
				var dbox = this.get("dbox", null, null);
				return $(dbox).hasClass("multiselectdd-section_hidden") == false
			},
			"close" : function(){
				var dbox = this.get("dbox", null, null);
				$(dbox).addClass("multiselectdd-section_hidden");
				this._closeFade();
			},
			"open" : function(){
				var dbox = this.get("dbox", null, null);
				$(dbox).removeClass("multiselectdd-section_hidden");
				this.calcPosition();
				this._openFade();
				this._applyLang(this.get("language", null, null));
				if (  this._isMobileState()  ) this.get("dbox_input").focus();
			},
			"_openFade": function(){
				$(this._globalElems.fade).removeClass("multiselectdd-section_hidden");
			},
			"_closeFade": function(){
				$(this._globalElems.fade).addClass("multiselectdd-section_hidden");
			},
			"fx" : {
				"isTextInput": function(elem){
					if (elem instanceof Node === false) return false;
					var tagName = elem.tagName.toLowerCase();
					if (  tagName == "input"  ){
						if (
							elem.type
							&& $.inArray(elem.type.toLowerCase(), ["text", "password", "email", "url", "search", "tel"]) > -1
						){
							return true;
						}
					} else if (  tagName == "textarea"  ) {
						return true;
					}
					return false;
				},
				"isHDensScreen": function () {
				   return (
						(
							window.matchMedia
							&& (
								window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches
								|| window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches
							)
						)
						|| (
							window.devicePixelRatio
							&& window.devicePixelRatio > 1.3
						)
					) || false
				},
				"isRetinaScreen": function () {
				    return (
						(
							window.matchMedia
							&& (
								window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches
								|| window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches
							)
						)
						|| (
							window.devicePixelRatio
							&& window.devicePixelRatio >= 2
						)
					) || false
				},
				"msplit" : function(d,s){
					s = s.replace(new RegExp('['+d.join('')+']','g'),d[0]);
					return s.split(d[0]);
				},
				"trim" : function(str,_chars,_mode){
					str = str.split('');
					if ( typeof _chars == "string" ){
						_chars = _chars.split('');
					} else if ( typeof _chars == "object" && typeof _chars.push != "undefined" ){
					} else {
						return str.join('');
					}
					if ( typeof _mode == "undefined" ) _mode = 'both';
					if ( _mode == 'both' ){
						for(;;){
							if ( !str.length || !($.inArray(str[0], _chars) != -1 || $.inArray(str[str.length-1], _chars) != -1) ) break;
							if ($.inArray(str[str.length-1], _chars) != -1 ) str.pop();
							if ($.inArray(str[0], _chars) != -1 ) str.shift();
						}
					}
					if ( _mode == 'left' ){
						for(;;){
							if ( !str.length || $.inArray(str[0], _chars) == -1 ) break;
							str.shift();
						}
					}
					if ( _mode == 'right' ){
						for(;;){
							if ( !str.length || $.inArray(str[str.length-1], _chars) == -1 ) break;
							str.pop();
						}
					}
					return str.join('');
				},
				"rest": function(arr, n){
					if (typeof arr != "object") return [];
					if (typeof n != "number") return [];
					return Array.prototype.slice.call(arr, n);
				}
			}
		};
		var methodsList = ["open","close","isActive","get","set","select","selectAll","deselectAll","on","trigger", "getSelectedLabels", "getSelectedValues", "getSelectedKeys", "getText", "setText"];
		$.fn.extend({
		    "SearchMultiSelect": function (arg) {
				if (!this.length) return;
				var instances =  SearchMultiSelect.prototype.getInstances();
				var instance = void 0;
				var input = this[0];
				for(var c=0; c<instances.length; c++){
					if (  instances[c].get("target") == input  ){
						instance = instances[c];
						break;
					}
				}
				if (!arguments.length) {
					return instance;
				} else if (typeof arg == "string"){
					if (  $.inArray(arg, methodsList) > -1  ){
						var rest = SearchMultiSelect.prototype.fx.rest(arguments,1);
						if (  typeof instance[arg] == "function"  ){
							return instance[arg].apply(instance, rest);
						}
					}
				} else if (typeof arg == "object") {					
					arg.target = this[0];
					return new SearchMultiSelect(arg);
				}
			}
		});
		$.prototype.SearchMultiSelect.prototype = SearchMultiSelect.prototype;
	})(jQuery);