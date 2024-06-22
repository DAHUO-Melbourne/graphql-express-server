## GraphQL与REST的区别
1. REST的流程：客户端发送action（get/post/put/patch/delete）给后端，后端根据发送的不同endpoint以及action，进行相应处理，然后和数据库交互，拿到数据返回给前端
2. GraphQL的流程：客户端发送**Query(get)/Mutation(put/post/patch/delete)**给后端，但是注意：**GraphQL只有一个endpoint: `/graphql`**

## GraphQl相关概念以及角色
1. Schema: defines the structure of data that client could query, scheme包含两个部分: typeDef; resolvers
2. typeDef: defines the shape of data available in GraphQL API, 

## authentication相关：
1. 使用一个叫`passport.js`和`graphql-passport`的包来做验证
1. 具体步骤是：
- 用户sign up/log in发送request
- passport.js本地auth逻辑搞定以后
- 将user obj(username/password) serilize以后，发送给mongodb
- 在db里存储完成以后，server会create一个http only cookie, 然后发送回client
- 以后client再发任何api，都会在header里带上这个http only cookie
- server会将这个http only cookie和user store对比，如果对上了就authenticated了

## 资料：
https://www.youtube.com/watch?v=Vr-QHtbmd38
https://github.com/burakorkmez/graphql-crash-course/tree/master