/**
 * WYGEditor component
 * Usage :
 * <wygeditor [(ngModel)]="data" debounce = "" [config]="{...}" name="wyg-editor1"  ></wygeditor>
 * Ref: based on ng2-CKEditor - https://github.com/chymz/ng2-ckeditor/blob/master/src/CKEditor.es6
 */
// Imports
import {
    Component,
    Input,
    Output,
    // ElementRef,
    ViewChild,
    EventEmitter,
    NgZone,
    Provider,
    forwardRef,
    AfterViewInit,
    HostListener,
    ViewEncapsulation
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// Prism code highlighter
import * as Prism from 'prismjs';
import 'prismjs/prism';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-typescript';

import 'prismjs/components/prism-php';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-dart';

import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-scala';

import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-sas';
import 'prismjs/components/prism-matlab';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-vim';

// Declare jQuery
declare var $: any;

@Component({
    selector: 'wygeditor',
    providers: [
        {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => WygEditorComponent),
        multi: true
        }
    ],

    template: `<textarea #host ></textarea>`,
    styleUrls: [
        './wyg-editor.component.css',
        './wysiwyg-editor.custom.css' 
    ]
    ,encapsulation: ViewEncapsulation.None
})
export class WygEditorComponent implements ControlValueAccessor, AfterViewInit {
    @Input() config: any;
    @Input() debounce: any;
    @Output() change = new EventEmitter();
    @ViewChild('host') host: any;
    // @ViewChild('host') el: ElementRef;

    @HostListener('document:keydown', ['$event'])
        handleKeyboardEvent(event: KeyboardEvent) { 
            // Ctl+Shift+h
            if(event.ctrlKey && event.shiftKey && event.keyCode ==72) {
                this.codeHighlight();
            }
    }

    _value: any = 'initiation';
    instance: any;
    debounceTimeout: any;
    zone: NgZone;
    initialValue: any = '<p>Type here...<p>' ;

    caretPos: number = 0;

    get value(): any { return this._value; };
    @Input('ngModel') set value(v) {
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }
    }

    /**
     * Constructor
     */
    constructor(
        // elementRef:ElementRef, 
        zone:NgZone) {
        this.zone = zone;
    }

     /**
   * On component destroy
   */
  ngOnDestroy() {
    if (this.instance) {
      this.instance = null;
    }
  }

  ngOnInit() {
      if(this._value == undefined || this._value =="") {
          this.initialValue = "<p></p></br>";
      } else {
        this.initialValue = this._value;
      }
  }

  /**
   * On component view init
   */
  ngAfterViewInit() {
    // Configuration
    var config = this.config || {};
    this.wygeditorInit(config);
  }

  /**
   * Value update process
   */
  updateValue(value: any) {
    this.zone.run(() => {
      this.value = value;
      this.onChange(value);
      this._onTouchedCallback();
      this.change.emit(value);
      
    });
  }

  // Ref. https://paulund.co.uk/re-run-prism-js-ajax-code
  codeHighlight() {
    Prism.highlightAll();
  }

    /**
     * WYGEditor init
     */
    wygeditorInit( config: any) {

        let ele = $(this.host.nativeElement);
        // Wysiwyg Editor Configuration in config variable
        var myconfig = {
            toolbar: 'bottom-selection',
                        buttons: {
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
                                image: '\uf030', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                
                                showselection: true     // wanted on selection
                            },
                            highlight: {
                                title: 'Background color',
                                image: '\uf043' // <img src="path/to/image.png" width="16" height="16" alt="" />
                            },

                            indent: {
                                title: 'Indent',
                                image: '\uf03c', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                
                                showselection: true    // wanted on selection
                            },
                            outdent: {
                                title: 'Outdent',
                                image: '\uf03b', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                
                                showselection: true    // wanted on selection
                            },
                            orderedList: {
                                title: 'Ordered list',
                                image: '\uf0cb', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                
                                showselection: true    // wanted on selection
                            },
                            unorderedList: {
                                title: 'Unordered list',
                                image: '\uf0ca', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                
                                showselection: true    // wanted on selection
                            },
                            // Header plugin
                            header: {
                                title: 'Header',
                                image: '\uf1dc', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                popup: function( $popup: any, $button: any ) {
                                    var list_headers = {
                                            // Name : Format
                                            'Header 1' : '<h1>',
                                            'Header 2' : '<h2>',
                                            'Header 3' : '<h3>',
                                            'Header 4' : '<h4>',
                                            'Header 5' : '<h5>',
                                            'Paragraph': '<p>',
                                            'Block quote': '<blockquote>',
                                        };
                                    var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                                        .attr('unselectable','on');
                                    $.each( list_headers, function( name: any, format: any ) {
                                        var $link = $('<a/>').attr('href','#')
                                                            .css( 'font-family', format )
                                                            .html( name )
                                                            .click(function(event: any) {
                                                                $(ele).wysiwyg('shell').format(format).closePopup();
                                                                // prevent link-href-#
                                                                event.stopPropagation();
                                                                event.preventDefault();
                                                                return false;
                                                            });
                                        $list.append( $link );
                                    });
                                    $popup.append( $list );
                                }
                            },

                            bold: {
                                title: 'Bold (Ctrl+B)',
                                image: '\uf032', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                hotkey: 'b'
                            },
                            italic: {
                                title: 'Italic (Ctrl+I)',
                                image: '\uf033', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                hotkey: 'i'
                            },
                            underline: {
                                title: 'Underline (Ctrl+U)',
                                image: '\uf0cd', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                hotkey: 'u'
                            },

                            // Fontname plugin
                            fontname: {
                                title: 'Font',
                                image: '\uf031', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                popup: function( $popup: any, $button: any ) {
                                        var list_fontnames = {
                                                // Name : Font                                                
                                                'Lato': 'Lato',
                                                'Josefin Slab': 'Josefin Slab',
                                                'Raleway': 'Raleway',
                                                'Roboto': 'Roboto',
                                                'Inconsolata': 'Inconsolata',
                                                'Montserrat': 'Montserrat',
                                                'Oswald': 'Oswald',
                                                'Calibri' : 'Calibri',
                                                'Din Webfont': 'DIN',
                                                'Merriweather': 'Merriweather'
                                            };
                                        var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                                            .attr('unselectable','on');
                                        $.each( list_fontnames, function( name: any, font: any ) {
                                            var $link = $('<a/>').attr('href','#')
                                                                .css( 'font-family', font )
                                                                .html( name )
                                                                .click(function(event: any) {
                                                                    $(ele).wysiwyg('shell').fontName(font).closePopup();
                                                                    // prevent link-href-#
                                                                    event.stopPropagation();
                                                                    event.preventDefault();
                                                                    return false;
                                                                });
                                            $list.append( $link );
                                        });
                                        $popup.append( $list );
                                    },
                                
                                showselection: true    // wanted on selection
                            },
                            // Code highlighter
                            Code: {
                                title: 'Code',
                                image: '\uf121', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                popup: function( $popup: any, $button: any ) {
                                    var list_headers = {
                                        'HTML/XML': 'markup',
                                        'CSS': 'css',
                                        'SCSS': 'scss',
                                        'SASS': 'sass',
                                        'LESS': 'less',
                                        'JavaScript': 'javascript',
                                        'TypeScript': 'typescript',
                                        'Go': 'go',
                                        'PHP': 'php',
                                        'Python': 'python',
                                        'C': 'c',
                                        'Java': 'java',
                                        'Ruby': 'ruby',
                                        'Rust': 'rust',
                                        'Lua': 'lua',
                                        'Dart': 'dart',
                                        'Swift': 'swift',
                                        'Scala': 'scala',
                                        'SQL': 'sql',
                                        'JSON': 'json',
                                        'R': 'r',
                                        'SAS': 'sas',
                                        'MatLab': 'matlab',
                                        'Bash': 'bash',
                                        'Vim': 'vim',
                                        'YAML': 'yaml',
                                        'Nginx': 'nginx',
                                        'Docker': 'docker'
                                    };
                                    
                                    var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                                        .attr('unselectable','on');
                                    $.each( list_headers, function( name: any, language: any ) {
                                        var $link = $('<a/>').attr('href','#')
                                                            .html( name )
                                                            .click(function(event: any) {
                                                                 $(ele).wysiwyg('shell').insertHTML("<pre class='language-"+language+"'><code class='language-"+language+"'></br></code></pre>").closePopup();
                                                                event.stopPropagation();
                                                                event.preventDefault();
                                                                return false;
                                                            });
                                        $list.append( $link );
                                    });
                                    $popup.append( $list );
                                }
                            }
                        }
        };

        // Create a wysiwyg instance
        this.instance = $(this.host.nativeElement).wysiwyg(myconfig);

        // Set initial value
        $(ele).wysiwyg('shell').insertHTML(this.initialValue);

        // // WygEditor change event
        this.instance.on('change', () => {
            this._onTouchedCallback();
            let value = this.instance.val();

            // Debounce update
            if (this.debounce) {
                if(this.debounceTimeout) clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                this.updateValue(value);
                this.debounceTimeout = null;
                }, parseInt(this.debounce));

            // Live update
            } else {
                this.updateValue(value);
            }
        });
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value: any) {
        this._value = value;
        if( this.instance )
            this.instance.val(value);
    }

    onChange(_: any) {
        // TODO
    }
    onTouched() {
        // TODO
    }
    registerOnChange(fn: any) {this.onChange = fn;}
    registerOnTouched(fn: any) {this.onTouched = fn;}
    _onChangeCallback(_: any) {
        // TODO
    }
    _onTouchedCallback() {
        // TODO
    }

}
