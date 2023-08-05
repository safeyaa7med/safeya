import { useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import './style.css'
function Contact () {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [content, setContent] = useState("")
const [loading, setLoading] = useState(false)
function Loading() {
  return (
    <div
    className="animate-pulse">loading
  </div>
  );
}
const onSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  const data = {
    firstName:name,
    email:email,
    content:content
  }
  await axios.post('https://api.sbg-camps.com/portfolio/messages', data).then(() => {
    Swal.fire({ 
      position: "center",
      icon: "success",
      customClass: "swal-wide",
      title:'تم إرسال الرسالة',
      showConfirmButton: false,
      timer: 1700,
    });
    setContent("")
    setEmail("")
    setName("")
  }).catch((error) => {
    if (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        customClass: "swal-wide",
        title: "حدثت مشكلة ما",
        showConfirmButton: true,
      });
      console.log(error.response.data);
      console.log(error.response.status);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  })
  .finally(() => setLoading(false));
}
    return (
        <div id="contact" className="dark:bg-slate-900">
        <div className="container mx-auto">
          <div className="flex flex-col gap-3 items-center">
            <h1 className="text-indigo-600 font-bold">CONTACT</h1>
            <h1 className="text-3xl dark:text-white">Have a Question?</h1>
            <p className="w-1/2 text-center text-gray-400">
              Do you have an idea? Lets discuss it and see what we can do
              together.
            </p>
          </div>
          <form className="mt-5 p-8 flex flex-col gap-5 items-center" 
            encType="multipart/form-data" 
            onSubmit={onSubmit}>
            <input
              required
              className="p-2 w-full md:w-1/2 ring-1 ring-indigo-300 rounded-sm dark:bg-slate-800 dark:ring-0 dark:text-white"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Name Surname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              className="p-2 w-full md:w-1/2 ring-1 ring-indigo-300 rounded-sm dark:bg-slate-800 dark:ring-0 dark:text-white"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"            />
            <textarea
              required
              className="p-2 w-full md:w-1/2 ring-1 ring-indigo-300 rounded-sm dark:bg-slate-800 dark:ring-0 dark:text-white"
              cols="30"
              rows="10"
              id="content"
              name="content"
              placeholder="Messages...&#10;Mobile No: 966541787334&#10;Email: a7medabdulshafi@gmail.com&#10;"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            >
            </textarea>
            <button className="w-1/2 bg-indigo-600 text-white font-medium px-3 py-2 rounded-md cursor-pointer" type="submit">
              {loading?<Loading/>:'Submit'}
            </button>
          </form>
        </div>
      </div>
    )
}
export default Contact;