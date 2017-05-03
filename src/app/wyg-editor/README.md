
# Angular WYSIWYG.JS Component
An angular wysiwyg editor component using [wysiwyg.js](http://wysiwygjs.github.io/). It also uses [prismjs](http://prismjs.com/) for code highligting.

## Prerequisites - dependencies
1. jquery (optionally required by wysiwygjs library)
2. fontawesome (required by wysiwygjs libary)
3. prismjs (code highlighter used by this component)

## Installation

```npm install --save ng-wysiwygjs```

## Setup

1. Add dependent libaries to .angular-cli.json file

    ```
        "styles": [
            "styles.css",
            "../node_modules/font-awesome/css/font-awesome.css",
            "../node_modules/prismjs/themes/prism-okaidia.css"
        ],
        "scripts": [
            "../node_modules/jquery/dist/jquery.min.js",
            "../node_modules/wysiwyg.js/src/wysiwyg.js",
            "../node_modules/wysiwyg.js/src/wysiwyg-editor.js",
            "../node_modules/prismjs/prism.js",
            "../node_modules/prismjs/components/prism-typescript.js",
            ...
        ],

    ```
2. (Optional) add programming languages of choice to be used for code highlighting. Full list is: 
    ```
     "scripts": [
            "../node_modules/prismjs/components/prism-typescript.js",
            "../node_modules/prismjs/components/prism-go.js",
            "../node_modules/prismjs/components/prism-markup.min.js",
            "../node_modules/prismjs/components/prism-css.min.js",
            "../node_modules/prismjs/components/prism-scss.min.js",
            "../node_modules/prismjs/components/prism-sass.min.js",
            "../node_modules/prismjs/components/prism-less.min.js",
            "../node_modules/prismjs/components/prism-typescript.min.js",
            "../node_modules/prismjs/components/prism-php.min.js",
            "../node_modules/prismjs/components/prism-go.min.js",
            "../node_modules/prismjs/components/prism-python.min.js",
            "../node_modules/prismjs/components/prism-ruby.min.js",
            "../node_modules/prismjs/components/prism-rust.min.js",
            "../node_modules/prismjs/components/prism-c.min.js",
            "../node_modules/prismjs/components/prism-java.min.js",        
            "../node_modules/prismjs/components/prism-lua.min.js",
            "../node_modules/prismjs/components/prism-dart.min.js",
            "../node_modules/prismjs/components/prism-swift.min.js",
            "../node_modules/prismjs/components/prism-scala.min.js",
            "../node_modules/prismjs/components/prism-sql.min.js",
            "../node_modules/prismjs/components/prism-json.min.js",
            "../node_modules/prismjs/components/prism-r.min.js",
            "../node_modules/prismjs/components/prism-sas.min.js",
            "../node_modules/prismjs/components/prism-matlab.min.js",
            "../node_modules/prismjs/components/prism-bash.min.js",
            "../node_modules/prismjs/components/prism-yaml.min.js",
            "../node_modules/prismjs/components/prism-nginx.min.js",
            "../node_modules/prismjs/components/prism-docker.min.js",
            "../node_modules/prismjs/components/prism-vim.min.js"
     ]
    ```
Note: This is just the most common programming languages supported by Prismjs personally selected by author.
## Usage
1. Import component module

    ```
        import { WygEditorModule } from 'wyg-editor/wyg-editor.module';
        ...

        @NgModule({
        ...
        imports: [
            ...
            WygEditorModule
        ],
        providers: [],
        bootstrap: [AppComponent]
        })
        export class AppModule { }
    ```     
2. Use `wyg-editor` in your component class
    - Component
        
        ```
            import { WygEditorComponent } from 'wyg-editor/wyg-editor.component';

            @Component({
            selector: 'app-demo',
            templateUrl: './demo.component.html',
            styleUrls: ['./demo.component.css']
            })
            export class DemoComponent implements OnInit {

            public testContent: string;

            constructor() { }

            ngOnInit() {
                this.testContent = "<p>Hello world!</p>";
            }

            }
        ```    
    - Template 
        ```
            <wygeditor [(ngModel)]="testContent" name="testContent"></wygeditor>
        ```
    
    - Full example
        ```
            <h1>ng-wysiwygjs & prismjs demo</h1>

            <div>
                <wygeditor [(ngModel)]="testContent" name="testContent"></wygeditor>
            </div>

            <!--<div>{{testContent}}</div>-->
            <h2>Note:</h2>
            <p>Press <strong>Ctl+Shift+h</strong> to highlight all code blocks</p>
            <h2>Output: </h2>
            <div [innerHTML]="testContent" ></div>
        ```
3. Using code highlighting
    - Click on `</>` icon of the toolbar to select programming language
    - Edit your code in pre-format code block 
    - Press `Ctrl+Shift+h` to highlight your code blocks 

## Customisation

- Changing format: you can change format of the editor by adding your .css file to .angular-cli.json 

## TODOs

- Testing
- Get focus back to editor after code highligting (this is a [current issue](https://github.com/angular/angular/issues/13818) of angular 4 with new `renderer2`)