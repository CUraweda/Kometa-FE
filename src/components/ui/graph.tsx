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
      <ResponsiveContainer className="-ml-5" width="100%" height="100%" aspect={2}>
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
          <Tooltip />
          <Line
            type="monotone"
            dataKey="simpanan"
            stroke="#0E8388"
          />
          <Line type="monotone" dataKey="lahan" stroke="#305986" />
          <Line type="monotone" dataKey="kolam" stroke="#FDB034" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
