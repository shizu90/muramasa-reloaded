import { useState, useEffect } from "react";
import { EditorState, Editor, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import Dropdown from "./Dropdown";

interface TextEditorProps {
    text: string,
    setText: Function,
    maxLen: number
}

const customStyleMap = {
    STRIKE: {
        textDecoration: "line-through"
    }
}

function TextEditor(props: TextEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createWithContent(convertFromRaw(JSON.parse(props.text))));
    const [fontSize, setFontSize] = useState<Number>(12);

    useEffect(() => {
        props.setText(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    }, [editorState])

    const getLength = () => {
        const currentSelection = editorState.getSelection();
        const isCollapsed = currentSelection.isCollapsed();

        let length = 0;

        if (!isCollapsed) {
        const currentContent = editorState.getCurrentContent();
        const startKey = currentSelection.getStartKey();
        const endKey = currentSelection.getEndKey();
        const startBlock = currentContent.getBlockForKey(startKey);
        const isStartAndEndBlockAreTheSame = startKey === endKey;
        const startBlockTextLength = startBlock.getLength();
        const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
        const endSelectedTextLength = currentSelection.getEndOffset();
        const keyAfterEnd = currentContent.getKeyAfter(endKey);

        if (isStartAndEndBlockAreTheSame) {
            length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
        } else {
            let currentKey = startKey;

            while (currentKey && currentKey !== keyAfterEnd) {
            if (currentKey === startKey) {
                length += startSelectedTextLength + 1;
            } else if (currentKey === endKey) {
                length += endSelectedTextLength;
            } else {
                length += currentContent.getBlockForKey(currentKey).getLength() + 1;
            }

            currentKey = currentContent.getKeyAfter(currentKey);
            };
        }
        }

        return length;
    }

    const handleBeforeInput = () => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = getLength();

        if(currentContentLength - selectedTextLength > props.maxLen - 1) {
            return 'handled';
        }
    }

    const handlePastedInput = (pastedText: string) => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = getLength();

        if(currentContentLength + pastedText.length - selectedTextLength > props.maxLen) {
            return 'handled';
        }
    }


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
        setFontSize(fontSize);
        switch(fontSize) {
            case 12:
                setEditorState(RichUtils.toggleBlockType(editorState, "header-six"));
                break;
            case 16:
                setEditorState(RichUtils.toggleBlockType(editorState, "header-five"));
                break;
            case 20:
                setEditorState(RichUtils.toggleBlockType(editorState, "header-four"));
                break;
            case 24:
                setEditorState(RichUtils.toggleBlockType(editorState, "header-three"));
                break;
            case 28:
                setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
                break;
            case 32:
                setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
                break;
            default:
                break;
        }
    }

    return (
        <div className={`text-[${fontSize}px] text-slate-50 bg-midnight p-4 rounded`}>
            <header className="flex border-b-2 border-darkocean p-1 mb-4 gap-2 text-sm">
                <button onClick={() => setBold()} className="font-bold p-1">B</button>
                <button onClick={() => setItalic()} className="italic p-1">I</button>
                <button onClick={() => setUnderline()} className="underline p-1">U</button>
                <button onClick={() => setStrike()} className="line-through p-1">S</button>
                <Dropdown options={[12, 16, 20, 24, 28, 32]} control={{controlState: fontSize, setControlState: setFont}} placeholder="Font"/>
            </header>
            <Editor 
                editorState={editorState} 
                onChange={setEditorState} 
                customStyleMap={customStyleMap} 
                handleBeforeInput={handleBeforeInput}
                handlePastedText={handlePastedInput}
            />
        </div>
    )
}

export default TextEditor;