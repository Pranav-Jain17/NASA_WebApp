import { getData } from "./index.js";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    getData().then((items) => console.log(items));
  }, []);
  return (
    <>
      <div className="APP"></div>
    </>
  )
}

export default App
