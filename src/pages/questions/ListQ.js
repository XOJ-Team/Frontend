import React from 'react';
import { Table, Tag, Typography } from 'antd';
import { Layout } from 'antd';
// import './ListQ.css';

const { Sider, Content } = Layout;
const { Text, Title } = Typography;

/**
 * 这部分tags的标签还没有想好格式设计和展示，目前暂时把tag分类功能合并到table里面了
 */
// const { CheckableTag } = Tag;

// const tagsData = ['test1', 'test2'];

// class HotTags extends React.Component {
//   state = {
//     selectedTags: [],
//   };

//   handleChange(tag, checked) {
//     const { selectedTags } = this.state;
//     const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
//     console.log('You are interested in: ', nextSelectedTags);
//     this.setState({ selectedTags: nextSelectedTags });
//   }

//   render() {
//     const { selectedTags } = this.state;
//     return (
//       <>
//         <Title className='question_tags_select_title' level={5}>Qestion Tags Select</Title>
//         {tagsData.map(tag => (
//           <CheckableTag
//             className='question_sider_tags'
//             key={tag}
//             checked={selectedTags.indexOf(tag) > -1}
//             onChange={checked => this.handleChange(tag, checked)}
//           >
//             {tag}
//           </CheckableTag>
//         ))}
//       </>
//     );
//   }
// }

export default function ListQ(){
  const columns = [
    {
      title: 'Question Title',
      dataIndex: 'question_title',
      key: 'question_title',
      render: text => <a>{text}</a>,
      sorter: (rowA, rowB) => rowA.key - rowB.key,
    },
    {
      title: 'Level',
      key: 'question_level',
      dataIndex: 'question_level',
      filters: [
        {
          text: 'easy',
          value: 'easy',
        },
        {
          text: 'hard',
          value: 'hard',
        },
        {
          text: 'normal',
          value: 'normal',
        },
      ],
      onFilter: (value, record) => record.question_level.indexOf(value) === 0,
      render: text => (
        <>
          {text.map(text => {
            let type;
            if (text === 'hard') {
              type = 'danger';
            } else if (text === 'easy') {
              type = 'success';
            } else if (text === 'normal') {
              type = 'warning';
            }
            return (
              <Text type={type} key={text}>
                {text}
              </Text>
            );
          })}
        </>
      ),
    },
    {
      title: 'AC Rate',
      dataIndex: 'question_ac_rate',
      key: 'question_ac_rate',
    },
    {
      title: 'Tags',
      key: 'question_tags',
      dataIndex: 'question_tags',
      filters: [ // 后续添加一个能够自己根据表格信息读取标签设置text和value的函数
        {
          text: 'Greedy',
          value: 'Greedy',
        },
        {
          text: 'Array',
          value: 'Array',
        },
        {
          text: 'Tree',
          value: 'Tree',
        }
      ],
      onFilter: (value, record) => record.question_tags.indexOf(value) === 0,
      render: tags => (
        <>
          {tags.map(tag => {
            return (
              <Tag key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  const data = [ //增加从后端读取数据的function
    {
      key: "1",
      question_title: '1. add two numbers',
      question_level: ['easy'],
      question_ac_rate: '55.00%',
      question_tags: ['Greedy', 'Array'],
    },
    {
      key: "2",
      question_title: '2. multi two numbers',
      question_level: ['hard'],
      question_ac_rate: '77.00%',
      question_tags: ['Greedy'],
    },
    {
      key: "3",
      question_title: '3. divide two numbers',
      question_level: ['normal'],
      question_ac_rate: '88.00%',
      question_tags: ['Tree'],
    },
  ];
  return (
    <div>
      <Table 
          columns={columns} 
          dataSource={data} 
          bordered 
          pagination={{
            pageSize: 10,
            position:["bottomCenter"]
          }}
          />
    {/* <Layout className='questionLayout'> //使用布局分类table和tage filter  暂时没用
        <Content>
          <div className='questionTable'>
          <Table 
          columns={columns} 
          dataSource={data} 
          bordered 
          pagination={{
            pageSize: 10,
            position:["bottomCenter"]
          }}
          />
          </div>
        </Content>
        <Sider className='question_tags_sider'>
          <HotTags />
        </Sider>
      </Layout> */}
    </div>
  )
}