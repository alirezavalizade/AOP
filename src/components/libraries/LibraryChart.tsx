import type { LibraryDetailsDto } from "@/api/types";

import LineChart from "@/components/ui/LineChart";

import { useMemo } from "react";
import { getLast7Days } from "@/functions/date";

interface Props {
  data: LibraryDetailsDto;
}

const LibraryChart = ({ data }: Props) => {
  return useMemo(() => {
    const labels = getLast7Days();

    const chartData = {
      labels,
      datasets: [
        {
          fill: true,
          label: "Downloads",
          data: data.downloads_last_seven_days,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    return <LineChart data={chartData} />;
  }, [data.downloads_last_seven_days]);
};

export default LibraryChart;
