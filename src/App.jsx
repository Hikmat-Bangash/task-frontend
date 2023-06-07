/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';



function App() {

  const currentPage = useRef();
  const [limit, setlimit] = useState(2);
  const [pageCount, setpageCount] = useState();
  const [data, setdata] = useState([]);

  // FetchData method definition
  const FetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/parent/pagination?page=${currentPage.current}&limit=${limit}`);
      console.log(res.data)
      setdata(res.data.data.result)
      setpageCount(res.data.data.pageCount)
      
    } catch (error) {
      console.log(error)
    }
   
    console.log("fetching data")
  }


  //fetching paginated parent data
  useEffect(() => {
    currentPage.current = 1;
    FetchData();
  }, [])

// a method for pagination buttons to call the api and fetch the latest data according to page number
  const handlePageClick = (e) => {
    console.log(e)
    currentPage.current = e.selected + 1;
    FetchData();
  }
  // total Paid Amount method definition to return sum of all installment that childern paid
  const TotalPaidInstallment = (data) => {
    let total = 0;
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      total = total + item.installment;
    })
    return total;
  }


  // JSX Section
  return (
    <>
      <div className="container flex-col gap-2 bg-gray-400 w-full h-screen flex justify-center items-center">
        
  
        <div className="relative lg:w-[70vw] md:w-[80vw] sm:w-[90vw] w-[100vw] p-2  overflow-x-auto shadow-md sm:rounded-sm">
          <table className="w-full text-sm text-gray-300 dark:text-gray-300 text-center">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Sender
              </th>
              <th scope="col" className="px-6 py-3">
                Receiver
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Total Paid Amount
              </th>
            </tr>
          </thead>
            <tbody>
              
              {data.map((e, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {e.parentId}
                  </th>
                  <td className="px-6 py-4">
                    {e.sender}
                  </td>
                  <td className="px-6 py-4">
                    {e.receiver}
                  </td>
                  <td className="px-6 py-4">
                    {e.TotalAmount}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/childData/${e._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{TotalPaidInstallment(e.TotalPaidAmount)}
                    </Link>
                   
                  </td>
                </tr>
              ))}
            
        
           
          </tbody>
        </table>
      </div>

        {/* pagination */}
        <ReactPaginate
          className='flex gap-2 bg-gray-500  p-3 text-white'
          breakLabel="..."
          nextLabel="next>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<prev"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active bg-blue-700 px-2"
        />
      </div>
    </>
  );
}

export default App;
