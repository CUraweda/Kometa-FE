import GeoMaps from '@/components/ui/geoMaps';
import LineChart from '@/components/ui/LineChart';
import CenterLayout from '@/layout/center.layout'
import React from 'react'

const DashboardAdmin = () => {
    const fakeData = [
        { id: "Total Anggota", value: "124.32" },
        { id: "Total Budidaya", value: "564.32" },
        { id: "Total Lahan", value: "564.32" },
        { id: "Total Simpanan", value: "564.32" },

    ];
    return (
        <div>
            <CenterLayout className="min-h-[calc(100vh-105px)]">
                <div className="min-h-[calc(100vh-105px)] w-full">

                    <div className="rounded-lg mt-10 border h-36 flex items-center divide-x py-5 px-2 divide-gray-200 gap w-full bg-white">
                        {fakeData.map(({ id, value }) => {
                            return (
                                <div className="px-8 flex-1 h-full flex flex-col justify-between items-start">
                                    <h3 className="text-sm font-semibold">
                                        {id}
                                    </h3>
                                    <span className="text-4xl font-medium">{value}</span>{" "}
                                </div>
                            );
                        })}
                    </div>

                    <div className='w-full flex sm:flex-row flex-col mt-5'>
                        <div className='w-full sm:w-3/5 p-2'>
                            <div className='bg-white rounded-md p-3 border border-input'>
                                <GeoMaps />
                            </div>

                        </div>
                        <div className='w-full sm:w-2/5 p-2'>
                            <div className='bg-white rounded-md p-3 border border-input'>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>Provinsi</th>
                                                <th>Total Anggota</th>
                                                <th>Total Lahan</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>

                                                <td>Cy Ganderton</td>
                                                <td>Quality Control Specialist</td>
                                                <td>Blue</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='w-full flex sm:flex-row flex-col mt-5'>
                        <div className='w-full sm:w-3/5 p-2'>
                            <div className='bg-white rounded-md p-3 border border-input'>
                               <LineChart/>
                            </div>

                        </div>
                        <div className='w-full sm:w-2/5 p-2'>
                            <div className='bg-white rounded-md p-3 border border-input'>
                            </div>
                        </div>

                    </div>
                </div>
            </CenterLayout>
        </div>
    )
}

export default DashboardAdmin