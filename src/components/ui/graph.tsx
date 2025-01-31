import { capitalize } from "@/utils/string";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: Array<{
    name: string;
    simpanan: number;
    lahan: number;
    kolam: number;
  }>;
};

function Graph({ data }: Props) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer
        className="-ml-5"
        width="100%"
        height="100%"
        aspect={2}
      >
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={10} strokeOpacity={0} />
          <YAxis fontSize={10} strokeOpacity={0} />
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={(e) => {
              return (
                <div className="rounded-lg p-3 flex flex-col gap-1 bg-white border border-neutral-200">
                  {e.payload?.map((item) => {
                    console.log(item);
                    return (
                      <label className="text-xs">
                        <span
                          className="border-l-4 pl-2"
                          style={{ borderColor: item.color }}
                        >
                          {item.name ? capitalize(String(item.name), 0) : ""}:
                        </span>
                        <span className="ml-1">{item.value}</span>
                      </label>
                    );
                  })}
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="simpanan"
            label="Simpanan"
            stroke="#0E8388"
          />
          <Line
            type="monotone"
            dataKey="lahan"
            label="Lahan"
            stroke="#305986"
          />
          <Line
            type="monotone"
            dataKey="kolam"
            label="Kolam"
            stroke="#FDB034"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
