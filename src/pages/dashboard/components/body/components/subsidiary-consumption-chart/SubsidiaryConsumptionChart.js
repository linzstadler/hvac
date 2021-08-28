import * as React from "react";
import style from './SubsidiaryConsumptionChart.module.sass'
/* Imports */
import { useHistory } from "react-router-dom";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Divider} from "antd";
import {getDateTimeHalfHour} from "../../../../../../shared/utils/date";
import ReportService from "../../services/ReportService";
import {useEffect} from "react";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

const SubsidiaryConsumptionChart = () => {
    const history = useHistory();
    function generateChart(result) {
        let chart = am4core.create("subsidiaryConsumptionChart", am4charts.XYChart);
        chart.rtl = true;
        chart.data = result;

        chart.paddingRight = 20;


        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "date";

        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 37;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.labels.template.rotation = -60;
        categoryAxis.renderer.minHeight = 40;
        // categoryAxis.title.text = "زمان";
        categoryAxis.title.fontWeight = "bold";
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.title.text = "W/h";
        valueAxis.title.fontWeight = "bold";

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX = "date";
        series.name = "میزان مصرف روز جاری بر حسب وات";
        series.dataFields.valueY = "today";
        series.tooltipText = "امروز: [bold]{valueY}[/]";
        series.fillOpacity = 0.3;
        series.stroke = "#028692";
        series.fill = "#028692"

        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.categoryX = "date";
        series2.name = "میزان مصرف روز گذشته بر حسب وات";
        series2.dataFields.valueY = "yesterday";
        series2.tooltipText = "دیروز: [bold]{valueY}[/]";
        series2.fillOpacity = 0.3;
        series2.stroke = "#c99300";
        series2.fill = "#c99300"


        chart.legend = new am4charts.Legend();

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = categoryAxis;

    }

    function getYesterdayData(result) {
        let dateTime = getDateTimeHalfHour()
        dateTime.day = dateTime.day - 1
        ReportService.getPowerConsumtionOidThirtyMin(dateTime, history).then(
            response => {
                if(response) {
                    response.data.map((item, index) => {
                        result[index]['yesterday'] = 0
                    });
                    generateChart(result)
                }
            },
            error => {
                console.log(error)
            }
        );

    }

    useEffect(() => {
        const dateTime = getDateTimeHalfHour()
        ReportService.getPowerConsumtionOidThirtyMin(dateTime, history).then(
            response => {
                if(response) {
                    let hh = 0;
                    let mm = -5;
                    let i = 0;
                    const result = response.data.map((item, index) => {
                        if (mm === 55) {
                            mm = 0;
                            i = i + 1;
                            hh = i;
                        } else {
                            mm = mm + 5;
                        }
                        return {
                            date: hh + ':' + mm,
                            today: item
                        }
                    });
                    getYesterdayData(result)
                }
            },
            error => {
                console.log(error)
            }
        );
    }, []);
    return (
        <>
            <div className={style.subsidiaryConsumption}>
                <div className="white_container">
                    <div className="container_head text_right">
                        <h3>نمودار مصرف دستگاه های اجرایی استان</h3>

                    </div>
                    <Divider />
                    <div className={style.chartArea}>
                        <div id="subsidiaryConsumptionChart" className={style.subsidiaryConsumptionChart}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubsidiaryConsumptionChart;
