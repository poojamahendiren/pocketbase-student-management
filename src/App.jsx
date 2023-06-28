import { useState } from 'react'


import Register from "./Register"
import Table from "./Table"
import Update from "./update"
import { Routes, Route} from "react-router-dom";

function App() {


  return (
    <>
      {/* <Table/> */}
      
      
      {/* <Main/> */}
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/Table" element={<Table />} />
        <Route path="/:id/Update" element={<Update/>}/>
         
        </Routes>
    </>
  )
}

export default App
