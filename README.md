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

## ApolloClient
1. 在index.jsx/main.jsx文件里新建一个apolloClient
```
const client = new ApolloClient({
	// TODO => Update the uri on production
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(), // Apollo Client uses to cache query results after fetching them.
	credentials: "include", // This tells Apollo Client to send cookies along with every request to the server.
});
```
2. 将client传递下去:
```
<ApolloProvider client={client}>
  <App />
</ApolloProvider>
```
3. 在整个App里都可以使用这个client来发送api
4. 创建graphql查询语句:
```
export const GET_AUTHENTICATED_USER = gql`
	query GetAuthenticatedUser {
		authUser {
			_id
			username
			name
			profilePicture
		}
	}
`;
```
`query`和`authUser`是typeDef里定义的内容，而`GetAuthenticatedUser`是用户自定义的前端函数名
注意这里
```
{
	_id
	username
	name
	profilePicture
}
这四个是我们希望返回的字段的列表
```
有参数的如下
```
export const GET_USER_AND_TRANSACTIONS = gql`
	query GetUserAndTransactions($userId: ID!) {
		user(userId: $userId) {
			_id
			name
			username
			profilePicture
			# relationships
			transactions {
				_id
				description
				paymentType
				category
				amount
				location
				date
			}
		}
	}
`;
```
`query`和`user(userId: $userId)`需要与后端一致，而`GetUserAndTransactions`是前端自定义的名字，爱叫什么叫什么
5. 使用useQuery来调用这些query语句:
```
import { useQuery } from "@apollo/client";

const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

```
6. 使用useMutation语句:
先来看看backend的mutation定义语句:
```
type Mutation {
	signUp(input: SignUpInput!): User!
}
```
再来看看frontend的gql定义语句
```
export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			_id
			name
			username
		}
	}
`;
```
注意: `SIGN_UP`是前端自己定义的。`mutation SignUp`的`SignUp`也是前端自己定义的，这个SignUp的位置前端爱叫什么叫什么，但是参数部分的`$input: SignUpInput!`需要和后端的`(input: SignUpInput!)`一致，另一个需要一致的是`signUp(input: $input) {`里的`signUp`需要和后端的`signUp(input: SignUpInput!): User!`的`signUp`名称包括大小写一致。
使用的时候:
```
	const [signup, { loading, error }] = useMutation(SIGN_UP);
```
`useMutation(SIGN_UP)`会将signup函数返回回来。使用的时候:
```
await signup({
	variables: {
		input: signUpData,
	},
});
```
这个input需要和后端的`signUp(input: SignUpInput!): User!`里的`input`一致，同时这个variables是个保留字段
7. 回调函数:
```
	const [logout, { loading, client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});
```
注意`useMutation`的第二个参数, 这是个回调函数，意思是成功执行`logout`以后就会重新执行`GetAuthenticatedUser`函数
8. 有参数的useQuery
```
	const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
		variables: {
			userId: authUser?.authUser?._id,
		},
	});
```
这里面:
```
{
	variables: {
		userId: authUser?.authUser?._id,
	},
}
```
variables和userId就是参数，userAndTransactions是将data改名为userAndTransactions，防止同一个文件里的data重名
9. cache机制
```
	const [logout, { loading, client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	...
	await logout();
	// Clear the Apollo Client cache FROM THE DOCS
	// https://www.apollographql.com/docs/react/caching/advanced-topics/#:~:text=Resetting%20the%20cache,any%20of%20your%20active%20queries
	client.resetStore();
```
使用	`client.resetStore();`来清理掉原用户所有的数据缓存，来换取一个更良好的用户体验
## 资料：
https://www.youtube.com/watch?v=Vr-QHtbmd38
https://github.com/burakorkmez/graphql-crash-course/tree/master