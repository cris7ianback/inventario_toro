import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Licenses } from '../models/licenses';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  private URL = environment.URL;

  constructor(private http: HttpClient) { }


  addLicense(license: any) {
    return this.http.post<any>(this.URL + '/addLicences', license);
  }

  deleteLicense(id_license: any) {
    return this.http.delete(this.URL + `/deleteLicense/${id_license}`);
  }

  listLicenses() {
    return this.http.get<Licenses[]>(this.URL + '/listLicenses');
  }

}
