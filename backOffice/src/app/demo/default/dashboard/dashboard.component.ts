// angular import
import { Component, OnInit, ViewChild } from '@angular/core';

// project import
import tableData from 'src/fake-data/default-data.json';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from "../../../services/user.service"
// bootstrap import
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// third party
import { NgApexchartsModule } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexGrid,
  ApexLegend
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  // public props
  @ViewChild('chart') chart: ChartComponent;
  chartOptions_4: Partial<ChartOptions>;
  chartOptions_5: Partial<ChartOptions>;
  chartOptions_6: Partial<ChartOptions>;
  // eslint-disable-next-line
  monthChart: any;
  // eslint-disable-next-line
  weekChart: any;
  dashbord: any;
  datacoutReclamationByDate: any = [
    {
      data: [10, 20]
    }
  ]
  dataProduit: any = [
    {
      data: [10, 20]
    }
  ]
  labelcoutReclamationByDate: any = {
    categories: ['2024-9', '2024-8'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  }
  labelcoutProduit: any = {
    categories: ['2024-9', '2024-8'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  }
  // constructor

  constructor(private userService: UserService) {
    this.chartOptions_4 = {
      chart: {
        type: 'bar',
        height: 365,
        toolbar: {
          show: false
        }
      },
      colors: ['#13c2c2'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: true
      },
      series: [
        {
          data: [10, 20]
        }
      ],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: ['2024-8', '2024-8'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      grid: {
        show: false
      }
    };

    this.chartOptions_6 = {
      chart: {
        type: 'bar',
        height: 430,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          borderRadius: 4
        }
      },
      stroke: {
        show: true,
        width: 8,
        colors: ['transparent']
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        show: true,
        fontFamily: `'Public Sans', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 10,
          height: 10,
          radius: 50
        },
        itemMargin: {
          horizontal: 15,
          vertical: 5
        }
      },
      colors: ['#faad14'],
      series: [

        {
          name: 'Revenue',
          data: [120, 45, 78, 150, 168, 99]
        }
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      }
    };
  }

  // life cycle event
  ngOnInit(): void {
    this.getDashbordData()
    setTimeout(() => {
      this.weekChart = new ApexCharts(document.querySelector('#visitor-chart'), this.monthOptions);
      this.weekChart.render();
    }, 500);
  }
  getDashbordData() {
    this.userService.getDashbordDataApi().subscribe((res: any) => {
      this.dashbord = res;
      let datareclamation = res.ReclamationParDate.map((el: any) => "" + Number(el.count));
      this.datacoutReclamationByDate = [{
        data: datareclamation
      }]
      let labelcoutReclamationByDate = res.ReclamationParDate.map((el: any) => JSON.parse(el._id).year + "-" + JSON.parse(el._id).month)

      let newlabel = {
        categories: labelcoutReclamationByDate,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
      this.labelcoutReclamationByDate = newlabel
      let dataProduit = res.ProduitParDate.map((el: any) => "" + Number(el.count));
      let labelcoutProduit = res.ProduitParDate.map((el: any) => JSON.parse(el._id).year + "-" + JSON.parse(el._id).month)
      this.dataProduit = [{
        data: dataProduit
      }]
      this.labelcoutProduit = {
        categories: labelcoutProduit,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
    })


  }

  // public method
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      setTimeout(() => {
        this.weekChart = new ApexCharts(document.querySelector('#visitor-chart'), this.monthOptions);
        this.weekChart.render();
      }, 200);
    }

    if (changeEvent.nextId === 2) {
      setTimeout(() => {
        this.monthChart = new ApexCharts(document.querySelector('#visitor-chart-1'), this.monthOptions);
        this.monthChart.render();
      }, 200);
    }
  }

  monthOptions = {
    chart: {
      height: 450,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#1890ff', '#13c2c2'],
    series: [
      {
        name: 'Page Views',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35]
      },
      {
        name: 'Sessions',
        data: [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41]
      }
    ],
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };






  tables = tableData;


}
