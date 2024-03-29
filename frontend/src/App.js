import { Container } from 'react-bootstrap'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import MessageListScreen from './screens/MessageListScreen'


function App() {

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact/>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />

            <Route path='/admin/userList' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/productList' element={<ProductListScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/categoryList' element={<CategoryListScreen />} />
            <Route path='/admin/category/:id/edit' element={<CategoryEditScreen />} />
            <Route path='/admin/messageList' element={<MessageListScreen />} />
          </Routes>
        </Container>  
      </main>
      <Footer />
    </Router>
  );
}

export default App;
