import CenterLayout from '@/layout/center.layout'
import React from 'react'
import Anggota from './Anggota'
import InformasiAnggota from './InformasiAnggota'

const DetailAnggota = () => {
    return (
        <CenterLayout className="min-h-[calc(100vh-105px)]">
            <div className=' w-full min-h-[calc(100vh-105px)] flex flex-col'>
                <span className='text-xl'>Detail Anggota</span>
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>Anggota</a></li>
                        <li>Detail Anggota</li>
                    </ul>
                </div>
                <div className='w-full mt-10 top-0 sticky'>

                    <div role="tablist" className="tabs tabs-bordered">
                        <input type="radio" name="my_tabs_1" role="tab" className="tab " aria-label="Informasi" defaultChecked />
                        <div role="tabpanel" className="tab-content p-10">
                            <InformasiAnggota/>
                        </div>

                        <input
                            type="radio"
                            name="my_tabs_1"
                            role="tab"
                            className="tab"
                            aria-label="Lahan"
                        />
                        <div role="tabpanel" className="tab-content p-10">Tab content 2</div>

                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Budidaya" />
                        <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
                    </div>
                </div>
            </div>
        </CenterLayout>

    )
}

export default DetailAnggota