import React from 'react'
// UI
import DocumentTitle from 'react-document-title'//动态Title
import { Typography, Divider } from 'antd';
import './Aboutus.less'


const { Title, Paragraph, Text, Link } = Typography;

const compilerIntro=[{
  lang:'C ( GCC 9.4 )',
  code:'/usr/bin/gcc -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c11 {src_path} -lm -o {exe_path}'
},{
  lang:'C++ ( G++ 9.4 )',
  code:'/usr/bin/g++ -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c++14 {src_path} -lm -o {exe_path}'
},{
  lang:'Java ( OpenJDK 11 )',
  code:'/usr/bin/javac {src_path} -d {exe_dir} -encoding UTF8'
},{
  lang:'Python2 ( Python 2.7 )',
  code:'/usr/bin/python -m py_compile {src_path}'
},{
  lang:'Python3 ( Python 3.6 )',
  code:'/usr/bin/python3 -m py_compile {src_path}'
},{
  lang:'Golang ( Golang 1.17 )',
  code:'/usr/bin/go build -o {exe_path} {src_path}'
}]

const resultexplain=[
  {
    name: "Pending & Judging",
    des: "You solution will be judged soon, please wait for result."
  },
  {
    name:"Compile Error",
    des:"Failed to compile your source code. Click on the link to see compiler's output."
  },
  {
    name:"Accepted",
    des:"Congratulations. Your solution is correct."
  },
  {
    name:"Wrong Answer",
    des:"Your program's output doesn't match judger's answer."
  },
  {
    name:"Runtime Error",
    des:"Your program terminated abnormally. Possible reasons are: segment fault, divided by zero or exited with code other than 0."
  },
  {
    name:"Time Limit Exceeded",
    des:"The CPU time your program used has exceeded limit."
  },
  {
    name:"Memory Limit Exceeded",
    des:"The memory your program actually used has exceeded limit."
  },
  {
    name:"System Error",
    des:"Oops, something has gone wrong with the judger. Please report this to administrator."
  }
]

export default function Aboutus() {
  return (
    <DocumentTitle title='XOJ | About'>
      <div style={{ margin: '20px 40px' }}>
        <Typography className='typobox'>
          <Title level={3} className='typotitle'>Compiler & Judger</Title>
          <Paragraph className="typopara">
            <ul style={{ fontSize: '1.1em' }}>
              {compilerIntro.map((item)=>{return(
                              <li 
                              key={item.lang}
                              className='onecodeIntro' 
                              style={{marginTop:'20px'}}>
                              <Text>{item.lang}</Text><br />
                              <Text className='codeblock'>{item.code}</Text>
                              </li>
              )})}
            </ul>
          </Paragraph>
        </Typography>
        
        <Typography className='typobox'>
          <Title level={3} className='typotitle'>Result Explanation</Title>
          <Paragraph className="typopara">
            <ul style={{ fontSize: '1.1em' }}>
              {resultexplain.map((item)=>{return(
                              <li key={item.name} style={{marginTop:'10px'}}>
                              <Text strong>{item.name}</Text> : <Text>{item.des}</Text>
                              </li>
              )})}
            </ul>
          </Paragraph>
        </Typography>
      </div>
    </DocumentTitle>
  )
}
