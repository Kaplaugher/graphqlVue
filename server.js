const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// import typedefs and reslovers

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

//import env variables

require('dotenv').config({ path: 'variables.env' });

const User = require('./models/User');
const Post = require('./models/Post');

// connect to mlab database

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

// create graphql/Apollo server using typedefs, resolvers, context

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening ${url}`);
});
