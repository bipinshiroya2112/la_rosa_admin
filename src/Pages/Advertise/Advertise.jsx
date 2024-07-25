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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout1>
  )
}

export default AdvertiseList