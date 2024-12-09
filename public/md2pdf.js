class MarkdownParser {
    constructor() {
        this.rules = {

            h1: { pattern: /^# (.+)$/gm, replacement: '<h1>$1</h1>' },
            h2: { pattern: /^## (.+)$/gm, replacement: '<h2>$1</h2>' },
            h3: { pattern: /^### (.+)$/gm, replacement: '<h3>$1</h3>' },


            bold: { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
            italic: { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },


            unorderedList: {
                pattern: /^\* (.+)$/gm,
                replacement: '<li>$1</li>',
                surroundPattern: /(<li>.*<\/li>)/s,
                surroundReplacement: '<ul>$1</ul>'
            },


            codeBlock: {
                pattern: /```([\s\S]*?)```/g,
                replacement: '<pre><code>$1</code></pre>'
            },
            inlineCode: { pattern: /`(.+?)`/g, replacement: '<code>$1</code>' },


            links: { pattern: /\[(.+?)\]\((.+?)\)/g, replacement: '<a href="$2">$1</a>' },


            paragraphs: {
                pattern: /^(?!<[a-z][A-z0-9]*|$)(.+)$/gm,
                replacement: '<p>$1</p>'
            }
        };
    }

    parse(markdown) {
        let html = markdown;

        // Apply each rule
        for (const rule of Object.values(this.rules)) {
            html = html.replace(rule.pattern, rule.replacement);

            //handles newline and that typeof stuff
            if (rule.surroundPattern && rule.surroundReplacement) {
                const matches = html.match(rule.surroundPattern);
                if (matches) {
                    html = html.replace(matches[0], rule.surroundReplacement);
                }
            }
        }

        return html;
    }
}

class PDFGenerator {
    constructor() {
        this.content = '';
    }

    createPDF(htmlContent, filename = 'document.pdf') {
        //
        const printArea = document.createElement('div');
        printArea.innerHTML = htmlContent;
        // formmatting f the document
        printArea.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: 8.5in;
            padding: 0.5in;
            font-family: Arial, sans-serif;
            background: white;
            z-index: -1;
        `;

        //CSS
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @media print {
                body * { visibility: hidden; }
                #printArea, #printArea * { visibility: visible; }
                
            }
        `;

        // A
        printArea.id = 'printArea';
        document.body.appendChild(printArea);
        document.head.appendChild(styleSheet);

        // Show the Print popoup, TEMPORARY, NEEDS TO BE REMOVED FOR MULTIPLE PAGES
        window.print();

        //Clears out the HTML doc, NOt nessasary but nice
        setTimeout(() => {
            document.body.removeChild(printArea);
            document.head.removeChild(styleSheet);
        }, 100);
    }
}


const markdown = `
# Sample Document
## Introduction
This is a **sample** markdown document with *italic* text.

### Code Example
\`\`\`
function hello() {
    console.log('Hello World');
}
\`\`\`

Here's a list:
* First item
* Second item
* Third item

You can add [links](https://example.com) too.
`;

const serializedData = sessionStorage.getItem('notes');

md= JSON.parse(serializedData);
console.log(md[0].md);
FINALLY = ''
for (let i = 0; i < md.length; i++) {
    FINALLY += md[i].md + '\n\n';
}

const parser = new MarkdownParser();
const pdfGenerator = new PDFGenerator();

const htmlContent = parser.parse(FINALLY);

pdfGenerator.createPDF(htmlContent, 'FUCKME.pdf'); // I have no clue why the file name is not showing

/* TODO:
    Figure out how to make multiple pages in single pdf
*/