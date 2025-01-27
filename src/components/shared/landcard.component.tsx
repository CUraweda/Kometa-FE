import { landType } from "@/constant/form/land.data";
import { LuPenLine, LuTrash2 } from "react-icons/lu";
import Badge from "../ui/badge";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  id: string;
  landArea: number;
  ownershipStatus: string;
  name: string;
  address: string;
  isBuilding: boolean;
};

function LandCard({
  id,
  landArea,
  ownershipStatus,
  name,
  address,
  isBuilding,
}: Props) {
  const land = landType[ownershipStatus as keyof typeof landType];
  const location = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className="min-w-[calc(100%/3)] ">
      <div
        onClick={() => navigate(`${location}/detail?id=${id}`)}
        className="border border-input p-5 rounded-lg hover:cursor-pointer hover:border-emeraldGreen"
      >
        <div className="flex justify-between">
          <p className="flex items-baseline text-xl font-medium">
            {landArea}
            <p className="ml-1 text-sm text-gray-600 font-light">Ha</p>
          </p>
          <Badge color={land.dark} background={land.light} label={land.label} />
        </div>
        <div className="flex flex-col gap-1 py-5">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm">{address}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">{isBuilding ? "Bangunan" : "Kosong"}</p>
          <div className="flex gap-1 text-sm">
            <button className="group btn btn-ghost btn-xs hover:bg-slate-50">
              <LuPenLine
                className="group-hover:stroke-emeraldGreen"
                onClick={() => navigate("/detail-lahan")}
              />
            </button>
            <span className="group btn btn-ghost btn-xs hover:bg-slate-50">
              <LuTrash2 className="group-hover:stroke-red-600" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandCard;
