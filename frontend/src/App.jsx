
import PostList from './pages/postList';
import PostDetails from './pages/postDetails';
import CategoryPost from './pages/categoryPost';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home';
import LoginForm from './pages/login';
import SignupForm from './pages/signUp';
import AboutPage from './pages/about';
import ProfileDrawer from './components/profile';
import PostForm from './pages/postForm';
import Posts from './pages/allPost';
import MyPosts from './pages/myPost';

const App = () => {
const loggedInUserEmail = localStorage.getItem("email");
  return (
   <>
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<HomePage/>} />
                <Route path="/about" element={<AboutPage/>} />
                <Route path='/profile' element={<ProfileDrawer/>} />
        <Route path="/register" element={<SignupForm/>} />
        <Route path="/login" element={<LoginForm/>} />
      <Route path='/postForm' element={<PostForm/>} />
      <Route path='/allpost' element={<Posts/>} />
      <Route path='/mypost' element={<MyPosts userEmail={loggedInUserEmail} />} />
        <Route path="/home" element={<><Header/> <PostList /> <Footer/> </>} />
        <Route path="/post/:id" element={<><Header/>  <PostDetails /> <Footer/></>} />
        <Route path="/post/category/:id" element={<><Header/><CategoryPost /> <Footer/> </>  } />
      </Routes>
  
    </BrowserRouter>
   </>
  );
};

export default App
