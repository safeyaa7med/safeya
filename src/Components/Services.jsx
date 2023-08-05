import devops from "../img/devops.jpeg";
import javaScript from "../img/javaScript-tutorial.jpg";
import mysql from "../img/mysql.jpeg";
import node from "../img/node.png";
import react from "../img/react.jpeg";
import ui from "../img/ui ux.jpeg";

function Services () {
    return (
        <div id="services" className="dark:bg-slate-900">
        <div className="container mx-auto">
          <div className="flex flex-col gap-3 items-center">
            <h1 className="text-indigo-600 font-bold">SERVICES</h1>
            <h1 className="text-3xl dark:text-white">What do I offer?</h1>
            <p className="w-1/2 text-center text-gray-400">
              My approach to website design is to create a website that
              strengthens your company’s brand while ensuring ease of use and
              simplicity for your audience.
            </p>
          </div>
          <div className="p-5 sm:p-0 flex flex-wrap justify-between">
            <div className="w-full md:w-4/12 shadow-xl rounded-lg p-5 my-3 md:my-10 flex flex-col gap-3">
              <img className="w-full" src={ui} alt="" />
              <h1 className="font-medium text-lg dark:text-white">
                UX / UI Design
              </h1>
              <p className="text-gray-400">
                Creating and structuring web pages, understanding of semantic
                markup, knowledge of accessibility best practices.
              </p>
              <a className="text-indigo-600 font-semibold text-sm" href="">
                Read More
              </a>
            </div>
            <div className="w-full md:w-4/12 shadow-xl rounded-lg p-5 my-3 md:my-10 flex flex-col gap-3">
              <img className="w-full" src={javaScript} alt="" />
              <h1 className="font-medium text-lg dark:text-white">
                JavaScript
              </h1>
              <p className="text-gray-400">
                Writing and debugging code, manipulating the DOM, using
                libraries and frameworks, understanding of asynchronous
                programming.
              </p>
              <a className="text-indigo-600 font-semibold text-sm" href="">
                Read More
              </a>
            </div>
            <div className="w-full md:w-4/12 shadow-xl rounded-lg p-5 my-3 md:my-10 flex flex-col gap-3">
              <img className="w-full" src={react} alt="" />
              <h1 className="font-medium text-lg dark:text-white">React</h1>
              <p className="text-gray-400">
                Building reusable components, managing state and props, using
                lifecycle methods, understanding of JSX syntax.
              </p>
              <a className="text-indigo-600 font-semibold text-sm" href="">
                Read More
              </a>
            </div>
            <div className="w-full md:w-4/12 shadow-xl rounded-lg p-5 my-3 md:my-10 flex flex-col gap-3">
              <img className="w-full" src={node} alt="" />
              <h1 className="font-medium text-lg dark:text-white">Node.js</h1>
              <p className="text-gray-400">
                Setting up and configuring servers, using modules and packages,
                understanding of event-driven programming, knowledge of security
                best practices.
              </p>
              <a className="text-indigo-600 font-semibold text-sm" href="">
                Read More
              </a>
            </div>
            <div className="w-full md:w-4/12 shadow-xl rounded-lg p-5 my-3 md:my-10 flex flex-col gap-3">
              <img className="w-full" src={mysql} alt="" />
              <h1 className="font-medium text-lg dark:text-white">MySQL</h1>
              <p className="text-gray-400">
                Creating and managing databases, writing SQL queries,
                understanding of database design principles, knowledge of
                indexing and optimization techniques.
              </p>
              <a className="text-indigo-600 font-semibold text-sm" href="">
                Read More
              </a>
            </div>
            <div className="w-full md:w-4/12 shadow-xl rounded-lg p-5 my-3 md:my-10 flex flex-col gap-3">
              <img className="w-full" src={devops} alt="" />
              <h1 className="font-medium text-lg dark:text-white">DevOps </h1>
              <p className="text-gray-400">
                Deploying, managing, and maintaining the application in a
                production environment.
              </p>
              <a className="text-indigo-600 font-semibold text-sm" href="">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Services;