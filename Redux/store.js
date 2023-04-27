import { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
export const Tiles = [
    {
        Name: "atomOneDark",
        tile: CodeEditorSyntaxStyles.atomOneDark
    },
    {
        Name: "atomOneLight",
        tile: CodeEditorSyntaxStyles.atomOneLight
    },
    {
        Name: "Monokai",
        tile: CodeEditorSyntaxStyles.monokai
    },
    {
        Name: "MonoBlue",
        tile: CodeEditorSyntaxStyles.monoBlue
    },
    {
        Name: "MonokaiSublime",
        tile: CodeEditorSyntaxStyles.monokaiSublime
    },
    {
        Name: "Dracula",
        tile: CodeEditorSyntaxStyles.darcula
    },
    {
        Name: "Android",
        tile: CodeEditorSyntaxStyles.androidstudio
    },
    {
        Name: "CodePen",
        tile: CodeEditorSyntaxStyles.codepenEmbed
    },
    {
        Name: "Github",
        tile: CodeEditorSyntaxStyles.github
    },
    {
        Name: "allyDark",
        tile: CodeEditorSyntaxStyles.a11yDark
    },
    {
        Name: "allyLight",
        tile: CodeEditorSyntaxStyles.a11yLight
    },

]
export const Language = [
    {
        lan: "java",
        logo: "language-java",
        code: `public class Main
{
    public static void main(String args[])
    {
        System.out.println("Hello World");
    }
}`
    },
    {
        lan: "c",
        logo: "language-c",
        code: `#include<stdio.h>
int main()
{
    printf("Hello World");
    return 0;
}`
    },
    {
        lan: "cpp",
        logo: "language-cpp",
        code: `#include<iostream.h>
int main()
{
    cout << "Hello World";
}`
    },
    {
        lan: "php",
        logo: "language-php",
        code: `<?php
    echo "Hello World";
?>`
    }
];
export const Mic = [
    {
        on: true,
        icon: "microphone",
    },
    {
        on: false,
        icon: "microphone-slash"
    }
];
export const Setting = {
    File: "document*",
    Theme: CodeEditorSyntaxStyles.atomOneDarkReasonable,
    Language: Language[0],
    MicisOn: Mic[0].on,
    MicLogo: Mic[0].icon,
}