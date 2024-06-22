const userTypeDef = `#graphql
  type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    profilePicture: String
    gender: String!
  }

  type Query {
    users: [User!]
    authUser: User
    user(userId: ID!): User
  }

  type Mutation {
    signUp(input: SignUpInput!): User!
    login(input: LoginInput!): User!
    logout: LogoutResponse
  }

  type SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  type LoginInput {
    username: String!
    password: String!
  }

  type LogoutResponse {
    message: String!
  }

`
// !的意思是required，必填
// Query和Mutation是graphql的保留字段，type都是Query和Mutation里各种借口的参数类型和返回类型而已
export default userTypeDef;
