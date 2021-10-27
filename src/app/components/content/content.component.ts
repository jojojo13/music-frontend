import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    
    const topbar =
      this.elRef.nativeElement.ownerDocument.querySelector('.topbar');
    const content =
      this.elRef.nativeElement.ownerDocument.querySelector('.content');
      // console.log(content.pageYOffset)
    if (content.scrollTop > 0) {
      console.log('hehe')
      topbar.style.boxShadow = ' rgba(22, 22, 22, 0.8) 0 0 20px 0';
    } else {
      topbar.style.boxShadow = 'none';
    }
  };
}
