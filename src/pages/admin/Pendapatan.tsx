import CenterLayout from '@/layout/center.layout'
import { CiSearch } from "react-icons/ci";
import { AiOutlineExpandAlt } from "react-icons/ai";
import ModalDetail, { openModal } from '@/components/ui/ModalDetail';

const Pendapatan = () => {
    const fakeData = [
        { id: "Total Tunggakan", value: "124.32" },
        { id: "Total pendaftaran", value: "564.32" },
        { id: "Total Simpanan Wajib", value: "231.32" },
    ];

    const handleOpenModal = (props: string) => {
        openModal(props);
    }
    return (
        <div>
            <CenterLayout className="min-h-[calc(100vh-105px)]">
                <div className=' w-full min-h-[calc(100vh-105px)] flex flex-col'>
                    <span className='text-xl'>Pendapatan</span>
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
                    <div className='mt-5 w-full flex justify-end gap-3'>
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
                    </div>

                    <div className='w-full bg-white mt-5 shadow-md p-2 rounded-md'>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Status</th>
                                        <th>Nama</th>
                                        <th>Nomor Whatsapp</th>
                                        <th>Email</th>
                                        <th>Total</th>
                                        <th>Pembayaran</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>21-01-2022, 14:00:00</td>
                                        <td><span className='text-green-600'>Simpanan</span></td>
                                        <td>Joko Susilo</td>
                                        <td>02930234707</td>
                                        <td>asjndas@gmail.com</td>
                                        <td>Rp. 100.000</td>
                                        <td>Bank BJB</td>
                                        <td><span className='text-red-600'>Belum Lunas</span></td>
                                        <td>
                                            <span className='text-2xl btn btn-sm btn-ghost' onClick={() => handleOpenModal('detail-pendapatan')}>
                                                <AiOutlineExpandAlt />
                                            </span>
                                        </td>
                                    </tr>

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

export default Pendapatan