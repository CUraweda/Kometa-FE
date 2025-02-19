import Input from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const FoodForm = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <form action="submit">
        <h3 className="mt-8 mb-3 font-bold">Penggunaan Pakan Per Kolam</h3>
        {/* kode pakan */}
        <h4 className="font-semibold mt-7">Kode Pakan</h4>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 1 Rentang DOC</p>
          <Input type="text" placeholder="Awal" />
          <Input type="text" placeholder="Akhir" />
          <Input type="text" placeholder="Keterangan" />
        </div>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 2 Rentang DOC</p>
          <Input type="text" placeholder="Awal" />
          <Input type="text" placeholder="Akhir" />
          <Input type="text" placeholder="Keterangan" />
        </div>

        {/* jenis pakan */}
        <h4 className="font-semibold mt-7">Jenis Pakan</h4>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 1 Rentang DOC</p>
          <Input type="text" placeholder="Awal" />
          <Input type="text" placeholder="Akhir" />
          <Input type="text" placeholder="Keterangan" />
        </div>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 2 Rentang DOC</p>
          <Input type="text" placeholder="Awal" />
          <Input type="text" placeholder="Akhir" />
          <Input type="text" placeholder="Keterangan" />
        </div>

        {/* merk pakan */}
        <h4 className="font-semibold mt-7">Merk Pakan</h4>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 1 Rentang DOC</p>
          <Input type="text" placeholder="Awal" />
          <Input type="text" placeholder="Akhir" />
          <Input type="text" placeholder="Keterangan" />
        </div>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 2 Rentang DOC</p>
          <Input type="text" placeholder="Awal" />
          <Input type="text" placeholder="Akhir" />
          <Input type="text" placeholder="Keterangan" />
        </div>

        {/* ukuran pakan */}
        <h4 className="font-semibold mt-7">Ukuran Pakan</h4>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 1 Rentang DOC</p>
          <Input type="text" placeholder="Awal" uom="mm" />
          <Input type="text" placeholder="Akhir" uom="mm" />
          <Input type="text" placeholder="Keterangan" />
        </div>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 2 Rentang DOC</p>
          <Input type="text" placeholder="Awal" uom="mm" />
          <Input type="text" placeholder="Akhir" uom="mm" />
          <Input type="text" placeholder="Keterangan" />
        </div>

        {/* berat pakan */}
        <h4 className="font-semibold mt-7">Berat Pakan</h4>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 1 Rentang DOC</p>
          <Input type="text" placeholder="Awal" uom="Kg / 1 Sak" />
          <Input type="text" placeholder="Akhir" uom="Kg / 1 Sak" />
          <Input type="text" placeholder="Keterangan" />
        </div>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 2 Rentang DOC</p>
          <Input type="text" placeholder="Awal" uom="Kg / 1 Sak" />
          <Input type="text" placeholder="Akhir" uom="Kg / 1 Sak" />
          <Input type="text" placeholder="Keterangan" />
        </div>

        {/* harga pakan */}
        <h4 className="font-semibold mt-7">Harga Pakan</h4>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 1 Rentang DOC</p>
          <Input type="text" placeholder="Awal" uom="Kg / 1 Sak" />
          <Input type="text" placeholder="Akhir" uom="Kg / 1 Sak" />
          <Input type="text" placeholder="Keterangan" />
        </div>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 2 Rentang DOC</p>
          <Input type="text" placeholder="Awal" uom="Kg / 1 Sak" />
          <Input type="text" placeholder="Akhir" uom="Kg / 1 Sak" />
          <Input type="text" placeholder="Keterangan" />
        </div>

        {/* metode pembelian pakan */}
        <h4 className="font-semibold mt-7">Metode Pembelian Pakan</h4>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 1 Rentang DOC</p>
          <Input type="text" placeholder="Awal" />
          <Input type="text" placeholder="Akhir" />
          <Input type="text" placeholder="Keterangan" />
        </div>
        <div className="grid md:grid-cols-4 items-center gap-4 mt-2">
          <p>Pakan 2 Rentang DOC</p>
          <Input type="text" placeholder="Awal" />
          <Input type="text" placeholder="Akhir" />
          <Input type="text" placeholder="Keterangan" />
        </div>

        {/* button */}
        <div className="space-x-3 mt-7 mb-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/planting/add")}
          >
            Kembali
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;
