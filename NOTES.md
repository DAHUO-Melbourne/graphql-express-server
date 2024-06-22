# what is schema
1. schema is a fundamental concept of GraphQL
1. it defines the structure of the data client can query (typeDef including query and mutation) and the operations that they can perform (resolver). 

# what is typeDef:
1. typeDef里包含了两种东西：一个是`query` + `mutation`，也就是client可以查询/修改的api都有什么，另一个是这些query 和 mutation的api的参数的类型，可以是一些class的interface