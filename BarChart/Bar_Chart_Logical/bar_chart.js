import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useMemo } from "react";

import colors from "src/constants/color.js";
import Svg, { Line, G, Text as SvgText, Rect } from "react-native-svg";

const Bar_Chart = () => {
  const containerHeight = 250;
  const containerMarginLeft = 50;
  const containerMarginRight = 20;
  const containerPaddingTop = 10;
  const containerMarginBottom = 40;
  const containerWidth = window_width;
  const axisStroke = "2";
  const axisColor = "rgba(0,0,0,.2)";

  const x_axis_x1 = containerMarginLeft;
  const x_axis_y1 = containerHeight - containerMarginBottom;
  const x_axis_x2 = containerWidth - containerMarginRight;
  const x_axis_y2 = containerHeight - containerMarginBottom;

  const y1_axis_x1 = x_axis_x1;
  const y1_axis_y1 = containerPaddingTop;
  const y1_axis_x2 = x_axis_x1;
  const y1_axis_y2 = x_axis_y2;

  const y2_axis_x1 = x_axis_x2;
  const y2_axis_y1 = y1_axis_y1;
  const y2_axis_x2 = x_axis_x2;
  const y2_axis_y2 = y1_axis_y2;

  const x_axis_width = x_axis_x2 - x_axis_x1;
  const y_axis_height = y1_axis_y2 - y1_axis_y1;

  const x_labels_container_horizontal_margin = 35;
  const bars_container_horizontal_margin = 30;
  const bars_padding_left = 38;
  const rightPaddingYLabels = 8;

  const max_val = useMemo(() => {
    let vv = 0;
    for (let i = 0; i < data.length; i++) {
      vv = Math.max(vv, data[i].sales);
    }
    return vv;
  }, [data]);

  const RenderY1axis = () => (
    <G key="y1-axis">
      <Line
        x1={y1_axis_x1}
        y1={y1_axis_y1}
        x2={y1_axis_x2}
        y2={y1_axis_y2}
        stroke={axisColor}
        strokeWidth={axisStroke}
      />
    </G>
  );

  const RenderY2axis = () => (
    <G key="y2-axis">
      <Line
        x1={y2_axis_x1}
        y1={y2_axis_y1}
        x2={y2_axis_x2}
        y2={y2_axis_y2}
        stroke={axisColor}
        strokeWidth={axisStroke}
      />
    </G>
  );

  const RenderXaxis = () => (
    <G key="x-axis">
      <Line
        x1={x_axis_x1}
        y1={x_axis_y1}
        x2={x_axis_x2}
        y2={x_axis_y2}
        stroke={axisColor}
        strokeWidth={axisStroke}
      />
      <SvgText
        x={x_axis_x1 - rightPaddingYLabels - 8}
        y={x_axis_y1 + 2}
        fill={colors.lightBlack}
        fontSize={12}
        fontFamily="Noto Sans Devanagari"
      >
        {0}
      </SvgText>
    </G>
  );

  // const RenderXLabels = () => {
  //   let gap_between_x_axis_labels = x_axis_width / (data.length + 1);

  //   gap_between_x_axis_labels += x_labels_container_horizontal_margin;

  //   return data.map((item, index) => {
  //     const x_label_dist = gap_between_x_axis_labels * index;
  //     console.log(index);
  //     return (
  //       <G key={`x-axis-labels ${index}`}>
  //         <SvgText
  //           x={x_label_dist + 15}
  //           y={x_axis_y1 + 20}
  //           fontSize={13}
  //           fill="black">
  //           {item?.month}
  //         </SvgText>
  //       </G>
  //     );
  //   });
  // };

  const RenderBars = () => {
    const len = data.length;
    const bars_container_width =
      x_axis_width - 2 * bars_container_horizontal_margin;
    const barWidth =
      (bars_container_width - bars_padding_left * (len - 1)) / len;

    return data.map((item, index) => {
      const bar_x =
        x_axis_x1 +
        bars_container_horizontal_margin +
        index * (barWidth + bars_padding_left);
      const bar_y = x_axis_y1;

      const val = (item?.sales / max_val) * (y_axis_height - 40); //scaling the value

      return (
        <G key={`x-axis-bars ${index}`}>
          <SvgText
            x={bar_x + 10}
            y={y_axis_height - val}
            textAnchor="start"
            fontSize={12}
            fill={colors.lightBlack}
          >
            {item?.sales}
          </SvgText>
          <Rect
            x={bar_x}
            y={bar_y}
            width={barWidth}
            height={-val}
            fill="rgba(0, 171, 89, 0.5)"
          />
          <SvgText
            x={bar_x + 10}
            y={bar_y + 20}
            fill={colors.lightBlack}
            fontSize={12}
            fontFamily="Noto Sans Devanagari"
          >
            {item?.month}
          </SvgText>
        </G>
      );
    });
  };

  const RenderYLabels = () => {
    let temp = max_val;
    let Ymax = 1;
    while (temp) {
      temp = parseInt(temp / 10);
      Ymax *= 10;
    }

    let Ymin_ratio = 0.5;

    Ymax =
      max_val > Ymax >> 1
        ? Ymax
        : max_val == Ymax >> 1
        ? (Ymax >> 1) + Ymax / 10
        : Ymax >> 1;
    const Ymin = Ymax * Ymin_ratio;
    const Ymin_y1_axis = y_axis_height * (1 - Ymin_ratio) + y1_axis_y1;

    return (
      <>
        <G key={"y1_label"}>
          <SvgText
            x={y1_axis_x1 - rightPaddingYLabels}
            y={y1_axis_y1 + 5}
            fill={colors.lightBlack}
            textAnchor="end"
            fontSize={12}
            fontFamily="Noto Sans Devanagari"
          >
            {Ymax}
          </SvgText>

          <Line
            x1={y1_axis_x1}
            y1={y1_axis_y1}
            x2={y2_axis_x1}
            y2={y2_axis_y1}
            stroke={axisColor}
            strokeWidth={axisStroke - 1}
            strokeDasharray="1"
          />
          <SvgText
            x={y1_axis_x1 - rightPaddingYLabels}
            y={Ymin_y1_axis + 5}
            fill={colors.lightBlack}
            textAnchor="end"
            fontSize={12}
            fontFamily="Noto Sans Devanagari"
          >
            {Ymin}
          </SvgText>
          <Line
            x1={y1_axis_x1}
            y1={Ymin_y1_axis}
            x2={y2_axis_x1}
            y2={Ymin_y1_axis}
            stroke={axisColor}
            strokeWidth={axisStroke - 1}
            strokeDasharray="1"
          />
        </G>
      </>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <Text style={styles.title}>Last3MonthsSales</Text>

        <Svg
          height={containerHeight}
          width="100%"
          style={styles.svgContainer}
          preserveAspectRatio="xMidYMax meet"
        >
          {RenderXaxis()}
          {RenderY1axis()}
          {RenderY2axis()}
          {RenderBars()}
          {RenderYLabels()}
        </Svg>
      </View>
    </>
  );
};

export default Bar_Chart;

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    backgroundColor: "aqua",
    height: 500,
    marginVertical: 30,
    paddingTop: 16,
  },
  title: {
    color: colors.mediumBlack,
    fontFamily: "Noto Sans Devanagari",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 25,
  },
  svgContainer: {
    backgroundColor: "white",
  },
});
/////////////////////////////////////////////////////////////////////////////
