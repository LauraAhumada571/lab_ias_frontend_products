import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//rxjs
import { mergeMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

//modules
import { DiscountModel } from 'src/app/core/models/discount.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { CategoryModel } from 'src/app/core/models/categories.model';

//services
import { ProductService } from 'src/app/shared/services/product-service/product.service';
import { DiscountService } from 'src/app/shared/services/discount-service/discount.service';
import { CategoryService } from 'src/app/shared/services/category-service/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  form: FormGroup;
  listOfDiscounts: DiscountModel[] = [];
  listOfCategories: CategoryModel[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly discountService: DiscountService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAllCategories();
  }

  onChange(typeOfProduct: number):void{
    this.getAllDiscounts().pipe(
      mergeMap( (discount: DiscountModel[]) => {
        this.checkDiscount(typeOfProduct);
        return discount
      })
    ).subscribe();
  }

  createForm(): void {
    this.form = this.fb.group({
      productId: ['', [Validators.required]],
      typeOfProduct: [undefined, [Validators.required]],
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      discountapply: [false],
      discount: [0]
    });
  }

  onClickSave(): void {
    if (this.form.valid) {
      const product: ProductModel = { ...this.form.value };
      this.productService.saveProduct(product).subscribe(
        (product: ProductModel) => {
          // logic - if request is success
          this.form.reset();
          alert(`Se ha guardado con exito el usuario: ${product.productId} - ${product.name}` );
          this.productService.setChanges(true);
        }
      );
    } else {
      alert('El Formulario no se encuentra valido.');
    }
  }

  getAllDiscounts(): Observable<DiscountModel[]>{
    return this.discountService.getAllDiscount().pipe(
      tap((discounts: DiscountModel[]) => {
        console.log('Executing getAllDiscounts...');
        this.listOfDiscounts = [...discounts];
      }));
  }

  getAllCategories(): void{
    this.categoryService.getCategory().subscribe(
      (categories: CategoryModel[]) => {
        console.log('Executing getAllCategories...');
        this.listOfCategories = [...categories];
      });
  }

  checkDiscount(typeOfProduct: number){
    for(let i = 0; i < this.listOfDiscounts.length ; i++){
      if(Number(typeOfProduct) === this.listOfDiscounts[i].idProduct){
        this.form.get('discountapply').setValue(this.listOfDiscounts[i].discountApply);
        this.form.get('discount').setValue(this.listOfDiscounts[i].value);
      } 
    }
  }

  hwy(): void {
    console.log(this.discountService.getAllDiscount());
  }

  /*getDiscount(){
    return this.getAllDiscounts().pipe(
      mergeMap( (discounts: DiscountModel[]) => {
        console.log('Executing mergeMap ...');
        return this.getAllDiscounts();
      })
    ).subscribe();
  }*/
}
