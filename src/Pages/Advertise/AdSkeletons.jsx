import { Skeleton, Stack } from '@mui/material';
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { logo } from '../../assets';

const AdSkeletons = ({ item }) => {
  return (
    <div className="relative grid place-items-center md:px-10 py-4 flex-auto">
      <Stack spacing={1} width={600}>
        <div>
          <div className='mb-5'>
            <Stack spacing={1}>
              {item.advertiseType === 'top' ? (<>
                <div className="flex items-center justify-center h-auto min-w-screen">
                  <div className="bg-white  w-8/12 overflow-hidden border-2 cursor-pointer border-slate-500">
                    <div className="flex items-center justify-center p-2">
                      <div className="flex-none w-20">
                        <img
                          src={item.advertiseImage}
                          alt="Advertise"
                          className="w-24 h-16 object-cover"
                        />
                      </div>
                      <div className="flex-1 pl-2">
                        <h2 className="text-md font-semibold">{item.title}</h2>
                        <p className="text-gray-600 text-xs">{item.description.split(" ").slice(0, 10).join(" ") + (item.description.split(" ").length > 10 ? "..." : "")}</p> {/* Reduced text size and word count */}
                      </div>
                      <div className="flex-none flex items-center">
                        <div className="border-l-2 border-b-slate-700 h-12 mx-2"></div>
                        <div className="flex-none w-20">
                          <img
                            src={item.companyLogoImage}
                            alt="Company Logo"
                            className="w-24 h-16 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>) : null}
              <Skeleton variant="rounded" height={30} animation="wave" />
            </Stack>
          </div>
          <div className='w-full flex items-center justify-between gap-3 '>
            <div className='w-[70%]'>
              <Stack spacing={1}>
                <Skeleton variant="rounded" height={60} animation="wave" />
                <Skeleton variant="rounded" height={60} animation="wave" />
                {item.advertiseType === 'between' ? (<>
                  <div className='mx-auto'>
                    <p className='text-left text-sm'>ADVERTISEMENT</p>
                    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                      <div>
                        <div className='p-2 rounded-lg overflow-hidden'>
                          <img className="w-full rounded-t-lg cursor-pointer h-[3rem] md:h-[13rem] object-cover" src={item.advertiseImage} alt="advertise Image" />
                          <div className="bg-[#171717] flex justify-end items-center rounded-b-lg p-2 md:p-3 cursor-pointer">
                            <div className="flex justify-center items-center text-white text-xs md:text-sm rounded-b-lg">
                              <LazyLoadImage
                                src={item.companyLogoImage}
                                alt=""
                                srcSet={item.companyLogoImage}
                                loading="lazy"
                                effect="blur"
                                className="h-8 md:w-auto rounded-full aspect-square mr-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-lg mb-1">{item.title}</div>
                          <p className="text-gray-700 text-sm">
                            {item.description}
                          </p>
                        </div>
                        <button className="text-xs md:text-sm lg:text-base hover:font-semibold font-medium border bg-[#E5002A] text-white hover:bg-white hover:text-[#E5002A] hover:border-[#E5002A] py-1 px-3 rounded-lg"> {/* Reduced padding */}
                          <a href={item.link} target='_blank' rel="noopener noreferrer">Enquiry</a>
                        </button>
                      </div>
                    </div>
                  </div>
                </>) : <>
                  <Skeleton variant="rounded" height={60} animation="wave" />
                  <Skeleton variant="rounded" height={60} animation="wave" />
                  <Skeleton variant="rounded" height={60} animation="wave" />
                </>}
                <Skeleton variant="rounded" height={60} animation="wave" />
              </Stack>
            </div>
            <div className='w-[30%] mt-auto'>
              <Stack spacing={1}>
                <Skeleton variant="rounded" height={item.advertiseType === 'between' ? 215 : 160} animation="wave" />
                {
                  item.advertiseType === 'vertical' ? (
                    <>
                      <div className="grid place-items-center mx-auto mt-3 w-full sm:w-[100%]">
                        <div className="max-w-lg w-full grid place-items-center bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer">
                          <div className="h-[320px] w-full">
                            <div className="h-[180px]">
                              <img src={item.advertiseImage} alt="advertiseImage" className="object-container h-full w-full" />
                            </div>
                            <div className="h-[100px]  bg-white p-3 sm:p-5 overflow-hidden">
                              <p className="text-lg text-slate-500">{item.title}</p>
                              <p className="text-sm">
                                {item.description.length > 10 ? item.description.slice(0, 100) + "..." : item.description}
                              </p>
                              <p className="text-sm text-blue-600">{`Read more >`}</p>
                            </div>
                            <div className="h-[30px] flex justify-end items-center">
                              <div className="pr-4 ">
                                <img src={logo} alt="logo" className="w-[150px]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : <Skeleton variant="rounded" height={item.advertiseType === 'between' ? 350 : 230} animation="wave" />
                }
              </Stack>
            </div>
          </div>
          <div className='mt-5'>
            <Stack spacing={1}>
              <Skeleton variant="rounded" height={30} animation="wave" />
            </Stack>
          </div>
        </div>
      </Stack >
    </div >
  );
}

export default AdSkeletons