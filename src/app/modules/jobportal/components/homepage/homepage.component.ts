import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  jobType:string;
  ngOnInit() {

    this.route.data.subscribe((res) => {
      this.jobType = res.jobType;
    });

  }




}
    // var slideIndex = 1;
    // showSlides(slideIndex);
    
    // function plusSlides(n) {
    //   showSlides(slideIndex += n);
    // }
    
    // function currentSlide(n) {
    //   showSlides(slideIndex = n);
    // }
    
    // function showSlides(n) {
    //   var i;
    //   var slides = document.getElementsByClassName("mySlides")  as HTMLCollectionOf<HTMLElement>;
    //   var dots = document.getElementsByClassName("dot")  as HTMLCollectionOf<HTMLElement>;
    //   if (n > slides.length) {slideIndex = 1}    
    //   if (n < 1) {slideIndex = slides.length}
    //   for (i = 0; i < slides.length; i++) {
    //       slides[i].style.display = "none";  
    //   }
    //   for (i = 0; i < dots.length; i++) {
    //       dots[i].className = dots[i].className.replace(" active", "");
    //   }
    //   slides[slideIndex-1].style.display = "block";  
    //   dots[slideIndex-1].className += " active";
    // }




