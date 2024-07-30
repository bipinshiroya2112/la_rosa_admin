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
      <div className="min-w-[900px] bg-white rounded-2xl shadow-md my-10">
        <table className="w-full table-auto">
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
                  <td className="p-4 text-[#262626] font-semibold text-sm lg:text-base">
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
                    {d.status == 'active' ? <span className='text-green-600 font-bold'>{d.status}</span> : null}
                    {d.status == 'reject' ? <span className='text-red-600 font-bold'>{d.status}</span> : null}
                    {d.status == 'pending' ? <span className='text-green-600 font-bold'>{d.status}</span> : null}
                  </td>
                  <td className="p-4 text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                    <div className='flex gap-2'>
                      <span onClick={() => {
                        if (d.status === 'reject') {
                          updateStatus(d._id, 'active');
                        }
                      }} className={`${d.status === 'active' ? "disabled bg-green-500 cursor-text " : "bg-green-600 cursor-pointer"} text-xs text-blue-50 p-1 rounded-md`}>Active</span>
                      <span onClick={() => {
                        if (d.status === 'active') {
                          updateStatus(d._id, 'reject')
                        }
                      }} className={`${d.status === 'reject' ? "disabled bg-red-500 cursor-text " : "bg-red-600 cursor-pointer"} text-xs text-blue-50 p-1 rounded-md`}>Reject</span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout1 >
  )
}

export default AdvertiseList