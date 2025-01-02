import React, { useRef } from 'react'
import JoditEditor from "jodit-react"

const buttons = [
    "brush",
    "bold",
    "underline",
    "italic",
    "superscript",
    "subscript",
    "align",
    "ul",
    "ol",
    "font",
    "fontsize",
    "paragraph",
    "link",
    "hr",
]

const config = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    defaultTextAlignment: 'left',
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons: buttons,
    width: 'auto',
    height: 300,
    style: {
        color: 'var(--defaultWhiteColor)',
        textAlign: 'left',
        background: 'var(--darkGrey)'
    },
    placeholder: '',
    events: {
        beforePaste: (event) => {            
            const clipboardData = event.clipboardData || window.clipboardData;
            if (clipboardData) {
                let pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');

                // Replace background colors with transparent and black text with white
                pastedData = pastedData.replace(/background-color:[^;]+;/g, 'background-color:transparent;');
                pastedData = pastedData.replace(/color:\s*black;/g, 'color:#ffffff');

                return pastedData;
            }
        }
    }
}
const JoditEditorCommon = ({ value, onChange }) => {
    const editor = useRef()
    const handleBlur = (newContent) => {
        // Replace background colors with transparent and black text (rgb(0, 0, 0)) with white (#ffffff)
        const sanitizedContent = newContent
            .replace(/background-color:\s*[^;]+;/g, 'background-color:transparent;') // Replace any background color
            .replace(/color:\s*rgb\(0,\s*0,\s*0\);/g, 'color:#ffffff;'); // Replace black color in RGB format with white
    
        onChange(sanitizedContent);
    };
    
    return (
        <div>
            <JoditEditor ref={editor} value={value} config={config} style={{ textAlign: 'left' }} tabIndex={0}
              onChange={(newContent) => handleBlur(newContent)}
            />
        </div>
    )
}

export default JoditEditorCommon
