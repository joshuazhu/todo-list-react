import { gql, useQuery } from '@apollo/client';
import get from 'lodash/get';

const GET_TODO_LISTS = gql`
  query TodoLists {
    todoLists {
      id
      userId
      listName
      completed
    }
  }
`;

const useGetTodoLists = () => {
  const { loading, data, error } = useQuery(GET_TODO_LISTS);

  return {
    loading,
    data: get(data, 'todoLists'),
    error
  }
}

export {
  useGetTodoLists
}
