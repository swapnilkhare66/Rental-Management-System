import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public catalogData: any;
  public selectedBranch: any;
  public selectedCategory: any;
  public isSelectedCategory = false;
  public isopenSecondMenu = false;

  constructor(
    public http: HttpClient
  ) { }

  /**
   * @description Get json data from file.
   * @returns Catalog Data
   */
  getCatalogs() {
    const p = new Promise((resolve, reject) => {
      this.http.get('./assets/json_data/catalog.json').subscribe((data: any) => {
        this.catalogData = data.data.locations;
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
    return p;
  }

  /**
   * @description get locations and branches from catalog data
   * @returns all locations and their branches
   */
  getLocation() {
    const p = new Promise((resolve, reject) => {
      let allLocations = [];
      let allBranches = [];
      for (let i = 0; i < this.catalogData.length; i++) {
        if (this.catalogData[i].name) {
          allLocations.push(this.catalogData[i].name);
        }
        if (this.catalogData[i].branches.length > 0) {
          allBranches.push(this.catalogData[i].branches);
        }
      }
      if (allLocations.length > 0) {
        let finalData = {
          locations: allLocations,
          branches: allBranches
        };
        resolve(finalData);
      }
      else {
        reject();
      }
    });
    return p;
  }

}

