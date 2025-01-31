import { BrowserRouter, Route, Routes } from "react-router-dom"
import {SignIn} from "./pages/SignIn"
import {SignUp} from "./pages/SignUp"
import {Blog} from "./pages/Blog"
import {BlogPost} from "./pages/BlogPost"
import {Publish} from "./pages/Publish"
function App() {


  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
