import React from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
// 引入语言包
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import java from 'highlight.js/lib/languages/java'
import python from 'highlight.js/lib/languages/python'
import golang from 'highlight.js/lib/languages/go'

// 手动引入highlight样式
import 'highlight.js/styles/github.css'
// 引入自定义css
import './style.css'
// 注册语言包
hljs.registerLanguage('c',c)
hljs.registerLanguage('cpp',cpp)
hljs.registerLanguage('java',java)
hljs.registerLanguage('python',python)
hljs.registerLanguage('golang',golang)

export const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if(lang!==""){
            // return hljs.highlightAuto(str).value
            if(['c','cpp','java','python','golang'].includes(lang)){
                return hljs.highlight(lang,str).value
            }
            
        }
    }
})
/**
 * @param props.content
 */
export default function MarkdownBox(props) {
    return (
        <div
            className='mdbox'
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
