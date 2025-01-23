import CenterLayout from '@/layout/center.layout'
import { CiSearch, CiTrash } from "react-icons/ci";
import { AiOutlineExpandAlt } from "react-icons/ai";
import ModalDetail, { openModal } from '@/components/ui/ModalDetail';
import { IoCheckboxOutline } from "react-icons/io5";
import { FaRegWindowClose } from "react-icons/fa";

const LahanBaru = () => {
    const fakeData = [
        { id: "SHM", value: "124.32" },
        { id: "Girik", value: "124.32" },
        { id: "Kontrak/ Sewa", value: "124.32" },
       
    ];

    const handleOpenModal = (props: string) => {
        openModal(props);
    }
    return (
        <div>
            <CenterLayout className="min-h-[calc(100vh-105px)]">
                <div className=' w-full min-h-[calc(100vh-105px)] flex flex-col'>
                    <span className='text-xl'>Lahan Baru</span>
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
                        <select className="select select-bordered">
                            <option disabled selected>Pick one</option>
                            <option>Star Wars</option>
                            <option>Harry Potter</option>
                            <option>Lord of the Rings</option>
                            <option>Planet of the Apes</option>
                            <option>Star Trek</option>
                        </select>
                        
                    </div>

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
                                        <th>Pembayaran</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>21-01-2022, 14:00:00</td>

                                        <td>Joko Susilo</td>
                                        <td>02930234707</td>
                                        <td>asjndas@gmail.com</td>
                                        <td>asjndas@gmail.com</td>

                                        <td><span className='text-red-600'>Belum Lunas</span></td>
                                        <td>
                                            <div className='w-full flex justify-center'>

                                                <button className='text-xl btn btn-xs btn-ghost text-green-500' onClick={() => handleOpenModal('detail-pendapatan')}>
                                                    <IoCheckboxOutline />
                                                </button>
                                                <button className='text-xl btn btn-xs btn-ghost text-red-500' onClick={() => handleOpenModal('reject-pendapatan')}>
                                                    <FaRegWindowClose />
                                                </button>
                                                <button className='text-xl btn btn-xs btn-ghost' onClick={() => handleOpenModal('detail-pendapatan')}>
                                                    <AiOutlineExpandAlt />
                                                </button>
                                                <button className='text-xl btn btn-xs btn-ghost text-red-500' onClick={() => handleOpenModal('detail-pendapatan')}>
                                                    <CiTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </CenterLayout>

            <ModalDetail id='reject-pendapatan'>
                <span>Tolak Pendaftaran</span>
                <div className='w-full mt-3'>
                    <textarea className="textarea textarea-bordered w-full" placeholder="Keterangan"></textarea>
                </div>
                <div className='w-full flex justify-end gap-3 mt-5'>
                    <button className='btn btn-outline btn-sm'>Close</button>
                    <button className='btn btn-primary text-white btn-sm'>Kirim</button>
                </div>

            </ModalDetail>
        </div>
    )
}

export default LahanBaru