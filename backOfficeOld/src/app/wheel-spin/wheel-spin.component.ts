import { Component, OnInit,OnChanges, SimpleChanges , Input, AfterViewInit, Output, EventEmitter } from '@angular/core';



export interface Item {
  text: string,
  fillStyle: string,
  id: any,
}
export enum TextAlignment {
  INNER = 'inner',
  OUTER = 'outer',
  CENTER = 'center',
}

export enum TextOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  CURVED = 'curved',
}

@Component({
  selector: 'app-wheel-spin',
  templateUrl: './wheel-spin.component.html',
  styleUrl: './wheel-spin.component.scss'
})
export class WheelSpinComponent implements OnInit,OnChanges, AfterViewInit {

  constructor() { }

  @Input() height: number;
  @Input() idToLandOn: any;
  @Input() width: number;
  @Input() items: Item[];
  @Input() spinDuration: number = 8;
  @Input() spinAmount: number;
  @Input() innerRadius: number;
  @Input() pointerStrokeColor: string;
  @Input() pointerFillColor: string;
  @Input() disableSpinOnClick: boolean;
  @Input() textOrientation: TextOrientation
  @Input() textAlignment: TextAlignment


  @Output() onSpinStart: EventEmitter<any> = new EventEmitter();
  @Output() onSpinComplete: EventEmitter<any> = new EventEmitter();

  wheel: any
  completedSpin: boolean = false;
  isSpinning: boolean = false;
  myitem = [];
  reset() {
    this.wheel.stopAnimation(false);
    this.wheel.rotationAngle = 0;
    this.wheel.ctx.clearRect(0, 0, this.wheel.ctx.canvas.width, this.wheel.ctx.canvas.height);
    this.isSpinning = false
    this.completedSpin = false
    this.ngAfterViewInit()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] ) {
      // Do something when data changes
      console.log("child2",this.items)

      const segments = this.items
      this.createwheele(segments)

      // @ts-ignore
      TweenMax.ticker.addEventListener("tick", this.drawPointer.bind(this));
      this.myitem = this.items;
    }
  }
  ngOnInit(): void {
    console.log("item",this.items)
  }

  spin() {
    if (this.completedSpin || this.isSpinning) return
    this.isSpinning = true
    this.onSpinStart.emit(null)
    const segmentToLandOn = this.wheel.segments.filter(x => !!x).find(({ id }) => this.idToLandOn === id)
    console.log(segmentToLandOn,this.wheel)
    const segmentTheta = segmentToLandOn.endAngle - segmentToLandOn.startAngle
    this.wheel.animation.stopAngle = segmentToLandOn.endAngle - (segmentTheta / 4);
    this.wheel.startAnimation()
    setTimeout(() => {
      this.completedSpin = true
      this.onSpinComplete.emit(null)
    }, this.spinDuration * 1000)
  }
  ngAfterViewInit() {
    const segments = this.items
    console.log("segmentsChild",segments)

    this.createwheele(segments)

    // @ts-ignore
    TweenMax.ticker.addEventListener("tick", this.drawPointer.bind(this));
  }
createwheele(segments:any){
     // @ts-ignore
     this.wheel = new Winwheel({
      numSegments: segments.length,
      segments,
      innerRadius: this.innerRadius || 0,
      outerRadius: (this.height / 2) - 20,
      centerY: (this.height / 2) + 20,
      textOrientation : this.textOrientation,
      textAligment : this.textAlignment,
      animation:
      {
        type: 'spinToStop',  // Type of animation.
        duration: this.spinDuration, // How long the animation is to take in seconds.
        spins: this.spinAmount  // The number of complete 360 degree rotations the wheel is to do.
      }
    })
}
  ngOnDestroy() {
    // @ts-ignore
    TweenMax.ticker.removeEventListener("tick")
  }

  drawPointer(){
    let c = this.wheel.ctx;
    // Create pointer.
    if (c) {
      c.save();
      c.lineWidth = 2;
      c.strokeStyle = this.pointerStrokeColor;
      c.fillStyle = this.pointerFillColor;
      c.beginPath();
      c.moveTo((this.width / 2) - 20, 2);
      c.lineTo((this.width / 2) + 20, 2);
      c.lineTo((this.width / 2), 42);
      c.lineTo((this.width / 2) - 20, 2);
      c.stroke();
      c.fill();
      c.restore();
    }
  }
}
