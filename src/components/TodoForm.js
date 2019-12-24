import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import uuid from 'uuid';
import { TodosContext } from '../context';


const TodoInput = ({ form }) => {
  const { dispatch } = useContext(TodosContext);
  const {
    validateFields,
    getFieldDecorator,
    getFieldValue
  } = form;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err) => {
      if(!err) {
        dispatch({
          type: "ADD_TODO",
          payload: {
            id: uuid.v4(),
            text: getFieldValue('todoText'),
            complete: false
          }
        })
      }
    });

  }

  return (
    <CenteredContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('todoText', {
            rules: [{ required: true, message: 'Please input your new todo text' }],
          })(
            <Input placeholder="New Todo" />)}
        </Form.Item>
      </StyledForm>
    </CenteredContainer>
  )
}

const TodoForm = Form.create({ name: 'TodoInput' })(TodoInput);

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`
const StyledForm = styled(Form)`
  width: 20%;
  margin: 0 auto;
`;
export { TodoForm };