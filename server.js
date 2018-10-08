const { ApolloServer, gql } = require('apollo-server');

const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

const User = require('./models/User');
const Post = require('./models/Post');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

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

const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening ${url}`);
});
