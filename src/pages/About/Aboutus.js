import React from 'react'
// UI
import DocumentTitle from 'react-document-title'//动态Title
import { Typography, Divider } from 'antd';
import './Aboutus.less'


const { Title, Paragraph, Text, Link } = Typography;

const compilerIntro = [{
  lang: 'C (gcc 9.2.0)',
  code: '/usr/local/gcc-9.2.0/bin/gcc {src}'
}, {
  lang: 'C++ (g++ 9.4)',
  code: '/usr/local/gcc-9.2.0/bin/g++ {src}'
}, {
  lang: 'Java (OpenJDK 13)',
  code: '/usr/local/openjdk13/bin/javac {src}'
}, {
  lang: 'Python 2.7 (Python 2.7.17)',
  code: '/usr/local/python-2.7.17/bin/python2 {src}'
}, {
  lang: 'Python 3 (Python 3.8.1)',
  code: '/usr/local/python-3.8.1/bin/python3 {src}'
}, {
  lang: 'Golang (go 1.13.5)',
  code: '/usr/local/go-1.13.5/bin/go build {src}'
}]

const resultexplain = [
  {
    name: "Pending & Judging",
    des: "You solution will be judged soon, please wait for result."
  },
  {
    name: "Accepted",
    des: "Congratulations. Your solution is correct."
  },
  {
    name: "Wrong Answer",
    des: "Your program's output doesn't match judger's answer."
  },
  {
    name: "Time Limit Exceeded",
    des: "The CPU time your program used has exceeded limit."
  },
  {
    name: "Compilation Error",
    des: "Failed to compile your source code. Please check the compiler's output."
  },
  {
    name: "Runtime Error (SIGSEGV)",
    des: "Your program terminated abnormally. Possible reason: Segmentation Fault."
  },
  {
    name: "Runtime Error (SIGXFSZ)",
    des: "File size exceeded. Your program is outputting too much values than allowed."
  },
  {
    name: "Runtime Error (SIGFPE)",
    des: "Your program terminated abnormally. Possible reason: Dividing something by 0."
  },
  {
    name: "Runtime Error (SIGABRT)",
    des: "Your program are aborting due to a fatal error."
  },
  {
    name: "Runtime Error (NZEC)",
    des: "The memory your program actually used has exceeded limit."
  },
  {
    name: "Runtime Error (Other)",
    des: "Other miscellaneous errors occurred, please contact administrators for more info."
  },
  {
    name: "System Error",
    des: "Oops, something has gone wrong with the judger. Please report this to administrator."
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
              {compilerIntro.map((item) => {
                return (
                  <li
                    key={item.lang}
                    className='onecodeIntro'
                    style={{ marginTop: '20px' }}>
                    <Text>{item.lang}</Text><br />
                    <Text className='codeblock'>{item.code}</Text>
                  </li>
                )
              })}
            </ul>
          </Paragraph>
        </Typography>

        <Typography className='typobox'>
          <Title level={3} className='typotitle'>Result Explanation</Title>
          <Paragraph className="typopara">
            <ul style={{ fontSize: '1.1em' }}>
              {resultexplain.map((item) => {
                return (
                  <li key={item.name} style={{ marginTop: '10px' }}>
                    <Text strong>{item.name}:</Text> <Text>{item.des}</Text>
                  </li>
                )
              })}
            </ul>
          </Paragraph>
        </Typography>
      </div>
    </DocumentTitle>
  )
}
