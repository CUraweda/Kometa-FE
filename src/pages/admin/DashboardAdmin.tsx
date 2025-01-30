import GeoMaps from '@/components/ui/geoMaps';
import LineChart from '@/components/ui/LineChart';
import CenterLayout from '@/layout/center.layout';
import { dashboarRest } from '@/middleware/Rest';
import React, { useEffect, useState } from 'react';

const DashboardAdmin = () => {
  const fakeData = [
    { id: 'Total Anggota', value: '124.32' },
    { id: 'Total Budidaya', value: '564.32' },
    { id: 'Total Lahan', value: '564.32' },
    { id: 'Total Simpanan', value: '564.32' },
  ];
  const [data, setData] = useState<[string, number][]>([]);
  const [province, setProvince] = useState<[]>([]);

  useEffect(() => {
    getData();
    getDataProvonce();
  }, []);

  const getData = async () => {
    const response = await dashboarRest.codeProvince();
    setData(response.data.data);
  };
  const getDataProvonce = async () => {
    const response = await dashboarRest.codeDataProvince();

    const sortedData = (response.data.data || []).sort((a: any, b: any) => 
        b.count - a.count // Urutkan berdasarkan `count` dari besar ke kecil
      );

    setProvince(sortedData);
  };

  return (
    <div>
      <CenterLayout className="min-h-[calc(100vh-105px)]">
        <div className="min-h-[calc(100vh-105px)] w-full">
          <div className="rounded-lg mt-10 border h-36 flex items-center divide-x py-5 px-2 divide-gray-200 gap w-full bg-white">
            {fakeData.map(({ id, value }) => {
              return (
                <div className="px-8 flex-1 h-full flex flex-col justify-between items-start">
                  <h3 className="text-sm font-semibold">{id}</h3>
                  <span className="text-4xl font-medium">{value}</span>{' '}
                </div>
              );
            })}
          </div>

          <div className="w-full flex sm:flex-row flex-col mt-5">
            <div className="w-full sm:w-3/5 p-2">
              <div className="bg-white rounded-md p-3 border border-input">
                <GeoMaps data={data} />
              </div>
            </div>
            <div className="w-full sm:w-2/5 p-2">
              <div className="bg-white rounded-md p-3 border border-input max-h-[27%] overflow-y-auto">
                <div className="overflow-x-auto">
                  <table className="table ">
                    <thead className="top-0 sticky">
                      <tr>
                        <th>Provinsi</th>
                        <th>Total Anggota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {province?.map((value: any, index: number) => (
                        <tr key={index}>
                          <td>{value?.name}</td>
                          <td>{value?.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full flex sm:flex-row flex-col mt-5">
            <div className="w-full sm:w-3/5 p-2">
              <div className="bg-white rounded-md p-3 border border-input">
                <LineChart />
              </div>
            </div>
            <div className="w-full sm:w-2/5 p-2">
              <div className="bg-white rounded-md p-3 border border-input"></div>
            </div>
          </div> */}
        </div>
      </CenterLayout>
    </div>
  );
};

export default DashboardAdmin;
