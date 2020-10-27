import React, { useContext } from 'react';
import { List, Icon } from 'antd';
import styled from 'styled-components';
import { TodosContext } from '../context';
import { useGetTodoLists } from 'src/hooks/use-get-todo-lists';

const TodoList = () => {
  const { state, dispatch } = useContext(TodosContext);
  const { loading, data = [], error } = useGetTodoLists();

  return (
    <div>
      <CenteredTitle>{data.length > 0 ? `${data.filter(x => !x.complete).length} Todos` : 'Nothing to do'}</CenteredTitle>
      <List
        size="large"
        bordered
        dataSource={data}
        renderItem={item =>
          <List.Item
            onDoubleClick={() => dispatch({ type: "TOGGLE_TODO", payload: item })}
            actions={[
              <a key="list-loadmore-edit" onClick={() => dispatch({ type: "REMOVE_TODO", payload: item })}>
                <Icon type="delete" theme="filled" />
              </a>
            ]}
          >
            <List.Item.Meta
              title={<StyledContent complete={item.complete}>{item.listName}</StyledContent>}
            />
          </List.Item>
        }
      />
    </div>
  )
}

const CenteredTitle = styled.h1`
  margin: 0 auto;
  text-align: center;
`;

const StyledContent = styled.span`
  text-decoration: ${props => props.complete ? 'line-through' : 'none'}
`;

export { TodoList }
