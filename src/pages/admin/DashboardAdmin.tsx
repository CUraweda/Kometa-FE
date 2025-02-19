import GeoMaps from '@/components/ui/geoMaps';
import CenterLayout from '@/layout/center.layout';
import { dashboarRest } from '@/middleware/Rest';
import { useEffect, useState } from 'react';

const DashboardAdmin = () => {

  const [data, setData] = useState<[string, number][]>([]);
  const [province, setProvince] = useState<[]>([]);
  const [statistic, setStatistic] = useState<any>({});

  useEffect(() => {
    getData();
    getDataProvonce();
    getDataStatistic()
  }, []);

  const getData = async () => {
    const response = await dashboarRest.codeProvince();
    setData(response.data.data);
  };
  const getDataStatistic = async () => {
    const response = await dashboarRest.dataStatistik();
    setStatistic(response.data.data);
  };
  const getDataProvonce = async () => {
    const response = await dashboarRest.codeDataProvince();

    const sortedData = (response.data.data || []).sort(
      (a: any, b: any) => b.count - a.count // Urutkan berdasarkan `count` dari besar ke kecil
    );

    setProvince(sortedData);
  };

  return (
    <div>
      <CenterLayout className="min-h-[calc(100vh-105px)] justify-start items-start">
        <div className=" w-full">
          <div className="card mb-5 h-44 border-l-[5px] border-green-700 bg-white shadow p-5 gap-2">
            <p className='text-3xl font-semibold text-green-700'>Welcome to Kometa Super Apps</p>
            <p className='text-md'>Aplikasi monitoring & pendataan anggota Koperasi Modern Teknologi Nusantara ( Kometa )</p>
          </div>
          <div className='w-full flex-col sm:flex-row flex'>
            <div className='w-full sm:w-1/3'>

              <div className='card-custom card mb-5 h-32 w-full border-l-[5px] border-blue-700 bg-white shadow p-5 flex flex-col gap-2'>
                <h3 className="text-xl font-semibold text-blue-500">
                  Total Anggota
                </h3>
                <div className="flex gap-3 items-end">
                  <span className="text-4xl font-bold ">{statistic?.member}</span>
                  <span className="text-sm font-medium">Anggota</span>
                </div>
              </div>
            </div>
            <div className='w-full sm:w-1/3 px-0 sm:px-3'>

              <div className='card-custom card mb-5 h-32 w-full border-l-[5px] border-orange-500 bg-white shadow p-5 flex flex-col gap-2'>
                <h3 className="text-xl font-semibold text-orange-500">Total Lahan</h3>
                <div className="flex gap-3 items-end">
                  <span className="text-4xl font-bold ">{statistic?.land}</span>
                  <span className="text-sm font-medium">Lahan</span>
                </div>
              </div>
            </div>
            <div className='w-full sm:w-1/3'>

              <div className='card-custom card mb-5 h-32 w-full border-l-[5px] border-green-700 bg-white shadow p-5 flex flex-col gap-2'>
                <h3 className="text-xl font-semibold text-green-500">Total Budidaya</h3>
                <div className="flex gap-3 items-end">
                  <span className="text-4xl font-bold ">{statistic?.culvitation}</span>
                  <span className="text-sm font-medium">Budidaya</span>
                </div>
              </div>
            </div>

          </div>


          <div className="w-full flex sm:flex-row flex-col">
            <div className="w-full sm:w-3/5 p-2">
              <div className="bg-white rounded-md p-3 border border-input">
                <GeoMaps data={data} />
              </div>
            </div>
            <div className="w-full sm:w-2/5 p-2">
              <div className="bg-white rounded-md p-3 border border-input w-full">
                <div className="max-h-96 w-full overflow-y-auto">
                  <table className="table border-collapse w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr>
                        <th className="px-4 py-2 text-left border-b" scope="col">Provinsi</th>
                        <th className="px-4 py-2 text-left border-b" scope="col">Total Anggota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {province?.map((value: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-4 py-2 border-b">{value?.name}</td>
                          <td className="px-4 py-2 border-b">{value?.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

        </div>
      </CenterLayout>
    </div>
  );
};

export default DashboardAdmin;
