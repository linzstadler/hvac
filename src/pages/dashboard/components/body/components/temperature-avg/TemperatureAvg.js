import * as React from "react";
import style from './TemperatureAvg.module.sass'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Divider} from "antd";
import {useEffect} from "react";
import ReportService from './../../services/ReportService'
import { useHistory } from "react-router-dom";
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

let chartMin = -10;
let chartMax = 50;


let data = {
    score: 0,
    gradingData: [
        {
            title: "خیلی سرد",
            color: "#1fa6ee",
            lowScore: -10,
            highScore: 0
        },
        {
            title: "سرد",
            color: "#65c5fa",
            lowScore: 0,
            highScore: 15
        },
        {
            title: "مطلوب",
            color: "#54b947",
            lowScore: 15,
            highScore: 20
        },
        {
            title: "مطلوب",
            color: "#8ee283",
            lowScore: 20,
            highScore: 25
        },
        {
            title: "گرم",
            color: "#ffe323",
            lowScore: 25,
            highScore: 30
        },
        {
            title: "گرم",
            color: "#ffa62a",
            lowScore: 30,
            highScore: 40
        },
        {
            title: "خیلی گرم",
            color: "#dc1515",
            lowScore: 40,
            highScore: 50
        }
    ]
};

/**
 Grading Lookup
 */
function lookUpGrade(lookupScore, grades) {
    // Only change code below this line
    for (var i = 0; i < grades.length; i++) {
        if (
            grades[i].lowScore < lookupScore &&
            grades[i].highScore >= lookupScore
        ) {
            return grades[i];
        }
    }
    return null;
}



const TemperatureAvg = () => {
    const history = useHistory();
    useEffect(() => {

        // create chart
        let chart = am4core.create("temperatureAvgChart", am4charts.GaugeChart);
        chart.rtl = true;
        chart.hiddenState.properties.opacity = 0;
        chart.fontSize = 6;
        chart.innerRadius = am4core.percent(80);
        chart.resizable = true;

        /**
         * Normal axis
         */

        let axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = chartMin;
        axis.max = chartMax;
        axis.strictMinMax = true;
        axis.renderer.radius = am4core.percent(80);
        axis.renderer.inside = true;
        axis.renderer.line.strokeOpacity = 0.1;
        axis.renderer.ticks.template.disabled = false;
        axis.renderer.ticks.template.strokeOpacity = 1;
        axis.renderer.ticks.template.strokeWidth = 0.5;
        axis.renderer.ticks.template.length = 5;
        axis.renderer.fontSize = 10;
        axis.renderer.grid.template.disabled = true;
        axis.renderer.labels.template.radius = am4core.percent(15);
        axis.renderer.labels.template.fontSize = "0.9em";

        /**
         * Axis for ranges
         */

        let axis2 = chart.xAxes.push(new am4charts.ValueAxis());
        axis2.min = chartMin;
        axis2.max = chartMax;
        axis2.strictMinMax = true;
        axis2.renderer.labels.template.disabled = true;
        axis2.renderer.ticks.template.disabled = true;
        axis2.renderer.grid.template.disabled = false;
        axis2.renderer.grid.template.opacity = 0.5;
        axis2.renderer.labels.template.bent = true;
        axis2.renderer.labels.template.fill = am4core.color("#000");
        axis2.renderer.labels.template.fontWeight = "bold";
        axis2.renderer.labels.template.fillOpacity = 0.3;


        /**
         Ranges
         */

        for (let grading of data.gradingData) {
            let range = axis2.axisRanges.create();
            range.axisFill.fill = am4core.color(grading.color);
            range.axisFill.fillOpacity = 0.8;
            range.axisFill.zIndex = -1;
            range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
            range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
            range.grid.strokeOpacity = 0;
            range.stroke = am4core.color(grading.color).lighten(-0.1);
            range.label.inside = true;
            range.label.text = grading.title.toUpperCase();
            range.label.inside = true;
            range.label.location = 0.5;
            range.label.inside = true;
            range.label.radius = am4core.percent(10);
            range.label.paddingBottom = -5; // ~half font size
            range.label.fontSize = "0.9em";
        }

        let matchingGrade = lookUpGrade(data.score, data.gradingData);

        /**
         * Label 1
         */

        let label = chart.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = 30;
        label.x = am4core.percent(50);
        label.paddingBottom = 15;
        label.horizontalCenter = "middle";
        label.verticalCenter = "bottom";
//label.dataItem = data;
        label.text = data.score.toFixed(1);
//label.text = "{score}";
        label.fill = am4core.color(matchingGrade.color);

        /**
         * Label 2
         */

        let label2 = chart.radarContainer.createChild(am4core.Label);
        label2.isMeasured = false;
        label2.fontSize = "2em";
        label2.horizontalCenter = "middle";
        label2.verticalCenter = "bottom";
        label2.text = matchingGrade.title.toUpperCase();
        label2.fill = am4core.color(matchingGrade.color);


        /**
         * Hand
         */

        let hand = chart.hands.push(new am4charts.ClockHand());
        hand.axis = axis2;
        hand.innerRadius = am4core.percent(55);
        hand.startWidth = 8;
        hand.pin.disabled = true;
        hand.value = data.score;
        hand.fill = am4core.color("#444");
        hand.stroke = am4core.color("#000");

        hand.events.on("positionchanged", function () {
            label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
            let value2 = axis.positionToValue(hand.currentPosition);
            let matchingGrade = lookUpGrade(axis.positionToValue(hand.currentPosition), data.gradingData);
            label2.text = matchingGrade.title.toUpperCase();
            label2.fill = am4core.color(matchingGrade.color);
            label2.stroke = am4core.color(matchingGrade.color);
            label.fill = am4core.color(matchingGrade.color);
        })



        ReportService.getMidTemp(history).then(
            response => {
                if(response) {
                    hand.showValue(response.data.MidTemp, 1000, am4core.ease.cubicOut);
                }
            },
            error => {
                console.log(error)
            }
        );
    }, []);
    return (
        <>
            <div className={style.temperatureAvg}>
                <div className="white_container">
                    <div className="container_head text_right">
                        <h3>میانگین دما لحظه ای</h3>

                    </div>
                    <Divider />
                    <div className={style.chartArea}>
                        <div id="temperatureAvgChart" className={style.temperatureAvgChart}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TemperatureAvg;
