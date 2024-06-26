import { Component,Input , OnInit, ElementRef, ViewChild } from '@angular/core';
import { WheelSpinComponent, TextAlignment, TextOrientation } from '../wheel-spin/wheel-spin.component'
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: 'app-spin-the-wheel',
  templateUrl: './spin-the-wheel.component.html',
  styleUrl: './spin-the-wheel.component.css'
})



export  class SpinTheWheelComponent implements OnInit    {
  @ViewChild(WheelSpinComponent, { static: false }) wheel;
  spinDuration = 18;
  spinwhithHieght :number = 400;
  seed = [...Array(4).keys()]
  idToLandOn: any;
  items: any[] =[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER
   game : any;
   isModalVisible: boolean = false;
   display='none';


   animationStarted = false ;
  constructor(

    private roulette: AdsService,

  ) {
    this.roulette.getAllGameRoulette().subscribe( (res:any) =>
      {
        this.seed = [...Array(res.length).keys()]
        this.items = res

      console.log("res",res)
      })
  }

  ngOnInit(){
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#FF00aa', '#000000']
 console.log("parent", this.items )
  }



  reset() {
    this.wheel.reset()
  }
  before() {
    alert('Your wheel is about to spin')
  }

  async spin(prize) {
    this.idToLandOn = prize
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
  }

  after() {
    alert('')
    console.log( this.wheel.idToLandOn)
    this.roulette.getGameResult(this.wheel.idToLandOn).subscribe( (res:any) =>
      {
       console.log(res)
       this.game = res
        this.isModalVisible = true;
        this.display='block';

      })}

 close() {
   this.isModalVisible = false;
   this.display='none';


    }
     /*
     confettiParticle() {
      this.x = Math.random() * W; // x
      this.y = Math.random() * H - H; // y
      this.r = randomFromTo(11, 33); // radius
      this.d = Math.random() * maxConfettis + 11;
      this.color =
          possibleColors[
          Math.floor(
              Math.random() *
              possibleColors.length
          )
          ];
      this.tilt =
          Math.floor(Math.random() * 33) - 11;
      this.tiltAngleIncremental =
          Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;

      this.draw = function () {
          context.beginPath();
          context.lineWidth = this.r / 2;
          context.strokeStyle = this.color;
          context.moveTo(
              this.x + this.tilt + this.r / 3,
              this.y
          );
          context.lineTo(
              this.x + this.tilt,
              this.y + this.tilt + this.r / 5
          );
          return context.stroke();
      };
  }
     startAnimation() {
      canvas.style.display = "block";

      if (!this.animationStarted) {
          // Push new confetti objects to `particles[]`
          for (var i = 0; i < maxConfettis; i++) {
              particles.push(
                  this.confettiParticle()
              );
          }

          // Initialize
          canvas.width = W;
          canvas.height = H;
          this.animationStarted = true;
          Draw();

          setTimeout(() => {
              this.animationStarted = false;
              canvas.style.display = "none";
          }, 3000);
      }
  }
  */

}

