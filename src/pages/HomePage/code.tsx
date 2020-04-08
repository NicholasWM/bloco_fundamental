import React from 'react'
import { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface Props {
  language?: string;
  showLineNumbers?: boolean;
  value?: string;
}

export default class extends Component<Props> {
  render() {
    const language = this.props.language || "html";
    const showLineNumbers = this.props.showLineNumbers || false;

    return (
      <SyntaxHighlighter
        language={language}
        style={darcula}
        showLineNumbers={showLineNumbers || true}
      >
        {this.props.value ? this.props.value : this.props.children}
      </SyntaxHighlighter>
    );
  }
}