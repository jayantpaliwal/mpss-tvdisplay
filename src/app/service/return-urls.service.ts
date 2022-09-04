import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../Providers/global';
const configUrl = 'http://192.168.1.1/AdminStaffAPI.asmx';

@Injectable({
  providedIn: 'root'
})
export class ReturnUrlsService {
  constructor(public http:HttpClient) { }

  GetTodaysCollectionOnDashboard()
  {
    return this.http.get(myGlobals.apiURL+'/GetDashboardTodaysCollectiion?')
  }
  GetTodayTouristsCount()
  {
    return this.http.get(myGlobals.apiURL+`/GetTodayTouristsCount?`)
  }
  GetApptTicket()
  {
    return this.http.get(myGlobals.apiURL+`/GetAppointmentTicketType?`)
  }
  GetRef()
  {
    return this.http.get(myGlobals.apiURL+`/GetReference?`)
  }
  onDashboardLoad()
  {
    return this.http.get(myGlobals.apiURL+ `/DashboardDetails`)
  }
  GetParkingStatus()
  {
    return this.http.get(myGlobals.apiURL+`/GetCurrentParkingStatus?`)
  }
  TodaySoldTickets()
  {
    return this.http.get(myGlobals.apiURL+'/GetTodaysSoldTicketTypes?')
  }
  GetTouristsInside()
  {
    return this.http.get(myGlobals.apiURL+`/GetTouristsInside?`)
  }
  loginDetails(username, password)
  {
    return this.http.get(myGlobals.apiURL+ `/GetUserLogin?userName=${username}&password=${password}`)
  }
}
