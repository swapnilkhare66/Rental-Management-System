import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories: any;
  public subCategories: any;
  public categoryName = '';


  constructor(
    public catalogService: CatalogService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

  /**
   * @param category Selected Category by user
   * @description Go to subcategory screen
   */
  goToSubCategory(category) {
    let self = this;
    this.loaderService.isLoading.next(true); // Loader enable
    this.catalogService.selectedCategory = category.subcategories;
    this.categoryName = category.name;
    this.catalogService.isSelectedCategory = true;
    // Loader disable after 1s
    setTimeout(function () {
      self.loaderService.isLoading.next(false);
    }, 1000);
  }

  /**
   * @description Go back to category screen from subcategory screen
   */
  goback() {
    let self = this;
    this.loaderService.isLoading.next(true); // Loader enable
    this.catalogService.isSelectedCategory = false;
    // Loader disable after 1s
    setTimeout(function () {
      self.loaderService.isLoading.next(false);
    }, 1000);
  }

}
