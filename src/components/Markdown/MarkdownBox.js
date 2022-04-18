import React from 'react'
import MarkdownIt from 'markdown-it'
import highlight from 'highlight.js'

// 手动引入highlight样式
import 'highlight.js/styles/github.css'
// 引入自定义css
import './style.css'

const hljs=highlight

export const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        return hljs.highlightAuto(str,lang).value
    }
})
/**
 * @param props.content
 */
export default function MarkdownBox(props) {
    return (
        <div
            style={{
                borderRadius: '10px',
                padding: '0px 20px 0px 30px',
                overflow: 'auto',
                // 超出长度自动换行
                tableLayout: 'fixed',
                wordBreak: 'break-all',
                wordWrap: 'break-word'
            }}
            dangerouslySetInnerHTML={{ __html: mdParser.render(props.content) }}>
        </div>
    )
}
