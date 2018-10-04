const { ApolloServer, gql } = require('apollo-server');

const todos = [
  { task: 'do things', completed: false },
  { task: 'do more', completed: false }
];

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }
`;

const resolvers = {
  Query: {
    getTodos: function() {
      return todos;
    }
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`server listening ${url}`);
});
