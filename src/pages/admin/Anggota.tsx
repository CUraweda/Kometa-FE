import CenterLayout from '@/layout/center.layout'
// import { CiSearch } from "react-icons/ci";
import { AiOutlineExpandAlt } from "react-icons/ai";
import ModalDetail from '@/components/ui/ModalDetail';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberRest } from '@/middleware';
import { Member } from '@/middleware/Utils';
import { formatDate } from '@/utils/date';
import { listedAdmin } from '@/constant/routers/listed';

const Anggota = () => {
    const [data, setData] = useState<any>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const payload = 'limit=10&page=1';
        const response = await memberRest.getAll(payload);

        if (response.data && response.data.data.items) {
            const filteredItems = response.data.data.items.filter((item: Member) => item.isVerified);
            setData(filteredItems);
        }
    };


    const handleDetailAnggota = (props: string) => {
            const params = new URLSearchParams({
                id: props,
                type:'member'
            });
            
            navigate(`${listedAdmin.detailAnggota}?${params.toString()}`);
        }
    

    return (
        <div>
            <CenterLayout className="min-h-[calc(100vh-105px)]">
                <div className=' w-full min-h-[calc(100vh-105px)] flex flex-col'>
                    <span className='text-xl font-bold'>Anggota Kometa</span>

                    {/* <div className='mt-5 w-full flex justify-end gap-3'>
                        <label className="input input-bordered flex items-center gap-2 ">
                            <CiSearch />
                            <input type="text" className="grow" placeholder="Email" />
                        </label>
                        <select className="select select-bordered">
                            <option disabled selected>Pick one</option>
                            <option>Star Wars</option>
                            <option>Harry Potter</option>
                            <option>Lord of the Rings</option>
                            <option>Planet of the Apes</option>
                            <option>Star Trek</option>
                        </select>
                        <label className="input input-bordered flex items-center gap-2 ">

                            <input type="date" className="grow" placeholder="Email" />
                        </label>
                    </div> */}

                    <div className='w-full bg-white mt-5 shadow-md p-2 rounded-md'>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Tanggal Pendaftaran</th>
                                        <th>Nama</th>
                                        <th>Nomor Whatsapp</th>
                                        <th>Email</th>
                                        <th>Anggota</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.map((value: Member, index: number) => (
                                            <tr key={index}>
                                                <td>{formatDate(value.createdAt)}</td>
                                                <td>{value?.fullName}</td>
                                                <td>{value?.user.phoneWA}</td>
                                                <td>{value?.user.email}</td>

                                                <td>
                                                    <span style={{ backgroundColor: value.membershipType.backgroundColor, color: value.membershipType.foregroundColor, padding: '5px', borderRadius: '5px' }}>
                                                        {value?.membershipType.name}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className='w-full flex justify-center'>

                                                        {/* <button className='text-2xl btn btn-sm btn-ghost text-orange-500' onClick={() => handleOpenModal('detail-pendapatan')}>
                                                            <LuPencilLine />
                                                        </button> */}
                                                        <button className='text-xl btn btn-xs btn-ghost' onClick={() => handleDetailAnggota(value.id)}>
                                                            <AiOutlineExpandAlt />
                                                        </button>
                                                        {/* <button className='text-2xl btn btn-sm btn-ghost text-red-500' onClick={() => handleOpenModal('detail-pendapatan')}>
                                                            <CiTrash />
                                                        </button> */}
                                                    </div>
                                                </td>
                                            </tr>

                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </CenterLayout>

            <ModalDetail id='detail-pendapatan'>
                <span>Detail</span>
                <div className='w-full flex mt-5 flex-col'>
                    <span className='font-bold'>Detail Transaksi</span>
                    <table className='table table-sm'>
                        <tr className=''>
                            <td>Total</td>
                            <td>:</td>
                            <td>Rp. 100.000</td>
                        </tr>
                        <tr className=''>
                            <td>Pembayaran</td>
                            <td>:</td>
                            <td>Bank BJB</td>
                        </tr>
                        <tr className=''>
                            <td>Status</td>
                            <td>:</td>
                            <td>Pending</td>
                        </tr>

                    </table>
                </div>
                <div className='w-full flex mt-5 flex-col'>
                    <span className='font-bold'>Informasi</span>
                    <table className='table table-sm'>
                        <tr className=''>
                            <td>Tanggal</td>
                            <td>:</td>
                            <td>Rp. 100.000</td>
                        </tr>
                        <tr className=''>
                            <td>Keterangan</td>
                            <td>:</td>
                            <td>Bank BJB</td>
                        </tr>
                        <tr className=''>
                            <td>Whatsapp</td>
                            <td>:</td>
                            <td>Pending</td>
                        </tr>
                        <tr className=''>
                            <td>Email</td>
                            <td>:</td>
                            <td>Pending</td>
                        </tr>

                    </table>
                </div>

            </ModalDetail>
        </div>
    )
}

export default Anggota