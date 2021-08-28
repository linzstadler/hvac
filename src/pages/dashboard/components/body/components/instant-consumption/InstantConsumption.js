import * as React from "react";
import style from './InstantConsumption.module.sass'
/* Imports */
import { useHistory } from "react-router-dom";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Divider} from "antd";
import getDate from "../../../../../../shared/utils/date";
import {useEffect, useState} from "react";
import ReportService from "../../services/ReportService";


/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end



const InstantConsumption = () => {
    const history = useHistory();
    const [power, setPower] = useState(0)
    useEffect(() => {

// create chart
        let chart = am4core.create("instantConsumptionChart", am4charts.GaugeChart);
        chart.rtl = true;
        chart.innerRadius = am4core.percent(82);

        /**
         * Normal axis
         */

        let axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = 0;
        axis.max = 100;
        axis.strictMinMax = true;
        axis.renderer.radius = am4core.percent(80);
        axis.renderer.inside = true;
        axis.renderer.line.strokeOpacity = 1;
        axis.renderer.ticks.template.disabled = false
        axis.renderer.ticks.template.strokeOpacity = 1;
        axis.renderer.ticks.template.length = 10;
        axis.renderer.fontSize = 10;
        axis.renderer.grid.template.disabled = true;
        axis.renderer.labels.template.radius = 40;
        axis.renderer.labels.template.adapter.add("text", function (text) {
            return text + "%";
        })

        /**
         * Axis for ranges
         */

        let colorSet = new am4core.ColorSet();

        let axis2 = chart.xAxes.push(new am4charts.ValueAxis());
        axis2.min = 0;
        axis2.max = 100;
        axis2.strictMinMax = true;
        axis2.renderer.labels.template.disabled = true;
        axis2.renderer.ticks.template.disabled = true;
        axis2.renderer.grid.template.disabled = true;

        let range0 = axis2.axisRanges.create();
        range0.value = 0;
        range0.endValue = 50;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = colorSet.getIndex(0);

        let range1 = axis2.axisRanges.create();
        range1.value = 50;
        range1.endValue = 100;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = colorSet.getIndex(2);

        /**
         * Label
         */

        let label = chart.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = 30;
        label.x = am4core.percent(50);
        label.y = am4core.percent(100);
        label.horizontalCenter = "middle";
        label.verticalCenter = "bottom";
        label.text = "50%";


        /**
         * Hand
         */

        let hand = chart.hands.push(new am4charts.ClockHand());
        hand.axis = axis2;
        hand.innerRadius = am4core.percent(20);
        hand.startWidth = 10;
        hand.pin.disabled = true;
        hand.value = 0;

        hand.events.on("propertychanged", function (ev) {
            range0.endValue = ev.target.value;
            range1.value = ev.target.value;
            label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
            axis2.invalidate();
        });
        ReportService.getSumOfPower(history).then(
            response => {
                if(response) {
                    const result = response.data.SumPower === 0 ? 0 : ((response.data.SumPower * 100) / (response.data.NumbersOfActiveDevices * 32000))
                    let animation = new am4core.Animation(hand, {
                        property: "value",
                        to: result
                    }, 1000, am4core.ease.cubicOut).start();
                    setPower(result)
                }
            },
            error => {
                console.log(error)
            }
        );
    }, []);
    return (
        <>
            <div className={style.instantConsumption}>
                <div className="white_container">
                    <div className="container_head text_right">
                        <h3>مصرف لحظه ای</h3>

                    </div>
                    <Divider/>
                    <div className={style.chartArea}>
                        <div id="instantConsumptionChart" className={style.instantConsumptionChart}></div>
                        <div>
                             مصرف لحظه ای: {power.toFixed(2)}%
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default InstantConsumption;
