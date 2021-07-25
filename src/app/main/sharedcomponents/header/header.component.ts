import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public locations = [];
  public branches = [];

  constructor(
    public http: HttpClient,
    public catalogService: CatalogService,
    private router: Router,
    public loaderService: LoaderService
  ) {
    let self = this;
    window.addEventListener("click", function (event: any) {  // Hide location dropdown when click on outside
      if (event.target.id !== "selectLocation") {
        self.catalogService.isopenSecondMenu = false;
      }
    });
  }

  ngOnInit(): void {
    this.catalogService.getCatalogs().then(() => {
      this.getLocationData();
    });
  }

  /**
   * @description Open dropdown on click
   */
  firstLevel() {
    if (!this.catalogService.isopenSecondMenu) {
      this.catalogService.isopenSecondMenu = true;
    }
    else {
      this.catalogService.isopenSecondMenu = false;
    }
  }

  /**
   * @description Get Location data from catalog service
   */
  getLocationData() {
    this.catalogService.getLocation().then((data: any) => {
      this.locations = data.locations;
      this.branches = data.branches;
    })
  }

  /**
   * @param branch Selected branch by user
   * @description Go to Category screen after select branch from location dropdown
   */
  goToCategory(branch) {
    let self = this;
    this.loaderService.isLoading.next(true);  // Loader enable
    this.catalogService.selectedBranch = branch;
    this.catalogService.isSelectedCategory = false;
    this.router.navigateByUrl('/category');
    // Loader disable after 1s
    setTimeout(function () {
      self.loaderService.isLoading.next(false);
    }, 1000);
  }

}
