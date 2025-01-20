import { BrowserRouter, Route, Routes } from "react-router-dom"
import {SignIn} from "./pages/SignIn"
import {SignUp} from "./pages/SignUp"
import {Blog} from "./pages/Blog"
import {BlogPost} from "./pages/BlogPost"
function App() {


  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
