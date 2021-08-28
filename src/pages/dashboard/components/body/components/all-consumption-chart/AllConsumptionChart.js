import * as React from "react";
import style from './AllConsumptionChart.module.sass'
/* Imports */
import { useHistory } from "react-router-dom";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Divider} from "antd";
import {useEffect} from "react";
import ReportService from "../../services/ReportService";
import moment from "jalali-moment";
import {getDateTimeHalfHour} from "../../../../../../shared/utils/date";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


const AllConsumptionChart = () => {
    const history = useHistory();
    function generateChart(result) {
        let chart = am4core.create("allConsumptionChart", am4charts.XYChart);
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
    function generateChartData() {
        let chartData = [];
        // current date
        let firstDate = new Date();
        // now set 500 minutes back
        firstDate.setMinutes(firstDate.getDate() - 500);

        // and generate 500 data items
        let visits = 500;
        for (var i = 0; i < 500; i++) {
            let newDate = new Date(firstDate);
            // each time we add one minute
            newDate.setMinutes(newDate.getMinutes() + i);
            // some random number
            visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
            // add data item to the array
            chartData.push({
                date: newDate,
                visits: visits
            });
        }
        return chartData;
    }

    function getYesterdayData(result) {
        let dateTime = getDateTimeHalfHour()
        dateTime.day = dateTime.day - 1
        ReportService.getPowerConsumtionOidThirtyMin(dateTime, history).then(
            response => {
                if(response) {
                    response.data.map((item, index) => {
                        result[index]['yesterday'] = item
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
                        // i = i + 1;

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
                    console.log(result)
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
            <div className={style.allConsumption}>

                <div className="white_container">
                    <div className="container_head text_right">
                        <h3>نمودار مصرف انرژی کل امور</h3>

                    </div>
                    <Divider/>
                    <div className={style.chartArea}>
                        <div id="allConsumptionChart" className={style.allConsumptionChart}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllConsumptionChart;
