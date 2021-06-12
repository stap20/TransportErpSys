import React, { useRef } from "react";
import DashboardLayout from "shared/components/layout/dashboard-layout";
import ReactECharts from "echarts-for-react";

const option = {
  title: {
    text: "JS Front End Frameworksسشيشسي",
    x: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["React", "Angular", "Vue"],
  },
  series: [
    {
      name: "JS FrontEnd",
      type: "pie",
      radius: "70%",
      center: ["50%", "60%"],
      data: [
        {
          value: 50,
          name: "React",
        },
        {
          value: 22,
          name: "Angular",
        },
        {
          value: 28,
          name: "Vue",
        },
      ],
      selectedMode: true, //by default it's single
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

export default function Users(props) {
  const instance = useRef(null);
  return (
    <DashboardLayout params={props.params}>
        <ReactECharts ref={instance} option={option} style={{ height: 400 }} />
    </DashboardLayout>
  );
}
