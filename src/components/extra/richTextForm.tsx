import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import {
    FontSize,
    MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonHighlightColor,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonTextColor,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontSize,
  MenuButtonAlignLeft, 
  MenuButtonAlignCenter, 
  MenuButtonAlignRight,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
  MenuButtonUnderline,
} from "mui-tiptap";
import {useRef, useState } from "react";
import { FormControl, FormLabel, SxProps, TextField } from "@mui/material"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"
import { generateHTML, JSONContent } from '@tiptap/core';

interface propsType{
    sx?:SxProps,
    name:string,
    value?:string,
}
const extensions = [StarterKit,TextStyle,FontSize,Color,Highlight.configure({
    multicolor: true,
  }),
    TextAlign.configure({
        types: ["heading", "paragraph"],
      }),Underline]

export const getHtml = (jsonString:JSONContent)=>{
    const result = generateHTML(jsonString, extensions)
    return result
}

export function RichTextForm(props:propsType) {
    const rteRef = useRef<RichTextEditorRef>(null);
    const [value,setValue] = useState(props.value?JSON.stringify(props.value):"")
    return(
        <>
        <div onChange={()=>console.log("adada")}>
        <FormControl>
              <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
              <TextField
                sx={{width:"0",height:"0",opacity:"0",display:"none"}}
                value={value}
                id={props.name}
                type="text"
                name={props.name}
                variant="outlined"
                />
        </FormControl>
            <RichTextEditor
                onUpdate={(e)=>setValue(JSON.stringify(e.editor.getJSON()))}
                ref={rteRef}
                extensions={extensions} // Or any Tiptap extensions you wish!
                content={props.value?getHtml((props.value as unknown) as JSONContent):"<p>Hello world</p>"} // Initial content for the editor
                // Optionally include `renderControls` for a menu-bar atop the editor:
                renderControls={() => (
                    <MenuControlsContainer>
                    <MenuButtonUndo/>
                    <MenuButtonRedo/>
                    <MenuDivider />
                    <MenuSelectHeading />
                    <MenuSelectFontSize />
                    <MenuButtonTextColor PopperProps={{
                        sx: { zIndex: (theme) => `${theme.zIndex.tooltip} !important` },
                    }}/>
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    <MenuButtonUnderline/>
                    <MenuButtonBlockquote/>
                    <MenuDivider />
                    <MenuButtonOrderedList/>
                    <MenuButtonBulletedList/>
                    <MenuButtonHighlightColor PopperProps={{
                        sx: { zIndex: (theme) => `${theme.zIndex.tooltip} !important` },
                    }}/>
                    <MenuDivider />
                    <MenuButtonAlignLeft/> 
                    <MenuButtonAlignCenter/> 
                    <MenuButtonAlignRight/>
                    {/* Add more controls of your choosing here */}
                </MenuControlsContainer>
            )}/>
            </div>
        </>
    )
}