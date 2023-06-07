import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const ChildInstallments = () => {

    const [data, setdata] = useState([]);
    const { id } = useParams();

    // FetchData method definition
    const FetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/child/${id}`);
            console.log(res.data?.childData)
            setdata(res.data?.childData)

        } catch (error) {
            console.log(error)
        }

    }
    
    
    // a Fetch method to fetch data 
    useEffect(() => {
        FetchData();
    }, [])
    
    console.log(`data is: ${data}`)
    // JSX section
    return (
      <>
            <div className="container flex-col gap-2 bg-gray-400 w-full h-screen flex justify-center items-center">


                <div className="relative w-[70vw] overflow-x-auto shadow-md sm:rounded-sm">
                    <table className="w-full text-sm text-gray-300 dark:text-gray-300 text-center p-2">
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
                                    Paid Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {data?.map((e, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {e.childId}
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
                                        {e.installment}
                                    </td>
                                </tr>
                            ))}



                        </tbody>
                    </table>
                </div>
            </div>
      </>
  )
}

export default ChildInstallments