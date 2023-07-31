import { useState, useEffect } from "react";
import { EditorState, Editor, RichUtils, convertToRaw, convertFromRaw } from "draft-js";

interface TextEditorProps {
    text: string,
    setText: Function
}

const customStyleMap = {
    STRIKE: {
        textDecoration: "line-through"
    },
    HEADER_20: {
        fontSize: "20px"
    },
    HEADER_24: {
        fontSize: "24px"
    },
    HEADER_28: {
        fontSize: "28px"
    },
    HEADER_32: {
        fontSize: "32px"
    },
    PARAGRAPH_12: {
        fontSize: "12px"
    },
    PARAGRAPH_16: {
        fontSize: "16px"
    }
}

function TextEditor(props: TextEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createWithContent(convertFromRaw(JSON.parse(props.text))));
    const [fontSize, setFontSize] = useState<Number>(12);

    useEffect(() => {
        props.setText(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    }, [editorState])

    const handleKeyCommand = (command: Draft.DraftModel.Constants.DraftEditorCommand, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState) {
            setEditorState(newState);
            return "handled";
        }else return "not-handled";
    }

    const setBold = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    }
    
    const setItalic = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }

    const setUnderline = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }

    const setStrike = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKE'));
    }

    const setFont = (fontSize: number) => {
        let type = `HEADER_${fontSize}`;
        if(fontSize < 20) type = `PARAGRAPH_${fontSize}`;
        setFontSize(fontSize);
        setEditorState(RichUtils.toggleInlineStyle(editorState, type));
    }

    return (
        <div className={`text-[${fontSize}px] text-slate-50 bg-midnight p-4 rounded`}>
            <header className="flex border-b-2 border-darkocean p-1 mb-4 gap-2 text-sm">
                <button onClick={() => setBold()} className="font-bold p-1">B</button>
                <button onClick={() => setItalic()} className="italic p-1">I</button>
                <button onClick={() => setUnderline()} className="underline p-1">U</button>
                <button onClick={() => setStrike()} className="line-through p-1">S</button>
                <div className="group">
                    <input 
                    type="text" className="w-9 p-2 outline-none rounded bg-midnight cursor-pointer" 
                    placeholder="Year" readOnly value={fontSize + ""}/>
                    <div className="bg-darkocean shadow-lg shadow-slate-90 absolute hidden group-hover:flex flex-col gap-2 overflow-y-auto p-2 border-t-[6px] border-midnight rounded">
                        {[12, 16, 20, 24, 28, 32].map((font: number) => (
                            <h2 className="hover:text-slate-50 cursor-pointer transition-all" key={font} onClick={() => setFont(font)}>{font}</h2>
                        ))}
                    </div>
                </div>
            </header>
            <Editor 
            editorState={editorState} 
            onChange={setEditorState} 
            handleKeyCommand={handleKeyCommand} customStyleMap={customStyleMap}/>
        </div>
    )
}

export default TextEditor;