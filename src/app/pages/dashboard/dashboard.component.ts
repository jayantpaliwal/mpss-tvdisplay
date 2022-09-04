import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ReturnUrlsService } from '../../service/return-urls.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of, pipe } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
declare const swal;

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  styleUrls: ['./dashboard.component.css'],
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  appt_form: FormGroup
  total_collection: number = 0;
  constructor(public dashboard: ReturnUrlsService) {
    this.appt_form = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile1: new FormControl('', Validators.required),
      mobile2: new FormControl('',),
      ticket_type: new FormControl('', Validators.required),
      reference: new FormControl('', Validators.required)
    })
  }
  public displayData;
  tourist_inside = [];
  tickettypelist = [];
  referencelist = [];
  parking_status = {
    TwoWheelers :0,
    ThreeWheelers :0,
    FourWheelers: 0,
    SixWheelers: 0,
    TotalVechile: 0,
    LightAndSound: 0,
    LightSoundBookedSeats: 0,
    Scooter: 0,
    Auto: 0,
    Car: 0,
    Bus: 0
  };
  today_sold_tickets = [];
  tourist_till_now = [];
  today_collection = [];
  today_collection_total = 0;
  interval: any;
  ngOnInit() {
    this.loadDashBoard();

    this.interval = setInterval(()=>{
      this.loadDashBoard()
    },10000 )
  }
  ngOnDestroy(){
    clearInterval(this.interval);
  }

  loadDashBoard(){
    forkJoin([
      this.dashboard.GetTodaysCollectionOnDashboard().pipe(map((res) => res), catchError(e => of('Oops!'))),
      this.dashboard.GetTodayTouristsCount().pipe(map((res) => res), catchError(e => of('Oops!'))),
      this.dashboard.GetApptTicket().pipe(map((res) => res), catchError(e => of('Oops!'))),
      this.dashboard.GetRef().pipe(map((res) => res), catchError(e => of('Oops!'))),
      this.dashboard.onDashboardLoad().pipe(map((res) => res), catchError(e => of('Oops!'))),
      this.dashboard.GetParkingStatus().pipe(map((res) => res), catchError(e => of('Oops!'))),
      this.dashboard.TodaySoldTickets().pipe(map((res) => res), catchError(e => of('Oops!'))),
      this.dashboard.GetTouristsInside().pipe(map((res) => res), catchError(e => of('Oops!')))
    ]).subscribe((result: any) => {
      if (result[0]) {
        this.today_collection = result[0];
        if (this.today_collection.length) {
          this.today_collection_total = this.today_collection.map(o => o.amount).reduce(function (a, b) {
            return a + b;
          }, 0)
          // this.loadChart();
        }
      }
      if (result[1]) {
        this.tourist_till_now = result[1];
      }
      if (result[2]) {
        result.forEach(element=>{
          this.tickettypelist.push({
            type: element.TicketType,
            id: element.TicketTypeId
          })
        })
      }
      if (result[3]) {
        result.forEach(element=>{
          this.referencelist.push({
            name: element.RefName,
            id: element.RefID
          })
        })
      }
      if (result[4]) {
        this.displayData= result[4]
      }
      if (result[5]) {
        this.parking_status = result[5];
        this.parking_status={
          TwoWheelers: result[5][0][0].TwoWheelers,
          ThreeWheelers: result[5][0][0].ThreeWheelers,
          FourWheelers: result[5][0][0].FourWheelers,
          SixWheelers : result[5][0][0].SixWheelers,
          TotalVechile: result[5][0][0].TotalVechile,
          LightAndSound: result[5][2][0].LightAndSound,
          LightSoundBookedSeats: result[5][1][0].LightSoundBookedSeats,
          Scooter: result[5][2][0].Scooter,
          Auto: result[5][2][0].Auto,
          Car: result[5][2][0].Car,
          Bus: result[5][2][0].Bus
        }
      }
      if (result[6]) {
        this.today_sold_tickets = result[6];
        this.today_sold_tickets['totalTicketCount'] = result[6].map(o => o.SoldQuantity).reduce(function (a, b) {
          return a + b;
        }, 0)
      }
      if (result[7]) {
        // if (result && result[7].TouristsInside) {
          this.tourist_inside = result[7]
        // }
      }

    })
  }

}