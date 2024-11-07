import React, { useEffect, useState } from 'react'
import Layout1 from '../../Layouts/Layout1'
import axiosInstance from '../../apiInstances/axiosInstance'
import { toast } from 'react-toastify'

const AdvertiseList = () => {
  const [advertiseDetails, setAdvertiseDetails] = useState([])
  useEffect(() => {
    getAdvertiseDetails()
  }, [])

  const getAdvertiseDetails = async () => {
    await axiosInstance
      .get('/advertise/list')
      .then((res) => {
        if (res.data.status) {
          setAdvertiseDetails(res.data.data)
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((error) => {
        console.log("error", error)
        toast.error(error.message)
      })
  }

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance
        .post(`/advertise/status/${id}`, { updateStatus: status })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message)
            getAdvertiseDetails()
          } else {
            toast.error(res.data.message)
          }
        })
        .catch((error) => {
          console.log("error", error)
          toast.error(error.message)
        })
    } catch (error) {
      console.log("error", error)
      toast.error(error.message)
    }
  }
  return (
    <Layout1>
      <div className='px-6 lg:px-0'>
        <div className="bg-white rounded-2xl shadow-md mb-10">
          <div className="overflow-x-auto rounded-2xl">
            <table className="min-w-[900px] w-full table-auto bg-white">
              <thead>
                <tr>
                  <th className="p-4 text-start text-[#262626] font-bold text-sm lg:text-base">Date</th>
                  <th className="p-4 text-start text-[#262626] font-bold text-sm lg:text-base">Full Name</th>
                  <th className="p-4 text-start text-[#262626] font-bold text-sm lg:text-base">Email</th>
                  <th className="p-4 text-start text-[#262626] font-bold text-sm lg:text-base">Advertise Type</th>
                  <th className="p-4 text-start text-[#262626] font-bold text-sm lg:text-base">Company Name</th>
                  <th className="p-4 text-start text-[#262626] font-bold text-sm lg:text-base">Phone Number</th>
                  <th className="p-4 text-start text-[#262626] font-bold text-sm lg:text-base">Status</th>
                  <th className="p-4 text-start text-[#262626] font-bold text-sm lg:text-base">Action</th>
                </tr>
              </thead>
              <tbody>
                {advertiseDetails?.length > 0 &&
                  advertiseDetails.map((d, index) => (
                    <tr key={index} className="border-t border-t-[#D4D4D4]">
                      <td className="p-4 text-[#262626] font-semibold text-sm lg:text-base whitespace-nowrap">
                        {d.createdAt.split("T")[0]}
                      </td>
                      <td className="p-4 text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                        {d.fullName}
                      </td>
                      <td className="p-4 text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                        {d.email}
                      </td>
                      <td className="p-4 text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                        {d.advertiseType}
                      </td>
                      <td className="p-4 text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                        {d.companyName}
                      </td>
                      <td className="p-4 text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                        {d.phoneNumber}
                      </td>
                      <td className="p-4 text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                        {d.status === 'active' && <span className='text-green-600 font-bold'>{d.status}</span>}
                        {d.status === 'reject' && <span className='text-red-600 font-bold'>{d.status}</span>}
                        {d.status === 'pending' && <span className='text-orange-600 font-bold'>{d.status}</span>}
                      </td>
                      <td className="p-4 text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                        <div className='flex gap-2'>
                          <span
                            onClick={() => {
                              if (d.status === 'reject' || d.status === 'pending') {
                                updateStatus(d._id, 'active');
                              }
                            }}
                            className={`${d.status === 'active' ? "disabled bg-green-500 cursor-text" : "bg-green-600 cursor-pointer"} text-xs text-blue-50 p-1 rounded-md`}
                          >
                            Active
                          </span>
                          <span
                            onClick={() => {
                              if (d.status === 'active' || d.status === 'pending') {
                                updateStatus(d._id, 'reject');
                              }
                            }}
                            className={`${d.status === 'reject' ? "disabled bg-red-500 cursor-text" : "bg-red-600 cursor-pointer"} text-xs text-blue-50 p-1 rounded-md`}
                          >
                            Reject
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout1 >
  )
}

export default AdvertiseList