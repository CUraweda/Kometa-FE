import { landType, statusType } from "@/constant/form/land.data";
import { LuPenLine, LuTrash2 } from "react-icons/lu";
import Badge from "../ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { LandData } from "@/middleware/Utils";

function LandCard(data: LandData) {
  const ownerShip = data?.ownershipStatus == "Kontrak/Sewa" ? 'sewa': data?.ownershipStatus
  const status = data?.status
  const land = landType[ownerShip.toLocaleLowerCase() as keyof typeof landType];
  const Status = statusType[status.toLocaleLowerCase() as keyof typeof statusType]


  const location = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className="min-w-[calc(100%/3)] ">
      <div
        onClick={() => navigate(`${location}/detail?id=${data.id}&type=user`)}
        className="border border-input p-5 rounded-lg hover:cursor-pointer hover:border-emeraldGreen"
      >
        <div className="flex justify-between">
          <p className="flex items-baseline text-xl font-medium">
            {data.wideArea}
            <p className="ml-1 text-sm text-gray-600 font-light">Ha</p>
          </p>
          <div className="flex gap-2">

          <Badge color={land?.dark} background={land?.light} label={land?.label} />
          <Badge color={Status?.dark} background={Status?.light} label={Status.label} />
          </div>
        </div>
        <div className="flex flex-col gap-1 py-5">
          <h3 className="font-medium">{data.ownerFullName}</h3>
          <p className="text-sm line-clamp-1">{data.landAddress}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">{data.landCondition}</p>
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
