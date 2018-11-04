import { CarService } from './../shared/car/car.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GiphyService } from '../shared/gigphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  car :any={};
  sub:Subscription;
  constructor( private route:ActivatedRoute,
                    private router:Router,
                  private carService:CarService,
                private giphyService:GiphyService) { }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      const id= params['id'];
      if(id){
        this.carService.get(id).subscribe((car:any)=>{
          if(car){
            this.car=car;
            this.car.href=car._links.self.href;
            this.giphyService.get(car.name).subscribe(url=>car.giphyUrl=url);
          }else{
            console.log('car with id  not found returning to list');
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  gotoList(){
    this.router.navigate(['/car-list']);
  }

  save(form:NgForm){
    this.carService.save(form).subscribe(response=>{
      this.gotoList();
    },error=>console.error(error) );
  }

  remove(href){
    this.carService.remove(href).subscribe(result=>{
      this.gotoList();
    },error=>console.error(error));
  }
}
