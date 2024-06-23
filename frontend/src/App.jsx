import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER, GET_ALL_USERS } from "./graphql/queries/user.query";
import Header from "./components/ui/Header";
import { Toaster } from "react-hot-toast";

function App() {
	const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
	const allUsers = useQuery(GET_ALL_USERS);
	console.log("all users:", allUsers.data);
	console.log("authenticated user:", data);
	if (loading) return null;
  return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data?.authUser ? <HomePage /> : <Navigate to='/login' />} />
				<Route path='/login' element={!data?.authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!data?.authUser ? <SignUpPage /> : <Navigate to='/' />} />
				<Route
					path='/transaction/:id'
					element={data?.authUser ? <TransactionPage /> : <Navigate to='/login' />}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Toaster />
		</>
  )
}

export default App
