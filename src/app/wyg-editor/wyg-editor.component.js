"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * WYGEditor component
 * Usage :
 * <wygeditor [(ngModel)]="data" debounce = "" [config]="{...}" name="wyg-editor1"  ></wygeditor>
 * Ref: based on ng2-CKEditor - https://github.com/chymz/ng2-ckeditor/blob/master/src/CKEditor.es6
 */
// Imports
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// declare var $: Function;
// declare var $:JQueryStatic;
/**
 * WYGEditor component
 * Usage :
 * <wygeditor [(ngModel)]="data" [config]="{...}" debounce="500"></wygeditor>
 */
var WygEditorComponent = WygEditorComponent_1 = (function () {
    /**
     * Constructor
     */
    function WygEditorComponent(elementRef, zone) {
        // @Input() model: any;    
        this.change = new core_1.EventEmitter();
        this._value = 'initiation';
        this.initialValue = 'Hello World';
        this.zone = zone;
        // console.log('This is constructor _value: '+ this._value);
        // console.log('This is constructor value: '+this.value);
    }
    Object.defineProperty(WygEditorComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
  * On component destroy
  */
    WygEditorComponent.prototype.ngOnDestroy = function () {
        if (this.instance) {
            this.instance = null;
        }
    };
    WygEditorComponent.prototype.ngOnInit = function () {
        //   console.log('This is ngOnInit _value: '+ this._value);
        //   console.log('This is ngOnInit value: '+this.value);
        this.initialValue = this._value;
    };
    /**
     * On component view init
     */
    WygEditorComponent.prototype.ngAfterViewInit = function () {
        // console.log('This is ngAfterViewInit _value: '+this._value);
        // console.log('This is ngAfterViewInit value: '+this.value);
        // console.log('This is ngAfterViewInit initialValue: '+this.initialValue);
        // Configuration
        var config = this.config || {};
        this.wygeditorInit(config);
    };
    /**
     * Value update process
     */
    WygEditorComponent.prototype.updateValue = function (value) {
        var _this = this;
        this.zone.run(function () {
            _this.value = value;
            _this.onChange(value);
            _this._onTouchedCallback();
            _this.change.emit(value);
        });
    };
    /**
     * WYGEditor init
     */
    WygEditorComponent.prototype.wygeditorInit = function (config) {
        var _this = this;
        var ele = $(this.host.nativeElement);
        // Wysiwyg Editor Configuration in config variable
        var myconfig = {
            toolbar: 'bottom-selection',
            buttons: {
                // // Dummy-Button-Plugin
                // dummybutton1:  {
                //     title: 'Save',
                //     image: '\uf0c7',
                //     click: function( $button ) {
                //         // document.osceForm.submit(); 
                //         console.log($(ele).val());
                //         },
                //     //showstatic: true,    // wanted on the toolbar
                //     showselection: false    // wanted on selection
                // },
                // // Dummy-Button-Plugin
                // dummybutton2:  {
                //     title: 'Exit',
                //     image: '\uf08b',
                //     click: function( $button ) {
                //         window.location.href='index.php';
                //         },
                //     //showstatic: true,    // wanted on the toolbar
                //     showselection: false    // wanted on selection
                // },
                removeformat: {
                    title: 'Remove format',
                    image: '\uf12d' // <img src="path/to/image.png" width="16" height="16" alt="" />
                },
                insertlink: {
                    title: 'Insert link',
                    image: '\uf08e' // <img src="path/to/image.png" width="16" height="16" alt="" />
                },
                insertimage: {
                    title: 'Insert image',
                    image: '\uf030',
                    //showstatic: true,    // wanted on the toolbar
                    showselection: true // wanted on selection
                },
                highlight: {
                    title: 'Background color',
                    image: '\uf043' // <img src="path/to/image.png" width="16" height="16" alt="" />
                },
                indent: {
                    title: 'Indent',
                    image: '\uf03c',
                    //showstatic: true,    // wanted on the toolbar
                    showselection: true // wanted on selection
                },
                outdent: {
                    title: 'Outdent',
                    image: '\uf03b',
                    //showstatic: true,    // wanted on the toolbar
                    showselection: true // wanted on selection
                },
                orderedList: {
                    title: 'Ordered list',
                    image: '\uf0cb',
                    //showstatic: true,    // wanted on the toolbar
                    showselection: true // wanted on selection
                },
                unorderedList: {
                    title: 'Unordered list',
                    image: '\uf0ca',
                    //showstatic: true,    // wanted on the toolbar
                    showselection: true // wanted on selection
                },
                // Header plugin
                header: {
                    title: 'Header',
                    image: '\uf1dc',
                    popup: function ($popup, $button) {
                        var list_headers = {
                            // Name : Font
                            // 'Header 1' : '<h1>',
                            // 'Header 2' : '<h2>',
                            // 'Header 3' : '<h3>',
                            'Header 4': '<h4>',
                            'Header 5': '<h5>',
                            // 'Rx' : '<h6>',
                            'Paragraph': '<p>',
                            'Code': '<pre>',
                            'PrismJs': '<markdown-to-html>'
                        };
                        var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                            .attr('unselectable', 'on');
                        $.each(list_headers, function (name, format) {
                            var $link = $('<a/>').attr('href', '#')
                                .css('font-family', format)
                                .html(name)
                                .click(function (event) {
                                $(ele).wysiwyg('shell').format(format).closePopup();
                                // prevent link-href-#
                                event.stopPropagation();
                                event.preventDefault();
                                return false;
                            });
                            $list.append($link);
                        });
                        $popup.append($list);
                    }
                },
                bold: {
                    title: 'Bold (Ctrl+B)',
                    image: '\uf032',
                    hotkey: 'b'
                },
                italic: {
                    title: 'Italic (Ctrl+I)',
                    image: '\uf033',
                    hotkey: 'i'
                },
                underline: {
                    title: 'Underline (Ctrl+U)',
                    image: '\uf0cd',
                    hotkey: 'u'
                },
                // Fontname plugin
                fontname: {
                    title: 'Font',
                    image: '\uf031',
                    popup: function ($popup, $button) {
                        var list_fontnames = {
                            // Name : Font
                            'Special Elite': 'Special Elite',
                            'Calibri': 'Calibri',
                            'Oswald': 'Oswald',
                            'Arial, Helvetica': 'Arial,Helvetica',
                            'Verdana': 'Verdana,Geneva',
                            'Georgia': 'Georgia',
                            'Courier New': 'Courier New,Courier',
                            'Times New Roman': 'Times New Roman,Times'
                        };
                        var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                            .attr('unselectable', 'on');
                        $.each(list_fontnames, function (name, font) {
                            var $link = $('<a/>').attr('href', '#')
                                .css('font-family', font)
                                .html(name)
                                .click(function (event) {
                                $(ele).wysiwyg('shell').fontName(font).closePopup();
                                // prevent link-href-#
                                event.stopPropagation();
                                event.preventDefault();
                                return false;
                            });
                            $list.append($link);
                        });
                        $popup.append($list);
                    },
                    //showstatic: true,    // wanted on the toolbar
                    showselection: true // wanted on selection
                },
                // Dummy-Button-Plugin
                dummybutton3: {
                    title: 'Pdf print',
                    image: '\uf02f',
                    click: function ($button) {
                        //window.location.href="/bsnote/show_print.php?id=<? echo $id;?>";
                        // window.open('pdfprint.php?id=<? echo $id;?>', '_blank');
                    },
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false // wanted on selection
                },
                dummybutton4: {
                    title: 'Typescript',
                    image: '\uf1dd',
                    click: function ($button) {
                        $(ele).wysiwyg('shell').insertHTML('<markdown-to-html>...</markdown-to-html>');
                        //window.location.href="/bsnote/show_print.php?id=<? echo $id;?>";
                        // window.open('pdfprint.php?id=<? echo $id;?>', '_blank');
                    },
                    //showstatic: true,    // wanted on the toolbar
                    showselection: false // wanted on selection
                }
            },
            // Submit-Button
            submit: {
                title: 'Submit',
                image: '\uf00c' // <img src="path/to/image.png" width="16" height="16" alt="" />
            }
        };
        // Create a wysiwyg instance
        this.instance = $(this.host.nativeElement).wysiwyg(myconfig);
        // Set initial value
        $(ele).wysiwyg('shell').insertHTML(this.initialValue);
        // // WygEditor change event
        this.instance.on('change', function () {
            _this._onTouchedCallback();
            var value = _this.instance.val();
            // Debounce update
            if (_this.debounce) {
                if (_this.debounceTimeout)
                    clearTimeout(_this.debounceTimeout);
                _this.debounceTimeout = setTimeout(function () {
                    _this.updateValue(value);
                    _this.debounceTimeout = null;
                }, parseInt(_this.debounce));
            }
            else {
                _this.updateValue(value);
            }
        });
    };
    /**
     * Implements ControlValueAccessor
     */
    WygEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
        if (this.instance)
            this.instance.val(value);
    };
    WygEditorComponent.prototype.onChange = function (_) {
        // TODO
    };
    WygEditorComponent.prototype.onTouched = function () {
        // TODO
    };
    WygEditorComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    WygEditorComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    WygEditorComponent.prototype._onChangeCallback = function (_) {
        // TODO
    };
    WygEditorComponent.prototype._onTouchedCallback = function () {
        // TODO
    };
    return WygEditorComponent;
}());
__decorate([
    core_1.Input()
], WygEditorComponent.prototype, "config");
__decorate([
    core_1.Input()
], WygEditorComponent.prototype, "debounce");
__decorate([
    core_1.Output()
], WygEditorComponent.prototype, "change");
__decorate([
    core_1.ViewChild('host')
], WygEditorComponent.prototype, "host");
__decorate([
    core_1.Input('ngModel')
], WygEditorComponent.prototype, "value");
WygEditorComponent = WygEditorComponent_1 = __decorate([
    core_1.Component({
        selector: 'wygeditor',
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return WygEditorComponent_1; }),
                multi: true
            }
        ],
        // template: `<textarea #host [(ngModel)]="value" (change)="onChange($event)"></textarea>`
        // template: `<textarea #host > {{storedValue}} </textarea>`
        template: "<textarea #host ></textarea>"
    })
], WygEditorComponent);
exports.WygEditorComponent = WygEditorComponent;
var WygEditorComponent_1;
